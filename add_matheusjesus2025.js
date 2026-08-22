const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MATHEUS JESUS (p316) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787390658738.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'matheusjesus2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.MATHEUSJESUS_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. matheusjesus2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p315Idx = mockCode.indexOf("id: 'p315'");
if (p315Idx === -1) {
  console.error("Could not find p315 in mockData.js!");
  process.exit(1);
}

const p315AvatarIdx = mockCode.indexOf("avatarUrl:", p315Idx);
const p315EndIdx = mockCode.indexOf("}", p315AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p315EndIdx + 1);

const jesusObj = `,
  {
    id: 'p316',
    name: 'マテウス・ジェズス',
    readingName: 'まてうす・じぇずす',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'リアクション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6302,
    maxOverall: 14401,
    baseStats: { shoot: 1230, pass: 1096, dribble: 1203, defense: 1016, physical: 1169, speed: 750 },
    detailStats: {
      shoot: { finishing: 412, power: 410, composure: 408 },
      pass: { shortPass: 365, longPass: 375, accuracy: 356 },
      dribble: { breakout: 405, keeping: 424, ballTouch: 374 },
      defense: { tackle: 326, interception: 352, marking: 338 },
      physical: { jumping: 369, contact: 399, stamina: 401 },
      speed: { running: 391, agility: 359 }
    },
    maxEnhanced: {
      overall: 14401,
      baseStats: { shoot: 2775, pass: 2677, dribble: 2772, defense: 2561, physical: 2738, speed: 1784 },
      detailStats: {
        shoot: { finishing: 923, power: 921, composure: 931 },
        pass: { shortPass: 900, longPass: 898, accuracy: 879 },
        dribble: { breakout: 928, keeping: 947, ballTouch: 897 },
        defense: { tackle: 849, interception: 863, marking: 849 },
        physical: { jumping: 880, contact: 922, stamina: 936 },
        speed: { running: 902, agility: 882 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '冷静なボールキープ', rank: '銀', description: '発動条件：好調　/　冷静さ・キープ力UP' },
      { name: '不屈のドリブル突破', rank: '銀', description: '発動条件：絶好調　/　突破力・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + jesusObj, 'utf-8');
console.log('2. mockData.js updated with p316 (Matheus Jesus) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('matheusjesus2025Image.js')) {
  if (indexContent.includes('tolgayarslan2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/tolgayarslan2025Image.js"></script>',
      '<script src="./src/data/tolgayarslan2025Image.js"></script>\n  <script src="./src/data/matheusjesus2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/matheusjesus2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p316": "MATHEUSJESUS_2025_IMAGE"')) {
  if (appJsxCode.includes('"p315": "TOLGAYARSLAN_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p315": "TOLGAYARSLAN_2025_IMAGE"',
      '"p315": "TOLGAYARSLAN_2025_IMAGE",\n  "p316": "MATHEUSJESUS_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p316 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p316": "MATHEUSJESUS_2025_IMAGE"')) {
  if (appJsCode.includes('"p315": "TOLGAYARSLAN_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p315": "TOLGAYARSLAN_2025_IMAGE"',
      '"p315": "TOLGAYARSLAN_2025_IMAGE",\n  "p316": "MATHEUSJESUS_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p316 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p316 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p316');
console.log('6. Verification of p316:', p316 ? `${p316.name} (Overall: ${p316.overall}, maxOverall: ${p316.maxOverall}, Rarity: ${p316.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.MATHEUSJESUS_2025_IMAGE:', sandbox.window.MATHEUSJESUS_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== MATHEUS JESUS ADDED SUCCESSFULLY! ===');
