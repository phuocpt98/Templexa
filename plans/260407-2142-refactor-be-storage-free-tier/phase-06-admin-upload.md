# Phase 06 — Admin auth + upload

## Mục tiêu
Cho `products-admin.html` thêm/sửa/xoá product + upload ảnh lên R2.

## Auth (đơn giản, 1 user)
- Env var Worker: `ADMIN_PASSWORD_HASH` (bcrypt/sha256)
- POST `/api/admin/login` → trả JWT (HMAC, secret env), TTL 7 ngày
- Middleware `requireAdmin` check Bearer token
- Frontend lưu token `localStorage.adminToken`

## Admin endpoints
| Method | Path |
|---|---|
| POST | `/api/admin/login` |
| POST | `/api/admin/products` (create) |
| PUT | `/api/admin/products/:id` |
| DELETE | `/api/admin/products/:id` |
| POST | `/api/admin/upload` (multipart → R2) |
| GET | `/api/admin/forms` (xem submissions) |

## Upload flow
1. Frontend chọn file → POST `/api/admin/upload` (multipart)
2. Worker sinh key `products/{category}/{slug}/{filename}`
3. `env.ASSETS.put(key, file.stream())`
4. Trả về `{key, url}` → frontend lưu vào field `images[]`

## Done when
- Login admin OK
- Tạo product mới + upload ảnh từ UI
- Xem form submissions
