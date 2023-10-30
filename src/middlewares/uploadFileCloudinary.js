const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const multer = require('multer')
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
     api_key: process.env.CLOUDINARY_KEY,
     api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary, // đối tượng đăng nhập
    allowedFormats: ['jpg', 'png', 'svg'],
    params:{
      folder: 'tiktok'
    }
  });

  const uploadCloud = multer({storage})

  export default uploadCloud