const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MATHEUS BUENO 2026 (p184) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786024858608.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'matheusBueno2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.MATHEUS_BUENO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. matheusBueno2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p183Idx = mockCode.indexOf("id: 'p183'");
if (p183Idx === -1) {
  console.error("Could not find p183 in mockData.js!");
  process.exit(1);
}

const p183AvatarIdx = mockCode.indexOf("avatarUrl:", p183Idx);
const p183EndIdx = mockCode.indexOf("}", p183AvatarIdx);

mockCode = mockCode.substring(0, p183EndIdx + 1);

const matheusBueno2026Obj = `,
  {
    id: 'p184',
    name: 'マテウス・ブエノ(2026)',
    readingName: 'まてうすぶえの',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'リアクション',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 6456,
    maxOverall: 14632,
    baseStats: { shoot: 1092, pass: 1248, dribble: 1210, defense: 1178, physical: 1110, speed: 820 },
    detailStats: {
      shoot: { finishing: 357, power: 400, composure: 335 },
      pass: { shortPass: 440, longPass: 417, accuracy: 391 },
      dribble: { breakout: 374, keeping: 413, ballTouch: 423 },
      defense: { tackle: 410, interception: 380, marking: 388 },
      physical: { jumping: 304, contact: 393, stamina: 413 },
      speed: { running: 401, agility: 419 }
    },
    maxEnhanced: {
      overall: 14632,
      baseStats: { shoot: 2637, pass: 2853, dribble: 2743, defense: 2759, physical: 2679, speed: 1842 },
      detailStats: {
        shoot: { finishing: 868, power: 911, composure: 858 },
        pass: { shortPass: 975, longPass: 952, accuracy: 926 },
        dribble: { breakout: 885, keeping: 924, ballTouch: 934 },
        defense: { tackle: 945, interception: 903, marking: 911 },
        physical: { jumping: 815, contact: 916, stamina: 948 },
        speed: { running: 912, agility: 930 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '楔のパス', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：AM・CFの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '不屈のパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・スタミナUP' },
      { name: '反攻のロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・タックルUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += matheusBueno2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p184 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('matheusBueno2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/matheusImage.js"></script>',
    '<script src="./src/data/matheusBueno2026Image.js"></script>\n  <script src="./src/data/matheusImage.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p184Check = `  if (player.id === 'p184' || (player.name && (player.name.includes('マテウス・ブエノ') || player.name.includes('ブエノ') || player.name.includes('Matheus Bueno') || player.name.includes('Bueno')))) {\n    return window.MATHEUS_BUENO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p184'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p183' || (player.name && (player.name.includes('柴崎岳') || player.name.includes('柴崎') || player.name.includes('Gaku Shibasaki') || player.name.includes('Shibasaki')))) {
    return window.SHIBASAKI_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p183' || (player.name && (player.name.includes('柴崎岳') || player.name.includes('柴崎') || player.name.includes('Gaku Shibasaki') || player.name.includes('Shibasaki')))) {
    return window.SHIBASAKI_2026_IMAGE || player.avatarUrl || '';
  }\n${p184Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p184 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p184'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p183' || (player.name && (player.name.includes('柴崎岳') || player.name.includes('柴崎') || player.name.includes('Gaku Shibasaki') || player.name.includes('Shibasaki')))) {
    return window.SHIBASAKI_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p183' || (player.name && (player.name.includes('柴崎岳') || player.name.includes('柴崎') || player.name.includes('Gaku Shibasaki') || player.name.includes('Shibasaki')))) {
    return window.SHIBASAKI_2026_IMAGE || player.avatarUrl || '';
  }\n${p184Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p184 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p184 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p184');
console.log('6. Verification of p184:', p184 ? p184.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.MATHEUS_BUENO_2026_IMAGE:', sandbox.window.MATHEUS_BUENO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== MATHEUS BUENO 2026 ADDED SUCCESSFULLY! ===');
