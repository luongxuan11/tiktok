const cloudinary = require("cloudinary").v2;

// Thiết lập cấu hình cho các tài khoản Cloudinary
const cloudinaryAccounts = [
   {
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
   },
   {
      cloud_name: process.env.CLOUDINARY_NAME1,
      api_key: process.env.CLOUDINARY_KEY1,
      api_secret: process.env.CLOUDINARY_SECRET1,
   },
   {
      cloud_name: process.env.CLOUDINARY_NAME2,
      api_key: process.env.CLOUDINARY_KEY2,
      api_secret: process.env.CLOUDINARY_SECRET2,
   },
   // Thêm tài khoản khác nếu cần
];

// Function để xóa video dựa trên public_id và kiểm tra API Key
export const deleteVideo = async (public_id, apiKey) => {
   try {
      let selectedAccount = null;
      for (const account of cloudinaryAccounts) {
         if (account.api_key === apiKey) {
            selectedAccount = account;
            break;
         }
      }
      if (selectedAccount) {
         cloudinary.config(selectedAccount);

         // Gọi API để xóa video
         const result = await cloudinary.uploader.destroy(public_id, {
            resource_type: "video",
            invalidate: true,
         });

         console.log("Video deleted successfully:", result);
         return result;
      } else {
         console.error("No matching account found for the provided API Key.");
         return null;
      }
   } catch (error) {
      console.error("Error deleting video:", error);
      throw error;
   }
};

export const deleteImage = async (public_id, apiKey) => {
   try {
      let selectedAccount = null;

      for (const account of cloudinaryAccounts) {
         if (account.api_key === apiKey) {
            selectedAccount = account;
            break;
         }
      }
      if (selectedAccount) {
         // Thiết lập cấu hình cho tài khoản được chọn
         cloudinary.config(selectedAccount);

         // Gọi API để xóa video
         const result = await cloudinary.uploader.destroy(public_id, {
            resource_type: "image",
            invalidate: true,
         });

         console.log("image deleted successfully:", result);
         return result;
      } else {
         console.error("No matching account found for the provided API Key.");
         return null;
      }
   } catch (error) {
      console.error("Error deleting video:", error);
      throw error;
   }
};
