const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING RAFAEL ELIAS (p306) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787388152953.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'rafaelelias2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.RAFAELELIAS_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. rafaelelias2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p305Idx = mockCode.indexOf("id: 'p305'");
if (p305Idx === -1) {
  console.error("Could not find p305 in mockData.js!");
  process.exit(1);
}

const p305AvatarIdx = mockCode.indexOf("avatarUrl:", p305Idx);
const p305EndIdx = mockCode.indexOf("}", p305AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p305EndIdx + 1);

const eliasObj = `,
  {
    id: 'p306',
    name: 'ラファエル・エリアス',
    readingName: 'らふぁえる・えりあす',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'カウンター',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6312,
    maxOverall: 14543,
    baseStats: { shoot: 1236, pass: 1008, dribble: 1135, defense: 878, physical: 1135, speed: 774 },
    detailStats: {
      shoot: { finishing: 424, power: 395, composure: 417 },
      pass: { shortPass: 331, longPass: 317, accuracy: 360 },
      dribble: { breakout: 388, keeping: 392, ballTouch: 355 },
      defense: { tackle: 282, interception: 302, marking: 294 },
      physical: { jumping: 392, contact: 373, stamina: 370 },
      speed: { running: 379, agility: 395 }
    },
    maxEnhanced: {
      overall: 14543,
      baseStats: { shoot: 2841, pass: 2541, dribble: 2716, defense: 2375, physical: 2716, speed: 1820 },
      detailStats: {
        shoot: { finishing: 959, power: 930, composure: 952 },
        pass: { shortPass: 842, longPass: 828, accuracy: 871 },
        dribble: { breakout: 911, keeping: 915, ballTouch: 890 },
        defense: { tackle: 781, interception: 801, marking: 793 },
        physical: { jumping: 915, contact: 908, stamina: 893 },
        speed: { running: 902, agility: 918 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'シュートセンス', rank: '銀', description: '発動条件：好調　/　決定力・キック力UP' },
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + eliasObj, 'utf-8');
console.log('2. mockData.js updated with p306 (Rafael Elias) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('rafaelelias2025Image.js')) {
  if (indexContent.includes('koyakitagawa2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/koyakitagawa2025Image.js"></script>',
      '<script src="./src/data/koyakitagawa2025Image.js"></script>\n  <script src="./src/data/rafaelelias2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/rafaelelias2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p306": "RAFAELELIAS_2025_IMAGE"')) {
  if (appJsxCode.includes('"p305": "KOYAKITAGAWA_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p305": "KOYAKITAGAWA_2025_IMAGE"',
      '"p305": "KOYAKITAGAWA_2025_IMAGE",\n  "p306": "RAFAELELIAS_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p306 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p306": "RAFAELELIAS_2025_IMAGE"')) {
  if (appJsCode.includes('"p305": "KOYAKITAGAWA_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p305": "KOYAKITAGAWA_2025_IMAGE"',
      '"p305": "KOYAKITAGAWA_2025_IMAGE",\n  "p306": "RAFAELELIAS_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p306 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p306 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p306');
console.log('6. Verification of p306:', p306 ? `${p306.name} (Overall: ${p306.overall}, maxOverall: ${p306.maxOverall}, Rarity: ${p306.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.RAFAELELIAS_2025_IMAGE:', sandbox.window.RAFAELELIAS_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== RAFAEL ELIAS ADDED SUCCESSFULLY! ===');
