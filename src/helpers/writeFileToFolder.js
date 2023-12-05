const fs = require("fs");
const path = require("path");

export const writeBufferToInput = (buffer, fileExtension, userId) => {
   if (userId) {
      const temporaryFilePath = path.join(__dirname, "../onInput", `${userId}_${Date.now()}_input.${fileExtension}`);
      fs.writeFileSync(temporaryFilePath, buffer);
      return temporaryFilePath;
   }
};


export const writeBufferToOutput = (buffer, extension, userId) => {
    const fileName = `${userId}_${Date.now()}_output.${extension}`;
    const outputPath = path.join(__dirname, "../onOutput", fileName);
 
    fs.writeFileSync(outputPath, buffer);
    return outputPath;
 };

// Hàm để xóa tệp tạm thời sau khi sử dụng
export const deleteTemporaryFile = (filePath) => {
   fs.unlinkSync(filePath);
};
