# Products Data

## Cau truc thu muc san pham

```
products/
├── Google-sheet/           # Mau Google Sheet (type: google-sheet)
│   ├── E-commerce/         # 5 san pham
│   ├── Education/          # (trong)
│   └── Portfolio/          # (trong)
├── Trending/               # Mau Trending (chua co san pham)
│   ├── Confession/         # (trong)
│   ├── Invitation/         # (trong)
│   └── OnePage/            # (trong)
├── Web/                    # Mau Web (type: website)
│   ├── E-commerce/         # 35 san pham
│   ├── Education/          # 30 san pham
│   ├── Invitation/         # 29 san pham
│   ├── Onepage/            # 25 san pham
│   └── Portfolio/          # 24 san pham
├── images/                 # Anh mockup dung chung
├── data.csv                # File CSV quan ly san pham
└── products.md             # File nay
```

## Tong hop

| Loai chinh | Loai nho | So san pham |
|------------|----------|-------------|
| **Google-sheet** | E-commerce | 5 |
| **Google-sheet** | Education | 0 |
| **Google-sheet** | Portfolio | 0 |
| **Trending** | Confession | 4 |
| **Trending** | Invitation | 0 |
| **Trending** | OnePage | 0 |
| **Web** | E-commerce | 35 |
| **Web** | Education | 30 |
| **Web** | Invitation | 34 |
| **Web** | Onepage | 26 |
| **Web** | Portfolio | 24 |
| | **Tong** | **158** |

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
├── index.html              (bat buoc voi type=website/trending)
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
| `Trending` | `Confession`, `Invitation`, `OnePage` | `trending` |

### Quy tac xac dinh type va category tu folder

| Duong dan folder | `type` | `category` |
|-----------------|--------|-----------|
| `products/Web/{Loai-nho}/...` | `website` | Loai-nho (lowercase): `e-commerce`, `education`, ... |
| `products/Google-sheet/{Loai-nho}/...` | `google-sheet` | Loai-nho (lowercase) |
| `products/Trending/{Loai-nho}/...` | `trending` | Loai-nho (lowercase): `confession`, `invitation`, ... |

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
| `type` | Loai chinh tu duong dan folder: `Web`→`website`, `Google-sheet`→`google-sheet`, `Trending`→`trending` |
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

### Google-sheet / E-commerce (5)

| # | Folder | Files |
|---|--------|-------|
| 1 | `1_cover` | Cover.jpg, Cover (2).jpg, Cover (3).jpg, Cover (4).jpg, Cover (5).jpg, Cover (6).jpg |
| 2 | `1_purple` | PURPLE.jpg, Purple Features.jpg, Purple Features (2).jpg, Purple Features (3).jpg, Purple with Shadow.jpg, Purple with Shadow (2).jpg |
| 3 | `2_cover` | Cover (7).jpg, Cover (8).jpg, Cover (9).jpg, Cover (10).jpg, Cover (11).jpg, Cover (12).jpg |
| 4 | `2_purple` | PURPLE (2).jpg, Purple Features (4).jpg, Purple Features (5).jpg, Purple Features (6).jpg, Purple with Shadow (3).jpg, Purple with Shadow (4).jpg |
| 5 | `3_yellow` | YELLOW (2).jpg, YELLOW (3).jpg, YELLOW (4).jpg, YELLOW (5).jpg, YELLOW (6).jpg, YELLOW (7).jpg |

### Google-sheet / Education (0)

(trong)

### Google-sheet / Portfolio (0)

(trong)

### Trending / Confession (1)

| # | Folder | Files |
|---|--------|-------|
| 1 | `rồi ai sẽ ngắm pháo hoa` | index.html, music.mp3, thumbnail.png, anh_1.png, anh_2.png, anh_3.png |

### Trending / Invitation (0)

(trong)

### Trending / OnePage (0)

(trong)

---

### Web / E-commerce (35)

Tat ca folder deu co `thumbnail.jpg`. Ngoai le ve code.html:

| # | Folder | Ghi chu |
|---|--------|---------|
| 1 | `Done_6_web_desktop_ecommerce_sport_serene_pilates_landing_page` | **Khong co code.html** — chi co thumbnail.jpg |
| 2 | `Done_7_web_desktop_ecommerce_sport_elite_pilates_studio_website` | **Khong co code.html** — chi co thumbnail.jpg |
| 3 | `Done_10_web_desktop_onepage_landing page_physio-core_pilates_clinic` | **Khong co code.html** — chi co thumbnail.jpg |

