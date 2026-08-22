const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING ATARU ESAKA (p309) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787389306904.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'ataruesaka2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.ATARUESAKA_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. ataruesaka2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p308Idx = mockCode.indexOf("id: 'p308'");
if (p308Idx === -1) {
  console.error("Could not find p308 in mockData.js!");
  process.exit(1);
}

const p308AvatarIdx = mockCode.indexOf("avatarUrl:", p308Idx);
const p308EndIdx = mockCode.indexOf("}", p308AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p308EndIdx + 1);

const esakaObj = `,
  {
    id: 'p309',
    name: '江坂任',
    readingName: 'えさか・あたる',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6264,
    maxOverall: 14340,
    baseStats: { shoot: 1155, pass: 1235, dribble: 1230, defense: 974, physical: 1038, speed: 783 },
    detailStats: {
      shoot: { finishing: 387, power: 387, composure: 381 },
      pass: { shortPass: 410, longPass: 421, accuracy: 404 },
      dribble: { breakout: 409, keeping: 423, ballTouch: 398 },
      defense: { tackle: 315, interception: 329, marking: 330 },
      physical: { jumping: 348, contact: 324, stamina: 366 },
      speed: { running: 377, agility: 406 }
    },
    maxEnhanced: {
      overall: 14340,
      baseStats: { shoot: 2700, pass: 2816, dribble: 2799, defense: 2519, physical: 2607, speed: 1817 },
      detailStats: {
        shoot: { finishing: 898, power: 898, composure: 904 },
        pass: { shortPass: 945, longPass: 944, accuracy: 927 },
        dribble: { breakout: 932, keeping: 946, ballTouch: 921 },
        defense: { tackle: 838, interception: 840, marking: 841 },
        physical: { jumping: 859, contact: 847, stamina: 901 },
        speed: { running: 888, agility: 929 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '敵陣を切り裂くパス', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：CFの位置に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '懐の深いロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・キープ力UP' },
      { name: '切り裂くパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・突破力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + esakaObj, 'utf-8');
console.log('2. mockData.js updated with p309 (Ataru Esaka) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('ataruesaka2025Image.js')) {
  if (indexContent.includes('aratawatanabe2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/aratawatanabe2025Image.js"></script>',
      '<script src="./src/data/aratawatanabe2025Image.js"></script>\n  <script src="./src/data/ataruesaka2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/ataruesaka2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p309": "ATARUESAKA_2025_IMAGE"')) {
  if (appJsxCode.includes('"p308": "ARATAWATANABE_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p308": "ARATAWATANABE_2025_IMAGE"',
      '"p308": "ARATAWATANABE_2025_IMAGE",\n  "p309": "ATARUESAKA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p309 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p309": "ATARUESAKA_2025_IMAGE"')) {
  if (appJsCode.includes('"p308": "ARATAWATANABE_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p308": "ARATAWATANABE_2025_IMAGE"',
      '"p308": "ARATAWATANABE_2025_IMAGE",\n  "p309": "ATARUESAKA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p309 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p309 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p309');
console.log('6. Verification of p309:', p309 ? `${p309.name} (Overall: ${p309.overall}, maxOverall: ${p309.maxOverall}, Rarity: ${p309.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.ATARUESAKA_2025_IMAGE:', sandbox.window.ATARUESAKA_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== ATARU ESAKA ADDED SUCCESSFULLY! ===');
