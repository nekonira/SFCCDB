const fs = require('fs');
const path = require('path');

function searchImages(dir, fileList = []) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      try {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          if (!filePath.includes('node_modules') && !filePath.includes('.git')) {
            searchImages(filePath, fileList);
          }
        } else {
          const ext = path.extname(file).toLowerCase();
          if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
            fileList.push({ path: filePath, size: stat.size, mtime: stat.mtime });
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
  return fileList;
}

const baseDir = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain';
const images = searchImages(baseDir);
images.sort((a, b) => b.mtime - a.mtime);

console.log('Top 15 most recent images:');
images.slice(0, 15).forEach((img, i) => {
  console.log(`[${i+1}] ${img.mtime.toISOString()} (${img.size} bytes): ${img.path}`);
});
