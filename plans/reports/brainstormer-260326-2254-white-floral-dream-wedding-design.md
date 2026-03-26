# Brainstorm: Thiep Cuoi PRO "Hoa Trang Mong Mo" — White Floral Dream

**Date**: 2026-03-26
**Status**: Complete
**Context**: Thiet ke chi tiet tung section thiep cuoi mobile-first (max-width 520px)

---

## Problem Statement

Can brainstorm design doc cho thiep cuoi PRO moi — tone trang sang, Korean studio classic. Phai KHAC BIET hoan toan voi 3 thiep gan nhat:
- **#211**: Blush romantic, wax seal envelope, wreath overlay, petal fall
- **#213**: Chibi pastel, petal fall, simple sections
- **#214**: Beige Viet Phuc, moon circle envelope, leaf fall, 囍 pattern, gold accent

**Mood**: Trong treo, mong mo, trang tinh khiet, Korean studio
**Palette**: Snow `#FAFAFA` + Sage green `#A8B5A2` + Soft pink `#F2D7D9` + Ivory `#FFF9F0`
**Typography**: Pinyon Script (script) + Lora (serif) + sans-serif body

---

## Section-by-Section Design

---

### 1. ENVELOPE / OPEN SCREEN

#### Y tuong A: "Glass Frost Reveal" — Kinh mo suong
- Man hinh trang, phu lop suong mo (`backdrop-filter: blur(20px)`). Tap → suong tan tu trung tam toa ra ngoai bang `clip-path: circle()` animation, lo anh doi phia sau.
- Button: vong tron giua, icon hoa trang quay cham, text "Cham de Mo" theo duong tron (SVG `<textPath>`).
- Decoration: `corner-floral-lineart-beige.webp` 4 goc. Background sau suong: 1 anh doi teaser.
- Animation: `clip-path: circle(0% at 50% 50%)` → `circle(150%)` over 1.2s ease-out.
- **Pros**: Chua co o 211-214. Tan dung anh trang = xuyen suong rat dep. CSS-only nhe.
- **Cons**: `backdrop-filter` co the khong smooth tren Android cu. Can fallback `opacity`.

#### Y tuong B: "Silk Curtain Pull" — Keo man lua
- 2 nua man ivory, texture lace. Tap → truot sang 2 ben. Hinh bong la cay overlay.
- Button: pill sage green "Keo nhe de mo" + icon arrows.
- Decoration: Gold stitch lines doc mep, `ribbon-bow-sage-watercolor.webp` o giua.
- **Pros**: Metaphor man cuoi hop. Smooth moi thiet bi (chi transform).
- **Cons**: Curtain reveal kha pho bien roi.

#### Y tuong C: "Botanical Letter Unfold"
- Phong bi trang top-down, nap co hoa sage green. Tap → nap lat (3D rotateX), lo to thu ben trong.
- Dung asset co san: `bg-envelope-closed-sage-white-floral.webp`.
- **Pros**: Asset co san. 3D perspective chua dung.
- **Cons**: 3D transform co the jank low-end.

#### WINNER: A — "Glass Frost Reveal"
**Ly do**: Doc dao nhat. Clip-path circle expand = "wow" ngay. Anh trang lo qua suong = gorgeous. CSS-only.

**Implementation**:
```css
#envelope-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(250,250,250,0.95);
  backdrop-filter: blur(20px);
  clip-path: circle(100% at 50% 50%);
  transition: clip-path 1.2s ease-out;
}
#envelope-overlay.revealing {
  clip-path: circle(0% at 50% 50%);
  pointer-events: none;
}
/* Fallback for no clip-path animation support */
@supports not (clip-path: circle(50%)) {
  #envelope-overlay.revealing { opacity: 0; transition: opacity 0.8s; }
}
```
- Corner: `corner-floral-lineart-beige.webp` absolute 4 goc, rotate tuong ung
- Button: SVG circle `<textPath>` "Cham de Mo Thiep" voi `animation: spin 10s linear infinite`
- Phia sau envelope: 1 anh doi full viewport lam teaser visual

---

### 2. HERO

