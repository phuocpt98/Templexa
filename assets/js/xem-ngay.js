/* ============================================================
 * XEM-NGAY.JS — Giao diện công cụ xem ngày cưới
 * Cần lunar.js + wedding-date.js nạp trước.
 * ============================================================ */

(function () {
    'use strict';

    var form = document.getElementById('xnForm');
    if (!form) return;

    var elGroom   = document.getElementById('xnGroom');
    var elBride   = document.getElementById('xnBride');
    var elFrom    = document.getElementById('xnFrom');
    var elTo      = document.getElementById('xnTo');
    var elWeekend = document.getElementById('xnWeekend');
    var elError   = document.getElementById('xnError');
    var elResult  = document.getElementById('xnResult');
    var elAges    = document.getElementById('xnAges');
    var elDays    = document.getElementById('xnDays');
    var elNote    = document.getElementById('xnDaysNote');

    var THU = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

    /* ---------- giá trị mặc định: 6 tháng tới, kéo dài 1 năm ---------- */
    (function setDefaults() {
        var now = new Date();
        var from = new Date(now.getFullYear(), now.getMonth() + 6, 1);
        var to   = new Date(now.getFullYear(), now.getMonth() + 18, 1);
        var mm = function (d) {
            return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
        };
        elFrom.value = mm(from);
        elTo.value = mm(to);
        elFrom.min = mm(now);
    })();

    function loi(msg) {
        elError.textContent = msg;
        elError.hidden = false;
        elError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    /* ---------- render khối tuổi ---------- */
    function veTuoi(nguoi, nhan) {
        var canhBao = [];
        if (nguoi.kimLau.pham)   canhBao.push('Phạm ' + nguoi.kimLau.ten + ' — ' + nguoi.kimLau.giaiThich);
        if (!nguoi.hoangOc.tot)  canhBao.push('Hoang ốc cung ' + nguoi.hoangOc.ten + ' — ' + nguoi.hoangOc.giaiThich);
        if (nguoi.tamTai.pham)   canhBao.push('Năm tam tai (nhóm ' + nguoi.tamTai.nhom + ')');

        var tot = [];
        if (!nguoi.kimLau.pham)  tot.push('Không phạm kim lâu');
        if (nguoi.hoangOc.tot)   tot.push('Hoang ốc cung ' + nguoi.hoangOc.ten + ' — ' + nguoi.hoangOc.giaiThich);
        if (!nguoi.tamTai.pham)  tot.push('Không phạm tam tai');

        return '<article class="xn-age' + (canhBao.length ? ' has-warn' : '') + '">'
            + '<h3>' + nhan + '</h3>'
            + '<p class="xn-age-meta">Sinh năm ' + nguoi.namSinh + ' · ' + nguoi.canChi
            + ' · tuổi mụ <strong>' + nguoi.kimLau.tuoiMu + '</strong></p>'
            + '<ul class="xn-age-list">'
            + tot.map(function (t) { return '<li class="ok">' + t + '</li>'; }).join('')
            + canhBao.map(function (t) { return '<li class="warn">' + t + '</li>'; }).join('')
            + '</ul></article>';
    }

    /* ---------- render một ngày ---------- */
    function veNgay(d) {
        var mucDo = d.diem >= 80 ? 'rat-tot' : (d.diem >= 68 ? 'tot' : 'kha');
        var am = 'âm ' + d.am.ngay + '/' + d.am.thang + (d.am.nhuan ? ' nhuận' : '');
        return '<article class="xn-day ' + mucDo + '">'
            + '<div class="xn-day-head">'
            +   '<div class="xn-day-date">'
            +     '<span class="xn-day-num">' + d.duong.ngay + '</span>'
            +     '<span class="xn-day-mon">tháng ' + d.duong.thang + '<br>' + d.duong.nam + '</span>'
            +   '</div>'
            +   '<div class="xn-day-top">'
            +     '<span class="xn-day-thu">' + THU[d.thu] + '</span>'
            +     '<span class="xn-day-am">' + am + '</span>'
            +   '</div>'
            +   '<span class="xn-day-score">' + d.diem + '</span>'
            + '</div>'
            + '<p class="xn-day-cc">' + d.canChiNgay + ' · ' + d.than.ten + ' · trực ' + d.truc.ten + '</p>'
            + '<ul class="xn-day-why">'
            + d.lyDo.map(function (r) {
                  return '<li class="' + (r.tot ? 'ok' : 'warn') + '">' + r.t + '</li>';
              }).join('')
            + '</ul></article>';
    }

    /* ---------- submit ---------- */
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        elError.hidden = true;

        if (!elGroom.value || !elBride.value) return loi('Vui lòng nhập ngày sinh của cả hai bạn.');
        if (!elFrom.value || !elTo.value)     return loi('Vui lòng chọn khoảng thời gian dự định cưới.');

        var g = elGroom.value.split('-').map(Number);
        var b = elBride.value.split('-').map(Number);
        var f = elFrom.value.split('-').map(Number);
        var t = elTo.value.split('-').map(Number);

        var tuDate  = new Date(f[0], f[1] - 1, 1);
        var denDate = new Date(t[0], t[1], 0);            // ngày cuối của tháng "đến"
        if (denDate < tuDate) return loi('Tháng kết thúc phải sau tháng bắt đầu.');
        var soThang = (t[0] - f[0]) * 12 + (t[1] - f[1]) + 1;
        if (soThang > 24)     return loi('Khoảng thời gian tối đa là 24 tháng. Vui lòng thu hẹp lại.');

        // năm âm lịch của ngày sinh (không phải năm dương) — kim lâu/tam tai tính theo năm âm
        var namSinhNam = Lunar.solar2lunar(g[2], g[1], g[0]).year;
        var namSinhNu  = Lunar.solar2lunar(b[2], b[1], b[0]).year;
        // năm âm của giữa khoảng dự định, dùng để xét tuổi
        var giua = new Date((tuDate.getTime() + denDate.getTime()) / 2);
        var namCuoiAm = Lunar.solar2lunar(giua.getDate(), giua.getMonth() + 1, giua.getFullYear()).year;

        var tuoi = WeddingDate.xemTuoi(namSinhNam, namSinhNu, namCuoiAm);
        elAges.innerHTML =
            '<p class="xn-ages-year">Xét theo năm âm lịch <strong>' + tuoi.canChiNamCuoi + '</strong> (' + namCuoiAm + ')</p>'
            + '<div class="xn-ages-grid">'
            + veTuoi(tuoi.chuRe, 'Chú rể') + veTuoi(tuoi.coDau, 'Cô dâu')
            + '</div>';

        var ngay = WeddingDate.timNgayDep(tuDate, denDate, { minDiem: 62 });
        if (elWeekend.checked) {
            ngay = ngay.filter(function (d) { return d.thu === 0 || d.thu === 6; });
        }

        if (!ngay.length) {
            elDays.innerHTML = '<p class="xn-empty">Không tìm được ngày nào đạt mức gợi ý trong khoảng này.'
                + (elWeekend.checked ? ' Thử bỏ chọn “chỉ hiện thứ Bảy và Chủ Nhật” để xem thêm.' : ' Thử mở rộng khoảng thời gian.')
                + '</p>';
            elNote.textContent = '';
        } else {
            var hien = ngay.slice(0, 24);
            elDays.innerHTML = hien.map(veNgay).join('');
            elNote.textContent = 'Tìm được ' + ngay.length + ' ngày phù hợp'
                + (elWeekend.checked ? ' rơi vào cuối tuần' : '')
                + '. Đang hiện ' + hien.length + ' ngày điểm cao nhất, xếp theo điểm rồi tới thời gian.';
        }

        elResult.hidden = false;
        elResult.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (typeof gtag === 'function') {
            gtag('event', 'xem_ngay_cuoi', { so_ngay_tim_duoc: ngay.length, chi_cuoi_tuan: elWeekend.checked });
        }
    });
})();
