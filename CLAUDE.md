# Templexa

Website cung cấp mẫu thiết kế tùy chỉnh (template customization service). Ngôn ngữ giao diện: Tiếng Việt.

## Cấu trúc dự án

```
Templexa/
├── index.html                # Trang chủ
├── products.html             # Danh sách thiết kế
├── product-detail.html       # Chi tiết sản phẩm
├── contact.html              # Dịch vụ / Liên hệ
├── assets/
│   ├── css/style.css         # Stylesheet chính (~2900 dòng, CSS variables + dark mode overrides)
│   ├── js/
│   │   ├── data.js           # Data products, categories, pricing, API config, helper functions
│   │   ├── main.js           # JS chung (dark mode, hamburger menu, slider, scroll effects)
│   │   ├── products.js       # Search, filter, render grid, phân trang
│   │   ├── product-detail.js # Render chi tiết, gallery, modal nhận mẫu, related products
│   │   └── contact.js        # Render pricing cards, form validation + submit Google Sheet
│   └── images/               # Logo, icons, hero background, showcase, template previews
├── products/                 # Các project mẫu sản phẩm (156 sản phẩm)
│   ├── onepage/              # Landing page, coming soon (30 sản phẩm)
│   ├── e-commerce/           # Makeup, beauty, digital design, sport (37 sản phẩm)
│   ├── invitation/           # Wedding, birthday, anniversary, holiday (29 sản phẩm)
│   ├── portfolio/            # Portfolio, personal blog (26 sản phẩm)
│   └── education/            # Khóa học, đào tạo, chứng chỉ (34 sản phẩm)
└── docs/                     # Mockup thiết kế (PNG/SVG)
```

## Tech Stack

- HTML/CSS/JS thuần (Vanilla) — không dùng framework
- Font: Inter (Google Fonts) + Averia Serif Libre (logo)
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

### Bảng màu chính (Indigo/Purple)

| Vai trò | Mã màu | Dùng ở đâu |
|---------|--------|-------------|
| **Indigo** | `#6366F1` | Buttons, borders active, filter active, badge dot, slider badge, pricing highlight |
| **Indigo Dark** | `#4F46E5` | Button gradient end, hover states |
| **Purple** | `#7C3AED` | Hero badge icon, showcase icon bg, contact hero spot |
| **Purple Deep** | `#5B21B6` | Showcase icon gradient end |
| **Violet** | `#A855F7` | Hero gradient text mid-point |
| **Blue** | `#3B82F6` | Hero gradient text end, target card left icon, contact CTA button |

### Gradient patterns

| Tên | Giá trị | Dùng ở đâu |
|-----|---------|-------------|
| **Hero text** | `linear-gradient(135deg, #6366F1, #A855F7 50%, #3B82F6)` | `.hero h1 .gradient-text` |
| **CTA text** | `linear-gradient(135deg, #6366F1, #4F46E5)` | `.cta h2 .gradient-text` |
| **Button primary** | `linear-gradient(135deg, #6366F1, #8B5CF6)` | `.btn-primary`, pricing CTA highlighted |
| **Showcase bg** | `linear-gradient(155deg, #6366F1 0%, #4F46E5 50%, #6734DA 75%, #7E22CE 100%)` | `.showcase` section |
| **Contact hero bg** | `radial-gradient spots on #4F46E5` | `.contact-hero` (2 spots: bottom-left, top-right) |
| **Contact CTA bg** | `radial-gradient spots on #4527A0` | `.contact-cta-section > .container` |
| **Contact hero text** | `linear-gradient(90deg, #93C5FD, #C4B5FD)` | `.contact-hero .gradient-text` |
| **Pricing price highlighted** | `linear-gradient(135deg, #6366F1, #8B5CF6)` | `.pricing-card.highlighted .pricing-price` |

### Màu nền & text (CSS Variables)

| Variable | Light | Dark |
|----------|-------|------|
| `--bg-primary` | `#FFFFFF` | `#0F172A` |
| `--bg-secondary` | `#F4FBFF` | `#1E293B` |
| `--text-primary` | `#0B1B2B` | `#F1F5F9` |
| `--text-secondary` | `#355066` | `#94A3B8` |
| `--text-tertiary` | `#5E7A90` | `#64748B` |
| `--border-color` | `#D6ECF7` | `#1A3A4D` |
| `--card-bg` | `#FFFFFF` | `#1E293B` |
| `--card-hover-bg` | `#F4FBFF` | `#334155` |
| `--input-bg` | `#FFFFFF` | `#1E293B` |
| `--input-border` | `#D6ECF7` | `#1A3A4D` |

### Font

