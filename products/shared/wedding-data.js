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
            { id: 'bg-traditional-vn-brown-lineart', file: 'traditional-vn/bg-traditional-vn-brown-lineart.webp', name: 'Thiep cuoi truyen thong nau', category: 'traditional-vn', tags: ['traditional', 'vietnamese', 'lineart', 'brown'], colors: ['brown', 'cream'], usage: ['hero-section', 'cover'] },
            { id: 'bg-traditional-vn-hy-gold-ornament', file: 'traditional-vn/bg-traditional-vn-hy-gold-ornament.webp', name: 'Khung hy vang ornament', category: 'traditional-vn', tags: ['traditional', 'hy', 'gold', 'ornament', 'cream'], colors: ['gold', 'cream'], usage: ['hero-section', 'full-page'] },
            { id: 'bg-floral-photo-arch-pastel-ring', file: 'floral-photo/bg-floral-photo-arch-pastel-ring.webp', name: 'Arch hoa that pastel nhan', category: 'floral-photo', tags: ['floral', 'photo', 'arch', 'pastel', 'ring'], colors: ['pastel', 'pink', 'cream'], usage: ['hero-section', 'cover'] },
            { id: 'bg-floral-photo-arch-ring-gold', file: 'floral-photo/bg-floral-photo-arch-ring-gold.webp', name: 'Arch nhan cuoi gold lace', category: 'floral-photo', tags: ['floral', 'photo', 'arch', 'ring', 'gold', 'lace'], colors: ['gold', 'cream'], usage: ['hero-section', 'cover'] },
            { id: 'bg-minimalist-black-floral-shadow', file: 'minimalist-clean/bg-minimalist-black-floral-shadow.webp', name: 'Hoa den shadow co day', category: 'minimalist-clean', tags: ['minimalist', 'black', 'floral', 'shadow', 'modern'], colors: ['black', 'white', 'gray'], usage: ['hero-section', 'full-page'] },
            { id: 'bg-minimalist-nude-cover-lineart', file: 'minimalist-clean/bg-minimalist-nude-cover-lineart.webp', name: 'Cover nude lineart hoa cuoi', category: 'minimalist-clean', tags: ['minimalist', 'nude', 'lineart', 'cover', 'wedding'], colors: ['nude', 'brown', 'cream'], usage: ['cover', 'envelope-section'] }
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
            { id: 'lily-white-bouquet-botanical', file: 'icons/lily-white-bouquet-botanical.webp', name: 'Bo hoa lily trang', tags: ['lily', 'white', 'bouquet', 'botanical'], usage: ['section-deco', 'corner-deco'] }
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
            { id: 'corner-rose-vine-watercolor-pink', file: 'wedding-elements/corner-rose-vine-watercolor-pink.webp', name: 'Day hoa hong leo goc watercolor', tags: ['rose', 'vine', 'watercolor', 'pink', 'corner'], usage: ['corner-deco', 'side-deco'] }
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
            id: 'vit-sang-trong',
            name: 'Vietnamese Elegant',
            folder: 'products/shared/images/wedding/vit-sang-trong/',
            count: 26,
            style: 'Vietnamese couple, elegant formal, studio quality, dual format jpg+webp',
            tags: ['vietnamese', 'elegant', 'formal', 'studio', 'premium', 'high-quality', 'navy', 'lavender'],
            colors: ['navy', 'white', 'lavender', 'purple-light'],
            mood: 'thanh lịch, Hàn Quốc studio, trang trọng',
            description: 'Bo anh couple Viet Nam sang trong, 13 anh webp + 13 anh jpg goc. Chat luong cao, da dang goc chup. Phu hop thiep cuoi cao cap.',
            hasPortrait: false,
            matchPalettes: ['navy-lavender', 'blue-romantic', 'lavender', 'modern-elegant'],
            files: {
                hero: 'couple_hero.webp',
                envelope: 'couple_2.webp',
                story: ['couple_4.webp', 'couple_7.webp'],
                gallery: ['couple_3.webp', 'couple_5.webp', 'couple_6.webp', 'couple_8.webp', 'couple_9.webp', 'couple_10.webp', 'couple_11.webp', 'couple_12.webp'],
                thankyou: 'couple_13.webp'
            },
            usedBy: [192],
            images: [
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_hero.webp', description: 'Hero couple - anh chinh lon' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_2.webp', description: 'Couple portrait 2' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_3.webp', description: 'Couple portrait 3' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_4.webp', description: 'Couple portrait 4' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_5.webp', description: 'Couple portrait 5' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_6.webp', description: 'Couple portrait 6' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_7.webp', description: 'Couple portrait 7' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_8.webp', description: 'Couple portrait 8' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_9.webp', description: 'Couple portrait 9' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_10.webp', description: 'Couple portrait 10' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_11.webp', description: 'Couple portrait 11' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_12.webp', description: 'Couple portrait 12' },
                { path: 'products/shared/images/wedding/vit-sang-trong/couple_13.webp', description: 'Couple portrait 13' }
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
