import React, { useState, useEffect } from "react";
import "../../sass/resetPassword.scss";
import images from "../../assets/imgExport";
import { InputForm, Button } from "../../components";
import validate from "./validate";
import Swal from "sweetalert2";
import { apiResetPassword } from "../../service/apis";
import { useLocation, useNavigate, Link } from "react-router-dom";

const ResetPassword = () => {
   const { resetPassLogo } = images;
   const location = useLocation();
   const navigate = useNavigate();
   // state
   const [payload, setPayload] = useState({ password: "", repeatPassword: "" });
   const [invalidFields, setInvalidFields] = useState([]);
   const [token, setToken] = useState(null);

   useEffect(() => {
      setToken(location.pathname.split("/").at(2));
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();
      let invalids = validate(payload, setInvalidFields);
      if (invalids === 0) {
         try {
            const response = await apiResetPassword({
               resetPassword: payload.password,
               token,
            });
            if (response.err === 0) {
               Swal.fire("Thành công", "Bạn đã thay đổi mật khẩu thành công!", "success").then(() => navigate("/"));
            } else if (response.err === 2) {
               Swal.fire("Opps!", response.mess, "info").then(() => navigate("/"));
            } else if (response.err === 1) {
               Swal.fire("Opps!", response.mess, "error").then(() => setPayload({ password: "", repeatPassword: "" }));
            }
         } catch (error) {
            Swal.fire("Opps!", "Có sự cố đường truyền.", "error");
         }
      }
   };

   return (
      <div className="resetPassword">
         <Link to={'/'} className="resetPassword-nav">
            <img src={resetPassLogo} alt="TikTok" />
         </Link>
         <section className="resetPassword-form row">
            <form onSubmit={handleSubmit} className="row">
               <strong>Hãy đặt lại mật khẩu của bạn.</strong>
               <InputForm
                  text={"New password..."}
                  type="password"
                  setPayload={setPayload}
                  payload={payload.password}
                  setInvalidFields={setInvalidFields}
                  invalidFields={invalidFields}
                  htmlFor={"password"}
               />
               <InputForm
                  text={"Confirm password..."}
                  type="password"
                  setPayload={setPayload}
                  payload={payload.repeatPassword}
                  setInvalidFields={setInvalidFields}
                  invalidFields={invalidFields}
                  htmlFor={"repeatPassword"}
               />
               <Button text={"Submit"} btnClass={"resetPassword-form__btn"} />
            </form>
         </section>
      </div>
   );
};

export default ResetPassword;
