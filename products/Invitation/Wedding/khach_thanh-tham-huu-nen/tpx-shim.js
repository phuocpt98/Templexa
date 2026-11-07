/* Templexa — thay phần máy chủ của bộ thiệp builder (view.js) bằng lưu trên máy khách (localStorage).
   port.js chèn file này TRƯỚC view.js.
   - fetch php/rsvp.php, php/message.php → lưu localStorage, trả {status:'ok'} (view.js tự hiện popup cảm ơn)
   - #MessageBox: hiện lời chúc đã gửi (chế độ "tất cả mọi người")
   - widget ký tên #wb-sig-root: ký → Chỉnh vị trí (kéo thả trên ảnh) → Lưu
   - chữ ký: lưu localStorage + gửi 1 dòng lên Google Sheet (tab INVITE_SLUG, Loại 'Chữ ký');
     lúc tải thiệp đọc lại các dòng 'Chữ ký' từ Sheet để mọi người thấy chữ ký của nhau */
(function () {
  'use strict';
  var KEY = window.TPX_KEY || 'tpx';
  var store = {
    get: function (k) { try { return JSON.parse(localStorage.getItem(KEY + '_' + k) || '[]'); } catch (e) { return []; } },
    set: function (k, v) { try { localStorage.setItem(KEY + '_' + k, JSON.stringify(v)); } catch (e) {} }
  };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function toast(msg) {
    var t = document.createElement('div'); t.className = 'tpx-toast'; t.textContent = msg;
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2600);
  }
  var css = document.createElement('style');
  css.textContent = '.tpx-toast{position:fixed;left:50%;bottom:80px;transform:translateX(-50%);z-index:99999;background:rgba(40,40,40,.92);color:#fff;font:14px system-ui,sans-serif;padding:10px 16px;border-radius:20px;max-width:90vw;text-align:center}'
    + '.tpx-wish{margin:0 0 12px;padding:14px 16px;background:rgba(255,255,255,.8);border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.06);text-align:left;white-space:pre-line}'
    + '.tpx-wish b{display:block;margin-bottom:6px}'
    + '#wb-sig-display-inner .wb-sig-item{position:absolute;width:30%;height:auto;opacity:1}'
    + '#wb-sig-display-inner .sig-new{outline:1px dashed rgba(255,255,255,.9);cursor:move;z-index:3;pointer-events:auto}'
    + '.wb-sig-name{font:11px/1.35 system-ui,sans-serif;color:#8a6d1f;text-align:center;margin-top:2px;text-shadow:0 1px 2px rgba(255,255,255,.85);word-break:break-word}';
  document.head.appendChild(css);

  // ---- 1. Gửi xác nhận / lời chúc
  var realFetch = window.fetch;
  window.fetch = function (u, o) {
    var m = /\/php\/(rsvp|message)\.php/.exec(String(u));
    if (!m) return realFetch.apply(this, arguments);
    var rec = { t: Date.now() };
    if (o && o.body && o.body.forEach) o.body.forEach(function (v, k) { rec[k] = v; });
    var kind = m[1] === 'rsvp' ? 'rsvp' : 'wishes';
    var list = store.get(kind); list.push(rec); store.set(kind, list);
    if (kind === 'wishes') setTimeout(renderWishes, 0);
    return Promise.resolve(new Response(JSON.stringify({ status: 'ok' }), { headers: { 'Content-Type': 'application/json' } }));
  };

  // ---- 2. Danh sách lời chúc
  function renderWishes() {
    var box = $('#MessageBox'); if (!box) return;
    var list = store.get('wishes').filter(function (w) { return !/private|rieng|chỉ/i.test(w.visibility || ''); });
    if (!list.length) return;
    var ph = $('#MessageBox-placeholder'); if (ph) ph.style.display = 'none';
    Array.prototype.slice.call(box.querySelectorAll('.tpx-wish')).forEach(function (x) { x.remove(); });
    list.slice().reverse().forEach(function (w) {
      var d = document.createElement('div'); d.className = 'tpx-wish';
      var b = document.createElement('b'); b.textContent = w.name || 'Khách mời';
      var p = document.createElement('span'); p.textContent = w.message || '';
      d.appendChild(b); d.appendChild(p); box.appendChild(d);
    });
  }

  // ---- 3. Widget ký tên
  function initSig() {
    var root = $('#wb-sig-root'), cv = $('#wb-sig-canvas'), board = $('#wb-sig-display-inner');
    if (!root || !cv || !board) return;
    var pad = $('#wb-sig-pad'), posBtns = $('#wb-sig-pos-btns'), openRow = $('#wb-sig-btn-row');
    var show = function (e, on, d) { if (e) e.style.display = on ? (d || 'block') : 'none'; };
    var ctx = cv.getContext('2d'), drawing = false, last = null, lw = 2, preview = null;
    var ink = window.colorSignature || '#333';
    var fit = function () { if (cv.clientWidth && cv.width !== cv.clientWidth) cv.width = cv.clientWidth; };
    var pt = function (e) {
      var r = cv.getBoundingClientRect(), t = e.touches ? e.touches[0] : e;
      return { x: (t.clientX - r.left) * cv.width / r.width, y: (t.clientY - r.top) * cv.height / r.height, t: Date.now() };
    };
    var down = function (e) { e.preventDefault(); drawing = true; last = pt(e); };
    var move = function (e) {
      if (!drawing) return; e.preventDefault();
      var p = pt(e), v = Math.hypot(p.x - last.x, p.y - last.y) / Math.max(1, p.t - last.t);
      lw = lw * 0.6 + (Math.max(1, Math.min(5, 7 - v * 0.2)) + 1.5) * 0.4;
      ctx.lineWidth = lw; ctx.lineCap = ctx.lineJoin = 'round'; ctx.strokeStyle = ink;
      ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke(); last = p;
    };
    var up = function () { drawing = false; };
    cv.addEventListener('mousedown', down); cv.addEventListener('mousemove', move); window.addEventListener('mouseup', up);
    cv.addEventListener('touchstart', down, { passive: false }); cv.addEventListener('touchmove', move, { passive: false }); cv.addEventListener('touchend', up);
    var hasInk = function () {
      var d = ctx.getImageData(0, 0, cv.width, cv.height).data;
      for (var i = 3; i < d.length; i += 4) if (d[i] > 20) return true;
      return false;
    };
    var drag = function (el) {
      var sx, sy, ox, oy, on = false;
      var d = function (e) { e.preventDefault(); on = true; var t = e.touches ? e.touches[0] : e; sx = t.clientX; sy = t.clientY; ox = parseFloat(el.style.left); oy = parseFloat(el.style.top); };
      var m = function (e) {
        if (!on) return; e.preventDefault();
        var t = e.touches ? e.touches[0] : e, r = board.getBoundingClientRect();
        el.style.left = Math.max(0, Math.min(70, ox + (t.clientX - sx) / r.width * 100)) + '%';
        el.style.top = Math.max(0, Math.min(90, oy + (t.clientY - sy) / r.height * 100)) + '%';
      };
      var u = function () { on = false; };
      el.addEventListener('mousedown', d); window.addEventListener('mousemove', m); window.addEventListener('mouseup', u);
      el.addEventListener('touchstart', d, { passive: false }); window.addEventListener('touchmove', m, { passive: false }); window.addEventListener('touchend', u);
    };
    var addImg = function (src, x, y) {
      var im = document.createElement('img'); im.className = 'wb-sig-item'; im.alt = ''; im.src = src;
      im.style.left = x + '%'; im.style.top = y + '%'; board.appendChild(im); return im;
    };
    store.get('signatures').forEach(function (s) {
      var im = addImg(s.image, s.x, s.y);
      if (s.posted) im.setAttribute('data-posted', s.posted);
    });

    // ---- 3a. Đồng bộ chữ ký lên Google Sheet (tab INVITE_SLUG) + load ngược lại
    var fmtPct = function (v) { return String(Math.round(v * 10) / 10); };
    var guestNameForSig = function () {
      if (window.GUEST_NAME_EXPLICIT && window.GUEST_NAME) return window.GUEST_NAME;
      var inp = document.querySelector('#RSVP_TD input[name="name"], .wb-rsvp-form input[name="name"]');
      if (inp && inp.value && inp.value.trim()) return inp.value.trim();
      return 'Khách mời';
    };
    // Thu nhỏ dataURL PNG tới khi vừa ô Sheet (tối đa 50.000 ký tự; giữ biên 40.000).
    // Phải gọi TRƯỚC khi xoá canvas ở bước lưu.
    var downscaleSig = function (maxLen) {
      var scales = [1, 0.66, 0.5], url = '';
      for (var i = 0; i < scales.length; i++) {
        var s = scales[i];
        if (s === 1) { url = cv.toDataURL('image/png'); }
        else {
          var c = document.createElement('canvas');
          c.width = Math.max(1, Math.round(cv.width * s));
          c.height = Math.max(1, Math.round(cv.height * s));
          c.getContext('2d').drawImage(cv, 0, 0, c.width, c.height);
          url = c.toDataURL('image/png');
        }
        if (url.length <= maxLen) return url;
      }
      return url;
    };
    var SIG_TOAST_OK = 'Chữ ký của bạn đã được lưu trên thiệp!';
    var SIG_TOAST_LOCAL = 'Đã lưu trên máy bạn (chưa gửi lên được, kiểm tra mạng rồi ký lại nhé)';
    var postSigToSheet = function (sheetImg, x, y) {
      if (!window.sheetsAPI || !window.INVITE_SLUG) { toast(SIG_TOAST_LOCAL); return; }
      // Thu nhỏ tới 0.5 mà vẫn quá 40.000 ký tự thì không gửi (ô Sheet tối đa 50.000)
      // để khỏi ghi dòng lỗi — chữ ký vẫn nằm trong localStorage, toast báo rõ.
      if (!sheetImg || sheetImg.length > 40000) { toast(SIG_TOAST_LOCAL); return; }
      var done = false;
      var finish = function (ok) { if (done) return; done = true; toast(ok ? SIG_TOAST_OK : SIG_TOAST_LOCAL); };
      try {
        var p = window.sheetsAPI.post(window.INVITE_SLUG, {
          A: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
          B: 'Chữ ký',
          C: guestNameForSig(),
          D: '',
          E: fmtPct(x) + '|' + fmtPct(y),
          F: sheetImg,
          G: 'all'
        });
        if (p && p.then) {
          p.then(function (res) { finish(res && (res.status === 'success' || res.status === 'ok')); })
           .catch(function () { finish(false); });
        } else { finish(false); }
      } catch (e) { finish(false); }
      // Post treo quá lâu thì vẫn báo đã lưu local, không để mất toast.
      setTimeout(function () { finish(false); }, 8000);
    };
    var parseSigXY = function (e) {
      var d = { x: 35, y: 40 };
      if (e) {
        // Tách bằng | (định dạng hiện tại). Chấp nhận cả , và ; để tương thích
        // ngược — riêng ',' đã từng bị Sheets hiểu thành dấu thập phân (35,40 -> 35,4).
        var p = String(e).split(/[|,;]/);
        var x = parseFloat(p[0]), y = parseFloat(p[1]);
        if (!isNaN(x) && x >= 0 && x <= 100) d.x = x;
        if (!isNaN(y) && y >= 0 && y <= 100) d.y = y;
      }
      return d;
    };
    var addRemoteSig = function (r) {
      var xy = parseSigXY(r.E);
      var wrap = document.createElement('div');
      wrap.className = 'wb-sig-item';
      wrap.style.left = xy.x + '%'; wrap.style.top = xy.y + '%';
      var im = document.createElement('img'); im.alt = ''; im.src = r.F;
      wrap.appendChild(im);
      if (r.C) {
        var nm = document.createElement('div'); nm.className = 'wb-sig-name'; nm.textContent = r.C;
        wrap.appendChild(nm);
      }
      board.appendChild(wrap);
      return wrap;
    };
    var loadRemoteSigs = function () {
      if (!window.sheetsAPI || !window.INVITE_SLUG) return;
      window.sheetsAPI.get(window.INVITE_SLUG).then(function (rows) {
        var list = (rows || []).filter(function (r) {
          return r && r.B === 'Chữ ký' && r.F && String(r.F).indexOf('data:image/') === 0;
        });
        if (!list.length) return;
        var remoteImgs = {};
        list.forEach(function (r) { remoteImgs[r.F] = true; });
        // Chống trùng: ảnh local nào đã có trên Sheet thì gỡ bản local,
        // vẽ lại bản Sheet (kèm tên người ký) để mỗi chữ ký chỉ hiện 1 lần.
        // (So cả src gốc lẫn bản đã thu nhỏ lúc gửi — data-posted.)
        // Trừ .sig-new đang ký dở để không phá luồng ký hiện tại.
        Array.prototype.slice.call(board.querySelectorAll('img.wb-sig-item:not(.sig-new)')).forEach(function (im) {
          if (remoteImgs[im.getAttribute('src')] || remoteImgs[im.getAttribute('data-posted')]) im.remove();
        });
        var seen = {};
        list.forEach(function (r) {
          if (seen[r.F]) return; seen[r.F] = true;
          addRemoteSig(r);
        });
      }).catch(function () { /* mất mạng: giữ nguyên chữ ký local */ });
    };
    loadRemoteSigs();

    var clear = function () { ctx.clearRect(0, 0, cv.width, cv.height); if (preview) { preview.remove(); preview = null; } };
    var bind = function (id, fn) { var b = document.getElementById(id); if (b) b.addEventListener('click', function (e) { e.preventDefault(); fn(); }); };
    bind('wb-sig-open-btn', function () { show(pad, true); show(openRow, false); fit(); });
    bind('wb-sig-btn-clear', clear);
    bind('wb-sig-btn-cancel', function () { clear(); show(pad, false); show(openRow, true, 'flex'); });
    bind('wb-sig-btn-pos', function () {
      if (!hasInk()) { toast('Bạn ký tên vào khung trước nhé!'); return; }
      if (!preview) { preview = addImg('', 35, 40); preview.classList.add('sig-new'); drag(preview); }
      preview.src = cv.toDataURL('image/png');
      show(pad, false); show(posBtns, true, 'flex');
      board.scrollIntoView({ behavior: 'smooth', block: 'center' });
      toast('Kéo chữ ký tới chỗ bạn thích rồi bấm Lưu');
    });
    bind('wb-sig-btn-back', function () { show(posBtns, false); show(pad, true); });
    bind('wb-sig-btn-save', function () {
      if (!preview) return;
      var img = preview.src, x = parseFloat(preview.style.left), y = parseFloat(preview.style.top);
      var sheetImg = downscaleSig(40000); // phải chạy trước khi xoá canvas
      var list = store.get('signatures');
      // Chỉ lưu 'posted' khi ảnh gửi được (<=40.000 ký tự): nó dùng để chống trùng
      // với dòng Sheet khi ảnh đã thu nhỏ khác ảnh gốc. Quá lớn thì không gửi nên
      // không cần giữ chuỗi dài vô ích trong localStorage.
      list.push({ image: img, x: x, y: y, posted: (sheetImg && sheetImg.length <= 40000) ? sheetImg : '' });
      store.set('signatures', list);
      preview.classList.remove('sig-new'); preview = null;
      ctx.clearRect(0, 0, cv.width, cv.height);
      show(posBtns, false); show(openRow, true, 'flex');
      postSigToSheet(sheetImg, x, y);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { renderWishes(); initSig(); });
  else { renderWishes(); initSig(); }
})();
