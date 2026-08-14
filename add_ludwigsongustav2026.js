const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING GUSTAV LUDWIGSON 2026 (p212) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786031888960.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'ludwigsonGustav2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.LUDWIGSON_GUSTAV_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. ludwigsonGustav2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p211Idx = mockCode.indexOf("id: 'p211'");
if (p211Idx === -1) {
  console.error("Could not find p211 in mockData.js!");
  process.exit(1);
}

const p211AvatarIdx = mockCode.indexOf("avatarUrl:", p211Idx);
const p211EndIdx = mockCode.indexOf("}", p211AvatarIdx);

mockCode = mockCode.substring(0, p211EndIdx + 1);

const ludwigsonGustav2026Obj = `,
  {
    id: 'p212',
    name: 'グスタフ・ルドヴィグソン(2026)',
    readingName: 'ぐすたふるどゔぃぐそん',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スウェーデン',
    policy: 'リアクション',
    playStyle: 'ワイドストライカーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6430,
    maxOverall: 14600,
    baseStats: { shoot: 1251, pass: 1030, dribble: 1187, defense: 976, physical: 1162, speed: 819 },
    detailStats: {
      shoot: { finishing: 417, power: 429, composure: 405 },
      pass: { shortPass: 333, longPass: 342, accuracy: 355 },
      dribble: { breakout: 395, keeping: 401, ballTouch: 391 },
      defense: { tackle: 314, interception: 339, marking: 323 },
      physical: { jumping: 385, contact: 375, stamina: 402 },
      speed: { running: 411, agility: 408 }
    },
    maxEnhanced: {
      overall: 14600,
      baseStats: { shoot: 2808, pass: 2599, dribble: 2780, defense: 2485, physical: 2707, speed: 1889 },
      detailStats: {
        shoot: { finishing: 940, power: 940, composure: 928 },
        pass: { shortPass: 856, longPass: 865, accuracy: 878 },
        dribble: { breakout: 930, keeping: 936, ballTouch: 914 },
        defense: { tackle: 825, interception: 838, marking: 822 },
        physical: { jumping: 896, contact: 886, stamina: 925 },
        speed: { running: 946, agility: 943 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'ランニングキッカー', rank: '銀', description: '発動条件：絶好調　/　キック力・走力UP' },
      { name: '冷静なボールキープ', rank: '銀', description: '発動条件：好調　/　冷静さ・キープ力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += ludwigsonGustav2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p212 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('ludwigsonGustav2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/ludwigsonGustav2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p212Check = `  if (player.id === 'p212' || (player.name && (player.name.includes('ルドヴィグソン') || player.name.includes('グスタフ') || player.name.includes('Gustav Ludwigson') || player.name.includes('Ludwigson')))) {\n    return window.LUDWIGSON_GUSTAV_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p212'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p211' || (player.name && (player.name.includes('マテウス・モラエス') || player.name.includes('モラエス') || player.name.includes('Matheus Moraes') || player.name.includes('Moraes')))) {
    return window.MATHEUS_MORAES_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p211' || (player.name && (player.name.includes('マテウス・モラエス') || player.name.includes('モラエス') || player.name.includes('Matheus Moraes') || player.name.includes('Moraes')))) {
    return window.MATHEUS_MORAES_2026_IMAGE || player.avatarUrl || '';
  }\n${p212Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p212 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p212'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p211' || (player.name && (player.name.includes('マテウス・モラエス') || player.name.includes('モラエス') || player.name.includes('Matheus Moraes') || player.name.includes('Moraes')))) {
    return window.MATHEUS_MORAES_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p211' || (player.name && (player.name.includes('マテウス・モラエス') || player.name.includes('モラエス') || player.name.includes('Matheus Moraes') || player.name.includes('Moraes')))) {
    return window.MATHEUS_MORAES_2026_IMAGE || player.avatarUrl || '';
  }\n${p212Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p212 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p212 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p212');
console.log('6. Verification of p212:', p212 ? p212.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.LUDWIGSON_GUSTAV_2026_IMAGE:', sandbox.window.LUDWIGSON_GUSTAV_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== GUSTAV LUDWIGSON 2026 ADDED SUCCESSFULLY! ===');
