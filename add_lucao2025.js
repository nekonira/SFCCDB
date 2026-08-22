const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING LUCAO (p294) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787385634419.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'lucao2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.LUCAO_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. lucao2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p293Idx = mockCode.indexOf("id: 'p293'");
if (p293Idx === -1) {
  console.error("Could not find p293 in mockData.js!");
  process.exit(1);
}

const p293AvatarIdx = mockCode.indexOf("avatarUrl:", p293Idx);
const p293EndIdx = mockCode.indexOf("}", p293AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p293EndIdx + 1);

const lucaoObj = `,
  {
    id: 'p294',
    name: 'ルカオ',
    readingName: 'るかお',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'カウンター',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6132,
    maxOverall: 14348,
    baseStats: { shoot: 1105, pass: 983, dribble: 1098, defense: 1020, physical: 1203, speed: 729 },
    detailStats: {
      shoot: { finishing: 368, power: 395, composure: 342 },
      pass: { shortPass: 337, longPass: 326, accuracy: 320 },
      dribble: { breakout: 379, keeping: 398, ballTouch: 321 },
      defense: { tackle: 388, interception: 316, marking: 316 },
      physical: { jumping: 392, contact: 459, stamina: 352 },
      speed: { running: 402, agility: 327 }
    },
    maxEnhanced: {
      overall: 14348,
      baseStats: { shoot: 2710, pass: 2516, dribble: 2679, defense: 2517, physical: 2784, speed: 1775 },
      detailStats: {
        shoot: { finishing: 903, power: 930, composure: 877 },
        pass: { shortPass: 848, longPass: 837, accuracy: 831 },
        dribble: { breakout: 902, keeping: 921, ballTouch: 856 },
        defense: { tackle: 887, interception: 815, marking: 815 },
        physical: { jumping: 915, contact: 994, stamina: 875 },
        speed: { running: 925, agility: 850 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '確信のロングシュート', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：シュート・ロングシュート時　/　決定力・キック力UP' },
    abilities: [
      { name: 'パワフルランナー', rank: '銀', description: '発動条件：途中出場　/　コンタクト・走力UP' },
      { name: '保持からの一撃', rank: '銀', description: '発動条件：途中出場　/　キック力・キープ力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + lucaoObj, 'utf-8');
console.log('2. mockData.js updated with p294 (Lucao) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('lucao2025Image.js')) {
  if (indexContent.includes('ohsehun2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/ohsehun2025Image.js"></script>',
      '<script src="./src/data/ohsehun2025Image.js"></script>\n  <script src="./src/data/lucao2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/lucao2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p294": "LUCAO_2025_IMAGE"')) {
  if (appJsxCode.includes('"p293": "OHSEHUN_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p293": "OHSEHUN_2025_IMAGE"',
      '"p293": "OHSEHUN_2025_IMAGE",\n  "p294": "LUCAO_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p294 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p294": "LUCAO_2025_IMAGE"')) {
  if (appJsCode.includes('"p293": "OHSEHUN_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p293": "OHSEHUN_2025_IMAGE"',
      '"p293": "OHSEHUN_2025_IMAGE",\n  "p294": "LUCAO_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p294 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p294 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p294');
console.log('6. Verification of p294:', p294 ? `${p294.name} (Overall: ${p294.overall}, maxOverall: ${p294.maxOverall}, Rarity: ${p294.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.LUCAO_2025_IMAGE:', sandbox.window.LUCAO_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== LUCAO ADDED SUCCESSFULLY! ===');
