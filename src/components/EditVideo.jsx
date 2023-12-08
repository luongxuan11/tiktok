import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import Button from "./Button";
import icons from "../utilities/icons";
import formatTime from "../utilities/formatTime";

const EditVideo = ({ videoFile, setShowEditVideo }) => {
   const { BiBarChartSquare, PiImageDuotone, FaPlay, FaPause } = icons;
   const [videoURL, setVideoURL] = useState(null);
   const [currentTime, setCurrentTime] = useState(0);
   const [duration, setDuration] = useState(0);
   const [isPlaying, setIsPlaying] = useState(false);
   const [valueEncode, setValueEncode] = useState("basic");
   const videoRef = useRef(null);

   // heading value
   const heading = valueEncode === "basic" ? "Chất lượng đầu ra" : "Độ phân giải tùy chỉnh";

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
         if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
         } else {
            videoRef.current.play();
            setIsPlaying(true);
         }
      },
      [isPlaying],
   );

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

   // handle encode
   const handleEncode = (value) => {
      setValueEncode(value);
   };

   return (
      <div className="video-custom row">
         <div className="video-custom__box">
            <div className="custom-box__heading row">
               <h2>Chỉnh sửa video</h2>
               <Button btnClass={"cancel"} onClick={() => setShowEditVideo(false)} text={"Huỷ bỏ"} />
               <Button btnClass={"access"} onClick={() => setShowEditVideo(false)} text={"Lưu bản chỉnh sửa"} />
            </div>
            <div className="custom-box__wrapper row">
               <div className="box-wrapper__sidebar row">
                  <div onClick={() => handleEncode("basic")} className={`item row ${valueEncode === "basic" ? "item--active" : ""}`}>
                     <BiBarChartSquare className="icon" />
                     <span>Ouput</span>
                  </div>
                  <div onClick={() => handleEncode("image")} className={`item row ${valueEncode === "image" ? "item--active" : ""}`}>
                     <PiImageDuotone className="icon" />
                     <span>Hình ảnh</span>
                  </div>
               </div>
               <div className="box-wrapper__options">
                  <h3>{heading}</h3>
                  {valueEncode === "basic" ? (
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
                  ) : (
                     <div className="options-change row">
                        <div className="item row">
                           <input type="checkbox" />
                           <span>Preset:</span>
                           <small>Very Fast 1080p30</small>  
                        </div>
                        <div className="item row">
                           <input type="checkbox" />
                           <span>Encoder-level:</span>
                           <small>"4.1"</small>
                        </div>
                     </div>
                  )}
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
