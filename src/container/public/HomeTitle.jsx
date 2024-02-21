import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthFormLogin, PopupOtp, PostsCommon } from "../../components";
import { useLocation } from "react-router-dom";
import * as actions from "../../redux/store/actions";
import { LoadingLimitPost } from "../../components/animation";

const HomeTitle = () => {
   const dispatch = useDispatch();
   const location = useLocation();

   // redux
   const { post } = useSelector((state) => state.posts);
   const { isLogin } = useSelector((state) => state.auth);
   const { currentData } = useSelector((state) => state.user);

   const videoRefs = useRef({});
   const currentPlayingRef = useRef(null);
   // state
   const [lazyLoad, setLazyLoad] = useState(1);
   const [posts, setPosts] = useState([]);
   const [appendSpan, setAppendSpan] = useState(null);
   const [showForm, setShowForm] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const [showOtp, setShowOtp] = useState(false);
   const [loading, setLoading] = useState(true);

   // spread post
   useEffect(() => {
      if (post.length !== 0 && location.pathname === "/") {
         localStorage.setItem("myData", "/");
         setPosts((prev) => [...prev, ...post]);
      }
   }, [post, location.pathname]);

   useEffect(() => {
      if (posts && posts.length > 0) {
         let lastElement = posts.length - 1;
         setAppendSpan(lastElement);
         setLoading(false);
      }
   }, [posts]);
   //  end spread post

   // api limit
   useEffect(() => {
      setLoading(true);
      dispatch(actions.getPostsLimit({ page: lazyLoad }));
   }, [dispatch, lazyLoad]);

   const handleBeforeCallApi = () => {
      let number = Math.floor(posts.length / 5);
      if (lazyLoad <= number) {
         setLazyLoad(lazyLoad + 1);
      }
   };
   // end call api

   // reset password
   useEffect(() => {
      if (location.pathname.includes("reset-password")) {
         setShowForm(true);
      }
   }, [location.pathname]);

   return (
      <>
         {showForm && <AuthFormLogin setShowForm={setShowForm} />}
         <div className="home-title">
            <div className="post row">
               {posts &&
                  posts.length > 0 &&
                  posts.map((item, index) => {
                     return (
                        <PostsCommon
                           key={index}
                           index={index}
                           item={item}
                           isLogin={isLogin}
                           currentData={currentData}
                           setShowForm={setShowForm}
                           setShowPopup={setShowPopup}
                           appendSpan={appendSpan}
                           handleBeforeCallApi={handleBeforeCallApi}
                           videoRefs={videoRefs}
                           currentPlayingRef={currentPlayingRef}
                        />
                     );
                  })}
               {loading && <LoadingLimitPost />}
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
