# Phase 03 — D1 schema + import data.js

## Schema (SQLite/D1)
```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  type TEXT NOT NULL,
  price TEXT,
  thumbnail TEXT,           -- R2 key
  demo_url TEXT,
  status TEXT,
  priority INTEGER DEFAULT 0,
  downloads INTEGER,
  rating REAL,
  show_in_slider INTEGER DEFAULT 0,
  is_public INTEGER DEFAULT 1,
  updated_at TEXT
);
CREATE TABLE product_images (id INTEGER PRIMARY KEY, product_id INTEGER, url TEXT, sort INTEGER);
CREATE TABLE product_tags (product_id INTEGER, tag TEXT, PRIMARY KEY(product_id, tag));
CREATE TABLE product_features (id INTEGER PRIMARY KEY, product_id INTEGER, text TEXT, sort INTEGER);
CREATE TABLE pricing (id TEXT PRIMARY KEY, name TEXT, price TEXT, original_price TEXT,
  show_original INTEGER, discount TEXT, description TEXT, features_json TEXT, highlighted INTEGER);
CREATE TABLE form_submissions (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, name TEXT,
  phone TEXT, reference TEXT, service TEXT, note TEXT, status TEXT, created_at TEXT);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_type ON products(type);
```

## Steps
1. `wrangler d1 execute templexa-db --file=schema.sql`
2. Viết `scripts/import-data-to-d1.js` đọc `assets/js/data.js` (parse PRODUCTS array) → sinh INSERT statements
3. Tách images/tags/features ra bảng phụ
4. Import PRICING
5. Verify count = 220

## Done when
- `SELECT COUNT(*) FROM products` = 220
- Sample query trả đúng product
