const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KOSEI TANI (p365) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787424781092.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'taniKosei2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.TANI_KOSEI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. taniKosei2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p364Idx = mockCode.indexOf("id: 'p364'");
if (p364Idx === -1) {
  console.error("Could not find p364 in mockData.js!");
  process.exit(1);
}

const p364AvatarIdx = mockCode.indexOf("avatarUrl:", p364Idx);
const p364EndIdx = mockCode.indexOf("}", p364AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p364EndIdx + 1);

const taniObj = `,
  {
    id: 'p365',
    name: '谷晃生',
    readingName: 'たに・こうせい',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6230,
    maxOverall: 14506,
    baseStats: { shoot: 921, pass: 1050, dribble: 1042, defense: 1178, physical: 1120, speed: 785 },
    detailStats: {
      shoot: { finishing: 293, power: 311, composure: 317 },
      pass: { shortPass: 329, longPass: 351, accuracy: 370 },
      dribble: { breakout: 365, keeping: 330, ballTouch: 347 },
      defense: { tackle: 371, interception: 413, marking: 394 },
      physical: { jumping: 419, contact: 356, stamina: 345 },
      speed: { running: 359, agility: 426 }
    },
    maxEnhanced: {
      overall: 14506,
      baseStats: { shoot: 2382, pass: 2655, dribble: 2503, defense: 2783, physical: 2713, speed: 1807 },
      detailStats: {
        shoot: { finishing: 780, power: 798, composure: 804 },
        pass: { shortPass: 864, longPass: 886, accuracy: 905 },
        dribble: { breakout: 852, keeping: 817, ballTouch: 834 },
        defense: { tackle: 906, interception: 948, marking: 929 },
        physical: { jumping: 954, contact: 891, stamina: 868 },
        speed: { running: 870, agility: 937 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: 'ファストフィード', rank: '銅', description: '発動エリア：後中　/　発動条件：パントキック時　/　ロングパス・キック精度UP' },
    abilities: [
      { name: 'アジャイルジャンパー', rank: '銀', description: '発動条件：途中出場　/　ジャンプ・敏捷性UP' },
      { name: '冷静沈着', rank: '銀', description: '発動条件：途中出場　/　反応速度・1VS1UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM', 'ドリブラーRW', 'ドリブラーLW', 'サイドアタッカーLW'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + taniObj, 'utf-8');
console.log('2. mockData.js updated with p365 (Kosei Tani) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('taniKosei2026Image.js')) {
  if (indexContent.includes('mutoYoshinori2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/mutoYoshinori2026Image.js"></script>',
      '<script src="./src/data/mutoYoshinori2026Image.js"></script>\n  <script src="./src/data/taniKosei2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/taniKosei2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p365": "TANI_KOSEI_2026_IMAGE"')) {
  if (appJsxCode.includes('"p364": "MUTO_YOSHINORI_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p364": "MUTO_YOSHINORI_2026_IMAGE"',
      '"p364": "MUTO_YOSHINORI_2026_IMAGE",\n  "p365": "TANI_KOSEI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p365 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p365": "TANI_KOSEI_2026_IMAGE"')) {
  if (appJsCode.includes('"p364": "MUTO_YOSHINORI_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p364": "MUTO_YOSHINORI_2026_IMAGE"',
      '"p364": "MUTO_YOSHINORI_2026_IMAGE",\n  "p365": "TANI_KOSEI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p365 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p365 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p365');
console.log('6. Verification of p365:', p365 ? `${p365.name} (Overall: ${p365.overall}, maxOverall: ${p365.maxOverall}, Rarity: ${p365.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.TANI_KOSEI_2026_IMAGE:', sandbox.window.TANI_KOSEI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KOSEI TANI ADDED SUCCESSFULLY! ===');
