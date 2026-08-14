const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YUKI YAMAMOTO 2026 (p187) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786025399521.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yamamotoYuki2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YAMAMOTO_YUKI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. yamamotoYuki2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p186Idx = mockCode.indexOf("id: 'p186'");
if (p186Idx === -1) {
  console.error("Could not find p186 in mockData.js!");
  process.exit(1);
}

const p186AvatarIdx = mockCode.indexOf("avatarUrl:", p186Idx);
const p186EndIdx = mockCode.indexOf("}", p186AvatarIdx);

mockCode = mockCode.substring(0, p186EndIdx + 1);

const yamamotoYuki2026Obj = `,
  {
    id: 'p187',
    name: '山本悠樹(2026)',
    readingName: 'やまもとゆうき',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 6382,
    maxOverall: 14536,
    baseStats: { shoot: 1040, pass: 1265, dribble: 1277, defense: 1167, physical: 1157, speed: 763 },
    detailStats: {
      shoot: { finishing: 328, power: 379, composure: 333 },
      pass: { shortPass: 431, longPass: 417, accuracy: 417 },
      dribble: { breakout: 403, keeping: 435, ballTouch: 439 },
      defense: { tackle: 391, interception: 387, marking: 389 },
      physical: { jumping: 389, contact: 368, stamina: 400 },
      speed: { running: 362, agility: 401 }
    },
    maxEnhanced: {
      overall: 14536,
      baseStats: { shoot: 2585, pass: 2870, dribble: 2810, defense: 2748, physical: 2726, speed: 1785 },
      detailStats: {
        shoot: { finishing: 839, power: 890, composure: 856 },
        pass: { shortPass: 966, longPass: 952, accuracy: 952 },
        dribble: { breakout: 914, keeping: 946, ballTouch: 950 },
        defense: { tackle: 926, interception: 910, marking: 912 },
        physical: { jumping: 900, contact: 891, stamina: 935 },
        speed: { running: 873, agility: 912 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '意外性のあるミドルパス', rank: '銅', description: '発動エリア：中中・後左中右　/　発動条件：CF・AMの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: 'シルクタッチ', rank: '銀', description: '発動条件：好調　/　ショートパス・ボールタッチUP' },
      { name: 'ハードスティール', rank: '銀', description: '発動条件：絶好調　/　キープ力・タックルUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += yamamotoYuki2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p187 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('yamamotoYuki2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/yamaguchiImage.js"></script>',
    '<script src="./src/data/yamaguchiImage.js"></script>\n  <script src="./src/data/yamamotoYuki2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p187Check = `  if (player.id === 'p187' || (player.name && (player.name.includes('山本悠樹') || (player.name.includes('山本') && !player.name.includes('理仁')) || player.name.includes('Yuki Yamamoto') || player.name.includes('Yamamoto')))) {\n    return window.YAMAMOTO_YUKI_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p187'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p186' || (player.name && (player.name.includes('川辺駿') || player.name.includes('川辺') || player.name.includes('Hayao Kawabe') || player.name.includes('Kawabe')))) {
    return window.KAWABE_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p186' || (player.name && (player.name.includes('川辺駿') || player.name.includes('川辺') || player.name.includes('Hayao Kawabe') || player.name.includes('Kawabe')))) {
    return window.KAWABE_2026_IMAGE || player.avatarUrl || '';
  }\n${p187Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p187 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p187'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p186' || (player.name && (player.name.includes('川辺駿') || player.name.includes('川辺') || player.name.includes('Hayao Kawabe') || player.name.includes('Kawabe')))) {
    return window.KAWABE_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p186' || (player.name && (player.name.includes('川辺駿') || player.name.includes('川辺') || player.name.includes('Hayao Kawabe') || player.name.includes('Kawabe')))) {
    return window.KAWABE_2026_IMAGE || player.avatarUrl || '';
  }\n${p187Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p187 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p187 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p187');
console.log('6. Verification of p187:', p187 ? p187.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.YAMAMOTO_YUKI_2026_IMAGE:', sandbox.window.YAMAMOTO_YUKI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== YUKI YAMAMOTO 2026 ADDED SUCCESSFULLY! ===');
