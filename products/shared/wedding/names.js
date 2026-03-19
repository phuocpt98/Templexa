/**
 * Kho tên Việt Nam — dùng random khi gen mẫu thiệp cưới
 *
 * Cách dùng:
 *   const names = require('./names') hoặc đọc file
 *   const groom = GROOM_NAMES[Math.floor(Math.random() * GROOM_NAMES.length)];
 *   const bride = BRIDE_NAMES[Math.floor(Math.random() * BRIDE_NAMES.length)];
 *   // groom = { ho: 'Nguyễn', dem: 'Văn', ten: 'Minh', full: 'Nguyễn Văn Minh', display: 'Minh' }
 */

var GROOM_NAMES = [
    { ho: 'Nguyễn', dem: 'Văn', ten: 'Minh', full: 'Nguyễn Văn Minh', display: 'Minh' },
    { ho: 'Trần', dem: 'Đức', ten: 'Anh', full: 'Trần Đức Anh', display: 'Anh' },
    { ho: 'Lê', dem: 'Hoàng', ten: 'Phúc', full: 'Lê Hoàng Phúc', display: 'Phúc' },
    { ho: 'Phạm', dem: 'Quốc', ten: 'Bảo', full: 'Phạm Quốc Bảo', display: 'Bảo' },
    { ho: 'Hoàng', dem: 'Minh', ten: 'Khang', full: 'Hoàng Minh Khang', display: 'Khang' },
    { ho: 'Võ', dem: 'Thanh', ten: 'Tùng', full: 'Võ Thanh Tùng', display: 'Tùng' },
    { ho: 'Đặng', dem: 'Hữu', ten: 'Nghĩa', full: 'Đặng Hữu Nghĩa', display: 'Nghĩa' },
    { ho: 'Bùi', dem: 'Tiến', ten: 'Đạt', full: 'Bùi Tiến Đạt', display: 'Đạt' },
    { ho: 'Đỗ', dem: 'Quang', ten: 'Huy', full: 'Đỗ Quang Huy', display: 'Huy' },
    { ho: 'Ngô', dem: 'Viết', ten: 'Long', full: 'Ngô Viết Long', display: 'Long' },
    { ho: 'Dương', dem: 'Thành', ten: 'Nam', full: 'Dương Thành Nam', display: 'Nam' },
    { ho: 'Lý', dem: 'Gia', ten: 'Hưng', full: 'Lý Gia Hưng', display: 'Hưng' },
    { ho: 'Trương', dem: 'Công', ten: 'Thành', full: 'Trương Công Thành', display: 'Thành' },
    { ho: 'Huỳnh', dem: 'Nhật', ten: 'Duy', full: 'Huỳnh Nhật Duy', display: 'Duy' },
    { ho: 'Phan', dem: 'Trung', ten: 'Kiên', full: 'Phan Trung Kiên', display: 'Kiên' },
    { ho: 'Vũ', dem: 'Đình', ten: 'Khôi', full: 'Vũ Đình Khôi', display: 'Khôi' },
    { ho: 'Tạ', dem: 'Minh', ten: 'Tuấn', full: 'Tạ Minh Tuấn', display: 'Tuấn' },
    { ho: 'Mai', dem: 'Xuân', ten: 'Hải', full: 'Mai Xuân Hải', display: 'Hải' },
    { ho: 'Lâm', dem: 'Quốc', ten: 'Việt', full: 'Lâm Quốc Việt', display: 'Việt' },
    { ho: 'Cao', dem: 'Bá', ten: 'Thiện', full: 'Cao Bá Thiện', display: 'Thiện' },
];

