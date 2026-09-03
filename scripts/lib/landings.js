/**
 * landings.js — Định nghĩa 12 trang landing lọc của catalog thiệp.
 *
 * Vì sao có file này: trước 09/2026 các landing lọc chỉ là query string
 * (/thiep-online?category=wedding&style=luxury) nên title/description/canonical/H1
 * chỉ xuất hiện SAU khi JS chạy — Google thấy 12 URL giống hệt nhau. Từ 09/2026 mỗi
 * landing là một file HTML tĩnh riêng ở gốc site, sinh bởi scripts/build-landing.js.
 *
 *   const { LANDINGS, byFilter, url } = require('./lib/landings');
 *
 * Dùng chung bởi: scripts/build-landing.js (sinh HTML), scripts/build-sitemap.js (URL),
 * và bảng LANDING-MAP nhúng vào assets/js/products.js (canonical + href cho chip lọc).
 *
 * Quy ước nội dung (docs/seo/01-nguyen-tac-seo.md mục C):
 *  - lead: 1–2 câu ngay dưới H1, trả lời "trang này có gì".
 *  - body: 150–300 từ đặt dưới lưới mẫu. build-landing.js đếm từ và BÁO LỖI nếu lệch.
 *  - Số mẫu viết bằng placeholder để luôn khớp data.js:
 *      {n}         → số mẫu public của chính landing này
 *      {n:slug}    → số mẫu public của landing khác
 *  - related: >= 3 landing khác (link chéo).
 */

