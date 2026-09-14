#!/usr/bin/env node
/**
 * gen-ngay-cuoi-thang.js — Sinh bài "Ngày cưới đẹp tháng M/YYYY" cho Cẩm nang (blogs/).
 *
 *   node scripts/gen-ngay-cuoi-thang.js <tháng> <năm> [--min 60] [--date YYYY-MM-DD]
 *   node scripts/gen-ngay-cuoi-thang.js 10 2026
 *   node scripts/gen-ngay-cuoi-thang.js 1 2027 --min 65
 *
 * Dùng engine wedding-date.js tìm ngày đẹp trong tháng, sinh bài HTML blog.
 * Sau khi sinh: npm run build:blog && npm run build:sitemap && node scripts/verify-blog.js <slug>.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const Lunar = require(path.join(ROOT, 'assets/js/lunar.js'));
const WeddingDate = new Function('Lunar', fs.readFileSync(path.join(ROOT, 'assets/js/wedding-date.js'), 'utf8') + '\n;return WeddingDate;')(Lunar);

const args = process.argv.slice(2);
const MONTH = parseInt(args[0], 10);
const YEAR = parseInt(args[1], 10);
const flag = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : d; };
const MIN_DIEM = parseInt(flag('min', '60'), 10);
const DATE = flag('date', new Date().toISOString().slice(0, 10));

if (!MONTH || MONTH < 1 || MONTH > 12 || !YEAR) {
    console.error('Dùng: node scripts/gen-ngay-cuoi-thang.js <tháng 1-12> <năm>');
    process.exit(1);
}

const THU = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
const THU_SHORT = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const THANG_AM = ['', 'Giêng', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười', 'Mười Một', 'Chạp'];
const SITE = 'https://templexa.vn';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = (n) => String(n).padStart(2, '0');

// ---------- Tìm ngày đẹp ----------
const from = new Date(YEAR, MONTH - 1, 1);
const to = new Date(YEAR, MONTH, 0);
const daysInMonth = to.getDate();
const allDays = WeddingDate.timNgayDep(from, to, { minDiem: MIN_DIEM });

// Enrich với thông tin đầy đủ
const days = allDays.map(d => {
    const full = WeddingDate.xemNgay(d.duong.ngay, d.duong.thang, d.duong.nam);
    return full;
});

// Tìm tháng âm tương ứng
const firstAm = WeddingDate.xemNgay(1, MONTH, YEAR).am;
const lastAm = WeddingDate.xemNgay(daysInMonth, MONTH, YEAR).am;
const lunarMonths = [];
if (firstAm.thang === lastAm.thang) {
    lunarMonths.push(firstAm.thang);
} else {
    lunarMonths.push(firstAm.thang, lastAm.thang);
}
const lunarMonthStr = lunarMonths.map(m => 'tháng ' + THANG_AM[m]).join(' – ');
const lunarMonthShort = lunarMonths.map(m => THANG_AM[m]).join('–');

// ---------- Tháng liền kề cho liên kết ----------
const prevMonth = MONTH === 1 ? 12 : MONTH - 1;
const prevYear = MONTH === 1 ? YEAR - 1 : YEAR;
const nextMonth = MONTH === 12 ? 1 : MONTH + 1;
const nextYear = MONTH === 12 ? YEAR + 1 : YEAR;
const monthSlug = (m, y) => `ngay-cuoi-dep-thang-${m}-nam-${y}`;

// ---------- SEO ----------
const slug = monthSlug(MONTH, YEAR);
const title = `Ngày cưới đẹp tháng ${MONTH}/${YEAR} (${lunarMonthShort} âm) — Lịch hoàng đạo`;
const shortTitle = `Ngày cưới đẹp tháng ${MONTH}/${YEAR}`;
const desc = `${days.length} ngày cưới đẹp tháng ${MONTH}/${YEAR} (${lunarMonthStr} âm lịch), chấm điểm từ 0–100. Bảng chi tiết: ngày âm, sao hoàng đạo, trực, can chi. Tra miễn phí tại Templexa.`;
const keywords = `ngày cưới đẹp tháng ${MONTH} ${YEAR}, ngày cưới đẹp tháng ${MONTH} năm ${YEAR}, ngày cưới tháng ${MONTH} ${YEAR}, ngày hoàng đạo tháng ${MONTH} ${YEAR}, ngày tốt cưới hỏi tháng ${MONTH}`;

// ---------- Bảng ngày đẹp ----------
const tableRows = days.map(d => {
    const dd = pad(d.duong.ngay) + '/' + pad(d.duong.thang) + '/' + d.duong.nam;
    const amStr = pad(d.am.ngay) + '/' + pad(d.am.thang) + ' âm' + (d.am.nhuan ? ' (nhuận)' : '');
    const thu = THU[d.thu];
    const sao = d.than.ten + (d.than.hoangDao ? ' ★' : '');
    const truc = d.truc.ten;
    const lyDo = d.lyDo.filter(l => l.tot).map(l => l.t).join('; ');
    const cls = d.diem >= 85 ? 'nc-excellent' : d.diem >= 70 ? 'nc-good' : 'nc-ok';
    return `<tr class="${cls}"><td><strong>${dd}</strong><br><small>${amStr}</small></td><td>${thu}</td><td>${d.diem}</td><td>${sao}</td><td>${truc}</td><td>${d.canChiNgay}</td><td><small>${lyDo}</small></td></tr>`;
}).join('\n                            ');

// ---------- Top 3 ngày phân tích chi tiết ----------
const top3 = days.slice(0, 3);
const top3Html = top3.map((d, i) => {
    const dd = pad(d.duong.ngay) + '/' + pad(d.duong.thang);
    const amStr = pad(d.am.ngay) + '/' + pad(d.am.thang) + ' âm';
    const reasons = d.lyDo.map(l => `<li>${l.tot ? '✓' : '✗'} ${l.t}</li>`).join('');
    return `<h3>${i + 1}. Ngày ${dd} (${THU[d.thu]}) — ${d.diem} điểm</h3>
                <ul class="bp-check">
                    <li><strong>Âm lịch:</strong> ${amStr} (${THANG_AM[d.am.thang]})</li>
                    <li><strong>Can chi:</strong> ${d.canChiNgay}</li>
                    <li><strong>Sao:</strong> ${d.than.ten} ${d.than.hoangDao ? '(hoàng đạo)' : '(hắc đạo)'}</li>
                    <li><strong>Trực:</strong> ${d.truc.ten}</li>
                    ${reasons}
                </ul>`;
}).join('\n                ');

// ---------- Thống kê ----------
const weekendDays = days.filter(d => d.thu === 0 || d.thu === 6);
const excellentDays = days.filter(d => d.diem >= 85);
const hoangDaoDays = days.filter(d => d.than.hoangDao);

// ---------- FAQ ----------
const faq = [
    [`Tháng ${MONTH}/${YEAR} có bao nhiêu ngày cưới đẹp?`,
     `Tháng ${MONTH}/${YEAR} có ${days.length} ngày đạt từ ${MIN_DIEM} điểm trở lên (thang 100), trong đó ${excellentDays.length} ngày xuất sắc (≥85 điểm). Ngày đẹp nhất là ${days.length ? pad(days[0].duong.ngay) + '/' + pad(days[0].duong.thang) + ' (' + days[0].diem + ' điểm)' : 'chưa có dữ liệu'}.`],
    [`Tháng ${MONTH}/${YEAR} tương ứng tháng mấy âm lịch?`,
     `Tháng ${MONTH}/${YEAR} dương lịch tương ứng với ${lunarMonthStr} âm lịch năm ${firstAm.nam <= YEAR ? firstAm.nam : YEAR}.`],
    [`Cưới ngày hoàng đạo là gì?`,
     `Ngày hoàng đạo là ngày có sao tốt trực nhật (Thanh Long, Minh Đường, Kim Quỹ, Bảo Quang, Ngọc Đường, Tư Mệnh). Tháng ${MONTH}/${YEAR} có ${hoangDaoDays.length} ngày hoàng đạo đạt điểm tốt.`],
    [`Cưới ngày thường hay cuối tuần tốt hơn?`,
     `Về phong thuỷ, ngày thường hay cuối tuần không khác nhau — quan trọng là sao, trực và can chi hợp. Tuy nhiên cuối tuần khách dễ sắp xếp hơn, nên bảng có cộng thêm điểm cho thứ Bảy/Chủ nhật.`],
    [`Nên xem thêm gì ngoài ngày đẹp?`,
     `Nên kiểm tra thêm: kim lâu (tuổi cô dâu), hoang ốc, tam tai, tháng Ngâu (tháng 7 âm). Dùng công cụ xem ngày cưới của Templexa để tra đầy đủ các yếu tố cùng lúc — miễn phí.`],
];

// ---------- Cover image fallback ----------
const coverPath = `blogs/images/ngay-cuoi-thang/thang-${MONTH}.webp`;
const coverExists = fs.existsSync(path.join(ROOT, coverPath));
const coverUrl = coverExists ? `${SITE}/${coverPath}` : `${SITE}/assets/images/og-image.png`;
const coverLocal = coverExists ? `images/ngay-cuoi-thang/thang-${MONTH}.webp` : '../assets/images/og-image.png';

// ---------- Prev/next month link (only if file exists) ----------
const prevSlug = monthSlug(prevMonth, prevYear);
const nextSlug = monthSlug(nextMonth, nextYear);
const prevExists = fs.existsSync(path.join(ROOT, 'blogs', prevSlug + '.html'));
const nextExists = fs.existsSync(path.join(ROOT, 'blogs', nextSlug + '.html'));

// ---------- Header / Footer từ bài có sẵn ----------
const refFile = fs.readdirSync(path.join(ROOT, 'blogs')).find(f => f.endsWith('.html') && f !== 'index.html');
const refHtml = fs.readFileSync(path.join(ROOT, 'blogs', refFile), 'utf8');
const HEADER = refHtml.match(/<header class="header">[\s\S]*?<div class="mobile-overlay" id="mobileOverlay"><\/div>/)[0];
const FOOTER = refHtml.match(/<footer class="footer">[\s\S]*?<\/footer>/)[0];

// ---------- HTML ----------
const html = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(title)} | Templexa</title>
    <meta name="description" content="${esc(desc)}">
    <meta name="keywords" content="${esc(keywords)}">
    <meta name="author" content="Templexa Studio">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
    <meta name="theme-color" content="#6366F1">
    <link rel="canonical" href="${SITE}/blogs/${slug}">

    <meta property="og:type" content="article">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(desc)}">
    <meta property="og:image" content="${coverUrl}">
    <meta property="og:image:width" content="1600">
    <meta property="og:image:height" content="900">
    <meta property="og:url" content="${SITE}/blogs/${slug}">
    <meta property="og:site_name" content="Templexa">
    <meta property="og:locale" content="vi_VN">
    <meta property="article:published_time" content="${DATE}T09:00:00+07:00">
    <meta property="article:modified_time" content="${DATE}T09:00:00+07:00">
    <meta property="article:section" content="chuan-bi-cuoi">
    <meta property="article:tag" content="ngày cưới đẹp">
    <meta property="article:tag" content="tháng ${MONTH} ${YEAR}">
    <meta property="article:tag" content="hoàng đạo">
    <meta property="article:tag" content="lịch cưới">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(title)}">
    <meta name="twitter:description" content="${esc(desc)}">
    <meta name="twitter:image" content="${coverUrl}">

    <link rel="icon" type="image/svg+xml" href="../assets/images/logo_v2.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/blog.css">

    <style>
        .nc-excellent td:first-child { border-left: 3px solid #22c55e; }
        .nc-good td:first-child { border-left: 3px solid #6366F1; }
        .nc-ok td:first-child { border-left: 3px solid #94a3b8; }
        .nc-legend { display: flex; gap: 16px; margin: 8px 0 16px; font-size: 0.85em; color: var(--text-secondary); }
        .nc-legend span::before { content: ''; display: inline-block; width: 12px; height: 12px; border-radius: 2px; margin-right: 4px; vertical-align: -1px; }
        .nc-legend .nc-l-exc::before { background: #22c55e; }
        .nc-legend .nc-l-good::before { background: #6366F1; }
        .nc-legend .nc-l-ok::before { background: #94a3b8; }
        .nc-month-nav { display: flex; justify-content: space-between; margin: 24px 0; padding: 16px; background: var(--bg-secondary); border-radius: 12px; }
        .nc-month-nav a { color: var(--accent); text-decoration: none; font-weight: 600; }
        .nc-month-nav a:hover { text-decoration: underline; }
        .nc-stat { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin: 16px 0; }
        .nc-stat-item { padding: 16px; background: var(--bg-secondary); border-radius: 10px; text-align: center; }
        .nc-stat-item strong { display: block; font-size: 1.5em; color: var(--accent); }
        .nc-stat-item small { color: var(--text-secondary); }
    </style>

    <script type="application/ld+json">
    ${JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BlogPosting',
                '@id': `${SITE}/blogs/${slug}#article`,
                mainEntityOfPage: `${SITE}/blogs/${slug}`,
                headline: title,
                description: desc,
                image: { '@type': 'ImageObject', url: coverUrl, width: 1200, height: 630 },
                datePublished: `${DATE}T09:00:00+07:00`,
                dateModified: `${DATE}T09:00:00+07:00`,
                inLanguage: 'vi-VN',
                articleSection: 'Chuẩn bị cưới',
                keywords: ['ngày cưới đẹp', `tháng ${MONTH} ${YEAR}`, 'hoàng đạo', 'lịch cưới'],
                author: { '@type': 'Organization', name: 'Templexa', url: `${SITE}/` },
                publisher: { '@type': 'Organization', name: 'Templexa', url: `${SITE}/`, logo: { '@type': 'ImageObject', url: `${SITE}/assets/images/logo_v2.svg` } }
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${SITE}/` },
                    { '@type': 'ListItem', position: 2, name: 'Blogs', item: `${SITE}/blogs/` },
                    { '@type': 'ListItem', position: 3, name: 'Chuẩn bị cưới', item: `${SITE}/blogs/?category=chuan-bi-cuoi` },
                    { '@type': 'ListItem', position: 4, name: shortTitle }
                ]
            },
            {
                '@type': 'FAQPage',
                mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
            }
        ]
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
    ${HEADER}

    <section class="bp-hero">
        <div class="container container-section">
            <nav class="bl-crumb" aria-label="Breadcrumb">
                <a href="../">Trang chủ</a><span aria-hidden="true">›</span>
                <a href="index.html">Blogs</a><span aria-hidden="true">›</span>
                <a href="index.html?category=chuan-bi-cuoi">Chuẩn bị cưới</a>
            </nav>
            <span class="bl-cat">Chuẩn bị cưới</span>
            <h1>${esc(title)}</h1>
            <p class="bp-lead">Tổng hợp <strong>${days.length} ngày cưới đẹp</strong> trong tháng ${MONTH}/${YEAR} (${lunarMonthStr} âm lịch), chấm điểm theo sao hoàng đạo, trực và can chi ngày. Bảng sắp xếp từ ngày đẹp nhất, kèm phân tích chi tiết top 3 và lưu ý khi chọn ngày.</p>
            <div class="bl-meta">
                <span class="bp-author-chip"><img src="../assets/images/logo_v2.svg" alt="">Templexa</span>
                <time datetime="${DATE}">${DATE.split('-').reverse().join('/')}</time>
                <span data-readtime>5 phút đọc</span>
            </div>
        </div>
    </section>

    <div class="container container-section">
        <div class="bp-layout">
            <article class="bp-body">
                <p>Chọn ngày cưới là một trong những bước đầu tiên khi <a href="../thiep-cuoi.html">chuẩn bị đám cưới</a>. Với nhiều gia đình Việt, ngày tốt không chỉ là ngày rảnh — mà phải hợp sao, hợp trực, không phạm ngày xấu. Bài này dùng cùng bộ luật tính với <a href="../xem-ngay-cuoi-dep.html">công cụ xem ngày cưới</a> của Templexa để liệt kê và chấm điểm từng ngày đẹp trong tháng ${MONTH}/${YEAR}.</p>
                <p>Nếu bạn chưa biết năm nay có phạm <a href="kim-lau-la-gi.html">kim lâu</a> hay không, hãy kiểm tra trước — vì kim lâu xét theo năm, không theo ngày.</p>

                <h2>Tổng quan tháng ${MONTH}/${YEAR}</h2>
                <div class="nc-stat">
                    <div class="nc-stat-item"><strong>${days.length}</strong><small>ngày đẹp (≥${MIN_DIEM}đ)</small></div>
                    <div class="nc-stat-item"><strong>${excellentDays.length}</strong><small>ngày xuất sắc (≥85đ)</small></div>
                    <div class="nc-stat-item"><strong>${weekendDays.length}</strong><small>rơi vào T7/CN</small></div>
                    <div class="nc-stat-item"><strong>${hoangDaoDays.length}</strong><small>ngày hoàng đạo</small></div>
                </div>
                <p>Tháng ${MONTH} dương lịch tương ứng với <strong>${lunarMonthStr} âm lịch</strong> năm ${firstAm.nam}${firstAm.thang === 7 ? '. Lưu ý: tháng 7 âm (tháng Ngâu) nhiều gia đình kiêng cưới hỏi — xem <a href="thang-dai-loi.html">bài về tháng đại lợi</a> để hiểu thêm.' : '.'}</p>

                <h2>Bảng ${days.length} ngày cưới đẹp tháng ${MONTH}/${YEAR}</h2>
                <p>Sắp xếp từ điểm cao nhất. Ngày có ★ là ngày hoàng đạo. Bảng cuộn ngang được trên điện thoại.</p>
                <div class="nc-legend">
                    <span class="nc-l-exc">≥85 điểm</span>
                    <span class="nc-l-good">70–84 điểm</span>
                    <span class="nc-l-ok">${MIN_DIEM}–69 điểm</span>
                </div>
                <div class="bp-tbl-scroll">
                    <table>
                        <thead>
                            <tr><th>Ngày<br><small>(dương/âm)</small></th><th>Thứ</th><th>Điểm</th><th>Sao</th><th>Trực</th><th>Can chi ngày</th><th>Ghi chú</th></tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
                <p><em>Điểm tính tự động từ engine xem ngày cưới Templexa, thang 0–100: sao hoàng đạo (+20), trực hợp cưới (+10–20), ngày cuối tuần (+10), trừ nếu phạm tam nương/nguyệt kỵ/dương công kỵ.</em></p>

                <div class="bp-cta">
                    <div>
                        <h3>Tra ngày cưới theo tuổi của bạn</h3>
                        <p>Nhập ngày sinh cô dâu chú rể → công cụ tự kiểm kim lâu, hoang ốc, tam tai và lọc ngày phù hợp. Miễn phí, theo âm lịch Việt Nam.</p>
                    </div>
                    <a class="bl-btn" href="../xem-ngay-cuoi-dep.html">Xem ngày cưới đẹp</a>
                </div>

                <h2>Phân tích chi tiết top ${top3.length} ngày đẹp nhất</h2>
                <p>Dưới đây là ${top3.length} ngày được chấm điểm cao nhất trong tháng, phân tích từng yếu tố:</p>
                ${top3Html}

                <h2>Ngày cuối tuần đẹp trong tháng ${MONTH}</h2>
                ${weekendDays.length ? `<p>Nếu ưu tiên cuối tuần để khách dễ sắp xếp, tháng ${MONTH} có <strong>${weekendDays.length} ngày</strong> rơi vào Thứ Bảy hoặc Chủ nhật:</p>
                <ul class="bp-check">
${weekendDays.map(d => `                    <li><strong>${pad(d.duong.ngay)}/${pad(d.duong.thang)}</strong> (${THU[d.thu]}) — ${d.diem} điểm, ${d.than.ten}${d.than.hoangDao ? ' ★' : ''}</li>`).join('\n')}
                </ul>` : `<p>Tháng ${MONTH} không có ngày cuối tuần nào đạt điểm tốt (≥${MIN_DIEM}). Bạn có thể hạ ngưỡng hoặc chọn ngày thường — dưới góc phong thuỷ, ngày thường hay cuối tuần không khác nhau.</p>`}

                <h2>Lưu ý khi chọn ngày cưới tháng ${MONTH}</h2>
                <ul>
                    <li><strong>Kiểm tra kim lâu trước:</strong> Kim lâu xét theo năm sinh cô dâu và năm tổ chức, không theo ngày. Nếu phạm kim lâu năm ${YEAR}, chọn ngày đẹp trong tháng cũng không giải quyết được. <a href="kim-lau-la-gi.html">Đọc bài kim lâu là gì</a> để kiểm tra.</li>
                    <li><strong>Xem tuổi cả hai:</strong> Ngày đẹp trong bảng trên là ngày tốt chung. Để chọn ngày hợp tuổi cụ thể, dùng <a href="../xem-ngay-cuoi-dep.html">công cụ xem ngày cưới</a> — nhập ngày sinh cả cô dâu và chú rể.</li>
                    <li><strong>Đặt nhà hàng sớm:</strong> Ngày đẹp cuối tuần thường kín chỗ trước 2–3 tháng, đặc biệt ${MONTH >= 10 && MONTH <= 12 ? 'mùa cưới cuối năm' : 'dịp lễ tết'}.</li>
                    <li><strong>Gửi thiệp sớm:</strong> Sau khi chốt ngày, <a href="../thiep-online.html?category=wedding">gửi thiệp mời online</a> để khách xác nhận tham dự — giúp ước lượng số bàn chính xác hơn.</li>
                </ul>

                <h2>Câu hỏi thường gặp</h2>
                <div class="bp-faq">
${faq.map(([q, a]) => `                    <details><summary>${esc(q)}</summary><div>${a}</div></details>`).join('\n')}
                </div>

                <div class="nc-month-nav">
                    ${prevExists ? `<a href="${prevSlug}.html">← Tháng ${prevMonth}/${prevYear}</a>` : '<span></span>'}
                    <a href="../xem-ngay-cuoi-dep.html">Công cụ xem ngày</a>
                    ${nextExists ? `<a href="${nextSlug}.html">Tháng ${nextMonth}/${nextYear} →</a>` : '<span></span>'}
                </div>

                <h2 data-toc="skip">Lời cuối</h2>
                <p>Tháng ${MONTH}/${YEAR} có ${days.length} ngày đẹp${excellentDays.length ? `, trong đó ${excellentDays.length} ngày xuất sắc (≥85 điểm)` : ''}. Bảng trên tính tự động từ engine xem ngày cưới của Templexa — cùng bộ luật với <a href="../xem-ngay-cuoi-dep.html">công cụ tra ngày</a> trên website.</p>
                <p>Chốt ngày xong, bước tiếp theo là <a href="../thiep-cuoi.html">chọn mẫu thiệp cưới online</a> và gửi cho khách. Templexa có hơn 50 mẫu, giao trong 24h, có đếm ngược và xác nhận tham dự. <a href="../contact.html#pricing-section">Xem bảng giá</a> hoặc nhắn Zalo <strong>0334 884 895</strong> để được tư vấn.</p>
                <p><em>Nội dung dựa trên phong tục dân gian Việt Nam (sao hoàng đạo, 12 trực, tam nương, nguyệt kỵ), mang tính tham khảo. Ngày tốt nhất là ngày cả hai cùng sẵn sàng.</em></p>

                <div class="bp-tags">
                    <a href="index.html?category=chuan-bi-cuoi">#chuẩn bị cưới</a>
                    <a href="index.html?category=chuan-bi-cuoi">#ngày cưới đẹp</a>
                    <a href="index.html?category=chuan-bi-cuoi">#tháng ${MONTH} ${YEAR}</a>
                    <a href="index.html?category=chuan-bi-cuoi">#hoàng đạo</a>
                </div>
                <div class="bp-share" id="bpShare">
                    <span>Chia sẻ:</span>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE + '/blogs/' + slug)}" target="_blank" rel="noopener">Facebook</a>
                    <a href="https://zalo.me/share?url=${encodeURIComponent(SITE + '/blogs/' + slug)}" target="_blank" rel="noopener">Zalo</a>
                    <button type="button" data-copy="${SITE}/blogs/${slug}">Sao chép link</button>
                </div>
                <div class="bp-author">
                    <img src="../assets/images/logo_v2.svg" alt="Templexa" width="52" height="52">
                    <div>
                        <h4>Templexa</h4>
                        <p>Đội ngũ làm <a href="../thiep-cuoi.html">thiệp cưới online</a> và <a href="../xem-ngay-cuoi-dep.html">công cụ xem ngày cưới</a> theo âm lịch Việt Nam. Bảng trong bài được tính tự động từ cùng bộ luật với công cụ.</p>
                    </div>
                </div>
            </article>

            <aside class="bp-aside">
                <details class="bp-toc" open>
                    <summary>Nội dung bài viết</summary>
                    <!-- TOC:START -->
                    <!-- TOC:END -->
                </details>
                <div class="bp-aside-card">
                    <h4>Thiệp cưới online</h4>
                    <p>Chốt ngày rồi — gửi thiệp thôi! Hơn 50 mẫu có đếm ngược, bản đồ, xác nhận tham dự. Giao trong 24h.</p>
                    <a class="bl-btn" href="../thiep-cuoi.html">Xem mẫu thiệp</a>
                </div>
            </aside>
        </div>
    </div>

    <section class="bp-related">
        <div class="container container-section">
            <h2>Bài viết liên quan</h2>
            <p class="bp-related-sub">Đọc tiếp trong Cẩm nang cưới hỏi.</p>
            <div class="bl-grid">
                <!-- RELATED:START -->
                <!-- RELATED:END -->
            </div>
        </div>
    </section>

    ${FOOTER}

    <script src="../assets/js/main.js"></script>
    <script src="../assets/js/blog.js"></script>
</body>
</html>
`;

const out = path.join(ROOT, 'blogs', slug + '.html');
fs.writeFileSync(out, html);
console.log(`✓ blogs/${slug}.html — ${days.length} ngày đẹp (≥${MIN_DIEM}đ), ${excellentDays.length} xuất sắc, ${weekendDays.length} cuối tuần`);
console.log(`  Âm lịch: ${lunarMonthStr}`);
console.log(`  Top 3: ${top3.map(d => pad(d.duong.ngay) + '/' + pad(d.duong.thang) + ' (' + d.diem + 'đ)').join(', ')}`);
console.log('  → npm run build:blog && npm run build:sitemap && node scripts/verify-blog.js ' + slug);
