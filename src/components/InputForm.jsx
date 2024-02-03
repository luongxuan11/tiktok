import React, { memo } from "react";

const InputForm = ({ text, label, type, icon, setShowPassword, htmlFor, setShowPasswordRepeat, setPayload, payload, invalidFields, setInvalidFields }) => {
   const handleShowPassword = () => {
      setShowPassword((prev) => !prev);
   };
   const handleShowPasswordRepeat = () => {
      setShowPasswordRepeat((prev) => !prev);
   };

   return (
      <div className="input row-column">
         <label htmlFor={htmlFor}>{label}</label>
         <input
            type={type}
            value={payload}
            id={htmlFor}
            onFocus={() => invalidFields && setInvalidFields([])}
            placeholder={`${text}...`}
            onChange={(e) => setPayload((prev) => ({ ...prev, [htmlFor]: e.target.value }))}
         />
         {icon && (
            <span onClick={htmlFor === "password" ? handleShowPassword : handleShowPasswordRepeat} className="icon">
               {icon}
            </span>
         )}
         {invalidFields?.some((item) => item.name === htmlFor) && <small className="home-login__error">{invalidFields.find((item) => item.name === htmlFor)?.mess}</small>}
      </div>
   );
};

export default memo(InputForm);
