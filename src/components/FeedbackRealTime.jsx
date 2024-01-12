import React, { memo } from "react";
import { formatVi } from "../utilities/formatTime";
import icons from "../utilities/icons";

const FeedbackRealTime = ({ feedbackIo, currentData, avatarDefault, comment_id, author }) => {
   const { AiTwotoneDelete } = icons;
   const filteredFeedbackIo = feedbackIo?.filter((item) => item.comment_id === comment_id);
   return (
      <>
         {/* realTime */}
         {filteredFeedbackIo &&
            filteredFeedbackIo.length !== 0 &&
            filteredFeedbackIo.map((item) => {
               return (
                  <div key={item.id} className="reply-box">
                     <div className="box row">
                        <img src={item.userCurrent.avatar || avatarDefault} alt="user-feedback" />
                        <div className="info row">
                           <span>
                              {item.userCurrent.userName.length > 20 ? item.userCurrent.userName : item.userCurrent.userName.slice(0, 20)}{" "}
                              {author === item.userCurrent.id && <small>Tác giả</small>}
                           </span>
                           <span className="info--time">{item.feedback}</span>
                           <span className="time">{formatVi(item.updatedAt)}</span>
                        </div>
                        {/* {currentData && currentData.id === item.userCurrent.id && <AiTwotoneDelete className="icon"/>} */}
                     </div>
                  </div>
               );
            })}
         {/* end realTime */}
      </>
   );
};

export default memo(FeedbackRealTime);
