#!/usr/bin/env node
/**
 * Sinh sitemap.xml: trang tĩnh + landing category/style/event + blog.
 * Từ 09/2026 KHÔNG còn URL sản phẩm riêng: product-detail.html đã bỏ, chi tiết mở bằng popup ?pid= trên thiep-online/products (cùng canonical với trang hub).
 *   node scripts/build-sitemap.js
 */
const fs = require('fs');
const path = require('path');
const { load } = require('./lib/products-io');
const { LANDINGS } = require('./lib/landings');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://templexa.vn';
// Cloudflare Pages phục vụ clean URL: /thiep-online.html → 308 → /thiep-online.
// Sitemap phải ghi URL đích cuối (không .html) để khớp canonical.
const TODAY = new Date().toISOString().slice(0, 10);
const { products } = load();
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

const mtime = (file) => {
    try { return fs.statSync(path.join(ROOT, file)).mtime.toISOString().slice(0, 10); } catch (e) { return TODAY; }
};

const pub = products.filter(p => p.isPublic !== false);
const newestInv = pub.filter(p => p.type === 'invitation').map(p => p.updatedAt).sort().pop() || TODAY;

// Landing thiệp cưới ưu tiên cao hơn landing dịp khác (lưu lượng chính)
const LANDING_URLS = LANDINGS.map(l => ({
    loc: '/' + l.slug,
    lastmod: newestInv,
    freq: 'weekly',
    pri: l.style || l.event ? '0.8' : (l.category === 'wedding' ? '0.9' : '0.85'),
}));

const STATIC = [
    { loc: '/', lastmod: mtime('index.html'), freq: 'weekly', pri: '1.0' },
    { loc: '/thiep-online', lastmod: newestInv, freq: 'weekly', pri: '0.95' },
    // 12 landing lọc — từ 09/2026 là file HTML tĩnh riêng (scripts/build-landing.js),
    // không còn URL query string. Danh sách lấy thẳng từ scripts/lib/landings.js.
    ...LANDING_URLS,

    { loc: '/contact', lastmod: mtime('contact.html'), freq: 'monthly', pri: '0.9' },
    { loc: '/xem-ngay-cuoi-dep', lastmod: mtime('xem-ngay-cuoi-dep.html'), freq: 'monthly', pri: '0.9' },
    { loc: '/cau-hoi-thuong-gap', lastmod: mtime('cau-hoi-thuong-gap.html'), freq: 'monthly', pri: '0.85' },
    { loc: '/products', lastmod: mtime('products.html'), freq: 'weekly', pri: '0.7' },
    { loc: '/products?category=onepage', lastmod: mtime('products.html'), freq: 'weekly', pri: '0.6' },
    { loc: '/products?category=e-commerce', lastmod: mtime('products.html'), freq: 'weekly', pri: '0.6' },
    { loc: '/products?category=portfolio', lastmod: mtime('products.html'), freq: 'weekly', pri: '0.6' },
    { loc: '/products?category=education', lastmod: mtime('products.html'), freq: 'weekly', pri: '0.6' },
];

const url = (o) => `    <url>
        <loc>${esc(SITE + o.loc)}</loc>
        <lastmod>${o.lastmod}</lastmod>
        <changefreq>${o.freq}</changefreq>
        <priority>${o.pri}</priority>${o.image ? `
        <image:image>
            <image:loc>${esc(SITE + '/' + o.image.replace(/^\.\//, ''))}</image:loc>
            <image:title>${esc(o.title)}</image:title>
        </image:image>` : ''}
    </url>`;

// Cẩm nang (blogs/) — đọc assets/data/blog-index.json do scripts/build-blog.js sinh ra
let blogUrls = [];
try {
    const blog = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets/data/blog-index.json'), 'utf8'));
    blogUrls = [url({ loc: '/blogs/', lastmod: blog.updated || TODAY, freq: 'weekly', pri: '0.85' })]
        .concat(blog.posts.map(b => url({ loc: `/blogs/${b.slug}`, lastmod: (b.modified || b.date).slice(0, 10), freq: 'monthly', pri: '0.75', image: b.cover, title: b.title })));
} catch (e) { console.warn('  (bỏ qua blog: chưa có assets/data/blog-index.json — chạy npm run build:blog trước)'); }

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

    <!-- Trang chính — sinh tự động: node scripts/build-sitemap.js -->
${STATIC.map(url).join('\n')}

    <!-- Cẩm nang cưới hỏi (${blogUrls.length}) -->
${blogUrls.join('\n')}


</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);
console.log(`✓ sitemap.xml: ${STATIC.length + blogUrls.length} URL (${STATIC.length} trang/landing, ${blogUrls.length} blog)`);
