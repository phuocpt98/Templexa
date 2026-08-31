/* ============================================================
 * LUNAR.JS — Âm lịch Việt Nam (múi giờ +7)
 * ------------------------------------------------------------
 * Chuyển đổi dương ⇄ âm lịch và tính Can Chi.
 *
 * Thuật toán theo Hồ Ngọc Đức (dựa trên Jean Meeus, "Astronomical
 * Algorithms") — bản chuẩn được dùng rộng rãi cho âm lịch Việt Nam.
 * Điểm sóc và kinh độ mặt trời tính theo múi giờ +7 nên khớp với
 * lịch in trong nước (khác lịch Trung Quốc ở một số ngày).
 *
 * KHÔNG phụ thuộc dữ liệu ngoài — mọi ngày đều tính tại chỗ,
 * không cần bảng tra, không cần server.
 *
 * Dùng:
 *   Lunar.solar2lunar(20, 9, 2026)  → {day, month, year, leap, jd}
 *   Lunar.lunar2solar(10, 8, 2026, 0) → {day, month, year}
 *   Lunar.canChiNgay(jd)            → 'Giáp Tý'
 *   Lunar.canChiNam(2026)           → 'Bính Ngọ'
 *   Lunar.format(20, 9, 2026)       → 'ngày 10 tháng 8 năm Bính Ngọ'
 * ============================================================ */

