import React, { useState, useEffect, memo } from "react";
import { apiGetVideoOfUser } from "../service/apis";
import Video from "./Video";

const VideoUser = ({ userId, currentPostId, title, videoLiked, control }) => {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      try {
         if (userId) {
            const callApi = async () => {
               const response = await apiGetVideoOfUser({ userId, control });
               if (response.err === 0) {
                  setPosts(response.res);
               } else {
                  console.log("error fetching data", response.mess);
               }
            };
            callApi();
         } else {
            setPosts([]);
         }
      } catch (error) {
         console.log(error);
      }
   }, [userId]);

   return (
      <div className="video-container row">
         {posts &&
            !videoLiked &&
            posts.length > 0 &&
            posts.map((item, index) => {
               return (
                  <div key={item.id} className="video-container__item">
                     <Video item={item} index={index} />
                     {item.id === currentPostId && (
                        <div className="playing row">
                           <div className="playing--anim row">
                              <small></small>
                              <small></small>
                              <small></small>
                           </div>
                           <span>Hiện đang phát</span>
                        </div>
                     )}
                     {title && <p className="ellipsis">{item?.title}</p>}
                  </div>
               );
            })}
         {videoLiked &&
            videoLiked.length > 0 &&
            videoLiked.map((item, index) => {
               return (
                  <div key={item.id} className="video-container__item">
                     <Video item={item} index={index} />
                     {item.id === currentPostId && (
                        <div className="playing row">
                           <div className="playing--anim row">
                              <small></small>
                              <small></small>
                              <small></small>
                           </div>
                           <span>Hiện đang phát</span>
                        </div>
                     )}
                     {title && <p className="ellipsis">{item?.title}</p>}
                  </div>
               );
            })}
      </div>
   );
};

export default memo(VideoUser);
