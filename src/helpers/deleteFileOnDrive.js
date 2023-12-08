const deleteFilesOnDrive = async (fileDetails, authDrive) => {
    try {
      for (const fileDetail of fileDetails) {
        const fileId = fileDetail.fileId;
        await authDrive.files.delete({ fileId: fileId });
  
        console.log(`File ${fileId} deleted on Google Drive.`);
      }
    } catch (error) {
      console.error("Error deleting files on Google Drive:", error.message);
    }
  };
export default deleteFilesOnDrive;