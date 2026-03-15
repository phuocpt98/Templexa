# Wedding Component Library

Thư viện components dùng chung cho thiệp cưới Templexa.
Mỗi `code.html` là self-contained — copy component cần dùng vào file.

## Cấu trúc thư viện

```
products/shared/wedding/
├── styles.css      # CSS components (16 nhóm)
├── scripts.js      # JS components (12 nhóm)
├── wishes-api.js   # Gửi & đọc lời chúc qua Google Sheets API (file riêng, dùng <script src>)
└── README.md       # Hướng dẫn + HTML snippets + layout patterns
```

## Cách sử dụng

1. Đọc file `styles.css` → copy CSS component cần dùng vào `<style>`
2. Đọc file `scripts.js` → copy JS function cần dùng vào `<script>`
3. Xem HTML snippets bên dưới → copy structure vào `<body>`
4. Tuỳ chỉnh CSS variables (`:root`) theo palette đã chọn

---

## HTML Snippets

### 1. Envelope — Phong bì mở thiệp

```html
<!-- Variant A: Full-screen overlay -->
<div id="envelope" class="envelope">
    <div class="envelope-ornament">❦</div>
    <h1 class="envelope-couple-name">Minh & Ngọc</h1>
    <p class="envelope-date">15 Tháng 6, 2026</p>
    <p class="envelope-invite-text">Trân trọng kính mời</p>
    <button id="envelopeOpenBtn" class="envelope-open-btn">Mở Thiệp</button>
</div>

<!-- Variant B: Card style -->
<div id="envelope" class="envelope-card">
    <div class="envelope-card-inner">
        <div class="envelope-ornament">❦</div>
        <h1 class="envelope-couple-name">Minh & Ngọc</h1>
        <p class="envelope-date">15 Tháng 6, 2026</p>
        <button id="envelopeOpenBtn" class="envelope-open-btn">Mở Thiệp</button>
    </div>
</div>

<!-- Variant C: Truyền thống (nắp gập) -->
<div id="envelope" class="envelope-traditional">
    <div class="envelope-flap"></div>
    <div class="envelope-card-inner">
        <h1 class="envelope-couple-name">Minh & Ngọc</h1>
        <p class="envelope-date">15 Tháng 6, 2026</p>
        <button id="envelopeOpenBtn" class="envelope-open-btn">Mở Thiệp</button>
    </div>
</div>
```

### 2. Countdown

```html
<!-- Variant A: Elegant boxes -->
<div class="countdown">
    <div class="countdown-item">
        <span class="countdown-number" id="days">00</span>
        <span class="countdown-label">Ngày</span>
    </div>
    <div class="countdown-separator">:</div>
    <div class="countdown-item">
        <span class="countdown-number" id="hours">00</span>
        <span class="countdown-label">Giờ</span>
    </div>
    <div class="countdown-separator">:</div>
    <div class="countdown-item">
        <span class="countdown-number" id="minutes">00</span>
        <span class="countdown-label">Phút</span>
    </div>
    <div class="countdown-separator">:</div>
    <div class="countdown-item">
        <span class="countdown-number" id="seconds">00</span>
        <span class="countdown-label">Giây</span>
    </div>
</div>

<!-- Variant B: Cards -->
<div class="countdown-cards">
    <div class="countdown-card">
        <span class="countdown-number" id="days">00</span>
        <span class="countdown-label">Ngày</span>
    </div>
    <!-- ... giống Variant A nhưng dùng class countdown-cards -->
</div>

<!-- Variant C: Circular -->
<div class="countdown-circles">
    <div class="countdown-circle">
        <span class="countdown-number" id="days">00</span>
        <span class="countdown-label">Ngày</span>
    </div>
    <!-- ... -->
</div>
```

### 3. Love Story Timeline

