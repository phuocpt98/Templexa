/*
 * ============================================
 * TEMPLEXA — Wedding Component Library (JS)
 * ============================================
 * Thư viện JS components dùng chung cho thiệp cưới.
 * Mỗi code.html tự chứa (self-contained) — copy function cần dùng vào <script>.
 *
 * Mục lục:
 *   1. ENVELOPE — Mở phong bì
 *   2. COUNTDOWN — Đếm ngược ngày cưới
 *   3. MUSIC TOGGLE — Nhạc nền
 *   4. FALLING EFFECTS — Hoa rơi, confetti, sparkles, hearts, lá, tuyết
 *   5. GALLERY LIGHTBOX — Xem ảnh phóng to
 *   6. GUESTBOOK — Sổ lưu bút (localStorage)
 *   7. RSVP FORM — Xác nhận tham dự
 *   8. CALENDAR EXPORT — Tạo file .ics
 *   9. GIFT BOX — Copy số tài khoản
 *  10. SCROLL REVEAL — IntersectionObserver
 *  11. SMOOTH SCROLL — Nav links
 *  12. NAVBAR — Sticky + active on scroll
 *  13. GOOGLE SHEETS API — Transport layer gửi/đọc dữ liệu (file riêng: wishes-api.js)
 *  14. FLOATING WISHES — Bong bóng lời chúc bay lên (dùng với sheetsAPI)
 * ============================================
 */


/* ============================================
   1. ENVELOPE — Mở phong bì
   Click nút → ẩn envelope, hiện nội dung, bật nhạc
   ============================================ */

// --- Variant A: Fade out overlay ---
function initEnvelope() {
    const envelope = document.getElementById('envelope');
    const openBtn = document.getElementById('envelopeOpenBtn');
    const bgMusic = document.getElementById('bgMusic');

    if (!envelope || !openBtn) return;

    openBtn.addEventListener('click', () => {
        envelope.classList.add('opened');
        // Bật nhạc khi mở thiệp
        if (bgMusic) {
            bgMusic.volume = 0.3;
            bgMusic.play().catch(() => {});
        }
        // Xoá envelope khỏi DOM sau animation
        setTimeout(() => {
            envelope.style.display = 'none';
            document.body.style.overflow = '';
        }, 800);
    });

    // Khoá scroll khi envelope đang hiện
    document.body.style.overflow = 'hidden';
}

// --- Variant B: Card flip ---
function initEnvelopeCard() {
    const envelope = document.getElementById('envelope');
    const openBtn = document.getElementById('envelopeOpenBtn');
    const bgMusic = document.getElementById('bgMusic');

    if (!envelope || !openBtn) return;

    openBtn.addEventListener('click', () => {
        envelope.classList.add('opened');
        if (bgMusic) {
            bgMusic.volume = 0.3;
            bgMusic.play().catch(() => {});
        }
        setTimeout(() => {
            envelope.style.display = 'none';
            document.body.style.overflow = '';
        }, 600);
    });

    document.body.style.overflow = 'hidden';
}

// --- Variant C: Phong bì truyền thống (nắp gập) ---
function initEnvelopeTraditional() {
    const envelope = document.getElementById('envelope');
    const openBtn = document.getElementById('envelopeOpenBtn');
    const bgMusic = document.getElementById('bgMusic');

    if (!envelope || !openBtn) return;

    openBtn.addEventListener('click', () => {
        // Bước 1: Mở nắp
        envelope.classList.add('opening');
        // Bước 2: Sau 1s, fade out toàn bộ
        setTimeout(() => {
            envelope.classList.add('opened');
            if (bgMusic) {
                bgMusic.volume = 0.3;
                bgMusic.play().catch(() => {});
            }
        }, 1000);
        setTimeout(() => {
            envelope.style.display = 'none';
            document.body.style.overflow = '';
        }, 1800);
    });

    document.body.style.overflow = 'hidden';
}


