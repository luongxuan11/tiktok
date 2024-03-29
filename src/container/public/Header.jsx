import React, { useState, useEffect, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../utilities/constant";
import { Search, Button, AuthFormLogin, PopupOtp } from "../../components";
import icons from "../../utilities/icons";
import { Toggle } from "../../components/animation";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/store/actions";
import { apiLogout } from "../../service/apis";
import Swal from "sweetalert2";
import images from "../../assets/imgExport";

const Header = () => {
   const { user, logo } = images;
   const { IoIosAdd, BsThreeDotsVertical, FcIdea, RiQuestionAnswerLine, BsKeyboard, IoCloudyNightOutline, PiPaperPlaneTiltBold, BiMessageAltMinus, BsBookmarkDash, BiLogIn } =
      icons;
   const [hidden, setHidden] = useState(false);
   const [timeoutId, setTimeoutId] = useState(null);
   const [showForm, setShowForm] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const [showOtp, setShowOtp] = useState(false);

   const { isLogin } = useSelector((state) => state.auth);
   const { currentData } = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleActive = () => {
      setHidden(true);
      clearTimeout(timeoutId); // Hủy timeout nếu chuột vào
   };
   const handleLeave = () => {
      const id = setTimeout(() => {
         setHidden(false);
      }, 700);
      setTimeoutId(id);
   };
   useEffect(() => {
      return () => {
         clearTimeout(timeoutId); // Hủy timeout khi component unmount
      };
   }, [timeoutId]);
   //  show form
   const handleShowForm = () => {
      setShowForm(true);
   };
   // handle show when click upload
   const handleCheckIntoCreator = () => {
      if (!isLogin) {
         setShowForm(true);
      } else if (isLogin && !currentData.verifyOTP) {
         setShowPopup(true);
      } else {
         navigate(`${path.UPLOAD}`);
      }
   };

   //  logout
   const handleLogout = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await apiLogout({ refreshToken });
      if (response?.err === 0) {
         Swal.fire("Thành công !", response.mess, "success");
      } else {
         dispatch(actions.logout());
         Swal.fire("Thất bại!", response.mess, "error");
      }
      dispatch(actions.logout());
   };

   return (
      <div className="header">
         <div className="header__box row">
            <Link className="header__box__logo" to={"/"}>
               <img src={logo} alt="tiktok" />
            </Link>
            <Search />
            <div className="btn-box row">
               <Button
                  btnClass="header__btn--upload row"
                  text={
                     <>
                        <IoIosAdd /> Tải lên
                     </>
                  }
                  onClick={handleCheckIntoCreator}
               />
               {isLogin && (
                  <div className="message">
                     <PiPaperPlaneTiltBold className="icon" />
                     <span>Tin nhắn</span>
                  </div>
               )}
               {isLogin && (
                  <div className="notification">
                     <BiMessageAltMinus className="icon" />
                     <span>Thông báo</span>
                     {/* <div className="notification-box">
                        <h2>Thông báo</h2>
                        <div className="notification-box__categories row">
                           <p>Tất cả thông báo</p>
                           <p>Thích</p>
                           <p>Bình luận</p>
                           <p>Lượt nhắc đến và gắn thẻ</p>
                           <p>Follower</p>
                        </div>
                     </div>
                     <div className="notification-box__list">
                        <strong>Mới</strong>
                        <div className="list">
                           <img className="avatar" src={user} alt="" />
                           <div className="title">
                              <strong>username</strong>
                              <p>type notification</p>
                              <p>mess eqweu ejqwhe weqiej </p>
                           </div>
                           <img className="thumb" src="" alt="" />
                        </div>
                     </div> */}
                  </div>
               )}

               {!isLogin && <Button onClick={handleShowForm} btnClass={"header__btn--login"} text={"Đăng nhập"} />}

               <span className={`header__dot ${isLogin ? "header__dot--avatar" : ""}`} onMouseEnter={handleActive} onMouseLeave={handleLeave}>
                  {!isLogin ? (
                     <BsThreeDotsVertical />
                  ) : (
                     <>
                        <img src={currentData.avatar || user} alt="" />
                        {!currentData.verifyOTP && <span className="header__dot--avatar--status"></span>}
                     </>
                  )}
               </span>
               <ul className={`btn-box__model ${!hidden ? "hidden" : ""}`} onMouseEnter={handleActive} onMouseLeave={handleLeave}>
                  {isLogin && (
                     <li className="btn-box__model--item row">
                        <BsBookmarkDash /> Xem tài khoản
                     </li>
                  )}
                  <li className="btn-box__model--item row">
                     <FcIdea /> Trung tâm nhà sáng tạo LIVE
                  </li>
                  <li className="btn-box__model--item row">
                     <RiQuestionAnswerLine /> Phản hồi & Trợ giúp
                  </li>
                  <li className="btn-box__model--item row">
                     <BsKeyboard /> Phím tắt trên bàn phím
                  </li>
                  <li className="btn-box__model--item row">
                     <IoCloudyNightOutline /> Chế độ tối {<Toggle />}
                  </li>
                  {isLogin && !currentData.verifyOTP ? (
                     <li onClick={() => setShowPopup(true)} className="btn-box__model--item--active row">
                        Tài khoản chưa kích hoạt!
                     </li>
                  ) : (
                     ""
                  )}
                  {isLogin && (
                     <li className="btn-box__model--item row logout" onClick={handleLogout}>
                        <BiLogIn /> Đăng xuất
                     </li>
                  )}
               </ul>
            </div>
         </div>
         {showForm && <AuthFormLogin setShowForm={setShowForm} />}
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
      </div>
   );
};

export default memo(Header);
