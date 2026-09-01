#!/usr/bin/env node
/**
 * build-xem-ngay.js — Sinh phần nội dung TĨNH cho xem-ngay-cuoi-dep.html
 *
 * Vì sao cần: công cụ xem ngày chỉ hiện kết quả sau khi người dùng nhập form
 * (JS). Google và các AI crawler (Gemini, ChatGPT, Perplexity) không bấm form,
 * nên trang không có gì để trích dẫn khi ai đó hỏi "ngày cưới đẹp tháng 10/2026".
 * Script này dùng đúng engine của công cụ (lunar.js + wedding-date.js) để in
 * sẵn ra HTML:
 *   1. Bảng ngày đẹp cưới hỏi theo tháng — từ tháng hiện tại đến hết năm sau
 *   2. Bảng tra kim lâu / hoang ốc / tam tai theo năm sinh cho 2 năm âm lịch tới
 *   3. JSON-LD (WebApplication + WebPage có datePublished/dateModified + Breadcrumb)
 *
 * Kết quả chèn vào giữa 2 cặp marker trong trang — ĐỪNG sửa tay bên trong:
 *   <!-- XN-STATIC:START --> ... <!-- XN-STATIC:END -->   (HTML)
 *   <!-- XN-LD:START -->     ... <!-- XN-LD:END -->       (JSON-LD trong <head>)
 *
 * Dùng:  node scripts/build-xem-ngay.js          (đã gắn vào npm run build:seo)
 *        node scripts/build-xem-ngay.js 2026-10  (giả lập chạy ở tháng khác)
 */
const fs = require('fs');
const path = require('path');
const Lunar = require('../assets/js/lunar.js');
const WD = require('../assets/js/wedding-date.js');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://templexa.vn';
const PAGE_FILE = 'xem-ngay-cuoi-dep.html';
const PAGE_URL = `${SITE}/xem-ngay-cuoi-dep`;
const PUBLISHED = '2026-08-31';          // ngày trang lên sóng lần đầu (git log)

const MIN_DIEM = 62;                      // cùng ngưỡng với công cụ (xem-ngay.js)
const SO_NGAY_MOI_THANG = 6;              // hiện tối đa bấy nhiêu ngày/tháng
const SO_THANG_MO_SAN = 6;                // các tháng sau đó gập trong <details> cho trang đỡ dài
const TUOI_TU = 20, TUOI_DEN = 45;        // bảng tra tuổi: 20–45 tuổi (tuổi dương)

// Cho phép giả lập "hôm nay" để test: node scripts/build-xem-ngay.js 2027-01
const arg = process.argv[2];
const now = arg ? new Date(+arg.slice(0, 4), +arg.slice(5, 7) - 1, 1) : new Date();
const TODAY_ISO = new Date().toISOString().slice(0, 10);
const NAM_DAU = now.getFullYear();
const NAM_CUOI = NAM_DAU + 1;

const THU = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
const pad = (n) => String(n).padStart(2, '0');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const dmy = (d, m, y) => `${pad(d)}/${pad(m)}/${y}`;
const soNgay = (m, y) => new Date(y, m, 0).getDate();
const fmtVN = (iso) => iso.split('-').reverse().join('/');

/* ============================================================
 * 1. Ngày đẹp theo tháng
 * ============================================================ */
function ngayDepThang(m, y) {
    const all = [];
    for (let d = 1; d <= soNgay(m, y); d++) all.push(WD.xemNgay(d, m, y));
    const dat = all.filter(x => x.diem >= MIN_DIEM);
    const chon = dat.slice()
        .sort((a, b) => b.diem - a.diem || a.jd - b.jd)
        .slice(0, SO_NGAY_MOI_THANG)
        .sort((a, b) => a.jd - b.jd);
    return { tong: dat.length, ngay: chon, dau: all[0], cuoi: all[all.length - 1] };
}

