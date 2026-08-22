const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YUTO HORIGOME (p331) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787393871685.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yutohorigome2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YUTOHORIGOME_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. yutohorigome2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p330Idx = mockCode.indexOf("id: 'p330'");
if (p330Idx === -1) {
  console.error("Could not find p330 in mockData.js!");
  process.exit(1);
}

const p330AvatarIdx = mockCode.indexOf("avatarUrl:", p330Idx);
const p330EndIdx = mockCode.indexOf("}", p330AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p330EndIdx + 1);

const horigomeObj = `,
  {
    id: 'p331',
    name: '堀米悠斗',
    readingName: 'ほりごめ・ゆうと',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: '攻撃的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 5969,
    maxOverall: 14157,
    baseStats: { shoot: 1022, pass: 1192, dribble: 1297, defense: 1002, physical: 1072, speed: 755 },
    detailStats: {
      shoot: { finishing: 345, power: 324, composure: 353 },
      pass: { shortPass: 392, longPass: 396, accuracy: 404 },
      dribble: { breakout: 424, keeping: 440, ballTouch: 433 },
      defense: { tackle: 340, interception: 335, marking: 327 },
      physical: { jumping: 359, contact: 317, stamina: 396 },
      speed: { running: 356, agility: 399 }
    },
    maxEnhanced: {
      overall: 14157,
      baseStats: { shoot: 2519, pass: 2761, dribble: 2830, defense: 2607, physical: 2641, speed: 1825 },
      detailStats: {
        shoot: { finishing: 844, power: 823, composure: 852 },
        pass: { shortPass: 915, longPass: 919, accuracy: 927 },
        dribble: { breakout: 935, keeping: 951, ballTouch: 944 },
        defense: { tackle: 875, interception: 870, marking: 862 },
        physical: { jumping: 870, contact: 840, stamina: 931 },
        speed: { running: 891, agility: 934 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '失わないドリブラー', rank: '銀', description: '発動条件：絶好調　/　突破力・キープ力UP' },
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + horigomeObj, 'utf-8');
console.log('2. mockData.js updated with p331 (Yuto Horigome) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('yutohorigome2025Image.js')) {
  if (indexContent.includes('yutonagatomo2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/yutonagatomo2025Image.js"></script>',
      '<script src="./src/data/yutonagatomo2025Image.js"></script>\n  <script src="./src/data/yutohorigome2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/yutohorigome2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p331": "YUTOHORIGOME_2025_IMAGE"')) {
  if (appJsxCode.includes('"p330": "YUTONAGATOMO_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p330": "YUTONAGATOMO_2025_IMAGE"',
      '"p330": "YUTONAGATOMO_2025_IMAGE",\n  "p331": "YUTOHORIGOME_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p331 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p331": "YUTOHORIGOME_2025_IMAGE"')) {
  if (appJsCode.includes('"p330": "YUTONAGATOMO_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p330": "YUTONAGATOMO_2025_IMAGE"',
      '"p330": "YUTONAGATOMO_2025_IMAGE",\n  "p331": "YUTOHORIGOME_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p331 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p331 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p331');
console.log('6. Verification of p331:', p331 ? `${p331.name} (Overall: ${p331.overall}, maxOverall: ${p331.maxOverall}, Rarity: ${p331.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.YUTOHORIGOME_2025_IMAGE:', sandbox.window.YUTOHORIGOME_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== YUTO HORIGOME ADDED SUCCESSFULLY! ===');
