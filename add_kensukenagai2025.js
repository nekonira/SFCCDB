const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KENSUKE NAGAI (p300) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787386829790.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kensukenagai2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KENSUKENAGAI_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kensukenagai2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p299Idx = mockCode.indexOf("id: 'p299'");
if (p299Idx === -1) {
  console.error("Could not find p299 in mockData.js!");
  process.exit(1);
}

const p299AvatarIdx = mockCode.indexOf("avatarUrl:", p299Idx);
const p299EndIdx = mockCode.indexOf("}", p299AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p299EndIdx + 1);

const nagaiObj = `,
  {
    id: 'p300',
    name: '永井謙佑',
    readingName: 'ながい・けんすけ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6092,
    maxOverall: 14286,
    baseStats: { shoot: 1090, pass: 1051, dribble: 1150, defense: 950, physical: 1027, speed: 862 },
    detailStats: {
      shoot: { finishing: 358, power: 368, composure: 364 },
      pass: { shortPass: 349, longPass: 352, accuracy: 350 },
      dribble: { breakout: 390, keeping: 396, ballTouch: 364 },
      defense: { tackle: 282, interception: 350, marking: 318 },
      physical: { jumping: 308, contact: 361, stamina: 358 },
      speed: { running: 477, agility: 385 }
    },
    maxEnhanced: {
      overall: 14286,
      baseStats: { shoot: 2695, pass: 2584, dribble: 2731, defense: 2447, physical: 2608, speed: 1908 },
      detailStats: {
        shoot: { finishing: 893, power: 903, composure: 899 },
        pass: { shortPass: 860, longPass: 863, accuracy: 861 },
        dribble: { breakout: 913, keeping: 919, ballTouch: 899 },
        defense: { tackle: 781, interception: 849, marking: 817 },
        physical: { jumping: 831, contact: 896, stamina: 881 },
        speed: { running: 1000, agility: 908 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: 'スピードドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・走力UP' },
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + nagaiObj, 'utf-8');
console.log('2. mockData.js updated with p300 (Nagai) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kensukenagai2025Image.js')) {
  if (indexContent.includes('kaitotaniguchi2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/kaitotaniguchi2025Image.js"></script>',
      '<script src="./src/data/kaitotaniguchi2025Image.js"></script>\n  <script src="./src/data/kensukenagai2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/kensukenagai2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p300": "KENSUKENAGAI_2025_IMAGE"')) {
  if (appJsxCode.includes('"p299": "KAITOTANIGUCHI_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p299": "KAITOTANIGUCHI_2025_IMAGE"',
      '"p299": "KAITOTANIGUCHI_2025_IMAGE",\n  "p300": "KENSUKENAGAI_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p300 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p300": "KENSUKENAGAI_2025_IMAGE"')) {
  if (appJsCode.includes('"p299": "KAITOTANIGUCHI_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p299": "KAITOTANIGUCHI_2025_IMAGE"',
      '"p299": "KAITOTANIGUCHI_2025_IMAGE",\n  "p300": "KENSUKENAGAI_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p300 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p300 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p300');
console.log('6. Verification of p300:', p300 ? `${p300.name} (Overall: ${p300.overall}, maxOverall: ${p300.maxOverall}, Rarity: ${p300.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KENSUKENAGAI_2025_IMAGE:', sandbox.window.KENSUKENAGAI_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KENSUKE NAGAI ADDED SUCCESSFULLY! ===');
