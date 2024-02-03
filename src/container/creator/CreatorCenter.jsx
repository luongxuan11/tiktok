import React, { memo } from "react";
import "../../sass/creator.scss";
import logos from "../../assets/imgExport";
import { useSelector } from "react-redux";
import { Outlet, Link, Navigate, useLocation} from "react-router-dom";
import { Button } from "../../components";
import SidebarCreator from "./SidebarCreator";
import CreatorCenterHome from "./CreatorCenterHome";
import { path } from "../../utilities/constant";



const CreatorCenter = () => {
   const { logo1, user } = logos;
   const { currentData } = useSelector((state) => state.user);
   const {isLogin} = useSelector((state) => state.auth);
   const location = useLocation();
   if(!isLogin) return <Navigate to='/' replace={true}/>;
   let checkUploadBtn = location.pathname === "/creator-center/upload" ? "creator-sidebar__btn--active" : "";
   return (
      <section className="creator">
         <nav className="creator-nav row">
            <div className="creator-nav__box row">
               <img src={logo1} alt="tiktok" />
               <div className="creator-nav__box--custom">
                  <span>Creator Center</span>
                  <small></small>
               </div>
               <span className="creator-nav__box--beta">Beta</span>
            </div>
            <div className="creator-nav__user">
               <img src={currentData.avatar || user} alt="tiktok" />
            </div>
         </nav>
         <section className="creator-body row">
            <nav className="creator-sidebar">
               <Link className="creator-sidebar__btn--box row" to={path.UPLOAD}>
                  <Button text={"Tải lên"} btnClass={`creator-sidebar__btn ${checkUploadBtn}`} />
               </Link>
               <SidebarCreator/>
            </nav>
            <div className="creator-body__wrapper row">
            {(location.pathname === "/creator-center/" || location.pathname === "/creator-center") ? <CreatorCenterHome currentData={currentData}/> : <Outlet/>}
            </div>
         </section>
      </section>
   );
};

export default memo(CreatorCenter);
