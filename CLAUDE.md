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
│   ├── css/style.css         # Stylesheet chính (~2250 dòng, dùng CSS variables)
│   ├── js/
│   │   ├── data.js           # Data products, categories, pricing, API config, helper functions
│   │   ├── main.js           # JS chung (dark mode, hamburger menu, slider, scroll effects)
│   │   ├── products.js       # Search, filter, render grid, phân trang
│   │   ├── product-detail.js # Render chi tiết, gallery, modal nhận mẫu, related products
│   │   └── contact.js        # Render pricing cards, form validation + submit Google Sheet
│   └── images/               # Logo, icons, hero background, showcase, template previews
├── products/                 # Các project mẫu sản phẩm (152 sản phẩm)
│   ├── onepage/              # Landing page, coming soon (30 sản phẩm)
│   ├── e-commerce/           # Makeup, beauty, digital design, sport (37 sản phẩm)
│   ├── invitation/           # Wedding, birthday, anniversary, holiday (29 sản phẩm)
│   ├── portfolio/            # Portfolio, personal blog (22 sản phẩm)
│   └── education/            # Khóa học, đào tạo, chứng chỉ (34 sản phẩm)
└── docs/                     # Mockup thiết kế (PNG/SVG)
```

## Tech Stack

- HTML/CSS/JS thuần (Vanilla) — không dùng framework
- Font: Inter (Google Fonts)
- Responsive: dùng clamp() và media queries
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

## Design System

### Bảng màu chính (Indigo/Purple)

| Vai trò | Mã màu | Dùng ở đâu |
|---------|--------|-------------|
| **Indigo** | `#6366F1` | Buttons, borders active, filter active, badge dot, slider badge |
| **Indigo Dark** | `#4F46E5` | Button gradient end, hover states |
| **Purple** | `#7C3AED` | Hero badge icon, showcase icon bg |
| **Purple Deep** | `#5B21B6` | Showcase icon gradient end |
| **Violet** | `#A855F7` | Hero gradient text mid-point |
| **Blue** | `#3B82F6` | Hero gradient text end |

### Gradient patterns

| Tên | Giá trị | Dùng ở đâu |
|-----|---------|-------------|
| **Hero text** | `linear-gradient(135deg, #6366F1, #A855F7 50%, #3B82F6)` | `.hero h1 .gradient-text` |
| **CTA text** | `linear-gradient(135deg, #6366F1, #4F46E5)` | `.cta h2 .gradient-text` |
| **Button CTA** | `linear-gradient(135deg, #6366F1, #4F46E5)` | `.cta-btn`, `.hero-cta` |
| **Showcase bg** | `linear-gradient(155deg, #6366F1 0%, #4F46E5 50%, #6734DA 75%, #7E22CE 100%)` | `.showcase` section |
| **Showcase icon 1** | `linear-gradient(135deg, #7C3AED, #5B21B6)` | `.icon-purple` |
| **Showcase icon 2** | `linear-gradient(135deg, #397FED, #0D6C94)` | `.icon-blue` |
| **Products hero bg** | `radial-gradient(ellipse 60% 70% at 50% 40%, rgba(99,102,241,0.20), #F8FAFC 70%)` | `.products-hero` |
| **Products hero text** | `linear-gradient(135deg, #6366F1, #A855F7)` | `.products-hero .gradient-text` |

### Màu nền & text (CSS Variables)

| Variable | Light | Dark |
|----------|-------|------|
| `--bg-primary` | `#FFFFFF` | `#0F172A` |
| `--bg-secondary` | `#F4FBFF` | `#1E293B` |
| `--text-primary` | `#0B1B2B` | `#F1F5F9` |
| `--text-secondary` | `#355066` | `#94A3B8` |
| `--text-tertiary` | `#5E7A90` | `#64748B` |
| `--border-color` | `#D6ECF7` | `#1A3A4D` |
| `--accent` | `#1D97C2` | (giữ nguyên) |

### Màu hardcoded (không qua CSS variable)

