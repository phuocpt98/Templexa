#!/usr/bin/env node
/**
 * Sinh assets/data/og-pid.json — tiêu đề, mô tả, ảnh chia sẻ của từng mẫu public, theo id.
 *
 * Vì sao: link chi tiết mẫu là popup trên hub (?pid=314). Facebook/Zalo không chạy JS nên xem trước link
 * luôn ra ảnh chung của site. functions/_middleware.js (Cloudflare Pages Function) đọc file này và thay
 * og:/twitter: theo pid ngay trong HTML trả về.
 *
 * Ảnh: ưu tiên og-cover.jpg trong thư mục mẫu (1200×630, JPG — Zalo/Facebook đọc chắc chắn), không có thì thumbnail.
 *
 *   node scripts/build-og-pid.js        (nằm trong npm run build:seo, sau build:landing)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { load } = require('./lib/products-io');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://templexa.vn';
const OUT = path.join(ROOT, 'assets/data/og-pid.json');
const abs = (p) => encodeURI(SITE + '/' + String(p).replace(/^\.\//, ''));
const clip = (s, n) => { s = String(s || '').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s; };

const map = {};
for (const p of load().products) {
    if (p.isPublic === false) continue;
    const dir = String(p.path || '').replace(/^\.\//, '');
    const og = dir && fs.existsSync(path.join(ROOT, dir, 'og-cover.jpg')) ? dir.replace(/\/?$/, '/') + 'og-cover.jpg' : '';
    const img = og || p.thumbnail || (p.images || [])[0];
    if (!img) continue;
    map[p.id] = {
        t: p.name + ' | Templexa',
        d: clip(p.description, 160),
        i: abs(img),
        ...(og ? { w: 1200, h: 630 } : {}),
        u: p.type === 'invitation' ? 'thiep-online' : 'products',   // hub đúng của mẫu (og:url)
    };
}
fs.writeFileSync(OUT, JSON.stringify(map));
console.log(`✓ ${path.relative(ROOT, OUT)}: ${Object.keys(map).length} mẫu, ${Math.round(fs.statSync(OUT).size / 1024)}KB`);
