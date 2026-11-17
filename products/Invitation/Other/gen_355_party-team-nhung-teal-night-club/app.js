/* ==========================================================
   Party Team Nhung — Teal Night Club (gen_355)
   Cấu hình riêng: window.INVITE (khai báo trong HTML)
   - Tên khách: ?ten= trước, rồi ?to= / ?name=, giải mã lặp (link qua app
     nhắn tin hay bị mã hoá 2 lần, vd %2520). Mặc định "Quý khách" cũng hiện.
   - KHÔNG ghi Google Sheet (sheetId = ''): submit chỉ hiện tóm tắt + nút chép.
   ========================================================== */
(function () {
    'use strict';
    var CFG = window.INVITE || {};
    var $ = function (s, c) { return (c || document).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Tên khách: ?ten= → ?to= → ?name=, giải mã lặp ---------- */
    (function () {
        var q = new URLSearchParams(location.search);
        var raw = q.get('ten') || q.get('to') || q.get('name');
        var name = 'Quý khách';
        var hasRealName = false;
        if (raw) {
            // Giải mã lặp tới khi chuỗi không đổi nữa (tối đa 5 lần)
            var cur = raw;
            for (var i = 0; i < 5; i++) {
                try {
                    var next = decodeURIComponent(cur);
                    if (next === cur) break;
                    cur = next;
                } catch (e) { break; }
            }
            cur = cur.trim();
            if (cur) { name = cur.slice(0, 60); hasRealName = true; }
        }
        $$('.guest-name').forEach(function (el) { el.textContent = name; });
        // Prefill ô họ tên chỉ khi có tên thật; mặc định "Quý khách" thì để trống
        // để khách tự gõ tên mình (tránh submit nhầm tên "Quý khách").
        var input = $('#wName');
        if (input && hasRealName) input.value = name;
    })();

    /* ---------- Phong bì ---------- */
    var env = $('#envelope');
    document.body.classList.add('locked');
    function openEnvelope() {
        if (!env || env.classList.contains('opening')) return;
        requestAnimationFrame(function () { env.classList.add('opening'); });
        setTimeout(function () {
            env.classList.add('open');
            document.body.classList.add('opened');
        }, 1300);
        setTimeout(function () {
            env.classList.add('done');
            document.body.classList.remove('locked');
        }, 2400);
        setTimeout(startSparkles, 2800);
    }
    if (env) env.addEventListener('click', openEnvelope);
    window.openEnvelope = openEnvelope;

    /* ---------- Reveal ---------- */
    $$('[data-stagger]').forEach(function (wrap) {
        var step = parseFloat(wrap.getAttribute('data-stagger')) || 0.12;
        $$('.rv, .rv-l, .rv-r, .rv-zoom, .rv-scale', wrap).forEach(function (el, i) {
            el.style.setProperty('--d', (i * step).toFixed(2) + 's');
        });
    });
    var revealEls = $$('.rv, .rv-l, .rv-r, .rv-zoom, .rv-scale');
    if ('IntersectionObserver' in window && !reduce) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
            });
        }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('in'); });
    }

    /* ---------- Bụi vàng + sao 4 cánh rơi ---------- */
    var sparkTimer = null;
    function startSparkles() {
        // navigator.webdriver: bỏ hiệu ứng khi công cụ chụp ảnh catalog chạy
        if (reduce || sparkTimer || navigator.webdriver) return;
        var box = $('#sparkles');
        if (!box) return;
        var spawn = function () {
            if (document.hidden) return;
            var p = document.createElement('span');
            var isStar = Math.random() < 0.4;
            p.className = 'spark' + (isStar ? ' star4' : '');
            var t = 9 + Math.random() * 8;
            var s = isStar ? (10 + Math.random() * 8) : (4 + Math.random() * 5);
            if (isStar) p.textContent = '✦';
            p.style.left = (Math.random() * 100) + '%';
            p.style.setProperty('--s', s.toFixed(1) + 'px');
            if (!isStar) { p.style.width = s.toFixed(1) + 'px'; p.style.height = s.toFixed(1) + 'px'; }
            p.style.setProperty('--t', t.toFixed(1) + 's');
            p.style.setProperty('--sw', (2.5 + Math.random() * 2.5).toFixed(1) + 's');
            p.style.setProperty('--dx', (Math.random() * 160 - 80).toFixed(0) + 'px');
            p.style.setProperty('--r', (Math.random() * 720 - 360).toFixed(0) + 'deg');
            p.style.opacity = (0.55 + Math.random() * 0.4).toFixed(2);
            box.appendChild(p);
            setTimeout(function () { p.remove(); }, t * 1000 + 200);
        };
        for (var i = 0; i < 5; i++) setTimeout(spawn, i * 400);
        sparkTimer = setInterval(spawn, 900);
    }

    /* ---------- Lịch tháng ---------- */
    (function () {
        var box = $('#calendar');
        if (!box || !CFG.calendar) return;
        var c = CFG.calendar; // { year, month, main, others: [] }
        var html = '<p class="cal-title">Tháng ' + c.month + ' · ' + c.year + '</p><div class="cal-grid">';
        ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].forEach(function (d) { html += '<span class="h">' + d + '</span>'; });
        var first = (new Date(c.year, c.month - 1, 1).getDay() + 6) % 7;
        var days = new Date(c.year, c.month, 0).getDate();
        for (var i = 0; i < first; i++) html += '<span></span>';
        for (var d = 1; d <= days; d++) {
            var cls = d === c.main ? 'd hl' : ((c.others || []).indexOf(d) > -1 ? 'd hl sub' : 'd');
            html += '<span class="' + cls + '">' + d + '</span>';
        }
        box.innerHTML = html + '</div>';
    })();

    /* ---------- Đếm ngược ---------- */
    (function () {
        if (!CFG.countdown) return;
        var target = new Date(CFG.countdown).getTime();
        var els = { d: $('#cdD'), h: $('#cdH'), m: $('#cdM'), s: $('#cdS') };
        if (!els.d) return;
        var pad = function (n) { return (n < 10 ? '0' : '') + n; };
        var tick = function () {
            var diff = Math.max(0, target - Date.now());
            els.d.textContent = pad(Math.floor(diff / 864e5));
            els.h.textContent = pad(Math.floor(diff % 864e5 / 36e5));
            els.m.textContent = pad(Math.floor(diff % 36e5 / 6e4));
            els.s.textContent = pad(Math.floor(diff % 6e4 / 1e3));
        };
        tick();
        setInterval(tick, 1000);
    })();

    /* ---------- Xác nhận tham dự — chỉ tóm tắt + chép, không ghi Sheet ---------- */
    (function () {
        var form = $('#rsvpForm'), out = $('#formMsg');
        var box = $('#rsvpSummary'), sumText = $('#sumText'), copyBtn = $('#copySummary');
        if (!form) return;

        $$('.chip', form).forEach(function (c) {
            c.addEventListener('click', function () {
                $('#wMsg').value = c.getAttribute('data-msg');
                $$('.chip', form).forEach(function (x) { x.classList.remove('on'); });
                c.classList.add('on');
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = $('#wName').value.trim();
            var msg = $('#wMsg').value.trim();
            var att = form.querySelector('input[name="attend"]:checked');
            var guests = $('#wGuests').value;
            if (!name) { out.textContent = 'Bạn vui lòng cho biết tên nhé!'; $('#wName').focus(); return; }
            var attend = att ? att.value : 'Chưa chắc chắn';
            var guestText = guests === '0' ? 'Chỉ mình tôi' : guests + ' người';
            var lines = [
                'Xác nhận tham dự — Party Team Nhung',
                'Họ tên: ' + name,
                'Tham dự: ' + attend,
                'Số người đi cùng: ' + guestText,
                'Lời nhắn: ' + (msg || '—'),
                '',
                'Hẹn gặp bạn 15:00 Thứ Tư 18/11/2026',
                'tại S Villa, 82 Vũ Đình Long, Sơn Trà, Đà Nẵng.'
            ];
            if (sumText) sumText.textContent = lines.join('\n');
            if (box) {
                box.hidden = false;
                box.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            out.textContent = 'Cảm ơn ' + name + '! Chép nội dung bên dưới rồi gửi lại cho ban tổ chức nhé.';
        });

        if (copyBtn) copyBtn.addEventListener('click', function () {
            var text = sumText ? sumText.textContent : '';
            if (!text) return;
            var label = copyBtn.innerHTML;
            var done = function () {
                copyBtn.textContent = 'Đã chép ✓';
                setTimeout(function () { copyBtn.innerHTML = label; }, 1800);
            };
            var fallback = function () {
                var ta = document.createElement('textarea');
                ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
                document.body.appendChild(ta); ta.select();
                try { document.execCommand('copy'); } catch (e) {}
                document.body.removeChild(ta); done();
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(done, fallback);
            } else fallback();
        });
    })();
})();
