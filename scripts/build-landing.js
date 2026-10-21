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

// Bài blog cho mục "Cẩm nang liên quan" (field posts trong landings.js). File do build-blog.js sinh;
// thiếu file thì landing vẫn build được, chỉ không có mục cẩm nang.
const BLOG_INDEX = path.join(ROOT, 'assets/data/blog-index.json');
const BLOG_POSTS = fs.existsSync(BLOG_INDEX) ? (JSON.parse(fs.readFileSync(BLOG_INDEX, 'utf8')).posts || []) : [];
if (!BLOG_POSTS.length) console.warn('! assets/data/blog-index.json trống hoặc thiếu — landing không có mục "Cẩm nang liên quan"');
const postBySlug = (slug) => BLOG_POSTS.find((p) => p.slug === slug);

// ── Helpers ───────────────────────────────────────────────────────────────────
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** title trong blog-index.json đã escape HTML (&amp;) — decode trước khi esc lại để không thành &amp;amp; */
const unesc = (s) => String(s).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
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

// Hub thiep-online: mọi mẫu thiệp mời (cưới + dịp khác; lời nhắn QR / danh thiếp số là công cụ, không tính)
const HUB_LIST = ALL.filter((p) => p.type === 'invitation' && (p.category === 'wedding' || p.category === 'other'));
const HUB_N = HUB_LIST.length;

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

/** Số card đầu lưới tải ngay (above the fold) — còn lại lazy */
const EAGER_CARDS = 4;
/** Kích thước thật của mobile shot (products/.../shots/*.webp = 780×1688, tỉ lệ 9:19.5) */
const CARD_IMG_W = 390, CARD_IMG_H = 844;

function cardHTML(p, i) {
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
    const loading = i < EAGER_CARDS ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';

    return `                <a href="thiep-online.html?pid=${p.id}" class="product-card product-card-invitation" data-product-id="${p.id}"${p.demoUrl ? ` data-demo-url="${esc(p.demoUrl)}"` : ''}>
                    <div class="product-card-image">
                        <img src="${esc(imgSrc)}" alt="${esc(p.name)}" width="${CARD_IMG_W}" height="${CARD_IMG_H}" ${loading}>
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
        name: unesc(stripTags(fill(l.h1, l))).replace(/\s+/g, ' ').trim(),
        description: fill(l.desc, l),
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
                ...(p.demoUrl ? { url: abs(p.demoUrl) } : {}),
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

    // Mục "Cẩm nang liên quan" — slug không có trong blog-index.json thì bỏ qua + cảnh báo
    const posts = (l.posts || []).map((s) => {
        const p = postBySlug(s);
        if (!p) { console.warn(`! ${l.slug}: posts "${s}" không có trong blog-index.json — bỏ qua`); return ''; }
        return `                    <li><a href="blogs/${p.slug}.html">${esc(unesc(p.title))}</a></li>`;
    }).filter(Boolean).join('\n');
    const postsBlock = posts ? `
                <h2>Cẩm nang liên quan</h2>
                <ul class="landing-links-posts">
${posts}
                </ul>` : '';

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
                    <li><a href="thiep-online.html">Tất cả mẫu thiệp mời <span class="landing-links-count">${HUB_N} mẫu</span></a></li>
                </ul>${postsBlock}
                <h2>Hỗ trợ</h2>
                <ul>
                    <li><a href="contact.html#pricing-section">Bảng giá thiệp mời online</a></li>
                    <li><a href="cau-hoi-thuong-gap.html">Câu hỏi thường gặp</a></li>
                </ul>
            </aside>
        </div>
    </section>
`;
}

// ── FAQ riêng của landing (field faq trong landings.js) ───────────────────────
// Hub giữ bộ FAQ chung từ faq.json (bị xoá khỏi landing ở build()); landing nào có field
// faq: [{ q, a, aHtml? }] thì có section FAQ + FAQPage JSON-LD riêng. a = text thuần (JSON-LD),
// aHtml = bản có <a href> nội bộ (link giữ .html). Landing không có faq → không sinh gì.
const FAQ_MIN = 4, FAQ_MAX = 6, FAQ_A_MIN = 25, FAQ_A_MAX = 70;
const HUB_FAQ_FILE = path.join(ROOT, 'assets/data/faq.json');
const HUB_QUESTIONS = new Set();
if (fs.existsSync(HUB_FAQ_FILE)) {
    const walk = (v) => {
        if (Array.isArray(v)) v.forEach(walk);
        else if (v && typeof v === 'object') { if (typeof v.q === 'string') HUB_QUESTIONS.add(v.q.trim().toLowerCase()); Object.values(v).forEach(walk); }
    };
    walk(JSON.parse(fs.readFileSync(HUB_FAQ_FILE, 'utf8')));
}

