# Plan — Thiệp cưới Pink Pastel Korean Studio

> Tạo thiệp cưới HTML/CSS/JS thuần dựa trên concept + assets từ `gen_sinh_nhat_demo_2/`.
> Output: `products/Invitation/Wedding/gen_233_cuoi-pink-pastel-korean/index.html`

## Design Spec

### Palette
| Role | Hex | RGB |
|---|---|---|
| Bg primary | `#F9F1EF` | rgb(249,241,239) — cream pink ấm |
| Bg section alt | `#FFFFFF` | Trắng |
| Accent primary | `#A3403D` | rgb(163,64,61) — đỏ hồng trầm |
| Accent soft | `#E49696` | rgb(228,150,150) — hồng pastel |
| Text primary | `#3D2222` | Nâu đậm |
| Text secondary | `#7A5050` | Nâu nhạt |

### Typography
| Role | Font | Weight | Note |
|---|---|---|---|
| Script names | **Carlytte** (local) | 400 | Tên couple (Latin only) |
| Heading display | **PlayfairDisplay** (local) | 400-700 | Section titles |
| Body | **Quicksand** (Google Fonts) | 300-600 | Nội dung |
| Script accent | **Aquarelle** (local) | 400 | Decorative text |
| Handwriting | **BucThu** / **HoaTay1** (local) | 400 | Tiếng Việt accent |

**Fonts local**: copy từ `gen_sinh_nhat_demo_2/fonts/` + `css/font.css`

### Layout
- Max-width: **451px** (mobile card centered on desktop)
- Desktop: card centered trên bg gray `#F0F2F5`, border + shadow
- Mobile: fullscreen, no gray border
- Scroll vertical, sections stacked

### Assets từ folder gốc (reuse trực tiếp)
| File | Dùng làm | Note |
|---|---|---|
| `0660702c...jpg` | Ảnh couple 1 (landscape) | Korean pink studio |
| `9881034c...jpg` | Ảnh couple 2 (square) | Korean pink studio |
| `518b1a1e...jpg` | Ảnh couple 3 | |
| `7e576579...jpg` | Ảnh couple 4 | |
| `8ae958e7...jpg` | Ảnh couple 5 | |
| `9a1e2fa8...jpg` | Ảnh couple 6 | |
| `c4d45265...jpg` | Ảnh couple 7 | |
| `9d1297eb...jpg` | Ảnh couple 8 | |
| `37877611...jpg` | Ảnh couple avatar (square crop) | |
| `f9a1916a...png` | Ảnh couple portrait (dọc) | |
| `a37a0a9f...png` | Hearts decoration (3 hearts pink gradient) | Scatter deco |
| `c6d2e020...png` | Circle pink gradient + sparkle stars | Bg deco |
| `1d098419...png` | Decoration element | |
| `072_y6myfwhzrlk.png` | Decoration element | |
| `wax-seal.webp` | Bronze botanical wax seal | Envelope |
| `694f24...gif` | 3D chibi couple dancing | Fun element |
| `biubiu.png` | Chibi hand shooting hearts | Gift section |
| `calen_heart_1.png` | Calendar heart icon | Calendar section |
| `audio-6.png` | Music icon | Toggle nhạc |
| `message.24f9a1e2.png` | Message icon | Bỏ (ko dùng chat) |
| `87716a41...png` | QR code | Bỏ (gen riêng) |
| `0e470330...mp3` | Nhạc nền | Audio |

## Sections (10 sections — theo thứ tự gốc)

### 1. Envelope (cover)
- Bg: `#F9F1EF` + hearts decoration `a37a0a9f` top-right
- Wax seal center: `wax-seal.webp` (bronze botanical leaf)
- Text: "Thiệp mời" script, tên couple Carlytte
- Tap anywhere to open → wax seal crack animation + envelope flap lift

### 2. Hero (couple intro)
- Ảnh couple chính (landscape) `0660702c` full-width
- Tên couple lớn (Carlytte script) + "& " giữa
- Subtitle: ngày cưới, tiệc cưới
- Hearts pink rải xung quanh `a37a0a9f`
- Circle pink deco `c6d2e020` góc

