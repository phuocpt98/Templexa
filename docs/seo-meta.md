# SEO & Meta Tags

> Tách từ CLAUDE.md (23/08/2026) để giữ CLAUDE.md < 40k ký tự.


Mỗi trang HTML đều có đầy đủ SEO tags trong `<head>`:

```html
<!-- Cơ bản -->
<meta name="description" content="Mô tả riêng cho từng trang">
<meta name="keywords" content="từ khóa SEO">
<meta name="author" content="Templexa Studio">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<meta name="theme-color" content="#6366F1">
<link rel="canonical" href="https://templexa.vn/{page}">

<!-- Open Graph (Facebook, Zalo, ...) -->
<meta property="og:type" content="website">
<meta property="og:title" content="Tiêu đề trang">
<meta property="og:description" content="Mô tả ngắn">
<meta property="og:image" content="https://templexa.vn/assets/images/og-image.png">
<meta property="og:url" content="https://templexa.vn/{page}">
<meta property="og:site_name" content="Templexa">
<meta property="og:locale" content="vi_VN">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Tiêu đề trang">
<meta name="twitter:description" content="Mô tả ngắn">
<meta name="twitter:image" content="https://templexa.vn/assets/images/og-image.png">
```

Domain thực đã dùng: `https://templexa.vn/` (đã thay xong `phuocpt98.github.io/Templexa/` trên 5 trang chính; riêng `bang-gia-thiep-cuoi.html` — stub redirect — vẫn còn canonical trỏ domain GitHub Pages cũ, không ảnh hưởng vì `noindex`).

### Meta description từng trang

| Trang | Title | Description |
|-------|-------|-------------|
| `index.html` | Templexa — Thiệp Cưới Online Sang Trọng, Giao Trong 24h | Thiệp cưới online sang trọng, thiết kế riêng cho ngày trọng đại. RSVP, QR mừng cưới, lời chúc realtime. Giao trong 24h, chỉ từ 150.000đ. |
| `thiep-online.html` | Thiệp Cưới Online Đẹp — Mẫu Thiệp Mời Cưới, Sinh Nhật, Thôi Nôi \| Templexa | Kho thiệp cưới online đẹp, thiệp mời cho sinh nhật, thôi nôi — nhạc nền, RSVP, QR mừng cưới. Hơn 100 mẫu, demo trực tiếp, giao trong 24h. |
| `products.html` | Mẫu Web & Google Sheet — Templexa | Kho giao diện website và Google Sheet tại Templexa. Lọc theo danh mục, tìm kiếm nhanh, xem demo trực tiếp. |
| `product-detail.html` | Chi Tiết Sản Phẩm - Templexa | Gallery ảnh, tính năng, demo trực tiếp và yêu cầu tùy chỉnh (title/description được `product-detail.js` ghi đè động theo sản phẩm) |
| `contact.html` | Dịch Vụ & Báo Giá Thiệp Cưới Online — Từ 150.000đ \| Templexa | Báo giá thiệp cưới online — 3 gói Basic/Premium/Custom từ 150.000đ. Countdown, nhạc nền, gallery, RSVP, lời chúc realtime. Giao trong 24h. |
| `cau-hoi-thuong-gap.html` | (sinh từ `scripts/build-faq.js`) | 35 câu hỏi thường gặp, 7 nhóm — trang AEO chuyên biệt cho AI crawler/featured snippet |

### Structured Data (JSON-LD)

Mỗi trang có `<script type="application/ld+json">` phù hợp:

| Trang | Schema Type | Nội dung |
|-------|-------------|----------|
| `index.html` | `Organization` + `WebSite` | Tổ chức (logo, email, `telephone: +84334884895`, `contactPoint` Zalo, `areaServed: VN`, `hasOfferCatalog` Basic 150.000đ/Premium 199.000đ) + `WebSite` với `SearchAction` → `thiep-online.html?search=` |
| `thiep-online.html` | `CollectionPage` + `BreadcrumbList` | Catalog thiệp với breadcrumb |
| `products.html` | `CollectionPage` + `BreadcrumbList` | Trang kho web/Google Sheet với breadcrumb |
| `product-detail.html` | `Product` | **Dynamic** — `product-detail.js` cập nhật `#productSchema` với name, description, images, rating, offers (`price: '150000'` VND khi invitation) |
| `contact.html` | `Service` + `OfferCatalog` + `FAQPage` | 3 gói thiệp (Basic/Premium/Custom) trong `OfferCatalog`; `FAQPage` cho 5 câu hỏi thường gặp |
| `cau-hoi-thuong-gap.html` | `FAQPage` + `BreadcrumbList` + `WebPage` | Sinh tự động từ `faq.json`, không sửa tay |

**product-detail.js** cũng cập nhật dynamic: `document.title`, `meta[description]`, `og:title`, `og:description`, `og:image` khi load sản phẩm.

