// ============================================
// API CONFIG
// ============================================
const API_CONFIG = {
    // Google Apps Script Web App URL — gửi form liên hệ / nhận mẫu
    // Thay bằng URL thực khi deploy
    GOOGLE_SHEET_API: 'https://script.google.com/macros/s/AKfycbziA5xXvh5i2VPPYbA49enU-Ct00PFw02ucn1ngiocW82yWAFwH0pNDM6oHjJu4-ENz/exec',
    //{
    //  "email": "test@gmail.com",
    //  "phone": "0912345678",
    //  "reference": "Facebook Ads",
    //  "service": "premium",
    //  "note": "Cần tư vấn ngay",
    //  "status": "submit",
    //  "name": "name"
    //}
};


// ============================================
// PRODUCTS DATA
// ============================================
const PRODUCTS = [
    // ── ONEPAGE ──────────────────────────────────
    {
        id: 1,
        name: 'Modern Split-Screen Pilates Home',
        slug: 'modern-split-screen-pilates-home',
        description: 'Landing page thiết kế chuyên nghiệp — Modern Split-Screen Pilates Home. Thiết kế hiện đại, chuyên nghiệp, sẵn sàng sử dụng.',
        category: 'onepage',
        type: 'website',
        tags: ['landing', 'page', 'onepage', 'modern', 'pilates', 'split-screen'],
        price: 'free',
        images: [
            './products/Web/Onepage/Done_13_web_desktop_onepage_landing page_modern split-screen pilates home/Done_13_web_desktop_onepage_landing page_modern split-screen pilates home.png',
            './products/Web/Onepage/Done_13_web_desktop_onepage_landing page_modern split-screen pilates home/Done_13_web_desktop_onepage_landing page_modern split-screen pilates home (2).png',
            './products/Web/Onepage/Done_13_web_desktop_onepage_landing page_modern split-screen pilates home/Done_13_web_desktop_onepage_landing page_modern split-screen pilates home (3).png',
            './products/Web/Onepage/Done_13_web_desktop_onepage_landing page_modern split-screen pilates home/Done_13_web_desktop_onepage_landing page_modern split-screen pilates home (4).png',
            './products/Web/Onepage/Done_13_web_desktop_onepage_landing page_modern split-screen pilates home/Done_13_web_desktop_onepage_landing page_modern split-screen pilates home (5).png',
            './products/Web/Onepage/Done_13_web_desktop_onepage_landing page_modern split-screen pilates home/Done_13_web_desktop_onepage_landing page_modern split-screen pilates home (6).png',
        ],
        thumbnail: './products/Web/Onepage/Done_13_web_desktop_onepage_landing page_modern split-screen pilates home/thumbnail.jpg',
        path: './products/Web/Onepage/Done_13_web_desktop_onepage_landing page_modern split-screen pilates home/',
        demoUrl: './products/Web/Onepage/Done_13_web_desktop_onepage_landing page_modern split-screen pilates home/code.html',
        features: [
            'Thiết kế one-page chuyên nghiệp',
            'Bố cục rõ ràng, CTA nổi bật',
            'Responsive hoàn hảo desktop và mobile',
        ],
        status: 'new',
        priority: 1,
        downloads: 9,
        rating: 4.8,
        showInSlider: false,
        updatedAt: '2026-03-05',
    },
    // ── E-COMMERCE ──────────────────────────────────
    {
        id: 2,
        name: 'Editorial Makeup Portfolio',
        slug: 'editorial-makeup-portfolio',
        description: 'Mẫu website e-commerce — Editorial Makeup Portfolio. Thiết kế hiện đại, chuyên nghiệp, sẵn sàng sử dụng.',
        category: 'e-commerce',
        type: 'website',
        tags: ['e-commerce', 'makeup', 'editorial', 'portfolio', 'beauty'],
        price: 'free',
        images: [
            './products/Web/E-commerce/Done_8_web_desktop_ecommerce_makeup_editorial makeup portfolio/Done_8_web_desktop_ecommerce_makeup_editorial makeup portfolio.png',
            './products/Web/E-commerce/Done_8_web_desktop_ecommerce_makeup_editorial makeup portfolio/Done_8_web_desktop_ecommerce_makeup_editorial makeup portfolio (2).png',
            './products/Web/E-commerce/Done_8_web_desktop_ecommerce_makeup_editorial makeup portfolio/Done_8_web_desktop_ecommerce_makeup_editorial makeup portfolio (3).png',
            './products/Web/E-commerce/Done_8_web_desktop_ecommerce_makeup_editorial makeup portfolio/Done_8_web_desktop_ecommerce_makeup_editorial makeup portfolio (4).png',
            './products/Web/E-commerce/Done_8_web_desktop_ecommerce_makeup_editorial makeup portfolio/Done_8_web_desktop_ecommerce_makeup_editorial makeup portfolio (5).png',
            './products/Web/E-commerce/Done_8_web_desktop_ecommerce_makeup_editorial makeup portfolio/Done_8_web_desktop_ecommerce_makeup_editorial makeup portfolio (6).png',
        ],
        thumbnail: './products/Web/E-commerce/Done_8_web_desktop_ecommerce_makeup_editorial makeup portfolio/thumbnail.jpg',
        path: './products/Web/E-commerce/Done_8_web_desktop_ecommerce_makeup_editorial makeup portfolio/',
        demoUrl: './products/Web/E-commerce/Done_8_web_desktop_ecommerce_makeup_editorial makeup portfolio/code.html',
        features: [
            'Thiết kế e-commerce chuyên nghiệp',
            'Giao diện sản phẩm trực quan',
            'Responsive hoàn hảo desktop và mobile',
        ],
        status: 'new',
        priority: 2,
        downloads: 7,
        rating: 4.9,
        showInSlider: false,
        updatedAt: '2026-03-05',
    },
    // ── EDUCATION ──────────────────────────────────
    {
        id: 3,
        name: 'Học Viện Nhiếp Ảnh Visionary',
        slug: 'hoc-vien-nhiep-anh-visionary',
        description: 'Mẫu website giáo dục — Học Viện Nhiếp Ảnh Visionary. Thiết kế hiện đại, chuyên nghiệp, sẵn sàng sử dụng.',
        category: 'education',
        type: 'website',
        tags: ['education', 'course', 'nhiep-anh', 'visionary', 'hoc-vien'],
        price: 'free',
        images: [
            './products/Web/Education/Done_1_web_desktop_ecommerce_course_hoc vien nhiep anh visionary/1_web_desktop_ecommerce_course_hoc vien nhiep anh visionary.png',
            './products/Web/Education/Done_1_web_desktop_ecommerce_course_hoc vien nhiep anh visionary/1_web_desktop_ecommerce_course_hoc vien nhiep anh visionary (2).png',
            './products/Web/Education/Done_1_web_desktop_ecommerce_course_hoc vien nhiep anh visionary/1_web_desktop_ecommerce_course_hoc vien nhiep anh visionary (3).png',
            './products/Web/Education/Done_1_web_desktop_ecommerce_course_hoc vien nhiep anh visionary/1_web_desktop_ecommerce_course_hoc vien nhiep anh visionary (4).png',
            './products/Web/Education/Done_1_web_desktop_ecommerce_course_hoc vien nhiep anh visionary/1_web_desktop_ecommerce_course_hoc vien nhiep anh visionary (5).png',
            './products/Web/Education/Done_1_web_desktop_ecommerce_course_hoc vien nhiep anh visionary/1_web_desktop_ecommerce_course_hoc vien nhiep anh visionary (6).png',
        ],
        thumbnail: './products/Web/Education/Done_1_web_desktop_ecommerce_course_hoc vien nhiep anh visionary/thumbnail.jpg',
        path: './products/Web/Education/Done_1_web_desktop_ecommerce_course_hoc vien nhiep anh visionary/',
        demoUrl: './products/Web/Education/Done_1_web_desktop_ecommerce_course_hoc vien nhiep anh visionary/code.html',
        features: [
            'Thiết kế website khóa học chuyên nghiệp',
            'Bố cục khóa học rõ ràng, dễ đăng ký',
            'Responsive hoàn hảo desktop và mobile',
        ],
        status: 'new',
        priority: 3,
        downloads: 5,
        rating: 4.8,
        showInSlider: false,
        updatedAt: '2026-03-05',
    },
];

