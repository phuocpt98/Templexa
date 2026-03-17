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

### 15. Video YouTube — Lazy load embed

Nhúng video YouTube vào thiệp. Hiện thumbnail, click mới load iframe (tiết kiệm bandwidth).

#### HTML snippet:

```html
<!-- Section Video -->
<section class="video-section" id="video">
    <div class="section-heading">
        <p class="section-subtitle">Video</p>
        <h2 class="section-title">Kỷ Niệm Của Chúng Tôi</h2>
    </div>
    <div class="video-wrapper" data-video-id="VIDEO_ID_HERE">
        <img src="https://img.youtube.com/vi/VIDEO_ID_HERE/maxresdefault.jpg" alt="Video">
        <div class="video-play-btn">
            <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
    </div>
    <p class="video-caption">Pre-wedding — Minh & Ngọc</p>
</section>
```

**Thay `VIDEO_ID_HERE`** bằng ID video YouTube.

Parse ID từ link:
- `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → `dQw4w9WgXcQ`
- `https://youtu.be/dQw4w9WgXcQ` → `dQw4w9WgXcQ`

#### CSS: copy từ `styles.css` mục 18

#### JS (copy vào code.html):
```javascript
// Lazy load video — click thumbnail mới load iframe
document.querySelectorAll('.video-wrapper[data-video-id]').forEach(function (w) {
    w.addEventListener('click', function () {
        var id = w.dataset.videoId;
        w.innerHTML = '<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>';
        w.style.cursor = 'default';
    }, { once: true });
});
```

#### Vị trí gợi ý trong thiệp:
- Sau **Love Story** — kể tiếp câu chuyện
- Sau **Gallery** — video pre-wedding
- Trước **RSVP** — tạo cảm xúc trước khi xác nhận

#### Lưu ý:
- Không autoplay có tiếng — tránh conflict với nhạc nền
- Thumbnail tự lấy từ YouTube (`maxresdefault.jpg`, fallback `hqdefault.jpg`)
- Responsive 16:9 tự động qua `aspect-ratio`
- Tất cả gói đều có tính năng này

### 16. Calendar Month — Tờ lịch tháng đánh dấu ngày cưới

Hiển thị tờ lịch 1 tháng, đánh dấu ngày cưới + các sự kiện khác. 3 variant.

#### HTML snippet:

```html
<section class="cal-section" id="calendar-month">
    <div class="section-heading">
        <p class="section-subtitle">Save The Date</p>
        <h2 class="section-title">Ngày Trọng Đại</h2>
    </div>
    <div id="weddingCalendar"></div>
</section>
```

#### JS (copy vào code.html):

```javascript
initCalendarMonth({
    containerId: 'weddingCalendar',
    month: 8,
    year: 2026,
    variant: 'classic',   // 'classic' | 'elegant' | 'minimal'
    accentColor: '#C41E3A',
    events: [
        { day: 1, color: '#C41E3A', label: '10:00 — Lễ Vu Quy' },
        { day: 1, color: '#D4AF37', label: '17:00 — Lễ Thành Hôn' },
        { day: 15, color: '#6366F1', label: 'Hạn RSVP' },
    ]
});
```

#### 3 Variant:

| Variant | Style | Ngày đánh dấu | Phù hợp |
|---------|-------|---------------|---------|
| **classic** | Viền ô, ngày tròn đỏ | Vòng tròn đỏ đặc | Traditional, Red/Gold |
| **elegant** | Không viền, font serif | Viền tròn vàng | Classic, Elegant, Luxury |
| **minimal** | Sạch, nhỏ gọn | Nền tròn đặc | Modern, Minimalist |

#### Bảng gợi ý variant theo phong cách thiệp:

| Phong cách thiệp | Variant | accentColor |
|-------------------|---------|-------------|
| Traditional Red | `classic` | `#C41E3A` |
| Classic Gold | `elegant` | `#D4AF37` |
| Blush Pink | `minimal` | `#E8A0BF` |
| Sage Green | `minimal` | `#6B8F5B` |
| Dark Luxury | `elegant` | `#D4AF37` |
| Modern | `minimal` | `#6366F1` |