Cac folder binh thuong (code.html + thumbnail.jpg):
`Done_2_...Clean Simple Template`, `Done_4_...Love Inviation`, `Done_8_...editorial makeup portfolio`, `Done_9_...artistic vision makeup studio`, `Done_10_...luxe bridal & beauty artist`, `Done_11_...glow by thanh portfolio`, `Done_12_...sac viet makeup studio`, `Done_13_...moc mien bridal beauty`, `Done_14_...the glow studio`, `Done_15_...neon muse`, `Done_16_...art de beauty`, `Done_17_...pure beauty`, `Done_18_...thao moc nhien`, `Done_19_...the pure lab`, `Done_20_...vibe beauty`, `Done_21_...L essence royale`, `done_22_...an nhien organic`, `Done_23_...glow up VN`, `done_24_...imperial beauty`, `done_25_...k-glow ritual`, `done_26_...janpanese skincare art`, `Done_27_...parisian elite`, `done_28_...global beauty hub marketplace`, `Done_29_...goi ghem thao moc`, `done_30_...aura bath & body`, `Done_31_...sac tam modern`, `done_32_...botanica essence`, `done_33_...nordic bath-pure hair & body`, `DONE_34_...silk & stone`, `DONE_35_...verdant essence`, `DONE_36_...terra apothecary-modern bath essentials`, `done_56_...connors hair salon portfolio`

### Web / Education (30)

Tat ca folder deu co `thumbnail.jpg`. Ngoai le:

| # | Folder | Ghi chu |
|---|--------|---------|
| 1 | `Done_15_web_desktop_ecommerce_course_global english_fullpage` | **Multi-page** — 5 subfolder: Blog, Courses, Events, Home, Schedule + thumbnail.jpg (khong co code.html o root) |

Cac folder binh thuong (code.html + thumbnail.jpg):
`Done_1_...hoc vien nhiep anh visionary`, `Done_2_...trung tam tarot huyen bi`, `Done_3_...hoc vien data expert`, `Done_4_...softskill master`, `Done_5_...hoc vien thu khoa`, `Done_7_...van chuong tam hon`, `Done_10_...su viec academy`, `done_11_...designup academy`, `Done_12_...hoc thiet ke cung chuyen gia`, `Done_13_...hoc thiet ke cung creativedge`, `Done_14_...trang chu dao tao chung chi educert`, `Done_37_...hoc vien luyen thi khoa hoc tu nhien`, `Done_39_...trung tam dao tao chung chi quoc te`, `Done_40_...trang chu khoa hoc chuyen nghiep`, `dONE_41_...but vang academy`, `Done_42_...growth hub`, `done_43_...global elite`, `done_44_...datamind`, `Done_45_...tam the academy`, `Done_46_...the canvas atelier`, `Done_47_...sculpt & form`, `done_48_...art heritage studio`, `Done_49_...hoa sac viet`, `Done_50_...artTech academy`, `Done_51_...tinh hoa hoi hoa`, `Done_52_...dai hoc thang tien`, `done_53_...certimaster`, `done_54_...salepro`, `Done_55_...FluentFlow`

### Web / Invitation (29)

Tat ca folder deu co: `code.html` + `thumbnail.jpg`. Khong co ngoai le.

Danh sach:
`Done_1_...classic floral wedding invitaion`, `Done_2_...boho chic wedding invite`, `Done_3_...luxury dark orchid invite`, `Done_4_...minimalist editorial wedding invation`, `Done_5_...lxxury dark mode celebration landing page`, `Done_6_...soft romantic floral wedding landing page`, `Done_7_...elegant wedding invitation`, `Done_8_...modern neon birrthday invite`, `Done_9_...whimsical first birthday invite`, `Done_10_...modern vibrant 30th birthday`, `Done_11_...whimsical illustrated kids birthday`, `done_12_...vibrant 21st birthday`, `Done_13_...silver anniversary`, `Done_14_...corporate 10th anniversary`, `Done_15_...golden anniversary`, `Done_16_...arrt gallery opening invite`, `Done_17_...high school reunion`, `Done_18_...charity gala invitation`, `Done_19_...modern minimalist christmas gala`, `Done_20_...retro 50s christmas party invite`, `Done_21_...luxury gold & charcoal`, `Done_22_...rustic cozy cabin christmas`, `Done_23_...interactive kids christmas workshop`, `Done_24_...festive christmas party`, `Done_25_...lunar new year celebration`, `Done_26_...summer beach bash`, `Done_27_...winter wonderland retreat`, `Done_28_...autum harvest festival`, `Done_29_...tropical spring break`

