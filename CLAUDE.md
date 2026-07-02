# Templexa

Website bán thiệp cưới/sự kiện online — **invitation-first** (`thiep-online.html` là catalog flagship, `contact.html#pricing-section` là bảng giá chính) — kèm kho mẫu website & Google Sheet phụ trợ (`products.html`). Ngôn ngữ giao diện: Tiếng Việt.

## Cấu trúc dự án

```
Templexa/
├── index.html                  # Trang chủ (invitation-first: hero phone-frame, slider, pricing thiệp)
├── thiep-online.html           # Catalog thiệp cưới/sự kiện — flagship, dùng chung products.js (force type=invitation)
├── products.html               # Kho mẫu Web & Google Sheet (KHÔNG còn thiệp mời)
├── product-detail.html         # Chi tiết sản phẩm (branch UI theo type: invitation | website | google-sheet)
├── contact.html                # Dịch vụ & Báo giá — 2 khối: #pricing-section (thiệp) + #web-design (web)
├── products-admin.html         # Trang admin quản lý sản phẩm
├── bang-gia-thiep-cuoi.html    # Stub redirect (noindex) → contact.html#pricing-section
├── thu-vien-hieu-ung.html      # Thư viện hiệu ứng / animations demo
├── preview.html                # Preview tool
├── assets/
│   ├── css/style.css           # Stylesheet chính (~4700 dòng)
│   ├── js/
│   │   ├── data.js             # Data products, categories, pricing, helpers
│   │   ├── data-loader.js      # Loader dynamic data
│   │   ├── main.js             # Dark mode, hamburger, slider, scroll
│   │   ├── products.js         # Search, filter, grid, phân trang
│   │   ├── product-detail.js   # Detail render, gallery, modals
│   │   ├── products-admin.js   # Admin CRUD UI
│   │   └── contact.js          # Pricing render, form submit
│   └── images/                 # Logo, icons, backgrounds (đa số WebP)
├── products/                   # folder sản phẩm (233 active trong data.js)
│   ├── Web/
│   │   ├── E-commerce/         # 36
│   │   ├── Education/          # 31
│   │   ├── Onepage/            # 26
│   │   └── Portfolio/          # 25
│   ├── Invitation/
│   │   ├── Wedding/            # 72 thiệp cưới
│   │   └── Other/              # 51 (sinh nhật, thôi nôi, kỷ niệm, tỏ tình, ...)
│   ├── Google-sheet/
│   │   └── E-commerce/         # 5
│   └── shared/                 # Tài nguyên dùng chung
│       ├── animations.css
│       ├── fonts/  images/  music/  new/
│       ├── wedding/            # README, names.js, scripts.js, styles.css,
│       │                       # wedding-order-form.html, wishes-api.js
│       └── wedding-data.js
├── wedding/                    # Wedding builder
│   ├── config.js
│   ├── template.html
│   └── {khach-hang}/           # Thiệp riêng từng khách
├── scripts/                    # Node scripts
│   ├── convert-webp.js         # PNG/JPG → WebP
│   ├── update-webp-refs.js     # Cập nhật references
│   └── protect-wedding.js      # Bảo vệ thiệp cưới khi merge
├── docs/
│   ├── SYSTEM.md               # AI context entry-point
│   ├── products.md             # Danh sách sản phẩm
│   ├── wedding-tag-matrix.md   # Tag matrix thiệp cưới (auto-gen)
│   ├── workflow-protect-deploy.md
│   └── memory/                 # Feedback files cho AI
├── plans/                      # Plans + reports
└── package.json                # npm scripts (convert-webp, ...)
```

**Tổng số sản phẩm (data.js, `isPublic !== false`):** 233 (Invitation 113 + Website 115 + Google-sheet 5).

## Tech Stack

- HTML/CSS/JS thuần (Vanilla) — không dùng framework
- Font: Playfair Display (display/heading/logo) + Be Vietnam Pro (body) — Google Fonts
- Responsive: dùng `clamp()` và media queries (1024px, 768px, 480px)
- Animations: IntersectionObserver cho scroll animations
- CSS Variables cho dark mode (`--bg-primary`, `--text-primary`, `--accent`, ...)

## Conventions

- Ngôn ngữ giao diện: **Tiếng Việt**
- CSS: BEM-like naming, CSS custom properties cho màu/spacing
- JS: Vanilla ES6+, IIFE pattern cho mỗi module, không dùng thư viện ngoài
- Responsive-first: đảm bảo mọi thay đổi hoạt động trên mobile
- Giữ code đơn giản, dễ đọc
- Không thêm dependency/thư viện mới khi không cần thiết
- Commit message bằng tiếng Việt hoặc tiếng Anh đều được
- **Không dùng inline styles cho màu sắc** — luôn dùng CSS class để hỗ trợ dark mode
- **Mặc định light mode** — chỉ chuyển dark khi user click toggle

## Design System

**"Wedding Elegant"** — palette gold/terracotta thay indigo/purple cũ. Token khai báo `assets/css/style.css` `:root` (dòng ~5–30) + override `[data-theme="dark"]` (dòng ~34–54).

