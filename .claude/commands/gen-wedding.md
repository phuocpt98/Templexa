Gen thiệp cưới HTML + nhạc nền + prompt.txt + thêm entry vào data.js. Hoặc gen theo khách từ folder có prompt.txt đã điền.

Argument: $ARGUMENTS — mô tả yêu cầu thiệp cưới, hoặc đường dẫn folder khách.

**2 chế độ:**
- **Gen mẫu** (mặc định): tạo `code.html` + `prompt.txt` → mẫu trống cho khách chọn. Screenshots chụp sau khi user kiểm tra và xác nhận OK
- **Gen theo khách**: đọc folder khách (có `prompt.txt` đã điền + ảnh) → gen thiệp với thông tin khách

**2 loại thiệp:**
- **Thiệp đơn** (mặc định): Chỉ 1 bên — nhà trai HOẶC nhà gái. Thông tin lễ cưới chỉ hiển thị 1 sự kiện (Lễ Vu Quy hoặc Lễ Thành Hôn). Hero chỉ có tên cặp đôi + ngày cưới + thông tin bên mời.
- **Thiệp đôi**: Đủ thông tin CẢ 2 nhà trong cùng 1 thiệp. Section lễ cưới có 2 cards (Lễ Vu Quy + Lễ Thành Hôn) với địa điểm/thời gian khác nhau. Có thể thêm section "Gia đình hai bên" giới thiệu bố mẹ.

Ví dụ:
- `"thiệp cưới Minh & Lan, 15/06/2026, classic gold"` → thiệp đơn (mặc định)
- `"thiệp đôi Minh & Lan, 15/06/2026, blush pink"` → thiệp đôi
- `"thiệp nhà gái Lan, 15/06/2026, sage green"` → thiệp đơn bên nhà gái
- `"thiệp nhà trai Minh & Lan, 15/06/2026"` → thiệp đơn bên nhà trai
- `"3 mẫu thiệp cưới: rustic garden, modern minimalist, luxury dark"`
- Kèm ảnh mockup: `"gen theo ảnh này, đổi tông hồng pastel"`
- **Gen theo khách**: `"gen theo khách, folder: products/Web/Invitation/khach_minh_lan/"`
- **Gen theo khách**: `"customise mẫu #177 từ folder khach_abc"`

---

## Khác biệt so với /gen-landing

| Đặc điểm | /gen-landing | /gen-wedding |
|-----------|-------------|-------------|
| Nhạc nền | Chỉ khi user yêu cầu | **LUÔN CÓ** (mặc định folder `wedding/` hoặc `romantic/`) |
| Category | Mặc định `onepage` | Mặc định `invitation` |
| Sections | Generic (features, about, testimonials) | Wedding-specific (countdown, love story, RSVP, gallery, lời chúc) |
| Hiệu ứng | Standard animations | **Thêm hoa rơi / confetti / sparkles** |
| Bảng màu | Theo chủ đề | Wedding palettes (gold, blush, sage, navy...) |
| Font | Generic Google Fonts | Serif/script elegant (Playfair Display, Cormorant Garamond, Great Vibes...) |
| Tên mặc định | Cô Dâu & Chú Rể | Lấy từ $ARGUMENTS hoặc random từ `products/shared/wedding/names.js` |
| Loại thiệp | Không có | **Thiệp đơn** (mặc định) hoặc **Thiệp đôi** |

---

## Quy trình

### Bước 1: Parse yêu cầu

Từ `$ARGUMENTS`, xác định **chế độ**:
- Nếu có keywords: `"gen theo khách"`, `"folder khách"`, `"customise"`, `"customize"`, `"từ folder"` → **Quy trình B** (nhảy xuống phần "Quy trình B: Gen theo khách hàng")
- Nếu không → **Gen mẫu** (tiếp tục bên dưới)

Xác định thêm:
- **Số lượng mẫu** cần gen (mặc định 1)
- **Loại thiệp**: xác định từ keywords trong yêu cầu:
  - `"thiệp đôi"`, `"đủ 2 nhà"`, `"cả hai bên"` → **Thiệp đôi**
  - `"thiệp nhà trai"`, `"bên trai"` → **Thiệp đơn — nhà trai**
  - `"thiệp nhà gái"`, `"bên gái"` → **Thiệp đơn — nhà gái**
  - Không nói gì / chỉ nói `"thiệp cưới"` → **Thiệp đơn — nhà trai** (mặc định)
- **Tên cô dâu & chú rể**: nếu user cung cấp thì dùng, nếu KHÔNG thì **BẮT BUỘC** random từ thư viện tên:
  - Đọc file `products/shared/wedding/names.js` → lấy mảng `GROOM_NAMES` và `BRIDE_NAMES`
  - Random 1 groom + 1 bride (tránh trùng họ) — dùng logic `randomCouple()`
  - Random tên bố mẹ 2 bên — dùng logic `randomParents(ho, side)`
  - Dùng `.display` (chỉ tên, VD: "Minh") cho ký hiệu `&` ở hero, monogram
  - Dùng `.displayDT` (đệm + tên, VD: "Văn Minh") cho hero tên lớn, envelope, thông tin lễ, couple section
  - Dùng `.full` (họ đệm tên, VD: "Nguyễn Văn Minh") cho thông tin gia đình, sidebar
  - **KHÔNG hardcode "Minh & Ngọc" hay bất kỳ tên cố định nào** — luôn random mỗi lần gen
- **Ngày cưới** (nếu có, dùng cho countdown — không thì dùng ngày mẫu trong tương lai)
- **Phong cách/theme** (classic gold, rustic, modern, blush pink, dark luxury, tropical...)
- **Category**: mặc định `invitation`
- **Type**: mặc định `website`
- **Google Sheets API**:
  - **Gen mẫu** (KHÔNG phải gen từ prompt.txt/folder khách) → **MẶC ĐỊNH UI-ONLY + FLOATING LOCAL**: KHÔNG load `wishes-api.js`, KHÔNG gọi API. Dùng `initFloatingWishesLocal()` từ `scripts.js` mục 14b — bong bóng lời chúc bay lên từ data local (mặc định: Ngoạ Long, Phượng Sồ, Doremon, Pikachu, Kabibara). Form lời chúc + RSVP lưu localStorage. KHÔNG hỏi sheet_id. Nếu user yêu cầu bong bóng tin nhắn → dùng `initFloatingWishesLocal` với `DEFAULT_LOCAL_WISHES`.
  - **Gen theo khách** (Quy trình B, từ prompt.txt): kiểm tra prompt.txt có `sheet_id` không
    - Nếu có → thêm `<script src="../../../shared/wedding/wishes-api.js">` + logic gửi/đọc
    - Nếu không có → giữ UI-only
  - User chủ động cung cấp `sheet_id` trong yêu cầu (dù là gen mẫu) → vẫn thêm API
  - Mỗi form có thể dùng **cùng hoặc khác sheet_id** — tuỳ user quyết định
- **Google Maps**: kiểm tra user có cung cấp địa chỉ / link maps không
  - Nếu có **link Google Maps** (embed hoặc URL) → thêm section bản đồ (iframe + nút Mở Maps + Chỉ đường)
  - Nếu có **địa chỉ text** nhưng **KHÔNG có link Google Maps** → **HỎI USER**: "Bạn đưa địa chỉ [địa chỉ] nhưng chưa có link Google Maps. Cho mình link embed (vào Google Maps > Chia sẻ > Nhúng bản đồ) hoặc link Google Maps thường. Nếu không có thì mình sẽ dùng link tìm kiếm tự động."
  - User đưa link → dùng link đó
  - User nói "dùng tự động" / không đưa link → tạo link từ địa chỉ: `https://maps.google.com/?q=` + encodeURIComponent(địa chỉ)
  - Nếu không có địa chỉ lẫn link → không thêm section bản đồ
  - **Thiệp đôi**: kiểm tra CẢ 2 địa điểm (Vu Quy + Thành Hôn) → dùng variant map-grid 2 cards
- **Danh sách khách mời (cá nhân hoá)**: kiểm tra user có cung cấp file `khach_moi.csv` / `.xlsx` không
  - Nếu có → convert sang `guests.js` (xem Bước 5c) + thêm HTML/JS personalization vào code.html
  - Nếu không → không thêm, thiệp hiện text mặc định cho tất cả
- Nếu có ảnh đính kèm → phân tích layout, màu sắc, phong cách từ ảnh

### Bước 1b: Chiến lược song song (khi ≥ 2 mẫu)

**Nếu chỉ 1 mẫu** → chạy tuần tự (Bước 2 → 9).

**Nếu 2–5 mẫu** → chạy **song song bằng Agent tool**, mỗi mẫu 1 agent:

#### Chuẩn bị chung (trước khi spawn agents):
1. Đọc **thư viện wedding**: `products/shared/wedding/styles.css`, `products/shared/wedding/scripts.js`, `products/shared/wedding/README.md`
2. Đọc `products/shared/animations.css` — lấy scroll animations có sẵn
3. Đọc `assets/js/data.js` → tìm ID lớn nhất → phân ID cho từng mẫu (max+1, max+2, ...)
4. Liệt kê file nhạc trong `products/shared/music/wedding/` và `products/shared/music/romantic/`

#### Spawn agents song song:
- Dùng **Agent tool** với `subagent_type: "general-purpose"` — spawn tất cả agents **trong cùng 1 message**
- Tối đa **5 agents** — nếu > 5 mẫu thì chia batch
- Mỗi agent nhận đầy đủ context: ID, tên cặp đôi, ngày cưới, phong cách, **nội dung wedding library (CSS + JS + HTML snippets)**, đường dẫn nhạc, hướng dẫn screenshot

#### Nhiệm vụ mỗi agent:
1. Tạo folder `products/Web/Invitation/gen_{id}_{keywords}/`
2. Tạo file `code.html` (self-contained, wedding sections + nhạc + hiệu ứng)
3. Tạo file `prompt.txt` (form điền thông tin cho khách — xem Bước 5b)
4. Trả về: `{ id, name, slug, description, category, type, tags, folder, features[], demoUrl }`
5. **KHÔNG chụp screenshot** — đợi user kiểm tra + xác nhận OK trước (xem Bước 6)

#### Sau khi agents xong:
1. Merge tất cả entries vào `data.js` trước `];` (images tạm rỗng `[]`, chưa có thumbnail)
2. Cập nhật `products/products.md`
3. Cập nhật `products/shared/animations.css` nếu có animation mới
4. Báo cáo tổng hợp + **hỏi user kiểm tra từng mẫu** trước khi chụp screenshot

### Bước 2: Đọc thư viện wedding + animation

Đọc **4 file** thư viện wedding components:
1. `products/shared/wedding/styles.css` — CSS components (envelope, countdown, timeline, gallery, RSVP, guestbook, gift box, effects, palettes...)
2. `products/shared/wedding/scripts.js` — JS components (envelope, countdown, music, effects, lightbox, guestbook, RSVP, calendar export...)
3. `products/shared/wedding/wishes-api.js` — Google Sheets API (transport layer) — **KHÔNG copy vào code.html, dùng `<script src>`** — chỉ cung cấp `sheetsAPI.post()` và `sheetsAPI.get()`, logic nghiệp vụ nằm trong code.html
4. `products/shared/wedding/README.md` — HTML snippets + layout patterns + bảng gợi ý nhanh

Và đọc `products/shared/animations.css` để chọn scroll animations phù hợp.

**Ưu tiên copy từ thư viện** thay vì viết mới — đảm bảo consistency giữa các thiệp.
Nếu tạo component mới hay ho → thêm vào thư viện sau (Bước 9).

### Bước 3: Tìm ID tiếp theo

Đọc `assets/js/data.js` → tìm `id:` lớn nhất → ID mới = max + 1.

### Bước 4: Chọn nhạc nền (BẮT BUỘC)

**Thiệp cưới LUÔN có nhạc nền** — không cần user yêu cầu.

#### Chọn file nhạc — theo thứ tự ưu tiên:

1. **User chỉ định file cụ thể** → dùng file đó
2. **User chỉ định thể loại** → quét folder tương ứng
3. **Không chỉ định** → chọn theo bảng:

