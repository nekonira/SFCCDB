const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TAKUYA KIDA (p326) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787393037493.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'takuyakida2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.TAKUYAKIDA_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. takuyakida2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p325Idx = mockCode.indexOf("id: 'p325'");
if (p325Idx === -1) {
  console.error("Could not find p325 in mockData.js!");
  process.exit(1);
}

const p325AvatarIdx = mockCode.indexOf("avatarUrl:", p325Idx);
const p325EndIdx = mockCode.indexOf("}", p325AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p325EndIdx + 1);

const kidaObj = `,
  {
    id: 'p326',
    name: '喜田拓也',
    readingName: 'きだ・たくや',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6316,
    maxOverall: 14519,
    baseStats: { shoot: 868, pass: 1052, dribble: 1123, defense: 1250, physical: 1136, speed: 703 },
    detailStats: {
      shoot: { finishing: 268, power: 308, composure: 292 },
      pass: { shortPass: 359, longPass: 365, accuracy: 328 },
      dribble: { breakout: 353, keeping: 377, ballTouch: 393 },
      defense: { tackle: 412, interception: 423, marking: 415 },
      physical: { jumping: 365, contact: 368, stamina: 403 },
      speed: { running: 361, agility: 342 }
    },
    maxEnhanced: {
      overall: 14519,
      baseStats: { shoot: 2413, pass: 2657, dribble: 2656, defense: 2831, physical: 2705, speed: 1725 },
      detailStats: {
        shoot: { finishing: 779, power: 819, composure: 815 },
        pass: { shortPass: 894, longPass: 900, accuracy: 863 },
        dribble: { breakout: 864, keeping: 888, ballTouch: 904 },
        defense: { tackle: 947, interception: 946, marking: 938 },
        physical: { jumping: 876, contact: 891, stamina: 938 },
        speed: { running: 872, agility: 853 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' },
      { name: 'ピッチの分断者', rank: '銀', description: '発動条件：絶好調　/　パスカット・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + kidaObj, 'utf-8');
console.log('2. mockData.js updated with p326 (Takuya Kida) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('takuyakida2025Image.js')) {
  if (indexContent.includes('yutafukazawa2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/yutafukazawa2025Image.js"></script>',
      '<script src="./src/data/yutafukazawa2025Image.js"></script>\n  <script src="./src/data/takuyakida2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/takuyakida2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p326": "TAKUYAKIDA_2025_IMAGE"')) {
  if (appJsxCode.includes('"p325": "YUTAFUKAZAWA_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p325": "YUTAFUKAZAWA_2025_IMAGE"',
      '"p325": "YUTAFUKAZAWA_2025_IMAGE",\n  "p326": "TAKUYAKIDA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p326 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p326": "TAKUYAKIDA_2025_IMAGE"')) {
  if (appJsCode.includes('"p325": "YUTAFUKAZAWA_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p325": "YUTAFUKAZAWA_2025_IMAGE"',
      '"p325": "YUTAFUKAZAWA_2025_IMAGE",\n  "p326": "TAKUYAKIDA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p326 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p326 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p326');
console.log('6. Verification of p326:', p326 ? `${p326.name} (Overall: ${p326.overall}, maxOverall: ${p326.maxOverall}, Rarity: ${p326.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.TAKUYAKIDA_2025_IMAGE:', sandbox.window.TAKUYAKIDA_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== TAKUYA KIDA ADDED SUCCESSFULLY! ===');
