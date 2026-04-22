/*
 * ============================================
 * WEDDING — Mapping slug → product path + OG meta
 * ============================================
 * Thêm khách mới: thêm 1 entry vào object bên dưới.
 *
 * URL khách nhận: templexa.vn/wedding/{slug}/index.html?id=1
 * → iframe load:  ../../products/Invitation/Wedding/{folder}/index.html?id=1
 *
 * Path dùng relative (../../) từ wedding/{slug}/ → gốc project.
 * Hoạt động cả localhost và production.
 *
 * OG meta (og:title, og:image, og:description) phải hardcode
 * trong mỗi index.html vì Facebook/Zalo crawler không chạy JS.
 */
var WEDDING = {
    'trong-nghia-thu-thuy': {
        src: '../../products/Invitation/Wedding/khach_1_v1/index.html',
        title: 'Trọng Nghĩa & Thu Thuỷ — Wedding Invitation',
        description: 'Trân trọng kính mời bạn tới dự bữa cơm thân mật chung vui cùng gia đình chúng tôi',
        image: '../../products/Invitation/Wedding/khach_1_v1/customer/a2.webp',
    },
    'duc-quan-thanh-tuyen': {
        src: '../../products/Invitation/Wedding/khach_3/index.html',
        title: 'Đức Quân & Thanh Tuyền — Wedding Invitation',
        description: 'Trân trọng kính mời bạn đến hiệp dâng Thánh Lễ Hôn Phối và chung vui Tiệc Cưới cùng gia đình chúng tôi',
        image: '../../products/Invitation/Wedding/khach_3/customer/og-cover.jpg',
    },
    // 'tran-van-b': {
    //     src: '../../products/Invitation/Wedding/khach_2/code.html',
    //     title: 'Văn B & Cô Dâu — Wedding Invitation',
    //     description: 'Trân trọng kính mời...',
    //     image: '../../products/Invitation/Wedding/khach_2/customer/bia.webp',
    // },
};
