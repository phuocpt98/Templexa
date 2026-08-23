#!/usr/bin/env node
/**
 * Đợt 4 — Chụp bộ ảnh dọc (390×844 @2x) cho thiệp mời bằng puppeteer + sharp.
 *
 *   node scripts/shoot-mobile.js --ids 210,217          # theo id trong data.js
 *   node scripts/shoot-mobile.js --missing                # mọi thiệp public chưa có mobileView
 *   node scripts/shoot-mobile.js --all                    # tất cả thiệp
 *   node scripts/shoot-mobile.js --url ./products/.../index.html --out ./tmp/x   # 1 trang bất kỳ
 *
 * Kết quả: <folder thiệp>/shots/cover.webp (phong bì), open.webp (hero sau khi mở), sec-1.webp (1 màn dưới hero)
 *          + shots/manifest.json (kích thước, thứ tự). KHÔNG sửa data.js —
 *          việc chọn ảnh đẹp nhất làm ở bước sau (subagent xem ảnh rồi quyết).
 */
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const PORT = Number(process.env.SHOT_PORT || (process.argv.includes("--port") ? process.argv[process.argv.indexOf("--port") + 1] : 8791));
const VIEW = { width: 390, height: 844, deviceScaleFactor: 2 };
const MAX_SECTIONS = 1;   // chỉ 1 màn dưới hero (tổng 3 ảnh: cover, open, sec-1)
const QUALITY = 82;
const FREEZE_DATE = Date.parse(process.env.SHOT_DATE || '2026-01-15T10:00:00+07:00'); // thời điểm giả khi chụp (đổi bằng SHOT_DATE=...)

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
        /* lời chúc bay / chat bubble / nút chat — dữ liệu test không nên lên ảnh catalog */
        [class*="wish-bubble"], [class*="wishes-float"], [class*="floating-wish"], [class*="wish-float"],
        [class*="bubble-wish"], [id*="wishBubble"], [id*="floatingWish"], [class*="chat-bubble"],
        [class*="wishes-toggle"], [class*="wish-toggle"], [class*="chat-toggle"], [class*="wishes-fab"],
        [class*="live-wish"], [class*="wish-stream"], [class*="wish-marquee"] { display: none !important; }
    ` });
}
async function pageSignature(page) {
    return page.evaluate(() => {
        const se = document.scrollingElement || document.body;
        const fixed = Array.from(document.querySelectorAll('body *')).filter(el => {
            const cs = getComputedStyle(el);
            if (cs.position !== 'fixed' || cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) return false;
            const r = el.getBoundingClientRect();
            return r.width >= innerWidth * 0.9 && r.height >= innerHeight * 0.8;
        }).length;
        return { sh: se.scrollHeight, overflow: getComputedStyle(document.body).overflow + '/' + getComputedStyle(document.documentElement).overflow, fixed };
    });
}
async function clickByText(page) {
    return page.evaluate(() => {
        const words = ['mở thiệp', 'mở thư', 'xem thiệp', 'open', 'mở', 'enter', 'bắt đầu', 'chạm để mở', 'tap to open', 'click to open'];
        const els = Array.from(document.querySelectorAll('button, a, div, span, p, img'));
        for (const el of els) {
            const t = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('alt') || '').trim().toLowerCase();
            if (!t || t.length > 40) continue;
            if (words.some(w => t === w || t.includes(w))) {
                const r = el.getBoundingClientRect();
                if (r.width > 4 && r.height > 4) { el.click(); return t; }
            }
        }
        return null;
    });
}
async function clickFixedOverlay(page) {
    return page.evaluate(() => {
        const cands = Array.from(document.querySelectorAll('body *')).filter(el => {
            const cs = getComputedStyle(el);
            if (cs.position !== 'fixed' || cs.visibility === 'hidden' || cs.display === 'none') return false;
            const r = el.getBoundingClientRect();
            return r.width >= innerWidth * 0.9 && r.height >= innerHeight * 0.8;
        }).sort((a, b) => (+getComputedStyle(b).zIndex || 0) - (+getComputedStyle(a).zIndex || 0));
        if (!cands.length) return null;
        const top = cands[0];
        // click phần tử tương tác bên trong overlay trước, rồi overlay
        const inner = top.querySelector('button, a, [onclick], [class*="seal"], [class*="btn"], [class*="open"], img');
        (inner || top).click();
        return top.className || top.id || top.tagName;
    });
}
async function removeFixedOverlay(page) {
    return page.evaluate(() => {
        const cands = Array.from(document.querySelectorAll('body *')).filter(el => {
            const cs = getComputedStyle(el);
            if (cs.position !== 'fixed') return false;
            const r = el.getBoundingClientRect();
            return r.width >= innerWidth * 0.9 && r.height >= innerHeight * 0.8;
        });
        cands.forEach(el => el.remove());
        document.body.style.overflow = 'auto'; document.documentElement.style.overflow = 'auto';
        document.body.classList.remove('no-scroll', 'locked', 'lock', 'overflow-hidden', 'envelope-closed');
        return cands.length;
    });
}
async function tryOpen(page) {
    const before = await pageSignature(page);
    const changed = async () => { const a = await pageSignature(page); return a.sh !== before.sh || a.fixed !== before.fixed || a.overflow !== before.overflow; };
    const steps = [];
    // 1. selector quen thuộc
    for (const sel of OPEN_SELECTORS) {
        const el = await page.$(sel);
        if (!el) continue;
        const box = await el.boundingBox();
        if (!box || box.width < 4 || box.height < 4) continue;
        try { await el.click({ delay: 50 }); steps.push(sel); } catch (e) { continue; }
        await new Promise(r => setTimeout(r, 1500));
        if (await changed()) return steps.join('>');
    }
    // 2. nút theo chữ
    const t = await clickByText(page); if (t) { steps.push('text:' + t); await new Promise(r => setTimeout(r, 1500)); if (await changed()) return steps.join('>'); }
    // 3. tap giữa màn hình
    await page.mouse.click(VIEW.width / 2, VIEW.height / 2); steps.push('center-tap');
    await new Promise(r => setTimeout(r, 1500));
    if (await changed()) return steps.join('>');
    // 4. click overlay fixed (phong bì phủ toàn màn)
    const ov = await clickFixedOverlay(page); if (ov) { steps.push('overlay:' + ov); await new Promise(r => setTimeout(r, 1800)); if (await changed()) return steps.join('>'); }
    // 5. vẫn kẹt → gỡ overlay để chụp được nội dung bên trong
    const after = await pageSignature(page);
    if (after.fixed > 0 || after.sh <= VIEW.height + 50) { const n = await removeFixedOverlay(page); steps.push('removed:' + n); }
    return steps.join('>');
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
        // Đóng băng đồng hồ về FREEZE_DATE để countdown của thiệp demo (ngày đã qua) vẫn hiện số
        await page.evaluateOnNewDocument((ts) => {
            const RealDate = Date; const offset = ts - RealDate.now();
            class FakeDate extends RealDate { constructor(...a) { a.length ? super(...a) : super(RealDate.now() + offset); } static now() { return RealDate.now() + offset; } }
            window.Date = FakeDate;
        }, FREEZE_DATE);
        await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');
        const manifest = { id: t.id, name: t.name, demoUrl: t.demoUrl, shots: [], opened: null, error: null };
        try {
            await page.goto(url, { waitUntil: 'load', timeout: 45000 });
            await hideNoise(page);
            await settle(page, 1800);
            manifest.shots.push(Object.assign({ key: 'cover' }, await shot(page, path.join(t.outDir, 'cover.webp'))));

            manifest.opened = await tryOpen(page);
            await settle(page, 2800);
            // Đảm bảo trang cuộn được (nhiều thiệp giữ body.no-scroll sau khi mở, hoặc animation dài)
            for (let attempt = 0; attempt < 3; attempt++) {
                const sg = await pageSignature(page);
                if (sg.sh > VIEW.height + 50) break;
                if (attempt === 0) { await new Promise(r => setTimeout(r, 2500)); continue; }
                const n = await removeFixedOverlay(page);
                await page.evaluate(() => {
                    document.body.className = document.body.className.replace(/\b(no-scroll|noscroll|locked|lock|overflow-hidden|envelope-closed|is-locked|fixed)\b/g, '');
                    document.documentElement.style.overflow = 'auto'; document.body.style.overflow = 'auto';
                    document.documentElement.style.height = 'auto'; document.body.style.height = 'auto';
                });
                manifest.opened += `>unlock:${n}`;
                await settle(page, 800);
            }
            manifest.shots.push(Object.assign({ key: 'open' }, await shot(page, path.join(t.outDir, 'open.webp'))));

            // sec-1: đúng 1 màn hình dưới hero (cuộn 1 viewport) — hỗ trợ container cuộn riêng
            let i = 0;
            {
                const scrolled = await page.evaluate((vh) => {
                    const se = document.scrollingElement || document.documentElement;
                    let scroller = null;
                    if (se.scrollHeight <= innerHeight + 50) {
                        const cands = Array.from(document.querySelectorAll('body *')).filter(el => {
                            const cs = getComputedStyle(el);
                            return /(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 200 && el.clientHeight >= innerHeight * 0.6;
                        }).sort((a, b) => b.scrollHeight - a.scrollHeight);
                        scroller = cands[0] || null;
                    }
                    if (scroller) { scroller.scrollTo({ top: vh, behavior: 'instant' }); return scroller.scrollTop; }
                    window.scrollTo({ top: vh, behavior: 'instant' }); return window.scrollY;
                }, VIEW.height);
                if (scrolled > 200) {
                    await settle(page, 1100);
                    const png = await page.screenshot({ type: 'png' });
                    const openFile = path.join(t.outDir, 'open.webp');
                    const same = fs.existsSync(openFile) && await (async () => {
                        const a = await sharp(png).resize(24, 48, { fit: 'fill' }).grayscale().raw().toBuffer();
                        const b = await sharp(openFile).resize(24, 48, { fit: 'fill' }).grayscale().raw().toBuffer();
                        let d = 0; for (let k = 0; k < a.length; k++) d += Math.abs(a[k] - b[k]); return d / a.length < 6;
                    })();
                    if (!same) {
                        i = 1;
                        const file = path.join(t.outDir, 'sec-1.webp');
                        await sharp(png).webp({ quality: QUALITY }).toFile(file);
                        const meta = await sharp(file).metadata();
                        manifest.shots.push({ key: 'sec-1', top: scrolled, file: 'sec-1.webp', w: meta.width, h: meta.height, bytes: fs.statSync(file).size });
                    }
                }
            }
            // xoá sec-* cũ thừa từ lần chụp trước
            for (let k = i + 1; k <= 12; k++) { const f = path.join(t.outDir, `sec-${k}.webp`); if (fs.existsSync(f)) fs.unlinkSync(f); }

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
