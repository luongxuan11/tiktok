import React from "react";
import Button from "./Button";

const Popup = ({ title, content, cancel, access, setShowPopup, accessAction, loadingIcon }) => {
   return (
      <div className="popup row">
         <div className="popup-box">
            {loadingIcon ? (
               <span>{loadingIcon}</span>
            ) : (
               <>
                  <h1>{title}</h1>
                  <p>{content}</p>
                  <div className="popup-box__action row">
                     <Button onClick={() => setShowPopup(false)} btnClass={"popup-box__btn--cancel popup-box__btn"} text={cancel} />
                     <Button onClick={() => accessAction()} btnClass={"popup-box__btn popup-box__btn--access"} text={access} />
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

export default Popup;
