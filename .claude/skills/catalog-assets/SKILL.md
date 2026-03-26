---
name: catalog-assets
description: Phan loai + catalog anh moi trong `products/shared/new/` hoac bo anh cuoi → tag, rename, convert WebP, di chuyen vao folder, cap nhat wedding-data.js
argument-hint: "[folder path hoac de trong]"
---

# catalog-assets

Phân loại + catalog ảnh mới → tag, rename, convert WebP, di chuyển vào đúng folder, cập nhật `wedding-data.js`.

## 3 loại xử lý

| Loại | Input | Output |
|------|-------|--------|
| **Icon** | Ảnh đơn hoặc grid 3x3/2x3 trong `new/icon/` | Cắt → convert WebP → `icons/` |
| **Background** | Ảnh nền trong `new/background/` | Convert WebP → `backgrounds/{category}/` |
| **Photo Set (bộ ảnh cưới)** | Folder ảnh cưới (VD: `viet-phuc/`) | Convert WebP tại chỗ → thêm photoSet vào `wedding-data.js` |

---

## A. Xử lý Icon + Background + Element

### Bước 1: Quét + đọc ảnh vision
- `ls` folder → lọc `.png/.jpg/.jpeg/.webp`
- Đọc vision batch 5-8 ảnh song song
- Xác định: loại (icon/bg/element), style tags, color tags, usage tags, tên mô tả

### Bước 2: Phân tích grid
- Ảnh grid 3x3 (1024x1024): `magick` cắt 9 cell, PAD=8 tránh border
- Ảnh grid 2x3: cắt 6 cell
- Ảnh đơn: convert trực tiếp

### Bước 3: Hiển thị bảng → hỏi user xác nhận trước khi xử lý

### Bước 4: Convert + rename + di chuyển
- `cwebp -q 90` (hoặc `magick` nếu cần cắt trước)
- Naming: `{prefix}-{object}.webp` cho icon, `bg-{category}-{descriptor}.webp` cho background
- Destination: `icons/`, `backgrounds/{category}/`, `wedding-elements/`
- Verify size > 0 → xóa gốc

### Bước 5: Cập nhật `wedding-data.js` (nếu cần)

---

## B. Xử lý Bộ Ảnh Cưới (Photo Set) — QUY TRÌNH MỚI

Khi user tải bộ ảnh cưới mới về một folder (VD: `products/shared/images/wedding/ten-bo-anh/`).

### Bước 1: Quét folder + đọc ảnh vision

```bash
ls products/shared/images/wedding/{ten-bo-anh}/
```

- Đọc vision 3-5 ảnh đại diện (đầu, giữa, cuối) để nắm style
- Xác định:
  - **Style**: studio/outdoor/traditional/modern/mix
  - **Trang phục**: váy trắng, vest, Việt phục, áo dài, hanbok...
  - **Backdrop**: nền xám, nền đen, nền nâu, thiên nhiên, hoa...
  - **Mood**: romantic, elegant, playful, traditional, cinematic
  - **Colors**: dominant colors từ ảnh

### Bước 2: Convert JPG/PNG → WebP

```bash
cd products/shared/images/wedding/{ten-bo-anh}/
for f in *.jpg *.jpeg *.png; do
  cwebp -q 85 "$f" -o "${f%.*}.webp" && rm "$f"
done
```

Quality 85 cho ảnh cưới (đủ đẹp, tiết kiệm dung lượng).

### Bước 3: Phân loại ảnh theo vai trò

Xem vision từng ảnh, gán vào `files` mapping:

| Vai trò | Mô tả | Số lượng |
|---------|-------|---------|
| `hero` | Ảnh chính full-body, đẹp nhất, dùng làm nền hero | 1 |
| `envelope` | Ảnh couple close-up hoặc romantic, dùng cho envelope | 1 |
| `couple` | Ảnh cặp đôi chính | 2-3 |
| `story` | Ảnh kể chuyện, đa dạng pose/góc | 2-4 |
| `gallery` | Ảnh cho slider/gallery | 4-6 |
| `decoration` | Ảnh phụ (hoa cưới, chi tiết, bouquet) | 0-2 |

