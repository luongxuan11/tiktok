const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
const handbrake = require("handbrake-js");
const cloudinary = require("cloudinary").v2;
import { writeBufferToInput, deleteTemporaryFile, writeBufferToOutput } from "../helpers/writeFileToFolder";

const compressVideo = (inputFilePath, outputFilePath, options, callback) => {
   handbrake.exec(
      {
         input: inputFilePath,
         output: outputFilePath,
         ...options,
      },
      callback,
   );
};

const setupUploadFile = (req, res, next) => {
   const userId = req.user.id;

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
   ];
   const getRandomAccount = () => {
      const randomNumber = Math.random();
      if (randomNumber < 1 / 3) {
         return cloudinaryAccounts[0];
      } else if (randomNumber < 2 / 3) {
         return cloudinaryAccounts[1];
      } else {
         return cloudinaryAccounts[2];
      }
   };

   const randomAccount = getRandomAccount();
   cloudinary.config(randomAccount);

   const upload = multer({
      storage: multer.memoryStorage(),
      limits: {
         fileSize: 50 * 1024 * 1024,
      },
      fileFilter: (req, file, callback) => {
         if (file.mimetype === "video/mp4" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            callback(null, true);
         } else {
            console.log(`File với mimetype ${file.mimetype} không hợp lệ.`);
            callback(new Error("Tệp tải lên không hợp lệ"), false);
         }
      },
   }).fields([
      { name: "video", maxCount: 1 },
      { name: "image", maxCount: 1 },
   ]);

   upload(req, res, async (err) => {
      if (err) {
         console.error("Lỗi khi tải lên file:", err);
         return res.status(500).send("Lỗi khi tải lên file.");
      }

      const inputVideoPath = writeBufferToInput(req.files.video[0].buffer, "mp4", userId);
      const outputVideoPath = writeBufferToOutput(req.files.video[0].buffer, "mp4", userId);
      const outputImagePath = writeBufferToOutput(req.files.image[0].buffer, "jpg", userId);

      const videoOptionsDefault = {
         preset: "Very Fast 720p30",
         "encoder-profile": "main",
         "encoder-level": "3.1",
         quality: 22,
         width: 720,
         height: 1280,
      };

      const videoOptions = req.body.videoOptions || videoOptionsDefault;

      compressVideo(inputVideoPath, outputVideoPath, videoOptions, async (err, stdout, stderr) => {
         if (err) {
            console.error("Lỗi khi nén video:", err);
            deleteTemporaryFile(inputVideoPath);
            deleteTemporaryFile(outputImagePath);
            return res.status(500).send("Lỗi khi nén video.");
         }

         try {
            const videoUploadResult = await cloudinary.uploader.upload(outputVideoPath, {
               folder: `tiktokVideo`,
               resource_type: "video",
            });

            const imageUploadResult = await cloudinary.uploader.upload(outputImagePath, {
               folder: `tiktokVideo`,
               resource_type: "image",
            });

            req.filesDetail = {
               video_file_name: videoUploadResult.secure_url, // URL của video
               video_file_id: videoUploadResult.public_id, // ID của video trên Cloudinary
               thumb_file_name: imageUploadResult.secure_url,
               thumb_file_id: imageUploadResult.public_id,
               account_cloud: videoUploadResult.api_key,
            };
            // console.log(videoUploadResult);
            // console.log(imageUploadResult);
            deleteTemporaryFile(inputVideoPath);
            deleteTemporaryFile(outputVideoPath);
            deleteTemporaryFile(outputImagePath);
            next();
         } catch (uploadError) {
            console.error("Lỗi khi tải lên Cloudinary Storage:", uploadError);
            deleteTemporaryFile(inputVideoPath);
            deleteTemporaryFile(outputVideoPath);
            deleteTemporaryFile(outputImagePath);
            return res.status(500).send("Lỗi khi tải lên Cloudinary Storage.");
         }
      });
   });
};

export default setupUploadFile;