function nhanAmThang(dau, cuoi) {
    const a = dau.am, b = cuoi.am;
    const th = a.thang === b.thang && a.nam === b.nam
        ? `tháng ${a.thang}${a.nhuan ? ' nhuận' : ''}`
        : `tháng ${a.thang}${a.nhuan ? ' nhuận' : ''} – ${b.thang}${b.nhuan ? ' nhuận' : ''}`;
    const nam = a.nam === b.nam ? `năm ${dau.canChiNam}` : `năm ${dau.canChiNam} – ${cuoi.canChiNam}`;
    return `Âm lịch ${th} ${nam}`;
}

function hangNgay(d) {
    const cuoiTuan = d.thu === 0 || d.thu === 6;
    const ky = [d.tamNuong && 'Tam Nương', d.nguyetKy && 'Nguyệt Kỵ', d.duongCongKy && 'Dương Công'].filter(Boolean);
    return `                        <tr>
                            <td>${THU[d.thu]}, ${dmy(d.duong.ngay, d.duong.thang, d.duong.nam)}${cuoiTuan ? '<span class="wk">cuối tuần</span>' : ''}</td>
                            <td>${d.am.ngay}/${d.am.thang}${d.am.nhuan ? ' nhuận' : ''} ${d.canChiNgay} · ${d.than.ten} · trực ${d.truc.ten}${ky.length ? `<span class="warn"> · ${ky.join(', ')}</span>` : ''}</td>
                            <td class="diem">${d.diem}</td>
                        </tr>`;
}

function khoiThang(m, y) {
    const r = ngayDepThang(m, y);
    const sub = r.tong
        ? `${nhanAmThang(r.dau, r.cuoi)} · ${r.tong} ngày đạt mức gợi ý${r.tong > r.ngay.length ? `, hiện ${r.ngay.length} ngày điểm cao nhất` : ''}`
        : `${nhanAmThang(r.dau, r.cuoi)} · không có ngày nào đạt mức gợi ý`;
    return `                <article class="xn-month" id="thang-${m}-${y}">
                    <h3>Tháng ${m}/${y}</h3>
                    <p class="xn-month-sub">${sub}</p>
                    <div class="xn-tbl-scroll">
                    <table class="xn-tbl">
                        <thead><tr><th>Ngày dương</th><th>Âm lịch · Sao · Trực</th><th class="diem">Điểm</th></tr></thead>
                        <tbody>
${r.ngay.map(hangNgay).join('\n')}
                        </tbody>
                    </table>
                    </div>
                </article>`;
}

const thangList = [];
for (let y = NAM_DAU, m = now.getMonth() + 1; y <= NAM_CUOI; m++) {
    if (m > 12) { m = 1; y++; if (y > NAM_CUOI) break; }
    thangList.push([m, y]);
}
const khoi = thangList.map(([m, y]) => khoiThang(m, y));
const monthsHTML = khoi.slice(0, SO_THANG_MO_SAN).join('\n');
const thangSau = thangList.slice(SO_THANG_MO_SAN);
const monthsMoreHTML = thangSau.length ? `            <details class="xn-more">
                <summary>Xem tiếp tháng ${thangSau[0][0]}/${thangSau[0][1]} – ${thangSau[thangSau.length - 1][0]}/${thangSau[thangSau.length - 1][1]}<small>${thangSau.length} tháng nữa, mỗi tháng tối đa ${SO_NGAY_MOI_THANG} ngày điểm cao nhất</small></summary>
                <div class="xn-months">
${khoi.slice(SO_THANG_MO_SAN).join('\n')}
                </div>
            </details>` : '';

/* ============================================================
 * 2. Bảng tra tuổi theo năm sinh
 * ============================================================ */
function khoangNamAm(namAm) {
    const tet = Lunar.lunar2solar(1, 1, namAm, 0);
    const tetSau = Lunar.lunar2solar(1, 1, namAm + 1, 0);
    const cuoi = new Date(tetSau.year, tetSau.month - 1, tetSau.day - 1);
    return `${dmy(tet.day, tet.month, tet.year)} – ${dmy(cuoi.getDate(), cuoi.getMonth() + 1, cuoi.getFullYear())}`;
}

