Gen thiệp cưới PRO — kết hợp `/gen-wedding` + `/frontend-design` cho chất lượng design cao cấp.

Argument: $ARGUMENTS — mô tả yêu cầu, URL/ảnh tham khảo, hoặc folder khách.

**Skill này mở rộng `/gen-wedding`** — kế thừa TOÀN BỘ quy trình gen-wedding (sections, nhạc, countdown, effects, prompt.txt, data.js...) và thêm các bước design chuyên sâu từ `/frontend-design`.

---

## Khi nào dùng `/gen-wedding-pro` thay vì `/gen-wedding`?

| Tình huống | Dùng skill |
|-----------|-----------|
| Gen mẫu nhanh, palette có sẵn | `/gen-wedding` |
| Khách gửi ảnh/URL thiệp tham khảo → clone style | **`/gen-wedding-pro`** |
| Thiết kế gói Custom (thiết kế riêng 100%) | **`/gen-wedding-pro`** |
| Cần animation phức tạp (Anime.js) | **`/gen-wedding-pro`** |
| Cần verify chất lượng design tự động | **`/gen-wedding-pro`** |
| Gen hàng loạt mẫu đơn giản | `/gen-wedding` |

---

## Quy trình PRO — 4 giai đoạn

```
┌─────────────────────────────────────────────────┐
│  PHASE 1: DESIGN INTELLIGENCE                   │
│  Extract/Define design spec từ input            │
│  (ảnh, URL, video, mô tả)                      │
├─────────────────────────────────────────────────┤
│  PHASE 2: GEN WEDDING (kế thừa /gen-wedding)   │
│  Gen HTML với design spec từ Phase 1            │
│  + Anime.js cho animation cao cấp              │
├─────────────────────────────────────────────────┤
│  PHASE 3: QUALITY VERIFICATION                  │
│  Screenshot → phân tích → score ≥ 7/10         │
│  Tự chỉnh nếu chưa đạt                        │
├─────────────────────────────────────────────────┤
│  PHASE 4: DELIVERY                              │
│  data.js + products.md + báo cáo               │
└─────────────────────────────────────────────────┘
```

---

## PHASE 1: Design Intelligence

### 1A. Nếu user cung cấp ảnh/screenshot tham khảo

Dùng kỹ thuật **Design Extraction** từ `/frontend-design`:

1. **Phân tích ảnh tham khảo** — extract:
   - Color palette: hex codes chính xác (primary, secondary, accent, background, text)
   - Typography: font family, weight, size hierarchy, letter-spacing
   - Layout pattern: grid, overlap, stagger, spacing rhythm
   - Decorative elements: ornaments, dividers, borders, shadows
   - Animation hints: parallax, fade, slide direction
   - Texture/pattern: grain, gradient spots, blur overlays

2. **Sinh Design Spec** — tài liệu JSON-like:
```
Design Spec:
  palette:
    primary: "#B8860B"
    secondary: "#D4AF37"
    accent: "#FFD700"
    background: "#FFFEF5"
    text: "#2C1810"
    text-sub: "#5D4037"
  fonts:
    heading: "Cormorant Garamond, serif" (500-600)
    script: "Great Vibes, cursive" (400) — chỉ cho tên không dấu
    body: "Quicksand, sans-serif" (300-400)
    accent: "Cormorant Garamond italic" (400i)
  layout:
    max-width: 680px (mobile-first wedding)
    spacing-rhythm: breathe (5-7rem) / compact (2-3rem)
    image-overlap: true (-20px margin, ±2deg rotation)
    cards-stagger: true (offset 8px, slight rotation)
  effects:
    primary: "sparkles" | "petals" | "confetti" | "hearts"
    envelope: "ribbon-bow" | "padlock" | "wax-seal"
    scroll: "fade-up" with cubic-bezier(0.16, 1, 0.3, 1)
  ornaments:
    divider: "❦" with thin lines
    section-curve: ellipse clip-path
```

### 1B. Nếu user cung cấp URL website tham khảo

