import React, { memo, useCallback, useEffect, useState, useLayoutEffect } from "react";
import { formatVi } from "../utilities/formatTime";
import images from "../assets/imgExport";
import { Button, InputComment, Feedback, FeedbackRealTime } from "./";
import { apiDeleteComment } from "../service/apis";
import { useSelector } from "react-redux";

const Comment = ({ comments, commentIo, idUser, toast, setCommentIo, deleteComment, MdKeyboardArrowDown, author, MdKeyboardArrowUp, currentPostId, feedbackIo }) => {
   const { user } = images;

   const [commentArr, setCommentArr] = useState([]);
   const [showInput, setShowInput] = useState(null);
   const [active, setActive] = useState(false);
   const [payload, setPayload] = useState("");
   const [openFeedback, setOpenFeedback] = useState("");

   const { currentData } = useSelector((state) => state.user);

   useLayoutEffect(() => {
      if (comments && comments.length > 0) {
         setCommentArr(comments);
      }else{
         setCommentArr([])
      }
   }, [comments]);
   // handle delete comment and feedback
   const handleDeleteComment = useCallback(
      async (value, id) => {
         if (value === "Xóa") {
            const response = await apiDeleteComment({ comment_id: id });
            if (response.err === 0) {
               toast.success("Đã xóa bình luận", {
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
         }
      },
      [deleteComment],
   );

   // delete comment user interface
   useEffect(() => {
      if (deleteComment && commentIo.length === 0) {
         const updatedCommentArr = commentArr?.filter((item) => item.id !== deleteComment);
         setCommentArr(updatedCommentArr);
      }
      if (deleteComment && commentIo.length !== 0) {
         const updatedCommentIo = commentIo?.filter((item) => item.id !== deleteComment);
         setCommentIo(updatedCommentIo);
      }
   }, [deleteComment]);

   const showCommentInput = (id) => {
      setShowInput(id);
   };

   // api feedback
   const replyComment = (id) => {
      setOpenFeedback(id);
   };

   // jsx
   return (
      // arr get api
      <div className="feature-comment">
         {/* comment realTime */}
         {commentIo &&
            commentIo.length > 0 &&
            commentIo.map((item) => {
               return (
                  <div key={item.id} className="feature-comment__user row">
                     <img src={item.userCurrent.avatar || user} alt="TikTok" />
                     <div className="user row">
                        <span className="user__userName">
                           {item.userCurrent.userName} {author === item.userId && <small>Tác giả</small>}
                        </span>
                        <span className="user__content ellipsis">{item.comment}</span>
                        <div className="feedback row">
                           <span className="row">{formatVi(item.updatedAt).length > 8 ? `${formatVi(item.updatedAt).slice(0, 8)}...` : formatVi(item.updatedAt)}</span>
                           <span onClick={() => showCommentInput(item.id)} className="row">
                              Trả lời
                           </span>
                        </div>
                        {/* show input feedback */}

                        {showInput && item.id === showInput && (
                           <InputComment
                              setActive={setActive}
                              active={active}
                              payload={payload}
                              setPayload={setPayload}
                              setShowInput={setShowInput}
                              comment_id={showInput}
                              icon
                              currentPostId={currentPostId}
                           />
                        )}
                        {/* realtime */}
                        {feedbackIo.length > 0 && (
                           <div className="feedback--reply">
                              <FeedbackRealTime feedbackIo={feedbackIo} avatarDefault={user} currentData={currentData} comment_id={item.id} author={author} />
                           </div>
                        )}
                     </div>
                     <Button
                        onClick={() => handleDeleteComment(idUser === item.userCurrent.id ? "Xóa" : "Báo cáo", item.id)}
                        btnClass={"action"}
                        text={`${idUser === item.userCurrent.id ? "Xóa" : "Báo cáo"}`}
                     />
                  </div>
               );
            })}
         {/* end realtime */}
         {commentArr &&
            commentArr.map((item) => {
               return (
                  <div key={item.id} className="feature-comment__user row">
                     <img src={item.userCurrent.avatar || user} alt="TikTok" />
                     <div className="user row">
                        <span className="user__userName">
                           {item.userCurrent.userName} {author === item.userId && <small>Tác giả</small>}
                        </span>
                        <span className="user__content ellipsis">{item.comment}</span>
                        <div className="feedback row">
                           <span className="row">{formatVi(item.updatedAt).length > 8 ? `${formatVi(item.updatedAt).slice(0, 8)}...` : formatVi(item.updatedAt)}</span>
                           <span onClick={() => showCommentInput(item.id)} className="row">
                              Trả lời
                           </span>
                        </div>
                        {/* show input feedback */}
                        {showInput && item.id === showInput && (
                           <InputComment
                              setActive={setActive}
                              active={active}
                              payload={payload}
                              setPayload={setPayload}
                              setShowInput={setShowInput}
                              comment_id={showInput}
                              icon
                              currentPostId={currentPostId}
                           />
                        )}
                        {/* realtime */}
                        {feedbackIo.length > 0 && (
                           <div className="feedback--reply">
                              <FeedbackRealTime feedbackIo={feedbackIo} avatarDefault={user} currentData={currentData} comment_id={item.id} author={author} />
                           </div>
                        )}
                        {/* count people */}
                        {item.link_feedback.length > 0 && (
                           <div className="feedback--reply">
                              <span onClick={() => replyComment(item.id)} className={`reply__comment row ${openFeedback === item.id ? "hidden" : ""}`}>
                                 xem thêm {item.link_feedback.length} câu trả lời <MdKeyboardArrowDown className="icon" />
                              </span>
                              {openFeedback === item.id && <Feedback value={item.link_feedback} avatarDefault={user} currentData={currentData} author={author}/>}
                              {openFeedback === item.id && (
                                 <span onClick={() => setOpenFeedback("")} className={`reply__comment hihi row`}>
                                    Ẩn phản hồi <MdKeyboardArrowUp className="icon" />
                                 </span>
                              )}
                           </div>
                        )}
                     </div>
                     <Button
                        onClick={() => handleDeleteComment(idUser === item.userCurrent.id ? "Xóa" : "Báo cáo", item.id)}
                        btnClass={"action"}
                        text={`${idUser === item.userCurrent.id ? "Xóa" : "Báo cáo"}`}
                     />
                  </div>
               );
            })}
         {commentArr.length === 0 && commentIo.length === 0 ? <span className="first-user__comment row">Hãy là người đầu tiên bình luận!</span> : ""}
      </div>
   );
};

export default memo(Comment);