### Bảng màu chính (Gold/Terracotta)

| Variable | Light | Dark | Dùng ở đâu |
|----------|-------|------|-------------|
| `--accent` (gold) | `#A67C2E` | `#D4AF5E` | Nav hover/active, link hover, badge/pill text, border `.btn-gold-outline`, `theme-color` |
| `--accent-dark` | `#8A6524` | `#C09A45` | Hover gold, gradient end |
| `--accent-light` | `#F6EDDA` | `#2E2617` | Nền nhạt cho badge/highlight |
| `--accent-2` (terracotta) | `#C0654B` | `#D98268` | `.btn-terracotta`, `.btn-primary`, CTA "Đặt thiệp này" |
| `--accent-2-dark` | `#A64F38` | `#C56A4F` | Hover terracotta |

### Màu nền & text (CSS Variables)

| Variable | Light | Dark |
|----------|-------|------|
| `--bg-primary` | `#FFFDF8` | `#171310` |
| `--bg-secondary` | `#FAF4EA` | `#221C15` |
| `--bg-tertiary` | `#F3E9D8` | `#2C241A` |
| `--text-primary` | `#2D2418` | `#F3EBDC` |
| `--text-secondary` | `#6B5B45` | `#C6B599` |
| `--text-tertiary` | `#9A8768` | `#8F7F66` |
| `--border-color` | `#E9DDC8` | `#3A3122` |
| `--card-bg` | `#FFFFFF` | `#221C15` |
| `--card-hover-bg` | `#FBF5EA` | `#2C241A` |
| `--input-bg` | `#FFFFFF` | `#221C15` |
| `--input-border` | `#E9DDC8` | `#3A3122` |
| `--header-bg` | `rgba(255,253,248,0.85)` | `rgba(23,19,16,0.85)` |
| `--overlay-bg` | `rgba(45,36,24,0.55)` | `rgba(0,0,0,0.7)` |

### Gradient patterns

| Tên | Giá trị (light) | Dark | Dùng ở đâu |
|-----|-------------------|------|-------------|
| `--gold-gradient` | `linear-gradient(90deg, #C9A24B, #A67C2E)` | `linear-gradient(90deg, #E3C57C, #C9A24B)` | `.logo-text`, `.home-hero-title .gradient-text` |
| `--hero-gradient` | `linear-gradient(135deg, #FAF3E4, #F0E2C9)` | `linear-gradient(135deg, #241C10, #171310)` | Nền `.home-hero` (`.hero` legacy không còn dùng trong HTML) |
| Hero text (legacy `.hero`/`.products-hero`) | `linear-gradient(135deg, #A67C2E, #C0654B 50%, #C9A24B)` | — | `.products-hero .gradient-text` (thiep-online.html, products.html) |
| Contact hero text | `linear-gradient(90deg, #F0E2C9, #E8C98F)` | — | `.contact-hero .gradient-text` |
| Button terracotta | `--accent-2 → --accent-2-dark` (`#C0654B → #A64F38`) | — | `.btn-terracotta:hover`, `.btn-primary` |
| Button gold outline | border/text `var(--accent)`, hover fill `var(--accent)` | — | `.btn-gold-outline` |
| Pricing price highlighted | `linear-gradient(135deg, #C9A24B, #A67C2E)` | — | `.pricing-card.highlighted .pricing-price` |

### Font

- **Display** (`--font-display`): Playfair Display — `h1, h2, h3`, `.logo-text`, `.home-hero-title`
- **Body** (`--font-body`): Be Vietnam Pro — `body`
- Import (Google Fonts): `Be+Vietnam+Pro:wght@300;400;500;600;700` + `Playfair+Display:ital,wght@0,500;0,600;0,700;1,400`
- Logo: `<span class="logo-text">Templexa</span>` (text, gradient `--gold-gradient`) — **không dùng ảnh logo** trong header/footer nữa; `logo.svg`/`logo_v2.svg` chỉ còn tham chiếu trong JSON-LD `Organization.logo`

### Border radius tokens

| Variable | Giá trị | Dùng |
|----------|---------|------|
| `--radius-sm` | `8px` | Input nhỏ, badge |
| `--radius-md` | `14px` | Card, button vuông |
| `--radius-lg` | `22px` | Card lớn, section block |
| `--radius-pill` | `999px` | Button pill (`.btn-terracotta`, `.btn-gold-outline`) |

- Card shadow: `var(--card-shadow)` = `0 4px 18px rgba(90,70,40,0.08)` (dark: `rgba(0,0,0,0.4)`)

## Dark Mode

### Cơ chế hoạt động
- Toggle icon: moon/sun, lưu `localStorage`
- **Mặc định: light mode** — không auto-detect system preference
- Attribute: `[data-theme="dark"]` trên `<html>`
- JS: `main.js` → `setTheme(saved || 'light')`

