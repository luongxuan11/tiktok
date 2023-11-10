const fs = require('fs');
const path = require('path');

const outputDirectory = "/workspace/tiktok/server/src/onOutput";

export const getThumbnailFiles = () => {
  return fs.readdirSync(outputDirectory)
    .filter(file => file.startsWith('thumbnail_') && file.endsWith('.jpg'))
    .map(file => path.join(outputDirectory, file));
};