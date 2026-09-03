#!/usr/bin/env node
/**
 * build-landing.js — Sinh 12 trang landing lọc TĨNH của catalog thiệp.
 *
 * Vì sao: trước 09/2026 landing lọc chỉ là query string trên thiep-online.html
 * (?category=wedding&style=luxury). Title/description/canonical/H1/intro chỉ có
 * SAU khi JS chạy → Google thấy 12 URL trùng nhau và không index đúng
 * (docs/seo/02-hien-trang-va-lo-trinh.md lỗ hổng #1). Cloudflare Pages là host
 * tĩnh, không phân biệt được query string, nên mỗi landing nay là MỘT FILE HTML
 * riêng ở gốc site với đầy đủ head + H1 + intro + lưới mẫu + JSON-LD trong HTML.
 *
 * Nguồn:
 *   - khung trang        : thiep-online.html (header/footer/nav/popup dùng chung)
 *   - nội dung landing   : scripts/lib/landings.js
 *   - danh sách mẫu      : assets/js/data.js qua scripts/lib/products-io.js
 *
 * Ghi ra:
 *   - <slug>.html × 12 (gốc site)
 *   - bảng LANDING_MAP trong assets/js/products.js (giữa marker LANDING-MAP)
 *
 * Dùng: node scripts/build-landing.js   (đã gắn vào npm run build:seo)
 */

const fs = require('fs');
const path = require('path');
const { load } = require('./lib/products-io');
const { LANDINGS, bySlug, url, href } = require('./lib/landings');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://templexa.vn';
const TEMPLATE = path.join(ROOT, 'thiep-online.html');
const PER_PAGE = 16;               // khớp perPage của products.js khi type=invitation
const WORDS_MIN = 150, WORDS_MAX = 300;

const { products } = load();

