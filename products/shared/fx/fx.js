/**
 * TEMPLEXA FX — phần JS của thư viện hiệu ứng thiệp (đi cùng fx.css). Hướng dẫn: templexa-ops/skills/thiep/refs/thiet-ke-song-dong.md
 *
 * Tự chạy khi tải trang:
 *   - hiện khi cuộn cho mọi .fx[data-hieu-ung] (stagger tự tính theo vị trí trong cha, 2 tầng kích: mép dưới / giữa màn)
 *   - [data-kich="giua"] không có .fx → chỉ gắn .toi-giua khi tới giữa màn (cảnh rèm, đồng xu…)
 *   - [data-vao] (dàn hợp xướng phần đầu) đọc data-tre / data-thoi-gian → chạy khi html có .fx-mo
 *   - [data-lech-pha] → rải animation-delay âm ngẫu nhiên cho các con có animation (không bao giờ đồng bộ)
 *   - .fx-mot-dong → co cỡ chữ cho vừa 1 dòng (tối thiểu 55%)
 *   - [data-vien="3.5 #0B3954"] → viền chữ sticker 16 hướng
 *
 * API (window.TpxFx):
 *   mo({ cua, nut, thoiGian, bung, khiMo })   màn mở 3 trạng thái dang-mo → tat → da-mo, gắn html.fx-mo
 *   bung(diem, { n, hinh, mau, banKinh, co, roi, t })   hạt bung toả tròn từ 1 điểm (phần tử hoặc {x,y})
 *   nen({ n, hinh, mau, kieu, co, t, z, do })   nền hạt động sau nội dung → trả { tat() }
 *   hopBiMat(vat, { noiDung, lop, soHat, mau, amThanh })   chạm vật → rung → bật → hạt → nội dung bay ra từ vật
 *   tiengReng()   tiếng chuông/đồng xu bằng WebAudio (không cần file)
 *   hien(root)    quét lại .fx trong root (khi chèn nội dung động)
 *   HINH          bộ hình hạt SVG có sẵn: tim, sao, sao4, tron, giay, la, canh-hoa, bong-bay, not-nhac, tuyet
 */
