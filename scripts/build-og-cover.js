#!/usr/bin/env node
/**
 * build-og-cover.js — Dựng ảnh chia sẻ (og-cover) 1200×630 từ một trang HTML.
 *
 * Vì sao chụp HTML thay vì ghép ảnh bằng sharp: cần font Google (Playfair,
 * Be Vietnam Pro) render đúng dấu tiếng Việt, gradient ánh kim clip vào chữ,
 * và bố cục co giãn — làm bằng CSS chính xác và dễ sửa hơn nhiều so với
 * composite thủ công.
 *
 * Xuất JPG (không phải WebP) vì Zalo/Messenger vẫn còn nơi không đọc WebP
 * trong thẻ og:image.
 *
 * Dùng:
 *   node scripts/build-og-cover.js
 *   node scripts/build-og-cover.js --page <duong/dan/og-cover.html> --out <duong/dan/og-cover.jpg>
 */

const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

function parseArgs(argv) {
    const args = {};
    for (let i = 2; i < argv.length; i++) {
        if (!argv[i].startsWith('--')) continue;
        const key = argv[i].slice(2);
        const next = argv[i + 1];
        if (next === undefined || next.startsWith('--')) { args[key] = true; } else { args[key] = next; i++; }
    }
    return args;
}

const args = parseArgs(process.argv);
const PAGE = args.page || 'products/Invitation/Other/gen_247_gio-to-ho-do/og-cover.html';
const OUT = args.out || PAGE.replace(/\.html$/, '.jpg');
const PORT = parseInt(args.port || '8788', 10);
const WIDTH = parseInt(args.width || '1200', 10);
const HEIGHT = parseInt(args.height || '630', 10);
const QUALITY = parseInt(args.quality || '90', 10);

async function main() {
    if (!fs.existsSync(PAGE)) {
        console.error(`✗ Không tìm thấy trang: ${PAGE}`);
        process.exit(1);
    }

    // Phải phục vụ qua HTTP — file:// chặn font/ảnh cross-origin trong headless
    const server = spawn('python3', ['-m', 'http.server', String(PORT)], { stdio: 'ignore' });
    await new Promise(r => setTimeout(r, 1200));

    let browser;
    try {
        browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        // deviceScaleFactor 2 rồi hạ xuống 1200×630 → nét hơn hẳn khi chụp thẳng
        await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 });

        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        page.on('requestfailed', r => errors.push('tải hỏng: ' + r.url()));

        await page.goto(`http://localhost:${PORT}/${PAGE}`, { waitUntil: 'networkidle0', timeout: 40000 });
        await page.evaluate(() => document.fonts.ready);
        await new Promise(r => setTimeout(r, 1500));

        const shot = await page.screenshot({ type: 'png' });
        await require('sharp')(shot)
            .resize(WIDTH, HEIGHT)
            .jpeg({ quality: QUALITY, chromaSubsampling: '4:4:4' })
            .toFile(OUT);

        const kb = Math.round(fs.statSync(OUT).size / 1024);
        console.log(`✓ ${OUT} — ${WIDTH}×${HEIGHT} (${kb}KB)`);
        if (errors.length) console.warn('⚠ Cảnh báo:\n  ' + errors.join('\n  '));
    } finally {
        if (browser) await browser.close();
        server.kill();
    }
}

main().catch(err => { console.error('✗ Lỗi:', err.message); process.exit(1); });