// ── Helpers ───────────────────────────────────────────────────────────────────
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (p) => encodeURI(SITE + '/' + String(p).replace(/^\.\//, ''));
const stripTags = (s) => String(s).replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '');
const words = (s) => stripTags(s).trim().split(/\s+/).filter(Boolean).length;

/** Bản sao của getProductsSorted() trong data.js — giữ đúng thứ tự lưới mà JS render */
function sorted() {
    const typeOrder = { invitation: 0, website: 1, 'google-sheet': 2 };
    const statusRank = { bestseller: 0, trending: 1, hot: 2 };
    const rank = (p) => (statusRank[p.status] === undefined ? 9 : statusRank[p.status]);
    const time = (p) => Date.parse(p.updatedAt || '2000-01-01') || 0;
    return products.filter((p) => p.isPublic !== false).sort((a, b) => {
        const aType = typeOrder[a.type] === undefined ? 3 : typeOrder[a.type];
        const bType = typeOrder[b.type] === undefined ? 3 : typeOrder[b.type];
        if (aType !== bType) return aType - bType;
        if ((a.priority || 0) !== (b.priority || 0)) return (a.priority || 0) - (b.priority || 0);
        if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
        if (rank(a) !== rank(b)) return rank(a) - rank(b);
        if (time(a) !== time(b)) return time(b) - time(a);
        return b.id - a.id;
    });
}

const ALL = sorted();
const listOf = (l) => ALL.filter((p) => p.type === 'invitation' && p.category === l.category
    && (!l.style || p.style === l.style) && (!l.event || p.event === l.event));

const COUNT = {};
LANDINGS.forEach((l) => { COUNT[l.slug] = listOf(l).length; });

/** {n} → số mẫu của landing hiện tại · {n:slug} → số mẫu của landing khác */
function fill(text, l) {
    return String(text)
        .replace(/\{n:([a-z0-9-]+)\}/g, (m, s) => {
            if (COUNT[s] === undefined) throw new Error(`${l.slug}: {n:${s}} không có landing tương ứng`);
            return COUNT[s];
        })
        .replace(/\{n\}/g, COUNT[l.slug]);
}

/** Nhãn phụ trên card — bản sao logic renderProducts() của products.js */
const STYLE_LABELS = {
    traditional: 'Truyền thống', modern: 'Hiện đại', minimalist: 'Tối giản',
    luxury: 'Sang trọng', floral: 'Hoa lá', vintage: 'Vintage',
};
const EVENT_LABELS = {
    wedding: 'Đám cưới', 'dam-ngo': 'Dạm ngõ', 'an-hoi': 'Ăn hỏi',
    birthday: 'Sinh nhật', 'thoi-noi': 'Thôi nôi & Đầy tháng', anniversary: 'Kỷ niệm',
    reunion: 'Họp lớp', 'gio-to': 'Giỗ tổ', confession: 'Tỏ tình', graduation: 'Tốt nghiệp',
    holiday: 'Lễ hội', other: 'Khác',
};
const CATEGORY_LABELS = { wedding: 'Thiệp cưới', other: 'Sinh nhật & Sự kiện' };

function cardHTML(p) {
    const categoryLabel = CATEGORY_LABELS[p.category] || p.category;
    let badge = '';
    if (p.status === 'bestseller') badge = '<span class="product-badge bestseller">BEST SELLER</span>';
    else if (p.status === 'trending') badge = '<span class="product-badge trending">TRENDING</span>';
    else if (p.status === 'hot') badge = '<span class="product-badge hot">HOT</span>';

    const imgSrc = p.mobileView || p.thumbnail;   // landing luôn ở chế độ invitation-theme
    const variantCount = Array.isArray(p.variants) ? p.variants.length : 0;

    let subLabel = categoryLabel;
    if (p.category === 'wedding' && p.style) subLabel = 'Thiệp cưới · ' + (STYLE_LABELS[p.style] || p.style);
    else if (p.event) subLabel = EVENT_LABELS[p.event] || categoryLabel;
    if (variantCount > 1) subLabel += ` · ${variantCount} phiên bản`;

    return `                <a href="thiep-online.html?pid=${p.id}" class="product-card product-card-invitation" data-product-id="${p.id}"${p.demoUrl ? ` data-demo-url="${esc(p.demoUrl)}"` : ''}>
                    <div class="product-card-image">
                        <img src="${esc(imgSrc)}" alt="${esc(p.name)}" loading="lazy">
                        ${badge}
                    </div>
                    <div class="product-card-info">
                        <h3>${esc(p.name)}</h3>
                        <p>${esc(subLabel)}</p>
                    </div>
                </a>`;
}

/** Chuỗi breadcrumb: Trang chủ → Thiệp mời online → (landing cha) → landing */
function crumbs(l) {
    const chain = [
        { name: 'Trang chủ', u: SITE + '/', h: 'index.html' },
        { name: 'Thiệp mời online', u: SITE + '/thiep-online', h: 'thiep-online.html' },
    ];
    if (l.style) chain.push({ name: 'Thiệp cưới online', u: url('thiep-cuoi'), h: href('thiep-cuoi') });
    if (l.event) chain.push({ name: 'Thiệp mời dịp khác', u: url('thiep-moi-online'), h: href('thiep-moi-online') });
    chain.push({ name: l.crumb, u: url(l), h: href(l) });
    return chain;
}

function jsonLd(l) {
    const items = listOf(l).slice(0, PER_PAGE);
    const chain = crumbs(l);
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: stripTags(fill(l.h1, l)).replace(/\s+/g, ' ').trim(),
        description: l.desc,
        url: url(l),
        inLanguage: 'vi',
        numberOfItems: COUNT[l.slug],
        isPartOf: { '@type': 'WebSite', name: 'Templexa', url: SITE },
        breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: chain.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.u })),
        },
        mainEntity: {
            '@type': 'ItemList',
            name: l.navLabel,
            numberOfItems: COUNT[l.slug],
            itemListElement: items.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: p.name,
                image: abs(p.mobileView || p.thumbnail),
            })),
        },
    };
}

/** Khối nội dung 150–300 từ + link chéo, đặt dưới lưới mẫu */
function copyHTML(l) {
    const blocks = l.body.map((b) => {
        if (b.h2) return `                <h2>${fill(b.h2, l)}</h2>`;
        if (b.ul) return `                <ul class="landing-copy-list">\n` + b.ul.map((li) => `                    <li>${fill(li, l)}</li>`).join('\n') + `\n                </ul>`;
        return `                <p>${fill(b.p, l)}</p>`;
    }).join('\n');

    const rel = l.related.map((s) => {
        const r = bySlug(s);
        if (!r) throw new Error(`${l.slug}: related "${s}" không tồn tại`);
        return `                    <li><a href="${href(r)}">${r.navLabel} <span class="landing-links-count">${COUNT[r.slug]} mẫu</span></a></li>`;
    }).join('\n');

    return `    <!-- Nội dung landing — sinh bởi scripts/build-landing.js, đừng sửa tay -->
    <section class="landing-copy">
        <div class="container container-section">
            <div class="landing-copy-text">
${blocks}
            </div>
            <aside class="landing-links">
                <h2>Xem thêm bộ sưu tập</h2>
                <ul>
${rel}
                    <li><a href="thiep-online.html">Tất cả mẫu thiệp mời <span class="landing-links-count">${ALL.filter((p) => p.type === 'invitation').length} mẫu</span></a></li>
                    <li><a href="contact.html#pricing-section">Bảng giá thiệp mời online</a></li>
                    <li><a href="cau-hoi-thuong-gap.html">Câu hỏi thường gặp</a></li>
                </ul>
            </aside>
        </div>
    </section>
`;
}

