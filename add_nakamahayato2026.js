const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING HAYATO NAKAMA (p362) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787423819128.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'nakamaHayato2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.NAKAMA_HAYATO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. nakamaHayato2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p361Idx = mockCode.indexOf("id: 'p361'");
if (p361Idx === -1) {
  console.error("Could not find p361 in mockData.js!");
  process.exit(1);
}

const p361AvatarIdx = mockCode.indexOf("avatarUrl:", p361Idx);
const p361EndIdx = mockCode.indexOf("}", p361AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p361EndIdx + 1);

const nakamaObj = `,
  {
    id: 'p362',
    name: '仲間隼斗',
    readingName: 'なかま・はやと',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ドリブラーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6159,
    maxOverall: 14388,
    baseStats: { shoot: 1118, pass: 1105, dribble: 1180, defense: 995, physical: 1061, speed: 756 },
    detailStats: {
      shoot: { finishing: 362, power: 388, composure: 368 },
      pass: { shortPass: 370, longPass: 368, accuracy: 367 },
      dribble: { breakout: 394, keeping: 390, ballTouch: 396 },
      defense: { tackle: 309, interception: 349, marking: 337 },
      physical: { jumping: 325, contact: 357, stamina: 379 },
      speed: { running: 383, agility: 373 }
    },
    maxEnhanced: {
      overall: 14388,
      baseStats: { shoot: 2675, pass: 2674, dribble: 2773, defense: 2504, physical: 2606, speed: 1826 },
      detailStats: {
        shoot: { finishing: 885, power: 899, composure: 891 },
        pass: { shortPass: 893, longPass: 891, accuracy: 890 },
        dribble: { breakout: 929, keeping: 925, ballTouch: 919 },
        defense: { tackle: 820, interception: 848, marking: 836 },
        physical: { jumping: 836, contact: 868, stamina: 902 },
        speed: { running: 918, agility: 908 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・敏捷性UP' },
    abilities: [
      { name: '技巧派ドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・ボールタッチUP' },
      { name: 'ムービングターゲット', rank: '銀', description: '発動条件：絶好調　/　キープ力・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM', 'ドリブラーRW', 'ドリブラーLW'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + nakamaObj, 'utf-8');
console.log('2. mockData.js updated with p362 (Hayato Nakama) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('nakamaHayato2026Image.js')) {
  if (indexContent.includes('haraTaichi2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/haraTaichi2026Image.js"></script>',
      '<script src="./src/data/haraTaichi2026Image.js"></script>\n  <script src="./src/data/nakamaHayato2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/nakamaHayato2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p362": "NAKAMA_HAYATO_2026_IMAGE"')) {
  if (appJsxCode.includes('"p361": "HARA_TAICHI_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p361": "HARA_TAICHI_2026_IMAGE"',
      '"p361": "HARA_TAICHI_2026_IMAGE",\n  "p362": "NAKAMA_HAYATO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p362 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p362": "NAKAMA_HAYATO_2026_IMAGE"')) {
  if (appJsCode.includes('"p361": "HARA_TAICHI_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p361": "HARA_TAICHI_2026_IMAGE"',
      '"p361": "HARA_TAICHI_2026_IMAGE",\n  "p362": "NAKAMA_HAYATO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p362 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p362 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p362');
console.log('6. Verification of p362:', p362 ? `${p362.name} (Overall: ${p362.overall}, maxOverall: ${p362.maxOverall}, Rarity: ${p362.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.NAKAMA_HAYATO_2026_IMAGE:', sandbox.window.NAKAMA_HAYATO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== HAYATO NAKAMA ADDED SUCCESSFULLY! ===');
