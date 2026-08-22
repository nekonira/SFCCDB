const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MARIUS HOIBRATEN (p338) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787418937338.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'mariusHoibraten2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.MARIUS_HOIBRATEN_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. mariusHoibraten2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p337Idx = mockCode.indexOf("id: 'p337'");
if (p337Idx === -1) {
  console.error("Could not find p337 in mockData.js!");
  process.exit(1);
}

const p337AvatarIdx = mockCode.indexOf("avatarUrl:", p337Idx);
const p337EndIdx = mockCode.indexOf("}", p337AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p337EndIdx + 1);

const hoibratenObj = `,
  {
    id: 'p338',
    name: 'マリウス・ホイブラーテン',
    readingName: 'まりうす・ほいぶらーてん',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ノルウェー',
    policy: 'ポゼッション',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 6242,
    maxOverall: 14501,
    baseStats: { shoot: 899, pass: 1098, dribble: 1085, defense: 1209, physical: 1134, speed: 700 },
    detailStats: {
      shoot: { finishing: 277, power: 325, composure: 297 },
      pass: { shortPass: 376, longPass: 378, accuracy: 344 },
      dribble: { breakout: 344, keeping: 358, ballTouch: 383 },
      defense: { tackle: 403, interception: 398, marking: 408 },
      physical: { jumping: 366, contact: 392, stamina: 376 },
      speed: { running: 335, agility: 365 }
    },
    maxEnhanced: {
      overall: 14501,
      baseStats: { shoot: 2396, pass: 2667, dribble: 2618, defense: 2814, physical: 2727, speed: 1746 },
      detailStats: {
        shoot: { finishing: 776, power: 824, composure: 796 },
        pass: { shortPass: 899, longPass: 901, accuracy: 867 },
        dribble: { breakout: 855, keeping: 869, ballTouch: 894 },
        defense: { tackle: 938, interception: 933, marking: 943 },
        physical: { jumping: 901, contact: 927, stamina: 899 },
        speed: { running: 858, agility: 888 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' },
      { name: 'ハードタックラー', rank: '銀', description: '発動条件：好調　/　タックル・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + hoibratenObj, 'utf-8');
console.log('2. mockData.js updated with p338 (Marius Hoibraten) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('mariusHoibraten2026Image.js')) {
  if (indexContent.includes('igarashiSena2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/igarashiSena2026Image.js"></script>',
      '<script src="./src/data/igarashiSena2026Image.js"></script>\n  <script src="./src/data/mariusHoibraten2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/mariusHoibraten2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p338": "MARIUS_HOIBRATEN_2026_IMAGE"')) {
  if (appJsxCode.includes('"p337": "IGARASHI_SENA_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p337": "IGARASHI_SENA_2026_IMAGE"',
      '"p337": "IGARASHI_SENA_2026_IMAGE",\n  "p338": "MARIUS_HOIBRATEN_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p338 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p338": "MARIUS_HOIBRATEN_2026_IMAGE"')) {
  if (appJsCode.includes('"p337": "IGARASHI_SENA_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p337": "IGARASHI_SENA_2026_IMAGE"',
      '"p337": "IGARASHI_SENA_2026_IMAGE",\n  "p338": "MARIUS_HOIBRATEN_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p338 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p338 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p338');
console.log('6. Verification of p338:', p338 ? `${p338.name} (Overall: ${p338.overall}, maxOverall: ${p338.maxOverall}, Rarity: ${p338.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.MARIUS_HOIBRATEN_2026_IMAGE:', sandbox.window.MARIUS_HOIBRATEN_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== MARIUS HOIBRATEN ADDED SUCCESSFULLY! ===');
