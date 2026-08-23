Phân loại + catalog ảnh mới trong `products/shared/new/` → tag, rename, convert WebP, di chuyển vào đúng folder, cập nhật 3 file catalog.

Argument: $ARGUMENTS — tên subfolder trong `new/` (ví dụ: `background`, `item`) hoặc để trống (xử lý tất cả subfolder).

Ví dụ:
- `"background"` → xử lý `products/shared/new/background/`
- `"item"` → xử lý `products/shared/new/item/`
- `""` → xử lý tất cả subfolder trong `products/shared/new/`

---

## Bước 1: Quét folder + đọc ảnh bằng vision

### 1.1 Liệt kê file ảnh

```bash
ls products/shared/new/{subfolder}/
```

Chỉ xử lý file có đuôi: `.png`, `.jpg`, `.jpeg`, `.webp`
Bỏ qua: `.zip`, `.txt`, `.md`, và các file không phải ảnh.

### 1.2 Đọc ảnh bằng vision (Read tool)

Đọc từng ảnh bằng Read tool (Claude vision). **Batch 5-8 ảnh song song** để tăng tốc.

Với mỗi ảnh, xác định:

| Thuộc tính | Mô tả | Ví dụ |
|-----------|-------|-------|
| **Loại** | `background` / `icon` / `element` | background |
| **Style tags** | Chọn từ taxonomy bên dưới | `['watercolor', 'floral', 'romantic']` |
| **Color tags** | Chọn từ taxonomy bên dưới | `['pink', 'cream', 'pastel']` |
| **Usage tags** | Chọn từ taxonomy bên dưới | `['hero-section', 'full-page']` |
| **Tên mô tả** | Tiếng Việt không dấu, kebab-case cho ID | `Hoa watercolor hong pastel` |
| **Category** | Mapping vào folder phù hợp | `floral-watercolor` |

### 1.3 Phân biệt loại

- **Background**: Ảnh nền full-page/section, thường có nhiều khoảng trống cho text, pattern lặp hoặc frame viền
- **Icon**: Hình nhỏ riêng lẻ — biểu tượng, họa tiết đơn, nhân vật chibi, chữ Hỷ, hoa nhỏ, divider
- **Element**: Trang trí section — khung ảnh, popup background, timeline icon, paper texture, lá cây lớn

---

## Bước 2: Hiển thị bảng phân tích + xác nhận user

Hiển thị bảng tổng hợp kết quả phân tích:

```
## Kết quả phân tích

| # | File gốc | Loại | Tên đề xuất | ID đề xuất | Tags | Destination |
|---|----------|------|-------------|------------|------|-------------|
| 1 | 1.png | background | Hoa watercolor hong pastel | bg-floral-watercolor-pink-pastel | watercolor, floral, pink, pastel | backgrounds/floral-watercolor/ |
| 2 | 2.png | icon | Bo hoa lineart nau | bouquet-lineart-brown | lineart, floral, brown, elegant | icons/ |
| 3 | 3.png | element | Khung popup hoa la | popup-floral-frame | popup, floral, frame | wedding-elements/ |
| ... | | | | | | |

### Thống kê
- Background: N ảnh
- Icon: M ảnh
- Element: K ảnh

### Danh mục mới cần tạo (nếu có)
- `backgrounds/tên-mới/` — Mô tả

### File trùng tên (nếu có)
- `bg-xxx.webp` đã tồn tại → đề xuất `bg-xxx-v2.webp`
```

**BẮT BUỘC: Dùng AskUserQuestion hỏi xác nhận TRƯỚC khi tiếp tục Bước 3.**
User có thể muốn đổi tên, tag, loại, hoặc bỏ qua một số file.

---

## Bước 3: Convert PNG → WebP + Rename + Di chuyển

### 3.1 Convert WebP

Dùng `sharp` qua Node.js (đã cài sẵn):

```bash
node -e "
const sharp = require('sharp');
const fs = require('fs');
sharp('INPUT_PATH').webp({ quality: 90 }).toFile('OUTPUT_PATH').then(info => {
    console.log('OK', info.size);
}).catch(err => console.error('FAIL', err.message));
"
```

**Quality: 90** (cao hơn convert-webp.js vì đây là shared assets dùng lại nhiều).

### 3.2 Quy tắc đặt tên file

| Loại | Pattern | Ví dụ |
|------|---------|-------|
| Background | `bg-{category}-{descriptor}.webp` | `bg-floral-watercolor-pink-pastel.webp` |
| Icon | `{object}-{style}.webp` | `bouquet-lineart-brown.webp` |
| Element | `{function}-{variant}.webp` | `popup-floral-frame.webp` |

### 3.3 Destination folders

| Loại | Destination | Ví dụ |
|------|-------------|-------|
| Background | `products/shared/images/wedding/backgrounds/{category}/` | `backgrounds/floral-watercolor/` |
| Icon | `products/shared/images/wedding/icons/` | `icons/` |
| Element | `products/shared/images/wedding-elements/` | `wedding-elements/` |

### 3.4 Quy trình di chuyển

1. Tạo folder destination nếu chưa tồn tại: `mkdir -p {destination}`
2. Convert PNG → WebP tại destination
3. **Verify WebP tồn tại VÀ size > 0** trước khi tiếp tục
4. Xóa file PNG gốc trong `new/` CHỈ sau khi verify thành công
5. Nếu file trùng tên tại destination → thêm suffix `-v2`, `-v3`, ...

---

## Bước 4: Cập nhật `products/shared/wedding-data.js`

