# BRIEF CHUNG — Thiệp Giỗ Tổ Họ Đỗ (3 bản design)

> Đọc kỹ file này TRƯỚC KHI code. Mọi bản design đều dùng chung nội dung/asset dưới đây.
> Chỉ khác nhau ở **hướng thiết kế** (xem phần riêng trong prompt của bạn).

---

## 1. NỘI DUNG THIỆP (nguyên văn — KHÔNG tự chế thêm)

```
THÔNG BẠCH
Nhân vì đại lễ giỗ tổ họ Đỗ

Trân trọng kính mời
TOÀN THỂ ANH EM - CON CHÁU - NỘI NGOẠI TỘC HỌ ĐỖ
[CHI 1 PHƯỜNG CHŨ - TỈNH BẮC NINH]      ← dòng ĐỘNG, xem mục 2

Ngày 18 tháng 8 năm 2026 dương lịch
tức mùng 6 tháng 7 năm Bính Ngọ

VỀ DỰ LỄ GIỖ TỔ

ĐỊA CHỈ: Nhà thờ gia tộc họ Đỗ,
Thôn Đoài - Làng Cầu Cổ - Xã Ý Yên - tỉnh Ninh Bình

THỜI GIAN: 8h - 14h

THAY MẶT GIA TỘC HỌ ĐỖ
Đỗ Phan Hưng
```

- Sự kiện: **8h–14h ngày 18/08/2026** (thứ Ba) — countdown target `2026-08-18T08:00:00`
- Âm lịch: **mùng 6 tháng 7 năm Bính Ngọ**
- Google Maps: `https://maps.app.goo.gl/WTxbe7dJ4hjEQx2Y8`
- Ký tên: **Đỗ Phan Hưng**

⚠ Đây là **lễ giỗ tổ** — trang nghiêm, thành kính. KHÔNG dùng từ ngữ/hiệu ứng
vui nhộn kiểu tiệc tùng (confetti màu mè, emoji cười, "quẩy", "party"…).
Tông giọng: trang trọng, tôn kính tổ tiên, gắn kết dòng họ.

---

## 2. BIẾN THỂ NỘI DUNG QUA URL PARAM (BẮT BUỘC)

Một file HTML phục vụ **cả 2 thiệp**:

| URL | Hiển thị |
|-----|----------|
| `index.html` | Bản chung — KHÔNG có dòng chi nhánh |
| `index.html?chi=bac-ninh` | Thêm dòng `CHI 1 PHƯỜNG CHŨ - TỈNH BẮC NINH` |

Cách làm: đặt element dòng chi nhánh với `id="branchLine"`, mặc định `display:none`.
JS đọc `new URLSearchParams(location.search).get('chi')`:

```js
var CHI_MAP = { 'bac-ninh': 'CHI 1 PHƯỜNG CHŨ - TỈNH BẮC NINH' };
var chi = new URLSearchParams(location.search).get('chi');
if (chi && CHI_MAP[chi]) {
    var el = document.getElementById('branchLine');
    el.textContent = CHI_MAP[chi];
    el.style.display = '';   // hoặc 'block'
}
```

Dòng này xuất hiện ở **cả envelope và section lời mời** (nếu envelope có nêu người được mời).
Mở rộng sau này chỉ cần thêm key vào `CHI_MAP`.

---

## 3. TONE MÀU (BẮT BUỘC — vàng / trắng / đen / ánh kim)

Palette gốc, mỗi bản được phép dịch chuyển sắc độ nhưng KHÔNG đổi hệ màu:

```css
--gold-pale:   #F5E6B8;   /* champagne, highlight */
--gold:        #D4AF37;   /* vàng kim chủ đạo */
--gold-deep:   #A67C00;   /* vàng đậm */
--bronze:      #8B6914;   /* bóng đổ kim loại */
--ink:         #1A1A1A;   /* đen mực */
--ink-soft:    #2E2A24;   /* đen ngả nâu */
--paper:       #FDFBF4;   /* trắng ngà */
--paper-warm:  #F4EBD6;   /* giấy cũ */
```

**Gradient ánh kim dùng cho chữ/viền quan trọng:**
```css
background: linear-gradient(135deg, #8B6914 0%, #D4AF37 25%, #F5E6B8 50%, #D4AF37 75%, #8B6914 100%);
-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
```
Có thể thêm animation `shimmer` chạy `background-position` để chữ vàng lấp lánh.

❌ KHÔNG dùng: hồng pastel, xanh mint, tím lavender, cầu vồng.

---

## 4. FONT (bắt buộc hỗ trợ tiếng Việt đủ dấu)

Chọn combo phù hợp hướng design của bạn, ưu tiên:

