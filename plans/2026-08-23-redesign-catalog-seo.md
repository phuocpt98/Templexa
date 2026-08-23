# Plan: Tối ưu catalog thiệp + SEO/AEO — nhánh `redesign-thiep-online`

> Tạo 23/08/2026. Làm tuần tự từng đợt, mỗi đợt 1 commit, xong đợt nào tick đợt đó.
> Trạng thái: `[ ]` chưa làm · `[~]` đang dở · `[x]` xong
>
> **23/08 — ĐÃ HOÀN THÀNH đợt 0–8** (9 commit trên `redesign-thiep-online`). Còn lại: rename `--gold-gradient` (bỏ, giữ tên), `protect-wedding` + merge về `main` khi user duyệt. #200 (Valentine Pink) khoá PIN → giữ ảnh cũ; #163 thiếu dấu tiếng Việt (lỗi font template) → sửa sau.

## 0. Đã xong (để tham chiếu)

- [x] Merge `main` → `redesign-thiep-online` (472 files, conflict `sitemap.xml` đã giải quyết)
- [x] Đổi palette gold/terracotta → indigo/purple/blue như bản cũ; logo text → `logo_v2.svg` (commit `cc15d83`)
- [~] **Đang dở, chưa commit** (thuộc đợt D, giữ lại dùng tiếp):
  - `assets/data/faq.json` — 35 câu hỏi / 7 nhóm (nguồn duy nhất)
  - `scripts/build-faq.js` — sinh `cau-hoi-thuong-gap.html` (HTML + JSON-LD FAQPage/Breadcrumb/WebPage khớp 1:1)
  - `cau-hoi-thuong-gap.html` — đã build
  - `assets/css/style.css` — block `FAQ PAGE` chèn trước `DARK MODE — ALL HARDCODED OVERRIDES`

---

## Phát hiện từ audit (23/08)

