---
name: scan-images
description: "Quét ảnh trong folder sản phẩm → cập nhật `images[]` và `thumbnail` trong `data.js`."
---

Quét ảnh trong folder sản phẩm → cập nhật `images[]` và `thumbnail` trong `data.js`.

Argument: $ARGUMENTS — đường dẫn folder, ID sản phẩm, range ID, hoặc để trống.

Ví dụ:
- `"./products/Web/Onepage/gen_150_coffee-shop-minimalist/"` — scan 1 folder
- `"150"` — scan theo product ID
- `"150-155"` — scan range ID
- Trống → scan tất cả sản phẩm có `images: []` trống

---

## Quy trình

### Bước 1: Xác định sản phẩm cần scan

Parse `$ARGUMENTS`:

- **Nếu là đường dẫn** (chứa `/` hoặc `\`): scan folder đó → tìm product trong data.js có `path` khớp
- **Nếu là số đơn** (ví dụ `150`): tìm product có `id: 150` trong data.js → lấy `path`
- **Nếu là range** (ví dụ `150-155`): tìm tất cả product có id từ 150 đến 155
- **Nếu trống**: đọc data.js → tìm tất cả product có `images: []` (mảng rỗng)

Đọc `assets/js/data.js` để lấy thông tin product (id, path).

### Bước 2: Quét ảnh trong folder

Với mỗi product cần scan:

1. **Liệt kê file** trong folder `path` bằng `ls` hoặc Glob
2. **Lọc file ảnh** — chỉ giữ: `*.png`, `*.jpg`, `*.jpeg`, `*.webp`, `*.gif`
3. **Bỏ qua**: `*.html`, `*.css`, `*.js`, `*.mp3`, `*.mp4`, `*.json`, `*.txt`, `*.md`, `*.svg`
4. **KHÔNG đọc nội dung file ảnh** — chỉ lấy đường dẫn

### Bước 3: Xác định thumbnail

Thứ tự ưu tiên:
1. `thumbnail.webp` → `thumbnail.png` → `thumbnail.jpg`
2. `screen.webp` → `screen.png` → `screen.jpg`
3. File ảnh đầu tiên theo alphabet

### Bước 4: Sắp xếp mảng images

- Thumbnail luôn ở vị trí đầu tiên `images[0]`
- Các ảnh còn lại sắp theo tên file (alphabet)
- Đường dẫn đầy đủ relative: `./products/Web/{Category}/{folder}/filename.ext`
- Dùng đường dẫn từ field `path` của product + tên file

### Bước 5: Cập nhật data.js

Tìm product entry trong `assets/js/data.js` theo ID, cập nhật:

- `images: [...]` — mảng đường dẫn ảnh
- `thumbnail: '...'` — đường dẫn thumbnail

**Cách tìm và sửa:**
1. Tìm dòng `id: <ID>,` trong data.js
2. Tìm dòng `images: []` hoặc `images: [...]` gần đó (trong cùng object)
3. Thay thế bằng mảng mới
4. Tương tự cho `thumbnail: ''` hoặc `thumbnail: '...'`

**KHÔNG thay đổi** các field khác (name, slug, description, features, v.v.)

### Bước 6: Báo cáo

In ra:

```
✅ Đã cập nhật ảnh cho <N> sản phẩm:

| ID | Tên | Số ảnh | Thumbnail |
|----|------|--------|-----------|
| 150 | Tên SP | 5 | thumbnail.webp |

```

**Cảnh báo** nếu:
- Folder không tồn tại → `⚠️ Folder không tìm thấy: <path>`
- Folder không có ảnh → `⚠️ Không tìm thấy ảnh trong: <path>`
- Product ID không tồn tại trong data.js → `⚠️ Không tìm thấy product ID: <id>`

---

## Ràng buộc

- KHÔNG đọc nội dung file ảnh — chỉ lấy đường dẫn
- KHÔNG thay đổi field nào khác ngoài `images` và `thumbnail`
- Giữ format data.js nhất quán (single quotes, trailing comma, indent 8 spaces cho items trong images)
- Nếu product đã có images (không rỗng), hỏi user trước khi ghi đè
