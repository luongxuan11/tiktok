import React, { useState, useRef, useEffect } from "react";
import { apiGetVideoOfUser } from "../service/apis";
import { useLocation, useNavigate } from "react-router-dom";

const VideoUser = ({ userId, currentPostId, setCurrentPost }) => {
   const [hoveredVideo, setHoveredVideo] = useState("");
   const [posts, setPosts] = useState([]);
   const videoRefs = useRef([]);
   const navigate = useNavigate();

   const handleMouseLeave = () => {
      setHoveredVideo("");
   };

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

   useEffect(() => {
      if (videoRefs) {
         videoRefs.current.forEach((item) => {
            if (hoveredVideo === item?.src) {
               item?.play();
            } else {
               item?.pause();
            }
         });
      }
   }, [hoveredVideo]);

   // handleNavigate
   const handleNavigate = (post) => {
      if(post) return navigate(`/@user${post.user_id}/video/${post.id}`)
   }

   return (
      <div className="video-container row">
         {posts &&
            posts.length > 0 &&
            posts.map((item, index) => {
               return (
                  <div key={item.id}  className="video-container__item">
                     <video
                        onClick={() => handleNavigate(item)}
                        src={item.video_file_name}
                        onMouseEnter={() => setHoveredVideo(item.video_file_name)}
                        onMouseLeave={handleMouseLeave}
                        ref={(ref) => (videoRefs.current[index] = ref)}
                        muted
                     ></video>
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
