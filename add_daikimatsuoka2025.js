const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING DAIKI MATSUOKA (p328) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787393406154.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'daikimatsuoka2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.DAIKIMATSUOKA_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. daikimatsuoka2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p327Idx = mockCode.indexOf("id: 'p327'");
if (p327Idx === -1) {
  console.error("Could not find p327 in mockData.js!");
  process.exit(1);
}

const p327AvatarIdx = mockCode.indexOf("avatarUrl:", p327Idx);
const p327EndIdx = mockCode.indexOf("}", p327AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p327EndIdx + 1);

const matsuokaObj = `,
  {
    id: 'p328',
    name: '松岡大起',
    readingName: 'まつおか・だいき',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6116,
    maxOverall: 14265,
    baseStats: { shoot: 958, pass: 1100, dribble: 999, defense: 1229, physical: 1103, speed: 806 },
    detailStats: {
      shoot: { finishing: 303, power: 345, composure: 310 },
      pass: { shortPass: 409, longPass: 367, accuracy: 324 },
      dribble: { breakout: 341, keeping: 283, ballTouch: 375 },
      defense: { tackle: 385, interception: 424, marking: 420 },
      physical: { jumping: 310, contact: 410, stamina: 383 },
      speed: { running: 371, agility: 435 }
    },
    maxEnhanced: {
      overall: 14265,
      baseStats: { shoot: 2503, pass: 2705, dribble: 2532, defense: 2810, physical: 2672, speed: 1828 },
      detailStats: {
        shoot: { finishing: 814, power: 856, composure: 833 },
        pass: { shortPass: 944, longPass: 902, accuracy: 859 },
        dribble: { breakout: 852, keeping: 794, ballTouch: 886 },
        defense: { tackle: 920, interception: 947, marking: 943 },
        physical: { jumping: 821, contact: 933, stamina: 918 },
        speed: { running: 882, agility: 946 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：前中・中全・後全　/　発動条件：パスカット時　/　パスカット・タックルUP' },
    abilities: [
      { name: '分断のパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・パスカットUP' },
      { name: 'アジャイルマーカー', rank: '銀', description: '発動条件：途中出場　/　マーク・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + matsuokaObj, 'utf-8');
console.log('2. mockData.js updated with p328 (Daiki Matsuoka) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('daikimatsuoka2025Image.js')) {
  if (indexContent.includes('yurilara2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/yurilara2025Image.js"></script>',
      '<script src="./src/data/yurilara2025Image.js"></script>\n  <script src="./src/data/daikimatsuoka2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/daikimatsuoka2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p328": "DAIKIMATSUOKA_2025_IMAGE"')) {
  if (appJsxCode.includes('"p327": "YURILARA_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p327": "YURILARA_2025_IMAGE"',
      '"p327": "YURILARA_2025_IMAGE",\n  "p328": "DAIKIMATSUOKA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p328 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p328": "DAIKIMATSUOKA_2025_IMAGE"')) {
  if (appJsCode.includes('"p327": "YURILARA_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p327": "YURILARA_2025_IMAGE"',
      '"p327": "YURILARA_2025_IMAGE",\n  "p328": "DAIKIMATSUOKA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p328 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p328 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p328');
console.log('6. Verification of p328:', p328 ? `${p328.name} (Overall: ${p328.overall}, maxOverall: ${p328.maxOverall}, Rarity: ${p328.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.DAIKIMATSUOKA_2025_IMAGE:', sandbox.window.DAIKIMATSUOKA_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== DAIKI MATSUOKA ADDED SUCCESSFULLY! ===');
