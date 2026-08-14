const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING RYOTARO ARAKI 2026 IMAGE ===');

// 1. Image Conversion
const newImagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786028819407.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'arakiRyotaro2026Image.js');

const bytes = fs.readFileSync(newImagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.ARAKI_RYOTARO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. arakiRyotaro2026Image.js updated. Size:', fs.statSync(imageJsPath).size);

// 2. Ensure script tag in index.html
const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf-8');

if (!indexHtml.includes('arakiRyotaro2026Image.js')) {
  console.log('Adding arakiRyotaro2026Image.js to index.html...');
  // Insert before araki2026Image.js or arakiImage.js
  if (indexHtml.includes('araki2026Image.js')) {
    indexHtml = indexHtml.replace('<script src="./src/data/araki2026Image.js"></script>', '<script src="./src/data/arakiRyotaro2026Image.js"></script>\n  <script src="./src/data/araki2026Image.js"></script>');
  } else {
    indexHtml = indexHtml.replace('<script src="./src/data/arakiImage.js"></script>', '<script src="./src/data/arakiRyotaro2026Image.js"></script>\n  <script src="./src/data/arakiImage.js"></script>');
  }
  fs.writeFileSync(indexPath, indexHtml, 'utf-8');
  console.log('2. index.html updated with arakiRyotaro2026Image.js.');
} else {
  console.log('2. index.html already contains arakiRyotaro2026Image.js.');
}

// 3. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('3. Verification of window.ARAKI_RYOTARO_2026_IMAGE:', sandbox.window.ARAKI_RYOTARO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== UPDATE COMPLETE! ===');
