const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING DISARO (p298) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787386497656.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'disaro2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.DISARO_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. disaro2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p297Idx = mockCode.indexOf("id: 'p297'");
if (p297Idx === -1) {
  console.error("Could not find p297 in mockData.js!");
  process.exit(1);
}

const p297AvatarIdx = mockCode.indexOf("avatarUrl:", p297Idx);
const p297EndIdx = mockCode.indexOf("}", p297AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p297EndIdx + 1);

const disaroObj = `,
  {
    id: 'p298',
    name: 'ディサロ燦シルヴァーノ',
    readingName: 'でぃさろ・あきら・しるヴぁーの',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6080,
    maxOverall: 14314,
    baseStats: { shoot: 1131, pass: 1056, dribble: 1098, defense: 1044, physical: 1070, speed: 767 },
    detailStats: {
      shoot: { finishing: 376, power: 370, composure: 385 },
      pass: { shortPass: 352, longPass: 351, accuracy: 353 },
      dribble: { breakout: 373, keeping: 367, ballTouch: 358 },
      defense: { tackle: 346, interception: 361, marking: 337 },
      physical: { jumping: 337, contact: 384, stamina: 349 },
      speed: { running: 385, agility: 382 }
    },
    maxEnhanced: {
      overall: 14314,
      baseStats: { shoot: 2736, pass: 2589, dribble: 2679, defense: 2541, physical: 2651, speed: 1813 },
      detailStats: {
        shoot: { finishing: 911, power: 905, composure: 920 },
        pass: { shortPass: 863, longPass: 862, accuracy: 864 },
        dribble: { breakout: 896, keeping: 890, ballTouch: 893 },
        defense: { tackle: 845, interception: 860, marking: 836 },
        physical: { jumping: 860, contact: 919, stamina: 872 },
        speed: { running: 908, agility: 905 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '冷静なフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・冷静さUP' },
      { name: 'パワフルランナー', rank: '銀', description: '発動条件：途中出場　/　コンタクト・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + disaroObj, 'utf-8');
console.log('2. mockData.js updated with p298 (Disaro) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('disaro2025Image.js')) {
  if (indexContent.includes('daikiwatari2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/daikiwatari2025Image.js"></script>',
      '<script src="./src/data/daikiwatari2025Image.js"></script>\n  <script src="./src/data/disaro2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/disaro2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p298": "DISARO_2025_IMAGE"')) {
  if (appJsxCode.includes('"p297": "DAIKIWATARI_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p297": "DAIKIWATARI_2025_IMAGE"',
      '"p297": "DAIKIWATARI_2025_IMAGE",\n  "p298": "DISARO_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p298 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p298": "DISARO_2025_IMAGE"')) {
  if (appJsCode.includes('"p297": "DAIKIWATARI_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p297": "DAIKIWATARI_2025_IMAGE"',
      '"p297": "DAIKIWATARI_2025_IMAGE",\n  "p298": "DISARO_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p298 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p298 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p298');
console.log('6. Verification of p298:', p298 ? `${p298.name} (Overall: ${p298.overall}, maxOverall: ${p298.maxOverall}, Rarity: ${p298.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.DISARO_2025_IMAGE:', sandbox.window.DISARO_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== DISARO ADDED SUCCESSFULLY! ===');
