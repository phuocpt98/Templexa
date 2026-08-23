# Products Data

## Cau truc thu muc san pham

```
products/
├── Google-sheet/           # Mau Google Sheet (type: google-sheet)
│   ├── E-commerce/         # 5 san pham
│   ├── Education/          # (trong)
│   └── Portfolio/          # (trong)
├── Web/                    # Mau Web (type: website)
│   ├── E-commerce/         # 38 san pham
│   ├── Education/          # 30 san pham
│   ├── Onepage/            # 26 san pham
│   └── Portfolio/          # 24 san pham
├── Invitation/             # Mau Thiep moi (type: invitation)
│   ├── Wedding/            # 28 san pham (thiep cuoi)
│   └── Other/              # 39 san pham (sinh nhat, ky niem, le hoi, confession)
├── images/                 # Anh mockup dung chung
├── data.csv                # File CSV quan ly san pham
└── products.md             # File nay
```

## Tong hop

| Loai chinh | Loai nho | Tong | Public |
|------------|----------|------|--------|
| **Invitation** | other | 54 | 44 |
| **Invitation** | wedding | 81 | 50 |
| **Web** | e-commerce | 33 | 33 |
| **Web** | education | 31 | 31 |
| **Web** | onepage | 26 | 26 |
| **Web** | portfolio | 25 | 25 |
| **Google-sheet** | e-commerce | 5 | 5 |
| | **Tong** | **255** | **214** |

_Cap nhat tu data.js: 2026-08-23 — chay `node scripts/build-products-md.js` de sinh lai._

---

## Quy trinh them/cap nhat san pham

### Cach 1: Quet truc tiep tu folder (nhanh nhat)

User chi can:
1. Them folder san pham vao dung vi tri
2. Bao AI: **"quet giup toi `products/{Loai}/{Loai-nho}/{folder_name}` them vao data.js"**

AI se tu dong:
- Quet folder → lay danh sach anh, kiem tra `index.html`
- Doc `<title>` trong `index.html` de lay mo ta
- Sinh product entry day du → chen vao `data.js`
- Cap nhat `products.md`

### Cach 2: Quet qua data.csv (quet hang loat)

```
Member them folder san pham
        ↓
Dien thong tin vao data.csv (toi thieu: name + path)
        ↓
Bao AI: "quet lai data.csv vao data.js"
        ↓
AI doc data.csv → quet folder → merge → ghi vao data.js
```

### Cau truc folder san pham

```
products/{Loai}/{Loai-nho}/{folder_name}/
├── index.html              (bat buoc voi type=website/invitation)
├── thumbnail.png/jpg       (anh chinh — hien thi tren grid)
├── anh_1.png               (anh phu — hien thi trong gallery)
├── Screenshot_1.jpg        (tuy chon)
└── ...                     (file khac: music.mp3, video, ...)
```

### Cau truc folder tong

| Loai chinh | Loai nho (category) | type trong data.js |
|------------|--------------------|--------------------|
| `Web` | `E-commerce`, `Education`, `Invitation`, `Onepage`, `Portfolio` | `website` |
| `Google-sheet` | `E-commerce`, `Education`, `Portfolio` | `google-sheet` |
| `Invitation` | `Wedding`, `Other` | `invitation` |

### Quy tac xac dinh type va category tu folder

| Duong dan folder | `type` | `category` |
|-----------------|--------|-----------|
| `products/Web/{Loai-nho}/...` | `website` | Loai-nho (lowercase): `e-commerce`, `education`, ... |
| `products/Google-sheet/{Loai-nho}/...` | `google-sheet` | Loai-nho (lowercase) |
| `products/Invitation/{Loai-nho}/...` | `invitation` | Loai-nho (lowercase): `wedding`, `other` |

### Quy tac quet anh

1. Quet tat ca file anh trong folder: `*.png`, `*.jpg`, `*.jpeg`, `*.gif`, `*.svg`, `*.webp`
2. **KHONG doc noi dung anh** — chi lay duong dan (link)
3. Thu tu uu tien thumbnail: `thumbnail.png` > `thumbnail.jpg` > `screen.png` > file anh dau tien
4. Mang `images[]`: thumbnail truoc, roi cac anh phu theo thu tu ten file
5. File khong phai anh (`.html`, `.mp3`, `.css`, `.js`) → bo qua

### Cac field tu sinh khi quet

| Field | Cach sinh |
|-------|----------|
| `id` | Tu tang tu ID lon nhat trong data.js + 1 |
| `name` | Lay tu `<title>` trong index.html, hoac chuyen folder name thanh Title Case |
| `slug` | Sinh tu `name` (kebab-case) |
| `description` | Sinh tu category + name, hoac lay tu `<meta description>` |
| `category` | Loai-nho tu duong dan folder (lowercase) |
| `type` | Loai chinh tu duong dan folder: `Web`→`website`, `Google-sheet`→`google-sheet`, `Invitation`→`invitation` |
| `tags` | Sinh tu type + category + keywords trong name |
| `price` | Mac dinh `free` |
| `images` | Quet file anh trong folder |
| `thumbnail` | Anh uu tien theo quy tac tren |
| `path` | `./products/{Loai}/{Loai-nho}/{folder_name}/` |
| `demoUrl` | Co `index.html` → `{path}index.html`, khong co → `''` |
| `features` | 3 tinh nang sinh theo noi dung index.html |
| `status` | Mac dinh `new` |
| `priority` | Tu tang |
| `downloads` | Random 1-10 |
| `rating` | Random 4.7-4.9 |
| `showInSlider` | Mac dinh `false` |
| `updatedAt` | Ngay hien tai |

### Quy tac uu tien khi merge (CSV)

```
DU LIEU TRONG data.csv  >  DU LIEU TU QUET FOLDER  >  GIA TRI MAC DINH
```

1. **CSV co gia tri** → dung gia tri trong CSV (khong quet lai)
2. **CSV de trong** → AI quet folder de sinh gia tri tu dong
3. **Khong quet duoc** → dung gia tri mac dinh

### Cap nhat / Xoa san pham

- **Cap nhat**: sua data.csv hoac bao AI sua truc tiep trong data.js
- **Xoa**: bao AI xoa theo id/name, hoac xoa dong trong data.csv roi quet lai

### Luu y

- Luu data.csv voi **UTF-8 BOM** de hien thi tieng Viet dung trong Excel
- Cac truong mang (tags, images, features) dung dau `|` de ngan cach trong CSV
- Dong file data.csv truoc khi bao AI quet (tranh loi EBUSY)
- Ten folder/file co the co tieng Viet va khoang trang — xu ly binh thuong trong JS
- Sau khi quet xong, AI cap nhat lai products.md (so luong, danh sach)

---

## Danh sach san pham

### Invitation / other (54)

