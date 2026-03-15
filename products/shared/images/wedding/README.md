# Wedding Photo Library — Ảnh mẫu cho thiệp cưới

Kho ảnh dùng chung khi gen thiệp cưới mẫu.
Mỗi subfolder = 1 bộ ảnh theo phong cách/tông màu riêng.

## Cách dùng

Khi gen mẫu thiệp cưới (`/gen-wedding`):
1. Chọn bộ ảnh phù hợp phong cách/tông màu thiệp
2. Copy ảnh từ subfolder vào folder sản phẩm, hoặc dùng relative path
3. Thay URL Unsplash → path ảnh local

## Cấu trúc

```
products/shared/images/wedding/
├── README.md                    ← File này
├── korean-studio-white/         ← Bộ 1: Hàn Quốc, studio trắng kem
│   ├── couple_1.webp            (cặp đôi chính diện, hero)
│   ├── couple_2.webp            (close-up lãng mạn)
│   ├── couple_3.webp            (close-up variant)
│   ├── couple_4.webp            (toàn thân, vui tươi)
│   ├── couple_5.webp            (cận mặt, cười)
│   └── couple_6.webp            (cận mặt, dịu dàng)
├── korean-outdoor-nature/       ← (chưa có) Hàn Quốc, ngoài trời
├── chinese-traditional-red/     ← (chưa có) Trung Quốc, truyền thống đỏ
├── dark-luxury-studio/          ← (chưa có) Studio tối, sang trọng
├── garden-rustic/               ← (chưa có) Vườn, mộc mạc
└── beach-tropical/              ← (chưa có) Biển, nhiệt đới
```

## Bộ ảnh hiện có

### 1. `korean-studio-white/` — Hàn Quốc Studio Trắng Kem

| File | Mô tả | Dùng cho |
|------|--------|----------|
| `couple_1.webp` (98KB) | Cặp đôi chính diện, nền kem, hoa | Hero, big photo |
| `couple_2.webp` (178KB) | Close-up lãng mạn, áp má | Letter/envelope, love story |
| `couple_3.webp` (220KB) | Close-up lãng mạn (variant) | Gallery, love story |
| `couple_4.webp` (220KB) | Toàn thân, vui tươi, cầm hoa | Avatar đôi, gallery |
| `couple_5.webp` (157KB) | Cận mặt, cười tươi | Gallery, thank you |
| `couple_6.webp` (202KB) | Cận mặt, dịu dàng | Gallery, thank you bg |

**Phong cách**: Elegant, romantic, nhẹ nhàng
**Tông màu**: Trắng kem, nude, hồng nhạt
**Phù hợp với palette**: Classic Gold, Blush Pink, Dusty Rose, Lavender
**Nguồn**: cinelove.me (mẫu thiệp cưới 53)

## Gợi ý chọn bộ ảnh theo palette thiệp

| Palette thiệp | Bộ ảnh gợi ý |
|---------------|--------------|
| Classic Gold | `korean-studio-white` |
| Blush Pink | `korean-studio-white` |
| Sage Green | `garden-rustic` (chưa có) |
| Navy & Gold | `dark-luxury-studio` (chưa có) |
| Traditional Red | `chinese-traditional-red` (chưa có) |
| Tropical | `beach-tropical` (chưa có) |
| Dusty Rose | `korean-studio-white` |
| Dark Luxury | `dark-luxury-studio` (chưa có) |

## Thêm bộ ảnh mới

1. Tạo subfolder: `{phong-cách}-{mô-tả}/`
2. Đặt 6-10 ảnh JPG (800px width, ~60-80KB mỗi ảnh)
3. Đặt tên file: `{nguồn}_{số}.webp` (VD: `pexels_1.webp`, `custom_1.webp`)
4. Cập nhật README này — thêm bảng mô tả + palette phù hợp
5. Cập nhật skill `/gen-wedding` nếu cần

## Lưu ý

- Ảnh chỉ dùng làm MẪU — khi gen cho khách thật sẽ thay bằng ảnh khách
- Ưu tiên ảnh cặp đôi châu Á (Hàn/Trung/Việt) — phù hợp thị trường VN
- Ảnh phải có MẪU NGƯỜI — không dùng ảnh phong cảnh/hoa/venue làm ảnh chính
- Kích thước gợi ý: 800px width, JPG quality 85-90
