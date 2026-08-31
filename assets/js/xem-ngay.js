/* ============================================================
 * XEM-NGAY.JS — Giao diện công cụ xem ngày cưới
 * Cần lunar.js + wedding-date.js nạp trước.
 * ============================================================ */

(function () {
    'use strict';

    var form = document.getElementById('xnForm');
    if (!form) return;

    var G = { d: id('xnGroomD'), m: id('xnGroomM'), y: id('xnGroomY') };
    var B = { d: id('xnBrideD'), m: id('xnBrideM'), y: id('xnBrideY') };
    var F = { m: id('xnFromM'),  y: id('xnFromY') };
    var T = { m: id('xnToM'),    y: id('xnToY') };

    var elWeekend = id('xnWeekend');
    var elError   = id('xnError');
    var elResult  = id('xnResult');
    var elAges    = id('xnAges');
    var elDays    = id('xnDays');
    var elNote    = id('xnDaysNote');
    var elBest    = id('xnBest');

    function id(x) { return document.getElementById(x); }

    var THU = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

    /* ---------- dựng các ô chọn ---------- */
    function nap(sel, tu, den, nhan, chon) {
        var h = '';
        for (var v = tu; v <= den; v++) {
            h += '<option value="' + v + '"' + (v === chon ? ' selected' : '') + '>' + nhan(v) + '</option>';
        }
        sel.innerHTML = h;
    }
    var soNgay = function (m, y) { return new Date(y, m, 0).getDate(); };

    // Ngày trong tháng đổi theo tháng/năm đang chọn — tránh chọn được 31/2
    function dongBoNgay(o) {
        var m = +o.m.value, y = +o.y.value, max = soNgay(m, y), giu = +o.d.value;
        nap(o.d, 1, max, function (v) { return v; }, Math.min(giu || 1, max));
    }

    (function dungForm() {
        var now = new Date();
        var namNay = now.getFullYear();
        var thangNhan = function (v) { return 'Tháng ' + v; };

        [G, B].forEach(function (o, i) {
            nap(o.m, 1, 12, thangNhan, i === 0 ? 5 : 11);
            nap(o.y, namNay - 60, namNay - 18, function (v) { return v; }, i === 0 ? 1996 : 1998);
            dongBoNgay(o);
            o.m.addEventListener('change', function () { dongBoNgay(o); });
            o.y.addEventListener('change', function () { dongBoNgay(o); });
        });

        var tu  = new Date(namNay, now.getMonth() + 6, 1);
        var den = new Date(namNay, now.getMonth() + 18, 1);
        nap(F.m, 1, 12, thangNhan, tu.getMonth() + 1);
        nap(F.y, namNay, namNay + 6, function (v) { return v; }, tu.getFullYear());
        nap(T.m, 1, 12, thangNhan, den.getMonth() + 1);
        nap(T.y, namNay, namNay + 6, function (v) { return v; }, den.getFullYear());
    })();

    function loi(msg) {
        elError.textContent = msg;
        elError.hidden = false;
        elError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    /* ---------- diễn giải thành câu, thay cho gạch đầu dòng ---------- */
    function cauTom(d) {
        var v = [];
        if (d.than.hoangDao) v.push('Đây là ngày hoàng đạo, ứng với sao ' + d.than.ten);
        else                 v.push('Ngày này thuộc hắc đạo, ứng với sao ' + d.than.ten);
        if (d.truc.diem > 0)      v.push('trực ' + d.truc.ten + ' vốn được xem là hợp cho việc cưới hỏi');
        else if (d.truc.diem < 0) v.push('trực ' + d.truc.ten + ' thì người xưa thường kiêng khi dựng vợ gả chồng');
        else                      v.push('trực ' + d.truc.ten + ' ở mức bình thường');
        var cau = v.join(', ') + '.';
        if (d.thu === 0 || d.thu === 6) {
            cau += ' Lại rơi vào ' + (d.thu === 6 ? 'thứ Bảy' : 'Chủ Nhật') + ' nên khách khứa dễ thu xếp đến chung vui.';
        }
        return cau;
    }

    function cauKieng(d) {
        var k = [];
        if (d.tamNuong)    k.push('ngày Tam Nương');
        if (d.nguyetKy)    k.push('ngày Nguyệt Kỵ');
        if (d.duongCongKy) k.push('Dương Công Kỵ Nhật');
        if (!k.length) return '';
        return 'Có một điều cần cân nhắc: ngày này trùng ' + k.join(' và ') + '.';
    }

    /* ---------- khối tuổi ---------- */
    function veTuoi(nguoi, nhan) {
        var canhBao = [], tot = [];
        if (nguoi.kimLau.pham) canhBao.push('Năm nay phạm ' + nguoi.kimLau.ten + ', theo quan niệm xưa là ' + nguoi.kimLau.giaiThich);
        else                   tot.push('Không phạm kim lâu trong năm này');
        if (nguoi.hoangOc.tot) tot.push('Hoang ốc vào cung ' + nguoi.hoangOc.ten + ' — ' + nguoi.hoangOc.giaiThich);
        else                   canhBao.push('Hoang ốc rơi vào cung ' + nguoi.hoangOc.ten + ' — ' + nguoi.hoangOc.giaiThich);
        if (nguoi.tamTai.pham) canhBao.push('Năm nay nằm trong ba năm tam tai của nhóm ' + nguoi.tamTai.nhom);
        else                   tot.push('Không vướng tam tai');

        return '<article class="xn-age">'
            + '<h3>' + nhan + '</h3>'
            + '<p class="xn-age-meta">Sinh năm ' + nguoi.namSinh + ' · ' + nguoi.canChi
            + ' · tuổi mụ <strong>' + nguoi.kimLau.tuoiMu + '</strong></p>'
            + '<ul class="xn-age-list">'
            + tot.map(function (t) { return '<li class="ok">' + t + '</li>'; }).join('')
            + canhBao.map(function (t) { return '<li class="warn">' + t + '</li>'; }).join('')
            + '</ul></article>';
    }

    /* ---------- thẻ ngày đẹp nhất ---------- */
    function veNgayDepNhat(d) {
        var goc = './assets/images/xem-ngay/goc-hoa.webp';
        var kieng = cauKieng(d);
        return '<div class="xn-best">'
            + '<img class="xn-best-goc tl" src="' + goc + '" alt="" loading="lazy">'
            + '<img class="xn-best-goc br" src="' + goc + '" alt="" loading="lazy">'
            + '<div class="xn-best-in">'
            +   '<p class="xn-best-cap">Ngày đẹp nhất cho hai bạn</p>'
            +   '<p class="xn-best-thu">' + THU[d.thu] + '</p>'
            +   '<p class="xn-best-date">' + d.duong.ngay + '.' + d.duong.thang + '.' + d.duong.nam + '</p>'
            +   '<p class="xn-best-am">Nhằm ngày ' + d.am.ngay + ' tháng ' + d.am.thang
            +     (d.am.nhuan ? ' nhuận' : '') + ' năm ' + d.canChiNam + '</p>'
            +   '<div class="xn-best-rule"></div>'
            +   '<p class="xn-best-cc">' + d.canChiNgay + ' · sao ' + d.than.ten + ' · trực ' + d.truc.ten + '</p>'
            +   '<p class="xn-best-say">' + cauTom(d) + (kieng ? ' ' + kieng : '') + '</p>'
            + '</div></div>';
    }

    /* ---------- thẻ ngày thường ---------- */
    function veNgay(d) {
        var kieng = cauKieng(d);
        return '<article class="xn-day">'
            + '<div class="xn-day-head">'
            +   '<span class="xn-day-date">' + d.duong.ngay + '<small>.' + d.duong.thang + '.' + d.duong.nam + '</small></span>'
            +   '<span class="xn-day-thu">' + THU[d.thu] + '</span>'
            + '</div>'
            + '<p class="xn-day-am">Nhằm ngày ' + d.am.ngay + ' tháng ' + d.am.thang + (d.am.nhuan ? ' nhuận' : '') + '</p>'
            + '<p class="xn-day-cc">' + d.canChiNgay + ' · ' + d.than.ten + ' · trực ' + d.truc.ten + '</p>'
            + '<p class="xn-day-say">' + cauTom(d) + '</p>'
            + (kieng ? '<p class="xn-day-warn">' + kieng + '</p>' : '')
            + '</article>';
    }

    /* ---------- submit ---------- */
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        elError.hidden = true;

        var g = [+G.y.value, +G.m.value, +G.d.value];
        var b = [+B.y.value, +B.m.value, +B.d.value];
        var f = [+F.y.value, +F.m.value];
        var t = [+T.y.value, +T.m.value];

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

        elBest.innerHTML = ngay.length ? veNgayDepNhat(ngay[0]) : '';

        if (!ngay.length) {
            elDays.innerHTML = '<p class="xn-empty">Không tìm được ngày nào đạt mức gợi ý trong khoảng này.'
                + (elWeekend.checked ? ' Thử bỏ chọn “chỉ hiện thứ Bảy và Chủ Nhật” để xem thêm.' : ' Thử mở rộng khoảng thời gian.')
                + '</p>';
            elNote.textContent = '';
        } else {
            var hien = ngay.slice(1, 25);
            elDays.innerHTML = hien.map(veNgay).join('');
            elNote.textContent = hien.length
                ? 'Ngoài ngày trên, còn ' + (ngay.length - 1) + ' ngày khác cũng hợp'
                  + (elWeekend.checked ? ' và rơi vào cuối tuần' : '') + '. Đang hiện ' + hien.length + ' ngày tiếp theo.'
                : 'Trong khoảng này chỉ có duy nhất một ngày hợp như trên.';
        }

        var tieuDe = document.getElementById('xnDaysTitle');
        if (tieuDe) tieuDe.style.display = ngay.length > 1 ? '' : 'none';

        elResult.hidden = false;
        elResult.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (typeof gtag === 'function') {
            gtag('event', 'xem_ngay_cuoi', { so_ngay_tim_duoc: ngay.length, chi_cuoi_tuan: elWeekend.checked });
        }
    });
})();