var BRIDE_NAMES = [
    { ho: 'Trần', dem: 'Thị', ten: 'Ngọc', full: 'Trần Thị Ngọc', display: 'Ngọc' },
    { ho: 'Nguyễn', dem: 'Thuỳ', ten: 'Linh', full: 'Nguyễn Thuỳ Linh', display: 'Linh' },
    { ho: 'Lê', dem: 'Phương', ten: 'Anh', full: 'Lê Phương Anh', display: 'Anh' },
    { ho: 'Phạm', dem: 'Ngọc', ten: 'Hà', full: 'Phạm Ngọc Hà', display: 'Hà' },
    { ho: 'Hoàng', dem: 'Thị', ten: 'Thảo', full: 'Hoàng Thị Thảo', display: 'Thảo' },
    { ho: 'Võ', dem: 'Thanh', ten: 'Trúc', full: 'Võ Thanh Trúc', display: 'Trúc' },
    { ho: 'Đặng', dem: 'Thu', ten: 'Hương', full: 'Đặng Thu Hương', display: 'Hương' },
    { ho: 'Bùi', dem: 'Minh', ten: 'Châu', full: 'Bùi Minh Châu', display: 'Châu' },
    { ho: 'Đỗ', dem: 'Khánh', ten: 'Vy', full: 'Đỗ Khánh Vy', display: 'Vy' },
    { ho: 'Ngô', dem: 'Bảo', ten: 'Ngân', full: 'Ngô Bảo Ngân', display: 'Ngân' },
    { ho: 'Dương', dem: 'Quỳnh', ten: 'Như', full: 'Dương Quỳnh Như', display: 'Như' },
    { ho: 'Lý', dem: 'Thanh', ten: 'Mai', full: 'Lý Thanh Mai', display: 'Mai' },
    { ho: 'Trương', dem: 'Thị', ten: 'Lan', full: 'Trương Thị Lan', display: 'Lan' },
    { ho: 'Huỳnh', dem: 'Ngọc', ten: 'Diễm', full: 'Huỳnh Ngọc Diễm', display: 'Diễm' },
    { ho: 'Phan', dem: 'Thuý', ten: 'Kiều', full: 'Phan Thuý Kiều', display: 'Kiều' },
    { ho: 'Vũ', dem: 'Hoài', ten: 'Thu', full: 'Vũ Hoài Thu', display: 'Thu' },
    { ho: 'Tạ', dem: 'Yến', ten: 'Nhi', full: 'Tạ Yến Nhi', display: 'Nhi' },
    { ho: 'Mai', dem: 'Tuyết', ten: 'Trinh', full: 'Mai Tuyết Trinh', display: 'Trinh' },
    { ho: 'Lâm', dem: 'Phương', ten: 'Uyên', full: 'Lâm Phương Uyên', display: 'Uyên' },
    { ho: 'Cao', dem: 'Thị', ten: 'Trang', full: 'Cao Thị Trang', display: 'Trang' },
];

/**
 * Random 1 cặp tên chú rể + cô dâu (không trùng họ)
 * @returns {{ groom: object, bride: object }}
 */
function randomCouple() {
    var g = GROOM_NAMES[Math.floor(Math.random() * GROOM_NAMES.length)];
    var b;
    do {
        b = BRIDE_NAMES[Math.floor(Math.random() * BRIDE_NAMES.length)];
    } while (b.ho === g.ho); // tránh trùng họ
    return { groom: g, bride: b };
}

/**
 * Random tên bố mẹ (cùng họ con)
 * @param {string} ho - Họ của con
 * @param {string} side - 'trai' hoặc 'gai'
 * @returns {{ father: string, mother: string }}
 */
function randomParents(ho, side) {
    var fatherDem = ['Văn', 'Hữu', 'Đức', 'Quốc', 'Minh', 'Trung', 'Thành', 'Xuân'];
    var fatherTen = ['Hùng', 'Dũng', 'Cường', 'Thắng', 'Phong', 'Hải', 'Sơn', 'Tuấn'];
    var motherHo = ['Trần', 'Nguyễn', 'Lê', 'Phạm', 'Hoàng', 'Võ', 'Đặng', 'Bùi'];
    var motherDem = ['Thị', 'Thu', 'Ngọc', 'Thanh', 'Kim', 'Phương', 'Hồng', 'Bích'];
    var motherTen = ['Lan', 'Hoa', 'Mai', 'Hương', 'Nga', 'Thuỷ', 'Hạnh', 'Oanh'];

    var fd = fatherDem[Math.floor(Math.random() * fatherDem.length)];
    var ft = fatherTen[Math.floor(Math.random() * fatherTen.length)];
    var mh = motherHo[Math.floor(Math.random() * motherHo.length)];
    var md = motherDem[Math.floor(Math.random() * motherDem.length)];
    var mt = motherTen[Math.floor(Math.random() * motherTen.length)];

    return {
        father: 'Ông ' + ho + ' ' + fd + ' ' + ft,
        mother: 'Bà ' + mh + ' ' + md + ' ' + mt,
    };
}
