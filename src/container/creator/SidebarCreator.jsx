import React from "react";
import { menuManageCreator } from "../../utilities/menuManage";
import { NavLink, Link } from "react-router-dom";
import icons from "../../utilities/icons";
import { Toaster, toast } from "react-hot-toast";

const SidebarCreator = () => {
   const { BiMessageDetail, BsLayerBackward, FaRegFontAwesome } = icons;
   let active = "creator-sidebar__item--active";

   const comingSoon = (e) => {
      e.preventDefault();
      toast("Coming soon 👋", {
         duration: 2000,
         position: "top-center",
         style: {
            background: "#121212",
            color: "#fff",
            ["fontweight"]: "600",
            padding: "5px 30px",
         },
      });
   };

   return (
      <div className="creator-sidebar__control row">
         {menuManageCreator.map((item) => {
            return (
               <NavLink key={item.id} to={item.path} className={`creator-sidebar__item row ${item.isActive ? active : ""}`}>
                  {item.icon}
                  {item.text}
               </NavLink>
            );
         })}
         <Link to={"#"} onClick={(e) => comingSoon(e)} className="creator-sidebar__item">
            <BiMessageDetail className="creator-center__sidebar--icon" />
            Bình luận
         </Link>
         <Link to={"#"} onClick={(e) => comingSoon(e)} className="creator-sidebar__item">
            <FaRegFontAwesome className="creator-center__sidebar--icon" />
            Phản hồi
         </Link>
         <Toaster />
      </div>
   );
};

export default SidebarCreator;
