import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Home, Auth, SearchDetail, Profile, Explore, Following, ResetPassword } from "./container/public";
import { CreatorCenter, CreatorUpload, CreatorContent } from "./container/creator";
import { path } from "./utilities/constant";
import * as actions from "./redux/store/actions";
import "./sass/App.scss";
import { socket } from "./socket";

function App() {
   const dispatch = useDispatch();
   const location = useLocation();

   const { isLogin } = useSelector((state) => state.auth);
   useEffect(() => {
      setTimeout(() => {
         if (isLogin) {
            dispatch(actions.getUserCurrent());
            socket.connect();
         }
      }, 1000);

      return () => {
         socket.disconnect();
      };
   }, [isLogin, dispatch]);

   useEffect(() => {
      if (!location.pathname.includes("video")) {
         localStorage.setItem("detailPost", false);
      }
   }, [location.pathname]);

   useEffect(() => {
      if (location.pathname !== "/") {
         dispatch(actions.getPostFalse());
      }
   }, [dispatch, location.pathname]);

   return (
      <>
         <Routes>
            <Route path={path.HOME} element={<Home />}>
               <Route path={path.SEARCH_DETAIL__TEXT__ID} element={<SearchDetail />} />
               <Route path={`${path.SEARCH_DETAIL}/*`} element={<SearchDetail />} />
               <Route path={`${path.PROFILE}/*`} element={<Profile />} />
               <Route path={`explore/*`} element={<Explore />} />
               <Route path={`following/*`} element={<Following />} />
               {/* <Route path={`${path.DETAIL_POST}/*`} element={<DetailPost />} /> */}
            </Route>
            <Route path={path.CREATOR_CENTER} element={<CreatorCenter />}>
               <Route path={path.UPLOAD} element={<CreatorUpload />} />
               <Route path={path.CONTENT} element={<CreatorContent />} />
            </Route>
            <Route path={path.AUTH} element={<Auth />} />
            <Route path={path.FORGET} element={<ResetPassword />} />
         </Routes>
      </>
   );
}

export default App;
