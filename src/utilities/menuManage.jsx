import icons from "./icons";
const { RiHome4Line, CiCircleList, BiMessageDetail, FaRegFontAwesome, GoPeople, FaRegCompass, RiLiveLine, AiFillFire } = icons;
export const menuManageCreator = [
   {
      id: 1,
      text: "Trang chủ",
      path: "/creator-center/",
      icon: <RiHome4Line className="creator-center__sidebar--icon" />,
   },
   {
      id: 2,
      text: "Bài đăng",
      path: "/creator-center/content",
      icon: <CiCircleList className="creator-center__sidebar--icon" />,
   },
   // {
   //    id: 3,
   //    text: "Bình luận",
   //    path: "/creator/comment",
   //    icon: <BiMessageDetail className="creator-center__sidebar--icon" />,
   // },
   // {
   //    id: 4,
   //    text: "Phản hồi",
   //    path: "/creator/help/contact-us",
   //    icon: <FaRegFontAwesome className="creator-center__sidebar--icon" />,
   // },
];

export const menuHome = [
   {
      id: 1,
      text: "Dành cho bạn",
      path: "/",
      icon: <RiHome4Line className="sidebar--icon" />,
   },
   {
      id: 2,
      text: "Đang follow",
      path: "/following",
      icon: <GoPeople className="sidebar--icon" />,
   },
   {
      id: 3,
      text: "Khám phá",
      path: "/explore",
      icon: <FaRegCompass className="sidebar--icon" />,
   },
   {
      id: 4,
      text: "Live",
      path: "https://www.tiktok.com/live",
      icon: <RiLiveLine className="sidebar--icon" />,
   },
];

export const menuHomeDetail = [
   {
      id: 1,
      item: "Giới thiệuBảng tinLiên hệ",
   },
   {
      id: 2,
      item: "Sự nghiệp",
   },
   {
      id: 3,
      item: "TikTok for GoodQuảng cáo",
   },
   {
      id: 4,
      item: "Cổng thông tin Tác giả",
   },
   {
      id: 5,
      item: "Nội dung chỉ mang tính chất học tập",
   },
   {
      id: 6,
      item: "Quyền riêng tư",
   },
   {
      id: 7,
      item: "Cổng thông tin Tác giả",
   },
];

export const favorite = [
   {
      id: 1,
      icon: <AiFillFire className="icon--search__box" />,
      item: "Gái xinh",
   },
   {
      id: 2,
      icon: <AiFillFire className="icon--search__box" />,
      item: "Mẫu capcut giật giật",
   },
   {
      id: 3,
      icon: <AiFillFire className="icon--search__box" />,
      item: "Phim kẻ ăn hồn",
   },
   {
      id: 4,
      icon: <AiFillFire className="icon--search__box" />,
      item: "Kiến thức lập trình",
   },
   {
      id: 5,
      icon: <AiFillFire className="icon--search__box" />,
      item: "Html có phải là ngôn ngữ lập trình không",
   },
   {
      id: 6,
      icon: <AiFillFire className="icon--search__box" />,
      item: "1 mét vuông 2 chục ông react",
   },
   {
      id: 7,
      icon: <AiFillFire className="icon--search__box" />,
      item: "Làm thế nào để cho tất cả người học react vào 1 thùng xốp",
   },
];

export const exploreNav = [
   {
      id: 1,
      item: "Tất cả danh mục",
   },
   {
      id: 2,
      item: "Giải trí",
   },
   {
      id: 3,
      item: "Thể thao",
   },
   {
      id: 4,
      item: "Truyện tranh & Hoạt hình",
   },
   {
      id: 5,
      item: "Mối quan hệ",
   },
   {
      id: 6,
      item: "Chương trình",
   },
   {
      id: 7,
      item: "Hát nhép",
   },
   {
      id: 8,
      item: "Đời sống",
   },
   {
      id: 9,
      item: "Chăm sóc sắc đẹp",
   },
   {
      id: 10,
      item: "Trò chơi",
   },
   {
      id: 11,
      item: "Xã hội",
   },
   {
      id: 12,
      item: "Trang phục",
   },
   {
      id: 13,
      item: "Giáo dục",
   },
   {
      id: 14,
      item: "Công nghệ",
   },
];
