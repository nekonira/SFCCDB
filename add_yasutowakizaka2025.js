const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YASUTO WAKIZAKA (p318) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787391084205.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yasutowakizaka2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YASUTOWAKIZAKA_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. yasutowakizaka2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p317Idx = mockCode.indexOf("id: 'p317'");
if (p317Idx === -1) {
  console.error("Could not find p317 in mockData.js!");
  process.exit(1);
}

const p317AvatarIdx = mockCode.indexOf("avatarUrl:", p317Idx);
const p317EndIdx = mockCode.indexOf("}", p317AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p317EndIdx + 1);

const wakizakaObj = `,
  {
    id: 'p318',
    name: '脇坂泰斗',
    readingName: 'わきざか・やすと',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'パサーAM',
    playStyleLevel: 'Ⅱ',
    overall: 6276,
    maxOverall: 14399,
    baseStats: { shoot: 1211, pass: 1200, dribble: 1209, defense: 1074, physical: 1062, speed: 751 },
    detailStats: {
      shoot: { finishing: 408, power: 393, composure: 410 },
      pass: { shortPass: 413, longPass: 401, accuracy: 386 },
      dribble: { breakout: 388, keeping: 391, ballTouch: 430 },
      defense: { tackle: 357, interception: 357, marking: 360 },
      physical: { jumping: 345, contact: 339, stamina: 378 },
      speed: { running: 373, agility: 378 }
    },
    maxEnhanced: {
      overall: 14399,
      baseStats: { shoot: 2756, pass: 2781, dribble: 2778, defense: 2619, physical: 2631, speed: 1785 },
      detailStats: {
        shoot: { finishing: 919, power: 904, composure: 933 },
        pass: { shortPass: 948, longPass: 924, accuracy: 909 },
        dribble: { breakout: 911, keeping: 914, ballTouch: 953 },
        defense: { tackle: 880, interception: 868, marking: 871 },
        physical: { jumping: 856, contact: 862, stamina: 913 },
        speed: { running: 884, agility: 901 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '冷静なボールタッチ', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' },
      { name: '長短のキック', rank: '銀', description: '発動条件：途中出場　/　ショートパス・ロングパスUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + wakizakaObj, 'utf-8');
console.log('2. mockData.js updated with p318 (Yasuto Wakizaka) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('yasutowakizaka2025Image.js')) {
  if (indexContent.includes('leedonggyeong2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/leedonggyeong2025Image.js"></script>',
      '<script src="./src/data/leedonggyeong2025Image.js"></script>\n  <script src="./src/data/yasutowakizaka2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/yasutowakizaka2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p318": "YASUTOWAKIZAKA_2025_IMAGE"')) {
  if (appJsxCode.includes('"p317": "LEEDONGGYEONG_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p317": "LEEDONGGYEONG_2025_IMAGE"',
      '"p317": "LEEDONGGYEONG_2025_IMAGE",\n  "p318": "YASUTOWAKIZAKA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p318 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p318": "YASUTOWAKIZAKA_2025_IMAGE"')) {
  if (appJsCode.includes('"p317": "LEEDONGGYEONG_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p317": "LEEDONGGYEONG_2025_IMAGE"',
      '"p317": "LEEDONGGYEONG_2025_IMAGE",\n  "p318": "YASUTOWAKIZAKA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p318 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p318 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p318');
console.log('6. Verification of p318:', p318 ? `${p318.name} (Overall: ${p318.overall}, maxOverall: ${p318.maxOverall}, Rarity: ${p318.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.YASUTOWAKIZAKA_2025_IMAGE:', sandbox.window.YASUTOWAKIZAKA_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== YASUTO WAKIZAKA ADDED SUCCESSFULLY! ===');