(function () {
    'use strict';
    var html = document.documentElement;
    var giam = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var soan = function () { return html.classList.contains('fx-soan'); };
    var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };
    var rnd = function (a, b) { return a + Math.random() * (b - a); };

    var HINH = {
        'tim': '<svg viewBox="0 0 24 22"><path fill="currentColor" d="M12 21C5 15 1 11 1 6.5A5.5 5.5 0 0 1 12 4a5.5 5.5 0 0 1 11 2.5C23 11 19 15 12 21Z"/></svg>',
        'sao': '<svg viewBox="0 0 24 24"><path fill="currentColor" d="m12 1.5 3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.6 5.6 21.1 7 14l-5.3-5 7.2-.9Z"/></svg>',
        'sao4': '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 0c.9 6.6 4.4 10.4 12 12-7.6 1.6-11.1 5.4-12 12-.9-6.6-4.4-10.4-12-12C7.6 10.4 11.1 6.6 12 0Z"/></svg>',
        'tron': '<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="currentColor"/></svg>',
        'giay': '<svg viewBox="0 0 10 6"><rect width="10" height="6" rx="1" fill="currentColor"/></svg>',
        'la': '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 21C3 9 10 3 22 2c-1 12-7 19-19 19Zm2-2c4-5 8-9 13-12-5 2-10 6-13 12Z"/></svg>',
        'canh-hoa': '<svg viewBox="0 0 20 20"><path fill="currentColor" d="M10 0C16 4 19 10 10 20 1 10 4 4 10 0Z"/></svg>',
        'bong-bay': '<svg viewBox="0 0 26 40"><path fill="currentColor" d="M13 0C20 0 26 6 26 13c0 8-7 14-11 15l1 3h-6l1-3C7 27 0 21 0 13 0 6 6 0 13 0Z"/><path d="M13 31c-2 3 2 5 0 9" stroke="currentColor" fill="none" stroke-width="1"/><ellipse cx="8" cy="9" rx="2.5" ry="4" fill="#fff" opacity=".45" transform="rotate(25 8 9)"/></svg>',
        'not-nhac': '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M9 3v12.3A3.5 3.5 0 1 0 11 18V8h8V3H9Z"/></svg>',
        'tuyet': '<svg viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none" d="M12 1v22M2.5 6.5l19 11M2.5 17.5l19-11M9 3l3 3 3-3M9 21l3-3 3 3"/></svg>'
    };
    var hinhSvg = function (h) { return HINH[h] || h; };   // tên có sẵn hoặc chuỗi <svg> riêng
    var chon = function (arr, i) { return Array.isArray(arr) ? arr[i % arr.length] : arr; };

    /* ---------- 1. HIỆN KHI CUỘN ---------- */
    var BUOC = 0.11, VONG = 4;
    var ioThuong, ioGiua;
    function hienMot(el) {
        if (el.classList.contains('fx')) {
            if (el.hasAttribute('data-tre')) el.style.transitionDelay = el.getAttribute('data-tre') + 's';
            else el.style.transitionDelay = (Array.prototype.indexOf.call(el.parentNode.children, el) % VONG * BUOC).toFixed(2) + 's';
            el.classList.add('da-hien');
        } else el.classList.add('toi-giua');
    }
    function anMot(el) { el.style.transitionDelay = '0s'; el.classList.remove('da-hien', 'toi-giua'); }
    function taoIO(opts) {
        return new IntersectionObserver(function (es, io) {
            es.forEach(function (e) {
                var el = e.target, lap = el.hasAttribute('data-lap');
                if (e.isIntersecting) { hienMot(el); if (!lap) io.unobserve(el); }
                else if (lap) anMot(el);
            });
        }, opts);
    }
    function hien(root) {
        root = root || document;
        var ds = root.querySelectorAll('.fx[data-hieu-ung], [data-kich="giua"]');
        each(ds, function (el) {
            var t = el.getAttribute('data-thoi-gian'); if (t && el.classList.contains('fx')) el.style.setProperty('--fx-t', t + 's');
            if (el.hasAttribute('data-con')) each(el.children, function (c, i) { c.classList.add('fx-con'); c.style.setProperty('--i', i); });
        });
        if (soan() || giam || !('IntersectionObserver' in window)) { each(ds, hienMot); return; }
        ioThuong = ioThuong || taoIO({ threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
        ioGiua = ioGiua || taoIO({ threshold: 0, rootMargin: '-38% 0px -38% 0px' });
        each(ds, function (el) { (el.getAttribute('data-kich') === 'giua' ? ioGiua : ioThuong).observe(el); });
    }

    /* ---------- 2. DÀN HỢP XƯỚNG + LỆCH PHA + CHỮ ---------- */
    function chuanBiVao(root) {
        each((root || document).querySelectorAll('[data-vao]'), function (el) {
            if (el.hasAttribute('data-tre')) el.style.setProperty('--fx-vao-tre', el.getAttribute('data-tre') + 's');
            if (el.hasAttribute('data-thoi-gian')) el.style.setProperty('--fx-vao-t', el.getAttribute('data-thoi-gian') + 's');
        });
    }
    function lechPha(root) {
        each((root || document).querySelectorAll('[data-lech-pha]'), function (nhom) {
            each(nhom.querySelectorAll('*'), function (el) {
                var ck = parseFloat(getComputedStyle(el).animationDuration);
                if (ck > 0 && !el.style.getPropertyValue('--lech')) el.style.setProperty('--lech', (-Math.random() * ck).toFixed(2) + 's');
            });
        });
    }
    function motDong(root) {
        each((root || document).querySelectorAll('.fx-mot-dong'), function (o) {
            o.style.fontSize = '';
            var goc = parseFloat(getComputedStyle(o).fontSize), rong = o.parentNode.clientWidth, can = o.scrollWidth;
            if (rong && can > rong) o.style.fontSize = Math.max(goc * 0.55, goc * rong / can * 0.98).toFixed(1) + 'px';
        });
    }
    function vienChu(root) {
        each((root || document).querySelectorAll('[data-vien]'), function (el) {
            var p = el.getAttribute('data-vien').split(/\s+/), px = parseFloat(p[0]) || 3, mau = p[1] || '#000', a = [];
            for (var i = 0; i < 16; i++) { var g = i / 16 * 2 * Math.PI; a.push((Math.cos(g) * px).toFixed(1) + 'px ' + (Math.sin(g) * px).toFixed(1) + 'px 0 ' + mau); }
            el.style.textShadow = a.join(',');
        });
    }

    /* ---------- 3. HẠT BUNG ---------- */
    function bung(diem, o) {
        o = o || {};
        if (giam || soan()) return;
        var x, y;
        if (diem && diem.getBoundingClientRect) { var r = diem.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top + r.height / 2; }
        else { x = (diem && diem.x) != null ? diem.x : innerWidth / 2; y = (diem && diem.y) != null ? diem.y : innerHeight * 0.46; }
        var n = o.n || 28, hinh = o.hinh || ['tim', 'sao4', 'tron'], mau = o.mau || ['#F27BA3', '#FFC34D', '#5CCFB0', '#9B87F5'];
        var bk = o.banKinh || [90, 300], co = o.co || [10, 20], t = o.t || 1.5;
        var khung = document.createElement('div');
        khung.className = 'fx-bung'; khung.style.left = x + 'px'; khung.style.top = y + 'px';
        for (var i = 0; i < n; i++) {
            var h = document.createElement('i'), g = Math.random() * Math.PI * 2, rr = rnd(bk[0], bk[1]), c = rnd(co[0], co[1]);
            h.innerHTML = hinhSvg(chon(hinh, i)); h.style.color = chon(mau, i);
            h.style.width = c + 'px'; h.style.height = c + 'px';
            h.style.setProperty('--x', (Math.cos(g) * rr).toFixed(0) + 'px');
            h.style.setProperty('--y', (Math.sin(g) * rr * 0.8 - 60).toFixed(0) + 'px');   // lệch lên trên
            h.style.setProperty('--r', (rnd(-1, 1) * 220).toFixed(0) + 'deg');
            h.style.setProperty('--s', rnd(0.7, 1.4).toFixed(2));
            h.style.setProperty('--tre', rnd(0, 0.3).toFixed(2) + 's');
            h.style.setProperty('--t', (t * rnd(0.85, 1.15)).toFixed(2) + 's');
            if (o.roi) h.style.setProperty('--roi', (o.roi === true ? 180 : o.roi) + 'px');      // pháo giấy: bung lên rồi rơi
            khung.appendChild(h);
        }
        document.body.appendChild(khung);
        setTimeout(function () { khung.remove(); }, (t * 1.2 + 0.4) * 1000);
    }

    /* ---------- 4. NỀN ĐỘNG ---------- */
    function nen(o) {
        o = o || {};
        var lop = document.createElement('div'); lop.className = 'fx-nen'; lop.setAttribute('aria-hidden', 'true');
        if (o.z != null) lop.style.setProperty('--z', o.z);
        if (o.do != null) lop.style.setProperty('--do', o.do);
        if (giam || soan()) return { lop: lop, tat: function () {} };
        var kieu = o.kieu || 'len', n = o.n || 14, hinh = o.hinh || 'tim', mau = o.mau || ['#F6A6B8', '#FFD27A'];
        var co = o.co || [10, 22], t = o.t || (kieu === 'troi' ? [7, 13] : [14, 26]);
        for (var i = 0; i < n; i++) {
            var h = document.createElement('i'), c = rnd(co[0], co[1]) * (o.toNho && i % 3 === 0 ? 2.6 : 1), dai = rnd(t[0], t[1]);
            h.innerHTML = hinhSvg(chon(hinh, i)); h.style.color = chon(mau, i);
            h.style.width = c + 'px'; h.style.height = c + 'px';
            h.style.left = rnd(0, 96) + '%';
            if (kieu === 'len') h.style.bottom = '-40px';
            else if (kieu === 'roi') h.style.top = '-40px';
            else h.style.top = rnd(4, 92) + '%';
            h.style.setProperty('--kieu', 'fx-nen-' + kieu);
            h.style.setProperty('--t', dai.toFixed(1) + 's');
            h.style.setProperty('--tre', (-Math.random() * dai).toFixed(1) + 's');   // ÂM: vừa bật đã có hạt giữa màn
            h.style.setProperty('--lech', (rnd(-1, 1) * 60).toFixed(0) + 'px');
            h.style.setProperty('--xoay', (kieu === 'troi' ? rnd(-40, 40) : rnd(300, 700)).toFixed(0) + 'deg');
            if (kieu === 'troi') { h.style.setProperty('--len', (-rnd(40, 100)).toFixed(0) + 'px'); h.style.animationDirection = 'alternate'; h.style.animationTimingFunction = 'ease-in-out'; }
            lop.appendChild(h);
        }
        (o.trong || document.body).appendChild(lop);
        return { lop: lop, tat: function () { lop.remove(); } };
    }

    /* ---------- 5. MÀN MỞ 3 TRẠNG THÁI ---------- */
    function mo(o) {
        o = o || {};
        var cua = typeof o.cua === 'string' ? document.querySelector(o.cua) : o.cua;
        var nut = typeof o.nut === 'string' ? document.querySelector(o.nut) : o.nut;
        if (!cua) return;
        var t = o.thoiGian || 2300, daMo = false;
        document.body.classList.add('fx-khoa');
        function chay() {
            if (daMo) return; daMo = true;
            void cua.offsetWidth;
            cua.classList.add('dang-mo');
            html.classList.add('fx-mo');
            document.body.classList.remove('fx-khoa');
            window.scrollTo(0, 0);
            if (o.bung !== false) setTimeout(function () { bung(o.bung && o.bung.tu || null, o.bung || {}); }, giam ? 0 : (o.bung && o.bung.tre) || 250);
            setTimeout(function () { cua.classList.add('tat'); }, giam ? 0 : t - 700);
            setTimeout(function () { cua.classList.add('da-mo'); }, giam ? 10 : t);
            setTimeout(function () {
                if (o.khiMo) o.khiMo();
                document.dispatchEvent(new CustomEvent('fx:da-mo'));   // bật nhạc, nền động…
            }, giam ? 0 : (o.khiMoSau || 1100));
        }
        (nut || cua).addEventListener('click', chay);
        return { mo: chay };
    }

    /* ---------- 6. HỘP BÍ MẬT (QR trong đồng xu/hộp quà/lì xì, bản đồ sau cổng…) ---------- */
    function hopBiMat(vat, o) {
        o = o || {};
        var noiDung = typeof o.noiDung === 'string' ? document.querySelector(o.noiDung) : o.noiDung;
        var lop = typeof o.lop === 'string' ? document.querySelector(o.lop) : (o.lop || vat);
        if (!vat || !noiDung) return;
        noiDung.classList.add('fx-bi-mat');
        function moHop() {
            if (vat.classList.contains('fx-rung')) return;
            vat.classList.add('fx-rung');
            if (o.amThanh) try { o.amThanh(); } catch (e) {}
            setTimeout(function () {
                vat.classList.add('fx-bat');
                bung(vat, { n: o.soHat || 22, hinh: o.hinh || ['sao4', 'tron'], mau: o.mau || ['#F3DC9C', '#FFF4D6', '#E9C98E'], roi: 120 });
                var r = vat.getBoundingClientRect(), hx = r.left + r.width / 2, hy = r.top + r.height * 0.45;
                noiDung.classList.add('fx-hien-ra');
                each(noiDung.children, function (c, i) {                     // từng thẻ bay ra TỪ tâm vật
                    var b = c.getBoundingClientRect();
                    c.style.setProperty('--tu-x', (hx - (b.left + b.width / 2)).toFixed(0) + 'px');
                    c.style.setProperty('--tu-y', (hy - (b.top + b.height / 2)).toFixed(0) + 'px');
                    c.style.animationDelay = (i * 0.14).toFixed(2) + 's';
                });
                lop.classList.add('fx-tat-dan');
                setTimeout(function () { lop.classList.add('fx-xong'); }, giam ? 0 : 1200);
            }, giam ? 0 : 500);
        }
        vat.setAttribute('role', 'button'); vat.setAttribute('tabindex', '0');
        vat.addEventListener('click', moHop);
        vat.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); moHop(); } });
    }
    var cssHop = '.fx-bi-mat:not(.fx-hien-ra){visibility:hidden}' +
        '.fx-hien-ra>*{animation:fx-bay-ra 1.2s cubic-bezier(.16,1,.3,1) both}' +
        '@keyframes fx-bay-ra{0%{opacity:0;transform:translate(var(--tu-x,0),var(--tu-y,0)) scale(.18) rotate(-8deg);filter:blur(8px) brightness(2.5)}55%{opacity:1;filter:none}100%{opacity:1;transform:none}}' +
        '.fx-rung:not(.fx-bat){animation:fx-rung .5s ease-in-out both!important}' +
        '@keyframes fx-rung{15%{transform:translateX(-5px) rotate(-4deg)}30%{transform:translateX(5px) rotate(4deg)}45%{transform:translateX(-4px) rotate(-3deg)}60%{transform:translateX(3px) rotate(2deg)}80%{transform:scale(1.06)}}' +
        '.fx-tat-dan{opacity:0;pointer-events:none;transition:opacity .6s ease .4s}.fx-xong{display:none!important}';

    /* ---------- 7. TIẾNG CHUÔNG ---------- */
    function tiengReng() {
        try {
            var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
            var ac = tiengReng.ac || (tiengReng.ac = new AC()); if (ac.state === 'suspended') ac.resume();
            [0, 0.14, 0.3, 0.5].forEach(function (t, k) {
                [2093, 2637, 3136].forEach(function (f, j) {
                    var os = ac.createOscillator(), g = ac.createGain(), t0 = ac.currentTime + t;
                    os.type = 'sine'; os.frequency.value = f * (1 + k * 0.015);
                    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.09 / (j + 1), t0 + 0.005);
                    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.6 - k * 0.08);
                    os.connect(g); g.connect(ac.destination); os.start(t0); os.stop(t0 + 0.7);
                });
            });
        } catch (e) {}
    }

    /* ---------- khởi động ---------- */
    function batDau() {
        var st = document.createElement('style'); st.textContent = cssHop; document.head.appendChild(st);
        chuanBiVao(); vienChu(); hien(); motDong();
        requestAnimationFrame(function () { lechPha(); });
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { motDong(); });
        var hen; window.addEventListener('resize', function () { clearTimeout(hen); hen = setTimeout(function () { motDong(); }, 150); });
        if (soan() || giam) html.classList.add('fx-mo');
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', batDau); else batDau();

    window.TpxFx = { mo: mo, bung: bung, nen: nen, hopBiMat: hopBiMat, tiengReng: tiengReng, hien: hien, motDong: motDong, lechPha: lechPha, HINH: HINH };
})();