#### Events config:

```javascript
events: [
    { day: 1, color: '#C41E3A', label: '10:00 — Lễ Vu Quy, nhà gái' },
    { day: 1, color: '#D4AF37', label: '17:00 — Lễ Thành Hôn, nhà hàng ABC' },
    { day: 15, color: '#6366F1', label: 'Hạn xác nhận tham dự' },
]
```
- `day`: ngày trong tháng (1–31)
- `color`: màu đánh dấu (tuỳ chọn, mặc định dùng accentColor)
- `label`: chú thích hiển thị bên dưới lịch
- Cùng 1 ngày có thể có nhiều events (nhiều màu)

#### Vị trí gợi ý:
- Sau **Countdown** — nhấn mạnh ngày cưới
- Sau **Event Cards** — bổ sung trực quan
- Trước **RSVP** — nhắc khách ngày hạn xác nhận

#### CSS: copy từ `styles.css` mục 19
#### JS: copy `initCalendarMonth()` từ `scripts.js` mục 16

### 17. Letter Envelope — Phong bì mở thư

Click mở → nắp gập, thư trượt ra, particles bay.
Click đóng → thư trượt xuống chậm (1.8s), biến mất sau thân phong bì.
Toggle vô hạn. 4 style.

**Cấu trúc z-index:** seal(6) > flap(5) > body(2, phủ kín top→bottom) > card(1).
Mở: card→z3 (trên body). Đóng: card→z1 (dưới body) → trượt xuống bị đè.
Container `overflow: hidden` khi đóng, `visible` khi mở.

#### HTML snippet:

```html
<div class="letter-wrap" id="myLetter">
    <div class="letter-env">
        <!-- Particles bay ra khi mở -->
        <div class="letter-particles"></div>
        <!-- Nắp phong bì -->
        <div class="letter-flap"></div>
        <!-- Seal ở giữa -->
        <div class="letter-seal">❤</div>
        <!-- Thân phong bì -->
        <div class="letter-body"></div>
        <!-- Tờ thư bên trong -->
        <div class="letter-card">
            <!-- Variant A: Ảnh -->
            <img src="couple.jpg" alt="Ảnh cặp đôi">
            <!-- Variant B: Text -->
            <div class="letter-card-text">
                <strong>Minh & Ngọc</strong>
                Trân trọng kính mời bạn đến dự lễ cưới của chúng tôi.<br>
                01 . 08 . 2026
            </div>
        </div>
    </div>
    <p class="letter-hint">Nhấn để mở thư</p>
</div>
```

#### JS:

```javascript
initLetterEnvelope({
    wrapperId: 'myLetter',
    style: 'classic',          // 'classic' | 'luxury' | 'dreamy' | 'youthful'
    seal: '❤',                // emoji trên seal
    particles: '🌸💕✨🩷',    // emoji bay ra khi mở
    particleCount: 12,
});
```

#### 4 Style:

| Style | Màu phong bì | Seal | Particles gợi ý | Phù hợp |
|-------|-------------|------|-----------------|---------|
| **classic** | Đỏ truyền thống | Vàng gold | `🌸💕❤🩷` hoa + tim | Traditional Red |
| **luxury** | Đen + vàng gold | Vàng gold | `✨⭐💫🌟` sao lấp lánh | Dark Luxury, Elegant |
| **dreamy** | Hồng tím pastel gradient | Trắng | `🦋💜🌸✨💕` bướm + hoa | Romantic, Blush |
| **youthful** | Xanh cam gradient | Vàng tươi | `🎉🎈🎊🌈⭐` confetti | Modern, Tropical, Fun |

#### Tính năng:
- **Toggle vô hạn**: click 1 mở, click 2 đóng, click 3 mở...
- **Particles random**: mỗi lần mở, vị trí bay khác nhau
- **Nội dung linh hoạt**: ảnh hoặc text (hoặc cả hai)
- **Responsive**: co nhỏ trên mobile
- **Seal**: emoji/icon tuỳ chỉnh, ẩn khi mở

