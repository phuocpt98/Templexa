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
};