### Quy tắc khi thêm element mới
1. Nếu dùng CSS variable → tự động hoạt động cả 2 mode
2. Nếu hardcode màu (hex) → **BẮT BUỘC** thêm `[data-theme="dark"]` override
3. Pattern dark override cho background nhạt: `rgba(accent, 0.15)` thay vì pastel hex
4. Pattern dark override cho text đậm: dùng `var(--text-primary)` hoặc `var(--text-secondary)`
5. Form messages: dùng CSS class `.form-msg-success` / `.form-msg-error` (không inline style)

### Cấu trúc dark mode trong CSS
```
/* style.css layout: */
1. CSS Variables (light)
2. [data-theme="dark"] variables
3. ... component styles ...
4. Scattered dark overrides (footer, products-hero, detail-page, pricing, target)
5. ★ DARK MODE — ALL HARDCODED OVERRIDES (block tập trung trước responsive)
   - Homepage: hero-badge, h1, services, templates, benefit-card, slider
   - Products: filter-btn, product-card-image, product-badge
   - Product detail: price-badge, sidebar-features, modal-icon
   - Contact: pricing-discount, pricing-card h3, process-grid, target-card svg
   - Form messages: .form-msg-success, .form-msg-error
6. ADDITIONAL RESPONSIVE (@media queries)
```

## Responsive Design

### Breakpoints

| Breakpoint | Áp dụng |
|------------|---------|
| `1024px` | Tablet: 2 cột cho products/pricing/process, detail layout 1 cột, contact CTA stack |
| `768px` | Mobile: 1 cột cho products/pricing/target, pricing min-heights auto, CTA padding giảm |
| `480px` | Small mobile: process 1 cột + ẩn connecting line, related 1 cột, contact hero buttons stack |

### Grid responsive summary

| Grid | Desktop | 1024px | 768px | 480px |
|------|---------|--------|-------|-------|
| `.services-grid` | 4 cols | 2 cols | 1 col | — |
| `.benefits-grid` | 4 cols | 2 cols | 1 col | — |
| `.products-grid` | 3 cols | 2 cols | 1 col | — |
| `.footer-grid` | 4 cols | 2 cols | 2 cols | 1 col |
| `.pricing-grid` | 4 cols | 2 cols | 1 col | — |
| `.related-grid` | 4 cols | 2 cols | 2 cols | 1 col |
| `.process-grid` | 4 cols | 2 cols | — | 1 col |
| `.contact-cta-grid` | 2 cols | 1 col | — | — |
| `.target-grid` | 2 cols | — | 1 col | — |

### Responsive notes
- Dùng `clamp()` cho font-size, padding, gap → fluid giữa các breakpoints
- Pricing: `min-height` trên features/desc bị reset `auto` ở 768px
- Contact CTA: `.contact-cta-left` height auto ở mobile, `.contact-direct` dùng `margin-top: 24px` thay `auto`

## Thiết kế các trang

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

## Trạng thái tiến độ

### Redesign 2026-07 (nhánh `redesign-thiep-online`, Phase 0–7)

| Hạng mục | File | Trạng thái |
|----------|------|-----------|
| Design system "Wedding Elegant" (gold/terracotta, Playfair Display + Be Vietnam Pro) | `assets/css/style.css` `:root` + `[data-theme=dark]` | ✅ Hoàn thành |
| Trang chủ invitation-first (hero phone-frame, slider, categories, features, pricing, process, web-strip) | `index.html` | ✅ Hoàn thành |
| Catalog thiệp flagship | `thiep-online.html` | ✅ Hoàn thành |
| Kho web & Google Sheet — exclude invitation + legacy redirect | `products.html` + `products.js` | ✅ Hoàn thành |
| Chi tiết sản phẩm — branch invitation vs website/google-sheet | `product-detail.html` + `product-detail.js` | ✅ Hoàn thành |
| Dịch vụ — báo giá kép (thiệp `#pricing-section` + web `#web-design`) | `contact.html` + `contact.js` | ✅ Hoàn thành |
| Bảng giá thiệp riêng → stub redirect | `bang-gia-thiep-cuoi.html` | ✅ Hoàn thành (deprecated) |
| Nav 4-item chuẩn (Trang chủ/Mẫu thiệp/Mẫu web/Dịch vụ) | 5 trang chính | ✅ Hoàn thành |
| `INVITATION_PRICING` + `getProductsSorted()` invitation-first | `assets/js/data.js` | ✅ Hoàn thành |
| Sitemap ưu tiên thiệp (0.9) | `sitemap.xml` | ✅ Hoàn thành |

### Nền tảng kế thừa

| Trang / Tính năng | File | Trạng thái |
|-------|------|-----------|
| Dark mode | CSS variables + `main.js` | ✅ Hoàn thành |
| Responsive | 3 breakpoints (1024, 768, 480) | ✅ Hoàn thành |
| Mobile menu | Hamburger + slide-in + overlay | ✅ Hoàn thành |
| Modal nhận mẫu / đặt thiệp | `product-detail.js` | ✅ Hoàn thành |
| Modal thành công | `product-detail.js` | ✅ Hoàn thành |
| Footer đồng bộ | 5 trang chính giống nhau | ✅ Hoàn thành |
| SEO meta tags | 5 trang (description, OG, Twitter Card, JSON-LD) | ✅ Hoàn thành |

