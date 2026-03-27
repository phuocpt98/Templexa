# Brainstorm: Thiệp cưới Luxury Brand — VIP Banking

## Bối cảnh
- **Khách hàng**: Con gái chủ tịch ngân hàng lớn, mời khách VIP/đối tác
- **Yêu cầu**: Tinh tế, chuyên nghiệp, ít màu mè, ấn tượng, chỉnh chu
- **Cấu trúc**: CHỈ 4 section — Envelope → Hero → Thông tin tiệc → Cảm ơn
- **Ràng buộc**: Không RSVP, wishes, gift, gallery, love story. Không hoa lá watercolor, chibi, cutesy.

## Phân tích 3 bộ ảnh

| Bộ ảnh | Tông | Đặc điểm | Phù hợp brand nào |
|--------|------|----------|-------------------|
| `vit-sang-trong` | Navy + trắng + lavender | Studio Hàn, vest navy, váy lace collar, hoa xanh tím, editorial refined | Dior, Bottega Veneta |
| `elegant-black-gold` | Đen + trắng + núi vàng | Tux đen, ballgown sweetheart, backdrop núi cinematic, dramatic | Cartier, Bvlgari |
| `trang-2` | Trắng tinh | Solo bride, dreamy, minimal, ánh sáng tự nhiên | Chanel, The Row |

## Phân tích tránh lặp với 3 thiệp gần nhất

| # | Phong cách | Font | Màu | Motif | Cần tránh |
|---|-----------|------|-----|-------|-----------|
| 211 | Blush romantic | Cormorant + Quicksand | Hồng blush | Wax seal, falling petals | Hồng, petals rơi, wax seal |
| 215 | Trung Hoa hiện đại | Ma Shan Zheng | Đỏ + vàng | 囍, gold confetti | Đỏ, vàng gold rực, confetti |
| 217 | Garden gate | Lora + Josefin | Sage green | Cổng vườn 3D, bồ công anh | Xanh lá, botanical 3D, dandelion |

**An toàn**: Navy/charcoal/cream/black/white — chưa thiệp nào dùng. Serif cổ điển mạnh — chưa có.

---

## PHƯƠNG ÁN A: "CARTIER HAUTE JOAILLERIE"

### 1. Brand tham chiếu
**Cartier** — Maison haute joaillerie Pháp, 177 năm lịch sử. Visual identity: deep red + navy + cream, thin serif typography (custom Cartier typeface), geometric precision, art deco lines, jewelry-inspired detailing. Tagline: "The Art of Being Unique."

