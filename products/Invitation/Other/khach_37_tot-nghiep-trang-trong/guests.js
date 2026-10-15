/*
 * Danh sách khách mời — thiệp tốt nghiệp Lê Thuận Hưng (mẫu A, gửi phụ huynh / họ hàng).
 * Link: ?id=<số> → thiệp tra tên, hiện ở dòng "Kính mời" và thay cách xưng hô trong lời mời.
 *   name: tên hiện trên thiệp · title: cách gọi khách trong câu mời · self: cách Hưng tự xưng (con/em)
 * Nguồn: inputs/Danh sách khách mời 01.xlsx (chuẩn, id 1–10) + 02.xlsx (bổ sung, id 11–14) — 15/10/2026
 * Vẫn dùng được ?ten=Tên+Khách cho khách chưa có trong danh sách.
 */
var GUEST_LIST = [
  { id: 1, name: "Mạnh thường quân trọn đời", title: "Mẹ", self: "con" },
  { id: 2, name: "Nhà tài trợ kim cương", title: "Ba", self: "con" },
  { id: 3, name: "A Dè & A Mà", title: "Ông Bà", self: "con" },
  { id: 4, name: "Cú Phò", title: "Bà", self: "con" },
  { id: 5, name: "A Bác & Bác Mụ", title: "Hai Bác", self: "con" },
  { id: 6, name: "Ông ngoại & Bà ngoại", title: "Ông Bà", self: "con" },
  { id: 7, name: "Dì Hai", title: "Dì", self: "con" },
  { id: 8, name: "Dì Tư", title: "Dì", self: "con" },
  { id: 9, name: "Gia đình Út Phượng", title: "cả gia đình", self: "con" },
  { id: 10, name: "Chị Châu Đỗ", title: "Chị", self: "em" },
  { id: 11, name: "Bác Nhất & Cô Tâm", title: "Bác và Cô", self: "con" },
  { id: 12, name: "Cô Hương", title: "Cô", self: "con" },
  { id: 13, name: "Tiệm Nhà Của Lá", title: "Quý tiệm", self: "em" },
  { id: 14, name: "Vinh Tho Team", title: "Team", self: "em" },
];
