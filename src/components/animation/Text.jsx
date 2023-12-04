import React, { useState, memo} from 'react';
import { Waypoint } from 'react-waypoint';
import './text.scss';
import TextAnimated from './TextAnimated';
// import img from "../../assets/img/img.jpg"
import TextDev1 from './TextDev1';
import TextDev2 from './TextDev2';
import TextDev3 from './TextDev3';
import images from '../../assets/imgExport'

const {fe2, fe3, fe4, fe5, fe6, fe7, fe8, fe9, fe} = images

const Text = ({setShowForm}) => {
  
  const [scroll, setScroll] = useState(false);
  const [icons, setIcons] = useState(false);

   // Hàm xử lý khi cuộn vào section3
  const handleScrollStart = () => {
    setScroll(true);
  };

  const handleIconStart = () =>{
    setIcons(true)
  }
  // const handleIconEnd = () =>{
  //   setIcons(false)
  // }


  return (
    <div className={`text container row-column`}>
      <TextAnimated setShowForm={setShowForm}/>
      <p className='text-heading__content text-heading__content--1'>Trusted by the best frontend teams</p>
      <div className='text-best__frontend row-column'>
        <div className="img__box1 row">
          <img src={fe2} alt="tiktok" />
          <img src={fe3} alt="tiktok" />
          <img src={fe4} alt="tiktok" />
          <img src={fe5} alt="tiktok" />
          <img src={fe6} alt="tiktok" />
        </div>
        <div className="img__box2 row">
          <img src={fe7} alt="tiktok" />
          <img src={fe8} alt="tiktok" />
          <img src={fe9} alt="tiktok" />
          <img src={fe} alt="tiktok" />
        </div>
      </div>
      <div className="fe__slider">
      <div className='text-best__frontend1 row'>
        <div className="img__box1 row">
          <img src={fe2} alt="tiktok" />
          <img src={fe3} alt="tiktok" />
          <img src={fe4} alt="tiktok" />
          <img src={fe5} alt="tiktok" />
          <img src={fe6} alt="tiktok" />
        </div>
        <div className="img__box2 row">
          <img src={fe7} alt="tiktok" />
          <img src={fe8} alt="tiktok" />
          <img src={fe9} alt="tiktok" />
          <img src={fe} alt="tiktok" />
        </div>
        <div className="img__box1 row">
          <img src={fe2} alt="tiktok" />
          <img src={fe3} alt="tiktok" />
          <img src={fe4} alt="tiktok" />
          <img src={fe5} alt="tiktok" />
          <img src={fe6} alt="tiktok" />
        </div>
      </div>
      </div>
      <p className="text-heading__content text-heading__content--1">EXPLORE THE VERCEL WAY</p>
      <div className="text-develop">
        <div className='text-develop--1 row-column'>
          <div className={`section1 ${scroll ? "section1--scroll" : ""}`}></div>
          <div className={`section2 row ${scroll ? "section2--scroll" : ""}`}>1</div>
          <div className={`section3 gradient ${scroll ? "section3--scroll" : ""}`}>Develop</div>
          <Waypoint onEnter={handleScrollStart}/>
        </div>
        {/* title */}
        <div className={`text-develop__title row-column ${scroll ? "content1" : ""}`}>
          <h2>Build when inspiration strikes</h2>
          <p>Free developers from time-consuming, unnecessary processes that slow your work, so you and your team can focus on creating.</p>
        </div>
        {/* content */}
        <TextDev1 icons={icons} scroll={scroll}/>
        <div className="end-dev1">
          <p>Balance and Optimize Everything.</p>
          <Waypoint onEnter={handleIconStart}  bottomOffset="200px"/>
        </div>
        <TextDev2/>
        <TextDev3/>
      </div>
    </div>
  );
};

export default memo(Text);
