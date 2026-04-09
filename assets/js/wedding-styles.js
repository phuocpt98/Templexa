/**
 * Phân loại thiệp cưới (id > 152) theo 5 phong cách.
 * Mỗi item: { id, name, url, isPublic, tag }
 *   - url: https://templexa.vn/preview.html?id={id}
 *   - tag: 'new' | 'trending' | 'bestseller' | ''
 */

const WEDDING_STYLES = {
    // 3.1. Truyền thống — đỏ vàng, hoa văn Việt, gia đình truyền thống
    traditional: [
        { id: 178, name: 'Thiệp Cưới Truyền Thống - Song Long Đỏ', url: 'https://templexa.vn/preview.html?id=178', isPublic: true, tag: 'new' },
        { id: 186, name: 'Thiệp Cưới Long Phụng Đỏ — Cổ Điển Việt Nam', url: 'https://templexa.vn/preview.html?id=186', isPublic: true, tag: 'trending' },
        { id: 187, name: 'Thiệp Cưới Chibi Đỏ — Dễ Thương Truyền Thống', url: 'https://templexa.vn/preview.html?id=187', isPublic: true, tag: 'new' },
        { id: 191, name: 'Thiệp Cưới - Việt Mềm Mại Hỷ', url: 'https://templexa.vn/preview.html?id=191', isPublic: true, tag: 'new' },
        { id: 199, name: 'Thiệp Cưới Chibi - Bảo & Ánh', url: 'https://templexa.vn/preview.html?id=199', isPublic: false, tag: 'new' },
        { id: 201, name: 'Thiệp Cưới - Red Traditional Curtain', url: 'https://templexa.vn/preview.html?id=201', isPublic: true, tag: 'new' },
        { id: 203, name: 'Thiệp Cưới - Weddingday Traditional', url: 'https://templexa.vn/preview.html?id=203', isPublic: true, tag: 'new' },
        { id: 204, name: 'Thiệp Ăn Hỏi — Truyền Thống Đỏ Vàng', url: 'https://templexa.vn/preview.html?id=204', isPublic: true, tag: 'trending' },
        { id: 214, name: 'Thiệp Cưới Đông Phương Mộng Mơ — Việt Phục', url: 'https://templexa.vn/preview.html?id=214', isPublic: true, tag: 'new' },
        { id: 215, name: 'Thiệp Cưới Song Hỷ — Double Happiness', url: 'https://templexa.vn/preview.html?id=215', isPublic: true, tag: 'bestseller' },
        { id: 225, name: 'Thiệp Cưới - Heritage Illustrated Venue', url: 'https://templexa.vn/preview.html?id=225', isPublic: false, tag: 'new' },
    ],

    // 3.2. Hiện đại — tinh gọn, trẻ trung, cặp đôi trẻ
    modern: [
        { id: 171, name: 'Thiệp Mời Cưới - Minh Anh & Thùy Linh', url: 'https://templexa.vn/preview.html?id=171', isPublic: true, tag: 'new' },
        { id: 173, name: 'Thiệp Cưới Tương Tác - Hoàng Nam & Ngọc Mai', url: 'https://templexa.vn/preview.html?id=173', isPublic: false, tag: 'new' },
        { id: 176, name: 'Chuyện Của Đôi Mình — Thiệp Cưới Tươi Sáng', url: 'https://templexa.vn/preview.html?id=176', isPublic: true, tag: 'new' },
        { id: 179, name: 'Thiệp Cưới - Blue Romantic', url: 'https://templexa.vn/preview.html?id=179', isPublic: true, tag: 'new' },
        { id: 180, name: 'Thiệp Cưới Modern Blue Romantic', url: 'https://templexa.vn/preview.html?id=180', isPublic: true, tag: 'new' },
        { id: 181, name: 'Thiệp Cưới Cinelove Style — Modern Blue', url: 'https://templexa.vn/preview.html?id=181', isPublic: true, tag: 'new' },
        { id: 184, name: 'Thiệp Cưới Modern Romantic', url: 'https://templexa.vn/preview.html?id=184', isPublic: true, tag: 'new' },
        { id: 190, name: 'Thiệp Cưới - Viet Green Fresh', url: 'https://templexa.vn/preview.html?id=190', isPublic: true, tag: 'new' },
        { id: 193, name: 'Thiệp Cưới #193 Modern Romantic Red (Tuấn & Hương)', url: 'https://templexa.vn/preview.html?id=193', isPublic: false, tag: 'new' },
        { id: 222, name: 'Love Story Slide — Câu Chuyện Của Chúng Mình', url: 'https://templexa.vn/preview.html?id=222', isPublic: false, tag: 'new' },
    ],

    // 3.3. Tối giản (Minimalist) — ít chi tiết, trắng/be/pastel, sang trọng tinh tế
    minimalist: [
        { id: 154, name: 'Thiệp Cưới Modern Minimalist — Hoàng Nam & Thuỳ Dung', url: 'https://templexa.vn/preview.html?id=154', isPublic: true, tag: 'new' },
        { id: 185, name: 'Thiệp Cưới Coral Minimalist', url: 'https://templexa.vn/preview.html?id=185', isPublic: true, tag: 'new' },
        { id: 189, name: 'Thiệp Cưới - Korean 90s Classic Beige', url: 'https://templexa.vn/preview.html?id=189', isPublic: true, tag: 'new' },
        { id: 197, name: 'Thiệp Cưới Sage Green — Hoàng Phúc & Phương Anh', url: 'https://templexa.vn/preview.html?id=197', isPublic: false, tag: 'new' },
        { id: 202, name: 'Thiệp Cưới Miinso Minimalist White', url: 'https://templexa.vn/preview.html?id=202', isPublic: true, tag: 'new' },
    ],

    // 3.4. Sang trọng (Luxury) — đen/vàng/ánh kim, cao cấp, tiệc cưới lớn
    luxury: [
        { id: 156, name: 'Thiệp Cưới Tropical Luxe — Hải Đăng & Kiều My', url: 'https://templexa.vn/preview.html?id=156', isPublic: true, tag: 'new' },
        { id: 182, name: 'Thiệp Cưới Burgundy Romantic Story', url: 'https://templexa.vn/preview.html?id=182', isPublic: false, tag: 'new' },
        { id: 183, name: 'Thiệp Cưới Elegant Black & Gold', url: 'https://templexa.vn/preview.html?id=183', isPublic: true, tag: 'trending' },
        { id: 188, name: 'Thiệp Cưới Rèm Đỏ — Burgundy & Gold Sang Trọng', url: 'https://templexa.vn/preview.html?id=188', isPublic: true, tag: 'new' },
        { id: 192, name: 'Thiệp Cưới - Phúc & Thảo Navy Lavender', url: 'https://templexa.vn/preview.html?id=192', isPublic: false, tag: 'new' },
        { id: 194, name: 'Thiệp Cưới - Modern Romantic White (Burgundy & Gold)', url: 'https://templexa.vn/preview.html?id=194', isPublic: false, tag: 'new' },
        { id: 212, name: 'Thiệp Cưới Cinematic Light & Shadow Editorial', url: 'https://templexa.vn/preview.html?id=212', isPublic: false, tag: 'new' },
        { id: 218, name: 'Thiệp Cưới Silk Veil — Ethereal Dreamy', url: 'https://templexa.vn/preview.html?id=218', isPublic: true, tag: 'new' },
        { id: 219, name: 'Thiệp Cưới Porcelain Bloom — Kintsugi', url: 'https://templexa.vn/preview.html?id=219', isPublic: true, tag: 'bestseller' },
        { id: 220, name: 'Thiệp Cưới Midnight Sapphire Luxury', url: 'https://templexa.vn/preview.html?id=220', isPublic: false, tag: 'new' },
        { id: 223, name: 'Blanc Atelier — Fashion Editorial', url: 'https://templexa.vn/preview.html?id=223', isPublic: false, tag: 'new' },
        { id: 224, name: 'Crystal Chandelier — Tiệc Cưới Pha Lê', url: 'https://templexa.vn/preview.html?id=224', isPublic: false, tag: 'new' },
    ],

    // 3.5. Hoa lá (Floral) — hoa tươi/vẽ, màu sắc nhẹ nhàng
    floral: [
        { id: 153, name: 'Thiệp Cưới Rustic Garden — Đức Anh & Ngọc Linh', url: 'https://templexa.vn/preview.html?id=153', isPublic: true, tag: 'new' },
        { id: 155, name: 'Thiệp Cưới Romantic Blush — Quốc Bảo & Thanh Trúc', url: 'https://templexa.vn/preview.html?id=155', isPublic: true, tag: 'new' },
        { id: 175, name: 'Cuốn Phim Ký Ức — Thiệp Cưới Vintage', url: 'https://templexa.vn/preview.html?id=175', isPublic: true, tag: 'new' },
        { id: 198, name: 'Thiệp Cưới - Trọng Nghĩa & Thu Thuỷ', url: 'https://templexa.vn/preview.html?id=198', isPublic: false, tag: 'new' },
        { id: 200, name: 'Thiệp Cưới Valentine Pink Romantic', url: 'https://templexa.vn/preview.html?id=200', isPublic: true, tag: 'new' },
        { id: 210, name: 'Thiệp Cưới Sage Green Vintage — Quang Huy & Thanh Hằng', url: 'https://templexa.vn/preview.html?id=210', isPublic: true, tag: 'bestseller' },
        { id: 211, name: 'Thiệp Cưới Blush Romantic — Viết & Trang Hoa', url: 'https://templexa.vn/preview.html?id=211', isPublic: true, tag: 'bestseller' },
        { id: 213, name: 'Thiệp Cưới Chibi Hoa Pastel Dễ Thương', url: 'https://templexa.vn/preview.html?id=213', isPublic: true, tag: 'trending' },
        { id: 216, name: 'Thiệp Cưới Hoa Trắng Mộng Mơ', url: 'https://templexa.vn/preview.html?id=216', isPublic: true, tag: 'new' },
        { id: 217, name: 'Thiệp Cưới Garden Gate — Cổng Vườn Xanh', url: 'https://templexa.vn/preview.html?id=217', isPublic: true, tag: 'bestseller' },
        { id: 221, name: 'Thiệp Cưới Sage Green Emboss — Giấy Hoa Nổi', url: 'https://templexa.vn/preview.html?id=221', isPublic: false, tag: 'new' },
    ],
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WEDDING_STYLES };
}
