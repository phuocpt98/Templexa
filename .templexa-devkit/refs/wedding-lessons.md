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
