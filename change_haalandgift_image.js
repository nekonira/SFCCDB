const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== CHANGING HAALAND GIFT 2026 IMAGE ===');

const newImagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786119864957.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'haalandGift2026Image.js');

const bytes = fs.readFileSync(newImagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.HAALAND_GIFT_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('Updated haalandGift2026Image.js. New Size:', fs.statSync(imageJsPath).size);

// Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(imageJsContent, sandbox);
console.log('Verification of window.HAALAND_GIFT_2026_IMAGE:', sandbox.window.HAALAND_GIFT_2026_IMAGE ? 'LOADED SUCCESSFULLY' : 'MISSING');
