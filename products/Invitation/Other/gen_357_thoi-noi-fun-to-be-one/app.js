/* ==========================================================
   gen_357 — Thôi Nôi "Fun to be One" (bản demo catalog)
   BẢN DEMO: form xác nhận chỉ hiện lời cảm ơn tại chỗ, CHƯA
   nối Google Sheet. Khi clone cho khách thật, nối tab riêng
   theo quy tắc mỗi thiệp khách 1 tab (xem wishes-api.js).
   Tên khách: ?ten= trước, rồi ?to= / ?name=, giải mã lặp.
   ========================================================== */
(function () {
    'use strict';
    var CFG = window.INVITE || {};
    var $ = function (s, c) { return (c || document).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Tên khách (?ten=) -> điền sẵn ô tên RSVP ---------- */
    var guestName = 'Quý khách';
    (function () {
        var q = new URLSearchParams(location.search);
        var raw = q.get('ten') || q.get('to') || q.get('name');
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
        var input = $('#wName');
        if (input && guestName !== 'Quý khách') input.value = guestName;
    })();

    /* ---------- Phong bì ---------- */
    var env = $('#envelope');
    document.body.classList.add('locked');
    function openEnvelope() {
        if (!env || env.classList.contains('opening') || env.classList.contains('done')) return;
        env.classList.add('opening');
        setTimeout(function () {
            env.classList.add('done');
            document.body.classList.remove('locked');
            document.body.classList.add('opened');
        }, 1500);
    }
    function showEnvelope() {
        if (!env) return;
        env.classList.remove('opening', 'done');
        document.body.classList.add('locked');
        document.body.classList.remove('opened');
        window.scrollTo(0, 0);
    }
    if (env) {
        env.addEventListener('click', openEnvelope);
        env.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnvelope(); } });
    }
    var backBtn = $('#backEnv');
    if (backBtn) backBtn.addEventListener('click', showEnvelope);
    window.openEnvelope = openEnvelope;

    /* ---------- Reveal ---------- */
    var revealEls = $$('.rv');
    if ('IntersectionObserver' in window && !reduce) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('in'); });
    }

    /* ---------- Đếm ngược tới 14:00 Thứ Bảy 19/12/2026 ---------- */
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

    /* ---------- Xác nhận tham dự (BẢN DEMO: chỉ hiện cảm ơn) ---------- */
    (function () {
        var form = $('#rsvpForm'), out = $('#formMsg'), again = $('#rsvpAgain');
        if (!form) return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = $('#wName').value.trim();
            var guests = $('#wGuests').value.trim();
            var email = $('#wEmail').value.trim();
            var phone = $('#wPhone').value.trim();
            out.classList.remove('err');
            if (!name) { out.classList.add('err'); out.textContent = 'Bạn cho mình biết tên nhé!'; $('#wName').focus(); return; }
            if (!guests || +guests < 1) { out.classList.add('err'); out.textContent = 'Bạn cho mình biết có bao nhiêu người cùng đến nhé!'; $('#wGuests').focus(); return; }
            if (!email || email.indexOf('@') < 1) { out.classList.add('err'); out.textContent = 'Email chưa đúng, bạn kiểm tra lại nhé!'; $('#wEmail').focus(); return; }
            if (!phone) { out.classList.add('err'); out.textContent = 'Bạn cho mình xin số điện thoại nhé!'; $('#wPhone').focus(); return; }
            var att = form.querySelector('input[name="attend"]:checked');
            var attText = att ? att.value : '';
            form.style.display = 'none';
            out.classList.remove('err');
            out.textContent = 'Cảm ơn ' + name + '! Gia đình bé Bảo Khang đã ghi nhận: ' + attText + ' (' + guests + ' người). Hẹn gặp bạn tại tiệc nhé!';
            if (again) again.hidden = false;
        });
        if (again) {
            again.addEventListener('click', function () {
                form.style.display = '';
                out.textContent = '';
                again.hidden = true;
                $('#wName').focus();
            });
        }
    })();
})();
