const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TAKASHI INUI (p353) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787421970339.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'inuiTakashi2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.INUI_TAKASHI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. inuiTakashi2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p352Idx = mockCode.indexOf("id: 'p352'");
if (p352Idx === -1) {
  console.error("Could not find p352 in mockData.js!");
  process.exit(1);
}

const p352AvatarIdx = mockCode.indexOf("avatarUrl:", p352Idx);
const p352EndIdx = mockCode.indexOf("}", p352AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p352EndIdx + 1);

const inuiObj = `,
  {
    id: 'p353',
    name: '乾貴士',
    readingName: 'いぬい・たかし',
    category: 'MF',
    mainPosition: 'LM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ドリブラーLM',
    playStyleLevel: 'Ⅱ',
    overall: 6302,
    maxOverall: 14519,
    baseStats: { shoot: 1154, pass: 1162, dribble: 1288, defense: 899, physical: 903, speed: 765 },
    detailStats: {
      shoot: { finishing: 370, power: 362, composure: 422 },
      pass: { shortPass: 412, longPass: 371, accuracy: 379 },
      dribble: { breakout: 416, keeping: 424, ballTouch: 448 },
      defense: { tackle: 270, interception: 308, marking: 321 },
      physical: { jumping: 266, contact: 257, stamina: 380 },
      speed: { running: 368, agility: 397 }
    },
    maxEnhanced: {
      overall: 14519,
      baseStats: { shoot: 2711, pass: 2731, dribble: 2881, defense: 2408, physical: 2448, speed: 1835 },
      detailStats: {
        shoot: { finishing: 893, power: 873, composure: 945 },
        pass: { shortPass: 935, longPass: 894, accuracy: 902 },
        dribble: { breakout: 951, keeping: 959, ballTouch: 971 },
        defense: { tackle: 781, interception: 807, marking: 820 },
        physical: { jumping: 777, contact: 768, stamina: 903 },
        speed: { running: 903, agility: 932 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '高速クロス', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：クロス時　/　ロングパス・キック精度UP　/　成功時に受け手のヘディングシュート発生確率UP' },
    abilities: [
      { name: '技巧派ドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・ボールタッチUP' },
      { name: '冷静なボールキープ', rank: '銀', description: '発動条件：好調　/　冷静さ・キープ力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + inuiObj, 'utf-8');
console.log('2. mockData.js updated with p353 (Takashi Inui) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('inuiTakashi2026Image.js')) {
  if (indexContent.includes('taniguchiHiroto2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/taniguchiHiroto2026Image.js"></script>',
      '<script src="./src/data/taniguchiHiroto2026Image.js"></script>\n  <script src="./src/data/inuiTakashi2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/inuiTakashi2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p353": "INUI_TAKASHI_2026_IMAGE"')) {
  if (appJsxCode.includes('"p352": "TANIGUCHI_HIROTO_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p352": "TANIGUCHI_HIROTO_2026_IMAGE"',
      '"p352": "TANIGUCHI_HIROTO_2026_IMAGE",\n  "p353": "INUI_TAKASHI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p353 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p353": "INUI_TAKASHI_2026_IMAGE"')) {
  if (appJsCode.includes('"p352": "TANIGUCHI_HIROTO_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p352": "TANIGUCHI_HIROTO_2026_IMAGE"',
      '"p352": "TANIGUCHI_HIROTO_2026_IMAGE",\n  "p353": "INUI_TAKASHI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p353 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p353 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p353');
console.log('6. Verification of p353:', p353 ? `${p353.name} (Overall: ${p353.overall}, maxOverall: ${p353.maxOverall}, Rarity: ${p353.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.INUI_TAKASHI_2026_IMAGE:', sandbox.window.INUI_TAKASHI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== TAKASHI INUI ADDED SUCCESSFULLY! ===');
