import React, { useEffect, useState } from "react";
import { exploreNav } from "../../utilities/menuManage";
import { Video } from "../../components";
import { apiGetVideoExplore } from "../../service/apis";
import images from "../../assets/imgExport";
import icons from "../../utilities/icons";
import { Waypoint } from "react-waypoint";
import { LoadingLimitPost } from "../../components/animation";

const Explore = () => {
   useEffect(() => {
      localStorage.setItem("myData", "/explore");
   }, []);
   const { user } = images;
   const { MdFavorite } = icons;

   // state
   const [lazyLoad, setLazyLoad] = useState(1);
   const [posts, setPosts] = useState([]);
   const [appendSpan, setAppendSpan] = useState(null);
   const [loading, setLoading] = useState(true);

   // handle
   // call api
   const callApi = async (page) => {
      setLoading(true);
      const response = await apiGetVideoExplore({ page: page });
      if (response.err === 0) {
         setPosts((prev) => [...prev, ...response.res]);
         setLoading(false);
      } else {
         console.log("error detail:", response.mess);
         setLoading(false);
      }
   };
   useEffect(() => {
      callApi(lazyLoad);
   }, [lazyLoad]);
   // end call api

   // lazyLoad
   useEffect(() => {
      if (posts && posts.length !== 0) {
         let lastElement = posts.length - 1;
         setAppendSpan(lastElement);
      }
   }, [posts]);

   const handleCallApi = () => {
      let number = Math.floor(posts.length / 12);
      if (lazyLoad <= number) {
         setLazyLoad(lazyLoad + 1);
      }
   };
   // end lazyLoad
   return (
      <div className="explore custom-scroll">
         <div className="explore-nav custom-scroll row">
            {exploreNav &&
               exploreNav.map((el) => {
                  return (
                     <span key={el.id} className="item">
                        {el.item}
                     </span>
                  );
               })}
         </div>
         <div className="explore-box row">
            {posts &&
               posts.length > 0 &&
               posts.map((item, index) => {
                  return (
                     <div key={index} className="explore-box__item">
                        <div className="video">
                           <Video item={item} index={index} />
                        </div>
                        <span className="item__content ellipsis">{item.title.length > 18 ? `${item.title.slice(0, 18)}...` : item.tile}</span>
                        <div className="item-trend row">
                           <div className="item-trend__user row">
                              <img src={item.user.avatar || user} alt="" />
                              <strong>{item.user.userName}</strong>
                           </div>
                           <small className="item-trend__favorite row">
                              <MdFavorite className="icon" />
                              {item.status.length}
                           </small>
                        </div>
                        {appendSpan && appendSpan === index && <Waypoint onEnter={handleCallApi} bottomOffset="0" />}
                     </div>
                  );
               })}
         </div>
         {loading && <LoadingLimitPost />}
      </div>
   );
};

export default Explore;
