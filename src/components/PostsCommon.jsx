import React, { memo, useRef, useState, useCallback, useEffect } from "react";
import images from "../assets/imgExport";
import { useNavigate } from "react-router-dom";
import icons from "../utilities/icons";
import { Waypoint } from "react-waypoint";
import { FavoriteBtn, FollowBtn, ShareBtn, CommentBtn } from ".";

const PostsCommon = ({ index, item, setShowForm, setShowPopup, isLogin, currentData, appendSpan, handleBeforeCallApi, videoRefs, currentPlayingRef, following }) => {
   const { IoMusicalNotes, FaPlay, FaPause, GoUnmute, IoVolumeMute } = icons;
   const { user } = images;
   // route
   const navigate = useNavigate();
   //state
   const [playingCheck, setPlayingCheck] = useState("");
   const [isMute, setIsMute] = useState(false);

   // handle common

   // toggle playing
   const togglePlay = (e, id) => {
      e.stopPropagation();
      const videoElement = videoRefs.current[id];
      if (!videoElement) return;

      if (currentPlayingRef.current && currentPlayingRef.current !== videoElement) {
         currentPlayingRef.current.pause();
      }
      if (videoElement.paused) {
         videoElement.play();
         currentPlayingRef.current = videoElement;
         setPlayingCheck(id);
      } else {
         videoElement.pause();
         setPlayingCheck("");
      }
   };

   // toggle mute
   const toggleMute = (e) => {
      e.stopPropagation();
      setIsMute((prevIsMute) => {
         Object.values(videoRefs.current).forEach((videoElement) => {
            if (videoElement) {
               videoElement.muted = !prevIsMute;
            }
         });
         return !prevIsMute;
      });
   };

   // check login
   const handleNavigateRouter = (url) => {
      if (!isLogin) {
         setShowForm(true);
      } else if (isLogin && !currentData?.verifyOTP) {
         setShowPopup(true);
      } else {
         navigate(url);
      }
   };

   // autoPlay when scroll
   const handleAutoPlay = (id) => {
      const videoElement = videoRefs.current[id];
      if (currentPlayingRef.current && currentPlayingRef.current !== videoElement) {
         currentPlayingRef.current.pause();
      }
      if (videoElement.paused) {
         videoElement.play();
         currentPlayingRef.current = videoElement;
         setPlayingCheck(id);
      } else {
         videoElement.pause();
      }
   };
   // end handle playingVideo auto

   // play video change tab
   const handleVisibilityChange = () => {
      if (document.hidden) {
         // Page is not visible, pause the currently playing video
         if (currentPlayingRef.current) {
            currentPlayingRef.current.pause();
         }
      } else {
         // Page is visible, resume playing the video if there was one playing
         if (currentPlayingRef.current) {
            currentPlayingRef.current.play();
         }
      }
   };
   useEffect(() => {
      // Add event listener for visibility change
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
         document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
   }, []);


   return (
      <div className="post-item row">
         <div onClick={() => handleNavigateRouter(item.user.tiktok_id)} className="post-item__avatar avatar">
            <img src={item.user?.avatar || user} alt="tiktok" />
         </div>

         {/* info */}
         <div className="post-item__info">
            <div className="info-user row">
               <div className="info-user__box">
                  <div className="name row">
                     <strong onClick={() => handleNavigateRouter(item.user.tiktok_id)}>{item.user?.userName}</strong>
                     <span> - {item.user.tiktok_id.slice(0, 20)}...</span>
                  </div>
                  <div className="title-box">
                     <p className="title">{item?.title}</p>
                  </div>
                  <span className="music-name">
                     <IoMusicalNotes /> original sound - {item.user.userName}
                  </span>
               </div>
               {!following && currentData && currentData.id !== item.user_id && <FollowBtn item={item} setShowForm={setShowForm} setShowPopup={setShowPopup} />}
            </div>
            <div className="info-video row">
               <div className="info-video__original">
                  <video
                     className="info-video__original--video"
                     poster={item.thumb_file_name}
                     ref={(el) => (videoRefs.current[item.id] = el)}
                     src={item.video_file_name}
                     preload="auto"
                     loop="loop"
                  ></video>
                  <Waypoint onEnter={() => handleAutoPlay(item.id)} bottomOffset="120px" />
                  <div className="original-video__control row">
                     <span onClick={(e) => togglePlay(e, item.id)}>{playingCheck === item.id ? <FaPause className="icon" /> : <FaPlay className="icon" />}</span>
                     <span onClick={(e) => toggleMute(e)}>{isMute ? <IoVolumeMute className="icon icon--mute" /> : <GoUnmute className="icon icon--mute" />}</span>
                  </div>
               </div>
               <div className="info-video__status row">
                  <FavoriteBtn item={item} setShowForm={setShowForm} />
                  <CommentBtn item={item} setShowForm={setShowForm} setShowPopup={setShowPopup} flag={`/${item.user.tiktok_id}/video/${item.id}`} navigate={navigate} />
                  <ShareBtn item={item} />
               </div>
            </div>
            {appendSpan && appendSpan === index ? <Waypoint onEnter={handleBeforeCallApi} bottomOffset="0" /> : ""}
         </div>
      </div>
   );
};

export default memo(PostsCommon);
