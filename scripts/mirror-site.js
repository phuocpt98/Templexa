#!/usr/bin/env node
/**
 * Mirror 1 trang web SPA để nghiên cứu offline: mở bằng Chromium thật, bắt MỌI response
 * (html/js/css/ảnh/video/font/json) và ghi xuống đúng đường dẫn gốc, tách theo host.
 * Phát lại bằng server đi kèm (--serve) — server map host ngoài (typekit, api...) về thư mục đã lưu.
 *
 *   node scripts/mirror-site.js https://example.com/ ./products/shared/new/example   # tải
 *   node scripts/mirror-site.js --serve ./products/shared/new/example [port]         # chạy offline
 *
 * Chỉ dùng để tham khảo/so sánh nội bộ. Thư mục products/shared/new/ nằm trong .gitignore.
 */
const fs = require('fs');
const path = require('path');
const http = require('http');
const { URL } = require('url');

const args = process.argv.slice(2);

// ---------------- SERVE ----------------
if (args[0] === '--serve') {
    const root = path.resolve(args[1]);
    const port = Number(args[2] || 8123);
    const manifest = JSON.parse(fs.readFileSync(path.join(root, '_manifest.json'), 'utf8'));
    const mainHost = manifest.mainHost;
    const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
        '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.gif': 'image/gif', '.ico': 'image/x-icon',
        '.mp4': 'video/mp4', '.webm': 'video/webm', '.mp3': 'audio/mpeg', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf' };
    http.createServer((req, res) => {
        const u = new URL(req.url, 'http://x');
        // /__ext__/<host>/<path> → host ngoài ; còn lại → main host
        let host = mainHost, p = u.pathname;
        const m = p.match(/^\/__ext__\/([^/]+)(\/.*)?$/);
        if (m) { host = m[1]; p = m[2] || '/'; }
        let file = path.join(root, host, decodeURIComponent(p));
        if (u.search) { const q = path.join(root, host, decodeURIComponent(p) + '__q__' + encodeURIComponent(u.search)); if (fs.existsSync(q)) file = q; }
        if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
        if (!fs.existsSync(file)) { res.writeHead(404); return res.end('not mirrored: ' + host + p); }
        res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Access-Control-Allow-Origin': '*' });
        fs.createReadStream(file).pipe(res);
    }).listen(port, () => console.log(`Offline mirror: http://127.0.0.1:${port}/  (${mainHost})`));
    return;
}

// ---------------- MIRROR ----------------
const target = args[0], outRoot = path.resolve(args[1] || './mirror');
if (!target) { console.error('Cần URL'); process.exit(1); }
const puppeteer = require('puppeteer');
const mainHost = new URL(target).host;
fs.mkdirSync(outRoot, { recursive: true });
const saved = new Map();

function localPathFor(u) {
    const url = new URL(u);
    let p = decodeURIComponent(url.pathname);
    if (p.endsWith('/')) p += 'index.html';
    if (!path.extname(p) && url.host === mainHost) p += '/index.html';
    if (url.search) p += '__q__' + encodeURIComponent(url.search);
    return path.join(outRoot, url.host, p);
}

(async () => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');

    page.on('response', async (res) => {
        try {
            const u = res.url(); if (!/^https?:/.test(u)) return;
            const st = res.status(); if (st >= 300 && st < 400) return; if (st >= 400) return;
            const buf = await res.buffer();
            const file = localPathFor(u);
            fs.mkdirSync(path.dirname(file), { recursive: true });
            fs.writeFileSync(file, buf);
            saved.set(u, { file: path.relative(outRoot, file), type: res.headers()['content-type'] || '', bytes: buf.length });
        } catch (e) { /* stream/closed */ }
    });

    console.log('→', target);
    await page.goto(target, { waitUntil: 'networkidle2', timeout: 120000 });
    await new Promise(r => setTimeout(r, 3000));
    // mở phong bì / intro nếu có: click giữa, rồi thử các selector phổ biến
    await page.mouse.click(195, 470).catch(() => {});
    await new Promise(r => setTimeout(r, 3000));
    // cuộn toàn trang để lazy-load
    const H = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < H + 800; y += 600) { await page.evaluate(v => window.scrollTo(0, v), y); await new Promise(r => setTimeout(r, 700)); }
    // click các nút đổi ngôn ngữ / tab để lấy thêm dữ liệu
    const clicked = await page.evaluate(() => {
        const out = [];
        document.querySelectorAll('button, [role=button], a').forEach(el => {
            const t = (el.innerText || '').trim();
            if (/^(EN|DE|VI|FR|TR)$/i.test(t) || /ngôn ngữ|language/i.test(t)) { el.click(); out.push(t); }
        });
        return out;
    });
    await new Promise(r => setTimeout(r, 2500));
    // DOM đã render (để tham khảo khi JS không chạy)
    const html = await page.content();
    fs.writeFileSync(path.join(outRoot, mainHost, '_rendered.html'), html);
    await browser.close();

    // Ghi lại index.html gốc với <base> để path tương đối hoạt động; rewrite host ngoài → /__ext__/host/
    const hosts = [...new Set([...saved.keys()].map(u => new URL(u).host))].filter(h => h !== mainHost);
    const idx = path.join(outRoot, mainHost, 'index.html');
    if (fs.existsSync(idx)) {
        let s = fs.readFileSync(idx, 'utf8');
        for (const h of hosts) s = s.split(`https://${h}/`).join(`/__ext__/${h}/`).split(`//${h}/`).join(`/__ext__/${h}/`);
        fs.writeFileSync(idx, s);
    }
    // rewrite host ngoài trong css/js đã lưu (typekit, cdn)
    for (const [u, info] of saved) {
        if (!/css|javascript|json|html/.test(info.type)) continue;
        const f = path.join(outRoot, info.file);
        let s = fs.readFileSync(f, 'utf8'), changed = false;
        for (const h of hosts) { if (s.includes(h)) { s = s.split(`https://${h}/`).join(`/__ext__/${h}/`).split(`//${h}/`).join(`/__ext__/${h}/`); changed = true; } }
        if (changed) fs.writeFileSync(f, s);
    }
    fs.writeFileSync(path.join(outRoot, '_manifest.json'), JSON.stringify({ target, mainHost, hosts, clicked, files: [...saved.entries()].map(([u, i]) => ({ url: u, ...i })) }, null, 1));
    const total = [...saved.values()].reduce((a, b) => a + b.bytes, 0);
    console.log(`✓ ${saved.size} file, ${(total / 1048576).toFixed(1)} MB, hosts: ${[mainHost, ...hosts].join(', ')}`);
    console.log(`Chạy offline: node scripts/mirror-site.js --serve ${path.relative(process.cwd(), outRoot)} 8123`);
})();
