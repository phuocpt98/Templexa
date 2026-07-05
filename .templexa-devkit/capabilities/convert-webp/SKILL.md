---
name: convert-webp
description: "Chuyển đổi ảnh PNG/JPG → WebP và cập nhật references trong code."
---

Chuyển đổi ảnh PNG/JPG → WebP và cập nhật references trong code.

Argument: $ARGUMENTS (đường dẫn thư mục, ví dụ: `./products/Web/Onepage/`). Nếu trống → scan toàn bộ `products/` + `assets/images/`.

## Quy trình

### Bước 1: Chuyển đổi ảnh
Chạy script convert-webp.js:
```
node scripts/convert-webp.js $ARGUMENTS
```
- Chuyển PNG/JPG → WebP (quality 80)
- Nếu WebP lớn hơn gốc → giữ gốc
- Nếu WebP nhỏ hơn → xóa gốc, giữ WebP

### Bước 2: Cập nhật references
Chạy script update-webp-refs.js:
```
node scripts/update-webp-refs.js
```
- Cập nhật `.png`/`.jpg` → `.webp` trong data.js, style.css, 4 file HTML
- Không đụng đến favicon, SVG, external URLs

### Bước 3: Verify
Kiểm tra còn reference PNG/JPG nào trong data.js không (ngoại trừ favicon/external URL):
```
grep -n "\.png\|\.jpg\|\.jpeg" assets/js/data.js | head -20
```

### Bước 4: Report
Báo cáo tóm tắt:
- Số file đã chuyển đổi
- Dung lượng tiết kiệm
- Số references đã cập nhật
- Còn reference nào chưa xử lý không