| Phong cách thiệp | Folder nhạc | Gợi ý bài |
|-------------------|-------------|------------|
| Classic, elegant, gold | `wedding/` | A Thousand Years, Beautiful In White |
| Romantic, blush, pastel | `romantic/` | Endless Love, Only Love |
| Modern, minimalist | `wedding/` | Sugar |
| Rustic, garden, boho | `romantic/` | Everyday I Love You |
| Dark luxury, dramatic | `wedding/` | A Thousand Years |
| Tropical, fun | `wedding/` | Sugar |

#### Quy trình:
```bash
# 1. Liệt kê file MP3
ls products/shared/music/wedding/*.mp3
ls products/shared/music/romantic/*.mp3

# 2. Chọn 1 file phù hợp phong cách
# 3. Tính relative path từ code.html
```

**Relative path:**
```
products/Web/Invitation/{folder}/code.html → ../../../shared/music/{loại}/{file}.mp3
```

### Bước 5: Gen HTML thiệp cưới

#### Cấu trúc bắt buộc

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thiệp Cưới - Tên Chú Rể & Tên Cô Dâu</title>
    <meta name="description" content="Thiệp mời đám cưới...">
    <!-- Google Fonts — chọn combo phù hợp -->
    <!-- Lucide Icons CDN -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <!-- Tailwind CDN (optional) hoặc inline CSS -->
    <style>/* all styles inline */</style>
</head>
<body>
    <!-- 8+ sections bắt buộc -->
    <script>lucide.createIcons();</script>
    <script>/* Countdown + IntersectionObserver + Music + Effects */</script>
</body>
</html>
```

#### Sections bắt buộc — Tối thiểu 8 sections:

| # | Section | Bắt buộc | Nội dung |
|---|---------|----------|----------|
| 1 | **Header/Nav** | ✅ | Tên cặp đôi + nav links (scroll to section) + initials monogram |
| 2 | **Hero / Save the Date** | ✅ | Tên cô dâu & chú rể (font script/serif lớn), ngày cưới, decorative elements, ký hiệu "&" hoặc "♥", background ảnh hoặc gradient |
| 3 | **Countdown** | ✅ | Đếm ngược realtime đến ngày cưới (ngày, giờ, phút, giây), JS cập nhật mỗi giây |
| 4 | **Love Story Timeline** | ✅ | 3–5 mốc quan trọng (gặp nhau, hẹn hò, cầu hôn, đính hôn...), layout timeline dọc với connecting line, mỗi mốc có ngày + tiêu đề + mô tả ngắn |
| 5 | **Thông tin lễ cưới** | ✅ | Tuỳ loại thiệp (xem bảng bên dưới) |
| 6 | **Gallery ảnh** | ✅ | Grid 3–2–1 cột responsive, 6–9 ảnh Unsplash wedding, hover overlay effect, (optional: lightbox click zoom) |
| 7 | **RSVP** | ✅ | Form xác nhận: Họ tên, SĐT, Số khách (dropdown 1–5), Lời nhắn (textarea), Nút gửi. Form KHÔNG cần backend — chỉ UI |
| 8 | **Lời chúc / Wishes** | ✅ | Nếu có `sheet_id`: form gửi + danh sách + **floating bubbles** bay lên. Nếu không: lời chúc tĩnh |
| 9 | **Tờ lịch tháng** | ✅ | Lịch tháng đánh dấu ngày cưới + chú thích sự kiện. 3 variant: classic/elegant/minimal |
| 10 | **Bản đồ / Google Maps** | Có nếu có địa chỉ/link | Embed iframe + nút "Mở Google Maps" + "Chỉ đường". Thiệp đôi: 2 map cards |
| 11 | **Footer** | ✅ | Tên cặp đôi + ngày cưới + hearts animation + "Made with ♥" |

#### Section "Thông tin lễ cưới" — Phân biệt theo loại thiệp:

**A. Thiệp đơn — Nhà trai** (mặc định):
- Chỉ hiển thị **1 card**: **Lễ Thành Hôn** (tiệc cưới bên nhà trai)
- Tiêu đề section: "Lễ Thành Hôn" hoặc "Tiệc Cưới"
- Nội dung card: icon, ngày giờ, địa điểm nhà hàng/tiệc, địa chỉ
- Có thể thêm dòng "Trân trọng kính mời" với tên bố mẹ chú rể
- Hero/header có thể ghi: "Nhà trai trân trọng kính mời"

**B. Thiệp đơn — Nhà gái:**
- Chỉ hiển thị **1 card**: **Lễ Vu Quy** (tiệc bên nhà gái)
- Tiêu đề section: "Lễ Vu Quy"
- Nội dung card: icon, ngày giờ, địa điểm nhà gái/tiệc, địa chỉ
- Có thể thêm dòng "Trân trọng kính mời" với tên bố mẹ cô dâu
- Hero/header có thể ghi: "Nhà gái trân trọng kính mời"

**C. Thiệp đôi** (khi user yêu cầu "thiệp đôi"):
- Hiển thị **2 cards** cạnh nhau (grid 2 cột, responsive 1 cột trên mobile):
  - Card 1: **Lễ Vu Quy** — ngày giờ, địa điểm nhà gái, địa chỉ, tên bố mẹ cô dâu
  - Card 2: **Lễ Thành Hôn** — ngày giờ, địa điểm tiệc cưới, địa chỉ, tên bố mẹ chú rể
- Có thể thêm section **"Gia Đình Hai Bên"** giới thiệu bố mẹ cả 2 nhà (trước hoặc sau thông tin lễ)
- Hero hiển thị đầy đủ: tên cả 2 bên, "Trân trọng kính mời"

**Bảng tóm tắt:**

| Loại | Cards lễ cưới | Tên bố mẹ | Hero text |
|------|--------------|-----------|-----------|
| Đơn — Nhà trai | 1 (Lễ Thành Hôn) | Chỉ bố mẹ chú rể | "Nhà trai trân trọng kính mời" |
| Đơn — Nhà gái | 1 (Lễ Vu Quy) | Chỉ bố mẹ cô dâu | "Nhà gái trân trọng kính mời" |
| Đôi | 2 (Vu Quy + Thành Hôn) | Cả 2 bên | "Trân trọng kính mời" |

#### Sections tuỳ chọn (thêm nếu phù hợp):

| Section | Khi nào thêm |
|---------|-------------|
| **Dresscode** | User yêu cầu, hoặc theme formal |
| **Registry / Mừng cưới** | User yêu cầu |
| **Bản đồ** | User cung cấp địa chỉ cụ thể |
| **Video** | User cung cấp link YouTube |
| **Letter / Thư Ngỏ** | Phong bì toggle: mở → thư trượt ra + hearts bay. Đóng → thư trượt xuống chậm 1.8s biến mất sau thân. Thân phủ kín (top→bottom, z2) che thư (z1). 4 style. CSS mục 20 + JS mục 17 |
| **Bridesmaids & Groomsmen** | User yêu cầu |

#### Envelope / Phần mở thiệp — Trang trí cầu kỳ (BẮT BUỘC):

Phần mở thiệp KHÔNG được để thô/đơn giản. LUÔN trang trí đầy đủ:

| Thành phần | Bắt buộc | Mô tả |
|------------|----------|-------|
| **Card frame** | ✅ | Glass-morphism card với `backdrop-filter: blur(16px)`, bo tròn 20-24px |
| **Viền đôi** | ✅ | `::before` solid border + `::after` dashed border bên trong card |
| **Corner ornaments** | ✅ | 4 góc có ❦ hoặc ✿ (ẩn trên mobile nhỏ) |
| **Ảnh nền blur** | ✅ | Ảnh couple blur 6px + overlay gradient phía sau |
| **Botanical deco** | ✅ | 4-6 emoji lá/hoa bay lơ lửng nền (🌿🍃☘️🌸), opacity 0.1-0.15 |
| **Hiệu ứng mở** | ✅ | Chọn 1 trong 3: **Ribbon bow** (nơ cởi ra, mục 20b) / **Padlock** (ổ khoá + chìa cắm xoay bật, mục 20c) / **Button** (nút đơn giản — chỉ dùng khi cần). Ưu tiên Ribbon bow hoặc Padlock |
| **Stagger animation** | ✅ | Mỗi element xuất hiện lần lượt (delay 0.15-0.2s giữa các element) |
| **Ảnh peek** | Tuỳ chọn | 2 ảnh nhỏ lấp ló dưới card, xoay nghiêng polaroid-style |

**Tuỳ chỉnh ribbon bow theo palette:**
```css
.ribbon-bow { --bow-color: var(--accent); --bow-color-dark: var(--accent-dark); --bow-glow: var(--accent-glow); }
```

#### Decorative Animations — Trang trí vùng trống (BẮT BUỘC):

**LUÔN thêm 4-8 hiệu ứng trang trí** vào các vùng trống trong thiệp.
CSS-only từ `styles.css` mục 21 — chỉ cần `<span class="deco ...">` trong parent `position:relative`.

```html
<span class="deco deco-front deco-heart-beat deco-md deco-rose-color" style="top:10%;right:-20px;"></span>
```

**Vị trí bắt buộc đặt deco:**
- Bên cạnh tên cặp đôi (hero) → `deco-heart-beat` hoặc `deco-hearts-double`
- Giữa 2 ảnh bay vào → `deco-heart-float`
- Cạnh info card lễ cưới → `deco-rings` hoặc `deco-rose`
- Background thư tay → `deco-petals deco-back deco-faint`

**Modifiers:** `deco-front/back` (z-index), `deco-xs/sm/md/lg/xl` (size), `deco-rose-color/gold-color/...` (màu), `deco-faint/subtle/soft` (opacity)

Chi tiết: `README.md` mục 18.

#### Countdown JS — BẮT BUỘC:

```javascript
// Wedding Countdown
function updateCountdown() {
    const weddingDate = new Date('YYYY-MM-DDTHH:00:00').getTime();
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff <= 0) {
        // Đã qua ngày cưới
        document.querySelector('.countdown').innerHTML = '<p class="text-2xl">🎉 Hôn lễ đã diễn ra! 🎉</p>';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);
```

#### Hiệu ứng đặc biệt — BẮT BUỘC ít nhất 1:

Chọn 1–2 hiệu ứng phù hợp phong cách:

**A. Hoa rơi (Falling Petals) — cho classic/romantic/garden:**
```javascript
// Falling Petals Effect
function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = (Math.random() * 3 + 4) + 's';
    petal.style.opacity = Math.random() * 0.6 + 0.2;
    petal.style.fontSize = (Math.random() * 10 + 12) + 'px';
    petal.innerHTML = ['🌸', '🩷', '💮', '🏵️'][Math.floor(Math.random() * 4)];
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 7000);
}
setInterval(createPetal, 800);
```
```css
.petal {
    position: fixed;
    top: -20px;
    z-index: 9999;
    pointer-events: none;
    animation: fall linear forwards;
}
@keyframes fall {
    to { transform: translateY(110vh) rotate(720deg); opacity: 0; }
}
```

**B. Confetti (cho fun/tropical/modern):**
```javascript
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.background = ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD'][Math.floor(Math.random() * 5)];
    confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
}
setInterval(createConfetti, 300);
```
```css
.confetti {
    position: fixed;
    top: -10px;
    width: 8px;
    height: 8px;
    z-index: 9999;
    pointer-events: none;
    animation: confetti-fall linear forwards;
}
@keyframes confetti-fall {
    to { transform: translateY(110vh) rotate(1080deg); opacity: 0; }
}
```

**C. Sparkles / Lấp lánh (cho luxury/elegant/dark):**
```javascript
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.innerHTML = '✨';
    sparkle.style.fontSize = (Math.random() * 8 + 8) + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2000);
}
setInterval(createSparkle, 500);
```
```css
.sparkle {
    position: fixed;
    z-index: 9999;
    pointer-events: none;
    animation: sparkle-fade 2s ease-out forwards;
}
@keyframes sparkle-fade {
    0% { opacity: 0; transform: scale(0); }
    50% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0.5); }
}
```

**D. Hearts floating (cho romantic/blush):**
```javascript
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.innerHTML = ['❤️', '💕', '💗', '💖'][Math.floor(Math.random() * 4)];
    heart.style.fontSize = (Math.random() * 10 + 10) + 'px';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
}
setInterval(createHeart, 1000);
```

**Bảng gợi ý hiệu ứng theo phong cách:**

| Phong cách | Hiệu ứng chính | Hiệu ứng phụ |
|------------|----------------|---------------|
| Classic/Gold | Sparkles ✨ | — |
| Romantic/Blush | Hoa rơi 🌸 | Hearts 💕 |
| Rustic/Garden | Hoa rơi 🌸 | Lá rơi 🍃 |
| Modern/Minimalist | Sparkles nhẹ | — |
| Dark Luxury | Sparkles ✨ | Gold particles |
| Tropical/Fun | Confetti 🎊 | — |
| Boho/Vintage | Hoa rơi 🌸 | — |

#### Bảng màu cưới — Chọn 1 palette phù hợp:

| Phong cách | Primary | Secondary | Accent | Background | Text |
|------------|---------|-----------|--------|------------|------|
| **Classic Gold** | `#B8860B` | `#D4AF37` | `#FFD700` | `#FFFEF5` ivory | `#2C1810` |
| **Blush Pink** | `#E8A0BF` | `#F5C6D0` | `#C77DA3` | `#FFF5F7` | `#4A2040` |
| **Sage Green** | `#9CAF88` | `#B5C4A1` | `#6B8F5B` | `#F5F7F2` | `#2D3B25` |
| **Navy & Gold** | `#1B2A4A` | `#D4AF37` | `#FFD700` | `#F8F9FA` | `#1B2A4A` |
| **Dusty Rose** | `#D4A5A5` | `#E8C4C4` | `#B07575` | `#FDF6F6` | `#5C3D3D` |
| **Terracotta** | `#C67B5C` | `#E8A98A` | `#A0522D` | `#FFF8F0` | `#3D2B1F` |
| **Lavender** | `#9B8EC4` | `#C4B7D9` | `#7B68AE` | `#F8F5FF` | `#3D2D5C` |
| **Burgundy** | `#722F37` | `#A4343A` | `#D4AF37` | `#FFF9F5` | `#2C1015` |
| **Dark Luxury** | `#0D0D0D` | `#1A1A2E` | `#D4AF37` | `#0D0D0D` | `#F5F0E8` |
| **Tropical** | `#2D8B6F` | `#F4A460` | `#FF6B6B` | `#FFFEF8` | `#1A3C34` |

