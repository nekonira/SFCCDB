const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING LUCAS BARCELOS 2026 IMAGE ===');

const newImagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\30d7f0d1-9473-434c-80bc-71d83c6d7758\\media__1786114316943.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'lucasBarcelos2026Image.js');

const bytes = fs.readFileSync(newImagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.LUCAS_BARCELOS_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('Successfully updated lucasBarcelos2026Image.js! New size:', fs.statSync(imageJsPath).size);

// Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('Verification of window.LUCAS_BARCELOS_2026_IMAGE:', sandbox.window.LUCAS_BARCELOS_2026_IMAGE ? 'LOADED' : 'MISSING');
