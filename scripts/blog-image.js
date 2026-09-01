#!/usr/bin/env node
/**
 * blog-image.js — Tải ảnh (URL hoặc file local) → resize → WebP vào blogs/images/<slug>/.
 *
 *   node scripts/blog-image.js <slug> <tên-file-không-đuôi> <url|đường-dẫn-file> [--w 1400] [--h 0] [--q 82]
 *
 * Ví dụ:
 *   node scripts/blog-image.js benching-la-gi cover "https://images.unsplash.com/photo-xxx" --w 1600 --h 900
 *   node scripts/blog-image.js benching-la-gi 01 ./Downloads/anh.jpg
 *
 * - --h > 0 thì crop theo tỉ lệ (cover, attention) — dùng cho ảnh bìa 16:9.
 * - Chỉ dùng ảnh có quyền sử dụng (Unsplash/Pexels/ảnh tự gen) — KHÔNG lấy ảnh của site khác.
 * - In ra kích thước cuối để điền width/height vào <img> (tránh CLS).
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? Number(args[i + 1]) : d; };
const [slug, name, src] = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--')));
if (!slug || !name || !src) {
    console.error('Dùng: node scripts/blog-image.js <slug> <name> <url|file> [--w 1400] [--h 0] [--q 82]');
    process.exit(1);
}
const W = flag('w', 1400), H = flag('h', 0), Q = flag('q', 82);
const ROOT = path.join(__dirname, '..');
const outDir = path.join(ROOT, 'blogs/images', slug);
const outFile = path.join(outDir, name + '.webp');

async function fetchBuf(u) {
    if (!/^https?:\/\//.test(u)) return fs.readFileSync(path.resolve(u));
    const res = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36' } });
    if (!res.ok) throw new Error(`HTTP ${res.status} khi tải ${u}`);
    return Buffer.from(await res.arrayBuffer());
}

(async () => {
    fs.mkdirSync(outDir, { recursive: true });
    const buf = await fetchBuf(src);
    let img = sharp(buf).rotate();
    const meta = await img.metadata();
    img = H > 0
        ? img.resize(W, H, { fit: 'cover', position: sharp.strategy.attention })
        : img.resize({ width: Math.min(W, meta.width || W), withoutEnlargement: true });
    const info = await img.webp({ quality: Q }).toFile(outFile);
    const rel = path.relative(ROOT, outFile);
    console.log(`✓ ${rel}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB  (gốc ${meta.width}x${meta.height})`);
})().catch(e => { console.error('✗', e.message); process.exit(1); });