- **Family**: Inter (Google Fonts) + Averia Serif Libre (logo)
- **Weights**: 400 (body), 500 (medium), 600 (semi-bold), 700 (bold), 800 (extra-bold, hero)

### Border radius & Shadow

- Cards: `12–24px` | Buttons: `30–34px` pill | Icon boxes: `16px`
- Card shadow: `0 4px 15px rgba(0,0,0,0.05)` | CTA button: `0 10px 30px rgba(99,102,241,0.3)`

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

### 1. Trang chủ — `index.html` ✅
- **Header**: Logo (Averia Serif Libre) + Nav (centered) + Dark mode toggle + Hamburger (mobile)
- **Hero**: Badge tím + Heading gradient + mô tả + CTA "Bắt Đầu Ngay"
- **Lý Do Chọn Chúng Tôi**: 4 icon cards (img SVG)
- **Các Mẫu Nổi Bật**: Slider/carousel, card giữa có badge "Most Popular"
- **Lợi ích**: 4 cards với icon SVG (benefits_icon_1–4.svg)
- **Showcase**: Background gradient tím, wave dividers, 2 feature items
- **CTA cuối**: Heading gradient text + button gradient
- **Footer**: 4 cột, links có URL params

### 2. Danh sách thiết kế — `products.html` ✅
- **Hero**: radial-gradient bg, gradient text, search bar (debounce 300ms)
- **Filters**: flexbox row, category + type, active indigo, URL params
- **Grid sản phẩm**: 3 cột, card có ảnh + badge + tên + danh mục
- **Phân trang**: 9 items/page

### 3. Chi tiết sản phẩm — `product-detail.html` ✅
- **Breadcrumb**: links với URL params category filter
- **Layout 2 cột**: Gallery (main + thumbs) + Sidebar sticky
- **Sidebar**: Badge giá, "Dùng ngay" (gradient), "Xem demo", features list, "Yêu cầu tùy chỉnh"
- **Action bar**: Save (toggle purple, sessionStorage) + Share + Last updated
- **Related products**: 4 cards cùng danh mục (getRelatedProducts)
- **Modal "Nhận mẫu"**: Email* + Họ tên + SĐT + checkbox required → Google Sheets
- **Modal thành công**: Icon check + message
- Form data: `{ email, name, phone, reference: window.location.href, service: '', note: '', status: 'submit' }`

### 4. Dịch vụ — `contact.html` ✅
- **Hero**: `min-height: 100vh`, radial-gradient spots tím trên `#4F46E5`
  - Gradient text: `linear-gradient(90deg, #93C5FD, #C4B5FD)`
  - Button: `linear-gradient(90deg, #3B82F6, #7C3AED)`
- **Quy Trình Hợp Tác**: 4 bước với icon SVG (`contact_icon_1-4.svg`)
  - Process number badges (01–04) góc phải trên icon
  - Connecting line solid qua giữa icons (`process-grid::before`)
- **Các Gói Dịch Vụ**: 4 pricing cards, click to highlight
  - Mỗi gói có: `name`, `price`, `originalPrice`, `showOriginalPrice`, `discount`, `description`, `features`
  - BASIC: 699.000đ (gốc 1.500.000đ, -55%) | PRO highlighted: 2.999.000đ (gốc 5.000.000đ, -40%)
  - PREMIUM: 8.000.000đ | CUSTOM: Liên hệ
  - Highlighted card cao hơn (extra padding), "PHỔ BIẾN NHẤT" badge
  - Pricing price highlighted: gradient text
  - Min-height trên header/desc/original-price/price/features để căn bằng
  - Click CTA → scroll to form + auto-select service
- **CTA "Sẵn sàng để bứt phá?"**:
  - Container có gradient bg + border-radius 20px + box-shadow
  - 2 cột 50/50: cam kết (showcase icons) + form tư vấn (card shadow)
  - "Liên hệ trực tiếp:" + email + hr divider, căn sát đáy trái
- **Giải Pháp Dành Cho Ai?**: 2 cards
  - Card trái: icons xanh `#3B82F6` | Card phải: icons tím `#6366F1`
  - Icon trong `<li>` có vòng tròn background

## Trạng thái tiến độ