| Vai trò | Gợi ý |
|---------|-------|
| Heading trang trọng | `Playfair Display`, `Cormorant Garamond`, `Noto Serif Display` |
| Body | `Be Vietnam Pro`, `Quicksand`, `Nunito Sans` |
| Ký tên / accent | `Dancing Script`, `Great Vibes` (⚠ Great Vibes THIẾU dấu tiếng Việt → chỉ dùng cho chữ KHÔNG dấu) |
| Chữ Hán trang trí | `Ma Shan Zheng`, `Noto Serif SC` |

**Tên "Đỗ Phan Hưng" có dấu → KHÔNG dùng Great Vibes.** Dùng `Dancing Script` (đủ dấu) hoặc serif italic.

---

## 5. ASSETS

### Ảnh (đã convert WebP, nằm ở `../photos/` tính từ file variant)
| File | Nội dung | Tỉ lệ |
|------|----------|-------|
| `nha-tho-to-1.webp` | Ban thờ chính + hoành phi "家田寶", bàn lễ phủ vải vàng | 1223×1600 dọc |
| `nha-tho-to-2.webp` | Ban thờ + mâm cỗ đầy đủ (gà, bánh chưng), nến đỏ | 1200×1600 dọc |
| `nha-tho-to-3.webp` | Ban thờ cận cảnh, câu đối đỏ hai bên | 773×960 dọc |

**Dùng ở 2 chỗ (theo yêu cầu khách):**
1. **Nền mờ envelope + hero** — `filter: blur(6-10px) brightness(0.4-0.6)` + overlay gradient vàng/đen để chữ đọc rõ
2. **Section "Nhà Thờ Tổ"** — gallery 3 ảnh khung viền vàng, click phóng to (lightbox)

⚠ Ảnh dọc, crop ngang cần `object-position: center 30%` để không cắt mất hoành phi.

### Nhạc (BẮT BUỘC có)
```html
<audio id="bgMusic" loop preload="auto">
  <source src="../../../../shared/music/traditional-vietnamese/que-huong-trong-tan.mp3" type="audio/mpeg">
</audio>
```
> Bài "Quê Hương" — Trọng Tấn. Path 4 cấp `../` vì file nằm trong subfolder variant.

Nút bật/tắt nhạc fixed góc màn hình, icon phù hợp theme (chuông/trống/nốt nhạc).
Autoplay thử khi load (desktop), và gọi lại `audio.play()` **ngay trong handler mở thiệp** (iOS yêu cầu user gesture).

### Element trang trí
Thư viện hiện có: `products/shared/images/wedding-elements/` — dùng được:
`corner-art-deco-gold.webp`, `corner-baroque-gold.webp`, `frame-oval-gold-ornate.webp`,
`chandelier-crystal-gold.webp`, `and-symbol.webp` …

⚠ Bộ element chuẩn phong cách đình chùa (rồng, vân mây, hồi văn, sen) **đang chờ khách gen**
→ sẽ bổ sung vào `products/shared/images/heritage-elements/` sau.

**Vì vậy: ƯU TIÊN SVG INLINE** cho corner, divider, khung, hoa văn — tự vẽ bằng `<svg>` với
`stroke`/`fill` gradient vàng. SVG không bao giờ lộ viền trắng, scale nét, đổi màu dễ.
Nếu buộc dùng ảnh WebP shared → thêm:
```css
mask-image: radial-gradient(ellipse 75% 75% at center, black 45%, transparent 95%);
```

---

## 6. GỬI DỮ LIỆU — Google Sheets

```html
<script src="../../../../shared/wedding/wishes-api.js"></script>
```
```js
var SHEET_ID = 'khach_23';
sheetsAPI.post(SHEET_ID, {
    A: hoTen,          // Họ tên
    B: chiHo,          // Chi họ / nơi ở
    C: thamDu,         // 'Có tham dự' | 'Chưa chắc' | 'Không tham dự'
    D: soNguoi,        // Số người đi cùng
    E: loiNhan,        // Lời tưởng nhớ / ghi chú
    F: thoiGian        // new Date().toLocaleString('vi-VN')
}).then(...).catch(...)
```
Nút submit phải `disabled` trong lúc gửi, hiện thông báo thành công/lỗi bằng **CSS class**
(`.form-msg-success` / `.form-msg-error`), KHÔNG inline style màu.

---

## 7. SECTIONS BẮT BUỘC (tối thiểu 9)

