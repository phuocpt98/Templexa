# Checklist Chuẩn — Web Tĩnh trên GitHub Pages + Custom Domain

> Bộ tiêu chuẩn chung áp dụng cho mọi project web tĩnh (HTML/CSS/JS) chạy trên GitHub Pages với custom domain.

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
project/
├── index.html
├── CNAME                          # Custom domain
├── sitemap.xml                    # Danh sách URL cho Google
├── robots.txt                     # Hướng dẫn bot crawl
├── favicon-32x32.png              # Favicon PNG
├── favicon-16x16.png              # Favicon PNG nhỏ
├── apple-touch-icon.png           # Icon khi save bookmark trên iPhone (180x180)
├── android-chrome-192x192.png     # Icon trên Android (192x192)
├── googleXXXXXXXXXXXX.html       # File xác minh Google Search Console (nếu có)
├── assets/
│   ├── images/
│   │   ├── logo.svg               # Logo gốc (vector)
│   │   ├── og-image.jpg           # Ảnh preview khi share link (1200x630)
│   │   └── *.webp                 # Tất cả ảnh dùng WebP
│   ├── css/
│   └── js/
├── en/                            # Trang tiếng Anh (nếu đa ngôn ngữ)
└── vn/                            # Trang tiếng Việt
```

---

## 2. Custom Domain

### 2.1. Tạo file CNAME
Tạo file `CNAME` ở root repo, nội dung chỉ 1 dòng:
```
yourdomain.com
```

### 2.2. Cấu hình DNS
Thêm các records tại nhà cung cấp domain (Mắt Bão, Tenten, Namecheap...):

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |
| CNAME | www | `username.github.io` | 3600 |

### 2.3. Bật trên GitHub
1. Repo > **Settings** > **Pages**
2. **Custom domain**: nhập domain > **Save**
3. Đợi 5-30 phút
4. Tick **Enforce HTTPS**

### 2.4. Lưu ý quan trọng
- Khi dùng custom domain, path `/REPO-NAME/` sẽ **KHÔNG còn nữa**
- Website serve từ root `/`
- Phải cập nhật tất cả URL trong code từ `https://username.github.io/REPO-NAME` → `https://yourdomain.com`

---

## 3. SEO — Meta Tags

### 3.1. Thẻ meta bắt buộc trong `<head>` mỗi trang

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Tiêu đề trang — Tên thương hiệu</title>
    <meta name="description" content="Mô tả trang 150-160 ký tự, chứa keyword chính.">
    <meta name="robots" content="index, follow">

    <!-- Canonical — URL chính thức của trang -->
    <link rel="canonical" href="https://yourdomain.com/path/">

    <!-- Hreflang — Nếu đa ngôn ngữ -->
    <link rel="alternate" hreflang="en" href="https://yourdomain.com/en/path/">
    <link rel="alternate" hreflang="vi" href="https://yourdomain.com/vn/path/">

    <!-- Open Graph — Hiển thị khi share link Facebook, Zalo -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Tiêu đề trang">
    <meta property="og:description" content="Mô tả trang">
    <meta property="og:url" content="https://yourdomain.com/path/">
    <meta property="og:image" content="https://yourdomain.com/assets/images/og-image.jpg">
    <meta property="og:site_name" content="Tên thương hiệu">
    <meta property="og:locale" content="vi_VN">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Tiêu đề trang">
    <meta name="twitter:description" content="Mô tả trang">
    <meta name="twitter:image" content="https://yourdomain.com/assets/images/og-image.jpg">

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/assets/images/logo.svg">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
</head>
```

### 3.2. JSON-LD Schema (trang chủ)

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tên công ty",
    "url": "https://yourdomain.com",
    "logo": "https://yourdomain.com/assets/images/logo.svg",
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+84-xxx-xxx-xxx",
        "contactType": "sales"
    },
    "sameAs": [
        "https://facebook.com/your-page",
        "https://linkedin.com/company/your-company"
    ]
}
</script>
```

### 3.3. Checklist SEO mỗi trang