1. Fetch URL bằng WebFetch
2. Phân tích HTML/CSS → extract design spec (như 1A)
3. Chụp screenshot reference bằng Puppeteer nếu cần

### 1C. Nếu user cung cấp video tham khảo

1. Phân tích keyframes → extract animation patterns
2. Map animations sang Anime.js v4 hoặc CSS keyframes
3. Extract color/font/layout từ video frames

### 1D. Nếu chỉ có mô tả text (không có ảnh/URL)

1. Dùng **ui-ux-pro-max** design intelligence:
   - Chọn từ 50 styles, 21 palettes, 50 font pairings
   - Map phong cách mô tả → design spec cụ thể
2. Tham khảo bảng palette + font trong `/gen-wedding`
3. **Nâng cấp**: thêm chi tiết mà `/gen-wedding` không có:
   - Background texture pattern cụ thể
   - Shadow profile (soft/hard/layered)
   - Border treatment (solid/dashed/gradient/none)
   - Micro-interactions (hover states, focus rings)

### 1E. Output Phase 1

Luôn sinh **Design Spec** trước khi code — KHÔNG nhảy thẳng vào gen HTML.
Trình bày spec cho user xem nhanh (bảng tóm tắt), hỏi confirm trước khi tiếp.

---

## PHASE 2: Gen Wedding (kế thừa /gen-wedding)

**Chạy TOÀN BỘ quy trình `/gen-wedding`** (Bước 1 → Bước 5b/5c) với các nâng cấp:

### 2A. Áp dụng Design Spec

Thay vì chọn palette/font từ bảng có sẵn → dùng spec từ Phase 1:

```css
:root {
    /* Từ Design Spec */
    --primary: {spec.palette.primary};
    --secondary: {spec.palette.secondary};
    --accent: {spec.palette.accent};
    --bg: {spec.palette.background};
    --text: {spec.palette.text};
    --text-sub: {spec.palette.text-sub};

    --font-script: {spec.fonts.script};
    --font-heading: {spec.fonts.heading};
    --font-body: {spec.fonts.body};
    --font-accent: {spec.fonts.accent};
}
```

### 2B. Anime.js v4 cho animation cao cấp (tuỳ chọn)

Khi thiệp cần animation phức tạp hơn CSS keyframes:

**Khi nào dùng Anime.js:**
- Timeline animation nhiều bước (envelope mở → ảnh bay vào → text fade → seal stamp)
- Stagger phức tạp (grid gallery reveal, timeline items cascade)
- SVG path animation (vẽ hoa, vẽ tên)
- Spring physics (bounce, elastic)
- Scroll-linked animation mượt

**Khi nào KHÔNG dùng:**
- Animation đơn giản (fade, slide) → CSS keyframes đủ
- Hiệu ứng lặp (hoa rơi, sparkles) → JS setInterval đủ
- Thiệp Basic/Premium → giữ nhẹ, không thêm dependency

**Setup Anime.js v4:**
```html
<!-- CDN — thêm trước </body> -->
<script src="https://cdn.jsdelivr.net/npm/animejs@4.0.2/lib/anime.iife.min.js"></script>
<script>
const { animate, stagger, createTimeline } = anime;

// Ví dụ: Envelope open → photos fly in → text appear
const tl = createTimeline({ defaults: { ease: 'outExpo' } });
tl.add('.envelope-flap', { rotateX: 180, duration: 800 })
  .add('.polaroid-left', { translateY: [120, 0], opacity: [0, 1], rotate: -6, duration: 600 }, '-=200')
  .add('.polaroid-right', { translateY: [120, 0], opacity: [0, 1], rotate: 4, duration: 600 }, '-=400')
  .add('.hero-title', { translateY: [30, 0], opacity: [0, 1], duration: 500 }, '-=200')
  .add('.hero-date', { translateY: [20, 0], opacity: [0, 1], duration: 500 }, '-=300');
</script>
```

**⚠️ CRITICAL — Anime.js v4 rules:**
- Import: `const { animate, stagger, createTimeline } = anime;` (IIFE)
- KHÔNG dùng `anime({...})` — đó là v3
- Timeline: `createTimeline()` KHÔNG PHẢI `anime.timeline()`
- Stagger: `stagger(100)` KHÔNG PHẢI `anime.stagger(100)`
- Offset: `'-=200'` trong `.add()` param thứ 3

