---
name: gen-blog
description: "Gen bài viết Cẩm nang (blogs/) chuẩn SEO/AEO — mỗi bài 1 file HTML tĩnh + ảnh WebP riêng, tự build danh sách, mục lục, bài liên quan, sitemap. Dùng khi cần viết bài blog hút traffic cho Templexa."
---

Gen bài viết cho chuyên mục **Cẩm nang cưới hỏi** (`blogs/`). Mỗi bài là **một file HTML tĩnh** `blogs/<slug>.html`
(dễ SEO, không cần backend) + ảnh minh hoạ riêng trong `blogs/images/<slug>/`. Trang danh sách, mục lục,
bài liên quan, `blog-index.json` và sitemap đều **sinh tự động** bằng `npm run build:blog` + `npm run build:sitemap`.

Argument: `$ARGUMENTS` — chủ đề / từ khoá, hoặc URL bài tham khảo, hoặc cả hai. Ví dụ:
- `"trình tự lễ ăn hỏi miền Bắc"`
- `"https://www.tierra.vn/tin-tuc/benching-la-gi"` (tham khảo cấu trúc, **viết lại hoàn toàn**, không copy)
- `"cách viết lời mời đám cưới hay, category thiep-cuoi"`
- `"3 bài: xem ngày cưới 2027, kim lâu là gì, checklist 6 tháng trước cưới"`

---

## Kiến trúc chuyên mục (đọc trước khi làm)

```
blogs/
├── index.html              ← SINH TỰ ĐỘNG (build-blog.js) — KHÔNG sửa tay
├── <slug>.html             ← bài viết, file tĩnh, viết theo template
└── images/<slug>/          ← cover.webp (1600×900) + ảnh trong bài (1200×800)
assets/css/blog.css         ← style riêng cho blog (prefix .bl-* danh sách, .bp-* bài viết)
assets/js/blog.js           ← copy link + highlight mục lục
assets/data/blog-index.json ← SINH TỰ ĐỘNG — sitemap & trang chủ đọc
scripts/build-blog.js       ← quét bài → chuẩn hoá → sinh index + json
scripts/blog-image.js       ← tải/convert ảnh → WebP đúng kích thước
scripts/verify-blog.js      ← kiểm bài trước khi báo cáo
.claude/skills/gen-blog/template.html ← khung HTML bài viết
```

**Nguồn sự thật là `<head>` của từng bài** — `build-blog.js` đọc `title`, `description`, `og:image`,
`article:published_time`, `article:modified_time`, `article:section` (id chuyên mục), `article:tag`,
`blog:featured`. Sai/thiếu thẻ nào bài sẽ bị bỏ khỏi danh sách (script in cảnh báo).

**Marker do build ghi đè — không sửa tay bên trong:** `<!-- TOC:START/END -->` (mục lục từ h2/h3),
`<!-- RELATED:START/END -->` (3 bài liên quan), `<span data-readtime>`.

**Chuyên mục** (`article:section`) — khai báo trong `CATEGORIES` của `scripts/build-blog.js`:

| id | Nhãn | Nội dung |
|----|------|----------|
| `chuan-bi-cuoi` | Chuẩn bị cưới | kế hoạch, ngân sách, timeline, checklist |
| `phong-tuc-cuoi-hoi` | Phong tục & nghi lễ | dạm ngõ, ăn hỏi, xem ngày, lễ gia tiên, ba miền |
| `thiep-cuoi` | Thiệp cưới & lời mời | cách viết thiệp, lời mời, gửi thiệp online |
| `tiec-cuoi` | Tiệc cưới & trang trí | địa điểm, thực đơn, concept, kịch bản |
| `tinh-yeu` | Tình yêu & hẹn hò | tâm lý, giao tiếp, khái niệm hẹn hò hiện đại |
| `su-kien` | Sinh nhật, thôi nôi & sự kiện | sinh nhật, thôi nôi, kỷ niệm, họp lớp |

Cần chuyên mục mới → thêm vào `CATEGORIES` (id kebab, nhãn, mô tả) rồi build lại.

