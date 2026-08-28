const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');
const appJsPath = path.join(rootDir, 'src', 'app.js');

console.log('=== FIXING ASAHI SASAKI (p167) AND MARCUS VINICIUS (p302) ===');

// 1. Convert Asahi Sasaki PNG to Base64 JS file (src/data/sasakiAsahi2026Image.js)
const asahiPngPath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\0f868610-d568-48e9-8d5c-c399e8ee6f47\\media__1785947506705.png";
const asahiJsPath = path.join(dataDir, 'sasakiAsahi2026Image.js');

const bytes = fs.readFileSync(asahiPngPath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const asahiJsContent = `window.SASAKI_ASAHI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(asahiJsPath, asahiJsContent, 'utf-8');
console.log('1. Created sasakiAsahi2026Image.js (Size:', fs.statSync(asahiJsPath).size, 'bytes)');

// 2. Rebuild index.html to include sasakiAsahi2026Image.js
require('./build_clean_utf8_index.js');
console.log('2. Rebuilt index.html in UTF-8');

// 3. Update PLAYER_IMAGE_MAP in src/app.js
let appJsContent = fs.readFileSync(appJsPath, 'utf-8');

// Parse current PLAYER_IMAGE_MAP
const mapMatch = appJsContent.match(/const PLAYER_IMAGE_MAP = (\{[\s\S]*?\});/);
const currentMap = eval('(' + mapMatch[1] + ')');

// Set exact correct mappings
currentMap['p167'] = 'SASAKI_ASAHI_2026_IMAGE'; // 佐々木旭(2026)
currentMap['p193'] = 'SASAKI_2026_IMAGE';       // 佐々木大樹(2026)
currentMap['p302'] = 'MARCUSVINICIUS_2025_IMAGE'; // マルクス・ヴィニシウス

const updatedMapStr = `const PLAYER_IMAGE_MAP = ${JSON.stringify(currentMap, null, 2)};`;
appJsContent = appJsContent.replace(/const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/, updatedMapStr);

fs.writeFileSync(appJsPath, appJsContent, 'utf-8');
console.log('3. Updated PLAYER_IMAGE_MAP in src/app.js:');
console.log(' - [p167] 佐々木旭(2026) -> SASAKI_ASAHI_2026_IMAGE');
console.log(' - [p193] 佐々木大樹(2026) -> SASAKI_2026_IMAGE');
console.log(' - [p302] マルクス・ヴィニシウス -> MARCUSVINICIUS_2025_IMAGE');