### 2C. Nâng cấp thiết kế so với /gen-wedding

| Aspect | /gen-wedding | /gen-wedding-pro |
|--------|-------------|-----------------|
| Palette | Chọn từ 10 bảng có sẵn | Extract từ reference hoặc custom hex |
| Font | Chọn từ 10 combos | Custom combo, kiểm tra Vietnamese support |
| Layout | Template patterns | Custom layout từ design spec |
| Animation | CSS keyframes + setInterval | + Anime.js v4 timeline (tuỳ chọn) |
| Background | Radial gradient spots | + Custom texture/pattern |
| Ornaments | ❦ ✿ ♡ mặc định | Custom ornament phù hợp theme |
| Shadow | Soft shadow mặc định | Custom shadow profile |
| Hover | Basic scale/opacity | Micro-interactions chi tiết |

### 2D. Các bước còn lại

Tiếp tục ĐÚNG quy trình `/gen-wedding`:
- Bước 4: Chọn nhạc (BẮT BUỘC)
- Bước 5: Gen HTML (8+ sections bắt buộc, envelope trang trí, decorative animations, countdown, effects...)
- Bước 5b: Tạo prompt.txt (nếu gen mẫu)
- Bước 5c: Xử lý danh sách khách (nếu có)

**Tất cả ràng buộc của /gen-wedding vẫn áp dụng:**
- LUÔN có nhạc nền
- LUÔN có countdown
- LUÔN có ≥1 hiệu ứng đặc biệt
- LUÔN có RSVP form
- LUÔN có Love Story timeline
- Font hỗ trợ tiếng Việt
- Phong cách organic, mềm mại
- Envelope trang trí cầu kỳ
- **Tên mặc định**: random từ `products/shared/wedding/names.js` (KHÔNG hardcode)

---

## PHASE 3: Quality Verification

Sau khi gen HTML xong, **TRƯỚC KHI hỏi user kiểm tra**:

### 3A. Tự chụp screenshot kiểm tra

```javascript
// Chụp nhanh desktop + mobile để tự đánh giá
node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const file = 'file://' + process.cwd() + '/<folder>/code.html';

  // Desktop
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(file, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: '<folder>/verify-desktop.png', type: 'png' });

  // Mobile
  await page.setViewport({ width: 440, height: 956, deviceScaleFactor: 2 });
  await page.goto(file, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: '<folder>/verify-mobile.png', type: 'png' });

  await browser.close();
})();
"
```

### 3B. Tự đánh giá Design Quality

Đọc screenshot vừa chụp, đánh giá theo checklist:

| Tiêu chí | Trọng số | Đạt? |
|----------|---------|------|
| **Color harmony** — palette nhất quán, contrast đủ | 15% | |
| **Typography hierarchy** — rõ ràng script > heading > body | 15% | |
| **Spacing rhythm** — breathe/compact xen kẽ tự nhiên | 10% | |
| **Image treatment** — overlap, rotation, không bị cắt trên mobile | 15% | |
| **Envelope design** — trang trí cầu kỳ, animation mượt | 10% | |
| **Responsive mobile** — hero hiện đủ tên + ảnh + ngày ở 440px | 15% | |
| **Effects** — hoa rơi/sparkles hoạt động, không lag | 5% | |
| **Font Vietnamese** — không bị lỗi dấu | 10% | |
| **Overall feel** — organic, mềm mại, không cứng/grid | 5% | |

**Score = tổng % các tiêu chí đạt. Target: ≥ 70%**

### 3C. Tự sửa nếu < 70%

Nếu phát hiện vấn đề:
1. Xác định tiêu chí fail
2. Sửa code HTML/CSS
3. Chụp lại verify screenshot
4. Đánh giá lại
5. Lặp tối đa 2 lần

### 3D. Xoá file verify

```bash
rm <folder>/verify-desktop.png <folder>/verify-mobile.png
```

