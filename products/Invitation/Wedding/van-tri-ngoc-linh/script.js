'use strict';

// ============================================================
// THIỆP HIỆN DẦN TRÊN VIDEO HERO
// ============================================================
var inviteShown = false;
function showInvite() {
  if (inviteShown) return;
  var el = document.getElementById('hero-invite');
  if (!el) return;
  inviteShown = true;
  el.classList.add('is-in');
}

// ============================================================
// MÀN MỞ ĐẦU — bấm là chạy thẳng video hero (không còn video intro riêng)
// ============================================================
(function () {
  var screen   = document.getElementById('intro-screen');
  var mainSite = document.getElementById('main-site');
  var fade     = document.getElementById('intro-fade');
  var hv       = document.getElementById('hero-video');
  if (!screen || !mainSite) return;

  var started = false;

  var unlocked = false;
  function unlock() {
    if (unlocked) return;
    unlocked = true;
    document.body.style.overflow = '';
    showInvite();
    var sb = document.getElementById('scroll-btn');
    if (sb) sb.style.display = 'flex';
    startAutoScroll();
  }

  screen.addEventListener('click', function () {
    if (started) return;
    started = true;

    startBgMusic();

    // hiện thiệp, ẩn màn mở đầu
    mainSite.style.display = 'block';
    mainSite.style.transition = 'none';
    mainSite.getBoundingClientRect();
    mainSite.style.transition = 'opacity 1s ease';
    mainSite.style.opacity = '1';
    screen.classList.add('is-out');
    setTimeout(function () { screen.style.display = 'none'; }, 800);
    if (fade) { fade.style.display = 'none'; }

    startMusicBtn();
    initCountdown();
    initReveal();

    if (!hv) { unlock(); return; }

    // khoá cuộn trong lúc video hero chạy
    document.body.style.overflow = 'hidden';

    hv.play().catch(function () {
      // không phát được -> hiện thiệp ngay, dùng poster làm nền tĩnh
      unlock();
    });

    // thiệp hiện dần khi video sắp hết
    var LEAD = 3.6;
    hv.addEventListener('timeupdate', function () {
      if (hv.duration && hv.currentTime >= hv.duration - LEAD) showInvite();
    });

    hv.addEventListener('ended', unlock, { once: true });

    // phòng khi video treo: vẫn mở khoá sau 12 giây
    setTimeout(unlock, 12000);
  });
})();

// ============================================================
// TỰ CUỘN THIỆP — chạy sau khi mở thiệp, khách chạm vào là dừng hẳn
// ============================================================
var autoScrollId = null;

function stopAutoScroll() {
  if (autoScrollId === null) return;
  cancelAnimationFrame(autoScrollId);
  autoScrollId = null;
}

function startAutoScroll() {
  // tôn trọng thiết lập giảm chuyển động của máy khách
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (autoScrollId !== null) return;

  var SPEED = 70;      // px mỗi giây
  var DELAY = 2600;    // chờ hiệu ứng hiện chữ ở hero xong rồi mới chạy

  // bất kỳ thao tác nào của khách -> dừng, không chạy lại
  var cancelled = false;
  var EVENTS = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
  function bailOut() {
    cancelled = true;              // chặn cả khi khách vuốt trong lúc còn đang chờ
    stopAutoScroll();
    EVENTS.forEach(function (e) { window.removeEventListener(e, bailOut); });
  }
  EVENTS.forEach(function (e) { window.addEventListener(e, bailOut, { passive: true }); });

  setTimeout(function () {
    if (!cancelled && autoScrollId === null) {
      var last = null;
      var pos  = window.scrollY;   // giữ vị trí riêng: CSS có scroll-behavior:smooth,
                                   // đọc window.scrollY ngay sau khi cuộn sẽ ra số cũ
      function step(now) {
        if (last === null) last = now;
        var dt = Math.min((now - last) / 1000, 0.1);   // chặn bước nhảy khi tab bị ẩn
        last = now;

        var max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        pos += SPEED * dt;
        if (pos >= max) {
          window.scrollTo({ top: max, behavior: 'instant' });
          bailOut();
          return;
        }
        window.scrollTo({ top: pos, behavior: 'instant' });
        autoScrollId = requestAnimationFrame(step);
      }
      autoScrollId = requestAnimationFrame(step);
    }
  }, DELAY);
}

