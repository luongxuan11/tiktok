import React, { useState, useEffect } from "react";
import icons from "../utilities/icons";
import images from "../assets/imgExport";
import InputForm from "./InputForm";
import Button from "./Button";
import { Toaster, toast } from "react-hot-toast";
import validate from "../container/public/validate";
import { apiCheckIdInvalid, apiUpdateImageUser, apiUpdateUser } from "../service/apis";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";

const EditInformation = ({ currentUser, setShowEditPopup }) => {
   const navigate = useNavigate();
   const { IoMdClose, CiEdit, RiLoader4Line, FaCheck } = icons;
   const { user } = images;
   // state
   const [showPopup, setShowPopup] = useState(false);
   const [loadingPopup, setLoadingPopup] = useState(false);
   const [maxLength, setMaxLength] = useState(0);
   const [payloadChange, setPayloadChange] = useState(false);
   const [invalidFields, setInvalidFields] = useState([]);
   const [loadingTikTokId, setLoadingTikTokId] = useState("none");
   const [valueTikTokId, setValueTikTokId] = useState("");
   const [avatar, setAvatar] = useState({ image: null });
   const [initialPayload, setInitialPayload] = useState({
      tikTokId: "",
      userName: "",
      story: "",
      location: "www.tiktok.com",
      image: null,
   });
   const [payload, setPayload] = useState({
      tikTokId: "",
      userName: "",
      story: "",
      location: "www.tiktok.com",
   });

   // set payload with current user
   useEffect(() => {
      if (currentUser) {
         const tikTokId = currentUser.tiktok_id.replace(/@/g, "");
         const { userName, introduce } = currentUser;
         setPayload({
            tikTokId,
            userName,
            story: introduce ? introduce : "",
         });
         setInitialPayload({
            tikTokId,
            userName,
            story: introduce ? introduce : "",
            image: null,
         });
      }
   }, [currentUser]);

   // check payload changed
   useEffect(() => {
      const hasPayloadChanged = () => {
         return (
            initialPayload.tikTokId !== payload.tikTokId ||
            initialPayload.userName !== payload.userName ||
            initialPayload.story !== payload.story ||
            initialPayload.image !== avatar.image
         );
      };
      setPayloadChange(hasPayloadChanged());
   }, [payload.tikTokId, payload.userName, payload.story, initialPayload.image, avatar.image]);

   // value textarea
   const handleChange = (e) => {
      let value = e.target.value;
      if (value.length < 80) {
         setPayload((prev) => ({
            ...prev,
            story: value,
         }));
      } else {
         toast.error("Tối đa 80 kí tự", {
            duration: 1500,
            position: "top-center",
            style: {
               background: "#121212",
               color: "#fff",
               ["fontweight"]: "600",
               padding: "5px 30px",
            },
         });
      }
      setMaxLength(value.length);
   };

   // value image
   const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file?.name.split(".")[1] === "jpg" || file?.name.split(".")[1] === "png") {
         setAvatar({ image: file });
      } else {
         toast.error("File không hợp lệ. 400 - Error!", {
            duration: 2500,
            position: "top-center",
            style: {
               background: "#121212",
               color: "#fff",
               ["fontweight"]: "600",
               padding: "5px 30px",
            },
         });
      }
   };

   // // debounce call api check invalid id
   useEffect(() => {
      try {
         if (valueTikTokId) {
            setLoadingTikTokId("pending");
            const debounceApi = setTimeout(async () => {
               const response = await apiCheckIdInvalid({ tikTokId: valueTikTokId });
               if (response.err === 1) {
                  toast.error("Kí tự không hợp lệ - Error!", {
                     duration: 2500,
                     position: "top-center",
                     style: {
                        background: "#121212",
                        color: "#fff",
                        ["fontweight"]: "600",
                        padding: "5px 30px",
                     },
                  });
                  return setLoadingTikTokId("reject");
               }
               if (response.invalid) {
                  setLoadingTikTokId("reject");
                  toast.error("Id đã tồn tại - Error!", {
                     duration: 2500,
                     position: "top-center",
                     style: {
                        background: "#121212",
                        color: "#fff",
                        ["fontweight"]: "600",
                        padding: "5px 30px",
                     },
                  });
               } else {
                  setLoadingTikTokId("fulfilled");
               }
            }, 1000);
            return () => {
               clearTimeout(debounceApi);
            };
         } else {
            setLoadingTikTokId("none");
         }
      } catch (error) {
         setLoadingTikTokId("none");
         console.log(error);
      }
   }, [valueTikTokId]);

   // console.log(loadingTikTokId)
   // handle submit
   const handleBeforeSubmit = async () => {
      if (payloadChange) {
         let invalids = validate(payload, setInvalidFields);
         if (invalids === 0) {
            setShowPopup(true);
         }
      }
   };

   const handleSubmit = async () => {
      try {
         setLoadingPopup(true);
         const response = await apiUpdateUser(payload);
         if (avatar.image) {
            await apiUpdateImageUser(avatar);
         }
         if (response.err === 0) {
            navigate(`/@${payload.tikTokId}`);
            window.location.reload();
         }
      } catch (error) {
         toast.error("Lỗi không mong muốn - Error!", {
            duration: 2500,
            position: "top-center",
            style: {
               background: "#121212",
               color: "#fff",
               ["fontweight"]: "600",
               padding: "5px 30px",
            },
         });
         setLoadingPopup(false);
         console.log(error);
      }
   };

   return (
      <>
         <div className="profile-edit row">
            <div className="edit-box row">
               <div className="edit-box__title row">
                  <h2>Sửa hồ sơ</h2>
                  <IoMdClose className="icon" onClick={() => setShowEditPopup(false)} />
               </div>
               <div className="edit-box__avatar row">
                  <strong>Ảnh hồ sơ</strong>
                  <div className="avatar__image row">
                     {avatar.image ? <img src={URL.createObjectURL(avatar.image)} alt="" /> : <img src={currentUser?.avatar || user} alt="" />}
                     <label htmlFor="file" className="row">
                        <CiEdit className="icon" />
                     </label>
                     <input type="file" id="file" accept="image/jpeg, image/png" onChange={(e) => handleFileChange(e)} />
                  </div>
               </div>
               <div className="edit-box__id row">
                  <strong>TikTok ID</strong>
                  <InputForm
                     text={"TikTok Id"}
                     type={"text"}
                     payload={payload.tikTokId}
                     htmlFor={"tikTokId"}
                     setPayload={setPayload}
                     EditInformation={"TikTok ID chỉ có thể bao gồm chữ cái, chữ số, dấu gạch dưới và dấu chấm. Khi thay đổi TikTok ID, liên kết hồ sơ của bạn cũng sẽ thay đổi."}
                     tiktokid={`${payload.location}/${payload.tikTokId}`}
                     invalidFields={invalidFields}
                     setInvalidFields={setInvalidFields}
                     setValueTikTokId={setValueTikTokId}
                     icon={
                        loadingTikTokId === "pending" ? (
                           <RiLoader4Line className="pending" />
                        ) : loadingTikTokId === "fulfilled" ? (
                           <FaCheck className="success" />
                        ) : loadingTikTokId === "reject" ? (
                           <IoMdClose className="error" />
                        ) : (
                           ""
                        )
                     }
                     inputClass={"edit-box__id--origin"}
                  />
               </div>
               <div className="edit-box__id row">
                  <strong>Tên</strong>
                  <InputForm
                     text={"Tên"}
                     type={"text"}
                     payload={payload.userName}
                     htmlFor={"userName"}
                     setPayload={setPayload}
                     EditInformation={"Bạn chỉ có thể thay đổi tên 7 ngày một lần."}
                     invalidFields={invalidFields}
                     setInvalidFields={setInvalidFields}
                  />
               </div>
               <div className="edit-box__id edit-box__id--story row">
                  <strong>Tiểu sử</strong>
                  <div className="input">
                     <textarea
                        name="text"
                        id=""
                        onChange={(e) => handleChange(e)}
                        value={payload.story || null}
                        cols="10"
                        rows="4"
                        placeholder="Tiểu sử"
                        className="custom-scroll"
                        maxLength={80}
                     ></textarea>
                     <span className="edit--profile">{maxLength}/80</span>
                  </div>
               </div>
               <div className="edit-box__btn row">
                  <Button text={"Hủy"} btnClass={"btn"} onClick={() => setShowEditPopup(false)} />
                  <Button text={"Lưu"} onClick={handleBeforeSubmit} btnClass={`btn btn--save ${(!payloadChange || loadingTikTokId === "reject") && "btn--save--notActive"}`} />
               </div>
            </div>
         </div>
         <Toaster />
         {showPopup && (
            <Popup
               title={"Cập nhật lại thông tin của bạn?"}
               content={"Lưu ý: Thông tin của bạn sẽ được thay đổi sau khi lưu."}
               cancel={"Hủy"}
               access={"Xác nhận"}
               setShowPopup={setShowPopup}
               accessAction={handleSubmit}
               loadingIcon={loadingPopup ? <RiLoader4Line className="loadingPopup" /> : null}
            />
         )}
      </>
   );
};

export default EditInformation;
