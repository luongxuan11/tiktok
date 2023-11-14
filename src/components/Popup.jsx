import React, { memo, useState } from "react";
import Button from "./Button";
import VerifyOtp from "./VerifyOtp";
import { apiSendOtp } from "../service/apis";
import Circle from "../components/animation/Circle"
import Swal from "sweetalert2";

const Popup = ({ title, content, cancel, access, setShowPopup, showOtp, setShowOtp, currentData }) => {

  const [loading, setLoading] = useState(false)

  const handleShowOtp = async() => {
    setLoading(true)
    const response = await apiSendOtp({email: currentData})
    if(response.err === 0){
      setLoading(false)
      setShowOtp(true)
    }else{
      Swal.fire("Thất bại!", response.mess, "error");
      setLoading(false)
    }
  }

   return (
      <div className="popup row">
         <div className="popup-box">
            {!showOtp ? <>
               <h1>{title}</h1>
               <p>{content}</p>
               <div className="popup-box__action row">
                  <Button
                     onClick={() => setShowPopup(false)}
                     btnClass={"popup-box__btn--cancel popup-box__btn"}
                     text={cancel}
                  />
                  {loading ? <Circle/> : <Button onClick={handleShowOtp} btnClass={"popup-box__btn popup-box__btn--access"} text={access} />}
               </div>
            </> : <VerifyOtp setShowPopup={setShowPopup} setShowOtp={setShowOtp}/>}
         </div>
      </div>
   );
};

export default memo(Popup);