### Catalog thiệp (`thiep-online.html`)
| # | Vấn đề | Số liệu |
|---|--------|---------|
| 1 | Ảnh ngang nhét vào card 9:16 → crop nát | 21 thiệp không có `mobileView`; 8 public là ảnh ngang: #200 #202 #204 **#210 (bestseller)** #237 #238 #239 #242 |
| 2 | Card không hiện tên/danh mục (`.product-card-info{display:none}`) | toàn bộ |
| 3 | Mobile ≤768px lưới 1 cột, card 9:16 chiếm cả màn hình | — |
| 4 | Sort hỗn loạn: `priority` 48 cái = 0, 36 cái âm lẻ (-0.075…), 4 cái = 999; `updatedAt`/`status` không ảnh hưởng | 94 public |
| 5 | Badge NEW vô nghĩa | 84/94 `status:'new'` |
| 6 | Không có filter phong cách/sự kiện con; `assets/js/wedding-styles.js` (5 style, 49 thiệp) không file nào dùng | — |
| 7 | `mobileView` của 71 thiệp nằm trong `assets/data/invitation.json` tải async → render 2 lần, nhảy layout | — |
| 8 | `showInSlider:true` trỏ vào thiệp ẩn (#198) | — |

### Thiệp thiếu trong `data.js`
- Template chưa list: `Wedding/gen_216_dam-ngo-song-hy`, `Wedding/gen_223_love-story-cinematic`, `Other/gen_247_gio-to-ho-do` (**3 version v1-thiep-cuon / v2-hoanh-phi / v3-kim-toi-gian → 3 entry riêng**, theo yêu cầu)
- Thiệp khách có `index.html` chưa list: `khach_anh-thu-minh-thong`, `khach_cong-minh-ngoc-huyen`, `khach_duy-hiep-anna-le`, `khach_khui-kiet-hong-han`, `khach_minh-linh`, `khach_nguyen-bao-uyen-nhi`, `khach_uyen-nhi-nguyen-bao`, `khach_thien-ngoe-my-dan`, `khach_3`, `van-hoang-tran-ly`
- Folder rỗng / chỉ assets (dọn hoặc bỏ qua): `Wedding/demo`, `gen_183_elegant-cream-minimalist`, `Other/gen_178_white_day-14-3`, `Other/khach_2_v3`, `khach_dang-phuc`, `khach_ngan-tuong`, `khach_nhat-long-thanh-thuy`, `khach_thuong-huyen`, `khach_vinh-hien-hoa`, `khach_hung_khanhnha`
- Trùng tên folder: `khach_nguyen-bao-uyen-nhi` vs `khach_uyen-nhi-nguyen-bao`

### Cụm thiệp trùng style (để gom ở đợt B)
| Cụm | Entries |
|-----|---------|
| Sage green vintage/polaroid | #210 #216 #217 #241 #242 (+ẩn #197 #198 #221 #243 #244 #245 #246) |
| Blue romantic | #179 #180 #181 (180/181 chỉ khác tag `cinelove`) |
| Modern romantic cinelove (khác màu) | #184 hồng, #193 đỏ, #194 burgundy |
| Đỏ truyền thống | #178 #186 #187 #201 #203 #204 #215 (187≡199 chibi-red; 204≡215 song hỷ) |
| Pink pastel Korean | #233 #235 |
| Họp lớp | #237 #238 #239 #240 (cùng folder `gen_237_*`) |
| Tỏ tình "Gửi Anh/Em" | #157 #165 #166 #167 #169 / #158 #170 / #160 #168 |
| Legacy EN `code.html` | #91–#119 (29 cái) |

### SEO hiện trạng
- `sitemap.xml`: 10 URL, thiếu trang FAQ, thiếu `thiep-online.html?category=other`, `lastmod` cũ
- `robots.txt`: không khai báo bot AI, không chặn `products-admin.html` / `preview.html`
- Chưa có `llms.txt`
- `thiep-online.html` có JSON-LD FAQPage (4 câu) nhưng **không có nội dung hiển thị tương ứng** → Google bỏ qua
- `contact.html` FAQ 5 câu (có hiển thị)
- `Organization` schema: `sameAs: []`, không `contactPoint`, không `areaServed`
- `WebSite.SearchAction` trỏ `products.html?search=` (nên trỏ `thiep-online.html`)

---

## Thứ tự triển khai (đã sắp theo lớp phụ thuộc — mỗi file chỉ bị sửa trong 1 đợt)

| Đợt | Việc | File chạm |
|-----|------|-----------|
| 0 | Commit checkpoint: xoá `plans/reports`, plan này, FAQ draft | — |
| 1 | Font → Inter (tokens + import); footer thêm link FAQ + Zalo; `<meta robots max-snippet>`; `SearchAction` → thiep-online | 7 HTML `<head>/<footer>`, `style.css` tokens |
| 2 | `scripts/migrate-products.js` (chạy 1 lần): thêm `variants/style/event/featured`; gộp `mobileView` từ `invitation.json`; reset priority lẻ; bỏ `status:'new'` hàng loạt; sửa `showInSlider` #198 | `data.js`, xoá `invitation.json` |
| 3 | Thêm entry: `gen_216`, `gen_223`, `gen_247` ×3 (3 entry riêng), thiệp khách (user duyệt); gắn `variants` cho cụm trùng, ẩn bản dư, xử lý legacy EN | `data.js` |
| 4 | `scripts/shoot-mobile.js` (puppeteer + sharp, đã có trong package.json): chụp **bộ ảnh dọc** 390×844 @2x cho **mọi** thiệp — `mobile-1.webp` (cover/phong bì), `mobile-2.webp` (sau mở), `mobile-3..n` (section chính), `mobile-full.webp`; ghi `images[]` + `mobileView` vào `data.js`; **xoá ảnh ngang cũ** (`screen.png`, `Screenshot_*.jpg`). Chạy dạng **Workflow**: 1 subagent/thiệp chụp + tự kiểm ảnh → verifier độc lập → loop nếu fail | `products/**/mobile-*.webp`, `data.js` |
| 5 | JS: sort mới (featured → bestseller/trending → updatedAt); NEW tự tính 30 ngày; filter chip `style`/`event`; card tên + sub-label; detail chip variant. ~~Showcase khách từ `wedding/config.js`~~ → bỏ (lộ tên thật); thay bằng 12 thiệp khách đã vào catalog dưới tên phong cách | `data.js` helpers, `products.js`, `product-detail.js`, `main.js` |
| 6 | CSS catalog: mobile 2 cột, hiện info, chip row 2, showcase. **Ảnh chính detail/popup**: khung `aspect-ratio 9/16` căn giữa, 2 bên nền `--bg-secondary` (dark: tối), `object-fit: contain`; mobile full ngang; thumbs dọc | `style.css` block catalog + detail |
| 7 | SEO/AEO: FAQ hiển thị `thiep-online` (8) + `index` (5) + đồng bộ `contact`; `llms.txt`; `robots.txt` (bot AI, disallow admin/preview); `sitemap.xml`; `Organization` schema | body 3 trang, 3 file root |
| 8 | Docs & dọn: `CLAUDE.md`, `SYSTEM.md`, `products.md`, admin cột mới, xoá `wedding-styles.js` / `_fix-malformed-urls.js`, rename `--gold-gradient`, `npm run build:faq`, `protect-wedding` trước merge main | docs, package.json |

**Quy tắc:** `data.js` chỉ sửa ở đợt 2–4; `<head>/<footer>` chỉ ở đợt 1; `style.css` tokens đợt 1 / block catalog đợt 6. Mỗi đợt 1 commit.

## Quy tắc chụp ảnh mobileView (đợt 4)

- **Ảnh đại diện (`mobile-1`) không cố định là màn nào** — subagent chụp thử cả màn phong bì/open lẫn hero (và 1–2 section nổi bật), **xem ảnh rồi chọn màn đẹp nhất** làm `mobile-1`; các màn còn lại xếp sau.
- **Không cắt nội dung**: chờ animation/font/ảnh load xong (`networkidle` + delay), chụp đúng viewport 390×844 tại vị trí section bắt đầu (scroll tới `section` rồi chụp), không chụp giữa chừng section; nếu section cao hơn viewport thì chụp thêm khung tiếp theo thay vì cắt.
- Tắt/đóng các thứ che màn: nút nhạc, popup, countdown overlay; ẩn watermark nếu có.
- Ảnh phải **sắc nét** (deviceScaleFactor 2), nền đúng theme thiệp, không hiện thanh cuộn.
- Verifier mở ảnh kiểm: đúng thiệp, không trắng/đen, không cắt chữ, `mobile-1` là màn đẹp nhất; fail → chụp lại với hướng dẫn cụ thể.

## Công cụ / cách vận hành

- **Chụp ảnh**: puppeteer (headless Chromium) — không dùng Chrome extension (không mở được localhost), không dùng gpt-image (chỉ vẽ ảnh mới, không chụp được trang).
- **gen-image** (`scripts/gen-image.py`, gpt-image-2): chỉ cho hoa văn/nền/placeholder khi template thiếu ảnh.
- **Multi-agent**: leader (phiên này) nghiên cứu + chốt plan → `Workflow` fan-out 1 subagent/thiệp → verifier độc lập → loop. Subagent trao đổi qua SendMessage. Bật khi user nói "dùng workflow" ở đợt 3–4.

## Quyết định mặc định (user uỷ quyền 23/08 — sửa nếu khác ý)

1. Thiệp khách → entry **public**, tên hiển thị theo phong cách, không tên riêng trong tiêu đề (tiền lệ #229/#241).
2. Legacy EN #91–#119 → **đẩy cuối** (không ẩn).
3. `/wedding/` → `Disallow` trong robots; giữ `ti-le-wedding` trong sitemap.
4. Số liệu FAQ giữ nguyên (Custom 3–7 ngày, song ngữ báo giá riêng, ẩn index theo yêu cầu).
