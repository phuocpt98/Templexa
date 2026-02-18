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

- **Màu chính**: `#1D97C2` (cyan) — gradient 7 màu `#85C6DE → #6EBBD7 → #55AFD0 → #1D97C2 → #1F88B8 → #2079AF → #2269AA`
- **Primary**: `#1D97C2` (M4) | Hover: `#1F88B8` (M5) | Active: `#2079AF` (M6) | Deep: `#2269AA` (M7)
- **Background**: `#FFFFFF` | Subtle: `#F4FBFF` | Card hover: `#EAF7FF` | Border: `#D6ECF7`
- **Text**: Main `#0B1B2B` | Secondary `#355066` | Muted `#5E7A90`
- **Font**: Inter (400, 500, 600, 700, 800)
- **Border radius**: Bo tròn cho cards (`12-16px`), buttons (`30px pill`)
- **Shadow**: Nhẹ cho cards, header khi scroll
- **Dark mode**: Toggle icon moon/sun, lưu `localStorage`, hỗ trợ system preference
  - Light: `--bg-primary: #fff`, `--text-primary: #0B1B2B`
  - Dark: `--bg-primary: #0F172A`, `--text-primary: #F1F5F9`

## Thiết kế các trang (từ mockup trong /docs)

### 1. Trang chủ — `index.html`
- **Header**: Logo + Nav (centered) + Dark mode toggle + Hamburger (mobile)
- **Hero**: Badge + Heading gradient + mô tả + CTA "Bắt Đầu Ngay"
- **Lý Do Chọn Chúng Tôi**: 4 icon cards
- **Các Mẫu Nổi Bật**: Slider/carousel 5 cards, card giữa có badge "Most Popular"
- **Lợi ích**: 4 cards (Đội Ngũ, Tiết Kiệm, Cấu Trúc, Tùy Chỉnh)
- **Showcase**: Background gradient tím, 2 cột (content + image), wave dividers
- **CTA cuối**: Heading + mô tả + button gradient
- **Footer**: 4 cột (Logo, Dịch Vụ, Sản phẩm, Liên Hệ) + copyright

### 2. Danh sách thiết kế — `products.html`
- **Hero**: Heading gradient + mô tả + thanh search (debounce 300ms)
- **Bộ lọc hàng 1** (danh mục): Tất cả | One page | E-commerce | Thiệp mời | Portfolio | Giáo dục
- **Bộ lọc hàng 2** (loại): Tất cả mẫu | Website | Google Sheet
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

## Ghi chú thêm

- Footer giống nhau trên tất cả 4 trang (DRY — copy HTML)
- Header giống nhau trên tất cả 4 trang, chỉ khác class `active` trên nav link
- Pricing cards render động từ `PRICING` array trong `data.js`
- Scroll animations áp dụng cho: `.service-card`, `.template-card`, `.benefit-card`, `.process-step`, `.pricing-card`, `.target-card`, `.product-card`