## Data & API

### INVITATION_PRICING structure (data.js) — bảng giá chính (thiệp)

3 gói: `thiep-basic` (150.000đ), `thiep-pro` (name: "Premium", 199.000đ, `highlighted: true`), `thiep-custom` (Liên hệ). Render vào `#pricingGrid` (`contact.html`) và `#homePricingGrid` (`index.html`, inline script).

```javascript
{
    id: 'thiep-pro',                // thiep-basic | thiep-pro | thiep-custom
    name: 'Premium',
    price: '199.000đ',
    originalPrice: '250.000đ',
    showOriginalPrice: true,
    discount: '-20%',
    description: '...',
    features: [
        'Chọn 1 trong 20+ mẫu thiệp đẹp',
        { text: 'Hiển thị lời chúc bay (bong bóng)', disabled: true },  // object = tính năng bị khoá ở gói thấp hơn
        // ...
    ],
    highlighted: true,              // true = card nổi bật + badge "PHỔ BIẾN NHẤT"
}
```

### PRICING structure (data.js) — bảng giá phụ (web)

4 gói web cũ (BASIC 699K / PRO 2.999K highlighted / PREMIUM 8.000K / CUSTOM Liên hệ). **Chỉ còn render ở `#webPricingGrid`** (`contact.html` section `#web-design`) — không còn xuất hiện trên trang chủ.

```javascript
{
    id: 'pro',
    name: 'PRO',
    price: '2.999.000đ',          // Giá công khai
    originalPrice: '5.000.000đ',   // Giá gốc
    showOriginalPrice: true,        // true = hiển thị gạch ngang, false = ẩn (giữ placeholder)
    discount: '-40%',               // Badge giảm giá ('' = không hiện)
    description: '...',
    features: ['...'],              // Mảng string hoặc { text, disabled }
    highlighted: true,              // true = card nổi bật + badge "PHỔ BIẾN NHẤT"
}
```

### PRODUCTS structure (data.js)

```javascript
{
    id: 1,
    name: 'Tên sản phẩm',
    slug: 'ten-san-pham',
    description: 'Mô tả...',
    category: 'onepage',           // onepage | e-commerce | wedding | other | portfolio | education
    type: 'website',               // website | google-sheet | invitation
    tags: ['tag1', 'tag2'],
    price: 'free',                 // 'free' hoặc giá
    images: ['./products/.../screen.png', './products/.../Screenshot_1.jpg', ...],  // screen.png luôn đầu tiên
    thumbnail: './products/.../screen.png',
    demoUrl: './products/.../index.html',
    features: ['Tính năng 1', 'Tính năng 2', 'Tính năng 3'],
    status: 'new',                 // new | hot | bestseller | trending | (trống)
    priority: 1,
    downloads: 5,                 // random 1–10
    rating: 4.8,                   // random 4.7–4.9
    showInSlider: true,            // ⚠ Field vẫn tồn tại nhưng getSliderProducts() KHÔNG dùng nữa (xem Helper functions)
    isPublic: true,                // false = ẩn khỏi products.html/thiep-online.html (vẫn hiện ở products-admin.html)
    updatedAt: '2025-02-17',
}
```

### API Input Format

| Field | Form Tư Vấn (`contact.html`) | Form Nhận Mẫu (`product-detail.html`) |
|-------|------------------------------|---------------------------------------|
| `email` | Input email (required) | Input email (required) |
| `name` | — | Input họ tên |
| `phone` | Input SĐT | Input SĐT |
| `reference` | Input mẫu tham khảo | Auto: `window.location.href` |
| `service` | Select gói dịch vụ | Để trống `''` |
| `note` | Textarea ghi chú | Để trống `''` |
| `status` | Auto: `"tư vấn"` | Auto: `"submit"` |

### Helper functions (data.js)

| Function | Mô tả |
|----------|-------|
| `getSliderProducts()` | 6 sản phẩm `type: 'invitation'` mới nhất theo `priority`/`id` (`isPublic !== false`) — **không còn dùng `showInSlider`** |
| `getProductById(id)` | Tìm product theo ID |
| `getProductBySlug(slug)` | Tìm product theo slug |
| `getProductsSorted()` | Sort: `type` invitation → website → google-sheet trước, rồi fullpage-demo, `priority`, `id` (`isPublic !== false`) |
| `filterProducts({ category, type, search })` | Lọc products (gọi trên `getProductsSorted()`) |
| `paginateProducts(products, page, perPage)` | Phân trang — mặc định `perPage = 9` (`products.js` override `perPage = 16` khi `currentType === 'invitation'`, tức trên `thiep-online.html`) |
| `getRelatedProducts(productId, limit)` | Cùng `category`, `isPublic !== false`, sort priority, limit 4 |
| `submitToGoogleSheet(formData)` | Gửi form đến Google Sheets API (`sheet_name: 'sale'`) |

## URL Parameters