#### Font combos cho thiệp cưới:

**ƯU TIÊN font mềm mại, thanh lịch** — tạo cảm giác lãng mạn, nhẹ nhàng cho thiệp cưới.
**Kết hợp nhiều font** trong 1 thiệp: heading script/serif + body sans + accent italic.
**TRÁNH font cứng, nặng** (Impact, Arial Black, Roboto Condensed...).

**⚠️ QUAN TRỌNG — Font tiếng Việt:**
- **KHÔNG dùng `Cinzel`, `Cinzel Decorative`** cho text tiếng Việt — font này KHÔNG hỗ trợ dấu tiếng Việt (ă, ơ, ư, ê, ô, đ...), gây lỗi hiển thị.
- **KHÔNG dùng `Italiana`** cho text tiếng Việt — tương tự không hỗ trợ đầy đủ.
- Font script (`Great Vibes`, `Dancing Script`, `Sacramento`, `Alex Brush`) — **chỉ dùng cho tên KHÔNG DẤU** (ví dụ: "Minh & Ngoc"). Nếu tên có dấu → dùng serif thay thế.
- **ƯU TIÊN font hỗ trợ tiếng Việt** cho mọi text có dấu: `Cormorant Garamond`, `Playfair Display`, `EB Garamond`, `Be Vietnam Pro`, `Quicksand`, `Nunito`, `Lora`.
- Khi chọn `--font-heading` → **BẮT BUỘC** dùng font hỗ trợ tiếng Việt vì section title luôn có tiếng Việt.

| Combo | Heading (script/serif) | Body (sans) | Accent (italic/light) | Vibe |
|-------|----------------------|-------------|----------------------|------|
| **Soft Romantic** | `Cormorant Garamond` | `Quicksand` | `Cormorant Garamond italic` | Mềm mại, lãng mạn |
| **Dreamy** | `Great Vibes` | `Nunito` | `Lora italic` | Mộng mơ, bay bổng |
| **Elegant Serif** | `Playfair Display` | `Lora` | `Playfair Display italic` | Sang trọng, tinh tế |
| **Modern Soft** | `Italiana` | `Quicksand` | `Cormorant Garamond italic` | Hiện đại, mềm |
| **Classic Grace** | `Playfair Display` | `EB Garamond` | `Cormorant Garamond italic` | Cổ điển, quý phái |
| **Gentle** | `Dancing Script` | `Be Vietnam Pro` | `Be Vietnam Pro italic` | Nhẹ nhàng, tươi |
| **Luxury Silk** | `Cormorant SC` | `Raleway` | `Cormorant Garamond italic` | Cao cấp, mượt mà |
| **Warm** | `Sacramento` | `Nunito` | `Lora italic` | Ấm áp, thân mật |
| **Airy** | `Alex Brush` | `Quicksand` | `EB Garamond italic` | Thoáng, nhẹ |
| **Vietnamese** | `Great Vibes` | `Be Vietnam Pro` | `Be Vietnam Pro italic` | Lãng mạn + đọc tốt tiếng Việt |

**Font gợi ý theo vị trí:**

| Vị trí | Font gợi ý | Weight | Lý do |
|--------|-----------|--------|-------|
| Tên cặp đôi | Script: `Great Vibes`, `Sacramento`, `Alex Brush`, `Dancing Script` | 400 | Mềm mại, nổi bật |
| Tiêu đề section | Serif: `Cormorant Garamond`, `Playfair Display`, `EB Garamond` | 500-600 | Thanh lịch, dễ đọc (⚠️ KHÔNG dùng Cinzel — lỗi tiếng Việt) |
| Body text | Sans: `Quicksand`, `Nunito`, `Be Vietnam Pro` | 400-500 | Tròn trịa, thân thiện |
| Quote / thư tay | Serif italic: `Cormorant Garamond italic`, `Lora italic` | 400i | Mềm mại, cảm xúc |
| Label nhỏ | Sans light: `Quicksand 300`, `Raleway 300` | 300 | Nhẹ, tinh tế |
| Ngày tháng | Serif: `Cormorant Garamond`, `EB Garamond` | 400 | Trang trọng |

**Quy tắc font:**
- **Tối thiểu 2 font, khuyến khích 3**: heading script + body sans + accent serif italic
- **Ưu tiên font có nhiều weight** (300, 400, 500, 600, 700) — linh hoạt hơn
- **Dùng `font-display: swap`** trong Google Fonts URL để load nhanh
- **Font-size dùng `clamp()`** — responsive tự nhiên giữa mobile và desktop
- **Tránh font quá nặng** (>100KB) — ảnh hưởng tốc độ load trên mobile

**Font hỗ trợ tiếng Việt tốt nhất (ƯU TIÊN DÙNG):**
- Body: `Be Vietnam Pro`, `Quicksand`, `Nunito`, `Montserrat`, `Lora`
- Heading serif: `Cormorant Garamond`, `Playfair Display`, `EB Garamond`
- Script (chỉ cho tên không dấu): `Great Vibes`, `Dancing Script`, `Sacramento`, `Alex Brush`

**⛔ Font KHÔNG hỗ trợ tiếng Việt — TUYỆT ĐỐI KHÔNG dùng cho text có dấu:**
- `Cinzel`, `Cinzel Decorative`, `Italiana`, `Allura`, `Tangerine`

**Google Fonts URL mẫu (3 font):**
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Quicksand:wght@300;400;500;600;700&family=Great+Vibes&display=swap" rel="stylesheet">
```

#### Icons Lucide phù hợp thiệp cưới:

```
heart, heart-handshake, calendar, clock, map-pin, mail, phone,
gem, ring (không có → dùng gem), crown, sparkles, star,
camera, image, music, gift, glass-water, cake-slice,
users, user-check, message-circle, send, check-circle
```

#### Ảnh mẫu cho thiệp cưới:

**ƯU TIÊN dùng ảnh từ thư viện local** `products/shared/images/wedding/` — ảnh cặp đôi châu Á chất lượng cao.
**KHÔNG dùng ảnh cặp đôi phương Tây** trừ khi user yêu cầu.

#### Bước chọn ảnh:

1. **Đọc** `products/shared/images/wedding/README.md` → xem danh sách bộ ảnh có sẵn
2. **Chọn bộ ảnh** phù hợp tông màu/phong cách thiệp:

| Palette thiệp | Bộ ảnh gợi ý | Folder |
|---------------|-------------|--------|
| Classic Gold, Blush Pink, Dusty Rose, Lavender | Hàn Quốc studio trắng kem | `korean-studio-white/` |
| Sage Green, Rustic | Vườn, ngoài trời | `korean-outdoor-nature/` (nếu có) |
| Traditional Red | Truyền thống đỏ | `chinese-traditional-red/` (nếu có) |
| Dark Luxury, Navy & Gold | Studio tối | `dark-luxury-studio/` (nếu có) |
| Tropical | Biển, nhiệt đới | `beach-tropical/` (nếu có) |

3. **Dùng relative path** từ code.html đến thư viện:
```
products/Web/Invitation/{folder}/code.html → ../../../shared/images/wedding/{bộ-ảnh}/{file}.jpg
```

Hoặc **copy ảnh vào folder sản phẩm** rồi dùng `./cinelove_1.jpg` (đơn giản hơn).

4. **Nếu không có bộ ảnh phù hợp** → fallback dùng Unsplash với keyword: `korean wedding couple`, `asian bride groom`

#### Bộ ảnh hiện có:

**`korean-studio-white/`** — 6 ảnh cặp đôi Hàn Quốc, studio trắng kem:

| File | Mô tả | Dùng cho |
|------|--------|----------|
| `cinelove_1.jpg` | Chính diện, nền kem, hoa | Hero, big photo |
| `cinelove_2.jpg` | Close-up lãng mạn | Letter, love story |
| `cinelove_3.jpg` | Close-up (variant 2) | Gallery |
| `cinelove_4.jpg` | Toàn thân, vui tươi | Avatar đôi, gallery |
| `cinelove_5.jpg` | Cận mặt, cười | Gallery, thank you |
| `cinelove_6.jpg` | Cận mặt, dịu dàng | Gallery, thank you bg |

**Quy tắc ảnh:**
- Ảnh phải có **MẪU NGƯỜI** — không dùng ảnh phong cảnh/hoa/venue làm ảnh chính
- Ưu tiên cặp đôi châu Á (Hàn/Trung/Việt)
- Khi gen cho khách thật → thay bằng ảnh khách (quy trình B)

#### Nhạc nền — Code HTML (BẮT BUỘC):

```html
<!-- Music Toggle Button — Fixed bottom-right -->
<button id="musicToggle" class="music-toggle" aria-label="Toggle music">
    <i data-lucide="volume-2" class="music-icon-on"></i>
    <i data-lucide="volume-x" class="music-icon-off"></i>
</button>
<audio id="bgMusic" loop preload="auto">
    <source src="../../../shared/music/{thể-loại}/{tên-file}.mp3" type="audio/mpeg">
