import React, {useState, useEffect, memo} from 'react'
import TypingAnimated from './TypingAnimated';
import { Waypoint } from 'react-waypoint';
import tiktok from "../../assets/img/tiktok3.png"
import tiktok1 from "../../assets/img/tiktok.png"
import icons from '../../utilities/icons';
import Loader from './Loader';


const {BsSearch, BsFillPlayFill} = icons

const TextDev3 = () => {

  const [show, setShow] = useState(false)
  const [loadingSidebar, setLoadingSidebar] = useState(false)
  const [loadingVideo, setLoadingVideo] = useState(false)

  const handlePreviewTyping = () =>{
      setShow(true)
  }

  useEffect(() => {
    let timeId;
    if(show === true){
      setTimeout(() =>{
        timeId = setLoadingSidebar(true)
      }, 14000)
    }

    return () => {
     clearTimeout(timeId)
    };
  },[show])
  useEffect(() => {
    let timeId;
    if(loadingSidebar === true){
      setTimeout(() =>{
        timeId = setLoadingVideo(true)
      }, 4000)
    }

    return () => {
     clearTimeout(timeId)
    };
  },[loadingSidebar])


  return (
    <section className='tiktok'>
      <h1 className="tiktok__heading">Delight every visitor</h1>
      <div className="box">
        {/* env */}
        <div className="box-env">
            <div className="env-nav row">
              <div className="env-nav__around row">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className='component'>Component.jsx</span>
              <span className='component app'>App.jsx</span>
              <span className='transparent'></span>
            </div>
            <div className="env-body row">
              <div className="env-body__sidebar row-column">
                <small className='row'>1</small>
                <small className='row'>2</small>
                <small className='row'>3</small>
                <small className='row'>4</small>
                <small className='row'>5</small>
                <small className='row'>6</small>
                <small className='row'>7</small>
                <small className='row'>8</small>
                <small className='row'>9</small>
                <small className='row'>10</small>
                <small className='row'>11</small>
                <small className='row'>12</small>
                <small className='row'>13</small>
                <small className='row'>14</small>
                <small className='row'>15</small>
              </div>
              <div className="env-body__content">
              <Waypoint onEnter={handlePreviewTyping}/>
                <TypingAnimated show={show}/>
              </div>
            </div>
         </div>

         {/* app */}
        <div className="box-app row-column">
          <div className="box-app__nav row">
            <img src={tiktok} alt="tiktok" />
            <div className="search row">
              <input type="text" placeholder='search...'/>
              <BsSearch className='icon'/>
            </div>
            <div className="info">option</div>
          </div>
          <div className="box-app__body row">
            <div className="sidebar">
              <h5>Dành cho bạn</h5>
              {loadingSidebar ? <>
                <div className="title card__skeleton "></div>
                <div className="title card__skeleton title1"></div>
    
                <div className="title card__skeleton title2"></div>
    
                <p className='hihi'>Follow account</p>
                <div className="title card__skeleton title3"></div>
                <div className="title card__skeleton title4"></div>
              </> : <Loader/>}
            </div>
            <div className="video">
              {loadingVideo ? <>
              <div className="info row">
                <img src={tiktok1} alt="tiktok" />
                <div className="caption row-column">
                  <strong>Tiktok Ui</strong>
                  <span>experience together!</span>
                </div>
              </div>
              <div className='video--small row'>
                <BsFillPlayFill className='icon'/>
              </div>  
              </> : <div className='loader__video row-column'>
                  <Loader/>
                  <span>Đang khởi tạo...</span>
                </div>}
            </div>
            <div className="scroll"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(TextDev3)