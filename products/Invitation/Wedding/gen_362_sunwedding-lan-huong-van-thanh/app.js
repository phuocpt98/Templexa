/* ==========================================================
   gen_362 — Thiệp Cưới Phong Bì Hồng (bản demo catalog)
   BẢN DEMO: form lời chúc chỉ hiện lời cảm ơn tại chỗ, CHƯA
   nối Google Sheet. Khi clone cho khách thật, nối tab riêng
   theo quy tắc mỗi thiệp khách 1 tab (xem wishes-api.js).
   Tên khách: ?ten= trước, rồi ?guest= / ?to= / ?name=, giải mã lặp.
   Đếm ngược tới 09:00 Thứ Ba 24/11/2026 (ngày demo đã qua nên
   hiện 00 — giữ nguyên như gốc, không đổi ngày khác).
   Nhạc nền: asset dùng chung ../../../shared/music/wedding/Le Duong.mp3,
   phát khi mở phong bì, nút tròn đỏ góc dưới phải bật/tắt.
   ========================================================== */
(function () {
    'use strict';
    var CFG = window.INVITE || {};
    var $ = function (s, c) { return (c || document).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Tên khách (?ten= / ?guest=) ---------- */
    var guestName = 'Quý khách';
    (function () {
        var q = new URLSearchParams(location.search);
        var raw = q.get('ten') || q.get('guest') || q.get('to') || q.get('name');
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
        var el = $('#guestName');
        if (el) el.textContent = guestName;
    })();

    /* ---------- Phong bì ---------- */
    var env = $('#envelope');
    document.body.classList.add('locked');
    function openEnvelope() {
        if (!env || env.classList.contains('opening') || env.classList.contains('done')) return;
        env.classList.add('opening');
        playMusic();
        setTimeout(function () {
            env.classList.add('done');
            document.body.classList.remove('locked');
            document.body.classList.add('opened');
        }, 900);
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

    /* ---------- Nhạc nền ---------- */
    var audio = $('#bgMusic');
    var musicBtn = $('#musicBtn');
    var musicOn = false;
    function playMusic() {
        if (!audio) return;
        var p = audio.play();
        if (p && p.catch) p.catch(function () { /* trình duyệt chặn autoplay: chờ bấm nút nhạc */ });
        musicOn = true;
        syncMusicBtn();
    }
    function syncMusicBtn() {
        if (!musicBtn) return;
        musicBtn.classList.toggle('playing', musicOn && !audio.paused);
        musicBtn.classList.toggle('off', !(musicOn && !audio.paused));
    }
    if (audio) {
        audio.addEventListener('play', syncMusicBtn);
        audio.addEventListener('pause', syncMusicBtn);
    }
    if (musicBtn) {
        musicBtn.addEventListener('click', function () {
            if (!audio) return;
            if (audio.paused) { audio.play(); musicOn = true; }
            else { audio.pause(); musicOn = false; }
            syncMusicBtn();
        });
    }

    /* ---------- Vạch tiến trình cuộn ---------- */
    var progress = $('#progress');
    function onScroll() {
        if (!progress) return;
        var h = document.documentElement;
        var max = h.scrollHeight - h.clientHeight;
        progress.style.height = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Reveal khi cuộn ---------- */
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

    /* ---------- Đếm ngược tới 09:00 Thứ Ba 24/11/2026 ---------- */
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
        var imgs = ['images/album-1.webp', 'images/album-2.webp', 'images/album-3.webp', 'images/album-4.webp'];
        var lb = $('#lightbox'), lbImg = $('#lbImg'), lbCount = $('#lbCount');
        var cur = 0;
        if (!lb) return;
        function show(i) {
            cur = (i + imgs.length) % imgs.length;
            lbImg.src = imgs[cur];
            lbImg.alt = 'Ảnh cưới ' + (cur + 1);
            lbCount.textContent = (cur + 1) + ' / ' + imgs.length;
            lb.classList.add('open');
            document.body.classList.add('locked');
        }
        function hide() {
            lb.classList.remove('open');
            document.body.classList.remove('locked');
        }
        $$('#albumGrid button').forEach(function (b) {
            b.addEventListener('click', function () { show(+b.getAttribute('data-idx')); });
        });
        var allBtn = $('#albumAllBtn');
        if (allBtn) allBtn.addEventListener('click', function () { show(0); });
        $('#lbClose').addEventListener('click', hide);
        $('#lbPrev').addEventListener('click', function (e) { e.stopPropagation(); show(cur - 1); });
        $('#lbNext').addEventListener('click', function (e) { e.stopPropagation(); show(cur + 1); });
        lb.addEventListener('click', function (e) { if (e.target === lb) hide(); });
        document.addEventListener('keydown', function (e) {
            if (!lb.classList.contains('open')) return;
            if (e.key === 'Escape') hide();
            if (e.key === 'ArrowLeft') show(cur - 1);
            if (e.key === 'ArrowRight') show(cur + 1);
        });
    })();

    /* ---------- Nút "XEM TẤT CẢ (0)" lời chúc ---------- */
    (function () {
        var btn = $('#wishesAllBtn');
        if (!btn) return;
        btn.addEventListener('click', function () {
            var note = $('.wishes-note');
            if (note) note.textContent = 'Chưa có lời chúc nào — hãy là người đầu tiên gửi lời chúc tới Lan Hương & Văn Thanh nhé! 💗';
            var form = $('#wishForm');
            if (form) form.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
        });
    })();

    /* ---------- Chèn biểu tượng vào ô lời chúc ---------- */
    (function () {
        var btn = $('#emojiBtn'), pop = $('#emojiPop'), ta = $('#wWish');
        if (!btn || !pop || !ta) return;
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            pop.classList.toggle('open');
        });
        $$('button', pop).forEach(function (b) {
            b.addEventListener('click', function () {
                var pos = ta.selectionStart || ta.value.length;
                ta.value = ta.value.slice(0, pos) + b.textContent + ta.value.slice(ta.selectionEnd || pos);
                ta.focus();
                ta.selectionStart = ta.selectionEnd = pos + b.textContent.length;
                pop.classList.remove('open');
            });
        });
        document.addEventListener('click', function (e) {
            if (!pop.contains(e.target) && e.target !== btn) pop.classList.remove('open');
        });
    })();

    /* ---------- Dropdown số người: DISABLED tới khi chọn tham dự ---------- */
    (function () {
        var attend = $('#wAttend'), guests = $('#wGuests');
        if (!attend || !guests) return;
        attend.addEventListener('change', function () {
            guests.disabled = !attend.value;
            if (guests.disabled) guests.value = '';
        });
    })();

    /* ---------- Form lời chúc (BẢN DEMO: chỉ hiện cảm ơn) ---------- */
    (function () {
        var form = $('#rsvpForm'), out = $('#formMsg'), again = $('#rsvpAgain');
        if (!form) return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var wish = $('#wWish').value.trim();
            var name = $('#wName').value.trim();
            var nick = $('#wNick').value.trim();
            var attend = $('#wAttend').value;
            var guests = $('#wGuests').value;
            out.classList.remove('err', 'ok');
            if (!wish) { out.classList.add('err'); out.textContent = 'Bạn viết vài lời chúc cho cô dâu, chú rể nhé! 💌'; $('#wWish').focus(); return; }
            if (!name) { out.classList.add('err'); out.textContent = 'Bạn cho mình biết tên nhé!'; $('#wName').focus(); return; }
            if (!nick) { out.classList.add('err'); out.textContent = 'Bạn cho mình biết biệt danh nhé!'; $('#wNick').focus(); return; }
            if (!attend) { out.classList.add('err'); out.textContent = 'Bạn chọn câu trả lời tham dự nhé!'; $('#wAttend').focus(); return; }
            if (attend !== 'Rất tiếc mình không thể tham dự' && !guests) {
                out.classList.add('err'); out.textContent = 'Bạn cho mình biết có bao nhiêu người cùng đến nhé!'; $('#wGuests').focus(); return;
            }
            var who = form.querySelector('input[name="who"]:checked');
            var whoText = who ? who.value : 'Cả hai';
            var guestText = guests ? (' (' + guests + ' người)') : '';
            form.style.display = 'none';
            out.classList.add('ok');
            out.textContent = 'Cảm ơn ' + name + ' (' + nick + ')! Lan Hương & Văn Thanh đã nhận lời chúc của bạn — khách mời của ' + whoText + ': ' + attend + guestText + '. Hẹn gặp bạn trong ngày trọng đại nhé! 💗';
            if (again) again.hidden = false;
            if (again) again.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
        });
        if (again) {
            again.addEventListener('click', function () {
                form.style.display = '';
                out.textContent = '';
                out.classList.remove('ok', 'err');
                again.hidden = true;
                $('#wWish').focus();
            });
        }
    })();

    /* ---------- Hộp mừng cưới ---------- */
    (function () {
        var toggle = $('#giftToggle'), box = $('#giftBox');
        if (!toggle || !box) return;
        toggle.addEventListener('click', function () {
            var open = box.classList.toggle('open');
            toggle.textContent = open ? '🎁 Đóng hộp quà' : '🎁 Mở hộp quà';
        });
        $$('.copy-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var text = btn.getAttribute('data-copy');
                var done = function () {
                    var old = btn.textContent;
                    btn.textContent = 'Đã sao chép ✓';
                    setTimeout(function () { btn.textContent = old; }, 2000);
                };
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
                } else { fallbackCopy(text); done(); }
                function fallbackCopy(t) {
                    var ta = document.createElement('textarea');
                    ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
                    document.body.appendChild(ta); ta.select();
                    try { document.execCommand('copy'); } catch (e) { /* bỏ qua */ }
                    document.body.removeChild(ta);
                }
            });
        });
    })();
})();