</audio>
```

```css
.music-toggle {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    background: var(--accent, #D4AF37);
    color: white;
    cursor: pointer;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: transform 0.2s, box-shadow 0.2s;
}
.music-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}
.music-toggle .music-icon-off { display: none; }
.music-toggle.muted .music-icon-on { display: none; }
.music-toggle.muted .music-icon-off { display: block; }
```

```javascript
// Background Music Toggle
const musicBtn = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
if (musicBtn && bgMusic) {
    bgMusic.volume = 0.3;
    let musicStarted = false;

    musicBtn.addEventListener('click', () => {
        if (!musicStarted) {
            bgMusic.play();
            musicStarted = true;
        } else if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.classList.remove('muted');
        } else {
            bgMusic.pause();
            musicBtn.classList.add('muted');
        }
    });
}
```

**Lưu ý:**
- Nhạc KHÔNG tự phát — user phải click nút để bật
- Volume 0.3 (30%)
- Nút màu accent phù hợp theme (gold, pink, sage...)
- **KHÔNG copy file nhạc** — link relative path đến `products/shared/music/`

#### Google Sheets API — Transport Layer (nếu có sheet_id):

`wishes-api.js` là **cổng giao tiếp thuần** — chỉ cung cấp `sheetsAPI.post()` và `sheetsAPI.get()`.
**Logic nghiệp vụ** (form gì gửi cột gì, render thế nào) nằm trong `<script>` của `code.html`.

**Load script TRƯỚC script chính:**
```html
<script src="../../../shared/wedding/wishes-api.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
    // === WISHES ===
    const WISHES_SHEET = '<SHEET_ID_LOI_CHUC>';
    // sheetsAPI.get(WISHES_SHEET).then(rows => { /* render rows, mỗi row có .A, .B, .C ... */ });
    // sheetsAPI.post(WISHES_SHEET, { A: name, B: message, C: time }).then(() => { /* reload */ });

    // === RSVP ===
    const RSVP_SHEET = '<SHEET_ID_RSVP>';  // có thể cùng hoặc khác sheet
    // sheetsAPI.post(RSVP_SHEET, { A: name, B: phone, C: guests, D: message, E: time });
});
</script>
```

**Quy tắc:**
- **KHÔNG copy nội dung `wishes-api.js`** vào code.html — luôn dùng `<script src>`
- Relative path: `../../../shared/wedding/wishes-api.js`
- Mỗi form có thể dùng **sheet_id riêng** hoặc **chung** — tuỳ user
- Columns `A/B/C/...` tự quy ước trong code.html — API không quan tâm nghĩa cột
- **Phải hỏi user** sheet_id nếu không được cung cấp
- Nếu user KHÔNG muốn → form UI-only (không gửi dữ liệu, dùng localStorage hoặc tĩnh)

#### Floating Wishes — Bong bóng lời chúc bay lên:

**2 mode:**
- **Local mode** (gen mẫu, không có sheet_id): dùng `initFloatingWishesLocal()` từ `scripts.js` mục 14b. Data mặc định: `DEFAULT_LOCAL_WISHES` (Ngoạ Long, Phượng Sồ, Doremon, Pikachu, Kabibara). User gửi lời chúc → lưu localStorage + thêm vào pool. **LUÔN thêm khi gen mẫu** (trừ gói Basic).
- **API mode** (gen theo khách, có sheet_id): dùng `initFloatingWishes()` từ `scripts.js` mục 14. Load từ `sheetsAPI.get()`.

Khi có floating wishes → **LUÔN thêm floating bubbles + nút toggle**:

**Hoạt động:**
- Bong bóng chat bay từ dưới lên, fixed bottom-left
- Load ngầm từ `sheetsAPI.get()` — bong bóng tự nổi lên khi có dữ liệu
- Loop vô hạn qua pool lời chúc, tần suất tự điều chỉnh theo số lượng
- Khi user gửi lời chúc → thêm ngay vào pool (optimistic)
- `position: absolute` trong container `height: 0` — bay tự do không bị cắt
- Animation 12s linear, bay lên 280px, mờ dần tự nhiên

**Nền bong bóng — hồng nhạt trong suốt:**
```css
background: rgba(255, 182, 193, 0.3);   /* hồng nhạt cố định */
backdrop-filter: blur(10px);
```

**Màu chữ — random 5 màu** qua class `fw-c1`→`fw-c5`:
- `fw-c1`: đỏ (`#C41E3A`)
- `fw-c2`: xanh dương (`#2563EB`)
- `fw-c3`: tím (`#7C3AED`)
- `fw-c4`: trắng (`#FFFFFF`)
- `fw-c5`: nâu (`#6B3A1A`)

```javascript
el.className = 'floating-wish fw-c' + (Math.floor(Math.random() * 5) + 1);
```

**Nút toggle tắt/bật** (BẮT BUỘC khi có floating wishes):
- Đặt **bên trên nút nhạc** (bottom: 80px, right: 24px)
- Icon: `message-circle` (bật) / `message-circle-off` (tắt)
- Click → toggle class `hidden-wishes` trên `.floating-wishes-box`

```html
<!-- Đặt TRƯỚC nút nhạc -->
<button id="wishesToggle" class="wishes-toggle" aria-label="Toggle wishes">
    <i data-lucide="message-circle" class="wishes-icon-on"></i>
    <i data-lucide="message-circle-off" class="wishes-icon-off"></i>
</button>
```

```
Vị trí nút (fixed bottom-right, xếp dọc):
  [ 💬 ]  ← wishes toggle (bottom: 80px, 40px)
  [ 🔊 ]  ← music toggle  (bottom: 24px, 48px)
```

**JS toggle:**
```javascript
var wishesBtn = document.getElementById('wishesToggle');
var wishesBox = document.querySelector('.floating-wishes-box');
if (wishesBtn && wishesBox) {
    wishesBtn.addEventListener('click', function () {
        var isHidden = wishesBtn.classList.toggle('hidden');
        wishesBox.classList.toggle('hidden-wishes', isHidden);
    });
}
```

CSS + JS chi tiết: xem `products/shared/wedding/styles.css` mục 17 + `scripts.js` mục 14 + `README.md`

#### Section Tờ Lịch Tháng (BẮT BUỘC):

Luôn thêm tờ lịch tháng đánh dấu ngày cưới. Đặt sau Countdown hoặc sau Event Cards.

```html
<section class="cal-section" id="calendar-month">
    <div class="section-heading">
        <p class="section-subtitle">Save The Date</p>
        <h2 class="section-title">Ngày Trọng Đại</h2>
    </div>
    <div id="weddingCalendar"></div>
</section>
```

```javascript
initCalendarMonth({
    containerId: 'weddingCalendar',
    month: <THÁNG_CƯỚI>,
    year: <NĂM_CƯỚI>,
    variant: '<classic|elegant|minimal>',
    accentColor: '<MÀU_ACCENT>',
    events: [
        { day: <NGÀY>, color: '<MÀU>', label: '<GIỜ> — <SỰ KIỆN>' },
    ]
});
```

**Chọn variant theo phong cách:**
- Traditional/Red → `classic` + `#C41E3A`
- Classic/Gold/Luxury → `elegant` + `#D4AF37`
- Modern/Minimal/Pastel → `minimal` + accent color

**Events tự sinh từ thông tin lễ cưới:**
- Thiệp đơn: 1 event (Lễ Thành Hôn hoặc Vu Quy)
- Thiệp đôi: 2 events (Vu Quy + Thành Hôn), có thể khác ngày

CSS: `styles.css` mục 19 | JS: `scripts.js` mục 16 | Snippets: `README.md` mục 16

#### Section Video YouTube (nếu user cung cấp link):

Khi user cung cấp link YouTube → thêm section video **lazy load** (thumbnail + click play):

```html
<section class="video-section" id="video">
    <div class="section-heading">
        <p class="section-subtitle">Video</p>
        <h2 class="section-title">Kỷ Niệm Của Chúng Tôi</h2>
    </div>
    <div class="video-wrapper" data-video-id="VIDEO_ID">
        <img src="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg" alt="Video">
        <div class="video-play-btn">
            <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
    </div>
</section>
```

**Parse VIDEO_ID** từ link user:
- `youtube.com/watch?v=XXX` → `XXX`
- `youtu.be/XXX` → `XXX`

**JS lazy load** (copy vào code.html):
```javascript
document.querySelectorAll('.video-wrapper[data-video-id]').forEach(function (w) {
    w.addEventListener('click', function () {
        var id = w.dataset.videoId;
        w.innerHTML = '<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>';
        w.style.cursor = 'default';
    }, { once: true });
});
```

**Vị trí**: sau Love Story hoặc sau Gallery.
**Tất cả gói** đều có tính năng này.
CSS: xem `styles.css` mục 18 + `README.md` mục 15.

#### Section Bản đồ — Google Maps (nếu có địa chỉ/link):

Thêm section bản đồ khi user cung cấp địa chỉ hoặc link Google Maps.

**3 loại URL cần tạo:**

| URL | Mục đích | Format |
|-----|----------|--------|
| **Embed URL** | Nhúng iframe | `https://www.google.com/maps/embed?pb=...` (lấy từ Google Maps > Share > Embed) |
| **Open URL** | Nút "Mở Google Maps" (tab mới) | `https://maps.google.com/?q=TÊN+ĐỊA+ĐIỂM` hoặc link gốc user đưa |
| **Direction URL** | Nút "Chỉ đường" (tab mới) | `https://www.google.com/maps/dir/?api=1&destination=ĐỊA+CHỈ+ENCODE` |

**Xử lý theo input của user:**

| User đưa gì | Embed iframe | Nút Mở Maps | Nút Chỉ đường |
|-------------|-------------|-------------|---------------|
| Link embed (`/maps/embed?pb=...`) | Dùng trực tiếp | Tạo từ địa chỉ text | Tạo từ địa chỉ text |
| Link Google Maps thường (`/maps/place/...`) | **HỎI link embed** hoặc tạo `?q=` | Dùng link gốc | Tạo direction URL |
| Chỉ địa chỉ text (không link) | **HỎI link embed** hoặc dùng `?q=` + `&output=embed` | `maps.google.com/?q=` + encode | `maps/dir/?api=1&destination=` + encode |

**HTML — Thiệp đơn (1 map):**
```html
<section id="map" class="map-section">
    <div class="section-heading">
        <p class="section-subtitle">Địa Điểm</p>
        <h2 class="section-title">Bản Đồ</h2>
    </div>
    <div class="map-wrapper">
        <iframe src="{EMBED_URL}" allowfullscreen="" loading="lazy"></iframe>
    </div>
    <div class="map-address">
        <i data-lucide="map-pin"></i>
        <span>{TÊN ĐỊA ĐIỂM}, {ĐỊA CHỈ}</span>
    </div>
    <div class="map-actions">
        <a href="{OPEN_URL}" target="_blank" rel="noopener" class="map-btn map-open-btn">
            <i data-lucide="external-link"></i> Mở Google Maps
        </a>
        <a href="{DIRECTION_URL}" target="_blank" rel="noopener" class="map-btn map-direction-btn">
            <i data-lucide="navigation"></i> Chỉ đường
        </a>
    </div>
</section>
```

**HTML — Thiệp đôi (2 maps):**
- Dùng `.map-grid` với 2 `.map-card` (Vu Quy + Thành Hôn)
- Mỗi card có iframe + label + tên + address + 2 nút
- Xem snippet đầy đủ trong `products/shared/wedding/README.md` mục 11

**CSS:** copy từ `products/shared/wedding/styles.css` mục 11 (MAP)

**Quy tắc HỎI link:**
- User nói "địa chỉ: 123 ABC" → **HỎI**: "Cho mình link Google Maps embed (hoặc link thường) của địa chỉ này để nhúng bản đồ chính xác. Nếu không có thì mình dùng link tìm kiếm tự động."
- User đưa link → dùng link
- User nói "tự động" → dùng `https://maps.google.com/maps?q={encode}&output=embed` cho iframe, `https://maps.google.com/?q={encode}` cho nút mở

#### Animations bắt buộc:

**A. Hero — stagger slide up:**
```css
.hero-title { animation: slide-up-hero 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
.hero-subtitle { animation: slide-up-hero 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
.hero-date { animation: slide-up-hero 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both; }
@keyframes slide-up-hero {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
```

**B. Scroll reveal — IntersectionObserver (BẮT BUỘC):**
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('[class*="animate-"]').forEach(el => observer.observe(el));
});
```

**C. Hover — cards lift, images zoom, buttons glow**

**D. Heartbeat animation cho icon tim:**
```css
@keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    25% { transform: scale(1.15); }
    50% { transform: scale(1); }
    75% { transform: scale(1.1); }
}
```

**Tham khảo `products/shared/animations.css`** để tận dụng animations có sẵn.

### Bước 5b: Tạo `prompt.txt` (CHỈ khi gen mẫu)

Sau khi gen `code.html`, tạo file `prompt.txt` trong **cùng folder** với `code.html`.
File này là **form điền thông tin** cho khách hàng khi họ chọn mẫu.

#### Quy trình tạo prompt.txt:

1. **Phân tích `code.html` vừa gen** → xác định:
   - Mẫu có bao nhiêu vị trí ảnh (hero, love story, gallery, QR...)
   - Loại thiệp (đơn/đôi) → quyết định section thông tin gia đình & lễ cưới
   - Có những section tuỳ chọn nào (dresscode, video, bản đồ...)
   - Có bao nhiêu mốc love story
2. **Sinh bảng ảnh ĐỘNG** — tuỳ theo mẫu cụ thể, không hardcode
3. **Ghi file** `prompt.txt` vào folder

#### Template prompt.txt:

```
═══════════════════════════════════════════════════
  THÔNG TIN ĐẶT THIỆP CƯỚI
  Mã mẫu: #{id}
  Tên mẫu: {tên mẫu}
  Phong cách: {classic gold / blush pink / ...}
  Loại thiệp: {đơn nhà trai / đơn nhà gái / đôi}
