#!/usr/bin/env node
/**
 * Đợt 4 — Chụp bộ ảnh dọc (390×844 @2x) cho thiệp mời bằng puppeteer + sharp.
 *
 *   node scripts/shoot-mobile.js --ids 210,217          # theo id trong data.js
 *   node scripts/shoot-mobile.js --missing                # mọi thiệp public chưa có mobileView
 *   node scripts/shoot-mobile.js --all                    # tất cả thiệp
 *   node scripts/shoot-mobile.js --url ./products/.../index.html --out ./tmp/x   # 1 trang bất kỳ
 *
 * Kết quả: <folder thiệp>/shots/cover.webp, open.webp, sec-1..N.webp, full.webp
 *          + shots/manifest.json (kích thước, thứ tự). KHÔNG sửa data.js —
 *          việc chọn ảnh đẹp nhất làm ở bước sau (subagent xem ảnh rồi quyết).
 */
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const PORT = 8791;
const VIEW = { width: 390, height: 844, deviceScaleFactor: 2 };
const MAX_SECTIONS = 6;
const QUALITY = 82;

const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const has = (k) => args.includes(k);

// ---------- static server ----------
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
    '.gif': 'image/gif', '.mp3': 'audio/mpeg', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.ico': 'image/x-icon', '.mp4': 'video/mp4' };
function serve() {
    return new Promise((resolve) => {
        const srv = http.createServer((req, res) => {
            const url = decodeURIComponent(req.url.split('?')[0]);
            let file = path.join(ROOT, url);
            if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
            if (!fs.existsSync(file)) { res.writeHead(404); return res.end(); }
            res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
            fs.createReadStream(file).pipe(res);
        });
        srv.listen(PORT, '127.0.0.1', () => resolve(srv));
    });
}

// ---------- targets ----------
function loadProducts() {
    const src = fs.readFileSync(path.join(ROOT, 'assets/js/data.js'), 'utf8');
    return eval(src.match(/const PRODUCTS\s*=\s*(\[[\s\S]*?\n\]);/)[1]);
}
function targets() {
    if (opt('--url')) {
        const u = opt('--url');
        return [{ id: 'custom', demoUrl: u, outDir: opt('--out') || path.join(path.dirname(path.join(ROOT, u)), 'shots') }];
    }
    const P = loadProducts().filter(p => p.type === 'invitation' && p.demoUrl);
    let list = P;
    if (opt('--ids')) { const ids = opt('--ids').split(',').map(Number); list = P.filter(p => ids.includes(p.id)); }
    else if (has('--missing')) list = P.filter(p => p.isPublic !== false && !p.mobileView);
    else if (!has('--all')) { console.error('Cần --ids | --missing | --all | --url'); process.exit(1); }
    return list.map(p => ({ id: p.id, name: p.name, demoUrl: p.demoUrl, outDir: path.join(ROOT, path.dirname(p.demoUrl), 'shots') }));
}

// ---------- page helpers ----------
const OPEN_SELECTORS = [
    '#openBtn', '#open-btn', '#btnOpen', '.open-btn', '.btn-open', '.open-button', '.envelope-btn', '.btn-open-invitation',
    '.wax-seal', '.seal', '.envelope-seal', '.envelope__seal', '.envelope-flap', '.envelope', '#envelope',
    '.cover-btn', '.cover__btn', '.cover-open', '#coverOpen', '.intro-btn', '.enter-btn', '#enterBtn', '.btn-enter',
    '[data-action="open"]', 'button[class*="open"]', 'a[class*="open"]', '[class*="open-btn"]', '[id*="open"]',
];
async function settle(page, ms) {
    try { await page.waitForNetworkIdle({ idleTime: 500, timeout: 8000 }); } catch (e) { /* ignore */ }
    await new Promise(r => setTimeout(r, ms));
}
async function hideNoise(page) {
    await page.addStyleTag({ content: `
        ::-webkit-scrollbar { display: none !important; }
        html { scrollbar-width: none !important; }
        .music-btn, .music-toggle, #musicBtn, #musicToggle, .audio-btn, .btn-music,
        .scroll-down, .scroll-hint, .back-to-top, #backToTop, .cookie, .watermark-badge { opacity: 0 !important; }
    ` });
}
async function tryOpen(page) {
    for (const sel of OPEN_SELECTORS) {
        const el = await page.$(sel);
        if (!el) continue;
        const box = await el.boundingBox();
        if (!box || box.width < 4 || box.height < 4) continue;
        try { await el.click({ delay: 50 }); return sel; } catch (e) { /* next */ }
    }
    // fallback: click giữa màn hình (nhiều thiệp mở bằng tap bất kỳ)
    await page.mouse.click(VIEW.width / 2, VIEW.height / 2);
    return 'center-tap';
}
async function shot(page, file) {
    const png = await page.screenshot({ type: 'png', captureBeyondViewport: false });
    await sharp(png).webp({ quality: QUALITY }).toFile(file);
    const meta = await sharp(file).metadata();
    return { file: path.basename(file), w: meta.width, h: meta.height, bytes: fs.statSync(file).size };
}

