import React, { useRef, useState, useCallback, useEffect } from "react";
import icons from "../../utilities/icons";
import { Button, UploadPhone, UploadDetail, EditVideo } from "../../components";

const { MdCloudUpload, IoIosCut, TfiSplitH } = icons;

const CreatorUpload = () => {
   const [showUploadDetail, setShowUploadDetail] = useState(false);
   const [videoFile, setVideoFile] = useState(null);
   const [showEditVideo, setShowEditVideo] = useState(false);
   const [getThumbnail, setGetThumbnail] = useState(false);
   const [payload, setPayload] = useState({})


   const canvas = useRef(null);
   const fileInputRef = useRef(null);

   const handleShowPhone = useCallback((e) => {
      const file = e.target.files[0];
      if (file) {
         setShowUploadDetail(true);
         setVideoFile({
            file: file,
            name: file.name,
         });
         setPayload(prev => ({
            ...prev,
            title: file.name,
            video: file
         }))
      }
   }, []);

   useEffect(() => {
      const handleBodyOverflow = () => {
         const bodyElement = document.body;
         if (showEditVideo) {
            bodyElement.style.overflow = "hidden";
         } else {
            bodyElement.style.overflow = "auto";
         }
      };
      handleBodyOverflow();

      return () => {
         const bodyElement = document.body;
         bodyElement.style.overflow = "auto";
      };
   }, [showEditVideo]);

   return (
      <section className="creator-upload">
         {showUploadDetail && (
            <div className={`creator-upload__edit row ${!getThumbnail ? "hidden" : ""}`}>
               <div className="upload-edit__info row">
                  <span>1</span>
                  <div className="edit-images__info">
                     <canvas ref={canvas}></canvas>
                  </div>
                  <div className="edit-detail__info row">
                     <span>
                     {payload.title.length >= 20 ? `${payload.title.slice(0, 20)}...`: payload.title}
                     </span>
                     <span>312 3 21 31</span>
                  </div>
                  <div className="edit-btn__box row">
                     <IoIosCut />
                     <Button text={"Chỉnh sửa video"} onClick={() => setShowEditVideo(true)} btnClass={"edit-btn__box--btn"} />
                  </div>
               </div>
               <div className="upload-edit__video row">
                  <div className="box row">
                     <div className="upload-edit__video--title">
                        <span>Tách nhiều phần để tăng khả năng hiển thị</span>
                     </div>
                     <div className="upload-edit__video--split row">
                        <span>-</span>
                        <span>2</span>
                        <span>+</span>
                     </div>
                  </div>
                  <div className="edit--video__box row">
                     <TfiSplitH />
                     <Button text={"Phân chia"} btnClass={"edit--video__box--btn"} />
                  </div>
               </div>
            </div>
         )}
         <div className="upload-desk">
            {!showUploadDetail ? (
               <>
                  <label htmlFor="upload-desk__input" className="upload-desk__label row">
                     <MdCloudUpload className="label__icon" />
                     <strong>Chọn video để tải lên</strong>
                     <span>Chọn hoặc kéo thả tập tin</span>
                     <span>Chỉ hỗ trợ tập tin MP4</span>
                     <span>Độ phân giải 720x1280 trở lên</span>
                     <span>Tối đa 10 phút</span>
                     <span>Nhỏ hơn 100mb</span>
                     <Button btnClass={"label__btn"} onClick={() => fileInputRef.current.click()} text={"Chọn tập tin"} />
                  </label>
                  <input type="file" onChange={(e) => handleShowPhone(e)} accept=".mp4" ref={fileInputRef} id="upload-desk__input" />
               </>
            ) : (
               <>
                  <div className="upload-desk__heading">
                     <h2>Tải video lên</h2>
                     <p>Đăng video vào tài khoản của bạn</p>
                  </div>
                  <div className="upload-detail row">
                     <UploadPhone getThumbnail={getThumbnail} videoFile={videoFile}/>
                     <UploadDetail getThumbnail={getThumbnail} setGetThumbnail={setGetThumbnail} payload={payload} setPayload={setPayload} videoFile={videoFile} canvas={canvas} />
                  </div>
                  <div className="upload-action__box row">
                     <Button text={"Hủy bỏ"} btnClass={"btn action__box--1"} />
                     <Button text={"Đăng"} btnClass={"btn action__box--2"} />
                  </div>
               </>
            )}
         </div>
         {(showEditVideo && showUploadDetail) ? <EditVideo setShowEditVideo={setShowEditVideo} videoFile={videoFile}/> : ""}
      </section>
   );
};

export default CreatorUpload;