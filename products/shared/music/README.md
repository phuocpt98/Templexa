# Music Library — Templexa

Kho nhạc nền dùng chung cho các landing page. Chỉ thêm nhạc khi user yêu cầu.

## Cấu trúc thư mục

```
music/
├── romantic/              # Nhạc tình nhẹ nhàng, lãng mạn
├── sad-ballad/            # Nhạc tình buồn, ballad
├── wedding/               # Nhạc đám cưới, lễ cưới
├── lofi-chill/            # Lo-fi, chill, thư giãn
├── jazz-cafe/             # Jazz, bossa nova, quán cà phê
├── upbeat-energy/         # Nhạc sôi động, năng lượng (gym, sport)
├── ambient-relax/         # Ambient, spa, thiền, yoga
├── classical-elegant/     # Nhạc cổ điển, thanh lịch
├── festive-holiday/       # Nhạc lễ hội, Tết, Giáng sinh, sinh nhật
└── corporate-professional/ # Nhạc doanh nghiệp, startup, chuyên nghiệp
```

## Gợi ý theo ngành

| Ngành landing page | Thể loại nhạc phù hợp |
|--------------------|----------------------|
| Quán cà phê, nhà hàng | `jazz-cafe` |
| Spa, yoga, wellness | `ambient-relax` |
| Gym, sport, fitness | `upbeat-energy` |
| Wedding planner, thiệp cưới | `wedding` |
| Studio ảnh cưới | `romantic`, `wedding` |
| Portfolio, blog cá nhân | `lofi-chill` |
| Công ty, startup, agency | `corporate-professional` |
| Khóa học, education | `lofi-chill`, `corporate-professional` |
| Shop thời trang, beauty | `lofi-chill`, `romantic` |
| Sự kiện, sinh nhật, Tết | `festive-holiday` |
| Bất động sản, luxury | `classical-elegant` |
| Trang thơ, tâm sự, confession | `sad-ballad`, `romantic` |

## Nguồn tải nhạc miễn phí bản quyền

| Nguồn | URL | Ghi chú |
|-------|-----|---------|
| Pixabay Music | pixabay.com/music | Free, không cần credit |
| Mixkit | mixkit.co/free-stock-music | Free |
| Bensound | bensound.com | Free với credit |
| Free Music Archive | freemusicarchive.org | Creative Commons |

## Quy tắc đặt tên file

```
{mô-tả-ngắn}.mp3
```

Ví dụ:
- `romantic/gentle-piano-love.mp3`
- `jazz-cafe/smooth-bossa-nova.mp3`
- `wedding/happy-wedding-march.mp3`
- `lofi-chill/rainy-day-study.mp3`
- `upbeat-energy/workout-motivation.mp3`

## Cách dùng trong code.html

```html
<!-- Đường dẫn tương đối từ folder sản phẩm -->
<audio id="bgMusic" loop preload="auto">
    <source src="../../shared/music/jazz-cafe/smooth-bossa-nova.mp3" type="audio/mpeg">
</audio>
```

## Lưu ý

- File MP3 nên dưới **5MB** (bài 2-3 phút, bitrate 128-192kbps)
- GitHub Pages giới hạn **100MB/file**
- Nhạc KHÔNG tự phát — user phải click nút để bật
