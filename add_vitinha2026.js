const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING VITINHA (2025-2026) (p409) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\2267caac-99b8-4455-be84-1ae3774f4ede\\.user_uploaded\\media_1793172780565.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'vitinha2026Image.js');

if (!fs.existsSync(imagePath)) {
  console.error("Uploaded image not found:", imagePath);
  process.exit(1);
}

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.VITINHA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. vitinha2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p408Idx = mockCode.indexOf("id: 'p408'");
if (p408Idx === -1) {
  console.error("Could not find p408 in mockData.js!");
  process.exit(1);
}

const p408AvatarIdx = mockCode.indexOf("avatarUrl:", p408Idx);
const p408EndIdx = mockCode.indexOf("}", p408AvatarIdx);

const headerCode = mockCode.substring(0, p408EndIdx + 1);

const vitinhaObj = `,
  {
    id: 'p409',
    name: 'ヴィティーニャ',
    readingName: 'ゔぃてぃーにゃ',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'カウンター',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅲ',
    overall: 7525,
    maxOverall: 15753,
    baseStats: { shoot: 1184, pass: 1446, dribble: 1506, defense: 1333, physical: 1138, speed: 904 },
    detailStats: {
      shoot: { finishing: 409, power: 366, composure: 409 },
      pass: { shortPass: 488, longPass: 485, accuracy: 473 },
      dribble: { breakout: 501, keeping: 504, ballTouch: 501 },
      defense: { tackle: 409, interception: 464, marking: 460 },
      physical: { jumping: 283, contact: 368, stamina: 487 },
      speed: { running: 399, agility: 505 }
    },
    maxEnhanced: {
      overall: 15753,
      baseStats: { shoot: 2729, pass: 3051, dribble: 3039, defense: 2914, physical: 2707, speed: 1926 },
      detailStats: {
        shoot: { finishing: 920, power: 877, composure: 932 },
        pass: { shortPass: 1023, longPass: 1020, accuracy: 1008 },
        dribble: { breakout: 1012, keeping: 1015, ballTouch: 1012 },
        defense: { tackle: 944, interception: 987, marking: 983 },
        physical: { jumping: 794, contact: 891, stamina: 1022 },
        speed: { running: 910, agility: 1016 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'クリティカルウェッジ', rank: '金', description: '発動エリア：中左中右・後左中右　/　発動条件：CF・AMの選手へのパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP　/　ドリブル・ショートパススキル所持者優先' },
    abilities: [
      { name: '変幻のパサー', rank: '金', description: '発動条件：好調　/　ショートパス・ロングパス・ボールタッチUP' },
      { name: '無限のアジリティ', rank: '銀', description: '発動条件：好調　/　スタミナ・敏捷性UP' },
      { name: '懐の深いロングパサー', rank: '銅', description: '発動条件：絶好調　/　ロングパス・キープ力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + vitinhaObj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p409.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('vitinha2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/vitinhaCardImage.js"></script>',
    '<script src="./src/data/vitinhaCardImage.js"></script>\n  <script src="./src/data/vitinha2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with vitinha2026Image.js script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p409":"VITINHA_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p408":"CRISTIANO_RONALDO_2026_IMAGE"',
    '"p408":"CRISTIANO_RONALDO_2026_IMAGE","p409":"VITINHA_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p409 image mapping.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p409": "VITINHA_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p408": "CRISTIANO_RONALDO_2026_IMAGE"',
    '"p408": "CRISTIANO_RONALDO_2026_IMAGE",\n    "p409": "VITINHA_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p409 image mapping.');
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
const p409 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p409');
console.log('7. Verification of p409 in mockData:', p409 ? `${p409.name} (${p409.nationality}, ${p409.mainPosition}, ${p409.overall} -> ${p409.maxOverall})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('8. Verification of window.VITINHA_2026_IMAGE:', sandbox.window.VITINHA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== VITINHA (2025-2026) ADDED SUCCESSFULLY! ===');
