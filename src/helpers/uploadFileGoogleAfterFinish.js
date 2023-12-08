const { Readable } = require("stream");
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
oauth2Client.setCredentials({
   refresh_token: process.env.REFRESH_TOKEN, // token authorization
});

export const drive = () => {
   const authDrive = google.drive({
      version: "v3",
      auth: oauth2Client,
   });
   return authDrive;
};

export const handlePipe = (files) =>
   new Promise(async (resolve, reject) => {
      try {
         const authDrive = drive(); // Lấy đối tượng drive đã được xác thực
         const fileDetails = [];

         for (const fileType in files) {
            for (const file of files[fileType]) {
               const bufferStream = new Readable();
               bufferStream.push(file.buffer);
               bufferStream.push(null);

               // Tạo tệp trên Google Drive
               const createFile = await authDrive.files.create({
                  requestBody: {
                     name: file.originalname,
                     mimeType: file.mimetype,
                  },
                  media: {
                     mimeType: file.mimetype,
                     body: bufferStream,
                  },
               });

               // Thiết lập quyền truy cập công khai cho tệp
               await authDrive.permissions.create({
                  fileId: createFile.data.id,
                  requestBody: {
                     role: "reader",
                     type: "anyone",
                  },
               });

               // Lấy thông tin tệp và URL tới tệp
               const fileInfo = await authDrive.files.get({
                  fileId: createFile.data.id,
                  fields: "webViewLink, webContentLink, shared",
               });

               const fileId = createFile.data.id;
               const fileUrl = fileInfo.data.webContentLink;
               
               // Thêm thông tin URL và ID vào đối tượng file
               const fileDetail = {
                  fileId: fileId,
                  fileUrl: fileUrl,
                };
                fileDetails.push(fileDetail);
            }
         }
         resolve(fileDetails);
      } catch (error) {
         reject(error);
      }
   });