// ============================================
// CATEGORIES — dùng cho bộ lọc
// ============================================
const CATEGORIES = [
    { id: 'all', label: 'Tất cả' },
    { id: 'onepage', label: 'One page' },
    { id: 'e-commerce', label: 'E-commerce' },
    { id: 'invitation', label: 'Thiệp mời' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'education', label: 'Giáo dục' },
];

// TYPES — phân loại sản phẩm
// website:      folder chứa project web thuần (HTML/CSS/JS) + ảnh, demoUrl trỏ đến file .html trong folder
// google-sheet: folder chỉ chứa ảnh sản phẩm, demoUrl là link Google Sheet (điền tay)
const TYPES = [
    { id: 'all', label: 'Tất cả mẫu' },
    { id: 'website', label: 'Website' },
    { id: 'google-sheet', label: 'Google Sheet' },
];

// ============================================
// PRICING — dùng cho trang dịch vụ
// ============================================
const PRICING = [
    {
        id: 'basic',
        name: 'BASIC',
        price: '699.000đ',
        originalPrice: '1.500.000đ',
        showOriginalPrice: true,
        discount: '-55%',
        description: 'Gói tiêu chuẩn, phù hợp cho cá nhân',
        features: [
            'Tuỳ chọn mẫu template',
            'Cá nhân hoá màu sắc thương hiệu',
            'Tối ưu Responsive cả web, mobile',
            'Đầy đủ tính năng cơ bản',
            'Hỗ trợ bảo hành 2 tháng',
        ],
        highlighted: false,
    },
    {
        id: 'pro',
        name: 'PRO',
        price: '2.999.000đ',
        originalPrice: '5.000.000đ',
        showOriginalPrice: true,
        discount: '-40%',
        description: 'Giải pháp tối ưu cho cá nhân và doanh nghiệp nhỏ',
        features: [
            'Thiết kế UI/UX độc bản',
            'Cá nhân hoá màu sắc thương hiệu',
            'Tối ưu responsive đa thiết bị',
            'Tối ưu tốc độ & SEO',
            'Hỗ trợ thiết kế logo',
            'Website 5-10 trang',
            'Hỗ trợ bảo hành 6 tháng',
        ],
        highlighted: true,
    },
    {
        id: 'premium',
        name: 'PREMIUM',
        price: '8.000.000đ',
        originalPrice: '',
        showOriginalPrice: false,
        discount: '',
        description: 'Nâng tầm trải nghiệm khách hàng',
        features: [
            'Thiết kế UI/UX độc bản',
            'Cá nhân hoá màu sắc thương hiệu',
            'Tối ưu responsive đa thiết bị',
            'Tối ưu tốc độ & SEO',
            'Hỗ trợ thiết kế logo',
            'Tính năng theo yêu cầu',
            'Đa ngôn ngữ (En/Vi)',
            'Hỗ trợ bảo hành 9 tháng',
        ],
        highlighted: false,
    },
    {
        id: 'custom',
        name: 'CUSTOM',
        price: 'Liên hệ',
        originalPrice: '',
        showOriginalPrice: false,
        discount: '',
        description: 'Giải pháp tuỳ biến không giới hạn',
        features: [
            'Thiết kế UI/UX độc bản',
            'Cá nhân hoá màu sắc thương hiệu',
            'Tối ưu responsive đa thiết bị',
            'Tối ưu tốc độ & SEO',
            'Hỗ trợ thiết kế logo',
            'Tính năng theo yêu cầu',
            'Ngôn ngữ theo yêu cầu',
            'Hỗ trợ bảo hành theo yêu cầu',
        ],
        highlighted: false,
    },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Lấy danh sách sản phẩm hiển thị trên slider trang chủ
 */
function getSliderProducts() {
    return PRODUCTS.filter(p => p.showInSlider);
}

/**
 * Lấy product theo id
 */
function getProductById(id) {
    return PRODUCTS.find(p => p.id === Number(id));
}

/**
 * Lấy product theo slug
 */
function getProductBySlug(slug) {
    return PRODUCTS.find(p => p.slug === slug);
}

/**
 * Lấy danh sách products đã sort theo priority
 */
function getProductsSorted() {
    return [...PRODUCTS].sort((a, b) => a.priority - b.priority);
}

/**
 * Lọc products theo category, type, và search keyword
 */
function filterProducts({ category = 'all', type = 'all', search = '' } = {}) {
    return getProductsSorted().filter(p => {
        const matchCategory = category === 'all' || p.category === category;
        const matchType = type === 'all' || p.type === type;
        const matchSearch = !search ||
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase()) ||
            p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
        return matchCategory && matchType && matchSearch;
    });
}

