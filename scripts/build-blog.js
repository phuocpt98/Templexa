#!/usr/bin/env node
/**
 * build-blog.js — "Backend" tĩnh cho chuyên mục Cẩm nang (blogs/).
 *
 * Nguồn sự thật là CHÍNH các file blogs/<slug>.html (mỗi bài một file HTML cứng).
 * Script đọc meta trong <head> của từng bài, rồi:
 *   1. Chuẩn hoá bài: gắn id cho h2/h3 trong <article class="bp-body">, sinh lại
 *      mục lục giữa <!-- TOC:START/END -->, bài liên quan giữa <!-- RELATED:START/END -->,
 *      thời gian đọc trong <span data-readtime>.
 *   2. Sinh blogs/index.html (trang danh sách: chip lọc chuyên mục, bài nổi bật, lưới bài).
 *   3. Sinh assets/data/blog-index.json — build-sitemap.js và (sau này) trang chủ dùng.
 *
 * Meta bắt buộc trong mỗi bài:
 *   <title>…| Templexa</title>, meta description, og:image (URL tuyệt đối),
 *   article:published_time, article:section (id chuyên mục — xem CATEGORIES),
 *   article:tag (nhiều thẻ). Tuỳ chọn: article:modified_time, meta name="blog:featured" content="true".
 *
 * Dùng: node scripts/build-blog.js      (đã gắn vào npm run build:blog / build:seo)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIR = path.join(ROOT, 'blogs');
const SITE = 'https://templexa.vn';
const OUT_JSON = path.join(ROOT, 'assets/data/blog-index.json');

const CATEGORIES = [
    { id: 'chuan-bi-cuoi',      label: 'Chuẩn bị cưới',              desc: 'Kế hoạch, ngân sách, timeline và checklist từ lúc cầu hôn tới ngày cưới.' },
    { id: 'phong-tuc-cuoi-hoi', label: 'Phong tục & nghi lễ',        desc: 'Dạm ngõ, ăn hỏi, xem ngày, lễ gia tiên — nghi thức ba miền và cách làm cho đúng.' },
    { id: 'thiep-cuoi',         label: 'Thiệp cưới & lời mời',       desc: 'Cách viết thiệp, lời mời hay, gửi thiệp online sao cho khách nhớ và tới đông.' },
    { id: 'tiec-cuoi',          label: 'Tiệc cưới & trang trí',      desc: 'Chọn địa điểm, thực đơn, concept trang trí và kịch bản cho một buổi tiệc trọn vẹn.' },
    { id: 'tinh-yeu',           label: 'Tình yêu & hẹn hò',          desc: 'Hiểu nhau hơn trước khi về chung một nhà: tâm lý, giao tiếp, những khái niệm hẹn hò hiện đại.' },
    { id: 'su-kien',            label: 'Sinh nhật, thôi nôi & sự kiện', desc: 'Tổ chức sinh nhật, thôi nôi, kỷ niệm, họp lớp — ý tưởng và cách mời khách gọn gàng.' },
];
const catById = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

// ---------- helpers ----------
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const unesc = (s) => String(s ?? '').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const strip = (html) => unesc(html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const slugify = (s) => strip(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
const fmtDate = (iso) => { const d = new Date(iso); return isNaN(d) ? '' : `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`; };
const meta = (html, attr, name) => { const m = html.match(new RegExp(`<meta\\s+${attr}=["']${name}["']\\s+content=["']([^"']*)["']`, 'i')) || html.match(new RegExp(`<meta\\s+content=["']([^"']*)["']\\s+${attr}=["']${name}["']`, 'i')); return m ? unesc(m[1]) : ''; };
const metaAll = (html, attr, name) => [...html.matchAll(new RegExp(`<meta\\s+${attr}=["']${name}["']\\s+content=["']([^"']*)["']`, 'gi'))].map(m => unesc(m[1]));
const between = (html, tag) => { const m = html.match(new RegExp(`<!-- ${tag}:START -->([\\s\\S]*?)<!-- ${tag}:END -->`)); return m ? m[1] : null; };
const replaceBetween = (html, tag, inner) => html.replace(new RegExp(`(<!-- ${tag}:START -->)[\\s\\S]*?(<!-- ${tag}:END -->)`), `$1\n${inner}\n$2`);

// ---------- 1. đọc bài ----------
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html') && f !== 'index.html' && !f.startsWith('_'));
const posts = [];
const errors = [];
for (const f of files) {
    const file = path.join(DIR, f);
    const html = fs.readFileSync(file, 'utf8');
    const slug = f.replace(/\.html$/, '');
    const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [, ''])[1].replace(/\s*\|\s*Templexa\s*$/i, '').trim();
    const h1 = strip((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [, title])[1]);
    const description = meta(html, 'name', 'description');
    const ogImage = meta(html, 'property', 'og:image');
    const published = meta(html, 'property', 'article:published_time');
    const modified = meta(html, 'property', 'article:modified_time') || published;
    const section = meta(html, 'property', 'article:section');
    const tags = metaAll(html, 'property', 'article:tag');
    const featured = /^true$/i.test(meta(html, 'name', 'blog:featured'));
    const bodyM = html.match(/<article[^>]*class=["'][^"']*bp-body[^"']*["'][^>]*>([\s\S]*?)<\/article>/i);
    const problems = [];
    if (!title) problems.push('thiếu <title>');
    if (!description) problems.push('thiếu meta description');
    if (!ogImage) problems.push('thiếu og:image');
    if (!published) problems.push('thiếu article:published_time');
    if (!catById[section]) problems.push(`article:section "${section}" không thuộc CATEGORIES`);
    if (!bodyM) problems.push('thiếu <article class="bp-body">');
    if (/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(html)) problems.push('đang noindex (bỏ qua, không đưa vào danh sách)');
    if (problems.length) { errors.push(`${f}: ${problems.join('; ')}`); continue; }

    const words = strip(bodyM[1]).split(/\s+/).filter(Boolean).length;
    const readMin = Math.max(1, Math.round(words / 220));
    const cover = ogImage.replace(SITE + '/', '');                     // blogs/images/<slug>/cover.webp
    posts.push({ slug, file, html, title, h1, description, cover, coverUrl: ogImage, category: section, categoryLabel: catById[section].label,
                 date: published, modified, tags, featured, words, readMin, url: `${SITE}/blogs/${slug}` });
}
posts.sort((a, b) => b.date.localeCompare(a.date));

// ---------- 2. chuẩn hoá từng bài ----------
const cardHtml = (p, rel = '') => `<article class="bl-card" data-cat="${p.category}">
    <a class="bl-card-img" href="${rel}${p.slug}.html" aria-hidden="true" tabindex="-1"><img src="${rel}${p.cover.replace(/^blogs\//, '')}" alt="" width="768" height="480" loading="lazy" decoding="async"></a>
    <div class="bl-card-body">
        <span class="bl-cat">${esc(p.categoryLabel)}</span>
        <h3><a href="${rel}${p.slug}.html">${esc(p.title)}</a></h3>
        <p>${esc(p.description)}</p>
        <div class="bl-meta"><time datetime="${p.date.slice(0, 10)}">${fmtDate(p.date)}</time><span>${p.readMin} phút đọc</span></div>
    </div>
</article>`;

let touched = 0;
for (const p of posts) {
    let html = p.html;
    // 2a. id cho h2/h3 trong thân bài + mục lục
    const bodyM = html.match(/(<article[^>]*class=["'][^"']*bp-body[^"']*["'][^>]*>)([\s\S]*?)(<\/article>)/i);
    const used = new Set(); const toc = [];
    let body = bodyM[2].replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (m, lv, attrs, inner, offset, whole) => {
        if (/data-toc=["']skip["']/.test(attrs)) return m;
        // Bỏ qua heading nằm trong khối CTA/hộp/tác giả (giữa thẻ mở khối và nút/kết khối của nó)
        const before = whole.slice(Math.max(0, offset - 900), offset);
        const open = Math.max(before.lastIndexOf('class="bp-cta"'), before.lastIndexOf('class="bp-author"'), before.lastIndexOf('class="bp-aside-card"'));
        if (open >= 0 && !/bl-btn|<\/article>|bp-tags/.test(before.slice(open))) return m;
        let id = (attrs.match(/\bid=["']([^"']+)["']/) || [])[1];
        if (!id) { id = slugify(inner) || 'muc'; let base = id, i = 2; while (used.has(id)) id = `${base}-${i++}`; attrs += ` id="${id}"`; }
        used.add(id);
        toc.push({ lv: +lv, id, text: strip(inner) });
        return `<h${lv}${attrs}>${inner}</h${lv}>`;
    });
    html = html.replace(bodyM[0], bodyM[1] + body + bodyM[3]);
    if (between(html, 'TOC') !== null) {
        const items = toc.filter(t => t.lv === 2 || toc.some(x => x.lv === 2)).map(t => `<li${t.lv === 3 ? ' class="lv3"' : ''}><a href="#${t.id}">${esc(t.text)}</a></li>`).join('\n');
        html = replaceBetween(html, 'TOC', `<ol>\n${items}\n</ol>`);
    }
    // 2b. bài liên quan: cùng chuyên mục trước, thiếu thì bù bài mới nhất
    if (between(html, 'RELATED') !== null) {
        const same = posts.filter(x => x.slug !== p.slug && x.category === p.category);
        const rest = posts.filter(x => x.slug !== p.slug && x.category !== p.category);
        const rel = [...same, ...rest].slice(0, 3);
        html = replaceBetween(html, 'RELATED', rel.length ? rel.map(x => cardHtml(x)).join('\n') : '<p class="bl-empty">Sắp có thêm bài mới.</p>');
    }
    // 2c. thời gian đọc
    html = html.replace(/(<span[^>]*data-readtime[^>]*>)[^<]*(<\/span>)/, `$1${p.readMin} phút đọc$2`);
    if (html !== p.html) { fs.writeFileSync(p.file, html); touched++; }
    p.html = null; // giải phóng
}

// ---------- 3. trang danh sách ----------
const counts = Object.fromEntries(CATEGORIES.map(c => [c.id, posts.filter(p => p.category === c.id).length]));
const featured = posts.find(p => p.featured) || posts[0];
const gridPosts = posts.filter(p => p !== featured);
const chips = [`<button class="bl-chip active" type="button" data-cat="all">Tất cả <small>${posts.length}</small></button>`]
    .concat(CATEGORIES.filter(c => counts[c.id] > 0).map(c => `<button class="bl-chip" type="button" data-cat="${c.id}">${esc(c.label)} <small>${counts[c.id]}</small></button>`)).join('\n                ');
const catLd = CATEGORIES.filter(c => counts[c.id] > 0);
const itemListLd = posts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: p.url, name: p.title }));
const desc = 'Cẩm nang cưới hỏi Templexa: phong tục ba miền, checklist chuẩn bị cưới, cách viết thiệp mời, xem ngày cưới, tổ chức tiệc — viết ngắn gọn, dễ áp dụng cho các cặp đôi Việt.';
const newest = posts[0] ? posts[0].modified.slice(0, 10) : new Date().toISOString().slice(0, 10);

const indexHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cẩm Nang Cưới Hỏi — Kinh Nghiệm Chuẩn Bị Đám Cưới Từ A–Z | Templexa</title>
    <meta name="description" content="${esc(desc)}">
    <meta name="keywords" content="cẩm nang cưới hỏi, kinh nghiệm chuẩn bị đám cưới, phong tục cưới hỏi, thiệp cưới, xem ngày cưới, tổ chức tiệc cưới, blog cưới">
    <meta name="author" content="Templexa Studio">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
    <meta name="theme-color" content="#6366F1">
    <link rel="canonical" href="${SITE}/blogs/">

    <meta property="og:type" content="website">
    <meta property="og:title" content="Cẩm Nang Cưới Hỏi — Kinh Nghiệm Chuẩn Bị Đám Cưới Từ A–Z | Templexa">
    <meta property="og:description" content="${esc(desc)}">
    <meta property="og:image" content="${featured ? featured.coverUrl : SITE + '/assets/images/og-image.png'}">
    <meta property="og:url" content="${SITE}/blogs/">
    <meta property="og:site_name" content="Templexa">
    <meta property="og:locale" content="vi_VN">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Cẩm Nang Cưới Hỏi | Templexa">
    <meta name="twitter:description" content="${esc(desc)}">
    <meta name="twitter:image" content="${featured ? featured.coverUrl : SITE + '/assets/images/og-image.png'}">

    <link rel="icon" type="image/svg+xml" href="../assets/images/logo_v2.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/blog.css">

    <script type="application/ld+json">
    ${JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
            { '@type': 'CollectionPage', '@id': `${SITE}/blogs/`, url: `${SITE}/blogs/`, name: 'Cẩm nang cưới hỏi', description: desc, inLanguage: 'vi-VN', dateModified: newest,
              isPartOf: { '@type': 'WebSite', name: 'Templexa', url: `${SITE}/` },
              publisher: { '@type': 'Organization', name: 'Templexa', url: `${SITE}/`, logo: { '@type': 'ImageObject', url: `${SITE}/assets/images/logo_v2.svg` } },
              mainEntity: { '@type': 'ItemList', itemListElement: itemListLd } },
            { '@type': 'BreadcrumbList', itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${SITE}/` },
                { '@type': 'ListItem', position: 2, name: 'Cẩm nang cưới hỏi', item: `${SITE}/blogs/` } ] },
        ],
    }, null, 2).replace(/\n/g, '\n    ')}
    </script>

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-D8ZC2MYYVY"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-D8ZC2MYYVY');
    </script>
</head>
<body class="blog-page">
${headerHtml('../', 'blogs')}

    <section class="bl-hero">
        <div class="container container-section">
            <nav class="bl-crumb" aria-label="Breadcrumb"><a href="../">Trang chủ</a><span aria-hidden="true">›</span><span aria-current="page">Cẩm nang cưới hỏi</span></nav>
            <h1>Cẩm nang cưới hỏi<br><em>viết cho người sắp cưới</em></h1>
            <p>Những gì hai bạn cần biết từ lúc tính chuyện tới lúc tiệc tan: phong tục ba miền, checklist chuẩn bị, cách viết thiệp mời, xem ngày, tổ chức tiệc. Viết ngắn, có ví dụ, áp dụng được ngay.</p>
            <div class="bl-chips" id="blChips" role="tablist" aria-label="Lọc theo chuyên mục">
                ${chips}
            </div>
        </div>
    </section>

    <section class="bl-list">
        <div class="container container-section">
${featured ? `            <article class="bl-featured" data-cat="${featured.category}" id="blFeatured">
                <a class="bl-featured-img" href="${featured.slug}.html" aria-hidden="true" tabindex="-1"><img src="${featured.cover.replace(/^blogs\//, '')}" alt="" width="1152" height="720" loading="eager" fetchpriority="high"></a>
                <div class="bl-featured-body">
                    <span class="bl-cat">${esc(featured.categoryLabel)}</span>
                    <h2><a href="${featured.slug}.html">${esc(featured.title)}</a></h2>
                    <p>${esc(featured.description)}</p>
                    <div class="bl-meta"><time datetime="${featured.date.slice(0, 10)}">${fmtDate(featured.date)}</time><span>${featured.readMin} phút đọc</span></div>
                </div>
            </article>` : ''}
            <div class="bl-grid" id="blGrid">
${gridPosts.map(p => cardHtml(p).split('\n').map(l => '                ' + l).join('\n')).join('\n')}
            </div>
            <p class="bl-empty" id="blEmpty" hidden>Chuyên mục này chưa có bài. Chọn chuyên mục khác nhé.</p>
            <div class="bl-more" id="blMore" hidden><button class="bl-btn bl-btn--ghost" type="button" id="blMoreBtn">Xem thêm bài viết</button></div>

            <section class="bl-cta">
                <h2>Đọc xong rồi, tới lúc gửi thiệp?</h2>
                <p>Thiệp cưới online Templexa có đếm ngược, bản đồ, xác nhận tham dự và sổ lưu bút — giao trong 24h, từ 150.000đ. Gửi qua Zalo là khách nhận được ngay.</p>
                <div class="bl-cta-actions">
                    <a class="bl-btn" href="../thiep-online.html?category=wedding">Xem mẫu thiệp cưới</a>
                    <a class="bl-btn bl-btn--ghost" href="../xem-ngay-cuoi-dep.html">Xem ngày cưới đẹp</a>
                </div>
            </section>
        </div>
    </section>

${footerHtml('../')}

    <script src="../assets/js/main.js"></script>
    <script>
    (function () {
        var PAGE = 9;
        var chips = document.querySelectorAll('#blChips .bl-chip');
        var cards = Array.prototype.slice.call(document.querySelectorAll('#blGrid .bl-card'));
        var featured = document.getElementById('blFeatured');
        var more = document.getElementById('blMore'), moreBtn = document.getElementById('blMoreBtn'), empty = document.getElementById('blEmpty');
        var cat = 'all', shown = PAGE;
        function apply() {
            var list = cards.filter(function (c) { return cat === 'all' || c.dataset.cat === cat; });
            cards.forEach(function (c) { c.hidden = true; });
            list.slice(0, shown).forEach(function (c) { c.hidden = false; });
            if (featured) featured.hidden = !(cat === 'all' || featured.dataset.cat === cat);
            more.hidden = list.length <= shown;
            empty.hidden = list.length > 0 || (featured && !featured.hidden);
        }
        chips.forEach(function (b) {
            b.addEventListener('click', function () {
                chips.forEach(function (x) { x.classList.remove('active'); });
                b.classList.add('active'); cat = b.dataset.cat; shown = PAGE; apply();
                var u = new URL(location.href); if (cat === 'all') u.searchParams.delete('category'); else u.searchParams.set('category', cat);
                history.replaceState(null, '', u);
            });
        });
        moreBtn.addEventListener('click', function () { shown += PAGE; apply(); });
        var q = new URLSearchParams(location.search).get('category');
        var pre = q && document.querySelector('#blChips .bl-chip[data-cat="' + q + '"]');
        if (pre) pre.click(); else apply();
    })();
    </script>
</body>
</html>
`;
fs.writeFileSync(path.join(DIR, 'index.html'), indexHtml);

// ---------- 4. JSON cho sitemap / trang chủ ----------
fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
fs.writeFileSync(OUT_JSON, JSON.stringify({
    updated: newest,
    categories: CATEGORIES.map(c => ({ ...c, count: counts[c.id] })),
    posts: posts.map(p => ({ slug: p.slug, url: p.url, title: p.title, description: p.description, cover: p.cover, category: p.category,
                             categoryLabel: p.categoryLabel, date: p.date, modified: p.modified, readMin: p.readMin, words: p.words, tags: p.tags, featured: p.featured })),
}, null, 2) + '\n');

console.log(`✓ blogs/index.html: ${posts.length} bài, ${catLd.length} chuyên mục có bài · chuẩn hoá ${touched} bài · blog-index.json`);
if (errors.length) { console.log('⚠ Bỏ qua:'); errors.forEach(e => console.log('  - ' + e)); }

// ---------- header/footer dùng chung (khớp các trang chính; rel = '../' vì bài nằm trong blogs/) ----------
function headerHtml(rel, active) {
    const a = (k) => (k === active ? ' class="active"' : '');
    return `    <header class="header">
        <div class="container container-header">
            <a href="${rel}" class="logo">
                <img src="${rel}assets/images/logo_v2.svg" alt="Templexa" class="logo-icon">
            </a>
            <nav class="nav" id="navMenu">
                <ul class="nav-menu">
                    <li><a href="${rel}"${a('home')}>Trang chủ</a></li>
                    <li><a href="${rel}thiep-online.html"${a('thiep')}>Mẫu thiệp</a></li>
                    <li><a href="${rel}xem-ngay-cuoi-dep.html"${a('xem-ngay')}>Xem ngày cưới</a></li>
                    <li><a href="${rel}blogs/index.html"${a('blogs')}>Cẩm nang</a></li>
                    <li><a href="${rel}products.html"${a('products')}>Mẫu web</a></li>
                    <li><a href="${rel}contact.html"${a('contact')}>Dịch vụ</a></li>
                </ul>
            </nav>
            <button class="dark-mode-toggle" id="darkModeToggle" aria-label="Toggle dark mode">
                <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            </button>
            <button class="hamburger" id="hamburgerBtn" aria-label="Menu">
                <span></span><span></span><span></span>
            </button>
        </div>
    </header>
    <div class="mobile-overlay" id="mobileOverlay"></div>`;
}
function footerHtml(rel) {
    return `    <footer class="footer">
        <div class="container container-footer">
            <div class="footer-grid">
                <div class="footer-brand">
                    <a href="${rel}" class="logo">
                        <img src="${rel}assets/images/logo_v2.svg" alt="Templexa" class="logo-icon">
                    </a>
                    <p>Thiệp cưới &amp; thiệp sự kiện online sang trọng, giao trong 24h. Kèm kho mẫu website cá nhân hoá cho riêng bạn.</p>
                </div>
                <div class="footer-col">
                    <h4>Thiệp Mời Online</h4>
                    <ul>
                        <li><a href="${rel}thiep-online.html?category=wedding">Thiệp cưới online</a></li>
                        <li><a href="${rel}thiep-online.html?category=other">Thiệp sinh nhật, thôi nôi</a></li>
                        <li><a href="${rel}contact.html#pricing-section">Bảng giá thiệp</a></li>
                        <li><a href="${rel}xem-ngay-cuoi-dep.html">Xem ngày cưới đẹp</a></li>
                        <li><a href="${rel}blogs/index.html">Cẩm nang cưới hỏi</a></li>
                        <li><a href="${rel}cau-hoi-thuong-gap.html">Câu hỏi thường gặp</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Mẫu Website</h4>
                    <ul>
                        <li><a href="${rel}products.html?category=onepage">One page</a></li>
                        <li><a href="${rel}products.html?category=e-commerce">E-commerce</a></li>
                        <li><a href="${rel}products.html?category=portfolio">Portfolio</a></li>
                        <li><a href="${rel}products.html?category=education">Giáo dục</a></li>
                        <li><a href="${rel}contact.html#web-design">Gói thiết kế web</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Liên Hệ</h4>
                    <ul>
                        <li><a href="${rel}contact.html#contactForm">Yêu cầu báo giá</a></li>
                        <li><a href="https://zalo.me/0334884895" target="_blank" rel="noopener">Zalo 0334 884 895</a></li>
                        <li><a href="mailto:templexa.contact@gmail.com">templexa.contact@gmail.com</a></li>
                        <li><a href="https://www.tiktok.com/@templexa" target="_blank" rel="noopener">TikTok @templexa</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Templexa Studio. All rights reserved.</p>
            </div>
        </div>
    </footer>`;
}
module.exports = { CATEGORIES, headerHtml, footerHtml };
