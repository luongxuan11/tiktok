import React, { useState, useEffect, useRef } from "react";
import { PostsCommon } from "../../components";
import { apiGetVideoFollowing } from "../../service/apis";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { LoadingLimitPost } from "../../components/animation";

const Following = () => {
   // redux
   const { currentData } = useSelector((state) => state.user);
   const { isLogin } = useSelector((state) => state.auth);

   // state
   const [loading, setLoading] = useState(true);
   const [appendSpan, setAppendSpan] = useState(null);
   const [posts, setPosts] = useState([]);
   const [lazyLoad, setLazyLoad] = useState(1);

   const videoRefs = useRef({});
   const currentPlayingRef = useRef(null);

   // handle common
   const callApi = async (idFollow, page) => {
      try {
         setLoading(true);
         const response = await apiGetVideoFollowing({ idFollower: idFollow, page });
         if (response.err === 0) {
            setPosts((prev) => [...prev, ...response.res]);
            setLoading(false);
         }
      } catch (error) {
         setLoading(false);
         console.log("new error call api!");
         setPosts([]);
      }
   };

   // check login
   useEffect(() => {
      let arrUserFollowing = [];
      if (currentData && currentData.length !== 0) {
         currentData.follow?.forEach((item) => {
            arrUserFollowing.push(item.user_follow);
         });
      }
      if (arrUserFollowing.length !== 0) {
         callApi(arrUserFollowing, lazyLoad);
      }
   }, [currentData, lazyLoad]);

   // handle lazyLoad
   useEffect(() => {
      if (posts && posts.length > 0) {
         let lastElement = posts.length - 1;
         setAppendSpan(lastElement);
         setLoading(false);
      }
   }, [posts]);

   const handleBeforeCallApi = () => {
      let number = Math.floor(posts.length / 5);
      if (lazyLoad <= number) {
         setLazyLoad(lazyLoad + 1);
      }
   };

   if (!isLogin) {
      return <Navigate to="/" replace={true} />;
   }
   // jsx
   return (
      <>
         <div className="follow">
            <div className="follow-post row">
               {posts &&
                  posts?.length > 0 &&
                  posts.map((item, index) => {
                     return (
                        <PostsCommon
                           key={index}
                           index={index}
                           item={item}
                           isLogin={isLogin}
                           currentData={currentData}
                           appendSpan={appendSpan}
                           handleBeforeCallApi={handleBeforeCallApi}
                           videoRefs={videoRefs}
                           currentPlayingRef={currentPlayingRef}
                           following
                        />
                     );
                  })}
               {loading && posts.length > 0 && <LoadingLimitPost />}
               {posts.length === 0 && <strong style={{marginTop: "40px", color: "#ffffffd6"}}>Hiện chưa có video nào.</strong>}
            </div>
         </div>
      </>
   );
};

export default Following;