**Quy ước URL (cơ chế lai của site):** link nội bộ trong `href` **giữ `.html`** (`../thiep-online.html`,
`index.html?category=…`, `ten-bai.html`) để chạy được trên server local; URL tuyệt đối cho SEO
(canonical, `og:url`, JSON-LD, sitemap) **bỏ `.html`** (`https://templexa.vn/blogs/ten-bai`). Trang chủ là `../`.

---

## Quy trình — 5 giai đoạn

```
1. RESEARCH   → hiểu search intent, đọc tham khảo, chốt outline + content spec
2. IMAGES     → gen ảnh (gen-image.py) hoặc tải ảnh có quyền dùng → WebP
3. WRITE      → HTML từ template, viết ≥ 1.200 từ, chuẩn AEO
4. BUILD      → npm run build:blog && npm run build:sitemap
5. VERIFY     → node scripts/verify-blog.js <slug> --shots → xem ảnh → báo cáo
```

---

## 1. RESEARCH

### 1A. Nếu có URL tham khảo
- Trang `tierra.vn` chặn `curl`/WebFetch (Cloudflare 403) → dùng **Chrome MCP**: `navigate` → `get_page_text`.
  Lấy thêm heading (`h2/h3`), meta description, số ảnh bằng `javascript_tool` nếu cần.
- Rút ra: **câu hỏi người đọc thật sự hỏi**, thứ tự các ý, ý nào họ thiếu / nói qua loa, góc nào Templexa
  nói hay hơn (kinh nghiệm cưới hỏi Việt, ví dụ cụ thể, câu mẫu).
- **Tuyệt đối không copy câu chữ, không tải ảnh của họ.** Viết lại bằng giọng Templexa, cấu trúc riêng.
  Nếu bài họ 6 mục thì bài mình nên có góc **họ không có** (vd: "nếu chính bạn đang làm điều đó thì sao?").

### 1B. Nếu chỉ có chủ đề
- Xác định intent: *định nghĩa* (X là gì) / *hướng dẫn* (cách làm) / *so sánh* / *checklist* / *xem ngày, phong tục*.
- Tự liệt kê 8–12 câu hỏi liên quan mà người sắp cưới sẽ gõ Google; chọn 5–8 làm h2.

### 1C. Content spec (BẮT BUỘC trình bày trước khi viết — bảng ngắn)

