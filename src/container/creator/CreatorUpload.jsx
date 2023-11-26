import React, { useRef, useState } from "react";
import icons from "../../utilities/icons";
import { Button, UploadPhone, UploadDetail} from "../../components";

const { MdCloudUpload } = icons;

const CreatorUpload = () => {
   const [showUploadDetail, setShowUploadDetail] = useState(true);

   const fileInputRef = useRef(null);
   const handleShowPhone = (e) => {
      if (e.target.value) {
        setShowUploadDetail(true)
      }
   };

   return (
      <section className="creator-upload">
         <div className="upload-desk">
            {!showUploadDetail ? <>
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
               <input
                  type="file"
                  onChange={(e) => handleShowPhone(e)}
                  accept=".mp4"
                  ref={fileInputRef}
                  id="upload-desk__input"
               />
            </> : <>
              <div className="upload-desk__heading">
                <h2>Tải video lên</h2>
                <p>Đăng video vào tài khoản của bạn</p>
              </div>
              <div className="upload-detail row">
                <UploadPhone/>
                <UploadDetail/>
              </div>
            </>}
         </div>
      </section>
   );
};

export default CreatorUpload;
