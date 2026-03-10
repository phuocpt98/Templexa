# Checklist — Templexa trên GitHub Pages

> Checklist triển khai Templexa (HTML/CSS/JS thuần) trên GitHub Pages.

---

## Mục lục

1. [Cấu trúc file cần có](#1-cấu-trúc-file-cần-có)
2. [Custom Domain](#2-custom-domain)
3. [SEO — Meta Tags](#3-seo--meta-tags)
4. [Favicon & Logo trên tab trình duyệt](#4-favicon--logo-trên-tab-trình-duyệt)
5. [Ảnh hiển thị khi gửi link (OG Image)](#5-ảnh-hiển-thị-khi-gửi-link-og-image)
6. [Sitemap](#6-sitemap)
7. [Robots.txt](#7-robotstxt)
8. [Tối ưu ảnh](#8-tối-ưu-ảnh)
9. [Google Search Console](#9-google-search-console)
10. [Google Analytics](#10-google-analytics)
11. [Cloudflare CDN](#11-cloudflare-cdn)
12. [Checklist khi thay domain](#12-checklist-khi-thay-domain)
13. [Checklist trước khi Go Live](#13-checklist-trước-khi-go-live)

---

## 1. Cấu trúc file cần có

```
Templexa/
├── index.html                    # Trang chủ
├── products.html                 # Danh sách thiết kế
├── product-detail.html           # Chi tiết sản phẩm
├── contact.html                  # Dịch vụ / Liên hệ
├── CNAME                         # Custom domain (khi có)
├── sitemap.xml                   # Danh sách URL cho Google
├── robots.txt                    # Hướng dẫn bot crawl
├── favicon-32x32.png             # Favicon PNG
├── favicon-16x16.png             # Favicon PNG nhỏ
├── apple-touch-icon.png          # Icon bookmark iPhone (180x180)
├── android-chrome-192x192.png    # Icon Android (192x192)
├── assets/
│   ├── css/
│   │   └── style.css             # Stylesheet chính
│   ├── js/
│   │   ├── data.js               # Data products, categories, pricing, helpers
│   │   ├── main.js               # Dark mode, hamburger, slider, scroll effects
│   │   ├── products.js           # Search, filter, render grid, phân trang
│   │   ├── product-detail.js     # Gallery, modal nhận mẫu, related products
│   │   └── contact.js            # Pricing cards, form validation + submit
│   └── images/
│       ├── logo.svg              # Logo gốc (vector)
│       ├── logo_v2.svg           # Logo v2
│       ├── og-image.png          # Ảnh preview khi share link (1200x630)
│       ├── background_hero_index.png
│       ├── showcase.svg
│       ├── benefits_icon_*.svg   # Icons lợi ích
│       └── contact_icon_*.svg    # Icons quy trình
├── products/
│   ├── Web/                      # type: website
│   │   ├── Onepage/              # category: onepage
│   │   ├── E-commerce/           # category: e-commerce
│   │   ├── Invitation/           # category: invitation
│   │   ├── Portfolio/            # category: portfolio
│   │   └── Education/            # category: education
│   ├── Google-sheet/             # type: google-sheet
│   │   ├── E-commerce/
│   │   ├── Education/
│   │   └── Portfolio/
│   └── Trending/                 # type: trending
│       ├── Confession/
│       ├── Invitation/
│       └── OnePage/
└── docs/                         # Mockup, tài liệu
```

---

## 2. Custom Domain

### 2.1. Tạo file CNAME
Tạo file `CNAME` ở root repo, nội dung chỉ 1 dòng:
```
templexa.com
```

### 2.2. Cấu hình DNS

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |
| CNAME | www | `phuocpt98.github.io` | 3600 |

### 2.3. Bật trên GitHub
1. Repo > **Settings** > **Pages**
2. **Custom domain**: nhập domain > **Save**
3. Đợi 5-30 phút
4. Tick **Enforce HTTPS**

### 2.4. Lưu ý quan trọng
- Khi dùng custom domain, path `/Templexa/` sẽ **KHÔNG còn nữa**
- Website serve từ root `/`
- Phải cập nhật tất cả URL từ `https://phuocpt98.github.io/Templexa` → `https://templexa.com`

---

## 3. SEO — Meta Tags

### 3.1. Thẻ meta bắt buộc trong `<head>` mỗi trang

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Tiêu đề trang — Templexa</title>
    <meta name="description" content="Mô tả trang 150-160 ký tự">
    <meta name="keywords" content="từ khóa SEO">
    <meta name="author" content="Templexa Studio">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#6366F1">

    <link rel="canonical" href="https://phuocpt98.github.io/Templexa/{page}">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Tiêu đề trang">
    <meta property="og:description" content="Mô tả trang">
    <meta property="og:url" content="https://phuocpt98.github.io/Templexa/{page}">
    <meta property="og:image" content="https://phuocpt98.github.io/Templexa/assets/images/og-image.png">
    <meta property="og:site_name" content="Templexa">
    <meta property="og:locale" content="vi_VN">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Tiêu đề trang">
    <meta name="twitter:description" content="Mô tả trang">
    <meta name="twitter:image" content="https://phuocpt98.github.io/Templexa/assets/images/og-image.png">

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="./assets/images/logo.svg">
    <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png">
</head>
```

### 3.2. Meta description từng trang

| Trang | Title | Description |
|-------|-------|-------------|
| `index.html` | Templexa - Mẫu Thiết Kế Tùy Chỉnh Cho Bạn | Kho mẫu thiết kế website đa dạng, hơn 150 mẫu sẵn sàng sử dụng |
| `products.html` | Danh Sách Thiết Kế - Templexa | Khám phá hơn 150 mẫu, lọc theo danh mục, xem demo trực tiếp |
| `product-detail.html` | Chi Tiết Sản Phẩm - Templexa | Gallery ảnh, tính năng, demo trực tiếp và yêu cầu tùy chỉnh |
| `contact.html` | Dịch Vụ Thiết Kế - Templexa | 4 gói từ 699K đến Premium, quy trình chuyên nghiệp, tư vấn miễn phí |

### 3.3. JSON-LD Schema

| Trang | Schema Type | Nội dung |
|-------|-------------|----------|
| `index.html` | `Organization` + `WebSite` | Thông tin tổ chức, logo, email, SearchAction |
| `products.html` | `CollectionPage` + `BreadcrumbList` | Trang danh mục với breadcrumb |
| `product-detail.html` | `Product` | Dynamic — JS cập nhật name, images, rating, offers |
| `contact.html` | `Service` + `OfferCatalog` | Dịch vụ với 4 gói giá |

### 3.4. Checklist SEO mỗi trang

- [ ] `<title>` duy nhất, chứa keyword, dưới 60 ký tự
- [ ] `<meta name="description">` duy nhất, 150-160 ký tự
- [ ] `<link rel="canonical">` trỏ đúng URL
- [ ] Heading H1 duy nhất, chứa keyword chính
- [ ] Tất cả `<img>` có thuộc tính `alt`
- [ ] Internal links giữa các trang liên quan

---

## 4. Favicon & Logo trên tab trình duyệt

### 4.1. Cách tạo favicon từ logo SVG

```bash
npm install sharp
```

```javascript
const sharp = require('sharp');

async function main() {
    const svg = 'assets/images/logo.svg';

    await sharp(svg, { density: 300 }).resize(32, 32).png().toFile('favicon-32x32.png');
    await sharp(svg, { density: 300 }).resize(16, 16).png().toFile('favicon-16x16.png');
    await sharp(svg, { density: 300 }).resize(180, 180).png().toFile('apple-touch-icon.png');
    await sharp(svg, { density: 300 }).resize(192, 192).png().toFile('android-chrome-192x192.png');

    console.log('Done!');
}
main();
```

### 4.2. Thêm vào HTML

```html
<link rel="icon" type="image/svg+xml" href="./assets/images/logo.svg">
<link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png">
```

### 4.3. Thứ tự ưu tiên trình duyệt
1. SVG — trình duyệt hiện đại (sắc nét mọi kích thước)
2. PNG 32x32 — trình duyệt cũ
3. PNG 16x16 — fallback
4. Apple Touch Icon — bookmark trên iOS
5. Android Chrome — add to home screen trên Android

---

## 5. Ảnh hiển thị khi gửi link (OG Image)

### 5.1. Yêu cầu ảnh OG Image

| Thuộc tính | Giá trị |
|------------|---------|
| Kích thước | **1200 x 630 px** (tỉ lệ 1.91:1) |
| Format | PNG hoặc JPG |
| Dung lượng | Dưới **300KB** |
| Nội dung | Logo Templexa + tagline + mô tả ngắn |

File hiện tại: `assets/images/og-image.png`

### 5.2. Thêm vào HTML

```html
<meta property="og:image" content="https://phuocpt98.github.io/Templexa/assets/images/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:image" content="https://phuocpt98.github.io/Templexa/assets/images/og-image.png">
```

### 5.3. Kiểm tra preview

| Nền tảng | Tool kiểm tra |
|----------|---------------|
| Facebook | https://developers.facebook.com/tools/debug/ |
| LinkedIn | https://www.linkedin.com/post-inspector/ |
| Twitter | https://cards-dev.twitter.com/validator |
| Chung | https://www.opengraph.xyz/ |

### 5.4. Lưu ý
- URL ảnh phải dùng **đường dẫn tuyệt đối** (https://...)
- Facebook/Zalo **cache ảnh** — dùng Facebook Debug Tool để xóa cache nếu đổi ảnh

---

## 6. Sitemap

### 6.1. Cấu trúc sitemap cho Templexa

Gồm 4 trang chính + 5 URL category (sản phẩm chỉ đến cấp danh mục):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    <!-- Trang chủ -->
    <url>
        <loc>https://phuocpt98.github.io/Templexa/</loc>
        <lastmod>2026-03-10</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>

    <!-- Danh sách thiết kế (tất cả) -->
    <url>
        <loc>https://phuocpt98.github.io/Templexa/products.html</loc>
        <lastmod>2026-03-10</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>

    <!-- Category: Onepage -->
    <url>
        <loc>https://phuocpt98.github.io/Templexa/products.html?category=onepage</loc>
        <lastmod>2026-03-10</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>

    <!-- Category: E-commerce -->
    <url>
        <loc>https://phuocpt98.github.io/Templexa/products.html?category=e-commerce</loc>
        <lastmod>2026-03-10</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>

    <!-- Category: Invitation -->
    <url>
        <loc>https://phuocpt98.github.io/Templexa/products.html?category=invitation</loc>
        <lastmod>2026-03-10</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>

    <!-- Category: Portfolio -->
    <url>
        <loc>https://phuocpt98.github.io/Templexa/products.html?category=portfolio</loc>
        <lastmod>2026-03-10</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>

    <!-- Category: Education -->
    <url>
        <loc>https://phuocpt98.github.io/Templexa/products.html?category=education</loc>
        <lastmod>2026-03-10</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>

    <!-- Dịch vụ / Liên hệ -->
    <url>
        <loc>https://phuocpt98.github.io/Templexa/contact.html</loc>
        <lastmod>2026-03-10</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

</urlset>
```

### 6.2. Quy tắc priority

| Loại trang | Priority | Changefreq |
|------------|----------|------------|
| Trang chủ | 1.0 | weekly |
| Danh sách thiết kế (tất cả) | 0.9 | weekly |
| Danh sách theo category | 0.8 | weekly |
| Dịch vụ / Liên hệ | 0.8 | monthly |

### 6.3. Checklist
- [ ] Liệt kê 4 trang chính + 5 category URLs
- [ ] Dùng URL tuyệt đối (https://phuocpt98.github.io/Templexa/...)
- [ ] `lastmod` đúng ngày cập nhật cuối
- [ ] Không liệt kê product-detail.html (render dynamic từ JS)
- [ ] Đã submit lên Google Search Console

---

## 7. Robots.txt

### 7.1. File `robots.txt` cho Templexa

```
User-agent: *
Allow: /

# Main pages
Allow: /index.html
Allow: /products.html
Allow: /product-detail.html
Allow: /contact.html

# Assets
Allow: /assets/

# Product demo files
Allow: /products/

# Sitemap
Sitemap: https://phuocpt98.github.io/Templexa/sitemap.xml
```

### 7.2. Checklist
- [ ] File đặt ở root (`/robots.txt`)
- [ ] Sitemap URL đúng domain
- [ ] Không chặn nhầm trang quan trọng

---

## 8. Tối ưu ảnh

### 8.1. Vấn đề
Templexa có **153 sản phẩm**, mỗi sản phẩm 5-6 ảnh PNG. Ảnh nặng = load chậm.

### 8.2. Giải pháp: Chuyển PNG/JPG → WebP

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function findImages(dir) {
    const results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) results.push(...await findImages(full));
        else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) results.push(full);
    }
    return results;
}

async function main() {
    const files = await findImages('./assets/images');

    for (const file of files) {
        const webp = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        const original = fs.statSync(file).size;

        await sharp(file).webp({ quality: 80 }).toFile(webp);

        const converted = fs.statSync(webp).size;

        if (converted >= original) {
            fs.unlinkSync(webp);
            console.log(`SKIP: ${file} (WebP lớn hơn gốc)`);
        } else {
            fs.unlinkSync(file);
            const saved = ((1 - converted / original) * 100).toFixed(1);
            console.log(`${path.basename(file)} → .webp (-${saved}%)`);
        }
    }
}
main();
```

### 8.3. Sau khi convert
- Cập nhật reference `.png` / `.jpg` → `.webp` trong HTML, CSS, JS (đặc biệt `data.js`)
- Kiểm tra: `grep -r "\.png" --include="*.html" --include="*.css" --include="*.js"`

### 8.4. Lazy loading
```html
<img src="image.webp" alt="Mô tả" loading="lazy" width="800" height="600">
```

### 8.5. Bảng tham khảo dung lượng

| Loại ảnh | PNG | WebP (quality 80) | Giảm |
|----------|-----|-----|------|
| Ảnh sản phẩm | 200-300KB | 10-20KB | ~93% |
| Ảnh background | 500KB-1MB | 30-50KB | ~95% |
| Ảnh thumbnail | 50-200KB | 20-100KB | ~50% |

---

## 9. Google Search Console

### 9.1. Thêm property
1. Vào [search.google.com/search-console](https://search.google.com/search-console)
2. **Thêm tài sản** > **Tiền tố URL** > nhập `https://phuocpt98.github.io/Templexa`
3. Xác minh bằng **file HTML**: tải file Google cho, đặt vào root repo

### 9.2. Submit sitemap
1. Menu trái > **Sơ đồ trang web** (Sitemaps)
2. Nhập: `sitemap.xml`
3. Click **Gửi**

### 9.3. Đẩy nhanh index
- **Kiểm tra URL** > nhập URL từng trang > **Yêu cầu lập chỉ mục**
- Ưu tiên: trang chủ → products → contact → các category

### 9.4. Theo dõi
- Kiểm tra index: gõ `site:phuocpt98.github.io/Templexa` trên Google
- Thời gian index trung bình:
  - Trang chủ: 1-3 ngày
  - Trang chính: 1-2 tuần
  - Toàn bộ: 2-4 tuần

---

## 10. Google Analytics

### 10.1. Tạo tài khoản GA4
1. Vào [analytics.google.com](https://analytics.google.com)
2. Tạo tài khoản > Tạo property
3. Lấy **Measurement ID** (dạng `G-XXXXXXXXXX`)

### 10.2. Thêm vào HTML
Thêm ngay trước `</head>` của **4 trang** (index, products, product-detail, contact):

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 10.3. Theo dõi gì?
- Số lượt truy cập, nguồn traffic
- Trang nào được xem nhiều nhất
- Category nào phổ biến nhất
- Thời gian ở lại trang
- Tỉ lệ bounce rate

---

## 11. Cloudflare CDN

### 11.1. Tại sao cần?
- CDN **300+ server** toàn cầu — load nhanh
- Cache ảnh, CSS, JS tại edge server
- Auto minify HTML/CSS/JS
- DDoS protection + SSL miễn phí
- **Miễn phí** (plan Free đủ dùng)

### 11.2. Cách thiết lập
1. Đăng ký [cloudflare.com](https://cloudflare.com) > Add site > chọn Free
2. Cloudflare tự quét DNS, kiểm tra đủ A records + CNAME
3. Bật **Proxied** (đám mây cam) cho tất cả records
4. Đổi **Nameserver** tại nhà cung cấp domain sang nameserver Cloudflare
5. Đợi 15-30 phút

### 11.3. Cấu hình khuyến nghị
- **SSL/TLS**: mode **Full**
- **Always Use HTTPS**: bật
- **Auto Minify**: bật JavaScript, CSS, HTML
- **Browser Cache TTL**: 1 month
- **Page Rules**: `templexa.com/assets/*` → Cache Everything, Edge TTL 1 month

---

## 12. Checklist khi thay domain

Khi chuyển từ `phuocpt98.github.io/Templexa` sang custom domain:

### Code changes
- [ ] Tạo file `CNAME` với domain mới
- [ ] Replace toàn bộ `https://phuocpt98.github.io/Templexa` → `https://templexa.com` trong tất cả file
- [ ] Cập nhật `sitemap.xml` — tất cả `<loc>` URL
- [ ] Cập nhật `robots.txt` — Sitemap URL
- [ ] Cập nhật `data.js` — nếu có URL tuyệt đối
- [ ] Cập nhật JSON-LD Schema trong 4 trang HTML
- [ ] Commit & push

### DNS & GitHub
- [ ] Cấu hình DNS (4 A records + CNAME www)
- [ ] GitHub Settings > Pages > Custom domain > nhập domain mới
- [ ] Bật Enforce HTTPS

### Google Search Console
- [ ] Thêm property mới cho domain mới
- [ ] Xác minh domain mới
- [ ] Submit sitemap mới
- [ ] **KHÔNG xóa** property cũ (giữ ít nhất 6 tháng)

### Kiểm tra
- [ ] `https://templexa.com` — load bình thường
- [ ] `https://www.templexa.com` — redirect đúng
- [ ] HTTPS hoạt động (ổ khóa xanh)
- [ ] Canonical URL đúng domain mới
- [ ] `sitemap.xml` — tất cả URL đúng
- [ ] `robots.txt` — sitemap URL đúng
- [ ] Dark mode hoạt động
- [ ] Filter sản phẩm theo category hoạt động
- [ ] Form liên hệ + form nhận mẫu gửi được
- [ ] Ảnh load đúng (products + assets)
- [ ] Favicon hiển thị trên tab
- [ ] Share link Facebook/Zalo hiển thị ảnh preview đúng

---

## 13. Checklist trước khi Go Live

### Technical
- [ ] 4 trang có `<title>` và `<meta description>` duy nhất
- [ ] 4 trang có `<link rel="canonical">`
- [ ] Tất cả `<img>` có `alt` attribute
- [ ] Ảnh đã convert WebP (nếu cần)
- [ ] Ảnh có `loading="lazy"` (trừ ảnh above-the-fold)
- [ ] Favicon hiển thị đúng
- [ ] OG Image hoạt động (test bằng Facebook Debug Tool)
- [ ] `sitemap.xml` liệt kê đầy đủ (4 trang + 5 category)
- [ ] `robots.txt` đúng
- [ ] Responsive trên mobile (1024, 768, 480)
- [ ] Dark mode hoạt động
- [ ] Link nội bộ không bị gãy
- [ ] HTTPS hoạt động

### Chức năng
- [ ] Slider trang chủ hiển thị đúng (sản phẩm `showInSlider: true`)
- [ ] Filter category + type hoạt động
- [ ] Search sản phẩm hoạt động (debounce 300ms)
- [ ] Phân trang 9 items/page
- [ ] Product detail: gallery + thumbnails
- [ ] Modal nhận mẫu: validate + gửi Google Sheets
- [ ] Pricing cards: click → scroll to form + auto-select service
- [ ] Form tư vấn: validate + gửi Google Sheets
- [ ] URL params hoạt động (`?category=`, `?type=`, `?service=`, `?id=`)

### SEO
- [ ] Google Search Console đã xác minh
- [ ] Sitemap đã submit
- [ ] Google Analytics đã cài
- [ ] JSON-LD Schema đã thêm (4 trang)

### Performance
- [ ] Test tại [PageSpeed Insights](https://pagespeed.web.dev/) — điểm > 90
- [ ] Test tại [GTmetrix](https://gtmetrix.com/)

---

## Tool hữu ích

| Tool | Công dụng | URL |
|------|-----------|-----|
| PageSpeed Insights | Kiểm tra tốc độ | https://pagespeed.web.dev/ |
| GTmetrix | Kiểm tra performance | https://gtmetrix.com/ |
| Facebook Debug Tool | Kiểm tra OG Image | https://developers.facebook.com/tools/debug/ |
| OpenGraph Preview | Kiểm tra OG tags | https://www.opengraph.xyz/ |
| Google Rich Results | Kiểm tra Schema | https://search.google.com/test/rich-results |
| XML Sitemap Validator | Kiểm tra sitemap | https://www.xml-sitemaps.com/validate-xml-sitemap.html |
