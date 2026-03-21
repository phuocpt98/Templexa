/**
 * SHARED_DATA — Catalog of all shared resources for wedding invitation templates.
 *
 * Used by AI (e.g. /gen-wedding) to understand what resources are available
 * and choose the right assets for each template.
 *
 * All paths are relative from the project root (Templexa/).
 */

var SHARED_DATA = {

    // =========================================================================
    // MUSIC
    // =========================================================================
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
            suggestedFor: 'Nhac cuoi kinh dien, phu hop moi phong cach'
        },
        {
            path: 'products/shared/music/wedding/Beautiful In White.mp3',
            name: 'Beautiful In White',
            genre: 'wedding',
            mood: 'romantic, dreamy, wedding ceremony',
            tags: ['wedding anthem', 'Shane Filan', 'white dress', 'ceremony'],
            suggestedFor: 'Thiep cuoi trang nha, co dau ao trang, sang trong'
        },
        {
            path: 'products/shared/music/wedding/Sugar.mp3',
            name: 'Sugar',
            genre: 'wedding',
            mood: 'fun, sweet, upbeat',
            tags: ['Maroon 5', 'fun', 'party', 'sweet'],
            suggestedFor: 'Thiep cuoi vui nhon, phong cach hien dai, tre'
        }
    ],

    // =========================================================================
    // FONTS
    // =========================================================================
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

    // =========================================================================
    // PHOTO COLLECTIONS
    // =========================================================================
    photoCollections: [
        {
            id: 'korean-studio-white',
            name: 'Korean Studio White',
            folder: 'products/shared/images/wedding/korean-studio-white/',
            count: 6,
            style: 'Korean studio, white/cream background, clean minimal',
            tags: ['korean', 'studio', 'white', 'cream', 'minimal', 'clean', 'bright'],
            description: 'Bo anh couple phong cach Hàn Quốc, phong trang/kem, anh sang sach se. Phu hop thiep cuoi toi gian, hien dai.',
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
            tags: ['korean', 'studio', 'beige', 'classic', 'warm', 'elegant', 'vintage'],
            description: 'Bo anh couple Hàn Quốc tong be am, da dang goc chup: doi, ca nhan, xe hoa, phao hoa. Phu hop thiep cuoi co dien, am cung.',
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
            tags: ['korean', 'studio', 'gray', 'modern', 'moody', 'sophisticated'],
            description: 'Bo anh couple Hàn Quốc nen xam, hien dai, sang trong. Phu hop thiep cuoi dark theme hoac minimalist.',
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
            tags: ['coral', 'minimalist', 'pink', 'soft', 'warm', 'studio', 'clean'],
            description: 'Bo anh phong cach toi gian mau coral/hong nhat, da dang: hero, album, story, event, portrait. Day du cho moi section cua thiep.',
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
            tags: ['elegant', 'black', 'gold', 'luxury', 'dark', 'formal', 'premium'],
            description: 'Bo anh phong cach sang trong, nen toi/den vang, co portrait rieng co dau va chu re. Phu hop thiep cuoi luxury, dark theme.',
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
            tags: ['modern', 'romantic', 'natural', 'bright', 'contemporary', 'versatile'],
            description: 'Bo 13 anh couple hien dai, lang man, anh sang tu nhien. Da dang goc chup, phu hop nhieu phong cach thiep.',
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
            tags: ['vietnamese', 'green', 'nature', 'outdoor', 'warm', 'golden', 'traditional'],
            description: 'Bo anh couple Viet Nam ngoai troi xanh, da dang: anh doi, anh don, hoa cuoi, bia. Phu hop thiep cuoi truyen thong Viet, tu nhien.',
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
            tags: ['vietnamese', 'soft', 'gentle', 'pastel', 'dreamy', 'romantic', 'light'],
            description: 'Bo 12 anh couple Viet Nam tong mem mai, pastel, mong mo. Phu hop thiep cuoi nhẹ nhang, nữ tinh, phong cach watercolor.',
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
            tags: ['vietnamese', 'elegant', 'formal', 'studio', 'premium', 'high-quality'],
            description: 'Bo anh couple Viet Nam sang trong, 13 anh webp + 13 anh jpg goc. Chat luong cao, da dang goc chup. Phu hop thiep cuoi cao cap.',
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

    // =========================================================================
    // ICONS (Social & UI)
    // =========================================================================
    icons: [
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

    // =========================================================================
    // WEDDING ELEMENTS (Decorative assets for template sections)
    // =========================================================================
    weddingElements: [
        {
            path: 'products/shared/images/wedding-elements/and-symbol.webp',
            name: 'And Symbol',
            description: 'Ky hieu "&" trang tri giua ten co dau va chu re',
            tags: ['and', 'symbol', 'ampersand', 'couple name'],
            suggestedUse: 'Dat giua ten co dau & chu re trong hero/header section'
        },
        {
            path: 'products/shared/images/wedding-elements/asset-1.webp',
            name: 'Decorative Asset',
            description: 'Element trang tri dung chung, hoa la botanical',
            tags: ['decorative', 'ornament', 'botanical'],
            suggestedUse: 'Trang tri goc section, filler element'
        },
        {
            path: 'products/shared/images/wedding-elements/bride-frame.webp',
            name: 'Bride Frame',
            description: 'Khung anh trang tri cho portrait co dau',
            tags: ['frame', 'bride', 'portrait', 'border'],
            suggestedUse: 'Bao quanh anh chan dung co dau trong couple introduction section'
        },
        {
            path: 'products/shared/images/wedding-elements/groom-frame.webp',
            name: 'Groom Frame',
            description: 'Khung anh trang tri cho portrait chu re',
            tags: ['frame', 'groom', 'portrait', 'border'],
            suggestedUse: 'Bao quanh anh chan dung chu re trong couple introduction section'
        },
        {
            path: 'products/shared/images/wedding-elements/calendar-bg.webp',
            name: 'Calendar Background',
            description: 'Background cho phan lich/save-the-date',
            tags: ['calendar', 'background', 'date', 'save-the-date'],
            suggestedUse: 'Background section lich cuoi, save the date'
        },
        {
            path: 'products/shared/images/wedding-elements/countdown-deco.webp',
            name: 'Countdown Decoration',
            description: 'Trang tri xung quanh dem nguoc ngay cuoi',
            tags: ['countdown', 'decoration', 'timer'],
            suggestedUse: 'Trang tri section countdown, dat canh cac o dem nguoc'
        },
        {
            path: 'products/shared/images/wedding-elements/heart-icon.webp',
            name: 'Heart Icon',
            description: 'Icon trai tim - danh dau ngay cuoi tren lich',
            tags: ['heart', 'icon', 'love', 'calendar', 'highlight'],
            suggestedUse: 'Danh dau ngay cuoi tren calendar, hoac icon love story'
        },
        {
            path: 'products/shared/images/wedding-elements/leaf-left.webp',
            name: 'Leaf Left',
            description: 'La cay trang tri ben trai',
            tags: ['leaf', 'left', 'botanical', 'nature', 'decoration'],
            suggestedUse: 'Trang tri ben trai section, doi xung voi leaf-right'
        },
        {
            path: 'products/shared/images/wedding-elements/leaf-right.webp',
            name: 'Leaf Right',
            description: 'La cay trang tri ben phai',
            tags: ['leaf', 'right', 'botanical', 'nature', 'decoration'],
            suggestedUse: 'Trang tri ben phai section, doi xung voi leaf-left'
        },
        {
            path: 'products/shared/images/wedding-elements/group-16.webp',
            name: 'Leaf Vine',
            description: 'Day la/vine trang tri, ngang hoac doc',
            tags: ['vine', 'leaf', 'divider', 'botanical', 'garland'],
            suggestedUse: 'Divider giua cac section, trang tri doc timeline'
        },
        {
            path: 'products/shared/images/wedding-elements/love-story-ornament.webp',
            name: 'Love Story Ornament',
            description: 'Hoa van trang tri cho phan love story/timeline',
            tags: ['love story', 'ornament', 'timeline', 'decoration'],
            suggestedUse: 'Trang tri section love story, dat canh timeline'
        },
        {
            path: 'products/shared/images/wedding-elements/small-element.webp',
            name: 'Small Element',
            description: 'Element nho trang tri, botanical nho gon',
            tags: ['small', 'element', 'filler', 'botanical', 'subtle'],
            suggestedUse: 'Filler nho giua cac noi dung, goc card, spacing deco'
        },
        {
            path: 'products/shared/images/wedding-elements/small-flower.webp',
            name: 'Small Flower',
            description: 'Hoa nho trang tri, dung lam accent',
            tags: ['flower', 'small', 'accent', 'botanical', 'delicate'],
            suggestedUse: 'Accent nho canh text, bullet point hoa, goc section'
        },
        {
            path: 'products/shared/images/wedding-elements/popup-deco.webp',
            name: 'Popup Decoration 1',
            description: 'Trang tri cho popup/modal - hoa la vien',
            tags: ['popup', 'modal', 'decoration', 'border'],
            suggestedUse: 'Trang tri vien popup gui loi chuc, RSVP modal'
        },
        {
            path: 'products/shared/images/wedding-elements/popup-deco2.webp',
            name: 'Popup Decoration 2',
            description: 'Trang tri popup/modal - kieu khac',
            tags: ['popup', 'modal', 'decoration', 'alternative'],
            suggestedUse: 'Trang tri popup kieu 2, co the dung cho thank-you popup'
        },
        {
            path: 'products/shared/images/wedding-elements/popup-frame.webp',
            name: 'Popup Frame',
            description: 'Khung trang tri cho popup content',
            tags: ['popup', 'frame', 'modal', 'border'],
            suggestedUse: 'Khung bao quanh noi dung popup loi chuc'
        },
        {
            path: 'products/shared/images/wedding-elements/popup2-bg.webp',
            name: 'Popup Background',
            description: 'Hinh nen cho popup - paper/texture',
            tags: ['popup', 'background', 'texture', 'paper'],
            suggestedUse: 'Background popup, lam nen giay vintage/paper texture'
        },
        {
            path: 'products/shared/images/wedding-elements/timeline-1.webp',
            name: 'Timeline Icon 1',
            description: 'Icon timeline buoc 1 - gap go / first meet',
            tags: ['timeline', 'icon', 'step', 'love story', 'first meet'],
            suggestedUse: 'Icon cho buoc 1 trong love story timeline'
        },
        {
            path: 'products/shared/images/wedding-elements/timeline-2.webp',
            name: 'Timeline Icon 2',
            description: 'Icon timeline buoc 2 - hen ho / dating',
            tags: ['timeline', 'icon', 'step', 'love story', 'dating'],
            suggestedUse: 'Icon cho buoc 2 trong love story timeline'
        },
        {
            path: 'products/shared/images/wedding-elements/timeline-3.webp',
            name: 'Timeline Icon 3',
            description: 'Icon timeline buoc 3 - cau hon / proposal',
            tags: ['timeline', 'icon', 'step', 'love story', 'proposal'],
            suggestedUse: 'Icon cho buoc 3 trong love story timeline'
        },
        {
            path: 'products/shared/images/wedding-elements/timeline-4.webp',
            name: 'Timeline Icon 4',
            description: 'Icon timeline buoc 4 - dam cuoi / wedding',
            tags: ['timeline', 'icon', 'step', 'love story', 'wedding'],
            suggestedUse: 'Icon cho buoc 4 trong love story timeline'
        },
        // --- Envelope / Card elements ---
        {
            path: 'products/shared/images/wedding-elements/element_0021_13.webp',
            name: 'Envelope Element 1',
            description: 'Element phong bi/card - hoa van goc',
            tags: ['envelope', 'card', 'corner', 'ornament'],
            suggestedUse: 'Trang tri goc phong bi mo thiep, corner card'
        },
        {
            path: 'products/shared/images/wedding-elements/element_0023_11.webp',
            name: 'Envelope Element 2',
            description: 'Element phong bi/card - hoa van trang tri',
            tags: ['envelope', 'card', 'ornament', 'floral'],
            suggestedUse: 'Trang tri phong bi, vien card thiep moi'
        },
        {
            path: 'products/shared/images/wedding-elements/element_0024_10.webp',
            name: 'Envelope Element 3',
            description: 'Element phong bi/card - botanical corner',
            tags: ['envelope', 'card', 'botanical', 'corner'],
            suggestedUse: 'Goc la phong bi, trang tri corner section'
        },
        {
            path: 'products/shared/images/wedding-elements/element_0025_9.webp',
            name: 'Envelope Element 4',
            description: 'Element phong bi/card - floral accent',
            tags: ['envelope', 'card', 'floral', 'accent'],
            suggestedUse: 'Trang tri accent phong bi, small deco'
        },
        {
            path: 'products/shared/images/wedding-elements/element_0027_7.webp',
            name: 'Envelope Element 5',
            description: 'Element phong bi/card - border ornament',
            tags: ['envelope', 'card', 'border', 'ornament'],
            suggestedUse: 'Vien trang tri phong bi, border section'
        },
        // --- Paper texture backgrounds ---
        {
            path: 'products/shared/images/wedding-elements/thiep-thanh-dat-element_0028_6.webp',
            name: 'Paper Texture 1',
            description: 'Nen giay nham/texture - tong am nau',
            tags: ['paper', 'texture', 'background', 'warm', 'vintage'],
            suggestedUse: 'Background section, tao cam giac giay vintage'
        },
        {
            path: 'products/shared/images/wedding-elements/thiep-thanh-dat-element_0029_5.webp',
            name: 'Paper Texture 2',
            description: 'Nen giay texture - tong nhat hon',
            tags: ['paper', 'texture', 'background', 'light', 'subtle'],
            suggestedUse: 'Background section nhe, lam nen cho text'
        },
        {
            path: 'products/shared/images/wedding-elements/thiep-thanh-dat-element_0030_4.webp',
            name: 'Paper Texture 3',
            description: 'Nen giay texture - co hoa van nhe',
            tags: ['paper', 'texture', 'background', 'pattern'],
            suggestedUse: 'Background co hoa van, section info/details'
        },
        {
            path: 'products/shared/images/wedding-elements/thiep-thanh-dat-element_0031_3.webp',
            name: 'Paper Texture 4',
            description: 'Nen giay texture - dam hon, vintage feel',
            tags: ['paper', 'texture', 'background', 'dark', 'vintage'],
            suggestedUse: 'Background dam, section contrast, vintage style'
        },
        {
            path: 'products/shared/images/wedding-elements/thiep-thanh-dat-element_0032_2.webp',
            name: 'Paper Texture 5',
            description: 'Nen giay texture - tong trung tinh',
            tags: ['paper', 'texture', 'background', 'neutral'],
            suggestedUse: 'Background trung tinh, de doc text, section chinh'
        },
        {
            path: 'products/shared/images/wedding-elements/thiep-thanh-dat-element_0033_1.webp',
            name: 'Paper Texture 6',
            description: 'Nen giay texture - sang nhat, clean',
            tags: ['paper', 'texture', 'background', 'lightest', 'clean'],
            suggestedUse: 'Background sang nhat, section trang nha, phu hop text dam'
        }
    ],

    // =========================================================================
    // WEDDING ICONS (Themed illustration icons for invitation sections)
    // =========================================================================
    weddingIcons: [
        {
            path: 'products/shared/images/wedding/icons/bouquet-1.webp',
            name: 'Bouquet 1',
            description: 'Bo hoa cuoi kieu 1 - classic round bouquet',
            tags: ['bouquet', 'flower', 'wedding', 'classic']
        },
        {
            path: 'products/shared/images/wedding/icons/bouquet-2.webp',
            name: 'Bouquet 2',
            description: 'Bo hoa cuoi kieu 2 - alternate style',
            tags: ['bouquet', 'flower', 'wedding', 'alternative']
        },
        {
            path: 'products/shared/images/wedding/icons/calen-heart.webp',
            name: 'Calendar Heart',
            description: 'Lich voi trai tim - save the date icon',
            tags: ['calendar', 'heart', 'date', 'save-the-date']
        },
        {
            path: 'products/shared/images/wedding/icons/calen-heart-2.webp',
            name: 'Calendar Heart 2',
            description: 'Lich trai tim kieu 2 - alternate calendar icon',
            tags: ['calendar', 'heart', 'date', 'save-the-date', 'alternative']
        },
        {
            path: 'products/shared/images/wedding/icons/character-elegant.webp',
            name: 'Character Elegant',
            description: 'Nhan vat co dau chu re - phong cach sang trong',
            tags: ['character', 'couple', 'elegant', 'illustration', 'chibi']
        },
        {
            path: 'products/shared/images/wedding/icons/character-romantic.webp',
            name: 'Character Romantic',
            description: 'Nhan vat co dau chu re - phong cach lang man',
            tags: ['character', 'couple', 'romantic', 'illustration', 'chibi']
        },
        {
            path: 'products/shared/images/wedding/icons/cherry-blossom.webp',
            name: 'Cherry Blossom',
            description: 'Hoa anh dao - trang tri Asian style',
            tags: ['cherry blossom', 'sakura', 'flower', 'asian', 'spring']
        },
        {
            path: 'products/shared/images/wedding/icons/chinese-happiness.webp',
            name: 'Chinese Happiness',
            description: 'Chu Hi (Song Hy) - phong cach Trung Hoa',
            tags: ['chinese', 'happiness', 'double happiness', 'traditional', 'asian']
        },
        {
            path: 'products/shared/images/wedding/icons/couple-chibi.webp',
            name: 'Couple Chibi',
            description: 'Cap doi chibi de thuong - illustration cute',
            tags: ['couple', 'chibi', 'cute', 'cartoon', 'illustration']
        },
        {
            path: 'products/shared/images/wedding/icons/crop-shape.webp',
            name: 'Crop Shape',
            description: 'Khung cat anh dac biet - shape mask',
            tags: ['crop', 'shape', 'mask', 'frame', 'photo']
        },
        {
            path: 'products/shared/images/wedding/icons/deco-1.webp',
            name: 'Deco 1',
            description: 'Hoa van trang tri 1 - floral ornament',
            tags: ['decoration', 'ornament', 'floral', 'accent']
        },
        {
            path: 'products/shared/images/wedding/icons/deco-divider.webp',
            name: 'Deco Divider',
            description: 'Duong chia ngan trang tri - section divider',
            tags: ['divider', 'separator', 'ornament', 'section']
        },
        {
            path: 'products/shared/images/wedding/icons/deco-divider-2.webp',
            name: 'Deco Divider 2',
            description: 'Duong chia ngan trang tri kieu 2',
            tags: ['divider', 'separator', 'ornament', 'section', 'alternative']
        },
        {
            path: 'products/shared/images/wedding/icons/deco-element.webp',
            name: 'Deco Element',
            description: 'Element trang tri tong quat - versatile deco',
            tags: ['decoration', 'element', 'versatile', 'ornament']
        },
        {
            path: 'products/shared/images/wedding/icons/deco-footer.webp',
            name: 'Deco Footer',
            description: 'Trang tri phan cuoi thiep - footer decoration',
            tags: ['footer', 'decoration', 'bottom', 'ending']
        },
        {
            path: 'products/shared/images/wedding/icons/decorative-diamond.webp',
            name: 'Decorative Diamond',
            description: 'Hinh thoi trang tri - geometric accent',
            tags: ['diamond', 'geometric', 'decorative', 'accent', 'shape']
        },
        {
            path: 'products/shared/images/wedding/icons/decorative-flowers.webp',
            name: 'Decorative Flowers',
            description: 'Cum hoa trang tri - floral cluster',
            tags: ['flowers', 'floral', 'cluster', 'decorative', 'botanical']
        },
        {
            path: 'products/shared/images/wedding/icons/divider.svg',
            name: 'Divider SVG',
            description: 'Duong chia section dang SVG - sac net moi kich thuoc',
            tags: ['divider', 'svg', 'vector', 'separator', 'scalable']
        },
        {
            path: 'products/shared/images/wedding/icons/double-happiness.webp',
            name: 'Double Happiness',
            description: 'Chu Song Hy truyen thong - traditional Vietnamese/Chinese wedding',
            tags: ['double happiness', 'traditional', 'chinese', 'vietnamese', 'symbol']
        },
        {
            path: 'products/shared/images/wedding/icons/frame-1.webp',
            name: 'Frame 1',
            description: 'Khung anh trang tri kieu 1 - photo frame ornate',
            tags: ['frame', 'border', 'photo', 'ornate']
        },
        {
            path: 'products/shared/images/wedding/icons/frame-2.webp',
            name: 'Frame 2',
            description: 'Khung anh trang tri kieu 2 - alternate frame',
            tags: ['frame', 'border', 'photo', 'alternative']
        },
        {
            path: 'products/shared/images/wedding/icons/frame-3.webp',
            name: 'Frame 3',
            description: 'Khung anh trang tri kieu 3 - minimal frame',
            tags: ['frame', 'border', 'photo', 'minimal']
        },
        {
            path: 'products/shared/images/wedding/icons/happiness-1.webp',
            name: 'Happiness 1',
            description: 'Bieu tuong hanh phuc 1 - wedding happiness icon',
            tags: ['happiness', 'symbol', 'joy', 'celebration']
        },
        {
            path: 'products/shared/images/wedding/icons/happiness-2.webp',
            name: 'Happiness 2',
            description: 'Bieu tuong hanh phuc 2 - alternate happiness icon',
            tags: ['happiness', 'symbol', 'joy', 'celebration', 'alternative']
        },
        {
            path: 'products/shared/images/wedding/icons/heart-icon.webp',
            name: 'Heart Icon',
            description: 'Icon trai tim - love symbol',
            tags: ['heart', 'love', 'icon', 'symbol']
        },
        {
            path: 'products/shared/images/wedding/icons/phuong.webp',
            name: 'Phoenix (Phuong)',
            description: 'Chim phuong hoang - bieu tuong co dau, truyen thong Viet',
            tags: ['phoenix', 'phuong', 'bride', 'traditional', 'vietnamese', 'mythical']
        },
        {
            path: 'products/shared/images/wedding/icons/rong.webp',
            name: 'Dragon (Rong)',
            description: 'Rong - bieu tuong chu re, truyen thong Viet (Long Phung)',
            tags: ['dragon', 'rong', 'groom', 'traditional', 'vietnamese', 'mythical']
        },
        {
            path: 'products/shared/images/wedding/icons/wax-seal.webp',
            name: 'Wax Seal',
            description: 'Dau si lac/wax seal - phong cach co dien, sang trong',
            tags: ['wax seal', 'stamp', 'classic', 'elegant', 'vintage']
        },
        // --- Cinelove subfolder ---
        {
            path: 'products/shared/images/wedding/icons/cinelove/audio-icon.png',
            name: 'Audio Icon',
            description: 'Icon am thanh/nhac - nut play/pause music',
            tags: ['audio', 'music', 'icon', 'player', 'sound']
        },
        {
            path: 'products/shared/images/wedding/icons/cinelove/calen_heart_1.png',
            name: 'Calendar Heart (Cinelove)',
            description: 'Lich trai tim phong cach cinelove - save the date',
            tags: ['calendar', 'heart', 'cinelove', 'date']
        }
    ]
};
