#!/usr/bin/env python3
"""
gen-image-agy.py — Sinh ảnh bằng Gemini (gói Gemini Pro cá nhân) qua agy (Antigravity CLI).

  python3 scripts/gen-image-agy.py -p "<mô tả tiếng Anh>" -o blogs/images/<slug>/cover.webp --size 1600x900
  python3 scripts/gen-image-agy.py -p "..." -o out.webp --ratio 3:2 --size 1200x800 --ref anh-mau.jpg

- agy chạy ở thư mục tạm trống + --sandbox: không đụng được repo, không chạy lệnh.
- Ảnh agy tạo nằm ở ~/.gemini/antigravity-cli/brain/<conversation_id>/ → script copy ra.
- Đuôi .webp → convert bằng Pillow. --size WxH → crop giữa đúng tỉ lệ rồi resize.
- Mỗi ảnh tốn ~1% quota Gemini khung 5 giờ; model ảnh còn giới hạn riêng ~13 ảnh/đợt (429 khi hết).
- File ra đã tồn tại thì bỏ qua (thêm --force để gen lại).
"""
import argparse
import glob
import json
import os
import pathlib
import re
import shutil
import subprocess
import sys
import tempfile
import time

AGY = pathlib.Path.home() / ".local/bin/agy"
BRAIN = pathlib.Path.home() / ".gemini/antigravity-cli/brain"
MODEL = "gemini-3.8-flash-medium"
IMG_EXT = (".png", ".jpg", ".jpeg", ".webp")


def agy_generate(prompt, ratio, refs, model, timeout):
    """Gọi agy tạo 1 ảnh, trả về đường dẫn file ảnh trong brain/. Lỗi → RuntimeError."""
    start = time.time()
    with tempfile.TemporaryDirectory() as tmp:
        for r in refs:
            shutil.copy(r, pathlib.Path(tmp) / pathlib.Path(r).name)
        see = (f"Xem các ảnh {', '.join(pathlib.Path(r).name for r in refs)} trong thư mục hiện tại "
               "và dùng chúng làm ảnh tham chiếu. ") if refs else ""
        # agy bản mới giao việc tạo ảnh cho subagent `image-generator` — chỉ cho phép subagent đó
        task = (see + f"Tạo đúng 1 ảnh tỉ lệ {ratio} (dùng generate_image hoặc subagent image-generator). "
                f"Prompt ảnh: {prompt} "
                "Không chạy lệnh shell, không gọi subagent nào khác. Tạo xong trả lời đường dẫn tuyệt đối của file ảnh.")
        try:
            p = subprocess.run(
                [str(AGY), "-p", task, "--model", model, "--sandbox", "--output-format", "json",
                 "--print-timeout", f"{timeout}s"],
                cwd=tmp, stdin=subprocess.DEVNULL, capture_output=True, text=True, timeout=timeout + 120)
        except subprocess.TimeoutExpired:
            raise RuntimeError("quá thời gian chờ agy")
    try:
        res = json.loads(p.stdout or "{}", strict=False)
    except json.JSONDecodeError:
        res = {}
    text = res.get("response") or ""
    # Ảnh có thể nằm ở hội thoại của subagent → lấy đường dẫn trong câu trả lời + mọi ảnh mới trong brain/
    files = [m for m in re.findall(r"(/[^\s`'\")\]]+\.(?:png|jpe?g|webp))", text, re.I) if os.path.isfile(m)]
    files += [f for f in glob.glob(str(BRAIN / "**" / "*.*"), recursive=True)
              if f.lower().endswith(IMG_EXT) and ".user_uploaded" not in f and os.path.getmtime(f) >= start]
    files = sorted(set(files), key=os.path.getmtime)
    if not files:
        msg = (text or p.stderr or "").strip()
        raise RuntimeError(msg[-400:] or "agy không trả ảnh")
    return files[-1]


def save(src, out, size, quality):
    from PIL import Image, ImageOps
    img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    if size:
        w, h = size
        img = ImageOps.fit(img, (w, h), Image.LANCZOS, centering=(0.5, 0.5))
    out.parent.mkdir(parents=True, exist_ok=True)
    if out.suffix.lower() == ".webp":
        img.save(out, "WEBP", quality=quality, method=6)
    elif out.suffix.lower() in (".jpg", ".jpeg"):
        img.save(out, "JPEG", quality=quality, optimize=True, progressive=True)
    else:
        img.save(out)
    return img.size


def main():
    ap = argparse.ArgumentParser(description="Sinh ảnh bằng Gemini qua agy")
    ap.add_argument("-p", "--prompt", required=True, help="mô tả ảnh (tiếng Anh cho kết quả tốt hơn)")
    ap.add_argument("-o", "--out", required=True, help="file ra (.webp/.jpg/.png)")
    ap.add_argument("--ratio", default="16:9", help="tỉ lệ yêu cầu model (16:9, 3:2, 1:1, 9:16…)")
    ap.add_argument("--size", help="WxH crop + resize sau khi gen, vd 1600x900")
    ap.add_argument("--ref", action="append", default=[], help="ảnh tham chiếu (lặp lại được)")
    ap.add_argument("-q", "--quality", type=int, default=82)
    ap.add_argument("--model", default=MODEL)
    ap.add_argument("--tries", type=int, default=2)
    ap.add_argument("--timeout", type=int, default=600, help="giây cho mỗi lần gọi agy")
    ap.add_argument("--force", action="store_true", help="gen lại dù file đã có")
    a = ap.parse_args()

    if not AGY.exists():
        sys.exit(f"✗ Không thấy agy ở {AGY} — cài Antigravity CLI và đăng nhập Gemini trước")
    out = pathlib.Path(a.out)
    if out.exists() and not a.force:
        print(f"• Bỏ qua (đã có): {out}")
        return 0
    size = tuple(int(x) for x in a.size.lower().split("x")) if a.size else None

    for i in range(a.tries):  # model ảnh đôi khi chậm/quá tải → thử lại
        try:
            src = agy_generate(a.prompt, a.ratio, a.ref, a.model, a.timeout)
            w, h = save(src, out, size, a.quality)
            print(f"✓ {out}  {w}x{h}  {out.stat().st_size // 1024}KB")
            return 0
        except RuntimeError as e:
            print(f"✗ lần {i + 1}: {str(e)[:300]}", file=sys.stderr)
            if "429" in str(e) or "quota" in str(e).lower():
                break  # hết lượt ảnh — thử lại cũng vô ích
    sys.exit(f"✗ Không tạo được {out.name}. Hết lượt ảnh thì chờ vài giờ (xem: agy -p /usage)")


if __name__ == "__main__":
    raise SystemExit(main())