| Mục | Quy tắc |
|-----|---------|
| `slug` | kebab không dấu, chứa từ khoá, ≤ 5 từ: `benching-la-gi`, `trinh-tu-le-an-hoi` |
| Title | ≤ 65 ký tự, từ khoá ở đầu, có con số/lợi ích nếu hợp: *"Benching là gì? 6 dấu hiệu…"* |
| Description | 140–160 ký tự, có từ khoá, nói rõ người đọc nhận được gì |
| Chuyên mục | 1 id trong bảng trên |
| Tags | 3–5 tag thường (không #), tag đầu = từ khoá chính |
| Outline | 5–9 h2; h2 đầu **trả lời thẳng từ khoá** trong 1–2 câu đầu; h3 khi h2 có ≥ 3 ý con |
| FAQ | 3–5 câu người ta hay hỏi kèm (People also ask), trả lời 2–4 câu |
| Link nội bộ | ≥ 2 trong thân bài: thiệp cưới (`../thiep-online.html?category=wedding`), xem ngày (`../xem-ngay-cuoi-dep.html`), bảng giá (`../contact.html#pricing-section`), FAQ (`../cau-hoi-thuong-gap.html`), bài blog khác |
| CTA | 1 khối `bp-cta` sau ~50–60% bài + 1 card `bp-aside-card` (đích KHÁC nhau) |
| Ảnh | 1 cover + 3–5 ảnh trong bài, mỗi ảnh 1 ý chính, alt mô tả thật |

Chốt spec với user nếu chủ đề mơ hồ; nếu rõ rồi thì trình bày rồi làm tiếp luôn.

---

## 2. IMAGES

### 2A. Ưu tiên: gen ảnh bằng `/gen-image` (ảnh gốc, không vướng bản quyền)
Proxy phải đang chạy (`curl -s -m 3 http://127.0.0.1:8317/v1/models`); nếu không, nhờ user bật rồi làm tiếp.

```bash
P="editorial flat illustration, soft warm palette of cream, sage green, dusty rose and muted gold, subtle paper grain texture, no text, no watermark"
python3 scripts/gen-image.py -s 1536x1024 -o blogs/images/<slug>/cover.webp     -p "$P, <cảnh chính của bài, người Việt trẻ, có negative space bên phải>"
python3 scripts/gen-image.py -s 1536x1024 -o blogs/images/<slug>/<ten-y-1>.webp -p "$P, <ẩn dụ cho mục 1>"
# … 3–5 ảnh, mỗi ảnh ứng với một h2. Chạy nền (run_in_background) rồi viết bài song song.
```
- **Tông ảnh cố định** cho cả chuyên mục: *editorial flat illustration, kem/sage/hồng phấn/vàng đồng, paper grain* —
  khớp `blog.css` và trang xem ngày. Không dùng ảnh 3D bóng bẩy, không stock photo lai tạp.
- Mô tả cảnh **bằng ẩn dụ của ý** (ghế dự bị, vệt vụn bánh mì, ngã ba đường…) — ảnh minh hoạ ý, không minh hoạ chữ.
- Model hay **bỏ qua kích thước** (trả về ảnh dọc) → bước 2C luôn crop lại.
- Chủ đề nhạy cảm (tình dục, tang lễ…) → ghi thêm `tasteful and non-explicit`.

### 2B. Nếu không gen được: ảnh có quyền dùng
- Chỉ Unsplash / Pexels / ảnh Templexa tự chụp / ảnh trong `products/shared/`. **Không lấy ảnh từ site khác**.
- Unsplash chặn API ẩn danh; mở `unsplash.com/s/photos/<query>` bằng Chrome MCP, lấy `photo-…` id từ `srcset`,
  tải qua `https://images.unsplash.com/<photo-id>?w=1600&q=80`.

### 2C. Chuẩn kích thước (BẮT BUỘC)
```bash
# cover 16:9 — dùng cho og:image + đầu bài
node scripts/blog-image.js <slug> cover  <file-hoặc-url> --w 1600 --h 900 --q 80
# ảnh trong bài 3:2
node scripts/blog-image.js <slug> <ten>  <file-hoặc-url> --w 1200 --h 800 --q 80
```
Script ghi vào `blogs/images/<slug>/<ten>.webp` và in kích thước cuối → điền đúng `width`/`height` vào `<img>`.
Ghi đè file gốc: copy ra thư mục tạm trước (script không đọc-ghi cùng file).
**Mở từng ảnh ra xem** (Read) — crop `attention` đôi khi cắt mất mặt; nếu hỏng thì gen lại với `-s 1536x1024`
và mô tả "wide composition, subject centered".

Mục tiêu: cover ≤ 120KB, ảnh trong bài ≤ 150KB, cả thư mục ≤ 700KB.

---

## 3. WRITE

Copy `.claude/skills/gen-blog/template.html` → `blogs/<slug>.html`, thay toàn bộ `{{…}}`. Header/footer
**copy nguyên khối** từ `blogs/benching-la-gi.html` (đúng nav 6 mục, `class="active"` ở "Cẩm nang").

### Giọng văn Templexa
- Xưng **"bạn"**, nói chuyện như một người bạn đã cưới rồi kể lại — không giáo điều, không sáo.
- **Câu ngắn.** Một ý một câu. Đoạn ≤ 4 dòng. Không mở đầu bằng "Trong xã hội hiện đại ngày nay…".
- Mỗi h2 **mở bằng câu trả lời** (định nghĩa/kết luận) rồi mới giải thích — Google/AI trích được ngay.
- **Cụ thể hơn đối thủ**: có ví dụ, có câu mẫu (tin nhắn, lời mời), có con số, có bảng so sánh.
- Không nhồi từ khoá kiểu *"Benching là gì? Benching nghĩa là gì? Benching trong tình yêu là gì?"* lặp 5 lần.
  Từ khoá xuất hiện tự nhiên: title, h1, đoạn đầu, h2 đầu, 1–2 lần trong bài, FAQ.
- Có **góc nhìn riêng** ít nhất 1 mục (điều bài tham khảo không nói) và **1 câu kết đọng lại**.
- Tiếng Việt chuẩn dấu, dấu ngoặc kép “ ”, gạch ngang — có khoảng trắng.

### Khối dựng sẵn trong `blog.css` (dùng, đừng tự chế class mới)

| Khối | Dùng khi |
|------|---------|
| `.bp-box.bp-box--key` + `<strong>Nói ngắn gọn</strong>` | tóm 1 câu sau định nghĩa |
| `.bp-box.bp-box--tip` | mẹo, thử nghiệm nhỏ |
| `.bp-box.bp-box--warn` + `<strong>Đừng làm</strong>` | cảnh báo lỗi hay gặp |
| `ul.bp-check` | checklist dấu ✓ |
| `<blockquote>…<cite>` | câu mẫu / lời thoại |
| `.bp-tbl-scroll > table` | bảng so sánh (luôn bọc để cuộn ngang trên mobile) |
| `.bp-cta` | CTA giữa bài (1 lần) |
| `.bp-faq > details` | FAQ — nội dung PHẢI trùng với JSON-LD FAQPage |
| `<figure><img><figcaption>` | ảnh trong bài, caption nói ý của ảnh |
| `<h2 data-toc="skip">` | mục không muốn vào mục lục (Lời cuối) |

Ràng buộc kỹ thuật:
- Đúng **1 `<h1>`**; ≥ 4 `<h2>`; ≥ 1.200 từ trong `<article class="bp-body">` (bài định nghĩa 1.500–2.200 tốt nhất).
- Mọi `<img>` có `alt` mô tả, `width`/`height`, `loading="lazy"` (trừ cover `fetchpriority="high"`).
- JSON-LD: `BlogPosting` + `BreadcrumbList` + `FAQPage` (nếu có FAQ). `headline`, ngày, ảnh phải khớp meta.
- Không inline style màu; không thêm CSS mới vào file bài — thiếu style thì thêm vào `blog.css` (kèm dark).
- Không viết nội dung y tế/pháp lý như lời khuyên chuyên môn; chủ đề tâm lý/sức khoẻ thêm câu "mang tính tham khảo".

---

## 4. BUILD

```bash
npm run build:blog       # sinh blogs/index.html, TOC, RELATED, readtime, blog-index.json
npm run build:sitemap    # thêm /blogs/ + /blogs/<slug> vào sitemap.xml
```
(`npm run build:seo` đã bao gồm cả hai.) Script báo `⚠ Bỏ qua: <file>: …` nghĩa là bài thiếu meta — sửa rồi build lại.

---

## 5. VERIFY (BẮT BUỘC trước khi báo cáo)

```bash
SCRATCH=<scratchpad> node scripts/verify-blog.js <slug> --shots
SCRATCH=<scratchpad> node scripts/verify-blog.js index
```
Kiểm tự động: meta, JSON-LD parse, file ảnh/link tồn tại, `.html` trong link nội bộ, số từ, h1/h2, TOC/RELATED
đã build, 0 lỗi console, 0 lỗi tải, không cuộn ngang 390px. `--shots` lưu ảnh desktop/mobile/dark.

Sau đó **mở ảnh ra xem** (Read) và tự chấm:

| Tiêu chí | Đạt? |
|----------|------|
| Hero: title không quá 3 dòng desktop, lead đọc được, meta đủ ngày + phút đọc | |
| Cover không cắt mất chủ thể ở 16:9 | |
| Mục lục bên phải bám (sticky), không dài quá màn hình; mobile thu gọn thành `details` | |
| Ảnh trong bài xen kẽ hợp lý, caption ngắn; không 2 ảnh liền nhau | |
| Bảng cuộn ngang được trên mobile, không vỡ layout | |
| Hộp key/tip/warn không lặp nhau quá 4 lần | |
| CTA đọc tự nhiên, không chèn cứng giữa một ý | |
| Dark mode: nền/chữ/hộp đổi màu đủ, không chữ tối trên nền tối | |
| Trang danh sách: bài mới hiện đúng chuyên mục, chip đếm đúng | |

Sai → sửa → build lại → verify lại (tối đa 2 vòng). Xoá ảnh verify trong scratch khi xong.

---

## Báo cáo

```
✅ Đã tạo bài Cẩm nang:

| Mục | Chi tiết |
|-----|---------|
| File | blogs/<slug>.html |
| URL | https://templexa.vn/blogs/<slug> |
| Title | … (NN ký tự) |
| Chuyên mục / tags | … |
| Độ dài | N từ · M phút đọc · K mục h2 · FAQ x câu |
| Ảnh | cover + N ảnh, tổng ~XXX KB (gen bằng gpt-image / nguồn …) |
| Link nội bộ | thiệp cưới, xem ngày, … |
| Tham khảo | URL (chỉ lấy cấu trúc, viết lại 100%) |
| Verify | ✓ 0 lỗi, N cảnh báo · sitemap +1 URL |

Chưa commit — user tự chạy /push khi duyệt xong.
```

---

## Ràng buộc

1. **Không copy** câu chữ/ảnh từ bài tham khảo. Cấu trúc có thể học, nội dung phải viết lại.
2. **Không sửa tay** `blogs/index.html`, `blog-index.json`, vùng marker TOC/RELATED.
3. **Không commit/push** — chỉ tạo file; user quyết định lúc deploy.
4. Ảnh chỉ từ gen-image, Unsplash/Pexels, hoặc kho `products/shared/`; luôn convert WebP qua `blog-image.js`.
5. Link nội bộ giữ `.html`; URL SEO tuyệt đối bỏ `.html`.
6. Mỗi bài phải có: FAQ ≥ 3, CTA giữa bài, ≥ 2 link nội bộ, ≥ 3 ảnh có alt, ≥ 1.200 từ.
7. Thêm chuyên mục mới chỉ khi có ≥ 2 bài dự kiến; sửa `CATEGORIES` trong `build-blog.js`.

---

## Kinh nghiệm (bổ sung dần)

| Việc | Ghi chú |
|------|---------|
| gen-image bỏ qua `-s` | ~1/3 ảnh về dạng dọc dù đặt 1536x1024 → luôn crop lại bằng `blog-image.js --h`; mô tả "wide composition" giúp bớt |
| h3 trong CTA lọt vào mục lục | `build-blog.js` đã tự bỏ heading trong `.bp-cta/.bp-author/.bp-aside-card`; heading khác không muốn vào TOC thì `data-toc="skip"` |
| Description | > 170 ký tự bị Google cắt; verify chỉ cảnh báo, nhưng nên giữ ≤ 160 |
| Bài "X là gì" | Bảng so sánh với 2–3 khái niệm gần nghĩa (benching / ghosting / breadcrumbing) là phần được đọc nhiều nhất — luôn cân nhắc thêm |
| Bài theo năm sinh ("Nam/Nữ YYYY hợp tuổi nào") | KHÔNG viết tay — chạy `node scripts/gen-tuoi-hop.js <năm> <nam|nu>` (tính mệnh/can/chi/cung phi + năm cưới đẹp từ `wedding-date.js`). Cover: gen ảnh `blogs/images/tuoi-hop/<nam|nu>-<năm>.webp` (1600×900) trước khi chạy, không có thì script dùng `<nam|nu>.webp` chung. Sau đó build + verify như bài thường |
| Nav 6 mục | Đã thêm `white-space: nowrap` cho `.nav-menu a` và media 769–900px dồn nav sang phải — nếu thêm mục nav thứ 7 phải kiểm lại 1280/1000/800px |
