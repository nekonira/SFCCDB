const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YUKI SOMA 2026 (p206) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786030481683.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'somaYuki2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SOMA_YUKI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. somaYuki2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p205Idx = mockCode.indexOf("id: 'p205'");
if (p205Idx === -1) {
  console.error("Could not find p205 in mockData.js!");
  process.exit(1);
}

const p205AvatarIdx = mockCode.indexOf("avatarUrl:", p205Idx);
const p205EndIdx = mockCode.indexOf("}", p205AvatarIdx);

mockCode = mockCode.substring(0, p205EndIdx + 1);

const somaYuki2026Obj = `,
  {
    id: 'p206',
    name: '相馬勇紀(2026)',
    readingName: 'そうまゆうき',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ワイドストライカーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6474,
    maxOverall: 14628,
    baseStats: { shoot: 1247, pass: 1228, dribble: 1260, defense: 937, physical: 1047, speed: 781 },
    detailStats: {
      shoot: { finishing: 420, power: 416, composure: 411 },
      pass: { shortPass: 399, longPass: 405, accuracy: 424 },
      dribble: { breakout: 419, keeping: 407, ballTouch: 434 },
      defense: { tackle: 293, interception: 330, marking: 314 },
      physical: { jumping: 320, contact: 346, stamina: 381 },
      speed: { running: 352, agility: 429 }
    },
    maxEnhanced: {
      overall: 14628,
      baseStats: { shoot: 2804, pass: 2797, dribble: 2853, defense: 2446, physical: 2592, speed: 1851 },
      detailStats: {
        shoot: { finishing: 943, power: 927, composure: 934 },
        pass: { shortPass: 922, longPass: 928, accuracy: 947 },
        dribble: { breakout: 954, keeping: 942, ballTouch: 957 },
        defense: { tackle: 804, interception: 829, marking: 813 },
        physical: { jumping: 831, contact: 857, stamina: 904 },
        speed: { running: 887, agility: 964 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '俊敏なキッカー', rank: '銀', description: '発動条件：好調　/　キック精度・敏捷性UP' },
      { name: '技巧派ドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += somaYuki2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p206 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('somaYuki2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/somaYuki2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p206Check = `  if (player.id === 'p206' || (player.name && player.name.includes('2026') && (player.name.includes('相馬') || player.name.includes('勇紀') || player.name.includes('Soma')))) {\n    return window.SOMA_YUKI_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

// Refine p113 check
appJsCode = appJsCode.replace(
  "if (player.name && (player.name.includes('相馬') || player.name.includes('勇紀') || player.name.includes('Soma')) || player.id === 'p113') {",
  "if (player.id === 'p113' || (player.name && player.name.includes('BEST11') && (player.name.includes('相馬') || player.name.includes('Soma')))) {"
);

if (!appJsCode.includes("player.id === 'p206'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p205' || (player.name && (player.name.includes('カルリーニョス・ジュニオ') || player.name.includes('カルリーニョス') || player.name.includes('Carlinhos Junior') || player.name.includes('Carlinhos')))) {
    return window.CARLINHOS_JUNIOR_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p205' || (player.name && (player.name.includes('カルリーニョス・ジュニオ') || player.name.includes('カルリーニョス') || player.name.includes('Carlinhos Junior') || player.name.includes('Carlinhos')))) {
    return window.CARLINHOS_JUNIOR_2026_IMAGE || player.avatarUrl || '';
  }\n${p206Check}`
  );
}

fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('4. src/app.js updated with p113 refinement and p206 avatar resolver.');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

// Refine p113 check
appJsxCode = appJsxCode.replace(
  "if ((player.name && (player.name.includes('相馬') || player.name.includes('勇紀') || player.name.includes('Soma'))) || player.id === 'p113') {",
  "if (player.id === 'p113' || (player.name && player.name.includes('BEST11') && (player.name.includes('相馬') || player.name.includes('Soma')))) {"
);

if (!appJsxCode.includes("player.id === 'p206'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p205' || (player.name && (player.name.includes('カルリーニョス・ジュニオ') || player.name.includes('カルリーニョス') || player.name.includes('Carlinhos Junior') || player.name.includes('Carlinhos')))) {
    return window.CARLINHOS_JUNIOR_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p205' || (player.name && (player.name.includes('カルリーニョス・ジュニオ') || player.name.includes('カルリーニョス') || player.name.includes('Carlinhos Junior') || player.name.includes('Carlinhos')))) {
    return window.CARLINHOS_JUNIOR_2026_IMAGE || player.avatarUrl || '';
  }\n${p206Check}`
  );
}

fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('5. src/app.jsx updated with p113 refinement and p206 avatar resolver.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p206 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p206');
console.log('6. Verification of p206:', p206 ? p206.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SOMA_YUKI_2026_IMAGE:', sandbox.window.SOMA_YUKI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== YUKI SOMA 2026 ADDED SUCCESSFULLY! ===');
