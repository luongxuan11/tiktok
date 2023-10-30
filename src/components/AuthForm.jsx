import React, { memo, useState, useEffect } from "react";
import { InputForm, Button } from "../components";
import icons from "../utilities/icons";
import validate from "../container/public/validate";
import { useDispatch, useSelector } from "react-redux";
import { apiRegister } from "../service/apis";
import * as actions from "../redux/store/actions"
import Swal from "sweetalert2";
import {useNavigate } from "react-router-dom";

const { PiEyeDuotone, PiEyeClosedDuotone, AiOutlineCloseCircle } = icons;

const AuthForm = ({ setShowForm }) => {
   const [showPassword, setShowPassword] = useState(false);
   const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
   const [isChecked, setIsChecked] = useState(false);
   const [step, setStep] = useState(false);
   const [invalidFields, setInvalidFields] = useState([]);
   const [payload, setPayload] = useState({
      userName: "",
      email: "",
      password: "",
      repeatPassword: "",
   });

   const {isLogin, mess, update} = useSelector(state => state.auth)

   useEffect(() =>{
    if(!step){
      setPayload({
        userName: "",
        email: "",
        password: "",
        repeatPassword: "",
     })
    }else{
      setPayload({
        email: "",
        password: "",
      })
    }
   }, [step])


   const dispatch = useDispatch();
   const navigate = useNavigate()

   // checkbox
   const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
   };

   // handle submit
   const handleSubmit = async (e) => {
      e.preventDefault();
      let invalids = validate(payload, setInvalidFields);

      if (!step) {
         if (invalids === 0 && isChecked) {
            const response = await apiRegister(payload);

            if (response?.data.err === 0) {
              Swal.fire("Thành công", response.data.mess, "success").then(() => {
                setPayload({
                  userName: "",
                  email: "",
                  password: "",
                  repeatPassword: "",
                });
                setStep(true);
              });
            } else {
               Swal.fire("Oops !", response.data.mess, "error");
               setStep(false);
            }
         }
      } else{
        if (invalids === 0 && isChecked){
          dispatch(actions.login(payload))
        }
      }
   };


  //  navigate to home
  useEffect(() =>{
    isLogin && navigate('/')
  }, [isLogin, navigate])

  // sweet alert2
  useEffect(() =>{
    mess && Swal.fire('Oops !', mess, 'error')
  }, [mess, update])

   return (
      <div className={`auth__form--wrapper`}>
         <div className={`form row`}>
            <form onSubmit={handleSubmit} className="form-control">
               <p className="process__step">{step ? "Bước 2/2" : "Bước 1/2"}</p>
               <div className="process">
                  <span className={`process__step--pending ${step ? "step2" : ""}`}></span>
               </div>
               <h2 className="form-control__heading">{step ? "Đăng nhập" : "Tạo tài khoản"}</h2>
               {!step ? (
                  <div className="form-control__box">
                     <InputForm
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        payload={payload.userName}
                        setPayload={setPayload}
                        text={"Vui lòng nhập tên của bạn..."}
                        label={"Tên tài khoản"}
                        htmlFor={"userName"}
                        type={"text"}
                     />
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
                     <InputForm
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        payload={payload.repeatPassword}
                        setPayload={setPayload}
                        text={"Nhập lại mật khẩu"}
                        label={"Nhập lại mật khẩu"}
                        htmlFor={"repeatPassword"}
                        type={`${showPasswordRepeat ? "text" : "password"}`}
                        setShowPasswordRepeat={setShowPasswordRepeat}
                        icon={showPasswordRepeat ? <PiEyeDuotone /> : <PiEyeClosedDuotone />}
                     />
                  </div>
               ) : (
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
               )}
               <div className="form-control__rules">
                  <div className="box row">
                     <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                     <p>
                        Bằng cách nhấp vào đây, bạn đồng ý với <strong>TikTok Commercial Terms of Service</strong> để
                        tìm hiểu cách chúng tôi thu thập, sử dụng và chia sẻ dữ liệu của bạn.
                     </p>
                  </div>
                  {!isChecked && (
                     <span className="form-control__rules--warning">
                        Hãy đồng ý với tất cả các điều khoản và điều kiện trước khi đăng ký.
                     </span>
                  )}
               </div>
               <Button btnClass={`form-control__btn ${isChecked ? "" : "error"}`} text={"Tiếp tục"} />
               <span onClick={() => setShowForm(false)} className="close">
                  <AiOutlineCloseCircle />
               </span>
            </form>
         </div>
      </div>
   );
};

export default memo(AuthForm);
