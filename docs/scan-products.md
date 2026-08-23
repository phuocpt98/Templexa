# Quy trình quét sản phẩm vào data.js

> Tách từ CLAUDE.md (23/08/2026) để giữ CLAUDE.md < 40k ký tự.


### Quét đơn lẻ (từ folder)

User bảo: `"quét giúp tôi products/Invitation/Other/tên-folder thêm vào data.js"`

AI thực hiện:
1. `ls` folder → lấy danh sách file
2. Kiểm tra `index.html` → xác định có demo hay không
3. Đọc `<title>` trong `index.html` → lấy tên/mô tả
4. Lấy đường dẫn ảnh (KHÔNG đọc nội dung ảnh)
5. Xác định `type` từ folder cha (`Web`→`website`, `Google-sheet`→`google-sheet`, `Invitation`→`invitation`)
6. Xác định `category` từ folder loại-nhỏ (lowercase)
7. Sinh product entry → chèn vào `data.js` trước `];`
8. Cập nhật `products.md` (số lượng + danh sách)

### Quét hàng loạt (từ data.csv)

User bảo: `"quét lại data.csv vào data.js"`

AI thực hiện:
1. Đọc `data.csv` → lấy danh sách sản phẩm
2. Với mỗi dòng: quét folder tương ứng → merge dữ liệu
3. Ưu tiên: **CSV > quét folder > giá trị mặc định**
4. Ghi vào `data.js` + cập nhật `products.md`

### Nguyên tắc quét ảnh
- **KHÔNG đọc nội dung file ảnh** — chỉ lấy đường dẫn
- Ưu tiên thumbnail: `thumbnail.png` > `thumbnail.jpg` > `screen.png` > file ảnh đầu tiên
- Mảng `images[]`: thumbnail trước, rồi các ảnh phụ theo thứ tự tên file
- Bỏ qua file không phải ảnh (`.html`, `.mp3`, `.css`, `.js`)

### Fields tự sinh khi quét

| Field | Cách sinh |
|-------|----------|
| `id` | Tự tăng từ ID cuối cùng + 1 |
| `name` | Lấy từ `<title>` trong `index.html`, hoặc chuyển tên folder thành Title Case |
| `slug` | Sinh từ `name` (kebab-case) |
| `description` | Sinh từ nội dung `index.html`, hoặc từ category + name |
| `category` | Loại-nhỏ từ đường dẫn folder (lowercase) |
| `type` | Loại chính: `Web`→`website`, `Google-sheet`→`google-sheet`, `Invitation`→`invitation` |
| `tags` | Sinh từ type + category + keywords trong name |
| `price` | Mặc định `'free'` |
| `images` | Quét file ảnh trong folder |
| `thumbnail` | Ảnh ưu tiên theo quy tắc trên |
| `path` | `./products/{Loại}/{Loại-nhỏ}/{folder}/` |
| `demoUrl` | Có `index.html` → `{path}index.html`, không có → `''` |
| `features` | 3 tính năng sinh theo nội dung index.html hoặc category |
| `style` | (invitation only) đoán từ tên/nội dung mẫu — `traditional`/`modern`/`minimalist`/`luxury`/`floral`/`vintage`/`''` |
| `event` | (invitation only) `wedding` mặc định, hoặc suy ra từ tên (dạm ngõ, ăn hỏi, sinh nhật, thôi nôi...) |
| `status` | Mặc định `''` (KHÔNG dùng `'new'` — badge NEW tự tính bằng `isNewProduct()`) |
| `featured` | Mặc định `false` |
| `priority` | Mặc định `0` (chỉ là bucket — `100` dành riêng cho mẫu legacy) |
| `downloads` | Random `1–10` |
| `rating` | Random `4.7–4.9` |
| `showInSlider` | Mặc định `false` |
| `isPublic` | Mặc định `true` (đặt `false` nếu là mẫu chờ duyệt/nháp) |
| `mobileView` | (invitation) để trống, gán sau khi chạy `npm run shoot:mobile -- --ids <id>` và chọn ảnh đẹp nhất |
| `variants` | Mặc định `[]` |
| `updatedAt` | Ngày hiện tại |

### Lưu ý
- Tên folder/file có thể có tiếng Việt và khoảng trắng — xử lý bình thường trong JS
- Nếu cần mô tả chính xác hơn: đọc `index.html` lấy `<title>` và `<meta description>`
- Chi tiết danh sách sản phẩm xem trong `products/products.md`

