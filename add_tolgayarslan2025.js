const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TOLGAY ARSLAN (p315) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787390405409.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'tolgayarslan2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.TOLGAYARSLAN_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. tolgayarslan2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p314Idx = mockCode.indexOf("id: 'p314'");
if (p314Idx === -1) {
  console.error("Could not find p314 in mockData.js!");
  process.exit(1);
}

const p314AvatarIdx = mockCode.indexOf("avatarUrl:", p314Idx);
const p314EndIdx = mockCode.indexOf("}", p314AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p314EndIdx + 1);

const arslanObj = `,
  {
    id: 'p315',
    name: 'トルガイ・アルスラン',
    readingName: 'とるがい・あるすらん',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ドイツ',
    policy: 'ムービング',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6338,
    maxOverall: 14430,
    baseStats: { shoot: 1222, pass: 1104, dribble: 1250, defense: 1017, physical: 995, speed: 754 },
    detailStats: {
      shoot: { finishing: 411, power: 387, composure: 424 },
      pass: { shortPass: 370, longPass: 368, accuracy: 366 },
      dribble: { breakout: 409, keeping: 428, ballTouch: 413 },
      defense: { tackle: 304, interception: 367, marking: 346 },
      physical: { jumping: 303, contact: 338, stamina: 354 },
      speed: { running: 360, agility: 394 }
    },
    maxEnhanced: {
      overall: 14430,
      baseStats: { shoot: 2767, pass: 2685, dribble: 2819, defense: 2562, physical: 2564, speed: 1788 },
      detailStats: {
        shoot: { finishing: 922, power: 898, composure: 947 },
        pass: { shortPass: 905, longPass: 891, accuracy: 889 },
        dribble: { breakout: 932, keeping: 951, ballTouch: 936 },
        defense: { tackle: 827, interception: 878, marking: 857 },
        physical: { jumping: 814, contact: 861, stamina: 889 },
        speed: { running: 871, agility: 917 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' },
      { name: '冷静な突破', rank: '銀', description: '発動条件：絶好調　/　冷静さ・突破力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + arslanObj, 'utf-8');
console.log('2. mockData.js updated with p315 (Tolgay Arslan) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('tolgayarslan2025Image.js')) {
  if (indexContent.includes('renasakura2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/renasakura2025Image.js"></script>',
      '<script src="./src/data/renasakura2025Image.js"></script>\n  <script src="./src/data/tolgayarslan2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/tolgayarslan2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p315": "TOLGAYARSLAN_2025_IMAGE"')) {
  if (appJsxCode.includes('"p314": "RENASAKURA_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p314": "RENASAKURA_2025_IMAGE"',
      '"p314": "RENASAKURA_2025_IMAGE",\n  "p315": "TOLGAYARSLAN_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p315 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p315": "TOLGAYARSLAN_2025_IMAGE"')) {
  if (appJsCode.includes('"p314": "RENASAKURA_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p314": "RENASAKURA_2025_IMAGE"',
      '"p314": "RENASAKURA_2025_IMAGE",\n  "p315": "TOLGAYARSLAN_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p315 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p315 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p315');
console.log('6. Verification of p315:', p315 ? `${p315.name} (Overall: ${p315.overall}, maxOverall: ${p315.maxOverall}, Rarity: ${p315.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.TOLGAYARSLAN_2025_IMAGE:', sandbox.window.TOLGAYARSLAN_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== TOLGAY ARSLAN ADDED SUCCESSFULLY! ===');