function checkFaq(l) {
    if (!l.faq) return;
    if (!Array.isArray(l.faq) || l.faq.length < FAQ_MIN || l.faq.length > FAQ_MAX) {
        throw new Error(`${l.slug}: faq cần ${FAQ_MIN}–${FAQ_MAX} câu (đang ${Array.isArray(l.faq) ? l.faq.length : 'sai kiểu'})`);
    }
    l.faq.forEach((f, i) => {
        if (!f.q || !f.a) throw new Error(`${l.slug}: faq[${i}] thiếu q hoặc a`);
        if (/<[a-z]/i.test(f.a)) throw new Error(`${l.slug}: faq[${i}].a phải là text thuần — link để ở aHtml`);
        const n = words(f.a);
        if (n < FAQ_A_MIN || n > FAQ_A_MAX) console.warn(`! ${l.slug}: faq "${f.q}" trả lời ${n} từ (ngoài ${FAQ_A_MIN}–${FAQ_A_MAX})`);
        if (HUB_QUESTIONS.has(f.q.trim().toLowerCase())) console.warn(`! ${l.slug}: faq "${f.q}" trùng nguyên văn câu trong faq.json`);
    });
}

function faqSection(l) {
    if (!l.faq) return '';
    const items = l.faq.map((f) => `                <details class="svc-faq-item faq-item">
                    <summary><h3>${esc(f.q)}</h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></summary>
                    <div class="svc-faq-answer faq-answer"><p>${f.aHtml || esc(f.a)}</p></div>
                </details>`).join('\n');
    return `    <!-- FAQ riêng của landing — sinh bởi scripts/build-landing.js từ field faq trong landings.js, đừng sửa tay -->
    <section class="products-section faq-inline landing-faq" id="faq">
        <div class="container container-section">
            <div class="section-header">
                <h2>Câu hỏi thường gặp về ${esc(l.faqTopic || l.navLabel.replace(/^Thiệp /, 'thiệp ').toLowerCase())}</h2>
            </div>
            <div class="svc-faq-list">
${items}
            </div>
        </div>
    </section>
`;
}

function faqLd(l) {
    const ld = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: l.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    };
    return '    <!-- LANDING-FAQ-LD — sinh bởi scripts/build-landing.js -->\n    <script type="application/ld+json">\n    '
        + JSON.stringify(ld, null, 4).split('\n').join('\n    ') + '\n    </script>';
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
// Lưới hub sinh sẵn nằm giữa marker HUB-GRID — gỡ ra để landing nhận lại ô lưới trống
const tpl = fs.readFileSync(TEMPLATE, 'utf8').replace(/<!-- HUB-GRID:START[^>]*-->[\s\S]*?<!-- HUB-GRID:END -->\s*/, '');

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
    checkFaq(l);

    const selfUrl = url(l);
    const title = fill(l.title, l);
    const desc = fill(l.desc, l);
    if (title.length > 65) console.warn(`! ${l.slug}: title ${title.length} ký tự (> 65)`);
    if (desc.length < 140 || desc.length > 160) console.warn(`! ${l.slug}: description ${desc.length} ký tự (ngoài 140–160)`);
    let html = tpl;

    // ── head ──
    html = must(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`, 'title');
    html = must(html, /<meta name="description" content="[\s\S]*?">/, `<meta name="description" content="${esc(desc)}">`, 'meta description');
    html = must(html, /<meta name="keywords" content="[\s\S]*?">/, `<meta name="keywords" content="${esc(keywords(l))}">`, 'meta keywords');
    html = must(html, /<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${selfUrl}">`, 'canonical');
    html = must(html, /<meta property="og:title" content="[\s\S]*?">/, `<meta property="og:title" content="${esc(title)}">`, 'og:title');
    html = must(html, /<meta property="og:description" content="[\s\S]*?">/, `<meta property="og:description" content="${esc(desc)}">`, 'og:description');
    html = must(html, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${selfUrl}">`, 'og:url');
    html = must(html, /<meta name="twitter:title" content="[\s\S]*?">/, `<meta name="twitter:title" content="${esc(title)}">`, 'twitter:title');
    html = must(html, /<meta name="twitter:description" content="[\s\S]*?">/, `<meta name="twitter:description" content="${esc(desc)}">`, 'twitter:description');

    // JSON-LD riêng của landing (thay khối CollectionPage của hub)
    html = must(html, /    <!-- Structured Data -->\n    <script type="application\/ld\+json">[\s\S]*?<\/script>/,
        '    <!-- Structured Data -->\n    <script type="application/ld+json">\n    '
        + JSON.stringify(jsonLd(l), null, 4).split('\n').join('\n    ') + '\n    </script>'
        + (l.faq ? '\n' + faqLd(l) : ''), 'JSON-LD');

    // FAQ chỉ giữ trên hub — 12 landing dùng chung 1 bộ FAQ sẽ thành nội dung lặp
    html = must(html, /\n    <!-- FAQ-LD:START -->[\s\S]*?<!-- FAQ-LD:END -->\n/, '\n', 'FAQ-LD');
    html = must(html, /\n    <!-- FAQ:START[\s\S]*?<!-- FAQ:END -->\n/, '\n', 'FAQ section');
    // Khối "Cẩm nang trước khi đặt thiệp" chỉ có trên hub — landing dùng field posts riêng trong aside
    html = must(html, /\n    <!-- HUB-BLOGS:START[\s\S]*?<!-- HUB-BLOGS:END -->\n/, '\n', 'HUB-BLOGS section');

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
        '<div class="products-grid" id="productsGrid">\n' + items.slice(0, PER_PAGE).map((p, i) => cardHTML(p, i)).join('\n') + '\n            </div>', 'products grid');

    html = must(html, '\n    <!-- Footer -->', '\n' + copyHTML(l) + (l.faq ? '\n' + faqSection(l) : '') + '\n    <!-- Footer -->', 'footer anchor');

    // Hub tự ép ?type=invitation vào URL; landing lấy bộ lọc từ data-landing nên bỏ đoạn này
    html = must(html, /    <script>\n        \/\* Force type=invitation[\s\S]*?<\/script>\n/, '', 'force type script');

    fs.writeFileSync(path.join(ROOT, l.slug + '.html'), html);
    return { slug: l.slug, n: items.length, w, title: title.length, desc: desc.length, posts: (l.posts || []).filter(postBySlug).length, faq: l.faq ? l.faq.length : 0 };
}

