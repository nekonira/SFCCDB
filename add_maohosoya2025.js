const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MAO HOSOYA (p301) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787387002404.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'maohosoya2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.MAOHOSOYA_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. maohosoya2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p300Idx = mockCode.indexOf("id: 'p300'");
if (p300Idx === -1) {
  console.error("Could not find p300 in mockData.js!");
  process.exit(1);
}

const p300AvatarIdx = mockCode.indexOf("avatarUrl:", p300Idx);
const p300EndIdx = mockCode.indexOf("}", p300AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p300EndIdx + 1);

const hosoyaObj = `,
  {
    id: 'p301',
    name: '細谷真大',
    readingName: 'ほそや・まひろ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6155,
    maxOverall: 14367,
    baseStats: { shoot: 1104, pass: 1078, dribble: 1143, defense: 936, physical: 1141, speed: 854 },
    detailStats: {
      shoot: { finishing: 376, power: 348, composure: 380 },
      pass: { shortPass: 371, longPass: 353, accuracy: 354 },
      dribble: { breakout: 394, keeping: 378, ballTouch: 371 },
      defense: { tackle: 317, interception: 316, marking: 303 },
      physical: { jumping: 367, contact: 364, stamina: 410 },
      speed: { running: 397, agility: 457 }
    },
    maxEnhanced: {
      overall: 14367,
      baseStats: { shoot: 2709, pass: 2611, dribble: 2724, defense: 2433, physical: 2722, speed: 1900 },
      detailStats: {
        shoot: { finishing: 911, power: 883, composure: 915 },
        pass: { shortPass: 882, longPass: 864, accuracy: 865 },
        dribble: { breakout: 917, keeping: 901, ballTouch: 906 },
        defense: { tackle: 816, interception: 815, marking: 802 },
        physical: { jumping: 890, contact: 899, stamina: 933 },
        speed: { running: 920, agility: 980 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'スピードランナー', rank: '銀', description: '発動条件：好調　/　走力・敏捷性UP' },
      { name: '不屈のドリブル突破', rank: '銀', description: '発動条件：絶好調　/　突破力・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + hosoyaObj, 'utf-8');
console.log('2. mockData.js updated with p301 (Hosoya) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('maohosoya2025Image.js')) {
  if (indexContent.includes('kensukenagai2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/kensukenagai2025Image.js"></script>',
      '<script src="./src/data/kensukenagai2025Image.js"></script>\n  <script src="./src/data/maohosoya2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/maohosoya2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p301": "MAOHOSOYA_2025_IMAGE"')) {
  if (appJsxCode.includes('"p300": "KENSUKENAGAI_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p300": "KENSUKENAGAI_2025_IMAGE"',
      '"p300": "KENSUKENAGAI_2025_IMAGE",\n  "p301": "MAOHOSOYA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p301 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p301": "MAOHOSOYA_2025_IMAGE"')) {
  if (appJsCode.includes('"p300": "KENSUKENAGAI_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p300": "KENSUKENAGAI_2025_IMAGE"',
      '"p300": "KENSUKENAGAI_2025_IMAGE",\n  "p301": "MAOHOSOYA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p301 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p301 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p301');
console.log('6. Verification of p301:', p301 ? `${p301.name} (Overall: ${p301.overall}, maxOverall: ${p301.maxOverall}, Rarity: ${p301.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.MAOHOSOYA_2025_IMAGE:', sandbox.window.MAOHOSOYA_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== MAO HOSOYA ADDED SUCCESSFULLY! ===');