| Mã màu | Vai trò |
|--------|---------|
| `#111827` | Heading đậm (benefits, templates section) |
| `#6B7280` | Text muted (hero desc, footer links) |
| `#4B5563` | Text body (benefit cards) |
| `#F9FAFB` | Footer background, benefit cards bg |
| `#F8FAFC` | Templates section bg |
| `#F3F4F6` | Footer top border |
| `#E5E7EB` | Card borders, footer bottom separator |
| `#94A3B8` | Copyright text |
| `#9CA3AF` | Disabled button text (filter "Khác") |

### Font

- **Family**: Inter (Google Fonts) + Averia Serif Libre (logo)
- **Weights**: 400 (body), 500 (medium), 600 (semi-bold, headings nhỏ), 700 (bold, headings), 800 (extra-bold, hero)

### Border radius & Shadow

- Cards: `12–24px` | Buttons: `30–34px` pill | Icon boxes: `16px`
- Card shadow: `0 4px 15px rgba(0,0,0,0.05)` | CTA button: `0 10px 30px rgba(99,102,241,0.3)`

### Dark mode

- Toggle icon: moon/sun, lưu `localStorage`, hỗ trợ `prefers-color-scheme`
- Attribute: `[data-theme="dark"]` trên `<html>`
- Footer, footer-bottom có rule riêng cho dark mode (fallback về CSS variables)

## Thiết kế các trang (từ mockup trong /docs)

### 1. Trang chủ — `index.html` ✅ Đã cập nhật theo mockup
- **Header**: Logo (Averia Serif Libre) + Nav (centered) + Dark mode toggle + Hamburger (mobile)
- **Hero**: Badge tím `#7C3AED` + Heading gradient (`#6366F1→#A855F7→#3B82F6`) + mô tả + CTA "Bắt Đầu Ngay" (bg `#111827`)
- **Lý Do Chọn Chúng Tôi**: 4 icon cards (img SVG)
- **Các Mẫu Nổi Bật**: Slider/carousel, card giữa có badge "Most Popular" (bg `#6366F1`)
- **Lợi ích**: 4 cards với icon SVG (benefits_icon_1–4.svg), bg `#F9FAFB`
- **Showcase**: Background gradient tím (`#6366F1→#4F46E5→#6734DA→#7E22CE`)
  - Wave top: `M0 10L1440 43` (fill `--bg-primary`)
  - Wave bottom: Y range 10%–80% (tím tối thiểu 20%)
  - Badge "CẬP NHẬT NHANH CHÓNG": nền `rgba(124,58,237,0.08)`, border `rgba(124,58,237,0.5)`
  - 2 feature items với icon SVG bo tròn gradient (icon-purple, icon-blue) + mô tả nhỏ
  - Ảnh showcase.svg: `max-width: clamp(280px, 30vw, 460px)`, căn giữa
- **CTA cuối**: Heading gradient text (`#6366F1→#4F46E5`) + button gradient indigo + icon play triangle
- **Footer**: 4 cột chia đều (`repeat(4, 1fr)`), bg `#F9FAFB`, border `#F3F4F6`
  - Dịch Vụ: links → `contact.html?service=xxx#pricing-section`
  - Sản phẩm: links → `products.html?category=xxx`
  - Liên Hệ: "Yêu cầu báo giá" → `contact.html#contactForm`
  - Copyright: căn phải (`justify-content: flex-end`)

### 2. Danh sách thiết kế — `products.html` (hero + filters ✅)
- **Hero**: Background `radial-gradient(ellipse 60% 70% at 50% 40%, rgba(99,102,241,0.20), #F8FAFC 70%)`
  - Heading: `color: #111827`, gradient text `#6366F1→#A855F7`
  - Mô tả: `color: #6B7280`
  - Search bar: `border-radius: 10px`, bg `#ffffff`, border `#E5E7EB`, focus border `#6366F1`
  - Search debounce 300ms, hỗ trợ URL param `?search=keyword`
- **Filters**: Background `#ffffff`, `border-bottom: 1px solid #E5E7EB`
  - Layout: flexbox `justify-content: space-between` — category trái, type phải
  - Buttons: transparent bg, `border-right: 1px solid #E5E7EB` giữa các button, `last-child` không border
  - Active/hover: `color: #6366F1`, `border-bottom: 2px solid #6366F1`
  - Button "Khác ▾": disabled, `color: #9CA3AF`, `cursor: default`
  - Hỗ trợ URL params `?category=xxx` và `?type=xxx`
