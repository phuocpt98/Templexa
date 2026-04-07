/**
 * WEDDING_DATA — Single source of truth for all wedding template assets.
 * Merges: catalog.json + wedding-asset-catalog.js + shared-data.js
 *
 * Used by: thu-vien-hieu-ung.html, /gen-wedding, /gen-wedding-pro, /catalog-assets
 */

var WEDDING_DATA = {

    /* ============================================
       BACKGROUNDS
       ============================================ */
    backgrounds: {
        basePath: 'products/shared/images/wedding/backgrounds/',
        categories: [
            { id: 'envelope', name: 'Phong bì / Mở thiệp', tags: ['envelope', 'open', 'seal', 'ribbon'], folder: 'envelope/' },
            { id: 'floral-watercolor', name: 'Hoa Watercolor', tags: ['floral', 'watercolor', 'soft', 'pastel', 'romantic'], folder: 'floral-watercolor/' },
            { id: 'floral-lineart', name: 'Hoa Line Art', tags: ['floral', 'lineart', 'minimal', 'elegant'], folder: 'floral-lineart/' },
            { id: 'floral-photo', name: 'Hoa Thật / Photo', tags: ['floral', 'photo', 'realistic', 'arch'], folder: 'floral-photo/' },
            { id: 'traditional-red', name: 'Truyền Thống Đỏ', tags: ['traditional', 'red', 'gold', 'chinese'], folder: 'traditional-red/' },
            { id: 'traditional-vn', name: 'Truyền Thống Việt', tags: ['traditional', 'vietnamese', 'hy', 'lotus'], folder: 'traditional-vn/' },
            { id: 'sage-green', name: 'Sage Green', tags: ['sage', 'green', 'gold', 'botanical', 'vintage'], folder: 'sage-green/' },
            { id: 'greenery', name: 'Greenery / Lá Xanh', tags: ['green', 'leaf', 'natural', 'eucalyptus'], folder: 'greenery/' },
            { id: 'frame-ornament', name: 'Khung / Ornament', tags: ['frame', 'ornament', 'classic', 'border'], folder: 'frame-ornament/' },
            { id: 'luxury-fabric', name: 'Vải Sang Trọng', tags: ['luxury', 'fabric', 'silk', 'velvet', 'texture'], folder: 'luxury-fabric/' },
            { id: 'minimalist-clean', name: 'Tối Giản / Minimalist', tags: ['minimalist', 'clean', 'modern', 'simple'], folder: 'minimalist-clean/' }
        ],
        items: [
            { id: 'bg-floral-lineart-beige-corner-dual', file: 'floral-lineart/bg-floral-lineart-beige-corner-dual.webp', name: 'Hoa lineart beige goc doi', category: 'floral-lineart', tags: ['floral', 'lineart', 'beige', 'elegant', 'corner'], colors: ['beige', 'brown-light'], usage: ['hero-section', 'full-page'] },
            { id: 'bg-floral-lineart-arch-craft-paper', file: 'floral-lineart/bg-floral-lineart-arch-craft-paper.webp', name: 'Arch lineart hoa giay craft', category: 'floral-lineart', tags: ['floral', 'lineart', 'arch', 'craft', 'minimalist'], colors: ['cream', 'beige'], usage: ['hero-section', 'cover'] },
            { id: 'bg-sage-green-frame-leaf-lineart', file: 'sage-green/bg-sage-green-frame-leaf-lineart.webp', name: 'Khung sage la vang lineart', category: 'sage-green', tags: ['sage', 'green', 'frame', 'lineart', 'gold'], colors: ['sage', 'gold', 'white'], usage: ['hero-section', 'full-page'] },
            { id: 'bg-sage-green-hexagon-floral-lineart', file: 'sage-green/bg-sage-green-hexagon-floral-lineart.webp', name: 'Khung sage hoa lineart hexagon', category: 'sage-green', tags: ['sage', 'green', 'hexagon', 'floral', 'lineart'], colors: ['sage', 'white'], usage: ['hero-section', 'cover'] },
            { id: 'bg-traditional-red-christmas-floral', file: 'traditional-red/bg-traditional-red-christmas-floral.webp', name: 'Goc hoa do tram thong noel', category: 'traditional-red', tags: ['traditional', 'red', 'floral', 'christmas', 'gold'], colors: ['red', 'gold', 'green'], usage: ['hero-section', 'cover'] },
            { id: 'bg-envelope-closed-wax-heart', file: 'envelope/bg-envelope-closed-wax-heart.webp', name: 'Phong bi dong wax seal tim', category: 'envelope', tags: ['envelope', 'closed', 'wax-seal', 'cream', 'heart'], colors: ['cream', 'burgundy'], usage: ['envelope-section', 'cover'] },
            { id: 'bg-envelope-open-burgundy-card', file: 'envelope/bg-envelope-open-burgundy-card.webp', name: 'Phong bi mo burgundy', category: 'envelope', tags: ['envelope', 'open', 'burgundy', 'elegant'], colors: ['burgundy', 'cream'], usage: ['envelope-section'] },
            { id: 'bg-envelope-red-lace-scallop-open', file: 'envelope/bg-envelope-red-lace-scallop-open.webp', name: 'Phong bi do ren scallop', category: 'envelope', tags: ['envelope', 'red', 'lace', 'scallop', 'traditional'], colors: ['red', 'cream'], usage: ['envelope-section', 'cover'] },
            { id: 'bg-envelope-closed-burgundy-wax', file: 'envelope/bg-envelope-closed-burgundy-wax.webp', name: 'Phong bi do wax seal hoa', category: 'envelope', tags: ['envelope', 'closed', 'burgundy', 'wax-seal'], colors: ['burgundy', 'dark'], usage: ['envelope-section', 'cover'] },
            { id: 'bg-envelope-open-burgundy-lace', file: 'envelope/bg-envelope-open-burgundy-lace.webp', name: 'Phong bi mo burgundy lace card', category: 'envelope', tags: ['envelope', 'open', 'burgundy', 'lace', 'elegant'], colors: ['burgundy', 'cream'], usage: ['envelope-section'] },
            { id: 'bg-envelope-closed-sage-white-floral', file: 'envelope/bg-envelope-closed-sage-white-floral.webp', name: 'Phong bi dong sage hoa trang', category: 'envelope', tags: ['envelope', 'closed', 'sage', 'white', 'floral'], colors: ['sage', 'cream', 'white'], usage: ['envelope-section', 'cover'] },
            { id: 'bg-envelope-open-sage-lace-green', file: 'envelope/bg-envelope-open-sage-lace-green.webp', name: 'Phong bi mo sage lace xanh', category: 'envelope', tags: ['envelope', 'open', 'sage', 'green', 'lace', 'floral'], colors: ['sage', 'green', 'cream'], usage: ['envelope-section'] },
            { id: 'bg-frame-ornament-green-classic-deco', file: 'frame-ornament/bg-frame-ornament-green-classic-deco.webp', name: 'Khung ornament xanh classic', category: 'frame-ornament', tags: ['frame', 'ornament', 'green', 'classic', 'elegant'], colors: ['green', 'cream'], usage: ['hero-section', 'cover', 'full-page'] },
            { id: 'bg-frame-ornament-red-tulip-vintage', file: 'frame-ornament/bg-frame-ornament-red-tulip-vintage.webp', name: 'Khung ornament hoa do vintage', category: 'frame-ornament', tags: ['frame', 'ornament', 'red', 'floral', 'vintage'], colors: ['red', 'gold', 'cream'], usage: ['hero-section', 'cover'] },
            { id: 'bg-frame-ornament-gold-marble-arch', file: 'frame-ornament/bg-frame-ornament-gold-marble-arch.webp', name: 'Khung vang marble arch doi', category: 'frame-ornament', tags: ['frame', 'gold', 'marble', 'arch', 'elegant'], colors: ['gold', 'cream', 'beige'], usage: ['hero-section', 'event-section'] },
            { id: 'bg-luxury-fabric-emboss-wax-brown', file: 'luxury-fabric/bg-luxury-fabric-emboss-wax-brown.webp', name: 'Giay emboss wax seal nau', category: 'luxury-fabric', tags: ['luxury', 'fabric', 'emboss', 'wax-seal', 'texture'], colors: ['white', 'brown'], usage: ['envelope-section', 'cover'] },
            { id: 'bg-luxury-fabric-white-silk-gold', file: 'luxury-fabric/bg-luxury-fabric-white-silk-gold.webp', name: 'Vai lua trang la vang nhe', category: 'luxury-fabric', tags: ['luxury', 'fabric', 'silk', 'white', 'gold', 'soft'], colors: ['white', 'gold'], usage: ['hero-section', 'cover'] },
            { id: 'bg-floral-watercolor-wreath-wildflower', file: 'floral-watercolor/bg-floral-watercolor-wreath-wildflower.webp', name: 'Vong hoa wildflower watercolor', category: 'floral-watercolor', tags: ['floral', 'watercolor', 'wreath', 'wildflower', 'romantic'], colors: ['pastel', 'pink', 'green'], usage: ['hero-section', 'full-page'] },
            { id: 'bg-floral-watercolor-corner-pastel-dual', file: 'floral-watercolor/bg-floral-watercolor-corner-pastel-dual.webp', name: 'Hoa watercolor pastel goc doi', category: 'floral-watercolor', tags: ['floral', 'watercolor', 'corner', 'pastel', 'soft'], colors: ['pastel', 'pink', 'cream'], usage: ['hero-section', 'calendar-section'] },
            { id: 'bg-floral-watercolor-blush-gold-veil', file: 'floral-watercolor/bg-floral-watercolor-blush-gold-veil.webp', name: 'Hoa blush voan gold la', category: 'floral-watercolor', tags: ['floral', 'watercolor', 'blush', 'gold', 'romantic'], colors: ['blush', 'gold', 'cream'], usage: ['hero-section', 'love-story-section'] },
            { id: 'bg-floral-watercolor-blue-orange-bold', file: 'floral-watercolor/bg-floral-watercolor-blue-orange-bold.webp', name: 'Hoa watercolor xanh cam dam', category: 'floral-watercolor', tags: ['floral', 'watercolor', 'blue', 'orange', 'bold'], colors: ['blue', 'orange', 'green'], usage: ['hero-section', 'event-section'] },
            { id: 'bg-floral-watercolor-boho-dried-oval', file: 'floral-watercolor/bg-floral-watercolor-boho-dried-oval.webp', name: 'Khung hoa boho kho oval', category: 'floral-watercolor', tags: ['floral', 'watercolor', 'boho', 'dried', 'oval'], colors: ['beige', 'brown', 'cream'], usage: ['hero-section', 'cover'] },
            { id: 'bg-floral-watercolor-blush-anemone', file: 'floral-watercolor/bg-floral-watercolor-blush-anemone.webp', name: 'Hoa watercolor blush doi nhe', category: 'floral-watercolor', tags: ['floral', 'watercolor', 'blush', 'anemone', 'soft'], colors: ['blush', 'pink-light', 'cream'], usage: ['hero-section', 'full-page'] },
            { id: 'bg-floral-watercolor-navy-circle', file: 'floral-watercolor/bg-floral-watercolor-navy-circle.webp', name: 'Xanh navy hoa watercolor frame', category: 'floral-watercolor', tags: ['floral', 'watercolor', 'navy', 'blue', 'pink'], colors: ['navy', 'blue', 'pink'], usage: ['hero-section', 'cover'] },
            { id: 'bg-floral-watercolor-navy-arch-gold', file: 'floral-watercolor/bg-floral-watercolor-navy-arch-gold.webp', name: 'Arch xanh navy hoa gold', category: 'floral-watercolor', tags: ['floral', 'watercolor', 'navy', 'arch', 'gold'], colors: ['navy', 'cream', 'gold'], usage: ['hero-section', 'cover'] },
            { id: 'bg-floral-watercolor-navy-arch-asym', file: 'floral-watercolor/bg-floral-watercolor-navy-arch-asym.webp', name: 'Arch navy hoa cam asymmetric', category: 'floral-watercolor', tags: ['floral', 'watercolor', 'navy', 'arch', 'asymmetric'], colors: ['navy', 'cream', 'blue'], usage: ['hero-section', 'cover'] },
            { id: 'bg-floral-watercolor-navy-savedate', file: 'floral-watercolor/bg-floral-watercolor-navy-savedate.webp', name: 'Save the date navy hoa', category: 'floral-watercolor', tags: ['floral', 'watercolor', 'navy', 'savedate'], colors: ['navy', 'cream', 'blue'], usage: ['calendar-section', 'countdown-section'] },
            { id: 'bg-greenery-eucalyptus-four-corner', file: 'greenery/bg-greenery-eucalyptus-four-corner.webp', name: 'Greenery eucalyptus 4 goc', category: 'greenery', tags: ['greenery', 'eucalyptus', 'watercolor', 'natural'], colors: ['green', 'white'], usage: ['hero-section', 'full-page'] },
            { id: 'bg-traditional-vn-hy-gold-ornament', file: 'traditional-vn/bg-traditional-vn-hy-gold-ornament.webp', name: 'Khung hy vang ornament', category: 'traditional-vn', tags: ['traditional', 'hy', 'gold', 'ornament', 'cream'], colors: ['gold', 'cream'], usage: ['hero-section', 'full-page'] },
            { id: 'bg-floral-photo-arch-pastel-ring', file: 'floral-photo/bg-floral-photo-arch-pastel-ring.webp', name: 'Arch hoa that pastel nhan', category: 'floral-photo', tags: ['floral', 'photo', 'arch', 'pastel', 'ring'], colors: ['pastel', 'pink', 'cream'], usage: ['hero-section', 'cover'] },
            { id: 'bg-floral-photo-arch-ring-gold', file: 'floral-photo/bg-floral-photo-arch-ring-gold.webp', name: 'Arch nhan cuoi gold lace', category: 'floral-photo', tags: ['floral', 'photo', 'arch', 'ring', 'gold', 'lace'], colors: ['gold', 'cream'], usage: ['hero-section', 'cover'] },
            { id: 'bg-minimalist-black-floral-shadow', file: 'minimalist-clean/bg-minimalist-black-floral-shadow.webp', name: 'Hoa den shadow co day', category: 'minimalist-clean', tags: ['minimalist', 'black', 'floral', 'shadow', 'modern'], colors: ['black', 'white', 'gray'], usage: ['hero-section', 'full-page'] },
            { id: 'bg-minimalist-nude-cover-lineart', file: 'minimalist-clean/bg-minimalist-nude-cover-lineart.webp', name: 'Cover nude lineart hoa cuoi', category: 'minimalist-clean', tags: ['minimalist', 'nude', 'lineart', 'cover', 'wedding'], colors: ['nude', 'brown', 'cream'], usage: ['cover', 'envelope-section'] },

            // Batch 2026-03-26 — Backgrounds
            { id: 'bg-floral-watercolor-rose-frame-petals', file: 'floral-watercolor/bg-floral-watercolor-rose-frame-petals.webp', name: 'Khung hoa hong watercolor canh hoa roi', category: 'floral-watercolor', tags: ['watercolor', 'floral', 'romantic', 'soft', 'frame'], colors: ['pink', 'blush', 'sage', 'cream'], usage: ['hero-section', 'full-page', 'cover'] },
            { id: 'bg-frame-ornament-gold-baroque-crown', file: 'frame-ornament/bg-frame-ornament-gold-baroque-crown.webp', name: 'Khung vang baroque vuong mien', category: 'frame-ornament', tags: ['ornament', 'classic', 'luxury', 'formal', 'baroque'], colors: ['gold', 'cream', 'ivory'], usage: ['hero-section', 'full-page', 'cover'] },
            { id: 'bg-floral-photo-petals-pink-soft', file: 'floral-photo/bg-floral-photo-petals-pink-soft.webp', name: 'Nen canh hoa hong pastel photo', category: 'floral-photo', tags: ['floral', 'photo', 'soft', 'romantic', 'petals'], colors: ['pink', 'blush', 'cream', 'nude'], usage: ['full-page', 'section-background'] },
            { id: 'bg-traditional-red-dragon-phoenix', file: 'traditional-red/bg-traditional-red-dragon-phoenix.webp', name: 'Nen truyen thong do rong phuong vang', category: 'traditional-red', tags: ['traditional', 'luxury', 'formal', 'ornament', 'dragon', 'phoenix'], colors: ['red', 'gold'], usage: ['hero-section', 'full-page', 'cover'] },
            { id: 'bg-floral-watercolor-blue-arch-couple', file: 'floral-watercolor/bg-floral-watercolor-blue-arch-couple.webp', name: 'Cong hoa xanh watercolor co dau chu re', category: 'floral-watercolor', tags: ['watercolor', 'floral', 'romantic', 'elegant', 'couple', 'arch'], colors: ['blue', 'cream', 'gold'], usage: ['hero-section', 'full-page', 'cover'] },

            // Batch 2026-03-31 — Backgrounds
            { id: 'bg-minimalist-lily-emboss-corner', file: 'minimalist-clean/bg-minimalist-lily-emboss-corner.webp', name: 'Hoa ly emboss trang 4 goc', category: 'minimalist-clean', tags: ['minimalist', 'emboss', 'floral', 'lily', 'white', 'elegant', 'clean'], colors: ['white', 'cream', 'ivory'], usage: ['hero-section', 'full-page', 'section-background'] },
            { id: 'bg-minimalist-rose-emboss-vine', file: 'minimalist-clean/bg-minimalist-rose-emboss-vine.webp', name: 'Hoa hong emboss day leo trang', category: 'minimalist-clean', tags: ['minimalist', 'emboss', 'floral', 'rose', 'vine', 'white', 'elegant'], colors: ['white', 'cream', 'ivory'], usage: ['hero-section', 'full-page', 'cover', 'section-background'] }
        ]
    },

    /* ============================================
       ICONS — Icon & decorative elements
       ============================================ */
    icons: {
        basePath: 'products/shared/images/wedding/icons/',
        items: [
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

            // Canva — Hoa tiết truyền thống đỏ
            { id: 'couple-lineart-red', file: 'icons/couple-lineart-red.webp', name: 'Cặp đôi line art đỏ', tags: ['traditional', 'red', 'lineart', 'cute', 'chibi'], usage: ['envelope-center', 'hero-center', 'thankyou'] },
            { id: 'happiness-circle-gold', file: 'icons/happiness-circle-gold.webp', name: 'Chữ Hỷ tròn vàng gold', tags: ['traditional', 'gold', 'chinese', 'luxury'], usage: ['envelope-center', 'hero-center', 'section-header'] },
            { id: 'cupid-angel', file: 'icons/cupid-angel.webp', name: 'Thiên thần Cupid', tags: ['romantic', 'cute', 'red', 'lineart'], usage: ['scatter-deco', 'corner-deco'] },
            { id: 'double-happiness-red-heart', file: 'icons/double-happiness-red-heart.webp', name: 'Song Hỷ đỏ trái tim', tags: ['traditional', 'red', 'chinese', 'heart'], usage: ['envelope-center', 'section-header'] },
            { id: 'bouquet-lineart-red', file: 'icons/bouquet-lineart-red.webp', name: 'Bó hoa line art đỏ', tags: ['traditional', 'red', 'lineart', 'floral', 'elegant'], usage: ['section-deco', 'corner-deco', 'hero-deco'] },

            // Canva — Hoa tiết hoa lá watercolor
            { id: 'leaf-gray-lineart', file: 'icons/leaf-gray-lineart.webp', name: 'Lá xám line art', tags: ['minimal', 'gray', 'lineart', 'leaf', 'elegant'], usage: ['corner-deco', 'section-deco'] },
            { id: 'branch-brown-lineart', file: 'icons/branch-brown-lineart.webp', name: 'Cành hoa nâu line art', tags: ['vintage', 'brown', 'lineart', 'floral', 'elegant'], usage: ['corner-deco', 'header-deco'] },
            { id: 'leaf-gold-lineart', file: 'icons/leaf-gold-lineart.webp', name: 'Lá vàng gold line art', tags: ['luxury', 'gold', 'lineart', 'leaf', 'elegant'], usage: ['side-deco', 'section-deco'] },
            { id: 'flowers-watercolor-pastel', file: 'icons/flowers-watercolor-pastel.webp', name: 'Hoa watercolor pastel', tags: ['watercolor', 'pastel', 'soft', 'floral', 'romantic'], usage: ['section-deco', 'background-deco'] },
            { id: 'flower-vine-watercolor', file: 'icons/flower-vine-watercolor.webp', name: 'Dây hoa watercolor', tags: ['watercolor', 'pastel', 'vine', 'floral', 'romantic'], usage: ['side-deco', 'border-deco'] },
            { id: 'flower-branch-watercolor', file: 'icons/flower-branch-watercolor.webp', name: 'Cành hoa watercolor dọc', tags: ['watercolor', 'pastel', 'floral', 'vertical'], usage: ['side-deco', 'corner-deco'] },
            { id: 'flowers-scatter-watercolor', file: 'icons/flowers-scatter-watercolor.webp', name: 'Hoa rải watercolor', tags: ['watercolor', 'pastel', 'scatter', 'floral', 'soft'], usage: ['scatter-deco', 'background-deco'] },

            // Batch 2025-03 — Icons mới
            { id: 'couple-chibi-lineart-red', file: 'icons/couple-chibi-lineart-red.webp', name: 'Cap doi chibi lineart do', tags: ['chibi', 'cute', 'lineart', 'red', 'couple'], usage: ['envelope-center', 'hero-center', 'thankyou'] },
            { id: 'hy-circle-brown-traditional', file: 'icons/hy-circle-brown-traditional.webp', name: 'Chu Hy tron nau truyen thong', tags: ['hy', 'traditional', 'brown', 'circle'], usage: ['envelope-center', 'hero-center', 'section-header'] },
            { id: 'cupid-lineart-red', file: 'icons/cupid-lineart-red.webp', name: 'Than Cupid lineart do', tags: ['cupid', 'lineart', 'red', 'romantic'], usage: ['scatter-deco', 'corner-deco'] },
            { id: 'bouquet-lineart-red-v2', file: 'icons/bouquet-lineart-red.webp', name: 'Bo hoa lineart do v2', tags: ['bouquet', 'lineart', 'red', 'floral'], usage: ['section-deco', 'corner-deco'] },
            { id: 'hy-red-heart-bold', file: 'icons/hy-red-heart-bold.webp', name: 'Chu Hy do tim heart', tags: ['hy', 'red', 'heart', 'traditional', 'bold'], usage: ['envelope-center', 'hero-center'] },
            { id: 'champagne-glasses-vintage-brown', file: 'icons/champagne-glasses-vintage-brown.webp', name: 'Ly champagne vintage nau', tags: ['champagne', 'vintage', 'brown', 'elegant'], usage: ['section-deco', 'thankyou'] },
            { id: 'leaf-branch-lineart-beige', file: 'icons/leaf-branch-lineart-beige.webp', name: 'Canh la lineart beige', tags: ['leaf', 'lineart', 'beige', 'minimalist'], usage: ['corner-deco', 'section-deco'] },
            { id: 'leaf-hanging-lineart-gold', file: 'icons/leaf-hanging-lineart-gold.webp', name: 'La roi lineart vang', tags: ['leaf', 'lineart', 'gold', 'minimalist'], usage: ['side-deco', 'corner-deco'] },
            { id: 'flower-single-watercolor-orange', file: 'icons/flower-single-watercolor-orange.webp', name: 'Hoa don watercolor cam', tags: ['flower', 'watercolor', 'orange', 'delicate'], usage: ['scatter-deco', 'corner-deco'] },
            { id: 'bouquet-small-watercolor-pastel', file: 'icons/bouquet-small-watercolor-pastel.webp', name: 'Bo hoa nho watercolor pastel', tags: ['bouquet', 'watercolor', 'pastel', 'pink'], usage: ['corner-deco', 'section-deco'] },
            { id: 'garland-watercolor-pastel-vertical', file: 'icons/garland-watercolor-pastel-vertical.webp', name: 'Day hoa watercolor pastel doc', tags: ['garland', 'watercolor', 'pastel', 'vertical'], usage: ['side-deco', 'border-deco'] },
            { id: 'flower-single-watercolor-pink-large', file: 'icons/flower-single-watercolor-pink-large.webp', name: 'Hoa don watercolor hong lon', tags: ['flower', 'watercolor', 'pink', 'large'], usage: ['corner-deco', 'hero-deco'] },
            { id: 'bouquet-christmas-pine-red', file: 'icons/bouquet-christmas-pine-red.webp', name: 'Bo hoa noel thong do', tags: ['bouquet', 'christmas', 'pine', 'red', 'cotton'], usage: ['section-deco', 'corner-deco'] },
            { id: 'eucalyptus-lineart-gold', file: 'icons/eucalyptus-lineart-gold.webp', name: 'La eucalyptus lineart vang', tags: ['eucalyptus', 'lineart', 'gold', 'botanical'], usage: ['side-deco', 'corner-deco'] },
            { id: 'peony-red-vintage-botanical', file: 'icons/peony-red-vintage-botanical.webp', name: 'Hoa mau don do vintage', tags: ['peony', 'red', 'vintage', 'botanical'], usage: ['section-deco', 'corner-deco'] },
            { id: 'blossom-branch-blush-watercolor', file: 'icons/blossom-branch-blush-watercolor.webp', name: 'Canh hoa blush watercolor nhe', tags: ['blossom', 'watercolor', 'blush', 'soft'], usage: ['corner-deco', 'side-deco'] },
            { id: 'leaf-floral-lineart-gold-light', file: 'icons/leaf-floral-lineart-gold-light.webp', name: 'La hoa lineart vang nhe', tags: ['leaf', 'floral', 'lineart', 'gold', 'light'], usage: ['side-deco', 'section-deco'] },
            { id: 'bougainvillea-white-photo', file: 'icons/bougainvillea-white-photo.webp', name: 'Hoa giay trang photo', tags: ['bougainvillea', 'white', 'photo', 'natural'], usage: ['corner-deco', 'scatter-deco'] },
            { id: 'sweet-pea-white-bouquet', file: 'icons/sweet-pea-white-bouquet.webp', name: 'Bo hoa dau ngot trang', tags: ['sweet-pea', 'white', 'bouquet', 'elegant'], usage: ['section-deco', 'hero-deco'] },
            { id: 'tulip-red-striped-vintage', file: 'icons/tulip-red-striped-vintage.webp', name: 'Tulip do soc vintage', tags: ['tulip', 'red', 'striped', 'vintage'], usage: ['section-deco', 'corner-deco'] },
            { id: 'hydrangea-green-vintage', file: 'icons/hydrangea-green-vintage.webp', name: 'Hoa cam tu cau xanh vintage', tags: ['hydrangea', 'green', 'vintage', 'botanical'], usage: ['section-deco', 'corner-deco'] },
            { id: 'calla-lily-white-pair', file: 'icons/calla-lily-white-pair.webp', name: 'Hoa loa ken trang doi', tags: ['calla-lily', 'white', 'elegant', 'botanical'], usage: ['section-deco', 'corner-deco'] },
            { id: 'amaranthus-hanging-green-watercolor', file: 'icons/amaranthus-hanging-green-watercolor.webp', name: 'La truc rua watercolor xanh', tags: ['amaranthus', 'hanging', 'green', 'watercolor'], usage: ['side-deco', 'floating-deco'] },
            { id: 'peony-white-cluster-photo', file: 'icons/peony-white-cluster-photo.webp', name: 'Cum hoa mau don trang', tags: ['peony', 'white', 'cluster', 'photo', 'elegant'], usage: ['hero-deco', 'section-deco'] },
            { id: 'flower-small-lineart-gray', file: 'icons/flower-small-lineart-gray.webp', name: 'Hoa nho lineart xam don', tags: ['flower', 'lineart', 'gray', 'minimalist'], usage: ['scatter-deco', 'inline-icon'] },
            { id: 'plumeria-black-3d-shadow', file: 'icons/plumeria-black-3d-shadow.webp', name: 'Hoa dai 3D den bong', tags: ['plumeria', 'black', '3d', 'bold', 'modern'], usage: ['corner-deco', 'hero-deco'] },
            { id: 'floral-branch-lineart-green-dark', file: 'icons/floral-branch-lineart-green-dark.webp', name: 'Canh hoa lineart xanh dam', tags: ['floral', 'lineart', 'green', 'botanical'], usage: ['side-deco', 'corner-deco'] },
            { id: 'leaf-round-watercolor-sage', file: 'icons/leaf-round-watercolor-sage.webp', name: 'La tron watercolor sage', tags: ['leaf', 'watercolor', 'sage', 'botanical'], usage: ['corner-deco', 'scatter-deco'] },
            { id: 'leaf-long-watercolor-green', file: 'icons/leaf-long-watercolor-green.webp', name: 'La dai watercolor xanh tuoi', tags: ['leaf', 'watercolor', 'green', 'fresh'], usage: ['side-deco', 'corner-deco'] },
            { id: 'vine-round-leaf-watercolor-mint', file: 'icons/vine-round-leaf-watercolor-mint.webp', name: 'Day la tron watercolor mint', tags: ['vine', 'watercolor', 'mint', 'botanical'], usage: ['side-deco', 'floating-deco'] },
            { id: 'bouquet-small-watercolor-pink-purple', file: 'icons/bouquet-small-watercolor-pink-purple.webp', name: 'Bo hoa nho watercolor hong tim', tags: ['bouquet', 'watercolor', 'pink', 'purple'], usage: ['corner-deco', 'scatter-deco'] },
            { id: 'hydrangea-pink-bouquet-vintage', file: 'icons/hydrangea-pink-bouquet-vintage.webp', name: 'Bo hoa cam tu cau hong vintage', tags: ['hydrangea', 'pink', 'bouquet', 'vintage'], usage: ['section-deco', 'hero-deco'] },
            { id: 'lily-white-bouquet-botanical', file: 'icons/lily-white-bouquet-botanical.webp', name: 'Bo hoa lily trang', tags: ['lily', 'white', 'bouquet', 'botanical'], usage: ['section-deco', 'corner-deco'] },

            // Batch 2026-03-26 — Floral icons
            { id: 'peony-watercolor-pink', file: 'icons/peony-watercolor-pink.webp', name: 'Hoa mau don hong watercolor', tags: ['watercolor', 'floral', 'pink', 'romantic'], usage: ['between-names', 'section-deco', 'corner-deco'] },
            { id: 'rose-watercolor-red', file: 'icons/rose-watercolor-red.webp', name: 'Hoa hong do watercolor', tags: ['watercolor', 'floral', 'red', 'classic'], usage: ['between-names', 'section-deco'] },
            { id: 'lavender-watercolor', file: 'icons/lavender-watercolor.webp', name: 'Hoa oai huong watercolor', tags: ['watercolor', 'floral', 'lavender', 'soft'], usage: ['section-deco', 'corner-deco'] },
            { id: 'bouquet-lineart', file: 'icons/bouquet-lineart.webp', name: 'Bo hoa lineart', tags: ['lineart', 'floral', 'elegant', 'romantic'], usage: ['between-names', 'section-deco'] },
            { id: 'peony-lineart', file: 'icons/peony-lineart.webp', name: 'Hoa mau don lineart', tags: ['lineart', 'floral', 'elegant'], usage: ['between-names', 'section-deco'] },
            { id: 'wildflower-lineart', file: 'icons/wildflower-lineart.webp', name: 'Hoa dong noi lineart', tags: ['lineart', 'floral', 'natural'], usage: ['section-deco', 'corner-deco'] },
            { id: 'rose-gold', file: 'icons/rose-gold.webp', name: 'Hoa hong vang gold', tags: ['gold', 'floral', 'luxury'], usage: ['section-deco', 'corner-deco'] },
            { id: 'laurel-wreath-gold', file: 'icons/laurel-wreath-gold.webp', name: 'Vong nguyet que vang', tags: ['gold', 'ornament', 'elegant', 'classic'], usage: ['hero-center', 'section-header'] },
            { id: 'olive-branch-gold', file: 'icons/olive-branch-gold.webp', name: 'Canh olive vang', tags: ['gold', 'botanical', 'elegant'], usage: ['side-deco', 'corner-deco'] },

            // Batch 2026-03-26 — Wedding symbols
            { id: 'wedding-rings-gold', file: 'icons/wedding-rings-gold.webp', name: 'Nhan cuoi doi vang', tags: ['gold', 'classic', 'romantic'], usage: ['inline-icon', 'section-deco'] },
            { id: 'heart-wings-red', file: 'icons/heart-wings-red.webp', name: 'Trai tim co canh', tags: ['red', 'romantic', 'love'], usage: ['inline-icon', 'section-deco'] },
            { id: 'wedding-bells-gold', file: 'icons/wedding-bells-gold.webp', name: 'Chuong cuoi vang', tags: ['gold', 'classic', 'celebration'], usage: ['inline-icon', 'section-deco'] },
            { id: 'champagne-toast', file: 'icons/champagne-toast.webp', name: 'Ly champagne chuc mung', tags: ['gold', 'celebration', 'elegant'], usage: ['inline-icon', 'event-section'] },
            { id: 'wedding-cake', file: 'icons/wedding-cake.webp', name: 'Banh cuoi 3 tang', tags: ['cream', 'elegant', 'classic'], usage: ['inline-icon', 'event-section'] },
            { id: 'church-wedding', file: 'icons/church-wedding.webp', name: 'Nha tho cuoi', tags: ['classic', 'elegant', 'formal'], usage: ['inline-icon', 'event-section'] },
            { id: 'love-letter-envelope', file: 'icons/love-letter-envelope.webp', name: 'Thu tinh phong bi', tags: ['cream', 'romantic', 'vintage'], usage: ['inline-icon', 'envelope-section'] },
            { id: 'heart-lock-key', file: 'icons/heart-lock-key.webp', name: 'Khoa va chia khoa tinh yeu', tags: ['gold', 'romantic', 'vintage'], usage: ['inline-icon', 'section-deco'] },
            { id: 'infinity-heart-red', file: 'icons/infinity-heart-red.webp', name: 'Vo cuc trai tim', tags: ['red', 'romantic', 'love'], usage: ['inline-icon', 'between-names'] },

            // Batch 2026-03-26 — Wax seals & stamps
            { id: 'wax-seal-heart-red', file: 'icons/wax-seal-heart-red.webp', name: 'Dau sap do trai tim', tags: ['red', 'vintage', 'elegant'], usage: ['envelope-seal', 'section-deco'] },
            { id: 'wax-seal-wreath-gold', file: 'icons/wax-seal-wreath-gold.webp', name: 'Dau sap vang vong hoa', tags: ['gold', 'vintage', 'luxury'], usage: ['envelope-seal', 'section-deco'] },
            { id: 'wax-seal-love-burgundy', file: 'icons/wax-seal-love-burgundy.webp', name: 'Dau sap burgundy Love', tags: ['burgundy', 'vintage', 'romantic'], usage: ['envelope-seal', 'section-deco'] },
            { id: 'stamp-vintage-heart', file: 'icons/stamp-vintage-heart.webp', name: 'Tem vintage trai tim', tags: ['vintage', 'cream', 'romantic'], usage: ['envelope-seal', 'scatter-deco'] },
            { id: 'badge-laurel-gold', file: 'icons/badge-laurel-gold.webp', name: 'Huy hieu vong nguyet que', tags: ['gold', 'classic', 'elegant'], usage: ['section-header', 'hero-center'] },

            // Batch 2026-03-26 — Dividers
            { id: 'divider-roses-pink', file: 'icons/divider-roses-pink.webp', name: 'Divider hoa hong', tags: ['watercolor', 'floral', 'pink', 'soft'], usage: ['section-divider'] },
            { id: 'divider-leaves-green', file: 'icons/divider-leaves-green.webp', name: 'Divider la xanh', tags: ['botanical', 'green', 'natural'], usage: ['section-divider'] },
            { id: 'divider-lavender', file: 'icons/divider-lavender.webp', name: 'Divider hoa oai huong', tags: ['floral', 'lavender', 'soft'], usage: ['section-divider'] },
            { id: 'divider-scrollwork-gold', file: 'icons/divider-scrollwork-gold.webp', name: 'Divider scrollwork vang', tags: ['gold', 'ornament', 'classic'], usage: ['section-divider'] },
            { id: 'divider-art-deco', file: 'icons/divider-art-deco.webp', name: 'Divider art deco', tags: ['geometric', 'modern', 'elegant'], usage: ['section-divider'] },
            { id: 'divider-flourish-brown', file: 'icons/divider-flourish-brown.webp', name: 'Divider flourish nau', tags: ['vintage', 'ornament', 'brown'], usage: ['section-divider'] },
            { id: 'divider-heart-minimal', file: 'icons/divider-heart-minimal.webp', name: 'Divider trai tim minimal', tags: ['minimalist', 'romantic', 'soft'], usage: ['section-divider'] },
            { id: 'divider-diamonds', file: 'icons/divider-diamonds.webp', name: 'Divider kim cuong', tags: ['minimalist', 'elegant', 'geometric'], usage: ['section-divider'] },
            { id: 'divider-dots-dashes', file: 'icons/divider-dots-dashes.webp', name: 'Divider cham gach', tags: ['minimalist', 'elegant', 'decorative'], usage: ['section-divider'] },

            // Batch 2026-03-26 — Utility icons
            { id: 'calendar-heart-lineart', file: 'icons/calendar-heart-lineart.webp', name: 'Lich trai tim', tags: ['lineart', 'brown', 'elegant'], usage: ['inline-icon', 'event-section'] },
            { id: 'clock-pocket-vintage', file: 'icons/clock-pocket-vintage.webp', name: 'Dong ho bao tui', tags: ['lineart', 'brown', 'vintage'], usage: ['inline-icon', 'event-section'] },
            { id: 'location-heart-lineart', file: 'icons/location-heart-lineart.webp', name: 'Vi tri trai tim', tags: ['lineart', 'brown', 'elegant'], usage: ['inline-icon', 'event-section'] },
            { id: 'phone-elegant-lineart', file: 'icons/phone-elegant-lineart.webp', name: 'Dien thoai', tags: ['lineart', 'brown', 'modern'], usage: ['inline-icon'] },
            { id: 'envelope-floral-lineart', file: 'icons/envelope-floral-lineart.webp', name: 'Phong bi hoa', tags: ['lineart', 'brown', 'floral'], usage: ['inline-icon', 'envelope-section'] },
            { id: 'music-heart-lineart', file: 'icons/music-heart-lineart.webp', name: 'Not nhac trai tim', tags: ['lineart', 'brown', 'romantic'], usage: ['inline-icon', 'music-toggle'] },
            { id: 'camera-vintage-lineart', file: 'icons/camera-vintage-lineart.webp', name: 'May anh vintage', tags: ['lineart', 'brown', 'vintage'], usage: ['inline-icon'] },
            { id: 'gift-box-lineart', file: 'icons/gift-box-lineart.webp', name: 'Hop qua no', tags: ['lineart', 'brown', 'celebration'], usage: ['inline-icon'] },
            { id: 'rsvp-card-lineart', file: 'icons/rsvp-card-lineart.webp', name: 'RSVP xac nhan', tags: ['lineart', 'brown', 'formal'], usage: ['inline-icon'] },

            // Batch 2026-03-26 — Traditional Vietnamese
            { id: 'lotus-pink-top', file: 'icons/lotus-pink-top.webp', name: 'Hoa sen hong top', tags: ['watercolor', 'floral', 'pink', 'traditional'], usage: ['section-deco', 'hero-deco'] },
            { id: 'lotus-lineart-gold', file: 'icons/lotus-lineart-gold.webp', name: 'Hoa sen lineart vang', tags: ['lineart', 'gold', 'traditional'], usage: ['section-deco', 'inline-icon'] },
            { id: 'lotus-pink-side', file: 'icons/lotus-pink-side.webp', name: 'Hoa sen hong canh', tags: ['floral', 'pink', 'traditional'], usage: ['section-deco', 'corner-deco'] },
            { id: 'phoenix-red-gold', file: 'icons/phoenix-red-gold.webp', name: 'Phuong hoang do vang', tags: ['traditional', 'red', 'gold', 'luxury'], usage: ['hero-deco', 'section-deco'] },
            { id: 'dragon-gold', file: 'icons/dragon-gold.webp', name: 'Rong vang', tags: ['traditional', 'gold', 'luxury'], usage: ['hero-deco', 'section-deco'] },
            { id: 'cloud-traditional-gold', file: 'icons/cloud-traditional-gold.webp', name: 'May truyen thong vang', tags: ['traditional', 'gold', 'lineart'], usage: ['scatter-deco', 'background-deco'] },
            { id: 'betel-areca-traditional', file: 'icons/betel-areca-traditional.webp', name: 'Trau cau', tags: ['traditional', 'green', 'natural'], usage: ['section-deco', 'inline-icon'] },
            { id: 'double-happiness-red', file: 'icons/double-happiness-red.webp', name: 'Chu Song Hy', tags: ['traditional', 'red', 'gold', 'formal'], usage: ['hero-center', 'section-header'] },
            { id: 'lantern-red-gold', file: 'icons/lantern-red-gold.webp', name: 'Den long do', tags: ['traditional', 'red', 'gold'], usage: ['section-deco', 'scatter-deco'] },

            // Batch 2026-03-26 — Chibi couples
            { id: 'chibi-couple-western', file: 'icons/chibi-couple-western.webp', name: 'Chibi co dau chu re Tay', tags: ['chibi', 'cute', 'romantic', 'modern'], usage: ['hero-center', 'cover-header'] },
            { id: 'chibi-couple-pastel', file: 'icons/chibi-couple-pastel.webp', name: 'Chibi co dau chu re pastel', tags: ['chibi', 'cute', 'pastel', 'romantic'], usage: ['hero-center', 'cover-header'] },
            { id: 'chibi-couple-floral-arch', file: 'icons/chibi-couple-floral-arch.webp', name: 'Chibi co dau duoi cong hoa', tags: ['chibi', 'cute', 'floral', 'romantic'], usage: ['hero-center', 'cover-header'] },
            { id: 'chibi-couple-aodai-red', file: 'icons/chibi-couple-aodai-red.webp', name: 'Chibi ao dai do xanh', tags: ['chibi', 'cute', 'traditional', 'red'], usage: ['hero-center', 'cover-header'] },
            { id: 'chibi-couple-aodai-tea', file: 'icons/chibi-couple-aodai-tea.webp', name: 'Chibi ao dai tra dao', tags: ['chibi', 'cute', 'traditional', 'red'], usage: ['hero-center', 'cover-header'] },
            { id: 'chibi-couple-aodai-lotus', file: 'icons/chibi-couple-aodai-lotus.webp', name: 'Chibi ao dai sen', tags: ['chibi', 'cute', 'traditional', 'cream'], usage: ['hero-center', 'cover-header'] },
            { id: 'chibi-couple-chinese', file: 'icons/chibi-couple-chinese.webp', name: 'Chibi co dau Trung Hoa', tags: ['chibi', 'cute', 'traditional', 'red'], usage: ['hero-center', 'cover-header'] },
            { id: 'chibi-couple-double-happiness', file: 'icons/chibi-couple-double-happiness.webp', name: 'Chibi Song Hy Trung Hoa', tags: ['chibi', 'cute', 'traditional', 'red'], usage: ['hero-center', 'cover-header'] },
            { id: 'chibi-couple-hanbok', file: 'icons/chibi-couple-hanbok.webp', name: 'Chibi hanbok Han Quoc', tags: ['chibi', 'cute', 'traditional', 'pastel'], usage: ['hero-center', 'cover-header'] },

            // Gate / Arch
            { id: 'gate-iron-floral-watercolor', file: 'icons/gate-iron-floral-watercolor.webp', name: 'Cong sat hoa watercolor', tags: ['gate', 'iron', 'floral', 'watercolor', 'garden', 'green'], usage: ['envelope-section', 'decoration'] },

            // 3D Glass White
            { id: 'glass-white-wedding-rings', file: 'icons/glass-white-wedding-rings.webp', name: 'Glass White - Nhan cuoi', tags: ['glass', 'white', 'elegant', '3d'], usage: ['inline-icon', 'section-deco'] },
            { id: 'glass-white-heart', file: 'icons/glass-white-heart.webp', name: 'Glass White - Trai tim', tags: ['glass', 'white', 'elegant', '3d'], usage: ['inline-icon', 'section-deco'] },
            { id: 'glass-white-flower', file: 'icons/glass-white-flower.webp', name: 'Glass White - Hoa', tags: ['glass', 'white', 'elegant', '3d', 'floral'], usage: ['inline-icon', 'section-deco'] },
            { id: 'glass-white-cake', file: 'icons/glass-white-cake.webp', name: 'Glass White - Banh cuoi', tags: ['glass', 'white', 'elegant', '3d'], usage: ['inline-icon', 'section-deco'] },
            { id: 'glass-white-champagne', file: 'icons/glass-white-champagne.webp', name: 'Glass White - Ly champagne', tags: ['glass', 'white', 'elegant', '3d'], usage: ['inline-icon', 'section-deco'] },
            { id: 'glass-white-dress', file: 'icons/glass-white-dress.webp', name: 'Glass White - Vay cuoi', tags: ['glass', 'white', 'elegant', '3d'], usage: ['inline-icon', 'section-deco'] },
            { id: 'glass-white-invitation', file: 'icons/glass-white-invitation.webp', name: 'Glass White - Thiep moi', tags: ['glass', 'white', 'elegant', '3d'], usage: ['inline-icon', 'section-deco'] },
            { id: 'glass-white-gift', file: 'icons/glass-white-gift.webp', name: 'Glass White - Qua tang', tags: ['glass', 'white', 'elegant', '3d'], usage: ['inline-icon', 'section-deco'] },
            { id: 'glass-white-car', file: 'icons/glass-white-car.webp', name: 'Glass White - Xe hoa', tags: ['glass', 'white', 'elegant', '3d'], usage: ['inline-icon', 'section-deco'] },

            // 3D Glass Blush
            { id: 'glass-blush-wedding-rings', file: 'icons/glass-blush-wedding-rings.webp', name: 'Glass Blush - Nhan cuoi', tags: ['glass', 'blush', 'pink', 'romantic', '3d'], usage: ['inline-icon', 'section-deco'] },
            { id: 'glass-blush-heart-pink', file: 'icons/glass-blush-heart-pink.webp', name: 'Glass Blush - Trai tim hong', tags: ['glass', 'blush', 'pink', 'romantic', '3d'], usage: ['inline-icon', 'section-deco'] },
            { id: 'glass-blush-flower', file: 'icons/glass-blush-flower.webp', name: 'Glass Blush - Hoa', tags: ['glass', 'blush', 'pink', 'romantic', '3d', 'floral'], usage: ['inline-icon', 'section-deco'] },
            { id: 'glass-blush-cake', file: 'icons/glass-blush-cake.webp', name: 'Glass Blush - Banh cuoi', tags: ['glass', 'blush', 'pink', 'romantic', '3d'], usage: ['inline-icon', 'section-deco'] },
            { id: 'glass-blush-champagne', file: 'icons/glass-blush-champagne.webp', name: 'Glass Blush - Ly champagne', tags: ['glass', 'blush', 'pink', 'romantic', '3d'], usage: ['inline-icon', 'section-deco'] },
            { id: 'glass-blush-dress', file: 'icons/glass-blush-dress.webp', name: 'Glass Blush - Vay cuoi', tags: ['glass', 'blush', 'pink', 'romantic', '3d'], usage: ['inline-icon', 'section-deco'] },
            { id: 'glass-blush-gift', file: 'icons/glass-blush-gift.webp', name: 'Glass Blush - Qua tang', tags: ['glass', 'blush', 'pink', 'romantic', '3d'], usage: ['inline-icon', 'section-deco'] },
            { id: 'glass-blush-car', file: 'icons/glass-blush-car.webp', name: 'Glass Blush - Xe hoa', tags: ['glass', 'blush', 'pink', 'romantic', '3d'], usage: ['inline-icon', 'section-deco'] },

            // Neon
            { id: 'neon-wedding-rings', file: 'icons/neon-wedding-rings.webp', name: 'Neon - Nhan cuoi', tags: ['neon', 'glow', 'modern', 'dark'], usage: ['inline-icon', 'section-deco'] },
            { id: 'neon-heart', file: 'icons/neon-heart.webp', name: 'Neon - Trai tim', tags: ['neon', 'glow', 'modern', 'dark'], usage: ['inline-icon', 'section-deco'] },
            { id: 'neon-champagne', file: 'icons/neon-champagne.webp', name: 'Neon - Ly champagne', tags: ['neon', 'glow', 'modern', 'dark'], usage: ['inline-icon', 'section-deco'] },
            { id: 'neon-cake', file: 'icons/neon-cake.webp', name: 'Neon - Banh cuoi', tags: ['neon', 'glow', 'modern', 'dark'], usage: ['inline-icon', 'section-deco'] },
            { id: 'neon-dress', file: 'icons/neon-dress.webp', name: 'Neon - Vay cuoi', tags: ['neon', 'glow', 'modern', 'dark'], usage: ['inline-icon', 'section-deco'] },
            { id: 'neon-suit', file: 'icons/neon-suit.webp', name: 'Neon - Vest chu re', tags: ['neon', 'glow', 'modern', 'dark'], usage: ['inline-icon', 'section-deco'] },
            { id: 'neon-bouquet', file: 'icons/neon-bouquet.webp', name: 'Neon - Hoa cuoi', tags: ['neon', 'glow', 'modern', 'dark', 'floral'], usage: ['inline-icon', 'section-deco'] },
            { id: 'neon-car', file: 'icons/neon-car.webp', name: 'Neon - Xe hoa', tags: ['neon', 'glow', 'modern', 'dark'], usage: ['inline-icon', 'section-deco'] },
            { id: 'neon-gift', file: 'icons/neon-gift.webp', name: 'Neon - Qua tang', tags: ['neon', 'glow', 'modern', 'dark'], usage: ['inline-icon', 'section-deco'] }
        ]
    },

    /* ============================================
       ELEMENTS — Trang trí section
       ============================================ */
    elements: {
        basePath: 'products/shared/images/',
        items: [
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
            // Sage green element set
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

            // Batch 2025-03 — Elements mới
            { id: 'corner-floral-lineart-beige', file: 'wedding-elements/corner-floral-lineart-beige.webp', name: 'Goc hoa lineart beige lon', tags: ['floral', 'lineart', 'beige', 'corner-deco'], usage: ['corner-deco', 'hero-deco'] },
            { id: 'garland-watercolor-pastel-diagonal', file: 'wedding-elements/garland-watercolor-pastel-diagonal.webp', name: 'Day hoa watercolor pastel cheo', tags: ['garland', 'watercolor', 'pastel', 'diagonal'], usage: ['corner-deco', 'section-deco'] },
            { id: 'corner-floral-watercolor-blue-pink', file: 'wedding-elements/corner-floral-watercolor-blue-pink.webp', name: 'Goc hoa watercolor xanh hong gold', tags: ['floral', 'watercolor', 'blue', 'pink', 'gold'], usage: ['corner-deco', 'hero-deco'] },
            { id: 'border-eucalyptus-purple-teal-top', file: 'wedding-elements/border-eucalyptus-purple-teal-top.webp', name: 'Dai la eucalyptus tim xanh top', tags: ['eucalyptus', 'watercolor', 'purple', 'teal'], usage: ['header-deco', 'section-divider'] },
            { id: 'wreath-floral-blue-flat', file: 'wedding-elements/wreath-floral-blue-flat.webp', name: 'Vong hoa xanh tim flat', tags: ['wreath', 'floral', 'blue', 'flat', 'cute'], usage: ['hero-center', 'section-header'] },
            { id: 'corner-rose-vine-watercolor-pink', file: 'wedding-elements/corner-rose-vine-watercolor-pink.webp', name: 'Day hoa hong leo goc watercolor', tags: ['rose', 'vine', 'watercolor', 'pink', 'corner'], usage: ['corner-deco', 'side-deco'] },

            // Batch 2026-03-26 — Frames & monograms
            { id: 'frame-circle-floral', file: 'wedding-elements/frame-circle-floral.webp', name: 'Khung tron hoa watercolor', tags: ['watercolor', 'floral', 'pink', 'frame'], usage: ['photo-frame', 'couple-frame'] },
            { id: 'frame-oval-gold-ornate', file: 'wedding-elements/frame-oval-gold-ornate.webp', name: 'Khung oval vang ornate', tags: ['gold', 'ornament', 'luxury', 'frame'], usage: ['photo-frame', 'couple-frame'] },
            { id: 'frame-hexagon-geometric', file: 'wedding-elements/frame-hexagon-geometric.webp', name: 'Khung luc giac geometric', tags: ['geometric', 'modern', 'minimalist', 'frame'], usage: ['photo-frame', 'couple-frame'] },
            { id: 'frame-diamond-floral', file: 'wedding-elements/frame-diamond-floral.webp', name: 'Khung kim cuong hoa goc', tags: ['floral', 'elegant', 'classic', 'frame'], usage: ['photo-frame', 'couple-frame'] },

            // Batch 2026-03-26 — Corner decorations
            { id: 'corner-roses-pink-watercolor', file: 'wedding-elements/corner-roses-pink-watercolor.webp', name: 'Goc hoa hong watercolor', tags: ['watercolor', 'floral', 'pink', 'romantic'], usage: ['corner-deco', 'hero-deco'] },
            { id: 'corner-eucalyptus-green', file: 'wedding-elements/corner-eucalyptus-green.webp', name: 'Goc la eucalyptus', tags: ['botanical', 'green', 'natural', 'sage'], usage: ['corner-deco', 'hero-deco'] },
            { id: 'corner-wildflower-colorful', file: 'wedding-elements/corner-wildflower-colorful.webp', name: 'Goc hoa dong noi', tags: ['watercolor', 'floral', 'colorful', 'natural'], usage: ['corner-deco', 'hero-deco'] },
            { id: 'corner-baroque-gold', file: 'wedding-elements/corner-baroque-gold.webp', name: 'Goc baroque vang', tags: ['gold', 'ornament', 'luxury', 'classic'], usage: ['corner-deco', 'hero-deco'] },
            { id: 'corner-art-nouveau-floral', file: 'wedding-elements/corner-art-nouveau-floral.webp', name: 'Goc art nouveau hoa', tags: ['ornament', 'floral', 'elegant', 'vintage'], usage: ['corner-deco'] },
            { id: 'corner-art-deco-gold', file: 'wedding-elements/corner-art-deco-gold.webp', name: 'Goc art deco vang', tags: ['geometric', 'gold', 'modern', 'elegant'], usage: ['corner-deco'] },

            // Batch 2026-03-26 — Full frames
            { id: 'frame-square-roses', file: 'wedding-elements/frame-square-roses.webp', name: 'Khung vuong hoa hong', tags: ['floral', 'pink', 'green', 'elegant'], usage: ['photo-frame', 'couple-frame'] },
            { id: 'frame-square-roses-gold', file: 'wedding-elements/frame-square-roses-gold.webp', name: 'Khung vuong hoa goc', tags: ['floral', 'pink', 'gold', 'classic'], usage: ['photo-frame', 'couple-frame'] },
            { id: 'frame-oval-vine-green', file: 'wedding-elements/frame-oval-vine-green.webp', name: 'Khung oval la xanh', tags: ['botanical', 'green', 'minimalist', 'natural'], usage: ['photo-frame', 'couple-frame'] },

            // Batch 2026-03-26 — Album cover
            { id: 'album-cover-couple-chibi', file: 'wedding-elements/album-cover-couple-chibi.webp', name: 'Bia album cuoi chibi', tags: ['cute', 'chibi', 'pink', 'romantic', 'floral'], usage: ['cover-background', 'popup-background'] },

            // Batch 2026-03-26 — Wreath
            { id: 'wreath-floral-photo-colorful', file: 'wedding-elements/wreath-floral-photo-colorful.webp', name: 'Vong hoa photo colorful', tags: ['floral', 'photo', 'colorful', 'natural'], usage: ['hero-center', 'photo-frame'] },

            // Batch 2026-03-31 — Chandelier
            { id: 'chandelier-crystal-gold', file: 'wedding-elements/chandelier-crystal-gold.webp', name: 'Den chum pha le vang', tags: ['chandelier', 'crystal', 'gold', 'luxury', 'elegant'], usage: ['hero-deco', 'section-header', 'decoration'] },

            // Batch 2026-04-07 — Heritage invitation #225
            { id: 'fountain-divider-heritage', file: 'wedding-elements/fountain-divider-heritage.webp', name: 'Divider dai phun nuoc heritage', tags: ['divider', 'heritage', 'classic', 'ornament'], usage: ['section-divider'] },
            { id: 'venue-illustration-heritage', file: 'wedding-elements/venue-illustration-heritage.webp', name: 'Minh hoa venue heritage', tags: ['illustration', 'venue', 'heritage', 'lineart'], usage: ['hero-deco', 'section-deco'] }
        ]
    },

    /* ============================================
       PHOTO COLLECTIONS — Bộ ảnh couple
       ============================================ */
    photoCollections: [
        {
            id: 'korean-studio-white',
            name: 'Korean Studio White',
            folder: 'products/shared/images/wedding/korean-studio-white/',
            count: 6,
            style: 'Korean studio, white/cream background, clean minimal',
            tags: ['korean', 'studio', 'white', 'cream', 'minimal', 'clean', 'bright', 'elegant', 'romantic', 'soft', 'indoor'],
            colors: ['white', 'cream', 'nude', 'pink-light'],
            mood: 'nhẹ nhàng, thanh lịch, lãng mạn',
            description: 'Bo anh couple phong cach Hàn Quốc, phong trang/kem, anh sang sach se. Phu hop thiep cuoi toi gian, hien dai.',
            hasPortrait: false,
            matchPalettes: ['classic-gold', 'blush-pink', 'dusty-rose', 'lavender', 'blue-romantic', 'burgundy'],
            files: {
                hero: 'couple_1.webp',
                envelope: 'couple_2.webp',
                story: ['couple_3.webp', 'couple_5.webp'],
                gallery: ['couple_4.webp', 'couple_5.webp', 'couple_6.webp'],
                thankyou: 'couple_6.webp'
            },
            usedBy: [179, 181, 182, 187],
            images: [
                { path: 'products/shared/images/wedding/korean-studio-white/couple_1.webp', description: 'Couple portrait 1 - nen trang' },
                { path: 'products/shared/images/wedding/korean-studio-white/couple_2.webp', description: 'Couple portrait 2 - nen trang' },
                { path: 'products/shared/images/wedding/korean-studio-white/couple_3.webp', description: 'Couple portrait 3 - nen trang' },
                { path: 'products/shared/images/wedding/korean-studio-white/couple_4.webp', description: 'Couple portrait 4 - nen trang' },
                { path: 'products/shared/images/wedding/korean-studio-white/couple_5.webp', description: 'Couple portrait 5 - nen trang' },
                { path: 'products/shared/images/wedding/korean-studio-white/couple_6.webp', description: 'Couple portrait 6 - nen trang' }
            ]
        },
        {
            id: 'korean-studio-classic-beige',
            name: 'Korean Studio Classic Beige',
            folder: 'products/shared/images/wedding/korean-studio-classic-beige/',
            count: 11,
            style: 'Korean studio, classic beige tone, warm elegant',
            tags: ['korean', 'studio', 'beige', 'classic', 'warm', 'elegant', 'vintage', 'indoor'],
            colors: ['beige', 'warm', 'cream', 'brown-light'],
            mood: 'cổ điển, ấm áp, trang trọng',
            description: 'Bo anh couple Hàn Quốc tong be am, da dang goc chup: doi, ca nhan, xe hoa, phao hoa. Phu hop thiep cuoi co dien, am cung.',
            hasPortrait: true,
            portraitFiles: { bride: 'nu.webp' },
            matchPalettes: ['classic-gold', 'sage-green', 'vintage', 'warm-neutral'],
            files: {
                hero: 'couple.webp',
                envelope: 'couple-doi.webp',
                story: ['couple-light.webp', 'kiss.webp'],
                gallery: ['couple-gray.webp', 'couple-gray-2.webp', 'couple --beige.webp', 'phao-hoa.webp', 'xe.webp'],
                background: 'light-rong.webp'
            },
            usedBy: [],
            images: [
                { path: 'products/shared/images/wedding/korean-studio-classic-beige/couple --beige.webp', description: 'Couple portrait - tong beige chinh' },
                { path: 'products/shared/images/wedding/korean-studio-classic-beige/couple-doi.webp', description: 'Couple doi dung - classic pose' },
                { path: 'products/shared/images/wedding/korean-studio-classic-beige/couple-gray-2.webp', description: 'Couple portrait - tong xam nhat' },
                { path: 'products/shared/images/wedding/korean-studio-classic-beige/couple-gray.webp', description: 'Couple portrait - tong xam' },
                { path: 'products/shared/images/wedding/korean-studio-classic-beige/couple-light.webp', description: 'Couple portrait - anh sang mem' },
                { path: 'products/shared/images/wedding/korean-studio-classic-beige/couple.webp', description: 'Couple portrait - chinh' },
                { path: 'products/shared/images/wedding/korean-studio-classic-beige/kiss.webp', description: 'Couple hon - romantic moment' },
                { path: 'products/shared/images/wedding/korean-studio-classic-beige/light-rong.webp', description: 'Anh sang rong - background use' },
                { path: 'products/shared/images/wedding/korean-studio-classic-beige/nu.webp', description: 'Portrait co dau - chan dung nu' },
                { path: 'products/shared/images/wedding/korean-studio-classic-beige/phao-hoa.webp', description: 'Couple voi phao hoa - celebration' },
                { path: 'products/shared/images/wedding/korean-studio-classic-beige/xe.webp', description: 'Xe hoa cuoi - wedding car' }
            ]
        },
        {
            id: 'korean-studio-gray',
            name: 'Korean Studio Gray',
            folder: 'products/shared/images/wedding/korean-studio-gray/',
            count: 4,
            style: 'Korean studio, gray background, modern moody',
            tags: ['korean', 'studio', 'gray', 'modern', 'moody', 'sophisticated', 'elegant', 'minimal', 'indoor', 'neutral'],
            colors: ['gray', 'neutral', 'cool'],
            mood: 'thanh lịch, tối giản, trung tính',
            description: 'Bo anh couple Hàn Quốc nen xam, hien dai, sang trong. Phu hop thiep cuoi dark theme hoac minimalist.',
            hasPortrait: false,
            matchPalettes: ['modern', 'blue', 'black-gold', 'burgundy', 'navy'],
            files: {
                hero: 'couple_1.webp',
                envelope: 'couple_3.webp',
                story: ['couple_2.webp', 'couple_4.webp'],
                gallery: ['couple_1.webp', 'couple_2.webp', 'couple_3.webp', 'couple_4.webp']
            },
            usedBy: [180, 181, 182, 186, 187],
            images: [
                { path: 'products/shared/images/wedding/korean-studio-gray/couple_1.webp', description: 'Couple portrait 1 - nen xam' },
                { path: 'products/shared/images/wedding/korean-studio-gray/couple_2.webp', description: 'Couple portrait 2 - nen xam' },
                { path: 'products/shared/images/wedding/korean-studio-gray/couple_3.webp', description: 'Couple portrait 3 - nen xam' },
                { path: 'products/shared/images/wedding/korean-studio-gray/couple_4.webp', description: 'Couple portrait 4 - nen xam' }
            ]
        },
        {
            id: 'coral-minimalist',
            name: 'Coral Minimalist',
            folder: 'products/shared/images/wedding/coral-minimalist/',
            count: 13,
            style: 'Minimalist coral pink, soft warm tones, studio clean',
            tags: ['coral', 'minimalist', 'pink', 'soft', 'warm', 'studio', 'clean', 'elegant', 'outdoor'],
            colors: ['coral', 'white', 'nude', 'blush'],
            mood: 'tối giản, thanh lịch, sạch sẽ',
            description: 'Bo anh phong cach toi gian mau coral/hong nhat, da dang: hero, album, story, event, portrait. Day du cho moi section cua thiep.',
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
                event: ['event_1.webp', 'event_2.webp']
            },
            usedBy: [185],
            images: [
                { path: 'products/shared/images/wedding/coral-minimalist/hero_bg.webp', description: 'Hero background - anh couple lon lam bia' },
                { path: 'products/shared/images/wedding/coral-minimalist/banner.webp', description: 'Banner anh couple - dung cho header/banner' },
                { path: 'products/shared/images/wedding/coral-minimalist/large_bg.webp', description: 'Anh lon lam background section' },
                { path: 'products/shared/images/wedding/coral-minimalist/bride.webp', description: 'Portrait co dau - chan dung nu' },
                { path: 'products/shared/images/wedding/coral-minimalist/groom.webp', description: 'Portrait chu re - chan dung nam' },
                { path: 'products/shared/images/wedding/coral-minimalist/story_1.webp', description: 'Love story anh 1 - cau chuyen tinh yeu' },
                { path: 'products/shared/images/wedding/coral-minimalist/story_2.webp', description: 'Love story anh 2 - cau chuyen tinh yeu' },
                { path: 'products/shared/images/wedding/coral-minimalist/story_3.webp', description: 'Love story anh 3 - cau chuyen tinh yeu' },
                { path: 'products/shared/images/wedding/coral-minimalist/album_1.webp', description: 'Gallery/album anh 1' },
                { path: 'products/shared/images/wedding/coral-minimalist/album_2.webp', description: 'Gallery/album anh 2' },
                { path: 'products/shared/images/wedding/coral-minimalist/album_3.webp', description: 'Gallery/album anh 3' },
                { path: 'products/shared/images/wedding/coral-minimalist/event_1.webp', description: 'Anh su kien/tiec cuoi 1' },
                { path: 'products/shared/images/wedding/coral-minimalist/event_2.webp', description: 'Anh su kien/tiec cuoi 2' }
            ]
        },
        {
            id: 'elegant-black-gold',
            name: 'Elegant Black Gold',
            folder: 'products/shared/images/wedding/elegant-black-gold/',
            count: 9,
            style: 'Elegant dark background, gold/warm accent, luxury feel',
            tags: ['elegant', 'black', 'gold', 'luxury', 'dark', 'formal', 'premium', 'studio'],
            colors: ['black', 'gold', 'white', 'dark'],
            mood: 'sang trọng, đẳng cấp, formal',
            description: 'Bo anh phong cach sang trong, nen toi/den vang, co portrait rieng co dau va chu re. Phu hop thiep cuoi luxury, dark theme.',
            hasPortrait: true,
            portraitFiles: { groom: 'portrait_groom.webp', bride: 'portrait_bride.webp' },
            matchPalettes: ['black-gold', 'dark-luxury', 'navy-gold', 'burgundy-dark'],
            files: {
                hero: 'couple_hero.webp',
                envelope: 'couple_main.webp',
                story: ['gallery_1.webp', 'gallery_3.webp'],
                gallery: ['gallery_1.webp', 'gallery_2.webp', 'gallery_3.webp', 'gallery_4.webp', 'gallery_5.webp'],
                thankyou: 'couple_hero.webp'
            },
            usedBy: [183, 210],
            images: [
                { path: 'products/shared/images/wedding/elegant-black-gold/couple_hero.webp', description: 'Hero couple - anh chinh lon' },
                { path: 'products/shared/images/wedding/elegant-black-gold/couple_main.webp', description: 'Couple main - anh doi chinh' },
                { path: 'products/shared/images/wedding/elegant-black-gold/portrait_bride.webp', description: 'Portrait co dau - chan dung nu' },
                { path: 'products/shared/images/wedding/elegant-black-gold/portrait_groom.webp', description: 'Portrait chu re - chan dung nam' },
                { path: 'products/shared/images/wedding/elegant-black-gold/gallery_1.webp', description: 'Gallery anh 1' },
                { path: 'products/shared/images/wedding/elegant-black-gold/gallery_2.webp', description: 'Gallery anh 2' },
                { path: 'products/shared/images/wedding/elegant-black-gold/gallery_3.webp', description: 'Gallery anh 3' },
                { path: 'products/shared/images/wedding/elegant-black-gold/gallery_4.webp', description: 'Gallery anh 4' },
                { path: 'products/shared/images/wedding/elegant-black-gold/gallery_5.webp', description: 'Gallery anh 5' }
            ]
        },
        {
            id: 'modern-romantic',
            name: 'Modern Romantic',
            folder: 'products/shared/images/wedding/modern-romantic/',
            count: 13,
            style: 'Modern romantic, natural light, outdoor/studio mix',
            tags: ['modern', 'romantic', 'natural', 'bright', 'contemporary', 'versatile', 'outdoor', 'warm'],
            colors: ['warm', 'natural', 'earth', 'sunset'],
            mood: 'lãng mạn, hiện đại, tự nhiên',
            description: 'Bo 13 anh couple hien dai, lang man, anh sang tu nhien. Da dang goc chup, phu hop nhieu phong cach thiep.',
            hasPortrait: false,
            matchPalettes: ['romantic', 'blush', 'coral', 'modern', 'dusty-rose'],
            files: {
                hero: 'couple_1.webp',
                envelope: ['couple_6.webp', 'couple_9.webp'],
                story: ['couple_5.webp', 'couple_7.webp', 'couple_11.webp'],
                gallery: ['couple_3.webp', 'couple_4.webp', 'couple_8.webp', 'couple_10.webp', 'couple_13.webp'],
                background: 'couple_3.webp',
                thankyou: 'couple_12.webp',
                fly: ['couple_2.webp', 'couple_4.webp']
            },
            usedBy: [184],
            images: [
                { path: 'products/shared/images/wedding/modern-romantic/couple_1.webp', description: 'Couple portrait 1' },
                { path: 'products/shared/images/wedding/modern-romantic/couple_2.webp', description: 'Couple portrait 2' },
                { path: 'products/shared/images/wedding/modern-romantic/couple_3.webp', description: 'Couple portrait 3' },
                { path: 'products/shared/images/wedding/modern-romantic/couple_4.webp', description: 'Couple portrait 4' },
                { path: 'products/shared/images/wedding/modern-romantic/couple_5.webp', description: 'Couple portrait 5' },
                { path: 'products/shared/images/wedding/modern-romantic/couple_6.webp', description: 'Couple portrait 6' },
                { path: 'products/shared/images/wedding/modern-romantic/couple_7.webp', description: 'Couple portrait 7' },
                { path: 'products/shared/images/wedding/modern-romantic/couple_8.webp', description: 'Couple portrait 8' },
                { path: 'products/shared/images/wedding/modern-romantic/couple_9.webp', description: 'Couple portrait 9' },
                { path: 'products/shared/images/wedding/modern-romantic/couple_10.webp', description: 'Couple portrait 10' },
                { path: 'products/shared/images/wedding/modern-romantic/couple_11.webp', description: 'Couple portrait 11' },
                { path: 'products/shared/images/wedding/modern-romantic/couple_12.webp', description: 'Couple portrait 12' },
                { path: 'products/shared/images/wedding/modern-romantic/couple_13.webp', description: 'Couple portrait 13' }
            ]
        },
        {
            id: 'viet-green',
            name: 'Vietnamese Green Nature',
            folder: 'products/shared/images/wedding/viet-green/',
            count: 14,
            style: 'Vietnamese couple, green nature, outdoor, warm golden light',
            tags: ['vietnamese', 'green', 'nature', 'outdoor', 'warm', 'golden', 'traditional', 'fresh', 'young', 'natural'],
            colors: ['green', 'white', 'fresh', 'natural'],
            mood: 'tươi trẻ, tự nhiên, Việt Nam',
            description: 'Bo anh couple Viet Nam ngoai troi xanh, da dang: anh doi, anh don, hoa cuoi, bia. Phu hop thiep cuoi truyen thong Viet, tu nhien.',
            hasPortrait: true,
            portraitFiles: { groom: 'chu re.webp', bride: 'co-dau.webp' },
            matchPalettes: ['sage-green', 'green-fresh', 'natural', 'garden'],
            files: {
                hero: 'bia_1.webp',
                envelope: 'anh doi.webp',
                couple: ['anh cap doi.webp', 'cap_doi_2.webp'],
                story: ['3.webp', '4.webp', '5.webp'],
                gallery: ['2 anh loon.webp', '2 line .webp', '3 anh doc.webp'],
                decoration: ['hoa cuoi.webp', 'hoa cuoi 2.webp']
            },
            usedBy: [190],
            images: [
                { path: 'products/shared/images/wedding/viet-green/bia_1.webp', description: 'Anh bia - dung lam cover/hero' },
                { path: 'products/shared/images/wedding/viet-green/anh cap doi.webp', description: 'Anh cap doi - couple chinh' },
                { path: 'products/shared/images/wedding/viet-green/anh doi.webp', description: 'Anh doi - couple pose khac' },
                { path: 'products/shared/images/wedding/viet-green/cap_doi_2.webp', description: 'Cap doi 2 - couple goc chup khac' },
                { path: 'products/shared/images/wedding/viet-green/co-dau.webp', description: 'Portrait co dau - chan dung nu' },
                { path: 'products/shared/images/wedding/viet-green/chu re.webp', description: 'Portrait chu re - chan dung nam' },
                { path: 'products/shared/images/wedding/viet-green/hoa cuoi.webp', description: 'Hoa cuoi - wedding bouquet' },
                { path: 'products/shared/images/wedding/viet-green/hoa cuoi 2.webp', description: 'Hoa cuoi 2 - wedding bouquet goc khac' },
                { path: 'products/shared/images/wedding/viet-green/2 anh loon.webp', description: '2 anh lon - composite/collage' },
                { path: 'products/shared/images/wedding/viet-green/2 line .webp', description: '2 anh xep hang - side by side' },
                { path: 'products/shared/images/wedding/viet-green/3 anh doc.webp', description: '3 anh doc - vertical triptych' },
                { path: 'products/shared/images/wedding/viet-green/3.webp', description: 'Anh couple 3' },
                { path: 'products/shared/images/wedding/viet-green/4.webp', description: 'Anh couple 4' },
                { path: 'products/shared/images/wedding/viet-green/5.webp', description: 'Anh couple 5' }
            ]
        },
        {
            id: 'viet-mem-mai',
            name: 'Vietnamese Soft Gentle',
            folder: 'products/shared/images/wedding/viet-mem-mai/',
            count: 12,
            style: 'Vietnamese couple, soft pastel, gentle dreamy tone',
            tags: ['vietnamese', 'soft', 'gentle', 'pastel', 'dreamy', 'romantic', 'light', 'traditional', 'red', 'warm'],
            colors: ['red', 'pink', 'cream', 'warm'],
            mood: 'mềm mại, truyền thống, ấm áp',
            description: 'Bo 12 anh couple Viet Nam tong mem mai, pastel, mong mo. Phu hop thiep cuoi nhẹ nhang, nữ tinh, phong cach watercolor.',
            hasPortrait: false,
            matchPalettes: ['traditional-red', 'red-gold', 'warm-traditional', 'blush-red'],
            files: {
                hero: '1.webp',
                gallery: ['2.webp', '3.webp', '4.webp', '5.webp', '6.webp', '7.webp', '8.webp', '9.webp', '10.webp', '11.webp', '12.webp']
            },
            usedBy: [191],
            images: [
                { path: 'products/shared/images/wedding/viet-mem-mai/1.webp', description: 'Couple soft 1' },
                { path: 'products/shared/images/wedding/viet-mem-mai/2.webp', description: 'Couple soft 2' },
                { path: 'products/shared/images/wedding/viet-mem-mai/3.webp', description: 'Couple soft 3' },
                { path: 'products/shared/images/wedding/viet-mem-mai/4.webp', description: 'Couple soft 4' },
                { path: 'products/shared/images/wedding/viet-mem-mai/5.webp', description: 'Couple soft 5' },
                { path: 'products/shared/images/wedding/viet-mem-mai/6.webp', description: 'Couple soft 6' },
                { path: 'products/shared/images/wedding/viet-mem-mai/7.webp', description: 'Couple soft 7' },
                { path: 'products/shared/images/wedding/viet-mem-mai/8.webp', description: 'Couple soft 8' },
                { path: 'products/shared/images/wedding/viet-mem-mai/9.webp', description: 'Couple soft 9' },
                { path: 'products/shared/images/wedding/viet-mem-mai/10.webp', description: 'Couple soft 10' },
                { path: 'products/shared/images/wedding/viet-mem-mai/11.webp', description: 'Couple soft 11' },
                { path: 'products/shared/images/wedding/viet-mem-mai/12.webp', description: 'Couple soft 12' }
            ]
        },
        {
            id: 'viet-studio-dark-floral',
            name: 'Viet Studio Dark Floral',
            folder: 'products/shared/images/wedding/viet-trang-hoa/',
            count: 14,
            style: 'Vietnamese studio, black background, pink floral arrangement, modern elegant',
            tags: ['vietnamese', 'studio', 'dark', 'black', 'floral', 'pink', 'modern', 'elegant', 'romantic', 'indoor'],
            colors: ['black', 'white', 'pink', 'green'],
            mood: 'sang trong, lang man, hien dai',
            description: 'Bo anh couple Viet phong den, hoa hong tuoi, vest trang. Phong cach hien dai sang trong, phu hop thiep cuoi dark theme hoac pink floral.',
            hasPortrait: true,
            portraitFiles: { bride: '627789060_1496741912453620_3108546600317143173_n.webp', groom: '628232532_1496741939120284_2188543106842202943_n.webp' },
            matchPalettes: ['blush-pink', 'dusty-rose', 'burgundy', 'dark-moody', 'classic-gold'],
            files: {
                hero: '629708109_1496741975786947_7694401786574075770_n.webp',
                envelope: '625879595_1496741972453614_8061171316701395782_n.webp',
                story: ['628045812_1496742042453607_50305878371780347_n.webp', '629235467_1496742385786906_5916049160219901503_n.webp'],
                gallery: ['626759978_1496742325786912_8666924174171780533_n.webp', '628267914_1496742209120257_3178729502643930985_n.webp', '629227517_1496742499120228_4192193729224028066_n.webp', '629719960_1496739252453886_2578583488563429923_n.webp', '628427200_1496742375786907_1068531846115830906_n.webp'],
                decoration: ['629214346_1496741812453630_740612148984566707_n.webp']
            },
            usedBy: [],
            images: [
                { path: 'products/shared/images/wedding/viet-trang-hoa/625879595_1496741972453614_8061171316701395782_n.webp', description: 'Close-up co dau ngui hoa, chu re canh' },
                { path: 'products/shared/images/wedding/viet-trang-hoa/626759978_1496742325786912_8666924174171780533_n.webp', description: 'Couple ngoi, hoa hai ben' },
                { path: 'products/shared/images/wedding/viet-trang-hoa/627789060_1496741912453620_3108546600317143173_n.webp', description: 'Portrait co dau solo, bo hoa' },
                { path: 'products/shared/images/wedding/viet-trang-hoa/628045812_1496742042453607_50305878371780347_n.webp', description: 'Couple dung, co dau tua vai' },
                { path: 'products/shared/images/wedding/viet-trang-hoa/628232532_1496741939120284_2188543106842202943_n.webp', description: 'Portrait chu re solo, bo hoa' },
                { path: 'products/shared/images/wedding/viet-trang-hoa/628255527_1496741349120343_2167207757054090780_n.webp', description: 'Couple ngoi, hoa hai ben - goc 2' },
                { path: 'products/shared/images/wedding/viet-trang-hoa/628264245_1496742449120233_4645514456825061638_n.webp', description: 'Co dau ngoi solo, hoa xung quanh' },
                { path: 'products/shared/images/wedding/viet-trang-hoa/628267914_1496742209120257_3178729502643930985_n.webp', description: 'Couple dung thang, hoa ben trai' },
                { path: 'products/shared/images/wedding/viet-trang-hoa/628427200_1496742375786907_1068531846115830906_n.webp', description: 'Couple ngoi thoai mai, cuoi' },
                { path: 'products/shared/images/wedding/viet-trang-hoa/629214346_1496741812453630_740612148984566707_n.webp', description: 'Close-up bo hoa cam tay' },
                { path: 'products/shared/images/wedding/viet-trang-hoa/629227517_1496742499120228_4192193729224028066_n.webp', description: 'Couple, co dau ngoi chu re dung' },
                { path: 'products/shared/images/wedding/viet-trang-hoa/629235467_1496742385786906_5916049160219901503_n.webp', description: 'Couple quay lung nam tay' },
                { path: 'products/shared/images/wedding/viet-trang-hoa/629708109_1496741975786947_7694401786574075770_n.webp', description: 'Couple om nhau close-up' },
                { path: 'products/shared/images/wedding/viet-trang-hoa/629719960_1496739252453886_2578583488563429923_n.webp', description: 'Couple ngoi, nhin xa' }
            ]
        },
        {
            id: 'viet-phuc',
            name: 'Vietnamese Traditional Viet Phuc',
            folder: 'products/shared/images/wedding/viet-phuc/',
            count: 20,
            style: 'Vietnamese couple, mix studio modern (white gown, black suit, gray bg) + traditional Viet Phuc (nhat binh, khan van, warm beige bg)',
            tags: ['vietnamese', 'traditional', 'viet-phuc', 'nhat-binh', 'studio', 'modern', 'elegant', 'formal', 'mix-style', 'indoor'],
            colors: ['white', 'black', 'beige', 'warm', 'blue', 'cream'],
            mood: 'trang trong, truyen thong, sang trong',
            description: 'Bo 20 anh couple Viet Nam mix 2 phong cach: studio hien dai (vay trang, vest den, nen xam) va Viet phuc truyen thong (nhat binh, khan van xanh, quat, nen nau am). Phu hop thiep cuoi truyen thong Viet hoac mix modern-traditional.',
            hasPortrait: true,
            portraitFiles: { bride: '590375562_1269588868526949_2192735467615717068_n.webp', groom: '589573154_1269588941860275_3908350654646821677_n.webp' },
            matchPalettes: ['traditional-red', 'traditional-vn', 'warm-traditional', 'classic-gold', 'beige-cream', 'navy-gold'],
            files: {
                hero: '586249712_1269588531860316_5102124274465849989_n.webp',
                envelope: '590751830_1269588841860285_5702410704470784987_n.webp',
                couple: ['588460380_1269589045193598_8232639243979284330_n.webp', '588176177_1269588801860289_1765183489222589348_n.webp'],
                story: ['586598279_1269588635193639_6093901133244281206_n.webp', '586610792_1269588658526970_9052717941720619355_n.webp', '588674657_1269588781860291_5074547269302163630_n.webp'],
                gallery: ['586293884_1269589188526917_80341859751966036_n.webp', '587549040_1269588591860310_3779928500835600503_n.webp', '588404173_1269588965193606_6698922936110706795_n.webp', '588548924_1269589215193581_1440141472649332138_n.webp', '588648264_1269588568526979_1673226575233527351_n.webp', '591163745_1269589018526934_865779286772846202_n.webp'],
                decoration: ['590936364_1269588631860306_4767927830260968345_n.webp']
            },
            usedBy: [],
            images: [
                { path: 'products/shared/images/wedding/viet-phuc/586249712_1269588531860316_5102124274465849989_n.webp', description: 'Couple studio - vay trang vest den, nen xam, hoa trang' },
                { path: 'products/shared/images/wedding/viet-phuc/586293884_1269589188526917_80341859751966036_n.webp', description: 'Couple viet phuc - nhat binh, khan van, nen nau' },
                { path: 'products/shared/images/wedding/viet-phuc/586598279_1269588635193639_6093901133244281206_n.webp', description: 'Couple studio - pose lang man' },
                { path: 'products/shared/images/wedding/viet-phuc/586610792_1269588658526970_9052717941720619355_n.webp', description: 'Couple studio - pose nhau' },
                { path: 'products/shared/images/wedding/viet-phuc/586665848_1269589168526919_5229704476581667077_n.webp', description: 'Couple viet phuc - dung canh nhau' },
                { path: 'products/shared/images/wedding/viet-phuc/587549040_1269588591860310_3779928500835600503_n.webp', description: 'Couple studio - nam tay' },
                { path: 'products/shared/images/wedding/viet-phuc/588176177_1269588801860289_1765183489222589348_n.webp', description: 'Couple viet phuc - nhay mua vui ve' },
                { path: 'products/shared/images/wedding/viet-phuc/588404173_1269588965193606_6698922936110706795_n.webp', description: 'Couple studio - co dau quay lung' },
                { path: 'products/shared/images/wedding/viet-phuc/588460380_1269589045193598_8232639243979284330_n.webp', description: 'Couple viet phuc - ngoi trang trong, hoa lan trang' },
                { path: 'products/shared/images/wedding/viet-phuc/588548924_1269589215193581_1440141472649332138_n.webp', description: 'Couple viet phuc - om nhau' },
                { path: 'products/shared/images/wedding/viet-phuc/588648264_1269588568526979_1673226575233527351_n.webp', description: 'Couple studio - dung doi mat' },
                { path: 'products/shared/images/wedding/viet-phuc/588674657_1269588781860291_5074547269302163630_n.webp', description: 'Couple viet phuc - cam quat, nhin nhau' },
                { path: 'products/shared/images/wedding/viet-phuc/588830089_1269588518526984_8731401836426460919_n.webp', description: 'Couple studio - nam tay nhe nhang' },
                { path: 'products/shared/images/wedding/viet-phuc/588894827_1269589025193600_8594486592054601998_n.webp', description: 'Couple viet phuc - goc chup khac' },
                { path: 'products/shared/images/wedding/viet-phuc/589573154_1269588941860275_3908350654646821677_n.webp', description: 'Portrait chu re - viet phuc trang' },
                { path: 'products/shared/images/wedding/viet-phuc/590184689_1269588915193611_2833708139044788854_n.webp', description: 'Couple studio - full body' },
                { path: 'products/shared/images/wedding/viet-phuc/590375562_1269588868526949_2192735467615717068_n.webp', description: 'Portrait co dau - viet phuc, quat, khan van xanh' },
                { path: 'products/shared/images/wedding/viet-phuc/590751830_1269588841860285_5702410704470784987_n.webp', description: 'Couple viet phuc - cam quat, than mat' },
                { path: 'products/shared/images/wedding/viet-phuc/590936364_1269588631860306_4767927830260968345_n.webp', description: 'Couple studio - hoa trang' },
                { path: 'products/shared/images/wedding/viet-phuc/591163745_1269589018526934_865779286772846202_n.webp', description: 'Couple viet phuc - ngoi thoai mai' }
            ]
        },

        {
            id: 'douple-white',
            name: 'Korean Style White Lace Studio',
            folder: 'products/shared/images/wedding/douple-white/',
            count: 9,
            style: 'Korean studio, white/cream background, lace veil, romantic soft light',
            tags: ['korean-style', 'studio', 'white', 'cream', 'lace', 'romantic', 'soft', 'elegant', 'indoor', 'veil'],
            colors: ['white', 'cream', 'beige', 'pastel'],
            mood: 'lang man, nhe nhang, tinh te',
            description: 'Bo 9 anh couple phong cach Han, nen trang kem, vay ren, khan voan, hoa trang. Phu hop thiep cuoi thanh lich, nhe nhang.',
            hasPortrait: false,
            matchPalettes: ['blush-pink', 'beige-cream', 'classic-gold', 'modern-neutral'],
            files: {
                hero: '602328651_1331862278743493_1151116216256333353_n.webp',
                envelope: '602340650_1331862162076838_2193853185398485556_n.webp',
                couple: ['603873414_1331862168743504_3645323546598127494_n.webp', '603914498_1331862165410171_3022616823752295767_n.webp'],
                story: ['605540026_1331862062076848_4992061354907044589_n.webp', '606602793_1331862275410160_5701144232807313035_n.webp'],
                gallery: ['607061618_1331862058743515_3809251618093354628_n.webp', '607493520_1331862048743516_5482248151926306777_n.webp', '607702565_1331862258743495_8933236249510191128_n.webp']
            },
            usedBy: [],
            images: [
                { path: 'products/shared/images/wedding/douple-white/602328651_1331862278743493_1151116216256333353_n.webp', description: 'Couple Han - full body, nen trang, vay ren, khan voan' },
                { path: 'products/shared/images/wedding/douple-white/602340650_1331862162076838_2193853185398485556_n.webp', description: 'Couple Han - nen kem, dang dung than mat' },
                { path: 'products/shared/images/wedding/douple-white/603873414_1331862168743504_3645323546598127494_n.webp', description: 'Couple Han - nhau lang man, hoa trang' },
                { path: 'products/shared/images/wedding/douple-white/603914498_1331862165410171_3022616823752295767_n.webp', description: 'Couple Han - pose diu dang, vay co ren' },
                { path: 'products/shared/images/wedding/douple-white/605540026_1331862062076848_4992061354907044589_n.webp', description: 'Couple Han - anh sang mem, trang nhe nhang' },
                { path: 'products/shared/images/wedding/douple-white/606602793_1331862275410160_5701144232807313035_n.webp', description: 'Couple Han - khan voan bay nhe, lang man' },
                { path: 'products/shared/images/wedding/douple-white/607061618_1331862058743515_3809251618093354628_n.webp', description: 'Couple Han - nen kem pastel, hoa cam tay' },
                { path: 'products/shared/images/wedding/douple-white/607493520_1331862048743516_5482248151926306777_n.webp', description: 'Couple Han - dung cung nhau, elegant' },
                { path: 'products/shared/images/wedding/douple-white/607702565_1331862258743495_8933236249510191128_n.webp', description: 'Couple Han - close up nhin nhau, tinh te' }
            ]
        },

        {
            id: 'trung-quoc',
            name: 'Chinese Style Red Studio',
            folder: 'products/shared/images/wedding/trung quoc/',
            count: 7,
            style: 'Chinese modern style, bold red background, black suit, white flowers, dramatic',
            tags: ['chinese', 'red', 'studio', 'dramatic', 'bold', 'modern', 'formal', 'indoor'],
            colors: ['red', 'black', 'white', 'dark'],
            mood: 'manh me, sang trong, an tuong',
            description: 'Bo 7 anh couple nen do, vest den, hoa trang. Phong cach Trung Hoa hien dai, phu hop thiep cuoi do vang, truyen thong.',
            hasPortrait: false,
            matchPalettes: ['traditional-red', 'red-gold', 'dark-moody', 'burgundy'],
            files: {
                hero: '611162644_1469484441845508_5891357531928659835_n.webp',
                envelope: '611461052_1469484921845460_1549363460080579938_n.webp',
                couple: ['611877657_1469484148512204_2410944708581328935_n.webp', '612408541_1469484361845516_7782424889558578877_n.webp'],
                story: ['612523929_1469484715178814_8016311485287183421_n.webp', '612595309_1469484858512133_7082730408096638435_n.webp'],
                gallery: ['613560030_1469484531845499_1811484681083054255_n.webp']
            },
            usedBy: [],
            images: [
                { path: 'products/shared/images/wedding/trung quoc/611162644_1469484441845508_5891357531928659835_n.webp', description: 'Couple Trung Hoa - full body, nen do, vest den, hoa trang' },
                { path: 'products/shared/images/wedding/trung quoc/611461052_1469484921845460_1549363460080579938_n.webp', description: 'Couple Trung Hoa - pose dung, manh me an tuong' },
                { path: 'products/shared/images/wedding/trung quoc/611877657_1469484148512204_2410944708581328935_n.webp', description: 'Couple Trung Hoa - nhau, nen do dam' },
                { path: 'products/shared/images/wedding/trung quoc/612408541_1469484361845516_7782424889558578877_n.webp', description: 'Couple Trung Hoa - co dau vay trang nen do tươi' },
                { path: 'products/shared/images/wedding/trung quoc/612523929_1469484715178814_8016311485287183421_n.webp', description: 'Couple Trung Hoa - hoa cam tay, bold dramatic' },
                { path: 'products/shared/images/wedding/trung quoc/612595309_1469484858512133_7082730408096638435_n.webp', description: 'Couple Trung Hoa - dung canh nhau, formal' },
                { path: 'products/shared/images/wedding/trung quoc/613560030_1469484531845499_1811484681083054255_n.webp', description: 'Couple Trung Hoa - close up, sang trong' }
            ]
        },

        {
            id: 'trang-2',
            name: 'Korean Pure White Minimalist',
            folder: 'products/shared/images/wedding/trắng-2/',
            count: 9,
            style: 'Korean minimalist, pure white background, dreamy, soft shadow, ball gown',
            tags: ['korean-style', 'white', 'minimalist', 'dreamy', 'soft', 'clean', 'studio', 'indoor', 'modern'],
            colors: ['white', 'cream', 'gray', 'neutral'],
            mood: 'trong sang, toi gian, mong mo',
            description: 'Bo 9 anh couple nen trang tinh, vay cuoi xoe lon, toi gian, anh sang mem. Phu hop thiep cuoi minimalist, modern.',
            hasPortrait: true,
            matchPalettes: ['modern-neutral', 'blush-pink', 'beige-cream', 'classic-gold'],
            files: {
                hero: '619077666_1488053899996202_8605926157434200602_n.webp',
                envelope: '619152311_1488062116662047_7164231694490086148_n.webp',
                couple: ['619191857_1488054026662856_2323264759865152076_n.webp', '619295400_1488054099996182_8905608008651989380_n.webp'],
                story: ['619327035_1488054216662837_7960497226571341314_n.webp', '620125932_1488054126662846_6083723595423355361_n.webp'],
                gallery: ['621823044_1488054073329518_7596570888375835136_n.webp', '622589584_1488054156662843_7305538924174892155_n.webp', '622873643_1488054183329507_7905329686456968241_n.webp']
            },
            usedBy: [],
            images: [
                { path: 'products/shared/images/wedding/trắng-2/619077666_1488053899996202_8605926157434200602_n.webp', description: 'Couple Han - nen trang tinh, vay xoe lon, dreamy' },
                { path: 'products/shared/images/wedding/trắng-2/619152311_1488062116662047_7164231694490086148_n.webp', description: 'Couple Han - pose nhin nhau, minimalist' },
                { path: 'products/shared/images/wedding/trắng-2/619191857_1488054026662856_2323264759865152076_n.webp', description: 'Couple Han - full body, nen trang, sang trọng' },
                { path: 'products/shared/images/wedding/trắng-2/619295400_1488054099996182_8905608008651989380_n.webp', description: 'Couple Han - anh sang mem, mong mo' },
                { path: 'products/shared/images/wedding/trắng-2/619327035_1488054216662837_7960497226571341314_n.webp', description: 'Couple Han - vay cuoi co rong, thanh thoat' },
                { path: 'products/shared/images/wedding/trắng-2/620125932_1488054126662846_6083723595423355361_n.webp', description: 'Couple Han - pose lang man, toi gian' },
                { path: 'products/shared/images/wedding/trắng-2/621823044_1488054073329518_7596570888375835136_n.webp', description: 'Couple Han - dang dung, nhe nhang' },
                { path: 'products/shared/images/wedding/trắng-2/622589584_1488054156662843_7305538924174892155_n.webp', description: 'Couple Han - close up mat nhin nhau' },
                { path: 'products/shared/images/wedding/trắng-2/622873643_1488054183329507_7905329686456968241_n.webp', description: 'Couple Han - portrait ben canh nhau' }
            ]
        },

        {
            id: 'viet-ngoai-troi',
            name: 'Vietnamese Outdoor Garden',
            folder: 'products/shared/images/wedding/viet-ngoai-troi/',
            count: 9,
            style: 'Vietnamese outdoor, green garden, natural light, fresh and bright',
            tags: ['vietnamese', 'outdoor', 'garden', 'green', 'natural', 'fresh', 'bright', 'young'],
            colors: ['green', 'white', 'fresh', 'natural'],
            mood: 'tuoi mat, tu nhien, tran day suc song',
            description: 'Bo 9 anh couple Viet ngoai troi, vuon xanh, anh sang tu nhien. Phu hop thiep cuoi tu nhien, garden party.',
            hasPortrait: false,
            matchPalettes: ['sage-green', 'green-fresh', 'natural', 'garden'],
            files: {
                hero: '560521824_1186822743498586_4901705254961395963_n.webp',
                envelope: '560814398_1186823080165219_4292428084241509246_n.webp',
                couple: ['561752067_1186822770165250_5079246119517633823_n.webp', '562051485_1186822726831921_7104630307011300666_n.webp'],
                story: ['562333326_1186822783498582_7950576852117940994_n.webp', '563447378_1186822843498576_573815191487459772_n.webp'],
                gallery: ['564621127_1186823056831888_9105199833252118717_n.webp', '565209930_1186822690165258_1138983235010798502_n.webp', '566216434_1186822830165244_3325858291897821123_n.webp']
            },
            usedBy: [],
            images: [
                { path: 'products/shared/images/wedding/viet-ngoai-troi/560521824_1186822743498586_4901705254961395963_n.webp', description: 'Couple Viet - ngoai troi, vuon xanh, anh sang tu nhien' },
                { path: 'products/shared/images/wedding/viet-ngoai-troi/560814398_1186823080165219_4292428084241509246_n.webp', description: 'Couple Viet - full body, canh vat tuoi mat' },
                { path: 'products/shared/images/wedding/viet-ngoai-troi/561752067_1186822770165250_5079246119517633823_n.webp', description: 'Couple Viet - cuoi vui, ngoai troi sang' },
                { path: 'products/shared/images/wedding/viet-ngoai-troi/562051485_1186822726831921_7104630307011300666_n.webp', description: 'Couple Viet - pose lang man giua thien nhien' },
                { path: 'products/shared/images/wedding/viet-ngoai-troi/562333326_1186822783498582_7950576852117940994_n.webp', description: 'Couple Viet - cay xanh lam nen, tu nhien' },
                { path: 'products/shared/images/wedding/viet-ngoai-troi/563447378_1186822843498576_573815191487459772_n.webp', description: 'Couple Viet - nhin nhau, fresh outdoor' },
                { path: 'products/shared/images/wedding/viet-ngoai-troi/564621127_1186823056831888_9105199833252118717_n.webp', description: 'Couple Viet - dang ngoi, anh xanh vuon hoa' },
                { path: 'products/shared/images/wedding/viet-ngoai-troi/565209930_1186822690165258_1138983235010798502_n.webp', description: 'Couple Viet - cuoi tuoi, anh sáng dep' },
                { path: 'products/shared/images/wedding/viet-ngoai-troi/566216434_1186822830165244_3325858291897821123_n.webp', description: 'Couple Viet - ham tay, dung giua canh xanh' }
            ]
        },

        {
            id: 'vit-sang-trong',
            name: 'Vietnamese Elegant Studio',
            folder: 'products/shared/images/wedding/vit-sang-trong/',
            count: 26,
            style: 'Vietnamese studio, gray background, navy suit, white gown, blue/purple flowers, elegant',
            tags: ['vietnamese', 'studio', 'elegant', 'gray', 'navy', 'formal', 'modern', 'indoor', 'flowers'],
            colors: ['gray', 'navy', 'white', 'purple-light', 'blue'],
            mood: 'sang trong, lich lam, hien dai',
            description: 'Bo 26 anh couple Viet studio nen xam, vest navy, vay trang dai, hoa tim xanh. Phu hop thiep cuoi sang trong, hien dai.',
            hasPortrait: false,
            matchPalettes: ['navy-gold', 'classic-gold', 'modern-neutral', 'dusty-rose'],
            files: {
                hero: 'couple_hero.webp',
                envelope: 'couple_2.webp',
                couple: ['couple_3.webp', 'couple_4.webp'],
                story: ['couple_5.webp', 'couple_6.webp'],
                gallery: ['couple_7.webp', 'couple_8.webp', 'couple_9.webp', 'couple_10.webp', 'couple_11.webp', 'couple_12.webp', 'couple_13.webp']
            },
            usedBy: [],
            images: [
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_hero.webp', description: 'Couple Viet studio - hero shot, vest navy, vay trang' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_2.webp', description: 'Couple Viet studio - nen xam, hoa tim xanh' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_3.webp', description: 'Couple Viet studio - pose sang trong' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_4.webp', description: 'Couple Viet studio - nhin nhau, tinh cam' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_5.webp', description: 'Couple Viet studio - full body, elegant' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_6.webp', description: 'Couple Viet studio - dang cuoi, vui ve' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_7.webp', description: 'Couple Viet studio - nam tay, lang man' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_8.webp', description: 'Couple Viet studio - pose dep, formal' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_9.webp', description: 'Couple Viet studio - nen xam sang' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_10.webp', description: 'Couple Viet studio - dang dung, lich lam' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_11.webp', description: 'Couple Viet studio - close up' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_12.webp', description: 'Couple Viet studio - hoa cam tay dep' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_13.webp', description: 'Couple Viet studio - full body sang trong' },
                { path: 'products/shared/images/wedding/vit-sang-trong/653397602_1530984239029387_1261971446922638521_n.webp', description: 'Couple Viet studio - anh moi chuyen doi' },
                { path: 'products/shared/images/wedding/vit-sang-trong/653421179_1530984079029403_6981198179672932809_n.webp', description: 'Couple Viet studio - pose nhe nhang' },
                { path: 'products/shared/images/wedding/vit-sang-trong/653783832_1530984059029405_2995181545610274568_n.webp', description: 'Couple Viet studio - nhau tinh cam' },
                { path: 'products/shared/images/wedding/vit-sang-trong/653785330_1530983442362800_7893140036360944579_n.webp', description: 'Couple Viet studio - dung canh nhau' },
                { path: 'products/shared/images/wedding/vit-sang-trong/653903489_1530983949029416_1935782495085440839_n.webp', description: 'Couple Viet studio - anh sang dep' },
                { path: 'products/shared/images/wedding/vit-sang-trong/653912172_1530983919029419_6207138495660907446_n.webp', description: 'Couple Viet studio - nen toi, drama' },
                { path: 'products/shared/images/wedding/vit-sang-trong/653992579_1530984029029408_6832205367668074264_n.webp', description: 'Couple Viet studio - full body elegant' },
                { path: 'products/shared/images/wedding/vit-sang-trong/654214290_1530983639029447_1797889907777797815_n.webp', description: 'Couple Viet studio - pose lang man' },
                { path: 'products/shared/images/wedding/vit-sang-trong/654240029_1530984192362725_6597023198455694660_n.webp', description: 'Couple Viet studio - cuoi tuoi' },
                { path: 'products/shared/images/wedding/vit-sang-trong/654342100_1530983465696131_3085575465757586250_n.webp', description: 'Couple Viet studio - sang trong lich lam' },
                { path: 'products/shared/images/wedding/vit-sang-trong/654370256_1530983452362799_7346529339772399357_n.webp', description: 'Couple Viet studio - formal, dep mat' },
                { path: 'products/shared/images/wedding/vit-sang-trong/654723537_1530984109029400_4608443364961711798_n.webp', description: 'Couple Viet studio - vest navy noi bat' },
                { path: 'products/shared/images/wedding/vit-sang-trong/654849909_1530983399029471_5040438644921471250_n.webp', description: 'Couple Viet studio - cuoi cung, sang trong' }
            ]
        },

        // Batch 2026-03-31 — 3 bộ ảnh mới
        {
            id: 'lang-chai',
            name: 'Làng Chài Outdoor',
            folder: 'products/shared/images/wedding/lang-chai/',
            count: 3,
            style: 'Outdoor fishing village, rustic natural, white gown + black suit',
            tags: ['outdoor', 'rustic', 'natural', 'fishing-village', 'vietnamese', 'romantic', 'countryside'],
            colors: ['white', 'black', 'teal', 'natural'],
            mood: 'tu nhien, moc mac, lang man',
            description: 'Bo 3 anh couple cuoi ngoai troi lang chai, tren thuyen go. Vay cuoi trang, vest den, phong cach moc mac tu nhien.',
            hasPortrait: false,
            matchPalettes: ['rustic', 'natural', 'sage-green', 'vintage'],
            files: {
                hero: 'couple_hero.webp',
                envelope: 'couple_1.webp',
                story: ['couple_1.webp', 'couple_2.webp'],
                gallery: ['couple_hero.webp', 'couple_1.webp', 'couple_2.webp']
            },
            usedBy: [],
            images: [
                { path: 'products/shared/images/wedding/lang-chai/couple_hero.webp', description: 'Couple tren thuyen - tay gio cao, vay bong benh, anh ngang' },
                { path: 'products/shared/images/wedding/lang-chai/couple_1.webp', description: 'Couple tren thuyen - co dau cam hoa, chu re chi tay' },
                { path: 'products/shared/images/wedding/lang-chai/couple_2.webp', description: 'Couple tren thuyen - co dau cuoi tuoi, anh nho' }
            ]
        },
        {
            id: 'model-hot',
            name: 'Fashion Studio Moody',
            folder: 'products/shared/images/wedding/model-hot/',
            count: 5,
            style: 'Studio fashion, dark moody lighting, champagne satin gown, dramatic',
            tags: ['studio', 'fashion', 'moody', 'dramatic', 'luxury', 'champagne', 'dark', 'modern'],
            colors: ['champagne', 'nude', 'dark', 'gold', 'warm'],
            mood: 'sang trong, quyen ru, dramatic',
            description: 'Bo 5 anh studio thoi trang, anh sang dramatic toi, vay satin champagne hoa 3D. Co ca portrait co dau va couple.',
            hasPortrait: true,
            portraitFiles: { bride: 'portrait_bride.webp' },
            matchPalettes: ['luxury-gold', 'dark-moody', 'champagne', 'modern-neutral'],
            files: {
                hero: 'couple_hero.webp',
                envelope: ['portrait_bride.webp', 'portrait_bride_2.webp'],
                couple: ['couple_1.webp'],
                story: ['bride_full.webp', 'portrait_bride_2.webp'],
                gallery: ['couple_hero.webp', 'couple_1.webp', 'portrait_bride.webp', 'portrait_bride_2.webp', 'bride_full.webp']
            },
            usedBy: [],
            images: [
                { path: 'products/shared/images/wedding/model-hot/couple_hero.webp', description: 'Couple ngoi om nhau - than mat, vui ve' },
                { path: 'products/shared/images/wedding/model-hot/couple_1.webp', description: 'Couple dung canh thang - ao satin champagne, pose fashion' },
                { path: 'products/shared/images/wedding/model-hot/portrait_bride.webp', description: 'Close-up co dau - vay hoa 3D, trang suc, nen toi' },
                { path: 'products/shared/images/wedding/model-hot/portrait_bride_2.webp', description: 'Co dau nghieng dau - spotlight, bong tuong, dramatic' },
                { path: 'products/shared/images/wedding/model-hot/bride_full.webp', description: 'Co dau nhin tu tren - vay bong tran san, anh vang am' }
            ]
        },
        {
            id: 'tiec-cuoi',
            name: 'Tiệc Cưới Garden Luxury',
            folder: 'products/shared/images/wedding/tiec-cuoi/',
            count: 10,
            style: 'Outdoor garden wedding reception, white luxury, crystal chandelier, candles',
            tags: ['outdoor', 'garden', 'reception', 'luxury', 'white', 'chandelier', 'elegant', 'party', 'crystal'],
            colors: ['white', 'gold', 'green', 'crystal'],
            mood: 'sang trong, lung linh, trang le',
            description: 'Bo 10 anh tiec cuoi ngoai troi, ban tiec trang, den pha le, nen, hoa loa ken. Couple vest trang + vay dinh da. Phu hop thiep cuoi sang trong.',
            hasPortrait: false,
            matchPalettes: ['luxury-gold', 'classic-gold', 'modern-neutral', 'white-clean'],
            files: {
                hero: 'couple_hero.webp',
                envelope: 'couple_3.webp',
                couple: ['couple_4.webp', 'couple_5.webp'],
                story: ['couple_2.webp', 'couple_8.webp', 'couple_6.webp'],
                gallery: ['couple_hero.webp', 'couple_1.webp', 'couple_2.webp', 'couple_3.webp', 'couple_4.webp', 'couple_5.webp', 'couple_6.webp', 'couple_7.webp', 'couple_8.webp', 'couple_9.webp'],
                event: ['couple_6.webp', 'couple_7.webp']
            },
            usedBy: [],
            images: [
                { path: 'products/shared/images/wedding/tiec-cuoi/couple_hero.webp', description: 'Couple ngoi ban tiec - chandelier pha le, cay xanh' },
                { path: 'products/shared/images/wedding/tiec-cuoi/couple_1.webp', description: 'Couple ban tiec can hon - champagne, nen trang' },
                { path: 'products/shared/images/wedding/tiec-cuoi/couple_2.webp', description: 'Chu re dut cho co dau an - ngot ngao than mat' },
                { path: 'products/shared/images/wedding/tiec-cuoi/couple_3.webp', description: 'Couple hon nhau - lang man, chandelier' },
                { path: 'products/shared/images/wedding/tiec-cuoi/couple_4.webp', description: 'Couple om hon - can canh, tinh cam' },
                { path: 'products/shared/images/wedding/tiec-cuoi/couple_5.webp', description: 'Chu re nhin co dau quay lung - chandelier sang' },
                { path: 'products/shared/images/wedding/tiec-cuoi/couple_6.webp', description: 'Couple full body dung - ban tiec 2 ben, hoa loa ken' },
                { path: 'products/shared/images/wedding/tiec-cuoi/couple_7.webp', description: 'Couple full body nam tay - chandelier, co xanh' },
                { path: 'products/shared/images/wedding/tiec-cuoi/couple_8.webp', description: 'Couple cung ly champagne - hoang hon' },
                { path: 'products/shared/images/wedding/tiec-cuoi/couple_9.webp', description: 'Couple pose - co dau vay dinh da, ban tiec sang trong' }
            ]
        }
    ],

    /* ============================================
       MUSIC — Nhạc nền
       ============================================ */
    music: [
        // --- Romantic ---
        {
            path: 'products/shared/music/romantic/Endless Love  .mp3',
            name: 'Endless Love',
            genre: 'romantic',
            mood: 'sweet, warm, emotional',
            tags: ['slow', 'classic', 'love ballad', 'duo'],
            suggestedFor: 'Thiep cuoi nhẹ nhang, lang man classic'
        },
        {
            path: 'products/shared/music/romantic/Everyday I Love You.mp3',
            name: 'Everyday I Love You',
            genre: 'romantic',
            mood: 'cheerful, loving, bright',
            tags: ['medium tempo', 'sweet', 'daily love'],
            suggestedFor: 'Thiep cuoi tuoi sang, phong cach tre trung'
        },
        {
            path: 'products/shared/music/romantic/One In A Million.mp3',
            name: 'One In A Million',
            genre: 'romantic',
            mood: 'gentle, precious, heartfelt',
            tags: ['slow', 'sentimental', 'special'],
            suggestedFor: 'Thiep cuoi tinh cam, nhan manh su dac biet'
        },
        {
            path: 'products/shared/music/romantic/Only Love.mp3',
            name: 'Only Love',
            genre: 'romantic',
            mood: 'soft, devoted, tender',
            tags: ['slow', 'ballad', 'devotion'],
            suggestedFor: 'Thiep cuoi sang trong, nhẹ nhang'
        },
        {
            path: 'products/shared/music/romantic/music.mp3',
            name: 'Romantic Piano',
            genre: 'romantic',
            mood: 'calm, elegant, instrumental',
            tags: ['piano', 'instrumental', 'background'],
            suggestedFor: 'Nhac nen mac dinh cho moi loai thiep cuoi'
        },

        // --- Sad Ballad ---
        {
            path: 'products/shared/music/sad-ballad/My Heart Will Go On (Love Theme from _Titanic_).mp3',
            name: 'My Heart Will Go On',
            genre: 'sad-ballad',
            mood: 'epic, emotional, dramatic',
            tags: ['orchestral', 'iconic', 'Titanic', 'cinematic'],
            suggestedFor: 'Thiep cuoi phong cach dramatic, cinematic'
        },
        {
            path: 'products/shared/music/sad-ballad/Until You.mp3',
            name: 'Until You',
            genre: 'sad-ballad',
            mood: 'longing, emotional, deep',
            tags: ['ballad', 'slow', 'emotional'],
            suggestedFor: 'Thiep cuoi cam xuc sau lang, love story dai'
        },

        // --- Upbeat Energy ---
        {
            path: 'products/shared/music/upbeat-energy/We Found Love.mp3',
            name: 'We Found Love',
            genre: 'upbeat-energy',
            mood: 'joyful, energetic, celebratory',
            tags: ['dance', 'upbeat', 'party', 'celebration'],
            suggestedFor: 'Thiep cuoi vui tuoi, party style, tre trung'
        },

        // --- Wedding ---
        {
            path: 'products/shared/music/wedding/A Thousand Years.mp3',
            name: 'A Thousand Years',
            genre: 'wedding',
            mood: 'timeless, romantic, emotional',
            tags: ['classic wedding', 'Christina Perri', 'slow', 'iconic'],
            suggestedFor: 'Nhac cuoi kinh dien, phu hop moi phong cach',
            artist: 'Christina Perri',
            bpm: 'slow'
        },
        {
            path: 'products/shared/music/wedding/Beautiful In White.mp3',
            name: 'Beautiful In White',
            genre: 'wedding',
            mood: 'romantic, dreamy, wedding ceremony',
            tags: ['wedding anthem', 'Shane Filan', 'white dress', 'ceremony'],
            suggestedFor: 'Thiep cuoi trang nha, co dau ao trang, sang trong',
            artist: 'Westlife',
            bpm: 'medium'
        },
        {
            path: 'products/shared/music/wedding/Sugar.mp3',
            name: 'Sugar',
            genre: 'wedding',
            mood: 'fun, sweet, upbeat',
            tags: ['Maroon 5', 'fun', 'party', 'sweet'],
            suggestedFor: 'Thiep cuoi vui nhon, phong cach hien dai, tre',
            artist: 'Maroon 5',
            bpm: 'fast'
        }
    ],

    /* ============================================
       FONTS
       ============================================ */
    fonts: [
        {
            path: 'products/shared/fonts/font-beyond.ttf',
            name: 'Beyond Perfection',
            family: 'BeyondPerfection',
            type: 'script decorative',
            vietnameseSupport: false,
            suggestedFor: 'Ten cap doi (khong dau), tieu de lon trang tri, chu ky',
            sampleText: 'Thanh & Dat'
        },
        {
            path: 'products/shared/fonts/font-hastegi.otf',
            name: 'Hastegi',
            family: 'Hastegi',
            type: 'serif display',
            vietnameseSupport: false,
            suggestedFor: 'Ngay thang, so dem nguoc, display text lon, heading',
            sampleText: '28.06.2025'
        },
        {
            path: 'products/shared/fonts/font-lora.ttf',
            name: 'Lora Regular',
            family: 'Lora',
            type: 'serif body',
            vietnameseSupport: true,
            suggestedFor: 'Noi dung chinh, doan van, thong tin chi tiet, body text',
            sampleText: 'Tran hon le thanh cong vien man'
        },
        {
            path: 'products/shared/fonts/font-lora-semibold.ttf',
            name: 'Lora Semibold',
            family: 'Lora-Semibold',
            type: 'serif heading',
            vietnameseSupport: true,
            suggestedFor: 'Heading section, ten phan, label quan trong',
            sampleText: 'Thiep Moi'
        },
        {
            path: 'products/shared/fonts/font-rift.ttf',
            name: 'Rift',
            family: 'Rift',
            type: 'sans-serif display',
            vietnameseSupport: false,
            suggestedFor: 'Countdown separators, so lon, ky tu dac biet, ngay/thang/nam',
            sampleText: 'NGAY | GIO | PHUT | GIAY'
        },
        {
            path: 'products/shared/fonts/font-uvn-hoatay.ttf',
            name: 'UVN Hoa Tay',
            family: 'UVNHoaTay',
            type: 'Vietnamese handwriting',
            vietnameseSupport: true,
            suggestedFor: 'Nhan viet tay, ten khach moi, loi chuc, chu ky tieng Viet',
            sampleText: 'Kinh moi'
        },
        {
            path: 'products/shared/fonts/cormorant-garamond-regular.woff2',
            name: 'Cormorant Garamond Regular',
            family: 'CormorantGaramond',
            type: 'serif body',
            vietnameseSupport: true,
            suggestedFor: 'Body text elegant, mo ta, thong tin, heritage theme',
            sampleText: 'Nous nous marions'
        },
        {
            path: 'products/shared/fonts/cormorant-garamond-italic.woff2',
            name: 'Cormorant Garamond Italic',
            family: 'CormorantGaramond-Italic',
            type: 'serif italic',
            vietnameseSupport: true,
            suggestedFor: 'Quote, highlight, caption nghieng, heritage theme',
            sampleText: 'Notre histoire'
        },
        {
            path: 'products/shared/fonts/great-vibes.woff2',
            name: 'Great Vibes',
            family: 'GreatVibes',
            type: 'script decorative',
            vietnameseSupport: false,
            suggestedFor: 'Ten cap doi, tieu de script, chu ky sang trong',
            sampleText: 'Alex & Diane'
        },
        {
            path: 'products/shared/fonts/montserrat.woff2',
            name: 'Montserrat',
            family: 'Montserrat',
            type: 'sans-serif body',
            vietnameseSupport: true,
            suggestedFor: 'UI text, button, nav, label, modern sans',
            sampleText: 'RSVP'
        }
    ],

    /* ============================================
       GENERAL ICONS (Social & UI)
       ============================================ */
    generalIcons: [
        {
            path: 'products/shared/images/icons/favicon.webp',
            name: 'Favicon',
            description: 'Icon favicon cho tab trinh duyet',
            tags: ['favicon', 'browser', 'tab']
        },
        {
            path: 'products/shared/images/icons/fb-icon.webp',
            name: 'Facebook Icon',
            description: 'Icon Facebook - link mang xa hoi',
            tags: ['facebook', 'social', 'contact']
        },
        {
            path: 'products/shared/images/icons/map-pin.webp',
            name: 'Map Pin',
            description: 'Icon dinh vi ban do - dia diem tiec cuoi',
            tags: ['map', 'location', 'pin', 'address', 'venue']
        },
        {
            path: 'products/shared/images/icons/tiktok-icon.webp',
            name: 'TikTok Icon',
            description: 'Icon TikTok - link mang xa hoi',
            tags: ['tiktok', 'social', 'contact']
        },
        {
            path: 'products/shared/images/icons/zalo-icon.webp',
            name: 'Zalo Icon',
            description: 'Icon Zalo - lien he OA hoac ca nhan',
            tags: ['zalo', 'social', 'contact', 'vietnam', 'messaging']
        }
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
            colors: ['gold', 'cream', 'white']
        },
        'romantic-modern': {
            name: 'Lãng Mạn Hiện Đại',
            photoSets: ['modern-romantic', 'coral-minimalist'],
            icons: ['character-romantic', 'calen-heart', 'heart-icon', 'deco-1'],
            elements: ['love-story-ornament', 'small-flower', 'timeline-1', 'timeline-2', 'timeline-3', 'timeline-4'],
            music: 'thousand-years',
            colors: ['blush', 'coral', 'rose']
        },
        'traditional-vietnamese': {
            name: 'Truyền Thống Việt Nam',
            photoSets: ['korean-studio-gray', 'viet-mem-mai'],
            icons: ['rong', 'phuong', 'chinese-happiness', 'double-happiness'],
            elements: ['heart-icon-el', 'and-symbol'],
            music: 'beautiful-in-white',
            colors: ['red', 'gold', 'cream']
        },
        'cute-chibi': {
            name: 'Dễ Thương Chibi',
            photoSets: ['korean-studio-white', 'korean-studio-gray'],
            icons: ['couple-chibi', 'double-happiness', 'cherry-blossom', 'decorative-diamond', 'decorative-flowers'],
            elements: ['small-flower', 'small-element'],
            music: 'sugar',
            colors: ['red', 'pink', 'white']
        },
        'sage-green-vintage': {
            name: 'Sage Green Vintage',
            photoSets: ['korean-studio-classic-beige', 'viet-green'],
            icons: ['wax-seal', 'bouquet-1', 'bouquet-2', 'divider-svg'],
            elements: ['sage-el-1', 'sage-el-2', 'sage-el-3', 'sage-el-4', 'sage-el-5', 'sage-el-6', 'leaf-left', 'leaf-right'],
            music: 'thousand-years',
            colors: ['sage', 'green', 'cream', 'white']
        },
        'dark-luxury': {
            name: 'Sang Trọng Tối',
            photoSets: ['elegant-black-gold'],
            icons: ['wax-seal', 'frame-1', 'deco-divider', 'deco-element'],
            elements: ['bride-frame', 'groom-frame'],
            music: 'beautiful-in-white',
            colors: ['black', 'gold', 'navy']
        },
        'fresh-green': {
            name: 'Xanh Lá Tươi Trẻ',
            photoSets: ['viet-green'],
            icons: ['bouquet-1', 'heart-icon', 'deco-1'],
            elements: ['leaf-left', 'leaf-right', 'small-flower', 'love-story-ornament'],
            music: 'sugar',
            colors: ['green', 'white', 'fresh']
        }
    }
};

