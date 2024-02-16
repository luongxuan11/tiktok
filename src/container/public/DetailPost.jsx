import React, { useEffect, useState, useLayoutEffect, memo } from "react";
import icons from "../../utilities/icons";
import Search from "../../components/Search";
import InputComment from "../../components/InputComment";
import { FollowBtn, ShareBtn, FavoriteBtn, CommentBtn, Button, Comment, VideoUser } from "../../components";
import images from "../../assets/imgExport";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { apiGetCurrentPost } from "../../service/apis";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/store/actions";
// import { io } from "socket.io-client";
import { formatVi } from "../../utilities/formatTime";
import { socket } from "../../socket";

const DetailPost = () => {
   const { IoMdClose, BsThreeDots, IoMusicalNotes, MdKeyboardArrowDown, MdKeyboardArrowUp } = icons;
   const { twitter, whatsApp, facebook, send, user } = images;
   // const navigate = useNavigate();
   const location = useLocation();
   const dispatch = useDispatch();

   // redux
   const { isLogin } = useSelector((state) => state.auth);
   const { currentData } = useSelector((state) => state.user);
   // state
   const [currentUrl, setCurrentUrl] = useState(null);
   const [currentPost, setCurrentPost] = useState(null);
   const [action, setAction] = useState("comment");
   const [active, setActive] = useState(false);
   const [commentIo, setCommentIo] = useState([]);
   const [feedbackIo, setFeedbackIo] = useState([]);
   const [deleteComment, setDeleteComment] = useState(null);

   // data comment from socketIo
   useLayoutEffect(() => {
      const postId = location.pathname.split("/").slice(-1)[0];
      socket.on("newComment", (data) => {
         console.log(data, "check");
         if (data) {
            setCommentIo((prev) => [data, ...prev]);
         }
      });
      socket.emit("join-room", postId);
      socket.on("deleteComment", (data) => {
         if (data) {
            setDeleteComment(data);
         }
      });
      socket.on("newFeedback", (data) => {
         setFeedbackIo((prev) => [data, ...prev]);
      });

      return () => {
         socket.emit("leave-room", postId);
         setCommentIo([]);
      };
   }, [location.pathname]);

   // call api
   const callApi = async (postId) => {
      try {
         const response = await apiGetCurrentPost({ post_id: postId });
         setCurrentPost(response.data);
      } catch (error) {
         console.error(error);
      }
   };
   useEffect(() => {
      if (isLogin) {
         setCurrentUrl(window.location.href);
         const postId = location.pathname.split("/").slice(-1)[0];
         callApi(postId);
      }
   }, [location.pathname, isLogin]);
   // end call api

   // check login
   if (!isLogin) {
      dispatch(actions.getPostFalse());
      return <Navigate to="/" replace={true} />;
   }

   // coppy link -- clipboard
   const handleCopyLink = async () => {
      try {
         await navigator.clipboard.writeText(currentUrl);
         toast.success("Đã sao chép mã!", {
            duration: 1500,
            position: "top-center",
            style: {
               background: "#121212",
               color: "#fff",
               ["fontweight"]: "600",
               padding: "5px 30px",
            },
         });
      } catch (error) {
         toast.error("Không thể sao chép liên kết - mã lỗi 404!", {
            duration: 1500,
            position: "top-center",
            style: {
               background: "#121212",
               color: "#fff",
               ["fontweight"]: "600",
               padding: "5px 30px",
            },
         });
         console.error("Không thể sao chép liên kết:", error);
      }
   };

   // action video or comment
   const handleToggleAction = (value) => {
      setAction(value);
   };

   return (
      <div className="detail-post row">
         <div className="detail-post__video">
            <div className="video-nav row">
               <span onClick={() => window.history.back()} className="icon--box row">
                  <IoMdClose className="icon" />
               </span>
               <Search />
               <span className="icon--box row icon--dots">
                  <BsThreeDots className="icon" />
               </span>
            </div>
            <div className="video-wrapper">
               <div className="picture">
                  <img src={currentPost?.thumb_file_name} alt="TikTok" />
                  <span></span>
               </div>
               <div className="movie row">
                  <video controls loop autoPlay preload="auto" src={currentPost?.video_file_name}></video>
               </div>
            </div>
         </div>
         {/* group */}
         {currentPost && (
            <div className="detail-post--wrapper row">
               <div className="detail-post__group custom-scroll">
                  <div className="group-info">
                     <div className="group-info__user row">
                        <img src={currentPost?.user.avatar || user} alt="TikTok" />
                        <div className="box row">
                           <strong className="name">{currentPost?.user.userName.length > 20 ? `${currentPost?.user.userName.slice(0, 20)}...` : currentPost?.user.userName}</strong>
                           <span className="tiktokId row">
                              {currentPost?.user.tiktok_id?.length > 10 ? `${currentPost?.user.tiktok_id?.slice(0, 10)}...` : `${currentPost?.user.tiktok_id} - `}{" "}
                              <small>{formatVi(currentPost.updatedAt)}</small>
                           </span>
                        </div>
                        {currentData?.id === currentPost?.user_id ? "" : <FollowBtn item={currentPost} btnClass={"tiktokFollow"} />}
                     </div>
                     <p className="group-info__content ellipsis">{currentPost?.title}</p>
                     <div className="group-info__music row">
                        <IoMusicalNotes className="icon" />
                        <span>
                           {currentPost?.user.userName?.length > 13 ? `Nhạc nền - ${currentPost?.user.userName?.slice(0, 13)}...` : `Nhạc nền - ${currentPost?.user.userName}`}
                        </span>
                     </div>
                  </div>
                  <div className="group-status row">
                     <div className="icon-box-status row">
                        <FavoriteBtn item={currentPost} />
                        <CommentBtn not item={currentPost} />
                        <ShareBtn item={currentPost} />
                     </div>
                     <div className="image-box row">
                        <div className="image-box__item row">
                           <span className="hidden">Gửi đến bạn bè</span>
                           <img src={send} alt="TikTok" />
                        </div>
                        <div className="image-box__item row">
                           <span className="hidden">Chia sẻ với Facebook</span>
                           <img src={facebook} alt="TikTok" />
                        </div>
                        <div className="image-box__item row">
                           <span className="hidden">Chia sẻ với WhatsApp</span>
                           <img src={whatsApp} alt="TikTok" />
                        </div>
                        <div className="image-box__item row">
                           <span className="twitter hidden">Chia sẻ với Twitter</span>
                           <img src={twitter} alt="TikTok" />
                        </div>
                     </div>
                  </div>
                  <div className="group-previous row">
                     <span>{currentUrl?.slice(0, 40)}...</span>
                     <Button btnClass={"group-previous__btn"} text={"Sao chép liên kết"} onClick={handleCopyLink} />
                  </div>
                  <Toaster />
                  <div className="group-action">
                     <div className="group-action__active row">
                        <span className={`row ${action === "comment" ? "active" : ""}`} onClick={() => handleToggleAction("comment")}>
                           Bình luận ({currentPost?.comments.length})
                        </span>
                        <span className={`row ${action === "user" ? "active" : ""}`} onClick={() => handleToggleAction("user")}>
                           Video của nhà sáng tạo
                        </span>
                     </div>
                  </div>
                  <div className="group-line"></div>
                  <div className="group-feature">
                     {action === "comment" ? (
                        <Comment
                           deleteComment={deleteComment}
                           commentIo={commentIo}
                           setCommentIo={setCommentIo}
                           toast={toast}
                           comments={currentPost?.comments}
                           idUser={currentData.id}
                           MdKeyboardArrowDown={MdKeyboardArrowDown}
                           author={currentPost.user_id}
                           MdKeyboardArrowUp={MdKeyboardArrowUp}
                           currentPostId={currentPost.id}
                           feedbackIo={feedbackIo}
                        />
                     ) : (
                        <VideoUser userId={currentPost.user_id} currentPostId={currentPost.id} setCurrentPost={setCurrentPost} />
                     )}
                  </div>
               </div>
               {action === "comment" && <InputComment toast={toast} setActive={setActive} active={active} currentPostId={currentPost.id} />}
            </div>
         )}
      </div>
   );
};

export default memo(DetailPost);