/* ============================================
   2. COUNTDOWN — Đếm ngược ngày cưới
   Realtime, cập nhật mỗi giây
   ============================================ */

// --- Cơ bản: cập nhật 4 số ---
function initCountdown(weddingDateStr) {
    // weddingDateStr format: 'YYYY-MM-DDTHH:mm:ss' hoặc 'YYYY-MM-DD'
    const weddingDate = new Date(weddingDateStr).getTime();

    function update() {
        const now = new Date().getTime();
        const diff = weddingDate - now;

        if (diff <= 0) {
            const container = document.querySelector('.countdown, .countdown-cards, .countdown-circles');
            if (container) {
                container.innerHTML = '<div class="countdown-done">🎉 Hôn lễ đã diễn ra! 🎉</div>';
            }
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const el = (id) => document.getElementById(id);
        if (el('days')) el('days').textContent = String(days).padStart(2, '0');
        if (el('hours')) el('hours').textContent = String(hours).padStart(2, '0');
        if (el('minutes')) el('minutes').textContent = String(minutes).padStart(2, '0');
        if (el('seconds')) el('seconds').textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

// --- Variant: Flip animation (số lật) ---
function initCountdownFlip(weddingDateStr) {
    const weddingDate = new Date(weddingDateStr).getTime();
    let prevValues = { days: '', hours: '', minutes: '', seconds: '' };

    function update() {
        const now = new Date().getTime();
        const diff = weddingDate - now;

        if (diff <= 0) {
            const container = document.querySelector('.countdown');
            if (container) container.innerHTML = '<div class="countdown-done">🎉 Hôn lễ đã diễn ra! 🎉</div>';
            return;
        }

        const values = {
            days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
            hours: String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
            minutes: String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
            seconds: String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0'),
        };

        Object.keys(values).forEach(key => {
            const el = document.getElementById(key);
            if (el && values[key] !== prevValues[key]) {
                el.style.animation = 'none';
                el.offsetHeight; // trigger reflow
                el.style.animation = 'flip-number 0.4s ease';
                el.textContent = values[key];
            }
        });

        prevValues = { ...values };
    }

    update();
    setInterval(update, 1000);
}
// CSS cho flip: @keyframes flip-number { 0% { transform: rotateX(90deg); } 100% { transform: rotateX(0); } }


/* ============================================
   3. MUSIC TOGGLE — Nhạc nền
   Click bật/tắt, volume 30%, loop
   ============================================ */

// --- Cơ bản: icon toggle ---
function initMusicToggle() {
    const musicBtn = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    if (!musicBtn || !bgMusic) return;

    bgMusic.volume = 0.3;
    let musicStarted = false;

    musicBtn.addEventListener('click', () => {
        if (!musicStarted) {
            bgMusic.play().then(() => {
                musicStarted = true;
                musicBtn.classList.remove('muted');
            }).catch(() => {});
        } else if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.classList.remove('muted');
        } else {
            bgMusic.pause();
            musicBtn.classList.add('muted');
        }
    });
}

// --- Variant: Spinning disc (đĩa quay) ---
function initMusicDisc() {
    const disc = document.getElementById('musicDisc');
    const bgMusic = document.getElementById('bgMusic');
    if (!disc || !bgMusic) return;

    bgMusic.volume = 0.3;
    let musicStarted = false;

    disc.addEventListener('click', () => {
        if (!musicStarted) {
            bgMusic.play().then(() => {
                musicStarted = true;
                disc.classList.add('playing');
            }).catch(() => {});
        } else if (bgMusic.paused) {
            bgMusic.play();
            disc.classList.add('playing');
        } else {
            bgMusic.pause();
            disc.classList.remove('playing');
        }
    });
}

// --- Auto-play khi mở envelope (gọi từ initEnvelope) ---
// Nhạc tự bật khi click "Mở thiệp", không cần click nút nhạc riêng
// Xem initEnvelope() — đã tích hợp bgMusic.play()


/* ============================================
   3b. WISHES TOGGLE — Nút tắt/bật hiển thị lời chúc bay
   Đặt bên trên nút nhạc. Click → ẩn/hiện floating wishes.
   ============================================ */

// Dùng trong code.html:
//   initWishesToggle();
// HTML (đặt trước nút nhạc):
//   <button id="wishesToggle" class="wishes-toggle" aria-label="Toggle wishes">
//       <i data-lucide="message-circle" class="wishes-icon-on"></i>
//       <i data-lucide="message-circle-off" class="wishes-icon-off"></i>
//   </button>

function initWishesToggle() {
    var btn = document.getElementById('wishesToggle');
    var box = document.querySelector('.floating-wishes-box');
    if (!btn || !box) return;

    btn.addEventListener('click', function () {
        var isHidden = btn.classList.toggle('hidden');
        if (isHidden) {
            box.classList.add('hidden-wishes');
        } else {
            box.classList.remove('hidden-wishes');
        }
    });
}


/* ============================================
   4. FALLING EFFECTS — Hoa rơi, confetti, sparkles, hearts, lá, tuyết
   Tạo element JS, CSS animate, auto-remove
   ============================================ */

// --- Hoa rơi (Petals) ---
function initFallingPetals(options = {}) {
    const {
        interval = 800,       // ms giữa mỗi cánh hoa
        emojis = ['🌸', '🩷', '💮', '🏵️'],
        minDuration = 4,      // giây
        maxDuration = 7,
        maxOnScreen = 20,     // giới hạn performance
    } = options;

    let count = 0;

    function create() {
        if (count >= maxOnScreen) return;
        count++;

        const el = document.createElement('div');
        el.classList.add('petal');
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDuration = (Math.random() * (maxDuration - minDuration) + minDuration) + 's';
        el.style.opacity = Math.random() * 0.5 + 0.3;
        el.style.fontSize = (Math.random() * 10 + 12) + 'px';
        el.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        document.body.appendChild(el);

        const duration = parseFloat(el.style.animationDuration) * 1000;
        setTimeout(() => { el.remove(); count--; }, duration);
    }

    setInterval(create, interval);
}

// --- Confetti ---
function initConfetti(options = {}) {
    const {
        interval = 300,
        colors = ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD'],
        maxOnScreen = 30,
    } = options;

    let count = 0;

    function create() {
        if (count >= maxOnScreen) return;
        count++;

        const el = document.createElement('div');
        el.classList.add('confetti');
        el.style.left = Math.random() * 100 + 'vw';
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.width = (Math.random() * 6 + 4) + 'px';
        el.style.height = (Math.random() * 6 + 4) + 'px';
        el.style.animationDuration = (Math.random() * 2 + 3) + 's';
        document.body.appendChild(el);

        const duration = parseFloat(el.style.animationDuration) * 1000;
        setTimeout(() => { el.remove(); count--; }, duration);
    }

    setInterval(create, interval);
}

// --- Sparkles ---
function initSparkles(options = {}) {
    const {
        interval = 500,
        emoji = '✨',
        maxOnScreen = 15,
    } = options;

    let count = 0;

    function create() {
        if (count >= maxOnScreen) return;
        count++;

        const el = document.createElement('div');
        el.classList.add('sparkle');
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top = Math.random() * 100 + 'vh';
        el.innerHTML = emoji;
        el.style.fontSize = (Math.random() * 8 + 8) + 'px';
        document.body.appendChild(el);

        setTimeout(() => { el.remove(); count--; }, 2000);
    }

    setInterval(create, interval);
}

// --- Hearts floating (bay lên từ dưới) ---
function initFloatingHearts(options = {}) {
    const {
        interval = 1000,
        emojis = ['❤️', '💕', '💗', '💖'],
        maxOnScreen = 12,
    } = options;

    let count = 0;

    function create() {
        if (count >= maxOnScreen) return;
        count++;

        const el = document.createElement('div');
        el.classList.add('floating-heart');
        el.style.left = Math.random() * 100 + 'vw';
        el.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.fontSize = (Math.random() * 10 + 10) + 'px';
        el.style.animationDuration = (Math.random() * 3 + 4) + 's';
        document.body.appendChild(el);

        const duration = parseFloat(el.style.animationDuration) * 1000;
        setTimeout(() => { el.remove(); count--; }, duration);
    }

    setInterval(create, interval);
}

// --- Lá rơi (Leaves) ---
function initFallingLeaves(options = {}) {
    const {
        interval = 1200,
        emojis = ['🍃', '🌿', '☘️', '🍂'],
        maxOnScreen = 15,
    } = options;

    let count = 0;

    function create() {
        if (count >= maxOnScreen) return;
        count++;

        const el = document.createElement('div');
        el.classList.add('falling-leaf');
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDuration = (Math.random() * 4 + 5) + 's';
        el.style.fontSize = (Math.random() * 8 + 14) + 'px';
        el.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        document.body.appendChild(el);

        const duration = parseFloat(el.style.animationDuration) * 1000;
        setTimeout(() => { el.remove(); count--; }, duration);
    }

    setInterval(create, interval);
}

// --- Tuyết rơi (Snow — winter wedding) ---
function initSnowfall(options = {}) {
    const {
        interval = 400,
        emojis = ['❄', '❅', '❆', '•'],
        maxOnScreen = 25,
    } = options;

    let count = 0;

    function create() {
        if (count >= maxOnScreen) return;
        count++;

        const el = document.createElement('div');
        el.classList.add('snowflake');
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDuration = (Math.random() * 3 + 4) + 's';
        el.style.fontSize = (Math.random() * 8 + 8) + 'px';
        el.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        document.body.appendChild(el);

        const duration = parseFloat(el.style.animationDuration) * 1000;
        setTimeout(() => { el.remove(); count--; }, duration);
    }

    setInterval(create, interval);
}


/* ============================================
   5. GALLERY LIGHTBOX — Xem ảnh phóng to
   Click ảnh → modal full-screen, prev/next, close
   ============================================ */

function initLightbox() {
    const items = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');

    if (!lightbox || items.length === 0) return;

    let currentIndex = 0;
    const images = Array.from(items).map(item => item.querySelector('img')?.src).filter(Boolean);

    function showImage(index) {
        currentIndex = index;
        lightboxImg.src = images[index];
        if (lightboxCounter) {
            lightboxCounter.textContent = `${index + 1} / ${images.length}`;
        }
    }

    function open(index) {
        showImage(index);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    items.forEach((item, index) => {
        item.addEventListener('click', () => open(index));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', close);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => {
        showImage((currentIndex - 1 + images.length) % images.length);
    });
    if (lightboxNext) lightboxNext.addEventListener('click', () => {
        showImage((currentIndex + 1) % images.length);
    });

    // Close on overlay click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) close();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
        if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
    });

    // Touch swipe
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && lightboxPrev) lightboxPrev.click();
            else if (diff < 0 && lightboxNext) lightboxNext.click();
        }
    }, { passive: true });
}


