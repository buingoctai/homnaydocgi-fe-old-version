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
  MSG1:
    "Để có trải nghiệm tốt nhất, các tính năng nâng cao đang phát triển. Vui lòng đợi!",
  MSG2: "Bạn là admin. Hệ thống đang chuyển sang trang quản lý bài viết.",
  MSG3: "Tính năng gửi thông báo qua Facebook Messenger đang phát triển.",
  MSG4: "Tính năng đề nghị gửi bài viết đang phát triển.",
};

const FACEBOOK_DEV = {
  PAGE_ACCESS_TOKEN:
    "EAAVvoN2edJABAJEqQ585UC7FDga1Ku02jazR2ZBvcY3TPnmTQYG88jSp4XD2PABoaOO2znzfoZACCpq06YMJJ7CKT7rLQE79Khhkbww6tw8x6nig6TfZB9I59CU2YSpgwxzvYsiOlNbeTcZBUGvfMBZBXOMUWYJ808POUfYBUhwZDZD",
  ADMIN_MESSENGER_ID: "3119991678020925",
};

const DEFAULT_TOPIC = [
  "Back End",
  "AI/ML/DL Research",
  "Psychology",
  "Personal View",
];

const URL = [
  {
    subMenu: "Nội dung",
    uRL: "/home",
  },
  {
    subMenu: "Nghe Báo",
    uRL: "/home/bots",
  },
];

const NUMBER_COLUMN_SCREEN_SIZE = {
  'mobile': 1,
  'medium': 6
};