| Trang / Tính năng | File | Trạng thái |
|-------|------|-----------|
| Trang chủ (light) | `index.html` | ✅ Hoàn thành |
| Danh sách thiết kế (light) | `products.html` + `products.js` | ✅ Hoàn thành |
| Chi tiết sản phẩm (light) | `product-detail.html` + `product-detail.js` | ✅ Hoàn thành |
| Dịch vụ (light) | `contact.html` + `contact.js` | ✅ Hoàn thành |
| Dark mode | CSS overrides (~40 rules) + `main.js` | ✅ Hoàn thành |
| Responsive | 3 breakpoints (1024, 768, 480) | ✅ Hoàn thành |
| Mobile menu | Hamburger + slide-in + overlay | ✅ Hoàn thành |
| Modal nhận mẫu | `product-detail.js` | ✅ Hoàn thành |
| Modal thành công | `product-detail.js` | ✅ Hoàn thành |
| Đổi tên thư mục sản phẩm | 152 folders → kebab-case | ✅ Hoàn thành |
| Đổi tên HTML → index.html | Tất cả code.html → index.html | ✅ Hoàn thành |
| Data sản phẩm | `data.js` — 156 sản phẩm (đầy đủ) | ✅ Hoàn thành |
| Footer đồng bộ | 4 trang giống nhau | ✅ Hoàn thành |
| SEO meta tags | 4 trang (description, OG, Twitter Card) | ✅ Hoàn thành |

## Data & API

### PRICING structure (data.js)

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
    category: 'onepage',           // onepage | e-commerce | invitation | portfolio | education
    type: 'website',               // website | google-sheet
    tags: ['tag1', 'tag2'],
    price: 'free',                 // 'free' hoặc giá
    images: ['./products/.../screen.png', './products/.../Screenshot_1.jpg', ...],  // screen.png luôn đầu tiên
    thumbnail: './products/.../screen.png',
    demoUrl: './products/.../index.html',
    features: ['Tính năng 1', 'Tính năng 2', 'Tính năng 3'],
    status: 'new',                 // new | hot | (trống)
    priority: 1,
    downloads: 5,                 // random 1–10
    rating: 4.8,                   // random 4.7–4.9
    showInSlider: true,            // Hiện trên slider trang chủ
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
| `getSliderProducts()` | Lấy products có `showInSlider: true` |
| `getProductById(id)` | Tìm product theo ID |
| `getProductBySlug(slug)` | Tìm product theo slug |
| `getProductsSorted()` | Sort theo priority |
| `filterProducts({ category, type, search })` | Lọc products |
| `paginateProducts(products, page, perPage)` | Phân trang (9/page) |
| `getRelatedProducts(productId, limit)` | Cùng category, sort priority, limit 4 |
| `submitToGoogleSheet(formData)` | Gửi form đến Google Sheets API |

## URL Parameters

| Trang | Param | Tác dụng |
|-------|-------|----------|
| `products.html` | `?category=onepage` | Auto-filter theo danh mục |
| `products.html` | `?type=website` | Auto-filter theo loại |
| `products.html` | `?search=keyword` | Auto-fill search + filter |
| `contact.html` | `?service=pro` | Auto-select gói dịch vụ trong form |
| `contact.html` | `#pricing-section` | Scroll đến phần pricing |
| `contact.html` | `#contactForm` | Scroll đến form tư vấn |
| `product-detail.html` | `?id=1` | Load sản phẩm theo ID |

## Cấu trúc folder sản phẩm

```
products/
├── Web/                    # type: website
│   ├── E-commerce/         # category: e-commerce
│   ├── Education/          # category: education
│   ├── Invitation/         # category: invitation
│   ├── Onepage/            # category: onepage
│   └── Portfolio/          # category: portfolio
├── Google-sheet/           # type: google-sheet
│   ├── E-commerce/
│   ├── Education/
│   └── Portfolio/
├── Trending/               # type: trending
│   ├── Confession/         # category: confession
│   ├── Invitation/         # category: invitation
│   └── OnePage/            # category: onepage
├── images/                 # Ảnh mockup dùng chung
├── data.csv                # File CSV quản lý sản phẩm
└── products.md             # Tài liệu chi tiết (danh sách, ghi chú)
```

### Quy tắc xác định type và category từ đường dẫn

| Đường dẫn folder | `type` | `category` |
|-------------------|--------|-----------|
| `products/Web/{Loại-nhỏ}/...` | `website` | loại-nhỏ (lowercase) |
| `products/Google-sheet/{Loại-nhỏ}/...` | `google-sheet` | loại-nhỏ (lowercase) |
| `products/Trending/{Loại-nhỏ}/...` | `trending` | loại-nhỏ (lowercase) |

## Quy tắc thêm sản phẩm mới

1. Tạo folder trong `products/{Loại}/{Loại-nhỏ}/{tên-folder}/`
2. Đặt file: `index.html` (bắt buộc với website/trending) + ảnh (`thumbnail.png`, `anh_*.png`, ...)
3. Bảo AI: **"quét giúp tôi `products/{Loại}/{Loại-nhỏ}/{tên-folder}` thêm vào data.js"**
4. AI tự quét folder → sinh product entry → chèn vào `data.js` + cập nhật `products.md`
5. Set `showInSlider: true` nếu muốn hiện trên slider trang chủ

