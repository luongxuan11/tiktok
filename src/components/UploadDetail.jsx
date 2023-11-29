import React, { useRef, useState } from "react";


const UploadDetail = () => {
   const [textLength, setTextLength] = useState(0);
   const [rangeValue, setRangeValue] = useState(0);
   const video = useRef(null);

   const handleCheckLengthInput = (e) => {
      setTextLength(e.target.value.length);
   };
   const handleRangeChange = (e) => {
      let maxValue = +e.target.max;
      let valueThumb = +e.target.value;
      let position = (valueThumb / maxValue) * 100;
      setRangeValue(position);

      if (video.current) {
         video.current.currentTime = (valueThumb / maxValue) * video.current.duration;
      }
   };

   const positionVideo = () => {
      let result = rangeValue * 6 === 590 ? rangeValue * 6 - 25 : rangeValue * 6;
      return result;
   };

   
   return (
      <div className="detail-group">
         <div className="detail-note">
            <div className="detail-heading row">
               <h4>Chú thích</h4>
               <div className="detail-heading__text row">
                  <small>{textLength}</small>/<small>1100</small>
               </div>
            </div>
            <input type="text" onChange={(e) => handleCheckLengthInput(e)} maxLength={1100} />
            <span>@</span>
         </div>
         <div className="detail-imageBox">
            <h4>Ảnh bìa</h4>
            <div className="detail-drag">
               <div className="imageBox-wrapper row"></div>
               <input
                  type="range"
                  className="detail-drag__touch"
                  value={rangeValue}
                  onChange={(e) => handleRangeChange(e)}
                  max={100}
               ></input>
               <small style={{ left: `${positionVideo()}px` }}>
                  <video
                     ref={video}
                     src="https://drive.google.com/uc?id=1zJc8ccTxw4fCXPSy1ZiqpF1npj00yhNo&export"
                     preload="auto"
                     draggable="false"
                     playsInline
                  ></video>
               </small>
            </div>
         </div>
         <div className="detail-privacy"></div>
         <div className="detail-allow"></div>
         <div className="detail-declaration"></div>
         <div className="detail-license"></div>
      </div>
   );
};

export default UploadDetail;
