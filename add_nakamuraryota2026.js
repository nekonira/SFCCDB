const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING RYOTA NAKAMURA 2026 (p209) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786031147591.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'nakamuraRyota2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.NAKAMURA_RYOTA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. nakamuraRyota2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p208Idx = mockCode.indexOf("id: 'p208'");
if (p208Idx === -1) {
  console.error("Could not find p208 in mockData.js!");
  process.exit(1);
}

const p208AvatarIdx = mockCode.indexOf("avatarUrl:", p208Idx);
const p208EndIdx = mockCode.indexOf("}", p208AvatarIdx);

mockCode = mockCode.substring(0, p208EndIdx + 1);

const nakamuraRyota2026Obj = `,
  {
    id: 'p209',
    name: '中村亮太(2026)',
    readingName: 'なかむらりょうた',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ワイドストライカーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6152,
    maxOverall: 14331,
    baseStats: { shoot: 1210, pass: 1052, dribble: 1136, defense: 1012, physical: 1101, speed: 725 },
    detailStats: {
      shoot: { finishing: 401, power: 413, composure: 396 },
      pass: { shortPass: 361, longPass: 351, accuracy: 340 },
      dribble: { breakout: 386, keeping: 379, ballTouch: 371 },
      defense: { tackle: 350, interception: 337, marking: 325 },
      physical: { jumping: 362, contact: 392, stamina: 347 },
      speed: { running: 301, agility: 424 }
    },
    maxEnhanced: {
      overall: 14331,
      baseStats: { shoot: 2767, pass: 2621, dribble: 2729, defense: 2521, physical: 2646, speed: 1795 },
      detailStats: {
        shoot: { finishing: 924, power: 924, composure: 919 },
        pass: { shortPass: 884, longPass: 874, accuracy: 863 },
        dribble: { breakout: 921, keeping: 914, ballTouch: 894 },
        defense: { tackle: 861, interception: 836, marking: 824 },
        physical: { jumping: 873, contact: 903, stamina: 870 },
        speed: { running: 836, agility: 959 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '冷静な破壊者', rank: '銀', description: '発動条件：好調　/　冷静さ・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += nakamuraRyota2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p209 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('nakamuraRyota2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/nakamuraRyota2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p209Check = `  if (player.id === 'p209' || (player.name && (player.name.includes('中村亮太') || (player.name.includes('中村') && player.name.includes('亮太')) || player.name.includes('Ryota Nakamura')))) {\n    return window.NAKAMURA_RYOTA_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

// Refine p44 check
appJsCode = appJsCode.replace(
  "if (player.name && (player.name.includes('中村憲剛') || player.name.includes('Nakamura')) || player.id === 'p44') {",
  "if (player.id === 'p44' || (player.name && (player.name.includes('中村憲剛') || player.name.includes('Kengo Nakamura')))) {"
);

if (!appJsCode.includes("player.id === 'p209'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p208' || (player.name && (player.name.includes('石井久継') || (player.name.includes('石井') && player.name.includes('久継')) || player.name.includes('Hisatsugu Ishii') || player.name.includes('Ishii')))) {
    return window.ISHII_HISATSUGU_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p208' || (player.name && (player.name.includes('石井久継') || (player.name.includes('石井') && player.name.includes('久継')) || player.name.includes('Hisatsugu Ishii') || player.name.includes('Ishii')))) {
    return window.ISHII_HISATSUGU_2026_IMAGE || player.avatarUrl || '';
  }\n${p209Check}`
  );
}

fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('4. src/app.js updated with p44 refinement and p209 avatar resolver.');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

// Refine p44 check
appJsxCode = appJsxCode.replace(
  "if ((player.name && (player.name.includes('中村憲剛') || player.name.includes('Nakamura'))) || player.id === 'p44') {",
  "if (player.id === 'p44' || (player.name && (player.name.includes('中村憲剛') || player.name.includes('Kengo Nakamura')))) {"
);

if (!appJsxCode.includes("player.id === 'p209'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p208' || (player.name && (player.name.includes('石井久継') || (player.name.includes('石井') && player.name.includes('久継')) || player.name.includes('Hisatsugu Ishii') || player.name.includes('Ishii')))) {
    return window.ISHII_HISATSUGU_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p208' || (player.name && (player.name.includes('石井久継') || (player.name.includes('石井') && player.name.includes('久継')) || player.name.includes('Hisatsugu Ishii') || player.name.includes('Ishii')))) {
    return window.ISHII_HISATSUGU_2026_IMAGE || player.avatarUrl || '';
  }\n${p209Check}`
  );
}

fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('5. src/app.jsx updated with p44 refinement and p209 avatar resolver.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p209 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p209');
console.log('6. Verification of p209:', p209 ? p209.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.NAKAMURA_RYOTA_2026_IMAGE:', sandbox.window.NAKAMURA_RYOTA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== RYOTA NAKAMURA 2026 ADDED SUCCESSFULLY! ===');
