const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TAKASHI USAMI (p312) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787389847717.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'takashiusami2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.TAKASHIUSAMI_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. takashiusami2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p311Idx = mockCode.indexOf("id: 'p311'");
if (p311Idx === -1) {
  console.error("Could not find p311 in mockData.js!");
  process.exit(1);
}

const p311AvatarIdx = mockCode.indexOf("avatarUrl:", p311Idx);
const p311EndIdx = mockCode.indexOf("}", p311AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p311EndIdx + 1);

const usamiObj = `,
  {
    id: 'p312',
    name: '宇佐美貴史',
    readingName: 'うさみ・たかし',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6303,
    maxOverall: 14390,
    baseStats: { shoot: 1186, pass: 1154, dribble: 1250, defense: 743, physical: 955, speed: 839 },
    detailStats: {
      shoot: { finishing: 413, power: 367, composure: 406 },
      pass: { shortPass: 381, longPass: 365, accuracy: 408 },
      dribble: { breakout: 413, keeping: 405, ballTouch: 432 },
      defense: { tackle: 258, interception: 248, marking: 237 },
      physical: { jumping: 330, contact: 313, stamina: 312 },
      speed: { running: 395, agility: 444 }
    },
    maxEnhanced: {
      overall: 14390,
      baseStats: { shoot: 2731, pass: 2735, dribble: 2819, defense: 2288, physical: 2524, speed: 1873 },
      detailStats: {
        shoot: { finishing: 924, power: 878, composure: 929 },
        pass: { shortPass: 916, longPass: 888, accuracy: 931 },
        dribble: { breakout: 936, keeping: 928, ballTouch: 955 },
        defense: { tackle: 781, interception: 759, marking: 748 },
        physical: { jumping: 841, contact: 836, stamina: 847 },
        speed: { running: 906, agility: 967 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '柔軟なキッカー', rank: '銀', description: '発動条件：途中出場　/　キック精度・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + usamiObj, 'utf-8');
console.log('2. mockData.js updated with p312 (Takashi Usami) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('takashiusami2025Image.js')) {
  if (indexContent.includes('shinjikagawa2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/shinjikagawa2025Image.js"></script>',
      '<script src="./src/data/shinjikagawa2025Image.js"></script>\n  <script src="./src/data/takashiusami2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/takashiusami2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p312": "TAKASHIUSAMI_2025_IMAGE"')) {
  if (appJsxCode.includes('"p311": "SHINJIKAGAWA_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p311": "SHINJIKAGAWA_2025_IMAGE"',
      '"p311": "SHINJIKAGAWA_2025_IMAGE",\n  "p312": "TAKASHIUSAMI_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p312 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p312": "TAKASHIUSAMI_2025_IMAGE"')) {
  if (appJsCode.includes('"p311": "SHINJIKAGAWA_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p311": "SHINJIKAGAWA_2025_IMAGE"',
      '"p311": "SHINJIKAGAWA_2025_IMAGE",\n  "p312": "TAKASHIUSAMI_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p312 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p312 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p312');
console.log('6. Verification of p312:', p312 ? `${p312.name} (Overall: ${p312.overall}, maxOverall: ${p312.maxOverall}, Rarity: ${p312.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.TAKASHIUSAMI_2025_IMAGE:', sandbox.window.TAKASHIUSAMI_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== TAKASHI USAMI ADDED SUCCESSFULLY! ===');