#### Y tuong A: "Soft Focus Split Frame"
- 60vh anh co dau, mask `border-radius: 0 0 50% 50%`. Ten doi tu 2 ben slide vao, "&" bounce.
- **Pros**: Duong cong mem. **Cons**: Mask co the crop xau.

#### Y tuong B: "Floating Polaroid Stack"
- 3 Polaroid xep chong, xoe ra nhu quat khi scroll. Ten doi + ngay ben duoi.
- **Pros**: Korean feel. **Cons**: 3 anh nho tren mobile.

#### Y tuong C: "Dreamy Vignette Portrait"
- 1 anh doi full viewport. Vignette trang mem (radial-gradient → white) tao "anh sang toa". Text phia duoi: Pinyon Script + Lora. Botanical watercolor 2 goc duoi. Parallax nhe.
- **Pros**: Ton anh, elegant. Vignette = chua dung. Parallax = premium.
- **Cons**: Phu thuoc chat luong anh.

#### WINNER: C — "Dreamy Vignette Portrait"
**Ly do**: Full bleed + vignette trang = "glowing" tren anh trang. Don gian ma powerful. Parallax tao chieu sau.

**Implementation**:
```css
.hero { position: relative; height: 100vh; overflow: hidden; }
.hero-img { width: 100%; height: 100%; object-fit: cover; will-change: transform; }
.hero::after {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(250,250,250,0.85) 100%);
}
.hero-text {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 0 24px 60px; z-index: 2; text-align: center;
  background: linear-gradient(to top, rgba(250,250,250,0.95) 0%, transparent 100%);
}
```
- Parallax: scroll listener → `heroImg.style.transform = translateY(${scrollY * 0.3}px)`
- Botanical corners: `flower-branch-watercolor.webp` absolute bottom-left/right, opacity 0.4
- Text fade: `@keyframes fadeSlideUp` voi delay 0.3s sau envelope reveal

---

### 3. GIA DINH

#### Y tuong A: "Botanical Card Duo"
- 2 card ivory, bo tron, icon lineart. Divider doc voi icon rings.
- **Pros**: Sach se. **Cons**: Conventional.

#### Y tuong B: "Family Tree Branch"
- Duong vine doc giua, nhanh re trai/phai. SVG stroke-dashoffset animation.
- **Pros**: WOW factor. **Cons**: Complex layout mobile.

#### Y tuong C: "Overlapping Elegant Panels"
- 2 panel chong 20px. Trai: sage green nhat, phai: soft pink nhat. Goc co hoa watercolor. Giao diem: icon heart tron trang. Slide in tu 2 ben khi scroll.
- **Pros**: Depth + elegant. Chua dung o 211-214.
- **Cons**: Overlap tren mobile hep.

#### WINNER: C — "Overlapping Elegant Panels"
**Ly do**: Visual interest + readability. Subtle color phan biet 2 ben. Slide-in muot.

**Implementation**:
```css
.family-section { position: relative; padding: 40px 16px; }
.family-panel {
  background: rgba(168,181,162,0.08); border-radius: 16px;
  padding: 24px 20px; transition: transform 0.6s ease-out, opacity 0.6s;
}
.family-panel.groom { margin-bottom: -16px; z-index: 1; }
.family-panel.bride { background: rgba(242,215,217,0.08); z-index: 2; }
.family-center-icon {
  position: absolute; left: 50%; transform: translate(-50%, -50%);
  background: white; border-radius: 50%; padding: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06); z-index: 3;
}
```
- Icon giua: `elegant-lineart-heart.webp` hoac `elegant-lineart-rings.webp` (32x32)
- Mobile: stack doc, panel groom margin-bottom: -16px de tao overlap

---

### 4. COUPLE / LOVE STORY

#### Y tuong A: "Filmstrip Memory Lane"
- Cuon phim doc — background #333, sprocket holes 2 ben (CSS repeating-linear-gradient). 3-4 anh doi xen ke text. Scroll = cuon phim.
- **Pros**: Cuc doc dao, chua co trong du an. Retro + modern. Anh trang tren nen den = tuong phan dep.
- **Cons**: Sprocket nho tren 420px.

#### Y tuong B: "Botanical Timeline"
- Timeline doc, dot sage green, anh tron xen ke trai/phai.
- **Pros**: Classic, de doc. **Cons**: Pho bien, 211 da dung.

