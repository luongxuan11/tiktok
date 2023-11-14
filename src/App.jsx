import { Route, Routes } from "react-router-dom";
import { Home, HomeTitle, Auth } from "./container/public";
import { path } from "./utilities/constant";
import "./App.scss";

function App() {
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
