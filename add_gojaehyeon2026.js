const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING GO JAE-HYEON 2026 (p214) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786032227108.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'goJaeHyeon2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.GO_JAE_HYEON_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. goJaeHyeon2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p213Idx = mockCode.indexOf("id: 'p213'");
if (p213Idx === -1) {
  console.error("Could not find p213 in mockData.js!");
  process.exit(1);
}

const p213AvatarIdx = mockCode.indexOf("avatarUrl:", p213Idx);
const p213EndIdx = mockCode.indexOf("}", p213AvatarIdx);

mockCode = mockCode.substring(0, p213EndIdx + 1);

const goJaeHyeon2026Obj = `,
  {
    id: 'p214',
    name: 'コ・ジェヒョン(2026)',
    readingName: 'こ・じぇひょん',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'リアクション',
    playStyle: 'ワイドストライカーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6253,
    maxOverall: 14406,
    baseStats: { shoot: 1182, pass: 1173, dribble: 1259, defense: 1074, physical: 1009, speed: 738 },
    detailStats: {
      shoot: { finishing: 390, power: 388, composure: 404 },
      pass: { shortPass: 368, longPass: 379, accuracy: 426 },
      dribble: { breakout: 397, keeping: 425, ballTouch: 437 },
      defense: { tackle: 352, interception: 367, marking: 355 },
      physical: { jumping: 360, contact: 263, stamina: 386 },
      speed: { running: 364, agility: 374 }
    },
    maxEnhanced: {
      overall: 14406,
      baseStats: { shoot: 2739, pass: 2742, dribble: 2852, defense: 2583, physical: 2554, speed: 1808 },
      detailStats: {
        shoot: { finishing: 913, power: 899, composure: 927 },
        pass: { shortPass: 891, longPass: 902, accuracy: 949 },
        dribble: { breakout: 932, keeping: 960, ballTouch: 960 },
        defense: { tackle: 863, interception: 866, marking: 854 },
        physical: { jumping: 871, contact: 774, stamina: 909 },
        speed: { running: 899, agility: 909 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '保持するキッカー', rank: '銀', description: '発動条件：好調　/　キック精度・キープ力UP' },
      { name: '技巧派ドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += goJaeHyeon2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p214 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('goJaeHyeon2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/goJaeHyeon2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p214Check = `  if (player.id === 'p214' || (player.name && (player.name.includes('コ・ジェヒョン') || player.name.includes('ジェヒョン') || player.name.includes('Go Jae-Hyeon') || player.name.includes('Jae-Hyeon')))) {\n    return window.GO_JAE_HYEON_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p214'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p213' || (player.name && (player.name.includes('イ・チュンヨン') || player.name.includes('チュンヨン') || player.name.includes('Lee Chung-Yong') || player.name.includes('Chung-Yong')))) {
    return window.LEE_CHUNG_YONG_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p213' || (player.name && (player.name.includes('イ・チュンヨン') || player.name.includes('チュンヨン') || player.name.includes('Lee Chung-Yong') || player.name.includes('Chung-Yong')))) {
    return window.LEE_CHUNG_YONG_2026_IMAGE || player.avatarUrl || '';
  }\n${p214Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p214 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p214'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p213' || (player.name && (player.name.includes('イ・チュンヨン') || player.name.includes('チュンヨン') || player.name.includes('Lee Chung-Yong') || player.name.includes('Chung-Yong')))) {
    return window.LEE_CHUNG_YONG_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p213' || (player.name && (player.name.includes('イ・チュンヨン') || player.name.includes('チュンヨン') || player.name.includes('Lee Chung-Yong') || player.name.includes('Chung-Yong')))) {
    return window.LEE_CHUNG_YONG_2026_IMAGE || player.avatarUrl || '';
  }\n${p214Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p214 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p214 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p214');
console.log('6. Verification of p214:', p214 ? p214.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.GO_JAE_HYEON_2026_IMAGE:', sandbox.window.GO_JAE_HYEON_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== GO JAE-HYEON 2026 ADDED SUCCESSFULLY! ===');
