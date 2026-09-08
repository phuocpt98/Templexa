# Template dùng chung — "Vintage Film"

Thư viện trang trí + CSS + JS của mẫu thiệp **Vintage phong bì lá / khung phim** (mẫu gốc `#241`
`khach_quynhthuong_kimvuong`). Mỗi thiệp khách chỉ cần **1 file `index.html` ~18KB** + ảnh riêng,
không phải copy lại toàn bộ khung như trước.

## Vì sao có thư viện này

`code.html` của mẫu gốc nặng **1.9MB trong 1 file duy nhất**, vì nhồi hết vào 1 khối HTML:

| Thành phần | Dung lượng | Thay bằng |
|---|---|---|
| Bootstrap 5 CSS (đủ bộ) | 231KB | CSS viết tay cho đúng những gì thiệp dùng |
| bootstrap-icons (font base64) | 434KB | 9 icon SVG inline trong `theme.js` (~3KB) |
| Lora 400/500 + Ergisa + High Spirited (base64, **nhúng 2 lần**) | ~970KB | 4 file `.woff2` trong `fonts/` — 158KB, trình duyệt cache |
| jQuery | 87KB | vanilla JS |
| Masonry + imagesLoaded | 80KB | `column-count: 2` của CSS |
| WOW.js + animate.css | ~30KB | IntersectionObserver + 8 keyframes |
| PhotoSwipe | — | lightbox ~20 dòng |

Kết quả: **1.9MB → 18KB/thiệp** (+ ~800KB thư viện dùng chung, tải 1 lần rồi cache cho mọi thiệp).

## Cấu trúc

```
tpl-vintage-film/
├── theme.css      # toàn bộ style (fonts, layout, hiệu ứng, form, modal)
├── theme.js       # icon sprite, reveal, mở thiệp, nhạc, countdown, lịch, lightbox, RSVP
├── fonts/         # Lora-400/500, Ergisa, HighSpirited (.woff2)
└── assets/        # bg-0…bg-7, envolop_front/back, film, icon-tl1..3, present, side-card, leaf-*
```

## Dùng cho thiệp mới

Trong `products/Invitation/Wedding/khach_<ten>/index.html`:

```html
<link rel="stylesheet" href="../../../shared/wedding/tpl-vintage-film/theme.css">
...
<script src="../../../shared/wedding/wishes-api.js"></script>
<script>
  window.TPL_CONFIG = {
    sheetId: 'khach_28',            // sheet nhận lời chúc + xác nhận tham dự
    countdown: '19-09-2026 11:00',  // dd-mm-yyyy HH:mm
    calendar: '19-09-2026',         // ngày tô tim
    calendarExtra: ['20-09-2026']   // ngày phụ (tim mờ) — tuỳ chọn
  };
</script>
<script src="../../../shared/wedding/tpl-vintage-film/theme.js"></script>
```

Đổi màu chủ đạo (mặc định khaki `rgb(146,131,98)`):

```css
.card-wrapper {
  --color-primary: rgb(146, 131, 98);
  --color-primary-raw: 146, 131, 98;   /* bắt buộc — dùng cho rgba() */
  --text-color-primary: rgb(146, 131, 98);
}
```

## Các khối HTML (id cố định — `theme.js` bám theo)

| id / class | Vai trò | Bắt buộc |
|---|---|---|
| `#card-opening-sides` | màn mở thiệp (chạm để mở) | không |
| `#card-banner` | trang bìa — `background-image` là ảnh dọc 420:652 | có |
| `#card-countdown` + `#countdown` | đếm ngược, `[data-countdown="days\|hours\|minutes\|seconds"]` | có |
| `#envelop-photo` | phong bì kèm 2 ảnh vuông `.pt1` `.pt2` | không |
| `#card-save-the-date` | ảnh ngang ~1.45:1 | không |
| `#card-info` | cha mẹ 2 bên, tên, các sự kiện, nút chỉ đường | có |
| `#card-love-story` | 2 ảnh polaroid + `.story-note` | có |
| `#card-gallery` | khung phim 5 ảnh + 2 polaroid + `.photo-grid` | có |
| `#card-calendar` + `#mini-calendar` | lịch tháng cưới (sinh tự động) | không |
| `#card-timeline` | 3 mốc giờ, ảnh nền ngang 3:2 | không |
| `#card-gift` + `.tx-modal` | hộp mừng cưới + QR | không |
| `#commentForm` | sổ lưu bút — xem quy tắc bên dưới | có |
| `#app-footer` | dòng `templexa.vn` cuối thiệp | có |

