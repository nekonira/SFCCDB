const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING SENA IGARASHI (p337) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787418725382.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'igarashiSena2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.IGARASHI_SENA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. igarashiSena2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p336Idx = mockCode.indexOf("id: 'p336'");
if (p336Idx === -1) {
  console.error("Could not find p336 in mockData.js!");
  process.exit(1);
}

const p336AvatarIdx = mockCode.indexOf("avatarUrl:", p336Idx);
const p336EndIdx = mockCode.indexOf("}", p336AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p336EndIdx + 1);

const igarashiObj = `,
  {
    id: 'p337',
    name: '五十嵐駿己',
    readingName: 'いがらし・せな',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: '守備的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6030,
    maxOverall: 14274,
    baseStats: { shoot: 1138, pass: 1058, dribble: 1063, defense: 1127, physical: 1138, speed: 733 },
    detailStats: {
      shoot: { finishing: 374, power: 396, composure: 368 },
      pass: { shortPass: 313, longPass: 384, accuracy: 361 },
      dribble: { breakout: 343, keeping: 377, ballTouch: 343 },
      defense: { tackle: 372, interception: 374, marking: 381 },
      physical: { jumping: 366, contact: 379, stamina: 393 },
      speed: { running: 358, agility: 375 }
    },
    maxEnhanced: {
      overall: 14274,
      baseStats: { shoot: 2635, pass: 2627, dribble: 2596, defense: 2732, physical: 2707, speed: 1803 },
      detailStats: {
        shoot: { finishing: 873, power: 895, composure: 867 },
        pass: { shortPass: 836, longPass: 907, accuracy: 884 },
        dribble: { breakout: 854, keeping: 888, ballTouch: 854 },
        defense: { tackle: 907, interception: 909, marking: 916 },
        physical: { jumping: 877, contact: 902, stamina: 928 },
        speed: { running: 893, agility: 910 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '高速クロス', rank: '銅', description: '発動エリア：前左右　/　発動条件：AM・RW・LW・CFの選手へのショートパス時　/　ショートパス・キック精度・ロングパスUP　/　成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '無限のアジリティ', rank: '銀', description: '発動条件：好調　/　スタミナ・敏捷性UP' },
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + igarashiObj, 'utf-8');
console.log('2. mockData.js updated with p337 (Sena Igarashi) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('igarashiSena2026Image.js')) {
  if (indexContent.includes('matsubaraKo2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/matsubaraKo2026Image.js"></script>',
      '<script src="./src/data/matsubaraKo2026Image.js"></script>\n  <script src="./src/data/igarashiSena2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/igarashiSena2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p337": "IGARASHI_SENA_2026_IMAGE"')) {
  if (appJsxCode.includes('"p336": "MATSUBARA_KO_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p336": "MATSUBARA_KO_2026_IMAGE"',
      '"p336": "MATSUBARA_KO_2026_IMAGE",\n  "p337": "IGARASHI_SENA_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p337 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p337": "IGARASHI_SENA_2026_IMAGE"')) {
  if (appJsCode.includes('"p336": "MATSUBARA_KO_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p336": "MATSUBARA_KO_2026_IMAGE"',
      '"p336": "MATSUBARA_KO_2026_IMAGE",\n  "p337": "IGARASHI_SENA_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p337 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p337 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p337');
console.log('6. Verification of p337:', p337 ? `${p337.name} (Overall: ${p337.overall}, maxOverall: ${p337.maxOverall}, Rarity: ${p337.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.IGARASHI_SENA_2026_IMAGE:', sandbox.window.IGARASHI_SENA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== SENA IGARASHI ADDED SUCCESSFULLY! ===');
