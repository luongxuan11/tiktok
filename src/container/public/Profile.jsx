import React, { useRef, useState, useEffect } from "react";
import images from "../../assets/imgExport";
import { Button, VideoUser, EditInformation } from "../../components";
import icons from "../../utilities/icons";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { apiGetUser, apiGetVideoLiked } from "../../service/apis";

const Profile = () => {
   const { user } = images;
   const { BiEdit, FaLock } = icons;
   const location = useLocation();

   // redux
   const { isLogin } = useSelector((state) => state.auth);
   const { currentData } = useSelector((state) => state.user);

   // state and ref
   const option1 = useRef(null);
   const option2 = useRef(null);
   const [lineLocation, setLineLocation] = useState(0);
   const [lineWidth, setLineWidth] = useState(115);
   const [lineClass, setLineClass] = useState("video");
   const [currentUser, setCurrentUser] = useState(null);
   const [currentFollower, setCurrentFollower] = useState(null);
   const [idPost, setIdPost] = useState(null);
   const [videoLiked, setVideoLiked] = useState(null);
   const [showEditPopup, setShowEditPopup] = useState(false);

   // line position
   const handleLine = (ref, flag) => {
      setLineLocation(ref.current.offsetLeft);
      setLineWidth(ref.current.offsetWidth);
      setLineClass(flag);
   };

   // call api
   const callApi = async (tikTokId) => {
      const response = await apiGetUser({ tikTokId });
      if (response.err === 0) {
         setCurrentUser(response.userData);
         setCurrentFollower(response.follower);
         setIdPost(response.overviewId.map((item) => Object.values(item)[0]));
      }
   };
   useEffect(() => {
      try {
         const tikTokId = location.pathname.replace("/", "");
         localStorage.setItem("myData", tikTokId);
         callApi(tikTokId);
      } catch (error) {
         console.log(error);
      }
   }, [location.pathname]);

   // api get posts liked
   useEffect(() => {
      try {
         const getPostLiked = async () => {
            if (idPost && currentUser?.id === currentData.id) {
               const response = await apiGetVideoLiked({ overviewId: idPost });
               if (response.err === 0) {
                  setVideoLiked(response.res);
               }
            }
         };
         if (lineClass === "liked") {
            getPostLiked();
         }
      } catch (error) {
         console.log(error);
      }
   }, [idPost, currentData, lineClass, currentUser]);
   // end call api
   // check login
   if (!isLogin) {
      return <Navigate to="/" replace={true} />;
   }

   return (
      <>
         {currentUser && (
            <div className="profile custom-scroll">
               <div className="profile-user row">
                  <div className="profile-user__image">
                     <img src={currentUser.avatar || user} alt="" />
                  </div>
                  <div className="profile-user__info">
                     <strong>{currentUser.userName || "loading..."}</strong>
                     <p>{currentUser.tiktok_id.replace(/@/g, "") || "loading..."}</p>
                     {currentUser.id === currentData?.id ? <Button onClick={() => setShowEditPopup(true)} icon text={"Sửa hồ sơ"} iconSearch={<BiEdit />} btnClass={"row"} /> : ""}
                  </div>
               </div>
               <div className="profile-param row">
                  <div className="profile-param__item row">
                     <strong>{currentUser.follow.length || "0"}</strong>
                     <p>Đang follow</p>
                  </div>
                  <div className="profile-param__item row">
                     <strong>{currentFollower || "0"}</strong>
                     <p>Follower</p>
                  </div>
               </div>
               <p className="profile-story">{currentUser.introduce || "Chưa có tiểu sử."}</p>
               <div className="profile-option row">
                  <span
                     className={`profile-option__switch ${lineClass === "video" && "profile-option__switch--active"}`}
                     onClick={() => handleLine(option1, "video")}
                     ref={option1}
                  >
                     Video
                  </span>
                  <span
                     onClick={() => handleLine(option2, "liked")}
                     ref={option2}
                     className={`profile-option__switch row ${lineClass === "liked" && "profile-option__switch--active"}`}
                  >
                     <FaLock /> Đã thích
                  </span>
                  <span className="line" style={{ left: lineLocation, width: lineWidth }}></span>
               </div>
               {lineClass === "video" ? <VideoUser userId={currentUser.id} title /> : <VideoUser videoLiked={videoLiked} title />}
               {lineClass === "liked" && currentUser.id !== currentData.id && (
                  <div className="profile-privacy row">
                     <FaLock className="icon" />
                     <strong className="profile-privacy__notification">Video đã thích của người dùng này ở trạng thái riêng tư</strong>
                     <p className="profile-privacy__reject">
                        Các video được thích bởi <small>{currentUser.userName}</small> hiện đang ẩn
                     </p>
                  </div>
               )}
               {showEditPopup && <EditInformation setShowEditPopup={setShowEditPopup} currentUser={currentUser} />}
            </div>
         )}
      </>
   );
};

export default Profile;
