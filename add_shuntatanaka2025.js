const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING SHUNTA TANAKA (p322) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787392079905.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'shuntatanaka2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SHUNTATANAKA_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. shuntatanaka2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p321Idx = mockCode.indexOf("id: 'p321'");
if (p321Idx === -1) {
  console.error("Could not find p321 in mockData.js!");
  process.exit(1);
}

const p321AvatarIdx = mockCode.indexOf("avatarUrl:", p321Idx);
const p321EndIdx = mockCode.indexOf("}", p321AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p321EndIdx + 1);

const tanakaObj = `,
  {
    id: 'p322',
    name: '田中駿汰',
    readingName: 'たなか・しゅんた',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 6038,
    maxOverall: 14136,
    baseStats: { shoot: 1038, pass: 1154, dribble: 1151, defense: 1181, physical: 1101, speed: 716 },
    detailStats: {
      shoot: { finishing: 346, power: 355, composure: 337 },
      pass: { shortPass: 387, longPass: 385, accuracy: 382 },
      dribble: { breakout: 362, keeping: 386, ballTouch: 403 },
      defense: { tackle: 374, interception: 403, marking: 404 },
      physical: { jumping: 344, contact: 379, stamina: 378 },
      speed: { running: 354, agility: 362 }
    },
    maxEnhanced: {
      overall: 14136,
      baseStats: { shoot: 2583, pass: 2759, dribble: 2684, defense: 2762, physical: 2670, speed: 1738 },
      detailStats: {
        shoot: { finishing: 857, power: 866, composure: 860 },
        pass: { shortPass: 922, longPass: 920, accuracy: 917 },
        dribble: { breakout: 873, keeping: 897, ballTouch: 914 },
        defense: { tackle: 909, interception: 926, marking: 927 },
        physical: { jumping: 855, contact: 902, stamina: 913 },
        speed: { running: 865, agility: 873 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：前中・中全・後全　/　発動条件：パスカット時　/　パスカット・タックルUP' },
    abilities: [
      { name: 'リスクヘッジパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・マークUP' },
      { name: '流れを切るロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・パスカットUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + tanakaObj, 'utf-8');
console.log('2. mockData.js updated with p322 (Shunta Tanaka) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('shuntatanaka2025Image.js')) {
  if (indexContent.includes('shoinagaki2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/shoinagaki2025Image.js"></script>',
      '<script src="./src/data/shoinagaki2025Image.js"></script>\n  <script src="./src/data/shuntatanaka2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/shuntatanaka2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p322": "SHUNTATANAKA_2025_IMAGE"')) {
  if (appJsxCode.includes('"p321": "SHOINAGAKI_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p321": "SHOINAGAKI_2025_IMAGE"',
      '"p321": "SHOINAGAKI_2025_IMAGE",\n  "p322": "SHUNTATANAKA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p322 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p322": "SHUNTATANAKA_2025_IMAGE"')) {
  if (appJsCode.includes('"p321": "SHOINAGAKI_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p321": "SHOINAGAKI_2025_IMAGE"',
      '"p321": "SHOINAGAKI_2025_IMAGE",\n  "p322": "SHUNTATANAKA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p322 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p322 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p322');
console.log('6. Verification of p322:', p322 ? `${p322.name} (Overall: ${p322.overall}, maxOverall: ${p322.maxOverall}, Rarity: ${p322.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SHUNTATANAKA_2025_IMAGE:', sandbox.window.SHUNTATANAKA_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== SHUNTA TANAKA ADDED SUCCESSFULLY! ===');