/* ============================================
   6. GUESTBOOK — Sổ lưu bút
   Lưu localStorage, hiển thị realtime
   ============================================ */

function initGuestbook() {
    const form = document.getElementById('guestbookForm');
    const nameInput = document.getElementById('guestbookName');
    const messageInput = document.getElementById('guestbookMessage');
    const messagesContainer = document.getElementById('guestbookMessages');

    if (!form || !messagesContainer) return;

    const STORAGE_KEY = 'wedding_guestbook';

    // Load messages từ localStorage
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        renderMessages(messages);
    }

    // Render messages
    function renderMessages(messages) {
        messagesContainer.innerHTML = messages.map(msg => `
            <div class="guestbook-message">
                <div class="guestbook-message-header">
                    <div class="guestbook-avatar">${msg.name.charAt(0).toUpperCase()}</div>
                    <span class="guestbook-name">${escapeHtml(msg.name)}</span>
                    <span class="guestbook-time">${msg.time}</span>
                </div>
                <p class="guestbook-text">"${escapeHtml(msg.message)}"</p>
            </div>
        `).join('');
    }

    // Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();
        if (!name || !message) return;

        const messages = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        messages.unshift({
            name,
            message,
            time: new Date().toLocaleDateString('vi-VN'),
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));

        renderMessages(messages);
        form.reset();

        // Show success
        const successEl = document.getElementById('guestbookSuccess');
        if (successEl) {
            successEl.classList.add('show');
            setTimeout(() => successEl.classList.remove('show'), 3000);
        }
    });

    // Preset wishes — click to fill
    document.querySelectorAll('.guestbook-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (messageInput) messageInput.value = btn.textContent;
            messageInput.focus();
        });
    });

    loadMessages();
}

