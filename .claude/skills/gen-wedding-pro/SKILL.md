# gen-wedding-pro

Gen thiệp cưới PRO — kết hợp `/gen-wedding` + `/frontend-design` cho chất lượng design cao cấp.

## Khác biệt so với /gen-wedding

| | /gen-wedding | /gen-wedding-pro |
|--|-------------|-----------------|
| Mục đích | Gen nhanh mẫu thiệp | Design cao cấp, award-quality |
| Design | Template-based | Custom design mỗi thiệp |
| Animation | Cơ bản (fade, slide) | Phức tạp (parallax, particle, 3D) |
| Typography | Font có sẵn | Font pairing theo ui-ux-pro-max |
| Color | Preset palette | Custom palette theo design system |
| Thời gian | Nhanh | Lâu hơn, chất lượng cao hơn |

## Asset Catalog

**GIỐNG /gen-wedding** — đọc cùng file catalog:
```
products/shared/wedding-asset-catalog.js
```

## Quy trình PRO (5 bước)

### Bước 1: Research & Design System

Activate `ui-ux-pro-max` skill:
```bash
python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "wedding {keywords}" --design-system -p "{couple name}"
```

Bổ sung typography:
```bash
python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "elegant luxury wedding" --domain typography
```

### Bước 2: Chọn asset từ catalog

Đọc `wedding-asset-catalog.js`:
1. Map yêu cầu → style keywords
2. Check `stylePresets` → dùng combo nếu match
3. Hoặc query: `findPhotoSets()`, `findIcons()`, `findElements()`, `findMusic()`
4. Chọn ảnh theo `files` mapping trong photoSet

### Bước 3: Design & Implement

Kết hợp frontend-design skill:
- **Typography**: Font pairing từ ui-ux-pro-max (KHÔNG dùng font mặc định)
- **Color**: Custom palette, CSS variables, dark-aware
- **Animation**: Orchestrated page load, scroll-triggered, particle effects
- **Layout**: Asymmetric, overlap, creative spatial design
- **Envelope**: Phải trang trí cầu kỳ (xem feedback `feedback_envelope_decoration.md`)
  - Viền khung đôi, corner ornaments
  - Ảnh nền blur, botanical deco
  - Ribbon bow / wax seal thay nút
- **Sections**: Organic/mềm mại (xem feedback `feedback_wedding_design_style.md`)
  - Ảnh overlap, cards so le
  - Padding rhythm, font light
  - Decorative dividers

### Bước 3b: Trang trí bằng backgrounds từ thư viện

Dùng backgrounds floral trong `products/shared/images/wedding/backgrounds/` để trang trí sections:
- **Wreath wildflower** (`floral-watercolor/bg-floral-watercolor-wreath-wildflower.webp`) — vòng hoa bao quanh couple section
- **Corner pastel dual** (`floral-watercolor/bg-floral-watercolor-corner-pastel-dual.webp`) — hoa 4 góc
- **Blush anemone** (`floral-watercolor/bg-floral-watercolor-blush-anemone.webp`) — nền hoa nhẹ
- Các background khác trong `floral-watercolor/`, `floral-lineart/`, `floral-photo/`

**Cách dùng**: thêm div overlay với `position:absolute; inset:0` (hoặc `left:50%; transform:translateX(-50%); max-width:520px` để co vào giữa trên desktop), `pointer-events:none`, `z-index:1`, `background-image` + `background-size` + `opacity 0.4-0.5`. Nội dung section dùng `z-index:2`.

```css
/* Ví dụ trang trí couple section */
.couple-deco-wreath,
.couple-deco-corner {
    position: absolute; top: 0; bottom: 0;
    left: 50%; transform: translateX(-50%);
    width: 100%; max-width: 520px;
    pointer-events: none; z-index: 1;
    background-repeat: no-repeat;
    background-position: center;
}
.couple-deco-wreath {
    background-image: url('../../../shared/images/wedding/backgrounds/floral-watercolor/bg-floral-watercolor-wreath-wildflower.webp');
    background-size: 90% auto; opacity: 0.45;
}
```

