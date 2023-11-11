const fs = require("fs").promises;
const path = require("path");

const userFolderPath = "/workspace/tiktok/server/src/onOutput";

export const deleteFolderThumbnail = async (folderToDelete, generateUserFolderId) => {
   const folderPathToDelete = path.join(userFolderPath, `${folderToDelete}-${generateUserFolderId}`);
   await fs
      .rm(folderPathToDelete, { recursive: true })
      .then(() => {
         console.log(`Folder '${folderToDelete}' deleted successfully.`);
      })
      .catch((err) => {
         console.error(`Error while deleting folder '${folderToDelete}': ${err}`);
      });
};