#### Y tuong C: "Scattered Instant Photos"
- Anh Instax frame roi vao viewport khi scroll. Quote tinh yeu giua cac anh.
- **Pros**: Playful. **Cons**: Nhieu anh roi = distraction.

#### WINNER: A — "Filmstrip Memory Lane"
**Ly do**: Chua thay o bat ky thiep nao. Cuon phim ky niem = emotional. Anh trang tren nen den filmstrip = tuong phan cuc dep.

**Implementation**:
```css
.filmstrip {
  max-width: 300px; margin: 0 auto; background: #2a2a2a;
  border-radius: 8px; padding: 16px 28px; position: relative;
}
.filmstrip::before, .filmstrip::after {
  content: ''; position: absolute; top: 0; bottom: 0; width: 16px;
  background: repeating-linear-gradient(
    to bottom, #222 0px, #222 6px, #444 6px, #444 8px,
    #222 8px, #222 22px
  );
}
.filmstrip::before { left: 4px; }
.filmstrip::after { right: 4px; }
.film-frame {
  background: #fafafa; padding: 6px; margin: 16px 0;
  border-radius: 2px;
}
.film-frame img { width: 100%; display: block; }
.film-caption {
  font-family: 'Lora', serif; font-style: italic;
  color: #A8B5A2; text-align: center; padding: 8px 0;
  font-size: 13px;
}
```
- Moi frame: IntersectionObserver fade-in stagger
- Caption: "Ngay dau gap go...", "Lan hen dau tien...", "Loi cau hon..."

---

### 5. LE CUOI / EVENTS

#### Y tuong A: "Frosted Glass Event Cards"
- 2 card backdrop-filter blur, background anh hoa phia sau.
- **Pros**: Consistent voi envelope theme. **Cons**: Backdrop-filter lag.

#### Y tuong B: "Calendar Tear-off Cards"
- Trang lich xo, so ngay to, flip animation.
- **Pros**: Visual metaphor hay. **Cons**: Spiral binding kho CSS.

#### Y tuong C: "Elegant Map Ticket"
- Card ticket style: perforation dashed, stub trai co ngay, phan chinh co dia diem + gio. Perforation circles bang radial-gradient trick.
- **Pros**: "Ve moi" metaphor doc dao, chua dung. Chi tiet perforation = premium.
- **Cons**: Layout phuc tap hon.

#### WINNER: C — "Elegant Map Ticket"
**Ly do**: Metaphor "ve moi" = y nghia + doc dao. Perforation circles = chi tiet tinh te. 211/213/214 deu card don gian.

**Implementation**:
```css
.event-ticket {
  display: flex; background: #FFF9F0; border-radius: 16px;
  overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  position: relative; margin: 16px;
}
.ticket-stub {
  width: 80px; padding: 20px 12px; text-align: center;
  background: rgba(168,181,162,0.12); flex-shrink: 0;
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; border-right: 2px dashed rgba(168,181,162,0.3);
}
.ticket-stub .day { font-size: 32px; font-weight: 700; color: #A8B5A2; }
.ticket-stub .month { font-size: 12px; text-transform: uppercase; color: #666; }
/* Perforation circles */
.event-ticket::before, .event-ticket::after {
  content: ''; position: absolute; left: 69px;
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--section-bg, #FAFAFA);
}
.event-ticket::before { top: -10px; }
.event-ticket::after { bottom: -10px; }
.ticket-body { padding: 20px 16px; flex: 1; }
```
- Map button: `<a href="https://maps.google.com/..." target="_blank">` styled sage green pill
- Icon: `location-heart-lineart.webp` 24x24 inline

---

### 6. GALLERY

#### Y tuong A: "Masonry Waterfall"
- CSS `column-count: 2`, anh chieu cao khac nhau. Stagger fade-in. Tap → fullscreen lightbox voi backdrop blur + swipe.
- **Pros**: Dynamic, editorial. Native CSS. **Cons**: Column ordering top-to-bottom.

#### Y tuong B: "Scattered Photo Wall"
- Anh treo tuong, rotation random, chong nhe. "Bay vao" tu nhieu huong.
- **Pros**: Organic. **Cons**: Nho tren 420px.

