// ============================================
// API CONFIG
// ============================================
const API_CONFIG = {
    // Google Apps Script Web App URL — gửi form liên hệ / nhận mẫu
    // Thay bằng URL thực khi deploy
    GOOGLE_SHEET_API: 'https://script.google.com/macros/s/AKfycbx1vvMWNROXfOy2dDlt23Rwzz1hhE1-5-QjjnUdKAN7PqjRodF9FpYupH2IiRyBzKTY/exec',
//{
//  "email": "test@gmail.com",
//  "phone": "0912345678",
//  "reference": "Facebook Ads",
//  "service": "premium",
//  "note": "Cần tư vấn ngay",
//  "status": "nhận submit"
//}

};


// ============================================
// PRODUCTS DATA
// ============================================
const PRODUCTS = [
    // ── ONEPAGE ──────────────────────────────────
    {
        id: 1,
        name: 'Aesthetic Cosmetics Coming Soon',
        slug: 'aesthetic-cosmetics-coming-soon',
        description: 'Landing page "coming soon" cho thương hiệu mỹ phẩm cao cấp. Thiết kế tối giản, tông màu pastel thanh lịch với countdown và form đăng ký nhận thông báo.',
        category: 'onepage',
        type: 'website',
        tags: ['cosmetics', 'coming-soon', 'landing-page', 'minimal', 'beauty'],
        price: 'free',
        images: [
            './products/onepage/aesthetic-cosmetics-coming-soon/screen.png',
            './products/onepage/aesthetic-cosmetics-coming-soon/Screenshot_1.jpg',
        ],
        thumbnail: './products/onepage/aesthetic-cosmetics-coming-soon/screen.png',
        demoUrl: './products/onepage/aesthetic-cosmetics-coming-soon/index.html',
        features: [
            'Thiết kế tối giản tông pastel sang trọng',
            'Countdown đếm ngược ra mắt',
            'Responsive hoàn hảo desktop và mobile',
        ],
        status: 'new',
        priority: 1,
        downloads: 0,
        rating: 0,
        updatedAt: '2025-02-17',
    },
    {
        id: 2,
        name: 'AI Tech Startup Teaser',
        slug: 'ai-tech-startup-teaser',
        description: 'Landing page teaser cho startup công nghệ AI. Phong cách hiện đại, futuristic với gradient nổi bật, hero section ấn tượng và CTA thu hút người dùng.',
        category: 'onepage',
        type: 'website',
        tags: ['ai', 'tech', 'startup', 'landing-page', 'futuristic'],
        price: 'free',
        images: [
            './products/onepage/ai-tech-startup-teaser/the_next_AI_onepage.png',
            './products/onepage/ai-tech-startup-teaser/Screenshot_1.jpg',
            './products/onepage/ai-tech-startup-teaser/Screenshot_2.jpg',
        ],
        thumbnail: './products/onepage/ai-tech-startup-teaser/the_next_AI_onepage.png',
        demoUrl: './products/onepage/ai-tech-startup-teaser/index.html',
        features: [
            'Thiết kế futuristic phong cách AI/Tech',
            'Hero section với gradient ấn tượng',
            'Responsive hoàn hảo desktop và mobile',
        ],
        status: 'new',
        priority: 2,
        downloads: 0,
        rating: 0,
        updatedAt: '2025-02-17',
    },

    // ── E-COMMERCE ───────────────────────────────
    {
        id: 3,
        name: 'An Nhiên Organic',
        slug: 'an-nhien-organic',
        description: 'Website thương mại điện tử cho thương hiệu mỹ phẩm hữu cơ. Tông màu xanh tự nhiên, bố cục sạch sẽ, tập trung trải nghiệm mua sắm thân thiện.',
        category: 'e-commerce',
        type: 'website',
        tags: ['organic', 'cosmetic', 'e-commerce', 'natural', 'skincare'],
        price: 'free',
        images: [
            './products/e-commerce/an-nhien-organic/screen.png',
            './products/e-commerce/an-nhien-organic/Screenshot_1.jpg',
            './products/e-commerce/an-nhien-organic/Screenshot_3.jpg',
        ],
        thumbnail: './products/e-commerce/an-nhien-organic/screen.png',
        demoUrl: './products/e-commerce/an-nhien-organic/index.html',
        features: [
            'Tông màu xanh tự nhiên, hữu cơ',
            'Bố cục sản phẩm rõ ràng, dễ mua sắm',
            'Responsive hoàn hảo desktop và mobile',
        ],
        status: 'new',
        priority: 3,
        downloads: 0,
        rating: 0,
        updatedAt: '2025-02-17',
    },
    {
        id: 4,
        name: 'Art De Beauty',
        slug: 'art-de-beauty',
        description: 'Website cho thương hiệu làm đẹp nghệ thuật. Thiết kế tinh tế, phối màu ấm áp, tôn vinh vẻ đẹp tự nhiên với gallery sản phẩm chuyên nghiệp.',
        category: 'e-commerce',
        type: 'website',
        tags: ['beauty', 'art', 'makeup', 'e-commerce', 'elegant'],
        price: 'free',
        images: [
            './products/e-commerce/art-de-beauty/screen.png',
            './products/e-commerce/art-de-beauty/Screenshot_1.jpg',
            './products/e-commerce/art-de-beauty/Screenshot_2.jpg',
        ],
        thumbnail: './products/e-commerce/art-de-beauty/screen.png',
        demoUrl: './products/e-commerce/art-de-beauty/index.html',
        features: [
            'Thiết kế tinh tế, phối màu ấm áp',
            'Gallery sản phẩm chuyên nghiệp',
            'Responsive hoàn hảo desktop và mobile',
        ],
        status: 'new',
        priority: 4,
        downloads: 0,
        rating: 0,
        updatedAt: '2025-02-17',
    },

    // ── INVITATION ───────────────────────────────
    {
        id: 5,
        name: 'Art Gallery Opening Invite',
        slug: 'art-gallery-opening-invite',
        description: 'Thiệp mời khai trương phòng tranh nghệ thuật. Phong cách sang trọng, typography thanh lịch, bố cục cổ điển kết hợp hiện đại.',
        category: 'invitation',
        type: 'website',
        tags: ['invitation', 'gallery', 'art', 'opening', 'elegant'],
        price: 'free',
        images: [
            './products/invitation/art-gallery-opening-invite/screen.png',
            './products/invitation/art-gallery-opening-invite/Screenshot_1.jpg',
            './products/invitation/art-gallery-opening-invite/Screenshot_2.jpg',
            './products/invitation/art-gallery-opening-invite/Screenshot_3.jpg',
        ],
        thumbnail: './products/invitation/art-gallery-opening-invite/screen.png',
        demoUrl: './products/invitation/art-gallery-opening-invite/index.html',
        features: [
            'Typography thanh lịch, phong cách gallery',
            'Bố cục cổ điển kết hợp hiện đại',
            'Responsive hoàn hảo desktop và mobile',
        ],
        status: 'new',
        priority: 5,
        downloads: 0,
        rating: 0,
        updatedAt: '2025-02-17',
    },
    {
        id: 6,
        name: 'Autumn Harvest Festival',
        slug: 'autumn-harvest-festival',
        description: 'Thiệp mời lễ hội mùa thu. Tông màu ấm áp cam-vàng, hình ảnh thiên nhiên mùa thu, phong cách rustic ấm cúng và thân thiện.',
        category: 'invitation',
        type: 'website',
        tags: ['invitation', 'festival', 'autumn', 'harvest', 'rustic'],
        price: 'free',
        images: [
            './products/invitation/autumn-harvest-festival/screen.png',
            './products/invitation/autumn-harvest-festival/Screenshot_1.jpg',
            './products/invitation/autumn-harvest-festival/Screenshot_3.jpg',
        ],
        thumbnail: './products/invitation/autumn-harvest-festival/screen.png',
        demoUrl: './products/invitation/autumn-harvest-festival/index.html',
        features: [
            'Tông màu mùa thu ấm áp cam-vàng',
            'Phong cách rustic ấm cúng',
            'Responsive hoàn hảo desktop và mobile',
        ],
        status: 'new',
        priority: 6,
        downloads: 0,
        rating: 0,
        updatedAt: '2025-02-17',
    },

    // ── PORTFOLIO ────────────────────────────────
    {
        id: 7,
        name: 'Abstract Painter Portfolio',
        slug: 'abstract-painter-portfolio',
        description: 'Portfolio cho họa sĩ trừu tượng. Thiết kế tối giản, tập trung vào tác phẩm nghệ thuật với gallery lớn, typography sạch sẽ và bố cục thoáng.',
        category: 'portfolio',
        type: 'website',
        tags: ['portfolio', 'art', 'painter', 'abstract', 'gallery'],
        price: 'free',
        images: [
            './products/portfolio/abstract-painter-portfolio/screen.png',
            './products/portfolio/abstract-painter-portfolio/Screenshot_1.jpg',
            './products/portfolio/abstract-painter-portfolio/Screenshot_3.jpg',
        ],
        thumbnail: './products/portfolio/abstract-painter-portfolio/screen.png',
        demoUrl: './products/portfolio/abstract-painter-portfolio/index.html',
        features: [
            'Thiết kế tối giản tập trung tác phẩm',
            'Gallery lớn với bố cục thoáng',
            'Responsive hoàn hảo desktop và mobile',
        ],
        status: 'new',
        priority: 7,
        downloads: 0,
        rating: 0,
        updatedAt: '2025-02-17',
    },
    {
        id: 8,
        name: 'Adventure Family Blog',
        slug: 'adventure-family-blog',
        description: 'Blog gia đình phiêu lưu. Phong cách tươi sáng, năng động với layout blog chuẩn, sidebar và hình ảnh lớn thu hút người đọc.',
        category: 'portfolio',
        type: 'website',
        tags: ['blog', 'family', 'adventure', 'travel', 'lifestyle'],
        price: 'free',
        images: [
            './products/portfolio/adventure-family-blog/screen.png',
            './products/portfolio/adventure-family-blog/Screenshot_1.jpg',
            './products/portfolio/adventure-family-blog/Screenshot_3.jpg',
        ],
        thumbnail: './products/portfolio/adventure-family-blog/screen.png',
        demoUrl: './products/portfolio/adventure-family-blog/index.html',
        features: [
            'Phong cách tươi sáng, năng động',
            'Layout blog chuẩn với sidebar',
            'Responsive hoàn hảo desktop và mobile',
        ],
        status: 'new',
        priority: 8,
        downloads: 0,
        rating: 0,
        updatedAt: '2025-02-17',
    },

    // ── EDUCATION ────────────────────────────────
    {
        id: 9,
        name: 'Art Heritage Studio',
        slug: 'art-heritage-studio',
        description: 'Website trung tâm đào tạo nghệ thuật truyền thống. Thiết kế kết hợp yếu tố cổ điển và hiện đại, tông màu ấm, bố cục khóa học rõ ràng.',
        category: 'education',
        type: 'website',
        tags: ['education', 'art', 'heritage', 'course', 'studio'],
        price: 'free',
        images: [
            './products/education/art-heritage-studio/screen.png',
            './products/education/art-heritage-studio/Screenshot_1.jpg',
            './products/education/art-heritage-studio/Screenshot_2.jpg',
        ],
        thumbnail: './products/education/art-heritage-studio/screen.png',
        demoUrl: './products/education/art-heritage-studio/index.html',
        features: [
            'Kết hợp phong cách cổ điển và hiện đại',
            'Bố cục khóa học rõ ràng, dễ theo dõi',
            'Responsive hoàn hảo desktop và mobile',
        ],
        status: 'new',
        priority: 9,
        downloads: 0,
        rating: 0,
        updatedAt: '2025-02-17',
    },
    {
        id: 10,
        name: 'ArtTech Academy',
        slug: 'arttech-academy',
        description: 'Website học viện công nghệ sáng tạo. Phong cách hiện đại, năng động với gradient, bố cục khóa học chuyên nghiệp và CTA nổi bật.',
        category: 'education',
        type: 'website',
        tags: ['education', 'tech', 'academy', 'course', 'creative'],
        price: 'free',
        images: [
            './products/education/arttech-academy/screen.png',
            './products/education/arttech-academy/Screenshot_1.jpg',
            './products/education/arttech-academy/Screenshot_2.jpg',
        ],
        thumbnail: './products/education/arttech-academy/screen.png',
        demoUrl: './products/education/arttech-academy/index.html',
        features: [
            'Phong cách hiện đại với gradient nổi bật',
            'Bố cục khóa học chuyên nghiệp',
            'Responsive hoàn hảo desktop và mobile',
        ],
        status: 'new',
        priority: 10,
        downloads: 0,
        rating: 0,
        updatedAt: '2025-02-17',
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
        description: 'Dành cho ai cần chỉnh sửa nhẹ trên các mẫu có sẵn và muốn nhanh chóng ra mắt sản phẩm.',
        features: [
            'Tùy chỉnh nhẹ template',
            'Cá nhân hóa màu sắc/thương hiệu',
            'Tùy chỉnh Responsive cơ bản',
            { text: 'Hỗ trợ sau bàn giao', disabled: true },
            { text: 'Bảo hành 2 tháng', disabled: false },
        ],
        highlighted: false,
    },
    {
        id: 'pro',
        name: 'PRO',
        price: '2.999.000đ',
        description: 'Dành cho ai cần tùy chỉnh sâu hơn với thiết kế chuyên nghiệp, nhiều trang và tính năng.',
        features: [
            'Tùy chỉnh sâu toàn bộ',
            'Cá nhân hóa màu sắc/thương hiệu',
            'Tùy chỉnh Responsive đa thiết bị',
            'Tối đa 5-8 trang',
            'Module 5-8 trang',
            'Bảo hành 6 tháng',
        ],
        highlighted: true,
    },
    {
        id: 'premium',
        name: 'PREMIUM',
        price: '8.000.000đ',
        description: 'Dành cho doanh nghiệp cần giải pháp hoàn chỉnh với hiệu suất cao và tích hợp nâng cao.',
        features: [
            'Tùy chỉnh nâng cao toàn diện',
            'Tùy chỉnh Responsive đa thiết bị',
            'Tối ưu tốc độ tải trang',
            'Tối đa 10-15 trang',
            'Trang nâng cao/dashboard',
            'Bảo hành 12 tháng',
        ],
        highlighted: false,
    },
    {
        id: 'custom',
        name: 'CUSTOM',
        price: 'Liên hệ',
        description: 'Tùy chỉnh không giới hạn theo yêu cầu riêng của bạn.',
        features: [
            'Tùy chỉnh không giới hạn',
            'Cá nhân hóa màu sắc/thương hiệu',
            'Tùy chỉnh Responsive đa thiết bị',
            'Responsive hoàn chỉnh',
            'Trang nâng cao/dashboard',
            'Bảo hành theo thỏa thuận',
        ],
        highlighted: false,
    },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

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
