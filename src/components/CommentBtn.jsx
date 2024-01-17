import React, { memo } from "react";
import icons from "../utilities/icons";
import { useSelector } from "react-redux";

const CommentBtn = ({ item, setShowForm, setShowPopup, not, flag, navigate }) => {
   const { FaCommentDots } = icons;
   const { isLogin } = useSelector((state) => state.auth);
   const { currentData } = useSelector((state) => state.user);
    // state


   // handle
   const handleInteractionShareAndComment = () => {
      if (!isLogin) {
         setShowForm(true);
      } else if (!currentData?.verifyOTP) {
         setShowPopup(true);
      } else {
        navigate(flag)
      }
   };

   const handleClick = () => {
      if (!not) {
         handleInteractionShareAndComment();
      }
   };

   return (
      <div className="icon-box row">
         <small onClick={handleClick} className="icon-box__small icon-box__small--comment row">
            <FaCommentDots className="icon" />
         </small>
         <span>{item?.comments.length}</span>
      </div>
   );
};

export default memo(CommentBtn);
