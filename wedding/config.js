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
    'kim-vuong-quynh-thuong': {
        src: '../../products/Invitation/Wedding/khach_quynhthuong_kimvuong/code.html',
        title: 'Kim Vương & Quỳnh Thương — Wedding Invitation',
        description: 'Trân trọng kính mời bạn đến dự lễ thành hôn của chúng tôi — 24/05/2026 tại Nghệ An',
        image: '../../products/Invitation/Wedding/khach_quynhthuong_kimvuong/og-cover.jpg',
    },
    'thinh-quynh': {
        src: '../../products/Invitation/Wedding/gen_225_heritage-illustrated-venue/index.html',
        title: 'Thịnh & Quỳnh — Wedding Invitation',
        description: 'Trân trọng kính mời bạn đến chung vui ngày lễ thành hôn của chúng tôi — 20/06/2026 tại Đắk Lắk',
        image: '../../products/Invitation/Wedding/gen_225_heritage-illustrated-venue/og-cover.jpg',
    },
    'xuan-thinh-ngoc-quynh': {
        src: '../../products/Invitation/Wedding/gen_236_majestic-olive-classic/code.html',
        title: 'Xuân Thịnh & Ngọc Quỳnh — Wedding Invitation',
        description: 'Trân trọng kính mời bạn đến chung vui ngày lễ thành hôn của chúng tôi — 20/06/2026 tại Đắk Lắk',
        image: '../../products/Invitation/Wedding/gen_236_majestic-olive-classic/og-cover.jpg',
    },
    'dang-minh-thuy-linh': {
        src: '../../products/Invitation/Wedding/khach_minh-linh/index.html',
        title: 'Đăng Minh & Thuỳ Linh — Wedding Invitation',
        description: 'Trân trọng kính mời bạn tới dự bữa cơm thân mật mừng hạnh phúc của hai chúng tôi — 13.06.2026 tại Trung Tâm Forevermark, Hà Nội',
        image: '../../products/Invitation/Wedding/khach_minh-linh/customer/anh_doi_1.webp',
    },
    'chu-thuong-ngoc-huyen': {
        src: '../../products/Invitation/Wedding/khach_thuong-huyen/code.html',
        title: 'Chu Thường & Ngọc Huyền — Wedding Invitation',
        description: 'Trân trọng kính mời bạn tới dự lễ cưới của Chu Thường & Ngọc Huyền — 20.06.2026 tại Thanh Oai, Hà Nội',
        image: '../../products/Invitation/Wedding/khach_thuong-huyen/og-cover.jpg',
    },
    'nguyen-bao-uyen-nhi': {
        src: '../../products/Invitation/Wedding/khach_nguyen-bao-uyen-nhi/index.html',
        title: 'Nguyên Bảo & Uyên Nhi — Thiệp Mời (Nhà Trai)',
        description: 'Trân trọng kính mời bạn tới dự lễ cưới của Nguyên Bảo & Uyên Nhi — 03.07.2026 tại Hà Nội',
        image: '../../products/Invitation/Wedding/khach_nguyen-bao-uyen-nhi/customer/anh_doi_1.webp',
    },
    'uyen-nhi-nguyen-bao': {
        src: '../../products/Invitation/Wedding/khach_uyen-nhi-nguyen-bao/index.html',
        title: 'Nguyên Bảo & Uyên Nhi — Thiệp Mời',
        description: 'Trân trọng kính mời bạn tới dự lễ cưới của Nguyên Bảo & Uyên Nhi — 03.07.2026 tại Hà Nội',
        image: '../../products/Invitation/Wedding/khach_uyen-nhi-nguyen-bao/customer/anh_doi_1.webp',
    },
    'thien-duc-thuy-dung': {
        src: '../../products/Invitation/Wedding/khach_thuy-dung_thien-duc/index.html',
        title: 'Thiện Đức & Thùy Dung — Wedding Invitation',
        description: 'Trân trọng kính mời bạn đến dự lễ cưới của Thiện Đức & Thùy Dung — 10.07.2026 tại Rạch Giá, An Giang',
        image: '../../products/Invitation/Wedding/khach_thuy-dung_thien-duc/og-cover.jpg',
    },
    'duc-anh-ngoc-trang': {
        src: '../../products/Invitation/Wedding/gen_216_dam-ngo-song-hy/index.html',
        title: 'Đức Anh & Ngọc Trang — Lễ Dạm Ngõ',
        description: 'Trân trọng kính mời bạn đến dự Lễ Dạm Ngõ của Đức Anh & Ngọc Trang — 08.07.2026 tại Nhà hàng Hưng Vân, Nghĩa Lộ, Lào Cai',
        image: '../../products/Invitation/Wedding/gen_216_dam-ngo-song-hy/og-cover.jpg',
    },
};
