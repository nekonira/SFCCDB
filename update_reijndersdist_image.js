const fs = require('fs');
const path = require('path');

console.log('=== UPDATING REIJNDERS DIST IMAGE ===');

const newImagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786026968136.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'reijndersDist2026Image.js');

const bytes = fs.readFileSync(newImagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.REIJNDERS_DIST_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('reijndersDist2026Image.js updated with new image data. Size:', fs.statSync(imageJsPath).size);
console.log('=== IMAGE UPDATE COMPLETE! ===');
