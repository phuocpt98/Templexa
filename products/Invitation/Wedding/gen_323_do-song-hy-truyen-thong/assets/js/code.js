function runTimelineSlie(seconds) {
    const timeline = document.querySelector('.timelineSlide');
    const imageEls = document.querySelectorAll('.photoBookImage .ladi-image-background');

    if (!timeline) return;

    timeline.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'slider-wrapper';
    timeline.appendChild(wrapper);

    // 👉 Lấy ảnh (ưu tiên arrImageTimeline)
    function getImages() {
        if (Array.isArray(arrImageTimeline) && arrImageTimeline.length > 0) {
            return arrImageTimeline;
        }

        // Trang xem: LadiPage gắn .ladi-lazyload (background-image:none!important) cho ảnh ngoài màn
        // hình tới khi khách cuộn → ô album còn ảnh mẫu đọc ra "none", hết 20 lần thử là slide trống
        // vĩnh viễn. Tạm gỡ lớp đó để đọc đúng ảnh. Trang soạn (?mode=edit) giữ nếp cũ: ảnh của khách
        // được gắn sau khi tải, đọc sớm sẽ dính ảnh mẫu.
        const bypassLazy = !/[?&]mode=edit\b/.test(location.search);
        let urls = [];
        imageEls.forEach(el => {
            const lazy = bypassLazy && el.classList.contains('ladi-lazyload');
            if (lazy) el.classList.remove('ladi-lazyload');
            const bg = window.getComputedStyle(el).backgroundImage;
            if (lazy) el.classList.add('ladi-lazyload');
            if (bg && bg !== 'none') {
                const match = bg.match(/url\(["']?(.*?)["']?\)/);
                if (match && match[1]) urls.push(match[1]);
            }
        });
        return urls;
    }

    function preloadImages(urls, callback) {
        let loaded = 0;
        urls.forEach(url => {
            const img = new Image();
            img.src = url;
            img.onload = img.onerror = () => {
                loaded++;
                if (loaded === urls.length) callback();
            };
        });
    }

    // ── Tách startSlider ra ngoài để có thể gọi lại ──
    function startSlider(urls) {
        const height = timeline.offsetHeight;
        wrapper.innerHTML = '';

        const fullList = [...urls, ...urls];
        fullList.forEach(url => {
            const div = document.createElement('div');
            div.className = 'slide-item';
            div.style.backgroundImage = `url(${url})`;
            div.style.height = height + 'px';
            wrapper.appendChild(div);
        });

        const totalHeight = height * urls.length;
        wrapper.style.animation = 'none'; // reset trước để re-trigger
        void wrapper.offsetWidth;         // force reflow
        wrapper.style.animation = `slideUp ${urls.length * seconds}s linear infinite`;

        // Xóa style slideUp cũ (nếu có) trước khi tạo mới
        const oldStyle = document.getElementById('__slideUpStyle');
        if (oldStyle) oldStyle.remove();

        const style = document.createElement('style');
        style.id = '__slideUpStyle';
        style.innerHTML = `
            @keyframes slideUp {
                0%   { transform: translateY(0); }
                100% { transform: translateY(-${totalHeight}px); }
            }
        `;
        document.head.appendChild(style);
    }

    // ── Expose: đổi ảnh + restart slider ──
    window.setTimelineImages = function (newUrls) {
        if (!Array.isArray(newUrls) || newUrls.length === 0) return;
        window.arrImageTimeline = newUrls;
        preloadImages(newUrls, () => startSlider(newUrls));
    };

    // ── Expose: đổi tốc độ + restart slider (giữ ảnh hiện tại) ──
    window.setTimelineSpeed = function (newSeconds) {
        seconds = newSeconds;
        const currentUrls = Array.isArray(window.arrImageTimeline) && window.arrImageTimeline.length > 0
            ? window.arrImageTimeline
            : getImages();
        if (currentUrls.length > 0) startSlider(currentUrls);
    };

    // ── Chạy lần đầu ──
    if (Array.isArray(arrImageTimeline) && arrImageTimeline.length > 0) {
        preloadImages(arrImageTimeline, () => startSlider(arrImageTimeline));
        return;
    }

    let retry = 0;
    const wait = setInterval(() => {
        const urls = getImages();
        if (urls.length > 0) {
            clearInterval(wait);
            preloadImages(urls, () => startSlider(urls));
        }
        if (++retry > 20) clearInterval(wait);
    }, 300);
}

// runTimelineSlie(6);








// [2]. Bật tắt scroll
function disableScroll() {
    document.body.style.overflow = 'hidden';
    document.addEventListener('wheel', preventDefault, { passive: false });
    document.addEventListener('touchmove', preventDefault, { passive: false });
}

function enableScroll() {
    document.body.style.overflow = '';
    document.removeEventListener('wheel', preventDefault);
    document.removeEventListener('touchmove', preventDefault);
}

function preventDefault(e) {
    e.preventDefault();
}

// Khi load - đoạn này để ở html
// window.onload = disableScroll;

// Hàm gọi để mở scroll
function StartScroll() {
    enableScroll();
}




// [3].Hiệu ứng mở cửa hiện google map
function cuaAnh(id, time = 1) {

    let el = document.getElementById(id);
    let bg = el.querySelector(".ladi-image-background");
    if (!bg) return;

    // nếu chưa có cửa thì tạo
    if (!el.querySelector(".door")) {

        // Lấy đúng cả background-size/position (không chỉ background-image) — ảnh có thể đã
        // được zoom/pan qua công cụ ClientEditImage (background-size/position tính theo px cụ
        // thể, xem applyImageStyle() ở edit.js), nếu chỉ copy background-image thì cửa sẽ hiện
        // ảnh ở độ zoom mặc định (cover/center), mất hết hiệu ứng phóng to/di chuyển đã chỉnh.
        let style = window.getComputedStyle(bg);
        let img = style.backgroundImage;
        let size = style.backgroundSize;
        let pos = style.backgroundPosition;

        let left = document.createElement("div");
        left.className = "door left";
        left.style.backgroundImage = img;
        left.style.backgroundSize = size;
        left.style.backgroundPosition = pos;
        left.style.transitionDuration = time + "s";

        let right = document.createElement("div");
        right.className = "door right";
        right.style.backgroundImage = img;
        right.style.backgroundSize = size;
        right.style.backgroundPosition = pos;
        right.style.transitionDuration = time + "s";

        el.appendChild(left);
        el.appendChild(right);

        el.classList.add("active");

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                el.classList.add("open");
            });
        });

    } else {

        // Đồng bộ lại đúng background-image/size/position hiện tại của ảnh gốc mỗi lần đóng/mở
        // lại — phòng khi ảnh vừa được zoom/pan lại (ClientEditImage) sau lần tạo cửa đầu tiên,
        // nếu không cửa sẽ bị "kẹt" ở đúng zoom lúc tạo, không theo kịp thay đổi mới nhất.
        let style = window.getComputedStyle(bg);
        el.querySelectorAll(".door").forEach(d => {
            d.style.backgroundImage = style.backgroundImage;
            d.style.backgroundSize = style.backgroundSize;
            d.style.backgroundPosition = style.backgroundPosition;
            d.style.transitionDuration = time + "s";
        });

        el.classList.toggle("open");
    }

}












