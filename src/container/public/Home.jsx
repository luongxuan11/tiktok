import React, {useEffect, useState} from 'react'
import Header from './Header'
import SideBar from './SideBar'
import { Outlet, useLocation} from "react-router-dom";
const Home = () => {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  useEffect(() => {
    location.pathname.includes("/auth") && setShowHeader(false);
  }, [location]);




  // jsx
  return (
    <div className='home'>
        {showHeader && <Header />}
        {showHeader && <SideBar />}
        <div className="wrapper">
          <Outlet />
        </div>
    </div>
  )
}

export default Home