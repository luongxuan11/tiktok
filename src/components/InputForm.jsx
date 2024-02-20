import React, { memo } from "react";

const InputForm = ({
   text,
   label,
   type,
   icon,
   setShowPassword,
   htmlFor,
   setShowPasswordRepeat,
   setPayload,
   payload,
   invalidFields,
   setInvalidFields,
   EditInformation,
   tiktokid,
   setValueTikTokId,
   inputClass
}) => {
   const handleShowPassword = () => {
      setShowPassword((prev) => !prev);
   };
   const handleShowPasswordRepeat = () => {
      setShowPasswordRepeat((prev) => !prev);
   };

   const handleChangeInput = (e) => {
      let value = e.target.value;
      setPayload((prev) => ({ ...prev, [htmlFor]: value }));

      // part edit profile
      if (tiktokid) {
         setValueTikTokId(value);
      }
   };

   return (
      <div className="input row-column">
         <label htmlFor={htmlFor}>{label}</label>
         <input className={inputClass} type={type} value={payload} id={htmlFor} onFocus={() => invalidFields && setInvalidFields([])} placeholder={`${text}...`} onChange={(e) => handleChangeInput(e)} />
         {icon && (
            <span onClick={htmlFor === "password" ? handleShowPassword : handleShowPasswordRepeat} className="icon">
               {icon}
            </span>
         )}
         {invalidFields?.some((item) => item.name === htmlFor) && <small className="home-login__error">{invalidFields.find((item) => item.name === htmlFor)?.mess}</small>}

         {/* part edit profile */}
         {tiktokid && (
            <span className="edit--profile ellipsis">
               {tiktokid.slice(0, 33)}
               {tiktokid.length > 33 ? "..." : ""}
            </span>
         )}
         {EditInformation && <span className="edit--profile">{EditInformation}</span>}
      </div>
   );
};

export default memo(InputForm);
