import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { apiUpdateFavorite } from "../service/apis";
import icons from "../utilities/icons";

const FavoriteBtn = ({ setShowForm, item}) => {
   const { isLogin } = useSelector((state) => state.auth);
   const { currentData } = useSelector((state) => state.user);
   const {MdFavorite} = icons

   //state
   const [stateFavorite, setStateFavorite] = useState(null);

   const handleInteraction = async (e, id) => {
      e.stopPropagation();
      if (!isLogin) return setShowForm(true);
      e.currentTarget.classList.toggle("icon--active");

      const response = await apiUpdateFavorite({
         userId: currentData?.id,
         overviewId: id,
      });

      if (response.err === 0) {
         setStateFavorite({
            id: id,
            number: response.length,
         });
      } else return Swal.fire("Thất bại!", response.mess, "error");
   };

   // jsx
   return (
      <div className="icon-box row">
         <small
            onClick={(e) => handleInteraction(e, item.id)}
            className={`icon-box__small row ${item?.status.filter((el) => el.user_id === currentData?.id).length > 0 && isLogin ? "icon--active" : ""}`}
         >
            <MdFavorite className="icon" />
         </small>
         <span>{stateFavorite && stateFavorite.id === item.id ? stateFavorite.number : item?.status.length}</span>
      </div>
   );
};

export default memo(FavoriteBtn);
