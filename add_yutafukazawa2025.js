const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YUTA FUKAZAWA (p325) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787392771559.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yutafukazawa2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YUTAFUKAZAWA_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. yutafukazawa2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p324Idx = mockCode.indexOf("id: 'p324'");
if (p324Idx === -1) {
  console.error("Could not find p324 in mockData.js!");
  process.exit(1);
}

const p324AvatarIdx = mockCode.indexOf("avatarUrl:", p324Idx);
const p324EndIdx = mockCode.indexOf("}", p324AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p324EndIdx + 1);

const fukazawaObj = `,
  {
    id: 'p325',
    name: '深澤佑太',
    readingName: 'ふかざわ・ゆうた',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 5850,
    maxOverall: 13965,
    baseStats: { shoot: 1088, pass: 1060, dribble: 1176, defense: 1111, physical: 1077, speed: 802 },
    detailStats: {
      shoot: { finishing: 362, power: 364, composure: 362 },
      pass: { shortPass: 358, longPass: 348, accuracy: 354 },
      dribble: { breakout: 398, keeping: 382, ballTouch: 396 },
      defense: { tackle: 393, interception: 366, marking: 352 },
      physical: { jumping: 349, contact: 346, stamina: 382 },
      speed: { running: 383, agility: 419 }
    },
    maxEnhanced: {
      overall: 13965,
      baseStats: { shoot: 2633, pass: 2665, dribble: 2709, defense: 2692, physical: 2646, speed: 1824 },
      detailStats: {
        shoot: { finishing: 873, power: 875, composure: 885 },
        pass: { shortPass: 893, longPass: 883, accuracy: 889 },
        dribble: { breakout: 909, keeping: 893, ballTouch: 907 },
        defense: { tackle: 928, interception: 889, marking: 875 },
        physical: { jumping: 860, contact: 869, stamina: 917 },
        speed: { running: 894, agility: 930 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: '無限のアジリティ', rank: '銀', description: '発動条件：好調　/　スタミナ・敏捷性UP' },
      { name: '反転攻勢', rank: '銀', description: '発動条件：絶好調　/　タックル・ショートパスUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + fukazawaObj, 'utf-8');
console.log('2. mockData.js updated with p325 (Yuta Fukazawa) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('yutafukazawa2025Image.js')) {
  if (indexContent.includes('takumaarano2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/takumaarano2025Image.js"></script>',
      '<script src="./src/data/takumaarano2025Image.js"></script>\n  <script src="./src/data/yutafukazawa2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/yutafukazawa2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p325": "YUTAFUKAZAWA_2025_IMAGE"')) {
  if (appJsxCode.includes('"p324": "TAKUMAARANO_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p324": "TAKUMAARANO_2025_IMAGE"',
      '"p324": "TAKUMAARANO_2025_IMAGE",\n  "p325": "YUTAFUKAZAWA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p325 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p325": "YUTAFUKAZAWA_2025_IMAGE"')) {
  if (appJsCode.includes('"p324": "TAKUMAARANO_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p324": "TAKUMAARANO_2025_IMAGE"',
      '"p324": "TAKUMAARANO_2025_IMAGE",\n  "p325": "YUTAFUKAZAWA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p325 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p325 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p325');
console.log('6. Verification of p325:', p325 ? `${p325.name} (Overall: ${p325.overall}, maxOverall: ${p325.maxOverall}, Rarity: ${p325.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.YUTAFUKAZAWA_2025_IMAGE:', sandbox.window.YUTAFUKAZAWA_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== YUTA FUKAZAWA ADDED SUCCESSFULLY! ===');