- **Grid sản phẩm**: 3 cột (responsive 2→1), card có ảnh + badge (NEW/HOT/FREE) + tên + danh mục
- **Phân trang**: « Trang đầu ‹ 1 2 3 ... › Trang cuối » (9 items/page)

### 3. Chi tiết sản phẩm — `product-detail.html`
- **Breadcrumb**: Danh sách thiết kế > Danh mục > Tên sản phẩm
- **Layout 2 cột** (responsive → 1 cột):
  - Trái: Gallery ảnh (main + thumbnails click được)
  - Phải (sidebar sticky): Badge giá + "Dùng ngay" + "Xem demo" + Tính năng + "Yêu cầu tùy chỉnh"
- **Action bar**: Save ♡ | Share ↗ | Last updated
- **Related products**: 4 cards cùng danh mục
- **Modal "Nhận mẫu"**: Form (Email*, Họ tên, SĐT, checkbox) → submit Google Sheets
- **Modal thành công**: Icon check + message + "Đóng"
- URL pattern: `product-detail.html?id=1`

### 4. Dịch vụ — `contact.html`
- **Hero**: Background gradient tím + 2 CTA (white + ghost)
- **Quy Trình Hợp Tác**: 4 bước (icon cards)
- **Các Gói Dịch Vụ**: 4 pricing cards (render từ PRICING trong data.js)
  - BASIC: 699.000đ | PRO (highlighted): 2.999.000đ | PREMIUM: 8.000.000đ | CUSTOM: Liên hệ
  - Click "Chọn Gói Ngay" → scroll to form + auto-select service
- **CTA "Sẵn sàng để bứt phá?"**: Gradient bg, 2 cột (cam kết + form tư vấn)
- **Giải Pháp Dành Cho Ai?**: 2 cards (Doanh Nghiệp + Thương Hiệu Cá Nhân)

## Trạng thái tiến độ

| Trang / Tính năng | File | Trạng thái |
|-------|------|-----------|
| Trang chủ | `index.html` | Hoàn thành |
| Danh sách thiết kế | `products.html` + `products.js` | Hoàn thành |
| Chi tiết sản phẩm | `product-detail.html` + `product-detail.js` | Hoàn thành |
| Dịch vụ | `contact.html` + `contact.js` | Hoàn thành |
| Dark mode | CSS variables + `main.js` | Hoàn thành |
| Mobile menu | Hamburger + slide-in + overlay | Hoàn thành |
| Modal nhận mẫu | `product-detail.js` | Hoàn thành |
| Modal thành công | `product-detail.js` | Hoàn thành |
| Đổi tên thư mục sản phẩm | 152 folders → kebab-case | Hoàn thành |
| Đổi tên HTML → index.html | Tất cả code.html → index.html | Hoàn thành |
| Data sản phẩm | `data.js` — 10 sản phẩm mẫu (2/category) | Hoàn thành (cần thêm 142 sản phẩm còn lại) |

## Data & API

- **Product data**: `assets/js/data.js` — mảng `PRODUCTS` (10 mẫu), `CATEGORIES`, `TYPES`, `PRICING` + helper functions
- **Google Sheet API**: `API_CONFIG.GOOGLE_SHEET_API` trong `data.js` — **đã cấu hình** Google Apps Script URL
- **Forms submit**: `submitToGoogleSheet(formData)` cho form tư vấn + form nhận mẫu
- **Truyền data giữa trang**: `product-detail.html?id=1` → `URLSearchParams` → `getProductById(id)`

### API Input Format

Cả 2 form đều gửi cùng format JSON đến Google Sheets:

```json
{
  "email": "test@gmail.com",
  "phone": "0912345678",
  "reference": "Facebook Ads",
  "service": "premium",
  "note": "Cần tư vấn ngay",
  "status": "tư vấn"
}
```

| Field | Form Tư Vấn (`contact.html`) | Form Nhận Mẫu (`product-detail.html`) |
|-------|------------------------------|---------------------------------------|
| `email` | Input email (required) | Input email (required) |
| `phone` | Input SĐT | Input SĐT |
| `reference` | Input mẫu tham khảo | Auto: `"{product.name} (ID: {id})"` |
| `service` | Select gói dịch vụ | Để trống `''` |
| `note` | Textarea ghi chú | Textarea ghi chú |
| `status` | Auto: `"tư vấn"` | Auto: `"nhận mẫu"` |

