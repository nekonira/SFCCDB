const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING CARLINHOS JUNIOR 2026 (p205) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786030137172.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'carlinhosJunior2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.CARLINHOS_JUNIOR_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. carlinhosJunior2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p204Idx = mockCode.indexOf("id: 'p204'");
if (p204Idx === -1) {
  console.error("Could not find p204 in mockData.js!");
  process.exit(1);
}

const p204AvatarIdx = mockCode.indexOf("avatarUrl:", p204Idx);
const p204EndIdx = mockCode.indexOf("}", p204AvatarIdx);

mockCode = mockCode.substring(0, p204EndIdx + 1);

const carlinhosJunior2026Obj = `,
  {
    id: 'p205',
    name: 'カルリーニョス・ジュニオ(2026)',
    readingName: 'かるりーにょすじゅにお',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ムービング',
    playStyle: 'サイドアタッカーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6298,
    maxOverall: 14473,
    baseStats: { shoot: 1196, pass: 1147, dribble: 1188, defense: 939, physical: 1164, speed: 809 },
    detailStats: {
      shoot: { finishing: 382, power: 436, composure: 378 },
      pass: { shortPass: 385, longPass: 385, accuracy: 377 },
      dribble: { breakout: 396, keeping: 390, ballTouch: 402 },
      defense: { tackle: 283, interception: 339, marking: 317 },
      physical: { jumping: 362, contact: 403, stamina: 399 },
      speed: { running: 410, agility: 399 }
    },
    maxEnhanced: {
      overall: 14473,
      baseStats: { shoot: 2753, pass: 2716, dribble: 2781, defense: 2448, physical: 2709, speed: 1879 },
      detailStats: {
        shoot: { finishing: 905, power: 947, composure: 901 },
        pass: { shortPass: 908, longPass: 908, accuracy: 900 },
        dribble: { breakout: 931, keeping: 925, ballTouch: 925 },
        defense: { tackle: 794, interception: 838, marking: 816 },
        physical: { jumping: 873, contact: 914, stamina: 922 },
        speed: { running: 945, agility: 934 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: '確信のロングシュート', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：シュート・ロングシュート時　/　決定力・キック力UP' },
    abilities: [
      { name: 'アジャイルキッカー', rank: '銀', description: '発動条件：途中出場　/　キック力・敏捷性UP' },
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += carlinhosJunior2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p205 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('carlinhosJunior2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/carlinhosJunior2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p205Check = `  if (player.id === 'p205' || (player.name && (player.name.includes('カルリーニョス・ジュニオ') || player.name.includes('カルリーニョス') || player.name.includes('Carlinhos Junior') || player.name.includes('Carlinhos')))) {\n    return window.CARLINHOS_JUNIOR_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p205'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p204' || (player.name && (player.name.includes('ノーマン・キャンベル') || player.name.includes('キャンベル') || player.name.includes('Norman Campbell') || player.name.includes('Campbell')))) {
    return window.NORMAN_CAMPBELL_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p204' || (player.name && (player.name.includes('ノーマン・キャンベル') || player.name.includes('キャンベル') || player.name.includes('Norman Campbell') || player.name.includes('Campbell')))) {
    return window.NORMAN_CAMPBELL_2026_IMAGE || player.avatarUrl || '';
  }\n${p205Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p205 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p205'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p204' || (player.name && (player.name.includes('ノーマン・キャンベル') || player.name.includes('キャンベル') || player.name.includes('Norman Campbell') || player.name.includes('Campbell')))) {
    return window.NORMAN_CAMPBELL_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p204' || (player.name && (player.name.includes('ノーマン・キャンベル') || player.name.includes('キャンベル') || player.name.includes('Norman Campbell') || player.name.includes('Campbell')))) {
    return window.NORMAN_CAMPBELL_2026_IMAGE || player.avatarUrl || '';
  }\n${p205Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p205 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p205 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p205');
console.log('6. Verification of p205:', p205 ? p205.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.CARLINHOS_JUNIOR_2026_IMAGE:', sandbox.window.CARLINHOS_JUNIOR_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== CARLINHOS JUNIOR 2026 ADDED SUCCESSFULLY! ===');
