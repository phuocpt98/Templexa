// Template Slider
const track = document.getElementById('templatesTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentPosition = 0;
const cardWidth = 305; // card width + gap

function updateSlider() {
    track.style.transform = `translateX(${currentPosition}px)`;
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
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

// Animation on scroll
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

document.querySelectorAll('.service-card, .template-card, .benefit-card').forEach(el => {
    observer.observe(el);
});