var Lunar = (function () {
    'use strict';

    var TZ = 7.0;                       // múi giờ Việt Nam
    var PI = Math.PI;

    var CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
    var CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

    /* ---------- Julian Day Number ---------- */

    // Đổi ngày dương → số ngày Julius (số nguyên, tính từ 1/1/4713 TCN)
    function jdFromDate(dd, mm, yy) {
        var a = Math.floor((14 - mm) / 12);
        var y = yy + 4800 - a;
        var m = mm + 12 * a - 3;
        var jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y
               + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
        if (jd < 2299161) {             // trước 15/10/1582 → lịch Julius
            jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
        }
        return jd;
    }

    function jdToDate(jd) {
        var a, b, c, d, e, m, day, month, year;
        if (jd > 2299160) {
            a = jd + 32044;
            b = Math.floor((4 * a + 3) / 146097);
            c = a - Math.floor((b * 146097) / 4);
        } else {
            b = 0;
            c = jd + 32082;
        }
        d = Math.floor((4 * c + 3) / 1461);
        e = c - Math.floor((1461 * d) / 4);
        m = Math.floor((5 * e + 2) / 153);
        day = e - Math.floor((153 * m + 2) / 5) + 1;
        month = m + 3 - 12 * Math.floor(m / 10);
        year = b * 100 + d - 4800 + Math.floor(m / 10);
        return { day: day, month: month, year: year };
    }

    /* ---------- Thiên văn ---------- */

    // Thời điểm sóc (trăng mới) thứ k tính từ 1/1/1900
    function newMoon(k) {
        var T = k / 1236.85;
        var T2 = T * T;
        var T3 = T2 * T;
        var dr = PI / 180;

        var Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
        Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);

        var M   = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;   // dị thường mặt trời
        var Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;  // dị thường mặt trăng
        var F   = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;   // khoảng cách tới nút

        var C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
        C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
        C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
        C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
        C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
        C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
        C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));

        var deltat;
        if (T < -11) {
            deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
        } else {
            deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
        }
        return Jd1 + C1 - deltat;
    }

    // Kinh độ mặt trời (radian) tại thời điểm jdn
    function sunLongitude(jdn) {
        var T = (jdn - 2451545.0) / 36525;
        var T2 = T * T;
        var dr = PI / 180;
        var M  = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
        var L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
        var DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
        DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M)
                + 0.000290 * Math.sin(dr * 3 * M);
        var L = (L0 + DL) * dr;
        L = L - PI * 2 * Math.floor(L / (PI * 2));
        return L;
    }

    // Kinh độ mặt trời quy về 12 cung (0..11) — dùng để tìm tháng nhuận
    function getSunLongitude(dayNumber) {
        return Math.floor(sunLongitude(dayNumber - 0.5 - TZ / 24) / PI * 6);
    }

    function getNewMoonDay(k) {
        return Math.floor(newMoon(k) + 0.5 + TZ / 24);
    }

    // Ngày bắt đầu tháng 11 âm lịch của năm yy (tháng chứa đông chí)
    function getLunarMonth11(yy) {
        var off = jdFromDate(31, 12, yy) - 2415021;
        var k = Math.floor(off / 29.530588853);
        var nm = getNewMoonDay(k);
        if (getSunLongitude(nm) >= 9) {
            nm = getNewMoonDay(k - 1);
        }
        return nm;
    }

    // Vị trí tháng nhuận trong năm nhuận
    function getLeapMonthOffset(a11) {
        var k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
        var last;
        var i = 1;
        var arc = getSunLongitude(getNewMoonDay(k + i));
        do {
            last = arc;
            i++;
            arc = getSunLongitude(getNewMoonDay(k + i));
        } while (arc !== last && i < 14);
        return i - 1;
    }

    /* ---------- Chuyển đổi ---------- */

    function solar2lunar(dd, mm, yy) {
        var dayNumber = jdFromDate(dd, mm, yy);
        var k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
        var monthStart = getNewMoonDay(k + 1);
        if (monthStart > dayNumber) monthStart = getNewMoonDay(k);

        var a11 = getLunarMonth11(yy);
        var b11 = a11;
        var lunarYear;
        if (a11 >= monthStart) {
            lunarYear = yy;
            a11 = getLunarMonth11(yy - 1);
        } else {
            lunarYear = yy + 1;
            b11 = getLunarMonth11(yy + 1);
        }

        var lunarDay = dayNumber - monthStart + 1;
        var diff = Math.floor((monthStart - a11) / 29);
        var lunarLeap = 0;
        var lunarMonth = diff + 11;

        if (b11 - a11 > 365) {                       // năm nhuận
            var leapMonthDiff = getLeapMonthOffset(a11);
            if (diff >= leapMonthDiff) {
                lunarMonth = diff + 10;
                if (diff === leapMonthDiff) lunarLeap = 1;
            }
        }
        if (lunarMonth > 12) lunarMonth = lunarMonth - 12;
        if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;

        return {
            day: lunarDay, month: lunarMonth, year: lunarYear,
            leap: lunarLeap, jd: dayNumber
        };
    }

    function lunar2solar(lunarD, lunarM, lunarY, lunarLeap) {
        var a11, b11, off;
        if (lunarM < 11) {
            a11 = getLunarMonth11(lunarY - 1);
            b11 = getLunarMonth11(lunarY);
        } else {
            a11 = getLunarMonth11(lunarY);
            b11 = getLunarMonth11(lunarY + 1);
        }
        off = lunarM - 11;
        if (off < 0) off += 12;

        if (b11 - a11 > 365) {
            var leapOff = getLeapMonthOffset(a11);
            var leapM = leapOff - 2;
            if (leapM < 0) leapM += 12;
            if (lunarLeap !== 0 && lunarM !== leapM) return null;   // không có tháng nhuận này
            if (lunarLeap !== 0 || off >= leapOff) off += 1;
        }
        var k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
        var monthStart = getNewMoonDay(k + off);
        return jdToDate(monthStart + lunarD - 1);
    }

    /* ---------- Can Chi ---------- */

    // Can Chi của NGÀY — tính thẳng từ số ngày Julius
    function canChiNgay(jd) {
        return CAN[(jd + 9) % 10] + ' ' + CHI[(jd + 1) % 12];
    }
    function canNgay(jd) { return (jd + 9) % 10; }
    function chiNgay(jd) { return (jd + 1) % 12; }

    // Can Chi của NĂM âm lịch
    function canChiNam(lunarYear) {
        return CAN[(lunarYear + 6) % 10] + ' ' + CHI[(lunarYear + 8) % 12];
    }
    function canNam(lunarYear) { return (lunarYear + 6) % 10; }
    function chiNam(lunarYear) { return (lunarYear + 8) % 12; }

    // Can Chi của THÁNG âm lịch. Chi tháng cố định: tháng 1 = Dần.
    function canChiThang(lunarYear, lunarMonth) {
        return CAN[(lunarYear * 12 + lunarMonth + 3) % 10] + ' ' + CHI[(lunarMonth + 1) % 12];
    }
    function chiThang(lunarMonth) { return (lunarMonth + 1) % 12; }

    /* ---------- Tiện ích ---------- */

    // 'ngày 10 tháng 8 năm Bính Ngọ'
    function format(dd, mm, yy) {
        var l = solar2lunar(dd, mm, yy);
        return 'ngày ' + l.day + ' tháng ' + l.month + (l.leap ? ' nhuận' : '')
             + ' năm ' + canChiNam(l.year);
    }

    return {
        TZ: TZ, CAN: CAN, CHI: CHI,
        jdFromDate: jdFromDate, jdToDate: jdToDate,
        solar2lunar: solar2lunar, lunar2solar: lunar2solar,
        canChiNgay: canChiNgay, canNgay: canNgay, chiNgay: chiNgay,
        canChiNam: canChiNam, canNam: canNam, chiNam: chiNam,
        canChiThang: canChiThang, chiThang: chiThang,
        format: format
    };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = Lunar;
