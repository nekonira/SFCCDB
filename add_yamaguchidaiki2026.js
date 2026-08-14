const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING DAIKI YAMAGUCHI 2026 (p188) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786025564332.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yamaguchiDaiki2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YAMAGUCHI_DAIKI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. yamaguchiDaiki2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p187Idx = mockCode.indexOf("id: 'p187'");
if (p187Idx === -1) {
  console.error("Could not find p187 in mockData.js!");
  process.exit(1);
}

const p187AvatarIdx = mockCode.indexOf("avatarUrl:", p187Idx);
const p187EndIdx = mockCode.indexOf("}", p187AvatarIdx);

mockCode = mockCode.substring(0, p187EndIdx + 1);

const yamaguchiDaiki2026Obj = `,
  {
    id: 'p188',
    name: '山口大輝(2026)',
    readingName: 'やまぐちだいき',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 6178,
    maxOverall: 14356,
    baseStats: { shoot: 1069, pass: 1166, dribble: 1138, defense: 1107, physical: 1089, speed: 835 },
    detailStats: {
      shoot: { finishing: 361, power: 368, composure: 340 },
      pass: { shortPass: 407, longPass: 395, accuracy: 364 },
      dribble: { breakout: 355, keeping: 390, ballTouch: 393 },
      defense: { tackle: 381, interception: 370, marking: 356 },
      physical: { jumping: 313, contact: 384, stamina: 392 },
      speed: { running: 413, agility: 422 }
    },
    maxEnhanced: {
      overall: 14356,
      baseStats: { shoot: 2614, pass: 2771, dribble: 2671, defense: 2688, physical: 2658, speed: 1857 },
      detailStats: {
        shoot: { finishing: 872, power: 879, composure: 863 },
        pass: { shortPass: 942, longPass: 930, accuracy: 899 },
        dribble: { breakout: 866, keeping: 901, ballTouch: 904 },
        defense: { tackle: 916, interception: 893, marking: 879 },
        physical: { jumping: 824, contact: 907, stamina: 927 },
        speed: { running: 924, agility: 933 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '意外性のあるミドルパス', rank: '銅', description: '発動エリア：中中・後左中右　/　発動条件：CF・AMの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '不屈のパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・スタミナUP' },
      { name: '機敏なロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += yamaguchiDaiki2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p188 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('yamaguchiDaiki2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/yamaguchiImage.js"></script>',
    '<script src="./src/data/yamaguchiDaiki2026Image.js"></script>\n  <script src="./src/data/yamaguchiImage.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p188Check = `  if (player.id === 'p188' || (player.name && (player.name.includes('山口大輝') || (player.name.includes('山口') && !player.name.includes('蛍')) || player.name.includes('Daiki Yamaguchi') || player.name.includes('Yamaguchi')))) {\n    return window.YAMAGUCHI_DAIKI_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p188'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p187' || (player.name && (player.name.includes('山本悠樹') || (player.name.includes('山本') && !player.name.includes('理仁')) || player.name.includes('Yuki Yamamoto') || player.name.includes('Yamamoto')))) {
    return window.YAMAMOTO_YUKI_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p187' || (player.name && (player.name.includes('山本悠樹') || (player.name.includes('山本') && !player.name.includes('理仁')) || player.name.includes('Yuki Yamamoto') || player.name.includes('Yamamoto')))) {
    return window.YAMAMOTO_YUKI_2026_IMAGE || player.avatarUrl || '';
  }\n${p188Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p188 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p188'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p187' || (player.name && (player.name.includes('山本悠樹') || (player.name.includes('山本') && !player.name.includes('理仁')) || player.name.includes('Yuki Yamamoto') || player.name.includes('Yamamoto')))) {
    return window.YAMAMOTO_YUKI_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p187' || (player.name && (player.name.includes('山本悠樹') || (player.name.includes('山本') && !player.name.includes('理仁')) || player.name.includes('Yuki Yamamoto') || player.name.includes('Yamamoto')))) {
    return window.YAMAMOTO_YUKI_2026_IMAGE || player.avatarUrl || '';
  }\n${p188Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p188 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p188 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p188');
console.log('6. Verification of p188:', p188 ? p188.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.YAMAGUCHI_DAIKI_2026_IMAGE:', sandbox.window.YAMAGUCHI_DAIKI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== DAIKI YAMAGUCHI 2026 ADDED SUCCESSFULLY! ===');