## Quy trình quét sản phẩm vào data.js

### Quét đơn lẻ (từ folder)

User bảo: `"quét giúp tôi products/Trending/Confession/tên-folder thêm vào data.js"`

AI thực hiện:
1. `ls` folder → lấy danh sách file
2. Kiểm tra `index.html` → xác định có demo hay không
3. Đọc `<title>` trong `index.html` → lấy tên/mô tả
4. Lấy đường dẫn ảnh (KHÔNG đọc nội dung ảnh)
5. Xác định `type` từ folder cha (`Web`→`website`, `Google-sheet`→`google-sheet`, `Trending`→`trending`)
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
| `type` | Loại chính: `Web`→`website`, `Google-sheet`→`google-sheet`, `Trending`→`trending` |
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
<meta name="theme-color" content="#6366F1">
<link rel="canonical" href="https://phuocpt98.github.io/Templexa/{page}">

<!-- Open Graph (Facebook, Zalo, ...) -->
<meta property="og:type" content="website">
<meta property="og:title" content="Tiêu đề trang">
<meta property="og:description" content="Mô tả ngắn">
<meta property="og:image" content="https://phuocpt98.github.io/Templexa/assets/images/lgo-v2.png">
<meta property="og:url" content="https://phuocpt98.github.io/Templexa/{page}">
<meta property="og:site_name" content="Templexa">
<meta property="og:locale" content="vi_VN">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Tiêu đề trang">
<meta name="twitter:description" content="Mô tả ngắn">
<meta name="twitter:image" content="https://phuocpt98.github.io/Templexa/assets/images/lgo-v2.png">
```

### Meta description từng trang

| Trang | Title | Description |
|-------|-------|-------------|
| `index.html` | Templexa - Mẫu Thiết Kế Tùy Chỉnh Cho Bạn | Kho mẫu thiết kế website đa dạng, hơn 150 mẫu sẵn sàng sử dụng |
| `products.html` | Danh Sách Thiết Kế - Templexa | Khám phá hơn 150 mẫu, lọc theo danh mục, xem demo trực tiếp |
| `product-detail.html` | Chi Tiết Sản Phẩm - Templexa | Gallery ảnh, tính năng, demo trực tiếp và yêu cầu tùy chỉnh |
| `contact.html` | Dịch Vụ Thiết Kế - Templexa | 4 gói từ 699K đến Premium, quy trình chuyên nghiệp, tư vấn miễn phí |

### Structured Data (JSON-LD)

Mỗi trang có `<script type="application/ld+json">` phù hợp:

| Trang | Schema Type | Nội dung |
|-------|-------------|----------|
| `index.html` | `Organization` + `WebSite` | Thông tin tổ chức, logo, email, SearchAction cho search box |
| `products.html` | `CollectionPage` + `BreadcrumbList` | Trang danh mục với breadcrumb |
| `product-detail.html` | `Product` | **Dynamic** — `product-detail.js` cập nhật `#productSchema` với name, description, images, rating, offers |
| `contact.html` | `Service` + `OfferCatalog` | Dịch vụ với 4 gói giá (BASIC, PRO, PREMIUM, CUSTOM) |

**product-detail.js** cũng cập nhật dynamic: `document.title`, `meta[description]`, `og:title`, `og:description`, `og:image` khi load sản phẩm.

### Lưu ý khi deploy
- Thay `https://phuocpt98.github.io/Templexa/` bằng domain thực (trong cả meta tags và JSON-LD)
- Tạo file `assets/images/lgo-v2.png` (1200×630px) cho ảnh share link
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

- Footer giống nhau trên tất cả 4 trang — copy HTML, email: `templexa.contact@gmail.com`
- Header giống nhau trên tất cả 4 trang, chỉ khác class `active` trên nav link
- Pricing cards render động từ `PRICING` array trong `data.js`
- Scroll animations: `.service-card`, `.template-card`, `.benefit-card`, `.process-step`, `.pricing-card`, `.target-card`, `.product-card`
- Hover color cho links: `#6366F1` (indigo) — thống nhất toàn site
- **Khi thêm CSS mới**: nếu hardcode màu → thêm dark override vào block "DARK MODE — ALL HARDCODED OVERRIDES"
- **Khi thêm responsive**: thêm vào block "ADDITIONAL RESPONSIVE" theo thứ tự 1024 → 768 → 480
