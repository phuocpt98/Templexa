# gen-wedding

Gen thiệp cưới HTML + nhạc nền + prompt.txt + thêm entry vào data.js. Hoặc gen theo khách từ folder.

## Asset Catalog

**QUAN TRỌNG**: Trước khi chọn ảnh/icon/element, đọc file catalog:
```
products/shared/wedding-asset-catalog.js
```

File này chứa data gắn tag cho toàn bộ thư viện:
- `photoSets` — 9 bộ ảnh couple (tags, colors, mood, matchPalettes, files mapping)
- `icons` — 30 icon trang trí (tags, usage)
- `elements` — 31 wedding elements (tags, usage)
- `music` — 3 bài nhạc nền (tags, mood, bpm)
- `stylePresets` — 7 combo gợi ý sẵn

## Quy trình chọn asset

### Bước 1: Xác định phong cách từ yêu cầu

Từ yêu cầu user, map sang style keywords:
| Yêu cầu | Keywords |
|----------|----------|
| "truyền thống đỏ vàng" | traditional, red, gold |
| "sang trọng tối" | luxury, dark, elegant |
| "minimalist hiện đại" | modern, minimalist, clean |
| "dễ thương chibi" | cute, chibi, cartoon |
| "vintage xanh lá" | sage-green, vintage, botanical |
| "lãng mạn" | romantic, soft, blush |

### Bước 2: Thử style preset trước

Check `stylePresets` trong catalog — nếu match → dùng combo sẵn:
```js
getStylePreset('traditional-vietnamese')
// → photoSets, icons, elements, music, colors đã gợi ý
```

7 presets: `elegant-classic`, `romantic-modern`, `traditional-vietnamese`, `cute-chibi`, `sage-green-vintage`, `dark-luxury`, `fresh-green`

### Bước 3: Nếu không có preset, query từ tags

```js
findPhotoSets(['elegant', 'gold'])   // → bộ ảnh phù hợp
findIcons(['traditional', 'red'])     // → icons truyền thống
findElements(['sage-green'])          // → elements xanh sage
findMusic(['romantic'])               // → nhạc lãng mạn
```

### Bước 4: Chọn ảnh cho từng section

Mỗi photoSet có `files` mapping:
```js
files: {
    hero: 'couple_hero.webp',        // Ảnh hero chính
    envelope: 'couple_main.webp',     // Ảnh envelope/mở thiệp
    story: ['gallery_1.webp', ...],   // Love story section
    gallery: ['gallery_1.webp', ...], // Gallery
    thankyou: 'couple_hero.webp',     // Thank you section
    // Tùy bộ ảnh có thêm: fly, background, banner, event, decoration
}
```

### Bước 5: Chọn icons/elements theo section

| Section | Gợi ý usage filter |
|---------|-------------------|
| Envelope | `envelope-seal`, `envelope-center`, `envelope-left/right` |
| Hero | `hero-center`, `hero-deco`, `corner-deco` |
| Divider | `section-divider` |
| Love story | `love-story-icon`, `love-story-header` |
| Calendar | `calendar-section`, `calendar-background` |
| Gallery | `photo-frame` |
| Footer | `footer-deco` |
| Popup | `popup-background`, `popup-border` |

## Đường dẫn thư viện

```
products/shared/
├── wedding-asset-catalog.js          ← DATA CATALOG (đọc file này)
├── images/
│   ├── wedding/
│   │   ├── icons/                    ← Icon trang trí
│   │   ├── korean-studio-white/      ← Bộ ảnh 1
│   │   ├── korean-studio-gray/       ← Bộ ảnh 2
│   │   ├── korean-studio-classic-beige/
│   │   ├── elegant-black-gold/
│   │   ├── modern-romantic/
│   │   ├── coral-minimalist/
│   │   ├── vit-sang-trong/
│   │   ├── viet-green/
│   │   └── viet-mem-mai/
│   └── wedding-elements/             ← Elements trang trí section
└── music/wedding/                    ← Nhạc nền
```

Relative path từ folder sản phẩm: `../../../shared/images/wedding/{bộ-ảnh}/{file}`

## Quy trình gen thiệp

1. Đọc `wedding-asset-catalog.js` → xác định style
2. Chọn photoSet + icons + elements + music từ catalog
3. Tạo folder `products/Invitation/Wedding/gen_{id}_{slug}/`
4. Gen `code.html` hoặc `index.html` với assets đã chọn
5. Nhạc nền: `../../../shared/music/wedding/{file}`
6. Trang trí sections bằng backgrounds từ `products/shared/images/wedding/backgrounds/` (wreath, corner, floral overlay — xem chi tiết ở `/gen-wedding-pro` Bước 3b)
7. Chụp screenshot bằng Puppeteer (xem chi tiết ở `/gen-wedding-pro` Bước 4):
   - Start: `python3 -m http.server 3001 --directory /path/to/Templexa &`
   - Custom Puppeteer script: `~/.claude/skills/chrome-devtools/tmp/*.mjs`
   - Mobile 430x932 iPhone 17 (envelope) → `screen.png`, Desktop 1280x800 (3 sections) → `anh_1-3.png`
   - Convert: `cwebp -q 85 file.png -o file.webp`, xóa PNG
8. Thêm entry vào `assets/js/data.js`

## Lưu ý

- **Không copy ảnh** vào folder sản phẩm — dùng relative path tới shared
- **Nhạc nền** dùng relative path `../../../shared/music/wedding/`
- **Ảnh couple chỉ là mẫu** — khi gen cho khách thật sẽ thay bằng ảnh khách
- Ưu tiên ảnh cặp đôi châu Á phù hợp thị trường VN
- Xem feedback trong memory: `feedback_wedding_design_style.md`, `feedback_envelope_decoration.md`
