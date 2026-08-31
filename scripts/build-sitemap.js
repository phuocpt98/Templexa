#!/usr/bin/env node
/**
 * Sinh sitemap.xml: trang tĩnh + category + từng sản phẩm public (product-detail.html?id=).
 *   node scripts/build-sitemap.js
 */
const fs = require('fs');
const path = require('path');
const { load } = require('./lib/products-io');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://templexa.vn';
const TODAY = new Date().toISOString().slice(0, 10);
const { products } = load();
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

const mtime = (file) => {
    try { return fs.statSync(path.join(ROOT, file)).mtime.toISOString().slice(0, 10); } catch (e) { return TODAY; }
};

const pub = products.filter(p => p.isPublic !== false);
const newestInv = pub.filter(p => p.type === 'invitation').map(p => p.updatedAt).sort().pop() || TODAY;

const STATIC = [
    { loc: '/', lastmod: mtime('index.html'), freq: 'weekly', pri: '1.0' },
    { loc: '/thiep-online.html', lastmod: newestInv, freq: 'weekly', pri: '0.95' },
    { loc: '/thiep-online.html?category=wedding', lastmod: newestInv, freq: 'weekly', pri: '0.9' },
    { loc: '/thiep-online.html?category=other', lastmod: newestInv, freq: 'weekly', pri: '0.85' },
    { loc: '/contact.html', lastmod: mtime('contact.html'), freq: 'monthly', pri: '0.9' },
    { loc: '/cau-hoi-thuong-gap.html', lastmod: mtime('cau-hoi-thuong-gap.html'), freq: 'monthly', pri: '0.85' },
    { loc: '/products.html', lastmod: mtime('products.html'), freq: 'weekly', pri: '0.7' },
    { loc: '/products.html?category=onepage', lastmod: mtime('products.html'), freq: 'weekly', pri: '0.6' },
    { loc: '/products.html?category=e-commerce', lastmod: mtime('products.html'), freq: 'weekly', pri: '0.6' },
    { loc: '/products.html?category=portfolio', lastmod: mtime('products.html'), freq: 'weekly', pri: '0.6' },
    { loc: '/products.html?category=education', lastmod: mtime('products.html'), freq: 'weekly', pri: '0.6' },
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

const productUrls = pub
    .sort((a, b) => (a.type === 'invitation' ? 0 : 1) - (b.type === 'invitation' ? 0 : 1) || b.id - a.id)
    .map(p => url({
        loc: `/product-detail.html?id=${p.id}`,
        lastmod: p.updatedAt || TODAY,
        freq: 'monthly',
        pri: p.type === 'invitation' ? (p.featured ? '0.8' : '0.7') : '0.5',
        image: p.mobileView || p.thumbnail,
        title: p.name,
    }));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

    <!-- Trang chính — sinh tự động: node scripts/build-sitemap.js -->
${STATIC.map(url).join('\n')}

    <!-- Sản phẩm public (${productUrls.length}) -->
${productUrls.join('\n')}

</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);
console.log(`✓ sitemap.xml: ${STATIC.length + productUrls.length} URL (${productUrls.length} sản phẩm)`);