| ID | Ten | Folder | Style / Event | Trang thai |
|----|-----|--------|---------------|------------|
| 98 | Trang thiệp mời sinh nhật phong cách neon hiện đại | `Invitation/Other/Done_8_web_desktop_birthday_modern neon birrthday invite` | birthday | public |
| 99 | Trang thiệp mời sinh nhật 1 tuổi của Leo (chủ đề Wild One) | `Invitation/Other/Done_9_web_desktop_birthday_whimsical first birthday invite` | birthday | public |
| 100 | Trang thiệp mời sinh nhật 30 tuổi phong cách hiện đại rực rỡ | `Invitation/Other/Done_10_web_desktop_birthday_modern vibrant 30th birthday` | birthday | public |
| 101 | Trang thiệp mời sinh nhật Leo chủ đề Safari | `Invitation/Other/Done_11_web_desktop_birthday_whimsical illustrated kids birthday` | birthday | public |
| 102 | Trang thiệp mời sinh nhật 21 tuổi của Leo | `Invitation/Other/done_12_web_desktop_birthday_vibrant 21st birthday` | birthday | public |
| 103 | Trang thiệp mời kỷ niệm 25 năm ngày cưới (Silver Jubilee) | `Invitation/Other/Done_13_web_desktop_annivesary_silver anniversary` | anniversary | public |
| 104 | Trang thiệp mời kỷ niệm 10 năm thành lập công ty | `Invitation/Other/Done_14_web_desktop_annivesary_corporate 10th anniversary` | anniversary | public |
| 105 | Trang thiệp mời kỷ niệm 50 năm ngày cưới Margaret & John | `Invitation/Other/Done_15_web_desktop_annivesary_golden anniversary` | anniversary | public |
| 106 | Trang thiệp mời khai mạc triển lãm “New Horizons” | `Invitation/Other/Done_16_web_desktop_annivesary_arrt gallery opening invite` | anniversary | public |
| 107 | Trang thiệp mời họp lớp THPT niên khóa 2005 | `Invitation/Other/Done_17_web_desktop_annivesary_high school reunion` | reunion | public |
| 108 | Trang thiệp mời dạ tiệc gây quỹ Hope Gala 2024 | `Invitation/Other/Done_18_web_desktop_annivesary_charity gala invitation` | anniversary | public |
| 109 | Trang thiệp mời dạ tiệc Giáng Sinh tối giản hiện đại | `Invitation/Other/Done_19_web_desktop_holiday_modern minimalist christmas gala` | holiday | public |
| 110 | Trang thiệp mời tiệc Giáng Sinh phong cách Retro thập niên 50 | `Invitation/Other/Done_20_web_desktop_holiday_retro 50s christmas party invite` | holiday | public |
| 111 | Trang thiệp mời tiệc lễ hội sang trọng | `Invitation/Other/Done_21_web_desktop_holiday_luxury gold & charcoal` | holiday | public |
| 112 | Trang thiệp mời Giáng Sinh phong cách cabin mộc mạc | `Invitation/Other/Done_22_web_desktop_holiday_rustic cozy cabin christmas` | holiday | public |
| 113 | Trang thiệp mời workshop Giáng Sinh cho trẻ em | `Invitation/Other/Done_23_web_desktop_holiday_interactive kids christmas workshop` | holiday | public |
| 114 | Trang thiệp mời tiệc Giáng Sinh “Mùa Lễ Hội Đáng Nhớ” | `Invitation/Other/Done_24_web_desktop_holiday_festive christmas party` | holiday | public |
| 115 | Trang thiệp mời tiệc mừng Tết Nguyên Đán | `Invitation/Other/Done_25_web_desktop_holiday_lunar new year celebration` | holiday | public |
| 116 | Trang thiệp mời tiệc biển mùa hè 2024 | `Invitation/Other/Done_26_web_desktop_holiday_summer beach bash` | holiday | public |
| 117 | Trang thiệp mời kỳ nghỉ “Winter Wonderland” | `Invitation/Other/Done_27_web_desktop_holiday_winter wonderland retreat` | holiday | public |
| 118 | Trang thiệp mời lễ hội mùa thu (Harvest Festival) | `Invitation/Other/Done_28_web_desktop_holiday_autum harvest festival` | holiday | public |
| 119 | Trang thiệp mời tiệc Spring Break phong cách nhiệt đới | `Invitation/Other/Done_29_web_desktop_holiday_tropical spring break` | holiday | public |
| 149 | Rồi Ai Sẽ Ngắm Pháo Hoa | `Invitation/Other/rồi ai sẽ ngắm pháo hoa` | confession | public |
| 151 | Happy White Day 14/3 — Lời Yêu Thương Dành Cho Em | `Invitation/Other/gen_151_white-day-14-3` | confession | public |
| 157 | Thiệp Tỏ Tình "Gửi Anh" — Thư Tình Ngày 14/3 | `Invitation/Other/gen_157_white-day-love-letter-thuy` | confession | public, 5 variants |
| 158 | Thiệp Tỏ Tình "Gửi Em" — Thư Tình Ngày 14/3 | `Invitation/Other/gen_158_white-day-love-manh` | confession | public, 2 variants |
| 159 | Câu Chuyện Của Đôi Mình | `Invitation/Other/gen_159_white-day-our-story` | confession | public |
| 160 | Thiệp Tỏ Tình — Nhật Ký Tình Yêu | `Invitation/Other/gen_160_white-day-love-diary` | confession | public, 2 variants |
| 161 | Ngàn Lời Yêu Thương | `Invitation/Other/gen_161_white-day-thousand-words` | confession | public |
| 162 | Mãi Bên Nhau | `Invitation/Other/gen_162_white-day-together-forever` | confession | public |
| 163 | Hành Trình Yêu Thương | `Invitation/Other/gen_163_white-day-love-journey` | confession | public |
| 164 | Em Ơi... Anh Có Điều Muốn Nói | `Invitation/Other/gen_164_love-confession-playful` | confession | public |
| 165 | Gửi Anh — Quỳnh Quỳnh | `Invitation/Other/gen_165_white-day-quynh-quynh` | confession | hidden |
| 166 | Gửi Anh — Nguyễn Minh Huyền | `Invitation/Other/gen_166_white-day-minh-huyen` | confession | hidden |
| 167 | Gửi Anh — Hà Thu | `Invitation/Other/gen_167_white-day-ha-thu` | confession | hidden |
| 168 | Nhật Ký Gửi Anh — Thanh Phương | `Invitation/Other/gen_168_white-day-thanh-phuong` | confession | hidden |
| 169 | Gửi Anh — Đỗ Trang | `Invitation/Other/gen_169_white-day-do-trang` | confession | hidden |
| 170 | Gửi Em — Nguyễn Thế Đức | `Invitation/Other/gen_170_white-day-the-duc` | confession | hidden |
| 226 | Thiệp Đầy Tháng - Bé Bảo Pastel Cute | `Invitation/Other/gen_226_day-thang-be-bao-cute` | thoi-noi | public |
| 227 | Thiệp Sinh Nhật 30 - Gold Luxury Black Tie | `Invitation/Other/gen_227_sinh-nhat-30-gold-luxury` | birthday | hidden |
| 228 | Thiệp Kỷ Niệm 10 Năm Cưới - Warm Vintage | `Invitation/Other/gen_228_ky-niem-10-nam-cuoi-warm-vintage` | anniversary | hidden |
| 229 | Thiệp Sinh Nhật Ty Ni - White Gold Bling Bling | `Invitation/Other/khach_2` | birthday | public |
| 231 | Thiệp Thôi Nôi - Bé Mimi Pastel Dreamy | `Invitation/Other/gen_231_thoi-noi-be-mimi-pastel` | thoi-noi | public |
| 234 | Thiệp Đầy Tháng - Little Sailor Adventure | `Invitation/Other/gen_234_day-thang-sailor-adventure` | thoi-noi | public |
| 236 | Thiệp Mời Lễ Tốt Nghiệp Mầm Giáo | `Invitation/Other/thiep-tot-nghiep-mau-giao` | anniversary | public |
| 237 | Thiệp Mời Họp Lớp — Sổ Liên Lạc Retro | `Invitation/Other/gen_237_hop-lop-so-lien-lac-retro` | reunion | public |
| 238 | Thiệp Liên Hoan Gặp Mặt — Cuốn Phim Tuổi Học Trò | `Invitation/Other/gen_237_lien-hoan-phim-retro` | reunion | public |
| 239 | Thiệp Liên Hoan Gặp Mặt — Bảng Tin Lớp Học | `Invitation/Other/gen_237_lien-hoan-bang-tin` | reunion | public |
| 240 | Thiệp Liên Hoan Gặp Mặt — Trang Trọng | `Invitation/Other/gen_237_lien-hoan-trang-trong` | reunion | public |
| 249 | Thiệp Giỗ Tổ Dòng Họ — Thiệp Cuộn | `Invitation/Other/gen_247_gio-to-ho-do` | gio-to | public |
| 250 | Thiệp Giỗ Tổ Dòng Họ — Hoành Phi | `Invitation/Other/gen_247_gio-to-ho-do` | gio-to | public |
| 251 | Thiệp Giỗ Tổ Dòng Họ — Kim Tối Giản | `Invitation/Other/gen_247_gio-to-ho-do` | gio-to | public |
| 267 | Thiệp Sinh Nhật Bé — Bear Party Pastel | `Invitation/Other/gen_267_sinh-nhat-be-bear-party` | birthday | hidden |
| 268 | Thiệp Thôi Nôi Bé — Bunny & Cloud Pastel | `Invitation/Other/gen_268_thoi-noi-be-bunny-cloud` | thoi-noi | hidden |

