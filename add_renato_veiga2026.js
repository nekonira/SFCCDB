const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING RENATO VEIGA (2025-2026) (p411) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\2267caac-99b8-4455-be84-1ae3774f4ede\\.user_uploaded\\media_1793173855015.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'renatoVeiga2026Image.js');

if (!fs.existsSync(imagePath)) {
  console.error("Uploaded image not found:", imagePath);
  process.exit(1);
}

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.RENATO_VEIGA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. renatoVeiga2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p410Idx = mockCode.indexOf("id: 'p410'");
if (p410Idx === -1) {
  console.error("Could not find p410 in mockData.js!");
  process.exit(1);
}

const p410AvatarIdx = mockCode.indexOf("avatarUrl:", p410Idx);
const p410EndIdx = mockCode.indexOf("}", p410AvatarIdx);

const headerCode = mockCode.substring(0, p410EndIdx + 1);

const veigaObj = `,
  {
    id: 'p411',
    name: 'レナト・ベイガ',
    readingName: 'れなと・べいが',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'カウンター',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 7214,
    maxOverall: 15501,
    baseStats: { shoot: 984, pass: 1206, dribble: 1257, defense: 1414, physical: 1284, speed: 830 },
    detailStats: {
      shoot: { finishing: 304, power: 352, composure: 328 },
      pass: { shortPass: 412, longPass: 401, accuracy: 393 },
      dribble: { breakout: 414, keeping: 414, ballTouch: 429 },
      defense: { tackle: 469, interception: 470, marking: 475 },
      physical: { jumping: 434, contact: 450, stamina: 400 },
      speed: { running: 425, agility: 405 }
    },
    maxEnhanced: {
      overall: 15501,
      baseStats: { shoot: 2481, pass: 2775, dribble: 2790, defense: 3019, physical: 2877, speed: 1876 },
      detailStats: {
        shoot: { finishing: 803, power: 851, composure: 827 },
        pass: { shortPass: 935, longPass: 924, accuracy: 916 },
        dribble: { breakout: 925, keeping: 925, ballTouch: 940 },
        defense: { tackle: 1004, interception: 1005, marking: 1010 },
        physical: { jumping: 969, contact: 985, stamina: 923 },
        speed: { running: 948, agility: 928 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'エリアの格闘家', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：コンタクト時　/　コンタクト・タックル・マークUP' },
    abilities: [
      { name: '瞬間の球際力', rank: '銀', description: '発動条件：好調　/　パスカット・コンタクトUP' },
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' },
      { name: '制空のボールタッチ', rank: '銅', description: '発動条件：好調　/　ボールタッチ・ジャンプUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + veigaObj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p411.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('renatoVeiga2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/renasakura2025Image.js"></script>',
    '<script src="./src/data/renasakura2025Image.js"></script>\n  <script src="./src/data/renatoVeiga2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with renatoVeiga2026Image.js script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p411":"RENATO_VEIGA_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p410":"NELSON_SEMEDO_2026_IMAGE"',
    '"p410":"NELSON_SEMEDO_2026_IMAGE","p411":"RENATO_VEIGA_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p411 image mapping.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p411": "RENATO_VEIGA_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p410": "NELSON_SEMEDO_2026_IMAGE"',
    '"p410": "NELSON_SEMEDO_2026_IMAGE",\n    "p411": "RENATO_VEIGA_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p411 image mapping.');
}

// 5. Update index.html cache busters
const newTimestamp = Date.now().toString();
indexContent = fs.readFileSync(indexPath, 'utf-8');
indexContent = indexContent.replace(/mockData\.js\?v=\d+/, `mockData.js?v=${newTimestamp}`);
indexContent = indexContent.replace(/app\.js\?v=\d+/, `app.js?v=${newTimestamp}`);
indexContent = indexContent.replace(/main\.js\?v=\d+/, `main.js?v=${newTimestamp}`);
fs.writeFileSync(indexPath, indexContent, 'utf-8');
console.log('6. index.html cache busters updated with', newTimestamp);

// 6. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(updatedMockCode, sandbox);
const p411 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p411');
console.log('7. Verification of p411 in mockData:', p411 ? `${p411.name} (${p411.nationality}, ${p411.mainPosition}, ${p411.overall} -> ${p411.maxOverall})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('8. Verification of window.RENATO_VEIGA_2026_IMAGE:', sandbox.window.RENATO_VEIGA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== RENATO VEIGA (2025-2026) ADDED SUCCESSFULLY! ===');