| Trang | Param | Tác dụng |
|-------|-------|----------|
| `products.html` | `?category=onepage\|e-commerce\|portfolio\|education` | Auto-filter theo danh mục (KHÔNG có `wedding`/`other`) |
| `products.html` | `?type=website\|google-sheet` | Auto-filter theo loại (KHÔNG có `invitation`) |
| `products.html` | `?type=invitation` | **Redirect** → `thiep-online.html` (giữ nguyên các param còn lại) |
| `products.html` | `?category=wedding` hoặc `?category=other` | **Redirect** → `thiep-online.html?category=wedding\|other` |
| `products.html` | `?category=invitation` (legacy) | Redirect nội bộ → `?type=invitation` → redirect tiếp sang `thiep-online.html` |
| `products.html` / `thiep-online.html` | `?search=keyword` | Auto-fill search + filter |
| `thiep-online.html` | `?category=wedding\|other` | Filter danh mục thiệp (type luôn = invitation, type filter bị ẩn) |
| `thiep-online.html` | `?type=trending` (legacy) | Redirect nội bộ → `type=invitation` |
| `contact.html` | `?service=thiep-basic\|thiep-pro\|thiep-custom` | Auto-select + highlight gói thiệp trong `#pricingGrid` |
| `contact.html` | `?service=basic\|pro\|premium\|custom` | Auto-select + highlight gói web trong `#webPricingGrid` |
| `contact.html` | `#pricing-section` | Scroll đến bảng giá thiệp (mặc định) |
| `contact.html` | `#web-design` | Scroll đến bảng giá web |
| `contact.html` | `#contactForm` | Scroll đến form tư vấn |
| `product-detail.html` | `?id=1` | Load sản phẩm theo ID, branch UI theo `product.type` |
| `bang-gia-thiep-cuoi.html` | — | Toàn trang là stub redirect (noindex) → `contact.html#pricing-section` |

## Cấu trúc folder sản phẩm

```
products/
├── Web/                    # type: website
│   ├── E-commerce/         # category: e-commerce
│   ├── Education/          # category: education
│   ├── Onepage/            # category: onepage
│   └── Portfolio/          # category: portfolio
├── Invitation/             # type: invitation
│   ├── Wedding/            # category: wedding
│   └── Other/              # category: other (birthday, anniversary, holiday, confession)
├── Google-sheet/           # type: google-sheet
│   ├── E-commerce/
│   ├── Education/
│   └── Portfolio/
├── images/                 # Ảnh mockup dùng chung
├── data.csv                # File CSV quản lý sản phẩm
└── products.md             # Tài liệu chi tiết (danh sách, ghi chú)
```

### Quy tắc xác định type và category từ đường dẫn

| Đường dẫn folder | `type` | `category` |
|-------------------|--------|-----------|
| `products/Web/{Loại-nhỏ}/...` | `website` | loại-nhỏ (lowercase) |
| `products/Invitation/Wedding/...` | `invitation` | `wedding` |
| `products/Invitation/Other/...` | `invitation` | `other` |
| `products/Google-sheet/{Loại-nhỏ}/...` | `google-sheet` | loại-nhỏ (lowercase) |

## Quy tắc thêm sản phẩm mới

1. Tạo folder trong `products/{Loại}/{Loại-nhỏ}/{tên-folder}/`
2. Đặt file: `index.html` (bắt buộc với website/invitation) + ảnh (`thumbnail.png`, `anh_*.png`, ...)
3. Bảo AI: **"quét giúp tôi `products/{Loại}/{Loại-nhỏ}/{tên-folder}` thêm vào data.js"**
4. AI tự quét folder → sinh product entry → chèn vào `data.js` + cập nhật `products.md`
5. Slider trang chủ (`index.html #templatesTrack`) tự lấy 6 thiệp (`type: 'invitation'`) mới nhất theo `priority`/`id` (`getSliderProducts()`) — **không cần set `showInSlider`**, field này chỉ còn ý nghĩa lịch sử/tương thích ngược. Set `priority` thấp hơn nếu muốn ưu tiên hiện trước.

## Quy trình quét sản phẩm vào data.js

### Quét đơn lẻ (từ folder)

User bảo: `"quét giúp tôi products/Invitation/Other/tên-folder thêm vào data.js"`

AI thực hiện:
1. `ls` folder → lấy danh sách file
2. Kiểm tra `index.html` → xác định có demo hay không
3. Đọc `<title>` trong `index.html` → lấy tên/mô tả
4. Lấy đường dẫn ảnh (KHÔNG đọc nội dung ảnh)
5. Xác định `type` từ folder cha (`Web`→`website`, `Google-sheet`→`google-sheet`, `Invitation`→`invitation`)
6. Xác định `category` từ folder loại-nhỏ (lowercase)
7. Sinh product entry → chèn vào `data.js` trước `];`
8. Cập nhật `products.md` (số lượng + danh sách)

### Quét hàng loạt (từ data.csv)

User bảo: `"quét lại data.csv vào data.js"`

