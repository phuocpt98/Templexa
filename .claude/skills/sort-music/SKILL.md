---
name: sort-music
description: "Phân loại file MP3 trong kho nhạc → di chuyển vào folder thể loại phù hợp."
---

Phân loại file MP3 trong kho nhạc → di chuyển vào folder thể loại phù hợp.

Argument: $ARGUMENTS — (tuỳ chọn) đường dẫn folder chứa MP3 cần phân loại. Mặc định: `products/shared/music/`

Ví dụ:
- `""` → quét `products/shared/music/*.mp3`
- `"~/Downloads"` → quét folder Downloads

---

## Quy trình

### Bước 1: Quét file MP3 chưa phân loại

Quét file MP3 nằm **trực tiếp** trong folder gốc (chưa nằm trong subfolder thể loại):

```bash
ls <folder>/*.mp3
```

Nếu `$ARGUMENTS` là folder ngoài (ví dụ `~/Downloads`):
- Quét `<folder>/*.mp3`
- Sau khi phân loại → di chuyển vào `products/shared/music/{thể-loại}/`

Nếu không có file MP3 nào → báo "Không có file MP3 mới cần phân loại" và dừng.

### Bước 2: Phân loại từng bài

Dựa vào **tên file** (tên bài hát + ca sĩ nếu có), xác định thể loại:

#### Bảng phân loại

| Thể loại | Folder | Đặc điểm nhận biết |
|-----------|--------|---------------------|
| **Nhạc tình lãng mạn** | `romantic/` | Love songs nhẹ nhàng, ngọt ngào, tempo chậm-vừa |
| **Nhạc tình buồn** | `sad-ballad/` | Ballad buồn, chia tay, đau lòng, da diết |
| **Nhạc đám cưới** | `wedding/` | Bài kinh điển dùng trong đám cưới, lời về kết hôn/mãi mãi |
| **Lo-fi / Chill** | `lofi-chill/` | Lo-fi beats, chill hop, nhạc thư giãn không lời hoặc nhẹ |
| **Jazz / Café** | `jazz-cafe/` | Jazz, bossa nova, swing, nhạc quán cà phê |
| **Sôi động / Năng lượng** | `upbeat-energy/` | Pop sôi động, EDM, dance, workout, party |
| **Ambient / Thư giãn** | `ambient-relax/` | Ambient, spa, thiền, yoga, tiếng thiên nhiên |
| **Cổ điển / Thanh lịch** | `classical-elegant/` | Classical, piano solo, orchestra, nhạc phim thanh lịch |
| **Lễ hội / Holiday** | `festive-holiday/` | Nhạc Tết, Giáng sinh, sinh nhật, carnival |
| **Doanh nghiệp** | `corporate-professional/` | Nhạc nền corporate, motivational, presentation |

#### Gợi ý phân loại theo bài hát phổ biến

**Wedding:**
- A Thousand Years, Beautiful In White, Marry Me, Perfect (Ed Sheeran)
- Can't Help Falling In Love, All of Me, Here Comes The Bride
- I Do, From This Moment, Thinking Out Loud, Sugar

**Romantic:**
- Endless Love, Only Love, Because I Love You, More Than Words
- Everyday I Love You, Can't Take My Eyes Off You, L-O-V-E
- Just The Way You Are, You Are The Reason, Better Together

**Sad Ballad:**
- My Heart Will Go On, Until You, Say Something, Someone Like You
- Fix You, Let Her Go, Hurt, All By Myself, Yesterday
- Tears In Heaven, Nothing's Gonna Change My Love For You (tuỳ version)

**Upbeat Energy:**
- We Found Love, Uptown Funk, Happy, Shake It Off, Can't Stop The Feeling
- Dynamite, Levitating, Blinding Lights, Don't Start Now

**Classical Elegant:**
- Canon in D, Clair de Lune, Für Elise, River Flows In You
- Comptine d'un autre été, A Thousand Years (piano cover)

**Lo-fi Chill:**
- File tên có "lofi", "chill", "study", "beats", "relaxing"
- Nhạc không lời, instrumental

**Jazz Café:**
- File tên có "jazz", "bossa", "swing", "café", "coffee"
- Fly Me To The Moon, The Girl From Ipanema, Autumn Leaves

**Ambient Relax:**
- File tên có "ambient", "spa", "meditation", "nature", "zen"
- Nhạc không lời, tiếng nước, tiếng chim

**Festive Holiday:**
- Jingle Bells, Last Christmas, All I Want For Christmas
- Happy Birthday, Auld Lang Syne

**Corporate:**
- File tên có "corporate", "motivational", "inspiring", "business"
- Nhạc nền không lời, nhịp đều, chuyên nghiệp

### Bước 3: Hiển thị bảng phân loại để xác nhận

In bảng:

```
Tìm thấy <N> file MP3 cần phân loại:

| # | Tên file | → Thể loại | Lý do |
|---|----------|------------|-------|
| 1 | A Thousand Years.mp3 | wedding | Bài cưới kinh điển |
| 2 | Fix You.mp3 | sad-ballad | Ballad buồn |
| ... | | | |

Di chuyển tất cả?
```

**QUAN TRỌNG: Hỏi user xác nhận TRƯỚC khi di chuyển.** User có thể muốn đổi thể loại cho một số bài.

### Bước 4: Di chuyển file

Sau khi user xác nhận:

```bash
mv "<file>.mp3" products/shared/music/<thể-loại>/
```

**Nếu tên file có ký tự đặc biệt** (dấu ngoặc, khoảng trắng, tiếng Việt) → dùng quotes.

### Bước 5: Báo cáo

```
✅ Đã phân loại <N> file MP3:

| Thể loại | Số bài | Tổng trong folder |
|-----------|--------|-------------------|
| romantic | +2 | 5 bài |
| wedding | +3 | 6 bài |
| sad-ballad | +1 | 3 bài |
| ... | | |

🎵 Tổng kho nhạc: <tổng> bài
```

---

## Ràng buộc

- **Luôn hỏi xác nhận** trước khi di chuyển — user có thể muốn đổi thể loại
- Nếu không chắc thể loại → hỏi user
- Nếu bài hát có thể thuộc nhiều thể loại (ví dụ "A Thousand Years" vừa romantic vừa wedding) → chọn thể loại **phù hợp nhất** và ghi chú
- KHÔNG đổi tên file — giữ nguyên tên gốc
- KHÔNG đọc nội dung file MP3 — chỉ dựa vào tên file để phân loại