- [ ] `<title>` duy nhất, chứa keyword, dưới 60 ký tự
- [ ] `<meta name="description">` duy nhất, 150-160 ký tự
- [ ] `<link rel="canonical">` trỏ đúng URL
- [ ] Heading H1 duy nhất, chứa keyword chính
- [ ] Tất cả `<img>` có thuộc tính `alt` mô tả ảnh
- [ ] URL thân thiện (không có ID, ký tự lạ)
- [ ] Internal links giữa các trang liên quan

---

## 4. Favicon & Logo trên tab trình duyệt

### 4.1. Cách tạo favicon từ logo SVG

Cài `sharp` (Node.js):
```bash
npm install sharp
```

Script tạo favicon:
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
<link rel="icon" type="image/svg+xml" href="/assets/images/logo.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

### 4.3. Thứ tự ưu tiên trình duyệt
1. SVG — trình duyệt hiện đại (sắc nét mọi kích thước)
2. PNG 32x32 — trình duyệt cũ
3. PNG 16x16 — fallback
4. Apple Touch Icon — bookmark trên iOS
5. Android Chrome — add to home screen trên Android

---

## 5. Ảnh hiển thị khi gửi link (OG Image)

### 5.1. OG Image là gì?
Khi gửi link qua **Facebook, Zalo, Telegram, LinkedIn**, hệ thống sẽ đọc thẻ `og:image` để hiển thị ảnh preview.

### 5.2. Yêu cầu ảnh OG Image

| Thuộc tính | Giá trị |
|------------|---------|
| Kích thước | **1200 x 630 px** (tỉ lệ 1.91:1) |
| Format | JPG hoặ PNG (JPG nhẹ hơn) |
| Dung lượng | Dưới **300KB** |
| Nội dung | Logo + tên thương hiệu + mô tả ngắn |

### 5.3. Cách thiết kế
- Dùng Canva (miễn phí): chọn template "Social Media"
- Hoặc tự thiết kế: nền đẹp + logo + tagline

### 5.4. Thêm vào HTML

```html
<!-- Ảnh chung cho cả Facebook, Zalo, Telegram -->
<meta property="og:image" content="https://yourdomain.com/assets/images/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- Twitter có thể dùng ảnh riêng -->
<meta name="twitter:image" content="https://yourdomain.com/assets/images/og-image.jpg">
```

### 5.5. Kiểm tra preview

| Nền tảng | Tool kiểm tra |
|----------|---------------|
| Facebook | https://developers.facebook.com/tools/debug/ |
| LinkedIn | https://www.linkedin.com/post-inspector/ |
| Twitter | https://cards-dev.twitter.com/validator |
| Chung | https://www.opengraph.xyz/ |

