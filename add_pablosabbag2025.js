const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING PABLO SABBAG (p304) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787387733818.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'pablosabbag2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.PABLOSABBAG_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. pablosabbag2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p303Idx = mockCode.indexOf("id: 'p303'");
if (p303Idx === -1) {
  console.error("Could not find p303 in mockData.js!");
  process.exit(1);
}

const p303AvatarIdx = mockCode.indexOf("avatarUrl:", p303Idx);
const p303EndIdx = mockCode.indexOf("}", p303AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p303EndIdx + 1);

const sabbagObj = `,
  {
    id: 'p304',
    name: 'パブロ・サバグ',
    readingName: 'ぱぶろ・さばぐ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'シリア',
    policy: 'リアクション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6128,
    maxOverall: 14356,
    baseStats: { shoot: 1147, pass: 1162, dribble: 1172, defense: 928, physical: 1036, speed: 805 },
    detailStats: {
      shoot: { finishing: 413, power: 330, composure: 404 },
      pass: { shortPass: 399, longPass: 389, accuracy: 374 },
      dribble: { breakout: 398, keeping: 395, ballTouch: 379 },
      defense: { tackle: 309, interception: 314, marking: 305 },
      physical: { jumping: 420, contact: 241, stamina: 375 },
      speed: { running: 411, agility: 394 }
    },
    maxEnhanced: {
      overall: 14356,
      baseStats: { shoot: 2752, pass: 2695, dribble: 2753, defense: 2425, physical: 2617, speed: 1851 },
      detailStats: {
        shoot: { finishing: 948, power: 865, composure: 939 },
        pass: { shortPass: 910, longPass: 900, accuracy: 885 },
        dribble: { breakout: 921, keeping: 918, ballTouch: 914 },
        defense: { tackle: 808, interception: 813, marking: 804 },
        physical: { jumping: 943, contact: 776, stamina: 898 },
        speed: { running: 934, agility: 917 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '冷静なフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・冷静さUP' },
      { name: 'ランニングジャンパー', rank: '銀', description: '発動条件：絶好調　/　ジャンプ・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + sabbagObj, 'utf-8');
console.log('2. mockData.js updated with p304 (Pablo Sabbag) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('pablosabbag2025Image.js')) {
  if (indexContent.includes('marceloryan2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/marceloryan2025Image.js"></script>',
      '<script src="./src/data/marceloryan2025Image.js"></script>\n  <script src="./src/data/pablosabbag2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/pablosabbag2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p304": "PABLOSABBAG_2025_IMAGE"')) {
  if (appJsxCode.includes('"p303": "MARCELORYAN_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p303": "MARCELORYAN_2025_IMAGE"',
      '"p303": "MARCELORYAN_2025_IMAGE",\n  "p304": "PABLOSABBAG_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p304 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p304": "PABLOSABBAG_2025_IMAGE"')) {
  if (appJsCode.includes('"p303": "MARCELORYAN_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p303": "MARCELORYAN_2025_IMAGE"',
      '"p303": "MARCELORYAN_2025_IMAGE",\n  "p304": "PABLOSABBAG_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p304 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p304 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p304');
console.log('6. Verification of p304:', p304 ? `${p304.name} (Overall: ${p304.overall}, maxOverall: ${p304.maxOverall}, Rarity: ${p304.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.PABLOSABBAG_2025_IMAGE:', sandbox.window.PABLOSABBAG_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== PABLO SABBAG ADDED SUCCESSFULLY! ===');
