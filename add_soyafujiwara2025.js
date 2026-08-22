const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING SOYA FUJIWARA (p335) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787394709855.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'soyafujiwara2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SOYAFUJIWARA_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. suyafujiwara2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p334Idx = mockCode.indexOf("id: 'p334'");
if (p334Idx === -1) {
  console.error("Could not find p334 in mockData.js!");
  process.exit(1);
}

const p334AvatarIdx = mockCode.indexOf("avatarUrl:", p334Idx);
const p334EndIdx = mockCode.indexOf("}", p334AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p334EndIdx + 1);

const fujiwaraObj = `,
  {
    id: 'p335',
    name: '藤原奏哉',
    readingName: 'ふじわら・そうや',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: '攻撃的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6009,
    maxOverall: 14201,
    baseStats: { shoot: 1139, pass: 1094, dribble: 1228, defense: 1091, physical: 1109, speed: 753 },
    detailStats: {
      shoot: { finishing: 359, power: 381, composure: 399 },
      pass: { shortPass: 384, longPass: 349, accuracy: 361 },
      dribble: { breakout: 386, keeping: 409, ballTouch: 433 },
      defense: { tackle: 362, interception: 362, marking: 367 },
      physical: { jumping: 349, contact: 357, stamina: 403 },
      speed: { running: 371, agility: 382 }
    },
    maxEnhanced: {
      overall: 14201,
      baseStats: { shoot: 2636, pass: 2663, dribble: 2761, defense: 2696, physical: 2678, speed: 1823 },
      detailStats: {
        shoot: { finishing: 858, power: 880, composure: 898 },
        pass: { shortPass: 907, longPass: 872, accuracy: 884 },
        dribble: { breakout: 897, keeping: 920, ballTouch: 944 },
        defense: { tackle: 897, interception: 897, marking: 902 },
        physical: { jumping: 860, contact: 880, stamina: 938 },
        speed: { running: 906, agility: 917 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' },
      { name: '無限のアジリティ', rank: '銀', description: '発動条件：好調　/　スタミナ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + fujiwaraObj, 'utf-8');
console.log('2. mockData.js updated with p335 (Soya Fujiwara) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('soyafujiwara2025Image.js')) {
  if (indexContent.includes('rikuhanda2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/rikuhanda2025Image.js"></script>',
      '<script src="./src/data/rikuhanda2025Image.js"></script>\n  <script src="./src/data/soyafujiwara2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/soyafujiwara2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p335": "SOYAFUJIWARA_2025_IMAGE"')) {
  if (appJsxCode.includes('"p334": "RIKUHANDA_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p334": "RIKUHANDA_2025_IMAGE"',
      '"p334": "RIKUHANDA_2025_IMAGE",\n  "p335": "SOYAFUJIWARA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p335 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p335": "SOYAFUJIWARA_2025_IMAGE"')) {
  if (appJsCode.includes('"p334": "RIKUHANDA_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p334": "RIKUHANDA_2025_IMAGE"',
      '"p334": "RIKUHANDA_2025_IMAGE",\n  "p335": "SOYAFUJIWARA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p335 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p335 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p335');
console.log('6. Verification of p335:', p335 ? `${p335.name} (Overall: ${p335.overall}, maxOverall: ${p335.maxOverall}, Rarity: ${p335.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SOYAFUJIWARA_2025_IMAGE:', sandbox.window.SOYAFUJIWARA_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== SOYA FUJIWARA ADDED SUCCESSFULLY! ===');
