# Templexa — System Overview

> File dành cho AI đọc khi bắt đầu conversation mới.
> Cập nhật lần cuối: 2026-03-26

---

## 1. Tổng quan dự án

**Templexa** là nền tảng cung cấp mẫu thiết kế tùy chỉnh (template customization service).
- URL: `https://phuocpt98.github.io/Templexa/`
- Repo: `git@github.com:phuocpt98/Templexa.git`
- Ngôn ngữ giao diện: **Tiếng Việt**
- Tech: **Vanilla HTML/CSS/JS** — không framework, không bundler
- Sản phẩm: **~216 mẫu** (website, Google Sheet, thiệp mời)
- Khách hàng mục tiêu: Cá nhân & doanh nghiệp nhỏ cần website/thiệp nhanh

---

## 2. Cây thư mục chính

```
Templexa/
├── index.html                  # Trang chủ
├── products.html               # Danh sách thiết kế (grid + filter + search)
├── product-detail.html         # Chi tiết 1 sản phẩm (gallery + sidebar + modal)
├── contact.html                # Dịch vụ & bảng giá (pricing cards + form)
├── products-admin.html         # Admin: hiện tất cả SP kể cả ẩn
├── thu-vien-hieu-ung.html      # Thư viện assets thiệp cưới (dark theme, accordion)
├── bang-gia-thiep-cuoi.html    # Bảng giá thiệp cưới riêng
├── preview.html                # Preview template
│
├── assets/
│   ├── css/style.css           # Stylesheet chính (~3660 dòng)
│   ├── js/
│   │   ├── data.js             # ★ Data chính: PRODUCTS[], CATEGORIES, PRICING, helpers (4294 dòng)
│   │   ├── main.js             # Dark mode, hamburger menu, scroll animations
│   │   ├── products.js         # Grid render, search debounce, filter, pagination
│   │   ├── product-detail.js   # Gallery, sidebar, modal nhận mẫu, related products
│   │   ├── contact.js          # Pricing cards, form validation + submit
│   │   ├── data-loader.js      # Lazy load detail JSON theo category
│   │   └── products-admin.js   # Override: show all + sort by newest
│   ├── data/                   # Detail data (tách ra để lazy load)
│   │   ├── e-commerce.json
│   │   ├── education.json
│   │   ├── invitation.json     # 72KB — nhiều nhất
│   │   ├── onepage.json
│   │   └── portfolio.json
│   └── images/                 # Logo, icons, hero bg, OG image
│
├── products/                   # ★ Folder chứa tất cả sản phẩm mẫu
│   ├── Web/                    # type: website
│   │   ├── E-commerce/         # category: e-commerce
│   │   ├── Education/          # category: education
│   │   ├── Onepage/            # category: onepage
│   │   └── Portfolio/          # category: portfolio
│   ├── Invitation/             # type: invitation
│   │   ├── Wedding/            # category: wedding
│   │   ├── Other/              # category: other (birthday, anniversary, holiday...)
│   │   └── Google-sheet/       # Thiệp Google Sheet
│   ├── Google-sheet/           # type: google-sheet
│   │   ├── E-commerce/
│   │   ├── Education/
│   │   └── Portfolio/
│   └── shared/                 # ★ Assets dùng chung cho thiệp cưới
│       ├── wedding-data.js     # Single source of truth (855 dòng)
│       ├── animations.css      # Thư viện animation cho thiệp
│       ├── wedding/            # JS/CSS/API cho thiệp cưới
│       │   ├── scripts.js      # Logic chung thiệp
│       │   ├── styles.css      # Style chung thiệp
│       │   ├── names.js        # Xử lý tên cô dâu/chú rể
│       │   └── wishes-api.js   # API lời chúc
│       ├── fonts/              # Font tùy chỉnh (BeyondPerfection, Hastegi, Lora, Rift, UVN)
│       ├── images/wedding/     # Ảnh assets
│       │   ├── backgrounds/    # Nền thiệp (11 category, 60+ ảnh)
│       │   └── icons/          # Icon trang trí (100+ ảnh)
│       ├── music/              # Nhạc nền thiệp (11 bài)
│       └── new/                # Ảnh mới chờ catalog
│
├── docs/                       # Tài liệu
├── .claude/                    # Claude Code config
│   ├── settings.local.json     # Permissions
│   └── commands/               # Slash commands (skills)
├── node_modules/               # sharp, puppeteer, qrcode
├── package.json
├── CLAUDE.md                   # Hướng dẫn kỹ thuật chi tiết
└── CNAME                       # Custom domain
```

