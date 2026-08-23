# Thiết kế các trang

> Tách từ CLAUDE.md (23/08/2026) để giữ CLAUDE.md < 40k ký tự.


### Nav 4-item chuẩn (giống hệt trên 5 trang chính, chỉ khác class `active`)

```html
<nav class="nav" id="navMenu">
    <ul class="nav-menu">
        <li><a href="index.html" class="active">Trang chủ</a></li>
        <li><a href="thiep-online.html">Mẫu thiệp</a></li>
        <li><a href="products.html">Mẫu web</a></li>
        <li><a href="contact.html">Dịch vụ</a></li>
    </ul>
</nav>
```

Nguồn: `index.html` dòng 85–92 (`.nav-menu a:hover, .nav-menu a.active { color: var(--accent); }`). `products.js` còn tự đổi href của link "Dịch Vụ" thành `contact.html#pricing-section` khi đang lọc `type=invitation` (`updateServiceNavLink()`).

### 1. Trang chủ — `index.html` ✅ (invitation-first)
- **Hero** (`.home-hero`): badge "THIỆP CƯỚI ONLINE" + h1 "Thiệp Cưới Online **Sang Trọng**" (gradient `--gold-gradient`) + mô tả "giao trong 24h, chỉ từ 150.000đ" + CTA "Xem mẫu thiệp" (`.btn-terracotta` → `thiep-online.html`) + "Xem bảng giá" (`.btn-gold-outline` → `contact.html#pricing-section`) + 4 chip (Giao 24h / RSVP realtime / QR mừng cưới / 100+ mẫu thiệp) + visual **phone-frame mockup** (`.phone-frame` xoay 4 slide ảnh mobile thiệp)
- **Mẫu Thiệp Nổi Bật** (`.templates`): slider render từ `getSliderProducts()` — 6 thiệp mới nhất theo priority
- **Danh Mục Thiệp** (`.home-categories`): 3 card link `thiep-online.html?category=wedding` / `?category=other&search=...` / `?category=other`
- **Tính Năng Thiệp Cưới** (`.home-features`): 8 feature card (Countdown, RSVP, Lời chúc realtime, QR mừng cưới, Bản đồ, Nhạc nền, Cá nhân hoá tên khách, Thêm vào lịch)
- **Bảng Giá Thiệp Cưới** (`#pricing-section` → `#homePricingGrid`): render `INVITATION_PRICING` bằng inline script
- **Quy Trình 4 Bước** (`.home-process`)
- **Web strip** (`.home-web-strip`): dải nhỏ demoted cuối trang — "Bạn cần website cho doanh nghiệp?" → link `products.html` + `contact.html#web-design`
- **Footer**: 4 cột, giống các trang khác

### 2. Catalog thiệp — `thiep-online.html` ✅ (flagship)
- Dùng **chung** `assets/js/products.js` + `data.js` với `products.html`, nhưng force `type=invitation` (ẩn type filter, chỉ hiện category `wedding`/`other`), `perPage = 16` (khác 9 của `products.html`) — xem `render()` trong `products.js`
- Hero `.products-hero` (gradient text riêng) + search debounce 300ms
- Grid 3 cột, card → `product-detail.html?id=X`, ảnh ưu tiên `mobileView` (phone-view) cho invitation
- Sub-section tĩnh cuối trang: mô tả thiệp, "Các Loại Thiệp", "Tại Sao Chọn Templexa"
- Product quick-view popup (`#productPopup`) dùng chung code với `products.html`

### 3. Kho mẫu Web & Google Sheet — `products.html` ✅
- **KHÔNG còn thiệp mời**: `products.js` có `excludeInvitation()` filter `p.type !== 'invitation'` + ẩn tab "Thiệp mời" khỏi type filter + ẩn category `wedding`/`other` (chỉ khi `pathname.includes('products.html')`, không đụng `thiep-online.html`/`products-admin.html`)
- Legacy redirect: `?type=invitation` → `thiep-online.html`; `?category=wedding|other` → `thiep-online.html?category=X`
- Hero radial-gradient bg, gradient text (`.products-hero .gradient-text`), search debounce 300ms
- Filters flexbox, category + type, active `var(--accent)`
- Grid 3 cột, card ảnh + badge + tên + danh mục
- Phân trang: **9 items/page**

### 4. Chi tiết sản phẩm — `product-detail.html` ✅ (branch theo `product.type`)
- Nếu `type === 'invitation'`: thêm class `.invitation-theme` lên `<body>`, gallery dạng **phone-frame** (`.detail-gallery-invitation`, `.detail-phone-frame`), badge giá cố định **"Từ 150.000đ"**, nút CTA "Đặt thiệp này" (mở modal lead) / "Xem demo" / "Xem báo giá" (→ `contact.html#pricing-section`) / "Sao chép link", **sticky mobile CTA** `#detailMobileCta` (chỉ hiện mobile)
- Nếu `website`/`google-sheet`: layout cũ — badge giá, "Dùng ngay", "Xem demo", features list, "Yêu cầu tùy chỉnh"
- **Related products**: 4 card cùng `category` (`getRelatedProducts`)
- **Modal nhận mẫu/đặt thiệp**: title đổi động — `Đặt thiệp: {name}` cho invitation
- **Modal thành công**: icon check + message
- Form data: `{ email, name, phone, reference: window.location.href, service: '', note: '', status: 'submit' }`
- JSON-LD `#productSchema` cập nhật dynamic; `offers.price = '150000'` (VND) khi `type === 'invitation'`

### 5. Dịch vụ — `contact.html` ✅ (2 khối báo giá)
- **Hero** (`.contact-hero`)
- **`#pricing-section`** (mặc định, flagship): render `INVITATION_PRICING` vào `#pricingGrid` — 3 gói **Basic 150.000đ** / **Premium 199.000đ** (highlighted, badge "PHỔ BIẾN NHẤT") / **Custom Liên hệ**
  - Sub-section "Mỗi thiệp cưới đều có": 12 feature card (`.svc-feat-grid`)
  - Sub-section "Thắc mắc thường gặp": 5 câu FAQ (`<details class="svc-faq-item">`) + `FAQPage` JSON-LD
- **Quy Trình 4 Bước** (`.process-section`)
- **Form tư vấn** (`#contactForm` → `#consultForm`): submit `submitToGoogleSheet()`, gộp `invitationType` (nếu có) vào `note`
- **`#web-design`** (section riêng cuối trang, id anchor): "Thiết Kế Website Theo Yêu Cầu" → render `PRICING` (4 gói web cũ BASIC/PRO/PREMIUM/CUSTOM) vào `#webPricingGrid` (`.pricing-grid-compact`)
- `contact.js`: `renderPricingGrid()` render cả 2 grid, `planRegistry` map `planId → {plan, grid}` để `?service=` resolve đúng cả 2 bộ id (`thiep-basic/thiep-pro/thiep-custom` và `basic/pro/premium/custom`)

### Trang phụ
- `bang-gia-thiep-cuoi.html`: **chỉ còn là stub redirect** (`<meta name="robots" content="noindex">` + `<meta http-equiv="refresh">` + `location.replace()`) → `contact.html#pricing-section`. Không còn UI/nội dung thật.