// Preset wishes data
const WEDDING_WISHES_PRESETS = [
    'Chúc hai bạn trăm năm hạnh phúc! 💕',
    'Hạnh phúc viên mãn, sớm có tin vui! 🎉',
    'Chúc anh chị yêu thương nhau mãi mãi! ❤️',
    'Wishing you a lifetime of love and happiness! 🌸',
    'Chúc mừng hạnh phúc! Trăm năm hạnh phúc! 💒',
    'Chúc đôi uyên ương sớm có baby! 👶',
];

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}


/* ============================================
   7. RSVP FORM — Xác nhận tham dự
   UI-only (no backend), success animation
   ============================================ */

function initRSVP() {
    const form = document.getElementById('rsvpForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.rsvp-submit');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Đang gửi...';
        }

        // Giả lập gửi thành công sau 1s
        setTimeout(() => {
            form.style.display = 'none';
            const success = document.getElementById('rsvpSuccess');
            if (success) success.classList.add('show');
        }, 1000);
    });
}

// --- Variant: RSVP với câu hỏi phụ ---
function initRSVPWithQuestions() {
    const form = document.getElementById('rsvpForm');
    const rsvpBtn = document.getElementById('rsvpButton');
    const rsvpQuestions = document.getElementById('rsvpQuestions');

    if (!form) return;

    // Show/hide questions khi click nút RSVP
    if (rsvpBtn && rsvpQuestions) {
        rsvpBtn.addEventListener('click', () => {
            rsvpQuestions.style.display = rsvpQuestions.style.display === 'none' ? 'block' : 'none';
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            guests: formData.get('guests'),
            message: formData.get('message'),
            sharedRide: formData.get('sharedRide') === 'on',
            vegetarian: formData.get('vegetarian') === 'on',
        };

        console.log('RSVP Data:', data);

        // Success
        form.style.display = 'none';
        const success = document.getElementById('rsvpSuccess');
        if (success) success.classList.add('show');
    });
}


