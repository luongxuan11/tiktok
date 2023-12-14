import icons from "./icons";
const { RiHome4Line, CiCircleList, BiMessageDetail, FaRegFontAwesome, GoPeople, FaRegCompass, RiLiveLine  } = icons;
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
      path: "/creator/content",
      icon: <CiCircleList className="creator-center__sidebar--icon" />,
   },
   {
      id: 3,
      text: "Bình luận",
      path: "/creator/comment",
      icon: <BiMessageDetail className="creator-center__sidebar--icon" />,
   },
   {
      id: 4,
      text: "Phản hồi",
      path: "/creator/help/contact-us",
      icon: <FaRegFontAwesome className="creator-center__sidebar--icon" />,
   },
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
      icon: <GoPeople  className="sidebar--icon" />,
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
      path: "/live",
      icon: <RiLiveLine  className="sidebar--icon" />,
   },
];

export const menuHomeDetail = [
   {
      id: 1,
      item: "Giới thiệuBảng tinLiên hệ"
   },
   {
      id: 2,
      item: "Sự nghiệp"
   },
   {
      id: 3,
      item: "TikTok for GoodQuảng cáo"
   },
   {
      id: 4,
      item: "Cổng thông tin Tác giả"
   },
   {
      id: 5,
      item: "Nội dung chỉ mang tính chất học tập"
   },
   {
      id: 6,
      item: "Quyền riêng tư"
   },
   {
      id: 7,
      item: "Cổng thông tin Tác giả"
   }
];