### Invitation / wedding (81)

| ID | Ten | Folder | Style / Event | Trang thai |
|----|-----|--------|---------------|------------|
| 91 | Trang thiệp mời đám cưới hoa cổ điển | `Invitation/Wedding/Done_1_web_desktop_wedding_classic floral wedding invitaion` | vintage / wedding | public |
| 92 | Trang thiệp mời đám cưới Boho của Sara & David | `Invitation/Wedding/Done_2_web_desktop_wedding_boho chic wedding invite` | modern / wedding | public |
| 93 | Trang save the date phong cách lan tím sang trọng | `Invitation/Wedding/Done_3_web_desktop_wedding_luxury dark orchid invite` | luxury / wedding | public |
| 94 | Trang thiệp mời cưới tối giản kiểu editorial (A + J) | `Invitation/Wedding/Done_4_web_desktop_wedding_minimalist editorial wedding invation` | minimalist / wedding | public |
| 95 | Trang thiệp mời tiệc sang trọng Mary & Anno | `Invitation/Wedding/Done_5_web_desktop_wedding_lxxury dark mode celebration landing page` | luxury / wedding | public |
| 96 | Trang thiệp mời đám cưới Mary & Anno | `Invitation/Wedding/Done_6_web_desktop_wedding_soft romantic floral wedding landing page` | floral / wedding | public |
| 97 | Trang thiệp mời đám cưới Marcus & Elena | `Invitation/Wedding/Done_7_web_desktop_wedding_elegant wedding invitation` | modern / wedding | public |
| 152 | Thiệp Cưới Classic Elegant — Minh Khang & Thu Hà | `Invitation/Wedding/gen_152_wedding-classic-elegant` | luxury / wedding | public |
| 153 | Thiệp Cưới Rustic Garden — Đức Anh & Ngọc Linh | `Invitation/Wedding/gen_153_wedding-rustic-garden` | floral / wedding | public |
| 154 | Thiệp Cưới Modern Minimalist — Hoàng Nam & Thuỳ Dung | `Invitation/Wedding/gen_154_wedding-modern-minimalist` | minimalist / wedding | public |
| 155 | Thiệp Cưới Romantic Blush — Quốc Bảo & Thanh Trúc | `Invitation/Wedding/gen_155_wedding-romantic-blush` | floral / wedding | public |
| 156 | Thiệp Cưới Tropical Luxe — Hải Đăng & Kiều My | `Invitation/Wedding/gen_156_wedding-tropical-luxe` | luxury / wedding | public |
| 171 | Thiệp Mời Cưới - Minh Anh & Thùy Linh | `Invitation/Wedding/gen_171_wedding-invitation-elegant` | modern / wedding | public |
| 173 | Thiệp Cưới Tương Tác - Hoàng Nam & Ngọc Mai | `Invitation/Wedding/gen_173_wedding-card-interactive` | modern / wedding | hidden |
| 175 | Cuốn Phim Ký Ức — Thiệp Cưới Vintage | `Invitation/Wedding/gen_175_cuon-phim-ky-uc-wedding` | floral / wedding | public, 2 variants |
| 176 | Chuyện Của Đôi Mình — Thiệp Cưới Tươi Sáng | `Invitation/Wedding/gen_176_fresh-bright-wedding` | modern / wedding | hidden |
| 178 | Thiệp Cưới Truyền Thống - Song Long Đỏ | `Invitation/Wedding/gen_178_traditional-red-wedding` | traditional / wedding | public |
| 179 | Thiệp Cưới - Blue Romantic | `Invitation/Wedding/gen_179_blue-romantic-wedding` | modern / wedding | public |
| 180 | Thiệp Cưới Modern Blue Romantic | `Invitation/Wedding/gen_180_modern-blue-romantic` | modern / wedding | public, 2 variants |
| 181 | Thiệp Cưới Cinelove Style — Modern Blue | `Invitation/Wedding/gen_181_modern-blue-romantic` | modern / wedding | hidden |
| 182 | Thiệp Cưới Burgundy Romantic Story | `Invitation/Wedding/gen_182_burgundy-romantic-story` | luxury / wedding | hidden |
| 183 | Thiệp Cưới Elegant Black & Gold | `Invitation/Wedding/gen_181_elegant-black-gold-wedding` | luxury / wedding | public, trending |
| 184 | Thiệp Cưới Modern Romantic (3 màu) | `Invitation/Wedding/gen_184_modern-romantic-wedding` | modern / wedding | public, 3 variants |
| 185 | Thiệp Cưới Coral Minimalist | `Invitation/Wedding/gen_185_coral-minimalist-wedding` | minimalist / wedding | public |
| 186 | Thiệp Cưới Long Phụng Đỏ — Cổ Điển Việt Nam | `Invitation/Wedding/gen_clone_long-phung-do` | traditional / wedding | public, trending |
| 187 | Thiệp Cưới Chibi Đỏ — Dễ Thương Truyền Thống | `Invitation/Wedding/gen_clone_chibi-red` | traditional / wedding | public, 2 variants |
| 188 | Thiệp Cưới Rèm Đỏ — Burgundy & Gold Sang Trọng | `Invitation/Wedding/thiep-cuoi-rem-do` | luxury / wedding | public |
| 189 | Thiệp Cưới - Korean 90s Classic Beige | `Invitation/Wedding/gen_189_korean-90s-classic-beige` | minimalist / wedding | public |
| 190 | Thiệp Cưới - Viet Green Fresh | `Invitation/Wedding/gen_190_viet-green-fresh` | modern / wedding | public, featured, 2 variants |
| 191 | Thiệp Cưới - Việt Mềm Mại Hỷ | `Invitation/Wedding/gen_191_viet-mem-mai-hy` | traditional / wedding | hidden, featured |
| 192 | Thiệp Cưới - Phúc & Thảo Navy Lavender | `Invitation/Wedding/gen_192_navy-lavender-elegant` | luxury / wedding | hidden |
| 193 | Thiệp Cưới #193 Modern Romantic Red (Tuấn & Hương) | `Invitation/Wedding/gen_193_modern-romantic-red` | modern / wedding | hidden |
| 194 | Thiệp Cưới - Modern Romantic White (Burgundy & Gold) | `Invitation/Wedding/gen_194_modern-romantic-white` | luxury / wedding | hidden |
| 197 | Thiệp Cưới Sage Green — Hoàng Phúc & Phương Anh | `Invitation/Wedding/khach_1_v3` | minimalist / wedding | hidden |
| 198 | Thiệp Cưới - Trọng Nghĩa & Thu Thuỷ | `Invitation/Wedding/khach_1_v1` | floral / wedding | hidden |
| 199 | Thiệp Cưới Chibi - Bảo & Ánh | `Invitation/Wedding/chibi demo` | traditional / wedding | hidden |
| 200 | Thiệp Cưới Valentine Pink Romantic | `Invitation/Wedding/gen_200_valentine-pink-romantic` | floral / wedding | public |
| 201 | Thiệp Cưới - Red Traditional Curtain | `Invitation/Wedding/gen_200_red-traditional-curtain` | traditional / wedding | public |
| 202 | Thiệp Cưới Miinso Minimalist White | `Invitation/Wedding/gen_202_miinso-minimalist-white` | minimalist / wedding | public |
| 203 | Thiệp Cưới - Weddingday Traditional | `Invitation/Wedding/gen_202_weddingday-clone` | traditional / wedding | public |
| 204 | Thiệp Ăn Hỏi — Truyền Thống Đỏ Vàng | `Invitation/Wedding/gen_204_an-hoi-traditional-red-gold` | traditional / an-hoi | public, trending |
| 210 | Thiệp Cưới Sage Green Vintage — Quang Huy & Thanh Hằng | `Invitation/Wedding/gen_198_sage-green-vintage-wedding` | floral / wedding | public, featured, bestseller, 10 variants |
| 211 | Thiệp Cưới Blush Romantic — Viết & Trang Hoa | `Invitation/Wedding/gen_211_viet-trang-hoa` | floral / wedding | public, featured, bestseller |
| 212 | Thiệp Cưới Cinematic Light & Shadow Editorial | `Invitation/Wedding/gen_212_cinematic-light-shadow-editorial` | luxury / wedding | hidden |
| 213 | Thiệp Cưới Chibi Hoa Pastel Dễ Thương | `Invitation/Wedding/gen_213_chibi-floral-pastel-cute` | floral / wedding | public, featured, trending |
| 214 | Thiệp Cưới Đông Phương Mộng Mơ — Việt Phục | `Invitation/Wedding/gen_214_dong-phuong-mong-mo` | traditional / wedding | public, featured |
| 215 | Thiệp Cưới Song Hỷ — Double Happiness | `Invitation/Wedding/gen_215_double-happiness-song-hy` | traditional / wedding | public, featured, bestseller |
| 216 | Thiệp Cưới Hoa Trắng Mộng Mơ | `Invitation/Wedding/gen_215_white-floral-dream` | floral / wedding | public, featured, 2 variants |
| 217 | Thiệp Cưới Garden Gate — Cổng Vườn Xanh | `Invitation/Wedding/gen_216_garden-gate-outdoor` | floral / wedding | public, featured, bestseller, 2 variants |
| 218 | Thiệp Cưới Silk Veil — Ethereal Dreamy | `Invitation/Wedding/gen_218_silk-veil-ethereal` | luxury / wedding | public, featured |
| 219 | Thiệp Cưới Porcelain Bloom — Kintsugi | `Invitation/Wedding/gen_219_porcelain-bloom-kintsugi` | luxury / wedding | public, featured, bestseller |
| 220 | Thiệp Cưới Midnight Sapphire Luxury | `Invitation/Wedding/gen_220_midnight-sapphire-luxury` | luxury / wedding | hidden |
| 221 | Thiệp Cưới Sage Green Emboss — Giấy Hoa Nổi | `Invitation/Wedding/gen_221_sage-green-emboss-paper` | floral / wedding | hidden |
| 222 | Love Story Slide — Câu Chuyện Của Chúng Mình | `Invitation/Wedding/gen_222_love-story-slide-interactive` | modern / wedding | hidden |
| 223 | Blanc Atelier — Fashion Editorial | `Invitation/Wedding/gen_223_blanc-atelier-editorial` | luxury / wedding | hidden |
| 224 | Crystal Chandelier — Tiệc Cưới Pha Lê | `Invitation/Wedding/gen_224_crystal-chandelier-luxury` | luxury / wedding | hidden |
| 225 | Thiệp Cưới - Heritage Illustrated Venue | `Invitation/Wedding/gen_225_heritage-illustrated-venue` | traditional / wedding | public, featured, bestseller |
| 233 | Thiệp Cưới Pink Pastel Korean | `Invitation/Wedding/gen_233_cuoi-pink-pastel-korean` | modern / wedding | public |
| 235 | Thiệp Cưới - Pink Pastel | `Invitation/Wedding/gen_235_cuoi-cinelove-pink-pastel` | traditional / wedding | public |
| 241 | Thiệp Cưới Vintage Phong Bì Lá — Khung Phim | `Invitation/Wedding/khach_quynhthuong_kimvuong` | luxury / wedding | public, 5 variants |
| 242 | Thiệp Cưới - Majestic Olive Classic | `Invitation/Wedding/gen_236_majestic-olive-classic` | luxury / wedding | public |
| 243 | Thiệp Cưới Nhà Trai - Minh Đức & Ngô Thuỳ | `Invitation/Wedding/khach_duc-thuy-nha-trai` | vintage / wedding | hidden |
| 244 | Thiệp Cưới Nhà Gái - Minh Đức & Ngô Thuỳ | `Invitation/Wedding/khach_duc-thuy-nha-gai` | vintage / wedding | hidden |
| 245 | Thiệp Cưới - Thiện Đức & Thùy Dung | `Invitation/Wedding/khach_thuy-dung_thien-duc` | floral / wedding | hidden |
| 246 | Thiệp Cưới - Thanh Tùng & Hoài Thu | `Invitation/Wedding/khach_hoaithu_thanhtung` | luxury / wedding | hidden |
| 247 | Thiệp Dạm Ngõ Song Hỷ Đỏ Truyền Thống | `Invitation/Wedding/gen_216_dam-ngo-song-hy` | traditional / dam-ngo | public |
| 248 | Thiệp Cưới Hành Trình Yêu Thương Điện Ảnh | `Invitation/Wedding/gen_223_love-story-cinematic` | modern / wedding | public |
| 252 | Thiệp Cưới Vintage Khung Phim Lá Xanh | `Invitation/Wedding/khach_anh-thu-minh-thong` | vintage / wedding | hidden |
| 253 | Thiệp Cưới Tối Giản Sang Trọng Niêm Phong Sáp | `Invitation/Wedding/khach_cong-minh-ngoc-huyen` | luxury / wedding | hidden |
| 254 | Thiệp Cưới Vintage Cổ Điển Phong Bì Lá | `Invitation/Wedding/khach_duy-hiep-anna-le` | vintage / wedding | hidden |
| 255 | Thiệp Cưới Vàng Đồng Thanh Lịch Mở Bằng Dấu Sáp | `Invitation/Wedding/khach_khui-kiet-hong-han` | luxury / wedding | hidden |
| 256 | Thiệp Cưới Sage Green Polaroid Vintage | `Invitation/Wedding/khach_minh-linh` | vintage / wedding | hidden |
| 257 | Thiệp Cưới Sage Green Áo Dài Cổ Điển | `Invitation/Wedding/khach_nguyen-bao-uyen-nhi` | vintage / wedding | hidden |
| 258 | Thiệp Cưới Sage Green Lời Chúc Trực Tuyến | `Invitation/Wedding/khach_uyen-nhi-nguyen-bao` | vintage / wedding | hidden |
| 259 | Thiệp Cưới Đỏ Vàng Cổ Điển Sang Trọng | `Invitation/Wedding/khach_thien-ngoe-my-dan` | traditional / wedding | public |
| 260 | Thiệp Cưới Sage Green Polaroid Hai Lễ | `Invitation/Wedding/khach_3` | vintage / wedding | hidden |
| 261 | Thiệp Cưới Phong Bì Hoa Lá Cổ Điển | `Invitation/Wedding/van-hoang-tran-ly` | floral / wedding | hidden |
| 262 | Thiệp Cưới Giấy Dập Nổi — Sage | `Invitation/Wedding/gen_262_emboss-paper-sage` | floral / wedding | public |
| 263 | Thiệp Cưới Chibi Pastel — Ngộ Nghĩnh Đáng Yêu | `Invitation/Wedding/gen_263_chibi-pastel-cute` | modern / wedding | public |
| 264 | Thiệp Cưới Tranh Thêu Cườm — Đèn Chùm Lãng Mạn | `Invitation/Wedding/gen_264_romantic-beaded-chandelier` | luxury / wedding | public |
| 265 | Thiệp Cưới Hoa Trắng Mộng Mơ — Lễ Hôn Phối | `Invitation/Wedding/khach_vinh-hien-hoa` | floral / wedding | hidden |

