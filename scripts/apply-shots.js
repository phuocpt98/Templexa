#!/usr/bin/env node
/**
 * Đợt 4b — Áp kết quả chọn ảnh (từ subagent xem ảnh) vào data.js.
 *
 *   node scripts/apply-shots.js <selections.json> [--clean]
 *
 * selections.json: { "<id>": { "main": "open", "order": ["open","cover","sec-1",...], "skip": false, "note": "" }, ... }
 *   - main  : key ảnh đại diện (cover | open | sec-N) → mobileView
 *   - order : thứ tự ảnh dọc cho gallery (mặc định: main trước, rồi các shot còn lại theo manifest)
 *   - skip  : true → không đụng entry này
 * --clean : xoá ảnh ngang cũ trong folder thiệp (screen.png, Screenshot_*.jpg/png, *.webp kiểu "(2).webp")
 *           nếu file KHÔNG được index.html của thiệp tham chiếu và không còn trong images[] mới.
 */
const fs = require('fs');
const path = require('path');
const { load, save } = require('./lib/products-io');

const ROOT = path.join(__dirname, '..');
const selFile = process.argv[2];
const CLEAN = process.argv.includes('--clean');
if (!selFile) { console.error('Cần file selections.json'); process.exit(1); }
const SEL = JSON.parse(fs.readFileSync(selFile, 'utf8'));

const { products, src } = load();
let applied = 0, cleaned = 0, missing = [];

for (const [idStr, sel] of Object.entries(SEL)) {
    const id = Number(idStr);
    const p = products.find(x => x.id === id);
    if (!p || sel.skip) continue;
    const dir = path.dirname(p.demoUrl);                       // ./products/.../folder
    const shotsDir = path.join(ROOT, dir, 'shots');
    const manifestFile = path.join(shotsDir, 'manifest.json');
    if (!fs.existsSync(manifestFile)) { missing.push(id); continue; }
    const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
    const keys = manifest.shots.map(s => s.key).filter(k => k !== 'full');
    const main = keys.includes(sel.main) ? sel.main : (keys.includes('open') ? 'open' : keys[0]);
    let order = Array.isArray(sel.order) && sel.order.length ? sel.order.filter(k => keys.includes(k)) : [];
    if (!order.includes(main)) order.unshift(main);
    order = [...new Set(order)];
    for (const k of keys) if (!order.includes(k)) order.push(k);

    const rel = (k) => `${dir}/shots/${k}.webp`;
    const oldImages = p.images || [];
    p.mobileView = rel(main);
    p.images = order.map(rel);
    // thumbnail (og:image, landscape ok) giữ nếu còn tồn tại, không thì dùng mobileView
    if (!p.thumbnail || !fs.existsSync(path.join(ROOT, p.thumbnail))) p.thumbnail = p.mobileView;
    p.updatedAt = new Date().toISOString().slice(0, 10);
    applied++;

    if (CLEAN) {
        const html = fs.existsSync(path.join(ROOT, p.demoUrl)) ? fs.readFileSync(path.join(ROOT, p.demoUrl), 'utf8') : '';
        for (const img of oldImages) {
            const base = path.basename(img);
            const isOldShot = /^(screen\.png|screenshot[_ -]?\d*\.(png|jpe?g|webp)|.*\(\d+\)\.(webp|png|jpe?g)|.*_web_desktop_.*\.(webp|png|jpe?g))$/i.test(base);
            if (!isOldShot) continue;
            if (p.images.includes(img) || img === p.thumbnail) continue;
            if (html.includes(base)) continue;                  // thiệp đang dùng file này
            const abs = path.join(ROOT, img);
            if (fs.existsSync(abs)) { fs.unlinkSync(abs); cleaned++; }
        }
    }
}

save(products, src);
console.log(`✓ áp ${applied} thiệp, thiếu manifest: [${missing.join(', ')}], xoá ảnh cũ: ${cleaned}`);
