import React from "react";
import { favorite } from "../../utilities/menuManage";
import { useLocation } from "react-router-dom";

const SearchDetail = () => {
    const location = useLocation()
    

   return (
      <section className="search-details row">
         <div className="details row">
            <div className="details-heading row">
               <h2 className={`${location.pathname.includes('top') ? "active" : "" } `}>Thông tin tìm kiếm</h2>
               <h2 className={`${location.pathname.includes('users') ? "active" : ""}`}>Tài khoản</h2>
            </div>
            <div className="details-items">
               <div className="items">
                  <div className="items-image">
                     <img src="https://res.cloudinary.com/difcnihwe/image/upload/v1702163684/tiktokVideo/ytop0kat6rn3hvld8w2k.png" alt="TikTok" />
                     <span>10 - 2</span>
                  </div>
                  <p className="items__title ellipsis">ehquiwehu2he11e2heuh12ueh1u2ewdeuwqbf</p>
                  <div className="items-user row">
                    <div className="items-user__info row">
                        <img loading="lazy" src="https://res.cloudinary.com/difcnihwe/image/upload/v1702163684/tiktokVideo/ytop0kat6rn3hvld8w2k.png" alt="TikTok" />
                        <strong>luongbui</strong>
                    </div>
                    <span className="state">💖 - 12</span>
                  </div>
               </div>
               
            </div>
         </div>
         <div className="details-community__search">
            <h2>Những người khác tìm kiếm</h2>
            {favorite.map((item) => {
               return (
                  <div key={item.id} className="search-box__item row">
                     {item.icon}
                     <p className="ellipsis">{item.item}</p>
                  </div>
               );
            })}
         </div>
      </section>
   );
};

export default SearchDetail;
