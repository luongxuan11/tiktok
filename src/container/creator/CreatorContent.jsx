import React, { useState, useRef, useEffect } from "react";
import icons from "../../utilities/icons";
import { useSelector } from "react-redux";
import { apiGetVideoOfUser, apiUpdatePost, apiDeletePost } from "../../service/apis";
import { formatVi } from "../../utilities/formatTime";
import { Popup } from "../../components";
import { Toaster, toast } from "react-hot-toast";

const CreatorContent = () => {
   const { MdFavorite, FaCommentDots, PiShareFatFill, FaPlay, FaRegCommentDots, RiDeleteBinLine, MdKeyboardArrowDown, AiOutlineCloseCircle, RiLoader4Line } = icons;
   const { currentData } = useSelector((state) => state.user);
   const optionRef = useRef(null);

   // state
   const [videoPrev, setVideoPrev] = useState(null);
   const [showPopup, setShowPopup] = useState(false);
   const [showOption, setShowOption] = useState(null);
   const [priv, setPriv] = useState({
      id: null,
      state: null,
   });
   const [posts, setPosts] = useState([]);
   const [keyRemovePost, setKeyRemovePost] = useState({});
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const handleClickOutside = () => {
         if (optionRef.current) {
            setShowOption(null);
         }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, []);

   // call api posts
   const callApi = async (userId) => {
      const response = await apiGetVideoOfUser({ userId, control: true });
      if (response.err === 0) {
         setPosts(response.res);
      } else {
         setPosts(response.res);
      }
   };
   useEffect(() => {
      try {
         if (Object.keys(currentData).length !== 0) {
            callApi(currentData.id);
         }
      } catch (error) {
         console.log(error);
      }
   }, [currentData]);

   useEffect(() => {
      if (priv.state) {
         const callApiUpdate = async () => {
            const response = await apiUpdatePost({
               id: priv.id,
               privacy: priv.state,
            });
            if (response.err === 0) {
               callApi(currentData.id);
               toast.success("Cập nhật thông tin thành công", {
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
            }
         };
         try {
            callApiUpdate();
         } catch (error) {
            toast.error(error, {
               duration: 1500,
               position: "top-center",
               style: {
                  background: "#121212",
                  color: "#fff",
                  ["fontweight"]: "600",
                  padding: "5px 30px",
               },
            });
            throw error;
         }
      }
   }, [priv]);

   // delete post
   const handleBeforeRemovePost = async (post) => {
      if (post) {
         setShowPopup(true);
         let commentIds = [];
         let statusIds = [];
         for (let comment of post.comments) {
            commentIds.push(comment.id);
         }
         for (let status of post.status) {
            statusIds.push(status.id);
         }

         await Promise.all([commentIds, statusIds]);
         setKeyRemovePost({
            api_key: post.api_key,
            comment_id: commentIds,
            status_id: statusIds,
            thumb_file_id: post.thumb_file_id,
            video_file_id: post.video_file_id,
            id: post.id,
         });
      }
   };

   const handleRemovePost = async () => {
      if (Object.keys(keyRemovePost).length !== 0) {
         setLoading(true);
         const response = await apiDeletePost(keyRemovePost);
         try {
            if (response.err === 0) {
               callApi(currentData.id);
               toast.success("Xóa bài đăng thành công", {
                  duration: 1500,
                  position: "top-center",
                  style: {
                     background: "#121212",
                     color: "#fff",
                     ["fontweight"]: "600",
                     padding: "5px 30px",
                  },
               });
               setShowPopup(false);
               setLoading(false);
            } else {
               toast.error("Có lỗi xảy ra!", {
                  duration: 3000,
                  position: "top-center",
                  style: {
                     background: "#121212",
                     color: "#fff",
                     ["fontweight"]: "600",
                     padding: "5px 30px",
                  },
               });
               setShowPopup(false);
               setLoading(false);
            }
         } catch (error) {
            toast.error("Lỗi không mong muốn - error 400", {
               duration: 3000,
               position: "top-center",
               style: {
                  background: "#121212",
                  color: "#fff",
                  ["fontweight"]: "600",
                  padding: "5px 30px",
               },
            });
            setShowPopup(false);
            setLoading(false);
            throw error;
         }
      }
   };

   console.log(posts);
   return (
      <>
         {posts && (
            <div className="creator-content">
               <h2 className="creator-content__heading">Quản lý bài đăng của bạn</h2>
               <div className="creator-content__videoList custom-scroll">
                  <nav className="content-videoList__virtualBar">
                     <span className="virtualBar__item">Nội dung</span>
                     <span className="virtualBar__item">Hành động</span>
                     <span className="virtualBar__item">Tình trạng</span>
                     <span className="virtualBar__item">Quyền riêng tư</span>
                  </nav>
                  {posts.length > 0 ? (
                     posts.map((item) => {
                        return (
                           <div key={item.id} className="content-videoList__box ">
                              <div className="videoList-box__item">
                                 <div className="item row">
                                    <div className="item-image__prev row">
                                       <img onClick={() => setVideoPrev(item.video_file_name)} src={item.thumb_file_name} alt={item.title} />
                                    </div>
                                    <div className="item-title row">
                                       <p className="ellipsis">{item.title}</p>
                                       <div className="item-title__control row">
                                          <div className="box row">
                                             <FaPlay className="icon" />
                                             <span>365</span>
                                          </div>
                                          <div className="box row">
                                             <MdFavorite className="icon" />
                                             <span>{item.status.length}</span>
                                          </div>
                                          <div className="box row">
                                             <FaCommentDots className="icon" />
                                             <span>{item.comments.length}</span>
                                          </div>
                                          <div className="box row">
                                             <PiShareFatFill className="icon" />
                                             <span>2</span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="item row item--action">
                                    <FaRegCommentDots className="icon" />
                                    <RiDeleteBinLine className="icon icon--bin" onClick={() => handleBeforeRemovePost(item)} />
                                 </div>
                                 <div className="item item--status row">
                                    <span>Đã đăng</span>
                                    <p>{formatVi(item.createdAt)}</p>
                                 </div>
                                 <div
                                    ref={optionRef}
                                    onClick={(e) => {
                                       e.stopPropagation();
                                       setShowOption(item.id);
                                    }}
                                    className="item row item--privacy"
                                 >
                                    <p>{priv.state && priv.id === item.id ? priv.state : item.privacy}</p>
                                    <MdKeyboardArrowDown className="icon" />
                                    <div className={`option row ${showOption === item.id ? "option--active" : ""}`}>
                                       <span onClick={() => setPriv({ id: item.id, state: "Công khai" })}>Công khai</span>
                                       <span onClick={() => setPriv({ id: item.id, state: "Chỉ mình tôi" })}>Chỉ mình tôi</span>
                                       <span onClick={() => setPriv({ id: item.id, state: "Bạn bè" })}>Bạn bè</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        );
                     })
                  ) : (
                     <div className="content-videoList__notPost row">Bạn chưa đăng bất kì video nào.</div>
                  )}
               </div>
               {videoPrev && (
                  <div className="video-prev row">
                     <div className="video-prev__box row">
                        <video src={videoPrev} controls></video>
                        <AiOutlineCloseCircle onClick={() => setVideoPrev(null)} className="icon" />
                     </div>
                  </div>
               )}
            </div>
         )}
         {showPopup && (
            <Popup
               accessAction={handleRemovePost}
               title={"Xóa bài đăng?"}
               setShowPopup={setShowPopup}
               content={"Bạn sẽ không thể khôi phục lại."}
               cancel={"Huỷ"}
               access={"Xóa"}
               loadingIcon={loading ? <RiLoader4Line className="icon" /> : null}
               processTitle={loading ? "Chờ 1 chút!" : null}
            />
         )}
         <Toaster />
      </>
   );
};

export default CreatorContent;