### Web / e-commerce (33)

| ID | Ten | Folder | Style / Event | Trang thai |
|----|-----|--------|---------------|------------|
| 26 | Website bán template giới thiệu doanh nghiệp (Discovery Business) | `Web/E-commerce/Done_2_web_desktop_ecommerce_digital design_Clean Simple Template` |  | public |
| 27 | Website bán thiệp cưới (mẫu thiệp & đặt in) | `Web/E-commerce/Done_4_web_desktop_ecommerce_event_Love Inviation` |  | public |
| 30 | Website bán dịch vụ & sản phẩm makeup LULU. | `Web/E-commerce/Done_8_web_desktop_ecommerce_makeup_editorial makeup portfolio` |  | public, new |
| 31 | Website bán sản phẩm/dịch vụ studio makeup LULU | `Web/E-commerce/Done_9_web_desktop_ecommerce_makeup_artistic vision makeup studio` |  | public |
| 32 | Website bán sản phẩm/dịch vụ trang điểm cô dâu Luxe | `Web/E-commerce/Done_10_web_desktop_ecommerce_makeup_luxe bridal & beauty artist` |  | public |
| 34 | Website bán sản phẩm/dịch vụ làm đẹp Glow by Thanh | `Web/E-commerce/Done_11_web_desktop_ecommerce_makeup_glow by thanh portfolio` |  | public, new |
| 35 | Website bán khoá học & dụng cụ trang điểm Sắc Việt | `Web/E-commerce/Done_12_web_desktop_ecommerce_makeup_sac viet makeup studio` |  | public, new |
| 36 | Website bán sản phẩm/dịch vụ làm đẹp Mộc Miên | `Web/E-commerce/Done_13_web_desktop_ecommerce_makeup_moc mien bridal beauty` |  | public |
| 37 | Website bán sản phẩm chăm sóc vẻ đẹp tự nhiên The Glow Studio | `Web/E-commerce/Done_14_web_desktop_ecommerce_makeup_the glow studio` |  | public |
| 38 | Website bán sản phẩm makeup chuyên nghiệp Neon Muse | `Web/E-commerce/Done_15_web_desktop_ecommerce_makeup_neon muse` |  | public |
| 39 | Website bán khoá học & dụng cụ trang điểm L’Art de Beauté | `Web/E-commerce/Done_16_web_desktop_ecommerce_makeup_art de beauty` |  | public |
| 40 | Website bán mỹ phẩm thiên nhiên Mộc Trà Beauty | `Web/E-commerce/Done_17_web_desktop_ecommerce_makeup_pure beauty` |  | public |
| 41 | Website bán sản phẩm chăm sóc tự nhiên Thảo Mộc Nhiên | `Web/E-commerce/Done_18_web_desktop_ecommerce_makeup_thao moc nhien` |  | public |
| 42 | Website bán mỹ phẩm công nghệ/khoa học The Pure Lab | `Web/E-commerce/Done_19_web_desktop_ecommerce_cosmetic_the pure lab` |  | public, new |
| 43 | Website bán mỹ phẩm Vibe Beauty | `Web/E-commerce/Done_20_web_desktop_ecommerce_cosmetic_vibe beauty` |  | public |
| 44 | Website bán mỹ phẩm L’Essence Royale | `Web/E-commerce/Done_21_web_desktop_ecommerce_cosmetic_L essence royale` |  | public |
| 45 | Website bán mỹ phẩm hữu cơ An Nhiên Organics | `Web/E-commerce/done_22_web_desktop_ecommerce_cosmetic_an nhien organic` |  | public |
| 46 | Website bán mỹ phẩm GlowUp VN | `Web/E-commerce/Done_23_web_desktop_ecommerce_cosmetic_glow up VN` |  | public, new |
| 47 | Website bán mỹ phẩm cao cấp Imperial Beauty | `Web/E-commerce/done_24_web_desktop_ecommerce_cosmetic_imperial beauty` |  | public |
| 48 | Website bán mỹ phẩm K-Glow Ritual | `Web/E-commerce/done_25_web_desktop_ecommerce_cosmetic_k-glow ritual` |  | public |
| 49 | Website bán mỹ phẩm dưỡng da Nhật Zen Beauty | `Web/E-commerce/done_26_web_desktop_ecommerce_cosmetic_janpanese skincare art` |  | public |
| 50 | Website bán mỹ phẩm phong cách Châu Âu Parisian Elite | `Web/E-commerce/Done_27_web_desktop_ecommerce_cosmetic_parisian elite` |  | public, new |
| 51 | Website bán mỹ phẩm tổng hợp Global Beauty Hub | `Web/E-commerce/done_28_web_desktop_ecommerce_cosmetic_global beauty hub marketplace` |  | public |
| 52 | Website bán xà bông thủ công Gói Ghém Thảo Mộc | `Web/E-commerce/Done_29_web_desktop_ecommerce_beauty care_goi ghem thao moc` |  | public |
| 53 | Website bán sản phẩm chăm sóc cơ thể Aura | `Web/E-commerce/done_30_web_desktop_ecommerce_beauty care_aura bath & body` |  | public |
| 54 | Website bán sản phẩm tắm & chăm sóc toàn thân Sắc Tắm Modern | `Web/E-commerce/Done_31_web_desktop_ecommerce_beauty care_sac tam modern` |  | public |
| 55 | Website bán sản phẩm tóc & cơ thể từ thảo mộc Botanica Essence | `Web/E-commerce/done_32_web_desktop_ecommerce_beauty care_botanica essence` |  | public, new |
| 56 | Website bán sản phẩm tóc & cơ thể Nordic Bath | `Web/E-commerce/done_33_web_desktop_ecommerce_beauty care_nordic bath-pure hair & body` |  | public, new |
| 57 | Website bán sản phẩm chăm sóc cơ thể thủ công Silk & Stone | `Web/E-commerce/DONE_34_web_desktop_ecommerce_beauty care_silk & stone` |  | public |
| 58 | Website bán sản phẩm chăm sóc tóc thảo mộc Verdant Essence | `Web/E-commerce/DONE_35_web_desktop_ecommerce_beauty care_verdant essence` |  | public, new |
| 59 | Website bán đồ tắm & chăm sóc cơ thể Terra Apothecary | `Web/E-commerce/DONE_36_web_desktop_ecommerce_beauty care_terra apothecary-modern bath essentials` |  | public |
| 60 | Website bán sản phẩm/dịch vụ salon tóc L. Connors | `Web/E-commerce/done_56_web_desktop_ecommerce_beauty care_connors hair salon portfolio` |  | public |
| 206 | Website bán sản phẩm chăm sóc tóc Luxe Hair Studio | `Web/E-commerce/done_57_web_desktop_ecommerce_hair care_luxe hair studio` |  | public, new |

