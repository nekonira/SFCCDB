const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MIKEL OYARZABAL 2026 (p379) ===');

// 1. Image conversion to base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\065e7940-0695-40eb-8c99-d6e5b2225fa9\\.user_uploaded\\media_1788927084561.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'mikelOyarzabal2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.MIKEL_OYARZABAL_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. mikelOyarzabal2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p378Idx = mockCode.indexOf("id: 'p378'");
if (p378Idx === -1) {
  console.error("Could not find p378 in mockData.js!");
  process.exit(1);
}

const p378AvatarIdx = mockCode.indexOf("avatarUrl:", p378Idx);
const p378EndIdx = mockCode.indexOf("}", p378AvatarIdx);

const headerCode = mockCode.substring(0, p378EndIdx + 1);

const oyarzabal2026Obj = `,
  {
    id: 'p379',
    name: 'ミケル・オヤルサバル',
    readingName: 'みけるおやるさばる',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'ポゼッション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅲ',
    overall: 7199,
    maxOverall: 15442,
    baseStats: { shoot: 1428, pass: 1188, dribble: 1256, defense: 913, physical: 1143, speed: 894 },
    detailStats: {
      shoot: { finishing: 483, power: 469, composure: 476 },
      pass: { shortPass: 416, longPass: 387, accuracy: 385 },
      dribble: { breakout: 412, keeping: 425, ballTouch: 419 },
      defense: { tackle: 300, interception: 309, marking: 304 },
      physical: { jumping: 360, contact: 392, stamina: 391 },
      speed: { running: 439, agility: 455 }
    },
    maxEnhanced: {
      overall: 15442,
      baseStats: { shoot: 3033, pass: 2721, dribble: 2837, defense: 2410, physical: 2724, speed: 1940 },
      detailStats: {
        shoot: { finishing: 1018, power: 1004, composure: 1011 },
        pass: { shortPass: 927, longPass: 898, accuracy: 896 },
        dribble: { breakout: 935, keeping: 948, ballTouch: 954 },
        defense: { tackle: 799, interception: 808, marking: 803 },
        physical: { jumping: 883, contact: 927, stamina: 914 },
        speed: { running: 962, agility: 978 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: 'コントロールショット', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'シュートセンス', rank: '銀', description: '発動条件：絶好調　/　決定力・キック力UP' },
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' },
      { name: '高速のボールタッチ', rank: '銅', description: '発動条件：好調　/　ボールタッチ・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + oyarzabal2026Obj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p379.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('mikelOyarzabal2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/florianThauvin2026Image.js"></script>',
    '<script src="./src/data/florianThauvin2026Image.js"></script>\n  <script src="./src/data/mikelOyarzabal2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p379": "MIKEL_OYARZABAL_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p378": "FLORIAN_THAUVIN_2026_IMAGE"',
    '"p378": "FLORIAN_THAUVIN_2026_IMAGE",\n    "p379": "MIKEL_OYARZABAL_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p379 image mapping.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p379": "MIKEL_OYARZABAL_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p378": "FLORIAN_THAUVIN_2026_IMAGE"',
    '"p378": "FLORIAN_THAUVIN_2026_IMAGE",\n    "p379": "MIKEL_OYARZABAL_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p379 image mapping.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(updatedMockCode, sandbox);
const p379 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p379');
console.log('6. Verification of p379:', p379 ? p379.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.MIKEL_OYARZABAL_2026_IMAGE:', sandbox.window.MIKEL_OYARZABAL_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== MIKEL OYARZABAL 2026 ADDED SUCCESSFULLY! ===');