/* ============================================
   8. CALENDAR EXPORT — Tạo file .ics
   Download file iCalendar
   ============================================ */

function initCalendarExport(options = {}) {
    const {
        title = 'Lễ Cưới',
        description = 'Trân trọng kính mời',
        location = '',
        startDate = '',    // 'YYYY-MM-DDTHH:mm:ss'
        endDate = '',      // 'YYYY-MM-DDTHH:mm:ss' (nếu trống → +3h)
    } = options;

    const btn = document.getElementById('calendarBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const start = formatICSDate(startDate);
        const end = endDate ? formatICSDate(endDate) : formatICSDate(
            new Date(new Date(startDate).getTime() + 3 * 60 * 60 * 1000).toISOString()
        );

        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Templexa//Wedding//VI',
            'BEGIN:VEVENT',
            `DTSTART:${start}`,
            `DTEND:${end}`,
            `SUMMARY:${title}`,
            `DESCRIPTION:${description}`,
            `LOCATION:${location}`,
            'STATUS:CONFIRMED',
            `UID:${Date.now()}@templexa.com`,
            'BEGIN:VALARM',
            'TRIGGER:-P1D',
            'ACTION:DISPLAY',
            'DESCRIPTION:Reminder: Lễ cưới ngày mai!',
            'END:VALARM',
            'END:VEVENT',
            'END:VCALENDAR',
        ].join('\r\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `le-cuoi-${title.replace(/\s+/g, '-').toLowerCase()}.ics`;
        link.click();
        URL.revokeObjectURL(url);
    });
}