```html
<!-- Variant A: Center line (alternating) -->
<div class="timeline">
    <div class="timeline-item animate-fade-up">
        <div class="timeline-dot"></div>
        <div class="timeline-icon">💕</div>
        <div class="timeline-date">Tháng 3, 2020</div>
        <h3 class="timeline-title">Lần Đầu Gặp Nhau</h3>
        <p class="timeline-desc">Chúng mình gặp nhau tại quán cà phê nhỏ...</p>
    </div>
    <div class="timeline-item animate-fade-up" style="--delay: 0.1s">
        <div class="timeline-dot"></div>
        <div class="timeline-icon">🌹</div>
        <div class="timeline-date">Tháng 6, 2020</div>
        <h3 class="timeline-title">Bắt Đầu Hẹn Hò</h3>
        <p class="timeline-desc">Sau nhiều lần gặp gỡ...</p>
    </div>
    <div class="timeline-item animate-fade-up" style="--delay: 0.2s">
        <div class="timeline-dot"></div>
        <div class="timeline-icon">💍</div>
        <div class="timeline-date">Tháng 12, 2025</div>
        <h3 class="timeline-title">Lời Cầu Hôn</h3>
        <p class="timeline-desc">Dưới ánh hoàng hôn...</p>
    </div>
    <div class="timeline-item animate-fade-up" style="--delay: 0.3s">
        <div class="timeline-dot"></div>
        <div class="timeline-icon">💒</div>
        <div class="timeline-date">Tháng 6, 2026</div>
        <h3 class="timeline-title">Ngày Trọng Đại</h3>
        <p class="timeline-desc">Và hôm nay, chúng mình nên duyên...</p>
    </div>
</div>

<!-- Variant B: Left line -->
<div class="timeline-left">
    <!-- Cùng structure timeline-item nhưng luôn bên trái -->
</div>
```

### 4. Event Cards — Thông tin lễ cưới

```html
<!-- Thiệp đôi: 2 cards -->
<section class="event-section">
    <div class="section-heading">
        <p class="section-subtitle">Thông Tin Hôn Lễ</p>
        <h2 class="section-title">Ngày Trọng Đại</h2>
    </div>
    <div class="event-grid">
        <div class="event-card animate-fade-up">
            <div class="event-card-icon">💒</div>
            <p class="event-card-type">Lễ Vu Quy</p>
            <h3 class="event-card-name">Nhà Gái</h3>
            <div class="event-card-detail">
                <i data-lucide="calendar"></i>
                <span>Chủ Nhật, 15/06/2026</span>
            </div>
            <div class="event-card-detail">
                <i data-lucide="clock"></i>
                <span>09:00 - 11:00</span>
            </div>
            <div class="event-card-detail">
                <i data-lucide="map-pin"></i>
                <span>Tư gia nhà gái</span>
            </div>
            <p class="event-card-address">123 Đường ABC, Quận 1, TP.HCM</p>
            <div class="event-card-parents">
                <strong>Gia đình nhà gái</strong><br>
                Ông Nguyễn Văn A & Bà Trần Thị B
            </div>
        </div>
        <div class="event-card animate-fade-up" style="--delay: 0.15s">
            <div class="event-card-icon">🎊</div>
            <p class="event-card-type">Lễ Thành Hôn</p>
            <h3 class="event-card-name">Tiệc Cưới</h3>
            <div class="event-card-detail">
                <i data-lucide="calendar"></i>
                <span>Chủ Nhật, 15/06/2026</span>
            </div>
            <div class="event-card-detail">
                <i data-lucide="clock"></i>
                <span>17:00 - 21:00</span>
            </div>
            <div class="event-card-detail">
                <i data-lucide="map-pin"></i>
                <span>Nhà hàng XYZ</span>
            </div>
            <p class="event-card-address">456 Đường DEF, Quận 3, TP.HCM</p>
            <div class="event-card-parents">
                <strong>Gia đình nhà trai</strong><br>
                Ông Lê Văn C & Bà Phạm Thị D
            </div>
        </div>
    </div>
</section>

<!-- Thiệp đơn: 1 card -->
<div class="event-grid single">
    <div class="event-card">
        <!-- Chỉ 1 card: Lễ Thành Hôn (nhà trai) hoặc Lễ Vu Quy (nhà gái) -->
    </div>
</div>
```