// ---------- main ----------
(async () => {
    const list = targets();
    if (!list.length) { console.log('Không có thiệp nào cần chụp.'); return; }
    const srv = await serve();
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--mute-audio'] });
    const summary = [];

    for (const t of list) {
        const url = `http://127.0.0.1:${PORT}/${t.demoUrl.replace(/^\.\//, '')}`;
        fs.mkdirSync(t.outDir, { recursive: true });
        const page = await browser.newPage();
        await page.setViewport(VIEW);
        await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');
        const manifest = { id: t.id, name: t.name, demoUrl: t.demoUrl, shots: [], opened: null, error: null };
        try {
            await page.goto(url, { waitUntil: 'load', timeout: 45000 });
            await hideNoise(page);
            await settle(page, 1800);
            manifest.shots.push(Object.assign({ key: 'cover' }, await shot(page, path.join(t.outDir, 'cover.webp'))));

            manifest.opened = await tryOpen(page);
            await settle(page, 2800);
            manifest.shots.push(Object.assign({ key: 'open' }, await shot(page, path.join(t.outDir, 'open.webp'))));

            // sections
            const sections = await page.evaluate((maxH) => {
                const els = Array.from(document.querySelectorAll('section, [class*="section"], main > div'));
                const out = [];
                for (const el of els) {
                    const r = el.getBoundingClientRect();
                    const top = r.top + window.scrollY;
                    if (r.height < 260 || r.width < 200) continue;
                    if (out.some(o => Math.abs(o.top - top) < 200)) continue;
                    out.push({ top, h: r.height });
                }
                return out.sort((a, b) => a.top - b.top).slice(0, maxH);
            }, MAX_SECTIONS + 2);
            let i = 0;
            for (const s of sections) {
                if (s.top < 400) continue; // đã có trong cover/open
                if (i >= MAX_SECTIONS) break;
                i++;
                await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), s.top);
                await settle(page, 1100);
                manifest.shots.push(Object.assign({ key: `sec-${i}`, top: Math.round(s.top) }, await shot(page, path.join(t.outDir, `sec-${i}.webp`))));
            }

            // full page (giới hạn 8 màn hình để tránh ảnh quá dài)
            await page.evaluate(() => window.scrollTo(0, 0));
            await settle(page, 600);
            const fullPng = await page.screenshot({ type: 'png', fullPage: true });
            const fullFile = path.join(t.outDir, 'full.webp');
            const img = sharp(fullPng);
            const md = await img.metadata();
            const maxH = VIEW.height * VIEW.deviceScaleFactor * 8;
            await (md.height > maxH ? img.extract({ left: 0, top: 0, width: md.width, height: maxH }) : img).webp({ quality: QUALITY - 8 }).toFile(fullFile);
            const fm = await sharp(fullFile).metadata();
            manifest.shots.push({ key: 'full', file: 'full.webp', w: fm.width, h: fm.height, bytes: fs.statSync(fullFile).size });
        } catch (e) {
            manifest.error = String(e.message || e);
        }
        await page.close();
        fs.writeFileSync(path.join(t.outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
        summary.push({ id: t.id, shots: manifest.shots.length, opened: manifest.opened, error: manifest.error, dir: path.relative(ROOT, t.outDir) });
        console.log(`${manifest.error ? '✗' : '✓'} #${t.id} ${t.name || ''} → ${manifest.shots.length} ảnh (${manifest.opened || '-'})${manifest.error ? ' ERROR: ' + manifest.error : ''}`);
    }

    await browser.close();
    srv.close();
    fs.writeFileSync(path.join(ROOT, 'plans', 'shoot-summary.json'), JSON.stringify(summary, null, 2));
    console.log(`\nXong ${summary.length} thiệp. Tóm tắt: plans/shoot-summary.json`);
})();