function formatICSDate(dateStr) {
    const d = new Date(dateStr);
    return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}


/* ============================================
   9. GIFT BOX — Copy số tài khoản
   Click nút → copy vào clipboard + feedback
   ============================================ */

function initGiftBox() {
    document.querySelectorAll('.giftbox-copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const accountNumber = btn.dataset.account;
            if (!accountNumber) return;

            navigator.clipboard.writeText(accountNumber).then(() => {
                const originalText = btn.textContent;
                btn.textContent = 'Đã copy! ✓';
                btn.style.background = 'var(--accent, #D4AF37)';
                btn.style.color = 'white';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 2000);
            }).catch(() => {
                // Fallback cho browser cũ
                const textarea = document.createElement('textarea');
                textarea.value = accountNumber;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);

                btn.textContent = 'Đã copy! ✓';
                setTimeout(() => btn.textContent = 'Copy STK', 2000);
            });
        });
    });
}


/* ============================================
   10. SCROLL REVEAL — IntersectionObserver
   Fade-up các section khi scroll tới
   ============================================ */

function initScrollReveal(options = {}) {
    const {
        selector = '[class*="animate-"]',
        threshold = 0.1,
        rootMargin = '0px 0px -50px 0px',
    } = options;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold, rootMargin });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
}


/* ============================================
   11. SMOOTH SCROLL — Nav links
   Click nav → smooth scroll to section
   ============================================ */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}


/* ============================================
   12. NAVBAR — Sticky + active section highlight
   ============================================ */

