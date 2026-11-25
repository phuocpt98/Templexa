/* ==========================================================
   Vinatrans — Hội nghị Tổng kết năm 2026 (gen_359)
   - Tên khách: ?ten= trước, rồi ?to= / ?name=; giải mã lặp (tối đa
     5 lần) vì link qua app nhắn tin hay bị mã hoá 2 lần (%2520).
     Mặc định "Quý khách" — luôn hiện ở mọi .guest-name.
   - Mã khách VIN-XXXX: sinh xác định (deterministic) từ tên khách
     bằng hàm hash djb2 đơn giản — cùng một tên luôn ra cùng một mã.
     Khách mặc định "Quý khách" thì mã VIN-0000.
   - QR check-in: tạo từ api.qrserver.com với URL thiệp hiện tại
     (kèm ?ten=...); nếu API ngoài không tải được thì vẫn hiện mã
     khách dạng chữ để check-in thủ công.
   - Xác nhận tham dự: BẢN DEMO chỉ lưu vào localStorage.
     Bản production sẽ nối Google Sheet — chưa có endpoint,
     không bịa sheetId.
   ========================================================== */
(function () {
    'use strict';
    var CFG = window.INVITE || {};
    var $ = function (s, c) { return (c || document).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Tên khách + mã khách ---------- */
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

    function guestCode(name) {
        if (!name || name === 'Quý khách') return 'VIN-0000';
        var h = 5381;
        for (var i = 0; i < name.length; i++) {
            h = ((h << 5) + h + name.charCodeAt(i)) >>> 0; // djb2
        }
        return 'VIN-' + String(h % 10000).padStart(4, '0');
    }
    var code = guestCode(guestName);
    $$('.guest-code').forEach(function (el) { el.textContent = code; });

    /* ---------- QR check-in ---------- */
    (function () {
        var img = $('#qrImg');
        var fallback = $('#qrFallback');
        if (!img) return;
        var url = location.href.split('#')[0];
        img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=' + encodeURIComponent(url);
        img.addEventListener('error', function () {
            img.style.display = 'none';
            if (fallback) fallback.hidden = false;
        });
        img.addEventListener('load', function () {
            if (img.naturalWidth <= 1) { // ảnh lỗi trả về 1x1
                img.style.display = 'none';
                if (fallback) fallback.hidden = false;
            }
        });
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

    /* ---------- Xác nhận tham dự (demo: localStorage) ---------- */
    (function () {
        var choices = $('#rsvpChoices');
        var btnYes = $('#btnYes'), btnNo = $('#btnNo');
        var form = $('#rsvpForm'), pick = $('#formPick'), out = $('#formMsg');
        var card = $('#confirmCard'), badge = $('#confirmBadge'), ctext = $('#confirmText');
        var again = $('#rsvpAgain');
        if (!choices || !form || !card) return;

        var KEY = CFG.rsvpKey || 'vinatrans-rsvp-2026';
        var attend = null; // 'yes' | 'no'

        function readSaved() {
            try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
        }
        function save(data) {
            try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* bộ nhớ đầy/khóa — bỏ qua */ }
        }
        function clearSaved() {
            try { localStorage.removeItem(KEY); } catch (e) { /* bỏ qua */ }
        }

        function showConfirm(data) {
            choices.hidden = true;
            form.hidden = true;
            out.textContent = '';
            if (data.attend === 'yes') {
                badge.textContent = '✓ ĐÃ XÁC NHẬN THAM GIA';
                badge.className = 'confirm-badge yes';
                ctext.innerHTML = 'Cảm ơn <b>' + esc(data.name) + '</b>! Ban tổ chức đã ghi nhận xác nhận tham gia của bạn.';
            } else {
                badge.textContent = 'ĐÃ XÁC NHẬN KHÔNG THAM GIA';
                badge.className = 'confirm-badge no';
                ctext.innerHTML = 'Cảm ơn <b>' + esc(data.name) + '</b> đã phản hồi. Hẹn gặp bạn ở những sự kiện tiếp theo của Vinatrans.';
            }
            card.hidden = false;
            card.classList.add('in');
        }
        function esc(s) {
            return String(s || '').replace(/[&<>"']/g, function (c) {
                return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
            });
        }

        function choose(which) {
            attend = which;
            btnYes.setAttribute('aria-pressed', which === 'yes' ? 'true' : 'false');
            btnNo.setAttribute('aria-pressed', which === 'no' ? 'true' : 'false');
            if (which === 'yes') {
                pick.textContent = 'Bạn đã chọn: Tham gia hội nghị';
                pick.className = 'form-pick yes';
            } else {
                pick.textContent = 'Bạn đã chọn: Không tham gia';
                pick.className = 'form-pick no';
            }
            form.hidden = false;
            form.classList.add('in');
            $('#wName').focus();
        }

        btnYes.addEventListener('click', function () { choose('yes'); });
        btnNo.addEventListener('click', function () { choose('no'); });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = $('#wName').value.trim();
            if (!name) { out.textContent = 'Bạn cho ban tổ chức biết tên nhé!'; $('#wName').focus(); return; }
            if (!attend) { out.textContent = 'Bạn chọn Tham gia hoặc Không tham gia ở trên nhé!'; return; }
            var data = {
                attend: attend,
                name: name,
                phone: $('#wPhone').value.trim(),
                note: $('#wMsg').value.trim(),
                code: code,
                ts: new Date().toISOString()
            };
            save(data);
            showConfirm(data);
        });

        again.addEventListener('click', function () {
            clearSaved();
            attend = null;
            btnYes.setAttribute('aria-pressed', 'false');
            btnNo.setAttribute('aria-pressed', 'false');
            card.hidden = true;
            form.hidden = true;
            out.textContent = '';
            choices.hidden = false;
            choices.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        // Tải lại trang vẫn giữ lựa chọn đã gửi
        var saved = readSaved();
        if (saved && saved.name && (saved.attend === 'yes' || saved.attend === 'no')) {
            showConfirm(saved);
        }
    })();
})();
