/**
 * Kho tên Việt Nam — dùng random khi gen mẫu thiệp cưới
 *
 * Cách dùng:
 *   const names = require('./names') hoặc đọc file
 *   const groom = GROOM_NAMES[Math.floor(Math.random() * GROOM_NAMES.length)];
 *   const bride = BRIDE_NAMES[Math.floor(Math.random() * BRIDE_NAMES.length)];
 *   // groom = { ho: 'Nguyễn', dem: 'Văn', ten: 'Minh', full: 'Nguyễn Văn Minh', display: 'Minh', displayDT: 'Văn Minh' }
 *   // display: chỉ tên (hero lớn, ký hiệu &)
 *   // displayDT: đệm + tên (thông tin lễ, envelope, sidebar)
 */

var GROOM_NAMES = [
    { ho: 'Nguyễn', dem: 'Văn', ten: 'Minh', full: 'Nguyễn Văn Minh', display: 'Minh', displayDT: 'Văn Minh' },
    { ho: 'Trần', dem: 'Đức', ten: 'Anh', full: 'Trần Đức Anh', display: 'Anh', displayDT: 'Đức Anh' },
    { ho: 'Lê', dem: 'Hoàng', ten: 'Phúc', full: 'Lê Hoàng Phúc', display: 'Phúc', displayDT: 'Hoàng Phúc' },
    { ho: 'Phạm', dem: 'Quốc', ten: 'Bảo', full: 'Phạm Quốc Bảo', display: 'Bảo', displayDT: 'Quốc Bảo' },
    { ho: 'Hoàng', dem: 'Minh', ten: 'Khang', full: 'Hoàng Minh Khang', display: 'Khang', displayDT: 'Minh Khang' },
    { ho: 'Võ', dem: 'Thanh', ten: 'Tùng', full: 'Võ Thanh Tùng', display: 'Tùng', displayDT: 'Thanh Tùng' },
    { ho: 'Đặng', dem: 'Hữu', ten: 'Nghĩa', full: 'Đặng Hữu Nghĩa', display: 'Nghĩa', displayDT: 'Hữu Nghĩa' },
    { ho: 'Bùi', dem: 'Tiến', ten: 'Đạt', full: 'Bùi Tiến Đạt', display: 'Đạt', displayDT: 'Tiến Đạt' },
    { ho: 'Đỗ', dem: 'Quang', ten: 'Huy', full: 'Đỗ Quang Huy', display: 'Huy', displayDT: 'Quang Huy' },
    { ho: 'Ngô', dem: 'Viết', ten: 'Long', full: 'Ngô Viết Long', display: 'Long', displayDT: 'Viết Long' },
    { ho: 'Dương', dem: 'Thành', ten: 'Nam', full: 'Dương Thành Nam', display: 'Nam', displayDT: 'Thành Nam' },
    { ho: 'Lý', dem: 'Gia', ten: 'Hưng', full: 'Lý Gia Hưng', display: 'Hưng', displayDT: 'Gia Hưng' },
    { ho: 'Trương', dem: 'Công', ten: 'Thành', full: 'Trương Công Thành', display: 'Thành', displayDT: 'Công Thành' },
    { ho: 'Huỳnh', dem: 'Nhật', ten: 'Duy', full: 'Huỳnh Nhật Duy', display: 'Duy', displayDT: 'Nhật Duy' },
    { ho: 'Phan', dem: 'Trung', ten: 'Kiên', full: 'Phan Trung Kiên', display: 'Kiên', displayDT: 'Trung Kiên' },
    { ho: 'Vũ', dem: 'Đình', ten: 'Khôi', full: 'Vũ Đình Khôi', display: 'Khôi', displayDT: 'Đình Khôi' },
    { ho: 'Tạ', dem: 'Minh', ten: 'Tuấn', full: 'Tạ Minh Tuấn', display: 'Tuấn', displayDT: 'Minh Tuấn' },
    { ho: 'Mai', dem: 'Xuân', ten: 'Hải', full: 'Mai Xuân Hải', display: 'Hải', displayDT: 'Xuân Hải' },
    { ho: 'Lâm', dem: 'Quốc', ten: 'Việt', full: 'Lâm Quốc Việt', display: 'Việt', displayDT: 'Quốc Việt' },
    { ho: 'Cao', dem: 'Bá', ten: 'Thiện', full: 'Cao Bá Thiện', display: 'Thiện', displayDT: 'Bá Thiện' },
];

