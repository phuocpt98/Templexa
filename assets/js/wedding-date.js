/* ============================================================
 * WEDDING-DATE.JS — Luật xem ngày cưới
 * ------------------------------------------------------------
 * Cần Lunar (assets/js/lunar.js) nạp trước.
 *
 * ⚠ VỀ TRƯỜNG PHÁI: các luật dưới đây có nhiều dị bản giữa các
 * sách và vùng miền. File này chọn cách phổ biến nhất ở Việt Nam
 * và GHI RÕ cách tính ngay tại từng hàm, để sau này đối chiếu
 * hoặc đổi trường phái đều dễ.
 *
 * Kết quả chỉ mang tính THAM KHẢO — không phải phán quyết.
 * ============================================================ */

var WeddingDate = (function (L) {
    'use strict';

    /* ---------- 12 trực nhật thần: hoàng đạo / hắc đạo ---------- */
    // Thứ tự cố định của 12 vị thần. Khởi tại cung nào thì tuỳ tháng âm:
    //   tháng 1,7 → Tý   | tháng 2,8 → Dần  | tháng 3,9  → Thìn
    //   tháng 4,10 → Ngọ | tháng 5,11 → Thân| tháng 6,12 → Tuất
    var THAN12 = [
        { ten: 'Thanh Long',  tot: true  },
        { ten: 'Minh Đường',  tot: true  },
        { ten: 'Thiên Hình',  tot: false },
        { ten: 'Chu Tước',    tot: false },
        { ten: 'Kim Quỹ',     tot: true  },
        { ten: 'Bảo Quang',   tot: true  },   // còn gọi Kim Đường
        { ten: 'Bạch Hổ',     tot: false },
        { ten: 'Ngọc Đường',  tot: true  },
        { ten: 'Thiên Lao',   tot: false },
        { ten: 'Nguyên Vũ',   tot: false },
        { ten: 'Tư Mệnh',     tot: true  },
        { ten: 'Câu Trần',    tot: false }
    ];

    function hoangDao(lunarMonth, dayChi) {
        var khoi = ((lunarMonth - 1) % 6) * 2;          // chi khởi của tháng
        var than = THAN12[(dayChi - khoi + 12) % 12];
        return { ten: than.ten, hoangDao: than.tot };
    }

    /* ---------- 12 Trực ---------- */
    // Trực Kiến rơi vào ngày có chi TRÙNG chi của tháng âm (tháng 1 = Dần).
    var TRUC12 = ['Kiến', 'Trừ', 'Mãn', 'Bình', 'Định', 'Chấp',
                  'Phá', 'Nguy', 'Thành', 'Thu', 'Khai', 'Bế'];
    // Riêng cho CƯỚI HỎI (khác với xây nhà, khai trương):
    var TRUC_CUOI = {
        'Kiến': 0, 'Trừ': 0, 'Mãn': 1, 'Bình': 1, 'Định': 2, 'Chấp': 0,
        'Phá': -2, 'Nguy': -2, 'Thành': 2, 'Thu': 0, 'Khai': 2, 'Bế': -2
    };

    function truc(lunarMonth, dayChi) {
        var chiThang = (lunarMonth + 1) % 12;
        var ten = TRUC12[(dayChi - chiThang + 12) % 12];
        return { ten: ten, diem: TRUC_CUOI[ten] };
    }

    /* ---------- Ngày kỵ theo ngày âm ---------- */
    // Tam Nương: 3, 7, 13, 18, 22, 27 âm
    function tamNuong(lunarDay) {
        return [3, 7, 13, 18, 22, 27].indexOf(lunarDay) >= 0;
    }
    // Nguyệt Kỵ: 5, 14, 23 âm
    function nguyetKy(lunarDay) {
        return [5, 14, 23].indexOf(lunarDay) >= 0;
    }
    // Dương Công Kỵ Nhật: mỗi tháng âm một ngày cố định
    var DUONG_CONG = { 1: 13, 2: 11, 3: 9, 4: 7, 5: 5, 6: 3,
                       7: 8, 8: 25, 9: 23, 10: 21, 11: 19, 12: 17 };
    function duongCongKy(lunarDay, lunarMonth) {
        return DUONG_CONG[lunarMonth] === lunarDay;
    }

    /* ---------- Kim Lâu ---------- */
    // Tính theo TUỔI MỤ (tuổi âm) = năm âm cưới − năm âm sinh + 1.
    // Phạm khi tuổi mụ chia 9 dư 1, 3, 6 hoặc 8.
    // Truyền thống áp cho CÔ DÂU; ở đây tính cho cả hai để người dùng tự cân nhắc.
    var KIM_LAU = {
        1: { ten: 'Kim Lâu Thân',     y: 'hại cho chính bản thân' },
        3: { ten: 'Kim Lâu Thê',      y: 'hại cho vợ/chồng' },
        6: { ten: 'Kim Lâu Tử',       y: 'hại cho con cái' },
        8: { ten: 'Kim Lâu Lục Súc',  y: 'hại cho vật nuôi, tài sản' }
    };
    function kimLau(namSinhAm, namCuoiAm) {
        var tuoiMu = namCuoiAm - namSinhAm + 1;
        var du = tuoiMu % 9;
        var hit = KIM_LAU[du];
        return {
            tuoiMu: tuoiMu, du: du, pham: !!hit,
            ten: hit ? hit.ten : null, giaiThich: hit ? hit.y : null
        };
    }

    /* ---------- Hoang Ốc ---------- */
    // 6 cung, đếm từ 10 tuổi tại cung Nhất Cát:
    //   hàng chục tiến 1 cung mỗi chục, rồi hàng đơn vị tiến tiếp 1 cung mỗi tuổi.
    var HOANG_OC = [
        { ten: 'Nhất Cát',     tot: true,  y: 'tốt mọi bề' },
        { ten: 'Nhì Nghi',     tot: true,  y: 'thuận lợi, hanh thông' },
        { ten: 'Tam Địa Sát',  tot: false, y: 'dễ gặp trắc trở' },
        { ten: 'Tứ Tấn Tài',   tot: true,  y: 'tiền tài hưng vượng' },
        { ten: 'Ngũ Thọ Tử',   tot: false, y: 'không thuận về sức khoẻ' },
        { ten: 'Lục Hoang Ốc', tot: false, y: 'gia đạo dễ bất ổn' }
    ];
    function hoangOc(namSinhAm, namCuoiAm) {
        var tuoiMu = namCuoiAm - namSinhAm + 1;
        var t = tuoiMu < 10 ? 10 : tuoiMu;               // dưới 10 tuổi không xét
        var chuc = Math.floor(t / 10);
        var donVi = t % 10;
        var cung = HOANG_OC[((chuc - 1) + donVi) % 6];
        return { tuoiMu: tuoiMu, ten: cung.ten, tot: cung.tot, giaiThich: cung.y };
    }

    /* ---------- Tam Tai ---------- */
    // Theo nhóm tam hợp của CHI NĂM SINH:
    //   Thân–Tý–Thìn  → tam tai năm Dần, Mão, Thìn
    //   Dần–Ngọ–Tuất  → tam tai năm Thân, Dậu, Tuất
    //   Tỵ–Dậu–Sửu    → tam tai năm Hợi, Tý,  Sửu
    //   Hợi–Mão–Mùi   → tam tai năm Tỵ,  Ngọ, Mùi
    var TAM_TAI = [
        { nhom: [8, 0, 4],  nam: [2, 3, 4],  ten: 'Thân – Tý – Thìn' },
        { nhom: [2, 6, 10], nam: [8, 9, 10], ten: 'Dần – Ngọ – Tuất' },
        { nhom: [5, 9, 1],  nam: [11, 0, 1], ten: 'Tỵ – Dậu – Sửu' },
        { nhom: [11, 3, 7], nam: [5, 6, 7],  ten: 'Hợi – Mão – Mùi' }
    ];
    function tamTai(namSinhAm, namCuoiAm) {
        var chiSinh = L.chiNam(namSinhAm);
        var chiCuoi = L.chiNam(namCuoiAm);
        for (var i = 0; i < TAM_TAI.length; i++) {
            if (TAM_TAI[i].nhom.indexOf(chiSinh) >= 0) {
                var pham = TAM_TAI[i].nam.indexOf(chiCuoi) >= 0;
                return { pham: pham, nhom: TAM_TAI[i].ten, namCuoi: L.canChiNam(namCuoiAm) };
            }
        }
        return { pham: false, nhom: null, namCuoi: L.canChiNam(namCuoiAm) };
    }

    /* ---------- Chấm điểm một ngày ---------- */
    // Thang 0–100. Trọng số đặt theo mức người Việt thường coi trọng khi
    // chọn ngày cưới: hoàng đạo và trực nặng nhất, các ngày kỵ trừ dần.
    function chamDiem(d) {
        var diem = 50;
        var ly = [];

        if (d.than.hoangDao) { diem += 20; ly.push({ tot: true,  t: 'Ngày hoàng đạo (' + d.than.ten + ')' }); }
        else                 { diem -= 18; ly.push({ tot: false, t: 'Ngày hắc đạo (' + d.than.ten + ')' }); }

        diem += d.truc.diem * 8;
        if (d.truc.diem > 0)      ly.push({ tot: true,  t: 'Trực ' + d.truc.ten + ' — hợp cưới hỏi' });
        else if (d.truc.diem < 0) ly.push({ tot: false, t: 'Trực ' + d.truc.ten + ' — kỵ cưới hỏi' });

        if (d.tamNuong)    { diem -= 16; ly.push({ tot: false, t: 'Ngày Tam Nương' }); }
        if (d.nguyetKy)    { diem -= 12; ly.push({ tot: false, t: 'Ngày Nguyệt Kỵ' }); }
        if (d.duongCongKy) { diem -= 20; ly.push({ tot: false, t: 'Dương Công Kỵ Nhật' }); }

        // cuối tuần: không phải yếu tố phong thuỷ, nhưng thực tế khách dễ dự hơn
        if (d.thu === 0 || d.thu === 6) { diem += 6; ly.push({ tot: true, t: 'Cuối tuần — khách dễ thu xếp' }); }

        return { diem: Math.max(0, Math.min(100, diem)), lyDo: ly };
    }

    /* ---------- Phân tích một ngày ---------- */
    function xemNgay(dd, mm, yy) {
        var l = L.solar2lunar(dd, mm, yy);
        var chi = L.chiNgay(l.jd);
        var than = hoangDao(l.month, chi);
        var tr = truc(l.month, chi);
        var d = {
            duong: { ngay: dd, thang: mm, nam: yy },
            am: { ngay: l.day, thang: l.month, nam: l.year, nhuan: !!l.leap },
            jd: l.jd,
            thu: new Date(yy, mm - 1, dd).getDay(),
            canChiNgay: L.canChiNgay(l.jd),
            canChiThang: L.canChiThang(l.year, l.month),
            canChiNam: L.canChiNam(l.year),
            than: than,
            truc: tr,
            tamNuong: tamNuong(l.day),
            nguyetKy: nguyetKy(l.day),
            duongCongKy: duongCongKy(l.day, l.month)
        };
        var cd = chamDiem(d);
        d.diem = cd.diem;
        d.lyDo = cd.lyDo;
        return d;
    }

    /* ---------- Xét tuổi hai người theo năm cưới ---------- */
    function xemTuoi(namSinhNam, namSinhNu, namCuoiAm) {
        return {
            chuRe: {
                namSinh: namSinhNam,
                kimLau: kimLau(namSinhNam, namCuoiAm),
                hoangOc: hoangOc(namSinhNam, namCuoiAm),
                tamTai: tamTai(namSinhNam, namCuoiAm),
                canChi: L.canChiNam(namSinhNam)
            },
            coDau: {
                namSinh: namSinhNu,
                kimLau: kimLau(namSinhNu, namCuoiAm),
                hoangOc: hoangOc(namSinhNu, namCuoiAm),
                tamTai: tamTai(namSinhNu, namCuoiAm),
                canChi: L.canChiNam(namSinhNu)
            },
            namCuoi: namCuoiAm,
            canChiNamCuoi: L.canChiNam(namCuoiAm)
        };
    }

    /* ---------- Tìm ngày đẹp trong khoảng ---------- */
    function timNgayDep(tuDate, denDate, opts) {
        opts = opts || {};
        var minDiem = opts.minDiem != null ? opts.minDiem : 60;
        var ketQua = [];
        var cur = new Date(tuDate.getTime());
        var guard = 0;
        while (cur <= denDate && guard++ < 1200) {
            var d = xemNgay(cur.getDate(), cur.getMonth() + 1, cur.getFullYear());
            if (d.diem >= minDiem) ketQua.push(d);
            cur.setDate(cur.getDate() + 1);
        }
        ketQua.sort(function (a, b) { return b.diem - a.diem || a.jd - b.jd; });
        return ketQua;
    }

    return {
        xemNgay: xemNgay,
        xemTuoi: xemTuoi,
        timNgayDep: timNgayDep,
        kimLau: kimLau,
        hoangOc: hoangOc,
        tamTai: tamTai,
        hoangDao: hoangDao,
        truc: truc,
        THAN12: THAN12,
        TRUC12: TRUC12,
        HOANG_OC: HOANG_OC
    };
})(typeof Lunar !== 'undefined' ? Lunar : require('./lunar.js'));

if (typeof module !== 'undefined' && module.exports) module.exports = WeddingDate;