═══════════════════════════════════════════════════

Vui lòng điền đầy đủ thông tin bên dưới rồi gửi lại.
Mục có dấu (*) là bắt buộc.
Để trống = giữ nội dung mẫu.

───────────────────────────────────────────────────
1. THÔNG TIN CẶP ĐÔI
───────────────────────────────────────────────────
Tên chú rể (*):
Tên cô dâu (*):
Ngày cưới (*): (dd/mm/yyyy)
Giờ làm lễ:

───────────────────────────────────────────────────
2. THÔNG TIN GIA ĐÌNH
───────────────────────────────────────────────────
{Nếu thiệp đơn nhà trai:}
[Nhà trai]
Bố chú rể:
Mẹ chú rể:

{Nếu thiệp đơn nhà gái:}
[Nhà gái]
Bố cô dâu:
Mẹ cô dâu:

{Nếu thiệp đôi → hiện CẢ 2 block:}
[Nhà trai]
Bố chú rể:
Mẹ chú rể:

[Nhà gái]
Bố cô dâu:
Mẹ cô dâu:

───────────────────────────────────────────────────
3. THÔNG TIN LỄ CƯỚI
───────────────────────────────────────────────────
{Nếu thiệp đơn nhà trai → chỉ block Lễ Thành Hôn}
{Nếu thiệp đơn nhà gái → chỉ block Lễ Vu Quy}
{Nếu thiệp đôi → cả 2 block}

[Lễ Vu Quy]
Ngày giờ:
Tên địa điểm:
Địa chỉ:

[Lễ Thành Hôn]
Ngày giờ:
Tên địa điểm:
Địa chỉ:

───────────────────────────────────────────────────
4. LOVE STORY — CÂU CHUYỆN TÌNH YÊU
───────────────────────────────────────────────────
(Mẫu này có {N} mốc. Để trống = giữ nội dung mẫu)

Mốc 1:
  Ngày (tháng/năm):
  Tiêu đề (VD: "Lần đầu gặp nhau"):
  Mô tả ngắn:

Mốc 2:
  Ngày:
  Tiêu đề:
  Mô tả ngắn:

Mốc 3:
  Ngày:
  Tiêu đề:
  Mô tả ngắn:

{Thêm/bớt mốc tuỳ ý — AI sẽ tự điều chỉnh}

───────────────────────────────────────────────────
5. ẢNH CẦN CHUẨN BỊ
───────────────────────────────────────────────────
Đặt tên file ảnh ĐÚNG theo bảng bên dưới,
bỏ vào CÙNG folder với file prompt này.
Định dạng: JPG hoặc PNG đều được.
Ảnh không bắt buộc — nếu không có sẽ dùng ảnh mặc định.

{BẢNG NÀY SINH ĐỘNG — tuỳ mẫu cụ thể}

| STT | Tên file            | Hiển thị ở                | Kích thước gợi ý  | Bắt buộc |
|-----|---------------------|---------------------------|--------------------|----------|
|  1  | anh_bia.jpg         | Hero — ảnh nền chính      | 1920x1080          | Có (*)   |
|  2  | anh_doi_1.jpg       | Love Story — mốc 1        | 600x400            | Không    |
|  3  | anh_doi_2.jpg       | Love Story — mốc 2        | 600x400            | Không    |
|  4  | anh_doi_3.jpg       | Love Story — mốc 3        | 600x400            | Không    |
|  5  | anh_gallery_1.jpg   | Gallery — hàng 1 trái     | 500x500            | Không    |
|  6  | anh_gallery_2.jpg   | Gallery — hàng 1 giữa     | 500x500            | Không    |
|  7  | anh_gallery_3.jpg   | Gallery — hàng 1 phải     | 500x500            | Không    |
|  8  | anh_gallery_4.jpg   | Gallery — hàng 2 trái     | 500x500            | Không    |
|  9  | anh_gallery_5.jpg   | Gallery — hàng 2 giữa     | 500x500            | Không    |
| 10  | anh_gallery_6.jpg   | Gallery — hàng 2 phải     | 500x500            | Không    |
| 11  | anh_qr.jpg          | Mừng cưới — mã QR         | 300x300            | Không    |

{Số lượng anh_doi_* = số mốc love story trong mẫu}
{Số lượng anh_gallery_* = số ảnh gallery trong mẫu}
{anh_qr chỉ có nếu mẫu có section mừng cưới/registry}

───────────────────────────────────────────────────
6. GOOGLE SHEETS — GỬI DỮ LIỆU
───────────────────────────────────────────────────
(Mẫu này có các form gửi dữ liệu qua Google Sheets.
 Mỗi form cần 1 sheet_id riêng. Liên hệ Templexa để được cấp.)

{Sinh ĐỘNG — tuỳ mẫu có form nào}

Sheet ID — Lời chúc:
  Cột: A=Tên, B=Lời chúc, C=Thời gian

Sheet ID — Xác nhận tham dự (RSVP):
  Cột: A=Tên, B=SĐT, C=Số khách, D=Lời nhắn, E=..., F=Thời gian

(Để trống = form chỉ hiển thị, không gửi dữ liệu)

───────────────────────────────────────────────────
7. DANH SÁCH KHÁCH MỜI — CÁ NHÂN HOÁ THIỆP
───────────────────────────────────────────────────
(Để trống = không cá nhân hoá, tất cả khách xem chung 1 thiệp)

File danh sách khách: khach_moi.csv
  Đặt file CSV vào CÙNG folder với prompt này.
  Có thể export từ Excel hoặc Google Sheets.

  Định dạng bảng (3 cột):
  | ID | Tên              | Lời mời                              |
  |----|------------------|--------------------------------------|
  | 1  | Anh Nguyễn Văn A | Nhà trai trân trọng kính mời         |
  | 2  | Chị Trần Thị B   | Kính mời                             |
  | 3  | Cô Lê Thị C      | Gia đình trân trọng kính mời         |

  Sau khi gen xong, mỗi khách sẽ nhận link riêng:
  https://domain.com/thiep.html?id=1 → Hiện tên "Anh Nguyễn Văn A"
  https://domain.com/thiep.html?id=2 → Hiện tên "Chị Trần Thị B"
  Mở thiệp không có ?id → Hiện "quý khách" (mặc định)

───────────────────────────────────────────────────
8. TUỲ CHỌN THÊM
───────────────────────────────────────────────────
Nhạc nền (để trống = giữ nhạc mẫu):
Lời chúc / quote đặc biệt:
Dresscode (nếu có):

[Bản đồ Google Maps]
Link Google Maps (embed hoặc thường):
  Cách lấy: vào Google Maps → tìm địa điểm → Chia sẻ → Nhúng bản đồ → Copy link
  Hoặc copy link từ thanh địa chỉ trình duyệt
  (Nếu để trống: sẽ dùng link tìm kiếm tự động từ địa chỉ ở mục 3)

{Nếu thiệp đôi → 2 link riêng:}
Link Maps — Lễ Vu Quy:
Link Maps — Lễ Thành Hôn:

Link video YouTube:
Ghi chú thêm:

═══════════════════════════════════════════════════
  SAU KHI ĐIỀN XONG
  1. Đặt file ảnh + prompt.txt vào 1 folder
  2. Gửi lại folder cho Templexa
  3. Chúng tôi sẽ hoàn thiện thiệp trong 24h
═══════════════════════════════════════════════════
```

#### Quy tắc sinh bảng ảnh:

| Vị trí trong code.html | Tên file prompt | Mô tả vị trí |
|-------------------------|-----------------|---------------|
| Hero background / ảnh chính | `anh_bia.jpg` | Hero — ảnh nền chính |
| Love Story mốc N | `anh_doi_N.jpg` | Love Story — mốc N |
| Gallery vị trí N | `anh_gallery_N.jpg` | Gallery — hàng X vị trí Y |
| QR code mừng cưới | `anh_qr.jpg` | Mừng cưới — mã QR |
| Ảnh cô dâu chú rể riêng | `anh_chan_dung.jpg` | Section giới thiệu |
| Ảnh venue/địa điểm | `anh_dia_diem.jpg` | Thông tin lễ cưới |
| Dresscode illustration | `anh_dresscode.jpg` | Dresscode |

**Đếm chính xác** từ `code.html`:
- Đếm số `<img>` trong section love story → số `anh_doi_*`
- Đếm số `<img>` trong section gallery → số `anh_gallery_*`
- Kiểm tra có section QR/registry không → có/không `anh_qr`

### Bước 5c: Xử lý danh sách khách mời (nếu có)

Nếu folder có file `khach_moi.csv` hoặc `khach_moi.xlsx`:

#### 1. Đọc file → parse danh sách

**CSV** (ưu tiên, zero dependency):
```bash
# Đọc CSV bằng Node.js
node -e "
const fs = require('fs');
const lines = fs.readFileSync('khach_moi.csv', 'utf8').trim().split('\n');
const header = lines[0].split(',').map(h => h.trim());
const idCol = header.findIndex(h => /^(id|stt)$/i.test(h));
const nameCol = header.findIndex(h => /^(tên|ten|name)$/i.test(h));
const msgCol = header.findIndex(h => /^(lời mời|loi moi|message)$/i.test(h));

const guests = [];
for (var i = 1; i < lines.length; i++) {
    var cols = lines[i].split(',').map(c => c.trim());
    if (!cols[nameCol]) continue;
    guests.push({
        id: parseInt(cols[idCol]) || i,
        name: cols[nameCol],
        message: cols[msgCol] || 'Trân trọng kính mời'
    });
}
console.log('var GUEST_LIST = ' + JSON.stringify(guests, null, 4) + ';');
"
```

**XLSX**: yêu cầu user export CSV từ Excel/Google Sheets. Nếu chỉ có xlsx → dùng `npx xlsx-cli` hoặc đọc thủ công.

#### 2. Sinh file `guests.js` trong cùng folder sản phẩm:
```javascript
var GUEST_LIST = [
    { id: 1, name: "Anh Nguyễn Văn A", message: "Nhà trai trân trọng kính mời" },
    { id: 2, name: "Chị Trần Thị B", message: "Kính mời" },
    // ...
];
```

#### 3. Thêm vào code.html (nếu chưa có):

**HTML** — thêm `.guest-name-display` sau `.envelope-invite-text` và `.hero-invite-label`:
```html
<p class="envelope-invite-text guest-invite-text">Nhà trai trân trọng kính mời</p>
<p class="guest-name-display"></p>

<p class="hero-invite-label guest-invite-text">Nhà Trai Trân Trọng Kính Mời</p>
<p class="guest-name-display"></p>
```

**Script** — load `guests.js` TRƯỚC script chính:
```html
<script src="./guests.js"></script>
```

**JS** — thêm IIFE vào đầu DOMContentLoaded (TRƯỚC initEnvelope):
```javascript
// === GUEST PERSONALIZATION ===
(function () {
    if (typeof GUEST_LIST === 'undefined' || !Array.isArray(GUEST_LIST)) return;
    var params = new URLSearchParams(window.location.search);
    var rawId = params.get('id');
    if (rawId === null) return;
    var guestId = parseInt(rawId, 10);
    var guest = null;
    for (var i = 0; i < GUEST_LIST.length; i++) {
        if (GUEST_LIST[i].id === guestId) { guest = GUEST_LIST[i]; break; }
    }
    var nameEls = document.querySelectorAll('.guest-name-display');
    var inviteEls = document.querySelectorAll('.guest-invite-text');
    if (guest) {
        if (guest.message) {
            for (var j = 0; j < inviteEls.length; j++) inviteEls[j].textContent = guest.message;
        }
        for (var k = 0; k < nameEls.length; k++) {
            nameEls[k].textContent = guest.name;
            nameEls[k].style.display = 'block';
        }
    } else {
        for (var m = 0; m < inviteEls.length; m++) inviteEls[m].textContent = 'Trân trọng kính mời quý khách';
        for (var n = 0; n < nameEls.length; n++) nameEls[n].style.display = 'none';
    }
})();
```

**CSS** — thêm `.guest-name-display` (xem `products/shared/wedding/styles.css` mục 16b)

#### 4. Báo cáo — in danh sách link cho từng khách:
```
📋 Link thiệp cho từng khách:
  1. Anh Nguyễn Văn A → code.html?id=1
  2. Chị Trần Thị B   → code.html?id=2
  ...
