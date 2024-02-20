const validate = (payload, setInvalidFields) => {
   let invalid = 0; // đếm các trường không hợp lệ
   let fields = Object.entries(payload); // chuyển obj thành mảng và mỗi phần tử là 1 mảng nhỏ gồm key và value
   let min = 6,
      max = 20;

   // Set để duy trì danh sách lỗi duy nhất
   //   check rỗng

   fields.forEach((item) => {
      if (item[1] === "" && item[0] !== "story") {
         setInvalidFields((prev) => [
            ...prev,
            {
               name: item[0], // tên của trường k hợp lệ
               mess: `Không được bỏ trống.`,
            },
         ]);
         invalid += 1;
      }
   });
   fields.forEach((item) => {
      switch (item[0]) {
         case "userName":
            if (item[1].length < 1) {
               setInvalidFields((prev) => [
                  ...prev,
                  {
                     name: item[0],
                     mess: `Tên tài khoản phải có tối thiểu 1 kí tự.`,
                  },
               ]);
               invalid += 1;
            } else if (item[1].length > 20) {
               setInvalidFields((prev) => [
                  ...prev,
                  {
                     name: item[0],
                     mess: `Tên tài khoản không được vượt quá 20 kí tự.`,
                  },
               ]);
               invalid += 1;
            }
            break;
         case "email":
            if (!isValidEmail(item[1])) {
               setInvalidFields((prev) => [
                  ...prev,
                  {
                     name: item[0],
                     mess: `Email không hợp lệ.`,
                  },
               ]);
               invalid += 1;
            }
            break;
         case "password":
            if (item[1].length < min) {
               // min = 6
               setInvalidFields((prev) => [
                  ...prev,
                  {
                     name: item[0],
                     mess: `Mật khẩu phải có tối thiểu ${min} kí tự`,
                  },
               ]);
               invalid += 1;
            } else if (item[1].length > max) {
               // max = 20
               setInvalidFields((prev) => [
                  ...prev,
                  {
                     name: item[0],
                     mess: `Mật khẩu không được vượt quá ${max} kí tự`,
                  },
               ]);
               invalid += 1;
            }
            break;
         case "resetPassword":
            if (item[1].length < min) {
               // min = 6
               setInvalidFields((prev) => [
                  ...prev,
                  {
                     name: item[0],
                     mess: `Mật khẩu phải có tối thiểu ${min} kí tự`,
                  },
               ]);
               invalid += 1;
            } else if (item[1].length > max) {
               // max = 20
               setInvalidFields((prev) => [
                  ...prev,
                  {
                     name: item[0],
                     mess: `Mật khẩu không được vượt quá ${max} kí tự`,
                  },
               ]);
               invalid += 1;
            }
            break;
         case "repeatPassword":
            if (item[1] !== payload.password) {
               setInvalidFields((prev) => [
                  ...prev,
                  {
                     name: item[0],
                     mess: `Mật khẩu nhập lại không khớp.`,
                  },
               ]);
               invalid += 1;
            }
            break;
         case "tikTokId":
            if (!/^[a-zA-Z0-9_.-]*$/.test(item[1])) {
               setInvalidFields((prev) => [
                  ...prev,
                  {
                     name: item[0],
                     mess: `Có kí tự không hợp lệ`,
                  },
               ]);
               invalid += 1;
            }
            break;
         default:
            break;
      }
   });

   return invalid;
};

// Hàm kiểm tra email hợp lệ
function isValidEmail(email) {
   // Sử dụng một biểu thức chính quy đơn giản để kiểm tra email
   const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
   return emailRegex.test(email);
}
export default validate;