### 3E. Báo user kiểm tra

Sau khi score ≥ 70%:
> "Mẫu đã gen xong và qua kiểm tra chất lượng (score: X%). Bạn kiểm tra và cho mình biết khi nào OK để chụp ảnh chính thức nhé!"

---

## PHASE 4: Delivery

Chạy ĐÚNG quy trình `/gen-wedding`:
- Bước 6: Chụp screenshot chính thức (desktop + mobile) — **SAU KHI user confirm**
- Bước 6b: Convert PNG → WebP
- Bước 7: Thêm entry vào data.js (**LUÔN đặt `isPublic: false`** — user tự chuyển true sau)
- Bước 8: Cập nhật products.md
- Bước 9: Cập nhật thư viện (nếu có component mới)
- Bước 9b: Gen QR (nếu có base URL)
- Bước 10: Báo cáo

### Báo cáo PRO (bổ sung thêm):

```
✅ Đã tạo thiệp cưới PRO:

| Mục | Chi tiết |
|-----|---------|
| ID | #XXX |
| Tên | Thiệp Cưới - A & B |
| Design Source | [ảnh tham khảo / URL / mô tả] |
| Palette | #hex1, #hex2, #hex3, #hex4 |
| Fonts | Script + Heading + Body |
| Animation | CSS / CSS + Anime.js |
| Effects | Hoa rơi / Sparkles / Hearts |
| Quality Score | XX% (đạt) |
| Demo | [link] |

🎨 Design spec đã extract và áp dụng
📸 Chưa chụp screenshot chính thức — bạn kiểm tra trước nhé!
```

---

## Ràng buộc bổ sung (so với /gen-wedding)

1. **LUÔN tạo Design Spec trước** — không nhảy thẳng vào code
2. **LUÔN verify quality** sau khi gen — score ≥ 70%
3. **Anime.js v4 ONLY** — không dùng v3 syntax
4. **Anime.js là tuỳ chọn** — chỉ dùng khi animation phức tạp, không bắt buộc
5. **Không thêm dependency ngoài**: Google Fonts, Lucide Icons, Tailwind CDN, Anime.js CDN (tuỳ chọn)
6. **Kế thừa TẤT CẢ ràng buộc của /gen-wedding** — nhạc, countdown, effects, RSVP, font Việt, organic style, envelope trang trí...

---

## Kinh nghiệm thiết kế (rút ra từ thực tế — XEM XÉT phù hợp trước khi áp dụng)

Các kỹ thuật dưới đây là kinh nghiệm tham khảo, KHÔNG phải mặc định. Đánh giá context + style thiệp trước khi dùng.

| Kỹ thuật | Mô tả | Khi nào nên dùng |
|----------|-------|-----------------|
| **Nền giấy nhám** | SVG feTurbulence overlay, opacity ~0.06-0.08, baseFrequency ~0.65 | Editorial, vintage, magazine feel |
| **Font viết tay** | Caveat (hỗ trợ tiếng Việt) cho accent text — ngày cưới, closing, annotation. KHÔNG dùng khắp nơi | Khi muốn điểm nhấn organic, personal |
| **Ảnh xoay lệch** | rotate ±1-2deg, translateY offset, box-shadow lệch → 3D scrapbook feel | Editorial, scrapbook, collage style |
| **Giấy xé tay** | clip-path polygon với điểm không đều cho event cards | Khi muốn organic thay vì border cứng |
| **Sepia nhẹ** | `filter: sepia(0.05)` cho tông ấm đồng nhất | Vintage, warm tone themes |
| **Tape strip** | Pseudo-element translucent trên ảnh | Scrapbook, polaroid style |
| **Vignette viền** | radial-gradient tối nhẹ ở viền trang | Cinematic, film feel |
| **Ảnh webp lộ viền** | Ảnh watercolor/chibi/divider/corner từ shared assets thường có nền trắng/nhạt KHÔNG trong suốt → lộ cạnh vuông khi đặt lên nền có màu. **FIX ưu tiên:** (1) **Dùng SVG inline** cho corners/dividers — không bao giờ bị lộ viền. (2) Nếu phải dùng webp: `mask-image: radial-gradient(ellipse 75% 75% at center, black 45%, transparent 95%)` cho tất cả ảnh shared (chibi, divider, icon, bouquet). Gom 1 rule CSS chung cho tất cả selector. | **LUÔN ÁP DỤNG** — ưu tiên SVG inline, fallback mask-image |