### 2 loại sản phẩm (type)

| Type | Folder chứa | demoUrl | Ảnh |
|------|-------------|---------|-----|
| `website` | Project web thuần (HTML/CSS/JS) + ảnh | `./products/{cat}/{slug}/index.html` | Lấy từ folder project |
| `google-sheet` | Chỉ chứa ảnh sản phẩm | Để trống `''`, điền tay link Google Sheet | Lấy từ folder project |

### Quy tắc thêm sản phẩm mới

1. Tạo folder trong `products/{category}/{slug-kebab-case}/`
2. Đặt file HTML nguồn tên `index.html` + ảnh (`screen.png`, `Screenshot_*.jpg`)
3. Thêm object vào mảng `PRODUCTS` trong `data.js` với đầy đủ fields:
   - `id`, `name`, `slug`, `description`, `category`, `type`, `tags`, `price`
   - `images` (mảng paths), `thumbnail`, `demoUrl`
   - `features` (mảng 3 items), `status`, `priority`, `downloads`, `rating`, `updatedAt`

### Cấu trúc folder sản phẩm (sau khi rename)

Tất cả 152 folders đã được rename về kebab-case:
- Bỏ prefix: `Done_`, `Bug_`, số thứ tự, `web_desktop_{category}_`
- Sửa typo: `invitaion` → `invitation`, `birrthday` → `birthday`, `lxxury` → `luxury`, `autum` → `autumn`, `arrt` → `art`
- HTML source: tất cả đã đổi thành `index.html`

## URL Parameters (đã implement)

| Trang | Param | Tác dụng |
|-------|-------|----------|
| `products.html` | `?category=onepage` | Auto-filter theo danh mục |
| `products.html` | `?type=website` | Auto-filter theo loại |
| `products.html` | `?search=keyword` | Auto-fill search + filter |
| `contact.html` | `?service=pro` | Auto-select gói dịch vụ trong form |
| `contact.html` | `#pricing-section` | Scroll đến phần pricing |
| `contact.html` | `#contactForm` | Scroll đến form tư vấn |
| `product-detail.html` | `?id=1` | Load sản phẩm theo ID |

## Ghi chú thêm

- Footer giống nhau trên tất cả 4 trang (DRY — copy HTML), links có URL params
- Header giống nhau trên tất cả 4 trang, chỉ khác class `active` trên nav link
- Pricing cards render động từ `PRICING` array trong `data.js`
- Scroll animations áp dụng cho: `.service-card`, `.template-card`, `.benefit-card`, `.process-step`, `.pricing-card`, `.target-card`, `.product-card`
- Hover color cho links: `#6366F1` (indigo) — thống nhất toàn site

## Plan: Cập nhật 3 trang còn lại theo mockup

Sau khi index.html đã hoàn thành, cần cập nhật 3 trang theo mockup tương ứng trong `/docs`:

### products.html (mockup: `docs/product.svg` + `docs/product.png`)
- [x] Hero: radial-gradient bg, gradient text `#6366F1→#A855F7`, heading `#111827`, search bar rounded 10px ✅
- [x] Filters: flexbox row (category trái, type phải), white bg, border dividers, active indigo, "Khác ▾" disabled ✅
- [ ] Product cards: badges, hover, shadow, border
- [ ] Pagination style
- [x] Footer: đã cập nhật links ✅

### product-detail.html (mockup: `docs/product-detail.svg` + `docs/product-detail.png`)
- [ ] Breadcrumb style
- [ ] Gallery & thumbnails
- [ ] Sidebar: badge giá, buttons, features list
- [ ] Action bar (save, share)
- [ ] Related products grid
- [ ] Modal nhận mẫu + thành công
- [ ] Footer: đã cập nhật links ✅

### contact.html (mockup: `docs/contact.png`)
- [ ] Hero gradient background
- [ ] Process steps cards
- [ ] Pricing cards style (highlighted card)
- [ ] CTA section + form tư vấn
- [ ] Target audience cards
- [ ] URL param `?service=xxx` auto-select: đã implement ✅
- [ ] Footer: đã cập nhật links ✅
