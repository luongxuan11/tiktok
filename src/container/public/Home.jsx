import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet, useLocation } from "react-router-dom";
import HomeTitle from "./HomeTitle";
import DetailPost from "./DetailPost";
const Home = () => {
   const location = useLocation();
   // jsx
   return (
      <div className="home">
         <Header />
         <div className="wrapper row">
            <SideBar />
            {location.pathname === "/" || location.pathname.includes("video") ? <HomeTitle /> : <Outlet />}
            {location.pathname.includes("video") ? <DetailPost /> : ""}
         </div>
      </div>
   );
};

export default Home;