---

## 3. Kiến trúc dữ liệu

### 3.1 PRODUCTS (data.js)

Mảng `PRODUCTS[]` chứa ~216 object, mỗi product có:

```javascript
{
    id: 206,                    // ID duy nhất, tự tăng
    name: 'Tên sản phẩm',
    slug: 'ten-san-pham',       // URL-friendly
    description: 'Mô tả...',
    category: 'e-commerce',     // onepage | e-commerce | education | portfolio | wedding | other
    type: 'website',            // website | google-sheet | invitation
    tags: ['tag1', 'tag2'],
    price: 'free',              // 'free' hoặc giá
    images: ['./products/.../screen.png', ...],  // screen.png luôn đầu
    thumbnail: './products/.../screen.png',
    demoUrl: './products/.../index.html',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    status: 'new',              // new | hot | featured | ''
    priority: 0,                // Nhỏ = hiển thị trước
    downloads: 3,               // 1-10 (display)
    rating: 4.9,                // 4.7-4.9 (display)
    showInSlider: true,         // Hiện trên slider trang chủ
    isPublic: true,             // false = ẩn khỏi danh sách (chỉ hiện ở admin)
    updatedAt: '2026-03-24',
}
```

### 3.2 PRICING (data.js)

4 gói dịch vụ, render trên `contact.html`:

| Gói | Giá | Gốc | Giảm | Highlighted |
|-----|-----|-----|------|-------------|
| BASIC | 699.000đ | 1.500.000đ | -55% | No |
| PRO | 2.999.000đ | 5.000.000đ | -40% | **Yes** |
| PREMIUM | 8.000.000đ | — | — | No |
| CUSTOM | Liên hệ | — | — | No |

### 3.3 WEDDING_DATA (products/shared/wedding-data.js)

**Single source of truth** cho tất cả assets thiệp cưới. Cấu trúc:

```javascript
WEDDING_DATA = {
    backgrounds: {
        basePath: 'products/shared/images/wedding/backgrounds/',
        categories: [/* 11 categories */],
        items: [/* 60+ backgrounds, each: { id, file, name, category, tags, colors, usage } */]
    },
    icons: {
        basePath: 'products/shared/images/wedding/icons/',
        items: [/* 100+ icons, each: { id, file, name, tags, usage } */]
        // ⚠ GOTCHA: icon.file đã bao gồm 'icons/' prefix → dùng basePath.replace(/icons\/$/, '') + file
    },
    elements: {
        basePath: 'products/shared/images/',
        items: [/* 38+ elements, each: { id, file, name, tags, usage } */]
    },
    photoCollections: [/* 9 bộ ảnh preset */],
    music: [/* 11 bài nhạc nền */],
    fonts: [/* 6 font families */],
    generalIcons: [/* 5 icon chung */],
    stylePresets: {/* 7 preset: elegant, modern, romantic, traditional-vn, sage-botanical, boho-rustic, minimalist */}
}
```

**Query helpers:**
- `findBackgrounds({ category, tags, colors, usage })` — Lọc backgrounds
- `findIcons(tags)` — Tìm icons theo tags
- `findElements(tags)` — Tìm elements theo tags
- `findPhotoSets(tags)` — Tìm photo collections
- `findMusic(tags)` — Tìm nhạc
- `getStylePreset(name)` — Lấy style preset

### 3.4 Detail Data (assets/data/*.json)

Lazy load qua `data-loader.js`. Mỗi category 1 file JSON chứa mô tả chi tiết, screenshots bổ sung cho từng product. Merge vào PRODUCTS khi user mở detail page.

---

## 4. Luồng hoạt động chính

### 4.1 Trang sản phẩm (products.html → products.js)

```
URL params (?category=, ?type=, ?search=)
  → filterProducts({ category, type, search })
  → paginateProducts(filtered, page, 9)
  → Render grid 3 cột
  → Click card → product-detail.html?id=X
```

### 4.2 Chi tiết sản phẩm (product-detail.html → product-detail.js)

```
URL param ?id=X
  → getProductById(X) từ PRODUCTS[]
  → Lazy load detail JSON (data-loader.js)
  → Render gallery (ảnh chính + thumbnails)
  → Render sidebar (features, CTA buttons)
  → Render related products (getRelatedProducts)
  → Modal "Nhận mẫu" → submitToGoogleSheet()
  → Update SEO: title, meta description, OG tags, JSON-LD
```

### 4.3 Dịch vụ & liên hệ (contact.html → contact.js)