### 5.6. Lưu ý
- **URL ảnh phải dùng đường dẫn tuyệt đối** (https://yourdomain.com/...), không dùng tương đối
- Facebook/Zalo **cache ảnh**. Nếu đổi ảnh, dùng Facebook Debug Tool để xóa cache
- Mỗi trang nên có OG Image riêng (nếu có thể). Nếu không, dùng chung 1 ảnh brand

---

## 6. Sitemap

### 6.1. File `sitemap.xml` mẫu

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    <url>
        <loc>https://yourdomain.com/</loc>
        <lastmod>2026-01-01</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>

    <url>
        <loc>https://yourdomain.com/about/</loc>
        <lastmod>2026-01-01</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

    <!-- Thêm tất cả URL của website -->

</urlset>
```

### 6.2. Quy tắc priority

| Loại trang | Priority | Changefreq |
|------------|----------|------------|
| Trang chủ | 1.0 | weekly |
| Trang sản phẩm chính | 0.9 | weekly |
| Trang chi tiết sản phẩm | 0.8 | monthly |
| Trang about, contact | 0.7 | monthly |
| Blog posts | 0.6 | monthly |

### 6.3. Checklist
- [ ] Liệt kê **tất cả** URL public
- [ ] Dùng URL tuyệt đối (https://yourdomain.com/...)
- [ ] `lastmod` đúng ngày cập nhật cuối
- [ ] Không liệt kê trang 404, redirect, hoặc trang trùng lặp
- [ ] Đã submit lên Google Search Console

---

## 7. Robots.txt

### 7.1. File `robots.txt` mẫu

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### 7.2. Nếu muốn chặn một số trang

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: https://yourdomain.com/sitemap.xml
```

### 7.3. Checklist
- [ ] File đặt ở root (`/robots.txt`)
- [ ] Sitemap URL đúng domain
- [ ] Không chặn nhầm trang quan trọng
- [ ] Kiểm tra tại: https://www.google.com/webmasters/tools/robots-testing-tool

---

## 8. Tối ưu ảnh

### 8.1. Vấn đề
Ảnh PNG thường chiếm **80-90%** dung lượng website. Ảnh nặng = load chậm = mất khách, đặc biệt khách nước ngoài.

### 8.2. Giải pháp: Chuyển PNG/JPG → WebP

**WebP giảm 70-90% dung lượng** so với PNG, chất lượng gần như tương đương.

Script convert hàng loạt (Node.js + sharp):
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

        // Nếu WebP lớn hơn gốc thì xóa WebP, giữ gốc
        if (converted >= original) {
            fs.unlinkSync(webp);
            console.log(`SKIP: ${file} (WebP lớn hơn gốc)`);
        } else {
            fs.unlinkSync(file); // Xóa file gốc
            const saved = ((1 - converted / original) * 100).toFixed(1);
            console.log(`${path.basename(file)} → .webp (-${saved}%)`);
        }
    }
}
main();
```

### 8.3. Sau khi convert
- Cập nhật tất cả reference `.png` / `.jpg` → `.webp` trong HTML, CSS, **và JS**
- Kiểm tra kỹ: `grep -r "\.png" --include="*.html" --include="*.css" --include="*.js"`

### 8.4. Lazy loading
Thêm `loading="lazy"` cho ảnh không nằm trong viewport đầu tiên:
```html
<img src="image.webp" alt="Mô tả" loading="lazy" width="800" height="600">
```

### 8.5. Luôn thêm width/height cho `<img>`
Giúp trình duyệt reserve space, tránh layout shift (CLS):
```html
<img src="image.webp" alt="..." width="800" height="600">
```

### 8.6. Bảng tham khảo dung lượng

| Loại ảnh | PNG | WebP (quality 80) | Giảm |
|----------|-----|-----|------|
| Ảnh sản phẩm | 200-300KB | 10-20KB | ~93% |
| Ảnh background | 500KB-1MB | 30-50KB | ~95% |
| Ảnh catalog | 2-3MB | 100-200KB | ~92% |
| Ảnh blog | 50-200KB | 20-100KB | ~50% |

---

## 9. Google Search Console

### 9.1. Thêm property
1. Vào [search.google.com/search-console](https://search.google.com/search-console)
2. **Thêm tài sản** > **Tiền tố URL** > nhập `https://yourdomain.com`
3. Xác minh bằng 1 trong các cách:
   - **File HTML** (dễ nhất): tải file Google cho, đặt vào root repo
   - **Thẻ meta**: thêm thẻ `<meta>` vào `<head>` tất cả trang
   - **DNS TXT record**: thêm TXT record tại nhà cung cấp domain

### 9.2. Submit sitemap
1. Menu trái > **Sơ đồ trang web** (Sitemaps)
2. Nhập: `sitemap.xml`
3. Click **Gửi**

### 9.3. Đẩy nhanh index
- **Kiểm tra URL** > nhập URL từng trang quan trọng > **Yêu cầu lập chỉ mục**
- Ưu tiên: trang chủ, sản phẩm, about, contact

### 9.4. Theo dõi
- Kiểm tra index: gõ `site:yourdomain.com` trên Google
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
Thêm ngay trước `</head>` của **mọi trang**:

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
- Khách từ quốc gia nào
- Thời gian ở lại trang
- Tỉ lệ bounce rate

---

## 11. Cloudflare CDN

