---
name: Wedding design — tạo chiều sâu và tránh nhàm chán
description: Kỹ thuật thiết kế thiệp cưới editorial — paper texture, handwritten font, torn paper, ảnh lệch 3D
type: feedback
---

Khi gen thiệp cưới, luôn áp dụng các kỹ thuật tạo chiều sâu thay vì flat design nhàm chán:

1. **Nền giấy (paper grain texture)** — dùng SVG feTurbulence overlay với opacity ~0.06-0.08, baseFrequency ~0.65 cho cảm giác giấy nhám có chiều sâu. Kết hợp vignette viền trang.

2. **Font viết tay (handwritten)** — thêm font Caveat (hỗ trợ tiếng Việt) cho các accent text: ngày cưới, closing names, annotation nhỏ. KHÔNG dùng khắp nơi, chỉ điểm nhấn.

3. **Ảnh lệch/xoay nhẹ (off-balance)** — rotate ±1-2deg, translateY offset, box-shadow lệch → cảm giác 3D scrapbook. Có thể thêm tape strip pseudo-element.

4. **Torn paper (giấy xé tay)** — dùng clip-path polygon với các điểm không đều cho event cards, tạo cảm giác organic thay vì border cứng.

5. **Sepia filter nhẹ** — `filter: sepia(0.05)` cho tông ấm đồng nhất trên tất cả ảnh.

**Why:** User muốn thiệp cưới editorial/magazine feel, không basic. Các kỹ thuật này tạo chiều sâu và cảm giác nghệ thuật mà không cần thêm dependency nặng.

**How to apply:** Đây là kinh nghiệm tham khảo, KHÔNG phải mặc định áp dụng. Xem xét từng kỹ thuật có phù hợp với style thiệp đang làm không. Sẽ còn nhiều kinh nghiệm được rút ra — phải đánh giá context trước khi dùng.