const report = LANDINGS.map(build);

// ── Hub thiep-online.html: số mẫu, ItemList JSON-LD, lưới 16 mẫu sinh sẵn (bot AI không chạy JS vẫn thấy mẫu) ──
function buildHub() {
    let h = fs.readFileSync(TEMPLATE, 'utf8');
    const num = (str) => str.replace(/\b\d{2,3}(\s+[Mm]ẫu)/g, (m, rest) => HUB_N + rest);
    h = h.replace(/<title>[\s\S]*?<\/title>|<meta (?:name|property)="(?:description|og:title|og:description|twitter:title|twitter:description)" content="[^"]*">/g, num);
    h = h.replace(/<h1 class="hero-reveal" id="heroTitle">[\s\S]*?<\/h1>|<p class="hero-reveal" id="heroIntro">[\s\S]*?<\/p>/g, num);
    // JSON-LD CollectionPage của hub
    if (!/    <!-- Structured Data -->\n    <script type="application\/ld\+json">\n/.test(h)) throw new Error('thiep-online.html thiếu khối JSON-LD "<!-- Structured Data -->"');
    h = h.replace(/(    <!-- Structured Data -->\n    <script type="application\/ld\+json">\n)([\s\S]*?)(\n    <\/script>)/, (m, a, body, c) => {
        const ld = JSON.parse(body);
        ld.name = num(ld.name); ld.description = num(ld.description); ld.numberOfItems = HUB_N;
        ld.mainEntity = {
            '@type': 'ItemList', name: 'Mẫu thiệp mời online', numberOfItems: HUB_N,
            itemListElement: HUB_LIST.slice(0, PER_PAGE).map((p, i) => ({
                '@type': 'ListItem', position: i + 1, name: p.name,
                image: abs(p.mobileView || p.thumbnail), ...(p.demoUrl ? { url: abs(p.demoUrl) } : {}),
            })),
        };
        return a + '    ' + JSON.stringify(ld, null, 4).split('\n').join('\n    ') + c;
    });
    // lưới sinh sẵn (JS render lại y hệt khi tải xong)
    const grid = '<!-- HUB-GRID:START — sinh bởi scripts/build-landing.js, đừng sửa tay -->\n'
        + HUB_LIST.slice(0, PER_PAGE).map((p, i) => cardHTML(p, i)).join('\n') + '\n            <!-- HUB-GRID:END -->';
    h = must(h.replace(/<!-- HUB-GRID:START[^>]*-->[\s\S]*?<!-- HUB-GRID:END -->/, ''), '<div class="products-grid" id="productsGrid"></div>',
        '<div class="products-grid" id="productsGrid">' + grid + '</div>', 'hub grid');
    fs.writeFileSync(TEMPLATE, h);
}
buildHub();

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
    const groups = [
        group('Thiệp cưới online', LANDINGS.filter((l) => l.category === 'wedding')),
        group('Thiệp mời dịp khác', LANDINGS.filter((l) => l.category === 'other')),
    ].join('\n');
    return '\n            <div class="home-collections-wrap">\n' + groups + '\n            </div>\n            ';
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
report.forEach((r) => console.log(`  ${r.slug}.html — ${r.n} mẫu, intro ${r.w} từ, title ${r.title} ký tự, desc ${r.desc} ký tự, ${r.posts} bài cẩm nang${r.faq ? `, ${r.faq} câu FAQ` : ''}`));
console.log(`✓ hub thiep-online.html — ${HUB_N} mẫu, lưới ${PER_PAGE} mẫu sinh sẵn + ItemList`);
console.log('✓ LANDING_MAP → assets/js/products.js');
console.log('✓ khối link 12 landing → index.html');