function crumbNav(l) {
    const chain = crumbs(l);
    const links = chain.map((c, i) => (i === chain.length - 1
        ? `<span aria-current="page">${esc(c.name)}</span>`
        : `<a href="${c.h}">${esc(c.name)}</a>`)).join('\n                <span class="landing-crumb-sep" aria-hidden="true">›</span>\n                ');
    return `            <nav class="landing-crumb" aria-label="Breadcrumb">
                ${links}
            </nav>
`;
}

// ── Sinh trang ────────────────────────────────────────────────────────────────
const tpl = fs.readFileSync(TEMPLATE, 'utf8');

/** replace có kiểm tra: sai anchor thì dừng build thay vì ghi ra HTML hỏng */
function must(html, from, to, what) {
    if (typeof from === 'string' ? !html.includes(from) : !from.test(html)) {
        throw new Error(`Không tìm thấy neo "${what}" trong thiep-online.html — template đã đổi, sửa lại build-landing.js`);
    }
    return html.replace(from, () => to);
}

function keywords(l) {
    const base = l.category === 'wedding'
        ? ['thiệp cưới online', 'mẫu thiệp cưới đẹp', 'thiệp mời cưới điện tử']
        : ['thiệp mời online', 'thiệp mời điện tử', 'thiệp online'];
    return [l.navLabel.toLowerCase(), ...base, 'RSVP xác nhận tham dự', 'Templexa'].join(', ');
}

function build(l) {
    const items = listOf(l);
    if (!items.length) throw new Error(`${l.slug}: không có mẫu nào khớp bộ lọc`);

    const w = l.body.reduce((n, b) => n + (b.ul ? b.ul.reduce((m, li) => m + words(fill(li, l)), 0) : words(fill(b.p || b.h2, l))), 0);
    if (w < WORDS_MIN || w > WORDS_MAX) throw new Error(`${l.slug}: intro ${w} từ, cần ${WORDS_MIN}–${WORDS_MAX} từ`);
    if (l.related.length < 3) throw new Error(`${l.slug}: cần >= 3 link chéo`);

    const selfUrl = url(l);
    let html = tpl;

    // ── head ──
    html = must(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(l.title)}</title>`, 'title');
    html = must(html, /<meta name="description" content="[\s\S]*?">/, `<meta name="description" content="${esc(l.desc)}">`, 'meta description');
    html = must(html, /<meta name="keywords" content="[\s\S]*?">/, `<meta name="keywords" content="${esc(keywords(l))}">`, 'meta keywords');
    html = must(html, /<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${selfUrl}">`, 'canonical');
    html = must(html, /<meta property="og:title" content="[\s\S]*?">/, `<meta property="og:title" content="${esc(l.title)}">`, 'og:title');
    html = must(html, /<meta property="og:description" content="[\s\S]*?">/, `<meta property="og:description" content="${esc(l.desc)}">`, 'og:description');
    html = must(html, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${selfUrl}">`, 'og:url');
    html = must(html, /<meta name="twitter:title" content="[\s\S]*?">/, `<meta name="twitter:title" content="${esc(l.title)}">`, 'twitter:title');
    html = must(html, /<meta name="twitter:description" content="[\s\S]*?">/, `<meta name="twitter:description" content="${esc(l.desc)}">`, 'twitter:description');

    // JSON-LD riêng của landing (thay khối CollectionPage của hub)
    html = must(html, /    <!-- Structured Data -->\n    <script type="application\/ld\+json">[\s\S]*?<\/script>/,
        '    <!-- Structured Data -->\n    <script type="application/ld+json">\n    '
        + JSON.stringify(jsonLd(l), null, 4).split('\n').join('\n    ') + '\n    </script>', 'JSON-LD');

    // FAQ chỉ giữ trên hub — 12 landing dùng chung 1 bộ FAQ sẽ thành nội dung lặp
    html = must(html, /\n    <!-- FAQ-LD:START -->[\s\S]*?<!-- FAQ-LD:END -->\n/, '\n', 'FAQ-LD');
    html = must(html, /\n    <!-- FAQ:START[\s\S]*?<!-- FAQ:END -->\n/, '\n', 'FAQ section');

    // ── body ──
    const dataAttr = ` data-landing="${l.slug}" data-landing-category="${l.category}"`
        + (l.style ? ` data-landing-style="${l.style}"` : '')
        + (l.event ? ` data-landing-event="${l.event}"` : '');
    html = must(html, '<body>', `<body class="invitation-theme"${dataAttr}>`, '<body>');

    html = must(html, /<h1 class="hero-reveal" id="heroTitle">[\s\S]*?<\/h1>/,
        `<h1 class="hero-reveal" id="heroTitle">${fill(l.h1, l)}</h1>`, 'H1');
    html = must(html, /<p class="hero-reveal" id="heroIntro">[\s\S]*?<\/p>/,
        `<p class="hero-reveal" id="heroIntro">${fill(l.lead, l)}</p>`, 'hero intro');
    html = must(html, '        <div class="container container-section">\n            <h1 class="hero-reveal"',
        '        <div class="container container-section">\n' + crumbNav(l) + '            <h1 class="hero-reveal"', 'breadcrumb anchor');

    // Lưới mẫu pre-render (trang 1) — JS render lại y hệt sau khi tải xong
    html = must(html, '<div class="products-grid" id="productsGrid"></div>',
        '<div class="products-grid" id="productsGrid">\n' + items.slice(0, PER_PAGE).map(cardHTML).join('\n') + '\n            </div>', 'products grid');

    html = must(html, '\n    <!-- Footer -->', '\n' + copyHTML(l) + '\n    <!-- Footer -->', 'footer anchor');

    // Hub tự ép ?type=invitation vào URL; landing lấy bộ lọc từ data-landing nên bỏ đoạn này
    html = must(html, /    <script>\n        \/\* Force type=invitation[\s\S]*?<\/script>\n/, '', 'force type script');

    fs.writeFileSync(path.join(ROOT, l.slug + '.html'), html);
    return { slug: l.slug, n: items.length, w };
}

