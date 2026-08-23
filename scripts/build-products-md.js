#!/usr/bin/env node
/**
 * Sinh lại 2 mục "## Tong hop" và "## Danh sach san pham" trong products/products.md từ data.js.
 * Phần quy trình phía trên giữ nguyên.
 *   node scripts/build-products-md.js
 */
const fs = require('fs');
const path = require('path');
const { load } = require('./lib/products-io');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'products/products.md');
const { products } = load();

const TYPE_LABEL = { invitation: 'Invitation', website: 'Web', 'google-sheet': 'Google-sheet' };
const groups = {};
for (const p of products) {
    const k = `${TYPE_LABEL[p.type] || p.type} / ${p.category}`;
    (groups[k] = groups[k] || []).push(p);
}
const order = Object.keys(groups).sort((a, b) => {
    const rank = (k) => k.startsWith('Invitation') ? 0 : k.startsWith('Web') ? 1 : 2;
    return rank(a) - rank(b) || a.localeCompare(b);
});

const pub = (list) => list.filter(p => p.isPublic !== false).length;
let out = `## Tong hop\n\n| Loai chinh | Loai nho | Tong | Public |\n|------------|----------|------|--------|\n`;
for (const k of order) {
    const [t, c] = k.split(' / ');
    out += `| **${t}** | ${c} | ${groups[k].length} | ${pub(groups[k])} |\n`;
}
out += `| | **Tong** | **${products.length}** | **${pub(products)}** |\n\n`;
out += `_Cap nhat tu data.js: ${new Date().toISOString().slice(0, 10)} — chay \`node scripts/build-products-md.js\` de sinh lai._\n\n---\n\n`;

out += `## Danh sach san pham\n\n`;
for (const k of order) {
    const list = groups[k].slice().sort((a, b) => a.id - b.id);
    out += `### ${k} (${list.length})\n\n| ID | Ten | Folder | Style / Event | Trang thai |\n|----|-----|--------|---------------|------------|\n`;
    for (const p of list) {
        const folder = (p.demoUrl || p.path || p.thumbnail || '').replace(/^\.\/products\//, '').split('/').slice(0, 3).join('/');
        const se = [p.style, p.event].filter(Boolean).join(' / ');
        const st = [p.isPublic === false ? 'hidden' : 'public', p.featured ? 'featured' : '', p.status || '', (p.variants || []).length > 1 ? `${p.variants.length} variants` : ''].filter(Boolean).join(', ');
        out += `| ${p.id} | ${p.name.replace(/\|/g, '/')} | \`${folder}\` | ${se} | ${st} |\n`;
    }
    out += '\n';
}

let md = fs.readFileSync(FILE, 'utf8');
const start = md.indexOf('## Tong hop');
const procStart = md.indexOf('## Quy trinh');
const listStart = md.indexOf('## Danh sach san pham');
if (start < 0 || procStart < 0 || listStart < 0) throw new Error('Không tìm thấy các mục chuẩn trong products.md');
// giữ: head (trước Tong hop) + phần Quy trinh (từ "## Quy trinh" tới "## Danh sach") ; thay Tong hop + Danh sach
const head = md.slice(0, start);
const proc = md.slice(procStart, listStart);
const [tongHop, danhSach] = out.split('## Danh sach san pham');
fs.writeFileSync(FILE, head + tongHop + proc + '## Danh sach san pham' + danhSach);
console.log(`✓ products.md: ${products.length} sản phẩm, ${order.length} nhóm`);
