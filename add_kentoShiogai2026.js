const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KENTO SHIOGAI (2026) (p385) ===');

// 1. Image conversion
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3cd38d12-555b-4707-b414-e5915f966428\\.user_uploaded\\media_1789534271061.jpg";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kentoShiogai2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/jpeg;base64,${base64}`;
const imageJsContent = `window.KENTO_SHIOGAI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kentoShiogai2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p384Idx = mockCode.indexOf("id: 'p384'");
if (p384Idx === -1) {
  console.error("Could not find p384 in mockData.js!");
  process.exit(1);
}

const p384AvatarIdx = mockCode.indexOf("avatarUrl:", p384Idx);
const p384EndIdx = mockCode.indexOf("}", p384AvatarIdx);

const headerCode = mockCode.substring(0, p384EndIdx + 1);

const kentoShiogai2026Obj = `,
  {
    id: 'p385',
    name: '塩貝健人',
    readingName: 'しおがいけんと',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: ['AM'],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6731,
    maxOverall: 14945,
    baseStats: { shoot: 1338, pass: 1114, dribble: 1220, defense: 845, physical: 1209, speed: 848 },
    detailStats: {
      shoot: { finishing: 456, power: 428, composure: 454 },
      pass: { shortPass: 380, longPass: 365, accuracy: 369 },
      dribble: { breakout: 418, keeping: 407, ballTouch: 395 },
      defense: { tackle: 282, interception: 290, marking: 273 },
      physical: { jumping: 430, contact: 376, stamina: 403 },
      speed: { running: 418, agility: 430 }
    },
    maxEnhanced: {
      overall: 14945,
      baseStats: { shoot: 2943, pass: 2647, dribble: 2801, defense: 2342, physical: 2790, speed: 1894 },
      detailStats: {
        shoot: { finishing: 991, power: 963, composure: 989 },
        pass: { shortPass: 891, longPass: 876, accuracy: 880 },
        dribble: { breakout: 941, keeping: 930, ballTouch: 930 },
        defense: { tackle: 781, interception: 789, marking: 772 },
        physical: { jumping: 953, contact: 911, stamina: 926 },
        speed: { running: 941, agility: 953 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '決め切る力', rank: '銀', description: '発動条件：途中出場　/　決定力・スタミナUP' },
      { name: '冷静なチャンスメイク', rank: '銀', description: '発動条件：途中出場　/　冷静さ・ショートパスUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + kentoShiogai2026Obj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p385.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kentoShiogai2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/kokiOgawa2026Image.js"></script>',
    '<script src="./src/data/kokiOgawa2026Image.js"></script>\n  <script src="./src/data/kentoShiogai2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p385"')) {
  appJsxCode = appJsxCode.replace(
    '"p384": "KOKI_OGAWA_2026_IMAGE"',
    '"p384": "KOKI_OGAWA_2026_IMAGE",\n    "p385": "KENTO_SHIOGAI_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('4. src/app.jsx updated with p385 image mapping.');
}

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p385"')) {
  if (appJsCode.includes('"p384":"KOKI_OGAWA_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p384":"KOKI_OGAWA_2026_IMAGE"',
      '"p384":"KOKI_OGAWA_2026_IMAGE","p385":"KENTO_SHIOGAI_2026_IMAGE"'
    );
  } else {
    appJsCode = appJsCode.replace(
      '"KOKI_OGAWA_2026_IMAGE"}',
      '"KOKI_OGAWA_2026_IMAGE","p385":"KENTO_SHIOGAI_2026_IMAGE"}'
    );
  }
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('5. src/app.js updated with p385 image mapping.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(updatedMockCode, sandbox);
const p385 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p385');
console.log('6. Verification of p385:', p385 ? `${p385.name} (${p385.id})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KENTO_SHIOGAI_2026_IMAGE:', sandbox.window.KENTO_SHIOGAI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KENTO SHIOGAI (2026) ADDED SUCCESSFULLY! ===');
