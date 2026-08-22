const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING ARATA WATANABE (p308) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787389081822.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'aratawatanabe2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.ARATAWATANABE_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. aratawatanabe2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p307Idx = mockCode.indexOf("id: 'p307'");
if (p307Idx === -1) {
  console.error("Could not find p307 in mockData.js!");
  process.exit(1);
}

const p307AvatarIdx = mockCode.indexOf("avatarUrl:", p307Idx);
const p307EndIdx = mockCode.indexOf("}", p307AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p307EndIdx + 1);

const watanabeObj = `,
  {
    id: 'p308',
    name: '渡邊新太',
    readingName: 'わたなべ・あらた',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6115,
    maxOverall: 14347,
    baseStats: { shoot: 1169, pass: 983, dribble: 1114, defense: 848, physical: 1106, speed: 765 },
    detailStats: {
      shoot: { finishing: 399, power: 365, composure: 405 },
      pass: { shortPass: 347, longPass: 313, accuracy: 323 },
      dribble: { breakout: 371, keeping: 366, ballTouch: 377 },
      defense: { tackle: 309, interception: 277, marking: 262 },
      physical: { jumping: 394, contact: 356, stamina: 356 },
      speed: { running: 376, agility: 389 }
    },
    maxEnhanced: {
      overall: 14347,
      baseStats: { shoot: 2774, pass: 2516, dribble: 2695, defense: 2345, physical: 2687, speed: 1811 },
      detailStats: {
        shoot: { finishing: 934, power: 900, composure: 940 },
        pass: { shortPass: 858, longPass: 824, accuracy: 834 },
        dribble: { breakout: 894, keeping: 889, ballTouch: 912 },
        defense: { tackle: 808, interception: 776, marking: 761 },
        physical: { jumping: 917, contact: 891, stamina: 879 },
        speed: { running: 899, agility: 912 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '上空のスナイパー', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ジャンプUP' },
      { name: 'ゴール前の落ち着き', rank: '銀', description: '発動条件：好調　/　決定力・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + watanabeObj, 'utf-8');
console.log('2. mockData.js updated with p308 (Arata Watanabe) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('aratawatanabe2025Image.js')) {
  if (indexContent.includes('akitosuzuki2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/akitosuzuki2025Image.js"></script>',
      '<script src="./src/data/akitosuzuki2025Image.js"></script>\n  <script src="./src/data/aratawatanabe2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/aratawatanabe2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p308": "ARATAWATANABE_2025_IMAGE"')) {
  if (appJsxCode.includes('"p307": "AKITOSUZUKI_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p307": "AKITOSUZUKI_2025_IMAGE"',
      '"p307": "AKITOSUZUKI_2025_IMAGE",\n  "p308": "ARATAWATANABE_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p308 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p308": "ARATAWATANABE_2025_IMAGE"')) {
  if (appJsCode.includes('"p307": "AKITOSUZUKI_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p307": "AKITOSUZUKI_2025_IMAGE"',
      '"p307": "AKITOSUZUKI_2025_IMAGE",\n  "p308": "ARATAWATANABE_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p308 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p308 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p308');
console.log('6. Verification of p308:', p308 ? `${p308.name} (Overall: ${p308.overall}, maxOverall: ${p308.maxOverall}, Rarity: ${p308.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.ARATAWATANABE_2025_IMAGE:', sandbox.window.ARATAWATANABE_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== ARATA WATANABE ADDED SUCCESSFULLY! ===');