const AUTHOR_DATA = {
  imageList: [
    "https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/91651356_10221659159173576_3247397447923662848_o.jpg?_nc_cat=100&_nc_sid=174925&_nc_ohc=pp_EiaNhDC0AX_EUZ74&_nc_ht=scontent.fsgn5-5.fna&oh=4e857736da7d671473062711d27258cc&oe=5F274795",
    "https://scontent.fdad3-3.fna.fbcdn.net/v/t1.0-9/26230148_10214748987063592_8377186319034611906_n.jpg?_nc_cat=111&_nc_sid=8bfeb9&_nc_ohc=uvu6Qu3c240AX_Osvq-&_nc_ht=scontent.fdad3-3.fna&oh=aed9cb0f661f270fe165ed60fff689e1&oe=5F2612A3",
  ],
  infor: [
    {
      name: "Tuan Nguyen",
      description: "CTO tại VCCORP",
      image:
        "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/38149369_10216412207723069_415017780664860672_n.jpg?_nc_cat=107&_nc_sid=a4a2d7&_nc_ohc=SNk8DlYsadEAX_xbwhD&_nc_ht=scontent-hkt1-1.xx&oh=cc84562c81babdbcbd4c91a35899e995&oe=5F2E649E",
    },
    {
      name: "Viet Cv",
      description: "Product Owner tại CodeLearn.io",
      image:
        "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/61579806_2457966960933765_4055868803093889024_o.jpg?_nc_cat=111&_nc_sid=174925&_nc_ohc=AI3p-BW2S5kAX9eW_TW&_nc_ht=scontent-hkt1-1.xx&oh=33a582672bb9f08722ecd2ebee71fc81&oe=5F3003DE",
    },
    {
      name: "Sơn Đức Nguyễn",
      description: "Chairman tại Học viện Thương hiệu Plato",
      image:
        "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/90082720_10158060669284910_2574090328466259968_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=S0uttLvccGsAX_J4Bmp&_nc_ht=scontent-hkt1-1.xx&oh=ce072c04c7af7042c7346c0f014f5c6a&oe=5F2EF1AB",
    },
    {
      name: "Nguyen Phi Van",
      description: "Board Advisor at Austria-Vietnam Innovation Council",
      image:
        "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/106505010_1405071963215891_7426207842881977826_o.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=OYaMfoVH8J8AX83AUDz&_nc_ht=scontent-hkt1-1.xx&oh=8ed8aa8efaae51e21548cca0e50e9790&oe=5F2CF107",
    },
    {
      name: "Đào Trung Thành",
      description: "Giám đốc Kỹ thuật (CTO), MVV Group",
      image:
        "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/87128860_10216625605613451_7306121918938087424_o.jpg?_nc_cat=104&_nc_sid=a4a2d7&_nc_ohc=T3UgfgFG9C4AX_9Sysr&_nc_ht=scontent-hkt1-1.xx&oh=c2c21a2979333892f721c969eec01686&oe=5F310977",
    },

    {
      name: "David Trieu",
      description:
        "Project Director tại Hệ Sinh Thái Khởi Nghiệp IoT Việt Nam",
      image:
        "https://scontent-hkt1-1.xx.fbcdn.net/v/t31.0-8/20900824_1147057698772455_2980176105139356507_o.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_ohc=Nv4zjWZ7IXkAX-STMvm&_nc_ht=scontent-hkt1-1.xx&oh=cf42e18bcef0fbc41a64a3de75620206&oe=5F2B2C7C",
    },
    {
      name: "Lê Công Thành",
      description: "President tại InfoRe Technology",
      image:
        "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/106123562_10157564889651172_3351400229146310688_o.jpg?_nc_cat=105&_nc_sid=8bfeb9&_nc_ohc=I7yWnCCIRnwAX_QbAOU&_nc_ht=scontent-hkt1-1.xx&oh=e7eda2d02ad707253db70e7966ad8800&oe=5F2ECAC7",
    },
    {
      name: "Truong Hoang Ly Phi",
      description:
        "Vice Chairwoman tại Young Businesspeople Association of Ho Chi Minh city",
      image:
        "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/106334396_10218340052674846_2806064368343971177_n.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=UeiS6SmJN2EAX8mHJXd&_nc_ht=scontent-hkt1-1.xx&oh=c02b262209d8690fda4bb6f45aa4eb3c&oe=5F2EDB55",
    },

    {
      name: "Thanh N. Truong",
      description: "Phó Hiệu trưởng tại Trường Đại học Văn Lang",
      image:
        "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/83882074_10218559214863899_6642744394501849088_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=ZTiSsDSudsgAX_FgI_C&_nc_ht=scontent-hkt1-1.xx&oh=96846c539609c933baf148991af1c4f9&oe=5F300BC7",
    },
    {
      name: "Trieu Nguyen",
      description: "Owner and Founder tại USPA.tech",
      image:
        "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.0-9/83406528_10157169667584506_4978266553792331776_o.jpg?_nc_cat=109&_nc_sid=a4a2d7&_nc_ohc=VgyQf8_iPy8AX-2uxDk&_nc_ht=scontent-hkg4-1.xx&oh=0437a89cd7625ffd8a0286927bb383a4&oe=5F327840",
    },

    {
      name: "Minh Đào",
      description: "Chief Ninja tại Trạm Đọc - Read Station",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png",
    },
    {
      name: "Nguyễn Đức Hiển",
      description: "Phó tổng biên tập Báo Pháp Luật TP HCM",
      image:
        "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-9/106986444_10158826604819090_8082621413082796810_n.jpg?_nc_cat=109&_nc_sid=8bfeb9&_nc_ohc=TIt4_7qrI-MAX9E0BcG&_nc_ht=scontent.fsgn5-6.fna&oh=1764a985382720b27fddf17889bc2eed&oe=5F30D5ED",
    },
    {
      name: "Linh Mạnh Nguyễn",
      description:
        "Giảng dạy tại LITADO - Trường Đào Tạo Cao Cấp Digital Marketing",
      image:
        "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/35923072_1126203024185544_6311169363017728000_n.jpg?_nc_cat=104&_nc_sid=a4a2d7&_nc_ohc=4W2QbfysomUAX-cdVtb&_nc_ht=scontent-hkt1-1.xx&oh=8400955b237213a36766fc42964204ec&oe=5F2EE9C8",
    },
    {
      name: "Van Vu",
      description: "Professor of Mathematics tại Yale University",
      image:
        "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/68782080_2583418198356012_7066215585633271808_n.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=CuGwuzSaAFcAX_6skIi&_nc_ht=scontent-hkt1-1.xx&oh=b0dba1688064ead5c9a73690ff80d49b&oe=5F2F4ADF",
    },
    {
      name: "Nghia Minh Le",
      description: "Director of Marketplace System tại Tiki",
      image:
        "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/75242248_10214203181944500_4552056994592194560_n.jpg?_nc_cat=109&_nc_sid=8bfeb9&_nc_ohc=TcAk9iXSOTsAX9eG5w-&_nc_ht=scontent-hkt1-1.xx&oh=fe32111c9f79fcb037b232938f753a94&oe=5F328C9D",
    },
    {
      name: "Viet Tran",
      description: "Từng làm Software Architect tại Sendo",
      image:
        "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/67761882_2851363918225042_6148802024222752768_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=MhJTnUjaBTkAX9tjWdP&_nc_ht=scontent-hkt1-1.xx&oh=5be299d2ba73913abba08e042df16f09&oe=5F2FA3C6",
    },
    {
      name: "Trần Lâm",
      description: "Co-Founder tại ATP Web",
      image: "",
    },
    {
      name: "Thanhtu Pham",
      description: "CTO tại Agiletech Vietnam",
      image:
        "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/35360470_2132271237026787_4450099831104339968_n.jpg?_nc_cat=104&_nc_sid=a4a2d7&_nc_ohc=GUK_fRKEJGAAX8mEMNC&_nc_ht=scontent-hkt1-1.xx&oh=e96e853cb879be8184ee58f28211b8e4&oe=5F30F89E",
    },
    {
      name: "Bùi Ngọc Tài",
      description: "Associate Software Engineer tại Zalo",
      image:
        "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/83190373_1035991570101293_2405762880734494720_n.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=Ke3SmsgttSsAX_1D1zj&_nc_ht=scontent-hkt1-1.xx&oh=b674dd01f7f12ae06d323a683b64987a&oe=5F31331B",
    },
  ],
};

const AUTHOR_LIST = {
  image: [
    "https://uploads-ssl.webflow.com/5be2baf97a00671aef1118cd/5e31a33d94b1c0d5e4b58f99_belle%20buzzwords.png",
    "https://www.intheblack.com/-/media/intheblack/allimages/workplace/2016/business-buzzwords.jpg?h=476&la=en&mw=806&w=806&rev=c39bd5246fcd4ded832348c5b8b591ad",
    "https://miro.medium.com/max/3000/1*z_tMP7UnBamSyDkB1rav3Q.png",
  ],
  author: [...AUTHOR_DATA.infor],
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
  DEFAULT_TOPIC,
  URL,
  NUMBER_COLUMN_SCREEN_SIZE,
  AUTHOR_LIST
};
