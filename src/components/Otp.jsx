import React, { memo, useRef } from "react";
import icons from "../utilities/icons";

const {MdKeyboardArrowLeft} = icons

function Otp() {
   const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

   const handleInputChange = (e, index) => {
      const value = e.target.value;
      // Xử lý giá trị nhập vào ô input tại chỉ số `index`

      // Di chuyển tới ô input tiếp theo nếu có giá trị
      if (value && index < inputRefs.length - 1) {
         inputRefs[index + 1].current.focus();
      }
   };

   return (
      <div className="otp">
        <div className="otp__option row">
            <MdKeyboardArrowLeft/>
            <span>Quay lại</span>
        </div>
        <div className="otp__heading">
            <h3>Xác nhận email của bạn</h3>
            <p>Hãy nhập mã mà chúng tôi gửi tới ***@gmail.com</p>
        </div>
         <div className="otp__item row">
            {inputRefs.map((ref, index) => (
               <input key={index} ref={ref} type="text" maxLength="1" onChange={(e) => handleInputChange(e, index)} />
            ))}
         </div>
      </div>
   );
}

export default memo(Otp);