function hangTuoi(namSinh, namCuoi) {
    const kl = WD.kimLau(namSinh, namCuoi);
    const ho = WD.hoangOc(namSinh, namCuoi);
    const tt = WD.tamTai(namSinh, namCuoi);
    const xau = (kl.pham ? 1 : 0) + (ho.tot ? 0 : 1) + (tt.pham ? 1 : 0);
    const ket = xau === 0 ? '<span class="ok">Đẹp</span>' : xau === 1 ? '<span class="warn">Cân nhắc</span>' : '<span class="warn">Nên tránh</span>';
    return `                        <tr>
                            <td>${namSinh} · ${Lunar.canChiNam(namSinh)}</td>
                            <td>${kl.tuoiMu}</td>
                            <td>${kl.pham ? `<span class="warn">${kl.ten}</span>` : '<span class="ok">Không phạm</span>'}</td>
                            <td>${ho.tot ? `<span class="ok">${ho.ten}</span>` : `<span class="warn">${ho.ten}</span>`}</td>
                            <td>${tt.pham ? '<span class="warn">Phạm tam tai</span>' : '<span class="ok">Không phạm</span>'}</td>
                            <td>${ket}</td>
                        </tr>`;
}

function bangTuoi(namCuoi, moSan) {
    const rows = [];
    for (let ns = namCuoi - TUOI_DEN; ns <= namCuoi - TUOI_TU; ns++) rows.push(hangTuoi(ns, namCuoi));
    return `                <details class="xn-year" id="tuoi-cuoi-${namCuoi}"${moSan ? ' open' : ''}>
                    <summary><span>Cưới năm ${namCuoi} — ${Lunar.canChiNam(namCuoi)}<small>Năm âm lịch, tính từ ${khoangNamAm(namCuoi)}</small></span></summary>
                    <p class="xn-scroll-hint">Kéo ngang để xem đủ cột →</p>
                    <div class="xn-tbl-scroll">
                    <table class="xn-tbl">
                        <thead><tr><th>Năm sinh</th><th>Tuổi mụ</th><th>Kim lâu</th><th>Hoang ốc</th><th>Tam tai</th><th>Nhận xét</th></tr></thead>
                        <tbody>
${rows.join('\n')}
                        </tbody>
                    </table>
                    </div>
                </details>`;
}

const namAmDau = Lunar.solar2lunar(now.getDate(), now.getMonth() + 1, now.getFullYear()).year;
const yearsHTML = [namAmDau, namAmDau + 1].map((y, i) => bangTuoi(y, i === 0)).join('\n');

/* ============================================================
 * 3. Ghép HTML + JSON-LD
 * ============================================================ */
const staticHTML = `<!-- XN-STATIC:START — sinh tự động: node scripts/build-xem-ngay.js — đừng sửa tay -->
    <section class="xn-static" id="ngay-dep-theo-thang">
        <div class="container container-section">
            <h2 class="xn-h2">Ngày đẹp cưới hỏi năm ${NAM_DAU} – ${NAM_CUOI} theo tháng</h2>
            <p class="xn-static-intro">Bảng dưới lọc sẵn những <strong>ngày hoàng đạo</strong> có trực hợp cưới hỏi, ưu tiên ngày không trùng ngày kỵ (Tam Nương, Nguyệt Kỵ, Dương Công) — <strong>chưa xét tuổi</strong> của cô dâu chú rể. Nhập ngày sinh ở phần trên để công cụ lọc tiếp theo kim lâu, hoang ốc, tam tai của hai bạn. Điểm trên thang 0–100 theo cách quy đổi của Templexa. <span class="xn-updated">Cập nhật ${fmtVN(TODAY_ISO)}.</span></p>
            <div class="xn-months">
${monthsHTML}
            </div>
${monthsMoreHTML}

            <h2 class="xn-h2" id="bang-tra-kim-lau">Bảng tra kim lâu, hoang ốc, tam tai theo năm sinh</h2>
            <p class="xn-static-intro">Tra nhanh năm sinh của cô dâu (theo truyền thống kim lâu xét tuổi cô dâu) hoặc chú rể để biết năm ${namAmDau} – ${namAmDau + 1} âm lịch có vướng gì không. Năm sinh tính theo <strong>âm lịch</strong>: người sinh tháng 1 – 2 dương lịch trước Tết thuộc năm âm lịch trước đó.</p>
${yearsHTML}
        </div>
    </section>
    <!-- XN-STATIC:END -->`;

