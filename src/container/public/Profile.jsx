import React, { useRef, useState, useEffect } from "react";
import images from "../../assets/imgExport";
import { Button, VideoUser } from "../../components";
import icons from "../../utilities/icons";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { apiGetUser, apiGetVideoLiked } from "../../service/apis";

const Profile = () => {
   const { user } = images;
   const { BiEdit, FaLock } = icons;
   const location = useLocation();

   const { isLogin } = useSelector((state) => state.auth);
   const { currentData } = useSelector((state) => state.user);

   // state and ref
   const option1 = useRef(null);
   const option2 = useRef(null);
   const [lineLocation, setLineLocation] = useState(0);
   const [lineWidth, setLineWidth] = useState(115);
   const [lineClass, setLineClass] = useState("video");
   const [currentId, setCurrentId] = useState(null);
   const [currentUser, setCurrentUser] = useState(null);
   const [currentFollower, setCurrentFollower] = useState(null);
   const [idPost, setIdPost] = useState(null);
   const [videoLiked, setVideoLiked] = useState(null);

   const handleLine = (ref, flag) => {
      setLineLocation(ref.current.offsetLeft);
      setLineWidth(ref.current.offsetWidth);
      setLineClass(flag);
   };

   // call api
   const callApi = async (data) => {
      const response = await apiGetUser({ userId: data });
      if (response.err === 0) {
         setCurrentUser(response.userData);
         setCurrentFollower(response.follower);
         setIdPost(response.overviewId.map((item) => Object.values(item)[0]));
      }
   };
   useEffect(() => {
      try {
         setCurrentId(location.pathname.split("/@user")[1]);
         currentId && callApi(currentId);
      } catch (error) {
         console.log(error);
      }
   }, [currentId, location.pathname]);
   useEffect(() => {
      try {
         const getPostLiked = async () => {
            if (idPost && currentId === currentData.id) {
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
   }, [idPost, currentData, currentId, lineClass]);
   // end call api
   // check login
   if (!isLogin) {
      return <Navigate to="/" replace={true} />;
   }

   return (
      <div className="profile custom-scroll">
         <div className="profile-user row">
            <div className="profile-user__image">
               <img src={currentUser?.avatar || user} alt="" />
            </div>
            <div className="profile-user__info">
               <strong>{currentUser?.userName || "loading..."}</strong>
               <p>{currentUser?.tiktok_id || "loading..."}</p>
               {currentId === currentData?.id ? <Button icon text={"Sửa hồ sơ"} iconSearch={<BiEdit />} btnClass={"row"} /> : ""}
            </div>
         </div>
         <div className="profile-param row">
            <div className="profile-param__item row">
               <strong>{currentUser?.follow.length || "0"}</strong>
               <p>Đang follow</p>
            </div>
            <div className="profile-param__item row">
               <strong>{currentFollower || "0"}</strong>
               <p>Follower</p>
            </div>
         </div>
         <p className="profile-story">{currentUser?.introduce || "Chưa có tiểu sử."}</p>
         <div className="profile-option row">
            <span className={`profile-option__switch ${lineClass === "video" && "profile-option__switch--active"}`} onClick={() => handleLine(option1, "video")} ref={option1}>
               Video
            </span>
            <span onClick={() => handleLine(option2, "liked")} ref={option2} className={`profile-option__switch row ${lineClass === "liked" && "profile-option__switch--active"}`}>
               <FaLock /> Đã thích
            </span>
            <span className="line" style={{ left: lineLocation, width: lineWidth }}></span>
         </div>
         {lineClass === "video" ? <VideoUser userId={currentId} title /> : <VideoUser videoLiked={videoLiked} title />}
         {lineClass === "liked" && currentId !== currentData.id && (
            <div className="profile-privacy row">
               <FaLock className="icon" />
               <strong className="profile-privacy__notification">Video đã thích của người dùng này ở trạng thái riêng tư</strong>
               <p className="profile-privacy__reject">
                  Các video được thích bởi <small>{currentUser?.userName}</small> hiện đang ẩn
               </p>
            </div>
         )}
      </div>
   );
};

export default Profile;
