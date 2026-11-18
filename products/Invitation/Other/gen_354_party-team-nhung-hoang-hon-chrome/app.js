/* ==========================================================
   Party Team Nhung — Hoàng Hôn Chrome (gen_354)
   Cấu hình riêng: window.INVITE (khai báo trong HTML)
   Không nhạc nền, không hộp quà. Xác nhận tham dự gửi thẳng vào
   Google Sheet (tab khach_49 trong file 'data thiệp cưới');
   gửi xong chỉ hiện thẻ cảm ơn nổi trên nền sáng + nút gửi lại.
   ========================================================== */
(function () {
    'use strict';
    var CFG = window.INVITE || {};
    var $ = function (s, c) { return (c || document).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Tên khách: ?ten= trước, rồi ?to= / ?name= ----------
       Giải mã lặp (tối đa 5 lần) vì link qua app nhắn tin hay bị mã hoá 2 lần (%2520).
       Mặc định "Quý khách" — luôn hiện ở mọi .guest-name và prefill form. ---------- */
    var guestName = 'Quý khách';
    (function () {
        var q = new URLSearchParams(location.search);
        var guests = CFG.guests || {};
        var raw = (q.get('id') && guests[q.get('id')]) || q.get('ten') || q.get('to') || q.get('name');
        if (raw) {
            var name = raw;
            for (var i = 0; i < 5; i++) {
                try {
                    var dec = decodeURIComponent(name);
                    if (dec === name) break;
                    name = dec;
                } catch (e) { break; }
            }
            name = name.replace(/\+/g, ' ').trim();
            if (name) guestName = name.slice(0, 60);
        }
        $$('.guest-name').forEach(function (el) { el.textContent = guestName; });
        var input = $('#wName');
        if (input && guestName !== 'Quý khách') input.value = guestName;
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
    if (env) {
        env.addEventListener('click', openEnvelope);
        env.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnvelope(); } });
    }
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

    /* ---------- Bụi vàng hoàng hôn rơi ---------- */
    var petalTimer = null;
    function startPetals() {
        if (reduce || petalTimer || navigator.webdriver) return;
        var box = $('#petals');
        if (!box) return;
        var spawn = function () {
            if (document.hidden) return;
            var p = document.createElement('span');
            var dust = Math.random() < 0.4;
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

    /* ---------- Xác nhận tham dự: gửi vào Google Sheet là xong ----------
       Gửi xong form ẩn, chỉ hiện thẻ cảm ơn nổi trên nền sáng + nút
       "Gửi lại phản hồi" (hiện lại form, giữ nguyên nội dung cũ để sửa).
       Tải lại trang là form mới từ đầu, không lưu trạng thái. ---------- */
    (function () {
        var form = $('#rsvpForm'), out = $('#formMsg'), again = $('#rsvpAgain');
        if (!form) return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = $('#wName').value.trim();
            if (!name) { out.textContent = 'Bạn cho Team Nhung biết tên nhé!'; $('#wName').focus(); return; }
            var att = form.querySelector('input[name="attend"]:checked');
            var guests = $('#wGuests').value;
            var msg = $('#wMsg').value.trim();
            var submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;
            out.classList.remove('ok');
            out.textContent = 'Đang gửi xác nhận…';
            var fail = function () {
                if (submitBtn) submitBtn.disabled = false;
                out.classList.remove('ok');
                out.textContent = 'Gửi chưa được, bạn thử lại nhé.';
            };
            if (window.sheetsAPI && CFG.sheetId) {
                window.sheetsAPI.post(CFG.sheetId, {
                    A: name,
                    B: att ? att.value : 'Chưa chắc chắn',
                    C: guests,
                    D: msg,
                    E: new Date().toLocaleString('vi-VN')
                }).then(function () {
                    form.style.display = 'none';
                    out.classList.add('ok');
                    out.textContent = 'Cảm ơn ' + name + '! Team Nhung đã ghi nhận xác nhận của bạn ✓';
                    if (again) again.hidden = false;
                }, fail);
            } else {
                fail();
            }
        });
        if (again) {
            again.addEventListener('click', function () {
                form.style.display = '';
                out.textContent = '';
                out.classList.remove('ok');
                again.hidden = true;
                var submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) submitBtn.disabled = false;
                $('#wName').focus();
            });
        }
    })();
})();
