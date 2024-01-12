import React, { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/store/actions";
import Button from "./Button";
import { apiFollow } from "../service/apis";

const FollowBtn = ({ item, setShowForm, setShowPopup, btnClass }) => {
   const { isLogin } = useSelector((state) => state.auth);
   const { currentData } = useSelector((state) => state.user);
   const dispatch = useDispatch();

   // handle
   const handleFollow = async (user_follow) => {
      if (!isLogin) {
         setShowForm(true);
      } else if (!currentData?.verifyOTP) {
         setShowPopup(true);
      } else {
         const response = await apiFollow({
            follower: user_follow,
         });
         if (response.err === 0) {
            isLogin && dispatch(actions.getUserCurrent());
         }
      }
   };

   return (
      <>
         <Button
            onClick={() => handleFollow(item.user_id)}
            text={`${isLogin && currentData.follow?.some((el) => el.user_follow?.includes(item?.user_id)) ? "Đang follow" : "Follow"}`}
            btnClass={`${isLogin && currentData.follow?.some((el) => el.user_follow?.includes(item?.user_id)) ? "info-user__btn--follow" : "info-user__btn"} ${btnClass}`}
         />
      </>
   );
};

export default memo(FollowBtn);
