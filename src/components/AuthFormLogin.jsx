import React, { memo, useState, useEffect } from "react";
import { InputForm, Button } from "../components";
import icons from "../utilities/icons";
import validate from "../container/public/validate";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/store/actions";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { apiForgotPassword } from "../service/apis";
import LineAnimated from "../components/animation/LineAnimated";

const AuthFormLogin = ({ setShowForm }) => {
   const { PiEyeDuotone, PiEyeClosedDuotone, AiOutlineCloseCircle, RiLoader4Line } = icons;
   const [showPassword, setShowPassword] = useState(false);
   const [forgetPassword, setForgetPassword] = useState(false);
   const [invalidFields, setInvalidFields] = useState([]);
   const [loading, setLoading] = useState(false);
   const [loadingLogin, setLoadingLogin] = useState(false);
   const [payload, setPayload] = useState({
      email: "",
      password: "",
   });

   const { isLogin, mess, update } = useSelector((state) => state.auth);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      forgetPassword ? setPayload({ email: "" }) : setPayload({ email: "", password: "" });
   }, [forgetPassword]);

   // handle submit
   const handleSubmit = async (e) => {
      e.preventDefault();
      let invalids = validate(payload, setInvalidFields);

      if (invalids === 0 && !forgetPassword) {
         setLoadingLogin(true);
         dispatch(actions.login(payload));
      } else if (invalids === 0 && forgetPassword) {
         try {
            setLoading(true);
            const response = await apiForgotPassword(payload);
            if (response.err === 0) {
               Swal.fire("Thành công", response.mess, "info").then(() => {
                  setLoading(false);
                  setShowForm(false);
               });
            } else {
               Swal.fire("Oops !", response.mess, "warning");
               setLoading(false);
            }
         } catch (error) {
            console.log(error);
         }
      }
   };
   //  navigate to home
   useEffect(() => {
      isLogin && navigate("/");
      isLogin && setShowForm(false);
   }, [isLogin, navigate]);

   // sweet alert2
   useEffect(() => {
      if (mess) {
         Swal.fire("Oops !", mess, "error").then(() => {
            setLoadingLogin(false);
         });
      }
   }, [mess, update]);

   return (
      <div className={`auth__form--wrapper`}>
         <div className={`form row`}>
            <form onSubmit={handleSubmit} className="form-control">
               <p className="process__step">Welcome to Tiktok</p>
               <h2 className="form-control__heading">{!forgetPassword ? "Đăng nhập" : "Bạn quên mật khẩu?"}</h2>
               <div className="form-control__box">
                  {!loading ? (
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
                  ) : (
                     <LineAnimated />
                  )}
                  {!forgetPassword && (
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
                  )}
               </div>
               <div className="form-control__forget row">
                  {!loading && <Link onClick={() => setForgetPassword((prev) => !prev)}>{!forgetPassword ? "Bạn quên mật khẩu?" : "Đăng nhập"}</Link>}
                  {!forgetPassword && <Link to={"/auth"}>Tạo tài khoản mới</Link>}
               </div>
               <Button btnClass={`form-control__btn`} text={!forgetPassword ? "Tiếp tục" : "Làm mới mật khẩu"} />
               <span
                  className="close"
                  onClick={() => {
                     setShowForm(false);
                     setForgetPassword(false);
                  }}
               >
                  <AiOutlineCloseCircle />
               </span>
               {loadingLogin && (
                  <div className="form--loading form--loading1 row">
                     <RiLoader4Line className="icon" />
                  </div>
               )}
            </form>
         </div>
      </div>
   );
};

export default memo(AuthFormLogin);
