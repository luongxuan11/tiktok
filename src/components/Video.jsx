import React, { useState, useEffect, useRef, memo } from "react";
import { useNavigate } from "react-router-dom";

const Video = ({ item, index }) => {
   const [hoveredVideo, setHoveredVideo] = useState("");
   const navigate = useNavigate();
   const videoRefs = useRef([]);
   const handleMouseLeave = () => {
      setHoveredVideo("");
   };

   useEffect(() => {
      if (videoRefs) {
         videoRefs.current.forEach((item) => {
            if (hoveredVideo === item?.src) {
               item?.play();
            } else {
               item.currentTime = 0;
               item?.pause();
            }
         });
      }
   }, [hoveredVideo]);

   // handleNavigate
   const handleNavigate = (post) => {
      if (post) return navigate(`/@user${post.user_id}/video/${post.id}`);
   };
   return (
      <>
         <video
            onClick={() => handleNavigate(item)}
            src={item.video_file_name}
            onMouseEnter={() => setHoveredVideo(item.video_file_name)}
            onMouseLeave={handleMouseLeave}
            ref={(ref) => (videoRefs.current[index] = ref)}
            muted
         ></video>
      </>
   );
};

export default memo(Video);
