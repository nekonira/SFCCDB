const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YURI LARA (p327) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787393270685.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yurilara2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YURILARA_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. yurilara2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p326Idx = mockCode.indexOf("id: 'p326'");
if (p326Idx === -1) {
  console.error("Could not find p326 in mockData.js!");
  process.exit(1);
}

const p326AvatarIdx = mockCode.indexOf("avatarUrl:", p326Idx);
const p326EndIdx = mockCode.indexOf("}", p326AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p326EndIdx + 1);

const yuriObj = `,
  {
    id: 'p327',
    name: 'ユーリ・ララ',
    readingName: 'ゆーり・らら',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'リアクション',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6115,
    maxOverall: 14244,
    baseStats: { shoot: 1055, pass: 1071, dribble: 1158, defense: 1189, physical: 1153, speed: 801 },
    detailStats: {
      shoot: { finishing: 364, power: 325, composure: 366 },
      pass: { shortPass: 358, longPass: 357, accuracy: 356 },
      dribble: { breakout: 367, keeping: 416, ballTouch: 375 },
      defense: { tackle: 390, interception: 405, marking: 394 },
      physical: { jumping: 389, contact: 398, stamina: 366 },
      speed: { running: 380, agility: 421 }
    },
    maxEnhanced: {
      overall: 14244,
      baseStats: { shoot: 2600, pass: 2676, dribble: 2691, defense: 2770, physical: 2722, speed: 1823 },
      detailStats: {
        shoot: { finishing: 875, power: 836, composure: 889 },
        pass: { shortPass: 893, longPass: 892, accuracy: 891 },
        dribble: { breakout: 878, keeping: 927, ballTouch: 886 },
        defense: { tackle: 925, interception: 928, marking: 917 },
        physical: { jumping: 900, contact: 921, stamina: 901 },
        speed: { running: 891, agility: 932 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：前中・中全・後全　/　発動条件：パスカット時　/　パスカット・タックルUP' },
    abilities: [
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' },
      { name: 'ボールスティーラー', rank: '銀', description: '発動条件：途中出場　/　タックル・パスカットUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + yuriObj, 'utf-8');
console.log('2. mockData.js updated with p327 (Yuri Lara) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('yurilara2025Image.js')) {
  if (indexContent.includes('takuyakida2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/takuyakida2025Image.js"></script>',
      '<script src="./src/data/takuyakida2025Image.js"></script>\n  <script src="./src/data/yurilara2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/yurilara2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p327": "YURILARA_2025_IMAGE"')) {
  if (appJsxCode.includes('"p326": "TAKUYAKIDA_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p326": "TAKUYAKIDA_2025_IMAGE"',
      '"p326": "TAKUYAKIDA_2025_IMAGE",\n  "p327": "YURILARA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p327 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p327": "YURILARA_2025_IMAGE"')) {
  if (appJsCode.includes('"p326": "TAKUYAKIDA_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p326": "TAKUYAKIDA_2025_IMAGE"',
      '"p326": "TAKUYAKIDA_2025_IMAGE",\n  "p327": "YURILARA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p327 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p327 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p327');
console.log('6. Verification of p327:', p327 ? `${p327.name} (Overall: ${p327.overall}, maxOverall: ${p327.maxOverall}, Rarity: ${p327.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.YURILARA_2025_IMAGE:', sandbox.window.YURILARA_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== YURI LARA ADDED SUCCESSFULLY! ===');
