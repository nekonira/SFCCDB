const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING NAOKI NOMURA (p310) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787389544033.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'naokinomura2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.NAOKINOMURA_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. naokinomura2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p309Idx = mockCode.indexOf("id: 'p309'");
if (p309Idx === -1) {
  console.error("Could not find p309 in mockData.js!");
  process.exit(1);
}

const p309AvatarIdx = mockCode.indexOf("avatarUrl:", p309Idx);
const p309EndIdx = mockCode.indexOf("}", p309AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p309EndIdx + 1);

const nomuraObj = `,
  {
    id: 'p310',
    name: '野村直輝',
    readingName: 'のむら・なおき',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6079,
    maxOverall: 14180,
    baseStats: { shoot: 1107, pass: 1070, dribble: 1139, defense: 921, physical: 904, speed: 830 },
    detailStats: {
      shoot: { finishing: 394, power: 328, composure: 385 },
      pass: { shortPass: 356, longPass: 361, accuracy: 353 },
      dribble: { breakout: 383, keeping: 374, ballTouch: 382 },
      defense: { tackle: 288, interception: 319, marking: 314 },
      physical: { jumping: 302, contact: 233, stamina: 369 },
      speed: { running: 400, agility: 430 }
    },
    maxEnhanced: {
      overall: 14180,
      baseStats: { shoot: 2652, pass: 2651, dribble: 2708, defense: 2466, physical: 2473, speed: 1864 },
      detailStats: {
        shoot: { finishing: 905, power: 839, composure: 908 },
        pass: { shortPass: 891, longPass: 884, accuracy: 876 },
        dribble: { breakout: 906, keeping: 897, ballTouch: 905 },
        defense: { tackle: 811, interception: 830, marking: 825 },
        physical: { jumping: 813, contact: 756, stamina: 904 },
        speed: { running: 911, agility: 953 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' },
      { name: 'スピードドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + nomuraObj, 'utf-8');
console.log('2. mockData.js updated with p310 (Naoki Nomura) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('naokinomura2025Image.js')) {
  if (indexContent.includes('ataruesaka2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/ataruesaka2025Image.js"></script>',
      '<script src="./src/data/ataruesaka2025Image.js"></script>\n  <script src="./src/data/naokinomura2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/naokinomura2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p310": "NAOKINOMURA_2025_IMAGE"')) {
  if (appJsxCode.includes('"p309": "ATARUESAKA_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p309": "ATARUESAKA_2025_IMAGE"',
      '"p309": "ATARUESAKA_2025_IMAGE",\n  "p310": "NAOKINOMURA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p310 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p310": "NAOKINOMURA_2025_IMAGE"')) {
  if (appJsCode.includes('"p309": "ATARUESAKA_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p309": "ATARUESAKA_2025_IMAGE"',
      '"p309": "ATARUESAKA_2025_IMAGE",\n  "p310": "NAOKINOMURA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p310 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p310 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p310');
console.log('6. Verification of p310:', p310 ? `${p310.name} (Overall: ${p310.overall}, maxOverall: ${p310.maxOverall}, Rarity: ${p310.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.NAOKINOMURA_2025_IMAGE:', sandbox.window.NAOKINOMURA_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== NAOKI NOMURA ADDED SUCCESSFULLY! ===');
