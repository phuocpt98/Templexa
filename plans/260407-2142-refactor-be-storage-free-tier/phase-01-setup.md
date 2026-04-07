# Phase 01 — Setup Cloudflare

## Steps
1. Tạo account Cloudflare (free, không cần card)
2. `npm i -D wrangler` ở root
3. `npx wrangler login`
4. Tạo project Pages tên `templexa` (chưa connect git)
5. Tạo R2 bucket: `templexa-assets`
6. Tạo D1 database: `templexa-db` → lưu `database_id`
7. Tạo `wrangler.toml`:
   ```toml
   name = "templexa-api"
   main = "workers/index.js"
   compatibility_date = "2026-04-07"
   [[r2_buckets]]
   binding = "ASSETS"
   bucket_name = "templexa-assets"
   [[d1_databases]]
   binding = "DB"
   database_name = "templexa-db"
   database_id = "..."
   ```

## Done when
- `wrangler whoami` OK
- R2 bucket + D1 db tạo xong
- Có file `wrangler.toml` ở root

## Risks
- Cloudflare yêu cầu verify email — không card
