#!/usr/bin/env node
/**
 * Sinh trang cau-hoi-thuong-gap.html từ assets/data/faq.json.
 * Một nguồn dữ liệu → HTML hiển thị (details/summary) + JSON-LD FAQPage khớp 1:1.
 *
 *   node scripts/build-faq.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://templexa.vn';
const PAGE = 'cau-hoi-thuong-gap.html';
const faq = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets/data/faq.json'), 'utf8'));

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const slug = (s) => s.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 60);

const allItems = faq.groups.flatMap(g => g.items);

// ---------- JSON-LD ----------
const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE}/${PAGE}#faq`,
    'inLanguage': 'vi',
    'dateModified': faq.updated,
    'mainEntity': allItems.map(it => ({
        '@type': 'Question',
        'name': it.q,
        'acceptedAnswer': { '@type': 'Answer', 'text': it.a },
    })),
};
const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Trang chủ', 'item': `${SITE}/` },
        { '@type': 'ListItem', 'position': 2, 'name': 'Câu hỏi thường gặp', 'item': `${SITE}/${PAGE}` },
    ],
};
const webpage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE}/${PAGE}`,
    'name': 'Câu hỏi thường gặp về thiệp cưới online — Templexa',
    'description': 'Giải đáp 30+ câu hỏi về thiệp cưới online: giá bao nhiêu, làm mất bao lâu, gửi cho khách thế nào, RSVP, QR mừng cưới, lời chúc realtime.',
    'inLanguage': 'vi',
    'dateModified': faq.updated,
    'isPartOf': { '@type': 'WebSite', 'name': 'Templexa', 'url': SITE },
    'about': { '@type': 'Thing', 'name': 'Thiệp cưới online' },
    'speakable': { '@type': 'SpeakableSpecification', 'cssSelector': ['.faq-answer'] },
};

// ---------- HTML ----------
const chevron = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';

const toc = faq.groups.map(g =>
    `<a href="#${g.id}" class="faq-toc-chip">${esc(g.title)}</a>`).join('\n                ');

const groupsHTML = faq.groups.map(g => `
            <section class="faq-group" id="${g.id}">
                <h2>${esc(g.title)}</h2>
                <div class="svc-faq-list">
${g.items.map(it => `                    <details class="svc-faq-item faq-item" id="${slug(it.q)}">
                        <summary><h3>${esc(it.q)}</h3>${chevron}</summary>
                        <div class="svc-faq-answer faq-answer"><p>${esc(it.a)}</p></div>
                    </details>`).join('\n')}
                </div>
            </section>`).join('\n');

const html = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Câu Hỏi Thường Gặp Về Thiệp Cưới Online — Templexa</title>
    <meta name="description" content="Giải đáp ${allItems.length} câu hỏi về thiệp cưới online: giá bao nhiêu (từ 150.000đ), làm mất bao lâu (24h), gửi cho khách thế nào, RSVP, QR mừng cưới, lời chúc realtime, thiệp thôi nôi, sinh nhật.">
    <meta name="keywords" content="thiệp cưới online là gì, thiệp cưới online giá bao nhiêu, cách làm thiệp cưới online, thiệp mời online, thiệp thôi nôi online, RSVP thiệp cưới">
    <meta name="author" content="Templexa Studio">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
    <meta name="theme-color" content="#6366F1">
    <link rel="canonical" href="${SITE}/${PAGE}">

    <meta property="og:type" content="article">
    <meta property="og:title" content="Câu Hỏi Thường Gặp Về Thiệp Cưới Online — Templexa">
    <meta property="og:description" content="Thiệp cưới online giá bao nhiêu, làm mất bao lâu, gửi cho khách thế nào? ${allItems.length} câu trả lời ngắn gọn từ Templexa.">
    <meta property="og:image" content="${SITE}/assets/images/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:url" content="${SITE}/${PAGE}">
    <meta property="og:site_name" content="Templexa">
    <meta property="og:locale" content="vi_VN">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Câu Hỏi Thường Gặp Về Thiệp Cưới Online — Templexa">
    <meta name="twitter:description" content="${allItems.length} câu trả lời ngắn gọn về thiệp cưới online: giá, thời gian, cách gửi, tính năng.">
    <meta name="twitter:image" content="${SITE}/assets/images/og-image.png">

    <!-- FAQ Structured Data — sinh tự động từ assets/data/faq.json (node scripts/build-faq.js) -->
    <script type="application/ld+json">
${JSON.stringify(faqSchema, null, 4)}
    </script>
    <script type="application/ld+json">
${JSON.stringify(breadcrumb, null, 4)}
    </script>
    <script type="application/ld+json">
${JSON.stringify(webpage, null, 4)}
    </script>

    <link rel="icon" href="./favicon.ico" sizes="48x48">
    <link rel="icon" type="image/svg+xml" href="./assets/images/favicon.svg">
    <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png">
    <link rel="manifest" href="./site.webmanifest">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./assets/css/style.css">
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-D8ZC2MYYVY"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-D8ZC2MYYVY');
    </script>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container container-header">
            <a href="index.html" class="logo">
                <img src="./assets/images/logo_v2.svg" alt="Templexa" class="logo-icon">
            </a>
            <nav class="nav" id="navMenu">
                <ul class="nav-menu">
                    <li><a href="index.html">Trang chủ</a></li>
                    <li><a href="thiep-online.html">Mẫu thiệp</a></li>
                    <li><a href="products.html">Mẫu web</a></li>
                    <li><a href="contact.html">Dịch vụ</a></li>
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
    <div class="mobile-overlay" id="mobileOverlay"></div>

    <!-- Hero -->
    <section class="products-hero">
        <div class="container container-section">
            <nav class="breadcrumb faq-breadcrumb" aria-label="Breadcrumb">
                <a href="index.html">Trang chủ</a><span>/</span><span>Câu hỏi thường gặp</span>
            </nav>
            <h1 class="hero-reveal"><span class="gradient-text">Câu Hỏi Thường Gặp</span><br>Về Thiệp Cưới Online</h1>
            <p class="hero-reveal">${allItems.length} câu trả lời ngắn gọn về giá, thời gian giao, cách gửi cho khách, RSVP, QR mừng cưới và các loại thiệp mời online của Templexa. Cập nhật ${faq.updated.split('-').reverse().join('/')}.</p>
            <div class="faq-toc hero-reveal">
                ${toc}
            </div>
        </div>
    </section>

    <!-- FAQ groups -->
    <main class="products-section faq-page">
        <div class="container container-section">
${groupsHTML}

            <section class="faq-cta">
                <h2>Chưa thấy câu trả lời bạn cần?</h2>
                <p>Nhắn Zalo, Templexa phản hồi trong vài phút vào giờ làm việc — hoặc xem thử hơn 100 mẫu thiệp rồi đặt ngay.</p>
                <div class="faq-cta-actions">
                    <a href="https://zalo.me/0334884895" target="_blank" rel="noopener" class="btn-terracotta">Chat Zalo 0334 884 895</a>
                    <a href="thiep-online.html" class="btn-gold-outline">Xem mẫu thiệp</a>
                </div>
            </section>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container container-footer">
            <div class="footer-grid">
                <div class="footer-brand">
                    <a href="index.html" class="logo">
                        <img src="./assets/images/logo_v2.svg" alt="Templexa" class="logo-icon">
                    </a>
                    <p>Thiệp cưới &amp; thiệp sự kiện online sang trọng, giao trong 24h. Kèm kho mẫu website cá nhân hoá cho riêng bạn.</p>
                </div>
                <div class="footer-col">
                    <h4>Thiệp Mời Online</h4>
                    <ul>
                        <li><a href="thiep-online.html?category=wedding">Thiệp cưới online</a></li>
                        <li><a href="thiep-online.html?category=other">Thiệp sinh nhật, thôi nôi</a></li>
                        <li><a href="contact.html#pricing-section">Bảng giá thiệp</a></li>
                        <li><a href="cau-hoi-thuong-gap.html">Câu hỏi thường gặp</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Mẫu Website</h4>
                    <ul>
                        <li><a href="products.html?category=onepage">One page</a></li>
                        <li><a href="products.html?category=e-commerce">E-commerce</a></li>
                        <li><a href="products.html?category=portfolio">Portfolio</a></li>
                        <li><a href="products.html?category=education">Giáo dục</a></li>
                        <li><a href="contact.html#web-design">Gói thiết kế web</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Liên Hệ</h4>
                    <ul>
                        <li><a href="contact.html#contactForm">Yêu cầu báo giá</a></li>
                        <li><a href="https://zalo.me/0334884895" target="_blank" rel="noopener">Zalo 0334 884 895</a></li>
                        <li><a href="mailto:templexa.contact@gmail.com">templexa.contact@gmail.com</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Templexa Studio. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="./assets/js/main.js"></script>
    <script>
        // Mở sẵn câu hỏi nếu URL có #hash trỏ tới nó
        (function () {
            var el = location.hash && document.getElementById(location.hash.slice(1));
            if (el && el.tagName === 'DETAILS') el.open = true;
        })();
    </script>
</body>
</html>
`;

fs.writeFileSync(path.join(ROOT, PAGE), html);
console.log(`✓ ${PAGE}: ${faq.groups.length} nhóm, ${allItems.length} câu hỏi`);
