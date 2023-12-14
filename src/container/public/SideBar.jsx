import React from "react";
import { useSelector } from "react-redux";
import { useLocation, NavLink } from "react-router-dom";
import { menuHome } from "../../utilities/menuManage";
import { Button } from "../../components";
import icons from "../../utilities/icons";
import images from "../../assets/imgExport";
import { menuHomeDetail } from "../../utilities/menuManage";

const SideBar = () => {
   const { FaRegUser, TbWindow} = icons;
   const {btn_image} = images;
   let active = "item--active";
   // const { currentData } = useSelector((state) => state.user);
   // const { isLogin } = useSelector((state) => state.auth);
   return (
      <div className="home-sidebar custom-scroll">
         <div className="home-sidebar__control">
            {menuHome.map((item) => {
               return (
                  <NavLink key={item.id} to={item.path} className={`item row ${item.isActive ? active : ""}`}>
                     {item.icon}
                     {item.text}
                  </NavLink>
               );
            })}
            <NavLink to={"/info"} className={`item item-profile row`}>
               <FaRegUser />
               Hồ sơ
            </NavLink>
            <div className="require-login">
               <span>Đăng nhập để follow các tác giả, thích video và xem bình luận.</span>
               <Button text={"Đăng nhập"} btnClass={'require-login__btn'}/>
            </div>
         </div>
         <div className="home-sidebar__follower">
            <div className="effect row">
               <img src={btn_image} alt="tiktok" />
               <span className="row"><TbWindow className="icon"/> Tạo hiệu ứng</span>
            </div>
            <div className="rule row">
               {menuHomeDetail.map((el) => {
                  return (<span key={el.id}>{el.item}</span>)
               })}
               <span>Thêm</span>
               <span>© 2023 TikTok</span>
            </div>
         </div>
         <div className="home-sidebar_contact"></div>
      </div>
   );
};

export default SideBar;
