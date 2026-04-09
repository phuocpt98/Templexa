# Plan — Thiệp Ty Ni v2 (khach_2_v2)

> Nâng cấp thiệp #229 Ty Ni — tập trung vào **cinematic open 3s**, music "Happy Birthday remix", nhiều animation scroll-reveal chậm rãi cho user cảm nhận rõ.

## Constraints từ user
- **Open sequence**: 3 giây
- **Music**: `products/shared/music/festive-holiday/khuc-hat-mung-sinh-nhat-remix.mp3`
- **Budget**: CAO — được phép gen video/ảnh Gemini/Veo
- **Giữ**: badge 18+, palette white gold bling bling
- **Performance**: chất lượng vừa phải tránh lag, có loading effect khi chờ video
- **Animation**: chậm (1000-1600ms), nhiều, scroll-reveal, stagger rõ ràng

## Folder
`products/Invitation/Other/khach_2_v2/` — clone v1 + reuse toàn bộ assets:
```
khach_2_v2/
├── index.html          # Main file (rewritten)
├── data.js             # Guest list (copy from v1)
├── assets/
│   ├── intro.mp4       # Veo-gen 3s cinematic open (NEW)
│   ├── intro-poster.webp  # First frame as poster
│   └── ../../khach_2/assets/*  # Reuse via relative path
└── khach_2.webp        # Copy ảnh khách
```

## Phase 1 — Loading + Open sequence (0 → 3.5s)

### A. Loading screen (0 → video buffered)
- Fullscreen ivory cream bg
- Center: logo "TY NI" script fade-in + pulse
- 3 gold dots `...` loading animation
- Progress bar gold thin (nếu video >500KB)
- Auto-dismiss khi video `canplaythrough` event

### B. Cinematic video intro (3s)
- `<video autoplay muted playsinline>` fullscreen cover
- Muted video (browser autoplay policy)
- Audio nhạc bắt đầu sync với video end
- Fade-out mask 500ms reveal hero

### C. Transition (3s → 3.5s)
- Video fade out
- Hero "pop up" with elastic reveal
- Music fade in from video end

## Phase 2 — Hero (enhanced)
- **Photo frame**: Ken Burns zoom 12s loop (scale 1 → 1.05 slow)
- **Name "Ty Ni"**: letter-by-letter kerning reveal 2000ms (stagger 180ms)
- **Age 18+**: elastic pop 1800ms sau name (outElastic)
- **Countdown**: fade-up stagger 4 boxes 200ms gap
- **Gold particles**: 60 particles continuous (hiện tại 40)
- **Parallax scroll**: hero bg di chuyển chậm hơn content (0.5x rate)

## Phase 3 — Scroll-reveal nâng cấp (tất cả sections)

