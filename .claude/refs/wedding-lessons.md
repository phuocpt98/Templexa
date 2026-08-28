# Bài Học Thiệp Cưới

> Tích lũy từ mỗi lần gen thiệp — dùng làm reference cho /gen-wedding và /gen-wedding-pro.
> Thêm bài học mới sau mỗi thiệp PRO hoặc khi nhận feedback.

---

## Nguyên tắc chống lặp

- Mỗi thiệp phải có **ít nhất 2 điểm khác biệt rõ ràng** so với thiệp gần nhất (layout, color palette, envelope style, animation type, typography pairing)
- Xem lại 3 thiệp gần nhất trước khi bắt đầu — liệt kê những gì đã dùng → tránh lặp
- Thử kỹ thuật mới mỗi lần: nếu lần trước dùng wax seal → lần này thử ribbon/card flip/polaroid
- Hero section là ấn tượng đầu tiên — **đầu tư sáng tạo nhất** cho hero + envelope

## Quy trình đã chứng minh hiệu quả

1. Xem ảnh → phân tích mood/color/style → đề xuất 3 style cho user chọn
2. Brainstorm TỪNG SECTION (dùng brainstormer agent) — không chỉ envelope
3. User chọn → implement
4. Screenshot (Puppeteer + Python HTTP server)
5. Thêm data.js (isPublic: false mặc định) + ghi bài học

---

## Thiệp #211 — Viết & Trang Hoa (Blush Romantic)

- Envelope wax seal + corner ornaments + blurred photo bg → ấn tượng mạnh
- Hero full-viewport với ảnh cưới nền dark + tên script lớn → sang trọng
- Dùng backgrounds floral overlay (wreath + corner dual) → thêm chiều sâu cho couple section
- Cupid icons 2 bên ảnh → điểm nhấn dễ thương
- Gallery aspect-ratio 4/5 + max-height 70vh → vừa màn mobile

## Thiệp #215 — Song Hỷ (Double Happiness)

- **Brainstorm trước khi code** — dùng brainstormer agent tạo 5-7 ý tưởng envelope → user chọn → kết quả WOW hơn tự nghĩ
- Chữ 囍 tách đôi (clip-path inset split) → hiệu ứng ĐỘC, gắn chặt chủ đề
- Ánh sáng vàng tràn khe giữa khi tách → thêm drama (div width 2px→100vw, radial-gradient gold)
- Gold confetti 20 particles CSS → cảm giác lễ hội
- Font Ma Shan Zheng cho chữ Hán decorative → đúng theme truyền thống
- Palette đỏ+vàng+đen → hoàn toàn khác blush/pastel → tránh lặp palette
- **Thiết kế THEO ảnh**: bộ ảnh nền đỏ + Song Hỷ 3D → thiệp đỏ vàng. Không ép ảnh vào template sẵn
- Envelope animation là yếu tố quyết định ấn tượng — đầu tư brainstorm kỹ

## Thiệp #217 — Garden Gate (Cổng Vườn Xanh)

- Brainstorm TỪNG SECTION (không chỉ envelope) → mỗi section có hiệu ứng riêng → chất lượng cao hơn
- Cổng sắt uốn 3D perspective rotateY → ý tưởng tốt, nhưng CSS shapes cổng sắt hơi thô → cần SVG inline hoặc background image cho phần phức tạp
- Hạt bồ công anh (dandelion seeds) thay petals/hearts → unique ambient, nhẹ nhàng
- Polaroid clothesline + pendulum swing → cute, phù hợp outdoor
- Garden path stepping stones xen kẽ trái/phải → love story hay
- Biển chỉ đường gỗ + chim đậu → chi tiết nhỏ nhưng tạo charm
- Đom đóm (fireflies) thay confetti → romantic, khác biệt
- Dresscode + Timeline bữa tiệc = 2 section mới hữu ích
- **CSS shapes phức tạp (cổng, cột) dễ thô nếu chỉ border/pseudo → dùng SVG inline hoặc background image**

## Thiệp #221 — Sage Green Emboss Paper (clone wedinvite.online/thiep1)

**Quy trình mới áp dụng thành công:**
- agent-browser mở URL tham khảo → screenshot từng section → phân tích design spec → clone layout
- Gemini gen nền giấy embossed (prompt tiếng Việt) → convert WebP → dùng làm background

**Bài học layout:**
- **Khung chữ nhật**: body nền trắng + `.invitation-frame` max-width centered với nền giấy → giống thiệp thật
- **Hero fit 1 màn**: bỏ `min-height: 100vh`, dùng `padding-top: 10vh`, giảm font/spacing để fit 844px
- **`.corners` div với `inset: 0`** trong flex container → kéo section ra cực lớn. Fix: bỏ hoặc thêm `height: 0; overflow: visible`
- **`#hero > * { position: relative }` blanket rule** → gây spacing sai. Chỉ set z-index cho element cần thiết

