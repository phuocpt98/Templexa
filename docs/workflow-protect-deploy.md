# Quy Trình Protect & Deploy Thiệp Cưới

## Tổng quan

2 branch git:
- `dev` — code GỐC (đọc được, sửa được) → dùng để **làm việc** trên mọi máy
- `main` — code ĐÃ PROTECT (obfuscate, domain lock, anti-copy) → dùng để **deploy** GitHub Pages

## Branch nào làm gì

| Branch | Chứa gì | Dùng khi |
|--------|---------|----------|
| `dev` | Code gốc, dễ đọc | Sửa code, thêm thiệp mới, debug |
| `main` | Code đã protect | Deploy lên GitHub Pages |

## Quy trình hàng ngày

### 1. Làm việc (sửa code, thêm thiệp)

```bash
git checkout dev
# Sửa code bình thường
git add -A
git commit -m "feat: thêm thiệp #222"
git push origin dev
```

### 2. Deploy (khi muốn cập nhật website)

```bash
git checkout main
git merge dev
node scripts/protect-wedding.js
git add -A
git commit -m "deploy: protect wedding + cập nhật"
git push origin main
# → GitHub Pages tự deploy từ main
```

### 3. Quay lại làm việc

```bash
git checkout dev
```

## Script protect-wedding.js

### Protect tất cả thiệp (id >= 152)

```bash
node scripts/protect-wedding.js
```

### Protect 1 thiệp cụ thể

```bash
node scripts/protect-wedding.js gen_221
```

### Khôi phục code gốc (restore)

```bash
node scripts/protect-wedding.js --restore
node scripts/protect-wedding.js --restore gen_221
```

## 3 lớp bảo vệ

### Layer 1: Domain Lock
- Code chỉ chạy trên domain cho phép: `phuocpt98.github.io`, `templexa.com`, `localhost`
- Copy về domain khác → hiện "Thiệp chỉ có thể xem tại website chính thức"
- Cấu hình domain: sửa `ALLOWED_DOMAINS` trong `scripts/protect-wedding.js`

### Layer 2: Anti-Copy
- Chặn: right-click, Ctrl+S, Ctrl+U, F12, Ctrl+Shift+I, drag ảnh, select text
- Form RSVP vẫn cho phép nhập text (input/textarea)

### Layer 3: Watermark ẩn
- Mỗi thiệp có `data-t` chứa base64: `Templexa|folder_name|date|phuocpt98`
- Nếu bị copy → decode base64 → chứng minh bản quyền

## Lưu ý quan trọng

- **LUÔN làm việc trên branch `dev`** — không sửa code trực tiếp trên `main`
- **File backup** (`index.dev.html`, `code.dev.html`) đã gitignore — không push lên git
- **Protect chỉ áp dụng cho thiệp cưới** (products/Invitation/Wedding/) — không ảnh hưởng trang chủ hay sản phẩm khác
- **Thiệp id < 152** không bị protect (sản phẩm web cũ, không cần bảo vệ)
- **Sản phẩm preview** trên website vẫn hoạt động bình thường sau protect

## Thêm domain mới

Mở `scripts/protect-wedding.js`, sửa mảng:

```javascript
const ALLOWED_DOMAINS = [
  'phuocpt98.github.io',
  'templexa.com',
  'www.templexa.com',
  'localhost',
  '127.0.0.1',
  // Thêm domain mới ở đây
];
```

## Cài đặt trên máy mới

```bash
git clone https://github.com/phuocpt98/Templexa.git
cd Templexa
git checkout dev          # Chuyển sang branch dev để làm việc
npm install               # Cài dependencies (sharp, puppeteer)
```

## Troubleshooting

### Thiệp không hiển thị sau protect
- Kiểm tra domain có trong `ALLOWED_DOMAINS` không
- Thử mở trên `localhost` (luôn cho phép)

### Muốn sửa thiệp đã protect trên main
- KHÔNG sửa trực tiếp trên main
- Chuyển sang `dev`, sửa, rồi merge lại `main` + protect

### Quên protect trước khi push main
- Pull lại, chạy `node scripts/protect-wedding.js`, commit + push lại

### Máy Windows không có Node.js
- Cài Node.js: https://nodejs.org/
- Sau đó chạy lệnh bình thường
