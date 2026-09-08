/*
 * ============================================================
 * TEMPLEXA — Template "Vintage Film" (runtime dùng chung)
 * ------------------------------------------------------------
 * Thay cho jQuery + Masonry + imagesLoaded + WOW.js + Bootstrap JS
 * của bản gốc (~170KB) bằng ~7KB vanilla.
 *
 * Nạp CUỐI <body>:
 *   <script src="../../../shared/wedding/tpl-vintage-film/theme.js"></script>
 *
 * Cấu hình riêng từng thiệp: đặt window.TPL_CONFIG TRƯỚC thẻ script này.
 *   window.TPL_CONFIG = {
 *     sheetId: 'khach_28',            // sheet nhận lời chúc + xác nhận tham dự
 *     countdown: '19-09-2026 11:00',  // dd-mm-yyyy HH:mm
 *     calendar:  '19-09-2026',        // ngày tô tim trong lịch
 *     calendarExtra: ['20-09-2026'],  // ngày phụ (tim mờ)
 *   };
 *
 * Các khối đều tuỳ chọn — thiếu phần tử nào thì bỏ qua phần đó.
 * ============================================================ */
(function () {
  'use strict';

  var CFG = window.TPL_CONFIG || {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- 1. Bộ icon SVG (thay bootstrap-icons 434KB) ---------- */
  var SPRITE =
    '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">' +
    '<symbol id="ic-geo" viewBox="0 0 16 16"><path fill="currentColor" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/></symbol>' +
    '<symbol id="ic-heart" viewBox="0 0 16 16"><path fill="currentColor" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/></symbol>' +
    '<symbol id="ic-gift" viewBox="0 0 16 16"><path fill="currentColor" d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A3 3 0 0 1 3 2.506zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43zM9 3h2.932c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0zm6 4v-.5H9V7zm-8 0V6.5H1V7zm0 1H2v6.5a.5.5 0 0 0 .5.5H7zm2 7h4.5a.5.5 0 0 0 .5-.5V8H9z"/></symbol>' +
    '<symbol id="ic-send" viewBox="0 0 16 16"><path fill="currentColor" d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083z"/></symbol>' +
    '<symbol id="ic-check" viewBox="0 0 16 16"><path fill="currentColor" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></symbol>' +
    '<symbol id="ic-check-circle" viewBox="0 0 16 16"><path fill="currentColor" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></symbol>' +
    '<symbol id="ic-cal-check" viewBox="0 0 16 16"><path fill="currentColor" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/><path fill="currentColor" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/></symbol>' +
    '<symbol id="ic-chat-heart" viewBox="0 0 16 16"><path fill="currentColor" d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 2.826-.83A9 9 0 0 0 8 15"/><path fill="#fff" d="M8 5.4c1.5-1.55 5.25 1.16 0 4.65-5.25-3.49-1.5-6.2 0-4.65"/></symbol>' +
    '<symbol id="ic-music" viewBox="0 0 16 16"><path fill="currentColor" d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.895 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2"/><path fill="currentColor" fill-rule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z"/><path fill="currentColor" d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z"/></symbol>' +
    '<symbol id="ic-hourglass" viewBox="0 0 16 16"><path fill="currentColor" d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1z"/></symbol>' +
    '</svg>';
  document.body.insertAdjacentHTML('afterbegin', SPRITE);

  /* ---------- 2. Hiệu ứng cuộn (thay WOW.js) ---------- */
  (function reveal() {
    var els = $$('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.02 });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- 3. Màn mở thiệp ---------- */
  (function opening() {
    var sides = $('#card-opening-sides');
    if (!sides) return;
    document.addEventListener('click', function open() {
      sides.classList.add('_animating');
      setTimeout(function () {
        sides.style.pointerEvents = 'none';
        setTimeout(function () { sides.style.display = 'none'; }, 4000);
      }, 500);
    }, { once: true });
  })();

  /* ---------- 4. Nhạc nền ---------- */
  (function audio() {
    var el = $('#bgAudio');
    var btn = $('#audioToggleBtn');
    if (!el || !btn) return;
    el.volume = 0.3;
    var playing = false;
    function play() {
      return el.play().then(function () { playing = true; btn.classList.add('playing'); });
    }
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (playing) { el.pause(); playing = false; btn.classList.remove('playing'); }
      else { play().catch(function () {}); }
    });
    document.addEventListener('click', function start() {
      if (!playing) play().catch(function () {});
    }, { once: true });
  })();

  /* ---------- 5. Đếm ngược ---------- */
  (function countdown() {
    var root = $('#countdown');
    if (!root) return;
    var raw = CFG.countdown || root.getAttribute('data-date') || '';
    var m = raw.match(/(\d{1,2})-(\d{1,2})-(\d{4})(?:\s+(\d{1,2}):(\d{2}))?/);
    if (!m) return;
    var target = new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0));
    var boxes = $$('[data-countdown]', root);
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function tick() {
      var diff = target - new Date();
      if (diff < 0) diff = 0;
      var v = {
        days: Math.floor(diff / 86400000),
        hours: Math.floor(diff % 86400000 / 3600000),
        minutes: Math.floor(diff % 3600000 / 60000),
        seconds: Math.floor(diff % 60000 / 1000)
      };
      boxes.forEach(function (el) { el.textContent = pad(v[el.getAttribute('data-countdown')] || 0); });
    }
    tick();
    setInterval(tick, 1000);
  })();

  /* ---------- 6. Lịch tháng cưới ---------- */
  (function calendar() {
    var root = $('#mini-calendar');
    if (!root) return;
    var m = (CFG.calendar || root.getAttribute('data-date') || '').match(/(\d{1,2})-(\d{1,2})-(\d{4})/);
    if (!m) return;
    var day = +m[1], month = +m[2], year = +m[3];
    var extra = (CFG.calendarExtra || []).map(function (s) {
      var e = s.match(/(\d{1,2})-(\d{1,2})-(\d{4})/);
      return e && +e[2] === month && +e[3] === year ? +e[1] : 0;
    }).filter(Boolean);

    var first = new Date(year, month - 1, 1).getDay();      // 0 = CN
    var startCol = (first + 6) % 7;                          // cột 0 = T2
    var total = new Date(year, month, 0).getDate();
    var heart = '<span class="heart"><svg><use href="#ic-heart"></use></svg></span>';

    var html = '<table><tbody><tr><th>T2</th><th>T3</th><th>T4</th><th>T5</th><th>T6</th><th>T7</th><th>CN</th></tr><tr>';
    for (var i = 0; i < startCol; i++) html += '<td>&nbsp;</td>';
    for (var d = 1; d <= total; d++) {
      var col = (startCol + d - 1) % 7;
      if (d > 1 && col === 0) html += '</tr><tr>';
      if (d === day) html += '<td><div class="today main">' + heart + '<span class="day">' + d + '</span></div></td>';
      else if (extra.indexOf(d) > -1) html += '<td><div class="today extra">' + heart + '<span class="day">' + d + '</span></div></td>';
      else html += '<td>' + d + '</td>';
    }
    var last = (startCol + total - 1) % 7;
    for (var j = last + 1; j < 7; j++) html += '<td>&nbsp;</td>';
    root.innerHTML = html + '</tr></tbody></table>';
  })();

  /* ---------- 7. Modal (mừng cưới) ---------- */
  (function modal() {
    function close(el) { el.classList.remove('open'); document.body.style.overflow = ''; }
    $$('[data-modal-open]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var target = $('#' + btn.getAttribute('data-modal-open'));
        if (!target) return;
        target.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    $$('.tx-modal').forEach(function (el) {
      el.addEventListener('click', function (e) {
        if (e.target === el || e.target.closest('.tx-modal-close')) close(el);
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') $$('.tx-modal.open').forEach(close);
    });
  })();

  /* ---------- 8. Xem ảnh phóng to (thay PhotoSwipe) ---------- */
  (function lightbox() {
    var photos = $$('.photo-grid .photo');
    if (!photos.length) return;
    var box = document.createElement('div');
    box.className = 'tx-lightbox';
    box.innerHTML = '<img alt="">';
    document.body.appendChild(box);
    var img = box.firstChild;
    photos.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        img.src = a.getAttribute('href') || $('img', a).src;
        box.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    box.addEventListener('click', function () {
      box.classList.remove('open');
      document.body.style.overflow = '';
    });
  })();

  /* ---------- 9. Sổ lưu bút — 1 nút gửi (lời chúc + xác nhận tham dự) ---------- */
  (function rsvp() {
    var form = $('#commentForm');
    if (!form || typeof sheetsAPI === 'undefined') return;
    var btn = $('#submitBtn', form);
    var out = $('#formMsg', form);
    var label = btn ? btn.innerHTML : '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameEl = $('#fullname', form);
      var msgEl = $('#comment', form);
      var attend = $('#attendingCheck', form);
      var name = nameEl.value.trim();
      var msg = msgEl.value.trim();
      if (!name) { nameEl.focus(); if (out) out.textContent = 'Bạn cho tụi mình xin tên với nhé!'; return; }
      if (!msg) { msgEl.focus(); if (out) out.textContent = 'Bạn viết vài dòng gửi cô dâu chú rể nhé!'; return; }

      btn.disabled = true;
      btn.innerHTML = '<svg><use href="#ic-hourglass"></use></svg> Đang gửi...';
      if (out) out.textContent = '';

      var now = new Date();
      var time = now.toLocaleDateString('vi-VN') + ' ' + now.toLocaleTimeString('vi-VN');
      var fullMsg = msg + (attend && attend.checked ? ' ✅ Xác nhận tham dự' : '');

      sheetsAPI.post(CFG.sheetId, { A: name, B: fullMsg, C: time }).then(function () {
        btn.innerHTML = '<svg><use href="#ic-check-circle"></use></svg> Đã gửi!';
        if (out) out.textContent = attend && attend.checked
          ? 'Cảm ơn bạn! Tụi mình đã nhận được lời chúc và xác nhận tham dự.'
          : 'Cảm ơn bạn đã gửi lời chúc tới tụi mình!';
        nameEl.value = '';
        msgEl.value = '';
        if (attend) attend.checked = false;
        setTimeout(function () { btn.disabled = false; btn.innerHTML = label; }, 2500);
      }).catch(function () {
        btn.disabled = false;
        btn.innerHTML = label;
        if (out) out.textContent = 'Gửi chưa thành công, bạn thử lại giúp mình nhé!';
      });
    });
  })();
})();