**Portrait**: nếu có ảnh solo cô dâu + chú rể → gán `portraitFiles`

### Bước 4: Thêm photoSet vào `wedding-data.js`

Chèn entry mới vào cuối mảng `photoSets` (trước `]`):

```javascript
{
    id: 'ten-bo-anh',
    name: 'Ten Day Du Tieng Anh',
    folder: 'products/shared/images/wedding/ten-bo-anh/',
    count: N,
    style: 'Mo ta style bang tieng Anh',
    tags: ['tag1', 'tag2', ...],
    colors: ['color1', 'color2', ...],
    mood: 'Mo ta mood bang tieng Viet khong dau',
    description: 'Mo ta chi tiet bang tieng Viet khong dau, khong xuong dong.',
    hasPortrait: true/false,
    portraitFiles: { bride: 'filename.webp', groom: 'filename.webp' },
    matchPalettes: ['palette1', 'palette2', ...],
    files: {
        hero: 'filename.webp',
        envelope: 'filename.webp',
        couple: ['file1.webp', 'file2.webp'],
        story: ['file1.webp', 'file2.webp', 'file3.webp'],
        gallery: ['file1.webp', ...],
        decoration: ['file1.webp']
    },
    usedBy: [],
    images: [
        { path: 'products/shared/images/wedding/ten-bo-anh/filename.webp', description: 'Mo ta anh' },
        ...
    ]
}
```

### Bước 5: Verify + báo cáo

```bash
node -e "require('./products/shared/wedding-data.js'); console.log('OK')"
```

---

## Tag Taxonomy

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
envelope-section, envelope-center, section-header, section-deco,
section-divider, section-background, corner-deco, side-deco,
hero-deco, hero-center, footer-deco, header-deco, border-deco,
photo-frame, couple-frame, portrait-frame,
between-names, inline-icon, scatter-deco, floating-deco,
popup-background, popup-border, general-deco, thankyou, decoration
```

### matchPalettes (cho photoSet)
```
traditional-red, traditional-vn, warm-traditional, red-gold, blush-red,
sage-green, green-fresh, natural, garden,
blush-pink, dusty-rose, burgundy, dark-moody, classic-gold,
beige-cream, navy-gold, coral-minimalist, modern-neutral
```

---

## Đường dẫn

| Loại | Destination |
|------|-------------|
| Icon | `products/shared/images/wedding/icons/` |
| Background | `products/shared/images/wedding/backgrounds/{category}/` |
| Element | `products/shared/images/wedding-elements/` |
| Photo Set | `products/shared/images/wedding/{ten-bo-anh}/` (giữ nguyên) |
| Data | `products/shared/wedding-data.js` |

## C. Kỹ thuật nâng cao (từ import-assets)

### Xóa nền trắng (icon cần transparent)
```bash
magick "input.png" -crop WxH+X+Y -fuzz 8% -transparent white -trim +repage -resize 400x "output.webp"
```
- Line art/đơn sắc: `-fuzz 10%`
- Watercolor/pastel nhạt: `-fuzz 6%`
- Gradient/shadow: `-fuzz 4%` hoặc bỏ `-transparent`
- Flood fill: `-fill none -fuzz 12% -draw "color 0,0 floodfill"`

### PDF (nhiều trang)
```bash
magick "input.pdf[0]" -density 300 "page-1.png"  # Convert từng trang trước
```

### Ảnh JPG nền không thuần trắng
```bash
magick "input.jpg" -crop ... -fuzz 15% -transparent white -trim +repage "output.webp"
```

## Tools

- **ImageMagick**: `magick` (cắt grid, xóa nền, trim) — KHÔNG dùng `convert` (deprecated v7)
- **cwebp**: convert WebP — quality 85 (photo), 90 (icon/bg)
- **Vision**: Read tool đọc ảnh để phân tích style/content
