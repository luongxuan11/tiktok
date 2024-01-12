import React, { memo } from "react";
import { apiUploadComment, apiFeedbackComment } from "../service/apis";
import icons from "../utilities/icons";

const InputComment = ({ payload, setPayload, setActive, active, currentPostId, toast, icon, setShowInput, comment_id }) => {
   const { IoMdClose } = icons;
   // submit comment
   const handleBeforeSubmitComment = (e) => {
      let value = e.target.value;
      const char = 6000;
      if (value.length < char && value.length > 0) {
         setActive(true);
         setPayload(value);
      } else {
         setActive(false);
         setPayload("");
      }
   };
   const handleSubmitComment = async () => {
      if (payload && payload.length > 6000) {
         toast.error("Quá dài. Vui lòng thử lại", {
            duration: 1500,
            position: "top-center",
            style: {
               background: "#121212",
               color: "#fff",
               ["fontweight"]: "600",
               padding: "5px 30px",
            },
         });
      } else if (!active) {
         toast.error("Bạn chưa nhập gì. Thử lại", {
            duration: 1500,
            position: "top-center",
            style: {
               background: "#121212",
               color: "#fff",
               ["fontweight"]: "600",
               padding: "5px 30px",
            },
         });
      } else {
         try {
            //options api
            const response = !icon
               ? await apiUploadComment({
                    overview_id: currentPostId,
                    comment: payload,
                 })
               : await apiFeedbackComment({
                    overview_id: currentPostId,
                    comment_id,
                    feedback: payload,
                 });

            // rule check
            if (response.err === 1) {
               toast.error(response.mess, {
                  duration: 1500,
                  position: "top-center",
                  style: {
                     background: "#121212",
                     color: "#fff",
                     ["fontweight"]: "600",
                     padding: "5px 30px",
                  },
               });
            } else {
               setPayload("");
               setActive(false);
               toast?.success("Đã thêm bình luận", {
                  duration: 1500,
                  position: "top-center",
                  style: {
                     background: "#121212",
                     color: "#fff",
                     ["fontweight"]: "600",
                     padding: "5px 30px",
                  },
               });
            }
         } catch (error) {
            console.log(error);
         }
      }
   };
   // end submit

   // event key
   const handleKeyPress = (e) => {
      if (e.key === "Enter" && active) {
         handleSubmitComment();
      }
   };

   return (
      <div className="comment-value">
         <div className="comment-value__box row">
            <input value={payload || ""} onKeyDown={(e) => handleKeyPress(e)} onChange={(e) => handleBeforeSubmitComment(e)} type="text" placeholder="Thêm bình luận" />
            <span onClick={handleSubmitComment} className={`${active ? "comment-value__box--active" : ""}`}>
               Đăng
            </span>
            {icon && (
               <IoMdClose
                  onClick={() => {
                     setShowInput(null);
                     setPayload("");
                  }}
                  className="icon"
               />
            )}
         </div>
      </div>
   );
};

export default memo(InputComment);
