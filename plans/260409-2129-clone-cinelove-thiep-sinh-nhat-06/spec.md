# Design Spec — Inspired by cinelove.me/template/thiep-sinh-nhat-06

> Mục tiêu: tái thiết kế concept thiệp sinh nhật peachy warm của cinelove cho Templexa.
> Slug đề xuất: `gen_230_sinh-nhat-peachy-warm`
> **Bỏ**: chat bubble "Gửi lời chúc", heart counter "Bắn tim", cinelove branding.

## Concept gốc
- Card dọc đơn lẻ ~500×1162px (không scroll dài) — giống 1 thiệp giấy đứng
- Mood: warm, sweet, teen/Sweet 16, pastel peachy apricot
- Case study: "Mei's 16th Birthday Invitation" — date 2050.05.20, time 12:00

## Asset URLs gốc (reference only — KHÔNG tải về repo)
| Loại | URL |
|---|---|
| Thumbnail template | `https://img.cinelove.me/templates/assets/1745ba59-703d-4c2a-9f10-f18fa1dfe932/0b532418-56cc-4ee2-93f0-e06d6b88360d.jpeg` |
| Long thumbnail | `https://img.cinelove.me/templates/long_thumbnail/1745ba59-703d-4c2a-9f10-f18fa1dfe932.webp` |
| Gift icon "biubiu" | `https://assets.cinelove.me/gifts/thumb/biubiu.png` |
| Logo (bỏ) | `https://cinelove.me/images/logos/logo-cinelove-full.svg` |

**Action**: screenshot các URL trên để tham khảo style, KHÔNG embed vào repo. Assets mới phải tự gen (Gemini prompts) hoặc dùng ảnh khách thật.

## Palette (inferred)
| Role | Hex | Notes |
|---|---|---|
| Background primary | `#FFDEE7` | Soft pink peachy |
| Background warm | `#FFE9D4` | Apricot tint |
| Accent pink | `#FF9AA6` → `#FF4969` | Heart/button gradient |
| Accent blue | `#1677FF` / `#3A9BFF` | Secondary (có thể skip cho birthday) |
| Text primary | `rgba(0,0,0,0.88)` | Dark soft |
| White | `#FFFFFF` | Card |

**Đề xuất Templexa**: giữ peach warm, drop blue accent → thuần peachy + gold nhẹ cho elegant birthday feel.

## Typography gốc
- System font stack (Apple SF / Segoe UI / Roboto) — không Google Font
- Heading lớn hơn body, có regular + bold

**Đề xuất Templexa** (nâng cấp vì Showcase Sans chỉ có trong template gốc):
- Heading display: **Playfair Display** hoặc **Cormorant Garamond** (serif sweet)
- Script accent: **Allura** / **Great Vibes** cho "Happy Birthday"
- Body: **Inter** / **Manrope**
- Number tuổi: **Playfair Display 900** gradient peach→coral

## Sections (gốc → clone)
1. **Header card** — tên celebrant (vd: "Mei's 16th Birthday Invitation")
2. **Greeting body** — lời mời tiếng Việt expressing joy turning 16
3. **Event details block** — date, time, location
4. **Bouncing gift icon** — GIF/animation box quà nhún lên xuống (6s loop)
5. ~~Chat bubble "Gửi lời chúc"~~ — **BỎ**
6. ~~Heart "Bắn tim" counter~~ — **BỎ**
7. ~~CineLove branding footer~~ — **BỎ**

## Animations gốc
| Animation | Detail |
|---|---|
| `bounceGift` | 6s loop keyframes `translateY: 0 → -10px → -5px → -2px` |
| `shake` | Scale 1 → 1.3 → 1, 0.1s, repeat 3x (heart — bỏ) |
| Fade/SlideIn | 0.3s ease-in-out cho modals |

## Section design Templexa (original recreation)
### Card layout
- Wrapper: `max-width: 520px`, aspect ratio ~2.32 (~1200px height), centered viewport
- Background: `linear-gradient(180deg, #FFDEE7 0%, #FFE9D4 50%, #FFD6C4 100%)` + radial bokeh pink
- Border: 2px gold `#D4AF37` với corner ornaments SVG
- Shadow: `0 30px 80px rgba(255, 154, 166, 0.3)`

### Sections (top → bottom)
1. **Top ribbon** — "Birthday Invitation" script Allura + dots divider
2. **Celebrant name** — huge serif (Playfair 800), `MEI` caps gradient peach
3. **Age badge** — "16" circle badge with gold ring + soft glow pulse
4. **Photo oval** — ảnh khách (single) oval frame với double gold border (như Ty Ni)
5. **Greeting** — italic Cormorant 2-3 dòng
6. **Event details** — 3 rows centered với gold icon line-art (calendar, clock, pin)
7. **Bouncing gift** — SVG wrapped gift box với ribbon, bounce 6s loop
8. **Bottom ornament** — botanical SVG + dots

### Decoration
- **Peach petals** floating (anime.js 15 particles, 20s loop)
- **Sparkle stars** random positions (12-16 twinkle)
- Soft bokeh radial gradients pink

### Mobile responsive
- Card width `min(92vw, 520px)`, scale elements with `clamp()`
- Số tuổi 16 readable ở 320px

## Assets cần gen (prompts Gemini)
1. **Background texture** — peachy cream paper with soft gradient, watercolor stain hints, no text — 1:2 portrait
2. **Gift box 3D** — elegant wrapped gift with peach ribbon and gold accents, isolated on transparent, 1:1 square
3. **Floral corner ornaments** — gold line art botanical corner, art nouveau, transparent, 1:1
4. **Peach petals** — scattered rose petals peachy tone, transparent PNG

Shared style tokens: `warm peachy apricot, gold accents, elegant sweet 16, soft studio lighting, no text, 8k`

## Data.js entry (draft)
```js
{
  id: 230,
  isPublic: false,
  name: 'Thiệp Sinh Nhật Sweet 16 - Peachy Warm',
  slug: 'sinh-nhat-sweet-16-peachy-warm',
  description: 'Thiệp sinh nhật Sweet 16 phong cách peachy warm đằm thắm — card dọc 520×1200, palette pink peach apricot, bouncing gift animation, oval photo frame, countdown. Lấy cảm hứng concept card đơn từ cinelove template 06.',
  category: 'other',
  type: 'invitation',
  tags: ['birthday', 'sinh-nhật', 'sweet-16', 'teen', 'peachy', 'warm', 'pink', 'single-card'],
  price: '',
  path: './products/Invitation/Other/gen_230_sinh-nhat-peachy-warm/',
  demoUrl: './products/Invitation/Other/gen_230_sinh-nhat-peachy-warm/index.html',
  features: [
    'Card dọc đơn 520×1200 — không scroll dài, 1 khung thiệp giấy',
    'Palette peachy warm pink + gold accent, Playfair + Allura + Cormorant',
    'Bouncing gift SVG + peach petals floating + sparkles twinkle',
  ],
  status: 'new',
  priority: 0,
  downloads: 1,
  rating: 4.8,
  showInSlider: false,
  updatedAt: '2026-04-09',
}
```

## Câu hỏi còn
1. Case study demo: tên + tuổi + ngày? (hay dùng "Mei 16th 2050.05.20" như gốc?)
2. Ảnh celebrant: mình dùng placeholder gradient hay bạn có ảnh mẫu?
3. Có muốn gen 4 Gemini prompts assets ngay, hay skip và dùng CSS gradient + SVG thuần?
4. Background watercolor stain: gen Gemini hay dùng CSS gradient thôi?
