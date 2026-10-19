#!/usr/bin/env node
/**
 * stamp-assets.js — Gắn phiên bản theo nội dung vào link JS hay đổi: data.js → data.js?v=<hash8>.
 *
 *   node scripts/stamp-assets.js          (npm run build:stamp — deploy.js TỰ chạy khi --prod)
 *
 * Lý do: _headers cho /assets/js/* cache 1 ngày (Cloudflare + trình duyệt). HTML không bị cache,
 * nên đổi query trong HTML là khách lấy ngay data.js mới sau khi deploy — không cần purge cache.
 * KHÔNG chạy trên nhánh job: mỗi nhánh một hash → merge xung đột 19 file HTML. Để deploy.js lo lúc lên prod.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const ASSETS = ['assets/js/data.js'];
const SKIP = new Set(['node_modules', '.git', '.wrangler', 'products', 'blogs']);

function htmlFiles(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
        if (SKIP.has(e.name)) return [];
        const p = path.join(dir, e.name);
        return e.isDirectory() ? htmlFiles(p) : e.name.endsWith('.html') ? [p] : [];
    });
}

const files = htmlFiles(ROOT);
for (const asset of ASSETS) {
    const hash = crypto.createHash('md5').update(fs.readFileSync(path.join(ROOT, asset))).digest('hex').slice(0, 8);
    const rx = new RegExp('(["\'][./]*' + asset.replace(/[.]/g, '\\.') + ')(\\?v=[\\w-]+)?(["\'])', 'g');
    let changed = 0;
    for (const f of files) {
        const src = fs.readFileSync(f, 'utf8');
        const next = src.replace(rx, `$1?v=${hash}$3`);
        if (next !== src) { fs.writeFileSync(f, next); changed++; }
    }
    console.log(`✓ ${asset}?v=${hash} → ${changed} file HTML cập nhật`);
}