**Bài học ảnh corner:**
- Ảnh corner có khoảng trắng thừa → flip `scaleX(-1)` trông giống nhau. **PHẢI trim trước** bằng `magick -trim +repage`
- Ảnh PNG từ Gemini có checkered pattern **baked vào pixels** (không phải alpha thật) → không xoá nền tự động được. Dùng ảnh có sẵn trong thư viện hoặc gen lại với prompt rõ ràng "white background, NO transparency grid"
- Corner 4 góc: TL giữ gốc, TR `scaleX(-1)`, BL `scaleY(-1)`, BR `scale(-1,-1)` — **hoặc đảo ngược** tuỳ hướng hoa muốn (hướng vào trong hay ra ngoài)
- `env-corner` sát mép: dùng `top/left/right/bottom: -10px`

**Bài học animation:**
- Mỗi section NÊN có animation riêng (không dùng chung 1 `reveal` fade-up)
- Các variant hiệu quả: `reveal-left/right` (family 2 cột), `reveal-pop` (gallery stagger), `reveal-bounce` (countdown boxes), `reveal-flip` (ngày 3D), `reveal-zoom` (ảnh cinematic), `reveal-glow` (text blur→clear), `shimmer-text` (golden sweep)
- Stagger delay: 80-120ms giữa các item gallery, 100-300ms giữa countdown boxes
- Heart collage: `nth-child` CSS bị lệch nếu có element khác (SVG, img) trước các `.heart-item` → đặt decoration SAU items

**Bài học Gemini prompt nền giấy:**
- Prompt tiếng Việt hiệu quả, dễ chỉnh biến thể
- Keyword quan trọng: "mật độ THƯA/VỪA/DÀY", "relief NHẸ/RÕ", "khoảng cách RỘNG/VỪA"
- Prompt 1 gen quá đậm → thêm "chỉ 4-5 bông" + "relief RẤT NHẸ" để fix
- Luôn nói "Không có chữ, không có người, không có khung viền" ở cuối

## Thiệp #247 — Giỗ Tổ Họ Đỗ (3 bản: Sắc Phong / Hoành Phi / Kim Tối Giản)

**Bài học font:**
- **Cinzel LỖI glyph tiếng Việt** với `ư`/`ơ` — chữ "Ngược", "Chương", "Dương" bị fallback giữa chữ, gãy nét.
  Dùng **Playfair Display** thay thế (đủ dấu, cùng mood serif trang trọng).
- Danh sách font đã xác nhận đủ dấu tiếng Việt: Playfair Display, Cormorant Garamond, Be Vietnam Pro,
  Dancing Script, Quicksand, Nunito. **Great Vibes THIẾU dấu** — chỉ dùng cho chữ không dấu.
- **Cormorant Garamond mặc định dùng oldstyle numerals** → "18" hiện thành "ı8", "10:00" thành "ıo:oo".
  Bắt buộc ép khi hiển thị số (ngày, giờ, countdown):
  `font-variant-numeric: lining-nums; font-feature-settings: "lnum" 1;`

**Bài học element AI gen (bộ `heritage-elements`):**
- Prompt lưới 3×3 cho AI gen ảnh hiệu quả — 9 element/lần, nhất quán style, tiết kiệm công
- Cắt bằng `scripts/cut-element-grid.js`. Ba cạm bẫy đã vấp:
  1. **Tách nền theo độ sáng làm thủng element** — vàng nhạt `#F5E6B8` sáng 245, gần bằng nền trắng.
     → Phải lọc theo **chroma** (max−min RGB): trắng ≈0, vàng ≥40. Chỉ pixel *vừa sáng vừa trung tính* mới là nền.
  2. **Lưới cứng cắt cụt element** — đôi rồng rộng hơn 1/3 ảnh, bị xén hai bên.
  3. **Gộp theo bbox làm dính cả hàng** — góc chữ L có bbox rộng, chồng bbox element bên cạnh dù không chạm pixel.
     → Giải pháp đúng: **gán component theo tâm về ô lưới, rồi hợp bbox** — vừa gộp đúng mảnh rời
     (rồng + viên ngọc, dải dọc 3 thanh), vừa cho tràn biên ô.
- Element có **alpha thật** thì không cần `mask-image` vá víu → luôn ưu tiên gen bộ mới thay vì tái dùng ảnh nền trắng

**Bài học chống "thô và khô":**
- Feedback "thô/khô" thường KHÔNG phải thiếu hoa văn mà **thiếu chất liệu**. Chữa theo thứ tự:
  1. **Grain giấy** — SVG `feTurbulence` overlay opacity 0.04–0.08
  2. **Vàng phải là gradient ánh kim** (bronze→gold→champagne→gold→bronze) + shimmer chậm 6–10s,
     KHÔNG dùng một mã hex phẳng
  3. **Đường kẻ dùng `linear-gradient(90deg, transparent, gold, transparent)`** — tan dần hai đầu,
     mềm hơn hẳn `border` đặc
  4. **Bóng đổ nhiều lớp** (3 lớp: 1–2px, 8–24px, 24–64px) → cảm giác giấy dày thật
  5. Trên nền tối: `filter: drop-shadow(0 0 12px rgba(gold,.25))` cho element → ánh vàng toả, rất sang
