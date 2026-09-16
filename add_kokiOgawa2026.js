const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KOKI OGAWA (2026) (p384) ===');

// 1. Image conversion to base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\74831222-c004-4101-a6b2-6a933134204b\\.user_uploaded\\media_1789033057909.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kokiOgawa2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KOKI_OGAWA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kokiOgawa2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p383Idx = mockCode.indexOf("id: 'p383'");
if (p383Idx === -1) {
  console.error("Could not find p383 in mockData.js!");
  process.exit(1);
}

const p383AvatarIdx = mockCode.indexOf("avatarUrl:", p383Idx);
const p383EndIdx = mockCode.indexOf("}", p383AvatarIdx);

const headerCode = mockCode.substring(0, p383EndIdx + 1);

const kokiOgawa2026Obj = `,
  {
    id: 'p384',
    name: '小川航基',
    readingName: 'おがわこうき',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 7027,
    maxOverall: 15266,
    baseStats: { shoot: 1355, pass: 1104, dribble: 1250, defense: 874, physical: 1341, speed: 824 },
    detailStats: {
      shoot: { finishing: 455, power: 447, composure: 453 },
      pass: { shortPass: 369, longPass: 365, accuracy: 370 },
      dribble: { breakout: 417, keeping: 441, ballTouch: 392 },
      defense: { tackle: 288, interception: 304, marking: 282 },
      physical: { jumping: 461, contact: 459, stamina: 421 },
      speed: { running: 384, agility: 440 }
    },
    maxEnhanced: {
      overall: 15266,
      baseStats: { shoot: 2960, pass: 2637, dribble: 2831, defense: 2371, physical: 2922, speed: 1870 },
      detailStats: {
        shoot: { finishing: 990, power: 982, composure: 988 },
        pass: { shortPass: 880, longPass: 876, accuracy: 881 },
        dribble: { breakout: 940, keeping: 964, ballTouch: 927 },
        defense: { tackle: 787, interception: 803, marking: 781 },
        physical: { jumping: 984, contact: 994, stamina: 944 },
        speed: { running: 907, agility: 963 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '上空の覇者', rank: '金', description: '発動エリア：前中　/　発動条件：ヘディングシュート時　/　決定力・ジャンプUP' },
    abilities: [
      { name: 'パワーヘッド', rank: '銀', description: '発動条件：途中出場　/　決定力・ジャンプUP' },
      { name: 'パワフルランナー', rank: '銀', description: '発動条件：途中出場　/　コンタクト・走力UP' },
      { name: 'アジャイルキッカー', rank: '銅', description: '発動条件：途中出場　/　キック力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + kokiOgawa2026Obj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p384.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kokiOgawa2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/pujonHaifu2026Image.js"></script>',
    '<script src="./src/data/pujonHaifu2026Image.js"></script>\n  <script src="./src/data/kokiOgawa2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p384": "KOKI_OGAWA_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p383": "PUJON_HAIFU_2026_IMAGE"',
    '"p383": "PUJON_HAIFU_2026_IMAGE",\n    "p384": "KOKI_OGAWA_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p384 image mapping.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p384": "KOKI_OGAWA_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p383": "PUJON_HAIFU_2026_IMAGE"',
    '"p383": "PUJON_HAIFU_2026_IMAGE",\n    "p384": "KOKI_OGAWA_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p384 image mapping.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(updatedMockCode, sandbox);
const p384 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p384');
console.log('6. Verification of p384:', p384 ? `${p384.name} (${p384.id})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KOKI_OGAWA_2026_IMAGE:', sandbox.window.KOKI_OGAWA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KOKI OGAWA (2026) ADDED SUCCESSFULLY! ===');
