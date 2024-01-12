import React, { memo, useState } from "react";
import { formatVi } from "../utilities/formatTime";
import icons from "../utilities/icons";


const Feedback = ({ value, avatarDefault, currentData, author}) => {
   const { AiTwotoneDelete } = icons;
   
   return (
      <>
         {value &&
            value.length !== 0 &&
            value.map((item) => {
               return (
                  <div key={item.id} className="reply-box">
                     <div className="box row">
                        <img src={item.feedbackCurrent.avatar || avatarDefault} alt="user-feedback" />
                        <div className="info row">
                           <span>{item.feedbackCurrent.userName.length > 20 ? item.feedbackCurrent.userName : item.feedbackCurrent.userName.slice(0, 20)} {author === item.feedbackCurrent.id && <small>Tác giả</small>}</span>
                           <span className="info--time">{item.feedback}</span>
                           <span className="time">{formatVi(item.updatedAt)}</span>
                        </div>
                        {/* {currentData && currentData.id === item.feedbackCurrent.id && <AiTwotoneDelete className="icon" />} */}
                     </div>
                  </div>
               );
            })}
      </>
   );
};

export default memo(Feedback);
