# Font Library — Thiệp Mời / Invitations

Danh sách font đã kiểm tra hỗ trợ tiếng Việt, dùng cho thiệp mời (cưới, họp lớp, sinh nhật, v.v.)

## Font Thông Dụng (Body/Heading)

| Font | Google Fonts | Vietnamese | Dùng cho |
|------|:---:|:---:|----------|
| Inter | ✅ | ✅ | Body text, UI elements |
| Montserrat | ✅ | ✅ | Heading, body — full Vietnamese subset |
| Noto Sans | ✅ | ✅ | Body — hỗ trợ 55+ ngôn ngữ |
| Poppins | ✅ | ❌ | KHÔNG hỗ trợ Vietnamese — tránh dùng |
| Quicksand | ✅ | ✅ | Body — rounded, friendly |
| Nunito | ✅ | ✅ | Body — rounded, clean |

## Font Viết Tay / Script (Accent/Decorative)

| Font | Google Fonts | Vietnamese | Dùng cho |
|------|:---:|:---:|----------|
| Dancing Script | ✅ | ✅ | Script accent — tên, ngày, label |
| Meow Script | ✅ | ✅ | Calligraphy — tên, accent text |
| Luxurious Script | ✅ | ✅ | Elegant formal script |
| Caveat | ✅ | ✅ | Viết tay casual — hỗ trợ qua latin-ext |
| Six Hands Chalk Font | ❌ | ❌ | KHÔNG trên Google Fonts, không hỗ trợ Việt |
| Milestone Script | ❌ | ❌ | KHÔNG trên Google Fonts |

## Font Đậm / Display (Banner/Title)

| Font | Google Fonts | Vietnamese | Dùng cho |
|------|:---:|:---:|----------|
| Anton | ✅ | ✅ | Display heading — bold condensed |
| Arvo | ✅ | ❌ | KHÔNG hỗ trợ Vietnamese — tránh dùng |

## Font Local (trong thư mục shared/fonts/)

| File | Font | Vietnamese | Dùng cho |
|------|------|:---:|----------|
| montserrat.woff2 | Montserrat | ✅ | Heading/body offline |
| quicksand.woff2 | Quicksand | ✅ | Body rounded offline |
| great-vibes.woff2 | Great Vibes | ❌ | CHỈ dùng cho tên KHÔNG DẤU |
| cormorant-garamond-*.woff2 | Cormorant Garamond | ✅ | Serif elegant |
| playfairdisplay.woff2 | Playfair Display | ✅ | Serif heading |

## Combo An Toàn Cho Thiệp Mời Tiếng Việt

```html
<!-- Combo 1: Elegant (cưới, kỷ niệm) -->
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Combo 2: Friendly (họp lớp, sinh nhật) -->
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Combo 3: Bold (quảng cáo, event) -->
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Combo 4: Calligraphy (thiệp sang) -->
<link href="https://fonts.googleapis.com/css2?family=Meow+Script&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
```

## Quy Tắc Chọn Font

1. **Body text (nội dung chính):** Montserrat, Nunito, Quicksand, Noto Sans, Inter
2. **Script/accent (tên, ngày, label ngắn):** Dancing Script, Meow Script, Luxurious Script
3. **Heading/title đậm:** Anton, Montserrat 700-800, Nunito 800
4. **KHÔNG dùng font viết tay cho đoạn text dài** — khó đọc + có thể thiếu ký tự

## Font KHÔNG Dùng Được

| Font | Lý do |
|------|-------|
| Poppins | Không có Vietnamese subset |
| Arvo | Không có Vietnamese subset |
| Six Hands Chalk | Không trên Google Fonts, không hỗ trợ Việt |
| Milestone Script | Không trên Google Fonts |
| Canva Sans | Font riêng Canva, không public |
| Great Vibes | Chỉ Latin — lỗi dấu tiếng Việt |
| Sacramento | Chỉ Latin — lỗi dấu tiếng Việt |
| Patrick Hand | Thiếu nhiều ký tự Việt |
| Fredoka | Thiếu Vietnamese subset |
