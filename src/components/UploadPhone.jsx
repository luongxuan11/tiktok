import React, { useEffect, useRef, useState } from "react";
import images from "../assets/imgExport";
import icons from "../utilities/icons";

const { control_image, live, user } = images;
const { BsSearch, IoMusicalNotes, MdFavorite, FaCommentDots, PiShareFatFill, MdOutlinePlayCircle, FaPause, GoUnmute, IoVolumeMute} = icons;

const UploadPhone = () => {
   const videoRef = useRef(null);
   const [isPlaying, setIsPlaying] = useState(false);
   const [isMute, setIsMute] = useState(false);
   const [currentTime, setCurrentTime] = useState(0);
   const [duration, setDuration] = useState(0);

   const togglePlay = () => {
      if (videoRef.current) {
         if (isPlaying) {
           videoRef.current.pause();
         } else {
           videoRef.current.play();
         }
         setIsPlaying(!isPlaying);
       }
   }
   const toggleMute = () => { 
      if (videoRef.current) {
         videoRef.current.muted = !isMute;
         setIsMute(!isMute)
       }
   }

   // format time
   const formatTime = (time) => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = Math.floor(time % 60);
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
   };

   useEffect(() => {
      const handleTimeUpdate = () => {
         setCurrentTime(videoRef.current.currentTime);
      };
      const handleLoadedMetadata = () => {
         setDuration(videoRef.current.duration);
      };

      const handleVideoEnded = () => {
         setIsPlaying(false);
      };

      if (videoRef.current) {
         videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
         videoRef.current.addEventListener("ended", handleVideoEnded);
         videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
         setDuration(videoRef.current.duration);
      }

      // Clear sự kiện khi component bị hủy
      return () => {
         if (videoRef.current) {
            videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
            videoRef.current.removeEventListener("ended", handleVideoEnded);
            videoRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
         }
      };
   }, [videoRef]);


   const calculatePercentage = () => {
      return (currentTime / duration) * 100;
   };

   return (
      <div className="upload-phone">
         <div className="phone-btn__box">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
         </div>
         <div className="phone-screen">
            <video ref={videoRef} preload="auto" src="https://drive.google.com/uc?id=1zJc8ccTxw4fCXPSy1ZiqpF1npj00yhNo&export"></video>
            <div className="phone-screen__inner row">
               <div className="inner-heading row">
                  <img src={live} alt="tiktok" />
                  <span>Đang Follow</span>
                  <span>Dành cho bạn</span>
                  <BsSearch className="inner-heading__icon" />
               </div>
               <div className="inner-info row">
                  <div className="inner-info__user row">
                     <span>@Lươn?</span>
                     <span>link anh</span>
                     <div className="inner-info__user--icon row">
                        <IoMusicalNotes className="icon" />
                        <small>
                           <span>Âm thanh gốc - @Lươn?</span>
                        </small>
                     </div>
                  </div>
                  <div className="inner-info__status row">
                     <img src={user} alt="tiktok" />
                     <MdFavorite className="icon" />
                     <FaCommentDots className="icon" />
                     <PiShareFatFill className="icon" />
                     <div className="status-music row">
                        <img className={`${isPlaying ? "status-music--active" : ""}`} src={user} alt="tiktok" />
                        <div className="music-animated">
                           <span>
                              <IoMusicalNotes className={`music-animated__icon ${isPlaying ? "music-animated__icon--active" : ""}`} />
                              <IoMusicalNotes className={`music-animated__icon ${isPlaying ? "music-animated__icon--active" : ""}`} />
                              <IoMusicalNotes className={`music-animated__icon ${isPlaying ? "music-animated__icon--active" : ""}`} />
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <img className="phone-control__img" src={control_image} alt="tiktok" />
         <div onClick={togglePlay} className="phone-control-box row">
            <div className="phone-control-box__1">
               <div className="control-duration row">
                  <i onClick={togglePlay} className="icon-duration icon-duration-action">{isPlaying ? <FaPause/> : <MdOutlinePlayCircle/>}</i>
                  <span>
                     <small>{formatTime(currentTime)}</small> / <small>{formatTime(duration)}</small>
                  </span>
                  <i onClick={toggleMute} className="icon-duration icon-duration-volume">{isMute ? <IoVolumeMute/> : <GoUnmute/>}</i>
               </div>
               <div className="control__process">
                  <small></small>
                  <span style={{ width: `${calculatePercentage()}%` }}></span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UploadPhone;