const LANDINGS = [
    // ── Thiệp cưới ────────────────────────────────────────────────────────────
    {
        slug: 'thiep-cuoi',
        category: 'wedding',
        legacyQuery: 'category=wedding',
        navLabel: 'Thiệp cưới online',
        crumb: 'Thiệp cưới online',
        title: 'Thiệp Cưới Online Đẹp — Mẫu Thiệp Mời Cưới Điện Tử | Templexa',
        desc: 'Bộ sưu tập mẫu thiệp cưới online đẹp, gửi qua Zalo/Facebook. Có đếm ngược, xác nhận tham dự, gửi lời chúc, nhạc nền. Xem demo và đặt riêng theo tên cô dâu chú rể.',
        h1: '<span class="gradient-text">Thiệp Cưới Online</span><br>Mẫu Thiệp Mời Cưới Điện Tử Đẹp',
        lead: '{n} mẫu <strong>thiệp cưới online</strong> cho lễ thành hôn, vu quy và đính hôn — có đếm ngược ngày cưới, xác nhận tham dự và sổ lưu bút gửi lời chúc. Xem demo trực tiếp, không cần đăng ký.',
        body: [
            { h2: 'Thiệp cưới online là gì và trang này có gì' },
            { p: 'Thiệp cưới online là một trang web riêng cho đám cưới của bạn, thay cho tấm thiệp giấy. Trong thiệp có ảnh cưới, giờ lễ thành hôn và tiệc nhà hàng, bản đồ chỉ đường, đếm ngược ngày cưới, ô xác nhận tham dự và sổ lưu bút gửi lời chúc. Bạn gửi một đường link qua Zalo hoặc Facebook, khách mở trên điện thoại là xem ngay, không cần cài ứng dụng.' },
            { p: 'Trang này gom {n} mẫu thiệp cưới đang mở xem demo, chia theo bốn phong cách: sang trọng ({n:thiep-cuoi-sang-trong} mẫu), truyền thống ({n:thiep-cuoi-truyen-thong} mẫu), hoa lá ({n:thiep-cuoi-hoa} mẫu) và hiện đại ({n:thiep-cuoi-hien-dai} mẫu). Bấm vào một mẫu để xem ảnh chụp thật trên điện thoại, danh sách tính năng và bản demo đầy đủ.' },
            { h2: 'Chọn mẫu thế nào cho nhanh' },
            { p: 'Nhìn không gian tiệc trước rồi chọn thiệp cho hợp tông. Tiệc khách sạn, trung tâm hội nghị thường hợp nhóm sang trọng ánh kim. Lễ gia tiên tại nhà hợp nhóm truyền thống đỏ vàng. Tiệc ngoài trời, tiệc vườn hợp nhóm hoa lá màu nước. Cặp đôi thích gọn gàng, ít hoạ tiết thì chọn nhóm hiện đại.' },
            { p: 'Mọi mẫu đều thay được tên cô dâu chú rể, ngày giờ, địa điểm, ảnh cưới và nhạc nền. Gói Basic 150.000đ; gói Premium 199.000đ có thêm lời chúc bay realtime, cá nhân hoá tên từng khách và mã QR riêng cho mỗi khách. Thiệp giao trong 24 giờ kể từ khi bạn gửi đủ thông tin.' },
        ],
        related: ['thiep-cuoi-sang-trong', 'thiep-cuoi-truyen-thong', 'thiep-cuoi-hoa', 'thiep-cuoi-hien-dai'],
    },
    {
        slug: 'thiep-cuoi-sang-trong',
        category: 'wedding',
        style: 'luxury',
        legacyQuery: 'category=wedding&style=luxury',
        navLabel: 'Thiệp cưới sang trọng',
        crumb: 'Sang trọng',
        title: 'Thiệp Cưới Sang Trọng — Mẫu Thiệp Cưới Online Cao Cấp | Templexa',
        desc: 'Mẫu thiệp cưới online phong cách sang trọng: tông vàng đồng, ánh kim, hoạ tiết cổ điển. Xem demo trực tiếp, đặt riêng theo tên cô dâu chú rể.',
        h1: '<span class="gradient-text">Thiệp Cưới Sang Trọng</span><br>Tông Vàng Đồng, Ánh Kim Cao Cấp',
        lead: '{n} mẫu <strong>thiệp cưới sang trọng</strong> tông vàng đồng, ánh kim, khung viền cổ điển — hợp tiệc khách sạn và trung tâm hội nghị.',
        body: [
            { h2: 'Nhóm thiệp cưới sang trọng hợp với đám cưới nào' },
            { p: 'Nhóm sang trọng gồm {n} mẫu dùng nền tối hoặc kem, chữ ánh kim, khung viền và hoạ tiết cổ điển. Nhìn gần với thiệp giấy ép kim hơn là một trang web thông thường. Chữ thường là kiểu có chân, giãn dòng rộng, ít chi tiết rối.' },
            { p: 'Nhóm này hợp với tiệc ở khách sạn, trung tâm hội nghị hay nhà hàng sảnh lớn, nơi backdrop và bàn tiệc đã theo tông vàng - trắng - đen. Ảnh cưới chụp trong studio nền tối hoặc chụp buổi tối lên thiệp rất hợp. Nếu ảnh của bạn chụp ngoài trời ban ngày, nhóm hoa lá hoặc hiện đại sẽ hợp hơn.' },
            { h2: 'Mỗi mẫu có sẵn những gì' },
            { p: 'Tất cả mẫu trong nhóm đều có phong bì mở thiệp, nhạc nền, đếm ngược ngày cưới, phần Love Story, gallery ảnh cưới, RSVP xác nhận tham dự, mục gửi lời chúc, Google Maps chỉ đường và mã QR mừng cưới. Bấm vào mẫu để xem ảnh chụp thật trên điện thoại rồi mở demo, không cần tài khoản.' },
            { p: 'Giá gói Basic 150.000đ, gói Premium 199.000đ, giao trong 24 giờ. Bạn được đổi màu nền, đổi phông chữ và đổi nhạc theo ý mình trong lúc làm thiệp.' },
        ],
        related: ['thiep-cuoi-truyen-thong', 'thiep-cuoi-hien-dai', 'thiep-cuoi-hoa', 'thiep-cuoi'],
    },
    {
        slug: 'thiep-cuoi-truyen-thong',
        category: 'wedding',
        style: 'traditional',
        legacyQuery: 'category=wedding&style=traditional',
        navLabel: 'Thiệp cưới truyền thống',
        crumb: 'Truyền thống',
        title: 'Thiệp Cưới Truyền Thống — Song Hỷ, Long Phụng, Đỏ Vàng | Templexa',
        desc: 'Mẫu thiệp cưới online truyền thống Việt Nam: chữ Song Hỷ, long phụng, tông đỏ vàng. Hợp lễ gia tiên, dạm ngõ, ăn hỏi.',
        h1: '<span class="gradient-text">Thiệp Cưới Truyền Thống</span><br>Song Hỷ, Long Phụng, Đỏ Vàng',
        lead: '{n} mẫu <strong>thiệp cưới truyền thống</strong> với chữ Song Hỷ, hoạ tiết long phụng và tông đỏ vàng — hợp lễ gia tiên, dạm ngõ, ăn hỏi.',
        body: [
            { h2: 'Thiệp cưới truyền thống khác gì các nhóm còn lại' },
            { p: 'Nhóm truyền thống có {n} mẫu, dùng chữ Song Hỷ, hoạ tiết long phụng, hoa sen, trống đồng và tông đỏ vàng. Bố cục giữ đúng lối thiệp mời in sẵn: tên hai bên cha mẹ đặt trước, kế đến là tên cô dâu chú rể, rồi tới lời mời và địa điểm.' },
            { p: 'Nhóm này hợp với đám cưới ở quê, lễ gia tiên, dạm ngõ và ăn hỏi, nhất là khi danh sách khách có nhiều người lớn tuổi. Cỡ chữ trong thiệp để lớn, nút bấm to, không có thao tác phức tạp nên ông bà mở link vẫn đọc được.' },
            { h2: 'Ghi hai lễ trên cùng một thiệp' },
            { p: 'Mỗi mẫu tách riêng phần lễ Vu Quy và lễ Thành Hôn để ghi hai địa điểm, hai khung giờ khác nhau — nhà gái một nơi, nhà trai một nơi. Kèm bản đồ chỉ đường cho từng nơi, đếm ngược, RSVP xác nhận tham dự và mục gửi lời chúc.' },
            { p: 'Giá 150.000đ gói Basic và 199.000đ gói Premium, giao trong 24 giờ. Muốn giữ nét cổ điển nhưng nhẹ nhàng hơn thì xem thêm nhóm hoa lá, còn thích tông tối sang thì xem nhóm sang trọng.' },
        ],
        related: ['thiep-cuoi-sang-trong', 'thiep-cuoi-hoa', 'thiep-cuoi-hien-dai', 'thiep-cuoi'],
    },
    {
        slug: 'thiep-cuoi-hoa',
        category: 'wedding',
        style: 'floral',
        legacyQuery: 'category=wedding&style=floral',
        navLabel: 'Thiệp cưới hoa',
        crumb: 'Hoa lá',
        title: 'Thiệp Cưới Hoa — Mẫu Thiệp Cưới Online Hoa Lá Nhẹ Nhàng | Templexa',
        desc: 'Mẫu thiệp cưới online hoạ tiết hoa lá, màu nước, tông pastel nhẹ nhàng. Có đếm ngược, xác nhận tham dự, gửi lời chúc.',
        h1: '<span class="gradient-text">Thiệp Cưới Hoa</span><br>Màu Nước Nhẹ Nhàng, Tông Pastel',
        lead: '{n} mẫu <strong>thiệp cưới hoa</strong> vẽ theo lối màu nước, tông pastel — hợp tiệc cưới ngoài trời và tiệc vườn.',
        body: [
            { h2: 'Thiệp cưới hoa hợp với ai' },
            { p: 'Nhóm hoa lá có {n} mẫu, hoạ tiết vẽ tay theo lối màu nước: hoa hồng, mẫu đơn, lá ô liu, cỏ lau, dây leo viền quanh khung ảnh. Tông màu chủ đạo là pastel — hồng phấn, kem, xanh sage, trắng ngà.' },
            { p: 'Đây là nhóm được chọn nhiều nhất cho tiệc ngoài trời, tiệc vườn, tiệc bãi biển và những cặp đôi thích cảm giác mềm mại, nữ tính. Ảnh cưới chụp ban ngày, chụp đồng cỏ hay chụp ở resort đặt vào nhóm này rất hợp tông.' },
            { h2: 'Có gì bên trong mỗi mẫu' },
            { p: 'Thiệp mở ra bằng hiệu ứng phong bì, có nhạc nền, hiệu ứng cánh hoa rơi, đếm ngược ngày cưới, phần Love Story kể chuyện hai người, gallery ảnh cưới xem toàn màn hình, RSVP xác nhận tham dự, sổ lưu bút, Google Maps và mã QR mừng cưới.' },
            { p: 'Bạn đổi được màu hoa và nhạc nền cho khớp tông tiệc. Giá 150.000đ gói Basic, 199.000đ gói Premium, giao trong 24 giờ. Nếu muốn ít hoạ tiết hơn, xem thêm nhóm hiện đại.' },
        ],
        related: ['thiep-cuoi-hien-dai', 'thiep-cuoi-sang-trong', 'thiep-cuoi-truyen-thong', 'thiep-cuoi'],
    },
    {
        slug: 'thiep-cuoi-hien-dai',
        category: 'wedding',
        style: 'modern',
        legacyQuery: 'category=wedding&style=modern',
        navLabel: 'Thiệp cưới hiện đại',
        crumb: 'Hiện đại',
        title: 'Thiệp Cưới Hiện Đại — Mẫu Thiệp Cưới Online Tối Giản | Templexa',
        desc: 'Mẫu thiệp cưới online phong cách hiện đại, bố cục thoáng, hiệu ứng mượt. Gửi qua Zalo/Facebook, không cần in ấn.',
        h1: '<span class="gradient-text">Thiệp Cưới Hiện Đại</span><br>Bố Cục Tối Giản, Hiệu Ứng Mượt',
        lead: '{n} mẫu <strong>thiệp cưới hiện đại</strong> bố cục thoáng, ít hoạ tiết, lấy ảnh cưới làm trung tâm.',
        body: [
            { h2: 'Đặc điểm của nhóm thiệp cưới hiện đại' },
            { p: 'Nhóm hiện đại có {n} mẫu. Điểm chung là bố cục thoáng, nhiều khoảng trắng, hoạ tiết tối thiểu và chữ không chân. Ảnh cưới được để tràn viền làm trung tâm, nội dung chạy theo từng khối khi khách cuộn xuống.' },
            { p: 'Chuyển động là thứ dễ thấy nhất ở nhóm này: ảnh trôi theo chiều cuộn, chữ hiện dần, phần đếm ngược chạy mượt. Vì ít chi tiết trang trí nên thiệp tải nhanh, hợp với khách mở bằng 3G/4G.' },
            { h2: 'Nên chọn khi nào' },
            { p: 'Chọn nhóm này nếu bộ ảnh cưới của bạn đẹp và muốn ảnh nói thay hoạ tiết, hoặc khi tiệc theo phong cách tối giản, tông trắng - be - xám. Nhóm cũng hợp với các cặp đôi làm trong ngành sáng tạo, muốn thiệp trông giống một trang giới thiệu gọn gàng.' },
            { p: 'Vẫn đủ tính năng như các nhóm khác: nhạc nền, đếm ngược, Love Story, gallery, RSVP, gửi lời chúc, Google Maps và QR mừng cưới. Giá 150.000đ gói Basic, 199.000đ gói Premium, giao trong 24 giờ.' },
        ],
        related: ['thiep-cuoi-hoa', 'thiep-cuoi-sang-trong', 'thiep-cuoi-truyen-thong', 'thiep-cuoi'],
    },

    // ── Thiệp mời dịp khác ────────────────────────────────────────────────────
    {
        slug: 'thiep-moi-online',
        category: 'other',
        legacyQuery: 'category=other',
        navLabel: 'Thiệp mời online (dịp khác)',
        crumb: 'Thiệp mời dịp khác',
        title: 'Thiệp Mời Online — Sinh Nhật, Thôi Nôi, Kỷ Niệm, Họp Lớp | Templexa',
        desc: 'Mẫu thiệp mời online cho sinh nhật, thôi nôi, đầy tháng, kỷ niệm ngày cưới, họp lớp, giỗ tổ. Gửi link là xong, không cần in ấn.',
        h1: '<span class="gradient-text">Thiệp Mời Online</span><br>Sinh Nhật, Thôi Nôi, Kỷ Niệm, Họp Lớp',
        lead: '{n} mẫu <strong>thiệp mời online</strong> cho mọi dịp ngoài đám cưới — gửi một đường link là xong, không cần in ấn, không cần đi phát.',
        body: [
            { h2: 'Thiệp mời online dùng cho dịp nào' },
            { p: 'Trang này gom {n} mẫu thiệp mời điện tử cho các dịp ngoài đám cưới. Mỗi mẫu là một trang web nhỏ có link riêng: bạn gửi link vào nhóm Zalo, Messenger hoặc đăng Facebook, khách bấm vào là xem được trên điện thoại.' },
            { h2: 'Các nhóm đang có' },
            { ul: [
                'Sinh nhật — {n:thiep-sinh-nhat} mẫu, có nhạc, đếm ngược và xác nhận tham dự.',
                'Thôi nôi và đầy tháng cho bé — {n:thiep-thoi-noi-day-thang} mẫu, kèm album ảnh bé theo tháng.',
                'Kỷ niệm ngày cưới — {n:thiep-ky-niem-ngay-cuoi} mẫu, có dòng thời gian chặng đường chung.',
                'Họp lớp, gặp mặt — {n:thiep-moi-hop-lop} mẫu, có điểm danh ai đến ai vắng.',
                'Sự kiện tất niên, khai trương, liên hoan — {n:thiep-moi-su-kien} mẫu.',
                'Tỏ tình — {n:thiep-to-tinh} trang nhỏ gửi riêng cho một người.',
            ] },
            { p: 'Điểm chung của cả sáu nhóm: có ô xác nhận tham dự để bạn nắm số khách trước khi đặt bàn, có bản đồ Google Maps chỉ đường và có nhạc nền tắt bật được. Giá tính một lần cho toàn bộ khách mời, từ 150.000đ, giao trong 24 giờ.' },
        ],
        related: ['thiep-sinh-nhat', 'thiep-thoi-noi-day-thang', 'thiep-moi-hop-lop', 'thiep-ky-niem-ngay-cuoi'],
    },
    {
        slug: 'thiep-moi-su-kien',
        category: 'other',
        event: 'holiday',
        legacyQuery: 'category=other&event=holiday',
        navLabel: 'Thiệp mời sự kiện',
        crumb: 'Sự kiện, tất niên',
        title: 'Thiệp Mời Sự Kiện Online — Tất Niên, Khai Trương, Liên Hoan | Templexa',
        desc: 'Mẫu thiệp mời online cho sự kiện: tất niên, khai trương, liên hoan, gặp mặt. Gửi link là xong, khách xác nhận tham dự ngay trên thiệp.',
        h1: '<span class="gradient-text">Thiệp Mời Sự Kiện</span><br>Tất Niên, Khai Trương, Liên Hoan',
        lead: '{n} mẫu <strong>thiệp mời sự kiện</strong> cho tiệc tất niên, khai trương, liên hoan và gặp mặt cuối năm — có xác nhận tham dự để chốt số bàn.',
        body: [
            { h2: 'Thiệp mời sự kiện online dùng khi nào' },
            { p: 'Nhóm này có {n} mẫu, dùng cho tiệc tất niên công ty, lễ khai trương, liên hoan, tiệc tri ân khách hàng và các buổi gặp mặt cuối năm. Thay vì in thiệp rồi phát từng người, bạn gửi một đường link vào nhóm chat hoặc email nội bộ.' },
            { p: 'Cái được nhất khi mời qua link là biết trước số người đi. Khách bấm nút xác nhận ngay trên thiệp, danh sách chảy về bảng tính của bạn theo thời gian thực, nên chốt số bàn với nhà hàng chính xác hơn.' },
            { h2: 'Nội dung có sẵn trong mẫu' },
            { p: 'Mỗi thiệp có tên chương trình, đơn vị tổ chức, thời gian, địa điểm kèm bản đồ chỉ đường, phần lịch trình theo khung giờ, chỗ đặt logo và ảnh nền theo tông thương hiệu, nhạc nền và mã QR để in lên standee hay backdrop đón khách.' },
            { p: 'Sửa nội dung mất khoảng một buổi, giao trong 24 giờ, giá từ 150.000đ cho cả sự kiện. Nếu là tiệc riêng của gia đình thì xem thêm nhóm sinh nhật hoặc nhóm họp lớp.' },
        ],
        related: ['thiep-moi-hop-lop', 'thiep-sinh-nhat', 'thiep-moi-online', 'thiep-ky-niem-ngay-cuoi'],
    },
    {
        slug: 'thiep-to-tinh',
        category: 'other',
        event: 'confession',
        legacyQuery: 'category=other&event=confession',
        navLabel: 'Thiệp tỏ tình',
        crumb: 'Tỏ tình',
        title: 'Thiệp Tỏ Tình Online — Lời Tỏ Tình Dễ Thương Gửi Qua Link | Templexa',
        desc: 'Mẫu thiệp tỏ tình online dễ thương, có hiệu ứng và nhạc nền. Gửi link qua Zalo/Messenger, bất ngờ và riêng tư.',
        h1: '<span class="gradient-text">Thiệp Tỏ Tình Online</span><br>Gửi Riêng Qua Một Đường Link',
        lead: '{n} trang <strong>tỏ tình online</strong> có hiệu ứng và nhạc nền, gửi riêng qua Zalo hoặc Messenger — chỉ người nhận mở link mới xem được.',
        body: [
            { h2: 'Tỏ tình bằng một đường link' },
            { p: 'Nhóm này có {n} trang nhỏ dành cho lời tỏ tình, lời xin lỗi hoặc lời hẹn hò. Mỗi trang là một link riêng, không hiện trên trang nào khác của Templexa và không ai tìm ra được nếu bạn không gửi. Người nhận mở link trên điện thoại, nhạc chạy, chữ hiện dần theo từng câu.' },
            { p: 'Kiểu hay được chọn nhất là trang có nút "Có" và nút "Không" chạy trốn, trang mở hộp quà, trang đếm số ngày quen nhau và trang album ảnh hai người. Bạn viết lời nhắn bằng chữ của mình, chọn nhạc, chọn ảnh — phần còn lại đã dựng sẵn.' },
            { h2: 'Đặt thế nào' },
            { p: 'Nhắn Zalo kèm tên hai người, ngày quen nhau, ảnh và đoạn lời muốn viết. Trang làm xong trong 24 giờ, giá từ 150.000đ, link dùng mãi không hết hạn nên giữ làm kỷ niệm được.' },
            { p: 'Nếu định tỏ tình đúng dịp sinh nhật của người ấy, xem thêm nhóm thiệp sinh nhật; còn nếu hai bạn đã cưới, xem nhóm kỷ niệm ngày cưới.' },
        ],
        related: ['thiep-sinh-nhat', 'thiep-ky-niem-ngay-cuoi', 'thiep-moi-online', 'thiep-cuoi'],
    },
    {
        slug: 'thiep-sinh-nhat',
        category: 'other',
        event: 'birthday',
        legacyQuery: 'category=other&event=birthday',
        navLabel: 'Thiệp sinh nhật',
        crumb: 'Sinh nhật',
        title: 'Thiệp Sinh Nhật Online — Mẫu Thiệp Mời Sinh Nhật Đẹp | Templexa',
        desc: 'Mẫu thiệp mời sinh nhật online có nhạc, đếm ngược và xác nhận tham dự. Gửi qua Zalo/Facebook, không cần in.',
        h1: '<span class="gradient-text">Thiệp Sinh Nhật Online</span><br>Mẫu Thiệp Mời Sinh Nhật Đẹp',
        lead: '{n} mẫu <strong>thiệp mời sinh nhật</strong> có nhạc nền, đếm ngược và xác nhận tham dự — gửi vào nhóm chat là cả hội cùng nhận.',
        body: [
            { h2: 'Mời sinh nhật bằng thiệp online' },
            { p: 'Nhóm này có {n} mẫu thiệp mời sinh nhật, dùng cho tiệc tại nhà, tiệc nhà hàng, tiệc quán cà phê hay tiệc bất ngờ. Bạn gửi link vào nhóm Zalo hoặc story Facebook, ai cũng nhận cùng lúc, không phải nhắn từng người.' },
            { p: 'Trong thiệp có tên và tuổi của nhân vật chính, giờ và địa điểm kèm bản đồ, đếm ngược tới giờ thổi nến, album ảnh, nhạc nền và ô xác nhận tham dự. Có thêm mục dặn dò nhỏ để ghi dress code, chủ đề tiệc hay lưu ý về quà.' },
            { h2: 'Chọn theo độ tuổi' },
            { p: 'Tiệc của trẻ nhỏ hợp mẫu nhiều màu, có bóng bay và hình vẽ dễ thương. Tiệc tuổi teen và người lớn hợp mẫu tông tối, ánh neon hoặc tối giản một màu. Sinh nhật tuổi tròn như 18, 30, 50 thường chọn mẫu có dòng thời gian điểm lại các cột mốc.' },
            { p: 'Giá từ 150.000đ cho toàn bộ khách mời, giao trong 24 giờ. Tiệc của bé dưới một tuổi thì xem nhóm thôi nôi và đầy tháng.' },
        ],
        related: ['thiep-thoi-noi-day-thang', 'thiep-moi-su-kien', 'thiep-to-tinh', 'thiep-moi-online'],
    },
    {
        slug: 'thiep-ky-niem-ngay-cuoi',
        category: 'other',
        event: 'anniversary',
        legacyQuery: 'category=other&event=anniversary',
        navLabel: 'Thiệp kỷ niệm ngày cưới',
        crumb: 'Kỷ niệm ngày cưới',
        title: 'Thiệp Kỷ Niệm Ngày Cưới Online — Mẫu Thiệp Mời Đẹp | Templexa',
        desc: 'Mẫu thiệp mời online cho lễ kỷ niệm ngày cưới, đám cưới bạc, đám cưới vàng. Có timeline chuyện tình và album ảnh.',
        h1: '<span class="gradient-text">Thiệp Kỷ Niệm Ngày Cưới</span><br>Đám Cưới Bạc, Đám Cưới Vàng',
        lead: '{n} mẫu <strong>thiệp kỷ niệm ngày cưới</strong> cho đám cưới bạc, đám cưới vàng — có dòng thời gian chặng đường chung và album ảnh gia đình.',
        body: [
            { h2: 'Thiệp cho lễ kỷ niệm ngày cưới' },
            { p: 'Nhóm này có {n} mẫu, dùng cho lễ kỷ niệm một năm, mười năm, đám cưới bạc hai mươi lăm năm và đám cưới vàng năm mươi năm. Thiệp thường do con cháu làm để mời họ hàng tới mừng ông bà, cha mẹ.' },
            { p: 'Phần đắt giá nhất là dòng thời gian: mỗi mốc một tấm ảnh và một dòng chú thích, kéo từ ngày cưới tới hôm nay. Kèm theo là album ảnh gia đình qua các năm, lời cảm ơn, thông tin buổi tiệc và bản đồ chỉ đường.' },
            { h2: 'Cần chuẩn bị gì' },
            { p: 'Bạn gửi ảnh cưới cũ (chụp lại bằng điện thoại cũng được), vài tấm ảnh gia đình theo mốc năm, ngày cưới gốc và thông tin buổi tiệc. Ảnh cũ sẽ được chỉnh lại độ sáng và cắt cho vừa khung.' },
            { p: 'Giá từ 150.000đ, giao trong 24 giờ, link giữ vĩnh viễn để cả nhà xem lại vào các dịp sau. Nếu đang chuẩn bị đám cưới lần đầu, xem bộ mẫu thiệp cưới; nếu tổ chức tiệc gặp mặt đông người, xem nhóm họp lớp.' },
        ],
        related: ['thiep-cuoi', 'thiep-moi-hop-lop', 'thiep-sinh-nhat', 'thiep-moi-online'],
    },
    {
        slug: 'thiep-moi-hop-lop',
        category: 'other',
        event: 'reunion',
        legacyQuery: 'category=other&event=reunion',
        navLabel: 'Thiệp mời họp lớp',
        crumb: 'Họp lớp',
        title: 'Thiệp Mời Họp Lớp Online — Mẫu Thiệp Họp Lớp, Gặp Mặt | Templexa',
        desc: 'Mẫu thiệp mời họp lớp online, có xác nhận tham dự và điểm danh. Gửi vào nhóm Zalo/Facebook là cả lớp nhận được.',
        h1: '<span class="gradient-text">Thiệp Mời Họp Lớp</span><br>Gặp Mặt Bạn Cũ Sau Nhiều Năm',
        lead: '{n} mẫu <strong>thiệp mời họp lớp</strong> có xác nhận tham dự và điểm danh — ban tổ chức biết ngay ai đến, ai vắng.',
        body: [
            { h2: 'Vì sao ban tổ chức nên dùng thiệp online' },
            { p: 'Nhóm này có {n} mẫu cho buổi họp lớp, họp khoá, gặp mặt đồng hương và tiệc kỷ niệm ra trường. Khó nhất của mọi buổi họp lớp là chốt số người đi. Gửi tin nhắn vào nhóm thì trôi mất, hỏi từng người thì lâu.' },
            { p: 'Thiệp online giải quyết đúng chỗ đó: mỗi người bấm một nút xác nhận, tên chạy thẳng vào bảng danh sách của ban tổ chức, kèm số người đi cùng và ghi chú riêng. Bạn mở bảng ra là biết còn thiếu ai để nhắc.' },
            { h2: 'Nội dung thường có' },
            { p: 'Tên lớp và khoá học, ảnh kỷ yếu cũ, đếm ngược tới ngày gặp, chương trình theo khung giờ, địa điểm kèm bản đồ, mức đóng quỹ và số tài khoản kèm mã QR chuyển khoản, cùng mục lưu bút để mọi người viết vài dòng trước khi gặp.' },
            { p: 'Giá từ 150.000đ cho cả lớp, giao trong 24 giờ. Nếu là tiệc của công ty thay vì của lớp, xem nhóm thiệp mời sự kiện.' },
        ],
        related: ['thiep-moi-su-kien', 'thiep-ky-niem-ngay-cuoi', 'thiep-moi-online', 'thiep-sinh-nhat'],
    },
    {
        slug: 'thiep-thoi-noi-day-thang',
        category: 'other',
        event: 'thoi-noi',
        legacyQuery: 'category=other&event=thoi-noi',
        navLabel: 'Thiệp thôi nôi, đầy tháng',
        crumb: 'Thôi nôi, đầy tháng',
        title: 'Thiệp Thôi Nôi, Đầy Tháng Online — Mẫu Thiệp Mời Bé | Templexa',
        desc: 'Mẫu thiệp mời thôi nôi, đầy tháng cho bé: hình minh hoạ dễ thương, album ảnh, xác nhận tham dự. Gửi qua Zalo.',
        h1: '<span class="gradient-text">Thiệp Thôi Nôi, Đầy Tháng</span><br>Mẫu Thiệp Mời Cho Bé',
        lead: '{n} mẫu <strong>thiệp thôi nôi</strong> và đầy tháng cho bé — hình minh hoạ dễ thương, album ảnh và xác nhận tham dự.',
        body: [
            { h2: 'Thiệp mời thôi nôi, đầy tháng cho bé' },
            { p: 'Nhóm này có {n} mẫu dùng cho lễ đầy tháng, lễ thôi nôi tròn một tuổi và tiệc mừng bé. Hình vẽ theo hướng dễ thương: mây, sao, thú bông, bánh kem, tông pastel hồng hoặc xanh nhạt tuỳ bé trai hay bé gái.' },
            { p: 'Thiệp mở đầu bằng ảnh bé và tên đầy đủ, ngày sinh, rồi tới dòng thời gian bé lớn theo từng tháng — mỗi tháng một tấm ảnh. Sau đó là thông tin buổi tiệc, bản đồ chỉ đường, đếm ngược tới giờ khai tiệc và ô xác nhận tham dự.' },
            { h2: 'Vì sao ông bà, họ hàng xem được dễ' },
            { p: 'Chữ để cỡ lớn, nút bấm to, ảnh tải nhẹ nên mở bằng mạng yếu vẫn nhanh. Không cần cài ứng dụng, không cần đăng nhập, bấm vào link trong Zalo là xem ngay.' },
            { p: 'Bạn gửi ảnh bé theo tháng cùng thông tin tiệc, thiệp làm xong trong 24 giờ, giá từ 150.000đ. Sinh nhật các năm sau của bé thì chọn tiếp trong nhóm thiệp sinh nhật.' },
        ],
        related: ['thiep-sinh-nhat', 'thiep-moi-online', 'thiep-ky-niem-ngay-cuoi', 'thiep-cuoi'],
    },
];

const bySlug = (slug) => LANDINGS.find((l) => l.slug === slug);

/** Tìm landing khớp bộ lọc đang bật (dùng cho canonical trên hub) */
const byFilter = (category, style, event) => LANDINGS.find((l) =>
    l.category === category && (l.style || null) === (style || null) && (l.event || null) === (event || null));

/** URL tuyệt đối cho SEO — clean URL, không .html (CLAUDE.md § Clean URL) */
const url = (l) => 'https://templexa.vn/' + (typeof l === 'string' ? l : l.slug);

/** Link nội bộ — giữ .html để chạy được trên server local (CLAUDE.md § Clean URL) */
const href = (l) => (typeof l === 'string' ? l : l.slug) + '.html';

module.exports = { LANDINGS, bySlug, byFilter, url, href };
