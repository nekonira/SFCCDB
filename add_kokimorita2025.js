const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KOKI MORITA (p323) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787392320020.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kokimorita2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KOKIMORITA_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kokimorita2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p322Idx = mockCode.indexOf("id: 'p322'");
if (p322Idx === -1) {
  console.error("Could not find p322 in mockData.js!");
  process.exit(1);
}

const p322AvatarIdx = mockCode.indexOf("avatarUrl:", p322Idx);
const p322EndIdx = mockCode.indexOf("}", p322AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p322EndIdx + 1);

const moritaObj = `,
  {
    id: 'p323',
    name: '森田晃樹',
    readingName: 'もりた・こうき',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 6114,
    maxOverall: 14247,
    baseStats: { shoot: 991, pass: 1110, dribble: 1248, defense: 1186, physical: 1037, speed: 835 },
    detailStats: {
      shoot: { finishing: 322, power: 342, composure: 327 },
      pass: { shortPass: 388, longPass: 364, accuracy: 358 },
      dribble: { breakout: 395, keeping: 411, ballTouch: 442 },
      defense: { tackle: 401, interception: 393, marking: 392 },
      physical: { jumping: 326, contact: 314, stamina: 397 },
      speed: { running: 394, agility: 441 }
    },
    maxEnhanced: {
      overall: 14247,
      baseStats: { shoot: 2536, pass: 2715, dribble: 2781, defense: 2767, physical: 2606, speed: 1857 },
      detailStats: {
        shoot: { finishing: 833, power: 853, composure: 850 },
        pass: { shortPass: 923, longPass: 899, accuracy: 893 },
        dribble: { breakout: 906, keeping: 922, ballTouch: 953 },
        defense: { tackle: 936, interception: 916, marking: 915 },
        physical: { jumping: 837, contact: 837, stamina: 932 },
        speed: { running: 905, agility: 952 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: '華麗なボール奪取', rank: '銀', description: '発動条件：途中出場　/　ボールタッチ・タックルUP' },
      { name: '無限のアジリティ', rank: '銀', description: '発動条件：好調　/　スタミナ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + moritaObj, 'utf-8');
console.log('2. mockData.js updated with p323 (Koki Morita) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kokimorita2025Image.js')) {
  if (indexContent.includes('shuntatanaka2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/shuntatanaka2025Image.js"></script>',
      '<script src="./src/data/shuntatanaka2025Image.js"></script>\n  <script src="./src/data/kokimorita2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/kokimorita2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p323": "KOKIMORITA_2025_IMAGE"')) {
  if (appJsxCode.includes('"p322": "SHUNTATANAKA_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p322": "SHUNTATANAKA_2025_IMAGE"',
      '"p322": "SHUNTATANAKA_2025_IMAGE",\n  "p323": "KOKIMORITA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p323 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p323": "KOKIMORITA_2025_IMAGE"')) {
  if (appJsCode.includes('"p322": "SHUNTATANAKA_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p322": "SHUNTATANAKA_2025_IMAGE"',
      '"p322": "SHUNTATANAKA_2025_IMAGE",\n  "p323": "KOKIMORITA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p323 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p323 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p323');
console.log('6. Verification of p323:', p323 ? `${p323.name} (Overall: ${p323.overall}, maxOverall: ${p323.maxOverall}, Rarity: ${p323.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KOKIMORITA_2025_IMAGE:', sandbox.window.KOKIMORITA_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KOKI MORITA ADDED SUCCESSFULLY! ===');
