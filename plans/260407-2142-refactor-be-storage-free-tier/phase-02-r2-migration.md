# Phase 02 — Migrate assets → R2

## Mục tiêu
Upload toàn bộ ảnh/nhạc/video (~242MB) lên R2, giữ nguyên path để dễ rewrite.

## Files
- `products/**/*.{webp,png,jpg,mp3,mp4}` (~241MB)
- `assets/images/**` (~744KB)
- `products/shared/music/**` (44MB)

## Steps
1. Viết script `scripts/upload-to-r2.js` dùng `wrangler r2 object put` hoặc S3 SDK
2. Map: local path `products/Web/...` → R2 key `products/Web/...` (giữ y nguyên)
3. Upload batch (parallel limit 10), skip nếu hash trùng
4. Bật **R2 public bucket** hoặc tạo Worker proxy `assets.templexa.com/*` → R2
5. Test: `curl https://assets.templexa.com/products/Web/Onepage/.../screen.webp`

## Path strategy
- Custom domain R2: `https://cdn.templexa.com/<key>`
- Trong DB lưu **relative key** (không lưu domain) → đổi CDN dễ

## Done when
- 100% file lên R2, đếm khớp local
- Public URL serve được ảnh
- Tổng dung lượng < 10GB ✅ (hiện 242MB)

## Risks
- File tên tiếng Việt + space → encode URL
- Music MP3 lớn → upload chậm, retry