```
Render PRICING cards từ data.js
  → Click CTA → scroll to form + auto-select service
  → Form submit → submitToGoogleSheet({ email, phone, service, note, reference, status: 'tư vấn' })
```

### 4.4 Form submissions (cả 2 form)

```javascript
submitToGoogleSheet(formData)
  → POST to Google Apps Script webhook (mode: 'no-cors')
  → Data ghi vào Google Sheet (sheet: 'sale')
```

| Field | Form Tư Vấn (contact) | Form Nhận Mẫu (detail) |
|-------|----------------------|------------------------|
| email | Required | Required |
| name | — | Input |
| phone | Input | Input |
| reference | Input | Auto: window.location.href |
| service | Select gói | '' |
| note | Textarea | '' |
| status | 'tư vấn' | 'submit' |

---

## 5. Design System

### 5.1 Màu chính (Indigo/Purple)

| Vai trò | Mã | Dùng ở |
|---------|-----|--------|
| Indigo | `#6366F1` | Buttons, active states, badges |
| Indigo Dark | `#4F46E5` | Hover, gradient end |
| Purple | `#7C3AED` | Hero badge, showcase icon |
| Blue | `#3B82F6` | Hero gradient end, contact CTA |

### 5.2 CSS Variables (Light → Dark)

| Variable | Light | Dark |
|----------|-------|------|
| --bg-primary | #FFFFFF | #0F172A |
| --bg-secondary | #F4FBFF | #1E293B |
| --text-primary | #0B1B2B | #F1F5F9 |
| --text-secondary | #355066 | #94A3B8 |
| --border-color | #D6ECF7 | #1A3A4D |
| --card-bg | #FFFFFF | #1E293B |

### 5.3 Dark Mode

- Toggle: moon/sun icon, lưu localStorage
- **Mặc định: light** — không auto-detect system
- Attribute: `[data-theme="dark"]` trên `<html>`
- Quy tắc: Nếu hardcode hex → BẮT BUỘC thêm dark override
- Block tập trung trong style.css: "DARK MODE — ALL HARDCODED OVERRIDES"

### 5.4 Responsive breakpoints

| BP | Áp dụng |
|----|---------|
| 1024px | Tablet: 2 cột, detail 1 cột |
| 768px | Mobile: 1 cột, min-height auto |
| 480px | Small: process 1 cột, buttons stack |

### 5.5 Font & Components

- Font: **Inter** (body) + **Averia Serif Libre** (logo)
- Cards: `border-radius: 12-24px`, shadow `0 4px 15px rgba(0,0,0,0.05)`
- Buttons: `border-radius: 30-34px` pill, gradient `#6366F1 → #8B5CF6`

---

## 6. Hệ thống thiệp cưới

### 6.1 Kiến trúc

Mỗi thiệp cưới là 1 folder trong `products/Invitation/Wedding/` hoặc `products/Invitation/Other/`, chứa:
- `index.html` — Thiệp HTML hoàn chỉnh
- `prompt.txt` — Prompt đã dùng để gen thiệp
- Ảnh screenshots
- (Có thể link tới shared assets qua relative path)

### 6.2 Shared resources (products/shared/)

- `wedding-data.js` — Data catalog tất cả assets (backgrounds, icons, elements, music, fonts, style presets)
- `wedding/scripts.js` — Logic JS chung (countdown, music player, gallery, wishes)
- `wedding/styles.css` — CSS chung (animations, responsive, components)
- `wedding/names.js` — Xử lý tên tiếng Việt
- `wedding/wishes-api.js` — API gửi/nhận lời chúc
- `animations.css` — Thư viện animation (entrance, scroll, parallax)
- `fonts/` — Font tùy chỉnh
- `images/wedding/` — Tất cả ảnh assets
- `music/` — Nhạc nền

### 6.3 Thư viện hiệu ứng (thu-vien-hieu-ung.html)

- Dark-theme only, gold accent
- 6 accordion sections: Effects, Photos, Elements, Fonts, Music, Backgrounds
- Lazy load nội dung qua `data-lazy` attribute
- Render từ WEDDING_DATA (không hardcode)
- Lightbox cho xem ảnh lớn

### 6.4 Style Presets

7 preset có sẵn, mỗi preset gồm palette màu + font recommendations:
- `elegant` — Serif, gold/cream
- `modern` — Sans-serif, minimal
- `romantic` — Script fonts, soft colors
- `traditional-vn` — Truyền thống Việt Nam
- `sage-botanical` — Sage green, botanical
- `boho-rustic` — Boho, earth tones
- `minimalist` — Clean, white space

---

