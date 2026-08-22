const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING OH SE HUN (p293) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787385404543.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'ohsehun2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.OHSEHUN_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. ohsehun2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p292Idx = mockCode.indexOf("id: 'p292'");
if (p292Idx === -1) {
  console.error("Could not find p292 in mockData.js!");
  process.exit(1);
}

const p292AvatarIdx = mockCode.indexOf("avatarUrl:", p292Idx);
const p292EndIdx = mockCode.indexOf("}", p292AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p292EndIdx + 1);

const ohsehunObj = `,
  {
    id: 'p293',
    name: 'オ・セフン',
    readingName: 'お・せふん',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'カウンター',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6228,
    maxOverall: 14478,
    baseStats: { shoot: 1091, pass: 1026, dribble: 1089, defense: 902, physical: 1203, speed: 698 },
    detailStats: {
      shoot: { finishing: 342, power: 395, composure: 354 },
      pass: { shortPass: 353, longPass: 346, accuracy: 327 },
      dribble: { breakout: 347, keeping: 371, ballTouch: 371 },
      defense: { tackle: 290, interception: 316, marking: 296 },
      physical: { jumping: 392, contact: 455, stamina: 356 },
      speed: { running: 336, agility: 362 }
    },
    maxEnhanced: {
      overall: 14478,
      baseStats: { shoot: 2696, pass: 2559, dribble: 2670, defense: 2399, physical: 2784, speed: 1744 },
      detailStats: {
        shoot: { finishing: 877, power: 930, composure: 889 },
        pass: { shortPass: 864, longPass: 857, accuracy: 838 },
        dribble: { breakout: 870, keeping: 894, ballTouch: 906 },
        defense: { tackle: 789, interception: 815, marking: 795 },
        physical: { jumping: 915, contact: 990, stamina: 879 },
        speed: { running: 859, agility: 885 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '確信のロングシュート', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：シュート・ロングシュート時　/　決定力・キック力UP' },
    abilities: [
      { name: 'パワフルジャンパー', rank: '銀', description: '発動条件：好調　/　ジャンプ・コンタクトUP' },
      { name: '柔と剛のタッチ', rank: '銀', description: '発動条件：途中出場　/　キック力・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + ohsehunObj, 'utf-8');
console.log('2. mockData.js updated with p293 (Oh Se Hun) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('ohsehun2025Image.js')) {
  if (indexContent.includes('yuyaosako2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/yuyaosako2025Image.js"></script>',
      '<script src="./src/data/yuyaosako2025Image.js"></script>\n  <script src="./src/data/ohsehun2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/ohsehun2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p293": "OHSEHUN_2025_IMAGE"')) {
  if (appJsxCode.includes('"p292": "YUYAOSAKO_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p292": "YUYAOSAKO_2025_IMAGE"',
      '"p292": "YUYAOSAKO_2025_IMAGE",\n  "p293": "OHSEHUN_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p293 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p293": "OHSEHUN_2025_IMAGE"')) {
  if (appJsCode.includes('"p292": "YUYAOSAKO_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p292": "YUYAOSAKO_2025_IMAGE"',
      '"p292": "YUYAOSAKO_2025_IMAGE",\n  "p293": "OHSEHUN_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p293 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p293 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p293');
console.log('6. Verification of p293:', p293 ? `${p293.name} (Overall: ${p293.overall}, maxOverall: ${p293.maxOverall}, Rarity: ${p293.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.OHSEHUN_2025_IMAGE:', sandbox.window.OHSEHUN_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== OH SE HUN ADDED SUCCESSFULLY! ===');