- Mật độ trang trí phải **theo concept**: bản tối giản chỉ 4–6 element; bản cổ điển/nền đen dùng đậm.
  Nhồi hoa văn vào bản tối giản = phá concept, không phải chữa lỗi.

**Bài học chạy nhiều agent song song:**
- Agent song song **đè screenshot của nhau** do trùng tên file + trùng cổng HTTP server trong scratchpad chung.
  → Khi spawn, cấp sẵn cho mỗi agent: **prefix tên file riêng** (`v1sp-`, `v2hp-`, `v3-`) và **cổng riêng** (8791/8793/…)

**Bài học biến thể nội dung:**
- Nhiều thiệp chỉ khác 1–2 dòng (chi họ, nhánh, đơn vị) → **1 file + URL param** (`?chi=bac-ninh` + map object),
  KHÔNG nhân bản file. Thêm nhánh mới chỉ cần thêm key vào map.

## Review Checklist

- [ ] Responsive mobile (max-width: 420px)
- [ ] Envelope decoration đủ cầu kỳ
- [ ] Font pairing đúng mood
- [ ] Animations smooth, prefers-reduced-motion
- [ ] ≥2 điểm khác biệt so với 3 thiệp gần nhất
- [ ] Corner images trimmed (không thừa whitespace)
- [ ] Hero fit 1 màn mobile (không scroll để thấy tên)
- [ ] Mỗi section có animation riêng (không chung reveal)
- [ ] Ảnh trang trí không có checkered/nền trắng lộ

## Thiệp #271 — Bích Ngọc Trai (clone ziuwedding: vophong + phongbi + mxm)

**Bài học font (SỬA lại ghi chú cũ ở #247):**
- **Great Vibes ĐÃ có subset `vietnamese`** trên Google Fonts và render đủ dấu ("Chú rể", "Cô dâu") —
  ghi chú "Great Vibes THIẾU dấu" ở mục #247 đã lỗi thời. Vẫn nên kiểm chứng bằng cách render thật
  thay vì tin danh sách cũ.
- Cách kiểm tra nhanh subset: `curl -H "User-Agent: <UA Chrome>" "https://fonts.googleapis.com/css2?family=X" | grep vietnamese`.
  **Bắt buộc gửi UA trình duyệt** — UA mặc định của curl trả CSS không có comment subset → grep luôn ra 0, dễ kết luận sai.
- Font script đủ dấu đã render-verify: **Pinyon Script** (copperplate mảnh, sang — hợp navy/luxury),
  **Italianno**, **Great Vibes**, **Dancing Script**, **Charm**.
  Pinyon Script khớp nhất với chữ script trên thiệp LadiPage thương mại (1FTV Askilon / Imperial Script).

**Bài học thu hoạch element từ site tham khảo:**
- `scripts/mirror-site.js` bắt được TOÀN BỘ ảnh element gốc của trang LadiPage → nguồn element
  chất lượng cao, **alpha thật**, tốt hơn hẳn gen mới. Luôn mirror trước khi nghĩ đến gen ảnh.
- Dựng **contact sheet** (sharp composite lên nền xám xanh) để xem một lượt cả bộ + kiểm alpha —
  nhanh hơn mở từng file rất nhiều.
- Trang "phong bì" và trang thiệp thật thường là **2 URL riêng** (`/vophongbixanhduong` → link sang
  `/phongbixanhduong`). Click không mở được thì soi `<a href>` trong DOM, đừng cố click mãi.

**Bài học bong bóng lời chúc (floating wishes):**
- `position: fixed; bottom: 70px` **che tiêu đề section** ở gần như mọi màn — lỗi nặng, phát hiện qua screenshot.
  Chữa: `bottom: 9px`, tối đa **2** bong bóng, và **tắt hẳn khi hero / closing đang trong viewport**
  (IntersectionObserver, thêm class `.muted { opacity: 0 }`) — tên cô dâu chú rể không bao giờ bị che.

**Bài học ảnh nền hero/closing full-bleed:**
- Ảnh cưới studio nền TRẮNG + veil navy nhạt → chữ trắng chìm hẳn. Veil phải **đậm và bắt đầu sớm**:
  `linear-gradient(to bottom, transparent 18%, .26 42%, .72 68%, .97 100%)`. Bản đầu dùng `.55 62%` là quá nhạt.
- **Hạt hiệu ứng (petal/sparkle) đè lên MẶT người trong ảnh** trông như vết bẩn ở ảnh chụp tĩnh.
  Giữ `opacity ≤ .35` + `filter: blur(1px)` + size 5–11px → đọc ra bokeh chứ không ra đốm trắng.

**Bài học vặt:**
- `build-og-cover.js` **không có `--help`** — gọi kèm cờ lạ là nó chạy luôn target mặc định (gen_247),
  ghi đè file của sản phẩm khác. Đọc docstring trước, đừng dò bằng `--help`.
- `apply-shots.js` tự set luôn `thumbnail` = ảnh main → không cần og-cover.jpg riêng cho thiệp mới.
