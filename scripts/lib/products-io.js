/**
 * Đọc/ghi mảng PRODUCTS trong assets/js/data.js mà không đụng phần còn lại của file.
 *
 *   const { load, save } = require('./lib/products-io');
 *   const { products, src } = load();
 *   ...sửa products...
 *   save(products, src);
 */
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', '..', 'assets/js/data.js');
const RX = /(const PRODUCTS\s*=\s*)(\[[\s\S]*?\n\]);/;

const KEY_ORDER = ['id', 'name', 'slug', 'description', 'category', 'type', 'style', 'event', 'tags', 'price',
    'images', 'thumbnail', 'mobileView', 'path', 'demoUrl', 'variants', 'features', 'status', 'featured',
    'priority', 'downloads', 'rating', 'showInSlider', 'isPublic', 'updatedAt'];

const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";

function ser(v, ind) {
    const pad = ' '.repeat(ind);
    if (Array.isArray(v)) {
        if (!v.length) return '[]';
        const simple = v.every(x => typeof x === 'string' && x.length < 40);
        if (simple) return '[' + v.map(q).join(', ') + ']';
        return '[\n' + v.map(x => pad + '    ' + ser(x, ind + 4) + ',').join('\n') + '\n' + pad + ']';
    }
    if (v && typeof v === 'object') {
        const keys = Object.keys(v).sort((a, b) => {
            const ia = KEY_ORDER.indexOf(a), ib = KEY_ORDER.indexOf(b);
            return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
        });
        return '{\n' + keys.map(k => pad + '    ' + k + ': ' + ser(v[k], ind + 4) + ',').join('\n') + '\n' + pad + '}';
    }
    if (typeof v === 'string') return q(v);
    return String(v);
}

const GROUPS = [
    [p => p.type === 'invitation' && p.category === 'wedding', 'THIỆP CƯỚI (invitation / wedding)'],
    [p => p.type === 'invitation' && p.category === 'other', 'THIỆP SỰ KIỆN KHÁC (invitation / other)'],
    [p => p.type === 'website', 'WEBSITE'],
    [p => p.type === 'google-sheet', 'GOOGLE SHEET'],
    [() => true, 'KHÁC'],
];

function load() {
    const src = fs.readFileSync(DATA, 'utf8');
    const m = src.match(RX);
    if (!m) throw new Error('Không tìm thấy const PRODUCTS trong data.js');
    return { products: eval(m[2]), src };
}

function serialize(products) {
    const seen = new Set();
    let out = '[\n';
    for (const [pred, label] of GROUPS) {
        const list = products.filter(p => !seen.has(p) && pred(p));
        if (!list.length) continue;
        list.forEach(p => seen.add(p));
        out += `    // ── ${label} — ${list.length} ──────────────\n`;
        out += list.map(p => '    ' + ser(p, 4) + ',').join('\n') + '\n';
    }
    return out + ']';
}

function save(products, src) {
    src = src || fs.readFileSync(DATA, 'utf8');
    const m = src.match(RX);
    const next = src.replace(m[0], m[1] + serialize(products) + ';');
    const check = eval(next.match(RX)[2]);
    if (check.length !== products.length) throw new Error('Số entry không khớp sau khi serialize');
    fs.writeFileSync(DATA, next);
    return check.length;
}

module.exports = { load, save, serialize, DATA };
