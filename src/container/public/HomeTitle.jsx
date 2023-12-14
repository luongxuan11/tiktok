import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import { Button } from "../../components";
import icons from "../../utilities/icons";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLimit } from "../../redux/store/actions";
import images from "../../assets/imgExport";
import { Waypoint } from "react-waypoint";
import { AuthFormLogin } from "../../components";
import { apiUpdateFavorite } from "../../service/apis/apiPost";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const HomeTitle = () => {
   const { user } = images;
   const { IoMusicalNotes, FaPlay, FaPause, GoUnmute, IoVolumeMute, MdFavorite, FaCommentDots, PiShareFatFill } = icons;
   const dispatch = useDispatch();
   const location = useLocation();

   // redux
   const { post, count } = useSelector((state) => state.posts);
   const { isLogin } = useSelector((state) => state.auth);
   const { currentData } = useSelector((state) => state.user);

   // state
   const [lazyLoad, setLazyLoad] = useState(1);
   const videoRefs = useRef({});
   const currentPlayingRef = useRef(null);
   const [playingCheck, setPlayingCheck] = useState("");
   const [isMute, setIsMute] = useState(false);
   const [posts, setPosts] = useState([]);
   const [appendSpan, setAppendSpan] = useState("");
   const homeTitleRef = useRef(null);
   const [showForm, setShowForm] = useState(false);
   const [stateFavorite, setStateFavorite] = useState();

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

   // toggle mute
   const toggleMute = useCallback(
      (e, id) => {
         e.stopPropagation();
         const videoElement = videoRefs.current[id];
         if (!videoElement) return;
         if (videoElement) {
            videoElement.muted = !isMute;
            setIsMute(!isMute);
         }
      },
      [isMute],
   );

   // spread post
   useEffect(() => {
      if (post.length !== 0 && location.pathname === '/') {
         setPosts((prev) => [...prev, ...post]);
      }
   }, [post, location.pathname]);

   useEffect(() => {
      if (posts && posts.length > 0) {
         let lastElement = posts.length - 1;
         setAppendSpan(lastElement);
      }
   }, [posts]);

   // api limit
   useEffect(() => {
      dispatch(getPostsLimit({ page: lazyLoad }));
   }, [dispatch, lazyLoad]);

   const handleCallApi = () => {
      let number = Math.floor(count / 2 - 1); // redux number post
      if (lazyLoad <= number) {
         setLazyLoad(lazyLoad + 1);
      }
   };

   // favorite
   const handleInteraction = async (e, id, length) => {
      e.stopPropagation();
      if (!isLogin) return setShowForm(true);
      let toggleClass = e.currentTarget.classList.toggle("icon--active");
      if (toggleClass) {
         const response = await apiUpdateFavorite({
            userId: currentData?.id,
            overviewId: id,
         });
         if (response.err === 0) {
            setStateFavorite({
               id: id,
               number: length === 0 ? 1 : length,
            });
         } else return Swal.fire("Thất bại!", response.mess, "error");
      } else {
         const response = await apiUpdateFavorite({
            userId: currentData?.id,
            overviewId: id,
         });
         if (response.err === 0) {
            setStateFavorite({
               id: id,
               number: length === 0 ? 0 : length - 1,
            });
         } else return Swal.fire("Thất bại!", response.mess, "error");
      }
   };

   const handleInteractionShareAndComment = () => {
      if (!isLogin) {
         setShowForm(true);
      } else {
      }
   };

   return (
      <>
         {showForm && <AuthFormLogin setShowForm={setShowForm} />}
         <div className="home-title" ref={homeTitleRef}>
            <div className="post row">
               {posts &&
                  posts.length > 0 &&
                  posts.map((item, index) => {
                     return (
                        <div key={index} className="post-item row">
                           <div className="post-item__avatar avata">
                              <img src={item.user?.avatar || user} alt="tiktok" />
                           </div>

                           {/* info */}
                           <div className="post-item__info">
                              <div className="info-user row">
                                 <div className="info-user__box">
                                    <div className="name row">
                                       <strong>{item.user?.userName}</strong>
                                       <span> - {item.user.tiktok_id.slice(0, 20)}...</span>
                                    </div>
                                    <div className="title-box">
                                       <p className="title">{item?.title}</p>
                                    </div>
                                    <span className="music-name">
                                       <IoMusicalNotes /> original sound - {item.user.userName}
                                    </span>
                                 </div>

                                 <Button text={"Follow"} btnClass={"info-user__btn"} />
                              </div>
                              <div className="info-video row">
                                 <div className="info-video__original">
                                    <video ref={(el) => (videoRefs.current[item.id] = el)} src={item.video_file_name} preload="auto" loop="loop"></video>
                                    <div className="original-video__control row">
                                       <span onClick={(e) => togglePlay(e, item.id)}>{playingCheck === item.id ? <FaPause className="icon" /> : <FaPlay className="icon" />}</span>
                                       <span onClick={(e) => toggleMute(e, item.id)}>
                                          {isMute ? <IoVolumeMute className="icon icon--mute" /> : <GoUnmute className="icon icon--mute" />}
                                       </span>
                                    </div>
                                 </div>
                                 <div className="info-video__status row">
                                    <div className="icon-box row">
                                       <small
                                          onClick={(e) => handleInteraction(e, item.id, item.status.length)}
                                          className={`icon-box__small row ${item.status.filter((el) => el.user_id === currentData?.id).length > 0 ? "icon--active" : ""}`}
                                       >
                                          <MdFavorite className="icon" />
                                       </small>
                                       <span>{stateFavorite && stateFavorite.id === item.id ? stateFavorite.number : item.status.length}</span>
                                    </div>
                                    <div className="icon-box row">
                                       <small className="icon-box__small row">
                                          <FaCommentDots className="icon" />
                                       </small>
                                       <span>{item.comments.length}</span>
                                    </div>
                                    <div className="icon-box row">
                                       <small className="icon-box__small row">
                                          <PiShareFatFill className="icon" />
                                       </small>
                                       <span>{item.share.length}</span>
                                    </div>
                                 </div>
                              </div>
                              {appendSpan === index ? <Waypoint onEnter={handleCallApi} bottomOffset="50px" /> : ""}
                           </div>
                        </div>
                     );
                  })}
            </div>
         </div>
      </>
   );
};

export default memo(HomeTitle);
