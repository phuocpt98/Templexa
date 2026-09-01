#!/usr/bin/env node
/**
 * verify-blog.js — Kiểm tra một bài blog (hoặc trang danh sách) trước khi báo cáo.
 *
 *   node scripts/verify-blog.js <slug|index> [--shots]
 *
 * Kiểm: meta bắt buộc, JSON-LD parse được, ảnh/link nội bộ tồn tại trên đĩa,
 * số từ, h1 duy nhất, h2 ≥ 4, có TOC/RELATED đã build, 0 lỗi console + 0 lỗi tải
 * (Puppeteer, file://), không cuộn ngang ở 390px. --shots: lưu ảnh desktop/mobile
 * vào scratch (in đường dẫn) để tự xem lại bố cục.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const arg = process.argv[2];
const shots = process.argv.includes('--shots');
if (!arg) { console.error('Dùng: node scripts/verify-blog.js <slug|index> [--shots]'); process.exit(1); }
const file = path.join(ROOT, 'blogs', arg + '.html');
if (!fs.existsSync(file)) { console.error('✗ Không có', file); process.exit(1); }
const html = fs.readFileSync(file, 'utf8');
const isIndex = arg === 'index';
const problems = [], warns = [];
const strip = (s) => s.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

// --- meta ---
const need = [/<title>[^<]{10,}<\/title>/, /<meta name="description" content="[^"]{60,}"/, /<link rel="canonical" href="https:\/\/templexa\.vn\/blogs\/[^"]*">/, /property="og:image" content="https:\/\/templexa\.vn\/[^"]+"/];
need.forEach((re, i) => { if (!re.test(html)) problems.push('thiếu/ngắn meta #' + (i + 1) + ' ' + re); });
if (/canonical" href="[^"]*\.html"/.test(html)) problems.push('canonical còn .html (URL SEO phải bỏ .html)');
if (!isIndex) {
    ['article:published_time', 'article:section', 'article:tag'].forEach(k => { if (!html.includes(`property="${k}"`)) problems.push('thiếu meta ' + k); });
    const t = (html.match(/<title>([^<]*)<\/title>/) || [, ''])[1].replace(/\s*\|\s*Templexa\s*$/, '');
    if (t.length > 70) warns.push(`title dài ${t.length} ký tự (>70)`);
    const d = (html.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1];
    if (d.length > 170) warns.push(`description dài ${d.length} ký tự (>170)`);
}
// --- JSON-LD ---
[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].forEach((m, i) => { try { JSON.parse(m[1]); } catch (e) { problems.push(`JSON-LD #${i + 1} không parse: ${e.message}`); } });
if (!/application\/ld\+json/.test(html)) problems.push('không có JSON-LD');
// --- cấu trúc bài ---
if (!isIndex) {
    const h1 = (html.match(/<h1[\s>]/g) || []).length; if (h1 !== 1) problems.push(`có ${h1} thẻ h1 (cần đúng 1)`);
    const body = (html.match(/<article[^>]*bp-body[^>]*>([\s\S]*?)<\/article>/) || [, ''])[1];
    if (!body) problems.push('thiếu <article class="bp-body">');
    const h2 = (body.match(/<h2[\s>]/g) || []).length; if (h2 < 4) warns.push(`chỉ ${h2} h2 (nên ≥ 4)`);
    const words = strip(body).split(/\s+/).filter(Boolean).length;
    if (words < 1000) warns.push(`bài ngắn: ${words} từ (nên ≥ 1200)`); else console.log(`  · ${words} từ, ${h2} mục h2`);
    if (!/<!-- TOC:START -->\s*<ol>/.test(html)) problems.push('TOC chưa build (chạy npm run build:blog)');
    if (!/<!-- RELATED:START -->\s*(<article|<p)/.test(html)) problems.push('RELATED chưa build (chạy npm run build:blog)');
    if (!/bp-cta/.test(html)) warns.push('không có CTA giữa bài');
    if (!/bp-faq/.test(html)) warns.push('không có FAQ');
    const imgs = (body.match(/<img /g) || []).length; if (imgs < 2) warns.push(`chỉ ${imgs} ảnh trong thân bài (nên ≥ 3)`);
    (body.match(/<img [^>]*>/g) || []).forEach(t => { if (!/alt="[^"]{8,}"/.test(t)) warns.push('ảnh thiếu alt mô tả: ' + t.slice(0, 80)); if (!/width="\d+" height="\d+"/.test(t)) warns.push('ảnh thiếu width/height: ' + t.slice(0, 80)); });
    if (!/templexa\.vn|\.\.\/thiep-online|\.\.\/xem-ngay|\.\.\/contact/.test(body)) warns.push('thân bài không có link nội bộ về sản phẩm/công cụ');
}
// --- file tồn tại ---
const refs = [...html.matchAll(/(?:src|href)="([^"#?]+)(?:[#?][^"]*)?"/g)].map(m => m[1]).filter(u => !/^(https?:|mailto:|tel:|data:|javascript:)/.test(u) && u !== '../' && u !== './');
[...new Set(refs)].forEach(u => { const p = path.resolve(path.dirname(file), u); if (!fs.existsSync(p) && !fs.existsSync(p + '.html')) problems.push('link/ảnh không tồn tại: ' + u); });
if (/href="\.\.\/(thiep-online|products|contact|xem-ngay-cuoi-dep|cau-hoi-thuong-gap)(\?|#|")/.test(html)) problems.push('link nội bộ thiếu .html (quy ước: href giữ .html, chỉ URL SEO bỏ .html)');

// --- puppeteer ---
(async () => {
    let puppeteer; try { puppeteer = require('puppeteer'); } catch (e) { warns.push('không có puppeteer — bỏ qua kiểm runtime'); return report(); }
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const errs = [], failed = [];
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    page.on('pageerror', e => errs.push(e.message));
    page.on('requestfailed', r => { const u = r.url(); if (!/googletagmanager|google-analytics|gstatic|googleapis/.test(u)) failed.push(u); });
    const outDir = process.env.SCRATCH || path.join(require('os').tmpdir(), 'templexa-blog-verify'); fs.mkdirSync(outDir, { recursive: true });
    for (const [name, vp] of [['desktop', { width: 1280, height: 800 }], ['mobile', { width: 390, height: 844, deviceScaleFactor: 2 }]]) {
        await page.setViewport(vp);
        await page.goto('file://' + file, { waitUntil: 'networkidle0', timeout: 30000 });
        await page.evaluate(() => document.fonts.ready);
        const sw = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        if (sw > 1) problems.push(`${name}: cuộn ngang ${sw}px`);
        if (shots) { const p = path.join(outDir, `${arg}-${name}.png`); await page.screenshot({ path: p, fullPage: true }); console.log('  · ảnh', p); }
    }
    // dark mode nhanh
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    if (shots) { const p = path.join(outDir, `${arg}-dark.png`); await page.setViewport({ width: 1280, height: 800 }); await page.screenshot({ path: p }); console.log('  · ảnh', p); }
    await browser.close();
    if (errs.length) problems.push('console error: ' + [...new Set(errs)].slice(0, 5).join(' | '));
    if (failed.length) problems.push('tải lỗi: ' + [...new Set(failed)].slice(0, 5).join(' | '));
    report();
})();
function report() {
    warns.forEach(w => console.log('  ⚠ ' + w));
    problems.forEach(p => console.log('  ✗ ' + p));
    console.log(problems.length ? `✗ blogs/${arg}.html: ${problems.length} lỗi, ${warns.length} cảnh báo` : `✓ blogs/${arg}.html OK (${warns.length} cảnh báo)`);
    process.exit(problems.length ? 1 : 0);
}
