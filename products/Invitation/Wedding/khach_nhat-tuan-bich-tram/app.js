/* ==========================================================
   Nhật Tuấn & Bích Trâm — script dùng chung cho 2 thiệp
   Cấu hình riêng từng thiệp: window.INVITE (khai báo trong HTML)
   ========================================================== */
(function () {
    'use strict';
    var CFG = window.INVITE || {};
    var $ = function (s, c) { return (c || document).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Tên khách: ?id= (theo GUESTS) hoặc ?to= / ?name= ---------- */
    (function () {
        var q = new URLSearchParams(location.search);
        var guests = CFG.guests || {};
        var name = (q.get('id') && guests[q.get('id')]) || q.get('to') || q.get('name');
        if (!name) return;
        name = name.slice(0, 60);
        $$('.guest-name').forEach(function (el) { el.textContent = name; el.classList.add('show'); });
        var input = $('#wName');
        if (input) input.value = name;
    })();

    /* ---------- Nhạc ---------- */
    var audio = $('#bgMusic');
    var musicBtn = $('#musicBtn');
    function playMusic() {
        if (!audio) return;
        audio.volume = 0.45;
        audio.play().then(function () {
            musicBtn.classList.remove('muted'); musicBtn.classList.add('playing');
        }).catch(function () { musicBtn.classList.add('muted'); });
    }
    if (musicBtn) musicBtn.addEventListener('click', function () {
        if (audio.paused) playMusic();
        else { audio.pause(); musicBtn.classList.add('muted'); musicBtn.classList.remove('playing'); }
    });

    /* ---------- Phong bì ---------- */
    var env = $('#envelope');
    document.body.classList.add('locked');
    function openEnvelope() {
        if (!env || env.classList.contains('opening')) return;
        // Trình tự: dấu sáp bung + nắp mở + thư rút lên (0–1.5s)
        // → nền phong bì mờ dần, hero hiện chồng lên (1.3–2.3s)
        // → gỡ phong bì khỏi render, mở cuộn (2.4s) → hoa rơi (2.8s)
        requestAnimationFrame(function () { env.classList.add('opening'); });
        playMusic();
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
    // Tự đặt độ trễ so le cho các phần tử con có data-stagger
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

    /* ---------- Parallax nhẹ cho dải ảnh ---------- */
    var bands = $$('[data-parallax]');
    if (bands.length && !reduce) {
        var ticking = false;
        var update = function () {
            var vh = window.innerHeight;
            bands.forEach(function (b) {
                var r = b.getBoundingClientRect();
                if (r.bottom < 0 || r.top > vh) return;
                var p = (r.top + r.height / 2 - vh / 2) / vh;
                var img = b.querySelector('img');
                if (img) img.style.transform = 'translate3d(0,' + (p * -8).toFixed(2) + '%,0)';
            });
            ticking = false;
        };
        window.addEventListener('scroll', function () {
            if (!ticking) { ticking = true; requestAnimationFrame(update); }
        }, { passive: true });
        update();
    }

    /* ---------- Cánh hoa tulip trắng + bụi vàng ---------- */
    var petalTimer = null;
    function startPetals() {
        if (reduce || petalTimer) return;
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

    /* ---------- Lightbox album ---------- */
    (function () {
        var figs = $$('.gallery figure');
        var lb = $('#lightbox');
        if (!figs.length || !lb) return;
        var img = $('img', lb), idx = 0;
        var srcs = figs.map(function (f) { return f.querySelector('img').getAttribute('src'); });
        var show = function (i) {
            idx = (i + srcs.length) % srcs.length;
            img.style.opacity = 0;
            setTimeout(function () { img.src = srcs[idx]; img.onload = function () { img.style.opacity = 1; }; }, 150);
        };
        figs.forEach(function (f, i) { f.addEventListener('click', function () { show(i); lb.classList.add('show'); }); });
        $('.lb-close', lb).addEventListener('click', function () { lb.classList.remove('show'); });
        $('.lb-prev', lb).addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
        $('.lb-next', lb).addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
        lb.addEventListener('click', function (e) { if (e.target === lb) lb.classList.remove('show'); });
        var x0 = null;
        lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
        lb.addEventListener('touchend', function (e) {
            if (x0 === null) return;
            var dx = e.changedTouches[0].clientX - x0;
            if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
            x0 = null;
        });
    })();

    /* ---------- Tên địa điểm luôn 1 dòng: tự thu nhỏ chữ nếu quá dài ---------- */
    (function () {
        var els = $$('.ev .place');
        if (!els.length) return;
        var fit = function () {
            els.forEach(function (el) {
                el.style.fontSize = '';
                // chỉ lấy phần nội dung (trừ padding) và chừa ~10% cho đuôi nét chữ viết tay
                var pcs = getComputedStyle(el.parentElement);
                var max = (el.parentElement.clientWidth - parseFloat(pcs.paddingLeft) - parseFloat(pcs.paddingRight)) * 0.9;
                var range = document.createRange();
                range.selectNodeContents(el);
                var textW = function () { return range.getBoundingClientRect().width; };
                var size = parseFloat(getComputedStyle(el).fontSize);
                while (textW() > max && size > 16) { size -= 1; el.style.fontSize = size + 'px'; }
            });
        };
        fit();
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
        var t;
        window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(fit, 150); });
    })();

    /* ---------- Hộp quà → popup QR ---------- */
    (function () {
        var btn = $('#giftOpen'), modal = $('#giftModal');
        if (!btn || !modal) return;
        var close = function () { modal.classList.remove('show'); modal.setAttribute('aria-hidden', 'true'); btn.classList.remove('opened'); };
        btn.addEventListener('click', function () {
            btn.classList.add('opened');
            setTimeout(function () { modal.classList.add('show'); modal.setAttribute('aria-hidden', 'false'); }, 250);
        });
        $('.gift-close', modal).addEventListener('click', close);
        modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    })();

    /* ---------- Sao chép số tài khoản ---------- */
    $$('[data-copy]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var v = btn.getAttribute('data-copy'), label = btn.innerHTML;
            var done = function () { btn.textContent = 'Đã sao chép'; setTimeout(function () { btn.innerHTML = label; }, 1800); };
            if (navigator.clipboard) navigator.clipboard.writeText(v).then(done, done); else done();
        });
    });

    /* ---------- Lời chúc + xác nhận (1 nút) — Google Sheet ---------- */
    (function () {
        var form = $('#rsvpForm'), list = $('#wishes'), out = $('#formMsg');
        if (!form) return;
        var esc = function (s) { return String(s || '').replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
        var render = function (rows) {
            if (!list) return;
            list.innerHTML = rows.map(function (r) {
                return '<div class="wish"><b>' + esc(r.A) + '</b><p>' + esc(r.B) + '</p>' + (r.C ? '<time>' + esc(r.C) + '</time>' : '') + '</div>';
            }).join('');
        };
        var load = function () {
            if (typeof sheetsAPI === 'undefined' || !CFG.sheetId) return;
            sheetsAPI.get(CFG.sheetId).then(function (rows) {
                rows = rows.filter(function (r) { return r && r.A; }).reverse();
                if (rows.length) render(rows);
            }).catch(function () {});
        };
        load();

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
            if (!name) { out.textContent = 'Quý khách vui lòng cho biết tên nhé!'; $('#wName').focus(); return; }
            var btn = form.querySelector('button[type="submit"]');
            var label = btn.innerHTML;
            btn.disabled = true; btn.textContent = 'Đang gửi…';
            var full = (att ? '[' + att.value + '] ' : '') + (msg || 'Chúc mừng hạnh phúc!');
            var now = new Date();
            var time = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' + now.toLocaleDateString('vi-VN');
            var finish = function (ok) {
                btn.disabled = false; btn.innerHTML = label;
                if (ok) {
                    out.textContent = 'Cảm ơn ' + name + '! Gia đình đã nhận được lời chúc và xác nhận của Quý khách.';
                    if (list) list.insertAdjacentHTML('afterbegin', '<div class="wish"><b>' + esc(name) + '</b><p>' + esc(full) + '</p><time>' + esc(time) + '</time></div>');
                    form.reset();
                    $$('.chip', form).forEach(function (x) { x.classList.remove('on'); });
                } else {
                    out.textContent = 'Gửi chưa thành công, Quý khách thử lại giúp nhé!';
                }
            };
            if (typeof sheetsAPI === 'undefined') { finish(true); return; }
            sheetsAPI.post(CFG.sheetId, { A: name, B: full, C: time }).then(function () { finish(true); }, function () { finish(false); });
        });
    })();
})();