// ============================================================
// BACKGROUND MUSIC
// ============================================================
var bgAudio = document.getElementById('bg-music');
var musicBtn = document.getElementById('music-btn');
var iconOn   = document.getElementById('icon-sound-on');
var iconOff  = document.getElementById('icon-sound-off');
var musicStarted = false;

function startBgMusic() {
  if (!bgAudio || musicStarted) return;
  musicStarted = true;
  bgAudio.volume = 0.5;
  bgAudio.play().catch(function () {});
}

function startMusicBtn() {
  if (!musicBtn) return;
  musicBtn.classList.add('visible');
}

if (musicBtn) {
  musicBtn.addEventListener('click', function () {
    if (!bgAudio) return;
    if (bgAudio.paused) {
      bgAudio.play().catch(function () {});
      iconOn.style.display  = '';
      iconOff.style.display = 'none';
    } else {
      bgAudio.pause();
      iconOn.style.display  = 'none';
      iconOff.style.display = '';
    }
  });
}


// ============================================================
// COUNTDOWN
// ============================================================
function initCountdown() {
  var target = new Date('2026-09-20T10:00:00+07:00');

  function pad(n) { return String(Math.floor(n)).padStart(2, '0'); }

  function tick() {
    var diff = target - Date.now();
    if (diff <= 0) {
      ['cd-days','cd-hours','cd-minutes','cd-seconds'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      return;
    }
    var days = document.getElementById('cd-days');
    var hrs  = document.getElementById('cd-hours');
    var mins = document.getElementById('cd-minutes');
    var secs = document.getElementById('cd-seconds');
    if (days) days.textContent = pad(diff / 86400000);
    if (hrs)  hrs.textContent  = pad((diff % 86400000) / 3600000);
    if (mins) mins.textContent = pad((diff % 3600000) / 60000);
    if (secs) secs.textContent = pad((diff % 60000) / 1000);
  }

  tick();
  setInterval(tick, 1000);
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function initReveal() {
  var targets = [];
  var sections = document.querySelectorAll('#main-site section');
  sections.forEach(function (sec, i) {
    if (i === 0) return; // bỏ qua hero
    sec.querySelectorAll('h2, h3, p, img, a[href*="maps"]').forEach(function (el) {
      if (el.src && el.src.indexOf('curtain') !== -1) return; // curtain không fade
      targets.push(el);
    });
    // Card containers
    sec.querySelectorAll('div[class*="rounded-2xl"], div[class*="space-y-"]>div').forEach(function (el) {
      if (!targets.includes(el)) targets.push(el);
    });
  });
  document.querySelectorAll('#main-site footer > div > *').forEach(function (el) {
    targets.push(el);
  });

  targets.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  targets.forEach(function (el) { io.observe(el); });
}

// ============================================================
// CURTAIN ANIMATION
// ============================================================
(function () {
  var left   = document.querySelector('img[src*="curtain-left"]');
  var center = document.querySelector('img[src*="curtain-center"]');
  var right  = document.querySelector('img[src*="curtain-right"]');
  if (!left || !center || !right) return;

  var t = 0;
  function tick() {
    t += 0.014;
    var swing = Math.sin(t) * 1.5;

    var section = left.parentElement;
    var rect = section.getBoundingClientRect();
    var viewH = window.innerHeight;
    // 0 = section chưa vào viewport, 1 = section đã kéo lên hết
    var progress = Math.max(0, Math.min(1, (viewH - rect.top) / (viewH * 0.85)));

    // Ban đầu (progress=0): curtain 2 bên gần giữa (left:-8%)
    // Khi kéo xuống (progress→1): tách ra xa hơn (left:-32%)
    var isMobile = window.innerWidth < 768;
    var posInit  = isMobile ? -20 : 5;
    var posMax   = isMobile ? -30 : -22;
    var fastProgress = Math.min(1, progress * 5);
    var posL = posInit + (posMax - posInit) * fastProgress;
    var posR = posInit + (posMax - posInit) * fastProgress;
    var spread = progress * 4;

    left.style.left    = posL + '%';
    right.style.right  = posR + '%';
    var baseRot = isMobile ? 3 : -0.5;
    left.style.transform   = 'rotate(' + ( baseRot - spread + swing) + 'deg)';
    right.style.transform  = 'rotate(' + (-baseRot + spread - swing) + 'deg)';
    center.style.transform = 'translateX(-50%) rotate(' + (swing * 0.4) + 'deg)';

    requestAnimationFrame(tick);
  }
  tick();
})();

// ============================================================
// SCROLL BUTTON
// ============================================================
(function () {
  var btn = document.getElementById('scroll-btn');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var target = document.getElementById('with-love') || document.getElementById('countdown');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
})();

// ============================================================
// GUEST COUNT +/-
// ============================================================
(function () {
  var minus   = document.getElementById('guest-minus');
  var plus    = document.getElementById('guest-plus');
  var display = document.getElementById('guest-count-display');
  var input   = document.getElementById('guest-count');
  if (!minus || !plus) return;
  var count = 1;

  function update() {
    display.textContent = count;
    input.value = count;
    minus.disabled = count <= 1;
  }

  minus.addEventListener('click', function () { if (count > 1) { count--; update(); } });
  plus.addEventListener('click',  function () { count++; update(); });
  update();
})();

// ============================================================
// RADIO / CHECKBOX GIẢ (markup tĩnh) — cho phép bấm chọn
// ============================================================
(function () {
  var DOT = '<span data-state="checked" class="flex items-center justify-center">'
    + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"'
    + ' stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
    + ' class="lucide lucide-circle h-2.5 w-2.5 fill-current text-current"><circle cx="12" cy="12" r="10"></circle></svg></span>';

  document.querySelectorAll('[role="radiogroup"]').forEach(function (group) {
    var btns = Array.prototype.slice.call(group.querySelectorAll('button[role="radio"]'));
    if (!btns.length) return;

    function select(btn) {
      btns.forEach(function (b) {
        var on = (b === btn);
        b.setAttribute('aria-checked', on ? 'true' : 'false');
        b.setAttribute('data-state', on ? 'checked' : 'unchecked');
        b.innerHTML = on ? DOT : '';
        var input = b.parentElement.querySelector('input[type="radio"]');
        if (input) {
          input.checked = on;
          if (on) input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    }

    btns.forEach(function (b) {
      var row = b.parentElement;
      row.style.cursor = 'pointer';
      row.addEventListener('click', function (e) {
        e.preventDefault();
        select(b);
      });
    });
  });
})();

// ============================================================
// LỜI CHÚC + XÁC NHẬN THAM DỰ  ->  Google Sheet (sheet_id = khach_27)
// Gộp 1 nút submit duy nhất: vừa gửi lời chúc vừa xác nhận tham dự.
// ============================================================
(function () {
  var SHEET_ID = 'khach_27';

  var form = document.getElementById('rsvpForm');
  if (!form) return;
  var btn  = document.getElementById('rvBtn');
  var note = document.getElementById('rvNote');

  function say(msg, cls) {
    if (!note) return;
    note.textContent = msg;
    note.className = 'rv-note ' + cls;
    note.style.display = '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = (document.getElementById('rvName').value || '').trim();
    var msg  = (document.getElementById('rvMsg').value  || '').trim();
    var going = document.getElementById('rvGo').checked;

    if (!name) { say('Kính mong Quý vị nhập họ và tên.', 'err'); return; }
    if (!msg)  { say('Kính mong Quý vị gửi đôi lời chúc.', 'err'); return; }

    if (typeof sheetsAPI === 'undefined') { say('Không kết nối được máy chủ. Vui lòng thử lại.', 'err'); return; }

    btn.disabled = true;
    btn.textContent = 'Đang gửi…';
    if (note) note.style.display = 'none';

    // Sheet khach_27 dùng 4 cột: A=họ tên, B=lời chúc, C=tham dự, D=thời gian
    var attend = going ? 'Tôi sẽ tham dự' : 'Rất tiếc tôi bận mất rồi';

    sheetsAPI.post(SHEET_ID, {
      A: name,
      B: msg,
      C: attend,
      D: new Date().toISOString()
    }).then(function () {
      form.reset();
      btn.textContent = 'Đã gửi — cảm ơn Quý vị!';
      say(going
        ? 'Cảm ơn Quý vị. Hẹn gặp trong ngày vui của chúng tôi!'
        : 'Cảm ơn Quý vị đã gửi lời chúc đến chúng tôi.', 'ok');
      setTimeout(function () {
        btn.disabled = false;
        btn.textContent = 'Gửi lời chúc';
      }, 3000);
    }).catch(function () {
      btn.disabled = false;
      btn.textContent = 'Gửi lời chúc';
      say('Gửi chưa thành công, Quý vị vui lòng thử lại.', 'err');
    });
  });
})();