### 3. Greeting / Lời mời
- Text-box centered: lời mời trang trọng tiếng Việt
- Font: Quicksand body + BucThu/HoaTay1 cho accent
- Bg: white card + soft shadow

### 4. Couple Info (Thông tin đôi uyên ương)
- 2 khung: Chú rể (trái) + Cô dâu (phải)
- Avatar ảnh tròn (crop từ `37877611`)
- Tên, tuổi, gia đình
- Bg: `#F9F1EF`

### 5. Love Story Timeline
- 3-5 mốc (gặp nhau → yêu → cầu hôn → cưới)
- Mỗi mốc: ảnh nhỏ + text + năm
- Timeline line dọc with dots
- Stagger reveal on scroll

### 6. Gallery
- Grid/Masonry 2 cột: 6-8 ảnh couple
- Lightbox on click
- Ảnh: reuse tất cả jpg từ folder

### 7. Calendar / Event Details
- Calendar icon `calen_heart_1.png`
- Ngày cưới highlight heart
- Giờ + địa điểm
- Countdown đến ngày cưới (days/hours/mins/secs)
- Google Maps embed hoặc link

### 8. RSVP Form
- Tên khách + Số người + Lời chúc
- Submit → localStorage (demo)
- Bg: accent soft `#E49696` gradient

### 9. Wishes / Blessings Display
- Hiện lời chúc đã submit (localStorage)
- Hoặc pre-fill demo wishes
- Chibi dancing couple `694f24...gif` decoration

### 10. Footer / Thank You
- "Cảm ơn" script
- Tên couple + ngày cưới
- Music credit
- Biubiu sticker decoration

## Effects + Animations
| Effect | Kỹ thuật |
|---|---|
| Hearts floating | CSS keyframes, 12-15 hearts continuous |
| Envelope open | CSS transform rotateX(180deg) cho flap + wax-seal scale+fade |
| Scroll reveal | IntersectionObserver, fade-up 1200ms outExpo |
| Gallery lightbox | JS modal, backdrop blur |
| Countdown | setInterval 1000ms tick |
| Chibi dance | GIF inline (đã có file) |
| Music toggle | Audio API play/pause, icon rotate spin |

## Music
- File: `audio/0e470330-e4d4-4fdc-8d99-830aab66916c.mp3` (copy vào output folder)
- Auto-play muted, user toggle unmute
- Icon: `audio-6.png`

## Technical
- **Single file**: `index.html` inline CSS+JS nếu ≤600 dòng, tách nếu lớn hơn
- **Fonts**: copy `fonts/` folder + `font.css` → output folder
- **Images**: copy JPG/PNG/GIF/WebP → output `images/` subfolder
- **No framework**: vanilla HTML/CSS/JS, no Ant Design, no Next.js, no Tailwind
- **Responsive**: max-width 451px card on desktop (gray bg), fullscreen mobile
- **Anime.js v4**: dùng cho envelope timeline + gallery stagger + hearts particles

## Phases

### Phase 1 — Setup folder + copy assets
1. `mkdir gen_233_cuoi-pink-pastel-korean/{images,fonts,audio}`
2. Copy images (jpg/png/gif/webp), fonts/, audio/ từ gen_sinh_nhat_demo_2
3. Copy font.css (clean up duplicate `@font-face`)

### Phase 2 — Gen HTML
- 10 sections per spec
- Inline CSS variables (palette from spec)
- Google Fonts: Quicksand CDN
- Local fonts: Carlytte, PlayfairDisplay, Aquarelle, BucThu, HoaTay1 via font.css
- Anime.js v4 CDN

### Phase 3 — Quality verify
- Screenshot desktop 451px card + mobile 390px
- Check: fonts render, images load, colors match, responsive OK
- Score ≥ 70%

### Phase 4 — Delivery
- data.js entry #233 (isPublic: false)
- Screenshot → screen.webp + screen-mobile.webp
- Commit

## Câu hỏi còn
1. **Tên couple demo**: random từ names.js hay giữ tên từ template gốc?
2. **Ngày cưới demo**: ngày nào?
3. **Love story**: bịa 4 mốc hay bạn có nội dung?
4. **RSVP**: localStorage demo hay Google Sheets API?
5. **Bỏ section nào**: chat bubble đã bỏ, gift/biubiu giữ hay bỏ?
