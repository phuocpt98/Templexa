# Heritage Elements — Hoa văn truyền thống Việt Nam

Bộ element trang trí **vàng kim, nền trong suốt (alpha)** theo phong cách đình chùa /
nhà thờ họ / sơn son thếp vàng. Dùng cho thiệp giỗ tổ, lễ họ, tân gia, khánh thành,
lễ hội truyền thống.

Tất cả đều là WebP có alpha thật → đặt lên nền màu bất kỳ không lộ viền trắng.

## Bộ 1 — Rồng, mây, hồi văn, sen

| File | Nội dung | Kích thước | Dùng ở đâu |
|------|----------|-----------|------------|
| `corner-cloud-fret-tl.webp` | Góc vân mây + hồi văn, mở xuống-phải | 277×343 | Góc trên-trái khung thiệp |
| `corner-cloud-fret-tr.webp` | Góc, mở xuống-trái | 277×343 | Góc trên-phải |
| `corner-cloud-fret-bl.webp` | Góc, mở lên-phải | 277×343 | Góc dưới-trái |
| `corner-cloud-fret-br.webp` | Góc, mở lên-trái | 277×343 | Góc dưới-phải |
| `crest-dragon-pair.webp` | Đôi rồng chầu ngọc lửa trên nền mây | 696×255 | Đỉnh envelope / hero — element hoành tráng nhất |
| `medallion-lotus-ring.webp` | Khung tròn viền sen + mây, **giữa rỗng** | 360×361 | Đặt chữ 杜 / họ tộc vào giữa |
| `divider-lotus-cloud.webp` | Divider ngang: sen giữa, tua mây hai bên | 516×91 | Ngăn cách section |
| `border-fret-vertical.webp` | Dải dọc hồi văn lặp | 101×439 | Viền dọc hai mép thiệp (`repeat-y`) |
| `ornament-lotus-bloom.webp` | Hoa sen nở + lá + gợn nước | 563×270 | Chân trang / kết thiệp |

## Bộ 2 — Hạc, lư hương, trống đồng, cuốn thư

| File | Nội dung | Kích thước | Dùng ở đâu |
|------|----------|-----------|------------|
| `crane-turtle-left.webp` | Hạc đứng lưng rùa, quay trái | 283×386 | Cặp đối xứng hai bên ban thờ / tiêu đề |
| `crane-turtle-right.webp` | Hạc lưng rùa, quay phải | 283×386 | ↑ |
| `incense-burner.webp` | Lư hương 3 chân, 3 nén nhang khói mây | 299×408 | Hero, section dâng hương |
| `scroll-banner.webp` | Cuốn thư ngang, **giữa rỗng** | 397×234 | Nền cho tiêu đề section |
| `coin-ancient.webp` | Đồng tiền cổ, **lỗ vuông rỗng** | 272×270 | Badge nhỏ, bullet trang trí |
| `blossom-branch.webp` | Cành mai/đào vàng | 386×347 | Trang trí góc nền, scatter |
| `bronze-drum.webp` | Trống đồng Đông Sơn | 333×380 | Biểu tượng cội nguồn |
| `couplet-pair.webp` | Đôi câu đối dọc, **giữa rỗng** (cả cặp) | 236×408 | Hai bên hero |
| `couplet-left.webp` | Câu đối trái (đã tách) | 91×400 | Dùng riêng từng vế |
| `couplet-right.webp` | Câu đối phải (đã tách) | 90×400 | ↑ |
| `frame-square-fret.webp` | Khung vuông hồi văn, **giữa rỗng** | 303×306 | Bọc ảnh / icon |

> Các element ghi **"giữa rỗng"** được thiết kế để đặt nội dung (chữ, ảnh) vào giữa —
> dùng `position: relative` cho khung, `position: absolute` cho nội dung.

## Cách tạo thêm element mới

1. Dùng prompt mẫu trong `AI-PROMPT-3x3.txt` (có sẵn 2 bộ prompt) → gen ảnh lưới 3×3
2. Lưu ảnh về `products/shared/new/`
3. Cắt tự động:

```bash
node scripts/cut-element-grid.js \
  --input "products/shared/new/<ten-anh>.png" \
  --out products/shared/images/heritage-elements \
  --names ten-1,ten-2,ten-3,ten-4,ten-5,ten-6,ten-7,ten-8,ten-9
```

Script tự: gom vùng liên thông theo lưới → trim sát nội dung → tách nền trắng
thành alpha (giữ nguyên vàng nhạt) → xuất WebP.

**Tham số hữu ích:**

| Cờ | Mặc định | Ý nghĩa |
|----|---------|---------|
| `--rows` / `--cols` | 3 / 3 | Kích thước lưới |
| `--free` | tắt | Bỏ lưới, tự dò hoàn toàn (ảnh xếp không đều) |
| `--threshold` | 248 | Độ sáng coi là nền. Giảm nếu nền hơi xám |
| `--chroma` | 14 | Ngưỡng bão hoà. Tăng nếu element có mảng gần-xám bị mất |
| `--gap` | 24 | Bán kính gộp mảnh rời (chỉ dùng ở `--free`) |
| `--padding` | 4 | Đệm px quanh element |

## Lưu ý khi dùng

- **Ưu tiên element có alpha thật** (bộ này) thay vì ảnh nền trắng — không cần `mask-image` vá víu
- Corner: chỉ cần 1 ảnh gốc rồi lật `scaleX(-1)` / `scaleY(-1)` / `scale(-1,-1)` cho 3 góc còn lại,
  **nhưng** bộ này đã có sẵn đủ 4 góc đúng hướng nên dùng thẳng, khỏi lật
- Đặt `opacity` cao (0.8–1.0) cho corner, 0.4–0.6 cho hoạ tiết nền scatter — vàng trên nền sáng
  cần đậm mới thấy rõ
- Trên nền tối, vàng nổi rất rõ → có thể giảm opacity xuống 0.6–0.8
