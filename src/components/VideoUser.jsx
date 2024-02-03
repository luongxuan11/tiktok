import React, { useState, useEffect } from "react";
import { apiGetVideoOfUser } from "../service/apis";
import Video from "./Video";

const VideoUser = ({ userId, currentPostId, setCurrentPost }) => {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      const callApi = async () => {
         const response = await apiGetVideoOfUser({ userId });
         if (response.err === 0) {
            setPosts(response.res);
         } else {
            console.log("error fetching data", response.mess);
         }
      };
      callApi();
   }, [userId]);

   return (
      <div className="video-container row">
         {posts &&
            posts.length > 0 &&
            posts.map((item, index) => {
               return (
                  <div key={item.id}  className="video-container__item">
                     <Video item={item} index={index}/>
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
                  </div>
               );
            })}
      </div>
   );
};

export default VideoUser;
