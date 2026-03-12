Gen landing page HTML + thêm entry vào data.js.

Argument: $ARGUMENTS — mô tả yêu cầu landing page (text, ảnh thiết kế, hoặc cả hai).

Ví dụ:
- `"landing page quán cà phê, phong cách minimalist warm"`
- `"3 mẫu: tiệm bánh pastel, gym dark bold, spa zen"`
- Kèm ảnh mockup: `"gen theo ảnh này, đổi màu xanh navy"`

---

## Quy trình

### Bước 1: Parse yêu cầu

Từ `$ARGUMENTS`, xác định:
- **Số lượng mẫu** cần gen (mặc định 1 nếu không nói rõ)
- **Chủ đề** và **phong cách** cho từng mẫu
- **Category**: mặc định `onepage`, trừ khi user chỉ định khác (e-commerce, invitation, portfolio, education)
- **Type**: mặc định `website`
- Nếu có ảnh đính kèm → phân tích layout, màu sắc, phong cách từ ảnh

### Bước 2: Đọc thư viện animation

Đọc file `products/shared/animations.css` để:
- Chọn animations phù hợp phong cách yêu cầu
- Tận dụng animations đã có thay vì viết mới
- Nếu cần animation mới → tạo trong code.html VÀ thêm vào thư viện (Bước 7)

### Bước 3: Tìm ID tiếp theo

Đọc `assets/js/data.js` → tìm dòng `id:` có giá trị lớn nhất → ID mới = max + 1.

### Bước 4: Gen HTML cho từng mẫu

Với mỗi mẫu:

1. **Tạo folder**: `products/Web/{Category}/{folder-name}/`
   - Format folder: `gen_{id}_{keywords}` (ví dụ: `gen_150_coffee-shop-minimalist`)
   - Keywords: kebab-case, tối đa 4-5 từ mô tả chủ đề

2. **Tạo file `code.html`** — self-contained, mở trực tiếp trong browser:

#### Cấu trúc bắt buộc

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tiêu đề tiếng Việt rõ ràng</title>
    <meta name="description" content="Mô tả ngắn">
    <!-- Google Fonts -->
    <!-- Lucide Icons CDN -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <!-- Tailwind hoặc inline CSS -->
    <style>/* animations + custom styles */</style>
</head>
<body>
    <!-- Sections -->
    <script>lucide.createIcons();</script>
    <script>/* IntersectionObserver */</script>