// [4].Hiệu ứng bướm bay
// butterflies.js — Embeddable butterfly effect with isolated CSS
// Can be inserted into any website without affecting the host page layout
(function () {
    // Create a unique namespace to avoid conflicts
    const namespace = '__butterflyEffect_' + Math.random().toString(36).substr(2, 9);

    // Helper: darken a HEX color by percent (0-100)
    function darkenHex(hex, percent) {
        try {
            const h = hex.replace('#', '');
            const num = parseInt(h, 16);
            let r = (num >> 16) & 0xFF;
            let g = (num >> 8) & 0xFF;
            let b = num & 0xFF;
            r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent / 100))));
            g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent / 100))));
            b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent / 100))));
            const rr = r.toString(16).padStart(2, '0');
            const gg = g.toString(16).padStart(2, '0');
            const bb = b.toString(16).padStart(2, '0');
            return `#${rr}${gg}${bb}`;
        } catch (e) {
            return hex;
        }
    }

    // Inject stylesheet with scoped selectors to avoid conflicts
    const css = `
            /* Scoped styles - only affect butterfly-related elements */
            .${namespace}-stage {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 10000;
                background: transparent;
                overflow: hidden;
            }

            .${namespace}-butterfly {
                position: absolute;
                left: 0;
                top: 0;
                transform: translate(-200vw, -200vh);
                opacity: 0;
                width: 64px;
                height: 64px;
                transform-origin: center;
                pointer-events: none;
                will-change: transform, opacity;
                filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.45));
                
            }

            /* wing flapping animation */
            @keyframes ${namespace}-flap {
                0% {
                    transform: rotate(0deg)
                }

                50% {
                    transform: rotate(18deg)
                }

                100% {
                    transform: rotate(0deg)
                }
            }

            /* gentle body bob */
            @keyframes ${namespace}-bob {
                0% {
                    transform: translateY(0)
                }

                50% {
                    transform: translateY(-6px)
                }

                100% {
                    transform: translateY(0)
                }
            }

            .${namespace}-butterfly svg {
                width: 100%;
                height: 100%;
                display: block
                z-index:999999999999999991;
            }

            .${namespace}-butterfly .wing {
                transform-origin: 20% 50%;
                animation: ${namespace}-flap 0.6s ease-in-out infinite
            }

            .${namespace}-butterfly.small .wing {
                animation-duration: 0.5s
            }

            .${namespace}-butterfly.large .wing {
                animation-duration: 0.9s
            }

            .${namespace}-butterfly .body {
                animation: ${namespace}-bob 2s ease-in-out infinite
            }

            /* allow body fill override per-element via CSS var */
            .${namespace}-butterfly .body * {
                fill: var(--butterfly-body, #2b2b2b);
            }

            /* UI overlay - fixed position, does not affect layout */
            .${namespace}-ui {
                position: fixed;
                right: 20px;
                top: 20px;
                background: rgba(255, 255, 255, 0.06);
                backdrop-filter: blur(6px);
                padding: 12px;
                border-radius: 10px;
                border: 1px solid rgba(255, 255, 255, 0.06);
                color: #fff;
                font-size: 13px;
                display: flex;
                gap: 8px;
                flex-direction: column;
                z-index: 10001;
                font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            }

            .${namespace}-ui label {
                font-size: 12px;
                opacity: 0.95;
            }

            .${namespace}-ui input[type=color] {
                width: 44px;
                height: 30px;
                border: none;
                padding: 0;
                background: transparent;
                cursor: pointer;
            }

            .${namespace}-ui input[type=range] {
                width: 140px;
            }

            .${namespace}-ui button {
                padding: 6px 12px;
                border: 1px solid rgba(255, 255, 255, 0.3);
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
                border-radius: 6px;
                cursor: pointer;
                font-size: 12px;
            }

            .${namespace}-ui button:hover {
                background: rgba(255, 255, 255, 0.15);
            }

            .${namespace}-ui .row {
                display: flex;
                gap: 8px;
                align-items: center
            }

            /* hint text - optional overlay */
            .${namespace}-hint {
                position: fixed;
                left: 20px;
                bottom: 20px;
                color: rgba(255, 255, 255, 0.85);
                font-size: 13px;
                background: linear-gradient(transparent, rgba(255, 255, 255, 0.02));
                padding: 8px 12px;
                border-radius: 8px;
                z-index: 10001;
                font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            }
        `;

    const styleEl = document.createElement('style');
    styleEl.type = 'text/css';
    styleEl.appendChild(document.createTextNode(css));
    document.head.appendChild(styleEl);

    // Create isolated stage overlay
    const stage = document.createElement('div');
    stage.className = namespace + '-stage';

    // Create UI panel (optional - can be hidden)
    const ui = document.createElement('div');
    ui.className = namespace + '-ui';
    // Only show the control UI when the page URL contains ?dev=true
    const showUI = new URLSearchParams(window.location.search).get('dev') === 'true';
    ui.setAttribute('aria-hidden', showUI ? 'false' : 'true');
    ui.innerHTML = `
            <div class="row">
                <label for="${namespace}-color">Màu chủ đạo</label>
                <input id="${namespace}-color" type="color" value="#e79b9b" title="Màu bướm">
            </div>
            <div>
                <label for="${namespace}-count">Số lượng: <span id="${namespace}-countLabel">18</span></label><br>
                <input id="${namespace}-count" type="range" min="1" max="120" value="18">
            </div>
            <div>
                <label for="${namespace}-size">Kích thước: <span id="${namespace}-sizeLabel">1.0</span></label><br>
                <input id="${namespace}-size" type="range" min="0.4" max="2.0" step="0.1" value="1.0">
            </div>
            <div>
                <label for="${namespace}-duration">Thời gian: <span id="${namespace}-durationLabel">3000</span></label><br>
                <input id="${namespace}-duration" type="range" min="800" max="6000" step="100" value="3000">
            </div>
            <div>
                <button id="${namespace}-respawn" type="button">Kích hoạt</button>
            </div>
        `;

    const hint = document.createElement('div');
    hint.className = namespace + '-hint';
    hint.textContent = 'Click "Kích hoạt" để chạy hiệu ứng bướm.';

    // Append to body - fixed position so does not affect layout
    document.body.appendChild(stage);
    document.body.appendChild(ui);
    document.body.appendChild(hint);

    // If not in dev mode, hide the control UI and hint so host page layout is unaffected
    if (!showUI) {
        ui.style.display = 'none';
        hint.style.display = 'none';
    }

    // Get UI elements with scoped IDs
    const colorInput = document.getElementById(namespace + '-color');
    const countRange = document.getElementById(namespace + '-count');
    const countLabel = document.getElementById(namespace + '-countLabel');
    const sizeRange = document.getElementById(namespace + '-size');
    const sizeLabel = document.getElementById(namespace + '-sizeLabel');
    const durationRange = document.getElementById(namespace + '-duration');
    const durationLabel = document.getElementById(namespace + '-durationLabel');
    const respawnBtn = document.getElementById(namespace + '-respawn');

    // Color variable for butterflies
    let effectColor = '#e79b9b';

    const butterflySVG = `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <g class="wing left"><path d="M20 32C8 12 6 10 14 6c14 8 22 18 14 26-6 6-8 6-8 0z" fill="currentColor"/></g>
        <g class="wing right"><path d="M44 32c12-20 14-22 6-26C36 6 28 16 36 24c6 6 8 6 8 0z" fill="currentColor"/></g>
        <g class="body"><ellipse cx="32" cy="34" rx="3.8" ry="9.5" fill="#2b2b2b"/><circle cx="32" cy="22" r="2.2" fill="#2b2b2b"/></g>
    </svg>
    `;

    /**
     * Run the butterfly effect.
     * Accepts either a number (treated as duration in ms) or an options object:
     * { count, size, color, duration }
     */
    function runButterflyEffect(opts) {
        // Backwards-compatible: if a number is passed, treat as duration
        let override = {};
        if (typeof opts === 'number') {
            override.duration = opts;
        } else if (typeof opts === 'object' && opts !== null) {
            override = opts;
        }

        const amount = Math.max(1, parseInt(override.count ?? override.amount ?? countRange.value, 10) || 18);
        const baseSize = parseFloat(override.size ?? override.baseSize ?? sizeRange.value) || 1.0;
        const color = override.color ?? effectColor;
        // bodyColor: optional override; default to a darker shade of wing color
        const bodyColor = override.bodyColor ?? override.body ?? (darkenHex(color, 50) || '#2b2b2b');
        const W = stage.clientWidth;
        const H = stage.clientHeight;
        const duration = typeof override.duration === 'number' ? override.duration : (parseInt(override.duration ?? durationRange.value, 10) || 3000);

        // If a color override was provided, update effectColor and UI
        if (override.color) {
            effectColor = override.color;
            colorInput.value = override.color;
        }

        for (let i = 0; i < amount; i++) {
            const el = document.createElement('div');
            el.className = namespace + '-butterfly';
            el.innerHTML = butterflySVG;
            el.style.color = color;
            // set per-element CSS variable for body fill
            el.style.setProperty('--butterfly-body', bodyColor);

            // Kích thước bướm theo slider + random nhẹ
            const size = baseSize * (0.7 + Math.random() * 0.6);
            el.style.width = (64 * size) + 'px';
            el.style.height = (64 * size) + 'px';

            // random slight delay so butterflies spread
            const delay = Math.random() * Math.min(500, duration * 0.4);

            stage.appendChild(el);

            // compute half element width so we can center the butterfly visually
            const halfW = (el.offsetWidth || parseFloat(el.style.width) || 64) / 2;

            const startX = W / 2 + (Math.random() - 0.5) * 40; // small spread at start (center reference)
            const startY = H + 80;

            // mid point: up and to left or right (mimic door opening)
            const dir = Math.random() < 0.5 ? -1 : 1;
            const midX = W / 2 + dir * (80 + Math.random() * 160);
            const midY = H / 2 - Math.random() * 180;

            // end point: far to the side (off-screen)
            const endX = midX + dir * (300 + Math.random() * 300);
            const endY = midY - (50 + Math.random() * 120);

            // rotation and slight spinning
            const rotate = (Math.random() * 40 - 20);
            const rotateEnd = rotate * (1.5 + Math.random() * 1.2);

            // Use Web Animations API with delay
            // đảm bảo không bị "lóe" ở góc trái trên
            el.style.opacity = 0;

            const anim = el.animate([
                { transform: `translate(${startX - halfW}px, ${startY}px) scale(0.2) rotate(0deg)`, opacity: 0 },
                { transform: `translate(${midX - halfW}px, ${midY}px) scale(1) rotate(${rotate}deg)`, opacity: 1, offset: 0.55 },
                { transform: `translate(${endX - halfW}px, ${endY}px) scale(1) rotate(${rotateEnd}deg)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(.25,.8,.25,1)',
                fill: 'forwards',
                delay: delay
            });

            // Optional: while animating, add tiny wobble for spiral feel
            let wobbleInterval = null;
            wobbleInterval = setInterval(() => {
                if (!document.body.contains(el)) { clearInterval(wobbleInterval); return; }
                // tiny opacity flicker to simulate movement without touching transform
                el.style.opacity = (0.85 + Math.random() * 0.15).toString();
            }, 120 + Math.random() * 180);

            // Fallback cleanup in case the animation doesn't fire onfinish
            const cleanupTimer = setTimeout(() => {
                try { el.remove(); } catch (e) { }
                if (wobbleInterval) clearInterval(wobbleInterval);
            }, duration + delay + 300);

            // cleanup when finished
            anim.onfinish = () => {
                try { el.remove(); } catch (e) { }
                if (wobbleInterval) clearInterval(wobbleInterval);
                clearTimeout(cleanupTimer);
            };

        }
    }

    // UI wiring
    colorInput.addEventListener('input', e => {
        effectColor = e.target.value;
    });
    countRange.addEventListener('input', e => { countLabel.textContent = e.target.value; });
    sizeRange.addEventListener('input', e => { sizeLabel.textContent = parseFloat(e.target.value).toFixed(1); });
    durationRange.addEventListener('input', e => { durationLabel.textContent = e.target.value; });
    respawnBtn.addEventListener('click', () => runButterflyEffect());

    // On load: sync UI labels but DO NOT auto-run the effect.
    window.addEventListener('load', () => {
        countLabel.textContent = countRange.value;
        sizeLabel.textContent = parseFloat(sizeRange.value).toFixed(1);
        durationLabel.textContent = durationRange.value;
        // NOTE: intentionally not calling runButterflyEffect here so effect
        // only runs when `runButterflyEffect()` is called or when user clicks the button.
    });

    // Expose function globally if user wants to call from console
    window.runButterflyEffect = runButterflyEffect;

})();








// [5].QR code pháo hoa + fade out
// ===== Ripple Effect =====
const waters = document.querySelectorAll(".water");

waters.forEach(water => {

    function createRipple(x, y) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const ripple = document.createElement("span");
                ripple.classList.add("ripple");

                const size = 80;

                ripple.style.width = size + "px";
                ripple.style.height = size + "px";

                ripple.style.left = (x - size / 2) + "px";
                ripple.style.top = (y - size / 2) + "px";

                water.appendChild(ripple);

                setTimeout(() => ripple.remove(), 4000);
            }, i * 200);
        }
    }

    // auto ripple
    setInterval(() => {
        const rect = water.getBoundingClientRect();
        createRipple(rect.width / 2, rect.height / 2);
    }, 3500);

    // click ripple
    water.addEventListener("click", function (e) {
        const rect = water.getBoundingClientRect();
        createRipple(e.clientX - rect.left, e.clientY - rect.top);
    });
});


// ===== Pháo hoa QR =====
let currentZ = 10;

const qrs = document.querySelectorAll(".QRcodeMungCuoi");

qrs.forEach(qr => {
    qr.addEventListener("click", function () {

        const box = qr.closest(".BoxQRcode");

        const rect = qr.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // 🔥 Tạo pháo hoa
        for (let i = 0; i < 35; i++) {
            const spark = document.createElement("span");
            spark.classList.add("spark");

            const angle = Math.random() * 2 * Math.PI;
            const distance = 120 + Math.random() * 80;

            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            spark.style.setProperty("--x", `${x}px`);
            spark.style.setProperty("--y", `${y}px`);

            const size = Math.random() * 12 + 8;
            spark.style.width = size + "px";
            spark.style.height = size + "px";

            spark.style.left = centerX + "px";
            spark.style.top = centerY + "px";

            qr.appendChild(spark);

            setTimeout(() => spark.remove(), 3200);
        }

        // ===== Animation QR =====
        const qrtitle = box.querySelector(".QRTitle");
        const qrtitleBox = box.querySelector(".QRTitle .ladi-box");
        const QRMungCuoi = box.querySelector(".QRMungCuoi");

        if (qrtitle) qrtitle.classList.add("hide");
        if (qrtitleBox) qrtitleBox.classList.add("borderBox");

        // tránh click spam
        qr.style.pointerEvents = "none";

        setTimeout(() => {

            if (QRMungCuoi) {
                QRMungCuoi.style.position = "relative";
                currentZ++;
                QRMungCuoi.style.zIndex = currentZ;
            }

            // fade mượt
            qr.classList.add("QR-fade-out");

            setTimeout(() => {
                qr.style.display = "none";
            }, 800);

        }, 2500);
    });
});













// [6]. Hiệu ứng mở cửa khi vào thiệp 
let doorConfig = {
    background: "#000",
    imageLeft: "",
    imageRight: ""
};

function configOpenDoor(config = {}) {
    doorConfig = { ...doorConfig, ...config };

    if (!window.BGleft) return;

    applyConfig();
}

function applyConfig() {
    BGleft.style.setProperty("--bg", doorConfig.background);
    BGright.style.setProperty("--bg", doorConfig.background);

    BGleft.style.setProperty("--img", `url(${doorConfig.imageLeft})`);
    BGright.style.setProperty("--img", `url(${doorConfig.imageRight})`);
}

function initDoor() {
    if (document.getElementById("BGcurtain")) return;

    const curtain = document.createElement("div");
    curtain.id = "BGcurtain";

    const left = document.createElement("div");
    left.className = "BGpanel BGleft";

    const right = document.createElement("div");
    right.className = "BGpanel BGright";

    curtain.appendChild(left);
    curtain.appendChild(right);
    document.body.appendChild(curtain);

    window.BGcurtain = curtain;
    window.BGleft = left;
    window.BGright = right;

    document.body.classList.add("BGlock-scroll");

    applyConfig();
}

function StartOpenDoor(duration = 1500) {
    BGcurtain.style.setProperty("--time", duration + "ms");

    BGcurtain.classList.add("BGopen");

    setTimeout(() => {
        BGcurtain.style.display = "none";
        document.body.classList.remove("BGlock-scroll");
    }, duration);
}

// document.addEventListener("DOMContentLoaded", initDoor);














// [7].count down đếm ngược đến ngày cưới
(function () {
    // ====== THAM SỐ (khai báo ở ngoài script này) ======
    //   const endTime        = "2026-06-27 00:00:00"; // thời gian kết thúc
    //   const textColor      = "#858569";              // màu chữ
    //   const cdBorderColor1 = "#AC7134";              // màu viền gradient (từ)
    //   const cdBorderColor2 = "#F8E6B5";              // màu viền gradient (đến)
    //   const cdBorderWidth  = 3;                      // độ dày viền (px)
    //   const cdStyle        = "horizontal";           // bố cục: (bỏ trống)=dọc | horizontal | minimal
    // ====================================================

    const cdEl = document.querySelector('.edit_countDown');
    if (!cdEl) return;

    const box = cdEl.querySelector('.ladi-html-code') || cdEl.querySelector('.ladi-box');
    if (!box) return;

    // font
    const fontSource = document.querySelector('.countDown_font h1');
    if (fontSource) {
        box.style.fontFamily = window.getComputedStyle(fontSource).fontFamily;
    }

    // màu chữ mặc định (textColor áp dụng cho số; labelColor ghi đè riêng cho nhãn)
    var _defaultColor = typeof textColor !== 'undefined' ? textColor : '#AC7134';
    box.style.color = _defaultColor;

    // helper: "#RRGGBB" or "rgba(r,g,b,a)" → "rgba(r,g,b,newAlpha)"
    function colorToRgba(color, alpha) {
        var s = (color || '').trim();
        var m = s.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
        if (m) return 'rgba(' + m[1] + ',' + m[2] + ',' + m[3] + ',' + alpha + ')';
        var h = s.replace('#', '');
        if (h.length < 6) return 'rgba(172,113,52,' + alpha + ')';
        return 'rgba(' + parseInt(h.slice(0,2),16) + ',' + parseInt(h.slice(2,4),16) + ',' + parseInt(h.slice(4,6),16) + ',' + alpha + ')';
    }

    // viền gradient từ template vars
    if (typeof cdBorderColor1 !== 'undefined') {
        cdEl.style.setProperty('--cd-border-c1', cdBorderColor1);
        const _bwZero = typeof cdBorderWidth !== 'undefined' && Number(cdBorderWidth) === 0;
        cdEl.style.setProperty('--cd-shadow', _bwZero ? 'none' : colorToRgba(cdBorderColor1, 0.35));
        cdEl.style.setProperty('--cd-item-bg', colorToRgba(cdBorderColor1, 0.12));
    }
    if (typeof cdBorderColor2 !== 'undefined') cdEl.style.setProperty('--cd-border-c2', cdBorderColor2);
    if (typeof cdBorderWidth  !== 'undefined') cdEl.style.setProperty('--cd-border-w', cdBorderWidth + 'px');
    if (typeof cdBorderAngle  !== 'undefined') cdEl.style.setProperty('--cd-border-angle', cdBorderAngle + 'deg');
    if (typeof cdRadius !== 'undefined') {
        cdEl.style.setProperty('--cd-radius', cdRadius + 'px');
        box.style.borderRadius = cdRadius + 'px';
    }

    // màu nền từ template vars
    if (typeof cdBgType !== 'undefined') {
        const _c1 = typeof cdBgColor1 !== 'undefined' ? cdBgColor1 : null;
        const _c2 = typeof cdBgColor2 !== 'undefined' ? cdBgColor2 : null;
        const _ang = typeof cdBgAngle !== 'undefined' ? cdBgAngle : 180;
        if (cdBgType === 'solid' && _c1) {
            box.style.background = _c1;
        } else if (cdBgType === 'gradient' && _c1 && _c2) {
            box.style.background = `linear-gradient(${_ang}deg, ${_c1}, ${_c2})`;
        }
    }

    // bố cục từ template
    if (typeof cdStyle !== 'undefined' && cdStyle) cdEl.dataset.cdStyle = cdStyle;

    // kích thước ô từ template
    if (typeof cdItemSize !== 'undefined' && cdItemSize) {
        cdEl.style.setProperty('--cd-item-size', Number(cdItemSize) + 'px');
    }

    // màu nền ô từ template
    if (typeof cdItemBg !== 'undefined' && cdItemBg) {
        cdEl.style.setProperty('--cd-item-bg', cdItemBg);
    }

    // Nhãn hiển thị dưới mỗi số — cho phép template/USER_DATA đổi sang ngôn ngữ khác
    // (vd: Days/Hours/Minutes/Seconds cho khách nước ngoài). Xem window.setCountDownLabels bên dưới.
    var _lblDay  = typeof cdLabelDay  !== 'undefined' && cdLabelDay  ? cdLabelDay  : 'Ngày';
    var _lblHour = typeof cdLabelHour !== 'undefined' && cdLabelHour ? cdLabelHour : 'Giờ';
    var _lblMin  = typeof cdLabelMin  !== 'undefined' && cdLabelMin  ? cdLabelMin  : 'Phút';
    var _lblSec  = typeof cdLabelSec  !== 'undefined' && cdLabelSec  ? cdLabelSec  : 'Giây';

    // HTML — số nằm trong .countdown-shape, chữ ở ngoài
    box.innerHTML = `
        <div class="countdown-item">
            <div class="countdown-shape"><div class="countdown-number" id="cd-day">0</div></div>
            <div class="countdown-label">${_lblDay}</div>
        </div>
        <span class="countdown-sep">:</span>
        <div class="countdown-item">
            <div class="countdown-shape"><div class="countdown-number" id="cd-hour">0</div></div>
            <div class="countdown-label">${_lblHour}</div>
        </div>
        <span class="countdown-sep">:</span>
        <div class="countdown-item">
            <div class="countdown-shape"><div class="countdown-number" id="cd-min">0</div></div>
            <div class="countdown-label">${_lblMin}</div>
        </div>
        <span class="countdown-sep">:</span>
        <div class="countdown-item">
            <div class="countdown-shape"><div class="countdown-number" id="cd-sec">0</div></div>
            <div class="countdown-label">${_lblSec}</div>
        </div>
    `;

    let currentEnd = new Date(typeof endTime !== 'undefined' ? endTime : '2030-01-01 00:00:00').getTime();
    let intervalId = null;

    // Tất cả elements .edit_countDown (hỗ trợ mobile + desktop)
    var _allCdEls = document.querySelectorAll('.edit_countDown');

    function updateCountdown() {
        var diff = currentEnd - Date.now();
        var expired = diff <= 0;
        if (expired) diff = 0;
        var vals = [
            Math.floor(diff / 86400000),
            Math.floor((diff % 86400000) / 3600000),
            Math.floor((diff % 3600000) / 60000),
            Math.floor((diff % 60000) / 1000)
        ];
        // Primary element (by ID)
        ['cd-day','cd-hour','cd-min','cd-sec'].forEach(function(id, i) {
            var el = document.getElementById(id);
            if (el) el.textContent = vals[i];
        });
        // Secondary elements (mobile/desktop duplicates)
        _allCdEls.forEach(function(el) {
            if (el === cdEl) return;
            var nums = el.querySelectorAll('.countdown-number');
            vals.forEach(function(v, i) { if (nums[i]) nums[i].textContent = v; });
        });
        if (expired && intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    function startInterval() {
        if (intervalId) clearInterval(intervalId);
        updateCountdown();
        intervalId = setInterval(updateCountdown, 1000);
    }

    window.setCountDownEndTime = function (newEndTime) {
        currentEnd = new Date(newEndTime).getTime();
        startInterval();
    };

    window.setCountDownColor = function (color) {
        _allCdEls.forEach(function(el) {
            var b = el.querySelector('.ladi-html-code') || el.querySelector('.ladi-box');
            if (!b) return;
            b.querySelectorAll('.countdown-number').forEach(function(n) { n.style.color = color; });
        });
    };

    window.setCountDownLabelColor = function (color) {
        _allCdEls.forEach(function(el) {
            var b = el.querySelector('.ladi-html-code') || el.querySelector('.ladi-box');
            if (!b) return;
            b.querySelectorAll('.countdown-label, .countdown-sep').forEach(function(n) { n.style.color = color || ''; });
        });
    };

    // Đổi chữ nhãn "Ngày/Giờ/Phút/Giây" sang ngôn ngữ/chữ khác — mỗi tham số truyền null/'' để giữ nguyên nhãn hiện tại
    window.setCountDownLabels = function (day, hour, min, sec) {
        var vals = [day, hour, min, sec];
        _allCdEls.forEach(function(el) {
            var b = el.querySelector('.ladi-html-code') || el.querySelector('.ladi-box');
            if (!b) return;
            var labels = b.querySelectorAll('.countdown-label');
            labels.forEach(function(lbl, i) {
                if (vals[i] != null && vals[i] !== '') lbl.textContent = vals[i];
            });
        });
    };

    window.setCountDownBorder = function (c1, c2, w, angle) {
        var bw = w != null ? Number(w) : null;
        _allCdEls.forEach(function(el) {
            if (c1 != null) {
                el.style.setProperty('--cd-border-c1', c1);
                el.style.setProperty('--cd-item-bg', colorToRgba(c1, 0.12));
            }
            if (c2    != null) el.style.setProperty('--cd-border-c2', c2);
            if (w     != null) el.style.setProperty('--cd-border-w', isNaN(bw) ? w : bw + 'px');
            if (angle != null) el.style.setProperty('--cd-border-angle', Number(angle) + 'deg');
            if (bw === 0) {
                el.style.setProperty('--cd-shadow', 'none');
            } else if (c1 != null) {
                el.style.setProperty('--cd-shadow', colorToRgba(c1, 0.35));
            }
        });
    };

    window.setCountDownRadius = function (r) {
        var val = isNaN(Number(r)) ? r : Number(r) + 'px';
        _allCdEls.forEach(function(el) {
            el.style.setProperty('--cd-radius', val);
            var b = el.querySelector('.ladi-html-code') || el.querySelector('.ladi-box');
            if (b) b.style.borderRadius = val;
        });
    };

    window.setCountDownBg = function (type, c1, c2, angle) {
        _allCdEls.forEach(function(el) {
            var b = el.querySelector('.ladi-html-code') || el.querySelector('.ladi-box');
            if (!b) return;
            if (!type || type === 'none') {
                b.style.removeProperty('background');
            } else if (type === 'solid') {
                b.style.background = c1 || 'transparent';
            } else if (type === 'gradient') {
                b.style.background = 'linear-gradient(' + (angle || 180) + 'deg, ' + (c1 || '#ECDBD4') + ', ' + (c2 || '#ffffff') + ')';
            }
        });
    };

    var _CD_SVG = {
        heart:  '<svg class="cd-shape-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1896.0833"><path d="M896 1664q-26 0-44-18l-624-602q-10-8-27.5-26T145 952.5 77 855 23.5 734 0 596q0-220 127-344t351-124q62 0 126.5 21.5t120 58T820 276t76 68q36-36 76-68t95.5-68.5 120-58T1314 128q224 0 351 124t127 344q0 221-229 450l-623 600q-18 18-44 18z"/></svg>',
        star:   '<svg class="cd-shape-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1664 1896.0833"><path d="M1664 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5T1321 1619q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5T301 1569q0-6 2-20l86-500L25 695Q0 668 0 647q0-37 56-46l502-73L783 73q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"/></svg>',
        flower: '<svg class="cd-shape-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150.1 150"><path d="M140.1,54.4a36,36,0,0,1,4.4-22.5A19.4,19.4,0,0,0,118.2,5.3,36.1,36.1,0,0,1,95.8,9.9,35.7,35.7,0,0,1,75.2.2V0h-.3l-.2.2A37.2,37.2,0,0,1,54,9.9,35.9,35.9,0,0,1,31.7,5.3,19,19,0,0,0,17,3.4a19.1,19.1,0,0,0-11.8,9,19.4,19.4,0,0,0,.1,19.4A35.6,35.6,0,0,1,9.7,54.3,36.1,36.1,0,0,1,.2,74.7l-.2.2v.3l.2.2A37.2,37.2,0,0,1,9.9,95.9a35.9,35.9,0,0,1-4.6,22.3,19.4,19.4,0,0,0,26.6,26.4,35.6,35.6,0,0,1,22.5-4.4,36.9,36.9,0,0,1,20.3,9.6l.2.2h.5A37.2,37.2,0,0,1,96,140.2a35.9,35.9,0,0,1,22.3,4.6,19.3,19.3,0,0,0,26.5-7.1,19.5,19.5,0,0,0-.1-19.5,35.6,35.6,0,0,1-4.4-22.5,36.9,36.9,0,0,1,9.6-20.3l.2-.2v-.3l-.2-.2a35.4,35.4,0,0,1-9.8-20.3Z"/></svg>'
    };

    window.setCountDownItemShape = function (shape) {
        _allCdEls.forEach(function(el) {
            var b = el.querySelector('.ladi-html-code') || el.querySelector('.ladi-box');
            if (!b) return;
            b.querySelectorAll('.cd-shape-svg').forEach(function(s) { s.parentNode.removeChild(s); });
            if (shape && shape !== 'none') {
                el.dataset.cdItemShape = shape;
                if (_CD_SVG[shape]) {
                    b.querySelectorAll('.countdown-shape').forEach(function(sh) {
                        sh.insertAdjacentHTML('afterbegin', _CD_SVG[shape]);
                    });
                }
            } else {
                delete el.dataset.cdItemShape;
            }
        });
    };

    window.setCountDownNumFontSize = function (size) {
        _allCdEls.forEach(function(el) {
            if (size) el.style.setProperty('--cd-num-fs', size + 'px');
            else el.style.removeProperty('--cd-num-fs');
        });
    };

    window.setCountDownLabelFontSize = function (size) {
        _allCdEls.forEach(function(el) {
            if (size) el.style.setProperty('--cd-label-fs', size + 'px');
            else el.style.removeProperty('--cd-label-fs');
        });
    };

    window.setCountDownItemSize = function (size) {
        if (size != null) {
            _allCdEls.forEach(function(el) {
                el.style.setProperty('--cd-item-size', Number(size) + 'px');
            });
        }
    };

    window.setCountDownItemBg = function (color) {
        _allCdEls.forEach(function(el) {
            if (color) {
                el.style.setProperty('--cd-item-bg', color);
            } else {
                if (typeof cdBorderColor1 !== 'undefined') {
                    el.style.setProperty('--cd-item-bg', colorToRgba(cdBorderColor1, 0.12));
                } else {
                    el.style.removeProperty('--cd-item-bg');
                }
            }
        });
    };

    window.setCountDownStyle = function (style) {
        _allCdEls.forEach(function(el) {
            if (style && style !== 'vertical') {
                el.dataset.cdStyle = style;
            } else {
                delete el.dataset.cdStyle;
            }
        });
    };

    // Áp dụng hình dạng + bố cục + font size + màu từ template vars (sau khi tất cả functions đã defined)
    var _initShape = (typeof cdItemShape !== 'undefined') ? cdItemShape : 'none';
    window.setCountDownItemShape(_initShape);
    if (typeof cdStyle !== 'undefined') window.setCountDownStyle(cdStyle);

    // Màu riêng cho số và chữ nhãn
    if (typeof cdNumberColor !== 'undefined' && cdNumberColor) {
        window.setCountDownColor(cdNumberColor);
    }
    if (typeof cdLabelColor !== 'undefined' && cdLabelColor) {
        window.setCountDownLabelColor(cdLabelColor);
    }

    if (typeof cdNumFontSize !== 'undefined' && cdNumFontSize > 0) {
        window.setCountDownNumFontSize(cdNumFontSize);
    }
    if (typeof cdLabelFontSize !== 'undefined' && cdLabelFontSize > 0) {
        window.setCountDownLabelFontSize(cdLabelFontSize);
    }

    // Mobile sizes — áp dụng cho tất cả elements
    _allCdEls.forEach(function(el) {
        if (typeof cdMobileItemSize !== 'undefined' && cdMobileItemSize > 0)
            el.style.setProperty('--cd-item-size-m', cdMobileItemSize + 'px');
        if (typeof cdMobileNumFontSize !== 'undefined' && cdMobileNumFontSize > 0)
            el.style.setProperty('--cd-num-fs-m', cdMobileNumFontSize + 'px');
        if (typeof cdMobileLabelFontSize !== 'undefined' && cdMobileLabelFontSize > 0)
            el.style.setProperty('--cd-label-fs-m', cdMobileLabelFontSize + 'px');
    });

    // Khởi tạo HTML cho các elements thứ 2 trở đi (mobile/desktop duplicate)
    _allCdEls.forEach(function(el) {
        if (el === cdEl) return;
        var b = el.querySelector('.ladi-box');
        if (!b) return;
        // Copy HTML, bỏ id để tránh duplicate
        b.innerHTML = box.innerHTML.replace(/\s+id="[^"]*"/g, '');
        b.style.cssText = box.style.cssText;
        // Copy CSS vars từ primary
        var primaryStyle = window.getComputedStyle(cdEl);
        ['--cd-border-c1','--cd-border-c2','--cd-border-w','--cd-border-angle',
         '--cd-radius','--cd-shadow','--cd-item-bg','--cd-item-size',
         '--cd-num-fs','--cd-label-fs',
         '--cd-item-size-m','--cd-num-fs-m','--cd-label-fs-m'].forEach(function(v) {
            var val = cdEl.style.getPropertyValue(v);
            if (val) el.style.setProperty(v, val);
        });
        // Copy data attributes
        if (cdEl.dataset.cdItemShape) el.dataset.cdItemShape = cdEl.dataset.cdItemShape;
        else delete el.dataset.cdItemShape;
        if (cdEl.dataset.cdStyle) el.dataset.cdStyle = cdEl.dataset.cdStyle;
        else delete el.dataset.cdStyle;
    });

    startInterval();
})();

// ── Scroll-enter effects (view mode — không chạy trong edit mode) ──
(function () {
    if (document.querySelector('[data-wb-edit-ui]')) return;

    function showGlowRing(el) {
        var ring = document.createElement('div');
        ring.className = 'wb-glow-ring';
        document.body.appendChild(ring);
        function update() {
            var r = el.getBoundingClientRect();
            ring.style.cssText = 'position:fixed;top:' + (r.top - 4) + 'px;left:' + (r.left - 4) + 'px;width:' + (r.width + 8) + 'px;height:' + (r.height + 8) + 'px;z-index:999990;box-sizing:border-box;';
        }
        update();
        window.addEventListener('scroll', update, { passive: true });
        setTimeout(function () {
            window.removeEventListener('scroll', update);
            if (ring.parentNode) ring.parentNode.removeChild(ring);
        }, 2100);
    }

    var _ITEM_MAP = {
        'edit_countDown':   { sel: '.countdown-item', globalSel: null, delay: 90,  cls: 'cd-item-enter'  },
        'edit_Timeline':    { sel: '.wb-tl-row',      globalSel: null, delay: 150, cls: 'wb-scroll-item' },
        'edit_RPSV':        { sel: '.wb-form-field',  globalSel: null, delay: 140, cls: 'wb-scroll-item' },
        'edit_sendMessage': { sel: '.wb-form-field',  globalSel: null, delay: 140, cls: 'wb-scroll-item' },
        'edit_dressCode':   { sel: '.dc-swatch-wrap', globalSel: null, delay: 70,  cls: 'wb-scroll-item' },
    };

    function animateItems(el, attempt) {
        attempt = attempt || 0;
        var cls, cfg, items;
        for (cls in _ITEM_MAP) {
            if (!el.classList.contains(cls)) continue;
            cfg = _ITEM_MAP[cls];
            var nodeList = cfg.globalSel
                ? document.querySelectorAll(cfg.globalSel)
                : el.querySelectorAll(cfg.sel);
            items = Array.prototype.slice.call(nodeList);
            if (!items.length && attempt < 6) {
                setTimeout(function() { animateItems(el, attempt + 1); }, 300);
                return;
            }
            items.forEach(function(item, i) {
                item.style.animationDelay = (i * cfg.delay) + 'ms';
                item.classList.add(cfg.cls);
            });
            var end = 900 + items.length * cfg.delay;
            var _cfg = cfg;
            setTimeout(function() {
                items.forEach(function(item) {
                    item.classList.remove(_cfg.cls);
                    item.style.animationDelay = '';
                });
            }, end);
            break;
        }
    }

    function animateCalendarItems(attempt) {
        attempt = attempt || 0;
        var allCells = Array.prototype.slice.call(document.querySelectorAll('#calendar-body .calendar-day'));
        if (!allCells.length && attempt < 6) {
            setTimeout(function() { animateCalendarItems(attempt + 1); }, 300);
            return;
        }
        allCells.forEach(function(item, i) {
            var d = i * 80;
            item.style.animationDelay = d + 'ms';
            item.style.setProperty('--cal-delay', d + 'ms');

            if (item.classList.contains('selected')) {
                item.classList.add('cal-selected-burst-enter');
                // Sau khi animation enter xong → chuyển sang bob vĩnh viễn
                setTimeout(function(el) {
                    return function() {
                        el.classList.remove('cal-selected-burst-enter');
                        el.style.animationDelay = '';
                        el.style.removeProperty('--cal-delay');
                        el.classList.add('cal-selected-bob');
                    };
                }(item), d + 1380);
            } else if (item.classList.contains('empty')) {
                item.classList.add('cal-empty-enter'); // animation kết thúc ở opacity 0.35
            } else {
                item.classList.add('cal-day-enter');
            }
        });

        setTimeout(function() {
            allCells.forEach(function(item) {
                if (item.classList.contains('cal-selected-bob')) return; // giữ nguyên
                item.classList.remove('cal-day-enter', 'cal-empty-enter', 'cal-selected-burst-enter');
                item.style.animationDelay = '';
                item.style.removeProperty('--cal-delay');
            });
        }, allCells.length * 80 + 1700);
    }

    function attachEnterEffect(el) {
        if (!el || el._seInited) return;
        el._seInited = true;
        // rootMargin '-22% 0px -22% 0px' → chỉ trigger khi phần tử vào vùng giữa 56% màn hình
        var obs = new IntersectionObserver(function (entries) {
            if (!entries[0].isIntersecting) return;
            obs.disconnect();
            animateItems(el);
        }, { threshold: 0.12, rootMargin: '-22% 0px -22% 0px' });
        obs.observe(el);
    }

    function attachCalendarEnterEffect(el) {
        if (!el || el._seInited) return;
        el._seInited = true;
        var obs = new IntersectionObserver(function (entries) {
            if (!entries[0].isIntersecting) return;
            obs.disconnect();
            animateCalendarItems();
        }, { threshold: 0.3, rootMargin: '0px 0px -15% 0px' });
        obs.observe(el);
    }

    window.addEventListener('load', function () {
        attachCalendarEnterEffect(document.querySelector('.edit_Calendar'));
        ['edit_Timeline', 'edit_RPSV', 'edit_sendMessage', 'edit_countDown', 'edit_dressCode'].forEach(function (cls) {
            attachEnterEffect(document.querySelector('.' + cls));
        });
    });
})();






