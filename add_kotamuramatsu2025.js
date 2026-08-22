const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KOTA MURAMATSU (p332) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787394034094.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kotamuramatsu2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KOTAMURAMATSU_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kotamuramatsu2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p331Idx = mockCode.indexOf("id: 'p331'");
if (p331Idx === -1) {
  console.error("Could not find p331 in mockData.js!");
  process.exit(1);
}

const p331AvatarIdx = mockCode.indexOf("avatarUrl:", p331Idx);
const p331EndIdx = mockCode.indexOf("}", p331AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p331EndIdx + 1);

const muramatsuObj = `,
  {
    id: 'p332',
    name: '村松航太',
    readingName: 'むらまつ・こうた',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: '攻撃的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 5935,
    maxOverall: 14190,
    baseStats: { shoot: 987, pass: 1022, dribble: 1087, defense: 1025, physical: 1029, speed: 782 },
    detailStats: {
      shoot: { finishing: 323, power: 313, composure: 351 },
      pass: { shortPass: 334, longPass: 364, accuracy: 324 },
      dribble: { breakout: 374, keeping: 345, ballTouch: 368 },
      defense: { tackle: 371, interception: 335, marking: 319 },
      physical: { jumping: 335, contact: 302, stamina: 392 },
      speed: { running: 393, agility: 389 }
    },
    maxEnhanced: {
      overall: 14190,
      baseStats: { shoot: 2484, pass: 2591, dribble: 2620, defense: 2630, physical: 2598, speed: 1852 },
      detailStats: {
        shoot: { finishing: 822, power: 812, composure: 850 },
        pass: { shortPass: 857, longPass: 887, accuracy: 847 },
        dribble: { breakout: 885, keeping: 856, ballTouch: 879 },
        defense: { tackle: 906, interception: 870, marking: 854 },
        physical: { jumping: 846, contact: 825, stamina: 927 },
        speed: { running: 928, agility: 924 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'ダイナミックタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・突破力UP　/　成功時に自身のドリブル発生確率UP' },
    abilities: [
      { name: 'スピードランナー', rank: '銀', description: '発動条件：好調　/　走力・敏捷性UP' },
      { name: 'ピッチの掃除屋', rank: '銀', description: '発動条件：好調　/　タックル・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + muramatsuObj, 'utf-8');
console.log('2. mockData.js updated with p332 (Kota Muramatsu) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kotamuramatsu2025Image.js')) {
  if (indexContent.includes('yutohorigome2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/yutohorigome2025Image.js"></script>',
      '<script src="./src/data/yutohorigome2025Image.js"></script>\n  <script src="./src/data/kotamuramatsu2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/kotamuramatsu2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p332": "KOTAMURAMATSU_2025_IMAGE"')) {
  if (appJsxCode.includes('"p331": "YUTOHORIGOME_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p331": "YUTOHORIGOME_2025_IMAGE"',
      '"p331": "YUTOHORIGOME_2025_IMAGE",\n  "p332": "KOTAMURAMATSU_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p332 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p332": "KOTAMURAMATSU_2025_IMAGE"')) {
  if (appJsCode.includes('"p331": "YUTOHORIGOME_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p331": "YUTOHORIGOME_2025_IMAGE"',
      '"p331": "YUTOHORIGOME_2025_IMAGE",\n  "p332": "KOTAMURAMATSU_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p332 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p332 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p332');
console.log('6. Verification of p332:', p332 ? `${p332.name} (Overall: ${p332.overall}, maxOverall: ${p332.maxOverall}, Rarity: ${p332.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KOTAMURAMATSU_2025_IMAGE:', sandbox.window.KOTAMURAMATSU_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KOTA MURAMATSU ADDED SUCCESSFULLY! ===');
