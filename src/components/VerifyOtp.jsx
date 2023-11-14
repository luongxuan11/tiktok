import React, { memo, useState } from "react";
import icons from "../utilities/icons";
import { useSelector } from "react-redux";
import { apiVerifyOtp, apiSendOtp } from "../service/apis";
import LineAnimated from "../components/animation/LineAnimated";
import Swal from "sweetalert2";

const { AiOutlineCloseCircle } = icons;

const VerifyOtp = ({ setShowPopup, setShowOtp }) => {
   const { currentData } = useSelector((state) => state.user);
   const [checkInput, setCheckInput] = useState(true);
   const [loading, setLoading] = useState(false);
   const [countdown, setCountdown] = useState(0);
   const classInput = checkInput ? "" : "errorInput";

   //  verify otp
   const handleInputChange = async (number) => {
      /^[0-9]+$/.test(number) ? setCheckInput(true) : setCheckInput(false);
      if (checkInput && number.length === 6) {
         setLoading(true);
         const response = await apiVerifyOtp({ otp: +number });
         if (response.err === 0) {
            Swal.fire("Thành công", response.mess, "success").then(() => {
               setLoading(false);
               window.location.reload();
            });
         } else {
            Swal.fire("Thất bại", response.mess, "error");
            setLoading(false);
         }
      }
   };

   //  countDown send otp
   const handleSendOtp = async () => {
      if (countdown === 0) {
        setLoading(true)
         const response = await apiSendOtp({ email: currentData.email });
         if (response.err === 0) {
            setLoading(false)
            setCountdown(60);
            const startCountDown = () => {
               const interval = setInterval(() => {
                  setCountdown((prevCountdown) => {
                     if (prevCountdown === 0) {
                        clearInterval(interval);
                        return 0;
                     }
                     return prevCountdown - 1;
                  });
               }, 1000);
            };
            startCountDown();
         } else {
            Swal.fire("Thất bại", response.mess, "error");
         }
      }
   };

   return (
      <div className="verify-otp">
         <AiOutlineCloseCircle className="verify-otp__icon" onClick={() => (setShowPopup(false), setShowOtp(false))} />
         <h1>Xác thực email của bạn</h1>
         <p>Hãy nhập mã mà chúng tôi gửi tới {currentData.email.slice(0, 3)}***@gmail.com</p>
         {!loading ? (
            <div className="verify-otp__number row">
               <input
                  className={classInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                  type="text"
                  required
                  maxLength={6}
                  placeholder="xxxxxxx"
               />
               {!checkInput ? <span>Mã otp phải là số.</span> : ""}
            </div>
         ) : (
            <LineAnimated />
         )}
         <div className="verify-otp__ask">
            <p className={`verify-otp__ask--p`}>
               Bạn chưa nhận được mã?{" "}
               <span className={`${countdown !== 0 ? "verify-otp__ask--down" : ""}`} onClick={handleSendOtp}>
                  {countdown !== 0 ? `Gửi lại sau(${countdown})` : "Gửi lại"}
               </span>
            </p>
         </div>
      </div>
   );
};

export default memo(VerifyOtp);
