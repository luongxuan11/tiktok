const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
import { writeBufferToInput } from "../helpers/writeFileToFolder";
import { v4 as generateId } from "uuid";
import { reduceFfmpeg, createThumbnails } from "../helpers/ffmpeg";

// mid handle data into google drive
const googleDriveCloud = async (req, res, next) => {
   const storage = multer.memoryStorage();
   const upload = multer({
      storage,
      limits: {
         fileSize: 50 * 1024 * 1024, // Giới hạn tệp tải lên dưới 50MB
      },
      fileFilter: (req, file, callback) => {
         if (file.mimetype === "video/mp4") {
            callback(null, true);
         } else {
            callback(new Error("Chỉ cho phép tải lên các tệp video MP4"), false);
         }
      },
   }).single("video");

   upload(req, res, async (err) => {
      if (err) {
         console.error("Error uploading file:", err);
         return res.status(500).send("Error uploading file.");
      }

      const inputFilePath = writeBufferToInput(req.file.buffer, "mp4");
      const outputFileName = `reduce_${Date.now()}${generateId()}${req.file.originalname}`;
      await reduceFfmpeg(inputFilePath, outputFileName, req);
      await createThumbnails(inputFilePath, req);
      next();
   });
};

export default googleDriveCloud;
