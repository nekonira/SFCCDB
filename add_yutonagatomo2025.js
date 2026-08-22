const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YUTO NAGATOMO (p330) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787393724649.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yutonagatomo2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YUTONAGATOMO_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. yutonagatomo2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p329Idx = mockCode.indexOf("id: 'p329'");
if (p329Idx === -1) {
  console.error("Could not find p329 in mockData.js!");
  process.exit(1);
}

const p329AvatarIdx = mockCode.indexOf("avatarUrl:", p329Idx);
const p329EndIdx = mockCode.indexOf("}", p329AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p329EndIdx + 1);

const nagatomoObj = `,
  {
    id: 'p330',
    name: '長友佑都',
    readingName: 'ながとも・ゆうと',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: '攻撃的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 6434,
    maxOverall: 14682,
    baseStats: { shoot: 906, pass: 1080, dribble: 1077, defense: 1184, physical: 1152, speed: 835 },
    detailStats: {
      shoot: { finishing: 270, power: 331, composure: 305 },
      pass: { shortPass: 343, longPass: 403, accuracy: 334 },
      dribble: { breakout: 375, keeping: 345, ballTouch: 357 },
      defense: { tackle: 382, interception: 397, marking: 405 },
      physical: { jumping: 343, contact: 353, stamina: 456 },
      speed: { running: 412, agility: 423 }
    },
    maxEnhanced: {
      overall: 14682,
      baseStats: { shoot: 2403, pass: 2649, dribble: 2610, defense: 2789, physical: 2721, speed: 1905 },
      detailStats: {
        shoot: { finishing: 769, power: 830, composure: 804 },
        pass: { shortPass: 866, longPass: 926, accuracy: 857 },
        dribble: { breakout: 886, keeping: 856, ballTouch: 868 },
        defense: { tackle: 917, interception: 932, marking: 940 },
        physical: { jumping: 854, contact: 876, stamina: 991 },
        speed: { running: 947, agility: 958 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'コントロールフィード', rank: '銅', description: '発動エリア：中左右・後左右　/　発動条件：ロングパス時　/　ロングパス・キック精度UP' },
    abilities: [
      { name: 'マラソンマン', rank: '銀', description: '発動条件：途中出場　/　スタミナ・走力UP' },
      { name: 'アジャイルマーカー', rank: '銀', description: '発動条件：途中出場　/　マーク・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + nagatomoObj, 'utf-8');
console.log('2. mockData.js updated with p330 (Yuto Nagatomo) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('yutonagatomo2025Image.js')) {
  if (indexContent.includes('shuheikamimura2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/shuheikamimura2025Image.js"></script>',
      '<script src="./src/data/shuheikamimura2025Image.js"></script>\n  <script src="./src/data/yutonagatomo2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/yutonagatomo2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p330": "YUTONAGATOMO_2025_IMAGE"')) {
  if (appJsxCode.includes('"p329": "SHUHEIKAMIMURA_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p329": "SHUHEIKAMIMURA_2025_IMAGE"',
      '"p329": "SHUHEIKAMIMURA_2025_IMAGE",\n  "p330": "YUTONAGATOMO_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p330 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p330": "YUTONAGATOMO_2025_IMAGE"')) {
  if (appJsCode.includes('"p329": "SHUHEIKAMIMURA_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p329": "SHUHEIKAMIMURA_2025_IMAGE"',
      '"p329": "SHUHEIKAMIMURA_2025_IMAGE",\n  "p330": "YUTONAGATOMO_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p330 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p330 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p330');
console.log('6. Verification of p330:', p330 ? `${p330.name} (Overall: ${p330.overall}, maxOverall: ${p330.maxOverall}, Rarity: ${p330.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.YUTONAGATOMO_2025_IMAGE:', sandbox.window.YUTONAGATOMO_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== YUTO NAGATOMO ADDED SUCCESSFULLY! ===');
