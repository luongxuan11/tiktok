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
         fileSize: 100 * 1024 * 1024, // limit
      },
      fileFilter: (req, file, callback) => {
         if (file.mimetype === "video/mp4" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            callback(null, true);
         } else {
            console.log(`File with mimetype ${file.mimetype} is not valid.`);
            callback(new Error("tệp tải lên không hợp lệ"), false);
         }
      },
   }).fields([{ name: 'video', maxCount: 1 }, { name: 'image', maxCount: 1 }]);
   
   // save into folder
   upload(req, res, async (err) => {
      if (err) {
         console.error("Error uploading file:", err);
         return res.status(500).send("Error uploading file.");
      }
      const inputVideoPath = writeBufferToInput(req.files.video[0].buffer, "mp4", userId);
      //   const outputFilePath = inputFilePath.replace(".mp4", "_compressed.mp4");
      const outputVideoPath = writeBufferToOutput(req.files.video[0].buffer, "mp4", userId);
      // Check if req.file exists

      const videoOptionsDefault = {
         preset: "Very Fast 720p30",
         "encoder-profile": "main",
         "encoder-level": "3.1",
         quality: 22,
         width: 720,
         height: 1280,
      };

      const videoOptions = req.body.videoOptions || videoOptionsDefault;

      compressVideo(inputVideoPath, outputVideoPath, videoOptions, (err, stdout, stderr) => {
         if (err) {
            console.error("Error compressing video:", err);
            deleteTemporaryFile(inputVideoPath);
            return res.status(500).send("Error compressing video.");
         }
         const compressedVideoBuffer = fs.readFileSync(outputVideoPath);

         // Gán buffer này cho thuộc tính buffer của req.file
         req.files.video[0].buffer  = compressedVideoBuffer;
         req.files.video[0].size = compressedVideoBuffer.length;
         deleteTemporaryFile(outputVideoPath);
         deleteTemporaryFile(inputVideoPath);
         
         next();
      });
   });
};

export default setupUploadFile;
