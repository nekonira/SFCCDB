const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KOSUKE ONOSE (p320) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787391483964.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kosukeonose2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KOSUKEONOSE_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kosukeonose2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p319Idx = mockCode.indexOf("id: 'p319'");
if (p319Idx === -1) {
  console.error("Could not find p319 in mockData.js!");
  process.exit(1);
}

const p319AvatarIdx = mockCode.indexOf("avatarUrl:", p319Idx);
const p319EndIdx = mockCode.indexOf("}", p319AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p319EndIdx + 1);

const onoseObj = `,
  {
    id: 'p320',
    name: '小野瀬康介',
    readingName: 'おのせ・こうすけ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'セントラルAM',
    playStyleLevel: 'Ⅱ',
    overall: 6088,
    maxOverall: 14176,
    baseStats: { shoot: 1097, pass: 1112, dribble: 1114, defense: 1104, physical: 1153, speed: 743 },
    detailStats: {
      shoot: { finishing: 382, power: 340, composure: 375 },
      pass: { shortPass: 368, longPass: 383, accuracy: 361 },
      dribble: { breakout: 357, keeping: 375, ballTouch: 382 },
      defense: { tackle: 358, interception: 373, marking: 373 },
      physical: { jumping: 331, contact: 401, stamina: 421 },
      speed: { running: 386, agility: 357 }
    },
    maxEnhanced: {
      overall: 14176,
      baseStats: { shoot: 2642, pass: 2693, dribble: 2683, defense: 2649, physical: 2722, speed: 1777 },
      detailStats: {
        shoot: { finishing: 893, power: 851, composure: 898 },
        pass: { shortPass: 903, longPass: 906, accuracy: 884 },
        dribble: { breakout: 880, keeping: 898, ballTouch: 905 },
        defense: { tackle: 881, interception: 884, marking: 884 },
        physical: { jumping: 842, contact: 924, stamina: 956 },
        speed: { running: 897, agility: 880 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' },
      { name: '絢爛なインターセプト', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・パスカットUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + onoseObj, 'utf-8');
console.log('2. mockData.js updated with p320 (Kosuke Onose) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kosukeonose2025Image.js')) {
  if (indexContent.includes('junamano2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/junamano2025Image.js"></script>',
      '<script src="./src/data/junamano2025Image.js"></script>\n  <script src="./src/data/kosukeonose2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/kosukeonose2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p320": "KOSUKEONOSE_2025_IMAGE"')) {
  if (appJsxCode.includes('"p319": "JUNAMANO_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p319": "JUNAMANO_2025_IMAGE"',
      '"p319": "JUNAMANO_2025_IMAGE",\n  "p320": "KOSUKEONOSE_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p320 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p320": "KOSUKEONOSE_2025_IMAGE"')) {
  if (appJsCode.includes('"p319": "JUNAMANO_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p319": "JUNAMANO_2025_IMAGE"',
      '"p319": "JUNAMANO_2025_IMAGE",\n  "p320": "KOSUKEONOSE_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p320 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p320 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p320');
console.log('6. Verification of p320:', p320 ? `${p320.name} (Overall: ${p320.overall}, maxOverall: ${p320.maxOverall}, Rarity: ${p320.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KOSUKEONOSE_2025_IMAGE:', sandbox.window.KOSUKEONOSE_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KOSUKE ONOSE ADDED SUCCESSFULLY! ===');
