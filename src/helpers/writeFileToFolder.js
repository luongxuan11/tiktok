const fs = require("fs");
const path = require("path");
import { v4 as generateId } from "uuid";



export const writeBufferToInput = (buffer, fileExtension) => {
    const temporaryFilePath = path.join(__dirname,'../onInput', `${Date.now()}${generateId()}input.${fileExtension}`);
    fs.writeFileSync(temporaryFilePath, buffer);
    return temporaryFilePath;
 };
 
// Hàm để xóa tệp tạm thời sau khi sử dụng
export const deleteTemporaryFile = (filePath) => {
    fs.unlinkSync(filePath);
 };
