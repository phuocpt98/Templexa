/* ==========================================================
   Vinatrans — Hội nghị Tổng kết 2026 (gen_360)
   - Tên khách ?ten= / ?to= / ?name=, giải mã lặp (tối đa 5 lần)
   - Phong bì bấm để mở, reveal khi cuộn, hạt vàng bay nhẹ
   - Đếm ngược tới 2026-12-25T09:00:00+07:00
   - RSVP: chọn Tham gia / Không tham gia → form → thẻ xác nhận,
     lưu localStorage (key: vinatrans360_rsvp), tải lại vẫn giữ.
   - BẢN PRODUCTION sẽ nối Google Sheet — demo hiện CHỈ lưu local,
     KHÔNG có endpoint Sheet nào (không bịa).
   ========================================================== */
(function () {
    'use strict';
    var CFG = window.INVITE || {};
    var $ = function (s, c) { return (c || document).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Tên khách ---------- */
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
        setTimeout(startConfetti, 2800);
    }
    if (env) {
        env.addEventListener('click', openEnvelope);
        env.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnvelope(); } });
    }
    window.openEnvelope = openEnvelope;

    /* ---------- Reveal ---------- */
    $$('[data-stagger]').forEach(function (wrap) {
        var step = parseFloat(wrap.getAttribute('data-stagger')) || 0.12;
        $$('.rv, .rv-scale', wrap).forEach(function (el, i) {
            el.style.setProperty('--d', (i * step).toFixed(2) + 's');
        });
    });
    var revealEls = $$('.rv, .rv-scale');
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

    /* ---------- Hạt vàng bay nhẹ ---------- */
    var confettiTimer = null;
    function startConfetti() {
        if (reduce || confettiTimer || navigator.webdriver) return;
        var box = $('#confetti');
        if (!box) return;
        var spawn = function () {
            if (document.hidden) return;
            var b = document.createElement('span');
            b.className = 'confetti-bit' + (Math.random() < 0.45 ? ' dot' : '');
            var t = 10 + Math.random() * 8;
            b.style.left = (Math.random() * 100) + '%';
            b.style.setProperty('--s', (5 + Math.random() * 7).toFixed(1) + 'px');
            b.style.setProperty('--t', t.toFixed(1) + 's');
            b.style.setProperty('--sw', (2.5 + Math.random() * 2.5).toFixed(1) + 's');
            b.style.setProperty('--dx', (Math.random() * 120 - 60).toFixed(0) + 'px');
            b.style.setProperty('--r', (Math.random() * 720 - 360).toFixed(0) + 'deg');
            b.style.opacity = (0.5 + Math.random() * 0.45).toFixed(2);
            box.appendChild(b);
            setTimeout(function () { b.remove(); }, t * 1000 + 200);
        };
        for (var i = 0; i < 5; i++) setTimeout(spawn, i * 400);
        confettiTimer = setInterval(spawn, 1100);
    }

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

    /* ---------- Xác nhận tham dự (localStorage) ---------- */
    (function () {
        var key = CFG.rsvpKey || 'vinatrans360_rsvp';
        var choice = $('#rsvpChoice'), form = $('#rsvpForm'), card = $('#confirmCard');
        var btnYes = $('#btnAttend'), btnNo = $('#btnDecline');
        var formChoice = $('#formChoiceText'), out = $('#formMsg');
        var badge = $('#confirmBadge'), cName = $('#confirmName'), cNote = $('#confirmNote');
        if (!choice || !form || !card) return;

        var state = { attend: null, name: '', phone: '', note: '' };

        function readStored() {
            try {
                var raw = localStorage.getItem(key);
                return raw ? JSON.parse(raw) : null;
            } catch (e) { return null; }
        }
        function saveStored() {
            try { localStorage.setItem(key, JSON.stringify(state)); } catch (e) { /* bỏ qua nếu trình duyệt chặn */ }
        }
        function clearStored() {
            try { localStorage.removeItem(key); } catch (e) { /* bỏ qua */ }
        }

        function showChoice() {
            choice.hidden = false;
            form.hidden = true;
            card.hidden = true;
            btnYes.classList.remove('selected-yes');
            btnNo.classList.remove('selected-no');
        }
        function showForm(attend) {
            state.attend = attend;
            choice.hidden = true;
            card.hidden = true;
            form.hidden = false;
            formChoice.textContent = attend
                ? 'Bạn đã chọn: Tham gia hội nghị'
                : 'Bạn đã chọn: Không tham gia';
            formChoice.className = 'form-choice ' + (attend ? 'yes' : 'no');
            if (attend) { btnYes.classList.add('selected-yes'); btnNo.classList.remove('selected-no'); }
            else { btnNo.classList.add('selected-no'); btnYes.classList.remove('selected-yes'); }
            out.textContent = '';
            var nameInput = $('#wName');
            if (nameInput && !nameInput.value && guestName !== 'Quý khách') nameInput.value = guestName;
            nameInput.focus();
        }
        function showConfirm() {
            choice.hidden = true;
            form.hidden = true;
            card.hidden = false;
            var attend = !!state.attend;
            badge.textContent = attend ? '✓ ĐÃ XÁC NHẬN THAM GIA' : 'ĐÃ XÁC NHẬN KHÔNG THAM GIA';
            badge.className = 'confirm-badge ' + (attend ? 'yes' : 'no');
            cName.textContent = state.name || guestName;
            cNote.textContent = attend
                ? 'Cảm ơn Quý khách đã xác nhận. Hẹn gặp Quý khách tại hội nghị!'
                : 'Cảm ơn Quý khách đã phản hồi. Ban tổ chức đã ghi nhận.';
            card.classList.add('in');
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        btnYes.addEventListener('click', function () { showForm(true); });
        btnNo.addEventListener('click', function () { showForm(false); });
        $('#rsvpBack').addEventListener('click', showChoice);
        $('#rsvpChange').addEventListener('click', function () {
            clearStored();
            state = { attend: null, name: '', phone: '', note: '' };
            showChoice();
            choice.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = $('#wName').value.trim();
            if (!name) { out.textContent = 'Bạn cho Ban tổ chức biết họ tên nhé!'; $('#wName').focus(); return; }
            state.name = name;
            state.phone = $('#wPhone').value.trim();
            state.note = $('#wMsg').value.trim();
            // Demo: chỉ lưu local — bản production sẽ nối Google Sheet tại đây.
            saveStored();
            showConfirm();
        });

        // Tải lại trang vẫn giữ lựa chọn đã gửi
        var saved = readStored();
        if (saved && saved.name && typeof saved.attend === 'boolean') {
            state = saved;
            showConfirm();
        }
    })();
})();