/**
 * Phân trang
 */
function paginateProducts(products, page = 1, perPage = 9) {
    const total = products.length;
    const totalPages = Math.ceil(total / perPage);
    const start = (page - 1) * perPage;
    const items = products.slice(start, start + perPage);
    return { items, total, totalPages, currentPage: page };
}

/**
 * Lấy related products (cùng category, loại trừ product hiện tại)
 */
function getRelatedProducts(productId, limit = 4) {
    const product = getProductById(productId);
    if (!product) return [];
    return PRODUCTS
        .filter(p => p.id !== product.id && p.category === product.category)
        .sort((a, b) => a.priority - b.priority)
        .slice(0, limit);
}

/**
 * Submit form đến Google Sheets API
 */
async function submitToGoogleSheet(formData) {
    if (!API_CONFIG.GOOGLE_SHEET_API) {
        console.warn('Google Sheet API URL chưa được cấu hình.');
        return { success: false, message: 'API chưa được cấu hình.' };
    }

    try {
        const response = await fetch(API_CONFIG.GOOGLE_SHEET_API, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        return { success: true, message: 'Gửi thành công!' };
    } catch (error) {
        console.error('Submit error:', error);
        return { success: false, message: 'Có lỗi xảy ra, vui lòng thử lại.' };
    }
}
