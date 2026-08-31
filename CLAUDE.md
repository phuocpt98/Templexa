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
├── cau-hoi-thuong-gap.html     # FAQ (AEO) — sinh tự động từ scripts/build-faq.js
├── llms.txt / llms-full.txt    # Cho AI crawler — sinh tay từ faq.json, cập nhật thủ công khi faq đổi
├── robots.txt / sitemap.xml    # sitemap.xml sinh tự động (scripts/build-sitemap.js)
├── products/                   # folder sản phẩm (249 entries trong data.js, 222 public)
│   ├── Web/
│   │   ├── E-commerce/         # 33
│   │   ├── Education/          # 31
│   │   ├── Onepage/            # 26
│   │   └── Portfolio/          # 25
│   ├── Invitation/
│   │   ├── Wedding/            # 77 (58 public)
│   │   └── Other/              # 52 (44 public, sinh nhật, thôi nôi, kỷ niệm, tỏ tình, ...)
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
│   ├── lib/products-io.js      # load()/save() an toàn cho mảng PRODUCTS — dùng khi sửa data.js bằng script
│   ├── convert-webp.js         # PNG/JPG → WebP
│   ├── update-webp-refs.js     # Cập nhật references
│   ├── protect-wedding.js      # Bảo vệ thiệp cưới khi merge
│   ├── build-faq.js            # Sinh cau-hoi-thuong-gap.html + nhúng FAQ vào thiep-online.html/index.html
│   ├── build-sitemap.js        # Sinh sitemap.xml
│   ├── build-og-cover.js       # Sinh ảnh OG cover
│   ├── shoot-mobile.js         # Puppeteer+sharp: chụp mobile shots cho thiệp (npm run shoot:mobile)
│   ├── screenshot-products.js  # Chụp screenshot sản phẩm
│   ├── cut-element-grid.js     # Cắt lưới ảnh element
│   └── migrate-products.js     # One-time migration data.js (đã chạy xong)
├── docs/
│   ├── SYSTEM.md               # AI context entry-point
│   ├── products.md             # Danh sách sản phẩm
│   ├── wedding-tag-matrix.md   # Tag matrix thiệp cưới (auto-gen)
│   ├── workflow-protect-deploy.md
│   └── memory/                 # Feedback files cho AI
├── plans/                      # Plans + reports
└── package.json                # npm scripts: build:faq, build:sitemap, build:seo, shoot:mobile
```

**Tổng số sản phẩm (`data.js`):** 249 entries, 222 public (`isPublic !== false`) — Invitation 129 (public 102: wedding 58, other 44) + Website 115 + Google-sheet 5.

## Tech Stack

- HTML/CSS/JS thuần (Vanilla) — không dùng framework
- Font: **Inter** (Google Fonts, weights 400–800) cho cả display lẫn body — `--font-display` và `--font-body` đều là `'Inter', system-ui, sans-serif`
- Logo: ảnh `assets/images/logo_v2.svg` (`<img class="logo-icon">`) trong header/footer — không còn logo dạng text
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

Palette đã **quay lại Indigo/Purple** (bản "Wedding Elegant" gold/terracotta trước đây đã bị revert). Token khai báo `assets/css/style.css` `:root` (dòng ~5–31) + override `[data-theme="dark"]` (dòng ~34–55). Các class `.btn-terracotta` / `.btn-gold-outline` **vẫn giữ nguyên tên** trong CSS/HTML nhưng giờ render màu indigo (không phải gold/terracotta nữa) — đừng đổi tên class khi sửa, chỉ đổi giá trị màu nếu cần.

### Bảng màu chính (Indigo/Purple)

| Variable | Light | Dark | Dùng ở đâu |
|----------|-------|------|-------------|
| `--accent` (indigo) | `#6366F1` | `#818CF8` | Nav hover/active, link hover, border/text `.btn-gold-outline`, `theme-color` |
| `--accent-dark` | `#4F46E5` | `#6366F1` | Hover, gradient end |
| `--accent-light` | `#EEF2FF` | `#1E1B4B` | Nền nhạt cho badge/highlight |
| `--accent-2` (purple) | `#7C3AED` | `#A78BFA` | `.btn-terracotta` (background), hover shadow tím |
| `--accent-2-dark` | `#6D28D9` | `#8B5CF6` | Hover `.btn-terracotta` |

