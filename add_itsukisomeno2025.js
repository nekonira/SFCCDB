const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING ITSUKI SOMENO (p295) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787385791752.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'itsukisomeno2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.ITSUKISOMENO_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. itsukisomeno2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p294Idx = mockCode.indexOf("id: 'p294'");
if (p294Idx === -1) {
  console.error("Could not find p294 in mockData.js!");
  process.exit(1);
}

const p294AvatarIdx = mockCode.indexOf("avatarUrl:", p294Idx);
const p294EndIdx = mockCode.indexOf("}", p294AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p294EndIdx + 1);

const somenoObj = `,
  {
    id: 'p295',
    name: '染野唯月',
    readingName: 'そめの・いつき',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6188,
    maxOverall: 14413,
    baseStats: { shoot: 1135, pass: 1029, dribble: 1129, defense: 958, physical: 1207, speed: 717 },
    detailStats: {
      shoot: { finishing: 384, power: 362, composure: 389 },
      pass: { shortPass: 339, longPass: 307, accuracy: 383 },
      dribble: { breakout: 361, keeping: 391, ballTouch: 377 },
      defense: { tackle: 317, interception: 330, marking: 311 },
      physical: { jumping: 431, contact: 396, stamina: 380 },
      speed: { running: 347, agility: 370 }
    },
    maxEnhanced: {
      overall: 14413,
      baseStats: { shoot: 2740, pass: 2562, dribble: 2710, defense: 2455, physical: 2788, speed: 1763 },
      detailStats: {
        shoot: { finishing: 919, power: 897, composure: 924 },
        pass: { shortPass: 850, longPass: 818, accuracy: 894 },
        dribble: { breakout: 884, keeping: 914, ballTouch: 912 },
        defense: { tackle: 816, interception: 829, marking: 810 },
        physical: { jumping: 954, contact: 931, stamina: 903 },
        speed: { running: 870, agility: 893 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '上空のスナイパー', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ジャンプUP' },
      { name: '力強いフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + somenoObj, 'utf-8');
console.log('2. mockData.js updated with p295 (Itsuki Someno) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('itsukisomeno2025Image.js')) {
  if (indexContent.includes('lucao2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/lucao2025Image.js"></script>',
      '<script src="./src/data/lucao2025Image.js"></script>\n  <script src="./src/data/itsukisomeno2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/itsukisomeno2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p295": "ITSUKISOMENO_2025_IMAGE"')) {
  if (appJsxCode.includes('"p294": "LUCAO_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p294": "LUCAO_2025_IMAGE"',
      '"p294": "LUCAO_2025_IMAGE",\n  "p295": "ITSUKISOMENO_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p295 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p295": "ITSUKISOMENO_2025_IMAGE"')) {
  if (appJsCode.includes('"p294": "LUCAO_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p294": "LUCAO_2025_IMAGE"',
      '"p294": "LUCAO_2025_IMAGE",\n  "p295": "ITSUKISOMENO_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p295 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p295 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p295');
console.log('6. Verification of p295:', p295 ? `${p295.name} (Overall: ${p295.overall}, maxOverall: ${p295.maxOverall}, Rarity: ${p295.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.ITSUKISOMENO_2025_IMAGE:', sandbox.window.ITSUKISOMENO_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== ITSUKI SOMENO ADDED SUCCESSFULLY! ===');