const report = LANDINGS.map(build);

// ── Bảng LANDING_MAP cho products.js (canonical + href chip lọc) ───────────────
const mapEntries = LANDINGS.map((l) => {
    const key = l.style ? `${l.category}|style:${l.style}` : l.event ? `${l.category}|event:${l.event}` : l.category;
    return `    '${key}': '${l.slug}',`;
}).join('\n');

// ── Khối link 12 landing trên trang chủ ───────────────────────────────────────
function homeLinks() {
    const group = (title, list) => `            <div class="home-collections-group">
                <h3>${title}</h3>
                <ul class="home-collections-list">
${list.map((l) => `                    <li><a href="${href(l)}">${l.navLabel} <span>${COUNT[l.slug]} mẫu</span></a></li>`).join('\n')}
                </ul>
            </div>`;
    return '\n' + [
        group('Thiệp cưới online', LANDINGS.filter((l) => l.category === 'wedding')),
        group('Thiệp mời dịp khác', LANDINGS.filter((l) => l.category === 'other')),
    ].join('\n') + '\n            ';
}

const IDX = path.join(ROOT, 'index.html');
const idx = fs.readFileSync(IDX, 'utf8');
const RX_IDX = /(<!-- LANDING-LINKS:START[^\n]*\n?)[\s\S]*?(<!-- LANDING-LINKS:END -->)/;
if (!RX_IDX.test(idx)) throw new Error('index.html thiếu marker LANDING-LINKS');
fs.writeFileSync(IDX, idx.replace(RX_IDX, (m, a, b) => a + homeLinks() + b));

const PJS = path.join(ROOT, 'assets/js/products.js');
const pjs = fs.readFileSync(PJS, 'utf8');
const RX = /(\/\* LANDING-MAP:START[^\n]*\n)[\s\S]*?(\/\* LANDING-MAP:END \*\/)/;
if (!RX.test(pjs)) throw new Error('assets/js/products.js thiếu marker LANDING-MAP');
fs.writeFileSync(PJS, pjs.replace(RX, (m, a, b) => a + `const LANDING_MAP = {\n${mapEntries}\n};\n` + b));

console.log(`✓ ${report.length} landing tĩnh:`);
report.forEach((r) => console.log(`  ${r.slug}.html — ${r.n} mẫu, intro ${r.w} từ`));
console.log('✓ LANDING_MAP → assets/js/products.js');
console.log('✓ khối link 12 landing → index.html');
