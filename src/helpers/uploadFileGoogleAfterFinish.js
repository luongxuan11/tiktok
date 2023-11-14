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

export const handlePipe = (file) =>
   new Promise(async (resolve, reject) => {
      try {
         // dịch lại kiểu pipe do google drive không hiểu kiểu buffer
         const bufferStream = new Readable();
         bufferStream.push(file.buffer);
         bufferStream.push(null);
         // push in drive
         const createFile = await drive().files.create({
            requestBody: {
               name: file.originalname,
               mimeType: file.mimetype,
            },
            media: {
               mimeType: file.mimetype,
               body: bufferStream,
            },
         });

         // Cài đặt quyền truy cập công khai cho tệp
         await drive().permissions.create({
            fileId: createFile.data.id,
            requestBody: {
               role: "reader",
               type: "anyone",
            },
         });

         const fileInfo = await drive().files.get({
            fileId: createFile.data.id,
            fields: "webViewLink, webContentLink", // Chỉ lấy trường webViewLink chứa URL
         });
          // Lấy URL và id từ thông tin tệp
          const fileUrl = fileInfo.data.webContentLink;
          const fileId = createFile.data.id;
         resolve({
            fileUrl,
            fileId
         })
      } catch (error) {
         reject(error);
      }
   });