File duy nhất: `products/shared/wedding-data.js` — chứa `WEDDING_DATA` object.

### 4.1 Background → thêm vào `WEDDING_DATA.backgrounds.items[]`

**Nếu category mới** → thêm vào `WEDDING_DATA.backgrounds.categories[]`:
```javascript
{ id: 'category-id', name: 'Tên danh mục', tags: ['tag1', 'tag2'], folder: 'category-id/' },
```

**Thêm entry vào cuối `WEDDING_DATA.backgrounds.items[]`** (trước dấu `]`):
```javascript
{ id: 'bg-category-descriptor', file: 'category/bg-category-descriptor.webp', name: 'Ten mo ta tieng Viet khong dau', category: 'category-id', tags: ['tag1', 'tag2', 'tag3'], colors: ['color1', 'color2'], usage: ['hero-section', 'cover'] },
```

### 4.2 Icon → thêm vào `WEDDING_DATA.icons.items[]`

```javascript
{ id: 'icon-id', file: 'icons/icon-id.webp', name: 'Ten tieng Viet co dau', tags: ['tag1', 'tag2'], usage: ['usage1', 'usage2'] },
```

### 4.3 Element → thêm vào `WEDDING_DATA.elements.items[]`

```javascript
{ id: 'element-id', file: 'wedding-elements/element-id.webp', name: 'Ten tieng Viet co dau', tags: ['tag1', 'tag2'], usage: ['usage1'] },
```

---

## Bước 5: Verify + Báo cáo

### 5.1 Verify

1. **Kiểm tra syntax** file data sau khi cập nhật:
   ```bash
   node -e "require('./products/shared/wedding-data.js')"
   ```
   → không throw = OK.

2. **Verify file WebP** tại destination:
   ```bash
   ls -la {destination}/{filename}.webp
   ```
   Mỗi file phải tồn tại và size > 0.

3. **Kiểm tra ID trùng** trong `WEDDING_DATA` (không được trùng với ID hiện có trong cùng mảng).

### 5.2 Báo cáo tổng kết

```
## Kết quả catalog-assets

### File đã xử lý
- Background: N ảnh → {danh sách category}
- Icon: M ảnh → icons/
- Element: K ảnh → wedding-elements/
- Tổng: X ảnh

### Dung lượng
| File | PNG gốc | WebP | Tiết kiệm |
|------|---------|------|-----------|
| bg-xxx.webp | 2.1 MB | 850 KB | -60% |
| ... | | | |
| **Tổng** | **XX MB** | **YY MB** | **-ZZ%** |

### Danh mục mới đã tạo
- `backgrounds/tên-mới/` (N ảnh)

### File data đã cập nhật
- wedding-data.js: +N backgrounds, +M icons, +K elements

### Folder new/ sau khi xử lý
- Đã xóa: X file PNG
- Còn lại: Y file (zip, txt, ...)
```

---

## Tag Taxonomy (Tham chiếu)

### Style tags
```
elegant, classic, vintage, romantic, modern, minimalist, traditional,
luxury, cute, chibi, sophisticated, formal, premium, casual, natural,
garden, dramatic, cinematic, watercolor, lineart, floral, botanical,
geometric, typography, script, decorative, ornament, soft, bold
```

### Color tags
```
white, cream, nude, beige, brown-light, brown, gold,
pink, pink-light, blush, coral, rose, dusty-rose,
red, burgundy, maroon,
purple-light, lavender, violet,
blue, navy, teal,
green, sage, mint, eucalyptus,
gray, neutral, cool, warm,
black, dark,
pastel, earth, sunset, fresh, natural
```

### Usage tags
```
hero-section, full-page, cover,
calendar-section, countdown-section, event-section, love-story-section,
envelope-section, envelope-center, envelope-seal, envelope-left, envelope-right,
section-header, section-deco, section-divider, section-background,
corner-deco, side-deco, side-deco-left, side-deco-right,
hero-deco, hero-center, hero-left, hero-right,
footer-deco, header-deco, border-deco, background-deco,
photo-frame, couple-frame, portrait-frame,
between-names, inline-icon, love-story-icon,
scatter-deco, floating-deco, falling-effect, general-deco,
popup-background, popup-border,
music-toggle, image-mask, date-highlight,
cover-header, cover-background,
thankyou, decoration
```

### Background categories (đang có trong wedding-data.js)
```
envelope, floral-watercolor, floral-lineart, floral-photo,
traditional-red, traditional-vn, sage-green, greenery,
frame-ornament, luxury-fabric
```

Nếu ảnh không khớp category nào → có thể tạo category mới. Gợi ý thêm:
```
marble-texture, gradient-abstract, rustic-wood, beach-coastal,
dark-moody, pastel-dreamy, minimalist-clean, gold-ornate
```

---

## Ràng buộc

- **BẮT BUỘC xác nhận user** trước khi move/rename/delete (Bước 2)
- Chỉ xóa PNG gốc sau khi verify WebP tồn tại và size > 0
- Nếu file trùng tên tại destination → thêm suffix `-v2`, `-v3`
- Giữ tag taxonomy nhất quán với catalog hiện có
- ID trong catalog: kebab-case, không trùng với ID hiện có
- Tên mô tả (`name`): tiếng Việt không dấu (giống pattern hiện có)
- Không xử lý file ZIP
- Dùng `sharp` với quality 90 cho WebP conversion (KHÔNG dùng cwebp — chưa cài)
- Khi thêm vào `wedding-data.js`: chèn trước dấu `]` đóng mảng tương ứng, giữ trailing comma