`.btn-primary` (nút CTA chính ở sidebar/detail/mobile CTA) dùng gradient riêng `linear-gradient(135deg, #6366F1, #8B5CF6)`, không qua biến `--accent-2`.

### Màu nền & text (CSS Variables)

| Variable | Light | Dark |
|----------|-------|------|
| `--bg-primary` | `#FFFFFF` | `#0F172A` |
| `--bg-secondary` | `#F4FBFF` | `#1E293B` |
| `--bg-tertiary` | `#EAF7FF` | `#263449` |
| `--text-primary` | `#0B1B2B` | `#F1F5F9` |
| `--text-secondary` | `#355066` | `#94A3B8` |
| `--text-tertiary` | `#5E7A90` | `#64748B` |
| `--border-color` | `#D6ECF7` | `#1A3A4D` |
| `--card-bg` | `#FFFFFF` | `#1E293B` |
| `--card-hover-bg` | `#F4FBFF` | `#334155` |
| `--input-bg` | `#FFFFFF` | `#1E293B` |
| `--input-border` | `#D6ECF7` | `#1A3A4D` |
| `--header-bg` | `rgba(255,255,255,0.85)` | `rgba(15,23,42,0.85)` |
| `--overlay-bg` | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.7)` |

### Gradient patterns

| Tên | Giá trị (light) | Dark | Dùng ở đâu |
|-----|-------------------|------|-------------|
| `--gold-gradient` (tên biến giữ nguyên, giá trị mới) | `linear-gradient(135deg, #6366F1, #A855F7 50%, #3B82F6)` | `linear-gradient(135deg, #818CF8, #C4B5FD 50%, #60A5FA)` | `.logo-text`, `.home-hero-title .gradient-text` |
| `--hero-gradient` | `linear-gradient(135deg, #EAF7FF, #D6ECF7)` | `linear-gradient(135deg, #1E1B4B, #0F172A)` | Nền `.home-hero` |
| Hero text (legacy `.hero`/`.products-hero`) | `linear-gradient(135deg, #6366F1, #A855F7 50%, #3B82F6)` | — | `.products-hero .gradient-text` (thiep-online.html, products.html) |
| Contact hero text | `linear-gradient(90deg, #93C5FD, #C4B5FD)` | — | `.contact-hero .gradient-text` |
| Button `.btn-terracotta` | `--accent-2` → `--accent-2-dark` (`#7C3AED → #6D28D9`) | — | `.btn-terracotta:hover` |
| Button `.btn-primary` | `linear-gradient(135deg, #6366F1, #8B5CF6)` | — | `.btn-primary`, CTA sidebar/detail |
| Button gold outline | border/text `var(--accent)`, hover fill `var(--accent)` | — | `.btn-gold-outline` |
| Pricing price highlighted | `linear-gradient(135deg, #6366F1, #8B5CF6)` | — | `.pricing-card.highlighted .pricing-price` |

### Font

- **Display** (`--font-display`) và **Body** (`--font-body`): cả hai đều là `'Inter', system-ui, sans-serif` — không còn Playfair Display / Be Vietnam Pro
- Import (Google Fonts): `Inter:wght@400;500;600;700;800`
- `h1, h2, h3` có `letter-spacing: -0.02em`
- Logo: **ảnh** `<img src="./assets/images/logo_v2.svg" class="logo-icon">` trong `<a class="logo">` — không còn `<span class="logo-text">`; đồng nhất trên header + footer của tất cả trang chính

### Border radius tokens

| Variable | Giá trị | Dùng |
|----------|---------|------|
| `--radius-sm` | `8px` | Input nhỏ, badge |
| `--radius-md` | `14px` | Card, button vuông |
| `--radius-lg` | `22px` | Card lớn, section block |
| `--radius-pill` | `999px` | Button pill (`.btn-terracotta`, `.btn-gold-outline`) |

- Card shadow: `var(--card-shadow)` = `0 4px 15px rgba(0,0,0,0.05)` (dark: `0 4px 18px rgba(0,0,0,0.4)`)

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

→ Xem **[docs/pages-design.md](docs/pages-design.md)** — Thiết kế chi tiết từng trang (hero, sections, pricing, CTA).

## Trạng thái tiến độ

→ Xem **[docs/progress.md](docs/progress.md)** — Bảng trạng thái tiến độ các tính năng.

## Data & API

→ Xem **[docs/data-api.md](docs/data-api.md)** — PRICING/PRODUCTS structure đầy đủ, API input format, helper functions.

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
| `thiep-online.html` | `?style=traditional\|modern\|minimalist\|luxury\|floral\|vintage` | Filter hàng chip thứ 2 khi `category=wedding` (chỉ hiện khi có category wedding) |
| `thiep-online.html` | `?event=wedding\|dam-ngo\|an-hoi\|birthday\|thoi-noi\|anniversary\|reunion\|gio-to\|confession\|graduation\|holiday\|other` | Filter hàng chip thứ 2 khi `category=other` |

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
4. AI tự quét folder → sinh product entry (đủ field mới `style`/`event`/`featured`/`variants`/`mobileView` nếu là invitation) → chèn vào `data.js` + cập nhật `products.md`
5. Nếu là thiệp mời: chạy `npm run shoot:mobile -- --ids <id>` → chọn ảnh đẹp nhất (`cover` hoặc `open`) gán vào `mobileView`, thêm các shot dọc vào `images[]` → chạy `npm run build:sitemap`. Không còn bước cập nhật `assets/data/invitation.json` (đã xoá).
6. Slider trang chủ (`index.html #templatesTrack`) tự lấy 6 thiệp (`type: 'invitation'`) mới nhất theo `priority`/`id` (`getSliderProducts()`) — **không cần set `showInSlider`**, field này chỉ còn ý nghĩa lịch sử/tương thích ngược. Set `priority` thấp hơn nếu muốn ưu tiên hiện trước.

## Quy trình quét sản phẩm vào data.js

→ Xem **[docs/scan-products.md](docs/scan-products.md)** — Quy trình quét folder → entry data.js (đơn lẻ / hàng loạt), fields tự sinh.

## SEO & Meta Tags

→ Xem **[docs/seo-meta.md](docs/seo-meta.md)** — Meta tags, OG/Twitter, JSON-LD từng trang, lưu ý deploy.

## SEO/AEO nâng cao (FAQ, llms.txt, sitemap)

- **`cau-hoi-thuong-gap.html`** — sinh bởi `node scripts/build-faq.js` từ `assets/data/faq.json` (37 câu hỏi, 7 nhóm). Cùng script này còn nhúng FAQ rút gọn vào 2 trang khác giữa các marker cố định — **không sửa tay bên trong marker**, sửa `faq.json` rồi chạy lại `npm run build:faq`:
  - `<!-- FAQ:START --> ... <!-- FAQ:END -->` — nội dung HTML section FAQ
  - `<!-- FAQ-LD:START --> ... <!-- FAQ-LD:END -->` — JSON-LD `FAQPage` tương ứng
  - `thiep-online.html`: 8 câu | `index.html`: 5 câu
- **`llms.txt`** / **`llms-full.txt`** (ở root) — cho AI crawler đọc nhanh, sinh từ nội dung `faq.json` nhưng phải **cập nhật tay** khi FAQ đổi (không có script tự sinh).
- **`robots.txt`** — 1 nhóm `User-agent: *`, không chặn bot AI (GPTBot, ClaudeBot, PerplexityBot, Google-Extended...). `Disallow`: `products-admin.html`, `preview.html`, `/products/shared/`, `/scripts/`, `/plans/`, `/docs/`. Trỏ `Sitemap: https://templexa.vn/sitemap.xml`.
- **Thiệp riêng của khách KHÔNG chặn bằng `Disallow`** — `Disallow` chỉ chặn *tải* trang chứ không chặn *index*, và còn khiến Google không đọc được thẻ `noindex`. Thay vào đó mỗi trang tự khai báo `<meta name="robots" content="noindex, nofollow">`, cộng `X-Robots-Tag` trong `_headers` (Cloudflare Pages) theo mẫu `/wedding/*`, `/event/*`, `/birthday/*`, `khach_*`.
  **Khi thêm thiệp khách mới**: nếu tên thư mục có tiền tố `khach_` thì `_headers` tự lo; nếu không (vd `van-tri-ngoc-linh`) phải thêm dòng riêng vào `_headers`. Thẻ `noindex` trong `<head>` thì luôn phải có. Thiệp mẫu catalog `gen_*` KHÔNG được gắn noindex.
- **`sitemap.xml`** — sinh bởi `node scripts/build-sitemap.js` (`npm run build:sitemap`), 234 URL bao gồm `product-detail.html?id=` cho mỗi sản phẩm public có ảnh.
- Chạy cả hai cùng lúc: `npm run build:seo` (= `build:faq` + `build:sitemap`).
- Mọi trang có `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">` (riêng trang admin giữ `noindex`).

### Lưu ý khi deploy
- Domain thực đã áp dụng: `https://templexa.vn/`
- `og:image`/`twitter:image`: `assets/images/og-image.png` (file thật, 1200×630px, đã verify tồn tại)
- `theme-color`: `#6366F1` — màu thanh trình duyệt trên mobile

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

- Footer giống nhau trên **7 trang** (`index.html`, `products.html`, `product-detail.html`, `contact.html`, `thiep-online.html`, `products-admin.html`, `cau-hoi-thuong-gap.html`) — copy HTML, email: `templexa.contact@gmail.com`. 4 cột: Brand (logo ảnh + mô tả) | Thiệp Mời Online (thiệp cưới, sinh nhật/thôi nôi, bảng giá thiệp, Câu hỏi thường gặp) | Mẫu Website (onepage, e-commerce, portfolio, giáo dục, gói thiết kế web) | Liên Hệ (yêu cầu báo giá, Zalo 0334 884 895, email)
- Header/Nav giống nhau trên các trang chính, chỉ khác class `active` trên nav link
- Pricing cards thiệp render động từ `INVITATION_PRICING`; pricing cards web (phụ) render từ `PRICING` — cả hai đều trong `data.js`
- Scroll animations: `.service-card`, `.template-card`, `.benefit-card`, `.process-step`, `.pricing-card`, `.target-card`, `.product-card`, `.home-reveal`, `.hero-reveal`
- Hover color cho links: `var(--accent)` = `#6366F1` (indigo, dark: `#818CF8`) — thống nhất toàn site
- **Khi thêm CSS mới**: nếu hardcode màu → thêm dark override vào block "DARK MODE — ALL HARDCODED OVERRIDES"
- **Khi thêm responsive**: thêm vào block "ADDITIONAL RESPONSIVE" theo thứ tự 1024 → 768 → 480

<!-- rtk-instructions v2 -->

## Model Selection — Sonnet vs Opus

→ Xem **[docs/model-selection.md](docs/model-selection.md)** — Chọn Sonnet/Opus theo loại task + quy trình clone thiệp cho khách. Khi bắt đầu task cơ học, đề xuất user `/model sonnet`.

# RTK

Dùng `rtk` prefix cho mọi lệnh shell — chi tiết xem `~/.claude/RTK.md` (global, tự nạp).