#### Vị trí gợi ý:
- Đầu trang (thay hoặc bên cạnh section Envelope)
- Trong section Love Story (mốc đặc biệt)
- Section riêng "Thư Ngỏ" / "Lời Nhắn"

#### CSS: copy từ `styles.css` mục 20
#### JS: copy `initLetterEnvelope()` từ `scripts.js` mục 17

### 18. Decorative Animations — Hiệu ứng trang trí vùng trống

CSS-only animations đặt vào vùng trống: bên cạnh text, giữa 2 ảnh, đè lên/bị đè bởi ảnh.
Không cần JS — chỉ thêm class `.deco` + variant vào `<span>` trong parent `position: relative`.

#### Cách dùng:

```html
<!-- Parent phải có position: relative -->
<div style="position: relative;">
    <!-- Deco bên phải, đè lên nội dung -->
    <span class="deco deco-front deco-heart-beat deco-md deco-rose-color" style="top: 10%; right: -25px;"></span>
    <!-- Deco bên trái, bị nội dung đè -->
    <span class="deco deco-back deco-rose-bloom deco-lg deco-faint" style="bottom: 20%; left: -15px;"></span>
    <p>Nội dung text...</p>
</div>

<!-- Giữa 2 ảnh -->
<div style="position: relative; display: flex; gap: 1rem;">
    <img src="a.jpg">
    <span class="deco deco-hearts-double deco-sm" style="top: 50%; left: 50%; transform: translate(-50%, -50%);"></span>
    <img src="b.jpg">
</div>
```

#### Danh sách hiệu ứng:

| Class | Emoji | Animation | Phù hợp |
|-------|-------|-----------|---------|
| `deco-heart-beat` | ♥ | Đập nhịp tim | Mọi thiệp |
| `deco-heart-float` | ♡ | Lơ lửng nhẹ | Romantic, dreamy |
| `deco-heart-spin` | 💕 | Xoay chậm | Vui tươi |
| `deco-hearts-double` | ♥♥ | 2 tim lệch, đập so le | Cạnh text |
| `deco-heart-outline` | ♡ | Viền mỏng, lơ lửng | Subtle, elegant |
| `deco-rose` | 🌹 | Lắc nhẹ | Classic, romantic |
| `deco-rose-bloom` | 🌸 | Nở ra, co lại | Garden, rustic |
| `deco-petals` | 🌸💮 | 2 cánh hoa trôi | Background |
| `deco-gift` | 🎁 | Nảy + nghiêng | Gift section |
| `deco-gift-sparkle` | 🎁✨ | Nảy + lấp lánh | Gift + festive |
| `deco-arrow` | 💘 | Bay nhẹ | Love story |
| `deco-arrow-trail` | ➳ | Bay + fade | Subtle, elegant |
| `deco-angel` | 👼 | Bay vòng | Dreamy |
| `deco-angel-wing` | 🕊️ | Bay lên xuống | Peace, elegant |
| `deco-rings` | 💍 | Xoay + sáng | Event cards |
| `deco-rings-double` | 💍💍 | 2 nhẫn, sáng so le | Wedding info |
| `deco-star` | ⭐ | Nhấp nháy | Luxury |
| `deco-sparkle` | ✨ | Nhấp nháy nhanh | Mọi thiệp |
| `deco-stars-cluster` | ✦✧ | Cụm sao nhấp nháy | Background |
| `deco-butterfly` | 🦋 | Bay vòng | Garden, spring |
| `deco-cluster-romantic` | ♥🌸 | Heart + hoa | Romantic sections |
| `deco-cluster-festive` | 🎁✨ | Gift + sparkle | Gift/celebration |

#### Modifiers:

| Class | Tác dụng |
|-------|---------|
| `deco-front` | z-index: 3 — đè lên nội dung |
| `deco-back` | z-index: -1 — bị nội dung đè |
| `deco-xs` / `deco-sm` / `deco-md` / `deco-lg` / `deco-xl` | Kích thước 0.7–2.5rem |
| `deco-rose-color` / `deco-blush-color` / `deco-gold-color` / `deco-red-color` / `deco-pink-color` | Màu |
| `deco-faint` / `deco-subtle` / `deco-soft` / `deco-visible` | Opacity 0.2–0.7 |

