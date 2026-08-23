#!/usr/bin/env python3
"""Sinh ảnh bằng model ảnh của ChatGPT, đi qua CLIProxyAPI chạy ở máy local.

Khoá truy cập KHÔNG nằm trong repo — script đọc thẳng từ file cấu hình của
ứng dụng EasyCLIProxyAPI lúc chạy. Nhờ vậy repo không bao giờ chứa secret.

Dùng:
    python3 scripts/gen-image.py -p "mô tả ảnh" -o products/.../hero.webp
    python3 scripts/gen-image.py -p "..." -o out.png --size 1536x1024 -n 3
"""

import argparse
import base64
import json
import os
import re
import sys
import urllib.error
import urllib.request

PROXY = os.environ.get("CPA_URL", "http://127.0.0.1:8317")
CONFIG = os.path.expanduser(
    "~/Library/Application Support/com.cpa.gui/cpa-core/config.yaml"
)
# Các model chỉ phục vụ ở /v1/images/generations, không gọi qua /v1/messages được.
MODELS = ("gpt-image-2", "gpt-image-1.5")
SIZES = ("1024x1024", "1536x1024", "1024x1536", "auto")


def read_key() -> str:
    """Lấy khoá đang có hiệu lực từ cấu hình của lõi proxy."""
    env_key = os.environ.get("CPA_KEY")
    if env_key:
        return env_key.strip()
    if not os.path.exists(CONFIG):
        sys.exit(
            f"Không thấy file cấu hình proxy:\n  {CONFIG}\n"
            "Mở ứng dụng EasyCLIProxyAPI một lần, hoặc đặt biến CPA_KEY."
        )
    with open(CONFIG, encoding="utf-8") as fh:
        found = re.findall(r"sk-[A-Za-z0-9_-]{10,}", fh.read())
    if not found:
        sys.exit(
            "Không tìm thấy khoá trong cấu hình proxy.\n"
            "Vào app → Advanced Settings → Authentication Keys để tạo một khoá."
        )
    return found[0]


def generate(prompt: str, model: str, size: str, count: int) -> list[bytes]:
    body = json.dumps(
        {"model": model, "prompt": prompt, "n": count, "size": size}
    ).encode()
    req = urllib.request.Request(
        f"{PROXY}/v1/images/generations",
        data=body,
        headers={
            "Authorization": f"Bearer {read_key()}",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            payload = json.load(resp)
    except urllib.error.HTTPError as err:
        detail = err.read().decode(errors="replace")[:400]
        if err.code == 401:
            sys.exit("Khoá bị từ chối (401). Đối chiếu lại Authentication Keys trong app.")
        if err.code == 400 and "unknown provider" in detail:
            sys.exit(
                f"Proxy không phục vụ model {model}.\n"
                "Tài khoản ChatGPT đã đăng nhập chưa? Kiểm tra ở OAuth → Authentication Files."
            )
        sys.exit(f"Proxy trả lỗi {err.code}:\n{detail}")
    except urllib.error.URLError as err:
        sys.exit(
            f"Không kết nối được tới {PROXY} ({err.reason}).\n"
            "Mở ứng dụng EasyCLIProxyAPI và bấm chạy ở màn hình Home."
        )

    items = payload.get("data") or []
    if not items:
        sys.exit(f"Proxy trả về rỗng: {json.dumps(payload)[:300]}")

    out = []
    for item in items:
        if item.get("b64_json"):
            out.append(base64.b64decode(item["b64_json"]))
        elif item.get("url"):
            with urllib.request.urlopen(item["url"], timeout=120) as resp:
                out.append(resp.read())
    return out


def save(raw: bytes, path: str, quality: int) -> str:
    """Ghi ra đĩa. Đuôi .webp thì convert, còn lại giữ nguyên PNG."""
    os.makedirs(os.path.dirname(os.path.abspath(path)) or ".", exist_ok=True)
    if path.lower().endswith(".webp"):
        try:
            from PIL import Image
        except ImportError:
            sys.exit("Cần Pillow để xuất .webp — chạy: pip3 install Pillow")
        import io

        Image.open(io.BytesIO(raw)).convert("RGB").save(
            path, "WEBP", quality=quality, method=6
        )
    else:
        with open(path, "wb") as fh:
            fh.write(raw)
    return path


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("-p", "--prompt", required=True, help="mô tả ảnh, viết bằng tiếng Anh cho kết quả tốt hơn")
    ap.add_argument("-o", "--out", required=True, help="đường dẫn ra; đuôi .webp sẽ tự convert")
    ap.add_argument("-m", "--model", default=MODELS[0], choices=MODELS)
    ap.add_argument("-s", "--size", default="1024x1024", choices=SIZES)
    ap.add_argument("-n", "--count", type=int, default=1, help="số ảnh, mặc định 1")
    ap.add_argument("-q", "--quality", type=int, default=88, help="chất lượng WebP, mặc định 88")
    args = ap.parse_args()

    images = generate(args.prompt, args.model, args.size, args.count)

    base, ext = os.path.splitext(args.out)
    for idx, raw in enumerate(images):
        path = args.out if len(images) == 1 else f"{base}-{idx + 1}{ext}"
        saved = save(raw, path, args.quality)
        print(f"{saved}  ({os.path.getsize(saved):,} bytes)")


if __name__ == "__main__":
    main()
