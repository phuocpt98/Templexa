// ============================================
// DARK MODE
// ============================================
(function () {
    const toggle = document.getElementById('darkModeToggle');
    if (!toggle) return;

    const iconMoon = toggle.querySelector('.icon-moon');
    const iconSun = toggle.querySelector('.icon-sun');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (iconMoon && iconSun) {
            iconMoon.style.display = theme === 'dark' ? 'none' : '';
            iconSun.style.display = theme === 'dark' ? '' : 'none';
        }
    }

    // Init from localStorage — default light
    const saved = localStorage.getItem('theme');
    setTheme(saved || 'light');

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
})();

// ============================================
// MOBILE HAMBURGER MENU
// ============================================
(function () {
    const hamburger = document.getElementById('hamburgerBtn');
    const nav = document.getElementById('navMenu');
    const overlay = document.getElementById('mobileOverlay');

    if (!hamburger || !nav) return;

    function toggleMenu() {
        hamburger.classList.toggle('active');
        nav.classList.toggle('open');
        if (overlay) overlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Close menu when clicking a nav link
    nav.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
})();

// ============================================
// TEMPLATE SLIDER (index.html) — carousel 3 cards
// ============================================
(function () {
    const track = document.getElementById('templatesTrack');
    if (!track || typeof getSliderProducts === 'undefined') return;

    const sliderProducts = getSliderProducts();
    const total = sliderProducts.length;
    if (total === 0) return;

    let currentIndex = 0;
    let autoTimer = null;
    let manualTimeout = null;

    // Render cards — link chỉ hoạt động trên card active
    track.innerHTML = sliderProducts.map((p, i) => {
        const catLabel = CATEGORIES.find(c => c.id === p.category)?.label || p.category;
        return `
            <div class="template-card" data-index="${i}" data-href="product-detail.html?id=${p.id}">
                <div class="template-frame">
                    <span class="template-badge">Most Popular</span>
                    <div class="template-image">
                        <img src="${p.thumbnail || p.images[0]}" alt="${p.name}" loading="lazy">
                    </div>
                </div>
                <div class="template-info">
                    <h3>${p.name}</h3>
                    <p>${catLabel}</p>
                </div>
            </div>
        `;
    }).join('');

    const cards = track.querySelectorAll('.template-card');

    function updateSlider() {
        const prevIndex = (currentIndex - 1 + total) % total;
        const nextIndex = (currentIndex + 1) % total;
        cards.forEach((card, i) => {
            card.classList.remove('slide-active', 'slide-prev', 'slide-next');
            card.style.cursor = 'default';
            if (i === currentIndex) {
                card.classList.add('slide-active');
                card.style.cursor = 'pointer';
            } else if (i === prevIndex) {
                card.classList.add('slide-prev');
                card.style.cursor = 'pointer';
            } else if (i === nextIndex) {
                card.classList.add('slide-next');
                card.style.cursor = 'pointer';
            }
        });
    }

    // Click card: active → chi tiết, prev/next → chuyển ra giữa
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const idx = Number(card.dataset.index);
            if (card.classList.contains('slide-active')) {
                window.location.href = card.dataset.href;
            } else if (card.classList.contains('slide-prev') || card.classList.contains('slide-next')) {
                stopAuto();
                if (manualTimeout) clearTimeout(manualTimeout);
                currentIndex = idx;
                updateSlider();
                manualTimeout = setTimeout(startAuto, 6000);
            }
        });
    });

    function goNext() {
        currentIndex = (currentIndex + 1) % total;
        updateSlider();
    }

    function startAuto() {
        stopAuto();
        autoTimer = setInterval(goNext, 3000);
    }

    function stopAuto() {
        if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    // Mobile prev/next buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    function handleBtnClick(direction) {
        stopAuto();
        if (manualTimeout) clearTimeout(manualTimeout);
        currentIndex = direction === 'next'
            ? (currentIndex + 1) % total
            : (currentIndex - 1 + total) % total;
        updateSlider();
        manualTimeout = setTimeout(startAuto, 6000);
    }
    if (prevBtn) prevBtn.addEventListener('click', () => handleBtnClick('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => handleBtnClick('next'));

    updateSlider();
    startAuto();
})();

