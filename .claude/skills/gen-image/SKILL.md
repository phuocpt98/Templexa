---
name: gen-image
description: "Sinh ảnh bằng model ảnh của ChatGPT qua proxy local — hoa văn, hoạ tiết, ảnh nền, placeholder, icon cho template. Dùng khi cần một ảnh chưa có sẵn trong catalog."
---

Claude không sinh được ảnh, nhưng ChatGPT thì có. Skill này giao việc đó sang
`gpt-image-2` qua CLIProxyAPI chạy ở máy local, rồi nhận file về để dùng tiếp.

## Khi nào dùng

Dùng khi cần một ảnh **chưa tồn tại**: hoa văn trang trí, hoạ tiết nền, icon,
ảnh minh hoạ tạm cho bố cục, biến thể màu của một chi tiết đồ hoạ.

**Không dùng khi:** ảnh đã có trong `products/shared/`. Tìm trong catalog trước —
ảnh sinh ra tốn hạn mức và không phải lúc nào cũng đẹp hơn ảnh có sẵn.

**Không bao giờ dùng** để tạo ảnh chân dung khách hàng, ảnh cưới giả của người
thật, hay bất cứ thứ gì trông như ảnh chụp thật của một người cụ thể.

## Cách gọi

```bash
python3 scripts/gen-image.py -p "<mô tả>" -o <đường/dẫn/ra>
```

| Cờ | Ý nghĩa | Mặc định |
|---|---|---|
| `-p` | Mô tả ảnh. **Viết bằng tiếng Anh** — cho kết quả tốt hơn hẳn | bắt buộc |
| `-o` | Đường dẫn ra. Đuôi `.webp` sẽ tự convert | bắt buộc |
| `-s` | `1024x1024` · `1536x1024` (ngang) · `1024x1536` (dọc) · `auto` | `1024x1024` |
| `-n` | Số ảnh sinh ra; >1 thì thêm hậu tố `-1`, `-2`… vào tên file | `1` |
| `-m` | `gpt-image-2` hoặc `gpt-image-1.5` | `gpt-image-2` |
| `-q` | Chất lượng WebP | `88` |
| `-k`, `--knockout` | **Tách nền trắng → trong suốt** ngay sau khi gen (mép mềm, tự cắt viền thừa). Dùng cho hoạ tiết, wax seal, bó hoa, tranh minh hoạ | tắt |
| `--knockout-only FILE` | Không gen — chỉ tách nền trắng của file có sẵn (ghi đè, hoặc `-o` ra file khác) | — |

## Ví dụ

```bash
# Hoa văn thiệp cưới, xuất thẳng WebP vào đúng thư mục sản phẩm
python3 scripts/gen-image.py \
  -o products/Invitation/Wedding/demo/assets/ornament.webp \
  -p "elegant minimal wedding ornament, thin gold botanical line art, symmetrical wreath, white background"

# Ảnh nền ngang cho hero section, sinh 3 phương án để chọn
python3 scripts/gen-image.py -s 1536x1024 -n 3 \
  -o build/hero.webp \
  -p "soft blush watercolor texture, subtle paper grain, no text, no objects"
```

## Nền trắng → trong suốt (BẮT BUỘC với element trang trí)

Model **không xuất được nền trong suốt** — mọi "isolated on white background" đều là nền trắng đặc.
Đặt lên nền kem/màu sẽ lộ **khối vuông trắng** (đã gặp thật với bó hoa góc, wax seal). Vì vậy:

- Element trang trí (hoa góc, seal, divider, tranh venue, icon) → **luôn** thêm `--knockout`
- Ảnh nền full-bleed (texture, tranh phủ toàn màn) → không cần
- Trong prompt vẫn ghi `isolated on pure white background` để nền sạch, knockout mới đẹp
- Đừng dựa vào `mix-blend-mode: multiply` để giấu nền trắng — bị vô hiệu khi phần tử cha có `backdrop-filter`/`transform`/`opacity` (tạo stacking context) và không ổn định giữa trình duyệt

```bash
# Gen + tách nền một lệnh
python3 scripts/gen-image.py -k -o assets/wax-seal.webp \
  -p "top view of a single round sage green wax seal stamp, embossed monogram M and L, glossy wax, isolated on pure white background, no text, no watermark"

# Ảnh đã gen trước đó
python3 scripts/gen-image.py --knockout-only assets/corner-bouquet.webp
```

Ngưỡng mặc định: min(R,G,B) ≥ 246 → trong suốt hoàn toàn, ≤ 215 giữ nguyên, ở giữa giảm dần.
Hoạ tiết có vùng trắng **bên trong** (hoa trắng, cánh hoa sáng) sẽ bị xuyên nhẹ — chấp nhận được trên nền kem; nếu không muốn, gen với nền màu khác (vd `on a flat #00FF00 background`) rồi xử lý riêng.

## Viết prompt cho ra ảnh dùng được

- Nêu **phong cách** trước: `flat vector`, `thin line art`, `watercolor texture`, `3d render`
- Nêu **nền**: `white background`, `transparent-looking background`, `seamless tile`
- Nói rõ **không muốn gì**: `no text`, `no watermark`, `no people`
- Model hay tự thêm chữ vào ảnh — luôn có `no text` trừ khi thật sự cần chữ

## Sau khi sinh xong

1. **Mở file ra xem** bằng công cụ đọc ảnh trước khi đưa vào template — đừng tin
   là nó đúng chỉ vì lệnh chạy không lỗi. Với ảnh `--knockout`: kiểm tra mép không răng cưa,
   không còn viền trắng khi đặt lên nền màu
2. Nếu ảnh vào thư mục sản phẩm, chạy tiếp skill `catalog-assets` để đặt tên và
   cập nhật catalog theo đúng quy ước
3. Ảnh sinh ra là ảnh mới, không có bản quyền của ai, nhưng cũng **không nên
   dùng cho bản demo công khai mà chưa xem kỹ**

## Khi lỗi

| Thông báo | Nguyên nhân |
|---|---|
| `Không kết nối được tới http://127.0.0.1:8317` | Proxy chưa chạy — mở app EasyCLIProxyAPI, màn hình **Home**, bấm chạy |
| `Khoá bị từ chối (401)` | Khoá đã đổi — đối chiếu ở **Advanced Settings → Authentication Keys** |
| `Proxy không phục vụ model gpt-image-2` | Chưa đăng nhập tài khoản ChatGPT — vào **OAuth → OAuth Sign-In → Codex OAuth** |

Script tự đọc khoá từ cấu hình của ứng dụng proxy lúc chạy, nên **không có secret
nào nằm trong repo**. Muốn dùng khoá khác thì đặt biến `CPA_KEY`.
