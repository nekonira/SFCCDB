const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING JUN AMANO (p319) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787391306287.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'junamano2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.JUNAMANO_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. junamano2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p318Idx = mockCode.indexOf("id: 'p318'");
if (p318Idx === -1) {
  console.error("Could not find p318 in mockData.js!");
  process.exit(1);
}

const p318AvatarIdx = mockCode.indexOf("avatarUrl:", p318Idx);
const p318EndIdx = mockCode.indexOf("}", p318AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p318EndIdx + 1);

const amanoObj = `,
  {
    id: 'p319',
    name: '天野純',
    readingName: 'あまの・じゅん',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 6111,
    maxOverall: 14264,
    baseStats: { shoot: 1143, pass: 1227, dribble: 1245, defense: 868, physical: 1032, speed: 733 },
    detailStats: {
      shoot: { finishing: 377, power: 394, composure: 372 },
      pass: { shortPass: 390, longPass: 398, accuracy: 439 },
      dribble: { breakout: 379, keeping: 437, ballTouch: 429 },
      defense: { tackle: 293, interception: 301, marking: 274 },
      physical: { jumping: 296, contact: 359, stamina: 377 },
      speed: { running: 343, agility: 390 }
    },
    maxEnhanced: {
      overall: 14264,
      baseStats: { shoot: 2688, pass: 2832, dribble: 2778, defense: 2449, physical: 2601, speed: 1755 },
      detailStats: {
        shoot: { finishing: 888, power: 905, composure: 895 },
        pass: { shortPass: 925, longPass: 933, accuracy: 974 },
        dribble: { breakout: 890, keeping: 948, ballTouch: 940 },
        defense: { tackle: 828, interception: 824, marking: 797 },
        physical: { jumping: 807, contact: 882, stamina: 912 },
        speed: { running: 854, agility: 901 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '意外性のあるミドルパス', rank: '銅', description: '発動エリア：中中・後左中右　/　発動条件：CF・AMの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '柔軟なキッカー', rank: '銀', description: '発動条件：絶好調　/　キック精度・ボールタッチUP' },
      { name: '懐の深いロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・キープ力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + amanoObj, 'utf-8');
console.log('2. mockData.js updated with p319 (Jun Amano) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('junamano2025Image.js')) {
  if (indexContent.includes('yasutowakizaka2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/yasutowakizaka2025Image.js"></script>',
      '<script src="./src/data/yasutowakizaka2025Image.js"></script>\n  <script src="./src/data/junamano2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/junamano2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p319": "JUNAMANO_2025_IMAGE"')) {
  if (appJsxCode.includes('"p318": "YASUTOWAKIZAKA_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p318": "YASUTOWAKIZAKA_2025_IMAGE"',
      '"p318": "YASUTOWAKIZAKA_2025_IMAGE",\n  "p319": "JUNAMANO_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p319 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p319": "JUNAMANO_2025_IMAGE"')) {
  if (appJsCode.includes('"p318": "YASUTOWAKIZAKA_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p318": "YASUTOWAKIZAKA_2025_IMAGE"',
      '"p318": "YASUTOWAKIZAKA_2025_IMAGE",\n  "p319": "JUNAMANO_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p319 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p319 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p319');
console.log('6. Verification of p319:', p319 ? `${p319.name} (Overall: ${p319.overall}, maxOverall: ${p319.maxOverall}, Rarity: ${p319.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.JUNAMANO_2025_IMAGE:', sandbox.window.JUNAMANO_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== JUN AMANO ADDED SUCCESSFULLY! ===');