var BRIDE_NAMES = [
    { ho: 'Trần', dem: 'Thị', ten: 'Ngọc', full: 'Trần Thị Ngọc', display: 'Ngọc', displayDT: 'Thị Ngọc' },
    { ho: 'Nguyễn', dem: 'Thuỳ', ten: 'Linh', full: 'Nguyễn Thuỳ Linh', display: 'Linh', displayDT: 'Thuỳ Linh' },
    { ho: 'Lê', dem: 'Phương', ten: 'Anh', full: 'Lê Phương Anh', display: 'Anh', displayDT: 'Phương Anh' },
    { ho: 'Phạm', dem: 'Ngọc', ten: 'Hà', full: 'Phạm Ngọc Hà', display: 'Hà', displayDT: 'Ngọc Hà' },
    { ho: 'Hoàng', dem: 'Thị', ten: 'Thảo', full: 'Hoàng Thị Thảo', display: 'Thảo', displayDT: 'Thị Thảo' },
    { ho: 'Võ', dem: 'Thanh', ten: 'Trúc', full: 'Võ Thanh Trúc', display: 'Trúc', displayDT: 'Thanh Trúc' },
    { ho: 'Đặng', dem: 'Thu', ten: 'Hương', full: 'Đặng Thu Hương', display: 'Hương', displayDT: 'Thu Hương' },
    { ho: 'Bùi', dem: 'Minh', ten: 'Châu', full: 'Bùi Minh Châu', display: 'Châu', displayDT: 'Minh Châu' },
    { ho: 'Đỗ', dem: 'Khánh', ten: 'Vy', full: 'Đỗ Khánh Vy', display: 'Vy', displayDT: 'Khánh Vy' },
    { ho: 'Ngô', dem: 'Bảo', ten: 'Ngân', full: 'Ngô Bảo Ngân', display: 'Ngân', displayDT: 'Bảo Ngân' },
    { ho: 'Dương', dem: 'Quỳnh', ten: 'Như', full: 'Dương Quỳnh Như', display: 'Như', displayDT: 'Quỳnh Như' },
    { ho: 'Lý', dem: 'Thanh', ten: 'Mai', full: 'Lý Thanh Mai', display: 'Mai', displayDT: 'Thanh Mai' },
    { ho: 'Trương', dem: 'Thị', ten: 'Lan', full: 'Trương Thị Lan', display: 'Lan', displayDT: 'Thị Lan' },
    { ho: 'Huỳnh', dem: 'Ngọc', ten: 'Diễm', full: 'Huỳnh Ngọc Diễm', display: 'Diễm', displayDT: 'Ngọc Diễm' },
    { ho: 'Phan', dem: 'Thuý', ten: 'Kiều', full: 'Phan Thuý Kiều', display: 'Kiều', displayDT: 'Thuý Kiều' },
    { ho: 'Vũ', dem: 'Hoài', ten: 'Thu', full: 'Vũ Hoài Thu', display: 'Thu', displayDT: 'Hoài Thu' },
    { ho: 'Tạ', dem: 'Yến', ten: 'Nhi', full: 'Tạ Yến Nhi', display: 'Nhi', displayDT: 'Yến Nhi' },
    { ho: 'Mai', dem: 'Tuyết', ten: 'Trinh', full: 'Mai Tuyết Trinh', display: 'Trinh', displayDT: 'Tuyết Trinh' },
    { ho: 'Lâm', dem: 'Phương', ten: 'Uyên', full: 'Lâm Phương Uyên', display: 'Uyên', displayDT: 'Phương Uyên' },
    { ho: 'Cao', dem: 'Thị', ten: 'Trang', full: 'Cao Thị Trang', display: 'Trang', displayDT: 'Thị Trang' },
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