```

#### Quy tắc:
- **Không có file khách** → bỏ qua hoàn toàn, không tạo guests.js
- **File CSV phải UTF-8** (tiếng Việt có dấu)
- **Columns linh hoạt**: chấp nhận `ID/id/STT`, `Tên/ten/Name`, `Lời mời/loi_moi/Message`
- **Không có `?id`** → giữ nguyên text mẫu (không thay đổi gì)
- **`?id` không hợp lệ** → hiện "Trân trọng kính mời quý khách"
- **guests.js** đặt cùng folder với code.html
- **Giữ file CSV gốc** trong folder (làm record)

### Bước 6: Chụp ảnh tự động bằng Puppeteer

**⚠️ QUAN TRỌNG: KHÔNG chụp screenshot ngay sau khi gen HTML.**

Quy trình:
1. Sau khi gen xong `code.html` + `prompt.txt` + thêm entry `data.js` → **HỎI USER**:
   > "Mẫu đã gen xong. Bạn kiểm tra và cho mình biết khi nào OK để chụp ảnh màn hình nhé!"
2. **Đợi user xác nhận** (user nói "ok", "chụp đi", "gen ảnh", "screenshot"...)
3. Nếu user yêu cầu **sửa** → sửa xong → **hỏi lại**: "Đã sửa xong. Bạn kiểm tra lại, OK thì mình chụp ảnh nhé?"
4. **Lặp lại** bước 2–3 cho đến khi user xác nhận OK
5. Khi user xác nhận → chạy Puppeteer chụp screenshot (desktop + mobile) + convert WebP + cập nhật `images[]` trong `data.js`

Chụp 2–5 viewport 1280x800:

```javascript
node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const folder = '<đường dẫn folder sản phẩm>';
  const filePath = 'file://' + process.cwd() + '/' + folder + '/code.html';

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));

  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  let numShots = Math.min(5, Math.max(2, Math.ceil(pageHeight / 800)));
  const names = ['screen.png', 'anh_1.png', 'anh_2.png', 'anh_3.png', 'anh_4.png'];

  for (let i = 0; i < numShots; i++) {
    const scrollY = i === 0 ? 0 : Math.floor((pageHeight - 800) * (i / (numShots - 1)));
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: folder + '/' + names[i], type: 'png' });
  }

  await browser.close();
  console.log('Done! ' + pageHeight + 'px, ' + numShots + ' screenshots');
})();
"
```

### Bước 6a: Chụp ảnh mobile (iPhone 17 Pro Max)

Chụp 1 ảnh mobile — chỉ initial viewport (hero view), không scroll:

```javascript
node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const folder = '<đường dẫn folder sản phẩm>';
  const filePath = 'file://' + process.cwd().replace(/\\\\/g, '/') + '/' + folder + '/code.html';

  // iPhone 17 Pro Max: 440x956 @3x → output 1320x2868px
  await page.setViewport({ width: 440, height: 956, deviceScaleFactor: 3 });
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));

  await page.screenshot({ path: folder + '/mobile.png', type: 'png' });
  await browser.close();
  console.log('Mobile screenshot done!');
})();
"
```

**Lưu ý:**
- File `mobile.png` sẽ tự convert thành `mobile.webp` ở Bước 6b (script quét tất cả `.png` trong folder)
- `deviceScaleFactor: 3` cho ảnh sắc nét (Retina 3x)
- Một số thiệp có animation phong bì — wait 2s thường đủ để envelope mở xong. Nếu vẫn bị chặn, thêm `await page.click('body')` trước khi chụp

### Bước 6b: Chuyển PNG → WebP + Xoá PNG gốc

```bash
node -e "
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const folder = '<folder>';
const pngs = fs.readdirSync(folder).filter(f => f.endsWith('.png'));
(async () => {
  for (const file of pngs) {
    const input = path.join(folder, file);
    const output = path.join(folder, file.replace('.png', '.webp'));
    await sharp(input).webp({ quality: 80 }).toFile(output);
    fs.unlinkSync(input);
    console.log(file + ' → ' + file.replace('.png', '.webp'));
  }
  console.log('Done! Converted ' + pngs.length + ' files.');
})();
"
```

### Bước 7: Thêm entry vào `data.js`

Chèn trước `];` đóng mảng PRODUCTS:

```javascript
    {
        id: <auto_increment>,
        isPublic: false,
        name: 'Thiệp Cưới - <Tên Chú Rể> & <Tên Cô Dâu>',
        slug: 'thiep-cuoi-<slug>',
        description: 'Thiệp mời đám cưới <phong cách>...',
        category: 'invitation',
        type: 'website',
        tags: ['website', 'invitation', 'wedding', '<đơn|đôi>', '<phong cách>', '<keyword>'],
        // tags gồm: 'thiệp-đơn' hoặc 'thiệp-đôi' tuỳ loại
        price: '',
        images: [
            './<folder>/screen.webp',
            './<folder>/anh_1.webp',
            // ...
        ],
        thumbnail: './<folder>/screen.webp',
        path: './<folder>/',
        demoUrl: './<folder>/code.html',
        features: [
            'Đếm ngược ngày cưới realtime',
            'Nhạc nền lãng mạn',
            'Hiệu ứng hoa rơi / sparkles',
        ],
        status: 'new',
        priority: 0,
        downloads: <random 1-10>,
        rating: <random 4.7-4.9>,
        showInSlider: false,
        updatedAt: '<YYYY-MM-DD>',
    },
```

Cũng cập nhật `assets/data/invitation.json` — thêm entry cho sản phẩm mới:
```json
"<id>": {
    "images": ["./<folder>/screen.webp", "./<folder>/anh_1.webp", ...],
    "mobileView": "./<folder>/mobile.webp",
    "path": "./<folder>/",
    "features": ["...", "...", "..."]
}
```
- Field `mobileView` là đường dẫn đến ảnh mobile, **KHÔNG nằm trong `images[]`** — là field riêng biệt
- Sản phẩm cũ (chưa có `mobile.webp`) sẽ không có field này — code đọc cần check `undefined`
- `data-loader.js` tự merge qua `Object.assign()` nên `product.mobileView` sẽ accessible

**Tags luôn bao gồm**: `'wedding'`, `'invitation'`

**Priority**: luôn `0` khi gen mới. Sort: priority nhỏ lên trước, cùng priority thì ID lớn (mới) lên trước. Chỉ tăng priority (1, 2...) khi user báo sản phẩm fail/kém chất lượng.

### Bước 8: Cập nhật `products/products.md`

Cập nhật bảng tổng hợp + danh sách chi tiết.

### Bước 9: Cập nhật thư viện (nếu có component/animation mới)

- Thêm animation mới vào `products/shared/animations.css`
- Thêm CSS component mới vào `products/shared/wedding/styles.css`
- Thêm JS function mới vào `products/shared/wedding/scripts.js`
- Thêm HTML snippet mới vào `products/shared/wedding/README.md`

### Bước 9b: Gen mã QR (nếu user cung cấp base URL)

Sau khi gen thiệp xong, nếu user cung cấp base URL (domain deploy):

1. Tạo folder `qr/` trong folder sản phẩm
2. Gen QR chung: `qr_chung.png` → link không có `?id`
3. Nếu có `guests.js` → gen QR riêng cho từng khách: `qr_{id}_{slug_tên}.png`
4. Tạo `qr-preview.html` — bảng preview QR (grid 3 cột, để in)

```bash
# Gen QR dùng npm qrcode (đã cài sẵn)
node -e "
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const baseUrl = '<BASE_URL>';
const folder = '<FOLDER>/qr';

// QR chung
QRCode.toFile(path.join(folder, 'qr_chung.png'), baseUrl, { width: 400, margin: 2 });

// Nếu có guests.js → QR từng khách
eval(fs.readFileSync('<FOLDER>/guests.js', 'utf8'));
for (const g of GUEST_LIST) {
    const url = baseUrl + '?id=' + g.id;
    const slug = g.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');
    QRCode.toFile(path.join(folder, 'qr_' + g.id + '_' + slug + '.png'), url, { width: 400, margin: 2 });
}
"
```

**Quy tắc:**
- Chỉ gen khi user cung cấp base URL (hỏi nếu chưa có)
- Basic: chỉ `qr_chung.png` (1 QR)
- Premium/Custom + guests.js: QR riêng cho từng khách
- Output trong folder `qr/` của sản phẩm
- `qr-preview.html` để mở trên browser và in (Ctrl+P)

Chi tiết: xem skill `/gen-qr`

### Bước 10: Báo cáo

```
✅ Đã tạo <N> thiệp cưới:

| # | ID | Tên | Phong cách | Nhạc | Demo |
|---|----|-----|-----------|------|------|
| 1 | 177 | Thiệp Cưới - Minh & Lan | Classic Gold | A Thousand Years | [Xem](demoUrl) |

🎵 Nhạc nền: <tên bài> (folder: wedding/)
🌸 Hiệu ứng: hoa rơi + sparkles
⏱️ Countdown: <ngày cưới>
💌 RSVP form: có
📝 prompt.txt: có — khách điền thông tin để customise
   Ảnh cần: <số> ảnh (anh_bia, anh_doi x3, anh_gallery x6, anh_qr)

📸 **Chưa chụp screenshot** — bạn kiểm tra mẫu và cho mình biết khi nào OK để chụp ảnh nhé!
```

---

## Bảng giá — Phân biệt tính năng theo gói

Khi gen thiệp, xác định gói dịch vụ từ yêu cầu user → bật/tắt tính năng tương ứng.
Nếu user không nói rõ → mặc định **Premium** (đầy đủ nhất, phổ biến nhất).

| Tính năng | Basic (150k) | Premium (199k) | Custom (liên hệ) |
|-----------|:---:|:---:|:---:|
| Chọn mẫu có sẵn | ✅ | ✅ | ✅ |
| Thay tên, ngày, địa điểm, ảnh | ✅ | ✅ | ✅ |
| Phong bì mở thiệp + nhạc nền | ✅ | ✅ | ✅ |
| Countdown đếm ngược | ✅ | ✅ | ✅ |
| Love Story, Gallery + Lightbox | ✅ | ✅ | ✅ |
| Hiệu ứng hoa rơi / sparkles | ✅ | ✅ | ✅ |
| RSVP xác nhận tham dự | ✅ | ✅ | ✅ |
| Gửi lời chúc (Google Sheets) | ✅ | ✅ | ✅ |
| Google Maps + QR mừng cưới | ✅ | ✅ | ✅ |
| Thêm vào lịch (.ics) | ✅ | ✅ | ✅ |
| Responsive mobile | ✅ | ✅ | ✅ |
| Mã QR chia sẻ thiệp (1 mã chung) | ✅ | ✅ | ✅ |
| Video YouTube (lazy load) | ✅ | ✅ | ✅ |
| Group Animations (fade/slide/scale/flip/mix) | ✅ | ✅ | ✅ |
| Chỉnh sửa | 1 lần | 3 lần | Không giới hạn |
| **Lời chúc bay (floating bubbles)** | ❌ | ✅ | ✅ |
| **Cá nhân hoá khách mời (?id=)** | ❌ | ✅ | ✅ |
| **Mã QR riêng từng khách** | ❌ | ✅ | ✅ |
| **Custom nhẹ trên mẫu có sẵn** | ❌ | ✅ | ✅ |
| **Thiết kế giao diện RIÊNG 100%** | ❌ | ❌ | ✅ |
| **Hiệu ứng & animation độc quyền** | ❌ | ❌ | ✅ |
| **Bảng màu, font, layout tuỳ ý** | ❌ | ❌ | ✅ |
| **Video/nhạc riêng** | ❌ | ❌ | ✅ |
| **Chỉnh sửa không giới hạn** | ❌ | ❌ | ✅ |
| **Tư vấn 1:1 + hỗ trợ đến ngày cưới** | ❌ | ❌ | ✅ |

**Quy tắc áp dụng khi gen:**
- User nói "basic" / "gói cơ bản" / "150k" → bỏ floating wishes, bỏ guests.js, QR chỉ 1 mã chung
- User nói "premium" / "đầy đủ" / "199k" hoặc không nói gì → thêm tất cả: floating wishes, guests.js (nếu có CSV), QR riêng, custom nhẹ
- User nói "custom" / "thiết kế riêng" → toàn bộ + thiết kế từ đầu

## Group Animations — Hiệu ứng nhóm items

Khi gen sections có grid/cards (gallery, features, timeline, pricing...), dùng **group animations** từ `products/shared/animations.css`:

| Class parent | Tên | Mô tả |
|-------------|-----|-------|
| `group-fade-in-all` | Fade In All | Tất cả items fade in, stagger delay |
| `group-slide-up-all` | Slide Up All | Tất cả items slide lên, stagger |
| `group-scale-in-all` | Scale In All | Tất cả items scale nhỏ → lớn, stagger |
| `group-flip-in-all` | Flip In All | Tất cả items flip rotateX vào, stagger |
| `group-slide-up-mix` | Slide Up Mix | Mỗi item random hướng (trái/phải/scale/flip/blur) |
| `group-fade-in-mix` | Fade In Mix | Mỗi item random hiệu ứng khác nhau |

**Cách dùng trong code.html:**
```html
<!-- Parent container có class group-* -->
<div class="group-slide-up-all">
    <div class="group-item">Card 1</div>
    <div class="group-item">Card 2</div>
    <div class="group-item">Card 3</div>
