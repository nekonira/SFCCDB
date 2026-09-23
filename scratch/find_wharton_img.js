const fs = require('fs');
const path = require('path');

function searchFiles(dir) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          searchFiles(fullPath);
        } else if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.webp')) {
          console.log(`${stat.mtime.toISOString()} | ${stat.size} bytes | ${fullPath}`);
        }
      } catch (e) {}
    }
  } catch (e) {}
}

console.log('--- Searching images in brain dir ---');
searchFiles('C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3b557aab-3ed9-41d7-bec3-1885de4003d1');
