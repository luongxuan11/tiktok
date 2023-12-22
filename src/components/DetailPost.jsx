import React from "react";
import icons from "../utilities/icons";
import Search from "./Search";

const DetailPost = () => {
   const { IoMdClose, BsThreeDots } = icons;
   return (
      <div className="detail-post row">
         <div className="detail-post__video">
            <div className="video-nav row">
               <span className="icon--box row">
                  <IoMdClose className="icon" />
               </span>
               <Search />
               <span className="icon--box row icon--dots">
                  <BsThreeDots className="icon" />
               </span>
            </div>
            <div className="video-wrapper">
               <div className="picture">
                  <img
                     src="https://p16-sign-sg.tiktokcdn.com/obj/tos-alisg-p-0037/d7a44f678a6b499b8bad44a6c24462f1_1698886082?x-expires=1703376000&x-signature=TrjQc%2BAEFAhNiS1vNwCbR%2FAOaXQ%3D"
                     alt=""
                  />
                  <span></span>
               </div>
               <div className="movie row">
                  <video controls src="https://res.cloudinary.com/dsjwayuh5/video/upload/v1702164037/tiktokVideo/ui86zzcviiuyjjeqsxug.mp4"></video>
               </div>
            </div>
         </div>
         {/* group */}
         <div className="detail-post__group"></div>
      </div>
   );
};

export default DetailPost;
