const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YUMA SUZUKI 2025 (p291) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787383797718.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'suzukiyuma2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SUZUKIYUMA_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. suzukiyuma2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p290Idx = mockCode.indexOf("id: 'p290'");
if (p290Idx === -1) {
  console.error("Could not find p290 in mockData.js!");
  process.exit(1);
}

const p290AvatarIdx = mockCode.indexOf("avatarUrl:", p290Idx);
const p290EndIdx = mockCode.indexOf("}", p290AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p290EndIdx + 1);

const suzukiObj = `,
  {
    id: 'p291',
    name: '鈴木優磨',
    readingName: 'すずき・ゆうま',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6349,
    maxOverall: 14585,
    baseStats: { shoot: 1201, pass: 1099, dribble: 1119, defense: 963, physical: 1202, speed: 743 },
    detailStats: {
      shoot: { finishing: 383, power: 431, composure: 387 },
      pass: { shortPass: 379, longPass: 392, accuracy: 328 },
      dribble: { breakout: 360, keeping: 403, ballTouch: 356 },
      defense: { tackle: 302, interception: 331, marking: 330 },
      physical: { jumping: 381, contact: 422, stamina: 399 },
      speed: { running: 347, agility: 396 }
    },
    maxEnhanced: {
      overall: 14585,
      baseStats: { shoot: 2806, pass: 2632, dribble: 2700, defense: 2460, physical: 2783, speed: 1789 },
      detailStats: {
        shoot: { finishing: 918, power: 966, composure: 922 },
        pass: { shortPass: 890, longPass: 903, accuracy: 839 },
        dribble: { breakout: 883, keeping: 926, ballTouch: 891 },
        defense: { tackle: 801, interception: 830, marking: 829 },
        physical: { jumping: 904, contact: 957, stamina: 922 },
        speed: { running: 870, agility: 919 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '保持からの一撃', rank: '銀', description: '発動条件：途中出場　/　キック力・キープ力UP' },
      { name: '冷静な破壊者', rank: '銀', description: '発動条件：好調　/　冷静さ・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + suzukiObj, 'utf-8');
console.log('2. mockData.js updated with p291 (Yuma Suzuki 2025) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('suzukiyuma2025Image.js')) {
  if (indexContent.includes('pramanbela2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/pramanbela2026Image.js"></script>',
      '<script src="./src/data/pramanbela2026Image.js"></script>\n  <script src="./src/data/suzukiyuma2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/suzukiyuma2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p291": "SUZUKIYUMA_2025_IMAGE"')) {
  if (appJsxCode.includes('"p290": "ANTANCHEN_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p290": "ANTANCHEN_2026_IMAGE"',
      '"p290": "ANTANCHEN_2026_IMAGE",\n  "p291": "SUZUKIYUMA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p291 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p291": "SUZUKIYUMA_2025_IMAGE"')) {
  if (appJsCode.includes('"p290": "ANTANCHEN_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p290": "ANTANCHEN_2026_IMAGE"',
      '"p290": "ANTANCHEN_2026_IMAGE",\n  "p291": "SUZUKIYUMA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p291 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p291 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p291');
console.log('6. Verification of p291:', p291 ? `${p291.name} (${p291.nationality}, Overall: ${p291.overall}, Rarity: ${p291.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SUZUKIYUMA_2025_IMAGE:', sandbox.window.SUZUKIYUMA_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== YUMA SUZUKI 2025 ADDED SUCCESSFULLY! ===');
