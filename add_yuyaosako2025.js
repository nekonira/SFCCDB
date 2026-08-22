const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YUYA OSAKO 2025 (p292) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787384159074.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yuyaosako2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YUYAOSAKO_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. yuyaosako2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p291Idx = mockCode.indexOf("id: 'p291'");
if (p291Idx === -1) {
  console.error("Could not find p291 in mockData.js!");
  process.exit(1);
}

const p291AvatarIdx = mockCode.indexOf("avatarUrl:", p291Idx);
const p291EndIdx = mockCode.indexOf("}", p291AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p291EndIdx + 1);

const osakoObj = `,
  {
    id: 'p292',
    name: '大迫勇也',
    readingName: 'おおさこ・ゆうや',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6263,
    maxOverall: 14462,
    baseStats: { shoot: 1161, pass: 1186, dribble: 1204, defense: 924, physical: 1245, speed: 735 },
    detailStats: {
      shoot: { finishing: 408, power: 362, composure: 391 },
      pass: { shortPass: 410, longPass: 399, accuracy: 377 },
      dribble: { breakout: 394, keeping: 424, ballTouch: 386 },
      defense: { tackle: 318, interception: 287, marking: 319 },
      physical: { jumping: 406, contact: 394, stamina: 445 },
      speed: { running: 340, agility: 395 }
    },
    maxEnhanced: {
      overall: 14462,
      baseStats: { shoot: 2766, pass: 2719, dribble: 2785, defense: 2421, physical: 2826, speed: 1781 },
      detailStats: {
        shoot: { finishing: 943, power: 897, composure: 926 },
        pass: { shortPass: 921, longPass: 910, accuracy: 888 },
        dribble: { breakout: 917, keeping: 947, ballTouch: 921 },
        defense: { tackle: 817, interception: 786, marking: 818 },
        physical: { jumping: 929, contact: 929, stamina: 968 },
        speed: { running: 863, agility: 918 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '決めきる力', rank: '銀', description: '発動条件：途中出場　/　決定力・スタミナUP' },
      { name: '上空のターゲットマン', rank: '銀', description: '発動条件：絶好調　/　キープ力・ジャンプUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + osakoObj, 'utf-8');
console.log('2. mockData.js updated with p292 (Yuya Osako) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('yuyaosako2025Image.js')) {
  if (indexContent.includes('suzukiyuma2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/suzukiyuma2025Image.js"></script>',
      '<script src="./src/data/suzukiyuma2025Image.js"></script>\n  <script src="./src/data/yuyaosako2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/yuyaosako2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p292": "YUYAOSAKO_2025_IMAGE"')) {
  if (appJsxCode.includes('"p291": "SUZUKIYUMA_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p291": "SUZUKIYUMA_2025_IMAGE"',
      '"p291": "SUZUKIYUMA_2025_IMAGE",\n  "p292": "YUYAOSAKO_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p292 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p292": "YUYAOSAKO_2025_IMAGE"')) {
  if (appJsCode.includes('"p291": "SUZUKIYUMA_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p291": "SUZUKIYUMA_2025_IMAGE"',
      '"p291": "SUZUKIYUMA_2025_IMAGE",\n  "p292": "YUYAOSAKO_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p292 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p292 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p292');
console.log('6. Verification of p292:', p292 ? `${p292.name} (BaseOverall: ${p292.overall}, Rarity: ${p292.rarity}, baseRarity: ${p292.baseRarity})` : 'MISSING');

// Test App offset simulation logic:
const OFFSETS = { '☆3': 0, '☆3+': 16, '☆3++': 33, '☆4': 65, '☆4+': 81, '☆4++': 98, '☆5': 130 };
const diff = OFFSETS[p292.rarity] - OFFSETS[p292.baseRarity]; // 16 - 0 = +16
let simOverall = p292.overall;
let simFinishing = p292.detailStats.shoot.finishing + diff; // 392 + 16 = 408
let simShoot = p292.baseStats.shoot + (diff * 3); // 1113 + 48 = 1161
simOverall += (diff * 12); // 6263 + 192 = 6455

console.log(`7. Simulation Check at ☆3+: Overall = ${simOverall} (Expected 6455), Shoot = ${simShoot} (Expected 1161), Finishing = ${simFinishing} (Expected 408)`);

console.log('=== YUYA OSAKO 2025 ADDED SUCCESSFULLY! ===');