// ============================================
// SMOOTH SCROLL (anchor links)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
(function () {
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            }
        });
    }
})();

// ============================================
// AUTO HOVER — generic for index.html grids
// ============================================
function initAutoHover(gridSelector, cardSelector) {
    // tam bo hover
    return;

    const grid = document.querySelector(gridSelector);
    if (!grid) return;

    const cards = grid.querySelectorAll(cardSelector);
    if (!cards.length) return;

    let timer;
    let index = 0;

    function start() {
        clearInterval(timer);
        index = 0;
        timer = setInterval(() => {
            cards.forEach(c => c.classList.remove('auto-hover'));
            cards[index % cards.length].classList.add('auto-hover');
            index++;
        }, 1500);
    }

    grid.addEventListener('mouseenter', () => {
        clearInterval(timer);
        cards.forEach(c => c.classList.remove('auto-hover'));
    });
    grid.addEventListener('mouseleave', () => start());

    start();
}

initAutoHover('.benefits-grid', '.benefit-card');

initAutoHover('.services-grid', '.service-card');

// ============================================
// REDUCED MOTION CHECK
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============================================
// HERO STAGGER REVEAL
// ============================================
(function () {
    const heroElements = document.querySelectorAll('.hero-reveal');
    if (!heroElements.length) return;

    if (prefersReducedMotion) {
        heroElements.forEach(el => el.classList.add('visible'));
        return;
    }

    heroElements.forEach((el, i) => {
        el.style.transitionDelay = (i * 100) + 'ms';
    });

    // Trigger after styles are painted
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            heroElements.forEach(el => el.classList.add('visible'));
        });
    });
})();

// ============================================
// SCROLL ANIMATIONS (IntersectionObserver) — with stagger
// ============================================
(function () {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!prefersReducedMotion) {
                    const parent = entry.target.parentElement;
                    const siblings = parent ? Array.from(parent.children) : [];
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = (index * 120) + 'ms';
                }
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .benefit-card, .process-step, .pricing-card, .target-card').forEach(el => {
        observer.observe(el);
    });
})();