</div>
```

**JS bắt buộc** (gán stagger index + random mix):
```javascript
// Stagger index cho All variants
document.querySelectorAll('[class*="group-"] .group-item').forEach(function(el, i) {
    el.style.setProperty('--i', i);
});

// Random class cho Mix variants
var mixClasses = ['mix-fade-up', 'mix-slide-left', 'mix-slide-right', 'mix-scale', 'mix-flip', 'mix-blur'];
document.querySelectorAll('.group-fade-in-mix .group-item, .group-slide-up-mix .group-item').forEach(function(el) {
    el.classList.add(mixClasses[Math.floor(Math.random() * mixClasses.length)]);
});
```

**Gợi ý dùng cho thiệp cưới:**
| Section | Group animation gợi ý |
|---------|----------------------|
| Gallery | `group-fade-in-mix` hoặc `group-scale-in-all` |
| Love Story Timeline | `group-slide-up-all` |
| Event Cards | `group-fade-in-all` |
| Guestbook wishes | `group-slide-up-all` |
| Gift Box cards | `group-scale-in-all` |

**IntersectionObserver cho group** (observe parent, không observe từng item):
```javascript
var groupObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('[class*="group-"]').forEach(function(el) {
    groupObserver.observe(el);
});
```

## Phong cách thiết kế — Quy tắc bắt buộc

Thiệp cưới phải có cảm giác **organic, mềm mại, đa tầng** — KHÔNG được cứng, grid đều, khô khan.

### Layout — So le, đa tầng (BẮT BUỘC)

| Quy tắc | Cách làm |
|---------|---------|
| **Ảnh overlap** | 2 ảnh cạnh nhau phải chồng nhẹ (margin âm -20px~-30px), xoay nhẹ (-2deg/1.5deg) |
| **Cards so le** | Nếu có 2+ cards, card thứ 2 offset (translateX 8px hoặc margin-top 20-30px), xoay nhẹ |
| **Padding không đều** | Section quote/story: padding LỚN (5-7rem). Section info: padding NHỎ (2-3.5rem). Tạo rhythm |
| **Decorative dividers** | Giữa sections: ornament line + icon (❦, ✿, ♡). KHÔNG để sections sát nhau trống trơn |
| **Background texture** | Body có subtle radial-gradient spots (blush/rose, opacity cực thấp 0.03-0.05) |
| **Ảnh fade edge** | Ảnh lớn (hero/big photo) có gradient fade ở bottom (::after overlay) |
| **Curved dividers** | Ít nhất 1-2 section dùng clip-path ellipse/wave thay vì cắt thẳng |
| **Gift cards xoay** | Card 1: rotate(-1deg), card 2: rotate(0.5deg) + margin-top offset |
| **Ảnh peek dưới phong bì** | 2 ảnh nhỏ (110x80px) lấp ló dưới envelope, xoay -8deg/+6deg, viền trắng, shadow |
| **Sử dụng ảnh nhiều hơn** | Không chỉ hero + gallery — rải ảnh ở letter, love story, between sections |
| **Ảnh nền mờ sections** | Dùng ảnh couple làm bg mờ cho story/quote + lịch (opacity 6-8%, blur 2-3px, overlay 85-88%). Lịch: ảnh phía trên + mask fade xuống. Story: ảnh full + overlay |

### Font — Mềm mại, phân cấp rõ (BẮT BUỘC)

| Element | Font | Weight | Style |
|---------|------|--------|-------|
| Tên cặp đôi | **Script** (Great Vibes, Dancing Script, Alex Brush) | 400 | Size lớn clamp(3rem, 10vw, 5rem) |
| Section title | **Serif italic** (Cormorant Garamond italic, Playfair italic) | 500-600 | Thanh lịch |
| Body text | **Sans light** (Quicksand 300, Nunito 300, Be Vietnam Pro 300) | 300-400 | Nhẹ nhàng |
| Label/subtitle | Sans | 300-400 | Size NHỎ (0.6rem), letter-spacing RỘNG (0.3-0.4em), uppercase |
| Quote/thư tay | Serif italic | 400i | Mềm mại, cảm xúc |

**KHÔNG** dùng font-weight 600-700 cho body text. **KHÔNG** dùng font-size đều nhau — phải có contrast lớn/nhỏ rõ ràng.

### Decorative — Thêm chiều sâu (BẮT BUỘC)

- **Ornament dividers** giữa sections: thin line + floral symbol (❦ ✿ ♡ ❊)
- **Quote block**: border-radius lớn (20-24px), shadow mềm, có dấu ngoặc kép `"` decorative (::before/::after)
- **Cards**: KHÔNG border cứng — dùng soft shadow + optional gradient line phía trên (::before)
- **Hero**: subtle radial-gradient glow (::before pseudo, opacity 0.1-0.2)
- **Scroll reveal**: translateY NHỎ (15-20px), duration DÀI (0.8-1s), easing mềm

### Sử dụng ảnh — rải khắp thiệp, không chỉ hero + gallery

Ảnh phải xuất hiện ở NHIỀU chỗ, tạo cảm giác phong phú, sống động:

| Vị trí | Cách dùng |
|--------|-----------|
| Hero / Big photo | Ảnh lớn full-width, gradient fade bottom |
| **Dưới phong bì (peek)** | 2 ảnh nhỏ xoay nghiêng lấp ló dưới envelope — polaroid style |
| **Love story** | Mỗi mốc kèm 1 ảnh nhỏ (tùy chọn) hoặc ảnh minh họa |
| **Giữa sections** | Ảnh strip/banner giữa 2 sections (full-width, height 200px, object-fit cover) |
| **Fly-in / Avatar đôi** | 2 ảnh chú rể + cô dâu overlap nhau, xoay nhẹ |
| Gallery slider | 6 ảnh slider hoặc grid |
| **Thank you / Footer** | Ảnh nền full-width + overlay text |
| **Quote block** | Ảnh nhỏ tròn kèm quote (optional) |

**Pattern: Ảnh peek dưới phong bì:**
```html
<div class="letter-peek-photos">
    <div class="letter-peek-photo"><img src="./couple_5.webp" alt=""></div>
    <div class="letter-peek-photo"><img src="./couple_3.webp" alt=""></div>
</div>
```
```css
.letter-peek-photos {
    position: absolute; bottom: -45px; left: 50%;
    transform: translateX(-50%);
    width: 280px; height: 90px; z-index: 0;
    pointer-events: none;
}
.letter-peek-photo {
    position: absolute; width: 110px; height: 80px;
    border-radius: 6px; overflow: hidden;
    box-shadow: 0 3px 15px rgba(0,0,0,0.1);
    border: 3px solid white;
}
.letter-peek-photo:nth-child(1) { left: 15px; bottom: 0; transform: rotate(-8deg); }
.letter-peek-photo:nth-child(2) { right: 15px; bottom: 5px; transform: rotate(6deg); }
```

### Ví dụ CSS pattern:

```css
/* Ảnh overlap + xoay */
.fly-img:first-child { margin-right: -25px; transform: rotate(-2deg); }
.fly-img:last-child { margin-left: -25px; margin-top: 30px; transform: rotate(1.5deg); }

/* Cards so le */
.info-card:nth-child(2) { transform: translateX(8px); }
.gift-card:first-child { transform: rotate(-1deg); }
.gift-card:last-child { transform: rotate(0.5deg); margin-top: 10px; }

/* Background texture */
body::before {
    content: '';
    position: fixed; inset: 0; z-index: -1; pointer-events: none;
    background: radial-gradient(circle at 20% 30%, rgba(232,180,162,0.04), transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(212,135,143,0.03), transparent 50%);
}

/* Ornament divider */
.section-ornament {
    text-align: center; padding: 1.5rem 0;
    color: var(--blush); font-size: 0.8rem; letter-spacing: 0.5em;
}
.section-ornament::before, .section-ornament::after {
    content: ''; display: inline-block;
    width: 40px; height: 1px; background: var(--blush);
    vertical-align: middle; margin: 0 12px;
}

/* Section padding rhythm */
.section--breathe { padding: clamp(5rem, 12vw, 7rem) 1.5rem; }
.section--compact { padding: clamp(2rem, 5vw, 3.5rem) 1.5rem; }

/* Curved section divider */
.section-curved::before {
    content: ''; position: absolute; top: -30px; left: 0; right: 0;
    height: 60px; background: inherit;
    clip-path: ellipse(55% 100% at 50% 100%);
}
```

### Tham khảo mẫu 179 (`gen_179_blue-romantic-wedding`)

Mẫu 179 là reference design cho phong cách organic. Khi gen mẫu mới, đọc code.html của 179 để tham khảo:
- CSS patterns: overlap, rotation, ornament, rhythm
- HTML structure: section-ornament dividers, wrapper classes
- Font combination: Great Vibes + Cormorant Garamond italic + Quicksand light

## Ràng buộc

- KHÔNG đọc nội dung file ảnh
- KHÔNG thêm dependency ngoài Tailwind CDN, Google Fonts CDN, Lucide Icons CDN
- Mỗi `code.html` phải self-contained, mở được trực tiếp trong browser
- **LUÔN có nhạc nền** — không bao giờ bỏ qua
- **LUÔN có countdown** đến ngày cưới
- **LUÔN có ít nhất 1 hiệu ứng đặc biệt** (hoa rơi/confetti/sparkles/hearts)
- **LUÔN có RSVP form**
- **LUÔN có Love Story timeline**
- Animations smooth, chuyên nghiệp — dùng `cubic-bezier(0.16, 1, 0.3, 1)`
- Font phải hỗ trợ tiếng Việt tốt cho body text
- Ảnh Unsplash phải wedding-themed, không dùng ảnh generic
- Nếu gen nhiều mẫu → mỗi mẫu phải có palette + font + hiệu ứng KHÁC NHAU

### Ràng buộc ảnh — Responsive & Mobile (QUAN TRỌNG)

Ảnh mobile (440x956) sẽ dùng làm thumbnail trên trang products — nên hero view phải đẹp ở cả desktop và mobile.

**Lỗi thường gặp — CẦN TRÁNH:**

