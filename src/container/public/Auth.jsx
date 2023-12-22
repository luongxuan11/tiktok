import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import icons from "../../utilities/icons";
import { Button, AuthForm } from "../../components";
import { Text } from "../../components/animation";
import ui from "../../assets/img/UI.png";
import titok from "../../assets/img/tiktok.png";
import "./auth.scss";

const Auth = () => {
   const { IoIosAdd, BsList } = icons;
   const [showForm, setShowForm] = useState(false);
   const { isLogin } = useSelector((state) => state.auth);
   if (isLogin) return <Navigate to="/" replace={true} />;

   const handleShowForm = () => {
      setShowForm(true);
   };

   return (
      <div className="auth-wrapper">
         <div className="auth-header container row">
            <div className="auth-header__logo row">
               <img src={titok} alt="tiktok" />
               <IoIosAdd style={{ fontSize: "2.8rem", color: "#fff", fontWeight: "700" }} />
               <img src={ui} alt="tiktok" />
            </div>
            <div className="auth-header__btn row">
               <Button text={"Contact"} btnClass={"login"} />
               <Button onClick={handleShowForm} text={"Sign up"} btnClass={"sign-in"} />
            </div>
         </div>
         {showForm && <AuthForm setShowForm={setShowForm} />}
         <Text setShowForm={setShowForm} />
         <section className="auth-footer">
            <div className="auth-footer__wrapper container row">
               <img src="" alt="tiktok" />
               <div className="rule row">
                  <span>Điều khoản và chính sách</span>
                  <span>Trợ giúp</span>
               </div>
               <div className="support row">
                  <span>Liên hệ với chúng tôi</span>
                  <span>Theo dõi Chúng tôi </span>
               </div>
            </div>
         </section>
      </div>
   );
};

export default Auth;