#### Y tuong C: "Horizontal Film Reel"
- Scroll ngang snap, 1.2 anh moi luc. Dot indicator.
- **Pros**: Interactive. **Cons**: Scroll ngang confusing.

#### WINNER: A — "Masonry Waterfall"
**Ly do**: Visual rhythm dep nhat. Native CSS = 0 dependency. Anh trang masonry = editorial fashion magazine vibe.

**Implementation**:
```css
.gallery-masonry { column-count: 2; column-gap: 10px; padding: 0 16px; }
.gallery-item {
  break-inside: avoid; margin-bottom: 10px;
  border-radius: 10px; overflow: hidden;
  opacity: 0; transform: scale(0.95);
  transition: opacity 0.5s, transform 0.5s;
}
.gallery-item.visible { opacity: 1; transform: scale(1); }
.gallery-item img { width: 100%; display: block; }

/* Lightbox */
.lightbox {
  position: fixed; inset: 0; z-index: 9998;
  background: rgba(250,250,250,0.92);
  backdrop-filter: blur(16px);
  display: flex; align-items: center; justify-content: center;
}
.lightbox img { max-width: 90vw; max-height: 85vh; border-radius: 8px; }
```
- Stagger: moi `.gallery-item:nth-child(n)` co `transition-delay: n * 0.08s`
- Lightbox swipe: touchstart/touchmove/touchend, deltaX > 50px = next/prev
- Close: tap outside anh hoac X button

---

### 7. CLOSING / THANK YOU

#### Y tuong A: "Handwritten Letter Fade"
- SVG text `stroke-dashoffset` animation "Cam on". Confetti roi nhe.
- **Pros**: Cam dong. **Cons**: SVG text path complex.

#### Y tuong B: "Fading Polaroid Memory"
- Anh doi cuoi dang Polaroid lon. Handwritten text Pinyon Script ben duoi. Fade in + zoom nhe. Background ivory → trang.
- **Pros**: Emotional closure, warm. Don gian dep.
- **Cons**: Tuong tu couple section neu dung Polaroid (nhung couple dung Filmstrip, nen OK).

#### Y tuong C: "Infinite Loop Hearts"
- Hearts bay len tu duoi, loop. Text "Cam on" lon.
- **Pros**: Emotional loop. **Cons**: Co the childish.

#### WINNER: B — "Fading Polaroid Memory"
**Ly do**: Emotional nhat ma khong over-engineer. Couple dung Filmstrip nen Polaroid o day khong trung. Warm ending.

**Implementation**:
```css
.closing-section {
  min-height: 80vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 40px 24px;
  background: linear-gradient(to bottom, #FFF9F0, #FAFAFA);
}
.closing-polaroid {
  background: white; padding: 12px 12px 48px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
  transform: rotate(-2deg);
  opacity: 0; transition: all 1s ease-out;
}
.closing-polaroid.visible {
  opacity: 1; transform: rotate(-2deg) scale(1);
}
.closing-polaroid img { width: 280px; display: block; }
.closing-message {
  font-family: 'Pinyon Script', cursive; font-size: 24px;
  color: #A8B5A2; margin-top: 24px; text-align: center;
}
```

---

### 8. AMBIENT EFFECTS

**Rang buoc**: KHONG petal fall (211, 213), KHONG leaf fall (214).

#### Y tuong A: "Floating Light Orbs" — Bokeh mong mo
- 8-12 hinh tron nho (4-10px), blur, opacity 0.2-0.6, bay len cham + sway ngang. Cam giac "anh sang le loi".
- **Pros**: Nhe, CSS-only. Hop mood "mong mo". Chua dung trong du an.
- **Cons**: Subtle.

#### Y tuong B: "Soft Sparkle Dust"
- Cham sao 2-4px twinkle random. JS tao DOM elements.
- **Pros**: Ma thuat. **Cons**: Nhieu DOM = performance.

#### Y tuong C: "Gentle Mist Layers"
- 2-3 div suong di chuyen ngang cham.
- **Pros**: Cuc nhe. **Cons**: Qua subtle.