function initNavbar() {
    const nav = document.querySelector('.wedding-nav');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.wedding-nav a[href^="#"]');

    if (!nav || sections.length === 0) return;

    // Sticky on scroll
    const navTop = nav.offsetTop;
    window.addEventListener('scroll', () => {
        if (window.scrollY > navTop) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }

        // Active section highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}


/* ============================================
   INIT ALL — Gọi 1 lần trong DOMContentLoaded
   Copy function cần dùng + gọi trong init
   ============================================ */

/*
document.addEventListener('DOMContentLoaded', () => {
    // 1. Envelope (chọn 1 variant)
    initEnvelope();
    // initEnvelopeCard();
    // initEnvelopeTraditional();

    // 2. Countdown
    initCountdown('2026-06-15T10:00:00');

    // 3. Music
    initMusicToggle();
    // initMusicDisc();

    // 4. Effects (chọn 1-2)
    initFallingPetals();
    // initConfetti();
    // initSparkles();
    // initFloatingHearts();
    // initFallingLeaves();
    // initSnowfall();

    // 5. Gallery
    initLightbox();

    // 6. Guestbook
    initGuestbook();

    // 7. RSVP
    initRSVP();
    // initRSVPWithQuestions();

    // 8. Calendar
    initCalendarExport({
        title: 'Lễ Cưới Minh & Ngọc',
        location: 'Nhà hàng ABC, 123 Đường XYZ',
        startDate: '2026-06-15T10:00:00',
    });

    // 9. Gift Box
    initGiftBox();

    // 10. Scroll reveal
    initScrollReveal();

    // 11. Smooth scroll
    initSmoothScroll();

    // 12. Navbar
    initNavbar();
});
*/


/* ============================================
   13b. GUEST PERSONALIZATION — Cá nhân hoá theo khách mời
   Đọc ?id=X từ URL → tìm khách trong GUEST_LIST (từ guests.js)
   → thay tên + lời mời vào các vị trí trong thiệp.
   Nếu không có ?id hoặc ID không hợp lệ → hiện text mặc định.

   Cách dùng:
   1. Load guests.js TRƯỚC script chính:
      <script src="./guests.js"></script>

   2. Gọi trong DOMContentLoaded (SỚM, trước initEnvelope):
      initGuestPersonalization({
          defaultText: 'Trân trọng kính mời quý khách',
      });

   3. HTML: thêm <p class="guest-name-display"></p> sau .envelope-invite-text và .hero-invite-label

   4. Link cho khách: code.html?id=1, code.html?id=2, ...
   ============================================ */

function initGuestPersonalization(options) {
    var defaultText = (options && options.defaultText) || '';

    // Kiểm tra GUEST_LIST có tồn tại không (từ guests.js)
    if (typeof GUEST_LIST === 'undefined' || !Array.isArray(GUEST_LIST)) return;

    var params = new URLSearchParams(window.location.search);
    var rawId = params.get('id');
    if (rawId === null) return; // không có param → giữ nguyên mẫu

    var guestId = parseInt(rawId, 10);
    var guest = null;

    for (var i = 0; i < GUEST_LIST.length; i++) {
        if (GUEST_LIST[i].id === guestId) { guest = GUEST_LIST[i]; break; }
    }

    // Các element hiển thị tên khách (ẩn mặc định, hiện khi có guest)
    var nameEls = document.querySelectorAll('.guest-name-display');

    if (guest) {
        // Thay lời mời nếu guest có message riêng
        if (guest.message) {
            var inviteEls = document.querySelectorAll('.guest-invite-text');
            for (var j = 0; j < inviteEls.length; j++) {
                inviteEls[j].textContent = guest.message;
            }
        }
        // Hiện tên khách
        for (var k = 0; k < nameEls.length; k++) {
            nameEls[k].textContent = guest.name;
            nameEls[k].style.display = 'block';
        }
    } else {
        // ID không hợp lệ → hiện text mặc định, ẩn tên
        if (defaultText) {
            var inviteEls2 = document.querySelectorAll('.guest-invite-text');
            for (var m = 0; m < inviteEls2.length; m++) {
                inviteEls2[m].textContent = defaultText;
            }
        }
        for (var n = 0; n < nameEls.length; n++) {
            nameEls[n].style.display = 'none';
        }
    }
}


/* ============================================
   14. FLOATING WISHES — Bong bóng lời chúc bay lên
   Hiển thị lời chúc dạng bong bóng chat bay từ dưới lên, loop vô hạn.
   Load ngầm từ sheetsAPI.get(), thêm lời chúc mới vào pool khi submit.

   Cách dùng trong code.html (copy function này + CSS từ styles.css):

   // Khởi tạo — gọi sau khi sheetsAPI đã load
   var floatingWishes = initFloatingWishes({
       sheetId: '1',
       nameCol: 'A',        // cột tên trong sheet
       messageCol: 'B',     // cột lời chúc trong sheet
       containerId: 'floatingWishesBox',  // optional, mặc định tự tạo
       maxVisible: 3,       // số bong bóng hiện cùng lúc (mặc định 3)
       interval: 2500,      // ms giữa mỗi bong bóng (mặc định 2500)
       duration: 6000,      // ms mỗi bong bóng tồn tại (mặc định 6000)
   });

   // Sau khi user gửi lời chúc → thêm vào pool
   floatingWishes.addWish('Tên', 'Lời chúc mới');

   // Bảng màu bong bóng — JS tự random class fw-c1→fw-c6
   // CSS có 3 palette tuỳ theme: mặc định (đỏ/vàng), .fw-gold, .fw-rose, .fw-dark
   // Thêm class palette vào container:
   //   <div class="floating-wishes-box fw-gold"> (gold theme)
   //   <div class="floating-wishes-box fw-rose"> (rose/pink theme)
   //   <div class="floating-wishes-box fw-dark"> (dark luxury theme)
   //   <div class="floating-wishes-box">          (default — đỏ/vàng truyền thống)
   ============================================ */

function initFloatingWishes(config) {
    if (!config || !config.sheetId) return null;

    var sheetId = config.sheetId;
    var nameCol = config.nameCol || 'A';
    var messageCol = config.messageCol || 'B';
    var maxVisible = config.maxVisible || 3;
    var interval = config.interval || 2500;
    var duration = config.duration || 6000;

    // Pool lời chúc
    var wishPool = [];
    var currentIndex = 0;
    var timerId = null;
    var isRunning = false;

    // Tạo hoặc lấy container
    var container = document.getElementById(config.containerId || 'floatingWishesBox');
    if (!container) {
        container = document.createElement('div');
        container.id = 'floatingWishesBox';
        container.className = 'floating-wishes-box';
        document.body.appendChild(container);
    }

    // Escape HTML
    function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

    // Số lượng màu bong bóng (fw-c1 → fw-c5: đỏ, xanh, tím, trắng, nâu)
    var colorCount = 5;

    // Tạo 1 bong bóng
    function createBubble(name, message) {
        var el = document.createElement('div');
        el.className = 'floating-wish fw-c' + (Math.floor(Math.random() * colorCount) + 1);
        el.style.animationDuration = duration + 'ms';
        el.innerHTML =
            '<div class="floating-wish-avatar">' + esc(name).charAt(0).toUpperCase() + '</div>' +
            '<span class="floating-wish-name">' + esc(name) + ':</span>' +
            '<span class="floating-wish-text">' + esc(message) + '</span>';

        container.appendChild(el);

        // Giới hạn số bong bóng hiện cùng lúc
        while (container.children.length > maxVisible) {
            container.removeChild(container.firstChild);
        }

        // Tự xoá sau khi animation xong
        setTimeout(function () {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, duration);
    }

    // Hiện bong bóng tiếp theo (loop)
    function showNext() {
        if (wishPool.length === 0) return;
        var wish = wishPool[currentIndex % wishPool.length];
        createBubble(wish.name, wish.message);
        currentIndex++;
    }

    // Bắt đầu loop
    function startLoop() {
        if (isRunning || wishPool.length === 0) return;
        isRunning = true;
        showNext(); // hiện ngay 1 cái đầu
        timerId = setInterval(showNext, interval);
    }

    // Tính interval động theo số lượng wishes
    function calcInterval() {
        var len = wishPool.length;
        if (len <= 3) return 3000;
        if (len <= 10) return 2500;
        if (len <= 30) return 2000;
        return 1500;
    }

    // Load từ API (chạy ngầm)
    function loadFromAPI() {
        if (typeof sheetsAPI === 'undefined') return;

        sheetsAPI.get(sheetId)
            .then(function (rows) {
                rows.forEach(function (row) {
                    var name = row[nameCol];
                    var message = row[messageCol];
                    if (name && message) {
                        wishPool.push({ name: name, message: message });
                    }
                });

                if (wishPool.length > 0) {
                    // Tính lại interval theo số lượng
                    interval = config.interval || calcInterval();
                    startLoop();
                }
            })
            .catch(function () {});
    }

    // Thêm lời chúc mới vào pool (sau khi user submit)
    function addWish(name, message) {
        if (!name || !message) return;
        wishPool.push({ name: name, message: message });

        // Hiện ngay bong bóng mới
        createBubble(name, message);

        // Nếu chưa chạy loop → bắt đầu
        if (!isRunning) {
            interval = config.interval || calcInterval();
            startLoop();
        }
    }

    // Auto load
    loadFromAPI();

    return {
        addWish: addWish,
        getPool: function () { return wishPool; },
    };
}
