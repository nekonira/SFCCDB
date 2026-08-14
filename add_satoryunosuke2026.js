const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING RYUNOSUKE SATO 2026 (p201) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786029350802.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'satoRyunosuke2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SATO_RYUNOSUKE_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. satoRyunosuke2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p200Idx = mockCode.indexOf("id: 'p200'");
if (p200Idx === -1) {
  console.error("Could not find p200 in mockData.js!");
  process.exit(1);
}

const p200AvatarIdx = mockCode.indexOf("avatarUrl:", p200Idx);
const p200EndIdx = mockCode.indexOf("}", p200AvatarIdx);

mockCode = mockCode.substring(0, p200EndIdx + 1);

const satoRyunosuke2026Obj = `,
  {
    id: 'p201',
    name: '佐藤龍之介(2026)',
    readingName: 'さとうりゅうのすけ',
    category: 'MF',
    mainPosition: 'LM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'サイドアタッカーLM',
    playStyleLevel: 'Ⅱ',
    overall: 6528,
    maxOverall: 14738,
    baseStats: { shoot: 1162, pass: 1122, dribble: 1270, defense: 1009, physical: 1049, speed: 841 },
    detailStats: {
      shoot: { finishing: 397, power: 368, composure: 397 },
      pass: { shortPass: 370, longPass: 383, accuracy: 369 },
      dribble: { breakout: 441, keeping: 406, ballTouch: 423 },
      defense: { tackle: 335, interception: 347, marking: 327 },
      physical: { jumping: 357, contact: 308, stamina: 384 },
      speed: { running: 417, agility: 424 }
    },
    maxEnhanced: {
      overall: 14738,
      baseStats: { shoot: 2719, pass: 2691, dribble: 2863, defense: 2518, physical: 2594, speed: 1911 },
      detailStats: {
        shoot: { finishing: 920, power: 879, composure: 920 },
        pass: { shortPass: 893, longPass: 906, accuracy: 892 },
        dribble: { breakout: 976, keeping: 941, ballTouch: 946 },
        defense: { tackle: 846, interception: 846, marking: 826 },
        physical: { jumping: 868, contact: 819, stamina: 907 },
        speed: { running: 952, agility: 959 }
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
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += satoRyunosuke2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p201 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('satoRyunosuke2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/satoRyunosuke2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p201Check = `  if (player.id === 'p201' || (player.name && (player.name.includes('佐藤龍之介') || (player.name.includes('佐藤') && player.name.includes('龍之介')) || player.name.includes('Ryunosuke Sato')))) {\n    return window.SATO_RYUNOSUKE_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p201'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p200' || (player.name && (player.name.includes('マテウス・サヴィオ') || player.name.includes('サヴィオ') || player.name.includes('Matheus Savio') || player.name.includes('Savio')))) {
    return window.MATHEUS_SAVIO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p200' || (player.name && (player.name.includes('マテウス・サヴィオ') || player.name.includes('サヴィオ') || player.name.includes('Matheus Savio') || player.name.includes('Savio')))) {
    return window.MATHEUS_SAVIO_2026_IMAGE || player.avatarUrl || '';
  }\n${p201Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p201 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p201'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p200' || (player.name && (player.name.includes('マテウス・サヴィオ') || player.name.includes('サヴィオ') || player.name.includes('Matheus Savio') || player.name.includes('Savio')))) {
    return window.MATHEUS_SAVIO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p200' || (player.name && (player.name.includes('マテウス・サヴィオ') || player.name.includes('サヴィオ') || player.name.includes('Matheus Savio') || player.name.includes('Savio')))) {
    return window.MATHEUS_SAVIO_2026_IMAGE || player.avatarUrl || '';
  }\n${p201Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p201 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p201 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p201');
console.log('6. Verification of p201:', p201 ? p201.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SATO_RYUNOSUKE_2026_IMAGE:', sandbox.window.SATO_RYUNOSUKE_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== RYUNOSUKE SATO 2026 ADDED SUCCESSFULLY! ===');
