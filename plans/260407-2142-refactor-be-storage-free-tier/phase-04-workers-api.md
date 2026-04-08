# Phase 04 — Workers API

## Endpoints (REST, JSON)
| Method | Path | Mô tả |
|---|---|---|
| GET | `/api/products` | List + filter `?category=&type=&search=&page=` |
| GET | `/api/products/:slug` | Detail + images + tags + features |
| GET | `/api/products/slider` | `show_in_slider=1` |
| GET | `/api/pricing` | Pricing list |
| POST | `/api/forms/contact` | Form tư vấn → D1 + (optional) Google Sheet |
| POST | `/api/forms/sample` | Form nhận mẫu |
| GET | `/api/related/:id?limit=4` | Related products |

## Stack trong Worker
- Router: `itty-router` (lightweight)
- Validate: zod hoặc manual
- CORS: cho phép domain Pages
- Cache: `caches.default.put(req, res, {ttl: 300})` cho GET

## File layout
```
workers/
├── index.js         # router entry
├── handlers/
│   ├── products.js
│   ├── pricing.js
│   └── forms.js
└── lib/
    ├── db.js        # D1 helpers
    └── cors.js
```

## Done when
- `curl <worker>/api/products?category=onepage` trả JSON đúng
- POST form lưu vào `form_submissions`
- Cache headers OK
