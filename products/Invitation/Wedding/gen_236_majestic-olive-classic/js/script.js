
      "use strict";
      window.addEventListener("DOMContentLoaded",
      function(event) {
        savepage_ShadowLoader(5);
      },false);
      function savepage_ShadowLoader(c){createShadowDOMs(0,document.documentElement);function createShadowDOMs(a,b){var i;if(b.localName=="iframe"||b.localName=="frame"){if(a<c){try{if(b.contentDocument.documentElement!=null){createShadowDOMs(a+1,b.contentDocument.documentElement)}}catch(e){}}}else{if(b.children.length>=1&&b.children[0].localName=="template"&&b.children[0].hasAttribute("data-savepage-shadowroot")){b.attachShadow({mode:"open"}).appendChild(b.children[0].content);b.removeChild(b.children[0]);for(i=0;i<b.shadowRoot.children.length;i++)if(b.shadowRoot.children[i]!=null)createShadowDOMs(a,b.shadowRoot.children[i])}for(i=0;i<b.children.length;i++)if(b.children[i]!=null)createShadowDOMs(a,b.children[i])}}}
    


// Intro overlay
document.addEventListener("DOMContentLoaded", () => {
    const overlay  = document.getElementById("intro-overlay");
    const video    = document.getElementById("intro-video");
    const fade     = document.getElementById("intro-fade");
    const musicBtn = document.getElementById("music-btn");
    if (!overlay || !video || !fade) return;

    if (musicBtn) musicBtn.style.display = "none";

    // Ẩn hero elements ngay lập tức (không transition)
    const heroEls = Array.from(document.querySelectorAll("#hero-content > *"));
    heroEls.forEach(el => {
        el.style.transition = "none";
        el.style.opacity = "0";
        el.style.transform = "translateY(22px)";
    });

    function revealHero() {
        heroEls.forEach((el, i) => {
            setTimeout(() => {
                el.style.transition = "opacity 0.9s ease, transform 0.9s ease";
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }, i * 700);
        });
    }

    let started = false;
    let fadingIn = false;

    overlay.addEventListener("click", () => {
        if (started) return;
        started = true;
        video.style.display = "block";
        video.play().catch(() => { started = false; });
    });

    // Bắt đầu fade từ 1.5s trước khi video kết thúc
    video.addEventListener("timeupdate", () => {
        if (!fadingIn && video.duration && video.currentTime >= video.duration - 1) {
            fadingIn = true;
            fade.style.transition = "opacity 1.5s ease";
            fade.style.opacity = "1";
        }
    });

    video.addEventListener("ended", () => {
        setTimeout(() => {
            overlay.style.display = "none";
            fade.style.transition = "opacity 2.2s ease";
            fade.style.opacity = "0";
            if (musicBtn) musicBtn.style.display = "";
            setTimeout(() => revealHero(), 700);
            setTimeout(() => fade.style.display = "none", 2300);
        }, 400);
    });
});

// Scroll reveal
document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main");
    if (!main) return;

    // Target: headings, labels, paragraphs, countdown grid, timeline items, images
    const selectors = [
        "h1", "h2", "h3",
        "p.font-body", "p.font-script",
        ".grid > div",
        "section > div > div",
        "img[alt]:not([alt=''])",
    ];

    const heroContent = document.getElementById("hero-content");
    const elements = Array.from(main.querySelectorAll(selectors.join(","))).filter(
        el => !heroContent || !heroContent.contains(el)
    );
    elements.forEach((el, i) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(28px)";
        el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
        el.dataset.revealIndex = i;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                // Stagger nhẹ dựa vào vị trí trong nhóm siblings
                const siblings = Array.from(el.parentElement?.children || []);
                const order = siblings.indexOf(el);
                setTimeout(() => {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                }, order * 80);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    elements.forEach(el => observer.observe(el));
});

// Music toggle
document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bg-music");
    const btn = document.getElementById("music-btn");
    if (!audio || !btn) return;

    const iconVolume = `<svg class="lucide lucide-volume2" fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><path d="M16 9a5 5 0 0 1 0 6"></path><path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path></svg>`;
    const iconMuted = `<svg class="lucide lucide-volume-x" fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><line x1="22" x2="16" y1="9" y2="15"></line><line x1="16" x2="22" y1="9" y2="15"></line></svg>`;

    let playing = false;

    function startMusic() {
        audio.play().then(() => {
            playing = true;
            btn.innerHTML = iconVolume;
            btn.setAttribute("aria-label", "Mute");
        }).catch(() => {});
        document.removeEventListener("click", startOnInteraction);
        document.removeEventListener("keydown", startOnInteraction);
    }

    function startOnInteraction(e) {
        if (e.target === btn) return;
        startMusic();
    }

    document.addEventListener("click", startOnInteraction);
    document.addEventListener("keydown", startOnInteraction);

    btn.addEventListener("click", () => {
        if (playing) {
            audio.pause();
            playing = false;
            btn.innerHTML = iconMuted;
            btn.setAttribute("aria-label", "Play music");
        } else {
            audio.play().then(() => {
                playing = true;
                btn.innerHTML = iconVolume;
                btn.setAttribute("aria-label", "Mute");
            }).catch(() => {});
        }
    });

    // Try autoplay immediately
    audio.play().then(() => {
        playing = true;
        btn.innerHTML = iconVolume;
    }).catch(() => {
        // Autoplay blocked — wait for first interaction
        btn.innerHTML = iconMuted;
        btn.setAttribute("aria-label", "Play music");
    });
});

// Dynamic Countdown
document.addEventListener("DOMContentLoaded", () => {
    const targetDate = new Date("2026-06-20T17:00:00+07:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const dayEl = document.querySelector('[data-countdown="days"]');
        const hourEl = document.querySelector('[data-countdown="hours"]');
        const minuteEl = document.querySelector('[data-countdown="minutes"]');
        const secondEl = document.querySelector('[data-countdown="seconds"]');

        if (dayEl) dayEl.textContent = String(days).padStart(2, "0");
        if (hourEl) hourEl.textContent = String(hours).padStart(2, "0");
        if (minuteEl) minuteEl.textContent = String(minutes).padStart(2, "0");
        if (secondEl) secondEl.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});

// Calendar ICS download
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("calendar-btn");
    if (!btn) return;

    btn.addEventListener("click", () => {
        const ics = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Xuan Thinh & Ngoc Quynh Wedding//EN",
            "BEGIN:VEVENT",
            "DTSTART:20260620T170000",
            "DTEND:20260621T020000",
            "SUMMARY:Xuân Thịnh & Ngọc Quỳnh — Wedding Day",
            "DESCRIPTION:Trân trọng kính mời bạn đến chung vui ngày lễ thành hôn của chúng tôi",
            "LOCATION:Diamond Center - Hoàng Lộc 3, Buôn Ma Thuột",
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\r\n");

        const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "xuan-thinh-ngoc-quynh-wedding.ics";
        a.click();
        URL.revokeObjectURL(url);
    });
});

// ?basic=true → hide After Party
if (new URLSearchParams(window.location.search).get('basic') === 'true') {
    document.querySelectorAll('.after-party-item').forEach(function(el) { el.style.display = 'none'; });
}
