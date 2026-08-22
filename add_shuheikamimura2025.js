const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING SHUHEI KAMIMURA (p329) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787393542838.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'shuheikamimura2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SHUHEIKAMIMURA_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. shuheikamimura2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p328Idx = mockCode.indexOf("id: 'p328'");
if (p328Idx === -1) {
  console.error("Could not find p328 in mockData.js!");
  process.exit(1);
}

const p328AvatarIdx = mockCode.indexOf("avatarUrl:", p328Idx);
const p328EndIdx = mockCode.indexOf("}", p328AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p328EndIdx + 1);

const kamimuraObj = `,
  {
    id: 'p329',
    name: '上村周平',
    readingName: 'かみむら・しゅうへい',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6087,
    maxOverall: 14284,
    baseStats: { shoot: 868, pass: 1033, dribble: 1122, defense: 1171, physical: 1098, speed: 764 },
    detailStats: {
      shoot: { finishing: 285, power: 300, composure: 283 },
      pass: { shortPass: 376, longPass: 339, accuracy: 318 },
      dribble: { breakout: 348, keeping: 400, ballTouch: 374 },
      defense: { tackle: 385, interception: 389, marking: 397 },
      physical: { jumping: 354, contact: 362, stamina: 382 },
      speed: { running: 382, agility: 382 }
    },
    maxEnhanced: {
      overall: 14284,
      baseStats: { shoot: 2413, pass: 2638, dribble: 2655, defense: 2752, physical: 2667, speed: 1786 },
      detailStats: {
        shoot: { finishing: 796, power: 811, composure: 806 },
        pass: { shortPass: 911, longPass: 874, accuracy: 853 },
        dribble: { breakout: 859, keeping: 911, ballTouch: 885 },
        defense: { tackle: 920, interception: 912, marking: 920 },
        physical: { jumping: 865, contact: 885, stamina: 917 },
        speed: { running: 893, agility: 893 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：前中・中全・後全　/　発動条件：パスカット時　/　パスカット・タックルUP' },
    abilities: [
      { name: 'ピッチの掃除屋', rank: '銀', description: '発動条件：好調　/　タックル・スタミナUP' },
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + kamimuraObj, 'utf-8');
console.log('2. mockData.js updated with p329 (Shuhei Kamimura) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('shuheikamimura2025Image.js')) {
  if (indexContent.includes('daikimatsuoka2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/daikimatsuoka2025Image.js"></script>',
      '<script src="./src/data/daikimatsuoka2025Image.js"></script>\n  <script src="./src/data/shuheikamimura2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/shuheikamimura2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p329": "SHUHEIKAMIMURA_2025_IMAGE"')) {
  if (appJsxCode.includes('"p328": "DAIKIMATSUOKA_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p328": "DAIKIMATSUOKA_2025_IMAGE"',
      '"p328": "DAIKIMATSUOKA_2025_IMAGE",\n  "p329": "SHUHEIKAMIMURA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p329 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p329": "SHUHEIKAMIMURA_2025_IMAGE"')) {
  if (appJsCode.includes('"p328": "DAIKIMATSUOKA_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p328": "DAIKIMATSUOKA_2025_IMAGE"',
      '"p328": "DAIKIMATSUOKA_2025_IMAGE",\n  "p329": "SHUHEIKAMIMURA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p329 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p329 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p329');
console.log('6. Verification of p329:', p329 ? `${p329.name} (Overall: ${p329.overall}, maxOverall: ${p329.maxOverall}, Rarity: ${p329.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SHUHEIKAMIMURA_2025_IMAGE:', sandbox.window.SHUHEIKAMIMURA_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== SHUHEI KAMIMURA ADDED SUCCESSFULLY! ===');
