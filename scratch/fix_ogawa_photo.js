const fs = require('fs');
const path = require('path');

console.log('=== FIXING KOKI OGAWA (2026) CARD IMAGE ===');

const correctImagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3cd38d12-555b-4707-b414-e5915f966428\\.user_uploaded\\media_1789533695300.jpg";
const targetJsPath = path.join(__dirname, '..', 'src', 'data', 'kokiOgawa2026Image.js');

const bytes = fs.readFileSync(correctImagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/jpeg;base64,${base64}`;

const fileContent = `window.KOKI_OGAWA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;
fs.writeFileSync(targetJsPath, fileContent, 'utf-8');

console.log('Successfully updated kokiOgawa2026Image.js with correct user image!');
console.log('File size:', fs.statSync(targetJsPath).size, 'bytes');
