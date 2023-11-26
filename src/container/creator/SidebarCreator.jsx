import React from "react";
import { menuManageCreator } from "../../utilities/menuManage";
import {NavLink } from "react-router-dom";

const SidebarCreator = () => {
   let active = 'creator-sidebar__item--active'

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
      </div>
   );
};

export default SidebarCreator;