Đặc trưng cốt lõi để mô phỏng:
- Geometric borders cực kỳ chính xác (viền đôi mảnh)
- Navy làm màu quyền lực (thay Cartier red — tránh lặp #215)
- Cream/ivory làm nền sang trọng
- Gold accent cực kỳ tiết chế — chỉ ở hairline rules và monogram
- Mọi thứ CÂN ĐỐI HOÀN HẢO — symmetry là ngôn ngữ của jewelry

### 2. Bộ ảnh chọn
**`elegant-black-gold`** — Tux đen + ballgown trắng + backdrop núi hùng vĩ = đúng vibe "grand occasion" của Cartier. Ảnh có drama tự nhiên, không cần thêm effect.

Ảnh sử dụng:
- `couple_hero.webp` — Envelope peek (ôm nhau, núi phía sau)
- `gallery_5.webp` — Hero chính (toàn thân, đối mặt, núi hoàng hôn)
- `couple_main.webp` — Section cảm ơn (đối mặt, romantic)

### 3. Palette (4 màu)

| Vai trò | Màu | Hex | Lý do |
|---------|-----|-----|-------|
| **Nền chính** | Ivory Cream | `#FAF8F5` | Nền giấy luxury, ấm hơn trắng tinh |
| **Text chính** | Charcoal Navy | `#1B2A4A` | Gần navy Cartier, đọc rõ, quyền lực |
| **Accent** | Antique Gold | `#B8976A` | Gold matte (không shiny), jewelry feel, dùng cực ít |
| **Border/Line** | Warm Gray | `#C8C0B8` | Viền, hairline rules, separator |

Không dùng đỏ (tránh lặp #215). Navy thay vì đen thuần — đen quá tang, navy = authority + refinement.

### 4. Typography

| Vai trò | Font | Weight | Lý do |
|---------|------|--------|-------|
| **Tên cô dâu chú rể** | **Cormorant Garamond** | 300 Light Italic | Thin serif kiểu jewelry engraving, sang, đọc được. Khác #211 vì dùng Italic thay Regular |
| **Heading** | **Cormorant Garamond** | 600 SemiBold | ALL CAPS + letter-spacing 0.3em = Cartier store signage feel |
| **Body** | **Jost** | 300 Light | Geometric sans giống Cartier modern communications, clean |
| **Monogram** | **Cormorant Garamond** | 700 Bold | 2 chữ cái ghép (T&H), thay logo |

Letter-spacing: heading 0.2-0.3em, body 0.05em. Line-height: 1.8-2.0. Typography phải "thở".

### 5. Envelope Animation
**Concept: "Hộp trang sức Cartier mở nắp"**

- Màn hình = nắp hộp nhung navy (`#1B2A4A`)
- Viền đôi gold mảnh (1px solid + 1px dashed, cách nhau 6px) — tạo khung bên trong
- Chính giữa: monogram "T & H" bằng Cormorant Garamond 700, gold `#B8976A`
- Bên dưới: dòng chữ "Trân trọng kính mời" — Jost 300, letter-spacing 0.2em, warm gray
- **Interaction**: Tap/click → nắp hộp trượt LÊN (translateY -100%) với easing `cubic-bezier(0.25, 0.1, 0.25, 1)`, duration 1.2s
- Khi nắp trượt: phía sau lộ ra ảnh couple blur nhẹ (couple_hero.webp, filter: blur(2px) brightness(0.7))
- Sau 0.3s delay: nội dung thiệp fade in từ dưới
- **Tinh tế ở đâu**: Không confetti, không particles, không sparkle. Chỉ 1 chuyển động duy nhất — mở nắp. Giống mở hộp Cartier thật: chậm, trọng lực, anticipation.

Corner ornaments: 4 góc dùng CSS border (L-shape, gold 1px) thay vì hoa lá. Geometric, không organic.

### 6. Hero Section
**Layout**: Full-width ảnh `gallery_5.webp` (couple đối mặt, núi hoàng hôn) — chiếm 70vh
- Ảnh: `object-fit: cover`, nhẹ `filter: brightness(0.85) contrast(1.05)` để tăng cinematic
- Overlay: gradient từ dưới lên `rgba(27,42,74, 0.6)` → transparent — chữ nằm phần dưới
- Text trên ảnh:
  ```
  THE WEDDING OF        ← Jost 300, letter-spacing 0.3em, gold
  Tên Chú Rể            ← Cormorant Garamond 300 Italic, 2.5rem, white
  &                      ← Cormorant Garamond 700, gold, 1.5rem
  Tên Cô Dâu            ← Cormorant Garamond 300 Italic, 2.5rem, white
  ─────                  ← hairline rule, gold, width 60px
  15 . 06 . 2026         ← Jost 300, letter-spacing 0.4em, warm gray
  ```
- Animation: text fade-in stagger (mỗi dòng delay 0.2s), từ dưới lên 20px

**Vì sao không dùng ảnh nhỏ + text to**: Ảnh bộ này có backdrop núi hùng vĩ — phải dùng full-width để tận dụng. Giống Cartier campaign luôn dùng ảnh full-bleed.

### 7. Thông tin tiệc
**Layout**: Nền ivory `#FAF8F5`, padding 80px trên dưới

```
── LỄ THÀNH HÔN ──          ← Jost 300 CAPS, letter-spacing 0.3em, gold hairline 2 bên
     
Thời gian: 11:00 | Thứ Hai, ngày 15 tháng 06 năm 2026
Tại: Trung tâm Hội nghị ABC
Địa chỉ: 123 Đường XYZ, Quận 1, TP.HCM

── ────── ──                  ← thin gold divider

── TIỆC CHÚC MỪNG ──        ← tương tự

Thời gian: 18:00 | Cùng ngày
Tại: Grand Ballroom, Khách sạn Park Hyatt
Địa chỉ: 2 Công Trường Lam Sơn, Quận 1, TP.HCM
```

- Text alignment: center, mọi thứ
- Font: Jost 300 cho body, Cormorant Garamond 600 CAPS cho heading
- Giữa 2 event: gold hairline divider (1px, width 40%, centered)
- Không icon, không card, không box. Pure typography + whitespace.
- Mỗi info line: `color: #1B2A4A`, line-height 2.0
- Animation: fade-in khi scroll vào viewport

### 8. Cảm ơn
**Layout**: Ảnh `couple_main.webp` background (cover, brightness 0.3) + overlay navy

```
Sự hiện diện của Quý khách
là niềm vinh hạnh lớn lao
của gia đình chúng tôi.

─────
T & H
```

- "Sự hiện diện..." — Cormorant Garamond 300 Italic, white, 1.3rem, line-height 2.2
- Monogram "T & H" — Cormorant Garamond 700, gold, 2rem
- Hairline rule trên monogram: gold, 40px
- Không nút, không link, không CTA. Kết thúc = kết thúc. Như trang cuối invitation card Cartier.

### 9. Nhạc nền đề xuất
**Debussy — "Clair de Lune"** (piano solo)
- Tại sao: Pháp (match Cartier heritage), universally recognized = khách VIP sẽ nhận ra, elegant không lời, không overwhelm nội dung
- Alternative: Satie — "Gymnopédie No.1" (nhẹ hơn, dreamy hơn)
- Volume: 15-20% max, auto-play khi mở envelope

### 10. Vì sao phù hợp VIP Banking

| Yếu tố | Cartier approach | Tác dụng với khách VIP |
|---------|-----------------|----------------------|
| Navy + Gold | Màu quyền lực tài chính | Khách ngân hàng quen màu này — logo ngân hàng lớn đều navy/gold |
| Geometric precision | Viền thẳng, cân đối | Thể hiện sự chính xác, đáng tin cậy — giá trị cốt lõi banking |
| Zero decoration | Không hoa lá, không confetti | Không giống thiệp cưới "bình dân" — phân biệt đẳng cấp |
| Ảnh epic backdrop | Núi hoàng hôn + tux | Grand occasion feeling — xứng tầm event VIP |
| French heritage | Cartier = Pháp = haute culture | Ngầm communicate: gia đình có taste quốc tế |

**Rủi ro**: Có thể hơi "lạnh" — thiếu warmth cho thiệp cưới. Khắc phục: ivory cream thay vì white thuần, gold accent ấm.

---

## PHƯƠNG ÁN B: "BOTTEGA VENETA QUIET LUXURY"

### 1. Brand tham chiếu
**Bottega Veneta** — Italian luxury, creative director Matthieu Blazy. Visual identity: Bottega Green, woven leather (intrecciato), NO visible logo, ultra-minimalism. Triết lý "When your own initials are enough."

Đặc trưng cốt lõi:
- **Không logo = không decoration**. Chất liệu tự nói lên tất cả
- Bottega Green (`#00614E`) — unique, nhận diện ngay, CHƯA có thiệp nào dùng xanh này (khác sage green #217)
- Typography cực kỳ restrained — ít chữ nhất có thể
- Texture quan trọng hơn màu sắc
- Negative space không phải khoảng trống — đó LÀ thiết kế

### 2. Bộ ảnh chọn
**`vit-sang-trong`** — Studio lavender/xám + vest navy + hoa xanh tím = synergy hoàn hảo với Bottega Green. Tone ảnh refined, editorial, không overdramatic. Đúng "quiet luxury".

Ảnh sử dụng:
- `couple_2.webp` — Envelope (quay lưng, thân mật, intimate)
- `couple_hero.webp` — Hero (nắm tay, đối mặt, hoa xanh)
- `couple_13.webp` — Cảm ơn (ngồi ghế, hoa xanh tím, relaxed)

### 3. Palette (3 màu — tối giản hơn Cartier)

| Vai trò | Màu | Hex | Lý do |
|---------|-----|-----|-------|
| **Nền chính** | Parchment | `#F5F1EB` | Giấy da cổ, ấm, texture feel |
| **Text chính** | Deep Forest | `#1A2E28` | Gần đen nhưng có undertone xanh, đồng bộ green |
| **Accent duy nhất** | Bottega Green | `#00614E` | Xanh rừng sâu, mature, khác hẳn sage green #217 |

Không có màu thứ 4. Không gold, không silver. Chỉ 3 màu. Đó là Bottega.

### 4. Typography

| Vai trò | Font | Weight | Lý do |
|---------|------|--------|-------|
| **Tên cô dâu chú rể** | **DM Serif Display** | 400 Regular Italic | Serif hiện đại, ink trap details, rất Bottega editorial |
| **Heading** | **DM Serif Display** | 400 Regular | Không bold — Bottega không bao giờ la hét |
| **Body** | **DM Sans** | 300 Light | Cùng họ DM, geometric, clean, Italian feel |

Letter-spacing: heading 0.15em, body 0.02em. Ít hơn Cartier — Bottega subtler.

### 5. Envelope Animation
**Concept: "Mở bao thư da Bottega — intrecciato unwrap"**

- Nền: `#F5F1EB` parchment
- Giữa màn hình: hình chữ nhật (ratio 5:7, như thiệp giấy thật), border 1px `#1A2E28`
- Background pattern bên trong chữ nhật: CSS repeating pattern mô phỏng intrecciato weave (dùng `repeating-linear-gradient` chéo 45deg, subtle, opacity 0.06)
- Chữ giữa: tên cô dâu + chú rể, DM Serif Display Italic, `#1A2E28`
- Dưới tên: "Kính mời" — DM Sans 300, letter-spacing 0.2em
- **Interaction**: Tap → chữ nhật "mở" từ giữa ra hai bên (clip-path hoặc 2 half split horizontally), mỗi nửa translateX(+/-50vw), duration 1s, ease-out
- Sau split: nội dung reveal từ phía sau, opacity 0 → 1 qua 0.8s
- **Tinh tế ở đâu**: Pattern intrecciato chỉ visible khi nhìn kỹ (opacity 0.06). Người mở thiệp sẽ thấy "có gì đó" nhưng không chỉ ra được — giống cầm túi Bottega thật, phải sờ mới cảm nhận texture.

Không corner ornaments. Không viền đôi. Một viền đơn 1px là đủ.

### 6. Hero Section
**Layout**: Split screen 50/50 — trái text, phải ảnh

- **Trái** (50%): Nền parchment `#F5F1EB`
  ```
  Tên Chú Rể             ← DM Serif Display Italic, 2rem, #1A2E28
  and                     ← DM Sans 300, 0.9rem, Bottega Green, letter-spacing 0.3em
  Tên Cô Dâu             ← DM Serif Display Italic, 2rem, #1A2E28
  
  
  
  fifteen june            ← DM Sans 300, lowercase (!), 0.85rem, #1A2E28, letter-spacing 0.2em
  two thousand and twenty six
  ```
  - Text căn trái (không center!) — Bottega editorial luôn căn trái
  - Padding-left: 15%, padding-top: 30% — chữ "trôi" trong khoảng trống

- **Phải** (50%): Ảnh `couple_hero.webp`, object-fit cover, chiếm hết height
  - Không filter, không overlay. Ảnh đẹp tự nó.

- Animation: text fade-in từ trái (translateX -20px → 0), ảnh fade-in từ phải (translateX 20px → 0), cùng lúc, 0.8s

**Vì sao split screen**: Bottega Veneta editorial campaigns luôn dùng asymmetric layout, text 1 bên + ảnh 1 bên. Không bao giờ text đè lên ảnh.

**Ngày viết lowercase bằng chữ**: "fifteen june" thay vì "15.06" — detail level rất cao, rất editorial. Khách VIP sẽ notice.

### 7. Thông tin tiệc
**Layout**: Full-width, nền parchment, chia 2 block dọc cách nhau bởi 1 vertical line

```
     LỄ THÀNH HÔN                    │              TIỆC CHÚC MỪNG
                                      │
     11:00                            │              18:00
     Thứ Hai, 15 tháng 06, 2026      │              Cùng ngày
                                      │
     Trung tâm Hội nghị ABC          │              Grand Ballroom
     123 Đường XYZ                    │              Khách sạn Park Hyatt
     Quận 1, TP.HCM                  │              2 Công Trường Lam Sơn
                                      │              Quận 1, TP.HCM
```

- Vertical divider: 1px solid Bottega Green, height 80%
- Heading "LỄ THÀNH HÔN": DM Serif Display, regular (không bold), letter-spacing 0.15em
- Body: DM Sans 300
- Giờ (11:00, 18:00): DM Serif Display, 1.5rem, Bottega Green — highlight duy nhất
- Text căn trái mỗi cột
- Mobile: stack dọc, vertical line → horizontal line

### 8. Cảm ơn
**Layout**: Nền ảnh `couple_13.webp` full-width (ngồi ghế, hoa xanh tím) + overlay gradient

```
Trân trọng cảm ơn.

─
```

- Chỉ 4 từ. Đó là Bottega. 
- DM Serif Display Italic, white, 1.5rem
- Dấu chấm cuối câu — intentional. Trang trọng, dứt khoát.
- Hairline ngang dưới: Bottega Green, 30px, 1px
- Overlay: `rgba(26,46,40, 0.55)` — xanh rừng tối
- Không monogram, không quote dài. Kết thúc gọn.

### 9. Nhạc nền đề xuất
**Ludovico Einaudi — "Nuvole Bianche"** (piano solo)
- Tại sao: Italian (match Bottega heritage), contemporary classical, emotional nhưng restrained, rất nhiều luxury brand dùng nhạc Einaudi cho runway/campaign
- Alternative: Max Richter — "On the Nature of Daylight" (strings, cinematic hơn)
- Volume: 10-15% — thấp hơn Cartier vì Bottega = whisper

### 10. Vì sao phù hợp VIP Banking

| Yếu tố | Bottega approach | Tác dụng với khách VIP |
|---------|-----------------|----------------------|
| Không decoration | "Logo-less luxury" | Khách VIP thật sự giàu không cần flex — họ nhận ra quiet luxury |
| 3 màu duy nhất | Discipline cực cao | Thể hiện sự kiềm chế = bản lĩnh, không phô trương |
| Lowercase date | "fifteen june" | Micro-detail khiến khách nhìn lại lần 2 — conversation starter |
| Split layout | Editorial, không center | Khác biệt mọi thiệp cưới khác — memorable |
| Intrecciato pattern | Ẩn ở opacity 0.06 | Giống Bottega thật: phải sờ mới biết — exclusive feeling |

**Rủi ro**: Quá minimal có thể bị nhầm là "thiếu", đặc biệt với khách lớn tuổi VN. Khắc phục: intrecciato pattern + split layout tạo đủ visual interest dù ít element.

---

## PHƯƠNG ÁN C: "DIOR COUTURE ATELIER"

### 1. Brand tham chiếu
**Dior** — French couture house, creative director Maria Grazia Chiuri. Visual identity: toile de Jouy pattern, soft blue-gray, ballet pink, cannage quilting, mix giữa romantic + structured. Tagline: "And I love Dior."

Đặc trưng cốt lõi:
- **Toile de Jouy pattern** — hoa văn cổ điển Pháp, phân biệt Dior khỏi mọi brand khác
- Soft blue-gray + cream — palette tinh tế nhất trong luxury
- Script + Caps Serif kết hợp — feminine elegance meets structure
- Couture atelier feel — thủ công, may đo, bespoke

### 2. Bộ ảnh chọn
**`vit-sang-trong`** — Lavender studio + navy vest + hoa xanh tím = HOÀN HẢO cho Dior blue-gray palette. Váy trắng có lace collar detail = couture feel. Bộ ảnh này SINH RA cho direction này.

Ảnh sử dụng:
- `couple_4.webp` — Envelope (hôn tay, galant, very Dior campaign)
- `couple_hero.webp` — Hero (nắm tay, cả 2, hoa xanh)
- `couple_2.webp` — Cảm ơn (quay lưng, intimate, silhouette đẹp)

### 3. Palette (4 màu)

| Vai trò | Màu | Hex | Lý do |
|---------|-----|-----|-------|
| **Nền chính** | Dior Cream | `#F8F6F0` | Ấm nhẹ, giấy couture |
| **Text chính** | Dior Gray | `#3D3D3D` | Xám đậm Dior (không đen thuần — Dior không bao giờ dùng #000) |
| **Accent** | Dior Blue-Gray | `#8B9DAF` | Xanh xám signature Dior, match lavender trong ảnh |
| **Pattern** | Soft Lavender | `#C5B9CD` | Cho toile de Jouy pattern, nhẹ nhàng |

### 4. Typography

| Vai trò | Font | Weight | Lý do |
|---------|------|--------|-------|
| **Tên cô dâu chú rể** | **Playfair Display** | 400 Regular Italic | High-contrast serif, rất couture editorial, ink-like |
| **Heading** | **Playfair Display** | 700 Bold | CAPS + letter-spacing = Dior store signage |
| **Accent text** | **Tangerine** | 700 Bold | Script nhẹ nhàng cho "and", section divider text |
| **Body** | **Raleway** | 300 Light | Geometric sans, clean, thở, rất Dior digital |

Combo Playfair + Tangerine + Raleway = structured feminine. Script chỉ dùng cực ít (chữ "and", "với") — không lạm dụng.

### 5. Envelope Animation
**Concept: "Mở thiệp couture — wax seal breaking"**

- Nền: cream `#F8F6F0`
- Toile de Jouy pattern CSS: `repeating-conic-gradient` hoặc SVG pattern background, Dior Blue-Gray, opacity 0.04 — phủ toàn bộ nền (cực nhẹ, phải nhìn kỹ)
- Giữa: card trắng (aspect 3:4), viền đôi (outer: 1px solid `#C5B9CD`, inner: 1px dashed `#C5B9CD`, gap 8px)
- Corner ornaments: 4 góc dùng Tangerine script vẽ flourish nhỏ (character "~" hoặc CSS curve)
- Center card:
  ```
  cô dâu                  ← Playfair Display Italic, Dior Gray
  and                      ← Tangerine 700, Dior Blue-Gray, 1.2rem
  chú rể                  ← Playfair Display Italic, Dior Gray
  ```
- Dưới tên: wax seal icon (dùng `wax-seal.webp` từ shared icons, width 40px, tinted Dior Blue-Gray qua CSS filter)
- **Interaction**: Tap wax seal → seal "vỡ" (scale 1 → 1.3 + opacity 1 → 0, 0.3s) → card split mở dọc giữa (hai nửa translateY +/-100vh), 0.8s → reveal content
- Background toile pattern fade intensity 0.04 → 0.08 trong quá trình mở — "pattern sống dậy"

**Tinh tế**: Wax seal chỉ 40px — không phải focal point, chỉ là invitation to interact. Pattern toile tăng nhẹ — reward cho người chú ý.

### 6. Hero Section
**Layout**: Ảnh hero centered, CÓ VIỀN — giống ảnh đặt trong khung couture

- Outer container: padding 40px, nền cream
- Ảnh `couple_hero.webp`: width 85%, centered, border 1px solid `#C5B9CD`
- Margin dưới ảnh: 40px
- Text dưới ảnh (không đè lên ảnh — khác Cartier):
  ```
  ── THE WEDDING CELEBRATION ──    ← Raleway 300 CAPS, letter-spacing 0.3em, Dior Blue-Gray
  
  Tên Chú Rể                      ← Playfair Display Italic, 2.2rem, Dior Gray
  and                              ← Tangerine 700, Dior Blue-Gray, 1.5rem
  Tên Cô Dâu                      ← Playfair Display Italic, 2.2rem, Dior Gray
  
  ─── ✦ ───                        ← hairline + small diamond, Dior Blue-Gray
  
  15 — 06 — 2026                   ← Raleway 300, letter-spacing 0.4em, Dior Gray
  ```
- Diamond divider `✦`: CSS pseudo-element, cực nhỏ (8px), thay cho flourish lớn
- Animation: ảnh scale 1.05 → 1.0 (zoom out nhẹ, "settle" vào frame), text stagger fade-in

**Vì sao text dưới ảnh thay vì overlay**: Dior editorial luôn tách biệt image và text — tôn trọng cả hai. Overlay = đại trà. Separation = couture.

### 7. Thông tin tiệc
**Layout**: 2 card xếp dọc, centered, viền mỏng, nền cream

```
┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
│                                    │
│      LỄ THÀNH HÔN                │
│      ─── ✦ ───                    │
│                                    │
│      Thứ Hai, 15 tháng 06, 2026  │
│      Lúc 11 giờ 00               │
│                                    │
│      Trung tâm Hội nghị ABC      │
│      123 Đường XYZ, Q.1, TP.HCM  │
│                                    │
└─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘

         (khoảng cách 30px)

┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
│                                    │
│      TIỆC CHÚC MỪNG              │
│      ─── ✦ ───                    │
│      ...                          │
│                                    │
└─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘
```

- Card border: 1px dashed `#C5B9CD` (dashed = Dior couture stitching metaphor)
- Heading: Playfair Display 700 CAPS, letter-spacing 0.2em
- Diamond divider: `✦` nhỏ giữa hairlines
- Body: Raleway 300, line-height 2.0
- Cards width: 80%, centered
- "Lúc 11 giờ 00" thay vì "11:00" — Vietnamese formal, couture attention to language

### 8. Cảm ơn
**Layout**: Ảnh `couple_2.webp` (quay lưng, thân mật) — chiếm nửa trên (50vh), nửa dưới cream + text

- Ảnh: object-position top, nhẹ filter brightness(0.9)
- Text section (dưới ảnh):
  ```
  ─── ✦ ───
  
  Sự hiện diện của Quý khách
  là niềm hạnh phúc 
  của gia đình chúng tôi.
  
  with love,
  Tên Chú Rể and Tên Cô Dâu
  ```
- "with love," — Tangerine 700, Dior Blue-Gray, lowercase
- Tên: Playfair Display Italic, Dior Gray
- Toile pattern xuất hiện lại ở nền section này (opacity 0.06) — bookend với envelope

### 9. Nhạc nền đề xuất
**Chopin — "Nocturne Op.9 No.2"** (piano solo)
- Tại sao: Romantic classical Pháp-Ba Lan, feminine energy match Dior DNA, universally beloved, không quá dramatic
- Alternative: Debussy — "Rêverie" (dreamy hơn, rất Dior campaign)
- Volume: 15-20%

### 10. Vì sao phù hợp VIP Banking

| Yếu tố | Dior approach | Tác dụng với khách VIP |
|---------|--------------|----------------------|
| Toile de Jouy pattern | Heritage pattern 270+ năm | Thể hiện gia đình có chiều sâu văn hóa, không "mới giàu" |
| Dashed border = stitching | Couture metaphor | Thiệp "được may đo" — bespoke feel |
| Script chỉ dùng cho "and" | Tiết chế trang trí | Biết khi nào dùng decoration = refined taste |
| Blue-gray palette | Soft authority | Nhẹ nhàng hơn navy nhưng vẫn quyền lực — phù hợp nữ (con gái chủ tịch) |
| Ảnh dưới text | Editorial separation | Tôn trọng content — giống annual report VIP hơn là brochure |

**Rủi ro**: Dior direction = feminine — nếu chú rể side muốn masculinity hơn có thể hơi lệch. Khắc phục: Playfair Display đủ strong, gray đủ neutral, không quá "pink".

---

## SO SÁNH 3 PHƯƠNG ÁN

| Tiêu chí | A. Cartier | B. Bottega | C. Dior |
|----------|-----------|-----------|---------|
| **Vibe** | Grand, cinematic, powerful | Ultra-minimal, intellectual, whisper | Romantic-structured, editorial, bespoke |
| **Bộ ảnh** | elegant-black-gold | vit-sang-trong | vit-sang-trong |
| **Màu chủ đạo** | Navy + Gold | Forest Green | Blue-Gray + Lavender |
| **Typography feel** | Jewelry engraving | Editorial modernist | Couture feminine |
| **Envelope** | Mở nắp hộp trang sức | Split card intrecciato | Wax seal vỡ |
| **Hero** | Full-bleed ảnh + text overlay | Split 50/50 text/ảnh | Ảnh trong khung + text dưới |
| **Độ an toàn** | Cao (ai cũng thấy sang) | Trung bình (cần taste để appreciate) | Cao (đẹp rõ ràng, dễ cảm nhận) |
| **Trùng thiệp cũ?** | Không | Không | Không |
| **Unique factor** | Ảnh núi epic | Lowercase date + intrecciato | Toile de Jouy + dashed stitching |
| **Phù hợp "con gái chủ tịch"** | 8/10 | 7/10 | 9/10 |

## KHUYẾN NGHỊ

**Phương án C (Dior)** phù hợp nhất vì:
1. **Con gái chủ tịch** = feminine perspective, Dior balance được romantic + professional
2. Bộ ảnh `vit-sang-trong` có lavender/blue tones match HOÀN HẢO với Dior Blue-Gray — synergy tự nhiên, không cần filter nặng
3. Toile de Jouy pattern = unique selling point, chưa thiệp nào có — tạo câu chuyện khi khách hỏi
4. An toàn nhất: đẹp rõ ràng, khách VIP mọi lứa tuổi đều appreciate
5. Có texture (pattern, dashed border, wax seal) nhưng vẫn tinh tế — đủ "substance" cho thiệp cưới VN

**Phương án A (Cartier)** là backup mạnh nếu muốn hướng "power" hơn "grace".

**Phương án B (Bottega)** là wild card cho khách thật sự hiểu luxury — nhưng rủi ro cao hơn.

## CÂU HỎI CHƯA GIẢI QUYẾT

1. Tên cô dâu chú rể cụ thể? (ảnh hưởng monogram, độ dài text layout)
2. Ngày cưới + địa điểm thật? (ảnh hưởng typography hierarchy)
3. Có thêm thông tin gia đình 2 bên không? (tên bố mẹ mời — phổ biến trong VIP VN)
4. Nhạc: khách có preference classical vs contemporary?
5. Bộ ảnh `trang-2` có thêm ảnh couple (không chỉ solo bride)?
