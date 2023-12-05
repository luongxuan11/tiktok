const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const handbrake = require("handbrake-js");
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
   
   // save into folder
   upload(req, res, async (err) => {
      if (err) {
         console.error("Error uploading file:", err);
         return res.status(500).send("Error uploading file.");
      }
      console.log(req.body)
      // const inputFilePath = writeBufferToInput(req.file.buffer, "mp4", userId);
      // //   const outputFilePath = inputFilePath.replace(".mp4", "_compressed.mp4");
      // const outputFilePath = writeBufferToOutput(req.file.buffer, "mp4", userId);
      // // Check if req.file exists

      // const videoOptionsDefault = {
      //    preset: "Very Fast 720p30",
      //    "encoder-profile": "main",
      //    "encoder-level": "3.1",
      //    quality: 22,
      //    width: 720,
      //    height: 1280,
      // };

      // const videoOptions = req.body.videoOptions || videoOptionsDefault;

      // compressVideo(inputFilePath, outputFilePath, videoOptions, (err, stdout, stderr) => {
      //    if (err) {
      //       console.error("Error compressing video:", err);
      //       deleteTemporaryFile(inputFilePath);
      //       return res.status(500).send("Error compressing video.");
      //    }
      //    const compressedVideoBuffer = fs.readFileSync(outputFilePath);

      //    // Gán buffer này cho thuộc tính buffer của req.file
      //    req.file.buffer = compressedVideoBuffer;
      //    req.file.size = compressedVideoBuffer.length;
      //    deleteTemporaryFile(outputFilePath);
      //    next();
      // });
   });
};

export default setupUploadFile;