### Web / Onepage (25)

Tat ca folder deu co: `code.html` + `thumbnail.jpg`. Khong co ngoai le.

Danh sach:
`Done_13_...modern split-screen pilates home`, `Done_14_...asymmetric pilates landing page`, `dONE_15_...overlapping dual-tone pilates site`, `Done_16_...artisan coffee roastery coming soon`, `DONE_17_...eco-fashion launch page`, `DONE_18_...AI tech startup teaser`, `Done_19_...luxury interior design teaser`, `done_20_...creative agency coming soon`, `Done_21_...gourmet restaurant launch page`, `Done_22_...gaming gear teaser page`, `Done_23_...wellness & skincare launch`, `done_24_...modern fashion launch page`, `done_25_...luxury handbag teaser page`, `Done_26_...creative marketing agency teaser`, `DONE_27_...gaming center launch teaser`, `Done_28_...premium smartphone teaser`, `dONE_29_...tropical resort coming soon`, `Done_30_...premium cosmetics lauch page`, `Done_31_...streetwear fashion coming soon`, `Done_32_...luxury hanbag teaser luxe`, `Done_33_...bold marketing agency launch`, `Done_34_...neon pixel gaming center`, `Done_35_...next-gen smartphone teaser`, `Done_36_...tropical escape resort lauch`, `Done_37_...aesthetic cosmetics coming soon`

### Web / Portfolio (24)

Tat ca folder deu co `thumbnail.jpg`. Ngoai le:

| # | Folder | Ghi chu |
|---|--------|---------|
| 1 | `Done_7_web_desktop_portfolio_photographer portfolio_fullpage` | **Multi-page** — 1 subfolder: stitch_templexa_web_ecommerce_part_4_portfolio + thumbnail.jpg (khong co code.html o root) |
| 2 | `Done_9_web_desktop_portfolio_tech product designer_fullpage` | **Multi-page** — 1 subfolder: stitch_templexa_web_ecommerce_part_4_portfolio + thumbnail.jpg (khong co code.html o root) |

Cac folder binh thuong (code.html + thumbnail.jpg):
`done_1_...modern graphic design portfolio`, `Done_2_...artistic cinematography`, `done_3_...playful illustration`, `Done_4_...dataa analyst`, `Done_5_...artistic creative director`, `Done_6_...software engineer`, `8_web_desktop_portfolio_landscape architect portfolio`, `Done_10_...playful illustration 2_fullpage`, `Done_11_...abstract painter portfolio`, `Done_12_...comic web designer`, `Done_13_...brand design`, `Done_14_...interior designer`, `dONE_15_...music composer`, `Done_16_...comic artist`, `Done_17_...travel blog the wanderlust journal`, `Done_18_...tech & design blog code & canvas`, `Done_19_...holistic wellness blog`, `Done_20_...culinary adventures blog`, `done_21_...cozy family blog the homefront`, `Done_22_...adventure family blog`, `23_web_desktop_portfolio_landscape architect portfolio 2`, `24_web_desktop_portfolio_landscape architect portfolio 3`

---

## Ghi chu

- **HTML file**: hau het dung `code.html` (chua doi thanh `index.html`)
- **Anh**: moi folder co `thumbnail.jpg` (da xoa cac anh khac + bo sung thumbnail thieu ngay 2026-03-05)
- **Casing folder**: khong nhat quan (`Done_`, `done_`, `dONE_`, `DONE_`) — khong anh huong chuc nang
- **Multi-page (fullpage)**: 3 san pham co subfolder ben trong:
  - `Web/Education/Done_15_...global english_fullpage` (5 trang: Blog, Courses, Events, Home, Schedule)
  - `Web/Portfolio/Done_7_...photographer portfolio_fullpage` (1 subfolder)
  - `Web/Portfolio/Done_9_...tech product designer_fullpage` (1 subfolder)
- **Khong co code.html**: 3 folder trong Web/E-commerce (chi co thumbnail.jpg) + 3 folder multi-page (code.html nam trong subfolder)
- Cap nhat: 2026-03-05
