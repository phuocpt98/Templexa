# Model Selection — Sonnet vs Opus

> Tách từ CLAUDE.md (23/08/2026) để giữ CLAUDE.md < 40k ký tự.


**Nguyên tắc:** Dùng Sonnet cho công việc cơ học có quy trình rõ ràng. Dùng Opus cho công việc cần sáng tạo, phân tích, reasoning phức tạp.

Khi bắt đầu task, **đề xuất user chuyển model** nếu task phù hợp Sonnet — ví dụ: "Task này đơn giản, bạn có thể `/model sonnet` để tiết kiệm."

### Tasks dùng Sonnet (cơ học, quy trình có sẵn)

| Task | Mô tả | Skill/Lệnh |
|------|-------|-------------|
| **Convert ảnh → WebP** | sharp resize + convert, không cần phân tích ảnh | `/convert-webp` |
| **Move/rename files** | mv, cp, mkdir — di chuyển thư mục, đổi tên | Bash |
| **Clone mẫu thiệp + fill info** | Copy index.html từ khach_X, find-replace tên/ngày/địa chỉ/ảnh | Thủ công |
| **Push deploy** | git add → commit → protect → push | `/push` |
| **Scan images** | Quét folder lấy đường dẫn ảnh, cập nhật data.js | `/scan-images` |
| **Sort music** | Di chuyển MP3 vào đúng folder thể loại | `/sort-music` |
| **Gen QR** | Tạo mã QR từ URL | `/gen-qr` |
| **Sửa text đơn giản** | Đổi tên, ngày, giờ, địa chỉ trong thiệp có sẵn | Edit |
| **Thêm entry data.js** | Chèn product entry mới | Edit |
| **Cập nhật SHEET_ID** | Đổi sheet ID trong form submit | Edit |

### Tasks dùng Opus (cần sáng tạo / phân tích)

| Task | Lý do |
|------|-------|
| **Gen thiệp mới từ đầu** | Cần design, chọn palette, layout, brainstorm sections |
| **Gen thiệp PRO** | Phân tích ảnh tham khảo, extract design spec |
| **Debug CSS/JS phức tạp** | Cần reasoning sâu, hiểu layout/animation |
| **Thiết kế UI mới** | Cần sáng tạo, dark mode, responsive |
| **Phân tích ảnh cưới** | Chọn ảnh phù hợp, đánh giá bố cục |
| **Review code** | Tìm bug, tối ưu, security |
| **Viết love story / nội dung** | Cần ngôn ngữ tự nhiên, sáng tạo |

### Quy trình clone thiệp cho khách mới (Sonnet-friendly)

Khi khách mới có thông tin đầy đủ + mẫu tham chiếu đã có sẵn:

```
1. Tạo folder: products/Invitation/Wedding/khach_{slug}/customer/
2. Convert ảnh khách → WebP (sharp, max 1600px, quality 80)
3. Copy index.html từ mẫu gốc (khach_3, khach_duc-thuy, ...)
4. Find-replace:
   - Tên couple (title, og:title, hero, cover, info, footer)
   - Tên bố mẹ (nhà trai, nhà gái)
   - Ngày cưới (cover-date, hero-date, info-day/month/year, lunar, countdown target)
   - Giờ lễ (info-ceremony, timeline)
   - Địa điểm (venue name, address, Google Maps link)
   - Ảnh (polaroid, gallery, quote bg, love story, thank you)
   - Nhạc (audio src)
   - Gift (bank accounts hoặc QR)
   - SHEET_ID
   - Calendar (tháng + highlight ngày)
   - Watermark base64
5. Tạo wedding/{slug}/index.html (OG meta + iframe)
6. Thêm entry vào wedding/config.js
7. Move nhạc mới vào thư viện (nếu có)
```

Toàn bộ quy trình trên là **find-replace cơ học** → Sonnet xử lý tốt.