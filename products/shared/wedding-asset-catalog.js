/**
 * Wedding Asset Catalog — Bảng data gắn tag cho tất cả ảnh, icon, element, music
 * Dùng bởi /gen-wedding để tự động chọn asset phù hợp theo yêu cầu
 *
 * Cách query: filter theo tags, style, usage, color
 * Ví dụ: tìm icon cho thiệp truyền thống đỏ → filter tags includes 'traditional' && 'red'
 */

const WEDDING_ASSET_CATALOG = {

    /* ============================================
       PHOTO SETS — Bộ ảnh couple
       ============================================ */
    photoSets: [
        {
            id: 'korean-studio-white',
            name: 'Hàn Quốc Studio Trắng Kem',
            path: 'wedding/korean-studio-white',
            count: 6,
            tags: ['elegant', 'romantic', 'soft', 'studio', 'korean', 'indoor'],
            colors: ['white', 'cream', 'nude', 'pink-light'],
            mood: 'nhẹ nhàng, thanh lịch, lãng mạn',
            hasPortrait: false,
            matchPalettes: ['classic-gold', 'blush-pink', 'dusty-rose', 'lavender', 'blue-romantic', 'burgundy'],
            files: {
                hero: 'couple_1.webp',
                envelope: 'couple_2.webp',
                story: ['couple_3.webp', 'couple_5.webp'],
                gallery: ['couple_4.webp', 'couple_5.webp', 'couple_6.webp'],
                thankyou: 'couple_6.webp',
            },
            usedBy: [179, 181, 182, 187],
        },
        {
            id: 'korean-studio-gray',
            name: 'Hàn Quốc Studio Xám',
            path: 'wedding/korean-studio-gray',
            count: 4,
            tags: ['elegant', 'minimal', 'studio', 'korean', 'indoor', 'neutral'],
            colors: ['gray', 'neutral', 'cool'],
            mood: 'thanh lịch, tối giản, trung tính',
            hasPortrait: false,
            matchPalettes: ['modern', 'blue', 'black-gold', 'burgundy', 'navy'],
            files: {
                hero: 'couple_1.webp',
                envelope: 'couple_3.webp',
                story: ['couple_2.webp', 'couple_4.webp'],
                gallery: ['couple_1.webp', 'couple_2.webp', 'couple_3.webp', 'couple_4.webp'],
            },
            usedBy: [180, 181, 182, 186, 187],
        },
        {
            id: 'korean-studio-classic-beige',
            name: 'Hàn Quốc Studio Classic Beige',
            path: 'wedding/korean-studio-classic-beige',
            count: 11,
            tags: ['classic', 'warm', 'studio', 'korean', 'indoor', 'beige'],
            colors: ['beige', 'warm', 'cream', 'brown-light'],
            mood: 'cổ điển, ấm áp, trang trọng',
            hasPortrait: true,
            portraitFiles: { bride: 'nu.webp' },
            matchPalettes: ['classic-gold', 'sage-green', 'vintage', 'warm-neutral'],
            files: {
                hero: 'couple.webp',
                envelope: 'couple-doi.webp',
                story: ['couple-light.webp', 'kiss.webp'],
                gallery: ['couple-gray.webp', 'couple-gray-2.webp', 'couple --beige.webp', 'phao-hoa.webp', 'xe.webp'],
                background: 'light-rong.webp',
            },
            usedBy: [],
        },
        {
            id: 'elegant-black-gold',
            name: 'Sang Trọng Đen & Vàng',
            path: 'wedding/elegant-black-gold',
            count: 9,
            tags: ['luxury', 'dark', 'studio', 'elegant', 'formal'],
            colors: ['black', 'gold', 'white', 'dark'],
            mood: 'sang trọng, đẳng cấp, formal',
            hasPortrait: true,
            portraitFiles: { groom: 'portrait_groom.webp', bride: 'portrait_bride.webp' },
            matchPalettes: ['black-gold', 'dark-luxury', 'navy-gold', 'burgundy-dark'],
            files: {
                hero: 'couple_hero.webp',
                envelope: 'couple_main.webp',
                story: ['gallery_1.webp', 'gallery_3.webp'],
                gallery: ['gallery_1.webp', 'gallery_2.webp', 'gallery_3.webp', 'gallery_4.webp', 'gallery_5.webp'],
                thankyou: 'couple_hero.webp',
            },
            usedBy: [183, 210],
        },
        {
            id: 'modern-romantic',
            name: 'Lãng Mạn Hiện Đại',
            path: 'wedding/modern-romantic',
            count: 13,
            tags: ['romantic', 'modern', 'outdoor', 'warm', 'natural'],
            colors: ['warm', 'natural', 'earth', 'sunset'],
            mood: 'lãng mạn, hiện đại, tự nhiên',
            hasPortrait: false,
            matchPalettes: ['romantic', 'blush', 'coral', 'modern', 'dusty-rose'],
            files: {
                hero: 'couple_1.webp',
                envelope: ['couple_6.webp', 'couple_9.webp'],
                story: ['couple_5.webp', 'couple_7.webp', 'couple_11.webp'],
                gallery: ['couple_3.webp', 'couple_4.webp', 'couple_8.webp', 'couple_10.webp', 'couple_13.webp'],
                background: 'couple_3.webp',
                thankyou: 'couple_12.webp',
                fly: ['couple_2.webp', 'couple_4.webp'],
            },
            usedBy: [184],
        },
        {
            id: 'coral-minimalist',
            name: 'Coral Tối Giản',
            path: 'wedding/coral-minimalist',
            count: 13,
            tags: ['minimalist', 'coral', 'elegant', 'clean', 'outdoor'],
            colors: ['coral', 'white', 'nude', 'blush'],
            mood: 'tối giản, thanh lịch, sạch sẽ',
            hasPortrait: true,
            portraitFiles: { groom: 'groom.webp', bride: 'bride.webp' },
            matchPalettes: ['coral', 'minimalist', 'modern', 'blush'],
            files: {
                hero: 'hero_bg.webp',
                envelope: ['groom.webp', 'bride.webp'],
                story: ['story_1.webp', 'story_2.webp', 'story_3.webp'],
                gallery: ['album_1.webp', 'album_2.webp', 'album_3.webp'],
                background: 'large_bg.webp',
                banner: 'banner.webp',
                event: ['event_1.webp', 'event_2.webp'],
            },
            usedBy: [185],
        },
        {
            id: 'vit-sang-trong',
            name: 'Studio Navy + Trắng + Lavender',
            path: 'wedding/vit-sang-trong',
            count: 13,
            tags: ['elegant', 'studio', 'navy', 'lavender', 'formal'],
            colors: ['navy', 'white', 'lavender', 'purple-light'],
            mood: 'thanh lịch, Hàn Quốc studio, trang trọng',
            hasPortrait: false,
            matchPalettes: ['navy-lavender', 'blue-romantic', 'lavender', 'modern-elegant'],
            files: {
                hero: 'couple_hero.webp',
                envelope: 'couple_2.webp',
                story: ['couple_4.webp', 'couple_7.webp'],
                gallery: ['couple_3.webp', 'couple_5.webp', 'couple_6.webp', 'couple_8.webp', 'couple_9.webp', 'couple_10.webp', 'couple_11.webp', 'couple_12.webp'],
                thankyou: 'couple_13.webp',
            },
            usedBy: [192],
        },
        {
            id: 'viet-green',
            name: 'Xanh Lá Tươi Trẻ',
            path: 'wedding/viet-green',
            count: 14,
            tags: ['fresh', 'green', 'vietnamese', 'natural', 'young'],
            colors: ['green', 'white', 'fresh', 'natural'],
            mood: 'tươi trẻ, tự nhiên, Việt Nam',
            hasPortrait: true,
            portraitFiles: { groom: 'chu re.webp', bride: 'co-dau.webp' },
            matchPalettes: ['sage-green', 'green-fresh', 'natural', 'garden'],
            files: {
                hero: 'bia_1.webp',
                envelope: 'anh doi.webp',
                couple: ['anh cap doi.webp', 'cap_doi_2.webp'],
                story: ['3.webp', '4.webp', '5.webp'],
                gallery: ['2 anh loon.webp', '2 line .webp', '3 anh doc.webp'],
                decoration: ['hoa cuoi.webp', 'hoa cuoi 2.webp'],
            },
            usedBy: [190],
        },
        {
            id: 'viet-mem-mai',
            name: 'Đỏ Mềm Mại Truyền Thống',
            path: 'wedding/viet-mem-mai',
            count: 12,
            tags: ['traditional', 'red', 'soft', 'vietnamese', 'warm'],
            colors: ['red', 'pink', 'cream', 'warm'],
            mood: 'mềm mại, truyền thống, ấm áp',
            hasPortrait: false,
            matchPalettes: ['traditional-red', 'red-gold', 'warm-traditional', 'blush-red'],
            files: {
                hero: '1.webp',
                gallery: ['2.webp', '3.webp', '4.webp', '5.webp', '6.webp', '7.webp', '8.webp', '9.webp', '10.webp', '11.webp', '12.webp'],
            },
            usedBy: [191],
        },
    ],

    /* ============================================
       ICONS — Icon & decorative elements
       ============================================ */
    icons: [
        // Elegant / Classic / Vintage
        { id: 'wax-seal', file: 'icons/wax-seal.webp', name: 'Con dấu sáp', tags: ['elegant', 'classic', 'vintage', 'envelope'], usage: ['envelope-seal', 'decoration'] },
        { id: 'divider-svg', file: 'icons/divider.svg', name: 'Đường phân cách SVG', tags: ['all', 'divider', 'universal'], usage: ['section-divider'] },
        { id: 'bouquet-1', file: 'icons/bouquet-1.webp', name: 'Bó hoa nhỏ', tags: ['elegant', 'romantic', 'floral'], usage: ['corner-deco', 'section-deco'] },
        { id: 'bouquet-2', file: 'icons/bouquet-2.webp', name: 'Bó hoa lớn', tags: ['elegant', 'romantic', 'floral', 'big'], usage: ['hero-deco', 'section-deco'] },
        { id: 'frame-1', file: 'icons/frame-1.webp', name: 'Khung ảnh 1', tags: ['elegant', 'classic', 'frame'], usage: ['photo-frame', 'couple-frame'] },
        { id: 'frame-2', file: 'icons/frame-2.webp', name: 'Khung ảnh 2', tags: ['elegant', 'classic', 'frame'], usage: ['photo-frame'] },
        { id: 'frame-3', file: 'icons/frame-3.webp', name: 'Khung ảnh 3', tags: ['elegant', 'classic', 'frame'], usage: ['photo-frame'] },
        { id: 'crop-shape', file: 'icons/crop-shape.webp', name: 'Hình cắt/mask', tags: ['elegant', 'mask'], usage: ['image-mask'] },
        { id: 'deco-divider', file: 'icons/deco-divider.webp', name: 'Phân cách trang trí', tags: ['elegant', 'classic', 'divider'], usage: ['section-divider'] },
        { id: 'deco-divider-2', file: 'icons/deco-divider-2.webp', name: 'Phân cách trang trí v2', tags: ['elegant', 'classic', 'divider'], usage: ['section-divider'] },
        { id: 'deco-element', file: 'icons/deco-element.webp', name: 'Element trang trí', tags: ['elegant', 'decoration'], usage: ['corner-deco'] },
        { id: 'deco-footer', file: 'icons/deco-footer.webp', name: 'Footer trang trí', tags: ['elegant', 'footer'], usage: ['footer-deco'] },
        { id: 'deco-1', file: 'icons/deco-1.webp', name: 'Trang trí chung', tags: ['romantic', 'decoration'], usage: ['general-deco'] },

        // Romantic / Heart
        { id: 'calen-heart', file: 'icons/calen-heart.webp', name: 'Lịch trái tim', tags: ['romantic', 'elegant', 'calendar'], usage: ['calendar-section', 'date-highlight'] },
        { id: 'calen-heart-2', file: 'icons/calen-heart-2.webp', name: 'Lịch trái tim v2', tags: ['romantic', 'calendar'], usage: ['calendar-section'] },
        { id: 'heart-icon', file: 'icons/heart-icon.webp', name: 'Trái tim nhỏ', tags: ['all', 'romantic', 'heart', 'universal'], usage: ['inline-icon', 'love-story'] },

        // Character / Chibi
        { id: 'character-elegant', file: 'icons/character-elegant.webp', name: 'Chibi sang trọng', tags: ['elegant', 'modern', 'chibi', 'character'], usage: ['envelope-deco', 'hero-deco'] },
        { id: 'character-romantic', file: 'icons/character-romantic.webp', name: 'Chibi lãng mạn', tags: ['romantic', 'modern', 'chibi', 'character'], usage: ['envelope-deco', 'hero-deco'] },
        { id: 'couple-chibi', file: 'icons/couple-chibi.webp', name: 'Cặp đôi chibi', tags: ['cute', 'traditional', 'chibi', 'cartoon'], usage: ['envelope-center', 'hero-center', 'thankyou'] },

        // Traditional Vietnamese / Chinese
        { id: 'chinese-happiness', file: 'icons/chinese-happiness.webp', name: 'Chữ Hỷ', tags: ['traditional', 'chinese', 'red', 'formal'], usage: ['envelope-center', 'hero-center', 'section-header'] },
        { id: 'double-happiness', file: 'icons/double-happiness.webp', name: 'Song Hỷ đỏ', tags: ['traditional', 'chinese', 'red', 'cute'], usage: ['envelope-center', 'hero-center'] },
        { id: 'happiness-1', file: 'icons/happiness-1.webp', name: 'Hỷ variant 1', tags: ['traditional', 'red', 'chinese'], usage: ['section-header', 'decoration'] },
        { id: 'happiness-2', file: 'icons/happiness-2.webp', name: 'Hỷ variant 2', tags: ['traditional', 'red', 'chinese'], usage: ['section-header', 'decoration'] },
        { id: 'rong', file: 'icons/rong.webp', name: 'Rồng truyền thống', tags: ['traditional', 'vietnamese', 'red', 'dragon'], usage: ['hero-left', 'envelope-left'] },
        { id: 'phuong', file: 'icons/phuong.webp', name: 'Chim Phượng', tags: ['traditional', 'vietnamese', 'red', 'phoenix'], usage: ['hero-right', 'envelope-right'] },

        // Cute / Floral
        { id: 'cherry-blossom', file: 'icons/cherry-blossom.webp', name: 'Hoa anh đào', tags: ['cute', 'traditional', 'pink', 'floral', 'japanese'], usage: ['corner-deco', 'falling-effect'] },
        { id: 'decorative-diamond', file: 'icons/decorative-diamond.webp', name: 'Kim cương trang trí', tags: ['cute', 'traditional', 'sparkle'], usage: ['corner-deco', 'floating-deco'] },
        { id: 'decorative-flowers', file: 'icons/decorative-flowers.webp', name: 'Hoa trang trí góc', tags: ['cute', 'traditional', 'floral'], usage: ['corner-deco'] },

        // Cinelove style
        { id: 'cinelove-audio', file: 'icons/cinelove/audio-icon.png', name: 'Audio icon (Cinelove)', tags: ['modern', 'cinelove', 'audio'], usage: ['music-toggle'] },
        { id: 'cinelove-calen-heart', file: 'icons/cinelove/calen_heart_1.png', name: 'Calendar heart (Cinelove)', tags: ['romantic', 'cinelove', 'calendar'], usage: ['calendar-section'] },
    ],

    /* ============================================
       WEDDING ELEMENTS — Trang trí section
       ============================================ */
    elements: [
        { id: 'and-symbol', file: 'wedding-elements/and-symbol.webp', name: 'Ký hiệu &', tags: ['all', 'typography'], usage: ['between-names'] },
        { id: 'bride-frame', file: 'wedding-elements/bride-frame.webp', name: 'Khung cô dâu', tags: ['elegant', 'frame'], usage: ['portrait-frame'] },
        { id: 'groom-frame', file: 'wedding-elements/groom-frame.webp', name: 'Khung chú rể', tags: ['elegant', 'frame'], usage: ['portrait-frame'] },
        { id: 'calendar-bg', file: 'wedding-elements/calendar-bg.webp', name: 'Nền lịch', tags: ['calendar', 'vintage'], usage: ['calendar-background'] },
        { id: 'countdown-deco', file: 'wedding-elements/countdown-deco.webp', name: 'Trang trí countdown', tags: ['countdown', 'artistic'], usage: ['countdown-background'] },
        { id: 'heart-icon-el', file: 'wedding-elements/heart-icon.webp', name: 'Trái tim element', tags: ['romantic', 'heart'], usage: ['inline-icon'] },
        { id: 'leaf-left', file: 'wedding-elements/leaf-left.webp', name: 'Lá trái', tags: ['green', 'natural', 'floral'], usage: ['side-deco-left'] },
        { id: 'leaf-right', file: 'wedding-elements/leaf-right.webp', name: 'Lá phải', tags: ['green', 'natural', 'floral'], usage: ['side-deco-right'] },
        { id: 'love-story-ornament', file: 'wedding-elements/love-story-ornament.webp', name: 'Trang trí love story', tags: ['romantic', 'ornament'], usage: ['love-story-header'] },
        { id: 'popup-deco', file: 'wedding-elements/popup-deco.webp', name: 'Popup trang trí', tags: ['popup', 'deco'], usage: ['popup-background'] },
        { id: 'popup-deco2', file: 'wedding-elements/popup-deco2.webp', name: 'Popup trang trí v2', tags: ['popup', 'deco'], usage: ['popup-background'] },
        { id: 'popup-frame', file: 'wedding-elements/popup-frame.webp', name: 'Popup frame', tags: ['popup', 'frame'], usage: ['popup-border'] },
        { id: 'popup2-bg', file: 'wedding-elements/popup2-bg.webp', name: 'Popup nền', tags: ['popup', 'background'], usage: ['popup-background'] },
        { id: 'small-element', file: 'wedding-elements/small-element.webp', name: 'Element nhỏ', tags: ['small', 'deco'], usage: ['scatter-deco'] },
        { id: 'small-flower', file: 'wedding-elements/small-flower.webp', name: 'Hoa nhỏ', tags: ['floral', 'small', 'romantic'], usage: ['scatter-deco', 'corner-deco'] },
        // Sage green element set (thiệp Thanh Đạt)
        { id: 'sage-el-1', file: 'wedding-elements/thiep-thanh-dat-element_0028_6.webp', name: 'Sage element 1', tags: ['sage-green', 'vintage', 'botanical'], usage: ['section-background'] },
        { id: 'sage-el-2', file: 'wedding-elements/thiep-thanh-dat-element_0029_5.webp', name: 'Sage element 2', tags: ['sage-green', 'vintage', 'botanical'], usage: ['section-background'] },
        { id: 'sage-el-3', file: 'wedding-elements/thiep-thanh-dat-element_0030_4.webp', name: 'Sage wax seal', tags: ['sage-green', 'vintage', 'seal'], usage: ['envelope-seal'] },
        { id: 'sage-el-4', file: 'wedding-elements/thiep-thanh-dat-element_0031_3.webp', name: 'Sage element 4', tags: ['sage-green', 'vintage', 'botanical'], usage: ['section-background'] },
        { id: 'sage-el-5', file: 'wedding-elements/thiep-thanh-dat-element_0032_2.webp', name: 'Sage header banner', tags: ['sage-green', 'vintage', 'banner'], usage: ['cover-header'] },
        { id: 'sage-el-6', file: 'wedding-elements/thiep-thanh-dat-element_0033_1.webp', name: 'Sage section bg', tags: ['sage-green', 'vintage', 'background'], usage: ['section-background', 'cover-background'] },
        // Timeline icons
        { id: 'timeline-1', file: 'wedding-elements/timeline-1.webp', name: 'Timeline gặp gỡ', tags: ['timeline', 'love-story'], usage: ['love-story-icon'] },
        { id: 'timeline-2', file: 'wedding-elements/timeline-2.webp', name: 'Timeline yêu', tags: ['timeline', 'love-story'], usage: ['love-story-icon'] },
        { id: 'timeline-3', file: 'wedding-elements/timeline-3.webp', name: 'Timeline cầu hôn', tags: ['timeline', 'love-story'], usage: ['love-story-icon'] },
        { id: 'timeline-4', file: 'wedding-elements/timeline-4.webp', name: 'Timeline cưới', tags: ['timeline', 'love-story'], usage: ['love-story-icon'] },
        // Generic elements
        { id: 'asset-1', file: 'wedding-elements/asset-1.webp', name: 'Asset chung', tags: ['deco', 'generic'], usage: ['general-deco'] },
        { id: 'group-16', file: 'wedding-elements/group-16.webp', name: 'Group element', tags: ['deco', 'generic'], usage: ['general-deco'] },
        // Generic ornament elements
        { id: 'element-13', file: 'wedding-elements/element_0021_13.webp', name: 'Ornament element 13', tags: ['ornament', 'elegant', 'deco'], usage: ['section-deco', 'corner-deco'] },
        { id: 'element-11', file: 'wedding-elements/element_0023_11.webp', name: 'Ornament element 11', tags: ['ornament', 'elegant', 'deco'], usage: ['section-deco'] },
        { id: 'element-10', file: 'wedding-elements/element_0024_10.webp', name: 'Ornament element 10', tags: ['ornament', 'elegant', 'deco'], usage: ['section-deco'] },
        { id: 'element-9', file: 'wedding-elements/element_0025_9.webp', name: 'Ornament element 9', tags: ['ornament', 'elegant', 'deco'], usage: ['section-deco'] },
        { id: 'element-7', file: 'wedding-elements/element_0027_7.webp', name: 'Ornament element 7', tags: ['ornament', 'elegant', 'deco'], usage: ['section-deco'] },
    ],

    /* ============================================
       MUSIC — Nhạc nền
       ============================================ */
    music: [
        { id: 'thousand-years', file: 'wedding/A Thousand Years.mp3', name: 'A Thousand Years', artist: 'Christina Perri', tags: ['romantic', 'ballad', 'slow', 'popular'], mood: 'lãng mạn, xúc động', bpm: 'slow' },
        { id: 'beautiful-in-white', file: 'wedding/Beautiful In White.mp3', name: 'Beautiful In White', artist: 'Westlife', tags: ['romantic', 'classic', 'wedding', 'popular'], mood: 'cổ điển, ngọt ngào', bpm: 'medium' },
        { id: 'sugar', file: 'wedding/Sugar.mp3', name: 'Sugar', artist: 'Maroon 5', tags: ['upbeat', 'fun', 'modern', 'party'], mood: 'vui tươi, sôi động', bpm: 'fast' },
    ],

    /* ============================================
       STYLE PRESETS — Gợi ý combo theo phong cách
       ============================================ */
    stylePresets: {
        'elegant-classic': {
            name: 'Thanh Lịch Cổ Điển',
            photoSets: ['korean-studio-white', 'elegant-black-gold'],
            icons: ['wax-seal', 'divider-svg', 'bouquet-1', 'frame-1', 'deco-divider'],
            elements: ['bride-frame', 'groom-frame', 'and-symbol'],
            music: 'beautiful-in-white',
            colors: ['gold', 'cream', 'white'],
        },
        'romantic-modern': {
            name: 'Lãng Mạn Hiện Đại',
            photoSets: ['modern-romantic', 'coral-minimalist'],
            icons: ['character-romantic', 'calen-heart', 'heart-icon', 'deco-1'],
            elements: ['love-story-ornament', 'small-flower', 'timeline-1', 'timeline-2', 'timeline-3', 'timeline-4'],
            music: 'thousand-years',
            colors: ['blush', 'coral', 'rose'],
        },
        'traditional-vietnamese': {
            name: 'Truyền Thống Việt Nam',
            photoSets: ['korean-studio-gray', 'viet-mem-mai'],
            icons: ['rong', 'phuong', 'chinese-happiness', 'double-happiness'],
            elements: ['heart-icon-el', 'and-symbol'],
            music: 'beautiful-in-white',
            colors: ['red', 'gold', 'cream'],
        },
        'cute-chibi': {
            name: 'Dễ Thương Chibi',
            photoSets: ['korean-studio-white', 'korean-studio-gray'],
            icons: ['couple-chibi', 'double-happiness', 'cherry-blossom', 'decorative-diamond', 'decorative-flowers'],
            elements: ['small-flower', 'small-element'],
            music: 'sugar',
            colors: ['red', 'pink', 'white'],
        },
        'sage-green-vintage': {
            name: 'Sage Green Vintage',
            photoSets: ['korean-studio-classic-beige', 'viet-green'],
            icons: ['wax-seal', 'bouquet-1', 'bouquet-2', 'divider-svg'],
            elements: ['sage-el-1', 'sage-el-2', 'sage-el-3', 'sage-el-4', 'sage-el-5', 'sage-el-6', 'leaf-left', 'leaf-right'],
            music: 'thousand-years',
            colors: ['sage', 'green', 'cream', 'white'],
        },
        'dark-luxury': {
            name: 'Sang Trọng Tối',
            photoSets: ['elegant-black-gold'],
            icons: ['wax-seal', 'frame-1', 'deco-divider', 'deco-element'],
            elements: ['bride-frame', 'groom-frame'],
            music: 'beautiful-in-white',
            colors: ['black', 'gold', 'navy'],
        },
        'fresh-green': {
            name: 'Xanh Lá Tươi Trẻ',
            photoSets: ['viet-green'],
            icons: ['bouquet-1', 'heart-icon', 'deco-1'],
            elements: ['leaf-left', 'leaf-right', 'small-flower', 'love-story-ornament'],
            music: 'sugar',
            colors: ['green', 'white', 'fresh'],
        },
    },
};

/* ============================================
   HELPER: Query functions
   ============================================ */

/** Tìm bộ ảnh phù hợp theo tags */
function findPhotoSets(tags) {
    return WEDDING_ASSET_CATALOG.photoSets.filter(set =>
        tags.some(t => set.tags.includes(t) || set.colors.includes(t) || set.matchPalettes.includes(t))
    );
}

/** Tìm icons phù hợp theo tags */
function findIcons(tags) {
    return WEDDING_ASSET_CATALOG.icons.filter(icon =>
        tags.some(t => icon.tags.includes(t))
    );
}

/** Tìm elements phù hợp theo tags */
function findElements(tags) {
    return WEDDING_ASSET_CATALOG.elements.filter(el =>
        tags.some(t => el.tags.includes(t))
    );
}

/** Lấy style preset theo tên */
function getStylePreset(styleName) {
    return WEDDING_ASSET_CATALOG.stylePresets[styleName] || null;
}

/** Tìm nhạc phù hợp theo mood */
function findMusic(tags) {
    return WEDDING_ASSET_CATALOG.music.filter(m =>
        tags.some(t => m.tags.includes(t))
    );
}
