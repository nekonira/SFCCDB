const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING AKIHIRO IENAGA (p359) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787423162336.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'ienagaAkihiro2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.IENAGA_AKIHIRO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. ienagaAkihiro2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p358Idx = mockCode.indexOf("id: 'p358'");
if (p358Idx === -1) {
  console.error("Could not find p358 in mockData.js!");
  process.exit(1);
}

const p358AvatarIdx = mockCode.indexOf("avatarUrl:", p358Idx);
const p358EndIdx = mockCode.indexOf("}", p358AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p358EndIdx + 1);

const ienagaObj = `,
  {
    id: 'p359',
    name: '家長昭博',
    readingName: 'いえなが・あきひろ',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6129,
    maxOverall: 14332,
    baseStats: { shoot: 1091, pass: 1259, dribble: 1246, defense: 948, physical: 1129, speed: 704 },
    detailStats: {
      shoot: { finishing: 379, power: 341, composure: 371 },
      pass: { shortPass: 415, longPass: 416, accuracy: 428 },
      dribble: { breakout: 389, keeping: 429, ballTouch: 428 },
      defense: { tackle: 294, interception: 345, marking: 309 },
      physical: { jumping: 378, contact: 394, stamina: 357 },
      speed: { running: 312, agility: 392 }
    },
    maxEnhanced: {
      overall: 14332,
      baseStats: { shoot: 2648, pass: 2828, dribble: 2839, defense: 2457, physical: 2674, speed: 1774 },
      detailStats: {
        shoot: { finishing: 902, power: 852, composure: 894 },
        pass: { shortPass: 938, longPass: 939, accuracy: 951 },
        dribble: { breakout: 924, keeping: 964, ballTouch: 951 },
        defense: { tackle: 805, interception: 844, marking: 808 },
        physical: { jumping: 889, contact: 905, stamina: 880 },
        speed: { running: 847, agility: 927 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '高速クロス', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：クロス時　/　ロングパス・キック精度UP　/　成功時に受け手のヘディングシュート発生確率UP' },
    abilities: [
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' },
      { name: '高性能ロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・キック精度UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM', 'ドリブラーRW'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + ienagaObj, 'utf-8');
console.log('2. mockData.js updated with p359 (Akihiro Ienaga) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('ienagaAkihiro2026Image.js')) {
  if (indexContent.includes('noyoriKazuya2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/noyoriKazuya2026Image.js"></script>',
      '<script src="./src/data/noyoriKazuya2026Image.js"></script>\n  <script src="./src/data/ienagaAkihiro2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/ienagaAkihiro2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p359": "IENAGA_AKIHIRO_2026_IMAGE"')) {
  if (appJsxCode.includes('"p358": "NOYORI_KAZUYA_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p358": "NOYORI_KAZUYA_2026_IMAGE"',
      '"p358": "NOYORI_KAZUYA_2026_IMAGE",\n  "p359": "IENAGA_AKIHIRO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p359 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p359": "IENAGA_AKIHIRO_2026_IMAGE"')) {
  if (appJsCode.includes('"p358": "NOYORI_KAZUYA_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p358": "NOYORI_KAZUYA_2026_IMAGE"',
      '"p358": "NOYORI_KAZUYA_2026_IMAGE",\n  "p359": "IENAGA_AKIHIRO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p359 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p359 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p359');
console.log('6. Verification of p359:', p359 ? `${p359.name} (Overall: ${p359.overall}, maxOverall: ${p359.maxOverall}, Rarity: ${p359.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.IENAGA_AKIHIRO_2026_IMAGE:', sandbox.window.IENAGA_AKIHIRO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== AKIHIRO IENAGA ADDED SUCCESSFULLY! ===');
