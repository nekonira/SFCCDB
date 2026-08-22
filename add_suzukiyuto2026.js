const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YUTO SUZUKI (p356) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787422582066.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'suzukiYuto2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SUZUKI_YUTO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. suzukiYuto2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p355Idx = mockCode.indexOf("id: 'p355'");
if (p355Idx === -1) {
  console.error("Could not find p355 in mockData.js!");
  process.exit(1);
}

const p355AvatarIdx = mockCode.indexOf("avatarUrl:", p355Idx);
const p355EndIdx = mockCode.indexOf("}", p355AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p355EndIdx + 1);

const suzukiObj = `,
  {
    id: 'p356',
    name: '鈴木雄斗',
    readingName: 'すずき・ゆうと',
    category: 'MF',
    mainPosition: 'RM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ドリブラーRM',
    playStyleLevel: 'Ⅱ',
    overall: 5855,
    maxOverall: 14000,
    baseStats: { shoot: 1100, pass: 1197, dribble: 1120, defense: 1299, physical: 1125, speed: 735 },
    detailStats: {
      shoot: { finishing: 349, power: 358, composure: 393 },
      pass: { shortPass: 401, longPass: 400, accuracy: 396 },
      dribble: { breakout: 363, keeping: 376, ballTouch: 381 },
      defense: { tackle: 426, interception: 447, marking: 426 },
      physical: { jumping: 330, contact: 377, stamina: 418 },
      speed: { running: 368, agility: 367 }
    },
    maxEnhanced: {
      overall: 14000,
      baseStats: { shoot: 2657, pass: 2766, dribble: 2713, defense: 2808, physical: 2670, speed: 1805 },
      detailStats: {
        shoot: { finishing: 872, power: 869, composure: 916 },
        pass: { shortPass: 924, longPass: 923, accuracy: 919 },
        dribble: { breakout: 898, keeping: 911, ballTouch: 904 },
        defense: { tackle: 937, interception: 946, marking: 925 },
        physical: { jumping: 841, contact: 888, stamina: 941 },
        speed: { running: 903, agility: 902 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '高速クロス', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：クロス時　/　ロングパス・キック精度UP　/　成功時に受け手のヘディングシュート発生確率UP' },
    abilities: [
      { name: 'ボールスティーラー', rank: '銀', description: '発動条件：途中出場　/　タックル・パスカットUP' },
      { name: 'エンドレスマーカー', rank: '銀', description: '発動条件：好調　/　マーク・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + suzukiObj, 'utf-8');
console.log('2. mockData.js updated with p356 (Yuto Suzuki) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('suzukiYuto2026Image.js')) {
  if (indexContent.includes('konnoKazuya2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/konnoKazuya2026Image.js"></script>',
      '<script src="./src/data/konnoKazuya2026Image.js"></script>\n  <script src="./src/data/suzukiYuto2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/suzukiYuto2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p356": "SUZUKI_YUTO_2026_IMAGE"')) {
  if (appJsxCode.includes('"p355": "KONNO_KAZUYA_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p355": "KONNO_KAZUYA_2026_IMAGE"',
      '"p355": "KONNO_KAZUYA_2026_IMAGE",\n  "p356": "SUZUKI_YUTO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p356 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p356": "SUZUKI_YUTO_2026_IMAGE"')) {
  if (appJsCode.includes('"p355": "KONNO_KAZUYA_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p355": "KONNO_KAZUYA_2026_IMAGE"',
      '"p355": "KONNO_KAZUYA_2026_IMAGE",\n  "p356": "SUZUKI_YUTO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p356 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p356 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p356');
console.log('6. Verification of p356:', p356 ? `${p356.name} (Overall: ${p356.overall}, maxOverall: ${p356.maxOverall}, Rarity: ${p356.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SUZUKI_YUTO_2026_IMAGE:', sandbox.window.SUZUKI_YUTO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== YUTO SUZUKI ADDED SUCCESSFULLY! ===');