Hiệu ứng cuộn: thêm `class="reveal" data-anim="up|down|left|right|in|zoom|rotate-left|rotate-right"`,
kèm `slow` (2s) và `d2`/`d3`/`d4` (trễ 0.25/0.5/0.8s).

Icon: `<svg><use href="#ic-…"></use></svg>` với `ic-geo`, `ic-heart`, `ic-gift`, `ic-send`,
`ic-check`, `ic-check-circle`, `ic-cal-check`, `ic-chat-heart`, `ic-music`, `ic-hourglass`.

## Sổ lưu bút — chỉ 1 nút gửi

`theme.js` xử lý form theo đúng quy tắc của skill `gen-wedding-pro`: **một nút submit duy nhất**,
gộp lời chúc + xác nhận tham dự. Markup tối thiểu:

```html
<form id="commentForm" class="comment-form">
  <div class="form-group"><input class="form-control" id="fullname" placeholder="Tên của bạn *"></div>
  <div class="form-group"><textarea class="form-control" id="comment" placeholder="Lời chúc của bạn *"></textarea></div>
  <label class="rsvp-check">
    <input type="checkbox" id="attendingCheck">
    <span class="rsvp-check-box"><svg><use href="#ic-check"></use></svg></span>
    <span class="rsvp-check-text"><svg width="16" height="16"><use href="#ic-cal-check"></use></svg> Tôi sẽ đến tham dự</span>
  </label>
  <div class="group-btns">
    <button type="submit" id="submitBtn" class="btn-submit">
      <svg width="16" height="16"><use href="#ic-send"></use></svg> Gửi lời chúc &amp; xác nhận
    </button>
  </div>
  <p class="form-msg" id="formMsg"></p>
</form>
```

Ghi vào Google Sheet: `A` = tên, `B` = lời chúc (+ ` ✅ Xác nhận tham dự` nếu tích ô), `C` = thời gian —
giữ nguyên 3 cột như các thiệp cũ.

## Ảnh cần chuẩn bị cho mỗi khách

| File | Kích thước | Dùng ở |
|---|---|---|
| `hero.webp` | 900×1397 (420:652) | trang bìa |
| `save-date.webp` | 1000×688 | save the date |
| `timeline-bg.webp` | 1200×800 | timeline (có lớp phủ tối 40%) |
| `env-1.webp`, `env-2.webp` | 700×700 | 2 ảnh trong phong bì |
| `chu-re.webp`, `co-dau.webp` | 700×950 | polaroid chuyện tình yêu |
| `polaroid-1/2.webp` | 700×950 | polaroid đầu album |
| `album-1…12.webp` | 780×1170 | lưới album + khung phim |
| `og-cover.jpg` | 1200×630 | ảnh chia sẻ Facebook/Zalo |

## Lưu ý

- **Không sửa `code.html` của mẫu gốc `#241`** và các bản clone `#246 #252 #254 #261` — chúng vẫn
  chạy theo bản cũ. Thư viện này chỉ dành cho thiệp gen mới.
- Mọi thiệp khách phải có `<meta name="robots" content="noindex, nofollow">`; thư mục đặt tên
  `khach_*` để `_headers` tự gắn `X-Robots-Tag`.
- Chạy `node scripts/protect-wedding.js khach_<ten>` sau khi tạo xong để chèn khối domain-lock.