### 5. Gallery + Lightbox

```html
<section id="gallery">
    <div class="section-heading">
        <p class="section-subtitle">Khoảnh Khắc</p>
        <h2 class="section-title">Album Ảnh Cưới</h2>
    </div>
    <div class="gallery-grid">
        <div class="gallery-item">
            <img src="https://images.unsplash.com/photo-xxx?w=500&q=80" alt="Ảnh cưới 1">
            <div class="gallery-overlay">
                <i data-lucide="maximize-2" class="gallery-overlay-icon"></i>
            </div>
        </div>
        <!-- Thêm 5-8 .gallery-item nữa -->
    </div>
</section>

<!-- Lightbox Modal (đặt cuối body) -->
<div id="lightbox" class="lightbox">
    <button id="lightboxClose" class="lightbox-close">✕</button>
    <button id="lightboxPrev" class="lightbox-nav lightbox-prev">‹</button>
    <img id="lightboxImg" src="" alt="Gallery">
    <button id="lightboxNext" class="lightbox-nav lightbox-next">›</button>
    <div id="lightboxCounter" class="lightbox-counter"></div>
</div>
```

### 6. RSVP Form

```html
<section id="rsvp" class="rsvp-section">
    <div class="section-heading">
        <p class="section-subtitle">Xác Nhận</p>
        <h2 class="section-title">Tham Dự Hôn Lễ</h2>
        <p class="section-desc">Xin vui lòng xác nhận tham dự trước ngày 01/06/2026</p>
    </div>

    <form id="rsvpForm" class="rsvp-form">
        <div class="rsvp-row">
            <input type="text" name="name" class="rsvp-input" placeholder="Họ và tên *" required>
            <input type="tel" name="phone" class="rsvp-input" placeholder="Số điện thoại">
        </div>
        <select name="guests" class="rsvp-select">
            <option value="1">1 khách</option>
            <option value="2">2 khách</option>
            <option value="3">3 khách</option>
            <option value="4">4 khách</option>
            <option value="5">5 khách</option>
        </select>
        <textarea name="message" class="rsvp-textarea" placeholder="Lời nhắn cho cô dâu chú rể..."></textarea>

        <!-- Câu hỏi phụ (optional) -->
        <div class="rsvp-extras">
            <label class="rsvp-checkbox">
                <input type="checkbox" name="sharedRide">
                Tôi sẽ đi chung xe
            </label>
            <label class="rsvp-checkbox">
                <input type="checkbox" name="vegetarian">
                Tôi ăn chay
            </label>
        </div>

        <button type="submit" class="rsvp-submit">Xác Nhận Tham Dự</button>
    </form>

    <div id="rsvpSuccess" class="rsvp-success">
        <div class="rsvp-success-icon">💌</div>
        <p class="rsvp-success-text">Cảm ơn bạn đã xác nhận!<br>Hẹn gặp bạn tại hôn lễ!</p>
    </div>
</section>
```

### 7. Guestbook — Sổ lưu bút

```html
<section id="guestbook" class="guestbook-section">
    <div class="section-heading">
        <p class="section-subtitle">Lời Chúc</p>
        <h2 class="section-title">Sổ Lưu Bút</h2>
    </div>

    <!-- Preset wishes -->
    <div class="guestbook-presets">
        <button class="guestbook-preset-btn">Chúc trăm năm hạnh phúc! 💕</button>
        <button class="guestbook-preset-btn">Hạnh phúc viên mãn! 🎉</button>
        <button class="guestbook-preset-btn">Yêu thương mãi mãi! ❤️</button>
        <button class="guestbook-preset-btn">Sớm có tin vui! 👶</button>
    </div>

    <form id="guestbookForm" class="guestbook-form">
        <input type="text" id="guestbookName" class="rsvp-input" placeholder="Tên của bạn *" required>
        <textarea id="guestbookMessage" class="rsvp-textarea" placeholder="Lời chúc của bạn *" required></textarea>
        <button type="submit" class="rsvp-submit">Gửi Lời Chúc</button>
    </form>

    <div id="guestbookSuccess" class="rsvp-success">
        <p class="rsvp-success-text">Cảm ơn lời chúc của bạn! 💕</p>
    </div>

    <div id="guestbookMessages" class="guestbook-messages"></div>
</section>
```

