/*
 * ============================================
 * LỜI NHẮN QR — Mapping slug → template ID + OG meta
 * ============================================
 * Thêm mẫu mới: thêm 1 entry vào object bên dưới + tạo folder slug/index.html.
 *
 * URL người nhận: templexa.vn/loi-nhan/{slug}/?m=<message>&f=<from>
 * → iframe load:  ../../qr-msg.html?t={tpl}&m=<message>&f=<from>
 *
 * OG meta hardcode trong mỗi index.html vì Facebook/Zalo crawler không chạy JS.
 */
var LOI_NHAN = {
    'giay-trang': {
        tpl: 'plain',
        title: 'Lời nhắn — Giấy Trắng',
        description: 'Bạn có lời nhắn mới. Mở link để đọc!',
    },
    'thu-tay': {
        tpl: 'letter',
        title: 'Lời nhắn — Thư Tay',
        description: 'Bạn có lời nhắn mới — phong cách thư tay vintage ấm áp',
    },
    'chibi-yeu-thuong': {
        tpl: 'chibi-love',
        title: 'Lời nhắn — Chibi Yêu Thương',
        description: 'Bạn có lời nhắn yêu thương đáng yêu!',
    },
    'hoa-la': {
        tpl: 'floral',
        title: 'Lời nhắn — Hoa Lá',
        description: 'Bạn có lời nhắn mới — phong cách hoa lá nhẹ nhàng',
    },
};
