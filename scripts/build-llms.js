#!/usr/bin/env node
/**
 * build-llms.js — Sinh llms-full.txt từ assets/data/faq.json
 *
 * Vì sao cần: llms-full.txt vốn cập nhật TAY nên đã lệch với faq.json
 * (file ghi 37 câu trong khi faq.json có 42). Sinh tự động thì hết lệch.
 *
 * KHÔNG đụng tới llms.txt — file đó là bản tóm tắt viết tay, có bảng so sánh
 * và văn phong riêng, không sinh máy móc từ FAQ được.
 *
 * Dùng: node scripts/build-llms.js   (đã gắn vào npm run build:seo)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'assets/data/faq.json');
const OUT = path.join(ROOT, 'llms-full.txt');

const faq = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const groups = faq.groups || [];
const total = groups.reduce((n, g) => n + (g.items || []).length, 0);

// Ngày cập nhật: lấy từ faq.json, không dùng ngày hệ thống để kết quả ổn định
const updated = faq.updated || new Date().toISOString().slice(0, 10);

const out = [];
out.push(`# Templexa — Câu hỏi thường gặp đầy đủ (${total})`);
out.push('');
out.push(`Nguồn: https://templexa.vn/cau-hoi-thuong-gap.html · Cập nhật ${updated}`);
out.push('');

groups.forEach((g) => {
    out.push(`## ${g.title}`);
    out.push('');
    (g.items || []).forEach((it) => {
        out.push(`### ${it.q}`);
        out.push(it.a);
        out.push('');
    });
});

fs.writeFileSync(OUT, out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n');
console.log(`✓ llms-full.txt: ${groups.length} nhóm, ${total} câu hỏi`);
