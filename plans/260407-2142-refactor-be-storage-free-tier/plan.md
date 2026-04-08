# Templexa → Full-stack (BE + Storage) trên Free Tier

**Date:** 2026-04-07
**Mode:** fast
**Status:** 📦 BACKLOG (refactor — để dành làm sau)
**Type:** refactor

## Mục tiêu
Chuyển Templexa từ static site (GitHub Pages, data.js cứng) → full-stack với:
1. **Backend API** quản lý products, pricing, form submissions, wedding orders
2. **Storage riêng** cho ảnh/nhạc/video (hiện ~242MB, sẽ tăng theo thiệp cưới mới)
3. **Database** thay cho `data.js` hardcoded
4. **Toàn bộ free tier**, không cần thẻ tín dụng nếu có thể

## Stack được chọn: Cloudflare full-stack

| Layer | Service | Free tier | Lý do |
|---|---|---|---|
| Hosting | **Cloudflare Pages** | Unlimited bandwidth, 500 builds/tháng | Thay GitHub Pages, deploy từ git |
| Backend | **Cloudflare Workers** | 100k requests/ngày, 10ms CPU | Đủ cho traffic hiện tại |
| Storage | **Cloudflare R2** | 10GB storage, **0$ egress** | Quan trọng cho media-heavy |
| Database | **Cloudflare D1** | 5GB, 5M reads/ngày | SQLite, đủ cho 220 sản phẩm |
| Auth (admin) | **Workers + JWT** đơn giản | — | Không cần Auth0 |

**Không dùng:** Firebase (cần card), Render (ngủ), Vercel (egress giới hạn).

## Phases

| # | Phase | File | Status |
|---|---|---|---|
| 1 | Setup Cloudflare account + tools | [phase-01-setup.md](phase-01-setup.md) | ☐ |
| 2 | Migrate static assets → R2 | [phase-02-r2-migration.md](phase-02-r2-migration.md) | ☐ |
| 3 | Schema D1 + import data.js | [phase-03-d1-schema.md](phase-03-d1-schema.md) | ☐ |
| 4 | Workers API (products, forms) | [phase-04-workers-api.md](phase-04-workers-api.md) | ☐ |
| 5 | Frontend refactor (fetch API) | [phase-05-frontend-refactor.md](phase-05-frontend-refactor.md) | ☐ |
| 6 | Admin auth + upload | [phase-06-admin-upload.md](phase-06-admin-upload.md) | ☐ |
| 7 | Deploy Pages + cutover DNS | [phase-07-deploy-cutover.md](phase-07-deploy-cutover.md) | ☐ |

## Dependencies
- Tài khoản Cloudflare (free, không cần card)
- `wrangler` CLI (npm)
- Domain hiện tại trong `CNAME` → trỏ về Pages

## Rủi ro chính
- **Workers free 100k req/ngày**: cache aggressive ở Pages/CDN để giảm hit
- **D1 chưa GA cho production cao tải**: hiện tại OK, theo dõi
- **Wedding builder** (`wedding/{khach}/`) đang là static HTML — chưa rõ có chuyển sang DB-driven hay giữ static-gen
- **`protect-wedding.js` workflow** có thể conflict với deploy mới — xem lại

## Out of scope
- Video streaming/transcoding (chỉ store/serve)
- Multi-tenant, i18n
- Payment integration

## Câu hỏi cần xác nhận
1. Wedding builder (`wedding/{khach}/`) — giữ static-gen rồi push file lên R2, hay làm DB-driven full?
2. Form submissions hiện gửi Google Sheets — có muốn chuyển sang D1 luôn hay giữ song song?
3. Có cần admin login (multi-user) hay chỉ 1 chủ shop dùng password đơn giản?
4. Domain hiện tại có muốn giữ nguyên hay đổi?
