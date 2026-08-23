# Data & API

> Tách từ CLAUDE.md (23/08/2026) để giữ CLAUDE.md < 40k ký tự.


### INVITATION_PRICING structure (data.js) — bảng giá chính (thiệp)

3 gói: `thiep-basic` (150.000đ), `thiep-pro` (name: "Premium", 199.000đ, `highlighted: true`), `thiep-custom` (Liên hệ). Render vào `#pricingGrid` (`contact.html`) và `#homePricingGrid` (`index.html`, inline script).

```javascript
{
    id: 'thiep-pro',                // thiep-basic | thiep-pro | thiep-custom
    name: 'Premium',
    price: '199.000đ',
    originalPrice: '250.000đ',
    showOriginalPrice: true,
    discount: '-20%',
    description: '...',
    features: [
        'Chọn 1 trong 20+ mẫu thiệp đẹp',
        { text: 'Hiển thị lời chúc bay (bong bóng)', disabled: true },  // object = tính năng bị khoá ở gói thấp hơn
        // ...
    ],
    highlighted: true,              // true = card nổi bật + badge "PHỔ BIẾN NHẤT"
}
```

### PRICING structure (data.js) — bảng giá phụ (web)

4 gói web cũ (BASIC 699K / PRO 2.999K highlighted / PREMIUM 8.000K / CUSTOM Liên hệ). **Chỉ còn render ở `#webPricingGrid`** (`contact.html` section `#web-design`) — không còn xuất hiện trên trang chủ.

```javascript
{
    id: 'pro',
    name: 'PRO',
    price: '2.999.000đ',          // Giá công khai
    originalPrice: '5.000.000đ',   // Giá gốc
    showOriginalPrice: true,        // true = hiển thị gạch ngang, false = ẩn (giữ placeholder)
    discount: '-40%',               // Badge giảm giá ('' = không hiện)
    description: '...',
    features: ['...'],              // Mảng string hoặc { text, disabled }
    highlighted: true,              // true = card nổi bật + badge "PHỔ BIẾN NHẤT"
}
```

### PRODUCTS structure (data.js)

`assets/data/invitation.json` **đã bị xoá** — toàn bộ dữ liệu thiệp (ảnh, path, features, mobileView, variants...) nằm **inline trong `data.js`**. `data-loader.js` trả thẳng product cho `type: 'invitation'` (không fetch thêm); các category khác (`e-commerce`, `education`, `onepage`, `portfolio`) vẫn lazy-load qua `assets/data/{category}.json`. Mảng `PRODUCTS` được nhóm bằng comment: THIỆP CƯỚI / THIỆP SỰ KIỆN KHÁC / WEBSITE / GOOGLE SHEET. Key order chuẩn (xem `scripts/lib/products-io.js`):

```javascript
{
    id: 1,
    name: 'Tên sản phẩm',
    slug: 'ten-san-pham',
    description: 'Mô tả...',
    category: 'onepage',           // onepage | e-commerce | wedding | other | portfolio | education
    type: 'website',               // website | google-sheet | invitation
    style: '',                     // (invitation only) traditional | modern | minimalist | luxury | floral | vintage | ''
    event: '',                     // (invitation only) wedding | dam-ngo | an-hoi | birthday | thoi-noi | anniversary | reunion | gio-to | confession | graduation | holiday | other
    tags: ['tag1', 'tag2'],
    price: 'free',                 // 'free' hoặc giá
    images: ['./products/.../screen.png', './products/.../Screenshot_1.jpg', ...],  // screen.png luôn đầu tiên
    thumbnail: './products/.../screen.png',
    mobileView: '',                // (invitation) ảnh screenshot dọc 9:16 — dùng cho catalog/popup mobile
    path: './products/.../',
    demoUrl: './products/.../index.html',
    variants: [],                  // [{ id, label, demoUrl, thumbnail }] — bản master liệt kê mọi phiên bản kể cả chính nó; entry của từng phiên bản có isPublic:false
    features: ['Tính năng 1', 'Tính năng 2', 'Tính năng 3'],
    status: '',                    // '' | 'bestseller' | 'trending' | 'hot' — KHÔNG còn 'new' (badge NEW tự tính bằng isNewProduct())
    featured: false,               // true = pin tay lên đầu danh sách (dùng cho ~12 mẫu nổi bật)
    priority: 0,                   // 0 = bình thường, 100 = mẫu legacy (#91–119) đẩy xuống cuối — chỉ còn là "bucket", không phải thứ tự chi tiết
    downloads: 5,                 // random 1–10
    rating: 4.8,                   // random 4.7–4.9
    showInSlider: true,            // vẫn tồn tại nhưng không còn ý nghĩa bắt buộc — xem Helper functions
    isPublic: true,                // false = ẩn khỏi products.html/thiep-online.html (vẫn hiện ở products-admin.html)
    updatedAt: '2025-02-17',
}
```

`isNewProduct(p)` tính badge NEW tự động: `updatedAt` trong vòng 30 ngày gần đây (không dùng `status: 'new'` nữa). `STYLE_LABELS` / `EVENT_LABELS` map giá trị `style`/`event` sang nhãn tiếng Việt — dùng cho chip lọc + sub-label card trên `thiep-online.html`.

### API Input Format

| Field | Form Tư Vấn (`contact.html`) | Form Nhận Mẫu (`product-detail.html`) |
|-------|------------------------------|---------------------------------------|
| `email` | Input email (required) | Input email (required) |
| `name` | — | Input họ tên |
| `phone` | Input SĐT | Input SĐT |
| `reference` | Input mẫu tham khảo | Auto: `window.location.href` |
| `service` | Select gói dịch vụ | Để trống `''` |
| `note` | Textarea ghi chú | Để trống `''` |
| `status` | Auto: `"tư vấn"` | Auto: `"submit"` |

### Helper functions (data.js)

| Function | Mô tả |
|----------|-------|
| `getSliderProducts()` | 6 sản phẩm `type: 'invitation'` mới nhất theo `priority`/`id` (`isPublic !== false`) — **không còn dùng `showInSlider`** |
| `getProductById(id)` | Tìm product theo ID |
| `getProductBySlug(slug)` | Tìm product theo slug |
| `getProductsSorted()` | Sort: `type` (invitation → website → google-sheet) → `priority` bucket → `featured` → `status` rank (bestseller, trending, hot) → `updatedAt` desc → `id` desc (`isPublic !== false`) |
| `isNewProduct(p)` | `true` nếu `updatedAt` trong 30 ngày gần đây — thay thế `status: 'new'` |
| `filterProducts({ category, type, search, style, event })` | Lọc products (gọi trên `getProductsSorted()`); `style`/`event` chỉ áp dụng cho invitation |
| `paginateProducts(products, page, perPage)` | Phân trang — mặc định `perPage = 9` (`products.js` override `perPage = 16` khi `currentType === 'invitation'`, tức trên `thiep-online.html`) |
| `getRelatedProducts(productId, limit)` | Cùng `category`, `isPublic !== false`, sort priority, limit 4 |
| `submitToGoogleSheet(formData)` | Gửi form đến Google Sheets API (`sheet_name: 'sale'`) |
| `STYLE_LABELS` / `EVENT_LABELS` | Map hằng — nhãn tiếng Việt cho `style`/`event`, dùng ở chip lọc + sub-label card |

