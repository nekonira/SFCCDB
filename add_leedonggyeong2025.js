const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING LEE DONG-GYEONG (p317) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787390848295.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'leedonggyeong2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.LEEDONGGYEONG_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. leedonggyeong2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p316Idx = mockCode.indexOf("id: 'p316'");
if (p316Idx === -1) {
  console.error("Could not find p316 in mockData.js!");
  process.exit(1);
}

const p316AvatarIdx = mockCode.indexOf("avatarUrl:", p316Idx);
const p316EndIdx = mockCode.indexOf("}", p316AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p316EndIdx + 1);

const leeObj = `,
  {
    id: 'p317',
    name: 'イ・ドンギョン',
    readingName: 'い・どんぎょん',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'リアクション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6214,
    maxOverall: 14299,
    baseStats: { shoot: 1095, pass: 1160, dribble: 1234, defense: 1059, physical: 927, speed: 850 },
    detailStats: {
      shoot: { finishing: 376, power: 354, composure: 365 },
      pass: { shortPass: 377, longPass: 378, accuracy: 405 },
      dribble: { breakout: 416, keeping: 402, ballTouch: 416 },
      defense: { tackle: 345, interception: 363, marking: 351 },
      physical: { jumping: 263, contact: 323, stamina: 341 },
      speed: { running: 403, agility: 447 }
    },
    maxEnhanced: {
      overall: 14299,
      baseStats: { shoot: 2640, pass: 2741, dribble: 2803, defense: 2604, physical: 2496, speed: 1884 },
      detailStats: {
        shoot: { finishing: 887, power: 865, composure: 888 },
        pass: { shortPass: 912, longPass: 901, accuracy: 928 },
        dribble: { breakout: 939, keeping: 925, ballTouch: 939 },
        defense: { tackle: 868, interception: 874, marking: 862 },
        physical: { jumping: 774, contact: 846, stamina: 876 },
        speed: { running: 914, agility: 970 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' },
      { name: '切り開くキッカー', rank: '銀', description: '発動条件：好調　/　キック精度・突破力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + leeObj, 'utf-8');
console.log('2. mockData.js updated with p317 (Lee Dong-Gyeong) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('leedonggyeong2025Image.js')) {
  if (indexContent.includes('matheusjesus2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/matheusjesus2025Image.js"></script>',
      '<script src="./src/data/matheusjesus2025Image.js"></script>\n  <script src="./src/data/leedonggyeong2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/leedonggyeong2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p317": "LEEDONGGYEONG_2025_IMAGE"')) {
  if (appJsxCode.includes('"p316": "MATHEUSJESUS_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p316": "MATHEUSJESUS_2025_IMAGE"',
      '"p316": "MATHEUSJESUS_2025_IMAGE",\n  "p317": "LEEDONGGYEONG_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p317 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p317": "LEEDONGGYEONG_2025_IMAGE"')) {
  if (appJsCode.includes('"p316": "MATHEUSJESUS_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p316": "MATHEUSJESUS_2025_IMAGE"',
      '"p316": "MATHEUSJESUS_2025_IMAGE",\n  "p317": "LEEDONGGYEONG_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p317 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p317 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p317');
console.log('6. Verification of p317:', p317 ? `${p317.name} (Overall: ${p317.overall}, maxOverall: ${p317.maxOverall}, Rarity: ${p317.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.LEEDONGGYEONG_2025_IMAGE:', sandbox.window.LEEDONGGYEONG_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== LEE DONG-GYEONG ADDED SUCCESSFULLY! ===');