### Animation timing rules
- **Duration**: 1200-1600ms (chậm, rõ)
- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)` (outExpo - soft)
- **Stagger**: 200-300ms giữa items trong cùng nhóm
- **Threshold**: 0.2 (trigger khi 20% section vào view)

### Section by section
| Section | Animation mới |
|---|---|
| **About text** | Word-by-word fade-in stagger 80ms, italic tilt -2deg → 0 |
| **Facts (3 cards)** | Card lift from y+60px + scale 0.85→1 + rotate -3deg→0, stagger 300ms |
| **Fact icons** | Scale 0 → 1.1 → 1 bounce sau card reveal 400ms |
| **Timeline** | Line draw top→bottom stroke-dashoffset 2000ms, dots pop sau 200ms each, ms-icon rotate -180°→0° + scale |
| **Details card** | Frame botanical fade + scale, 3 detail rows stagger slide-in left 250ms each |
| **Dress code** | Swatches bounce-in stagger 150ms, bow icon float |
| **Map** | iframe fade-in + gold border draw path |
| **Thanks cake** | Scale 0.5→1 with rotate 360° slow 2000ms, bubbles intensify |

## Phase 4 — Loading indicator & Performance

### Loading states
1. **Initial (0ms)**: ivory bg only
2. **Video loading**: "TY NI" logo + 3 dot loader
3. **Video buffered**: progress bar 0→100% in 500ms
4. **Video ready**: fade loading → play video
5. **Video playing**: hide loading fully
6. **Fallback**: nếu video fail load sau 5s → skip to static hero

### Performance guardrails
- Video: **1080p max, 4-5 Mbps bitrate, H.264 baseline** (universal support)
- Target file size: **≤ 2MB** (3s × ~650KB/s)
- Preload: `metadata` only initially, switch to `auto` after DOM ready
- Lazy-load assets scroll-reveal với IntersectionObserver (`rootMargin: 200px`)
- Animation use `transform` + `opacity` only (GPU)
- Giới hạn particles: 60 max, `will-change: transform`
- Debounce scroll listener nếu cần parallax

## Phase 5 — Gemini/Veo Prompts

### Video intro 3s (Veo 3)
```
Cinematic 3-second intro for a luxury birthday invitation, white gold bling bling theme.
Scene: Pure ivory cream background. A golden ink drop appears at center and blooms outward into a radial burst of 12 golden light petals, like a flower opening. Champagne gold glitter particles swirl around. Soft bokeh lights float. Gold calligraphy "Happy Birthday" in cursive script reveals with shimmer effect in the last second. Elegant, luxurious, boutique feel.
Style: photorealistic 3D, soft studio lighting, cinematic depth of field, smooth camera zoom-in slightly.
Duration: 3 seconds. Ends with a bright flash into pure white/ivory for seamless transition.
Resolution: 1080p. Frame rate: 30fps. No text except "Happy Birthday" calligraphy in last second.
Aspect ratio: 16:9 landscape.
IMPORTANT: keep motion smooth and gentle, not chaotic. Minimal particles (~20 visible at once) to avoid lag. Warm gold #D4AF37 and ivory #FFFEF7 only.
```

### Video intro 3s - Alternative (Veo 3 vertical)
```
Same as above but vertical 9:16 for mobile-first delivery.
```

### Loading spinner illustration (Imagen 4 fallback)
```
Elegant thin gold circular loading ring, 3 gold dots animating around center, isolated on transparent background, minimalist luxury style, 512x512 PNG transparent.
```

### Poster frame (first frame of video)
```
First frame of the 3s intro above: ivory background with tiny gold dot at center, ready to bloom. Static image for video poster attribute.
```

### If Veo unavailable — 5 image sequence (Imagen 4)
Gen 5 ảnh để CSS/JS interpolate:
1. `frame-1.webp`: ivory bg + tiny gold dot center
2. `frame-2.webp`: gold bloom mid-expansion, 6 petal lines starting
3. `frame-3.webp`: full radial burst, 16 petals, glitter swirl
4. `frame-4.webp`: "Happy Birthday" script appearing, peak glitter
5. `frame-5.webp`: fade to pure ivory (near-white)

## Phase 6 — Implementation order

1. **Clone folder**: `cp -r khach_2/ khach_2_v2/`
2. **Add loading HTML**: `#loading` overlay với TY NI logo + dot loader
3. **Add video element**: `<video id="intro" playsinline muted>` + poster
4. **Integrate music**: delay music start đến sau video fade-out
5. **Rewrite intersection observer**: tăng duration + easing + stagger
6. **Add Ken Burns photo animation**: CSS keyframes
7. **Add letter-by-letter name reveal**: split chars + stagger
8. **Add parallax hero bg**: `transform: translateY(calc(var(--scroll) * 0.5px))`
9. **Bump scroll reveal stagger**: 200-300ms
10. **Add timeline line draw**: SVG path with stroke-dashoffset
11. **Fallback**: nếu video lỗi → skip to static hero
12. **Gen Veo video**: paste prompt cho user
13. **Convert + place video**: resize ≤1080p, mp4 H.264, compress <2MB
14. **Generate poster**: first frame via ffmpeg
15. **Screenshot + data.js entry #231**
16. **Test mobile**: loading state, video playback, animation smooth

## Phase 7 — Data.js entry #231
```js
{
  id: 231,
  isPublic: false,
  name: 'Thiệp Sinh Nhật Ty Ni v2 - Cinematic White Gold',
  slug: 'sinh-nhat-ty-ni-v2-cinematic-white-gold',
  description: 'Phiên bản v2 — thêm cinematic video intro 3s, loading screen, letter-by-letter name reveal, Ken Burns photo, timeline SVG line draw, scroll animations chậm cinematic. Music Happy Birthday remix.',
  category: 'other',
  type: 'invitation',
  tags: ['birthday', '18-plus', 'cinematic', 'video-intro', 'white-gold', 'bling-bling', 'v2', 'ty-ni'],
  ...
}
```

## Câu hỏi còn
1. **Veo access**: bạn có account Veo 3 để gen video không? Hay mình giả lập bằng 5 ảnh Imagen + CSS transitions?
2. **Fallback video**: nếu không gen được, dùng Imagen sequence hay upgrade flower burst CSS hiện tại lên cinematic level?
3. **Preload strategy**: preload video ngay từ `<head>` hay chỉ sau DOM ready?
4. **Loading text**: "TY NI" hay "Đang mở thiệp..." hay cả 2?
5. **Music sync**: fade in music từ đầu hay chỉ sau video end? (Current plan: sync với video end cho dramatic effect)
