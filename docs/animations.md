# Animation Library

Tài liệu tổng hợp các animation sử dụng trong Templexa. Copy CSS + JS tương ứng để áp dụng cho web khác.

---

## 1. Fade In Up (Scroll)

Các element trượt lên + fade in khi scroll vào viewport. Có stagger delay giữa các item cùng nhóm.

**Hiệu ứng:** opacity 0 → 1, translateY(30px) → 0

### CSS

```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeInUp 1s ease forwards;
}
```

### JS (IntersectionObserver + stagger)

```js
(function () {
    const observerOptions = {
        threshold: 0.1,              // Kích hoạt khi 10% element visible
        rootMargin: '0px 0px -50px 0px'  // Trigger sớm hơn 50px từ bottom
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger delay dựa trên vị trí trong parent
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.children) : [];
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = (index * 120) + 'ms';

                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Áp dụng cho các element cần animate
    document.querySelectorAll('.card, .grid-item').forEach(el => {
        observer.observe(el);
    });
})();
```

### Cách dùng

```html
<div class="grid">
    <div class="card">Card 1</div>  <!-- delay 0ms -->
    <div class="card">Card 2</div>  <!-- delay 120ms -->
    <div class="card">Card 3</div>  <!-- delay 240ms -->
    <div class="card">Card 4</div>  <!-- delay 360ms -->
</div>
```

### Tuỳ chỉnh

| Tham số | Giá trị hiện tại | Gợi ý |
|---------|-------------------|-------|
| Duration | `1s` | Nhanh hơn: `0.6s`, chậm hơn: `1.4s` |
| translateY | `30px` | Nhẹ: `15px`, mạnh: `50px` |
| Stagger delay | `120ms` | Nhanh: `80ms`, chậm: `200ms` |
| threshold | `0.1` | Trigger sớm: `0.05`, muộn: `0.3` |
| rootMargin bottom | `-50px` | Trigger sớm hơn: `-100px` |

---

## 2. Hero Stagger Reveal

Các element trong hero section hiện dần theo thứ tự (badge → heading → description → CTA) bằng CSS transition + JS thêm class.

**Hiệu ứng:** opacity 0 → 1, translateY(16px) → 0, stagger 150ms

### CSS

```css
.hero-reveal {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1),
                transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-reveal.visible {
    opacity: 1;
    transform: translateY(0);
}
```

### JS

```js
// Thêm class .visible theo thứ tự, cách nhau 150ms
document.querySelectorAll('.hero-reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 150);
});
```

### Cách dùng

```html
<section class="hero">
    <div class="hero-reveal">Badge</div>       <!-- 0ms -->
    <h1 class="hero-reveal">Heading</h1>       <!-- 150ms -->
    <p class="hero-reveal">Description</p>     <!-- 300ms -->
    <a class="hero-reveal">CTA Button</a>      <!-- 450ms -->
</section>
```

### Tuỳ chỉnh

| Tham số | Giá trị hiện tại | Gợi ý |
|---------|-------------------|-------|
| Duration | `1.2s` | Nhanh: `0.7s`, chậm: `1.6s` |
| translateY | `16px` | Nhẹ: `10px`, mạnh: `30px` |
| Stagger | `150ms` | Nhanh: `100ms`, chậm: `250ms` |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` | Mượt, decelerate tự nhiên |

---

## 3. Slide Left / Slide Right (Scroll)

Hai element trượt vào từ hai bên khi scroll vào viewport. Thường dùng cho layout 2 cột (text + image).

**Hiệu ứng:** translateX(±40px) → 0, opacity 0 → 1

### CSS

```css
.anim-slide-left {
    opacity: 0;
    transform: translateX(-40px);
    transition: opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1),
                transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.anim-slide-right {
    opacity: 0;
    transform: translateX(40px);
    transition: opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1),
                transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.anim-slide-left.anim-visible,