### Web / education (31)

| ID | Ten | Folder | Style / Event | Trang thai |
|----|-----|--------|---------------|------------|
| 61 | Trang chủ học viện nhiếp ảnh Visionary | `Web/Education/Done_1_web_desktop_ecommerce_course_hoc vien nhiep anh visionary` |  | public |
| 62 | Trang chủ lớp học Tarot Mystic | `Web/Education/Done_2_web_desktop_ecommerce_course_trung tam tarot huyen bi` |  | public |
| 63 | Trang chủ học viện Data Expert (đào tạo BA/DA) | `Web/Education/Done_3_web_desktop_ecommerce_course_hoc vien data expert` |  | public |
| 64 | Trang chủ lớp kỹ năng mềm chuyên nghiệp SoftSkill Master Class | `Web/Education/Done_4_web_desktop_ecommerce_course_softskill master` |  | public |
| 65 | Trang chủ luyện thi đại học Học Viện Thủ Khoa | `Web/Education/Done_5_web_desktop_ecommerce_course_hoc vien thu khoa` |  | public, new |
| 66 | Trang giới thiệu lớp Văn Chương Tâm Hồn (Cô Mai Anh) | `Web/Education/Done_7_web_desktop_ecommerce_course_van chuong tam hon` |  | public, new |
| 67 | Trang giới thiệu khóa học Sử Việt (Thầy Quang Vinh) | `Web/Education/Done_10_web_desktop_ecommerce_course_su viec academy` |  | public, new |
| 68 | Trang chủ học viện DesignUp (nhận diện mới) | `Web/Education/done_11_web_desktop_ecommerce_course_designup academy` |  | public |
| 69 | Trang chủ học viện thiết kế (biến thể 2) | `Web/Education/Done_12_web_desktop_ecommerce_course_hoc thiet ke cung chuyen gia` |  | public |
| 70 | Trang chủ học viện CreativeEdge (nhận diện mới) | `Web/Education/Done_13_web_desktop_ecommerce_course_hoc thiet ke cung creativedge` |  | public |
| 71 | Trang chủ trung tâm đào tạo chứng chỉ EduCert | `Web/Education/Done_14_web_desktop_ecommerce_course_trang chu dao tao chung chi educert` |  | public |
| 72 | Khóa học tiếng anh | `Web/Education/Done_15_web_desktop_ecommerce_course_global english_fullpage` |  | public |
| 73 | Trang chủ học viện luyện thi KHTN chuyên sâu | `Web/Education/Done_37_web_desktop_ecommerce_course_hoc vien luyen thi khoa hoc tu nhien` |  | public |
| 74 | Trang chủ trung tâm đào tạo chứng chỉ quốc tế | `Web/Education/Done_39_web_desktop_ecommerce_course_trung tam dao tao chung chi quoc te` |  | public |
| 75 | Trang chủ trường kinh doanh L. Chang (nâng tầm sự nghiệp) | `Web/Education/Done_40_web_desktop_ecommerce_course_trang chu khoa hoc chuyen nghiep` |  | public |
| 76 | Trang chủ khóa học viết lách Bút Vàng | `Web/Education/dONE_41_web_desktop_ecommerce_course_but vang academy` |  | public, new |
| 77 | Trang chủ khóa học Digital Marketing Growth Hub | `Web/Education/Done_42_web_desktop_ecommerce_course_growth hub` |  | public |
| 78 | Trang chủ chương trình Quản trị Kinh doanh Global Elite | `Web/Education/done_43_web_desktop_ecommerce_course_global elite` |  | public |
| 79 | Trang chủ khóa học Phân tích dữ liệu DataMind | `Web/Education/done_44_web_desktop_ecommerce_course_datamind` |  | public |
| 80 | Trang chủ học viện kỹ năng mềm Tâm Thế | `Web/Education/Done_45_web_desktop_ecommerce_course_tam the academy` |  | public |
| 81 | Trang chủ trường mỹ thuật The Canvas Atelier | `Web/Education/Done_46_web_desktop_ecommerce_course_the canvas atelier` |  | public |
| 82 | Trang chủ học viện điêu khắc Sculpt & Form | `Web/Education/Done_47_web_desktop_ecommerce_course_sculpt & form` |  | public |
| 83 | Trang chủ khóa học lịch sử & phục chế nghệ thuật | `Web/Education/done_48_web_desktop_ecommerce_course_art heritage studio` |  | public |
| 84 | Trang chủ học viện mỹ thuật Họa Sắc Việt | `Web/Education/Done_49_web_desktop_ecommerce_course_hoa sac viet` |  | public, new |
| 85 | Trang chủ học viện mỹ thuật số ArtTech | `Web/Education/Done_50_web_desktop_ecommerce_course_artTech academy` |  | public, new |
| 86 | Trang chủ khóa lịch sử & thưởng thức hội họa Tinh Hoa Hội Họa | `Web/Education/Done_51_web_desktop_ecommerce_course_tinh hoa hoi hoa` |  | public, new |
| 87 | Trang chủ khóa ôn thi đại học Thẳng Tiến | `Web/Education/Done_52_web_desktop_ecommerce_course_dai hoc thang tien` |  | public |
| 88 | Trang chủ trung tâm chứng chỉ nghề nghiệp CertiMaster | `Web/Education/done_53_web_desktop_ecommerce_course_certimaster` |  | public |
| 89 | Trang chủ khóa học bán hàng thực chiến SalePro | `Web/Education/done_54_web_desktop_ecommerce_course_salepro` |  | public, new |
| 90 | Trang chủ khóa học tiếng Anh online FluentFlow | `Web/Education/Done_55_web_desktop_ecommerce_course_FluentFlow` |  | public |
| 208 | Luxury Makeup Mastery — Khóa Học Makeup Chuyên Nghiệp | `Web/Education/luxury-makeup-mastery-course` |  | public, new |