### 8. Gift Box — Hộp mừng cưới

```html
<section id="giftbox" class="giftbox-section">
    <div class="section-heading">
        <p class="section-subtitle">Chúc Phúc</p>
        <h2 class="section-title">Hộp Mừng Cưới</h2>
        <p class="section-desc">Sự hiện diện của bạn là niềm vui lớn nhất. Nếu muốn gửi quà mừng:</p>
    </div>

    <div class="giftbox-grid">
        <div class="giftbox-card animate-fade-up">
            <p class="giftbox-label">Cô Dâu</p>
            <div class="giftbox-qr">
                <img src="qr-bride.png" alt="QR Code">
            </div>
            <div class="giftbox-bank">
                <strong>NGUYEN THI NGOC</strong>
                TPBank<br>
                STK: 12345678
            </div>
            <button class="giftbox-copy-btn" data-account="12345678">Copy STK</button>
        </div>
        <div class="giftbox-card animate-fade-up" style="--delay: 0.15s">
            <p class="giftbox-label">Chú Rể</p>
            <div class="giftbox-qr">
                <img src="qr-groom.png" alt="QR Code">
            </div>
            <div class="giftbox-bank">
                <strong>LE VAN MINH</strong>
                Vietcombank<br>
                STK: 87654321
            </div>
            <button class="giftbox-copy-btn" data-account="87654321">Copy STK</button>
        </div>
    </div>
</section>
```

### 9. Music Toggle + Wishes Toggle

```html
<!-- Nút tắt/bật lời chúc bay (đặt TRƯỚC nút nhạc) — chỉ thêm khi có floating wishes -->
<button id="wishesToggle" class="wishes-toggle" aria-label="Toggle wishes">
    <i data-lucide="message-circle" class="wishes-icon-on"></i>
    <i data-lucide="message-circle-off" class="wishes-icon-off"></i>
</button>

<!-- Nút nhạc -->
<button id="musicToggle" class="music-toggle" aria-label="Toggle music">
    <i data-lucide="volume-2" class="music-icon-on"></i>
    <i data-lucide="volume-x" class="music-icon-off"></i>
</button>
<audio id="bgMusic" loop preload="auto">
    <source src="../../../shared/music/wedding/A Thousand Years.mp3" type="audio/mpeg">
</audio>

<!-- Variant B: Spinning disc (thay nút nhạc) -->
<div id="musicDisc" class="music-toggle-disc" aria-label="Toggle music"></div>
<audio id="bgMusic" loop preload="auto">
    <source src="../../../shared/music/romantic/Only Love.mp3" type="audio/mpeg">
</audio>
```

**Vị trí nút (fixed bottom-right, xếp dọc):**
```
  [ 💬 ]  ← wishes toggle (bottom: 80px)
  [ 🔊 ]  ← music toggle  (bottom: 24px)
```

**JS:** gọi `initWishesToggle()` trong DOMContentLoaded (chỉ khi có floating wishes)

### 10. Calendar Button

```html
<button id="calendarBtn" class="calendar-btn">
    <i data-lucide="calendar-plus"></i>
    Thêm vào lịch
</button>
```

### 11. Google Maps

