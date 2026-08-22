const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MARCUS VINICIUS (p302) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787387338500.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'marcusvinicius2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.MARCUSVINICIUS_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. marcusvinicius2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p301Idx = mockCode.indexOf("id: 'p301'");
if (p301Idx === -1) {
  console.error("Could not find p301 in mockData.js!");
  process.exit(1);
}

const p301AvatarIdx = mockCode.indexOf("avatarUrl:", p301Idx);
const p301EndIdx = mockCode.indexOf("}", p301AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p301EndIdx + 1);

const viniciusObj = `,
  {
    id: 'p302',
    name: 'マルクス・ヴィニシウス',
    readingName: 'まるくす・ヴぃにしうす',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'カウンター',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 5927,
    maxOverall: 14144,
    baseStats: { shoot: 1088, pass: 912, dribble: 1152, defense: 834, physical: 992, speed: 801 },
    detailStats: {
      shoot: { finishing: 383, power: 319, composure: 386 },
      pass: { shortPass: 311, longPass: 302, accuracy: 299 },
      dribble: { breakout: 399, keeping: 385, ballTouch: 368 },
      defense: { tackle: 293, interception: 280, marking: 261 },
      physical: { jumping: 297, contact: 322, stamina: 373 },
      speed: { running: 394, agility: 407 }
    },
    maxEnhanced: {
      overall: 14144,
      baseStats: { shoot: 2693, pass: 2445, dribble: 2733, defense: 2331, physical: 2573, speed: 1847 },
      detailStats: {
        shoot: { finishing: 918, power: 854, composure: 921 },
        pass: { shortPass: 822, longPass: 813, accuracy: 810 },
        dribble: { breakout: 922, keeping: 908, ballTouch: 903 },
        defense: { tackle: 792, interception: 779, marking: 760 },
        physical: { jumping: 820, contact: 857, stamina: 896 },
        speed: { running: 917, agility: 930 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' },
      { name: '強引なフィニッシュ', rank: '銀', description: '発動条件：途中出場　/　決定力・突破力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + viniciusObj, 'utf-8');
console.log('2. mockData.js updated with p302 (Marcus Vinicius) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('marcusvinicius2025Image.js')) {
  if (indexContent.includes('maohosoya2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/maohosoya2025Image.js"></script>',
      '<script src="./src/data/maohosoya2025Image.js"></script>\n  <script src="./src/data/marcusvinicius2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/marcusvinicius2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p302": "MARCUSVINICIUS_2025_IMAGE"')) {
  if (appJsxCode.includes('"p301": "MAOHOSOYA_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p301": "MAOHOSOYA_2025_IMAGE"',
      '"p301": "MAOHOSOYA_2025_IMAGE",\n  "p302": "MARCUSVINICIUS_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p302 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p302": "MARCUSVINICIUS_2025_IMAGE"')) {
  if (appJsCode.includes('"p301": "MAOHOSOYA_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p301": "MAOHOSOYA_2025_IMAGE"',
      '"p301": "MAOHOSOYA_2025_IMAGE",\n  "p302": "MARCUSVINICIUS_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p302 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p302 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p302');
console.log('6. Verification of p302:', p302 ? `${p302.name} (Overall: ${p302.overall}, maxOverall: ${p302.maxOverall}, Rarity: ${p302.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.MARCUSVINICIUS_2025_IMAGE:', sandbox.window.MARCUSVINICIUS_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== MARCUS VINICIUS ADDED SUCCESSFULLY! ===');