const ld = [
    {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        '@id': `${PAGE_URL}#app`,
        'name': 'Xem ngày cưới đẹp',
        'url': PAGE_URL,
        'applicationCategory': 'UtilitiesApplication',
        'operatingSystem': 'Web',
        'inLanguage': 'vi-VN',
        'isAccessibleForFree': true,
        'description': 'Công cụ tra ngày cưới đẹp theo âm lịch Việt Nam: kim lâu, hoang ốc, tam tai, ngày hoàng đạo và 12 trực.',
        'datePublished': PUBLISHED,
        'dateModified': TODAY_ISO,
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'VND' },
        'publisher': { '@type': 'Organization', 'name': 'Templexa', 'url': `${SITE}/` },
    },
    {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': PAGE_URL,
        'url': PAGE_URL,
        'name': `Xem ngày cưới đẹp ${NAM_DAU} – ${NAM_CUOI}: tra kim lâu, hoang ốc, tam tai`,
        'description': `Công cụ xem ngày cưới miễn phí kèm bảng ngày hoàng đạo hợp cưới hỏi theo tháng năm ${NAM_DAU} – ${NAM_CUOI} và bảng tra kim lâu, hoang ốc, tam tai theo năm sinh. Tính theo âm lịch Việt Nam.`,
        'inLanguage': 'vi',
        'datePublished': PUBLISHED,
        'dateModified': TODAY_ISO,
        'isPartOf': { '@type': 'WebSite', 'name': 'Templexa', 'url': SITE },
        'about': [
            { '@type': 'Thing', 'name': 'Xem ngày cưới' },
            { '@type': 'Thing', 'name': 'Kim lâu' },
            { '@type': 'Thing', 'name': 'Hoang ốc' },
            { '@type': 'Thing', 'name': 'Tam tai' },
        ],
        'mainEntity': { '@id': `${PAGE_URL}#app` },
        'speakable': { '@type': 'SpeakableSpecification', 'cssSelector': ['.xn-explain-grid p', '.faq-answer'] },
    },
    {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Trang chủ', 'item': `${SITE}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Xem ngày cưới đẹp', 'item': PAGE_URL },
        ],
    },
];
const ldHTML = `<!-- XN-LD:START — sinh tự động: node scripts/build-xem-ngay.js -->
${ld.map(o => `    <script type="application/ld+json">\n${JSON.stringify(o, null, 4)}\n    </script>`).join('\n')}
    <!-- XN-LD:END -->`;

const fp = path.join(ROOT, PAGE_FILE);
let html = fs.readFileSync(fp, 'utf8');
const rxStatic = /<!-- XN-STATIC:START[\s\S]*?<!-- XN-STATIC:END -->/;
const rxLd = /<!-- XN-LD:START[\s\S]*?<!-- XN-LD:END -->/;
if (!rxStatic.test(html) || !rxLd.test(html)) {
    console.error(`✗ ${PAGE_FILE}: thiếu marker XN-STATIC hoặc XN-LD`);
    process.exit(1);
}
html = html.replace(rxStatic, () => staticHTML).replace(rxLd, () => ldHTML);
fs.writeFileSync(fp, html);
console.log(`✓ ${PAGE_FILE}: ${thangList.length} tháng (${thangList[0][1]}/${thangList[0][0]} → ${NAM_CUOI}/12), bảng tuổi ${namAmDau} & ${namAmDau + 1}, dateModified ${TODAY_ISO}`);
