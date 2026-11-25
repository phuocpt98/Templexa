/* ==========================================================
   Vinatrans — Hội nghị Tổng kết năm 2026 (gen_358)
   Mẫu 1/3: CỔ ĐIỂN TRANG TRỌNG.
   Cấu hình riêng: window.INVITE (khai báo trong HTML).
   Xác nhận tham dự (bản demo): lưu vào localStorage của trình
   duyệt, tải lại trang vẫn giữ lựa chọn.
   NOTE: bản production sẽ nối Google Sheet — chưa có endpoint/
   sheetId nên KHÔNG bịa ở đây; khi nối thì thay khối lưu
   localStorage bằng lời gọi API Sheet.
   ========================================================== */
(function () {
    'use strict';
    var CFG = window.INVITE || {};
    var $ = function (s, c) { return (c || document).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var LS_KEY = 'vinatrans-2026-rsvp';

    /* ---------- Tên khách: ?ten= trước, rồi ?to= / ?name= ----------
       Giải mã lặp (tối đa 5 lần) vì link qua app nhắn tin hay bị mã hoá 2 lần (%2520).
       Mặc định "Quý khách" — hiện ở mọi .guest-name và prefill form RSVP. ---------- */
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

    /* ---------- Chức vụ khách: ?chucvu= (hoặc ?cv= / ?title=) ----------
       Hiện ở mọi .guest-position dưới tên khách (khối "Trân trọng kính mời").
       Không có tham số → ẩn luôn dòng chức vụ + đường kẻ (không bịa chức vụ mặc định). ---------- */
    (function () {
        var q = new URLSearchParams(location.search);
        var raw = q.get('chucvu') || q.get('cv') || q.get('title');
        var title = '';
        if (raw) {
            var t = raw;
            for (var i = 0; i < 5; i++) {
                try { var dec = decodeURIComponent(t); if (dec === t) break; t = dec; } catch (e) { break; }
            }
            t = t.replace(/\+/g, ' ').trim();
            if (t) title = t.slice(0, 100);
        }
        if (title) {
            $$('.guest-position').forEach(function (el) { el.textContent = title; });
        } else {
            $$('.guest-title').forEach(function (el) { el.style.display = 'none'; });
            $$('.guest-rule').forEach(function (el) { el.style.display = 'none'; });
        }
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

    /* ---------- Reveal khi cuộn ---------- */
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

    /* ---------- Đếm ngược tới 2026-12-25T09:00:00+07:00 ---------- */
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

    /* ---------- Xác nhận tham dự (demo: localStorage) ----------
       2 nút lớn chọn trước → form (tên điền sẵn từ ?ten=, SĐT không
       bắt buộc, ghi chú) → thẻ xác nhận xanh lá / xám kèm tên + giờ
       + địa điểm. Tải lại trang vẫn giữ; nút "Đổi lựa chọn" làm lại. */
    (function () {
        var choiceBox = $('#rsvpChoice');
        var btnYes = $('#btnYes'), btnNo = $('#btnNo');
        var form = $('#rsvpForm'), formChoice = $('#formChoiceText');
        var card = $('#confirmCard'), mark = $('#confirmMark');
        var title = $('#confirmTitle'), cName = $('#confirmName');
        var msg = $('#formMsg'), again = $('#rsvpAgain'), back = $('#rsvpBack');
        if (!choiceBox || !form || !card) return;

        var choice = null; // 'yes' | 'no'

        function showChoice() {
            choice = null;
            [btnYes, btnNo].forEach(function (b) { b.classList.remove('selected'); b.setAttribute('aria-pressed', 'false'); });
            choiceBox.hidden = false;
            form.hidden = true;
            card.hidden = true;
            msg.textContent = '';
            msg.classList.remove('ok');
        }
        function pick(c) {
            choice = c;
            btnYes.classList.toggle('selected', c === 'yes');
            btnNo.classList.toggle('selected', c === 'no');
            btnYes.setAttribute('aria-pressed', c === 'yes' ? 'true' : 'false');
            btnNo.setAttribute('aria-pressed', c === 'no' ? 'true' : 'false');
            formChoice.textContent = c === 'yes'
                ? 'Quý Đại biểu xác nhận: Tham gia hội nghị'
                : 'Quý Đại biểu xác nhận: Không tham gia';
            choiceBox.hidden = true;
            card.hidden = true;
            form.hidden = false;
            msg.textContent = '';
            $('#wName').focus();
        }
        function showCard(saved) {
            var isYes = saved.attend === 'yes';
            card.classList.toggle('declined', !isYes);
            mark.textContent = isYes ? '✓' : '✕';
            title.textContent = isYes ? 'ĐÃ XÁC NHẬN THAM GIA' : 'ĐÃ XÁC NHẬN KHÔNG THAM GIA';
            cName.textContent = saved.name;
            choiceBox.hidden = true;
            form.hidden = true;
            card.hidden = false;
            card.classList.add('in');
        }
        function load() {
            try {
                var raw = localStorage.getItem(LS_KEY);
                return raw ? JSON.parse(raw) : null;
            } catch (e) { return null; }
        }
        function save(data) {
            try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch (e) { /* bỏ qua nếu trình duyệt chặn */ }
        }

        btnYes.addEventListener('click', function () { pick('yes'); });
        btnNo.addEventListener('click', function () { pick('no'); });
        back.addEventListener('click', showChoice);
        again.addEventListener('click', function () {
            try { localStorage.removeItem(LS_KEY); } catch (e) {}
            showChoice();
            choiceBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = $('#wName').value.trim();
            if (!name) { msg.textContent = 'Quý Đại biểu vui lòng cho biết họ tên.'; $('#wName').focus(); return; }
            var data = {
                attend: choice || 'yes',
                name: name,
                phone: $('#wPhone').value.trim(),
                note: $('#wMsg').value.trim(),
                at: new Date().toISOString()
            };
            save(data);
            showCard(data);
            msg.textContent = '';
            msg.classList.add('ok');
            msg.textContent = 'Cảm ơn Quý Đại biểu đã xác nhận.';
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        var saved = load();
        if (saved && saved.name) {
            showCard(saved);
        } else {
            showChoice();
        }
    })();
})();
