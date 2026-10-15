/*
 * ============================================
 * EVENT — Mapping slug → product path + OG meta
 * ============================================
 * URL khách nhận: templexa.vn/event/{slug}/index.html?id=1
 * → iframe load:  ../../products/Invitation/Other/{folder}/index.html?id=1
 *
 * Hai dạng entry:
 *
 * 1. MỘT THIỆP — dùng `src`, mọi query của khách được chuyển thẳng vào iframe.
 *
 * 2. NHIỀU BIẾN THỂ — dùng `base` + `variants`, `?id=` chọn biến thể.
 *    Dùng khi một sự kiện có nhiều bản thiết kế và/hoặc nhiều nội dung
 *    (ví dụ mỗi chi họ một dòng riêng). Quy ước id 2 chữ số:
 *      chữ số 1 = nội dung, chữ số 2 = bản thiết kế.
 *    Query của khách (trừ `id`) vẫn được giữ và nối thêm vào query của biến thể.
 */
var EVENT = {
    'ban-an-ban-pha': {
        src: '../../products/Invitation/Other/gen_237_lien-hoan-bang-tin/index.html',
        title: 'Bàn Ăn Bàn Phá — Liên Hoan Gặp Mặt',
        description: 'Hành trình 2001 – 2026. Bàn Ăn Bàn Phá — Hẹn gặp nhau nha!',
        image: '../../products/Invitation/Other/gen_237_lien-hoan-bang-tin/photos/1.webp',
    },

    'gio-to-ho-do': {
        base: '../../products/Invitation/Other/gen_247_gio-to-ho-do/',
        // Không truyền ?id= thì mở bản này
        defaultId: '11',
        variants: {
            // Nội dung 1 — chung toàn tộc
            '11': { dir: 'v1-thiep-cuon',    query: '' },
            '12': { dir: 'v2-hoanh-phi',     query: '' },
            '13': { dir: 'v3-kim-toi-gian',  query: '' },
            // Nội dung 2 — thêm dòng "Chi 1 phường Chũ - tỉnh Bắc Ninh"
            '21': { dir: 'v1-thiep-cuon',    query: 'chi=bac-ninh' },
            '22': { dir: 'v2-hoanh-phi',     query: 'chi=bac-ninh' },
            '23': { dir: 'v3-kim-toi-gian',  query: 'chi=bac-ninh' },
        },
        title: 'Thông Bạch — Đại Lễ Giỗ Tổ Họ Đỗ',
        description: 'Trân trọng kính mời toàn thể anh em, con cháu, nội ngoại tộc họ Đỗ về dự đại lễ giỗ tổ — 18.08.2026 (mùng 6 tháng 7 Bính Ngọ) tại Từ đường họ Đỗ, Ý Yên, Ninh Bình.',
        image: '../../products/Invitation/Other/gen_247_gio-to-ho-do/og-cover.jpg',
    },

    'thanh-cong-25-nam': {
        src: '../../products/Invitation/Other/gen_288_ky-niem-25-nam-thanh-cong/index.html',
        title: 'Thành Công 25 Năm — Thư Mời Giải Golf & Gala Dinner',
        description: 'Trân trọng kính mời Quý Khách tham dự Giao lưu Golf, Lễ kỷ niệm 25 năm thành lập Thành Công và Hội nghị khách hàng 2026.',
        image: '../../products/Invitation/Other/gen_288_ky-niem-25-nam-thanh-cong/og-cover.jpg',
    },

    'nguyen-thong-trong-toi': {
        src: '../../products/Invitation/Other/nguyen-thong-trong-toi/index.html',
        title: 'Nguyễn Thông trong tôi — 40 Năm Ngày Hội Ngộ',
        description: 'Cựu học sinh THPT Nguyễn Thông niên khoá 1983 – 1986 · Chủ nhật 18/10/2026 · CLB HVN Thanh Thúy, Long An. Hẹn gặp lại nhau nhé!',
        image: '../../products/Invitation/Other/nguyen-thong-trong-toi/og-cover.jpg',
    },

    // Bản không có bìa sổ — vào thẳng nội dung thiệp
    'nguyen-thong-trong-toi-1986-2026': {
        src: '../../products/Invitation/Other/nguyen-thong-trong-toi/index-2026.html',
        title: 'Nguyễn Thông trong tôi — 40 Năm Ngày Hội Ngộ',
        description: 'Cựu học sinh THPT Nguyễn Thông niên khoá 1983 – 1986 · Chủ nhật 18/10/2026 · CLB HVN Thanh Thúy, Long An. Hẹn gặp lại nhau nhé!',
        image: '../../products/Invitation/Other/nguyen-thong-trong-toi/og-cover.jpg',
    },

    // Khách 37 — Lê Thuận Hưng, UEL · bản trang trọng (phụ huynh) + bản cinematic (bạn bè). Thêm ?ten=Tên+Khách để hiện tên.
    'thuan-hung-tot-nghiep': {
        src: '../../products/Invitation/Other/khach_37_tot-nghiep-trang-trong/index.html',
        title: 'Thư Mời Dự Lễ Tốt Nghiệp — Lê Thuận Hưng · UEL 2026',
        description: 'Trân trọng kính mời Quý vị và gia đình đến dự Lễ tốt nghiệp của Lê Thuận Hưng — Cử nhân Luật Kinh doanh, Trường Đại học Kinh tế – Luật. Thứ Bảy 24/10/2026, 11:00 – 13:00, điểm hẹn trước Tòa A3.',
        image: '../../products/Invitation/Other/khach_37_tot-nghiep-trang-trong/og-cover.jpg?v=2',
    },
    'thuan-hung-grad-2026': {
        src: '../../products/Invitation/Other/khach_37_tot-nghiep-cinematic/index.html',
        title: 'Lê Thuận Hưng — Graduation 2026 · UEL',
        description: '4 năm, 1 tấm bằng, và một ngày đáng nhớ. Ghé chung vui với mình nha — 24.10.2026, 11:00, UEL, đợi bạn trước Tòa A3. See you there!',
        image: '../../products/Invitation/Other/khach_37_tot-nghiep-cinematic/og-cover.jpg?v=4',
    },
};
