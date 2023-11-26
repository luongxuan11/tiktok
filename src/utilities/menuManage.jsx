import icons from "./icons"
const {RiHome4Line, CiCircleList, BiMessageDetail, FaRegFontAwesome} = icons
export const menuManageCreator = [
    {
        id: 1,
        text: 'Trang chủ',
        path: '/creator-center/',
        icon: <RiHome4Line className="creator-center__sidebar--icon"/>
    },
    {
        id: 2,
        text: 'Bài đăng',
        path: '/creator/content',
        icon: <CiCircleList className="creator-center__sidebar--icon"/>
    },
    {
        id: 3,
        text: 'Bình luận',
        path: '/creator/comment',
        icon: <BiMessageDetail className="creator-center__sidebar--icon"/>
    },
    {
        id: 4,
        text: 'Phản hồi',
        path: '/creator/help/contact-us',
        icon: <FaRegFontAwesome className="creator-center__sidebar--icon"/>
    },
]
