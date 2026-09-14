/*
 * ============================================
 * DIGITAL CARD — Mapping slug → template key + OG meta
 * ============================================
 * URL người nhận: templexa.vn/card/{slug}/?n=<name>&j=<job>&c=<company>...
 * → iframe load:  ../../digital-card.html?t={tpl}&n=<name>&j=<job>&c=<company>...
 */
var DIGITAL_CARD = {
    'minimal': {
        tpl: 'minimal',
        title: 'Danh thiếp số — Minimal',
        description: 'Ai đó chia sẻ danh thiếp số với bạn. Mở link để xem!',
    },
    'dark': {
        tpl: 'dark',
        title: 'Danh thiếp số — Dark',
        description: 'Ai đó chia sẻ danh thiếp số với bạn. Mở link để xem!',
    },
    'gradient': {
        tpl: 'gradient',
        title: 'Danh thiếp số — Gradient',
        description: 'Ai đó chia sẻ danh thiếp số với bạn. Mở link để xem!',
    },
};