```html
<!-- Variant A: 1 địa điểm (thiệp đơn) -->
<section id="map" class="map-section">
    <div class="section-heading">
        <p class="section-subtitle">Địa Điểm</p>
        <h2 class="section-title">Bản Đồ</h2>
    </div>
    <div class="map-wrapper">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!..."
            allowfullscreen=""
            loading="lazy">
        </iframe>
    </div>
    <div class="map-address">
        <i data-lucide="map-pin"></i>
        <span>Nhà hàng ABC, 123 Đường XYZ, Quận 1, TP.HCM</span>
    </div>
    <div class="map-actions">
        <a href="https://maps.google.com/?q=..." target="_blank" rel="noopener" class="map-btn map-open-btn">
            <i data-lucide="external-link"></i>
            Mở Google Maps
        </a>
        <a href="https://www.google.com/maps/dir/?api=1&destination=..." target="_blank" rel="noopener" class="map-btn map-direction-btn">
            <i data-lucide="navigation"></i>
            Chỉ đường
        </a>
    </div>
</section>

<!-- Variant B: 2 địa điểm (thiệp đôi — Vu Quy + Thành Hôn) -->
<section id="map" class="map-section">
    <div class="section-heading">
        <p class="section-subtitle">Địa Điểm</p>
        <h2 class="section-title">Bản Đồ</h2>
    </div>
    <div class="map-grid">
        <div class="map-card animate-fade-up">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!..." allowfullscreen="" loading="lazy"></iframe>
            <div class="map-card-info">
                <p class="map-card-label">Lễ Vu Quy</p>
                <h3 class="map-card-name">Tư gia nhà gái</h3>
                <div class="map-address">
                    <i data-lucide="map-pin"></i>
                    <span>123 Đường ABC, Quận 1</span>
                </div>
                <div class="map-actions">
                    <a href="https://maps.google.com/?q=..." target="_blank" rel="noopener" class="map-btn map-open-btn">
                        <i data-lucide="external-link"></i>
                        Mở Maps
                    </a>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=..." target="_blank" rel="noopener" class="map-btn map-direction-btn">
                        <i data-lucide="navigation"></i>
                        Chỉ đường
                    </a>
                </div>
            </div>
        </div>
        <div class="map-card animate-fade-up">
            <iframe src="https://www.google.com/maps/embed?pb=!..." allowfullscreen="" loading="lazy"></iframe>
            <div class="map-card-info">
                <p class="map-card-label">Lễ Thành Hôn</p>
                <h3 class="map-card-name">Nhà hàng XYZ</h3>
                <div class="map-address">
                    <i data-lucide="map-pin"></i>
                    <span>456 Đường DEF, Quận 3</span>
                </div>
                <div class="map-actions">
                    <a href="https://maps.google.com/?q=..." target="_blank" rel="noopener" class="map-btn map-open-btn">
                        <i data-lucide="external-link"></i>
                        Mở Maps
                    </a>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=..." target="_blank" rel="noopener" class="map-btn map-direction-btn">
                        <i data-lucide="navigation"></i>
                        Chỉ đường
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
```

**Lưu ý Google Maps:**
- **Embed URL** (iframe src): `https://www.google.com/maps/embed?pb=...` — lấy từ Google Maps > Share > Embed
- **Open URL** (nút Mở Maps): `https://maps.google.com/?q=TÊN+ĐỊA+ĐIỂM` hoặc `https://www.google.com/maps/place/...` — mở tab mới
- **Direction URL** (nút Chỉ đường): `https://www.google.com/maps/dir/?api=1&destination=ĐỊA+CHỈ` — mở navigation
- Tất cả link đều có `target="_blank" rel="noopener"` — mở tab mới an toàn
- Nếu user chỉ đưa địa chỉ text → dùng `https://maps.google.com/?q=` + encodeURIComponent(địa chỉ)
- Nếu user đưa embed link → tách embed URL + tạo open/direction URL từ địa chỉ

### 12. Family — Gia đình hai bên (thiệp đôi)