AI thực hiện:
1. Đọc `data.csv` → lấy danh sách sản phẩm
2. Với mỗi dòng: quét folder tương ứng → merge dữ liệu
3. Ưu tiên: **CSV > quét folder > giá trị mặc định**
4. Ghi vào `data.js` + cập nhật `products.md`

### Nguyên tắc quét ảnh
- **KHÔNG đọc nội dung file ảnh** — chỉ lấy đường dẫn
- Ưu tiên thumbnail: `thumbnail.png` > `thumbnail.jpg` > `screen.png` > file ảnh đầu tiên
- Mảng `images[]`: thumbnail trước, rồi các ảnh phụ theo thứ tự tên file
- Bỏ qua file không phải ảnh (`.html`, `.mp3`, `.css`, `.js`)

### Fields tự sinh khi quét

| Field | Cách sinh |
|-------|----------|
| `id` | Tự tăng từ ID cuối cùng + 1 |
| `name` | Lấy từ `<title>` trong `index.html`, hoặc chuyển tên folder thành Title Case |
| `slug` | Sinh từ `name` (kebab-case) |
| `description` | Sinh từ nội dung `index.html`, hoặc từ category + name |
| `category` | Loại-nhỏ từ đường dẫn folder (lowercase) |
| `type` | Loại chính: `Web`→`website`, `Google-sheet`→`google-sheet`, `Invitation`→`invitation` |
| `tags` | Sinh từ type + category + keywords trong name |
| `price` | Mặc định `'free'` |
| `images` | Quét file ảnh trong folder |
| `thumbnail` | Ảnh ưu tiên theo quy tắc trên |
| `path` | `./products/{Loại}/{Loại-nhỏ}/{folder}/` |
| `demoUrl` | Có `index.html` → `{path}index.html`, không có → `''` |
| `features` | 3 tính năng sinh theo nội dung index.html hoặc category |
| `status` | Mặc định `'new'` |
| `priority` | Mặc định `0` (nhỏ = hiển thị trước) |
| `downloads` | Random `1–10` |
| `rating` | Random `4.7–4.9` |
| `showInSlider` | Mặc định `false` |
| `updatedAt` | Ngày hiện tại |

### Lưu ý
- Tên folder/file có thể có tiếng Việt và khoảng trắng — xử lý bình thường trong JS
- Nếu cần mô tả chính xác hơn: đọc `index.html` lấy `<title>` và `<meta description>`
- Chi tiết danh sách sản phẩm xem trong `products/products.md`

## SEO & Meta Tags

Mỗi trang HTML đều có đầy đủ SEO tags trong `<head>`:

```html
<!-- Cơ bản -->
<meta name="description" content="Mô tả riêng cho từng trang">
<meta name="keywords" content="từ khóa SEO">
<meta name="author" content="Templexa Studio">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#A67C2E">
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

### Structured Data (JSON-LD)

Mỗi trang có `<script type="application/ld+json">` phù hợp:

| Trang | Schema Type | Nội dung |
|-------|-------------|----------|
| `index.html` | `Organization` + `WebSite` | Thông tin tổ chức, logo (`logo_v2.svg`), email, SearchAction |
| `thiep-online.html` | `CollectionPage` + `BreadcrumbList` | Catalog thiệp với breadcrumb |
| `products.html` | `CollectionPage` + `BreadcrumbList` | Trang kho web/Google Sheet với breadcrumb |
| `product-detail.html` | `Product` | **Dynamic** — `product-detail.js` cập nhật `#productSchema` với name, description, images, rating, offers (`price: '150000'` VND khi invitation) |
| `contact.html` | `Service` + `OfferCatalog` + `FAQPage` | 3 gói thiệp (Basic/Premium/Custom) trong `OfferCatalog`; `FAQPage` cho 5 câu hỏi thường gặp |

**product-detail.js** cũng cập nhật dynamic: `document.title`, `meta[description]`, `og:title`, `og:description`, `og:image` khi load sản phẩm.

### Lưu ý khi deploy
- Domain thực đã áp dụng: `https://templexa.vn/`
- `og:image`/`twitter:image`: `assets/images/og-image.png` (file thật, 1200×630px, đã verify tồn tại) — **nhưng vẫn là logo gradient indigo/purple cũ**, chưa cập nhật theo palette gold/terracotta mới → nên làm lại ảnh OG wedding-branding (gold/terracotta, có thể kèm mockup thiệp) sau
- `theme-color`: `#A67C2E` — màu thanh trình duyệt trên mobile

## Hiển thị ảnh sản phẩm

Tất cả nơi hiển thị ảnh đều dùng `images[0]`:

| Vị trí | Code | Ảnh hiển thị |
|--------|------|--------------|
| Slider (index.html) | `p.images[0]` | Ảnh đầu tiên trong mảng |
| Grid (products.html) | `p.images[0]` | Ảnh đầu tiên trong mảng |
| Detail ảnh chính | `product.images[0]` | Ảnh đầu tiên trong mảng |
| Related products | `p.images[0]` | Ảnh đầu tiên trong mảng |
| SEO og:image | `product.thumbnail` | Dùng riêng cho meta tags |

