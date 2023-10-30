import React, { memo, useState, useEffect } from "react";
import { InputForm, Button } from "../components";
import icons from "../utilities/icons";
import validate from "../container/public/validate";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/store/actions"
import Swal from "sweetalert2";
import {useNavigate } from "react-router-dom";

const { PiEyeDuotone, PiEyeClosedDuotone, AiOutlineCloseCircle } = icons;

const AuthFormLogin = ({ setShowForm }) => {
   const [showPassword, setShowPassword] = useState(false);
   const [invalidFields, setInvalidFields] = useState([]);
   const [payload, setPayload] = useState({
      email: "",
      password: "",
   });

   const {isLogin, mess, update} = useSelector(state => state.auth)



   const dispatch = useDispatch();
   const navigate = useNavigate()


   // handle submit
   const handleSubmit = async (e) => {
      e.preventDefault();
      let invalids = validate(payload, setInvalidFields);

      if (invalids === 0){
        dispatch(actions.login(payload))
      }
   };
  //  navigate to home
  useEffect(() =>{
    isLogin && navigate('/')
    isLogin && setShowForm(false)
  }, [isLogin, navigate])

  // sweet alert2
  useEffect(() =>{
    mess && Swal.fire('Oops !', mess, 'error')
  }, [mess, update])

   return (
      <div className={`auth__form--wrapper`}>
         <div className={`form row`}>
            <form onSubmit={handleSubmit} className="form-control">
               <p className="process__step">Welcome to Tiktok</p>
               <h2 className="form-control__heading">Đăng nhập</h2>
                  <div className="form-control__box">
                     <InputForm
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        payload={payload.email}
                        setPayload={setPayload}
                        text={"Vui lòng nhập email của bạn..."}
                        label={"Địa chỉ email"}
                        htmlFor={"email"}
                        type={"text"}
                     />
                     <InputForm
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        payload={payload.password}
                        setPayload={setPayload}
                        text={"Vui lòng nhập mật khẩu của bạn..."}
                        label={"Mật khẩu"}
                        htmlFor={"password"}
                        type={`${showPassword ? "text" : "password"}`}
                        setShowPassword={setShowPassword}
                        icon={showPassword ? <PiEyeDuotone /> : <PiEyeClosedDuotone />}
                     />
                  </div>
               <Button btnClass={`form-control__btn`} text={"Tiếp tục"} />
               <span onClick={() => setShowForm(false)} className="close">
                  <AiOutlineCloseCircle />
               </span>
            </form>
         </div>
      </div>
   );
};

export default memo(AuthFormLogin);
