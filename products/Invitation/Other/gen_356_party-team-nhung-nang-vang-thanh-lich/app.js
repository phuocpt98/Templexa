/* ==========================================================
   Party Team Nhung — Nắng Vàng Thanh Lịch (gen_356)
   Cấu hình riêng: window.INVITE (khai báo trong HTML)
   - Không nhạc nền, không hộp quà, không album, không ghi Sheet.
   - RSVP: submit → hiện bản tóm tắt + nút chép để gửi lại BTC.
   ========================================================== */
(function () {
    'use strict';
    var CFG = window.INVITE || {};
    var $ = function (s, c) { return (c || document).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Tên khách: ?ten= trước, rồi ?to= / ?name= ----------
       Link qua app nhắn tin hay bị mã hoá 2 lần (%2520) → giải mã lặp
       tới khi chuỗi không đổi nữa (tối đa 5 lần). Mặc định "Quý khách". */
    var guestName = 'Quý khách';
    (function () {
        var q = new URLSearchParams(location.search);
        var raw = q.get('ten') || q.get('to') || q.get('name') || '';
        var name = raw;
        for (var i = 0; i < 5; i++) {
            try {
                var next = decodeURIComponent(name);
                if (next === name) break;
                name = next;
            } catch (e) { break; }
        }
        name = name.trim();
        if (name) guestName = name.slice(0, 60);
        $$('.guest-name').forEach(function (el) { el.textContent = guestName; el.classList.add('show'); });
        var input = $('#wName');
        if (input) input.value = guestName === 'Quý khách' ? '' : guestName;
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
        setTimeout(startPetals, 2800);
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

    /* ---------- Hạt nắng vàng rơi ---------- */
    var petalTimer = null;
    function startPetals() {
        // navigator.webdriver: bỏ hạt nắng khi công cụ chụp ảnh catalog chạy (tránh đè chữ)
        if (reduce || petalTimer || navigator.webdriver) return;
        var box = $('#petals');
        if (!box) return;
        var spawn = function () {
            if (document.hidden) return;
            var p = document.createElement('span');
            var dust = Math.random() < 0.35;
            p.className = 'petal' + (dust ? ' dust' : '');
            var t = 9 + Math.random() * 8;
            p.style.left = (Math.random() * 100) + '%';
            p.style.setProperty('--s', (9 + Math.random() * 9).toFixed(1) + 'px');
            p.style.setProperty('--t', t.toFixed(1) + 's');
            p.style.setProperty('--sw', (2.5 + Math.random() * 2.5).toFixed(1) + 's');
            p.style.setProperty('--dx', (Math.random() * 160 - 80).toFixed(0) + 'px');
            p.style.setProperty('--r', (Math.random() * 720 - 360).toFixed(0) + 'deg');
            p.style.opacity = dust ? 0.9 : (0.55 + Math.random() * 0.4).toFixed(2);
            box.appendChild(p);
            setTimeout(function () { p.remove(); }, t * 1000 + 200);
        };
        for (var i = 0; i < 5; i++) setTimeout(spawn, i * 400);
        petalTimer = setInterval(spawn, 900);
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

    /* ---------- Xác nhận tham dự — tóm tắt + chép (không ghi Sheet) ---------- */
    (function () {
        var form = $('#rsvpForm'), out = $('#formMsg');
        var box = $('#confirmBox'), textEl = $('#confirmText'), copyBtn = $('#copyConfirm');
        if (!form) return;
        var esc = function (s) { return String(s || '').replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

        var summaryText = '';
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = $('#wName').value.trim();
            var att = form.querySelector('input[name="attend"]:checked');
            var guestsSel = $('#wGuests');
            var guests = guestsSel ? guestsSel.value : '0';
            var msg = $('#wMsg').value.trim();
            if (!name) { out.textContent = 'Bạn vui lòng cho biết tên nhé!'; $('#wName').focus(); return; }
            var attendLabel = att ? att.value : 'Chắc chắn tham dự';
            var guestsLabel = guests === '0' ? 'Đi một mình'
                : guests === '1' ? 'Đi cùng 1 người'
                : guests === '4' ? 'Đi cùng 4 người trở lên'
                : 'Đi cùng ' + guests + ' người';
            var lines = [
                'XÁC NHẬN THAM DỰ — PARTY TEAM NHUNG',
                'Họ tên: ' + name,
                'Tham dự: ' + attendLabel,
                'Đi cùng: ' + guestsLabel,
                'Thời gian: 15:00 Thứ Tư 18/11/2026',
                'Địa điểm: S Villa, 82 Vũ Đình Long, Sơn Trà, Đà Nẵng'
            ];
            if (msg) lines.push('Lời nhắn: ' + msg);
            summaryText = lines.join('\n');
            if (textEl) textEl.textContent = summaryText;
            if (box) {
                box.hidden = false;
                box.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            out.textContent = 'Cảm ơn ' + name + '! Bạn chép nội dung bên dưới và gửi lại cho ban tổ chức nhé.';
        });

        if (copyBtn) copyBtn.addEventListener('click', function () {
            var label = copyBtn.innerHTML;
            var done = function (ok) {
                copyBtn.textContent = ok ? 'Đã chép ✓' : 'Chép chưa được — bạn bôi đen rồi chép tay nhé';
                setTimeout(function () { copyBtn.innerHTML = label; }, 2200);
            };
            var fallback = function () {
                var ta = document.createElement('textarea');
                ta.value = summaryText;
                ta.style.position = 'fixed'; ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                var ok = false;
                try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
                document.body.removeChild(ta);
                done(ok);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(summaryText).then(function () { done(true); }, fallback);
            } else { fallback(); }
        });
    })();
})();
