const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING DAIKI WATARI (p297) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787386271801.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'daikiwatari2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.DAIKIWATARI_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. daikiwatari2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p296Idx = mockCode.indexOf("id: 'p296'");
if (p296Idx === -1) {
  console.error("Could not find p296 in mockData.js!");
  process.exit(1);
}

const p296AvatarIdx = mockCode.indexOf("avatarUrl:", p296Idx);
const p296EndIdx = mockCode.indexOf("}", p296AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p296EndIdx + 1);

const watariObj = `,
  {
    id: 'p297',
    name: '渡大生',
    readingName: 'わたり・だいき',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6002,
    maxOverall: 14220,
    baseStats: { shoot: 1120, pass: 1082, dribble: 1126, defense: 1049, physical: 1087, speed: 759 },
    detailStats: {
      shoot: { finishing: 354, power: 381, composure: 385 },
      pass: { shortPass: 349, longPass: 360, accuracy: 373 },
      dribble: { breakout: 375, keeping: 375, ballTouch: 376 },
      defense: { tackle: 344, interception: 346, marking: 359 },
      physical: { jumping: 364, contact: 372, stamina: 351 },
      speed: { running: 371, agility: 388 }
    },
    maxEnhanced: {
      overall: 14220,
      baseStats: { shoot: 2725, pass: 2615, dribble: 2707, defense: 2546, physical: 2668, speed: 1805 },
      detailStats: {
        shoot: { finishing: 889, power: 916, composure: 920 },
        pass: { shortPass: 860, longPass: 871, accuracy: 884 },
        dribble: { breakout: 898, keeping: 898, ballTouch: 911 },
        defense: { tackle: 843, interception: 845, marking: 858 },
        physical: { jumping: 887, contact: 907, stamina: 874 },
        speed: { running: 894, agility: 911 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '冷静なボールタッチ', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' },
      { name: 'アジャイルキッカー', rank: '銀', description: '発動条件：絶好調　/　キック力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + watariObj, 'utf-8');
console.log('2. mockData.js updated with p297 (Daiki Watari) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('daikiwatari2025Image.js')) {
  if (indexContent.includes('kazushimitsuhira2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/kazushimitsuhira2025Image.js"></script>',
      '<script src="./src/data/kazushimitsuhira2025Image.js"></script>\n  <script src="./src/data/daikiwatari2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/daikiwatari2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p297": "DAIKIWATARI_2025_IMAGE"')) {
  if (appJsxCode.includes('"p296": "KAZUSHIMITSUHIRA_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p296": "KAZUSHIMITSUHIRA_2025_IMAGE"',
      '"p296": "KAZUSHIMITSUHIRA_2025_IMAGE",\n  "p297": "DAIKIWATARI_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p297 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p297": "DAIKIWATARI_2025_IMAGE"')) {
  if (appJsCode.includes('"p296": "KAZUSHIMITSUHIRA_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p296": "KAZUSHIMITSUHIRA_2025_IMAGE"',
      '"p296": "KAZUSHIMITSUHIRA_2025_IMAGE",\n  "p297": "DAIKIWATARI_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p297 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p297 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p297');
console.log('6. Verification of p297:', p297 ? `${p297.name} (Overall: ${p297.overall}, maxOverall: ${p297.maxOverall}, Rarity: ${p297.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.DAIKIWATARI_2025_IMAGE:', sandbox.window.DAIKIWATARI_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== DAIKI WATARI ADDED SUCCESSFULLY! ===');