## 7. URL Routing & Parameters

| Trang | Param | Tác dụng |
|-------|-------|----------|
| products.html | `?category=onepage` | Filter theo danh mục |
| products.html | `?type=website` | Filter theo loại |
| products.html | `?type=invitation` | Filter thiệp mời |
| products.html | `?search=keyword` | Tìm kiếm |
| contact.html | `?service=pro` | Auto-select gói dịch vụ |
| contact.html | `#pricing-section` | Scroll tới pricing |
| contact.html | `#contactForm` | Scroll tới form |
| product-detail.html | `?id=123` | Load sản phẩm theo ID |

---

## 8. Dev Tools & Commands

### 8.1 Dependencies (package.json)

- `sharp` ^0.34.5 — Image processing (convert WebP, crop, resize)
- `puppeteer` ^24.39.0 — Headless browser (screenshot sản phẩm)
- `qrcode` ^1.5.4 — Gen mã QR

### 8.2 Claude Code Skills (/.claude/commands/)

| Skill | Chức năng |
|-------|----------|
| `/gen-wedding` | Gen thiệp cưới HTML + nhạc nền + prompt.txt |
| `/gen-wedding-pro` | Gen thiệp cưới PRO (kết hợp frontend-design) |
| `/gen-landing` | Gen landing page HTML + entry data.js |
| `/catalog-assets` | Phân loại ảnh mới → tag, rename, WebP, cập nhật wedding-data.js |
| `/convert-webp` | Convert PNG/JPG → WebP, cập nhật references |
| `/scan-images` | Quét ảnh folder sản phẩm → cập nhật images[] trong data.js |
| `/gen-qr` | Gen mã QR link tới sản phẩm |
| `/sort-music` | Phân loại file MP3 vào folder thể loại |

---

## 9. Quy trình phổ biến

### 9.1 Thêm sản phẩm mới

1. Tạo folder `products/{Type}/{Category}/{tên-folder}/`
2. Đặt file: `index.html` + ảnh
3. Bảo AI: "quét giúp tôi `products/.../{tên-folder}` thêm vào data.js"
4. AI quét folder → sinh PRODUCTS entry → chèn vào data.js

### 9.2 Thêm assets thiệp cưới

1. Đặt ảnh mới vào `products/shared/new/{subfolder}/`
2. Chạy `/catalog-assets` → AI phân loại, tag, convert WebP, di chuyển, cập nhật wedding-data.js

### 9.3 Gen thiệp cưới

1. Chạy `/gen-wedding` hoặc `/gen-wedding-pro` với thông tin cô dâu/chú rể
2. AI chọn assets từ WEDDING_DATA, gen HTML thiệp
3. Output: folder sản phẩm + entry data.js

---

## 10. Lưu ý quan trọng

### Conventions bắt buộc

- **Không inline styles cho màu** — luôn dùng CSS class để dark mode hoạt động
- **Mặc định light mode** — chỉ dark khi user click toggle
- Khi thêm CSS hardcode màu → thêm `[data-theme="dark"]` override
- JS: Vanilla ES6+, IIFE pattern, không thêm thư viện mới
- Responsive-first: kiểm tra mobile
- Footer + Header giống nhau 4 trang chính

### wedding-data.js gotchas

- `icons.basePath` = `.../icons/` nhưng `icon.file` đã có prefix `icons/` → dùng `basePath.replace(/icons\/$/, '') + file`
- `elements` không có issue này: `basePath` = `.../images/`, `file` = `wedding-elements/xxx.webp`
- File có `module.exports` ở cuối → dùng được cả browser và Node.js

### SEO

- Mỗi trang có đầy đủ: meta description, OG tags, Twitter Card, JSON-LD
- `product-detail.js` cập nhật dynamic: title, meta, OG khi load sản phẩm
- OG image: `assets/images/lgo-v2.png`

---

## 11. File quan trọng cần đọc khi làm việc

| Khi làm gì | Đọc file |
|-------------|----------|
| Sửa giao diện | `assets/css/style.css` |
| Sửa data sản phẩm | `assets/js/data.js` |
| Sửa logic trang sản phẩm | `assets/js/products.js` |
| Sửa detail page | `assets/js/product-detail.js` |
| Sửa pricing/form | `assets/js/contact.js` |
| Làm việc với thiệp cưới | `products/shared/wedding-data.js` |
| Xem design system chi tiết | `CLAUDE.md` |
| Xem danh sách sản phẩm | `products/products.md` |
| Xem thư viện hiệu ứng | `thu-vien-hieu-ung.html` |
