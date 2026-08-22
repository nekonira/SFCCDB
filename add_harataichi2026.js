const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TAICHI HARA (p361) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787423644576.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'haraTaichi2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.HARA_TAICHI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. haraTaichi2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p360Idx = mockCode.indexOf("id: 'p360'");
if (p360Idx === -1) {
  console.error("Could not find p360 in mockData.js!");
  process.exit(1);
}

const p360AvatarIdx = mockCode.indexOf("avatarUrl:", p360Idx);
const p360EndIdx = mockCode.indexOf("}", p360AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p360EndIdx + 1);

const haraObj = `,
  {
    id: 'p361',
    name: '原大智',
    readingName: 'はら・たいち',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ドリブラーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6095,
    maxOverall: 14287,
    baseStats: { shoot: 1142, pass: 1102, dribble: 1126, defense: 885, physical: 1273, speed: 803 },
    detailStats: {
      shoot: { finishing: 380, power: 383, composure: 379 },
      pass: { shortPass: 354, longPass: 398, accuracy: 350 },
      dribble: { breakout: 387, keeping: 377, ballTouch: 362 },
      defense: { tackle: 271, interception: 299, marking: 315 },
      physical: { jumping: 465, contact: 444, stamina: 364 },
      speed: { running: 397, agility: 406 }
    },
    maxEnhanced: {
      overall: 14287,
      baseStats: { shoot: 2699, pass: 2671, dribble: 2719, defense: 2394, physical: 2818, speed: 1873 },
      detailStats: {
        shoot: { finishing: 903, power: 894, composure: 902 },
        pass: { shortPass: 877, longPass: 921, accuracy: 873 },
        dribble: { breakout: 922, keeping: 912, ballTouch: 885 },
        defense: { tackle: 782, interception: 798, marking: 814 },
        physical: { jumping: 976, contact: 955, stamina: 887 },
        speed: { running: 932, agility: 941 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '高速クロス', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：クロス時　/　ロングパス・キック精度UP　/　成功時に受け手のヘディングシュート発生確率UP' },
    abilities: [
      { name: 'アジャイルジャンパー', rank: '銀', description: '発動条件：途中出場　/　ジャンプ・敏捷性UP' },
      { name: 'パワフルランナー', rank: '銀', description: '発動条件：途中出場　/　コンタクト・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM', 'ドリブラーRW', 'ドリブラーLW'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + haraObj, 'utf-8');
console.log('2. mockData.js updated with p361 (Taichi Hara) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('haraTaichi2026Image.js')) {
  if (indexContent.includes('itoTatsuya2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/itoTatsuya2026Image.js"></script>',
      '<script src="./src/data/itoTatsuya2026Image.js"></script>\n  <script src="./src/data/haraTaichi2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/haraTaichi2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p361": "HARA_TAICHI_2026_IMAGE"')) {
  if (appJsxCode.includes('"p360": "ITO_TATSUYA_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p360": "ITO_TATSUYA_2026_IMAGE"',
      '"p360": "ITO_TATSUYA_2026_IMAGE",\n  "p361": "HARA_TAICHI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p361 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p361": "HARA_TAICHI_2026_IMAGE"')) {
  if (appJsCode.includes('"p360": "ITO_TATSUYA_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p360": "ITO_TATSUYA_2026_IMAGE"',
      '"p360": "ITO_TATSUYA_2026_IMAGE",\n  "p361": "HARA_TAICHI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p361 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p361 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p361');
console.log('6. Verification of p361:', p361 ? `${p361.name} (Overall: ${p361.overall}, maxOverall: ${p361.maxOverall}, Rarity: ${p361.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.HARA_TAICHI_2026_IMAGE:', sandbox.window.HARA_TAICHI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== TAICHI HARA ADDED SUCCESSFULLY! ===');
