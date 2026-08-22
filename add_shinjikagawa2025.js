const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING SHINJI KAGAWA (p311) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787389703845.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'shinjikagawa2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SHINJIKAGAWA_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. shinjikagawa2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p310Idx = mockCode.indexOf("id: 'p310'");
if (p310Idx === -1) {
  console.error("Could not find p310 in mockData.js!");
  process.exit(1);
}

const p310AvatarIdx = mockCode.indexOf("avatarUrl:", p310Idx);
const p310EndIdx = mockCode.indexOf("}", p310AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p310EndIdx + 1);

const kagawaObj = `,
  {
    id: 'p311',
    name: '香川真司',
    readingName: 'かがわ・しんじ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6519,
    maxOverall: 14609,
    baseStats: { shoot: 1224, pass: 1126, dribble: 1265, defense: 969, physical: 1015, speed: 829 },
    detailStats: {
      shoot: { finishing: 438, power: 347, composure: 439 },
      pass: { shortPass: 395, longPass: 382, accuracy: 349 },
      dribble: { breakout: 413, keeping: 400, ballTouch: 452 },
      defense: { tackle: 317, interception: 328, marking: 324 },
      physical: { jumping: 317, contact: 327, stamina: 371 },
      speed: { running: 383, agility: 446 }
    },
    maxEnhanced: {
      overall: 14609,
      baseStats: { shoot: 2769, pass: 2707, dribble: 2834, defense: 2514, physical: 2584, speed: 1863 },
      detailStats: {
        shoot: { finishing: 949, power: 858, composure: 962 },
        pass: { shortPass: 930, longPass: 905, accuracy: 872 },
        dribble: { breakout: 936, keeping: 923, ballTouch: 975 },
        defense: { tackle: 840, interception: 839, marking: 835 },
        physical: { jumping: 828, contact: 850, stamina: 906 },
        speed: { running: 894, agility: 969 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '冷静なボールタッチ', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' },
      { name: 'ゴール前の嗅覚', rank: '銀', description: '発動条件：絶好調決　/　決定力・敏捷性UP'.replace('絶好調決', '絶好調') }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + kagawaObj, 'utf-8');
console.log('2. mockData.js updated with p311 (Shinji Kagawa) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('shinjikagawa2025Image.js')) {
  if (indexContent.includes('naokinomura2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/naokinomura2025Image.js"></script>',
      '<script src="./src/data/naokinomura2025Image.js"></script>\n  <script src="./src/data/shinjikagawa2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/shinjikagawa2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p311": "SHINJIKAGAWA_2025_IMAGE"')) {
  if (appJsxCode.includes('"p310": "NAOKINOMURA_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p310": "NAOKINOMURA_2025_IMAGE"',
      '"p310": "NAOKINOMURA_2025_IMAGE",\n  "p311": "SHINJIKAGAWA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p311 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p311": "SHINJIKAGAWA_2025_IMAGE"')) {
  if (appJsCode.includes('"p310": "NAOKINOMURA_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p310": "NAOKINOMURA_2025_IMAGE"',
      '"p310": "NAOKINOMURA_2025_IMAGE",\n  "p311": "SHINJIKAGAWA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p311 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p311 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p311');
console.log('6. Verification of p311:', p311 ? `${p311.name} (Overall: ${p311.overall}, maxOverall: ${p311.maxOverall}, Rarity: ${p311.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SHINJIKAGAWA_2025_IMAGE:', sandbox.window.SHINJIKAGAWA_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== SHINJI KAGAWA ADDED SUCCESSFULLY! ===');