#### Vị trí gợi ý trong thiệp:

| Vị trí | Deco gợi ý |
|--------|-----------|
| Bên cạnh tên cặp đôi | `deco-heart-beat` hoặc `deco-hearts-double` |
| Giữa 2 ảnh bay vào | `deco-heart-float` hoặc `deco-butterfly` |
| Bên cạnh info card lễ cưới | `deco-rings` hoặc `deco-rose` |
| Background section thư tay | `deco-petals deco-back deco-faint` |
| Cạnh album slider | `deco-sparkle` hoặc `deco-stars-cluster` |
| Gift section | `deco-gift-sparkle` hoặc `deco-cluster-festive` |
| Góc section thankyou | `deco-angel-wing deco-subtle` |

#### CSS: copy từ `styles.css` mục 21 (CSS-only, không cần JS)

---

### 13b. Icon Decorations — Trang trí bằng ảnh icon

Dùng ảnh icon từ `shared/images/wedding/icons/` — chất lượng cao hơn emoji, phong cách nhất quán.

#### Cách dùng:

```html
<!-- Cơ bản: icon + hiệu ứng -->
<img class="deco-icon deco-icon-float" src="../../../shared/images/wedding/icons/bouquet-1.webp" alt="">

<!-- Với size + opacity -->
<img class="deco-icon deco-icon-shine deco-icon-lg deco-icon-soft" src="../../../shared/images/wedding/icons/wax-seal.webp" alt="">

<!-- Cặp đối xứng (rồng + phượng) -->
<img class="deco-icon deco-icon-majestic deco-icon-2xl" src="../../../shared/images/wedding/icons/rong.webp" alt="" style="left:0;top:10%;">
<img class="deco-icon deco-icon-majestic deco-icon-mirror deco-icon-2xl" src="../../../shared/images/wedding/icons/phuong.webp" alt="" style="right:0;top:10%;">

<!-- Góc trang trí -->
<img class="deco-icon deco-icon-sway deco-icon-lg deco-icon-top-left" src="../../../shared/images/wedding/icons/cherry-blossom.webp" alt="">
<img class="deco-icon deco-icon-sway deco-icon-mirror deco-icon-lg deco-icon-top-right" src="../../../shared/images/wedding/icons/cherry-blossom.webp" alt="">
```

#### Danh sách hiệu ứng:

| Class | Mô tả | Phù hợp icon |
|-------|--------|--------------|
| `deco-icon-float` | Lơ lửng nhẹ nhàng | bouquet, cherry-blossom, decorative-flowers |
| `deco-icon-sway` | Lắc lư như cành hoa | bouquet, cherry-blossom, decorative-flowers |
| `deco-icon-shine` | Toả sáng lấp lánh | wax-seal, happiness, double-happiness, decorative-diamond |
| `deco-icon-pulse` | Phóng to nhỏ nhịp nhàng | heart-icon, wax-seal, character |
| `deco-icon-spin` | Xoay chậm | decorative-diamond, happiness |
| `deco-icon-bounce` | Nảy nhẹ | character-elegant, character-romantic, couple-chibi |
| `deco-icon-fade` | Mờ hiện mờ ẩn | decorative-flowers, deco-element, deco-footer |
| `deco-icon-drift` | Trôi ngang nhẹ | cherry-blossom, decorative-flowers, phuong |
| `deco-icon-majestic` | Bay lượn uy nghi | rong, phuong |
| `deco-icon-tilt` | Nghiêng qua lại | frame, bouquet, divider |

#### Entrance animations (kết hợp IntersectionObserver):

| Class | Mô tả |
|-------|--------|
| `deco-icon-enter-fade` | Fade in khi scroll vào view |
| `deco-icon-enter-scale` | Scale từ nhỏ → lớn |
| `deco-icon-enter-slide-up` | Trượt lên từ dưới |

#### Modifiers:

