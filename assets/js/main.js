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
                        <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
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
                manualTimeout = setTimeout(startAuto, 10000);
            }
        });
    });

    function goNext() {
        currentIndex = (currentIndex + 1) % total;
        updateSlider();
    }

    function startAuto() {
        stopAuto();
        autoTimer = setInterval(goNext, 5000);
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
        manualTimeout = setTimeout(startAuto, 10000);
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
// SCROLL ANIMATIONS (IntersectionObserver)
// ============================================
(function () {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .benefit-card, .process-step, .pricing-card, .target-card, .product-card').forEach(el => {
        observer.observe(el);
    });
})();
