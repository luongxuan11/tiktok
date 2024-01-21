import React, { useState, useRef, useEffect, useCallback } from "react";
// import { Button } from "../../components";
import icons from "../../utilities/icons";
import { useDispatch, useSelector } from "react-redux";
import images from "../../assets/imgExport";
import { Waypoint } from "react-waypoint";
import { AuthFormLogin, PopupOtp, FavoriteBtn, CommentBtn, ShareBtn, FollowBtn } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import * as actions from "../../redux/store/actions";

const HomeTitle = () => {
   const { user } = images;
   const { IoMusicalNotes, FaPlay, FaPause, GoUnmute, IoVolumeMute } = icons;
   const dispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();

   // redux
   const { post} = useSelector((state) => state.posts);
   const { isLogin } = useSelector((state) => state.auth);
   const { currentData } = useSelector((state) => state.user);

   const homeTitleRef = useRef(null);
   const videoRefs = useRef({});
   const currentPlayingRef = useRef(null);
   // state
   const [lazyLoad, setLazyLoad] = useState(1);
   const [playingCheck, setPlayingCheck] = useState("");
   const [isMute, setIsMute] = useState(false);
   const [posts, setPosts] = useState([]);
   const [appendSpan, setAppendSpan] = useState(null);
   const [showForm, setShowForm] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const [showOtp, setShowOtp] = useState(false);

   // toggle playing
   const togglePlay = useCallback((e, id) => {
      e.stopPropagation();
      const videoElement = videoRefs.current[id];
      if (!videoElement) return;

      if (currentPlayingRef.current && currentPlayingRef.current !== videoElement) {
         currentPlayingRef.current.pause();
      }
      if (videoElement.paused) {
         videoElement.play();
         currentPlayingRef.current = videoElement;
         setPlayingCheck(id);
      } else {
         videoElement.pause();
         setPlayingCheck("");
      }
   }, []);

   // // toggle mute
   const toggleMute = (e) => {
      e.stopPropagation();
      setIsMute((prevIsMute) => {
         Object.values(videoRefs.current).forEach((videoElement) => {
            if (videoElement) {
               videoElement.muted = !prevIsMute;
            }
         });
         return !prevIsMute;
      });
   };

   // spread post
   useEffect(() => {
      if (post.length !== 0 && location.pathname === "/") {
         setPosts((prev) => [...prev, ...post]);
      }
   }, [post, location.pathname]);

   useEffect(() => {
      if (posts && posts.length > 0) {
         let lastElement = posts.length - 1;
         setAppendSpan(lastElement);
      }
   }, [posts]);
   //  end spread post

   // api limit
   useEffect(() => {
      dispatch(actions.getPostsLimit({ page: lazyLoad }));
   }, [dispatch, lazyLoad]);

   const handleCallApi = () => {
      let number = Math.floor(posts.length / 5);
      if (lazyLoad <= number) {
         setLazyLoad(lazyLoad + 1);
      }
   };
   // end call api
   // navigate route dom
   const handleNavigateRouter = (url) => {
      if (!isLogin) {
         setShowForm(true);
      } else if (isLogin && !currentData?.verifyOTP) {
         setShowPopup(true);
      } else {
         navigate(url);
      }
   };

   // reset password
   useEffect(() => {
      if (location.pathname.includes("reset-password")) {
         setShowForm(true);
      }
   }, [location.pathname]);

   // auto playVideo when scroll
   const handleAutoPlay = (id) => {
      const videoElement = videoRefs.current[id];
      if (currentPlayingRef.current && currentPlayingRef.current !== videoElement) {
         currentPlayingRef.current.pause();
      }
      if (videoElement.paused) {
         videoElement.play();
         currentPlayingRef.current = videoElement;
         setPlayingCheck(id);
      } else {
         videoElement.pause();
      }
   };

   // play video change tab
   const handleVisibilityChange = () => {
      if (document.hidden) {
         // Page is not visible, pause the currently playing video
         if (currentPlayingRef.current) {
            currentPlayingRef.current.pause();
         }
      } else {
         // Page is visible, resume playing the video if there was one playing
         if (currentPlayingRef.current) {
            currentPlayingRef.current.play();
         }
      }
   };
   useEffect(() => {
      // Add event listener for visibility change
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
         document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
   }, []);



   // lưu ý bug 1 bài viết nữa sẽ không call api khi cuộn cuối trang =>>> cần fix 18/01

   return (
      <>
         {showForm && <AuthFormLogin setShowForm={setShowForm} />}
         <div className="home-title" ref={homeTitleRef}>
            <div className="post row">
               {posts &&
                  posts.length > 0 &&
                  posts.map((item, index) => {
                     if (item.privacy === "Chỉ mình tôi") {
                        return null;
                     }
                     return (
                        <div key={index} className="post-item row">
                           <div onClick={() => handleNavigateRouter(item.user.tiktok_id)} className="post-item__avatar avatar">
                              <img src={item.user?.avatar || user} alt="tiktok" />
                           </div>

                           {/* info */}
                           <div className="post-item__info">
                              <div className="info-user row">
                                 <div className="info-user__box">
                                    <div className="name row">
                                       <strong onClick={() => handleNavigateRouter(item.user.tiktok_id)}>{item.user?.userName}</strong>
                                       <span> - {item.user.tiktok_id.slice(0, 20)}...</span>
                                    </div>
                                    <div className="title-box">
                                       <p className="title">{item?.title}</p>
                                    </div>
                                    <span className="music-name">
                                       <IoMusicalNotes /> original sound - {item.user.userName}
                                    </span>
                                 </div>
                                 {currentData && currentData.id !== item.user_id && <FollowBtn item={item} setShowForm={setShowForm} setShowPopup={setShowPopup} />}
                              </div>
                              <div className="info-video row">
                                 <div className="info-video__original">
                                    <video
                                       className="info-video__original--video"
                                       poster={item.thumb_file_name}
                                       ref={(el) => (videoRefs.current[item.id] = el)}
                                       src={item.video_file_name}
                                       preload="auto"
                                       loop="loop"
                                    ></video>
                                    <Waypoint onEnter={() => handleAutoPlay(item.id)} bottomOffset="100px" />
                                    <div className="original-video__control row">
                                       <span onClick={(e) => togglePlay(e, item.id)}>{playingCheck === item.id ? <FaPause className="icon" /> : <FaPlay className="icon" />}</span>
                                       <span onClick={(e) => toggleMute(e)}>
                                          {isMute ? <IoVolumeMute className="icon icon--mute" /> : <GoUnmute className="icon icon--mute" />}
                                       </span>
                                    </div>
                                 </div>
                                 <div className="info-video__status row">
                                    <FavoriteBtn item={item} setShowForm={setShowForm} />
                                    <CommentBtn
                                       item={item}
                                       setShowForm={setShowForm}
                                       setShowPopup={setShowPopup}
                                       flag={`/${item.user.tiktok_id}/video/${item.id}`}
                                       navigate={navigate}
                                    />
                                    <ShareBtn item={item} />
                                 </div>
                              </div>
                              {appendSpan && appendSpan === index ? <Waypoint onEnter={handleCallApi} bottomOffset="0" /> : ""}
                           </div>
                        </div>
                     );
                  })}
            </div>
         </div>
         {showPopup && (
            <PopupOtp
               title="Kích hoạt tài khoản"
               content="hệ thống yêu cầu bạn phải kích hoạt tài khoản để sử dụng các tính năng."
               access="Xác nhận"
               cancel="Hủy bỏ"
               setShowPopup={setShowPopup}
               showOtp={showOtp}
               setShowOtp={setShowOtp}
               currentData={currentData.email}
            />
         )}
      </>
   );
};

export default HomeTitle;