### 11.1. Tại sao cần?
- CDN **300+ server** toàn cầu — khách nước ngoài load nhanh
- Cache ảnh, CSS, JS tại edge server
- Auto minify HTML/CSS/JS
- DDoS protection
- SSL miễn phí
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
- **Page Rules**: `yourdomain.com/assets/*` → Cache Everything, Edge TTL 1 month

---

## 12. Checklist khi thay domain

Khi chuyển từ `old-domain.com` sang `new-domain.com`:

### Code changes
- [ ] Tạo file `CNAME` với domain mới
- [ ] Replace toàn bộ URL cũ → URL mới trong tất cả file (HTML, CSS, JS, XML, TXT)
- [ ] Kiểm tra: `grep -r "old-domain" --include="*.html" --include="*.css" --include="*.js" --include="*.xml" --include="*.txt"`
- [ ] Commit & push

### DNS & GitHub
- [ ] Cấu hình DNS (4 A records + CNAME www)
- [ ] GitHub Settings > Pages > Custom domain > nhập domain mới
- [ ] Bật Enforce HTTPS
- [ ] Verify website load bình thường

### Google Search Console
- [ ] Thêm property mới cho domain mới
- [ ] Xác minh domain mới
- [ ] Submit sitemap mới
- [ ] **KHÔNG xóa** property cũ (giữ ít nhất 6 tháng)
- [ ] Dùng Change of Address (nếu có property cấp miền)

### Kiểm tra
- [ ] `https://new-domain.com` — load bình thường
- [ ] `https://www.new-domain.com` — redirect đúng
- [ ] HTTPS hoạt động (ổ khóa xanh)
- [ ] View source — canonical URL đúng domain mới
- [ ] `https://new-domain.com/sitemap.xml` — tất cả URL đúng
- [ ] `https://new-domain.com/robots.txt` — sitemap URL đúng
- [ ] Chuyển ngôn ngữ hoạt động (nếu đa ngôn ngữ)
- [ ] Form liên hệ gửi được
- [ ] Ảnh load đúng
- [ ] Favicon hiển thị trên tab trình duyệt
- [ ] Share link Facebook/Zalo hiển thị ảnh preview đúng

### Social & backlinks
- [ ] Cập nhật URL trên Facebook page
- [ ] Cập nhật URL trên LinkedIn
- [ ] Cập nhật URL trên Google Business Profile
- [ ] Cập nhật backlinks bạn kiểm soát được

---

## 13. Checklist trước khi Go Live

### Technical
- [ ] Tất cả trang có `<title>` và `<meta description>` duy nhất
- [ ] Tất cả trang có `<link rel="canonical">`
- [ ] Tất cả `<img>` có `alt` attribute
- [ ] Ảnh đã convert WebP, dung lượng tối ưu
- [ ] Ảnh có `loading="lazy"` (trừ ảnh above-the-fold)
- [ ] Ảnh có `width` và `height`
- [ ] Favicon hiển thị đúng
- [ ] OG Image hoạt động (test bằng Facebook Debug Tool)
- [ ] `sitemap.xml` liệt kê đầy đủ URL
- [ ] `robots.txt` đúng
- [ ] Responsive trên mobile
- [ ] Link nội bộ không bị gãy (404)
- [ ] HTTPS hoạt động

### SEO
- [ ] Google Search Console đã xác minh
- [ ] Sitemap đã submit
- [ ] Google Analytics đã cài
- [ ] JSON-LD Schema đã thêm (ít nhất trang chủ)
- [ ] Hreflang đúng (nếu đa ngôn ngữ)

### Performance
- [ ] Test tại [PageSpeed Insights](https://pagespeed.web.dev/) — điểm > 90
- [ ] Test tại [GTmetrix](https://gtmetrix.com/)
- [ ] Tổng dung lượng ảnh < 10MB
- [ ] Không có file ảnh > 500KB

### Social
- [ ] Google Business Profile đã tạo
- [ ] Facebook page có link website
- [ ] Test share link trên Facebook, Zalo — ảnh hiển thị đúng

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

---

> **Ghi chú:** File này được tạo từ kinh nghiệm triển khai plywoodvietnamexport.com. Cập nhật khi có thêm bài học mới.
