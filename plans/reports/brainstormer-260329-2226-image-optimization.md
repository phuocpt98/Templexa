# Brainstorm: Toi uu toc do load anh Templexa

## Hien trang

| Metric | Gia tri |
|--------|---------|
| Tong anh | 1,915 files / 183 MB |
| Format | 1,813 WebP + 36 PNG + 66 JPG |
| Avg size | WebP ~98KB, PNG/JPG ~688KB |
| Thumbnail dims | ~1884x921px (serve cho card ~400-450px wide) |
| `loading="lazy"` | Da co tren tat ca JS-rendered `<img>` |
| Aspect-ratio placeholder | Da co (`4/3` va `9/16` cho invitation) |

**Van de goc:** Thumbnail 1884px wide nhung card chi hien ~400px. Dang serve 4x resolution can thiet. PNG/JPG con sot lai rat nang (avg 688KB).

---

## 7 Giai phap, xep theo Impact/Effort

### 1. Tao thumbnail nho (resize cho grid)

**Mo ta:** Script build-time dung `sips` (macOS built-in) hoac `cwebp`/`sharp` tao `thumbnail-sm.webp` (480px wide, quality 80) tu anh goc. Products.js dung `thumbnail-sm.webp` cho grid card, giu anh goc cho detail page.

- **Impact:** CAO -- giam ~75% data load trang products (1884px -> 480px = ~4x nho hon)
- **Effort:** TRUNG BINH -- 1 shell script + update JS render code + chay 1 lan toan bo
- **Trade-off:** Them 1 file/product (~10-15KB each, ~220 files = ~3MB total). Repo lon hon chut it.
- **Thay doi workflow:** Co -- khi gen thiep moi, chay script tao thumbnail-sm.webp hoac tich hop vao quy trinh quet san pham.

**Recommendation:** DAY LA GIAI PHAP #1 NEN LAM TRUOC.

### 2. Convert PNG/JPG con lai sang WebP

**Mo ta:** 102 file PNG/JPG (avg 688KB) chua chuyen WebP. Script 1 lan chuyen het, update path trong data.js.

- **Impact:** CAO cho 102 file do (giam ~70-80% size, tu 688KB -> ~100-150KB avg)
- **Effort:** THAP -- `find + cwebp` 1 lenh, sed update data.js
- **Trade-off:** Mat anh goc (giu backup hoac git history). Can update data.js paths.
- **Thay doi workflow:** Khong -- da dung WebP cho san pham moi roi.

### 3. `<img>` voi `width`/`height` attributes + `decoding="async"`

**Mo ta:** Them `width` va `height` attributes len `<img>` tag de browser biet truoc kich thuoc (giam Cumulative Layout Shift). Them `decoding="async"` de browser decode anh ngoai main thread.

- **Impact:** TRUNG BINH -- cai thien CLS score va perceived performance, khong giam data transfer
- **Effort:** THAP -- them 2-3 attributes vao template string trong JS
- **Trade-off:** Can biet dimensions. Voi aspect-ratio CSS da co, CLS impact nho hon. `decoding="async"` la free win.
- **Thay doi workflow:** Khong

### 4. IntersectionObserver manual (thay native lazy)

**Mo ta:** Thay `loading="lazy"` bang IntersectionObserver custom voi `rootMargin: "200px"` de pre-load anh truoc khi user scroll toi. Dung `data-src` placeholder pattern.

- **Impact:** THAP-TRUNG BINH -- native `loading="lazy"` da du tot. Custom IO chi tot hon neu muon control chinh xac threshold.
- **Effort:** TRUNG BINH -- viet IO code, thay doi cach render img
- **Trade-off:** Them complexity, native lazy da handle tot. Browser support cua native lazy > 95%.
- **Thay doi workflow:** Khong

**Verdict:** KHONG NEN LAM. Native lazy da du. Effort khong xung dang.

### 5. CSS `content-visibility: auto` cho product cards

**Mo ta:** Them `content-visibility: auto` + `contain-intrinsic-size` cho `.product-card` de browser skip render off-screen cards.

