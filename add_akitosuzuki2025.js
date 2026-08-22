const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING AKITO SUZUKI (p307) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787388930048.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'akitosuzuki2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.AKITOSUZUKI_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. akitosuzuki2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p306Idx = mockCode.indexOf("id: 'p306'");
if (p306Idx === -1) {
  console.error("Could not find p306 in mockData.js!");
  process.exit(1);
}

const p306AvatarIdx = mockCode.indexOf("avatarUrl:", p306Idx);
const p306EndIdx = mockCode.indexOf("}", p306AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p306EndIdx + 1);

const suzukiObj = `,
  {
    id: 'p307',
    name: '鈴木章斗',
    readingName: 'すずき・あきと',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6141,
    maxOverall: 14357,
    baseStats: { shoot: 1172, pass: 1090, dribble: 1135, defense: 933, physical: 1144, speed: 767 },
    detailStats: {
      shoot: { finishing: 403, power: 374, composure: 395 },
      pass: { shortPass: 362, longPass: 351, accuracy: 377 },
      dribble: { breakout: 381, keeping: 393, ballTouch: 361 },
      defense: { tackle: 378, interception: 283, marking: 272 },
      physical: { jumping: 386, contact: 351, stamina: 407 },
      speed: { running: 369, agility: 398 }
    },
    maxEnhanced: {
      overall: 14357,
      baseStats: { shoot: 2777, pass: 2623, dribble: 2716, defense: 2430, physical: 2725, speed: 1813 },
      detailStats: {
        shoot: { finishing: 938, power: 909, composure: 930 },
        pass: { shortPass: 873, longPass: 862, accuracy: 888 },
        dribble: { breakout: 904, keeping: 916, ballTouch: 896 },
        defense: { tackle: 877, interception: 782, marking: 771 },
        physical: { jumping: 909, contact: 886, stamina: 930 },
        speed: { running: 892, agility: 921 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '決めきる力', rank: '銀', description: '発動条件：途中出場　/　決定力・スタミナUP' },
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + suzukiObj, 'utf-8');
console.log('2. mockData.js updated with p307 (Akito Suzuki) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('akitosuzuki2025Image.js')) {
  if (indexContent.includes('rafaelelias2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/rafaelelias2025Image.js"></script>',
      '<script src="./src/data/rafaelelias2025Image.js"></script>\n  <script src="./src/data/akitosuzuki2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/akitosuzuki2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p307": "AKITOSUZUKI_2025_IMAGE"')) {
  if (appJsxCode.includes('"p306": "RAFAELELIAS_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p306": "RAFAELELIAS_2025_IMAGE"',
      '"p306": "RAFAELELIAS_2025_IMAGE",\n  "p307": "AKITOSUZUKI_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p307 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p307": "AKITOSUZUKI_2025_IMAGE"')) {
  if (appJsCode.includes('"p306": "RAFAELELIAS_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p306": "RAFAELELIAS_2025_IMAGE"',
      '"p306": "RAFAELELIAS_2025_IMAGE",\n  "p307": "AKITOSUZUKI_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p307 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p307 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p307');
console.log('6. Verification of p307:', p307 ? `${p307.name} (Overall: ${p307.overall}, maxOverall: ${p307.maxOverall}, Rarity: ${p307.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.AKITOSUZUKI_2025_IMAGE:', sandbox.window.AKITOSUZUKI_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== AKITO SUZUKI ADDED SUCCESSFULLY! ===');
