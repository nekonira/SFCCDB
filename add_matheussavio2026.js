const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MATHEUS SAVIO 2026 (p200) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786029164157.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'matheusSavio2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.MATHEUS_SAVIO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. matheusSavio2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p199Idx = mockCode.indexOf("id: 'p199'");
if (p199Idx === -1) {
  console.error("Could not find p199 in mockData.js!");
  process.exit(1);
}

const p199AvatarIdx = mockCode.indexOf("avatarUrl:", p199Idx);
const p199EndIdx = mockCode.indexOf("}", p199AvatarIdx);

mockCode = mockCode.substring(0, p199EndIdx + 1);

const matheusSavio2026Obj = `,
  {
    id: 'p200',
    name: 'マテウス・サヴィオ(2026)',
    readingName: 'まてうすさゔぃお',
    category: 'MF',
    mainPosition: 'LM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ポゼッション',
    playStyle: 'サイドアタッカーLM',
    playStyleLevel: 'Ⅱ',
    overall: 6511,
    maxOverall: 14715,
    baseStats: { shoot: 1207, pass: 1224, dribble: 1232, defense: 934, physical: 1006, speed: 839 },
    detailStats: {
      shoot: { finishing: 408, power: 373, composure: 426 },
      pass: { shortPass: 417, longPass: 408, accuracy: 399 },
      dribble: { breakout: 427, keeping: 382, ballTouch: 423 },
      defense: { tackle: 278, interception: 346, marking: 310 },
      physical: { jumping: 305, contact: 352, stamina: 349 },
      speed: { running: 415, agility: 424 }
    },
    maxEnhanced: {
      overall: 14715,
      baseStats: { shoot: 2764, pass: 2793, dribble: 2825, defense: 2443, physical: 2551, speed: 1909 },
      detailStats: {
        shoot: { finishing: 931, power: 884, composure: 949 },
        pass: { shortPass: 940, longPass: 931, accuracy: 922 },
        dribble: { breakout: 962, keeping: 917, ballTouch: 946 },
        defense: { tackle: 789, interception: 845, marking: 809 },
        physical: { jumping: 816, contact: 863, stamina: 872 },
        speed: { running: 950, agility: 959 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'スピードドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・走力UP' },
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += matheusSavio2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p200 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('matheusSavio2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/matheusSavio2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p200Check = `  if (player.id === 'p200' || (player.name && (player.name.includes('マテウス・サヴィオ') || player.name.includes('サヴィオ') || player.name.includes('Matheus Savio') || player.name.includes('Savio')))) {\n    return window.MATHEUS_SAVIO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p200'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p199' || (player.name && (player.name.includes('荒木遼太郎') || (player.name.includes('荒木') && player.name.includes('遼太郎')) || player.name.includes('Ryotaro Araki')))) {
    return window.ARAKI_RYOTARO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p199' || (player.name && (player.name.includes('荒木遼太郎') || (player.name.includes('荒木') && player.name.includes('遼太郎')) || player.name.includes('Ryotaro Araki')))) {
    return window.ARAKI_RYOTARO_2026_IMAGE || player.avatarUrl || '';
  }\n${p200Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p200 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p200'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p199' || (player.name && (player.name.includes('荒木遼太郎') || (player.name.includes('荒木') && player.name.includes('遼太郎')) || player.name.includes('Ryotaro Araki')))) {
    return window.ARAKI_RYOTARO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p199' || (player.name && (player.name.includes('荒木遼太郎') || (player.name.includes('荒木') && player.name.includes('遼太郎')) || player.name.includes('Ryotaro Araki')))) {
    return window.ARAKI_RYOTARO_2026_IMAGE || player.avatarUrl || '';
  }\n${p200Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p200 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p200 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p200');
console.log('6. Verification of p200:', p200 ? p200.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.MATHEUS_SAVIO_2026_IMAGE:', sandbox.window.MATHEUS_SAVIO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== MATHEUS SAVIO 2026 ADDED SUCCESSFULLY! ===');
