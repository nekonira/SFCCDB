const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING RION ICHIHARA (p347) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787420650264.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'ichiharaRion2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.ICHIHARA_RION_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. ichiharaRion2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p346Idx = mockCode.indexOf("id: 'p346'");
if (p346Idx === -1) {
  console.error("Could not find p346 in mockData.js!");
  process.exit(1);
}

const p346AvatarIdx = mockCode.indexOf("avatarUrl:", p346Idx);
const p346EndIdx = mockCode.indexOf("}", p346AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p346EndIdx + 1);

const ichiharaObj = `,
  {
    id: 'p347',
    name: '市原吏音',
    readingName: 'いちはら・りおん',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6149,
    maxOverall: 14416,
    baseStats: { shoot: 971, pass: 971, dribble: 991, defense: 1177, physical: 1184, speed: 714 },
    detailStats: {
      shoot: { finishing: 315, power: 338, composure: 318 },
      pass: { shortPass: 321, longPass: 355, accuracy: 295 },
      dribble: { breakout: 320, keeping: 321, ballTouch: 350 },
      defense: { tackle: 397, interception: 359, marking: 421 },
      physical: { jumping: 420, contact: 394, stamina: 370 },
      speed: { running: 333, agility: 381 }
    },
    maxEnhanced: {
      overall: 14416,
      baseStats: { shoot: 2468, pass: 2540, dribble: 2524, defense: 2782, physical: 2777, speed: 1760 },
      detailStats: {
        shoot: { finishing: 814, power: 837, composure: 817 },
        pass: { shortPass: 844, longPass: 878, accuracy: 818 },
        dribble: { breakout: 831, keeping: 832, ballTouch: 861 },
        defense: { tackle: 932, interception: 894, marking: 956 },
        physical: { jumping: 955, contact: 929, stamina: 893 },
        speed: { running: 856, agility: 904 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' },
      { name: 'パワフルジャンパー', rank: '銀', description: '発動条件：好調　/　ジャンプ・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + ichiharaObj, 'utf-8');
console.log('2. mockData.js updated with p347 (Rion Ichihara) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('ichiharaRion2026Image.js')) {
  if (indexContent.includes('kamiyamaKyosuke2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/kamiyamaKyosuke2026Image.js"></script>',
      '<script src="./src/data/kamiyamaKyosuke2026Image.js"></script>\n  <script src="./src/data/ichiharaRion2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/ichiharaRion2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p347": "ICHIHARA_RION_2026_IMAGE"')) {
  if (appJsxCode.includes('"p346": "KAMIYAMA_KYOSUKE_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p346": "KAMIYAMA_KYOSUKE_2026_IMAGE"',
      '"p346": "KAMIYAMA_KYOSUKE_2026_IMAGE",\n  "p347": "ICHIHARA_RION_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p347 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p347": "ICHIHARA_RION_2026_IMAGE"')) {
  if (appJsCode.includes('"p346": "KAMIYAMA_KYOSUKE_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p346": "KAMIYAMA_KYOSUKE_2026_IMAGE"',
      '"p346": "KAMIYAMA_KYOSUKE_2026_IMAGE",\n  "p347": "ICHIHARA_RION_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p347 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p347 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p347');
console.log('6. Verification of p347:', p347 ? `${p347.name} (Overall: ${p347.overall}, maxOverall: ${p347.maxOverall}, Rarity: ${p347.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.ICHIHARA_RION_2026_IMAGE:', sandbox.window.ICHIHARA_RION_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== RION ICHIHARA ADDED SUCCESSFULLY! ===');
