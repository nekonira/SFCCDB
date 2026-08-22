const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YUTO IWASAKI (p354) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787422143209.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'iwasakiYuto2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.IWASAKI_YUTO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. iwasakiYuto2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p353Idx = mockCode.indexOf("id: 'p353'");
if (p353Idx === -1) {
  console.error("Could not find p353 in mockData.js!");
  process.exit(1);
}

const p353AvatarIdx = mockCode.indexOf("avatarUrl:", p353Idx);
const p353EndIdx = mockCode.indexOf("}", p353AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p353EndIdx + 1);

const iwasakiObj = `,
  {
    id: 'p354',
    name: '岩崎悠人',
    readingName: 'いわさき・ゆうと',
    category: 'MF',
    mainPosition: 'LM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ドリブラーLM',
    playStyleLevel: 'Ⅱ',
    overall: 6194,
    maxOverall: 14431,
    baseStats: { shoot: 1122, pass: 1092, dribble: 1156, defense: 1033, physical: 1166, speed: 765 },
    detailStats: {
      shoot: { finishing: 366, power: 378, composure: 378 },
      pass: { shortPass: 371, longPass: 373, accuracy: 348 },
      dribble: { breakout: 392, keeping: 385, ballTouch: 379 },
      defense: { tackle: 339, interception: 351, marking: 343 },
      physical: { jumping: 374, contact: 374, stamina: 418 },
      speed: { running: 408, agility: 357 }
    },
    maxEnhanced: {
      overall: 14431,
      baseStats: { shoot: 2679, pass: 2661, dribble: 2749, defense: 2542, physical: 2711, speed: 1835 },
      detailStats: {
        shoot: { finishing: 889, power: 889, composure: 901 },
        pass: { shortPass: 894, longPass: 896, accuracy: 871 },
        dribble: { breakout: 927, keeping: 920, ballTouch: 902 },
        defense: { tackle: 850, interception: 850, marking: 842 },
        physical: { jumping: 885, contact: 885, stamina: 941 },
        speed: { running: 943, agility: 892 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・ボールタッチUP' },
    abilities: [
      { name: 'スピードドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・走力UP' },
      { name: '不屈の魂', rank: '銀', description: '発動条件：好調　/　キープ力・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + iwasakiObj, 'utf-8');
console.log('2. mockData.js updated with p354 (Yuto Iwasaki) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('iwasakiYuto2026Image.js')) {
  if (indexContent.includes('inuiTakashi2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/inuiTakashi2026Image.js"></script>',
      '<script src="./src/data/inuiTakashi2026Image.js"></script>\n  <script src="./src/data/iwasakiYuto2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/iwasakiYuto2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p354": "IWASAKI_YUTO_2026_IMAGE"')) {
  if (appJsxCode.includes('"p353": "INUI_TAKASHI_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p353": "INUI_TAKASHI_2026_IMAGE"',
      '"p353": "INUI_TAKASHI_2026_IMAGE",\n  "p354": "IWASAKI_YUTO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p354 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p354": "IWASAKI_YUTO_2026_IMAGE"')) {
  if (appJsCode.includes('"p353": "INUI_TAKASHI_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p353": "INUI_TAKASHI_2026_IMAGE"',
      '"p353": "INUI_TAKASHI_2026_IMAGE",\n  "p354": "IWASAKI_YUTO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p354 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p354 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p354');
console.log('6. Verification of p354:', p354 ? `${p354.name} (Overall: ${p354.overall}, maxOverall: ${p354.maxOverall}, Rarity: ${p354.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.IWASAKI_YUTO_2026_IMAGE:', sandbox.window.IWASAKI_YUTO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== YUTO IWASAKI ADDED SUCCESSFULLY! ===');
