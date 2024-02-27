import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { menuHome } from "../../utilities/menuManage";
import { Button, Follower, AuthFormLogin, PopupOtp } from "../../components";
import icons from "../../utilities/icons";
import images from "../../assets/imgExport";
import { menuHomeDetail } from "../../utilities/menuManage";
import { path } from "../../utilities/constant";

const SideBar = () => {
   const { FaRegUser, TbWindow } = icons;
   const { btn_image } = images;
   let active = "item--active";
   const location = useLocation();
   const navigate = useNavigate();
   const [showForm, setShowForm] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const [showOtp, setShowOtp] = useState(false);
   const { isLogin } = useSelector((state) => state.auth);
   const { currentData } = useSelector((state) => state.user);

   const handleShowInfo = (e) => {
      e.preventDefault();
      if (!isLogin) {
         setShowForm(true);
      } else if (isLogin && !currentData.verifyOTP) {
         setShowPopup(true);
      } else return navigate(currentData?.tiktok_id);
   };
   useEffect(() => {
      if (showForm === false && location.pathname.includes("info")) return navigate("/");
   }, [location.pathname, showForm, navigate]);

   return (
      <>
         <div className="home-sidebar custom-scroll">
            <div className="home-sidebar__control">
               {menuHome.map((item) => {
                  return (
                     <NavLink key={item.id} to={item.path} className={`item row ${item.isActive ? active : ""}`}>
                        {item.icon}
                        <p>{item.text}</p>
                     </NavLink>
                  );
               })}
               <NavLink onClick={(e) => handleShowInfo(e)} to={`${currentData?.tiktok_id}`} className={`item item-profile row`}>
                  <FaRegUser />
                  <p>Hồ sơ</p>
               </NavLink>
               {!isLogin ? (
                  <div className="require-login">
                     <span>Đăng nhập để follow các tác giả, thích video và xem bình luận.</span>
                     <Button text={"Đăng nhập"} onClick={() => setShowForm(true)} btnClass={"require-login__btn"} />
                  </div>
               ) : (
                  <Follower />
               )}
            </div>
            <div className="home-sidebar__follower">
               <div className="effect row">
                  <img src={btn_image} alt="tiktok" />
                  <span className="row">
                     <TbWindow className="icon" /> <p>Tạo hiệu ứng</p>
                  </span>
               </div>
               <div className="rule row">
                  {menuHomeDetail.map((el) => {
                     return <span key={el.id}>{el.item}</span>;
                  })}
                  <span>Thêm</span>
                  <span>© 2023 TikTok</span>
               </div>
            </div>
            <div className="home-sidebar_contact"></div>
         </div>
         {showForm ? <AuthFormLogin setShowForm={setShowForm} /> : ""}
         {showPopup && (
            <PopupOtp
               title="Kích hoạt tài khoản"
               content="hệ thống yêu cầu bạn phải kích hoạt tài khoản để sử dụng các tính năng."
               access="Xác nhận"
               cancel="Hủy bỏ"
               setShowPopup={setShowPopup}
               showOtp={showOtp}
               setShowOtp={setShowOtp}
               currentData={currentData.email}
            />
         )}
      </>
   );
};

export default SideBar;
