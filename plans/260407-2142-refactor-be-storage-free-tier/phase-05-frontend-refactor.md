# Phase 05 — Frontend refactor (fetch API)

## Mục tiêu
Thay `data.js` hardcoded → fetch từ Workers API. Giữ vanilla JS, không thêm framework.

## Thay đổi
- `assets/js/data-loader.js`: đã có sẵn → mở rộng với functions:
  - `fetchProducts(filter)`, `fetchProduct(slug)`, `fetchSlider()`, `fetchPricing()`, `fetchRelated(id)`
  - Cache trong `sessionStorage` (TTL 5min)
- `products.js`: replace `filterProducts()` từ data.js → `await fetchProducts()`
- `product-detail.js`: replace `getProductBySlug()` → `await fetchProduct(slug)`
- `contact.js`: pricing render từ API; form POST sang `/api/forms/contact`
- `main.js` (slider): `await fetchSlider()`
- Path ảnh: prepend `CDN_BASE` (R2 public URL) vào `thumbnail`/`images[]`

## Config
`assets/js/config.js`:
```js
window.TEMPLEXA_CONFIG = {
  API_BASE: 'https://api.templexa.com',
  CDN_BASE: 'https://cdn.templexa.com'
};
```

## Loading states
- Skeleton card khi fetch products
- Spinner cho detail page
- Error toast nếu API fail → fallback gọi lại 1 lần

## Done when
- 4 trang chạy hoàn toàn từ API
- `data.js` chỉ còn dùng cho local fallback (hoặc xoá)
- Lighthouse score không giảm > 5 điểm
