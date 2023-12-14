import React, {useEffect, useState} from 'react'
import Header from './Header'
import SideBar from './SideBar'
import { Outlet, useLocation} from "react-router-dom";
import HomeTitle from './HomeTitle';
const Home = () => {
  const location = useLocation();




  // jsx
  return (
    <div className='home'>
        <Header />
        <div className="wrapper row">
        <SideBar />
        {(location.pathname === "/" ) ? <HomeTitle /> : <Outlet/>}
        </div>
    </div>
  )
}

export default Home