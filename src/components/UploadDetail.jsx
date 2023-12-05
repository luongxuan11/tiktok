import React, { useRef, useState, useEffect, memo } from "react";
import captureImage from "../utilities/canvasGenThumb";
import icons from "../utilities/icons";
import SwitchBtn from "./animation/SwitchBtn";

const UploadDetail = ({ canvas, setInfoEditDetail, videoFile }) => {
   const { IoMdArrowDropdown, FaCheck } = icons;

   const [textLength, setTextLength] = useState(0);
   const [rangeValue, setRangeValue] = useState(0);
   const [showOption, setShowOption] = useState(false);
   const [isChecked, setIsChecked] = useState(false);
   const [optionValue, setOptionValue] = useState("Công khai");
   const [selectedItems, setSelectedItems] = useState(["Bình luận", "Duet", "Ghép nối"]);
   const [videoURL, setVideoURL] = useState(null);
   const outSide = useRef(null);

   const video = useRef(null);

   // set length text
   const handleCheckLengthInput = (e) => {
      const value = e.target.value;
      setInfoEditDetail(value);
      setTextLength(value.length);
   };

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

   // position image
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

   // function capture image from video
   useEffect(() => {
      const debounceTimeout = setTimeout(() => {
         captureImage(video, canvas);
      }, 1000);
      return () => {
         clearTimeout(debounceTimeout);
      };
   }, [rangeValue]);

   // handleShowOption
   const handleShowOption = () => {
      setShowOption((prev) => !prev);
   };

   // option value
   const handleSelectOption = (value) => {
      setShowOption(false);
      setOptionValue(value);
   };

   // onclick outSide
   const handleClickOutside = (event) => {
      if (outSide.current && !outSide.current.contains(event.target)) {
         setShowOption(false);
      }
   };

   useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, []);

   // allow

   const handleItemClick = (item) => {
      switch (item) {
         case "Bình luận":
         case "Duet":
         case "Ghép nối":
            setSelectedItems((prevSelected) =>
               prevSelected.includes(item) // check xem đã chọn chưa
                  ? prevSelected.filter((selectedItem) => selectedItem !== item) // nếu chọn rồi thì khi click lại bỏ nó
                  : [...prevSelected, item],
            );
            break;
         default:
            break;
      }
   };

   // jsx
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
               <div className="imageBox-wrapper row">

               </div>
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
                     src={videoURL}
                     preload="auto"
                     draggable="false"
                     playsInline
                  ></video>
               </small>
            </div>
         </div>
         <div className="detail-privacy">
            <h4>Ai có thể xem video này</h4>
            <div className="detail-privacy__box">
               <div ref={outSide} onClick={handleShowOption} className="privacy-box__permanent row">
                  <span className="item">{optionValue}</span>
                  <IoMdArrowDropdown className={`item icon ${showOption ? "icon--active" : ""}`} />
               </div>
               <div className={`privacy-box__option row ${showOption ? "privacy-box__option--active" : ""}`}>
                  <span
                     className={optionValue === "Công khai" ? "active" : ""}
                     onClick={() => handleSelectOption("Công khai")}
                  >
                     Công khai
                  </span>
                  <span
                     className={optionValue === "Bạn bè" ? "active" : ""}
                     onClick={() => handleSelectOption("Bạn bè")}
                  >
                     Bạn bè
                  </span>
                  <span
                     className={optionValue === "Chỉ mình tôi" ? "active" : ""}
                     onClick={() => handleSelectOption("Chỉ mình tôi")}
                  >
                     Chỉ mình tôi
                  </span>
               </div>
            </div>
         </div>
         <div className="detail-allow">
            <h4>Cho phép người dùng:</h4>
            <div className="detail-allow__box row">
               <div className="detail-allow__item row">
                  <span onClick={() => handleItemClick("Bình luận")} className="row">
                     {selectedItems.includes("Bình luận") && <FaCheck className="icon" />}
                  </span>
                  <p>Bình luận</p>
               </div>
               <div className="detail-allow__item row">
                  <span onClick={() => handleItemClick("Duet")} className="row">
                     {selectedItems.includes("Duet") && <FaCheck className="icon" />}
                  </span>
                  <p>Duet</p>
               </div>
               <div className="detail-allow__item row">
                  <span onClick={() => handleItemClick("Ghép nối")} className="row">
                     {selectedItems.includes("Ghép nối") && <FaCheck className="icon" />}
                  </span>
                  <p>Ghép nối</p>
               </div>
            </div>
         </div>
         <div className="detail-declaration">
            <div className="declaration-heading row">
               <h4>Khai báo nội dung bài đăng</h4>
               <SwitchBtn isChecked={isChecked} setIsChecked={setIsChecked} />
            </div>
            <p className="detail-declaration__title">
               Cho người khác biết bài đăng này quảng bá thương hiệu, sản phẩm hay dịch vụ.
            </p>
            <div className="declaration-rule row">
               <div className="declaration-rule__trademark">
                  <h4>Thương hiệu của bạn</h4>
                  <p className="p">Bạn đang quảng bá cho bản thân hoặc doanh nghiệp của chính mình.</p>
               </div>
               {isChecked && <>
                  <div className="declaration-rule__headTo">
                     <h4>Nội dung định hướng thương hiệu</h4>
                     <p className="p">
                        Bạn đang hợp tác có trả phí với một thương hiệu. Sau khi đăng video, hãy mở ứng dụng TikTok dành
                        cho thiết bị di động và liên kết chiến dịch trong mục “Cài đặt quảng cáo” của video.
                     </p>
                  </div>
                  <div className="declaration-rule__note">
                     <h4>Website với mục đích học tập</h4>
                     <p className="p">
                        Trang web này được thiết lập với mục đích học tập và nâng cao kiến thức, không có bất kỳ hoạt
                        động thương mại nào và hoàn toàn tuân theo quy định về bản quyền.
                     </p>
                  </div>
               </>}
            </div>
         </div>
      </div>
   );
};

export default memo(UploadDetail);