.anim-slide-right.anim-visible {
    opacity: 1;
    transform: translateX(0);
}
```

### JS (IntersectionObserver)

```js
(function () {
    const slideElements = document.querySelectorAll('.anim-slide-left, .anim-slide-right');
    if (!slideElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    slideElements.forEach(el => observer.observe(el));
})();
```

### Cách dùng

```html
<section class="two-col">
    <div class="anim-slide-left">Text content</div>
    <div class="anim-slide-right">
        <img src="image.png" alt="">
    </div>
</section>
```

### Tuỳ chỉnh

| Tham số | Giá trị hiện tại | Gợi ý |
|---------|-------------------|-------|
| Duration | `1.2s` | Nhanh: `0.8s`, chậm: `1.6s` |
| translateX | `±40px` | Nhẹ: `±20px`, mạnh: `±80px` |
| threshold | `0.15` | Trigger sớm: `0.05`, muộn: `0.3` |

---

## 4. Float (Lơ lửng liên tục)

Element lơ lửng lên xuống liên tục. Dùng cho ảnh minh hoạ, mascot, icon decorative.

**Hiệu ứng:** translateY(0) → translateY(-10px) → translateY(0), lặp vô hạn

### CSS

```css
@keyframes showcaseFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

.float-active {
    animation: showcaseFloat 5s ease-in-out infinite;
}
```

### JS (kích hoạt sau slide-in)

```js
// Bắt đầu float sau khi slide-in animation hoàn tất
if (entry.target.classList.contains('anim-slide-right')) {
    const inner = entry.target.querySelector('.float-element');
    if (inner) {
        setTimeout(() => inner.classList.add('float-active'), 1200);
    }
}
```

### Cách dùng

```html
<!-- Dùng trực tiếp -->
<div class="float-active">
    <img src="illustration.svg" alt="">
</div>

<!-- Hoặc kết hợp với slide-in (JS thêm class sau) -->
<div class="anim-slide-right">
    <div class="float-element">
        <img src="illustration.svg" alt="">
    </div>
</div>
```

### Tuỳ chỉnh

| Tham số | Giá trị hiện tại | Gợi ý |
|---------|-------------------|-------|
| Duration | `5s` | Nhanh: `3s`, chậm: `8s` |
| translateY | `-10px` | Nhẹ: `-5px`, mạnh: `-20px` |
| Delay sau slide-in | `1200ms` | Bằng duration slide-in |

---

## 5. Gradient Shift (Background liên tục)

Background gradient di chuyển liên tục tạo hiệu ứng ánh sáng. Dùng cho hero overlay, decorative background.

**Hiệu ứng:** background-position dịch chuyển 0% → 100% → 0%, lặp vô hạn

### CSS

```css
@keyframes heroGradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

.gradient-overlay {
    background: linear-gradient(135deg,
        rgba(99, 102, 241, 0.06) 0%,
        rgba(168, 85, 247, 0.08) 25%,
        rgba(59, 130, 246, 0.06) 50%,
        rgba(99, 102, 241, 0.08) 75%,
        rgba(168, 85, 247, 0.06) 100%);
    background-size: 400% 400%;
    animation: heroGradientShift 10s ease infinite;
}
```

### Cách dùng

```html
<!-- Dùng như pseudo-element overlay -->
<section class="hero">
    <!-- content -->
</section>

<style>
.hero::after {
    content: '';
    position: absolute;
    inset: 0;
    /* gradient + animation ở trên */
    pointer-events: none;
}
</style>
```

### Tuỳ chỉnh

| Tham số | Giá trị hiện tại | Gợi ý |
|---------|-------------------|-------|
| Duration | `10s` | Nhanh: `6s`, chậm: `15s` |
| background-size | `400% 400%` | Nhiều chuyển động hơn: `600% 600%` |
| Màu gradient | `rgba(indigo/purple/blue)` | Thay theo brand color |

---

## 6. Glow Pulse (One-time)

Button phát sáng 1 lần khi scroll vào viewport. Tạo sự chú ý cho CTA.

**Hiệu ứng:** box-shadow nhỏ → lớn + phát sáng → nhỏ lại, chạy 1 lần

### CSS

```css
@keyframes ctaGlowPulse {
    0% {
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
    }
    50% {
        box-shadow: 0 15px 45px rgba(99, 102, 241, 0.6),
                    0 0 25px rgba(99, 102, 241, 0.3);
    }
    100% {
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
    }
}

.cta-btn.glow-pulse {
    animation: ctaGlowPulse 1.5s ease;
}
```

### JS (IntersectionObserver + delay)

```js
(function () {
    const ctaBtn = document.querySelector('.cta-btn');
    if (!ctaBtn) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Đợi 3s trong viewport rồi mới pulse
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
```

### Tuỳ chỉnh

| Tham số | Giá trị hiện tại | Gợi ý |
|---------|-------------------|-------|
| Duration | `1.5s` | Nhanh: `0.8s`, chậm: `2s` |
| Delay trong viewport | `3000ms` | Ngay lập tức: `0`, lâu hơn: `5000ms` |
| Shadow intensity | `0.6` | Nhẹ: `0.4`, mạnh: `0.8` |
| Màu glow | `rgba(99, 102, 241)` | Thay theo brand color |

---

## 7. Butterfly 3D Flap

Cánh bướm 3D vỗ liên tục bằng rotateY. Dùng cho decorative element.

**Hiệu ứng:** rotateY(0°) → rotateY(55°) → rotateY(0°), cánh phải chạy reverse

### CSS

```css
@keyframes butterflyFlap {
    0%, 100% { transform: rotateY(0deg); }
    50% { transform: rotateY(55deg); }
}

.butterfly {
    position: absolute;
    width: 90px;
    height: 60px;
    will-change: transform;
    perspective: 200px;
}

.butterfly-wing {
    position: absolute;
    top: 0;
    width: 45px;
    height: 60px;
    transform-style: preserve-3d;
}

.butterfly-wing-left {
    right: 50%;
    transform-origin: right center;
    animation: butterflyFlap 1s ease-in-out infinite;
}

.butterfly-wing-right {
    left: 50%;
    transform-origin: left center;
    animation: butterflyFlap 1s ease-in-out infinite reverse;
}
```

### Tuỳ chỉnh

| Tham số | Giá trị hiện tại | Gợi ý |
|---------|-------------------|-------|
| Duration | `1s` | Nhanh: `0.5s`, chậm: `1.5s` |
| rotateY max | `55deg` | Nhẹ: `30deg`, mạnh: `70deg` |
| perspective | `200px` | Sâu hơn: `150px`, phẳng hơn: `300px` |

---

## 8. Sparkle Fade

Hạt lấp lánh thu nhỏ rồi biến mất. Dùng kết hợp với butterfly hoặc decorative trail.

**Hiệu ứng:** scale(1) + opacity 1 → scale(0.1) + opacity 0

### CSS

```css
@keyframes sparkleFade {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.6;
        transform: scale(0.7);
    }
    100% {
        opacity: 0;
        transform: scale(0.1);
    }
}

.sparkle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    animation: sparkleFade 1.8s ease-out forwards;
}

/* Variant: glow tím */
.sparkle-purple {
    background: radial-gradient(circle,
        rgba(236, 72, 153, 0.9),
        rgba(168, 85, 247, 0.4),
        transparent);
    box-shadow: 0 0 4px rgba(236, 72, 153, 0.5);
}

/* Variant: glow xanh */
.sparkle-cyan {
    background: radial-gradient(circle,
        rgba(52, 211, 153, 0.9),
        rgba(6, 182, 212, 0.4),
        transparent);
    box-shadow: 0 0 4px rgba(52, 211, 153, 0.5);
}
```

### Tuỳ chỉnh

| Tham số | Giá trị hiện tại | Gợi ý |
|---------|-------------------|-------|
| Duration | `1.8s` | Nhanh: `0.8s`, chậm: `2.5s` |
| Scale min | `0.1` | Biến mất hoàn toàn: `0`, giữ lại: `0.3` |

---

## 9. Modal Scale In

Modal xuất hiện với hiệu ứng scale + slide nhẹ.

**Hiệu ứng:** scale(0.95) + translateY(10px) + opacity 0 → scale(1) + translateY(0) + opacity 1

### CSS

```css
@keyframes modalIn {
    from {
        opacity: 0;
        transform: scale(0.95) translateY(10px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.modal-content {
    animation: modalIn 0.3s ease;
}
```

### Tuỳ chỉnh

| Tham số | Giá trị hiện tại | Gợi ý |
|---------|-------------------|-------|
| Duration | `0.3s` | Nhanh: `0.15s`, chậm: `0.5s` |
| Scale start | `0.95` | Mạnh hơn: `0.85`, nhẹ hơn: `0.98` |
| translateY start | `10px` | Mạnh hơn: `20px` |

---

## 10. Header Shadow on Scroll

Header thay đổi box-shadow khi scroll xuống. Tạo cảm giác "nổi lên" khi scroll.

### JS

```js
(function () {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });
})();
```

### Tuỳ chỉnh

| Tham số | Giá trị hiện tại | Gợi ý |
|---------|-------------------|-------|
| Scroll threshold | `50px` | Sớm hơn: `20px`, muộn hơn: `100px` |
| Shadow khi scroll | `0 4px 20px rgba(0,0,0,0.1)` | Đậm hơn: `rgba(0,0,0,0.15)` |

---

## Accessibility: Reduced Motion

Luôn thêm block này để tắt animation cho người dùng nhạy cảm với chuyển động:

```css
@media (prefers-reduced-motion: reduce) {
    .animate-fade-in {
        animation-duration: 0.01ms;
    }

    .hero-reveal {
        opacity: 1;
        transform: none;
        transition: none;
    }

    .anim-slide-left,
    .anim-slide-right {
        opacity: 1;
        transform: none;
        transition: none;
    }

    .float-active {
        animation: none;
    }

    .cta-btn.glow-pulse {
        animation: none;
    }
}
```

JS check:

```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Skip animation logic if true
```

---

## Tổng hợp nhanh

| # | Tên | Loại | Duration | Trigger | Lặp lại |
|---|-----|------|----------|---------|---------|
| 1 | Fade In Up | Keyframe | 1s | Scroll (Observer) | 1 lần |
| 2 | Hero Stagger Reveal | Transition | 1.2s | Page load (JS) | 1 lần |
| 3 | Slide Left/Right | Transition | 1.2s | Scroll (Observer) | 1 lần |
| 4 | Float | Keyframe | 5s | Sau slide-in | Infinite |
| 5 | Gradient Shift | Keyframe | 10s | Auto | Infinite |
| 6 | Glow Pulse | Keyframe | 1.5s | Scroll + delay 3s | 1 lần |
| 7 | Butterfly Flap | Keyframe | 1s | Auto | Infinite |
| 8 | Sparkle Fade | Keyframe | 1.8s | JS tạo động | 1 lần (forwards) |
| 9 | Modal Scale In | Keyframe | 0.3s | Modal open | 1 lần |
| 10 | Header Shadow | JS inline | Instant | Scroll | Liên tục |