/* ============================================
   QUERY HELPERS
   ============================================ */

/** Find backgrounds by filter (category, tags, colors, usage) */
function findBackgrounds(filters) {
    var items = WEDDING_DATA.backgrounds.items;
    if (!filters) return items;
    return items.filter(function(bg) {
        if (filters.category && bg.category !== filters.category) return false;
        if (filters.tags && !filters.tags.some(function(t) { return bg.tags.indexOf(t) !== -1; })) return false;
        if (filters.colors && !filters.colors.some(function(c) { return bg.colors.indexOf(c) !== -1; })) return false;
        if (filters.usage && !filters.usage.some(function(u) { return bg.usage.indexOf(u) !== -1; })) return false;
        return true;
    });
}

/** Find icons by tags */
function findIcons(tags) {
    return WEDDING_DATA.icons.items.filter(function(icon) {
        return tags.some(function(t) { return icon.tags.indexOf(t) !== -1; });
    });
}

/** Find elements by tags */
function findElements(tags) {
    return WEDDING_DATA.elements.items.filter(function(el) {
        return tags.some(function(t) { return el.tags.indexOf(t) !== -1; });
    });
}

/** Find photo sets by tags */
function findPhotoSets(tags) {
    return WEDDING_DATA.photoCollections.filter(function(set) {
        return tags.some(function(t) {
            return set.tags.indexOf(t) !== -1 || set.colors.indexOf(t) !== -1 || (set.matchPalettes && set.matchPalettes.indexOf(t) !== -1);
        });
    });
}

/** Find music by tags */
function findMusic(tags) {
    return WEDDING_DATA.music.filter(function(m) {
        return tags.some(function(t) { return m.tags.indexOf(t) !== -1; });
    });
}

/** Get style preset by name */
function getStylePreset(name) {
    return WEDDING_DATA.stylePresets[name] || null;
}

// Node.js compat
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WEDDING_DATA: WEDDING_DATA, findBackgrounds: findBackgrounds, findIcons: findIcons, findElements: findElements, findPhotoSets: findPhotoSets, findMusic: findMusic, getStylePreset: getStylePreset };
}