### Web / onepage (26)

| ID | Ten | Folder | Style / Event | Trang thai |
|----|-----|--------|---------------|------------|
| 1 | Trang chủ website lớp học Pilates (giao diện chia đôi) | `Web/Onepage/Done_13_web_desktop_onepage_landing page_modern split-screen pilates home` |  | public |
| 2 | Landing page cho lớp học Pilates | `Web/Onepage/Done_14_web_desktop_onepage_landing page_asymmetric pilates landing page` |  | public |
| 3 | Landing page cho khoá học Pilates | `Web/Onepage/dONE_15_web_desktop_onepage_landing page_overlapping dual-tone pilates site` |  | public |
| 4 | Trang Coming Soon cho xưởng rang cà phê thủ công | `Web/Onepage/Done_16_web_desktop_onepage_coming soon_artisan coffee roastery coming soon` |  | public, new |
| 5 | Landing page ra mắt thương hiệu thời trang xanh | `Web/Onepage/DONE_17_web_desktop_onepage_coming soon_eco-fashion launch page` |  | public |
| 6 | Landing page giới thiệu sản phẩm AI NeuralNext | `Web/Onepage/DONE_18_web_desktop_onepage_coming soon_AI tech startup teaser` |  | public |
| 7 | Landing page dịch vụ thiết kế nội thất cao cấp | `Web/Onepage/Done_19_web_desktop_onepage_coming soon_luxury interior design teaser` |  | public |
| 8 | Trang Coming Soon cho agency sáng tạo | `Web/Onepage/done_20_web_desktop_onepage_coming soon_creative agency coming soon` |  | public, new |
| 9 | Trang Coming Soon cho thương hiệu/nhà hàng The Rustic Root | `Web/Onepage/Done_21_web_desktop_onepage_coming soon_gourmet restaurant launch page` |  | public |
| 10 | Landing page giới thiệu phụ kiện gaming CyberGear | `Web/Onepage/Done_22_web_desktop_onepage_coming soon_gaming gear teaser page` |  | public |
| 11 | Trang Coming Soon cho thương hiệu chăm sóc da Aura | `Web/Onepage/Done_23_web_desktop_onepage_coming soon_wellness & skincare launch` |  | public, new |
| 12 | Landing page giới thiệu thương hiệu thời trang ERIN | `Web/Onepage/done_24_web_desktop_onepage_coming soon_modern fashion launch page` |  | public, new |
| 13 | Trang Coming Soon cho bộ sưu tập túi xách cao cấp ERIN | `Web/Onepage/done_25_web_desktop_onepage_coming soon_luxury handbag teaser page` |  | public |
| 14 | Trang Coming Soon cho agency marketing sáng tạo | `Web/Onepage/Done_26_web_desktop_onepage_coming soon_creative marketing agency teaser` |  | public |
| 15 | Landing page nhá hàng khai trương trung tâm gaming | `Web/Onepage/DONE_27_web_desktop_onepage_coming soon_gaming center launch teaser` |  | public |
| 16 | Landing page nhá hàng smartphone cao cấp | `Web/Onepage/Done_28_web_desktop_onepage_coming soon_premium smartphone teaser` |  | public, new |
| 17 | Trang Coming Soon cho khu nghỉ dưỡng nhiệt đới | `Web/Onepage/dONE_29_web_desktop_onepage_coming soon_tropical resort coming soon` |  | public |
| 18 | Landing page ra mắt dòng mỹ phẩm cao cấp | `Web/Onepage/Done_30_web_desktop_onepage_coming soon_premium cosmetics lauch page` |  | public |
| 19 | Trang Dropping Soon cho bộ sưu tập thời trang Streetwear | `Web/Onepage/Done_31_web_desktop_onepage_coming soon_streetwear fashion coming soon` |  | public, new |
| 20 | Landing page giới thiệu sự kiện ra mắt Luxe | `Web/Onepage/Done_32_web_desktop_onepage_coming soon_luxury hanbag teaser luxe` |  | public |
| 21 | Trang Coming Soon cho agency marketing | `Web/Onepage/Done_33_web_desktop_onepage_coming soon_bold marketing agency launch` |  | public |
| 22 | Trang Coming Soon cho trung tâm gaming Neon Pixel | `Web/Onepage/Done_34_web_desktop_onepage_coming soon_neon pixel gaming center` |  | public, new |
| 23 | Landing page nhá hàng smartphone thế hệ mới | `Web/Onepage/Done_35_web_desktop_onepage_coming soon_next-gen smartphone teaser` |  | public |
| 24 | Trang Coming Soon cho resort nghỉ dưỡng nhiệt đới | `Web/Onepage/Done_36_web_desktop_onepage_coming soon_tropical escape resort lauch` |  | public |
| 25 | Trang Coming Soon cho thương hiệu mỹ phẩm Glow | `Web/Onepage/Done_37_web_desktop_onepage_coming soon_aesthetic cosmetics coming soon` |  | public, new |
| 207 | Website công ty sản xuất ván gỗ Thành Phát Wood | `Web/Onepage/done_31_web_desktop_onepage_landing page_premium wood manufacturing company` |  | public, new |