#### WINNER: A — "Floating Light Orbs"
**Ly do**: Can bang visible vs subtle. Bokeh hop toi da voi "trang sang, trong treo". CSS-only. Chua co trong du an.

**Implementation**:
```css
.ambient-container {
  position: fixed; inset: 0; pointer-events: none; z-index: 1;
  overflow: hidden;
}
.orb {
  position: absolute; border-radius: 50%;
  background: rgba(255,255,255,0.5);
  filter: blur(2px);
  animation: floatOrb var(--duration) var(--delay) linear infinite;
}
@keyframes floatOrb {
  0% { transform: translateY(0) translateX(0); opacity: 0.2; }
  25% { opacity: 0.5; }
  50% { transform: translateY(-50vh) translateX(20px); opacity: 0.6; }
  75% { opacity: 0.4; }
  100% { transform: translateY(-110vh) translateX(-15px); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .orb { animation: none; opacity: 0.3; }
}
```
- JS: tao 10 orbs, random `--duration` (12-20s), `--delay` (0-8s), `width/height` (4-10px), `left` (5-95%), `bottom: -20px`
- Background pattern: `bg-sage-green-hexagon-floral-lineart.webp` opacity 0.03 tren body

---

## Tong Ket Thiet Ke

| Section | Winner | Diem Nhan |
|---------|--------|-----------|
| Envelope | Glass Frost Reveal | clip-path circle expand, suong tan lo anh |
| Hero | Dreamy Vignette Portrait | Full bleed, radial vignette trang, parallax |
| Gia Dinh | Overlapping Elegant Panels | 2 panel chong overlap, slide-in |
| Couple | Filmstrip Memory Lane | Cuon phim den, anh trang contrast |
| Le Cuoi | Elegant Map Ticket | Ve moi perforation, stub ngay |
| Gallery | Masonry Waterfall | column-count 2, stagger fade, lightbox swipe |
| Closing | Fading Polaroid Memory | Polaroid frame, handwritten quote |
| Ambient | Floating Light Orbs | Bokeh CSS-only, float up |

## Shared Assets Su Dung

| Asset | Dung O Dau |
|-------|-----------|
| `corner-floral-lineart-beige.webp` | Envelope 4 goc |
| `flower-branch-watercolor.webp` | Hero 2 goc duoi |
| `elegant-lineart-heart.webp` | Gia dinh center icon |
| `elegant-lineart-rings.webp` | Gia dinh backup icon |
| `ribbon-bow-sage-watercolor.webp` | Optional decoration |
| `location-heart-lineart.webp` | Event cards |
| `divider-leaves-green.webp` | Section dividers |
| `bg-sage-green-hexagon-floral-lineart.webp` | Body background pattern |
| `bg-luxury-fabric-white-silk-gold.webp` | Envelope background (optional) |

## Design Principles Applied

1. **Visual Contrast**: Filmstrip dark bg + trang = drama. Vignette trang + anh trang = glow.
2. **Metaphor Consistency**: Phong bi → anh → album phim → ve moi → Polaroid ky niem → cam on.
3. **Performance**: CSS-only where possible (masonry, orbs, filmstrip). JS chi cho IntersectionObserver + parallax + lightbox swipe.
4. **Differentiation**: Khong trung bat ky element nao voi 211 (wax seal, wreath, petals), 213 (chibi, petals), 214 (moon, leaves, 囍, gold).

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|-----------|
| `backdrop-filter` lag Android cu | Medium | Fallback opacity transition |
| `clip-path` animation not supported | Low | @supports fallback |
| Parallax jank on scroll | Medium | `will-change: transform`, throttle scroll handler |
| Filmstrip too dark cho tong chung | Low | Gioi han trong 1 section, tao contrast co chu dich |
| Masonry column-count ordering | Low | Sap xep anh ky truoc khi code |

## Unresolved Questions

1. So luong anh chinh xac trong Gallery? (Goi y: 6-8 anh cho masonry dep)
2. Co can RSVP / Guestbook / Mung cuoi QR section khong? (211 co, 213 khong)
3. Countdown timer section co can khong?
4. Ten cap doi chinh xac de lam SVG textPath tren envelope button?
5. Thong tin cu the (ngay, gio, dia diem) de fill vao ticket cards?
