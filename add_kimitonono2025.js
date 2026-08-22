const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KIMITO NONO (p333) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787394229592.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kimitonono2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KIMITONONO_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kimitonono2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p332Idx = mockCode.indexOf("id: 'p332'");
if (p332Idx === -1) {
  console.error("Could not find p332 in mockData.js!");
  process.exit(1);
}

const p332AvatarIdx = mockCode.indexOf("avatarUrl:", p332Idx);
const p332EndIdx = mockCode.indexOf("}", p332AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p332EndIdx + 1);

const nonoObj = `,
  {
    id: 'p333',
    name: '濃野公人',
    readingName: 'のうの・きみと',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: '攻撃的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6222,
    maxOverall: 14447,
    baseStats: { shoot: 1120, pass: 1051, dribble: 1210, defense: 1086, physical: 1079, speed: 846 },
    detailStats: {
      shoot: { finishing: 402, power: 317, composure: 401 },
      pass: { shortPass: 343, longPass: 361, accuracy: 347 },
      dribble: { breakout: 408, keeping: 393, ballTouch: 409 },
      defense: { tackle: 344, interception: 370, marking: 372 },
      physical: { jumping: 393, contact: 301, stamina: 385 },
      speed: { running: 431, agility: 415 }
    },
    maxEnhanced: {
      overall: 14447,
      baseStats: { shoot: 2617, pass: 2620, dribble: 2743, defense: 2691, physical: 2648, speed: 1916 },
      detailStats: {
        shoot: { finishing: 901, power: 816, composure: 900 },
        pass: { shortPass: 866, longPass: 884, accuracy: 870 },
        dribble: { breakout: 919, keeping: 904, ballTouch: 920 },
        defense: { tackle: 879, interception: 905, marking: 907 },
        physical: { jumping: 904, contact: 824, stamina: 920 },
        speed: { running: 966, agility: 950 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '高速のボールタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・走力UP' },
      { name: '無限のアジリティ', rank: '銀', description: '発動条件：好調　/　スタミナ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + nonoObj, 'utf-8');
console.log('2. mockData.js updated with p333 (Kimito Nono) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kimitonono2025Image.js')) {
  if (indexContent.includes('kotamuramatsu2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/kotamuramatsu2025Image.js"></script>',
      '<script src="./src/data/kotamuramatsu2025Image.js"></script>\n  <script src="./src/data/kimitonono2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/kimitonono2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p333": "KIMITONONO_2025_IMAGE"')) {
  if (appJsxCode.includes('"p332": "KOTAMURAMATSU_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p332": "KOTAMURAMATSU_2025_IMAGE"',
      '"p332": "KOTAMURAMATSU_2025_IMAGE",\n  "p333": "KIMITONONO_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p333 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p333": "KIMITONONO_2025_IMAGE"')) {
  if (appJsCode.includes('"p332": "KOTAMURAMATSU_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p332": "KOTAMURAMATSU_2025_IMAGE"',
      '"p332": "KOTAMURAMATSU_2025_IMAGE",\n  "p333": "KIMITONONO_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p333 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p333 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p333');
console.log('6. Verification of p333:', p333 ? `${p333.name} (Overall: ${p333.overall}, maxOverall: ${p333.maxOverall}, Rarity: ${p333.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KIMITONONO_2025_IMAGE:', sandbox.window.KIMITONONO_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KIMITO NONO ADDED SUCCESSFULLY! ===');
