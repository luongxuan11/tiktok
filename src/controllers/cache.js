import { internalError } from "../middlewares/handleError";
const { google } = require("googleapis");
import * as services from "../services";
const { Readable } = require("stream");

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN, // token authorization
});
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

export const createNewPost = async (req, res) => {
  try {
    // check invalid
    const { id } = req.user;
    const files = req.file;
    if (!id || !files) {
      return res.status(400).json({
        err: 1,
        mess: "Thiếu thông tin bắt buộc"
      });
    }

    // dịch lại kiểu pipe do google drive không hiểu kiểu buffer
    const bufferStream = new Readable();
    bufferStream.push(files.buffer);
    bufferStream.push(null);
    // push in drive
    const createFile = await drive.files.create({
      requestBody: {
        name: files.originalname,
        mimeType: files.mimetype,
      },
      media: {
        mimeType: files.mimetype,
        body: bufferStream,
      },
    });
    
    // Cài đặt quyền truy cập công khai cho tệp
    await drive.permissions.create({
      fileId: createFile.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    // Lấy thông tin của tệp vừa tạo
    const fileInfo = await drive.files.get({
      fileId: createFile.data.id,
      fields: "webViewLink, webContentLink", // Chỉ lấy trường webViewLink chứa URL
    });
    // Lấy URL và id từ thông tin tệp
    const fileUrl = fileInfo.data.webContentLink;
    const fileId = createFile.data.id
    console.log(fileUrl)

    const response = await services.createNewPost(id, fileUrl, fileId, drive, files.originalname)
    return res.status(200).json(response)
  } catch (error) {
    internalError(res, error.message);
  }
};

// get cache
export const getCache = async(req, res) =>{
  try {
    const { id } = req.user

    const response = await services.getCache(id)
    return res.status(200).json(response)
  } catch (error) {
    internalError(res, error.message)
  }
}

// delete file and google
export const deleteFile = async(req, res) =>{
  try {
    const { id } = req.user
    const {fileId} = req.body

    const response = await services.deleteFile(id, fileId, drive)
    return res.status(200).json(response)
  } catch (error) {
    internalError(res, error.message)
  }
}

// delete db not google
export const deleteCache = async(req, res) =>{
  try {
    const { id } = req.user

    const response = await services.deleteCache(id)
    return res.status(200).json(response)
  } catch (error) {
    internalError(res, error.message)
  }
}