// ============================================
// SHOWCASE SLIDE-IN ANIMATION
// ============================================
(function () {
    const slideElements = document.querySelectorAll('.anim-slide-left, .anim-slide-right');
    if (!slideElements.length) return;

    if (prefersReducedMotion) {
        slideElements.forEach(el => el.classList.add('anim-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-visible');

                // Start float animation on showcase image after slide-in completes
                if (entry.target.classList.contains('anim-slide-right')) {
                    const inner = entry.target.querySelector('.showcase-image-inner');
                    if (inner) {
                        setTimeout(() => inner.classList.add('float-active'), 1200);
                    }
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    slideElements.forEach(el => observer.observe(el));
})();

// ============================================
// CTA GLOW PULSE (one-time after 3s in viewport)
// ============================================
(function () {
    if (prefersReducedMotion) return;

    const ctaBtn = document.querySelector('.cta-btn');
    if (!ctaBtn) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    ctaBtn.classList.add('glow-pulse');
                    ctaBtn.addEventListener('animationend', () => {
                        ctaBtn.classList.remove('glow-pulse');
                    }, { once: true });
                }, 3000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(ctaBtn);
})();

// ============================================
// WAVE PARALLAX (showcase section)
// ============================================
(function () {
    if (prefersReducedMotion) return;

    const waveTop = document.querySelector('.showcase-wave-top');
    const waveBottom = document.querySelector('.showcase-wave-bottom');
    const showcase = document.querySelector('.showcase');
    if ((!waveTop && !waveBottom) || !showcase) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const rect = showcase.getBoundingClientRect();
                const windowH = window.innerHeight;

                if (rect.bottom > -100 && rect.top < windowH + 100) {
                    const progress = (rect.top - windowH / 2) * 0.2;
                    if (waveTop) waveTop.style.transform = 'translateY(' + (progress * 0.15) + 'px)';
                    if (waveBottom) waveBottom.style.transform = 'translateY(' + (-progress * 0.15) + 'px)';
                }

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
})();

// ============================================
// BUTTERFLY 3D EFFECT
// ============================================
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var CONFIG = {
        leaderSpeed: 0.15,
        followerSpeed: 0.12,
        followDistance: 100,
        dirChangeInterval: 4000,
        sparkleInterval: 180,
        sparkleMax: 80,
        sparkleTTL: 1200,
        turnSpeed: 0.025,
        edgePadding: 50
    };

    var container = document.createElement('div');
    container.className = 'butterfly-container';
    document.body.appendChild(container);

    // Color palettes
    var PALETTES = {
        leader: {
            uwStops: ['#E879F9', '#C084FC', '#A855F7', '#7C3AED'],
            lwStops: ['#EC4899', '#D946EF', '#A855F7'],
            stroke: '#4C1D95',
            spotCenter: '#EDE9FE', spotEdge: '#A855F7',
            bodyDark: '#1E1B4B', bodyMid: '#312E81', bodyLight: '#3730A3',
            eye: '#C4B5FD', antTip: '#A855F7', dot: '#E0E7FF'
        },
        follower: {
            uwStops: ['#67E8F9', '#22D3EE', '#06B6D4', '#0E7490'],
            lwStops: ['#34D399', '#2DD4BF', '#06B6D4'],
            stroke: '#134E4A',
            spotCenter: '#ECFDF5', spotEdge: '#06B6D4',
            bodyDark: '#134E4A', bodyMid: '#115E59', bodyLight: '#0F766E',
            eye: '#A5F3FC', antTip: '#06B6D4', dot: '#CCFBF1'
        }
    };

    function buildWingSVG(prefix, c, side) {
        var isLeft = side === 'left';
        // Gradient direction
        var gx1 = isLeft ? '1' : '0', gx2 = isLeft ? '0' : '1';

        // Wing paths — left: body at x=45, right: body at x=0
        var upperPath = isLeft
            ? 'M45,22 C43,12 35,2 20,1 C10,0 2,5 1,15 C0,25 5,33 15,34 C25,35 40,28 45,22Z'
            : 'M0,22 C2,12 10,2 25,1 C35,0 43,5 44,15 C45,25 40,33 30,34 C20,35 5,28 0,22Z';
        var lowerPath = isLeft
            ? 'M45,33 C40,38 32,48 22,52 C14,55 7,53 5,47 C3,41 8,36 18,34 C28,32 40,32 45,33Z'
            : 'M0,33 C5,38 13,48 23,52 C31,55 38,53 40,47 C42,41 37,36 27,34 C17,32 5,32 0,33Z';
        var highlightPath = isLeft
            ? 'M43,23 C41,15 35,6 22,5 C14,4 8,8 6,15 C5,22 8,28 16,29 C24,30 38,27 43,23Z'
            : 'M2,23 C4,15 10,6 23,5 C31,4 37,8 39,15 C40,22 37,28 29,29 C21,30 7,27 2,23Z';

        // Vein lines
        var veins = isLeft ? [
            [45,22,16,8], [45,25,6,18], [45,28,3,28],
            [45,35,10,48], [45,34,7,42]
        ] : [
            [0,22,29,8], [0,25,39,18], [0,28,42,28],
            [0,35,35,48], [0,34,38,42]
        ];

        // Spots
        var spots = isLeft
            ? [[16,14,4],[8,24,3],[16,46,2.5]]
            : [[29,14,4],[37,24,3],[29,46,2.5]];

        // Edge highlight dots
        var dots = isLeft
            ? [[8,8,1.2],[3,18,1],[10,50,1]]
            : [[37,8,1.2],[42,18,1],[35,50,1]];

        var s = side.charAt(0); // 'l' or 'r'
        var uwId = prefix + '-uw-' + s;
        var lwId = prefix + '-lw-' + s;
        var spId = prefix + '-sp-' + s;

        var svg = '<svg viewBox="0 0 45 60" xmlns="http://www.w3.org/2000/svg">';
        svg += '<defs>';
        svg += '<linearGradient id="' + uwId + '" x1="' + gx1 + '" y1="0" x2="' + gx2 + '" y2="1">';
        svg += '<stop offset="0%" stop-color="' + c.uwStops[0] + '"/>';
        svg += '<stop offset="30%" stop-color="' + c.uwStops[1] + '"/>';
        svg += '<stop offset="60%" stop-color="' + c.uwStops[2] + '"/>';
        svg += '<stop offset="100%" stop-color="' + c.uwStops[3] + '"/>';
        svg += '</linearGradient>';
        svg += '<linearGradient id="' + lwId + '" x1="' + gx1 + '" y1="0" x2="' + gx2 + '" y2="1">';
        svg += '<stop offset="0%" stop-color="' + c.lwStops[0] + '"/>';
        svg += '<stop offset="50%" stop-color="' + c.lwStops[1] + '"/>';
        svg += '<stop offset="100%" stop-color="' + c.lwStops[2] + '"/>';
        svg += '</linearGradient>';
        svg += '<radialGradient id="' + spId + '">';
        svg += '<stop offset="0%" stop-color="' + c.spotCenter + '" stop-opacity="0.85"/>';
        svg += '<stop offset="100%" stop-color="' + c.spotEdge + '" stop-opacity="0"/>';
        svg += '</radialGradient>';
        svg += '</defs>';

        // Upper wing
        svg += '<path d="' + upperPath + '" fill="url(#' + uwId + ')" stroke="' + c.stroke + '" stroke-width="0.8"/>';
        // Lower wing
        svg += '<path d="' + lowerPath + '" fill="url(#' + lwId + ')" stroke="' + c.stroke + '" stroke-width="0.8"/>';
        // Inner highlight shimmer
        svg += '<path d="' + highlightPath + '" fill="white" opacity="0.13"/>';

        // Veins
        for (var i = 0; i < veins.length; i++) {
            var v = veins[i];
            svg += '<line x1="' + v[0] + '" y1="' + v[1] + '" x2="' + v[2] + '" y2="' + v[3] + '" stroke="' + c.stroke + '" stroke-width="0.4" opacity="0.4" stroke-linecap="round"/>';
        }

        // Spots
        for (var i = 0; i < spots.length; i++) {
            var sp = spots[i];
            svg += '<circle cx="' + sp[0] + '" cy="' + sp[1] + '" r="' + sp[2] + '" fill="url(#' + spId + ')"/>';
        }

        // Edge dots
        for (var i = 0; i < dots.length; i++) {
            var d = dots[i];
            svg += '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="' + d[2] + '" fill="' + c.dot + '" opacity="0.6"/>';
        }

        svg += '</svg>';
        return svg;
    }

    function buildBodySVG(prefix, c) {
        var svg = '<svg class="butterfly-body-svg" viewBox="0 0 14 50" xmlns="http://www.w3.org/2000/svg">';
        svg += '<defs><linearGradient id="' + prefix + '-bd" x1="0" y1="0" x2="0" y2="1">';
        svg += '<stop offset="0%" stop-color="' + c.bodyMid + '"/>';
        svg += '<stop offset="100%" stop-color="' + c.bodyDark + '"/>';
        svg += '</linearGradient></defs>';
        // Body segments
        svg += '<ellipse cx="7" cy="28" rx="2.5" ry="12" fill="url(#' + prefix + '-bd)"/>';
        svg += '<ellipse cx="7" cy="28" rx="1.5" ry="10" fill="' + c.bodyLight + '" opacity="0.4"/>';
        // Body segment lines
        svg += '<line x1="5" y1="24" x2="9" y2="24" stroke="' + c.bodyDark + '" stroke-width="0.3" opacity="0.5"/>';
        svg += '<line x1="5" y1="28" x2="9" y2="28" stroke="' + c.bodyDark + '" stroke-width="0.3" opacity="0.5"/>';
        svg += '<line x1="5" y1="32" x2="9" y2="32" stroke="' + c.bodyDark + '" stroke-width="0.3" opacity="0.5"/>';
        // Head
        svg += '<circle cx="7" cy="14" r="3.2" fill="' + c.bodyDark + '"/>';
        svg += '<circle cx="7" cy="14" r="2.2" fill="' + c.bodyMid + '"/>';
        // Eyes
        svg += '<circle cx="5.3" cy="13.3" r="0.8" fill="' + c.eye + '"/>';
        svg += '<circle cx="8.7" cy="13.3" r="0.8" fill="' + c.eye + '"/>';
        // Antennae
        svg += '<path d="M7,11 C5,6 2.5,3 0.5,0.5" stroke="' + c.bodyMid + '" stroke-width="0.7" fill="none" stroke-linecap="round"/>';
        svg += '<path d="M7,11 C9,6 11.5,3 13.5,0.5" stroke="' + c.bodyMid + '" stroke-width="0.7" fill="none" stroke-linecap="round"/>';
        // Antenna tips
        svg += '<circle cx="0.5" cy="0.5" r="1.4" fill="' + c.antTip + '" opacity="0.9"/>';
        svg += '<circle cx="13.5" cy="0.5" r="1.4" fill="' + c.antTip + '" opacity="0.9"/>';
        svg += '</svg>';
        return svg;
    }

    function createButterfly(role) {
        var el = document.createElement('div');
        el.className = 'butterfly ' + role;
        var c = PALETTES[role];
        var prefix = role === 'leader' ? 'ldr' : 'flw';

        var wl = document.createElement('div');
        wl.className = 'butterfly-wing butterfly-wing-left';
        wl.innerHTML = buildWingSVG(prefix, c, 'left');

        var wr = document.createElement('div');
        wr.className = 'butterfly-wing butterfly-wing-right';
        wr.innerHTML = buildWingSVG(prefix, c, 'right');

        var bodyWrap = document.createElement('div');
        bodyWrap.className = 'butterfly-body-wrap';
        bodyWrap.innerHTML = buildBodySVG(prefix, c);

        el.appendChild(wl);
        el.appendChild(wr);
        el.appendChild(bodyWrap);
        container.appendChild(el);

        return {
            el: el,
            x: Math.random() * (window.innerWidth - 100) + 50,
            y: Math.random() * (window.innerHeight - 100) + 50,
            angle: Math.random() * Math.PI * 2,
            targetAngle: Math.random() * Math.PI * 2
        };
    }

    var leader = createButterfly('leader');
    var follower = createButterfly('follower');
    follower.x = leader.x - Math.cos(leader.angle) * CONFIG.followDistance;
    follower.y = leader.y - Math.sin(leader.angle) * CONFIG.followDistance;

    // ---- Sparkle system (3 trails) ----
    var sparkles = [];

    function spawnTrail(bx, by, angle, role) {
        if (sparkles.length >= CONFIG.sparkleMax) return;
        var backAngle = angle + Math.PI;
        var offsets = [-0.5, 0, 0.5];
        var distances = [14, 9, 14];
        for (var t = 0; t < 3; t++) {
            var a = backAngle + offsets[t];
            var d = distances[t] + Math.random() * 6;
            var sx = bx + Math.cos(a) * d + (Math.random() - 0.5) * 4;
            var sy = by + Math.sin(a) * d + (Math.random() - 0.5) * 4;
            var size = 2 + Math.random() * 5;
            var s = document.createElement('div');
            s.className = 'butterfly-sparkle sparkle-' + role;
            s.style.left = sx + 'px';
            s.style.top = sy + 'px';
            s.style.width = size + 'px';
            s.style.height = size + 'px';
            container.appendChild(s);
            sparkles.push({ el: s, born: performance.now() });
        }
    }

    function cleanSparkles(now) {
        for (var i = sparkles.length - 1; i >= 0; i--) {
            if (now - sparkles[i].born > CONFIG.sparkleTTL) {
                sparkles[i].el.remove();
                sparkles.splice(i, 1);
            }
        }
    }

    // ---- Movement logic ----
    var lastDirChange = 0;
    function updateLeaderTarget(now) {
        if (now - lastDirChange > CONFIG.dirChangeInterval) {
            leader.targetAngle = leader.angle + (Math.random() - 0.5) * Math.PI;
            lastDirChange = now;
        }
    }

    function handleEdges(b) {
        var pad = CONFIG.edgePadding;
        var w = window.innerWidth;
        var h = window.innerHeight;
        if (b.x < pad) b.targetAngle = 0;
        else if (b.x > w - pad) b.targetAngle = Math.PI;
        if (b.y < pad) b.targetAngle = Math.PI / 2;
        else if (b.y > h - pad) b.targetAngle = -Math.PI / 2;
        b.x = Math.max(10, Math.min(w - 10, b.x));
        b.y = Math.max(10, Math.min(h - 10, b.y));
    }

    function lerpAngle(current, target, t) {
        var diff = target - current;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        return current + diff * t;
    }

    // ---- Animation loop ----
    var running = true;
    var lastSparkleL = 0, lastSparkleF = 0, lastTime = 0;

    function tick(timestamp) {
        if (!running) { requestAnimationFrame(tick); return; }
        var dt = lastTime ? Math.min(timestamp - lastTime, 50) : 16;
        lastTime = timestamp;

        // Leader
        updateLeaderTarget(timestamp);
        handleEdges(leader);
        leader.angle = lerpAngle(leader.angle, leader.targetAngle, CONFIG.turnSpeed * dt / 16);
        leader.x += Math.cos(leader.angle) * CONFIG.leaderSpeed * dt;
        leader.y += Math.sin(leader.angle) * CONFIG.leaderSpeed * dt;

        // Follower
        var dx = leader.x - follower.x;
        var dy = leader.y - follower.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        follower.targetAngle = Math.atan2(dy, dx);
        handleEdges(follower);
        follower.angle = lerpAngle(follower.angle, follower.targetAngle, CONFIG.turnSpeed * 1.5 * dt / 16);
        var spd = CONFIG.followerSpeed;
        if (dist > CONFIG.followDistance * 1.5) spd = CONFIG.leaderSpeed * 1.5;
        else if (dist < CONFIG.followDistance * 0.5) spd = CONFIG.followerSpeed * 0.2;
        follower.x += Math.cos(follower.angle) * spd * dt;
        follower.y += Math.sin(follower.angle) * spd * dt;

        // Transforms — position + rotation (head follows flight direction) + bob
        var bob1 = Math.sin(timestamp * 0.002) * 6;
        var bob2 = Math.sin(timestamp * 0.0025 + 1) * 6;

        // SVG head points UP (−90°), so add +90° to align head with movement angle
        var ldeg = leader.angle * (180 / Math.PI) + 90;
        var fdeg = follower.angle * (180 / Math.PI) + 90;
        leader.el.style.transform = 'translate3d(' + leader.x + 'px,' + (leader.y + bob1) + 'px,0) rotate(' + ldeg + 'deg)';
        follower.el.style.transform = 'translate3d(' + follower.x + 'px,' + (follower.y + bob2) + 'px,0) rotate(' + fdeg + 'deg)';

        // Sparkle trails (3 streams each)
        var cx = 45, cy = 30; // center offset of 90x60 butterfly
        if (timestamp - lastSparkleL > CONFIG.sparkleInterval) {
            spawnTrail(leader.x + cx, leader.y + cy + bob1, leader.angle, 'leader');
            lastSparkleL = timestamp;
        }
        if (timestamp - lastSparkleF > CONFIG.sparkleInterval) {
            spawnTrail(follower.x + cx, follower.y + cy + bob2, follower.angle, 'follower');
            lastSparkleF = timestamp;
        }

        cleanSparkles(timestamp);
        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);

    document.addEventListener('visibilitychange', function () {
        running = !document.hidden;
        if (running) lastTime = 0;
    });

    window.addEventListener('resize', function () {
        var w = window.innerWidth;
        var h = window.innerHeight;
        leader.x = Math.min(leader.x, w - 50);
        leader.y = Math.min(leader.y, h - 50);
        follower.x = Math.min(follower.x, w - 50);
        follower.y = Math.min(follower.y, h - 50);
    });
})();
