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
                        <img src="${p.thumbnail}" alt="${p.name}" loading="lazy">
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
// HEADER SCROLL EFFECT — hide on scroll down, show on scroll up
// ============================================
(function () {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollY = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;

                if (currentScrollY > 50) {
                    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                } else {
                    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                }

                // Hide/show based on scroll direction
                if (currentScrollY > lastScrollY && currentScrollY > 80) {
                    header.classList.add('header-hidden');
                } else {
                    header.classList.remove('header-hidden');
                }

                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
})();

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

