// Profile
const authorBrielf = {
  name: "Bùi Ngọc Tài",
  workingPlace: "Working at FPT Software",
  address: "District 8, Ho Chi Minh city",
  phone: "0983053600",
};

const skillGroup = {
  programmer: "Developer",
  writer: "Writer",
  sharer: "Sharer",
  linkedin: "Linkedin",
};

const skillDescribe = {
  programmer: "Front-End, Backend-End,Machine learning & Deep learning",
  writer: "Blog & Content creator",
  sharer: "Philosophy & Psychology",
};

const contentIntro = {
  reasonFBLink:
    "Các thông tin cung cấp bên trên giúp hệ thống xác định được chủ đề bài viết phù hợp cho người dùng. Mục tiêu giai đoạn đầu 70% manaual system, giai đoạn sau 70% automative system",
  appFunctional_1:
    "Tương lai gần, xây dựng hệ thống cá nhân hóa cây thông tin người dùng. Một phần hệ thống là tự động, một phần thủ công nhằm đảm bảo chất lượng bài viết.",
  appFunctional_2:
    "Tương lai xa, khi đã nhiều dữ liệu về cả định lượng và định tính, hệ thống hướng đến là RECOMMENDER SYSTEM và CHATBOT tích hợp Machine learning/Deep learning giúp người dùng tìm mạng lưới người chia sẻ phù hợp.",
};

const COOKIE_NAMES = {
  ACCESS_TOKEN: "idToken",
};

const REQUEST_TIMEOUT = 300000; // 5 PHÚT

const TOPIC_TRANSLATE_CONTENT = [
  {
    eng: "Front End",
    vn: "Lập Trình Front End",
  },
  {
    eng: "Back End",
    vn: "Lập Trình Back End",
  },
  {
    eng: "AI/ML/DL Research",
    vn: "Nguyên Cứu AI/ML/DL",
  },
  {
    eng: "Philosophy",
    vn: "Triết Học",
  },
  {
    eng: "Psychology",
    vn: "Tâm Lý Học",
  },
  {
    eng: "Sociology",
    vn: "Xã Hội Học",
  },
  {
    eng: "Sales",
    vn: "Bán Hàng",
  },
  {
    eng: "Marketing",
    vn: "Marketing",
  },
  {
    eng: "LeaderShip",
    vn: "Lãnh Đạo",
  },
  {
    eng: "Administration",
    vn: "Quản Trị",
  },
  {
    eng: "Personal View",
    vn: "Góc Nhìn Cá Nhân",
  },
];

const DIALOG_CODE = {
  MSG1: "Để có trải nghiệm tốt nhất, vui lòng cung cấp thông tin cần thiết!",
  MSG2: "Bạn là admin. Hệ thống đang chuyển sang trang quản lý bài viết.",
  MSG3: "Tính năng gửi thông báo qua Facebook Messenger đang phát triển.",
  MSG4: "Tính năng đề nghị gửi bài viết đang phát triển.",
};

const FACEBOOK_DEV = {
  PAGE_ACCESS_TOKEN:
    "EAAVvoN2edJABAJEqQ585UC7FDga1Ku02jazR2ZBvcY3TPnmTQYG88jSp4XD2PABoaOO2znzfoZACCpq06YMJJ7CKT7rLQE79Khhkbww6tw8x6nig6TfZB9I59CU2YSpgwxzvYsiOlNbeTcZBUGvfMBZBXOMUWYJ808POUfYBUhwZDZD",
  ADMIN_MESSENGER_ID: "3119991678020925",
};

export {
  authorBrielf,
  skillGroup,
  skillDescribe,
  contentIntro,
  COOKIE_NAMES,
  REQUEST_TIMEOUT,
  TOPIC_TRANSLATE_CONTENT,
  DIALOG_CODE,
  FACEBOOK_DEV,
};