**Thứ tự ảnh trong mảng `images`**: `screen.png` luôn ở vị trí đầu tiên, tiếp theo là `Screenshot_*.jpg`.

## Ghi chú quan trọng

- Footer giống nhau trên 5 trang chính (`index.html`, `thiep-online.html`, `products.html`, `product-detail.html`, `contact.html`) — copy HTML, email: `templexa.contact@gmail.com`
- Header/Nav giống nhau trên 5 trang chính, chỉ khác class `active` trên nav link
- Pricing cards thiệp render động từ `INVITATION_PRICING`; pricing cards web (phụ) render từ `PRICING` — cả hai đều trong `data.js`
- Scroll animations: `.service-card`, `.template-card`, `.benefit-card`, `.process-step`, `.pricing-card`, `.target-card`, `.product-card`, `.home-reveal`, `.hero-reveal`
- Hover color cho links: `var(--accent)` = `#A67C2E` (gold, dark: `#D4AF5E`) — thống nhất toàn site
- **Khi thêm CSS mới**: nếu hardcode màu → thêm dark override vào block "DARK MODE — ALL HARDCODED OVERRIDES"
- **Khi thêm responsive**: thêm vào block "ADDITIONAL RESPONSIVE" theo thứ tự 1024 → 768 → 480

<!-- rtk-instructions v2 -->
# RTK (Rust Token Killer) - Token-Optimized Commands

## Golden Rule

**Always prefix commands with `rtk`**. If RTK has a dedicated filter, it uses it. If not, it passes through unchanged. This means RTK is always safe to use.

**Important**: Even in command chains with `&&`, use `rtk`:
```bash
# ❌ Wrong
git add . && git commit -m "msg" && git push

# ✅ Correct
rtk git add . && rtk git commit -m "msg" && rtk git push
```

## RTK Commands by Workflow

### Build & Compile (80-90% savings)
```bash
rtk cargo build         # Cargo build output
rtk cargo check         # Cargo check output
rtk cargo clippy        # Clippy warnings grouped by file (80%)
rtk tsc                 # TypeScript errors grouped by file/code (83%)
rtk lint                # ESLint/Biome violations grouped (84%)
rtk prettier --check    # Files needing format only (70%)
rtk next build          # Next.js build with route metrics (87%)
```

### Test (60-99% savings)
```bash
rtk cargo test          # Cargo test failures only (90%)
rtk go test             # Go test failures only (90%)
rtk jest                # Jest failures only (99.5%)
rtk vitest              # Vitest failures only (99.5%)
rtk playwright test     # Playwright failures only (94%)
rtk pytest              # Python test failures only (90%)
rtk rake test           # Ruby test failures only (90%)
rtk rspec               # RSpec test failures only (60%)
rtk test <cmd>          # Generic test wrapper - failures only
```

### Git (59-80% savings)
```bash
rtk git status          # Compact status
rtk git log             # Compact log (works with all git flags)
rtk git diff            # Compact diff (80%)
rtk git show            # Compact show (80%)
rtk git add             # Ultra-compact confirmations (59%)
rtk git commit          # Ultra-compact confirmations (59%)
rtk git push            # Ultra-compact confirmations
rtk git pull            # Ultra-compact confirmations
rtk git branch          # Compact branch list
rtk git fetch           # Compact fetch
rtk git stash           # Compact stash
rtk git worktree        # Compact worktree
```

Note: Git passthrough works for ALL subcommands, even those not explicitly listed.

### GitHub (26-87% savings)
```bash
rtk gh pr view <num>    # Compact PR view (87%)
rtk gh pr checks        # Compact PR checks (79%)
rtk gh run list         # Compact workflow runs (82%)
rtk gh issue list       # Compact issue list (80%)
rtk gh api              # Compact API responses (26%)
```

### JavaScript/TypeScript Tooling (70-90% savings)
```bash
rtk pnpm list           # Compact dependency tree (70%)
rtk pnpm outdated       # Compact outdated packages (80%)
rtk pnpm install        # Compact install output (90%)
rtk npm run <script>    # Compact npm script output
rtk npx <cmd>           # Compact npx command output
rtk prisma              # Prisma without ASCII art (88%)
```

### Files & Search (60-75% savings)
```bash
rtk ls <path>           # Tree format, compact (65%)
rtk read <file>         # Code reading with filtering (60%)
rtk grep <pattern>      # Search grouped by file (75%)
rtk find <pattern>      # Find grouped by directory (70%)
```

### Analysis & Debug (70-90% savings)
```bash
rtk err <cmd>           # Filter errors only from any command
rtk log <file>          # Deduplicated logs with counts
rtk json <file>         # JSON structure without values
rtk deps                # Dependency overview
rtk env                 # Environment variables compact
rtk summary <cmd>       # Smart summary of command output
rtk diff                # Ultra-compact diffs
```

