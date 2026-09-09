const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING DANI OLMO 2026 (p380) ===');

// 1. Image conversion to base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\065e7940-0695-40eb-8c99-d6e5b2225fa9\\.user_uploaded\\media_1788927635809.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'daniOlmo2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.DANI_OLMO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. daniOlmo2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p379Idx = mockCode.indexOf("id: 'p379'");
if (p379Idx === -1) {
  console.error("Could not find p379 in mockData.js!");
  process.exit(1);
}

const p379AvatarIdx = mockCode.indexOf("avatarUrl:", p379Idx);
const p379EndIdx = mockCode.indexOf("}", p379AvatarIdx);

const headerCode = mockCode.substring(0, p379EndIdx + 1);

const daniOlmo2026Obj = `,
  {
    id: 'p380',
    name: 'ダニ・オルモ',
    readingName: 'だにおるも',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'ポゼッション',
    playStyle: 'サイドアタッカーLW',
    playStyleLevel: 'Ⅱ',
    overall: 7238,
    maxOverall: 15468,
    baseStats: { shoot: 1356, pass: 1255, dribble: 1405, defense: 968, physical: 1086, speed: 905 },
    detailStats: {
      shoot: { finishing: 448, power: 446, composure: 462 },
      pass: { shortPass: 435, longPass: 409, accuracy: 411 },
      dribble: { breakout: 469, keeping: 451, ballTouch: 485 },
      defense: { tackle: 322, interception: 333, marking: 313 },
      physical: { jumping: 322, contact: 353, stamina: 411 },
      speed: { running: 432, agility: 473 }
    },
    maxEnhanced: {
      overall: 15468,
      baseStats: { shoot: 2913, pass: 2824, dribble: 2998, defense: 2477, physical: 2631, speed: 1975 },
      detailStats: {
        shoot: { finishing: 971, power: 957, composure: 985 },
        pass: { shortPass: 958, longPass: 932, accuracy: 934 },
        dribble: { breakout: 1004, keeping: 986, ballTouch: 1008 },
        defense: { tackle: 833, interception: 832, marking: 812 },
        physical: { jumping: 833, contact: 864, stamina: 934 },
        speed: { running: 967, agility: 1008 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: 'ジャックナイフ', rank: '銀', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '不適のボールキープ', rank: '金', description: '発動条件：好調　/　キープ力・コンタクトUP' },
      { name: '生成な突破', rank: '銀', description: '発動条件：絶好調　/　突破力・敏捷性UP' },
      { name: 'ゴール前の嗅覚', rank: '銅', description: '発動条件：好調　/　決定力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + daniOlmo2026Obj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p380.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('daniOlmo2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/mikelOyarzabal2026Image.js"></script>',
    '<script src="./src/data/mikelOyarzabal2026Image.js"></script>\n  <script src="./src/data/daniOlmo2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p380": "DANI_OLMO_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p379": "MIKEL_OYARZABAL_2026_IMAGE"',
    '"p379": "MIKEL_OYARZABAL_2026_IMAGE",\n    "p380": "DANI_OLMO_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p380 image mapping.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p380": "DANI_OLMO_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p379": "MIKEL_OYARZABAL_2026_IMAGE"',
    '"p379": "MIKEL_OYARZABAL_2026_IMAGE",\n    "p380": "DANI_OLMO_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p380 image mapping.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(updatedMockCode, sandbox);
const p380 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p380');
console.log('6. Verification of p380:', p380 ? p380.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.DANI_OLMO_2026_IMAGE:', sandbox.window.DANI_OLMO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== DANI OLMO 2026 ADDED SUCCESSFULLY! ===');
