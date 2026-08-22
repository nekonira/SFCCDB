const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KAITO TANIGUCHI (p299) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787386635486.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kaitotaniguchi2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KAITOTANIGUCHI_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kaitotaniguchi2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p298Idx = mockCode.indexOf("id: 'p298'");
if (p298Idx === -1) {
  console.error("Could not find p298 in mockData.js!");
  process.exit(1);
}

const p298AvatarIdx = mockCode.indexOf("avatarUrl:", p298Idx);
const p298EndIdx = mockCode.indexOf("}", p298AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p298EndIdx + 1);

const taniguchiObj = `,
  {
    id: 'p299',
    name: '谷口海斗',
    readingName: 'たにぐち・かいと',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6150,
    maxOverall: 14378,
    baseStats: { shoot: 1099, pass: 1086, dribble: 1106, defense: 983, physical: 1081, speed: 815 },
    detailStats: {
      shoot: { finishing: 382, power: 340, composure: 377 },
      pass: { shortPass: 357, longPass: 364, accuracy: 365 },
      dribble: { breakout: 373, keeping: 358, ballTouch: 375 },
      defense: { tackle: 285, interception: 351, marking: 347 },
      physical: { jumping: 347, contact: 347, stamina: 387 },
      speed: { running: 401, agility: 414 }
    },
    maxEnhanced: {
      overall: 14378,
      baseStats: { shoot: 2704, pass: 2619, dribble: 2687, defense: 2480, physical: 2662, speed: 1861 },
      detailStats: {
        shoot: { finishing: 917, power: 875, composure: 912 },
        pass: { shortPass: 868, longPass: 875, accuracy: 876 },
        dribble: { breakout: 896, keeping: 881, ballTouch: 910 },
        defense: { tackle: 784, interception: 850, marking: 846 },
        physical: { jumping: 870, contact: 882, stamina: 910 },
        speed: { running: 924, agility: 937 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ゴール前の嗅覚', rank: '銀', description: '発動条件：絶好調　/　決定力・敏捷性UP' },
      { name: '冷静なランナー', rank: '銀', description: '発動条件：好調　/　冷静さ・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + taniguchiObj, 'utf-8');
console.log('2. mockData.js updated with p299 (Taniguchi) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kaitotaniguchi2025Image.js')) {
  if (indexContent.includes('disaro2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/disaro2025Image.js"></script>',
      '<script src="./src/data/disaro2025Image.js"></script>\n  <script src="./src/data/kaitotaniguchi2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/kaitotaniguchi2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p299": "KAITOTANIGUCHI_2025_IMAGE"')) {
  if (appJsxCode.includes('"p298": "DISARO_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p298": "DISARO_2025_IMAGE"',
      '"p298": "DISARO_2025_IMAGE",\n  "p299": "KAITOTANIGUCHI_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p299 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p299": "KAITOTANIGUCHI_2025_IMAGE"')) {
  if (appJsCode.includes('"p298": "DISARO_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p298": "DISARO_2025_IMAGE"',
      '"p298": "DISARO_2025_IMAGE",\n  "p299": "KAITOTANIGUCHI_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p299 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p299 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p299');
console.log('6. Verification of p299:', p299 ? `${p299.name} (Overall: ${p299.overall}, maxOverall: ${p299.maxOverall}, Rarity: ${p299.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KAITOTANIGUCHI_2025_IMAGE:', sandbox.window.KAITOTANIGUCHI_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KAITO TANIGUCHI ADDED SUCCESSFULLY! ===');
