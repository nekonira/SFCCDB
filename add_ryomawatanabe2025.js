const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING RYOMA WATANABE (p313) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787390089435.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'ryomawatanabe2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.RYOMAWATANABE_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. ryomawatanabe2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p312Idx = mockCode.indexOf("id: 'p312'");
if (p312Idx === -1) {
  console.error("Could not find p312 in mockData.js!");
  process.exit(1);
}

const p312AvatarIdx = mockCode.indexOf("avatarUrl:", p312Idx);
const p312EndIdx = mockCode.indexOf("}", p312AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p312EndIdx + 1);

const watanabeObj = `,
  {
    id: 'p313',
    name: '渡邊凌磨',
    readingName: 'わたなべ・りょうま',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6273,
    maxOverall: 14358,
    baseStats: { shoot: 1156, pass: 1161, dribble: 1220, defense: 1024, physical: 1082, speed: 780 },
    detailStats: {
      shoot: { finishing: 388, power: 387, composure: 381 },
      pass: { shortPass: 387, longPass: 386, accuracy: 388 },
      dribble: { breakout: 416, keeping: 407, ballTouch: 397 },
      defense: { tackle: 329, interception: 358, marking: 337 },
      physical: { jumping: 311, contact: 355, stamina: 416 },
      speed: { running: 379, agility: 401 }
    },
    maxEnhanced: {
      overall: 14358,
      baseStats: { shoot: 2701, pass: 2742, dribble: 2789, defense: 2569, physical: 2651, speed: 1814 },
      detailStats: {
        shoot: { finishing: 899, power: 898, composure: 904 },
        pass: { shortPass: 922, longPass: 909, accuracy: 911 },
        dribble: { breakout: 939, keeping: 930, ballTouch: 920 },
        defense: { tackle: 852, interception: 869, marking: 848 },
        physical: { jumping: 822, contact: 878, stamina: 951 },
        speed: { running: 890, agility: 924 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '不屈の魂', rank: '銀', description: '発動条件：好調　/　キープ力・スタミナUP' },
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + watanabeObj, 'utf-8');
console.log('2. mockData.js updated with p313 (Ryoma Watanabe) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('ryomawatanabe2025Image.js')) {
  if (indexContent.includes('takashiusami2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/takashiusami2025Image.js"></script>',
      '<script src="./src/data/takashiusami2025Image.js"></script>\n  <script src="./src/data/ryomawatanabe2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/ryomawatanabe2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p313": "RYOMAWATANABE_2025_IMAGE"')) {
  if (appJsxCode.includes('"p312": "TAKASHIUSAMI_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p312": "TAKASHIUSAMI_2025_IMAGE"',
      '"p312": "TAKASHIUSAMI_2025_IMAGE",\n  "p313": "RYOMAWATANABE_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p313 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p313": "RYOMAWATANABE_2025_IMAGE"')) {
  if (appJsCode.includes('"p312": "TAKASHIUSAMI_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p312": "TAKASHIUSAMI_2025_IMAGE"',
      '"p312": "TAKASHIUSAMI_2025_IMAGE",\n  "p313": "RYOMAWATANABE_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p313 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p313 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p313');
console.log('6. Verification of p313:', p313 ? `${p313.name} (Overall: ${p313.overall}, maxOverall: ${p313.maxOverall}, Rarity: ${p313.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.RYOMAWATANABE_2025_IMAGE:', sandbox.window.RYOMAWATANABE_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== RYOMA WATANABE ADDED SUCCESSFULLY! ===');
