const VideoThumbnailGenerator = require('video-thumbnail-generator');
const path = require('path');

const generateThumbnails = async (inputFilePath, outputThumbnailFolder, numberOfThumbnails) => {
  const vg = new VideoThumbnailGenerator({
    sourcePath: inputFilePath,
    thumbnailPath: outputThumbnailFolder,
  });

  const duration = await vg.getDurationInSeconds();
  const interval = duration / numberOfThumbnails;

  for (let i = 1; i <= numberOfThumbnails; i++) {
    const timeInSeconds = i * interval;
    const thumbnailFileName = `thumbnail_${i}.png`;
    const thumbnailPath = path.join(outputThumbnailFolder, thumbnailFileName);

    try {
      await vg.generateOneAtTime(timeInSeconds, {
        size: '320x240',
        filename: thumbnailFileName,
      });
      console.log(`Thumbnail ${i} generated successfully:`, thumbnailPath);
    } catch (err) {
      console.error(`Error generating thumbnail ${i}:`, err);
    }
  }
};

export default generateThumbnails;