import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { Home, HomeTitle, Auth } from "./container/public";
import { path } from "./utilities/constant";
import { apiGetUser } from "./service/apis";
import * as actions from "./redux/store/actions"
import "./App.scss";

function App() {
   const dispatch = useDispatch()

   const {isLogin} = useSelector((state) => state.auth)
   useEffect(()=>{
    setTimeout(() =>{
      isLogin && dispatch(actions.getUserCurrent())
    }, 1000)
  }, [isLogin])

   return (
      <>
         <Routes>
            <Route path={path.HOME} element={<Home />}>
               <Route path="*" element={<HomeTitle/>} />
            </Route>
            <Route path={path.AUTH} element={<Auth />} />
         </Routes>
      </>
   );
}

export default App;
