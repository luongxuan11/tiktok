import {React, memo, useEffect, useState} from 'react'
import haha from "../../assets/img/haha.jpg"
import hehe from "../../assets/img/hehe.jpg"
import icons from '../../utilities/icons'
import {TypeAnimation} from 'react-type-animation';
import Loader from './Loader';

    const {SlWrench, BiBadgeCheck, BiCheckDouble, FaNodeJs, DiReact, FaFigma, SiPostgresql, GrMysql} = icons

const TextDev1 = ({icons, scroll}) => {
    const [image, setImage] = useState(false)

    useEffect(() => { 
        let timeoutId
        if (scroll) {
            timeoutId = setTimeout(() => {
                setImage(true);
            }, 5500);
        }
        return () => {
            clearTimeout(timeoutId);
        }
    }, [scroll]);

  return (
    <div className='text-develop__content row'>
        <div className="box-typing">
            <div className="board">
                <div className='board__header row'>
                 <div className='row first'>
                     <span></span>
                     <span></span>
                     <span></span>
                 </div>
                <div className='second row'>index.js</div>
                <div className='last'></div>
            </div>
            <div className="board__body row">
                <div className='board__body--sidebar row-column'>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                </div>
                <div className='board__body--code row-column'> 
                    <div className="function row">
                        <span>const </span>
                        <span>develop</span>
                        <span className='row'>
                             = <p>(</p> <small>data</small> <p>)</p> {`=> {`} 
                        </span>
                    </div>
                    <div className="return row">
                        <span>return</span>
                        <p> (</p>
                    </div>
                    <div className="typing">
                     {scroll && <TypeAnimation
                        cursor={{ show: true, blink: true }}
                        sequence={[3000 ,"< Product details ={data} />"]}
                        speed={50}
                        style={{ fontSize: '1.4rem', color: "#fff" }}
                        repeat={Infinity}
                     />}
                    </div>
                    <span className='a'>)</span>
                </div>
            </div>
            </div>
            <div className="img">
                <img className='img1' src={haha} alt="tiktok" />
                <img className={`img2 ${image ? "active" : ""}`} src={hehe} alt="tiktok" />
                {!image && <Loader/>}
            </div>
        </div>

        {/* box desc */}
        <div className="box-desc">
            <div className="box-desc__item row-column">
                <SlWrench style={{ fontSize: '4rem', padding: "10px", borderRadius: "5px", background: "#111111" }}/>
                <h3>The complete toolkit for the Web</h3>
                <p>Everything you need to build your site exactly how you imagine, from automatic API handling to built-in image and performance optimizations.</p>
            </div>
            <div className="box-desc__item row-column">
                <BiBadgeCheck style={{ fontSize: '4rem', padding: "10px", borderRadius: "5px", background: "#111111" }}/>
                <h3>Easy to operate</h3>
                <p>Everything you need to build your site exactly how you imagine, from automatic API handling to built-in image and performance optimizations.</p>
            </div>
            <div className="box-desc__item row-column">
                <BiCheckDouble style={{ fontSize: '4rem', padding: "10px", borderRadius: "5px", background: "#111111" }}/>
                <h3>End-to-end testing on Localhost</h3>
                <p>From caching to Serverless Functions, all our cloud primitives work perfectly on localhost.</p>
            </div>
        </div>
        <div className="icon">
            <div className="box">
            <FaFigma className={`item item-1 ${icons ? "icon-active1" : ""}`}/>
            <FaNodeJs className={`item item-2 ${icons ? "icon-active2" : ""}`}/>
            <DiReact className={`item item-3 ${icons ? "icon-active3" : ""}`}/>
            <SiPostgresql className={`item item-4 ${icons ? "icon-active4" : ""}`}/>
            <GrMysql className={`item item-5 ${icons ? "icon-active5" : ""}`}/>
            </div>
        </div>

    </div>
  )
}

export default memo(TextDev1)