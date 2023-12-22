import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiGetFollow } from "../service/apis";
import images from "../assets/imgExport";

const Follower = () => {
   const { user } = images;
   const { currentData } = useSelector((state) => state.user);
   const { isLogin } = useSelector((state) => state.auth);
   const [follower, setFollower] = useState([]);
   useEffect(() => {
      if (isLogin && currentData.follow?.length > 0) {
         (async () => {
            try {
               const payload = currentData?.follow?.map((item) => item.user_follow);
               const response = await apiGetFollow({ id_follow: payload });
               if (response.err === 0) {
                  setFollower(response.data);
               }
            } catch (error) {
               console.error("Error fetching API:", error);
            }
         })();
      }else if(isLogin && currentData.follow?.length === 0){
         setFollower([])
      }
   }, [currentData.follow]);

   return (
      <div className="following">
         <h2 className="following__heading">Các tài khoản đang follow</h2>
         {follower.length === 0 && <p className="following__not">Tài khoản bạn theo dõi sẽ xuất hiện ở đây</p>}
         {follower.length > 0 &&
            follower?.map((item) => {
               return (
                  <div key={item.id} className="following-box row">
                     <div className="following-box__image avatar">
                        <img
                           src={item.avatar || user}
                           alt="TikTok"
                        />
                     </div>
                     <div className="following-box__name row">
                        <strong>{item.userName.length >= 14 ? `${item.userName.slice(0, 14)}...` : item.userName}</strong>
                        <span>{item.tiktok_id.length >= 10 ? `${item.tiktok_id.slice(0, 10)}...` : item.tiktok_id}</span>
                     </div>
                  </div>
               );
            })}
         {follower.length > 10 && <strong className="following__seeMore">Xem thêm</strong>}
      </div>
   );
};

export default memo(Follower);
