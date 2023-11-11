const ffmpeg = require("fluent-ffmpeg"); // Sử dụng thư viện FFmpeg
ffmpeg.setFfmpegPath("E:/ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe");
const fs = require("fs");
const path = require("path");
import { deleteTemporaryFile } from "./writeFileToFolder";
import { v4 as generateId } from "uuid";

export const reduceFfmpeg = (inputFilePath, outputFileName, req) => {
   return new Promise(async (resolve, reject) => {
      try {
         await ffmpeg()
            .input(inputFilePath)
            .videoCodec("libx264")
            .audioCodec("aac")
            .size("720x1280")
            .addOption("-preset veryfast")
            .on("end", () => {
               console.log("Hoàn thành nén video.", outputFileName);

               // Xóa tệp đầu vào tạm thời
               // deleteTemporaryFile(inputFilePath);

               /*
                    1.    // Lấy kích thước tệp đã nén và gán vào req.file.size,
                    2.    // Đọc nội dung của tệp đã nén và gán vào req.file.buffer
                    3.    // Đổi tên tệp gốc thành tên tệp đã nén
               */
               req.file.size = fs.statSync(outputFileName).size;
               req.file.buffer = fs.readFileSync(outputFileName);
               req.file.originalname = outputFileName;
               // Xóa tệp đã nén
               deleteTemporaryFile(outputFileName);
               resolve();
            })
            .on("error", (err) => {
               console.error("Lỗi nén video:", err);
               deleteTemporaryFile(inputFilePath);
               reject(err);
            })
            .save(outputFileName);
      } catch (error) {
         reject(error);
      }
   });
};

export const createThumbnails = async (inputFilePath, req, userFolderId) => {
   const { id } = req.user;
   const outputDirectory = "/workspace/tiktok/server/src/onOutput";
   const userFolder = path.join(outputDirectory, `${id}-${userFolderId}`);
   
   // tạo folder theo tên người dùng
   fs.mkdirSync(userFolder);
   if (fs.existsSync(userFolder)) {
      for (let percentage = 5; percentage <= 100; percentage += 5) {
         try {
            const totalDuration = await getVideoDuration(inputFilePath);
            const timestamp = (percentage / 100) * totalDuration;
            const thumbnailFileName = `thumbnail_${generateId()}${percentage}.jpg`;
            await new Promise((resolve) => {
               ffmpeg()
                  .input(inputFilePath)
                  .seekInput(timestamp)
                  .frames(1)
                  .size("720x1280") 
                  .inputOptions(["-threads 4"])
                  .addOption("-preset veryfast")
                  .on("end", function () {
                     console.log(`Thumbnail for ${percentage}% was saved`);
                     resolve();
                  })
                  .on("error", function (err) {
                     console.log(`Error creating thumbnail for ${percentage}%: ${err.message}`);
                     resolve();
                  })
                  .save(path.join(userFolder, thumbnailFileName));
            });
         } catch (error) {
            console.error("Error creating thumbnails:", error);
         }
      }
   }

   // Sau khi tất cả các thumbnail đã được tạo xong, xóa tệp
   deleteTemporaryFile(inputFilePath);
};

// Hàm lấy tổng thời gian của video
const getVideoDuration = (inputFilePath) => {
   return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(inputFilePath, (err, metadata) => {
         if (err) {
            reject(err);
         } else {
            resolve(metadata.format.duration);
         }
      });
   });
};
