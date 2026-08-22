const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING ALEX KOUTO HORIO PISANO (p366) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787424972831.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'pisanopalex2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.PISANO_ALEX_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. pisanopalex2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p365Idx = mockCode.indexOf("id: 'p365'");
if (p365Idx === -1) {
  console.error("Could not find p365 in mockData.js!");
  process.exit(1);
}

const p365AvatarIdx = mockCode.indexOf("avatarUrl:", p365Idx);
const p365EndIdx = mockCode.indexOf("}", p365AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p365EndIdx + 1);

const pisanoObj = `,
  {
    id: 'p366',
    name: 'ピサノ・アレックス幸冬堀尾',
    readingName: 'ぴさの・あれっくすこうとほりお',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6164,
    maxOverall: 14472,
    baseStats: { shoot: 911, pass: 988, dribble: 933, defense: 1178, physical: 1075, speed: 720 },
    detailStats: {
      shoot: { finishing: 292, power: 331, composure: 288 },
      pass: { shortPass: 293, longPass: 345, accuracy: 350 },
      dribble: { breakout: 319, keeping: 311, ballTouch: 303 },
      defense: { tackle: 388, interception: 428, marking: 362 },
      physical: { jumping: 376, contact: 378, stamina: 321 },
      speed: { running: 345, agility: 375 }
    },
    maxEnhanced: {
      overall: 14472,
      baseStats: { shoot: 2372, pass: 2593, dribble: 2394, defense: 2783, physical: 2668, speed: 1742 },
      detailStats: {
        shoot: { finishing: 779, power: 818, composure: 775 },
        pass: { shortPass: 828, longPass: 880, accuracy: 885 },
        dribble: { breakout: 806, keeping: 798, ballTouch: 790 },
        defense: { tackle: 923, interception: 963, marking: 897 },
        physical: { jumping: 911, contact: 913, stamina: 844 },
        speed: { running: 856, agility: 886 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: '力強い反応', rank: '銀', description: '発動条件：絶好調　/　反応速度・コンタクトUP' },
      { name: '上空の守護神', rank: '銀', description: '発動条件：好調　/　セービング・ジャンプUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM', 'ドリブラーRW', 'ドリブラーLW', 'サイドアタッカーLW'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + pisanoObj, 'utf-8');
console.log('2. mockData.js updated with p366 (Alex Kouto Horio Pisano) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('pisanopalex2026Image.js')) {
  if (indexContent.includes('taniKosei2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/taniKosei2026Image.js"></script>',
      '<script src="./src/data/taniKosei2026Image.js"></script>\n  <script src="./src/data/pisanopalex2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/pisanopalex2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p366": "PISANO_ALEX_2026_IMAGE"')) {
  if (appJsxCode.includes('"p365": "TANI_KOSEI_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p365": "TANI_KOSEI_2026_IMAGE"',
      '"p365": "TANI_KOSEI_2026_IMAGE",\n  "p366": "PISANO_ALEX_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p366 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p366": "PISANO_ALEX_2026_IMAGE"')) {
  if (appJsCode.includes('"p365": "TANI_KOSEI_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p365": "TANI_KOSEI_2026_IMAGE"',
      '"p365": "TANI_KOSEI_2026_IMAGE",\n  "p366": "PISANO_ALEX_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p366 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p366 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p366');
console.log('6. Verification of p366:', p366 ? `${p366.name} (Overall: ${p366.overall}, maxOverall: ${p366.maxOverall}, Rarity: ${p366.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.PISANO_ALEX_2026_IMAGE:', sandbox.window.PISANO_ALEX_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== ALEX KOUTO HORIO PISANO ADDED SUCCESSFULLY! ===');
