#!/usr/bin/env node
/**
 * Khử frame trùng trong <folder thiệp>/shots/: so sánh perceptual (24×48 xám),
 * giữ frame đầu tiên của mỗi nhóm giống nhau, xoá file thừa, cập nhật manifest.json
 * và images[] trong data.js.
 *
 *   node scripts/dedupe-shots.js            # toàn bộ thiệp
 *   node scripts/dedupe-shots.js --ids 1,2  # một số thiệp
 *   node scripts/dedupe-shots.js --dry      # chỉ báo cáo
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { load, save } = require('./lib/products-io');

const ROOT = path.join(__dirname, '..');
const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const idsArg = args.includes('--ids') ? args[args.indexOf('--ids') + 1].split(',').map(Number) : null;
const THRESHOLD = 6;   // sai lệch trung bình pixel (0–255) dưới mức này = trùng

const sig = async (f) => sharp(f).resize(24, 48, { fit: 'fill' }).grayscale().raw().toBuffer();
const diff = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s += Math.abs(a[i] - b[i]); return s / a.length; };

(async () => {
    const { products, src } = load();
    let totalRemoved = 0, touched = 0;
    for (const p of products) {
        if (p.type !== 'invitation' || !p.demoUrl) continue;
        if (idsArg && !idsArg.includes(p.id)) continue;
        const dir = path.join(ROOT, path.dirname(p.demoUrl), 'shots');
        const mf = path.join(dir, 'manifest.json');
        if (!fs.existsSync(mf)) continue;
        const manifest = JSON.parse(fs.readFileSync(mf, 'utf8'));
        const keep = [], removed = [];
        const mainKey = p.mobileView ? path.basename(p.mobileView, '.webp') : null;
        // ưu tiên giữ ảnh đại diện: xét nó trước
        const shots = manifest.shots.filter(s => s.key !== 'full');
        shots.sort((a, b) => (a.key === mainKey ? -1 : b.key === mainKey ? 1 : 0));
        for (const s of shots) {
            const f = path.join(dir, s.file);
            if (!fs.existsSync(f)) { removed.push(s); continue; }
            const g = await sig(f);
            if (keep.some(k => diff(k.sig, g) < THRESHOLD)) removed.push(s); else keep.push(Object.assign({ sig: g }, s));
        }
        if (!removed.length) continue;
        touched++; totalRemoved += removed.length;
        const removedKeys = new Set(removed.map(r => r.key));
        if (!DRY) {
            for (const r of removed) { const f = path.join(dir, r.file); if (fs.existsSync(f)) fs.unlinkSync(f); }
            manifest.shots = manifest.shots.filter(s => !removedKeys.has(s.key));
            manifest.deduped = removed.map(r => r.key);
            fs.writeFileSync(mf, JSON.stringify(manifest, null, 2));
            const rel = (k) => `${path.dirname(p.demoUrl)}/shots/${k}.webp`;
            p.images = (p.images || []).filter(img => !removed.some(r => img === rel(r.key)));
            if (!p.images.length) p.images = [p.mobileView || p.thumbnail];
        }
        console.log(`#${p.id} ${p.name.slice(0, 40)} — giữ ${keep.length}, xoá ${removed.map(r => r.key).join(',')}`);
    }
    if (!DRY) save(products, src);
    console.log(`\n${DRY ? '[dry] ' : ''}${touched} thiệp có frame trùng, ${totalRemoved} file ${DRY ? 'sẽ' : 'đã'} xoá`);
})();
