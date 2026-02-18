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

    // Init from localStorage or system preference
    const saved = localStorage.getItem('theme');
    if (saved) {
        setTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    }

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
// TEMPLATE SLIDER (index.html)
// ============================================
(function () {
    const track = document.getElementById('templatesTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentPosition = 0;
    const cardWidth = 305;

    function updateSlider() {
        if (track) track.style.transform = `translateX(${currentPosition}px)`;
    }

    if (prevBtn && nextBtn && track) {
        prevBtn.addEventListener('click', () => {
            if (currentPosition < 0) {
                currentPosition += cardWidth;
                updateSlider();
            }
        });

        nextBtn.addEventListener('click', () => {
            const maxScroll = -(track.children.length - 3) * cardWidth;
            if (currentPosition > maxScroll) {
                currentPosition -= cardWidth;
                updateSlider();
            }
        });
    }
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

    document.querySelectorAll('.service-card, .template-card, .benefit-card, .process-step, .pricing-card, .target-card, .product-card').forEach(el => {
        observer.observe(el);
    });
})();