| Class | Tác dụng |
|-------|---------|
| `deco-icon-front` | z-index: 3 — đè lên nội dung |
| `deco-icon-back` | z-index: -1 — bị nội dung đè |
| `deco-icon-mirror` | Lật ngang (cho cặp đối xứng) |
| `deco-icon-xs` ~ `deco-icon-3xl` | 30px → 200px |
| `deco-icon-faint` ~ `deco-icon-full` | Opacity 0.15 → 1 |
| `deco-icon-top-left` / `top-right` / `bottom-left` / `bottom-right` | Vị trí góc nhanh |
| `deco-icon-center-left` / `center-right` | Vị trí giữa cạnh |

#### Gợi ý icon theo phong cách thiệp:

| Phong cách | Icons + hiệu ứng |
|------------|-------------------|
| **Elegant / Classic** | `wax-seal` + shine, `bouquet` + float, `frame` + tilt, `divider.svg` |
| **Romantic / Modern** | `character-romantic` + bounce, `heart-icon` + pulse, `decorative-flowers` + sway |
| **Truyền thống Việt** | `rong` + majestic, `phuong` + majestic + mirror, `chinese-happiness` + shine |
| **Cute / Chibi** | `couple-chibi` + bounce, `cherry-blossom` + sway, `double-happiness` + shine |
| **Black & Gold** | `wax-seal` + shine, `deco-divider` + tilt, `character-elegant` + bounce |
| **Coral / Minimalist** | `heart-icon` + pulse, `decorative-flowers` + fade |

#### Vị trí gợi ý trong thiệp:

| Vị trí | Icon + hiệu ứng gợi ý |
|--------|----------------------|
| Phong bì (envelope) | `wax-seal` + shine, `bouquet` + float, `double-happiness` + shine |
| Hero section | `rong` + `phuong` đối xứng, `cherry-blossom` góc, `couple-chibi` + bounce |
| Section divider | `divider.svg`, `deco-divider` + tilt |
| Gift section | `character-elegant` / `character-romantic` + bounce, `happiness` + shine |
| Góc section | `cherry-blossom` + sway + mirror, `decorative-flowers` + fade, `bouquet` + float |
| Footer | `deco-footer` + fade, `decorative-diamond` + spin |

#### CSS: copy từ `styles.css` mục 22 (Icon Decorations)

---

### 23. Curtain Opening (Mở màn rèm)

Hiệu ứng mở màn khi vào thiệp — 2 tấm rèm trượt/gập sang 2 bên, lộ nội dung thiệp bên dưới.

#### HTML: Không cần — JS tự tạo DOM

#### JS:
```javascript
initCurtainOpening({
    names: 'Minh & Hoa',          // Tên hiển thị trên rèm
    promptText: 'Nhấn để mở thiệp', // Text nhắc (mặc định)
    duration: 3,                   // Giây (mặc định 3)
    variant: 'slide',              // 'slide' | 'fold' | 'fade'
    color: 'red',                  // 'red' | 'gold' | 'navy' | 'blush' | 'dark'
    autoOpen: false,               // Tự mở sau 5s nếu chưa click
    onOpen: function() {           // Callback khi mở xong
        initMusicToggle();         // Ví dụ: bật nhạc
    }
});
```

#### Variants:

| Variant | Mô tả | Class tự thêm |
|---------|--------|---------------|
| `slide` | Trượt phẳng sang 2 bên (mặc định) | — |
| `fold` | Gập 3D như cánh cửa | `.curtain-3d` |
| `fade` | Mờ dần đồng thời 2 panel | `.curtain-fade` |

#### Colors:

| Color | Mô tả | Phù hợp |
|-------|--------|---------|
| `red` | Đỏ burgundy (mặc định) | Truyền thống, sang trọng |
| `gold` | Vàng gold | Classic Gold, Luxury |
| `navy` | Xanh navy đậm | Navy & Gold |
| `blush` | Hồng phấn | Blush Pink, Romantic |
| `dark` | Đen luxury | Dark Luxury |

#### Gợi ý kết hợp:

