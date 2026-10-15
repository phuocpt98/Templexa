/*
 * Danh sách khách mời — thiệp tốt nghiệp Lê Thuận Hưng (mẫu A, gửi phụ huynh / họ hàng).
 * Link: ?id=<số>  → thiệp tra tên, hiện ở dòng "Kính mời" và thay cách xưng hô trong lời mời.
 *   name  : tên hiện trên thiệp        title : cách gọi khách trong câu mời ("Trân trọng kính mời {title}…")
 *   self  : cách Hưng tự xưng (con/em)  — nguồn: inputs/Danh sách khách mời 02.xlsx (15/10/2026)
 * Vẫn dùng được ?ten=Tên+Khách cho khách chưa có trong danh sách.
 */
var GUEST_LIST = [
  { id: 1, name: "Bác Nhất & Cô Tâm", title: "Bác và Cô cùng gia đình", self: "con" },
  { id: 2, name: "Cô Hương", title: "Cô cùng gia đình", self: "con" },
  { id: 3, name: "Tiệm Nhà Của Lá", title: "Quý tiệm", self: "em" },
  { id: 4, name: "Vinh Tho Team", title: "Team", self: "em" },
];
