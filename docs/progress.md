# Trạng thái tiến độ

> Tách từ CLAUDE.md (23/08/2026) để giữ CLAUDE.md < 40k ký tự.


### Redesign 2026-07 (nhánh `redesign-thiep-online`, Phase 0–7)

| Hạng mục | File | Trạng thái |
|----------|------|-----------|
| Design system invitation-first ban đầu (từng đổi sang "Wedding Elegant" gold/terracotta, **sau đó revert lại Indigo/Purple** — xem Design System phía trên) | `assets/css/style.css` `:root` + `[data-theme=dark]` | ✅ Hoàn thành (đã revert palette) |
| Trang chủ invitation-first (hero phone-frame, slider, categories, features, pricing, process, web-strip) | `index.html` | ✅ Hoàn thành |
| Catalog thiệp flagship | `thiep-online.html` | ✅ Hoàn thành |
| Kho web & Google Sheet — exclude invitation + legacy redirect | `products.html` + `products.js` | ✅ Hoàn thành |
| Chi tiết sản phẩm — branch invitation vs website/google-sheet | `product-detail.html` + `product-detail.js` | ✅ Hoàn thành |
| Dịch vụ — báo giá kép (thiệp `#pricing-section` + web `#web-design`) | `contact.html` + `contact.js` | ✅ Hoàn thành |
| Bảng giá thiệp riêng → stub redirect | `bang-gia-thiep-cuoi.html` | ✅ Hoàn thành (deprecated) |
| Nav 4-item chuẩn (Trang chủ/Mẫu thiệp/Mẫu web/Dịch vụ) | 5 trang chính | ✅ Hoàn thành |
| `INVITATION_PRICING` + `getProductsSorted()` invitation-first | `assets/js/data.js` | ✅ Hoàn thành |
| Sitemap ưu tiên thiệp (0.9) | `sitemap.xml` | ✅ Hoàn thành |

### SEO/AEO & catalog phong phú hoá (2026-08)

| Hạng mục | File | Trạng thái |
|----------|------|-----------|
| Migrate `assets/data/invitation.json` → inline `data.js` (`data-loader.js` trả thẳng product cho invitation) | `assets/js/data.js`, `assets/js/data-loader.js` | ✅ Hoàn thành |
| Field mới cho invitation: `style`, `event`, `featured`, `variants`, `mobileView`; `priority` chỉ còn là bucket; `status` bỏ `'new'` (thay bằng `isNewProduct()`) | `assets/js/data.js` | ✅ Hoàn thành |
| Sub-filter chip theo `style`/`event` + variant chips | `thiep-online.html`, `product-detail.html` | ✅ Hoàn thành |
| Trang FAQ/AEO `cau-hoi-thuong-gap.html` + nhúng FAQ vào `thiep-online.html`/`index.html` | `scripts/build-faq.js`, `assets/data/faq.json` | ✅ Hoàn thành |
| `llms.txt` / `llms-full.txt`, `robots.txt` mở cho bot AI, `sitemap.xml` tự sinh (234 URL) | root, `scripts/build-sitemap.js` | ✅ Hoàn thành |
| `scripts/shoot-mobile.js` — chụp mobile shots (`cover/open/sec-N/full`) cho `mobileView` + `images[]` | `scripts/shoot-mobile.js` | ✅ Hoàn thành |

### Nền tảng kế thừa

| Trang / Tính năng | File | Trạng thái |
|-------|------|-----------|
| Dark mode | CSS variables + `main.js` | ✅ Hoàn thành |
| Responsive | 3 breakpoints (1024, 768, 480) | ✅ Hoàn thành |
| Mobile menu | Hamburger + slide-in + overlay | ✅ Hoàn thành |
| Modal nhận mẫu / đặt thiệp | `product-detail.js` | ✅ Hoàn thành |
| Modal thành công | `product-detail.js` | ✅ Hoàn thành |
| Footer đồng bộ | 7 trang giống nhau (xem Ghi chú quan trọng) | ✅ Hoàn thành |
| SEO meta tags | Tất cả trang (description, OG, Twitter Card, JSON-LD) | ✅ Hoàn thành |