| Phong cách thiệp | Color | Variant | Duration |
|-------------------|-------|---------|----------|
| Truyền thống Việt | `red` | `slide` | 3–4 |
| Classic Gold | `gold` | `fold` | 3 |
| Dark Luxury | `dark` | `fold` | 4 |
| Romantic / Modern | `blush` | `slide` | 2.5 |
| Navy & Gold | `navy` | `slide` | 3 |

#### CSS: copy từ `styles.css` mục 23 (Curtain Opening)

---

### 19. Floating Wishes Local — Bong bóng lời chúc từ data local

Dùng khi **gen mẫu** (không có Google Sheets API) hoặc khi user muốn lời chúc tĩnh.
Mặc định 5 lời chúc mẫu: Ngoạ Long, Phượng Sồ, Doremon, Pikachu, Kabibara.

```html
<!-- Container -->
<div class="floating-wishes-box" id="floatingWishesBox"></div>

<!-- Nút toggle -->
<button id="wishesToggle" class="wishes-toggle" aria-label="Toggle wishes">
    <i data-lucide="message-circle" class="wishes-icon-on"></i>
    <i data-lucide="message-circle-off" class="wishes-icon-off"></i>
</button>
```

```javascript
// Khởi tạo — copy function từ scripts.js mục 14b
var floatingLocal = initFloatingWishesLocal({
    containerId: 'floatingWishesBox',
    storageKey: 'my_wishes',        // unique per thiệp
    // defaultWishes: [...]          // tuỳ chọn, mặc định dùng DEFAULT_LOCAL_WISHES
    maxVisible: 3,
    interval: 2800,
    duration: 10000,
});

// Khi user gửi lời chúc mới
floatingLocal.addWish('Tên', 'Lời chúc');

// Toggle
var wishesBtn = document.getElementById('wishesToggle');
var wishesBox = document.getElementById('floatingWishesBox');
wishesBtn.addEventListener('click', function () {
    var isHidden = wishesBtn.classList.toggle('hidden');
    wishesBox.classList.toggle('hidden-wishes', isHidden);
});
```

#### CSS: copy từ `styles.css` mục 17 (Floating Wishes)
#### JS: copy `initFloatingWishesLocal` + `DEFAULT_LOCAL_WISHES` từ `scripts.js` mục 14b

---

### 20. Ribbon Bow — Nơ ruy-băng cởi mở thiệp

Thay nút "Mở Thiệp" bằng nơ CSS. Bấm → nơ cởi ra (untie animation) → mở thiệp.

```html
<div id="envelopeOpenBtn" class="ribbon-bow" role="button" tabindex="0" aria-label="Mở thiệp">
    <div class="bow-loop bow-loop-left"></div>
    <div class="bow-loop bow-loop-right"></div>
    <div class="bow-knot"></div>
    <div class="bow-tail bow-tail-left"></div>
    <div class="bow-tail bow-tail-right"></div>
    <!-- Sparkles — tuỳ chỉnh emoji + hướng bay -->
    <span class="bow-sparkle" style="top:30%;left:20%;--sx:-25px;--sy:-20px;">✨</span>
    <span class="bow-sparkle" style="top:30%;right:20%;--sx:25px;--sy:-20px;">✨</span>
    <span class="bow-sparkle" style="top:50%;left:10%;--sx:-30px;--sy:5px;">🌿</span>
    <span class="bow-sparkle" style="top:50%;right:10%;--sx:30px;--sy:5px;">🍃</span>
    <span class="bow-sparkle" style="top:70%;left:30%;--sx:-15px;--sy:20px;">💚</span>
    <span class="bow-sparkle" style="top:70%;right:30%;--sx:15px;--sy:20px;">💚</span>
    <span class="bow-hint">cởi nơ để mở thiệp</span>
</div>
```

```javascript
// JS — trong envelope click handler
var bowUntied = false;
openBtn.addEventListener('click', function () {
    if (bowUntied) return;
    bowUntied = true;
    openBtn.classList.add('untying');       // nơ cởi ra
    setTimeout(function () {
        envelope.classList.add('opened');    // mở thiệp
        if (bgMusic) { bgMusic.volume = 0.3; bgMusic.play(); }
    }, 700);
    setTimeout(function () { envelope.style.display = 'none'; }, 1700);
});
```