- **Impact:** TRUNG BINH -- giam rendering cost (paint/layout), khong giam network. Tot cho trang nhieu card.
- **Effort:** THAP -- 2 dong CSS
- **Trade-off:** Compat: Chrome 85+, Safari 18+, Firefox 125+. Khong anh huong chuc nang neu khong support.
- **Thay doi workflow:** Khong

### 6. Blur-up placeholder (LQIP)

**Mo ta:** Tao anh placeholder 20x15px inline base64 (blur), hien truoc khi anh that load xong. Transition smooth tu blur -> sharp.

- **Impact:** TRUNG BINH -- cai thien perceived performance (user thay "gi do" ngay), khong giam actual load time
- **Effort:** CAO -- script tao LQIP cho 220+ products, store base64 trong data.js (tang size data.js ~50-100KB), them CSS transition logic
- **Trade-off:** Data.js lon hon. Complexity tang. Perceived improvement nhung khong thuc su nhanh hon.
- **Thay doi workflow:** Co -- moi san pham moi can gen LQIP

**Verdict:** NICE-TO-HAVE, lam sau giai phap 1-2-3.

### 7. Preload hero/above-the-fold images

**Mo ta:** Them `<link rel="preload">` cho 3-4 anh dau tien tren products.html (above the fold). Hoac trong JS: load first 3 images voi `fetchpriority="high"`, con lai giu lazy.

- **Impact:** THAP-TRUNG BINH -- chi nhanh hon cho 3-4 anh dau, con lai khong doi
- **Effort:** THAP -- them logic phan biet first-batch vs lazy trong render function
- **Trade-off:** First 3 images khong the lazy load (phai eager). Browser co the da lam dieu nay voi native heuristics.
- **Thay doi workflow:** Khong

---

## Ma tran uu tien

| # | Giai phap | Impact | Effort | Uu tien |
|---|-----------|--------|--------|---------|
| 1 | Resize thumbnail 480px | CAO | TB | **P0 - Lam ngay** |
| 2 | Convert PNG/JPG -> WebP | CAO | THAP | **P0 - Lam ngay** |
| 3 | width/height + decoding=async | TB | THAP | **P1 - Lam kem** |
| 5 | content-visibility: auto | TB | THAP | **P1 - Lam kem** |
| 7 | Preload first-batch | THAP-TB | THAP | P2 - Optional |
| 6 | LQIP blur-up | TB | CAO | P3 - Nice-to-have |
| 4 | Custom IntersectionObserver | THAP-TB | TB | **Skip** |

---

## Recommended Action Plan

**Phase 1 (biggest win):**
1. Shell script dung `sips` (macOS) resize tao `thumbnail-sm.webp` (480w) cho toan bo products
2. Convert 102 PNG/JPG con lai sang WebP
3. Update products.js de dung thumbnail-sm cho grid, giu thumbnail goc cho detail/SEO

**Phase 2 (low-hanging fruit):**
4. Them `decoding="async"` vao tat ca `<img>` rendered boi JS
5. Them `content-visibility: auto` cho `.product-card`
6. First 3 cards dung `fetchpriority="high"` + `loading="eager"`, con lai `loading="lazy"`

**Du kien ket qua:**
- Products page: giam ~60-75% image payload (tu ~1.5MB -> ~400KB cho 16 cards)
- Detail page: giam ~30% (thumbnail nho cho related, anh chinh giu nguyen)
- LCP cai thien ~1-2s tren mobile 3G

---

## Unresolved Questions

1. Co muon tich hop script resize vao workflow "quet san pham vao data.js" khong? (recommend: co)
2. Co muon giu ca 2 field `thumbnail` (goc) va `thumbnailSm` (nho) trong data.js, hay chi dung 1 va doi path?
3. 102 file PNG/JPG -- co can giu ban goc hay chi giu WebP? (recommend: chi giu WebP, PNG/JPG backup trong git history)
4. Slider trang chu (main.js) hien dung `p.thumbnail` -- co muon resize rieng cho slider (800px wide)?