| # | Section | Ghi chú |
|---|---------|---------|
| 1 | **Envelope / màn mở thiệp** | Trang trí cầu kỳ nhất. Nền ảnh nhà thờ blur + khung viền vàng đôi + corner ornament + tiêu đề "THÔNG BẠCH". Cơ chế mở phải gắn theme (xem prompt riêng). Có dòng chi nhánh động. |
| 2 | **Hero — Thông Bạch** | "THÔNG BẠCH" cỡ lớn chữ vàng ánh kim + "Nhân vì đại lễ giỗ tổ họ Đỗ" + chữ 杜 (Đỗ) trong medallion |
| 3 | **Lời mời** | "Trân trọng kính mời / TOÀN THỂ ANH EM - CON CHÁU - NỘI NGOẠI TỘC HỌ ĐỖ" + dòng chi nhánh động |
| 4 | **Ngày giỗ tổ** | Dương lịch + âm lịch (mùng 6 tháng 7 Bính Ngọ) + tờ lịch tháng 8/2026 khoanh ngày 18 |
| 5 | **Đếm ngược** | Realtime ngày/giờ/phút/giây tới `2026-08-18T08:00:00` |
| 6 | **Chương trình** | Timeline 8h–14h. Tự soạn mốc hợp lễ giỗ tổ: đón tiếp con cháu → dâng hương khai lễ → tế tổ / đọc chúc văn → con cháu dâng hương → thụ lộc / liên hoan → bế mạc |
| 7 | **Nhà Thờ Tổ** | Gallery 3 ảnh + lightbox + địa chỉ đầy đủ + nút "Chỉ đường" mở Google Maps |
| 8 | **Xác nhận tham dự (RSVP)** | Form gửi lên sheet `khach_23` (mục 6) |
| 9 | **Lời kết + ký tên** | "THAY MẶT GIA TỘC HỌ ĐỖ" + chữ ký "Đỗ Phan Hưng" + câu về cội nguồn |

**Tuỳ chọn thêm (khuyến khích ≥1):** "Cây gia phả" sơ đồ đời, "Uống nước nhớ nguồn" trích câu ca dao,
"Sổ lưu niệm" lời tưởng nhớ của con cháu.

---

## 8. HIỆU ỨNG (≥1 ambient + mỗi section 1 animation riêng)

**Ambient phù hợp lễ giỗ tổ** (chọn 1–2, KHÔNG confetti màu mè):
- Bụi vàng lơ lửng (gold dust motes) bay chậm
- Khói hương cuộn nhẹ (incense smoke) — SVG path + blur, animation uốn lượn
- Cánh hoa sen/đại vàng rơi rất chậm
- Đốm sáng ánh kim lấp lánh (shimmer particles)

**Scroll reveal:** mỗi section một kiểu khác nhau — `reveal-up`, `reveal-left/right`,
`reveal-zoom`, `reveal-flip`, `reveal-glow` (blur→clear), `shimmer-text`.
Dùng `IntersectionObserver`, stagger 80–150ms giữa các item.

Tôn trọng `@media (prefers-reduced-motion: reduce)` → tắt animation.

---

## 9. RÀNG BUỘC KỸ THUẬT

- **1 file `index.html` self-contained** (CSS + JS inline), trừ `wishes-api.js` và Google Fonts
- **Mobile-first**, test kỹ ở **390px** và **440px**. Hero phải hiện đủ tiêu đề + ngày trong 1 màn (không phải scroll)
- Container thiệp `max-width: 680px` căn giữa, nền ngoài tối/đen để giống thiệp thật đặt trên bàn
- **Chữ tiếng Việt dài dễ tràn** → dùng `clamp()` cho mọi font-size lớn.
  Tiêu đề "THÔNG BẠCH": `clamp(2rem, 9vw, 3.6rem)`. Dòng "TOÀN THỂ ANH EM - CON CHÁU - NỘI NGOẠI TỘC HỌ ĐỖ"
  phải xuống dòng đẹp, KHÔNG cắt chữ.
- Không thêm thư viện ngoài (chỉ Google Fonts + Lucide icons nếu cần)
- Không inline style cho màu — dùng CSS class/variable
- Mọi section phải có trang trí nền (corner SVG / hoa văn mờ / viền kép), KHÔNG để trống trơn
- SEO meta + OG tags đầy đủ (og:image trỏ `photos/nha-tho-to-1.webp`)

---

## 10. THAM CHIẾU

- Thiệp demo khách gửi: `products/shared/new/demo.jpeg` — thiệp giấy viền xanh navy + rồng chầu vàng
  + nền giấy kem + chữ đỏ đô. **Tham khảo bố cục & tinh thần**, không copy y hệt (ta chuyển sang
  hệ vàng/trắng/đen/ánh kim theo yêu cầu).
- Thư viện component: `products/shared/wedding/README.md` (HTML snippets),
  `styles.css`, `scripts.js`, `products/shared/animations.css`
- Bài học thiết kế: `.claude/refs/wedding-lessons.md`, `.claude/refs/wedding-design-rules.md`