</body>
</html>
```

#### Yêu cầu nội dung — Tối thiểu 5 sections:

| Section | Bắt buộc | Ghi chú |
|---------|----------|---------|
| **Header/Nav** | ✅ | Logo + nav links + CTA button, sticky hoặc fixed |
| **Hero** | ✅ | Heading lớn, mô tả, CTA button nổi bật, có decorative elements |
| **Features/Services** | ✅ | 3-6 cards với icon Lucide, mô tả ngắn |
| **About/Stats** | Nên có | Counter số liệu, hoặc giới thiệu với ảnh |
| **Testimonials** | Nên có | 2-3 đánh giá với avatar, quote |
| **CTA** | ✅ | Call-to-action cuối, gradient background |
| **Footer** | ✅ | Links, copyright, social icons |

#### Icons — Dùng Lucide Icons (mặc định):

```html
<script src="https://unpkg.com/lucide@latest"></script>
<!-- Sử dụng: -->
<i data-lucide="coffee" class="icon"></i>
<i data-lucide="star" class="icon"></i>
<!-- Kích hoạt ở cuối body: -->
<script>lucide.createIcons();</script>
```

Chọn icon phù hợp chủ đề. Ví dụ:
- Quán cà phê: `coffee`, `cup-soda`, `utensils`, `clock`, `map-pin`, `star`
- Gym: `dumbbell`, `heart-pulse`, `timer`, `trophy`, `users`, `zap`
- Spa: `flower-2`, `droplets`, `heart`, `leaf`, `sparkles`, `sun`
- Education: `book-open`, `graduation-cap`, `award`, `users`, `lightbulb`
- E-commerce: `shopping-cart`, `package`, `truck`, `shield-check`, `credit-card`

#### Animations — BẮT BUỘC có animations chuyên nghiệp:

**A. Hero animations (auto-play khi load):**
- Title, subtitle, CTA lần lượt slide lên với delay stagger
- Decorative elements: float, pulse, hoặc gradient-shift
- Ví dụ pattern:
```css
.hero-title { animation: slide-up-hero 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
.hero-subtitle { animation: slide-up-hero 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
.hero-cta { animation: slide-up-hero 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both; }
```

**B. Scroll reveal (IntersectionObserver):**
- Mỗi section fade-up hoặc fade-in khi scroll tới
- Cards trong grid: stagger delay (0.1s, 0.2s, 0.3s, ...)
- BẮT BUỘC có JS IntersectionObserver:
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('[class*="animate-"]').forEach(el => {
        observer.observe(el);
    });
});
```

**C. Hover animations:**
- Cards: hover-lift (translateY + shadow tăng)
- Buttons: hover-scale hoặc hover-glow
- Images: hover-zoom (trong container overflow:hidden)
- Nav links: hover-underline

**D. Decorative animations (chọn 1-2):**
- Floating elements (icons/shapes bay nhẹ)
- Gradient background shift
- Pulse glow quanh CTA button
- Blob/circle decorations

**Tham khảo file `products/shared/animations.css`** để copy animation phù hợp.

#### Ảnh — Dùng Unsplash (mặc định):

**KHÔNG dùng placeholder** — luôn dùng ảnh thật từ Unsplash cho đẹp khi demo.

Format URL: `https://images.unsplash.com/photo-{ID}?w={width}&q=80`

Chọn ảnh **phù hợp chủ đề** từng section. Gợi ý theo ngành:

| Ngành | Keywords tìm ảnh | Ví dụ photo ID |
|-------|------------------|----------------|
| **Beauty/Makeup** | makeup, beauty, cosmetics, portrait | `photo-1522335789203-aabd1fc54bc9`, `photo-1487412947147-5cebf100ffc2` |
| **Café/F&B** | coffee shop, cafe interior, barista, latte art | `photo-1509042239860-f550ce710b93`, `photo-1501339847302-ac426a4a7cbb` |
| **Gym/Fitness** | gym, workout, fitness, training | `photo-1534438327276-14e5300c3a48`, `photo-1571019614242-c5c5dee9f50b` |
| **Spa/Wellness** | spa, massage, wellness, relaxation | `photo-1544161515-4ab6ce6db874`, `photo-1540555700478-4be289fbec6f` |
| **Education** | classroom, student, learning, library | `photo-1523050854058-8df90110c9f1`, `photo-1524178232363-1fb2b075b655` |
| **E-commerce** | shopping, product, store, fashion | `photo-1441986300917-64674bd600d8`, `photo-1483985988355-763728e1935b` |
| **Restaurant** | restaurant, food, dining, chef | `photo-1517248135467-4c7edcad34c4`, `photo-1414235077428-338989a2e8c0` |
| **Real estate** | house, interior, architecture, apartment | `photo-1600596542815-ffad4c1539a9`, `photo-1600585154340-be6161a56a0c` |
| **Tech/Startup** | technology, office, team, coding | `photo-1519389950473-47ba0277781c`, `photo-1531482615713-2afd69097998` |
| **Wedding** | wedding, bride, ceremony, flowers | `photo-1519741497674-611481863552`, `photo-1465495976277-4387d4b0b4c6` |

**Quy tắc chọn ảnh:**
- Hero: ảnh rộng, atmospheric, `w=1920`
- About/Profile: chân dung hoặc workspace, `w=600`
- Gallery/Portfolio: đa dạng góc chụp, `w=500`
- Cards/Features: liên quan tới nội dung feature, `w=400`
- Mỗi ảnh trong cùng page phải **khác nhau** (khác photo ID)

#### Nhạc nền (CHỈ khi user yêu cầu):

**Mặc định: KHÔNG có nhạc.** Chỉ thêm khi user nói "có nhạc nền", "thêm music", "có audio", v.v.

Khi được yêu cầu:

1. **User tự cung cấp file MP3** → đặt trong folder sản phẩm cùng `code.html`
2. **Nếu user không có file** → hướng dẫn tải nhạc miễn phí bản quyền từ:
   - Pixabay Music (pixabay.com/music)
   - Mixkit (mixkit.co/free-stock-music)
   - Bensound (bensound.com)

3. **Thêm vào HTML** — nút toggle nhạc fixed góc phải dưới:

```html
<!-- Music Toggle Button -->
<button id="musicToggle" class="music-toggle" aria-label="Toggle music">
    <i data-lucide="volume-2" class="music-icon-on"></i>
    <i data-lucide="volume-x" class="music-icon-off"></i>
</button>
<audio id="bgMusic" loop preload="auto">
    <source src="background.mp3" type="audio/mpeg">
</audio>
```

```css
.music-toggle {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    background: var(--accent, #6366F1);
    color: white;
    cursor: pointer;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: transform 0.2s, box-shadow 0.2s;
}
.music-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}
.music-toggle .music-icon-off { display: none; }
.music-toggle.muted .music-icon-on { display: none; }
.music-toggle.muted .music-icon-off { display: block; }
```

```javascript
// Background Music Toggle
const musicBtn = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
if (musicBtn && bgMusic) {
    bgMusic.volume = 0.3;
    let musicStarted = false;

    musicBtn.addEventListener('click', () => {
        if (!musicStarted) {
            bgMusic.play();
            musicStarted = true;
        } else if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.classList.remove('muted');
        } else {
            bgMusic.pause();
            musicBtn.classList.add('muted');
        }
    });
}
```

**Lưu ý nhạc nền:**
- Nhạc KHÔNG tự phát — user phải click nút để bật (UX tốt + tránh autoplay bị browser chặn)
- Volume mặc định 0.3 (30%)
- Icon dùng Lucide: `volume-2` (on) / `volume-x` (off)
- Nút có animation hover scale + shadow

#### Thêm nữa:

- Font: Google Fonts phù hợp phong cách
- Responsive (mobile-friendly) — dùng Tailwind responsive classes hoặc media queries
- Smooth scroll: `html { scroll-behavior: smooth; }`
- Bảng màu hài hòa, phù hợp chủ đề (warm tones cho F&B, bold cho gym, pastel cho spa, v.v.)

### Bước 5: Chụp ảnh tự động bằng Puppeteer

Dùng Puppeteer (headless Chrome) để chụp screenshot tự động cho `code.html` vừa tạo.

**QUAN TRỌNG: Mỗi ảnh chỉ chụp 1 viewport (1280x800)** — KHÔNG dùng `fullPage: true` (ảnh sẽ quá dài, vỡ khung hiển thị).

**Số lượng ảnh: 2–5 tuỳ độ dài trang**, scroll đều từ trên xuống dưới:

| Chiều cao trang | Số ảnh | Vị trí scroll |
|-----------------|--------|---------------|
| < 2400px | 2 | top + bottom |
| 2400–4000px | 3 | top, 50%, bottom |
| 4000–6400px | 4 | top, 33%, 66%, bottom |
| > 6400px | 5 | top, 25%, 50%, 75%, bottom |

**Script mẫu:**

```javascript
node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const folder = '<đường dẫn folder sản phẩm>';
  const filePath = 'file://' + process.cwd() + '/' + folder + '/code.html';

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000)); // chờ animation

  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportH = 800;

  // Tính số ảnh: 2-5 tuỳ độ dài
  let numShots = Math.min(5, Math.max(2, Math.ceil(pageHeight / viewportH)));

  const names = ['screen.png', 'anh_1.png', 'anh_2.png', 'anh_3.png', 'anh_4.png'];

  for (let i = 0; i < numShots; i++) {
    // Scroll đều từ top → bottom
    const scrollY = i === 0 ? 0 : Math.floor((pageHeight - viewportH) * (i / (numShots - 1)));
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await new Promise(r => setTimeout(r, 800)); // chờ scroll-reveal trigger
    await page.screenshot({ path: folder + '/' + names[i], type: 'png' });
  }

  await browser.close();
  console.log('Done! ' + pageHeight + 'px, ' + numShots + ' viewport screenshots');
})();
"
```

**Lưu ý:**
- **KHÔNG dùng `fullPage: true`** — mỗi ảnh chỉ 1 viewport (1280x800)
- Chờ 2s sau khi load để hero animations hoàn thành
- Chờ 800ms sau mỗi lần scroll để scroll-reveal animations trigger
- `screen.png` luôn là ảnh đầu tiên trong mảng `images` và dùng làm `thumbnail`

### Bước 5b: Chuyển PNG → WebP + Xoá PNG gốc

Ngay sau khi chụp xong, chuyển tất cả ảnh PNG sang WebP để giảm dung lượng, rồi xoá file PNG gốc.

**Dùng `cwebp` (có sẵn trên macOS qua Homebrew) hoặc `sharp` (Node.js):**

```bash
# Cách 1: dùng cwebp (nếu đã cài)
for f in <folder>/*.png; do
  cwebp -q 80 "$f" -o "${f%.png}.webp" && rm "$f"
done

# Cách 2: dùng sharp (Node.js — luôn khả dụng)
node -e "
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const folder = '<folder>';
const pngs = fs.readdirSync(folder).filter(f => f.endsWith('.png'));
(async () => {
  for (const file of pngs) {
    const input = path.join(folder, file);
    const output = path.join(folder, file.replace('.png', '.webp'));
    await sharp(input).webp({ quality: 80 }).toFile(output);
    fs.unlinkSync(input); // xoá PNG gốc
    console.log(file + ' → ' + file.replace('.png', '.webp'));
  }
  console.log('Done! Converted ' + pngs.length + ' files.');
})();
"
```

**Ưu tiên dùng `sharp`** vì đã có sẵn trong node_modules (cài cùng puppeteer). Nếu chưa có thì `npm install sharp`.

**Kết quả sau bước này:**
- Folder chỉ còn: `code.html` + `screen.webp` + `anh_1.webp` + `anh_2.webp` + ...
- Không còn file `.png` nào

### Bước 6: Thêm entry vào `data.js`

Chèn product entry **trước dòng `];`** đóng mảng PRODUCTS. Format chính xác:

```javascript
    {
        id: <auto_increment>,
        name: '<lấy từ <title> HTML>',
        slug: '<kebab-case từ name>',
        description: '<lấy từ meta description hoặc sinh tự động>',
        category: '<category>',
        type: 'website',
        tags: ['<type>', '<category>', '<keyword1>', '<keyword2>', ...],
        price: '',
        images: [
            './<folder>/screen.webp',
            './<folder>/anh_1.webp',
            // ... thêm anh_2, anh_3, anh_4 tuỳ số ảnh đã chụp
        ],
        thumbnail: './<folder>/screen.webp',
        path: './<folder>/',
        demoUrl: './<folder>/code.html',
        features: [
            '<tính năng 1 sinh từ nội dung>',
            '<tính năng 2>',
            '<tính năng 3>',
        ],
        status: 'new',
        priority: <auto_increment>,
        downloads: <random 1-10>,
        rating: <random từ 4.7, 4.8, hoặc 4.9>,
        showInSlider: false,
        updatedAt: '<ngày hiện tại YYYY-MM-DD>',
    },
```

**Lưu ý format**:
- Dùng single quotes cho strings
- Entry cuối cùng vẫn có dấu `,` ở cuối (trailing comma)
- Indent 4 spaces cho object, 8 spaces cho properties
- Mảng `images` và `thumbnail` dùng **`.webp`** (không phải `.png`)
- Điền đầy đủ từ ảnh đã chuyển ở Bước 5b

### Bước 7: Cập nhật `products/products.md`

- Cập nhật bảng tổng hợp số lượng sản phẩm (cột "So san pham" tương ứng)
- Cập nhật dòng **Tong**

### Bước 8: Cập nhật thư viện animation (nếu có animation mới)

Nếu trong code.html tạo ra animation/keyframe/hover effect **chưa có** trong `products/shared/animations.css`:
- Thêm vào file `products/shared/animations.css` ở đúng section (scroll, hover, keyframe, decorative)
- Comment rõ ràng mô tả animation
- Đặt tên class theo convention: `animate-{name}` (scroll), `hover-{name}` (hover), `@keyframes {name}` (keyframe)

### Bước 9: Báo cáo

In ra:

```
✅ Đã tạo <N> mẫu landing page:

| # | ID | Tên | Path | Demo |
|---|-----|-----|------|------|
| 1 | 151 | Tên mẫu | products/Web/Onepage/gen_151_... | [Xem demo](demoUrl) |

📸 Screenshots: <số ảnh> ảnh/mẫu (screen.webp, anh_1..N.webp) — Puppeteer → WebP, PNG đã xoá
🎬 Animations: <liệt kê animations đã dùng>
🆕 Animations mới thêm vào thư viện: <nếu có>
```

---

## Ràng buộc

- KHÔNG đọc nội dung file ảnh (chỉ phân tích ảnh user đính kèm)
- KHÔNG thêm dependency ngoài: Tailwind CDN, Google Fonts CDN, Lucide Icons CDN
- Giữ HTML đơn giản, dễ đọc
- Nếu gen nhiều mẫu, mỗi mẫu phải có phong cách riêng biệt
- Mỗi file `code.html` phải mở được độc lập trong browser (self-contained)
- Animations phải smooth, chuyên nghiệp — KHÔNG nhấp nháy, giật lag
- Prefer `cubic-bezier(0.16, 1, 0.3, 1)` cho easing (smooth deceleration)
- Prefer `transition` cho scroll reveal, `animation` cho auto-play/infinite
