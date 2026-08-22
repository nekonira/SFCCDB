const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING SHO INAGAKI (p321) WITH IMAGE & REVISED OVERALL ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787391866087.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'shoinagaki2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SHOINAGAKI_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. shoinagaki2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Update p321 in mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p321Idx = mockCode.indexOf("id: 'p321'");
if (p321Idx === -1) {
  console.error("Could not find p321 in mockData.js!");
  process.exit(1);
}

const p321OverallIdx = mockCode.indexOf("overall: 6273,", p321Idx);
if (p321OverallIdx !== -1) {
  mockCode = mockCode.replace("overall: 6273,", "overall: 6286,");
}

const p321MaxOverallIdx = mockCode.indexOf("maxOverall: 14416,", p321Idx);
if (p321MaxOverallIdx !== -1) {
  mockCode = mockCode.replace("maxOverall: 14416,", "maxOverall: 14453,");
}

const p321MaxEnhancedOverallIdx = mockCode.indexOf("overall: 14416,", p321Idx);
if (p321MaxEnhancedOverallIdx !== -1) {
  mockCode = mockCode.replace("overall: 14416,\n      baseStats:", "overall: 14453,\n      baseStats:");
}

fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with overall: 6286, maxOverall: 14453.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('shoinagaki2025Image.js')) {
  if (indexContent.includes('kosukeonose2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/kosukeonose2025Image.js"></script>',
      '<script src="./src/data/kosukeonose2025Image.js"></script>\n  <script src="./src/data/shoinagaki2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/shoinagaki2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p321": "SHOINAGAKI_2025_IMAGE"')) {
  if (appJsxCode.includes('"p320": "KOSUKEONOSE_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p320": "KOSUKEONOSE_2025_IMAGE"',
      '"p320": "KOSUKEONOSE_2025_IMAGE",\n  "p321": "SHOINAGAKI_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p321 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p321": "SHOINAGAKI_2025_IMAGE"')) {
  if (appJsCode.includes('"p320": "KOSUKEONOSE_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p320": "KOSUKEONOSE_2025_IMAGE"',
      '"p320": "KOSUKEONOSE_2025_IMAGE",\n  "p321": "SHOINAGAKI_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p321 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p321 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p321');
console.log('6. Verification of p321:', p321 ? `${p321.name} (Overall: ${p321.overall}, maxOverall: ${p321.maxOverall}, Rarity: ${p321.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SHOINAGAKI_2025_IMAGE:', sandbox.window.SHOINAGAKI_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== SHO INAGAKI UPDATED SUCCESSFULLY! ===');
