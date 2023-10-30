import {React, memo, useState} from 'react'
import { Waypoint } from 'react-waypoint';
import upload from "../../assets/img/upload.jpg"
import logo from "../../assets/img/tiktok.png"
import icons from '../../utilities/icons';

const {FiUpload, BiSolidLockAlt, CiShare1} = icons

const TextDev2 = () => {
    const [preview, setPreview] = useState(false);
    const [preview1, setPreview1] = useState(false);
    const [preview2, setPreview2] = useState(false);
    const [preview3, setPreview3] = useState(false);

    const handlePreview = () => {
        setPreview(true)
      }
    const handlePreview1 = () => {
        setPreview1(true)
      }
    const handlePreview2 = () => {
        setPreview2(true)
      }
    const handlePreview3 = () => {
        setPreview3(true)
      }
    //   console.log(preview)

  return (
    <div className='text-preview'>
        <div className="text-preview__hero row-column">
            <div className="preview row-column">
                <span className={`preview1 ${preview ? "preview-scroll" : ""}`}></span>
                <span className={`preview2 row ${preview ? 'preview-scroll_1' : ""}`}>2</span>
                <h3 className={`gradient ${preview ? "preview3" : ""}`}>Preview</h3>
                <Waypoint onEnter={handlePreview}/>
            </div>
            <div className="title row-column">
                <h2>Enjoy your video to the fullest</h2>
                <p>Every element, from the enchanting sound to the captivating visuals, is meticulously crafted to perfection... Join us on this mesmerizing journey of discovery!</p>
            </div>
        </div>

        <div className="text-preview__feature row">
            <div className="ui row-column">
                <img src={upload} alt="tiktok" />
                <div className="ui-small">
                    <div className="header row">
                        <div className='first row'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className="url row">
                            <BiSolidLockAlt/>
                            <span>http://localhost:3000/auth</span>
                        </div>
                    </div>
                    <div className="body">
                        <div className="side-bar">
                            <div className='box row'>
                                <img src={logo} alt="tiktok" />
                                <div className='row-column'>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div className="box2"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="line row-column">
                <div className='line1 row-column'>
                    <span className={`item1 ${preview1 ? "active" : ""}`}></span>
                    <span className={`item2 ${preview1 ? "active1" : ""}`}></span>
                    <Waypoint onEnter={handlePreview1}/>
                </div>
                <div className="line2 row-column">
                    <span className={`item1 ${preview2 ? "active" : ""}`}></span>
                    <span className={`item2 ${preview2 ? "active1" : ""}`}></span>
                    <Waypoint onEnter={handlePreview2} bottomOffset="50px"/>
                </div>
                <div className="line3 row-column">
                    <span className={`item1 ${preview3 ? "active" : ""}`}></span>
                    <span className={`item2 row ${preview3 ? "active1" : ""}`}>3</span>
                    <h3 className={`gradient ${preview3 ? "active2" : ""}`}>Tiktok</h3>
                    <Waypoint onEnter={handlePreview3} bottomOffset="50px"/>
                </div>
            </div>
            <div className="describe row-column">
                <div className="describe1 row-column">
                    <FiUpload className='icon'/>
                    <h3>Push to deploy</h3>
                    <p>Every deploy automatically generates a shareable live preview site that stays up-to-date with your changes.</p>
                </div>
                <div className="describe2 row-column">
                    <CiShare1 className='icon'/>
                    <h3>Collaborative reviews on UI</h3>
                    <p>Comment directly on components, layouts, copy, and more in real context and real time, integrated seamlessly</p>
                </div>
            </div>
        </div>
        <div className="text-preview__feature1">
            <div className='line1 row-column'>
                    <span className={`item1`}></span>
                    <span className={`item2`}>o</span>
            </div>
            <div className="describe1 row-column">
                    <FiUpload className='icon'/>
                    <h3>Push to deploy</h3>
                    <p>Every deploy automatically generates a shareable live preview site that stays up-to-date with your changes.</p>
            </div>
            <div className='line1 row-column'>
                    <span className={`item1`}></span>
                    <span className={`item2`}>o</span>
            </div>
            <div className="describe1 row-column">
                    <CiShare1 className='icon'/>
                    <h3>Collaborative reviews on UI</h3>
                    <p>Comment directly on components, layouts, copy, and more in real context and real time, integrated seamlessly</p>
            </div>
            <div className="line3 row-column">
                <span className={`item1 active`}></span>
                <span className={`item2 row active1`}>3</span>
                <h3 className={`gradient active2`}>Tiktok</h3>
            </div>
        </div>
    </div>
  )
}

export default memo(TextDev2)