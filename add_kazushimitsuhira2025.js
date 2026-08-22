const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KAZUSHI MITSUHIRA (p296) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787385986838.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kazushimitsuhira2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KAZUSHIMITSUHIRA_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kazushimitsuhira2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p295Idx = mockCode.indexOf("id: 'p295'");
if (p295Idx === -1) {
  console.error("Could not find p295 in mockData.js!");
  process.exit(1);
}

const p295AvatarIdx = mockCode.indexOf("avatarUrl:", p295Idx);
const p295EndIdx = mockCode.indexOf("}", p295AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p295EndIdx + 1);

const mitsuhiraObj = `,
  {
    id: 'p296',
    name: '三平和司',
    readingName: 'みつひら・かずし',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 5900,
    maxOverall: 14115,
    baseStats: { shoot: 1039, pass: 1133, dribble: 1156, defense: 1043, physical: 1133, speed: 655 },
    detailStats: {
      shoot: { finishing: 368, power: 324, composure: 347 },
      pass: { shortPass: 374, longPass: 378, accuracy: 381 },
      dribble: { breakout: 378, keeping: 391, ballTouch: 387 },
      defense: { tackle: 372, interception: 341, marking: 330 },
      physical: { jumping: 393, contact: 369, stamina: 371 },
      speed: { running: 366, agility: 289 }
    },
    maxEnhanced: {
      overall: 14115,
      baseStats: { shoot: 2644, pass: 2666, dribble: 2737, defense: 2540, physical: 2714, speed: 1801 },
      detailStats: {
        shoot: { finishing: 903, power: 859, composure: 882 },
        pass: { shortPass: 885, longPass: 889, accuracy: 892 },
        dribble: { breakout: 901, keeping: 914, ballTouch: 922 },
        defense: { tackle: 871, interception: 840, marking: 829 },
        physical: { jumping: 916, contact: 904, stamina: 894 },
        speed: { running: 889, agility: 912 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' },
      { name: 'アジャイルジャンパー', rank: '銀', description: '発動条件：途中出場　/　ジャンプ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + mitsuhiraObj, 'utf-8');
console.log('2. mockData.js updated with p296 (Kazushi Mitsuhira) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kazushimitsuhira2025Image.js')) {
  if (indexContent.includes('itsukisomeno2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/itsukisomeno2025Image.js"></script>',
      '<script src="./src/data/itsukisomeno2025Image.js"></script>\n  <script src="./src/data/kazushimitsuhira2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/kazushimitsuhira2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p296": "KAZUSHIMITSUHIRA_2025_IMAGE"')) {
  if (appJsxCode.includes('"p295": "ITSUKISOMENO_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p295": "ITSUKISOMENO_2025_IMAGE"',
      '"p295": "ITSUKISOMENO_2025_IMAGE",\n  "p296": "KAZUSHIMITSUHIRA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p296 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p296": "KAZUSHIMITSUHIRA_2025_IMAGE"')) {
  if (appJsCode.includes('"p295": "ITSUKISOMENO_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p295": "ITSUKISOMENO_2025_IMAGE"',
      '"p295": "ITSUKISOMENO_2025_IMAGE",\n  "p296": "KAZUSHIMITSUHIRA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p296 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p296 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p296');
console.log('6. Verification of p296:', p296 ? `${p296.name} (Overall: ${p296.overall}, maxOverall: ${p296.maxOverall}, Rarity: ${p296.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KAZUSHIMITSUHIRA_2025_IMAGE:', sandbox.window.KAZUSHIMITSUHIRA_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KAZUSHI MITSUHIRA ADDED SUCCESSFULLY! ===');
