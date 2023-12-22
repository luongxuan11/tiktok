import React, { useCallback, useEffect, useState, useRef, memo } from "react";
import icons from "../utilities/icons";
import Loader from "./animation/Loader";
import { apiSearch } from "../service/apis";
import { favorite } from "../utilities/menuManage";
import images from "../assets/imgExport";
import { Link } from "react-router-dom";

const Search = () => {
   const { BsSearch, AiOutlineCloseCircle, FiSearch } = icons;
   const { user } = images;
   const [close, setClose] = useState(false);
   const [valueApiSearch, setValueApiSearch] = useState("");
   const [loading, setLoading] = useState(false);
   const [valueApisResult, setValueApisResult] = useState([]);
   const [showDetailSearch, setShowDetailSearch] = useState(false);
   const [stateRequest, setStateRequest] = useState(false);
   const ref = useRef();

   // call api
   useEffect(() => {
      if (valueApiSearch) {
         const debounceCallApi = setTimeout(async () => {
            setLoading(true);
            setClose(false);
            const response = await apiSearch({ text: valueApiSearch });
            if (response.err === 0) {
               setLoading(false);
               setClose(true);
               setValueApisResult([response.users, response.posts]);
               setStateRequest(true);
            } else {
               setLoading(false);
            }
         }, 700);
         return () => {
            clearTimeout(debounceCallApi);
         };
      }
   }, [valueApiSearch]);

   // function set value call api
   const handleCallApi = useCallback((e) => {
      let value = e.target.value;
      if (value) {
         setClose(true);
         setValueApiSearch(value);
      } else {
         setClose(false);
         setValueApiSearch("");
         setValueApisResult([]);
         setStateRequest(false);
      }
   }, [])

   const handleClickItemSearch = () => {
      setShowDetailSearch(false);
   };

   // Hàm này được gọi mỗi khi có sự kiện click trên window
   const handleClickOutside = useCallback((event) => {
      // Kiểm tra xem click có diễn ra bên ngoài của ref.element và input hay không
      if (ref.current && !ref.current.contains(event.target)) {
         setShowDetailSearch(false);
      }
   }, []);
   useEffect(() => {
      // Thêm event listener khi component được mounted
      document.addEventListener("mousedown", handleClickOutside);

      // Cleanup event listener khi component được unmounted
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [handleClickOutside]);

   return (
      <div className="header__search row">
         <input value={valueApiSearch || ""} onFocus={() => setShowDetailSearch(true)} onChange={(e) => handleCallApi(e)} type="text" placeholder="Search..." />
         <BsSearch className="svg" />
         {close ? (
            <AiOutlineCloseCircle
               onClick={() => {
                  setValueApiSearch("");
                  setStateRequest(false);
               }}
               className="icon"
            />
         ) : (
            ""
         )}
         {loading ? <Loader /> : ""}
         <div ref={ref} className={`header__search-box ${showDetailSearch ? "un--hidden" : ""}`}>
            <div className="search-box">
               <>
                  {valueApiSearch.length <= 0 ? (
                     <>
                        <h3>Bạn có thể thích</h3>
                        {favorite.map((item, index) => {
                           return (
                              <Link  key={index} to={`search/top/${item.item}`}>
                                 <div onClick={handleClickItemSearch} className="search-box__item row">
                                    {item.icon}
                                    <p className="ellipsis">{item.item}</p>
                                 </div>
                              </Link>
                           );
                        })}
                     </>
                  ) : (
                     <>
                        {valueApisResult[1]?.slice(0, 6).map((item) => {
                           return (
                              <Link key={item.id} to={`${item.user.tiktok_id}/video/${item.id}`}>
                                 <div onClick={handleClickItemSearch} className="search-box__item row">
                                    <FiSearch className="search-box__item--icon" />
                                    <p className="ellipsis">{item.title}</p>
                                 </div>
                              </Link>
                           );
                        })}
                        {valueApisResult[0]?.length > 0 && <h3>Tài khoản</h3>}
                        {valueApisResult[0]?.slice(0, 4).map((item, index) => {
                           return (
                              <Link key={index} to={`${item.tiktok_id}`}>
                                 <div onClick={handleClickItemSearch} className="search-box__item row">
                                    <div className="search-avatar avatar">
                                       <img src={item.avatar || user} alt="TikTok" />
                                    </div>
                                    <div className="search-info row">
                                       <strong>{item.userName.length > 20 ? `${item.userName.slice(0, 20)}...` : item.userName}</strong>
                                       <span>{item.tiktok_id.length > 10 ? `${item.tiktok_id.slice(0, 10)}...` : item.tiktok_id} </span>
                                    </div>
                                 </div>
                              </Link>
                           );
                        })}
                     </>
                  )}

                  {valueApisResult[1]?.length === 0 && valueApisResult[0]?.length === 0 && stateRequest && <p className="not-request">Không tìm thấy kết quả phù hợp</p>}
               </>
            </div>
         </div>
      </div>
   );
};

export default memo(Search);
