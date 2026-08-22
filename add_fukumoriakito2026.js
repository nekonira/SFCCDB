const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING AKITO FUKUMORI (p341) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787419454006.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'fukumoriAkito2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.FUKUMORI_AKITO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. fukumoriAkito2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p340Idx = mockCode.indexOf("id: 'p340'");
if (p340Idx === -1) {
  console.error("Could not find p340 in mockData.js!");
  process.exit(1);
}

const p340AvatarIdx = mockCode.indexOf("avatarUrl:", p340Idx);
const p340EndIdx = mockCode.indexOf("}", p340AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p340EndIdx + 1);

const fukumoriObj = `,
  {
    id: 'p341',
    name: '福森晃斗',
    readingName: 'ふくもり・あきと',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 5941,
    maxOverall: 14125,
    baseStats: { shoot: 1212, pass: 1263, dribble: 1182, defense: 1096, physical: 1098, speed: 681 },
    detailStats: {
      shoot: { finishing: 400, power: 402, composure: 410 },
      pass: { shortPass: 384, longPass: 426, accuracy: 453 },
      dribble: { breakout: 380, keeping: 381, ballTouch: 421 },
      defense: { tackle: 363, interception: 367, marking: 366 },
      physical: { jumping: 359, contact: 357, stamina: 382 },
      speed: { running: 305, agility: 376 }
    },
    maxEnhanced: {
      overall: 14125,
      baseStats: { shoot: 2709, pass: 2832, dribble: 2715, defense: 2701, physical: 2691, speed: 1727 },
      detailStats: {
        shoot: { finishing: 899, power: 901, composure: 909 },
        pass: { shortPass: 907, longPass: 949, accuracy: 976 },
        dribble: { breakout: 891, keeping: 892, ballTouch: 932 },
        defense: { tackle: 898, interception: 902, marking: 901 },
        physical: { jumping: 894, contact: 892, stamina: 905 },
        speed: { running: 828, agility: 899 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'ファストフィード', rank: '銅', description: '発動エリア：中中・後左中右　/　発動条件：CFの位置に居る選手へのロングパス時　/　ロングパス・キック精度UP　/　成功時に受け手のトラップ発生確率UP' },
    abilities: [
      { name: '柔軟なキッカー', rank: '銀', description: '発動条件：絶好調　/　キック精度・ボールタッチUP' },
      { name: '冷静なゲームメイク', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ロングパスUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + fukumoriObj, 'utf-8');
console.log('2. mockData.js updated with p341 (Akito Fukumori) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('fukumoriAkito2026Image.js')) {
  if (indexContent.includes('kogaTaiyo2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/kogaTaiyo2026Image.js"></script>',
      '<script src="./src/data/kogaTaiyo2026Image.js"></script>\n  <script src="./src/data/fukumoriAkito2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/fukumoriAkito2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p341": "FUKUMORI_AKITO_2026_IMAGE"')) {
  if (appJsxCode.includes('"p340": "KOGA_TAIYO_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p340": "KOGA_TAIYO_2026_IMAGE"',
      '"p340": "KOGA_TAIYO_2026_IMAGE",\n  "p341": "FUKUMORI_AKITO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p341 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p341": "FUKUMORI_AKITO_2026_IMAGE"')) {
  if (appJsCode.includes('"p340": "KOGA_TAIYO_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p340": "KOGA_TAIYO_2026_IMAGE"',
      '"p340": "KOGA_TAIYO_2026_IMAGE",\n  "p341": "FUKUMORI_AKITO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p341 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p341 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p341');
console.log('6. Verification of p341:', p341 ? `${p341.name} (Overall: ${p341.overall}, maxOverall: ${p341.maxOverall}, Rarity: ${p341.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.FUKUMORI_AKITO_2026_IMAGE:', sandbox.window.FUKUMORI_AKITO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== AKITO FUKUMORI ADDED SUCCESSFULLY! ===');