**Lưu ý**: `max-width: 520px` để trên desktop background không dãn rộng quá — xung quanh giữ nền cùng màu.

### Bước 4: Screenshot & Data

**Tool**: Puppeteer qua `chrome-devtools` skill (custom script `.mjs`)

**Cách chụp**:
1. Start HTTP server từ **project root**: `python3 -m http.server 3001 --directory /path/to/Templexa &`
   - **PHẢI dùng Python HTTP server** (không dùng `npx serve` vì nó redirect URL làm sai relative path)
   - URL phải giữ nguyên `/index.html` ở cuối
2. Viết custom Puppeteer script tại `~/.claude/skills/chrome-devtools/tmp/`:
   ```javascript
   import { getBrowser, getPage, disconnectBrowser } from '../scripts/lib/browser.js';
   // Mobile: setViewport({ width: 430, height: 932, deviceScaleFactor: 2 })
   // Desktop: setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 })
   // goto(URL, { waitUntil: 'networkidle0', timeout: 20000 })
   // Đợi 3-4s cho animation + ảnh load: await new Promise(r => setTimeout(r, 4000))
   // Click mở envelope: await page.click('#openEnvBtn')
   // Scroll tới section: page.evaluate(() => document.querySelector('.couple-section')?.scrollIntoView(...))
   // Đợi ảnh load sau scroll: await new Promise(r => setTimeout(r, 2000))
   ```
3. Chụp 4 ảnh:
   - `screen.png` — mobile 430x932 (iPhone 17) (envelope trước khi mở)
   - `anh_1.png` — desktop 1280x800 (hero sau khi mở envelope)
   - `anh_2.png` — desktop (couple + love story)
   - `anh_3.png` — desktop (gallery)
4. Convert PNG → WebP: `cwebp -q 85 file.png -o file.webp`
5. Xóa PNG, giữ WebP
6. Kill HTTP server: `kill $(lsof -t -i:3001)`

**Thêm entry vào `assets/js/data.js`**:
- `images[0]` = `screen.webp`, tiếp theo `anh_1-3.webp`
- `thumbnail` = `screen.webp`

Cập nhật `wedding-asset-catalog.js` nếu tạo asset mới.

### Bước 4b: Tự học & cải tiến sau mỗi lần gen

**BẮT BUỘC** sau mỗi lần gen thiệp xong:
1. Xem lại thiệp vừa gen — đánh giá điểm mạnh/yếu
2. So sánh với thiệp trước — **PHẢI khác biệt rõ rệt**, KHÔNG lặp layout/màu/hiệu ứng
3. Ghi nhận feedback từ user vào memory nếu có điều mới
4. Cập nhật skill này nếu học được kỹ thuật mới

**Nguyên tắc chống lặp:**
- Mỗi thiệp phải có **ít nhất 2 điểm khác biệt rõ ràng** so với thiệp gần nhất (layout, color palette, envelope style, animation type, typography pairing)
- Xem lại 3 thiệp gần nhất trước khi bắt đầu — liệt kê những gì đã dùng → tránh lặp
- Thử kỹ thuật mới mỗi lần: nếu lần trước dùng wax seal → lần này thử ribbon/card flip/polaroid. Nếu lần trước blush pink → lần này thử sage green/navy/terracotta
- Hero section là ấn tượng đầu tiên — **đầu tư sáng tạo nhất** cho hero + envelope

**Bài học từ thiệp #211 (Viết & Trang Hoa — Blush Romantic):**
- Envelope wax seal + corner ornaments + blurred photo bg → ấn tượng mạnh
- Hero full-viewport với ảnh cưới nền dark + tên script lớn → sang trọng
- Dùng backgrounds floral overlay (wreath + corner dual) → thêm chiều sâu cho couple section
- Cupid icons 2 bên ảnh → điểm nhấn dễ thương
- Gallery aspect-ratio 4/5 + max-height 70vh → vừa màn mobile

