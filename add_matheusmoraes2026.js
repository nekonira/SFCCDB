const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MATHEUS MORAES 2026 (p211) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786031581260.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'matheusMoraes2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.MATHEUS_MORAES_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. matheusMoraes2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p210Idx = mockCode.indexOf("id: 'p210'");
if (p210Idx === -1) {
  console.error("Could not find p210 in mockData.js!");
  process.exit(1);
}

const p210AvatarIdx = mockCode.indexOf("avatarUrl:", p210Idx);
const p210EndIdx = mockCode.indexOf("}", p210AvatarIdx);

mockCode = mockCode.substring(0, p210EndIdx + 1);

const matheusMoraes2026Obj = `,
  {
    id: 'p211',
    name: 'マテウス・モラエス(2026)',
    readingName: 'まてうすもらえす',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ポゼッション',
    playStyle: 'ワイドストライカーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6389,
    maxOverall: 14574,
    baseStats: { shoot: 1229, pass: 1135, dribble: 1242, defense: 891, physical: 905, speed: 752 },
    detailStats: {
      shoot: { finishing: 432, power: 374, composure: 423 },
      pass: { shortPass: 376, longPass: 373, accuracy: 386 },
      dribble: { breakout: 407, keeping: 409, ballTouch: 426 },
      defense: { tackle: 284, interception: 314, marking: 293 },
      physical: { jumping: 343, contact: 293, stamina: 269 },
      speed: { running: 349, agility: 403 }
    },
    maxEnhanced: {
      overall: 14574,
      baseStats: { shoot: 2786, pass: 2704, dribble: 2835, defense: 2400, physical: 2450, speed: 1822 },
      detailStats: {
        shoot: { finishing: 955, power: 885, composure: 946 },
        pass: { shortPass: 899, longPass: 896, accuracy: 909 },
        dribble: { breakout: 942, keeping: 944, ballTouch: 949 },
        defense: { tackle: 795, interception: 813, marking: 792 },
        physical: { jumping: 854, contact: 804, stamina: 792 },
        speed: { running: 884, agility: 938 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'ターゲットマン', rank: '銀', description: '発動条件：途中出場　/　決定力・キープ力UP' },
      { name: '切り開くキッカー', rank: '銀', description: '発動条件：好調　/　キック精度・突破力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += matheusMoraes2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p211 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('matheusMoraes2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/matheusMoraes2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p211Check = `  if (player.id === 'p211' || (player.name && (player.name.includes('マテウス・モラエス') || player.name.includes('モラエス') || player.name.includes('Matheus Moraes') || player.name.includes('Moraes')))) {\n    return window.MATHEUS_MORAES_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

// Refine p133 check
appJsCode = appJsCode.replace(
  "if (player.id === 'p133' || player.name && (player.name.includes('マテウス') || player.name.includes('Matheus')))",
  "if (player.id === 'p133' || (player.name && (player.name === 'マテウス(2026)' || player.name === 'マテウス' || player.name === 'Matheus')))"
);

if (!appJsCode.includes("player.id === 'p211'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p210' || (player.name && (player.name.includes('マルコ・トゥーリオ') || player.name.includes('トゥーリオ') || player.name.includes('Marco Tulio') || player.name.includes('Marco Túlio') || player.name.includes('Tulio')))) {
    return window.MARCO_TULIO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p210' || (player.name && (player.name.includes('マルコ・トゥーリオ') || player.name.includes('トゥーリオ') || player.name.includes('Marco Tulio') || player.name.includes('Marco Túlio') || player.name.includes('Tulio')))) {
    return window.MARCO_TULIO_2026_IMAGE || player.avatarUrl || '';
  }\n${p211Check}`
  );
}

fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('4. src/app.js updated with p133 refinement and p211 avatar resolver.');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

// Refine p133 check
appJsxCode = appJsxCode.replace(
  "if (player.id === 'p133' || (player.name && (player.name.includes('マテウス') || player.name.includes('Matheus')))) {",
  "if (player.id === 'p133' || (player.name && (player.name === 'マテウス(2026)' || player.name === 'マテウス' || player.name === 'Matheus')))"
);

if (!appJsxCode.includes("player.id === 'p211'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p210' || (player.name && (player.name.includes('マルコ・トゥーリオ') || player.name.includes('トゥーリオ') || player.name.includes('Marco Tulio') || player.name.includes('Marco Túlio') || player.name.includes('Tulio')))) {
    return window.MARCO_TULIO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p210' || (player.name && (player.name.includes('マルコ・トゥーリオ') || player.name.includes('トゥーリオ') || player.name.includes('Marco Tulio') || player.name.includes('Marco Túlio') || player.name.includes('Tulio')))) {
    return window.MARCO_TULIO_2026_IMAGE || player.avatarUrl || '';
  }\n${p211Check}`
  );
}

fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('5. src/app.jsx updated with p133 refinement and p211 avatar resolver.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p211 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p211');
console.log('6. Verification of p211:', p211 ? p211.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.MATHEUS_MORAES_2026_IMAGE:', sandbox.window.MATHEUS_MORAES_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== MATHEUS MORAES 2026 ADDED SUCCESSFULLY! ===');
