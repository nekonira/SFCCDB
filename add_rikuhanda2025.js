const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING RIKU HANDA (p334) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787394389628.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'rikuhanda2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.RIKUHANDA_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. rikuhanda2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p333Idx = mockCode.indexOf("id: 'p333'");
if (p333Idx === -1) {
  console.error("Could not find p333 in mockData.js!");
  process.exit(1);
}

const p333AvatarIdx = mockCode.indexOf("avatarUrl:", p333Idx);
const p333EndIdx = mockCode.indexOf("}", p333AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p333EndIdx + 1);

const handaObj = `,
  {
    id: 'p334',
    name: '半田陸',
    readingName: 'はんだ・りく',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: '攻撃的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6175,
    maxOverall: 14413,
    baseStats: { shoot: 1015, pass: 1077, dribble: 1150, defense: 1177, physical: 1094, speed: 775 },
    detailStats: {
      shoot: { finishing: 319, power: 358, composure: 338 },
      pass: { shortPass: 374, longPass: 365, accuracy: 338 },
      dribble: { breakout: 389, keeping: 372, ballTouch: 389 },
      defense: { tackle: 389, interception: 403, marking: 385 },
      physical: { jumping: 338, contact: 346, stamina: 410 },
      speed: { running: 396, agility: 379 }
    },
    maxEnhanced: {
      overall: 14413,
      baseStats: { shoot: 2512, pass: 2646, dribble: 2683, defense: 2782, physical: 2663, speed: 1845 },
      detailStats: {
        shoot: { finishing: 818, power: 857, composure: 837 },
        pass: { shortPass: 897, longPass: 888, accuracy: 861 },
        dribble: { breakout: 900, keeping: 883, ballTouch: 900 },
        defense: { tackle: 924, interception: 938, marking: 920 },
        physical: { jumping: 849, contact: 869, stamina: 945 },
        speed: { running: 931, agility: 914 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '反撃のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: 'マラソンマン', rank: '銀', description: '発動条件：途中出場　/　スタミナ・走力UP' },
      { name: 'ボールスティーラー', rank: '銀', description: '発動条件：途中出場　/　タックル・パスカットUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + handaObj, 'utf-8');
console.log('2. mockData.js updated with p334 (Riku Handa) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('rikuhanda2025Image.js')) {
  if (indexContent.includes('kimitonono2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/kimitonono2025Image.js"></script>',
      '<script src="./src/data/kimitonono2025Image.js"></script>\n  <script src="./src/data/rikuhanda2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/rikuhanda2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p334": "RIKUHANDA_2025_IMAGE"')) {
  if (appJsxCode.includes('"p333": "KIMITONONO_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p333": "KIMITONONO_2025_IMAGE"',
      '"p333": "KIMITONONO_2025_IMAGE",\n  "p334": "RIKUHANDA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p334 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p334": "RIKUHANDA_2025_IMAGE"')) {
  if (appJsCode.includes('"p333": "KIMITONONO_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p333": "KIMITONONO_2025_IMAGE"',
      '"p333": "KIMITONONO_2025_IMAGE",\n  "p334": "RIKUHANDA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p334 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p334 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p334');
console.log('6. Verification of p334:', p334 ? `${p334.name} (Overall: ${p334.overall}, maxOverall: ${p334.maxOverall}, Rarity: ${p334.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.RIKUHANDA_2025_IMAGE:', sandbox.window.RIKUHANDA_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== RIKU HANDA ADDED SUCCESSFULLY! ===');
