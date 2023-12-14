import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Home, Auth } from "./container/public";
import { CreatorCenter, CreatorUpload } from "./container/creator";
import { path } from "./utilities/constant";
import * as actions from "./redux/store/actions";
import "./App.scss";

function App() {
   const dispatch = useDispatch();
   const location = useLocation()

   const { isLogin } = useSelector((state) => state.auth);
   useEffect(() => {
      setTimeout(() => {
         isLogin && dispatch(actions.getUserCurrent());
      }, 1000);
   }, [isLogin]);

   useEffect(() => {
      if (location.pathname !== "/") {
          dispatch(actions.getPostFalse());
      }
  }, [dispatch, location.pathname]);

   return (
      <>
         <Routes>
            <Route path={path.HOME} element={<Home />}></Route>
            <Route path={path.CREATOR_CENTER} element={<CreatorCenter />}>
               <Route path={path.UPLOAD} element={<CreatorUpload />} />
            </Route>
            <Route path={path.AUTH} element={<Auth />} />
         </Routes>
      </>
   );
}

export default App;
