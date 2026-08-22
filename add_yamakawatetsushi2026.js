const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TETSUSHI YAMAKAWA (p349) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787420938326.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yamakawaTetsushi2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YAMAKAWA_TETSUSHI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. yamakawaTetsushi2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p348Idx = mockCode.indexOf("id: 'p348'");
if (p348Idx === -1) {
  console.error("Could not find p348 in mockData.js!");
  process.exit(1);
}

const p348AvatarIdx = mockCode.indexOf("avatarUrl:", p348Idx);
const p348EndIdx = mockCode.indexOf("}", p348AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p348EndIdx + 1);

const yamakawaObj = `,
  {
    id: 'p349',
    name: '山川哲史',
    readingName: 'やまかわ・てつし',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6233,
    maxOverall: 14500,
    baseStats: { shoot: 1025, pass: 1002, dribble: 984, defense: 1209, physical: 1166, speed: 696 },
    detailStats: {
      shoot: { finishing: 317, power: 387, composure: 321 },
      pass: { shortPass: 346, longPass: 352, accuracy: 304 },
      dribble: { breakout: 323, keeping: 326, ballTouch: 335 },
      defense: { tackle: 416, interception: 382, marking: 411 },
      physical: { jumping: 395, contact: 415, stamina: 356 },
      speed: { running: 343, agility: 353 }
    },
    maxEnhanced: {
      overall: 14500,
      baseStats: { shoot: 2522, pass: 2571, dribble: 2517, defense: 2814, physical: 2759, speed: 1742 },
      detailStats: {
        shoot: { finishing: 816, power: 886, composure: 820 },
        pass: { shortPass: 869, longPass: 875, accuracy: 827 },
        dribble: { breakout: 834, keeping: 837, ballTouch: 846 },
        defense: { tackle: 951, interception: 917, marking: 946 },
        physical: { jumping: 930, contact: 950, stamina: 879 },
        speed: { running: 866, agility: 876 }
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

fs.writeFileSync(mockPath, mockCodeHeader + yamakawaObj, 'utf-8');
console.log('2. mockData.js updated with p349 (Tetsushi Yamakawa) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('yamakawaTetsushi2026Image.js')) {
  if (indexContent.includes('suzukiYoshinori2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/suzukiYoshinori2026Image.js"></script>',
      '<script src="./src/data/suzukiYoshinori2026Image.js"></script>\n  <script src="./src/data/yamakawaTetsushi2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/yamakawaTetsushi2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p349": "YAMAKAWA_TETSUSHI_2026_IMAGE"')) {
  if (appJsxCode.includes('"p348": "SUZUKI_YOSHINORI_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p348": "SUZUKI_YOSHINORI_2026_IMAGE"',
      '"p348": "SUZUKI_YOSHINORI_2026_IMAGE",\n  "p349": "YAMAKAWA_TETSUSHI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p349 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p349": "YAMAKAWA_TETSUSHI_2026_IMAGE"')) {
  if (appJsCode.includes('"p348": "SUZUKI_YOSHINORI_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p348": "SUZUKI_YOSHINORI_2026_IMAGE"',
      '"p348": "SUZUKI_YOSHINORI_2026_IMAGE",\n  "p349": "YAMAKAWA_TETSUSHI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p349 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p349 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p349');
console.log('6. Verification of p349:', p349 ? `${p349.name} (Overall: ${p349.overall}, maxOverall: ${p349.maxOverall}, Rarity: ${p349.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.YAMAKAWA_TETSUSHI_2026_IMAGE:', sandbox.window.YAMAKAWA_TETSUSHI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== TETSUSHI YAMAKAWA ADDED SUCCESSFULLY! ===');
