# Plan: Thiệp sinh nhật Ty Ni — White Gold Bling Bling

## Thông tin khách
- **Tên**: Ty Ni
- **Sinh**: 2000 → **tuổi 26** (ngày 23/04/2026)
- **Ngày tổ chức**: 23/04/2026, 19:00 (7h00 tối)
- **Địa điểm**: Kay Beer Garden (embed Google Maps có sẵn, lat/lng `10.9410772, 108.1098902`)
- **Folder**: `products/Invitation/Other/khach_2/`
- **Ảnh nhân vật (demo)**: `products/shared/images/wedding/viet-trang-hoa/627789060_1496741912453620_3108546600317143173_n.webp` (chỉ 1 ảnh duy nhất)

## Concept: "White Gold Bling Bling"
- **Mood**: Sang trọng, lấp lánh, nữ tính, mừng tuổi 26
- **Palette**:
  - Bg: `#FFFEF7` (ivory cream) / dark accent `#0A0A0A`
  - Gold primary: `#D4AF37`
  - Gold bright: `#F5D67A`
  - Gold deep: `#A8841C`
  - White pure: `#FFFFFF`
  - Text: `#2A2416` (warm black)
- **Font**:
  - Display: **Cormorant Garamond** (serif elegant) hoặc **Playfair Display**
  - Script: **Allura** / **Great Vibes** ("Happy Birthday", "Ty Ni")
  - Number 26: **Bodoni Moda** hoặc Playfair Black, clamp(8rem, 22vw, 14rem), gold gradient + sparkle
  - Body: **Inter** / **Manrope**
- **Effects bling bling**:
  - Gold glitter particles (anime.js v4, ~40 particles, float + twinkle)
  - Sparkle stars SVG random positions, CSS twinkle keyframes
  - Shimmer text animation cho tên + số 26 (gradient move)
  - Gold foil texture (SVG noise + gradient) làm divider
  - Champagne bubbles rising (loop)
- **KHÔNG dùng**: confetti màu mè, neon, balloon trẻ con. Giữ thanh lịch.

## Sections (9)
1. **Splash/Envelope** — ivory bg, gold border double frame, corner ornaments gold, "You're Invited" script + tên "Ty Ni" + tap to open
2. **Hero** — ảnh duy nhất (frame gold oval/arched), tên "Ty Ni" script huge, số **26** khổng lồ gold gradient shimmer, subtitle "Twenty-Six & Shining", countdown đến 23/04/2026 19:00
3. **About Ty Ni** — short bio elegant, 3 fun facts với icon gold (star/diamond/crown), quote
4. **Milestones 2000→2026** — timeline dọc 6 mốc (không cần ảnh, chỉ năm + text + gold dot), thay cho "through the years"
5. **Party Details** — card gold frame: 📅 23.04.2026 · 🕖 19:00 · 📍 Kay Beer Garden + dress code "White & Gold / Glam Chic"
6. **Location** — iframe Google Maps Kay Beer Garden (full width, gold frame border), nút "Chỉ đường"
7. **RSVP form** — tên guest (auto-fill từ URL `?g=slug`), số người, lời chúc, xác nhận tham dự, ghi chú món ăn — lưu localStorage (demo, không gửi API)
8. **Wishes gallery** — hiển thị lời chúc đã submit (từ localStorage demo)
9. **Thank you** — "Can't wait to celebrate with you ✨" + hashtag `#TyNi26` + music toggle

## Per-guest customization
- File `data.js` trong folder: array guests `[{slug, name, title, personalMessage}]`
- URL format: `index.html?g=minh-anh` → greeting section hiện "Dear Minh Anh, ..."
- Tạm tạo 5 guest demo: ty-ni (host preview), ban-than-1, ban-than-2, family, default
- Fallback nếu không có `?g=`: dùng entry `default` "Dear Friend"

## Music
- Upbeat elegant jazz/pop. Check `products/shared/music/` cho file sẵn, relative path `../../../shared/music/{file}`. Prefer genre: lounge, jazz, champagne pop. Auto-play muted → user toggle unmute.

## Animations (Anime.js v4, 8+)
1. Splash → hero transition (fade + scale)
2. Number 26 count-up 0→26 khi enter hero
3. Shimmer gradient move trên tên + 26 (loop)
4. Gold particles float + twinkle (loop, ~40)
5. Sparkle stars random twinkle
6. Timeline milestones stagger reveal on scroll
7. Section headings fade-up stagger
8. Photo frame reveal (scale + gold border draw)
9. Champagne bubbles rising loop
10. Countdown digit flip

## Files to create
```
products/Invitation/Other/khach_2/
├── index.html          # Full thiệp
├── data.js             # Guest list (inline array)
├── styles.css          # (optional) tách nếu >400 dòng CSS
└── script.js           # (optional) tách nếu >200 dòng JS
```
(Theo KISS: nếu inline vừa vặn thì 1 file `index.html`; tách khi cần.)

## Data.js entry (Templexa catalog)
- Thêm entry vào `assets/js/data.js` sau khi xong:
  - `category: "other"`, `type: "invitation"`
  - `tags: ["birthday", "sinh-nhật", "white-gold", "bling-bling", "tuổi-26", "elegant", "glam"]`
  - `isPublic: false` (khách riêng)
  - `name: "Thiệp sinh nhật Ty Ni - 26 White Gold"`

## Phase execution (kế thừa gen-birthday-pro)

### Phase 1 — Design Intelligence
- Lock palette, font, layout structure
- Chuẩn bị SVG decoration: gold corner ornament, star, diamond, champagne bubble, gold divider
- Check nhạc có sẵn trong `shared/music/`

### Phase 2 — Gen code
- 2A: HTML structure 9 sections + data.js guests
- 2B: CSS (CSS variables gold palette, responsive 1024/768/480, dark không cần vì đã ivory)
- 2C: JS — anime.js v4 từ CDN, countdown logic, guest URL parser, RSVP localStorage, music toggle

### Phase 3 — Quality verify ≥70%
- Screenshot mobile 390×844 (hero/open only, KHÔNG fullPage)
- Screenshot desktop 1440×2700 (hero 3 màn)
- Check: số 26 nổi bật, gold shimmer mượt, mobile readable 320px, animation không lag
- Fix iterate đến ≥70%

### Phase 4 — Delivery
- Cập nhật `assets/js/data.js` catalog entry
- Thêm vào `products.md` / catalog docs
- Commit message tiếng Việt: "feat: thêm thiệp sinh nhật #229 Ty Ni white gold bling bling tuổi 26"

## Câu hỏi chưa rõ (cần user xác nhận trước khi gen)
1. **Tuổi hiển thị**: sinh 2000, event 2026 → **26 tuổi** đúng chứ? (hay muốn show "25" vì chưa quá ngày?)
2. **Milestones 2000→2026**: bịa 6 mốc elegant chung (sinh, vào lớp 1, cấp 3, đại học, first job, 26) hay bạn gửi mốc thật?
3. **Bio Ty Ni**: bịa "vui vẻ, yêu jazz, mê trà sữa" hay bạn gửi info thật?
4. **Dress code**: "White & Gold / Glam Chic" OK hay đổi?
5. **Danh sách khách mời thật**: gửi sau hay tạm 5 slug demo?
6. **Nhạc**: có file cụ thể muốn dùng trong `shared/music/` không? Nếu không, mình tự pick lounge/jazz.
7. **RSVP**: demo localStorage OK, hay cần gửi Google Sheets API như form cưới?
