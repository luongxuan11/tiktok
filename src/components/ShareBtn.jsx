import React, { memo } from "react";
import icons from "../utilities/icons";

const ShareBtn = ({item}) => {
   const {PiShareFatFill} = icons;
   return (
      <div className="icon-box row">
         <small className="icon-box__small row">
            <PiShareFatFill className="icon" />
         </small>
         <span>{item?.share.length}</span>
      </div>
   );
};

export default memo(ShareBtn);
