import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import images from "../assets/imgExport";
import icons from "../utilities/icons";
import formatTime from "../utilities/formatTime";

const UploadPhone = ({videoFile, getThumbnail}) => {
   const { control_image, live, user } = images;
   const { BsSearch, IoMusicalNotes, MdFavorite, FaCommentDots, PiShareFatFill, MdOutlinePlayCircle, FaPause, GoUnmute, IoVolumeMute, CiCircleCheck } = icons;

   const videoRef = useRef(null);
   const [isPlaying, setIsPlaying] = useState(false);
   const [isMute, setIsMute] = useState(false);
   const [currentTime, setCurrentTime] = useState(0);
   const [duration, setDuration] = useState(0);
   const [videoURL, setVideoURL] = useState(null);

   useEffect(() => {
      // Tạo URL mới khi videoFile.file thay đổi
      if (videoFile && videoFile.file) {
         const newVideoURL = URL.createObjectURL(videoFile.file);
         setVideoURL(newVideoURL); 
         return () => {
            URL.revokeObjectURL(newVideoURL);
         };
      }
   }, [videoFile]);

   const togglePlay = useCallback(
      (e) => {
         e.stopPropagation();
         if(isPlaying){
            videoRef.current.pause()
            setIsPlaying(false)
         }else{
            videoRef.current.play()
            setIsPlaying(true)
         }
      },[isPlaying]);

   const toggleMute = useCallback(
      (e) => {
         e.stopPropagation();
         if (videoRef.current) {
            videoRef.current.muted = !isMute;
            setIsMute(!isMute);
         }
      },[isMute]);

   const handleTimeUpdate = () => {
      setCurrentTime(videoRef.current.currentTime);
   };
   const handleLoadedMetadata = () => {
      setDuration(videoRef.current.duration);
   };

   const handleVideoEnded = () => {
      setIsPlaying(false);
   };

   useEffect(() => {
      if (videoRef.current) {
         videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
         videoRef.current.addEventListener("ended", handleVideoEnded);
         videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
         setDuration(videoRef.current.duration);
      }

      // unmount
      return () => {
         if (videoRef.current) {
            videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
            videoRef.current.removeEventListener("ended", handleVideoEnded);
            videoRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
         }
      };
   }, []);

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
            <video ref={videoRef} preload="auto" src={videoURL}></video>
            <div className="phone-screen__inner row">
               <div className="inner-heading row">
                  <img src={live} alt="tiktok" />
                  <span>Đang Follow</span>
                  <span>Dành cho bạn</span>
                  <BsSearch className="inner-heading__icon" />
               </div>
               <div className="inner-info row">
                  <div className="inner-info__user row">
                     <span>@Hihi?</span>
                     <span>link anh</span>
                     <div className="inner-info__user--icon row">
                        <IoMusicalNotes className="icon" />
                        <small>
                           <span>Âm thanh gốc - @Hihi?</span>
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
         <div onClick={(e) => togglePlay(e)} className="phone-control-box row">
            <div className="phone-control-box__1">
               <div className="control-duration row">
                  <i onClick={(e) => togglePlay(e)} className="icon-duration icon-duration-action">
                     {isPlaying ? <FaPause /> : <MdOutlinePlayCircle />}
                  </i>
                  <span>
                     <small>{formatTime(currentTime)}</small> / <small>{formatTime(duration)}</small>
                  </span>
                  <i onClick={(e) => toggleMute(e)} className="icon-duration icon-duration-volume">
                     {isMute ? <IoVolumeMute /> : <GoUnmute />}
                  </i>
               </div>
               <div className="control__process">
                  <small></small>
                  <span style={{ width: `${calculatePercentage()}%` }}></span>
               </div>
            </div>
         </div>
         {!getThumbnail && <div className="handle-video__upload row">
            <div className="loader-handle"></div>
            <span>Tối ưu hóa hiển thị...</span>
         </div>}

         <div className="phone-change__link row">
            <CiCircleCheck className="phone-change__link--icon" />
            <span className="phone-change__link--video">{`${videoFile?.name.slice(0, 18)}...` || ''}</span>
            <small className="phone-change__link--change">Thay đổi video</small>
         </div>
      </div>
   );
};

export default memo(UploadPhone);