### Web / portfolio (25)

| ID | Ten | Folder | Style / Event | Trang thai |
|----|-----|--------|---------------|------------|
| 120 | Trang portfolio thiết kế đồ hoạ Elena Rossi | `Web/Portfolio/done_1_web_desktop_portfolio_modern graphic design portfolio` |  | public |
| 121 | Trang portfolio quay phim nghệ thuật Julian Vane | `Web/Portfolio/Done_2_web_desktop_portfolio_artistic cinematography` |  | public |
| 122 | Trang portfolio minh hoạ Maya Chen | `Web/Portfolio/done_3_web_desktop_portfolio_playful illustration` |  | public, new |
| 123 | Trang portfolio data analyst Alex Nguyen | `Web/Portfolio/Done_4_web_desktop_portfolio_dataa analyst` |  | public |
| 124 | Trang portfolio giám đốc sáng tạo Sophia Laurent | `Web/Portfolio/Done_5_web_desktop_portfolio_artistic creative director` |  | public |
| 125 | Trang portfolio software engineer Marcus Chen | `Web/Portfolio/Done_6_web_desktop_portfolio_software engineer` |  | public |
| 126 | Portfolio cho Nhiếp Ảnh Gia | `Web/Portfolio/Done_7_web_desktop_portfolio_photographer portfolio_fullpage` |  | public |
| 127 | Trang portfolio kiến trúc sư cảnh quan Liam Sterling | `Web/Portfolio/8_web_desktop_portfolio_landscape architect portfolio` |  | public |
| 128 | Portfolio cho Designer | `Web/Portfolio/Done_9_web_desktop_portfolio_tech product designer_fullpage` |  | public |
| 129 | Trang portfolio motion designer Kai Nakamura | `Web/Portfolio/Done_10_web_desktop_portfolio_playful illustration 2_fullpage` |  | public |
| 130 | Trang portfolio hoạ sĩ trừu tượng Elena Voron | `Web/Portfolio/Done_11_web_desktop_portfolio_abstract painter portfolio` |  | public |
| 131 | Trang portfolio thiết kế web truyện tranh Kenji Hiroshi | `Web/Portfolio/Done_12_web_desktop_portfolio_comic web designer` |  | public |
| 132 | Trang portfolio thiết kế thương hiệu Sienna Banks | `Web/Portfolio/Done_13_web_desktop_portfolio_brand design` |  | public |
| 133 | Trang portfolio thiết kế nội thất Lana Nguyen | `Web/Portfolio/Done_14_web_desktop_portfolio_interior designer` |  | public, new |
| 134 | Trang portfolio nhạc sĩ/soạn nhạc Ethan Reed | `Web/Portfolio/dONE_15_web_desktop_portfolio_music composer` |  | public |
| 135 | Trang portfolio hoạ sĩ truyện tranh Mika Sato | `Web/Portfolio/Done_16_web_desktop_portfolio_comic artist` |  | public |
| 136 | Blog/portfolio du lịch “Nhật Ký Xê Dịch” | `Web/Portfolio/Done_17_web_desktop_personal blog_travel blog the wanderlust journal` |  | public |
| 137 | Blog công nghệ & thiết kế “Code & Canvas” | `Web/Portfolio/Done_18_web_desktop_personal blog_tech & design blog code & canvas` |  | public |
| 138 | Trang portfolio huấn luyện thở & cân bằng (Maya Sterling) | `Web/Portfolio/Done_19_web_desktop_personal blog_holistic wellness blog` |  | public, new |
| 139 | Blog ẩm thực “Bếp Hiện Đại” của David Chen | `Web/Portfolio/Done_20_web_desktop_personal blog_culinary adventures blog` |  | public, new |
| 140 | Blog gia đình “Tổ Ấm Nhỏ” | `Web/Portfolio/done_21_web_desktop_personal blog_cozy family blog the homefront` |  | public |
| 141 | Blog gia đình khám phá “Trái Tim Phiêu Lưu” | `Web/Portfolio/Done_22_web_desktop_personal blog_adventure family blog` |  | public, new |
| 142 | Landscape Architect Portfolio 2 | `Web/Portfolio/23_web_desktop_portfolio_landscape architect portfolio 2` |  | public |
| 143 | Landscape Architect Portfolio 3 | `Web/Portfolio/24_web_desktop_portfolio_landscape architect portfolio 3` |  | public |
| 209 | Thầy Minh Đức — Chuyên Gia Ôn Thi Toán THPT & Đại Học | `Web/Portfolio/teacher-portfolio-exam-tutor` |  | public, new |

### Google-sheet / e-commerce (5)

| ID | Ten | Folder | Style / Event | Trang thai |
|----|-----|--------|---------------|------------|
| 144 | Dashboard quản lý đơn hàng | `Google-sheet/E-commerce/1_cover` |  | public |
| 145 | Bảng mục tiêu năm mới | `Google-sheet/E-commerce/1_purple` |  | public |
| 146 | Dashboard quản trị dự án | `Google-sheet/E-commerce/2_cover` |  | public, new |
| 147 | Bảng theo dõi chi tiêu | `Google-sheet/E-commerce/2_purple` |  | public |
| 148 | Website bán template Google Sheets CRM | `Google-sheet/E-commerce/3_yellow` |  | public, new |

