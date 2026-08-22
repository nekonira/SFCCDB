const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING SHUSAKU NISHIKAWA (p371) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787425950878.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'nishikawaShusaku2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.NISHIKAWA_SHUSAKU_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. nishikawaShusaku2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p370Idx = mockCode.indexOf("id: 'p370'");
if (p370Idx === -1) {
  console.error("Could not find p370 in mockData.js!");
  process.exit(1);
}

const p370AvatarIdx = mockCode.indexOf("avatarUrl:", p370Idx);
const p370EndIdx = mockCode.indexOf("}", p370AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p370EndIdx + 1);

const nishikawaObj = `,
  {
    id: 'p371',
    name: '西川周作',
    readingName: 'にしかわ・しゅうさく',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'スイーパーGK',
    playStyleLevel: 'Ⅱ',
    overall: 6251,
    maxOverall: 14530,
    baseStats: { shoot: 958, pass: 1120, dribble: 891, defense: 1216, physical: 1123, speed: 780 },
    detailStats: {
      shoot: { finishing: 288, power: 343, composure: 327 },
      pass: { shortPass: 353, longPass: 400, accuracy: 367 },
      dribble: { breakout: 333, keeping: 267, ballTouch: 291 },
      defense: { tackle: 394, interception: 424, marking: 398 },
      physical: { jumping: 362, contact: 362, stamina: 399 },
      speed: { running: 370, agility: 410 }
    },
    maxEnhanced: {
      overall: 14530,
      baseStats: { shoot: 2419, pass: 2725, dribble: 2352, defense: 2821, physical: 2716, speed: 1802 },
      detailStats: {
        shoot: { finishing: 775, power: 830, composure: 814 },
        pass: { shortPass: 888, longPass: 935, accuracy: 902 },
        dribble: { breakout: 820, keeping: 754, ballTouch: 778 },
        defense: { tackle: 929, interception: 959, marking: 933 },
        physical: { jumping: 897, contact: 897, stamina: 922 },
        speed: { running: 881, agility: 921 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: 'コントロールフィード', rank: '銅', description: '発動エリア：後中　/　発動条件：パントキック時　/　ロングパス・キック精度UP' },
    abilities: [
      { name: '冷静沈着', rank: '銀', description: '発動条件：途中出場　/　反応速度・1VS1UP' },
      { name: '守護のロングキック', rank: '銀', description: '発動条件：絶好調　/　セービング・ロングパスUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM', 'ドリブラーRW', 'ドリブラーLW', 'サイドアタッカーLW'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + nishikawaObj, 'utf-8');
console.log('2. mockData.js updated with p371 (Shusaku Nishikawa) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('nishikawaShusaku2026Image.js')) {
  if (indexContent.includes('kimJinHyeon2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/kimJinHyeon2026Image.js"></script>',
      '<script src="./src/data/kimJinHyeon2026Image.js"></script>\n  <script src="./src/data/nishikawaShusaku2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/nishikawaShusaku2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p371": "NISHIKAWA_SHUSAKU_2026_IMAGE"')) {
  if (appJsxCode.includes('"p370": "KIM_JIN_HYEON_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p370": "KIM_JIN_HYEON_2026_IMAGE"',
      '"p370": "KIM_JIN_HYEON_2026_IMAGE",\n  "p371": "NISHIKAWA_SHUSAKU_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p371 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p371": "NISHIKAWA_SHUSAKU_2026_IMAGE"')) {
  if (appJsCode.includes('"p370": "KIM_JIN_HYEON_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p370": "KIM_JIN_HYEON_2026_IMAGE"',
      '"p370": "KIM_JIN_HYEON_2026_IMAGE",\n  "p371": "NISHIKAWA_SHUSAKU_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p371 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p371 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p371');
console.log('6. Verification of p371:', p371 ? `${p371.name} (Overall: ${p371.overall}, maxOverall: ${p371.maxOverall}, Rarity: ${p371.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.NISHIKAWA_SHUSAKU_2026_IMAGE:', sandbox.window.NISHIKAWA_SHUSAKU_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== SHUSAKU NISHIKAWA ADDED SUCCESSFULLY! ===');
