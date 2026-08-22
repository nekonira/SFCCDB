const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YOSHINORI SUZUKI (p348) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787420811464.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'suzukiYoshinori2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SUZUKI_YOSHINORI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. suzukiYoshinori2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p347Idx = mockCode.indexOf("id: 'p347'");
if (p347Idx === -1) {
  console.error("Could not find p347 in mockData.js!");
  process.exit(1);
}

const p347AvatarIdx = mockCode.indexOf("avatarUrl:", p347Idx);
const p347EndIdx = mockCode.indexOf("}", p347AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p347EndIdx + 1);

const suzukiObj = `,
  {
    id: 'p348',
    name: '鈴木義宜',
    readingName: 'すずき・よしのり',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6158,
    maxOverall: 14430,
    baseStats: { shoot: 986, pass: 1032, dribble: 1071, defense: 1157, physical: 1185, speed: 670 },
    detailStats: {
      shoot: { finishing: 317, power: 344, composure: 325 },
      pass: { shortPass: 341, longPass: 347, accuracy: 344 },
      dribble: { breakout: 341, keeping: 367, ballTouch: 363 },
      defense: { tackle: 416, interception: 368, marking: 373 },
      physical: { jumping: 416, contact: 390, stamina: 379 },
      speed: { running: 298, agility: 372 }
    },
    maxEnhanced: {
      overall: 14430,
      baseStats: { shoot: 2483, pass: 2601, dribble: 2604, defense: 2762, physical: 2778, speed: 1716 },
      detailStats: {
        shoot: { finishing: 816, power: 843, composure: 824 },
        pass: { shortPass: 864, longPass: 870, accuracy: 867 },
        dribble: { breakout: 852, keeping: 878, ballTouch: 874 },
        defense: { tackle: 951, interception: 903, marking: 908 },
        physical: { jumping: 951, contact: 925, stamina: 902 },
        speed: { running: 821, agility: 895 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ハードタックラー', rank: '銀', description: '発動条件：好調　/　タックル・コンタクトUP' },
      { name: 'ハイタワーの天敵', rank: '銀', description: '発動条件：好調　/　マーク・ジャンプUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + suzukiObj, 'utf-8');
console.log('2. mockData.js updated with p348 (Yoshinori Suzuki) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('suzukiYoshinori2026Image.js')) {
  if (indexContent.includes('ichiharaRion2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/ichiharaRion2026Image.js"></script>',
      '<script src="./src/data/ichiharaRion2026Image.js"></script>\n  <script src="./src/data/suzukiYoshinori2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/suzukiYoshinori2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p348": "SUZUKI_YOSHINORI_2026_IMAGE"')) {
  if (appJsxCode.includes('"p347": "ICHIHARA_RION_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p347": "ICHIHARA_RION_2026_IMAGE"',
      '"p347": "ICHIHARA_RION_2026_IMAGE",\n  "p348": "SUZUKI_YOSHINORI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p348 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p348": "SUZUKI_YOSHINORI_2026_IMAGE"')) {
  if (appJsCode.includes('"p347": "ICHIHARA_RION_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p347": "ICHIHARA_RION_2026_IMAGE"',
      '"p347": "ICHIHARA_RION_2026_IMAGE",\n  "p348": "SUZUKI_YOSHINORI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p348 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p348 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p348');
console.log('6. Verification of p348:', p348 ? `${p348.name} (Overall: ${p348.overall}, maxOverall: ${p348.maxOverall}, Rarity: ${p348.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SUZUKI_YOSHINORI_2026_IMAGE:', sandbox.window.SUZUKI_YOSHINORI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== YOSHINORI SUZUKI ADDED SUCCESSFULLY! ===');
