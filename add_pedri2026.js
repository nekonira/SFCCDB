const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING PEDRI 2026 (p381) ===');

// 1. Image conversion to base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\065e7940-0695-40eb-8c99-d6e5b2225fa9\\.user_uploaded\\media_1788928092238.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'pedri2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.PEDRI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. pedri2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p380Idx = mockCode.indexOf("id: 'p380'");
if (p380Idx === -1) {
  console.error("Could not find p380 in mockData.js!");
  process.exit(1);
}

const p380AvatarIdx = mockCode.indexOf("avatarUrl:", p380Idx);
const p380EndIdx = mockCode.indexOf("}", p380AvatarIdx);

const headerCode = mockCode.substring(0, p380EndIdx + 1);

const pedri2026Obj = `,
  {
    id: 'p381',
    name: 'ペドリ',
    readingName: 'ぺどり',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'ポゼッション',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 7465,
    maxOverall: 15694,
    baseStats: { shoot: 1249, pass: 1454, dribble: 1499, defense: 1180, physical: 1193, speed: 915 },
    detailStats: {
      shoot: { finishing: 417, power: 409, composure: 423 },
      pass: { shortPass: 489, longPass: 485, accuracy: 480 },
      dribble: { breakout: 497, keeping: 501, ballTouch: 501 },
      defense: { tackle: 391, interception: 407, marking: 382 },
      physical: { jumping: 332, contact: 397, stamina: 464 },
      speed: { running: 414, agility: 501 }
    },
    maxEnhanced: {
      overall: 15694,
      baseStats: { shoot: 2794, pass: 3059, dribble: 3032, defense: 2761, physical: 2762, speed: 1937 },
      detailStats: {
        shoot: { finishing: 928, power: 920, composure: 946 },
        pass: { shortPass: 1024, longPass: 1020, accuracy: 1015 },
        dribble: { breakout: 1008, keeping: 1012, ballTouch: 1012 },
        defense: { tackle: 926, interception: 930, marking: 905 },
        physical: { jumping: 843, contact: 920, stamina: 999 },
        speed: { running: 925, agility: 1012 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: 1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'ベルベットパス', rank: '金', description: '発動エリア：前左右・中左右　/　発動条件：ショートパス・ロングパス時　/　ショートパス・ロングパス・キック精度UP　/成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '正確無比なキック', rank: '金', description: '発動条件：好調　/　ショートパス・ロングパス・キック精度UP' },
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' },
      { name: '俊敏なドリブラー', rank: '銅', description: '発動条件：好調　/　突破力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

let updatedMockCode = headerCode + pedri2026Obj;

// Update any "正確無比なキック" description across DB
updatedMockCode = updatedMockCode.replace(
  /(\{[\s]*name:\s*['"]正確無比なキック['"][\s]*,[\s]*rank:\s*['"]金['"][\s]*,[\s]*description:\s*['"])(.*?)(['"][\s]*\})/g,
  "{ name: '正確無比なキック', rank: '金', description: '発動条件：好調　/　ショートパス・ロングパス・キック精度UP' }"
);

fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p381 and Correct Kick ability description.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('pedri2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/daniOlmo2026Image.js"></script>',
    '<script src="./src/data/daniOlmo2026Image.js"></script>\n  <script src="./src/data/pedri2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p381": "PEDRI_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p380": "DANI_OLMO_2026_IMAGE"',
    '"p380": "DANI_OLMO_2026_IMAGE",\n    "p381": "PEDRI_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p381 image mapping.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p381": "PEDRI_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p380": "DANI_OLMO_2026_IMAGE"',
    '"p380": "DANI_OLMO_2026_IMAGE",\n    "p381": "PEDRI_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p381 image mapping.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(updatedMockCode, sandbox);
const p381 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p381');
console.log('6. Verification of p381:', p381 ? p381.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.PEDRI_2026_IMAGE:', sandbox.window.PEDRI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== PEDRI 2026 ADDED SUCCESSFULLY! ===');