```html
<section id="family" class="family-section">
    <div class="section-heading">
        <p class="section-subtitle">Gia Đình</p>
        <h2 class="section-title">Hai Bên Gia Đình</h2>
    </div>
    <div class="family-grid">
        <div class="family-side animate-fade-up">
            <img class="family-photo" src="groom.jpg" alt="Chú rể">
            <p class="family-role">Chú Rể</p>
            <h3 class="family-name">Lê Văn Minh</h3>
            <div class="family-parents">
                <span>Con ông: <strong>Lê Văn Hùng</strong></span>
                <span>Và bà: <strong>Hồ Thị Lan</strong></span>
            </div>
        </div>
        <div class="family-divider">&</div>
        <div class="family-side animate-fade-up" style="--delay: 0.15s">
            <img class="family-photo" src="bride.jpg" alt="Cô dâu">
            <p class="family-role">Cô Dâu</p>
            <h3 class="family-name">Nguyễn Thị Ngọc</h3>
            <div class="family-parents">
                <span>Con ông: <strong>Nguyễn Văn Tuấn</strong></span>
                <span>Và bà: <strong>Trần Thị Mai</strong></span>
            </div>
        </div>
    </div>
</section>
```

### 13. Decorative elements

```html
<!-- Section divider -->
<div class="divider-ornament">
    <span class="divider-ornament-icon">❦</span>
</div>

<!-- Monogram -->
<div class="monogram">
    <span class="monogram-letter">M</span>
    <span class="monogram-ampersand">&</span>
    <span class="monogram-letter">N</span>
</div>

<!-- Couple frame -->
<div class="couple-frame">
    <img src="couple.jpg" alt="Couple">
</div>

<!-- Blessing quote -->
<div class="blessing-quote">
    <blockquote>
        Tình yêu không phải là nhìn nhau, mà là cùng nhau nhìn về một hướng.
    </blockquote>
    <cite>— Antoine de Saint-Exupéry</cite>
</div>

<!-- Footer hearts -->
<div class="footer-hearts">
    <span class="footer-heart">♥</span>
    <span class="footer-heart">♥</span>
    <span class="footer-heart">♥</span>
</div>

<!-- Scroll indicator (đặt trong hero) -->
<div class="scroll-indicator">
    <span>Cuộn xuống</span>
    <i data-lucide="chevron-down"></i>
</div>
```

---

## Layout Patterns

### Pattern A: Classic Elegant (phổ biến nhất)
```
Envelope → Hero (full-screen) → Countdown → Family
→ Love Story → Event Cards → Gallery → RSVP
→ Guestbook → Gift Box → Map → Footer
```

### Pattern B: Romantic Story-driven
```
Envelope → Hero → Love Story (dài, chi tiết)
→ Countdown → Event Cards → Gallery
→ Blessing Quote → RSVP → Guestbook → Footer
```

### Pattern C: Compact (thiệp đơn)
```
Envelope → Hero → Countdown → Event Card (single)
→ Gallery → RSVP → Guestbook → Footer
```

### Pattern D: Luxury Full-feature
```
Envelope → Hero → Family → Countdown
→ Love Story → Event Cards → Map → Gallery
→ Blessing Quote → Guestbook → RSVP
→ Gift Box → Calendar → Footer
```

### Pattern E: Traditional Vietnamese
```
Envelope (đỏ/vàng) → Hero (họa tiết rồng/phượng)
→ Family (hai bên) → Event Cards → Countdown
→ Gallery → Guestbook → Gift Box → Footer
```

---

## Bảng gợi ý nhanh

### Hiệu ứng theo phong cách

| Phong cách | Hoa rơi | Confetti | Sparkles | Hearts | Lá rơi | Tuyết |
|------------|---------|----------|----------|--------|--------|-------|
| Classic Gold | | | ✅ | | | |
| Blush Pink | ✅ | | | ✅ | | |
| Sage Green | | | | | ✅ | |
| Navy & Gold | | | ✅ | | | |
| Dusty Rose | ✅ | | | | | |
| Terracotta | | | | | ✅ | |
| Lavender | ✅ | | ✅ | | | |
| Burgundy | | | ✅ | | | |
| Dark Luxury | | | ✅ | | | |
| Tropical | | ✅ | | | | |
| Traditional Red | | | ✅ | | | |
| Winter | | | ✅ | | | ✅ |