| **Tên bố mẹ** | Khi ghi tên bố mẹ cô dâu/chú rể: chỉ ghi "Ông/Bà + Họ tên". KHÔNG ghi chú thích "Thân phụ", "Thân mẫu", "Cha", "Mẹ", "Bố" — thừa vì đã có label "Nhà Trai"/"Nhà Gái" | **LUÔN ÁP DỤNG** |
| **Opacity trang trí bg** | Ảnh trang trí background (corners, scatter, wreath) trên nền sáng (#F8F5F0): bắt đầu opacity **0.8-1.0** cho corners, **0.5-0.6** cho scatter/wreath. ĐỪNG bắt đầu từ 0.1-0.3 — quá mờ, user phải chỉnh nhiều lần. Ảnh watercolor pastel trên nền trắng/kem cần opacity cao mới nhìn rõ. | **LUÔN ÁP DỤNG** |
| **Divider ảnh vuông** | Ảnh divider từ thư viện thường vuông (678x678) nhưng nội dung chỉ ở dải ngang giữa. Dùng `height: 50px; object-fit: cover; object-position: center` để chỉ hiện phần giữa. KHÔNG dùng `height: auto` — sẽ hiện cả vùng trống trên/dưới, chiếm quá nhiều space. | Khi dùng divider ảnh từ shared |
| **Ảnh chân dung object-position** | Ảnh cưới chụp dọc (portrait) khi crop ngang (`object-fit: cover, height cố định`): mặt thường ở ~20-35% từ trên. Mỗi ảnh cần xem riêng để set `object-position` phù hợp. Mặc định `center 20%`, ảnh nào mặt thấp hơn thì `center 35%`. | Khi crop ảnh chân dung |
| **Brainstorm từng section** | Brainstorm TỪNG SECTION (không chỉ envelope) → mỗi section có concept riêng gắn theme → chất lượng cao hơn nhiều. Đặc biệt envelope và hero cần đầu tư sáng tạo nhất — ấn tượng đầu tiên. | Khi thiết kế thiệp PRO |
| **Trang trí mọi section** | Mỗi section cần có background decoration (corners, scatter flowers, wreath) — KHÔNG để section trống trắng. Dùng `position: absolute; z-index: 0` cho bg, content `z-index: 1`. | **LUÔN ÁP DỤNG** |
| **Screenshot reveal class** | Khi chụp screenshot Puppeteer, phải thêm CẢ HAI class `visible` VÀ `in-view` cho `.reveal` elements — khác thiệp dùng class khác nhau. | Khi chụp screenshot |
| **Envelope không cần button** | Concept "tap anywhere" (không button, chỉ text nhỏ "Nhấn để mở" breathing) cảm giác premium hơn button rõ ràng — như luxury brand splash screen. | Xem xét khi thiết kế envelope |
| **Gold Ink Bloom** | Giọt mực vàng loang → SVG floral lines vẽ ra → monogram dissolve blur → reveal. Hiệu ứng WOW, user rất thích. Kỹ thuật: `radial-gradient scale`, `stroke-dasharray/dashoffset` SVG animation, `filter: blur()` transition. | Kinh nghiệm tham khảo envelope |

> Danh sách này sẽ được bổ sung thêm theo thời gian.

---

## Tham chiếu

- Quy trình gen HTML chi tiết: xem `/gen-wedding` (Bước 1 → Bước 10)
- Design extraction: xem `/frontend-design` workflow-screenshot + references
- Anime.js v4: xem `/frontend-design` references/animejs.md
- UI/UX patterns: xem `/ui-ux-pro-max`
- Thư viện wedding: `products/shared/wedding/` (styles.css, scripts.js, README.md)
