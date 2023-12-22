import React, { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/store/actions";
import Button from "./Button";
import { apiFollow } from "../service/apis";

const FollowBtn = ({ item, setShowForm, setShowPopup }) => {
   const { isLogin } = useSelector((state) => state.auth);
   const { currentData } = useSelector((state) => state.user);
   const dispatch = useDispatch();
   // state
   const [followStates, setFollowStates] = useState({});

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
         setFollowStates((prevFollowStates) => ({
            ...prevFollowStates,
            [user_follow]: response.state === "Đang follow",
         }));
      }
   };
   return (
      <>
         <Button
            onClick={() => handleFollow(item.user_id)}
            text={followStates[item.user_id] ? "Đang follow" : "Follow"}
            btnClass={`${followStates[item.user_id] ? "info-user__btn--follow" : "info-user__btn"}`}
         />
      </>
   );
};

export default memo(FollowBtn);