**Bài học từ thiệp #215 (Song Hỷ — Double Happiness):**
- **Brainstorm trước khi code** — dùng brainstormer agent tạo 5-7 ý tưởng envelope → user chọn → kết quả WOW hơn tự nghĩ
- Chữ 囍 tách đôi (clip-path inset split) → hiệu ứng ĐỘC, gắn chặt chủ đề, chưa ai làm
- Ánh sáng vàng tràn khe giữa khi tách → thêm drama (div width 2px→100vw, radial-gradient gold)
- Gold confetti 20 particles CSS → cảm giác lễ hội
- Font Ma Shan Zheng cho chữ Hán decorative → đúng theme truyền thống
- Palette đỏ+vàng+đen → hoàn toàn khác blush/pastel → tránh lặp palette thành công
- **Thiết kế THEO ảnh**: bộ ảnh nền đỏ + Song Hỷ 3D → thiệp đỏ vàng. Không ép ảnh vào template sẵn
- Envelope animation là yếu tố quyết định ấn tượng — đầu tư brainstorm kỹ ở bước này

**Quy trình đã chứng minh hiệu quả:**
1. Xem ảnh → phân tích mood/color/style
2. Brainstorm 5-7 ý tưởng envelope (dùng brainstormer agent)
3. User chọn → implement
4. Screenshot (Puppeteer + Python HTTP server)
5. Thêm data.js + ghi bài học

### Bước 5: Review

Activate `code-reviewer` agent hoặc self-review:
- [ ] Responsive mobile (max-width: 420px)
- [ ] Envelope decoration đủ cầu kỳ
- [ ] Font pairing đúng mood
- [ ] Animations smooth, prefers-reduced-motion
- [ ] Ảnh dùng relative path tới shared (không copy)
- [ ] Nhạc nền relative path

## Section checklist cho thiệp PRO

| Section | Bắt buộc | Animation |
|---------|----------|-----------|
| Envelope/Open | Yes | Wax seal break / ribbon untie / card flip |
| Hero | Yes | Parallax bg, name reveal, date fade-in |
| Couple info | Yes | Scroll reveal, portrait hover |
| Calendar/Date | Yes | Countdown timer, date highlight |
| Love Story | Optional | Timeline scroll, photo parallax |
| Gallery | Optional | Lightbox, swipe, masonry |
| Event/Venue | Yes | Card flip, map link |
| RSVP | Optional | Form validation, success animation |
| Guestbook | Optional | Message wall, floating bubbles |
| Gift/Mừng cưới | Optional | QR popup, bank info |
| Thank you | Yes | Confetti, heart particles |

## Effects library gợi ý

| Effect | CSS/JS | Dùng cho |
|--------|--------|----------|
| Falling petals | CSS animation + JS random | Background ambient |
| Parallax scroll | JS IntersectionObserver | Hero, photo sections |
| Text reveal | CSS clip-path + animation | Names, headings |
| Card flip 3D | CSS transform rotateY | Envelope open |
| Particle hearts | Canvas / CSS | Thank you, CTA |
| Sparkle/Glitter | CSS pseudo + animation | Gold/luxury themes |
| Ribbon untie | CSS animation | Envelope button |
| Wax seal break | CSS scale + opacity | Envelope seal |
| Photo overlap | CSS transform + z-index | Couple section |
| Floating bubbles | CSS animation random | Guestbook |
| Confetti rain | JS Canvas | Success states |
| Smooth scroll snap | CSS scroll-snap | Section navigation |

## Đường dẫn

- Catalog: `products/shared/wedding-asset-catalog.js`
- Ảnh: `../../../shared/images/wedding/{bộ-ảnh}/{file}`
- Icons: `../../../shared/images/wedding/icons/{file}`
- Elements: `../../../shared/images/wedding-elements/{file}`
- Nhạc: `../../../shared/music/wedding/{file}`
- Output: `products/Invitation/Wedding/gen_{id}_{slug}/`
