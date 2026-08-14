const fs = require('fs');
const path = require('path');

console.log('=== UPDATING KOIZUMI 2026 IMAGE ===');

const newImagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786026159340.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'koizumi2026Image.js');

const bytes = fs.readFileSync(newImagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KOIZUMI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('koizumi2026Image.js updated with new image data. New size:', fs.statSync(imageJsPath).size);
console.log('=== IMAGE UPDATE COMPLETE! ===');