### Infrastructure (85% savings)
```bash
rtk docker ps           # Compact container list
rtk docker images       # Compact image list
rtk docker logs <c>     # Deduplicated logs
rtk kubectl get         # Compact resource list
rtk kubectl logs        # Deduplicated pod logs
```

### Network (65-70% savings)
```bash
rtk curl <url>          # Compact HTTP responses (70%)
rtk wget <url>          # Compact download output (65%)
```

### Meta Commands
```bash
rtk gain                # View token savings statistics
rtk gain --history      # View command history with savings
rtk discover            # Analyze Claude Code sessions for missed RTK usage
rtk proxy <cmd>         # Run command without filtering (for debugging)
rtk init                # Add RTK instructions to CLAUDE.md
rtk init --global       # Add RTK to ~/.claude/CLAUDE.md
```

## Token Savings Overview

| Category | Commands | Typical Savings |
|----------|----------|-----------------|
| Tests | vitest, playwright, cargo test | 90-99% |
| Build | next, tsc, lint, prettier | 70-87% |
| Git | status, log, diff, add, commit | 59-80% |
| GitHub | gh pr, gh run, gh issue | 26-87% |
| Package Managers | pnpm, npm, npx | 70-90% |
| Files | ls, read, grep, find | 60-75% |
| Infrastructure | docker, kubectl | 85% |
| Network | curl, wget | 65-70% |

Overall average: **60-90% token reduction** on common development operations.
<!-- /rtk-instructions -->

## Model Selection — Sonnet vs Opus

**Nguyên tắc:** Dùng Sonnet cho công việc cơ học có quy trình rõ ràng. Dùng Opus cho công việc cần sáng tạo, phân tích, reasoning phức tạp.

Khi bắt đầu task, **đề xuất user chuyển model** nếu task phù hợp Sonnet — ví dụ: "Task này đơn giản, bạn có thể `/model sonnet` để tiết kiệm."

### Tasks dùng Sonnet (cơ học, quy trình có sẵn)

| Task | Mô tả | Skill/Lệnh |
|------|-------|-------------|
| **Convert ảnh → WebP** | sharp resize + convert, không cần phân tích ảnh | `/convert-webp` |
| **Move/rename files** | mv, cp, mkdir — di chuyển thư mục, đổi tên | Bash |
| **Clone mẫu thiệp + fill info** | Copy index.html từ khach_X, find-replace tên/ngày/địa chỉ/ảnh | Thủ công |
| **Push deploy** | git add → commit → protect → push | `/push` |
| **Scan images** | Quét folder lấy đường dẫn ảnh, cập nhật data.js | `/scan-images` |
| **Sort music** | Di chuyển MP3 vào đúng folder thể loại | `/sort-music` |
| **Gen QR** | Tạo mã QR từ URL | `/gen-qr` |
| **Sửa text đơn giản** | Đổi tên, ngày, giờ, địa chỉ trong thiệp có sẵn | Edit |
| **Thêm entry data.js** | Chèn product entry mới | Edit |
| **Cập nhật SHEET_ID** | Đổi sheet ID trong form submit | Edit |

### Tasks dùng Opus (cần sáng tạo / phân tích)

| Task | Lý do |
|------|-------|
| **Gen thiệp mới từ đầu** | Cần design, chọn palette, layout, brainstorm sections |
| **Gen thiệp PRO** | Phân tích ảnh tham khảo, extract design spec |
| **Debug CSS/JS phức tạp** | Cần reasoning sâu, hiểu layout/animation |
| **Thiết kế UI mới** | Cần sáng tạo, dark mode, responsive |
| **Phân tích ảnh cưới** | Chọn ảnh phù hợp, đánh giá bố cục |
| **Review code** | Tìm bug, tối ưu, security |
| **Viết love story / nội dung** | Cần ngôn ngữ tự nhiên, sáng tạo |

### Quy trình clone thiệp cho khách mới (Sonnet-friendly)

Khi khách mới có thông tin đầy đủ + mẫu tham chiếu đã có sẵn:

```
1. Tạo folder: products/Invitation/Wedding/khach_{slug}/customer/
2. Convert ảnh khách → WebP (sharp, max 1600px, quality 80)
3. Copy index.html từ mẫu gốc (khach_3, khach_duc-thuy, ...)
4. Find-replace:
   - Tên couple (title, og:title, hero, cover, info, footer)
   - Tên bố mẹ (nhà trai, nhà gái)
   - Ngày cưới (cover-date, hero-date, info-day/month/year, lunar, countdown target)
   - Giờ lễ (info-ceremony, timeline)
   - Địa điểm (venue name, address, Google Maps link)
   - Ảnh (polaroid, gallery, quote bg, love story, thank you)
   - Nhạc (audio src)
   - Gift (bank accounts hoặc QR)
   - SHEET_ID
   - Calendar (tháng + highlight ngày)
   - Watermark base64
5. Tạo wedding/{slug}/index.html (OG meta + iframe)
6. Thêm entry vào wedding/config.js
7. Move nhạc mới vào thư viện (nếu có)
```

Toàn bộ quy trình trên là **find-replace cơ học** → Sonnet xử lý tốt.