const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
const ffmpeg = require("fluent-ffmpeg"); // Sử dụng thư viện FFmpeg
ffmpeg.setFfmpegPath("E:/ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe");
const fs = require("fs");
const path = require("path");

// Hàm để ghi buffer vào tệp đĩa cứng và trả về đường dẫn tệp tạm thời
const writeBufferToFile = (buffer, fileExtension) => {
  const temporaryFilePath = path.join(
    __dirname,
    `temporary_input.${fileExtension}`
  );
  fs.writeFileSync(temporaryFilePath, buffer);
  return temporaryFilePath;
};

// Hàm để xóa tệp tạm thời sau khi sử dụng
const deleteTemporaryFile = (filePath) => {
  fs.unlinkSync(filePath);
};

// mid handle data into google drive
const googleDriveCloud = async (req, res, next) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage,
    limits: {
      fileSize: 100 * 1024 * 1024, // Giới hạn tệp tải lên dưới 100MB
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

    try {
      const inputFilePath = writeBufferToFile(req.file.buffer, "mp4");
      const outputFileName = `reduce_${req.file.originalname}`;

      // Nén tệp video bằng FFmpeg
      ffmpeg()
        .input(inputFilePath)
        .videoCodec("libx264") // Sử dụng codec video
        .audioCodec("aac") // Sử dụng codec âm thanh
        .size("1920x1080") // Kích thước đầu ra
        .on("end", () => {
          console.log("Hoàn thành nén video.", outputFileName);
          // Xóa tệp đầu vào tạm thời
          deleteTemporaryFile(inputFilePath);

          // Lấy kích thước tệp đã nén và gán vào req.file.size
          req.file.size = fs.statSync(outputFileName).size;

          // Đọc nội dung của tệp đã nén và gán vào req.file.buffer
          req.file.buffer = fs.readFileSync(outputFileName);

          // Đổi tên tệp gốc thành tên tệp đã nén
          req.file.originalname = outputFileName;

          // Xóa tệp đã nén
          deleteTemporaryFile(outputFileName);

          next();
        })
        .on("error", (err) => {
          console.error("Lỗi nén video:", err);
          deleteTemporaryFile(inputFilePath);
        })
        .save(outputFileName);
    } catch (error) {
      return res.status(500).json({
        err: 1,
        mess: "chưa tải lên video",
      });
    }
  });
};

export default googleDriveCloud;
