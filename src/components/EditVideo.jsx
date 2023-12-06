import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import Button from "./Button";
import icons from "../utilities/icons";
import formatTime from "../utilities/formatTime";

const EditVideo = ({ videoFile, setShowEditVideo }) => {
   const { IoMusicalNotes, SiAudiomack, PiImageDuotone, FaPlay, FaPause } = icons;
   const [videoURL, setVideoURL] = useState(null);
   const [currentTime, setCurrentTime] = useState(0);
   const [duration, setDuration] = useState(0);
   const [isPlaying, setIsPlaying] = useState(false);
   const videoRef = useRef(null);

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

   const handleTimeUpdate = () => {
      setCurrentTime(videoRef.current?.currentTime);
   };
   const handleLoadedMetadata = () => {
      setDuration(videoRef.current?.duration);
   };
   const handleVideoEnded = () => {
      setIsPlaying(false);
   };

   // event handle video element DOM
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

   return (
      <div className="video-custom row">
         <div className="video-custom__box">
            <div className="custom-box__heading row">
               <h2>Chỉnh sửa video</h2>
               <Button btnClass={"cancel"} onClick={() => setShowEditVideo(false)} text={"Huỷ bỏ"} />
               <Button btnClass={"access"} text={"Lưu bản chỉnh sửa"} />
            </div>
            <div className="custom-box__wrapper row">
               <div className="box-wrapper__sidebar row">
                  <div className="item row">
                     <IoMusicalNotes className="icon" />
                     <span>Âm thanh</span>
                  </div>
                  <div className="item row">
                     <PiImageDuotone className="icon" />
                     <span>Hình ảnh</span>
                  </div>
                  <div className="item row">
                     <SiAudiomack className="icon" />
                     <span>Encoder</span>
                  </div>
               </div>
               <div className="box-wrapper__options">
                  <h3>Chất lượng đầu ra</h3>
                  <div className="options row">
                     <div className="item row">
                        <span>Thông số mặc định:</span>
                        <small>Mặc định</small>
                     </div>
                     <div className="item row">
                        <span>Preset:</span>
                        <small>Very Fast 720p30</small>
                     </div>
                     <div className="item row">
                        <span>Audio:</span>
                        <small>aac basic</small>
                     </div>
                     <div className="item row">
                        <span>Encoder-profile:</span>
                        <small>main</small>
                     </div>
                     <div className="item row">
                        <span>Encoder-level:</span>
                        <small>"3.1"</small>
                     </div>
                     <div className="item row">
                        <span>Quality:</span>
                        <small>22</small>
                     </div>
                     <div className="item row">
                        <span>Display:</span>
                        <small>720x1280</small>
                     </div>
                  </div>
               </div>
               <div className="box-wrapper__video row">
                  <div className="video row">
                     <video ref={videoRef} src={videoURL} preload="auto"></video>
                  </div>
               </div>
            </div>
            <div className="video-custom__control">
               <div className="control-edit row">
                  <i onClick={(e) => togglePlay(e)}>{isPlaying ? <FaPause className="icon" /> : <FaPlay className="icon" />}</i>
                  <small>{formatTime(currentTime)}</small>
                  <small> / {formatTime(duration)}</small>
               </div>
               <div className="control-process__custom">
                  <div className="input-detail row">
                    <span>Tính năng cắt video tạm thời khóa để bảo trì!</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default memo(EditVideo);