1. **Ảnh bị cắt do co kích thước** (KHÔNG chấp nhận):
   - Container có `overflow: hidden` + chiều cao cố định (`height: 300px`) → ảnh lớn bị cắt mất phần quan trọng (mặt người, text)
   - **Fix**: dùng `object-fit: contain` thay `cover` cho ảnh quan trọng (portrait, couple), hoặc dùng `max-height` + `width: auto` thay vì `height` cố định
   - **Fix**: dùng `object-position: top` hoặc `center` để kiểm soát phần hiển thị khi dùng `cover`
   - **Fix**: dùng `aspect-ratio` thay `height` cố định → ảnh co giãn đúng tỷ lệ trên mọi viewport

2. **Ảnh bị vỡ bố cục trên mobile**:
   - Desktop: 2 ảnh cạnh nhau → Mobile: phải stack dọc hoặc thu nhỏ tỷ lệ, KHÔNG để tràn viewport
   - Ảnh absolute position (rotate, overlap) → kiểm tra không bị cắt bởi parent `overflow: hidden` trên mobile
   - **Fix**: media query `@media (max-width: 480px)` cho layout ảnh

3. **Quy tắc CSS cho ảnh trong thiệp:**
   ```css
   /* ✅ Ảnh responsive an toàn */
   img { max-width: 100%; height: auto; }

   /* ✅ Ảnh hero / banner — dùng cover + kiểm soát vùng hiển thị */
   .hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }

   /* ✅ Ảnh portrait couple — giữ nguyên tỷ lệ */
   .couple-img { width: 100%; max-height: 500px; object-fit: contain; }

   /* ✅ Gallery — grid responsive */
   .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px; }
   .gallery-grid img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; }

   /* ❌ TRÁNH — ảnh cố định kích thước */
   .bad { width: 400px; height: 300px; overflow: hidden; } /* → bị cắt trên mobile */
   ```

4. **Kiểm tra trước khi chụp screenshot**: Hero section phải hiển thị đủ tên cặp đôi + ảnh chính + ngày cưới ở viewport 440px wide. Nếu bị cắt → sửa CSS trước khi chụp.

### Ràng buộc font — Load đúng (QUAN TRỌNG)

**Lỗi thường gặp**: Font Google chưa load xong khi chụp screenshot → hiển thị font fallback (serif/sans-serif hệ thống).

1. **Trong HTML — luôn thêm `&display=swap`** trong Google Fonts URL:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=...&display=swap" rel="stylesheet">
   ```

2. **Trong Puppeteer (Bước 6 & 6a) — chờ font load xong**:
   ```javascript
   await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
   await page.evaluate(() => document.fonts.ready);  // ← chờ TẤT CẢ font load
   await new Promise(r => setTimeout(r, 1000));       // buffer thêm cho render
   ```

3. **Font fallback chain** — luôn khai báo đầy đủ:
   ```css
   font-family: 'Great Vibes', 'Dancing Script', cursive;        /* script */
   font-family: 'Cormorant Garamond', 'Playfair Display', serif; /* serif */
   font-family: 'Quicksand', 'Nunito', sans-serif;               /* sans */
   ```

4. **Preload font quan trọng nhất** (heading script):
   ```html
   <link rel="preload" href="https://fonts.gstatic.com/s/greatvibes/v18/RWmMoKWR9v4ksMfaWd_JN-XCg6UKDXlq.woff2" as="font" type="font/woff2" crossorigin>
   ```

## Song song — Quy tắc

- **1 mẫu** → tuần tự, KHÔNG spawn agent
- **2–5 mẫu** → spawn song song, mỗi mẫu 1 agent (cùng 1 message)
- **> 5 mẫu** → chia batch 5
- Tối đa **5 agents đồng thời**
- Mỗi agent tự hoàn thành: HTML + prompt.txt + screenshot + WebP
- **data.js, products.md, animations.css** cập nhật tập trung sau khi tất cả agents xong
- Phân ID trước khi spawn

---

## Quy trình B: Gen theo khách hàng (Customization)

### Khi nào dùng

User bảo một trong các dạng:
- `"gen thiệp theo khách, folder: products/Web/Invitation/khach_minh_lan/"`
- `"gen thiệp cưới từ folder khách: ..."`
- `"customise mẫu #177 theo folder: ..."`

### Cấu trúc folder khách

Khách (hoặc user) chuẩn bị folder chứa:

```
khach_ten_co_dau_chu_re/
├── prompt.txt          ← đã điền thông tin (copy từ mẫu gốc)
├── anh_bia.jpg         ← ảnh khách gửi (tuỳ chọn)
├── anh_doi_1.jpg       ← ảnh couple (tuỳ chọn)
├── anh_doi_2.jpg
├── anh_gallery_1.jpg   ← ảnh gallery (tuỳ chọn)
├── anh_gallery_2.jpg
├── anh_qr.jpg          ← QR mừng cưới (tuỳ chọn)
└── ...
```

### Quy trình chi tiết

#### Bước B1: Đọc folder khách

1. `ls` folder → liệt kê tất cả file
2. Đọc `prompt.txt` → parse thông tin:
   - **Mã mẫu** → tìm folder mẫu gốc (VD: `#177` → `products/Web/Invitation/gen_177_xxx/`)
   - **Thông tin cặp đôi**: tên chú rể, cô dâu, ngày cưới, giờ
   - **Thông tin gia đình**: bố mẹ 2 bên
   - **Thông tin lễ cưới**: ngày giờ, địa điểm, địa chỉ
   - **Love story**: các mốc (ngày, tiêu đề, mô tả)
   - **Google Sheets**: sheet_id cho lời chúc, sheet_id cho RSVP (nếu có)
   - **Tuỳ chọn**: nhạc, lời chúc, dresscode, link maps, video, ghi chú
3. Liệt kê ảnh khách gửi → map với tên file quy ước

#### Bước B2: Đọc mẫu gốc

1. Tìm mẫu gốc theo mã mẫu trong `prompt.txt`
2. Đọc `code.html` của mẫu gốc → làm base template
3. Nếu không tìm thấy mẫu → thông báo lỗi, hỏi user

#### Bước B3: Gen code.html cho khách

Dựa trên `code.html` mẫu gốc, **thay thế** nội dung:

| Nội dung | Thay bằng | Nếu trống |
|----------|-----------|-----------|
| Tên chú rể & cô dâu | Tên từ prompt | Giữ tên mẫu |
| Ngày cưới + countdown | Ngày từ prompt | Giữ ngày mẫu |
| Giờ làm lễ | Giờ từ prompt | Giữ giờ mẫu |
| Tên bố mẹ | Tên từ prompt | Giữ mẫu hoặc bỏ dòng |
| Địa điểm lễ cưới | Địa điểm từ prompt | Giữ mẫu |
| Love story | Các mốc từ prompt | Giữ nội dung mẫu |
| Ảnh Unsplash | → `./anh_bia.jpg` ... | Giữ ảnh Unsplash mẫu |
| Nhạc nền | File nhạc khách chọn | Giữ nhạc mẫu |
| Lời chúc / quote | Nội dung khách | Giữ mẫu |
| Sheet ID (wishes) | sheet_id từ prompt | Giữ mẫu hoặc form UI-only |
| Sheet ID (RSVP) | sheet_id từ prompt | Giữ mẫu hoặc form UI-only |
| Link Google Maps | Link từ prompt | Bỏ hoặc giữ mẫu |
| Video YouTube | Link từ prompt | Bỏ section |

**Quy tắc thay ảnh:**
- Quét folder khách → tìm file ảnh match tên quy ước (`anh_bia.*`, `anh_doi_1.*`, ...)
- Nếu có → thay URL Unsplash → relative path `./anh_bia.jpg`
- Nếu không có → **giữ nguyên ảnh Unsplash** của mẫu
- Hỗ trợ cả `.jpg`, `.jpeg`, `.png`, `.webp`

```
Ví dụ thay thế trong code.html:
- src="https://images.unsplash.com/photo-xxx?w=1920" → src="./anh_bia.jpg"
- src="https://images.unsplash.com/photo-yyy?w=600" → src="./anh_doi_1.jpg"
```

#### Bước B4: Ghi file

1. Ghi `code.html` vào folder khách (OVERWRITE nếu đã có)
2. **KHÔNG chụp screenshot ngay** — hỏi user kiểm tra trước (giống Bước 6)
3. Khi user xác nhận OK → chạy Puppeteer chụp screenshot desktop + mobile + convert WebP

#### Bước B5: Thêm vào data.js

Thêm entry mới (KHÔNG thay thế mẫu gốc):

```javascript
    {
        id: <auto_increment>,
        isPublic: false,
        name: 'Thiệp Cưới - <Tên Chú Rể> & <Tên Cô Dâu>',
        slug: 'thiep-cuoi-<slug>',
        description: 'Thiệp mời đám cưới của <tên>...',
        category: 'invitation',
        type: 'website',
        tags: ['website', 'invitation', 'wedding', 'custom', '<phong-cách>'],
        // tag 'custom' để phân biệt với mẫu gốc
        price: '',
        images: ['./<folder-khách>/screen.webp', ...],
        thumbnail: './<folder-khách>/screen.webp',
        path: './<folder-khách>/',
        demoUrl: './<folder-khách>/code.html',
        features: [...],   // copy từ mẫu gốc
        status: 'new',
        priority: 0,
        downloads: <random 1-10>,
        rating: <random 4.7-4.9>,
        showInSlider: false,
        updatedAt: '<YYYY-MM-DD>',
    },
```

Cũng cập nhật `assets/data/invitation.json` — thêm entry với `mobileView` (giống Bước 7).

#### Bước B6: Báo cáo

```
✅ Đã gen thiệp cưới cho khách:

| Thông tin | Giá trị |
|-----------|---------|
| Mẫu gốc | #{id_mẫu} — {tên mẫu} |
| Cặp đôi | {tên chú rể} & {tên cô dâu} |
| Ngày cưới | {dd/mm/yyyy} |
| Ảnh khách | {N} ảnh (thay thế {M} vị trí) |
| Ảnh mẫu | Giữ {K} vị trí (khách không gửi) |
| Nhạc | {tên bài} |
| Folder | {đường dẫn} |
| Demo | [Xem]({demoUrl}) |

📸 **Chưa chụp screenshot** — bạn kiểm tra mẫu và cho mình biết khi nào OK để chụp ảnh nhé!
```

### Ràng buộc Quy trình B

- **KHÔNG xoá/sửa mẫu gốc** — luôn tạo file mới trong folder khách
- **KHÔNG copy ảnh** — dùng relative path đến ảnh trong folder khách
- Nếu khách không điền field → **giữ nguyên nội dung mẫu**, không để trống
- Nếu khách không gửi ảnh nào → **giữ nguyên ảnh Unsplash** của mẫu
- **Nhạc**: nếu khách chọn nhạc khác → đổi relative path, nếu trống → giữ nhạc mẫu
- Tag `'custom'` trong entry data.js để phân biệt sản phẩm custom vs mẫu
- `prompt.txt` trong folder khách giữ nguyên (không xoá) — làm record thông tin

---

## Lưu ý quan trọng khi dùng ảnh shared assets

**Ảnh webp (chibi, corner, divider, icon, element) từ `products/shared/` thường có nền trắng/nhạt KHÔNG hoàn toàn transparent.** Khi đặt lên nền có màu (gradient, cream, pink...) sẽ lộ viền vuông ở cả 4 cạnh.

**Giải pháp ưu tiên:**

1. **SVG inline** cho corners/dividers — KHÔNG bao giờ bị lộ viền, màu theo CSS `currentColor`
2. **Nếu buộc dùng webp**: gom 1 CSS rule chung cho TẤT CẢ ảnh shared, fade cả 4 cạnh:

```css
/* Gom tất cả ảnh shared webp — fade 4 cạnh */
.env-chibi,
.env-divider,
.hero-chibi,
.closing-chibi,
.divider-img,
.event-flower,
.family-sep img {
  -webkit-mask-image: radial-gradient(ellipse 75% 75% at center, black 45%, transparent 95%);
  mask-image: radial-gradient(ellipse 75% 75% at center, black 45%, transparent 95%);
}
```

**Tên bố mẹ trong section Gia Đình:** Chỉ ghi "Ông/Bà + Họ tên". KHÔNG ghi chú thích "Thân phụ", "Thân mẫu", "Cha", "Mẹ", "Bố" — thừa vì đã có label "Nhà Trai"/"Nhà Gái".
