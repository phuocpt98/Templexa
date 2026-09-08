#!/usr/bin/env node
/**
 * gen-tuoi-hop.js — Sinh bài "Nam/Nữ sinh năm YYYY hợp tuổi nào" cho Cẩm nang (blogs/).
 *
 *   node scripts/gen-tuoi-hop.js <năm sinh> <nam|nu> [--from -8] [--to 8] [--date YYYY-MM-DD]
 *   node scripts/gen-tuoi-hop.js 1998 nam
 *   node scripts/gen-tuoi-hop.js 1998 nu
 *
 * Tính 4 tiêu chí xem tuổi vợ chồng phổ biến ở Việt Nam cho từng năm sinh đối phương
 * (mặc định ±8 năm): mệnh nạp âm (ngũ hành), thiên can, địa chi, cung phi (bát trạch)
 * → chấm điểm, xếp hạng, viết thành bài HTML theo khung của gen-blog.
 * Năm cưới đẹp: dùng lại đúng engine assets/js/wedding-date.js (kim lâu, hoang ốc, tam tai)
 * để khớp với công cụ xem ngày cưới.
 *
 * Ảnh: dùng bộ chung blogs/images/tuoi-hop/ (nam-YYYY.webp / nu-YYYY.webp làm cover nếu có,
 * không thì fallback nam.webp / nu.webp; ngu-hanh.webp, bat-trach.webp trong bài).
 * Sau khi sinh: npm run build:blog && npm run build:sitemap, rồi node scripts/verify-blog.js <slug>.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const Lunar = require(path.join(ROOT, 'assets/js/lunar.js'));
const WeddingDate = new Function('Lunar', fs.readFileSync(path.join(ROOT, 'assets/js/wedding-date.js'), 'utf8') + '\n;return WeddingDate;')(Lunar);

const args = process.argv.slice(2);
const YEAR = parseInt(args[0], 10);
const SEX = (args[1] || '').toLowerCase();
const flag = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : d; };
const FROM = parseInt(flag('from', '-8'), 10), TO = parseInt(flag('to', '8'), 10);
const DATE = flag('date', new Date().toISOString().slice(0, 10));
if (!YEAR || !['nam', 'nu'].includes(SEX)) { console.error('Dùng: node scripts/gen-tuoi-hop.js <năm> <nam|nu>'); process.exit(1); }

// ---------- dữ liệu ----------
const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
const GIAP = ['Chuột', 'Trâu', 'Hổ', 'Mèo', 'Rồng', 'Rắn', 'Ngựa', 'Dê', 'Khỉ', 'Gà', 'Chó', 'Lợn'];
const NAP_AM = ['Hải Trung Kim', 'Lư Trung Hoả', 'Đại Lâm Mộc', 'Lộ Bàng Thổ', 'Kiếm Phong Kim', 'Sơn Đầu Hoả', 'Giản Hạ Thuỷ', 'Thành Đầu Thổ', 'Bạch Lạp Kim', 'Dương Liễu Mộc',
    'Tuyền Trung Thuỷ', 'Ốc Thượng Thổ', 'Tích Lịch Hoả', 'Tùng Bách Mộc', 'Trường Lưu Thuỷ', 'Sa Trung Kim', 'Sơn Hạ Hoả', 'Bình Địa Mộc', 'Bích Thượng Thổ', 'Kim Bạch Kim',
    'Phú Đăng Hoả', 'Thiên Hà Thuỷ', 'Đại Trạch Thổ', 'Thoa Xuyến Kim', 'Tang Đố Mộc', 'Đại Khê Thuỷ', 'Sa Trung Thổ', 'Thiên Thượng Hoả', 'Thạch Lựu Mộc', 'Đại Hải Thuỷ'];
const HANH = ['Kim', 'Thuỷ', 'Hoả', 'Thổ', 'Mộc'];
const SINH = { Kim: 'Thuỷ', Thuỷ: 'Mộc', Mộc: 'Hoả', Hoả: 'Thổ', Thổ: 'Kim' };   // a sinh b
const KHAC = { Kim: 'Mộc', Mộc: 'Thổ', Thổ: 'Thuỷ', Thuỷ: 'Hoả', Hoả: 'Kim' };   // a khắc b
const CUNG = { 1: 'Khảm', 2: 'Khôn', 3: 'Chấn', 4: 'Tốn', 6: 'Càn', 7: 'Đoài', 8: 'Cấn', 9: 'Ly' };
const CUNG_HANH = { Khảm: 'Thuỷ', Khôn: 'Thổ', Chấn: 'Mộc', Tốn: 'Mộc', Càn: 'Kim', Đoài: 'Kim', Cấn: 'Thổ', Ly: 'Hoả' };
// Bát trạch: [cung A][cung B] → du niên
const BAT_TRACH = {
    Càn:  { Càn: 'Phục Vị', Đoài: 'Sinh Khí', Cấn: 'Thiên Y', Khôn: 'Diên Niên', Khảm: 'Lục Sát', Ly: 'Tuyệt Mệnh', Chấn: 'Ngũ Quỷ', Tốn: 'Hoạ Hại' },
    Khôn: { Khôn: 'Phục Vị', Cấn: 'Sinh Khí', Đoài: 'Thiên Y', Càn: 'Diên Niên', Khảm: 'Tuyệt Mệnh', Ly: 'Lục Sát', Chấn: 'Hoạ Hại', Tốn: 'Ngũ Quỷ' },
    Cấn:  { Cấn: 'Phục Vị', Khôn: 'Sinh Khí', Càn: 'Thiên Y', Đoài: 'Diên Niên', Khảm: 'Ngũ Quỷ', Ly: 'Hoạ Hại', Chấn: 'Lục Sát', Tốn: 'Tuyệt Mệnh' },
    Đoài: { Đoài: 'Phục Vị', Càn: 'Sinh Khí', Khôn: 'Thiên Y', Cấn: 'Diên Niên', Khảm: 'Hoạ Hại', Ly: 'Ngũ Quỷ', Chấn: 'Tuyệt Mệnh', Tốn: 'Lục Sát' },
    Khảm: { Khảm: 'Phục Vị', Tốn: 'Sinh Khí', Chấn: 'Thiên Y', Ly: 'Diên Niên', Càn: 'Lục Sát', Khôn: 'Tuyệt Mệnh', Cấn: 'Ngũ Quỷ', Đoài: 'Hoạ Hại' },
    Ly:   { Ly: 'Phục Vị', Chấn: 'Sinh Khí', Tốn: 'Thiên Y', Khảm: 'Diên Niên', Càn: 'Tuyệt Mệnh', Khôn: 'Lục Sát', Cấn: 'Hoạ Hại', Đoài: 'Ngũ Quỷ' },
    Chấn: { Chấn: 'Phục Vị', Ly: 'Sinh Khí', Khảm: 'Thiên Y', Tốn: 'Diên Niên', Càn: 'Ngũ Quỷ', Khôn: 'Hoạ Hại', Cấn: 'Lục Sát', Đoài: 'Tuyệt Mệnh' },
    Tốn:  { Tốn: 'Phục Vị', Khảm: 'Sinh Khí', Ly: 'Thiên Y', Chấn: 'Diên Niên', Càn: 'Hoạ Hại', Khôn: 'Ngũ Quỷ', Cấn: 'Tuyệt Mệnh', Đoài: 'Lục Sát' },
};
const DU_NIEN = { 'Sinh Khí': [2, 'tốt'], 'Thiên Y': [2, 'tốt'], 'Diên Niên': [2, 'tốt'], 'Phục Vị': [1, 'tốt'], 'Hoạ Hại': [-1, 'xấu'], 'Lục Sát': [-1, 'xấu'], 'Ngũ Quỷ': [-2, 'xấu'], 'Tuyệt Mệnh': [-2, 'xấu'] };
const CAN_HOP = { Giáp: 'Kỷ', Ất: 'Canh', Bính: 'Tân', Đinh: 'Nhâm', Mậu: 'Quý' };
const CAN_XUNG = { Giáp: 'Canh', Ất: 'Tân', Bính: 'Nhâm', Đinh: 'Quý' };
const TAM_HOP = [[8, 0, 4], [2, 6, 10], [5, 9, 1], [11, 3, 7]];
const LUC_HOP = { 0: 1, 2: 11, 3: 10, 4: 9, 5: 8, 6: 7 };
const TU_XUNG = [[0, 3, 6, 9], [1, 4, 7, 10], [2, 5, 8, 11]];
const LUC_HAI = { 0: 7, 1: 6, 2: 5, 3: 4, 8: 11, 9: 10 };
const TUONG_HINH = [[2, 5, 8], [1, 7, 10], [0, 3]];
const CHI_DESC = {
    0: 'nhanh nhẹn, khéo xoay xở, quý gia đình', 1: 'chắc chắn, chịu khó, ít nói nhưng đáng tin', 2: 'quyết đoán, mạnh mẽ, thích dẫn dắt', 3: 'nhẹ nhàng, tinh tế, giỏi giữ hoà khí',
    4: 'rộng rãi, có chí lớn, đôi khi hơi nóng', 5: 'sâu sắc, kín đáo, nhìn xa', 6: 'phóng khoáng, thẳng thắn, ưa tự do', 7: 'dịu dàng, giàu tình cảm, hay lo xa',
    8: 'thông minh, hoạt bát, hài hước', 9: 'chỉn chu, thẳng tính, làm việc có kế hoạch', 10: 'trung thành, thật thà, coi trọng lời hứa', 11: 'hiền hậu, bao dung, biết hưởng thụ',
};
const HANH_DESC = { Kim: 'cứng cỏi, quyết đoán, coi trọng nguyên tắc', Thuỷ: 'linh hoạt, khéo giao tiếp, giàu trực giác', Mộc: 'hướng thiện, ham học hỏi, thích phát triển', Hoả: 'nhiệt tình, sôi nổi, sống bằng cảm xúc', Thổ: 'điềm đạm, thực tế, là chỗ dựa của mọi người' };

// ---------- hàm ----------
const idx60 = (y) => ((y - 1984) % 60 + 60) % 60;
const canOf = (y) => CAN[idx60(y) % 10];
const chiIdx = (y) => idx60(y) % 12;
const napAm = (y) => NAP_AM[Math.floor(idx60(y) / 2)];
const hanhOf = (y) => napAm(y).split(' ').pop();
const cungPhi = (y, sex) => {
    let r = String(y).split('').reduce((a, b) => a + +b, 0); while (r > 9) r = String(r).split('').reduce((a, b) => a + +b, 0);
    let c = y < 2000 ? (sex === 'nam' ? 10 - r : r + 5) : (sex === 'nam' ? 9 - r : r + 6);
    while (c > 9) c -= 9; if (c === 0) c = 9;
    if (c === 5) c = sex === 'nam' ? 2 : 8;
    return CUNG[c];
};
const menhRel = (a, b) => { // a = người xem, b = đối phương
    if (a === b) return { d: 1, t: 'bình hoà', s: `cùng mệnh ${a}, dễ hiểu nhau` };
    if (SINH[b] === a) return { d: 2, t: 'tương sinh', s: `${b} sinh ${a} — đối phương nâng đỡ bạn` };
    if (SINH[a] === b) return { d: 1, t: 'tương sinh', s: `${a} sinh ${b} — bạn là người nâng đỡ` };
    if (KHAC[b] === a) return { d: -2, t: 'tương khắc', s: `${b} khắc ${a}` };
    return { d: -1, t: 'tương khắc', s: `${a} khắc ${b}` };
};
const canRel = (a, b) => (CAN_HOP[a] === b || CAN_HOP[b] === a) ? { d: 1, t: 'tương hợp', s: `${a} hợp ${b}` }
    : (CAN_XUNG[a] === b || CAN_XUNG[b] === a) ? { d: -1, t: 'tương xung', s: `${a} xung ${b}` } : { d: 0, t: 'bình hoà', s: 'không hợp không xung' };
const chiRel = (a, b) => {
    const A = CHI[a], B = CHI[b], out = [];
    if (a === b) out.push([0, 'cùng tuổi']);
    if (TAM_HOP.some(g => g.includes(a) && g.includes(b)) && a !== b) out.push([2, `tam hợp ${A}–${B}`]);
    if (LUC_HOP[a] === b || LUC_HOP[b] === a) out.push([2, `lục hợp ${A}–${B}`]);
    if (TU_XUNG.some(g => g.includes(a) && g.includes(b)) && a !== b) out.push([-2, `tứ hành xung ${A}–${B}`]);
    if (LUC_HAI[a] === b || LUC_HAI[b] === a) out.push([-1, `lục hại ${A}–${B}`]);
    if (TUONG_HINH.some(g => g.includes(a) && g.includes(b)) && a !== b) out.push([-1, `tương hình ${A}–${B}`]);
    if (!out.length) out.push([0, 'bình hoà']);
    const d = out.reduce((s, x) => s + x[0], 0);
    return { d, t: d > 0 ? 'hợp' : d < 0 ? 'xung' : 'bình hoà', s: out.map(x => x[1]).join(', ') };
};
const cungRel = (a, b) => { const du = BAT_TRACH[a][b]; return { d: DU_NIEN[du][0], t: DU_NIEN[du][1], s: `${a} + ${b} = ${du}` , du }; };
const label = (score) => score >= 5 ? ['Rất hợp', 'rat-hop'] : score >= 3 ? ['Hợp', 'hop'] : score >= 0 ? ['Bình thường', 'binh-thuong'] : ['Nên cân nhắc', 'can-nhac'];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmtDate = (iso) => iso.split('-').reverse().join('/');

// ---------- người xem ----------
const other = SEX === 'nam' ? 'nu' : 'nam';
const me = { y: YEAR, can: canOf(YEAR), chi: chiIdx(YEAR), napAm: napAm(YEAR), hanh: hanhOf(YEAR), cung: cungPhi(YEAR, SEX) };
me.canChi = `${me.can} ${CHI[me.chi]}`;
const SUBJ = SEX === 'nam' ? 'Nam' : 'Nữ', subj = SEX === 'nam' ? 'nam' : 'nữ', PARTNER = SEX === 'nam' ? 'vợ' : 'chồng', partnerSex = SEX === 'nam' ? 'nữ' : 'nam';
const verb = SEX === 'nam' ? 'lấy vợ' : 'lấy chồng';

// ---------- bảng đối phương ----------
const rows = [];
for (let y = YEAR + FROM; y <= YEAR + TO; y++) {
    const p = { y, can: canOf(y), chi: chiIdx(y), napAm: napAm(y), hanh: hanhOf(y), cung: cungPhi(y, other) };
    p.canChi = `${p.can} ${CHI[p.chi]}`;
    p.menh = menhRel(me.hanh, p.hanh); p.tcan = canRel(me.can, p.can); p.dchi = chiRel(me.chi, p.chi); p.cphi = cungRel(me.cung, p.cung);
    p.score = p.menh.d + p.tcan.d + p.dchi.d + p.cphi.d;
    [p.label, p.cls] = label(p.score);
    rows.push(p);
}
const sorted = [...rows].sort((a, b) => b.score - a.score || Math.abs(a.y - YEAR) - Math.abs(b.y - YEAR));
const best = sorted.filter(p => p.score >= 3).slice(0, 4);
const worst = sorted.filter(p => p.score < 0).slice(-4).reverse();
const mark = (d) => d > 0 ? '✓' : d < 0 ? '✗' : '–';

// ---------- năm cưới đẹp ----------
const thisYear = new Date().getFullYear();
const years = [];
for (let y = thisYear; y <= thisYear + 4; y++) {
    const kl = WeddingDate.kimLau(YEAR, y), ho = WeddingDate.hoangOc(YEAR, y), tt = WeddingDate.tamTai(YEAR, y);
    const bad = (kl.pham ? 1 : 0) + (ho.tot ? 0 : 1) + (tt.pham ? 1 : 0);
    years.push({ y, canChi: Lunar.canChiNam(y), tuoiMu: kl.tuoiMu, kl, ho, tt, bad, verdict: bad === 0 ? 'Đẹp' : bad === 1 ? 'Tạm được' : 'Nên tránh' });
}
const goodYears = years.filter(x => x.bad === 0).map(x => x.y);

// ---------- nội dung ----------
const slug = `${SEX}-${YEAR}-${SEX === 'nam' ? 'lay-vo' : 'lay-chong'}-tuoi-nao-hop`;
const title = `${SUBJ} ${YEAR} ${me.canChi} ${verb} tuổi nào hợp nhất? Bảng xem tuổi chi tiết`;
const shortTitle = `${SUBJ} ${YEAR} ${verb} tuổi nào hợp?`;
const bestTxt = best.map(p => `${p.y} (${p.canChi})`).join(', ');
const desc = `${SUBJ} sinh năm ${YEAR} ${me.canChi}, mệnh ${me.hanh}, cung ${me.cung}. Bảng xem tuổi ${PARTNER} từ ${YEAR + FROM}–${YEAR + TO} theo mệnh, thiên can, địa chi, cung phi — hợp nhất với ${best.slice(0, 3).map(p => p.y).join(', ')}; kèm năm cưới đẹp.`;
const coverCandidates = [`blogs/images/tuoi-hop/${SEX}-${YEAR}.webp`, `blogs/images/tuoi-hop/${SEX}.webp`];
const cover = coverCandidates.find(f => fs.existsSync(path.join(ROOT, f))) || coverCandidates[0];
const img = (name) => fs.existsSync(path.join(ROOT, 'blogs/images/tuoi-hop', name + '.webp')) ? `images/tuoi-hop/${name}.webp` : null;

const relTxt = (p) => {
    const parts = [];
    parts.push(`mệnh ${p.hanh} ${p.menh.t} với mệnh ${me.hanh} của bạn (${p.menh.s})`);
    parts.push(`thiên can ${p.tcan.s}`);
    parts.push(`địa chi ${p.dchi.s}`);
    parts.push(`cung phi ${p.cphi.s} — ${p.cphi.t}`);
    return parts.join('; ');
};

const rowHtml = (p) => `<tr class="th-${p.cls}"><td>${p.y}<br><small>${p.canChi}</small></td><td>${p.napAm}<br><small>${mark(p.menh.d)} ${p.menh.t}</small></td><td>${mark(p.tcan.d)} ${p.tcan.t}</td><td>${mark(p.dchi.d)} ${p.dchi.s}</td><td>${p.cung} · ${p.cphi.du}<br><small>${mark(p.cphi.d)} ${p.cphi.t}</small></td><td><strong>${p.label}</strong><br><small>${p.score > 0 ? '+' : ''}${p.score} điểm</small></td></tr>`;
const yearRow = (x) => `<tr><td>${x.y}<br><small>${x.canChi}</small></td><td>${x.tuoiMu}</td><td>${x.kl.pham ? '✗ ' + x.kl.ten : '✓ không phạm'}</td><td>${x.ho.tot ? '✓ ' : '✗ '}${x.ho.ten}</td><td>${x.tt.pham ? '✗ phạm' : '✓ không phạm'}</td><td><strong>${x.verdict}</strong></td></tr>`;

const faq = [
    [`${SUBJ} ${YEAR} mệnh gì, cung gì?`, `${SUBJ} sinh năm ${YEAR} là tuổi ${me.canChi} (con ${GIAP[me.chi]}), mệnh ${me.napAm} (hành ${me.hanh}), cung phi ${me.cung}. Người sinh trước Tết Nguyên đán ${YEAR} tính theo năm âm ${YEAR - 1}.`],
    [`${SUBJ} ${YEAR} ${verb} tuổi nào hợp nhất?`, `Xét đủ 4 tiêu chí mệnh, thiên can, địa chi, cung phi thì hợp nhất là ${partnerSex} sinh năm ${bestTxt}. Đây là các tuổi vừa tam hợp/lục hợp địa chi, vừa được cung phi tốt.`],
    [`Tuổi xung có cưới được không?`, `Được. Xem tuổi là quan niệm tham khảo, không phải luật. Nhiều cặp "tứ hành xung" vẫn hạnh phúc vì hợp nhau ở cách sống. Nếu gia đình băn khoăn, dân gian có cách hoá giải như chọn năm cưới đẹp theo tuổi, chọn ngày giờ hợp cả hai, hoặc nhờ người hợp tuổi đón dâu.`],
    [`${SUBJ} ${YEAR} cưới năm nào đẹp?`, goodYears.length ? `Trong 5 năm tới, ${goodYears.join(', ')} không phạm kim lâu, hoang ốc lẫn tam tai với tuổi ${YEAR}. Các năm còn lại phạm ít nhất một yếu tố — xem bảng chi tiết trong bài.` : `Trong 5 năm tới không có năm nào sạch cả 3 yếu tố với tuổi ${YEAR}; các năm "tạm được" chỉ phạm 1 yếu tố nhẹ — xem bảng trong bài để chọn.`],
];

const head = fs.readFileSync(path.join(ROOT, 'blogs/benching-la-gi.html'), 'utf8');
const HEADER = head.match(/<header class="header">[\s\S]*?<div class="mobile-overlay" id="mobileOverlay"><\/div>/)[0];
const FOOTER = head.match(/<footer class="footer">[\s\S]*?<\/footer>/)[0];
const SITE = 'https://templexa.vn';

const html = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(title)} | Templexa</title>
    <meta name="description" content="${esc(desc)}">
    <meta name="keywords" content="${subj} ${YEAR} ${verb} tuổi nào, ${subj} ${YEAR} hợp tuổi nào, tuổi ${me.canChi} hợp tuổi nào, xem tuổi vợ chồng ${YEAR}, ${YEAR} cưới năm nào đẹp, ${subj} ${me.canChi}">
    <meta name="author" content="Templexa Studio">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
    <meta name="theme-color" content="#6366F1">
    <link rel="canonical" href="${SITE}/blogs/${slug}">

    <meta property="og:type" content="article">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(desc)}">
    <meta property="og:image" content="${SITE}/${cover}">
    <meta property="og:image:width" content="1600">
    <meta property="og:image:height" content="900">
    <meta property="og:url" content="${SITE}/blogs/${slug}">
    <meta property="og:site_name" content="Templexa">
    <meta property="og:locale" content="vi_VN">
    <meta property="article:published_time" content="${DATE}T09:00:00+07:00">
    <meta property="article:modified_time" content="${DATE}T09:00:00+07:00">
    <meta property="article:section" content="phong-tuc-cuoi-hoi">
    <meta property="article:tag" content="xem tuổi vợ chồng">
    <meta property="article:tag" content="tuổi ${YEAR}">
    <meta property="article:tag" content="${me.canChi}">
    <meta property="article:tag" content="hợp tuổi">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(title)}">
    <meta name="twitter:description" content="${esc(desc)}">
    <meta name="twitter:image" content="${SITE}/${cover}">

    <link rel="icon" type="image/svg+xml" href="../assets/images/logo_v2.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/blog.css">

    <script type="application/ld+json">
    ${JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
            { '@type': 'BlogPosting', '@id': `${SITE}/blogs/${slug}#article`, mainEntityOfPage: `${SITE}/blogs/${slug}`, headline: title, description: desc,
              image: { '@type': 'ImageObject', url: `${SITE}/${cover}`, width: 1600, height: 900 }, datePublished: `${DATE}T09:00:00+07:00`, dateModified: `${DATE}T09:00:00+07:00`,
              inLanguage: 'vi-VN', articleSection: 'Phong tục & nghi lễ', keywords: ['xem tuổi vợ chồng', `tuổi ${YEAR}`, me.canChi, 'hợp tuổi'],
              author: { '@type': 'Organization', name: 'Templexa', url: `${SITE}/` },
              publisher: { '@type': 'Organization', name: 'Templexa', url: `${SITE}/`, logo: { '@type': 'ImageObject', url: `${SITE}/assets/images/logo_v2.svg` } } },
            { '@type': 'BreadcrumbList', itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${SITE}/` },
                { '@type': 'ListItem', position: 2, name: 'Blogs', item: `${SITE}/blogs/` },
                { '@type': 'ListItem', position: 3, name: 'Phong tục & nghi lễ', item: `${SITE}/blogs/?category=phong-tuc-cuoi-hoi` },
                { '@type': 'ListItem', position: 4, name: shortTitle } ] },
            { '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
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
    ${HEADER}

    <section class="bp-hero">
        <div class="container container-section">
            <nav class="bl-crumb" aria-label="Breadcrumb">
                <a href="../">Trang chủ</a><span aria-hidden="true">›</span>
                <a href="index.html">Blogs</a><span aria-hidden="true">›</span>
                <a href="index.html?category=phong-tuc-cuoi-hoi">Phong tục &amp; nghi lễ</a>
            </nav>
            <span class="bl-cat">Phong tục &amp; nghi lễ</span>
            <h1>${esc(title)}</h1>
            <p class="bp-lead">${SUBJ} ${YEAR} tuổi ${me.canChi}, con ${GIAP[me.chi]}, mệnh ${me.napAm}. Bài này xem tuổi ${PARTNER} cho bạn theo đủ bốn tiêu chí ông bà hay dùng — mệnh, thiên can, địa chi, cung phi — với từng năm sinh từ ${YEAR + FROM} đến ${YEAR + TO}, rồi chỉ luôn năm nào nên cưới.</p>
            <div class="bl-meta">
                <span class="bp-author-chip"><img src="../assets/images/logo_v2.svg" alt="">Templexa</span>
                <time datetime="${DATE}">${fmtDate(DATE)}</time>
                <span data-readtime>8 phút đọc</span>
            </div>
        </div>
    </section>

    <div class="container container-section">
        <figure class="bp-cover">
            <img src="${cover.replace(/^blogs\//, '')}" alt="${SUBJ === 'Nam' ? 'Chàng trai' : 'Cô gái'} tuổi ${GIAP[me.chi]} đứng cạnh hình con ${GIAP[me.chi].toLowerCase()} cắt giấy, mười hai huy hiệu con giáp xếp thành vòng cung phía trên" width="1600" height="900" fetchpriority="high">
        </figure>

        <div class="bp-layout">
            <article class="bp-body">
                <p>Câu “hai đứa có hợp tuổi không?” thường xuất hiện trong bữa cơm đầu tiên hai nhà gặp nhau. Bạn có thể tin hoặc không tin, nhưng biết trước câu trả lời — và biết <em>vì sao</em> ông bà nói hợp hay không hợp — luôn giúp cuộc nói chuyện đó dễ thở hơn nhiều.</p>
                <p>Bài này làm phần “tra cứu” cho bạn: mỗi năm sinh của đối phương được chấm theo bốn tiêu chí, kết quả gom thành một bảng, rồi phân tích kỹ những tuổi hợp nhất và những tuổi nên cân nhắc. Cuối bài là bảng năm cưới đẹp cho tuổi ${YEAR}, tính bằng cùng engine với <a href="../xem-ngay-cuoi-dep.html">công cụ xem ngày cưới</a> của Templexa.</p>

                <h2>${SUBJ} ${YEAR} là tuổi gì, mệnh gì, cung gì?</h2>
                <p><strong>${SUBJ} sinh năm ${YEAR} là tuổi ${me.canChi}, cầm tinh con ${GIAP[me.chi]}, mệnh ${me.napAm} (hành ${me.hanh}), cung phi ${me.cung} (hành ${CUNG_HANH[me.cung]}).</strong> Nếu bạn sinh trước Tết Nguyên đán năm ${YEAR}, tuổi âm của bạn là ${canOf(YEAR - 1)} ${CHI[chiIdx(YEAR - 1)]} — hãy dùng bài dành cho năm ${YEAR - 1}.</p>
                <div class="bp-tbl-scroll">
                    <table>
                        <tbody>
                            <tr><td>Năm sinh</td><td>${YEAR} (từ Tết ${YEAR} đến trước Tết ${YEAR + 1})</td></tr>
                            <tr><td>Can chi</td><td>${me.canChi} — thiên can ${me.can}, địa chi ${CHI[me.chi]}</td></tr>
                            <tr><td>Con giáp</td><td>${GIAP[me.chi]} — ${CHI_DESC[me.chi]}</td></tr>
                            <tr><td>Mệnh (nạp âm)</td><td>${me.napAm} — hành ${me.hanh}: ${HANH_DESC[me.hanh]}</td></tr>
                            <tr><td>Cung phi (${subj})</td><td>${me.cung} — hành ${CUNG_HANH[me.cung]}</td></tr>
                            <tr><td>Tam hợp</td><td>${TAM_HOP.find(g => g.includes(me.chi)).map(i => CHI[i]).join(' – ')}</td></tr>
                            <tr><td>Tứ hành xung</td><td>${TU_XUNG.find(g => g.includes(me.chi)).map(i => CHI[i]).join(' – ')}</td></tr>
                        </tbody>
                    </table>
                </div>

                <h2>Xem tuổi vợ chồng dựa trên những gì?</h2>
                ${img('ngu-hanh') ? `<figure><img src="${img('ngu-hanh')}" alt="Vòng ngũ hành ghép từ vật thật: cành cây, ngọn nến, nắm đất, nhẫn vàng, bát nước — mũi tên vàng chỉ chiều tương sinh" width="1200" height="800" loading="lazy" decoding="async"><figcaption>Ngũ hành tương sinh: Mộc sinh Hoả, Hoả sinh Thổ, Thổ sinh Kim, Kim sinh Thuỷ, Thuỷ sinh Mộc.</figcaption></figure>` : ''}
                <p>Dân gian Việt Nam xem tuổi vợ chồng bằng bốn phép so, mỗi phép trả lời một câu hỏi khác nhau. Bài này chấm điểm cả bốn rồi cộng lại, nên bạn thấy được <em>tại sao</em> một tuổi được gọi là hợp chứ không chỉ thấy kết luận.</p>
                <ol>
                    <li><strong>Mệnh ngũ hành (nạp âm)</strong> — hai mệnh <em>tương sinh</em> (+2 nếu đối phương sinh cho bạn, +1 nếu bạn sinh cho đối phương), <em>bình hoà</em> cùng mệnh (+1), <em>tương khắc</em> (−1 hoặc −2). Trả lời câu: hai người có “nuôi” được nhau không.</li>
                    <li><strong>Thiên can</strong> — năm cặp tương hợp Giáp–Kỷ, Ất–Canh, Bính–Tân, Đinh–Nhâm, Mậu–Quý (+1); bốn cặp tương xung Giáp–Canh, Ất–Tân, Bính–Nhâm, Đinh–Quý (−1). Trả lời câu: tính cách bề ngoài có “ăn khớp” không.</li>
                    <li><strong>Địa chi (con giáp)</strong> — tam hợp hoặc lục hợp (+2), tứ hành xung (−2), lục hại hoặc tương hình (−1). Đây là phép ông bà nhắc nhiều nhất: “Dần Thân Tỵ Hợi tứ hành xung”.</li>
                    <li><strong>Cung phi (bát trạch)</strong> — ghép cung của hai người ra một trong tám “du niên”: Sinh Khí, Thiên Y, Diên Niên (+2), Phục Vị (+1) là tốt; Hoạ Hại, Lục Sát (−1), Ngũ Quỷ, Tuyệt Mệnh (−2) là xấu. Trả lời câu: về chung nhà có yên ổn không.</li>
                </ol>
                <div class="bp-box bp-box--key">
                    <strong>Cách đọc điểm</strong>
                    <p>Tổng từ −7 đến +7. <strong>≥ 5: rất hợp</strong> · 3–4: hợp · 0–2: bình thường · dưới 0: nên cân nhắc. Cùng một cặp tuổi có thể “hợp” ở tiêu chí này nhưng “xung” ở tiêu chí kia — chuyện rất bình thường, và là lý do đừng chỉ nhìn một phép.</p>
                </div>

                <h2>Bảng xem tuổi ${PARTNER} cho ${subj} ${YEAR} (${YEAR + FROM}–${YEAR + TO})</h2>
                <p>Cột “Kết luận” là tổng điểm bốn tiêu chí. Bảng cuộn ngang được trên điện thoại.</p>
                <div class="bp-tbl-scroll">
                    <table class="th-table">
                        <thead>
                            <tr><th>${partnerSex === 'nữ' ? 'Vợ' : 'Chồng'} sinh năm</th><th>Mệnh</th><th>Thiên can</th><th>Địa chi</th><th>Cung phi</th><th>Kết luận</th></tr>
                        </thead>
                        <tbody>
${rows.map(rowHtml).map(r => '                            ' + r).join('\n')}
                        </tbody>
                    </table>
                </div>
                <p><small>✓ tốt · – bình hoà · ✗ xung/khắc. Cung phi của ${partnerSex} tính theo công thức riêng cho ${partnerSex}, khác với ${subj}.</small></p>

                <h2>${SUBJ} ${YEAR} ${verb} tuổi nào hợp nhất?</h2>
                ${img('bat-trach') ? `<figure><img src="${img('bat-trach')}" alt="La bàn bát quái vẽ nét vàng mảnh trên giấy kem, tám ô tô màu sage và hồng nhạt, hai chiếc nhẫn cưới đặt ở tâm" width="1200" height="800" loading="lazy" decoding="async"><figcaption>Cung phi ghép đôi theo bát trạch — phép so ít người trẻ biết nhưng ông bà rất coi trọng.</figcaption></figure>` : ''}
                ${best.length ? `<p><strong>Hợp nhất với ${subj} ${YEAR} ${me.canChi} là ${partnerSex} sinh năm ${bestTxt}.</strong> Cụ thể:</p>
                <ul class="bp-check">
${best.map(p => `                    <li><strong>${partnerSex === 'nữ' ? 'Nữ' : 'Nam'} ${p.y} ${p.canChi}</strong> (${p.napAm}) — ${p.score > 0 ? '+' : ''}${p.score} điểm: ${relTxt(p)}.</li>`).join('\n')}
                </ul>` : `<p>Trong khoảng ${YEAR + FROM}–${YEAR + TO} không có tuổi nào đạt mức “hợp” trọn vẹn cả bốn tiêu chí với ${subj} ${YEAR}; các tuổi điểm cao nhất là ${sorted.slice(0, 3).map(p => `${p.y} (${p.canChi}, ${p.score > 0 ? '+' : ''}${p.score})`).join(', ')}.</p>`}
                <p>Điểm chung của các tuổi này: được ít nhất hai trong bốn tiêu chí ủng hộ mạnh, đặc biệt là <strong>địa chi</strong> (tam hợp/lục hợp) và <strong>cung phi</strong> — hai phép mà gia đình hay hỏi nhất khi bàn chuyện cưới.</p>

                <div class="bp-cta">
                    <div>
                        <h3>Đã hợp tuổi rồi? Xem luôn ngày cưới đẹp</h3>
                        <p>Nhập ngày sinh hai bạn, công cụ tra kim lâu, hoang ốc, tam tai và lọc ngày hoàng đạo hợp cưới hỏi trong khoảng tháng bạn chọn — miễn phí, theo âm lịch Việt Nam.</p>
                    </div>
                    <a class="bl-btn" href="../xem-ngay-cuoi-dep.html">Xem ngày cưới đẹp</a>
                </div>

                <h2>Những tuổi ${subj} ${YEAR} nên cân nhắc</h2>
                ${worst.length ? `<p>“Cân nhắc” không có nghĩa là “không được cưới”. Nó nghĩa là nếu hai bạn đã yêu nhau, hãy chuẩn bị sẵn câu trả lời cho gia đình — và bảng dưới cho bạn biết họ sẽ hỏi về điểm nào.</p>
                <ul>
${worst.map(p => `                    <li><strong>${partnerSex === 'nữ' ? 'Nữ' : 'Nam'} ${p.y} ${p.canChi}</strong> — ${p.score} điểm: ${relTxt(p)}.</li>`).join('\n')}
                </ul>` : `<p>Trong khoảng ${YEAR + FROM}–${YEAR + TO} không có tuổi nào âm điểm với ${subj} ${YEAR} — một tuổi khá “dễ tính” khi xem đôi.</p>`}
                <div class="bp-box bp-box--tip">
                    <strong>Nếu lỡ yêu người “xung tuổi”</strong>
                    <p>Dân gian có ba cách hoá giải được nhiều gia đình chấp nhận: <strong>chọn năm cưới</strong> không phạm kim lâu, hoang ốc, tam tai với cả hai; <strong>chọn ngày giờ</strong> hợp tuổi cả hai (tránh ngày có địa chi xung với một trong hai người); và <strong>nhờ người hợp tuổi</strong> đi đón dâu, trải giường. Quan trọng nhất vẫn là hai bạn thống nhất trước khi nói chuyện với bố mẹ.</p>
                </div>

                <h2>${SUBJ} ${YEAR} cưới năm nào đẹp?</h2>
                <p>Xem tuổi hợp là xem <em>người</em>; còn chọn <em>năm</em> cưới thì dựa trên tuổi của chính bạn: kim lâu (tuổi mụ chia 9 dư 1, 3, 6, 8), hoang ốc (6 cung theo tuổi mụ) và tam tai (3 năm liền theo nhóm tam hợp). Bảng dưới tính cho tuổi ${YEAR} trong 5 năm tới, cùng công thức với công cụ xem ngày cưới của Templexa:</p>
                <div class="bp-tbl-scroll">
                    <table>
                        <thead><tr><th>Năm cưới</th><th>Tuổi mụ</th><th>Kim lâu</th><th>Hoang ốc</th><th>Tam tai</th><th>Đánh giá</th></tr></thead>
                        <tbody>
${years.map(yearRow).map(r => '                            ' + r).join('\n')}
                        </tbody>
                    </table>
                </div>
                <p>${goodYears.length ? `Với ${subj} ${YEAR}, <strong>${goodYears.join(' và ')}</strong> là năm sạch cả ba yếu tố.` : `Với ${subj} ${YEAR}, không năm nào trong 5 năm tới sạch cả ba yếu tố — hãy ưu tiên năm chỉ phạm một yếu tố nhẹ.`} ${SEX === 'nam' ? 'Lưu ý theo truyền thống, kim lâu xét theo tuổi cô dâu là chính — nên hãy tra thêm cho tuổi của vợ tương lai.' : 'Theo truyền thống, kim lâu xét theo tuổi cô dâu là chính — tức là bảng này quan trọng với bạn hơn với chú rể.'} Nếu năm định cưới phạm, nhiều gia đình chọn cưới vào tháng Chạp năm trước hoặc ra Giêng năm sau, hoặc làm lễ trước rồi đãi tiệc sau.</p>

                <h2>Câu hỏi thường gặp</h2>
                <div class="bp-faq">
${faq.map(([q, a]) => `                    <details><summary>${esc(q)}</summary><div>${esc(a)}</div></details>`).join('\n')}
                </div>

                <h2 data-toc="skip">Lời cuối</h2>
                <p>Bảng tuổi nói cho bạn biết ông bà sẽ gật hay lắc. Nó không nói cho bạn biết hai người có sống được với nhau không — chuyện đó do cách hai bạn cãi nhau và làm lành quyết định. Hãy dùng bài này để chuẩn bị cho cuộc nói chuyện với gia đình, rồi <a href="../xem-ngay-cuoi-dep.html">chọn ngày</a>, <a href="../thiep-cuoi.html">gửi thiệp</a>, và bắt đầu phần thật sự quan trọng.</p>
                <p><em>Nội dung dựa trên quan niệm dân gian (nạp âm, thiên can địa chi, bát trạch), mang tính tham khảo. Cách tính có dị bản giữa các sách; bài này dùng cách phổ biến nhất ở Việt Nam.</em></p>

                <div class="bp-tags">
                    <a href="index.html?category=phong-tuc-cuoi-hoi">#phong tục &amp; nghi lễ</a>
                    <a href="index.html?category=phong-tuc-cuoi-hoi">#xem tuổi vợ chồng</a>
                    <a href="index.html?category=phong-tuc-cuoi-hoi">#tuổi ${YEAR}</a>
                    <a href="index.html?category=phong-tuc-cuoi-hoi">#${me.canChi}</a>
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
                        <p>Đội ngũ làm thiệp cưới online tại Templexa và là người làm <a href="../xem-ngay-cuoi-dep.html">công cụ xem ngày cưới</a> theo âm lịch Việt Nam. Bảng trong bài được tính tự động từ cùng bộ luật với công cụ, và cập nhật khi luật thay đổi.</p>
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
                    <p>Hợp tuổi, chọn ngày xong — tới lúc gửi thiệp. Hơn 50 mẫu có đếm ngược, bản đồ, xác nhận tham dự. Giao trong 24h.</p>
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
console.log(`✓ blogs/${slug}.html — ${me.canChi}, ${me.napAm}, cung ${me.cung}`);
console.log(`  hợp nhất: ${bestTxt || '(không có ≥3 điểm)'}`);
console.log(`  cân nhắc: ${worst.map(p => `${p.y} (${p.score})`).join(', ') || '(không có)'}`);
console.log(`  năm cưới đẹp: ${goodYears.join(', ') || '(không có năm sạch)'}  · cover: ${cover}`);
console.log('  → npm run build:blog && npm run build:sitemap && node scripts/verify-blog.js ' + slug);