### Nhạc theo phong cách

| Phong cách | Folder | Gợi ý |
|------------|--------|-------|
| Classic, Elegant | `wedding/` | A Thousand Years, Beautiful In White |
| Romantic, Blush | `romantic/` | Endless Love, Only Love |
| Modern | `wedding/` | Sugar |
| Rustic, Garden | `romantic/` | Everyday I Love You |
| Dark Luxury | `wedding/` | A Thousand Years |
| Tropical, Fun | `wedding/` | Sugar |

### Envelope theo phong cách

| Phong cách | Variant | Lý do |
|------------|---------|-------|
| Classic, Elegant, Luxury | Variant A (full-screen) | Sang trọng, ấn tượng |
| Modern, Minimalist | Variant B (card) | Gọn gàng, hiện đại |
| Traditional Red | Variant C (nắp gập) | Truyền thống |
| Romantic, Blush | Variant A hoặc B | Tuỳ sở thích |

### Countdown theo phong cách

| Phong cách | Variant | Lý do |
|------------|---------|-------|
| Classic, Elegant | Variant A (boxes) | Tinh tế |
| Modern, Luxury | Variant B (cards) | Sạch sẽ |
| Romantic, Rustic | Variant C (circles) | Mềm mại |

---

### 13. Google Sheets API — Transport Layer (`wishes-api.js`)

`wishes-api.js` là **cổng giao tiếp thuần** với Google Sheets.
**KHÔNG chứa logic nghiệp vụ** — chỉ nhận `sheet_id` + columns `A/B/C/...` → gửi/đọc.

Logic form nào gửi gì, render thế nào → **nằm trong code.html** của từng sản phẩm.

#### Load script (TRƯỚC script chính):

```html
<script src="../../../shared/wedding/wishes-api.js"></script>
<script>
    // sheetsAPI.post(sheetId, { A: '...', B: '...', C: '...' }) → Promise
    // sheetsAPI.get(sheetId) → Promise<Array<{A, B, C, ...}>>
</script>
```

#### Ví dụ: Section Lời Chúc (logic trong code.html)

```javascript
// === WISHES ===
const WISHES_SHEET = 'SHEET_ID';

// Load & render
function loadWishes() {
    sheetsAPI.get(WISHES_SHEET).then(function (rows) {
        var html = rows.map(function (row) {
            if (!row.B) return '';
            return '<div class="wish-item">...' + row.A + '...' + row.B + '...</div>';
        }).filter(Boolean).join('');
        document.getElementById('wishesList').innerHTML = html || '<p>Chưa có lời chúc</p>';
    });
}

// Submit
document.getElementById('wishesForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('wishName').value.trim();
    var msg = document.getElementById('wishMessage').value.trim();
    var time = new Date().toLocaleDateString('vi-VN');

    sheetsAPI.post(WISHES_SHEET, { A: name, B: msg, C: time })
        .then(function () { loadWishes(); });
});

loadWishes();
```

#### Ví dụ: Section RSVP (cùng hoặc khác sheet)

```javascript
// === RSVP ===
const RSVP_SHEET = 'SHEET_ID_KHAC';  // hoặc cùng sheet nếu muốn

document.getElementById('rsvpForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var fd = new FormData(e.target);

    sheetsAPI.post(RSVP_SHEET, {
        A: fd.get('name'),
        B: fd.get('phone'),
        C: fd.get('guests'),
        D: fd.get('message'),
        E: new Date().toLocaleDateString('vi-VN'),
    }).then(function () { /* show success */ });
});
```

#### API reference:

| Method | Params | Return | Mô tả |
|--------|--------|--------|--------|
| `sheetsAPI.post(sheetId, columns)` | `sheetId`: string, `columns`: `{ A: '...', B: '...', ... }` | `Promise` | Gửi 1 row vào sheet |
| `sheetsAPI.get(sheetId)` | `sheetId`: string | `Promise<Array>` | Đọc tất cả rows, mỗi row là `{ A, B, C, ... }` |

