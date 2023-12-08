const cloudinary = require("cloudinary").v2;

// Hàm để xóa tệp trên Cloudinary dựa trên public_id
const deleteFileOnCloudinary = async (videoUploadResult) => {
   try {
      const deleteResult = await cloudinary.uploader.destroy(videoUploadResult, {
         api_key: '662749821752814',
      });
      console.log("Delete result:", deleteResult);
      return true; // Trả về true nếu xóa thành công
   } catch (error) {
      console.error("Lỗi khi xóa tệp trên Cloudinary:", error);
      return false; // Trả về false nếu xóa không thành công
   }
};

export default deleteFileOnCloudinary;