**Tuỳ chỉnh màu** qua CSS variables trên `.ribbon-bow` hoặc parent:
```css
.ribbon-bow {
    --bow-color: #D4AF37;       /* màu nơ — loops, tails */
    --bow-color-dark: #B8860B;  /* màu đậm — knot, tail gradient */
    --bow-glow: rgba(212,175,55,0.2);  /* hover glow */
}
```

| Phong cách | `--bow-color` | `--bow-color-dark` | Sparkle emoji |
|------------|---------------|-------------------|---------------|
| Classic Gold | `#D4AF37` | `#B8860B` | ✨ 💛 |
| Sage Green | `#4A9E6F` | `#357A52` | 🌿 🍃 💚 |
| Blush Pink | `#E8A0BF` | `#C77DA3` | 🌸 💕 💗 |
| Burgundy | `#A4343A` | `#722F37` | ✨ ❤️ |
| Dark Luxury | `#D4AF37` | `#B8860B` | ✨ ⭐ |
| Tropical | `#2D8B6F` | `#1A6B50` | 🌴 🌺 |

#### CSS: copy từ `styles.css` mục 20b (Ribbon Bow)

---

### 21. Padlock — Ổ khoá tình yêu mở thiệp

Chìa khoá bay vào cắm ổ → xoay → khoá bật ra + chìa rơi → mở thiệp. 4 phase animation.

```html
<div id="envelopeOpenBtn" class="padlock-wrap" role="button" tabindex="0" aria-label="Mở thiệp">
    <div class="padlock-shackle"></div>
    <div class="padlock-body">
        <div class="padlock-keyhole"></div>
        <span class="padlock-xi">囍</span>
    </div>
    <div class="padlock-key">
        <div class="key-shaft">
            <div class="key-head"></div>
            <div class="key-teeth"></div>
        </div>
    </div>
    <span class="padlock-sparkle" style="top:20%;left:15%;--sx:-30px;--sy:-25px;">✨</span>
    <span class="padlock-sparkle" style="top:50%;left:5%;--sx:-35px;--sy:5px;">❤️</span>
    <span class="padlock-sparkle" style="top:75%;right:20%;--sx:20px;--sy:25px;">🌸</span>
    <span class="padlock-hint">chạm ổ khoá để mở thiệp</span>
</div>
```

```javascript
// JS — 4 phases
var lockOpened = false;
openBtn.addEventListener('click', function () {
    if (lockOpened) return;
    lockOpened = true;
    openBtn.classList.add('inserting');           // Phase 1: chìa cắm vào (0.6s)
    setTimeout(function () {
        openBtn.classList.remove('inserting');
        openBtn.classList.add('turning');          // Phase 2: xoay chìa (0.5s)
    }, 650);
    setTimeout(function () {
        openBtn.classList.remove('turning');
        openBtn.classList.add('unlocked');         // Phase 3: khoá bật ra (0.8s)
    }, 1200);
    setTimeout(function () {
        envelope.classList.add('opened');          // Phase 4: mở thiệp
        bgMusic.play();
    }, 1800);
    setTimeout(function () { envelope.style.display = 'none'; }, 2800);
});
```

**Tuỳ chỉnh** qua CSS variables:
- `--gold`: màu khoá + chìa (mặc định `#D4AF37`)
- `--accent` / `--accent-dark`: màu lỗ khoá + viền đỏ

| Phong cách | `--gold` | `--accent-dark` | `.padlock-xi` |
|------------|----------|-----------------|---------------|
| Traditional Red | `#D4AF37` | `#8B0000` | 囍 |
| Classic Gold | `#D4AF37` | `#2C1810` | ♥ |
| Blush Pink | `#C9A84C` | `#C77DA3` | ♥ |
| Dark Luxury | `#D4AF37` | `#1A1A2E` | 囍 |

#### CSS: copy từ `styles.css` mục 20c (Padlock)
