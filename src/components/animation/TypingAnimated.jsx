import React, { memo } from 'react'
import { TypeAnimation } from 'react-type-animation';



const TypingAnimated = ({show}) => {
   

  return (
    <>
     {show && <div className='code row-column'>
        <TypeAnimation
        cursor={{ show: true, blink: true }}
        sequence={[`import React from 'react'`]}
        speed={200}
        style={{ fontSize: '1.3rem', color: "#c1b8b8" }}
        repeat={1}
        />

        <TypeAnimation
        cursor={{ show: true, blink: true }}
        sequence={[1000 ,`import { TypeAnimation } from 'react-type-animation';`]}
        speed={200}
        style={{ fontSize: '1.3rem', color: "#969090" }}
        repeat={Infinity}
        />
        <TypeAnimation
        cursor={{ show: true, blink: true }}
        sequence={[5000 ,`import { heading, sidebar, info, video } from './public';`]}
        speed={50}
        style={{ fontSize: '1.3rem', color: "#969090" }}
        repeat={Infinity}
        />
        <TypeAnimation
        cursor={{ show: true, blink: true }}
        sequence={[10000 ,`return ( <>`]}
        speed={50}
        style={{ fontSize: '1.3rem', color: "#969090" }}
        repeat={Infinity}
        />
        <TypeAnimation
        cursor={{ show: true, blink: true }}
        sequence={[12000 ,`<heading da/>`, `<Sidebar data ={data}/>`]}
        speed={50}
        style={{ fontSize: '1.3rem', color: "#969090" }}
        />
        
        <TypeAnimation
        cursor={{ show: true, blink: true }}
        sequence={[16000 ,`<Video data ={data}/>`]}
        speed={50}
        style={{ fontSize: '1.3rem', color: "#969090" }}
        />

        <TypeAnimation
        cursor={{ show: true, blink: true }}
        sequence={[10000 ,`</>)`]}
        speed={50}
        style={{ fontSize: '1.3rem', color: "#969090" }}
        repeat={Infinity}
        />
     </div>}
    </>
  )
}

export default memo(TypingAnimated)