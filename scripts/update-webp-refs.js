/**
 * update-webp-refs.js — Cập nhật references từ PNG/JPG → WebP
 *
 * Usage:
 *   node scripts/update-webp-refs.js
 *
 * Scan: data.js, style.css, index.html, products.html, product-detail.html, contact.html
 * KHÔNG replace: favicon, SVG, external URL images (og:image, twitter:image)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const FILES_TO_SCAN = [
    'assets/js/data.js',
    'assets/css/style.css',
    'index.html',
    'products.html',
    'product-detail.html',
    'contact.html',
];

// Patterns to SKIP (không replace)
const SKIP_PATTERNS = [
    /favicon/i,
    /apple-touch-icon/i,
    /rel="icon"/i,
    /type="image\/png"/i,
    /\.svg/i,
    /https?:\/\//i, // External URLs (og:image, twitter:image, etc.)
];

function shouldSkipLine(line) {
    return SKIP_PATTERNS.some((pattern) => pattern.test(line));
}

function updateFile(relPath) {
    const filePath = path.join(ROOT, relPath);

    if (!fs.existsSync(filePath)) {
        console.log(`  ✗ ${relPath} — file không tồn tại`);
        return 0;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let replaceCount = 0;

    const updatedLines = lines.map((line) => {
        // Skip lines matching exclusion patterns
        if (shouldSkipLine(line)) return line;

        // Replace .png → .webp và .jpg/.jpeg → .webp trong image paths
        const updated = line.replace(/\.(png|jpg|jpeg)(?=['"`\)\s,\]])/gi, (match) => {
            replaceCount++;
            return '.webp';
        });

        return updated;
    });

    if (replaceCount > 0) {
        fs.writeFileSync(filePath, updatedLines.join('\n'), 'utf8');
        console.log(`  ✓ ${relPath} — ${replaceCount} references đã cập nhật`);
    } else {
        console.log(`  – ${relPath} — không có gì để cập nhật`);
    }

    return replaceCount;
}

function main() {
    console.log('Cập nhật image references → .webp\n');

    let totalReplaced = 0;

    for (const file of FILES_TO_SCAN) {
        totalReplaced += updateFile(file);
    }

    console.log('\n════════════════════════════════════════');
    console.log(`Tổng cộng: ${totalReplaced} references đã cập nhật`);
    console.log('════════════════════════════════════════');
}

main();