#### Lưu ý:
- **KHÔNG copy nội dung wishes-api.js** vào code.html — luôn dùng `<script src>`
- Load script **TRƯỚC** `<script>` chính (để `sheetsAPI` có sẵn khi DOMContentLoaded chạy)
- Relative path: `../../../shared/wedding/wishes-api.js` (từ `products/Web/Invitation/{folder}/`)
- Mỗi sản phẩm có thể dùng **nhiều sheet_id** khác nhau (1 cho wishes, 1 cho RSVP, ...)
- Columns `A/B/C/...` tự quy ước trong code.html — API không quan tâm nghĩa cột
- **Phải hỏi user** sheet_id khi gen thiệp (nếu user không cung cấp)

### 14. Floating Wishes — Bong bóng lời chúc bay lên

Lời chúc hiển thị dạng bong bóng chat bay từ dưới lên, loop vô hạn.
Load ngầm từ `sheetsAPI.get()`, khi user gửi lời chúc mới → thêm vào pool + hiện ngay.

#### HTML (tự tạo bằng JS, không cần HTML):
```html
<!-- Container tự tạo bằng JS, hoặc thêm sẵn -->
<div id="floatingWishesBox" class="floating-wishes-box"></div>
```

#### CSS: copy từ `styles.css` mục 17 (`.floating-wishes-box`, `.floating-wish`, `@keyframes wish-float-up`)

#### JS (copy vào code.html hoặc dùng `initFloatingWishes` từ scripts.js):
```javascript
// Inline trong code.html — tạo IIFE floating wishes
var floatingWishes = (function () {
    var pool = [], idx = 0, timer = null, running = false;
    var box = document.createElement('div');
    box.className = 'floating-wishes-box';
    document.body.appendChild(box);

    function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

    function bubble(name, msg) {
        var el = document.createElement('div');
        el.className = 'floating-wish';
        el.innerHTML =
            '<div class="floating-wish-avatar">' + esc(name).charAt(0).toUpperCase() + '</div>' +
            '<span class="floating-wish-name">' + esc(name) + ':</span>' +
            '<span class="floating-wish-text">' + esc(msg) + '</span>';
        box.appendChild(el);
        while (box.children.length > 3) box.removeChild(box.firstChild);
        setTimeout(function () { if (el.parentNode) el.remove(); }, 6000);
    }

    function next() { if (!pool.length) return; bubble(pool[idx % pool.length].name, pool[idx % pool.length].message); idx++; }
    function calcDelay() { var l = pool.length; return l <= 3 ? 3500 : l <= 10 ? 2500 : l <= 30 ? 2000 : 1500; }
    function start() { if (running || !pool.length) return; running = true; next(); timer = setInterval(next, calcDelay()); }

    return {
        load: function (rows) {
            rows.forEach(function (r) { if (r.A && r.B) pool.push({ name: r.A, message: r.B }); });
            if (pool.length) start();
        },
        add: function (name, msg) { pool.push({ name: name, message: msg }); bubble(name, msg); if (!running) start(); }
    };
})();

// Load ngầm — khi API trả về thì bong bóng tự nổi lên
sheetsAPI.get(WISHES_SHEET).then(function (rows) {
    renderWishes(rows);          // render danh sách trong section
    floatingWishes.load(rows);   // bắt đầu floating bubbles
});

// Sau khi user submit → thêm ngay vào floating
floatingWishes.add(name, message);
```

#### Đặc điểm:
- **Vị trí**: fixed bottom-left, trên nút nhạc
- **Animation**: fade in → tồn tại 6s → fade out + bay lên
- **Loop**: lặp vô hạn qua pool lời chúc
- **Tần suất**: tự điều chỉnh theo số lượng (3500ms → 1500ms)
- **Max visible**: 3 bong bóng cùng lúc
- **Optimistic**: khi user gửi, hiện bong bóng ngay (không đợi API)
- **Load ngầm**: API chậm → bong bóng chỉ xuất hiện khi data sẵn sàng
