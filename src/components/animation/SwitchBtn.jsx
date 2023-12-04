import React from "react";
import './switch.css'

const SwitchBtn = ({isChecked, setIsChecked}) => {
   return (
      <>
         <label className="switch">
            <input checked={isChecked} onChange={() => setIsChecked(prev => !prev)} type="checkbox" />
            <span className="slider"></span>
         </label>
      </>
   );
};

export default SwitchBtn;
