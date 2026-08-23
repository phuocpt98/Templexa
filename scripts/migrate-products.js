#!/usr/bin/env node
/**
 * Đợt 2 — Migrate schema PRODUCTS trong assets/js/data.js (chạy 1 lần).
 *
 *  - Gộp assets/data/invitation.json (images/path/features/mobileView) vào entry thiệp
 *  - Thêm field mới cho thiệp: featured, style, event, variants
 *  - priority lẻ (âm/999) → featured=true cho nhóm pin tay, còn lại 0; legacy EN (#91–119) → 100
 *  - status 'new' hàng loạt → '' (NEW sẽ tự tính theo updatedAt)
 *  - showInSlider chỉ true khi isPublic !== false
 *  - Ghi lại PRODUCTS theo nhóm type/category, format thống nhất
 *
 *    node scripts/migrate-products.js            # ghi đè data.js
 *    node scripts/migrate-products.js --dry      # chỉ in thống kê
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA = path.join(ROOT, 'assets/js/data.js');
const INV_JSON = path.join(ROOT, 'assets/data/invitation.json');
const DRY = process.argv.includes('--dry');

const src = fs.readFileSync(DATA, 'utf8');
const m = src.match(/(const PRODUCTS\s*=\s*)(\[[\s\S]*?\n\]);/);
if (!m) throw new Error('Không tìm thấy const PRODUCTS');
const PRODUCTS = eval(m[2]);
const inv = fs.existsSync(INV_JSON) ? JSON.parse(fs.readFileSync(INV_JSON, 'utf8')) : {};

const stats = { merged: 0, featured: 0, legacy: 0, statusCleared: 0, sliderFixed: 0 };

for (const p of PRODUCTS) {
    if (p.type !== 'invitation') continue;

    // 1. gộp JSON
    const extra = inv[p.id];
    if (extra) {
        if (!p.images || !p.images.length) p.images = extra.images;
        if (!p.path && extra.path) p.path = extra.path;
        if ((!p.features || !p.features.length) && extra.features) p.features = extra.features;
        if (!p.mobileView && extra.mobileView) p.mobileView = extra.mobileView;
        stats.merged++;
    }
    if (!p.images || !p.images.length) p.images = [p.thumbnail];

    // 2. priority → featured
    const pr = Number(p.priority) || 0;
    const isLegacy = p.id >= 91 && p.id <= 119;
    p.featured = pr <= -1 && p.isPublic !== false;
    if (p.featured) stats.featured++;
    if (isLegacy) { p.priority = 100; stats.legacy++; } else p.priority = 0;

    // 3. status
    if (p.status === 'new') { p.status = ''; stats.statusCleared++; }

    // 4. slider
    if (p.showInSlider && p.isPublic === false) { p.showInSlider = false; stats.sliderFixed++; }

    // 5. field mới
    if (!('style' in p)) p.style = '';
    if (!('event' in p)) p.event = '';
    if (!Array.isArray(p.variants)) p.variants = [];
}

// ---------- serializer ----------
const KEY_ORDER = ['id', 'name', 'slug', 'description', 'category', 'type', 'style', 'event', 'tags', 'price',
    'images', 'thumbnail', 'mobileView', 'path', 'demoUrl', 'variants', 'features', 'status', 'featured',
    'priority', 'downloads', 'rating', 'showInSlider', 'isPublic', 'updatedAt'];

const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";

function ser(v, ind) {
    const pad = ' '.repeat(ind);
    if (Array.isArray(v)) {
        if (!v.length) return '[]';
        const simple = v.every(x => typeof x === 'string' && x.length < 40);
        if (simple) return '[' + v.map(q).join(', ') + ']';
        return '[\n' + v.map(x => pad + '    ' + ser(x, ind + 4) + ',').join('\n') + '\n' + pad + ']';
    }
    if (v && typeof v === 'object') {
        const keys = Object.keys(v).sort((a, b) => {
            const ia = KEY_ORDER.indexOf(a), ib = KEY_ORDER.indexOf(b);
            return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
        });
        return '{\n' + keys.map(k => pad + '    ' + k + ': ' + ser(v[k], ind + 4) + ',').join('\n') + '\n' + pad + '}';
    }
    if (typeof v === 'string') return q(v);
    return String(v);
}

const GROUPS = [
    ['invitation', 'wedding', 'THIỆP CƯỚI (invitation / wedding)'],
    ['invitation', 'other', 'THIỆP SỰ KIỆN KHÁC (invitation / other)'],
    ['website', null, 'WEBSITE'],
    ['google-sheet', null, 'GOOGLE SHEET'],
];
const seen = new Set();
let out = '[\n';
for (const [type, cat, label] of GROUPS) {
    const list = PRODUCTS.filter(p => p.type === type && (cat === null || p.category === cat) && !seen.has(p));
    if (!list.length) continue;
    list.forEach(p => seen.add(p));
    out += `    // ── ${label} — ${list.length} ──────────────\n`;
    out += list.map(p => '    ' + ser(p, 4) + ',').join('\n') + '\n';
}
const rest = PRODUCTS.filter(p => !seen.has(p));
if (rest.length) {
    out += `    // ── KHÁC — ${rest.length} ──────────────\n`;
    out += rest.map(p => '    ' + ser(p, 4) + ',').join('\n') + '\n';
}
out += ']';

console.log(stats, 'total', PRODUCTS.length);
if (DRY) process.exit(0);

fs.writeFileSync(DATA, src.replace(m[0], m[1] + out + ';'));
// kiểm tra parse lại
const check = eval(fs.readFileSync(DATA, 'utf8').match(/const PRODUCTS\s*=\s*(\[[\s\S]*?\n\]);/)[1]);
if (check.length !== PRODUCTS.length) throw new Error('Số entry không khớp sau khi ghi');
console.log('✓ data.js ghi lại', check.length, 'entries');
