const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING HAYAO KAWABE 2026 (p186) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786025215438.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kawabe2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KAWABE_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kawabe2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p185Idx = mockCode.indexOf("id: 'p185'");
if (p185Idx === -1) {
  console.error("Could not find p185 in mockData.js!");
  process.exit(1);
}

const p185AvatarIdx = mockCode.indexOf("avatarUrl:", p185Idx);
const p185EndIdx = mockCode.indexOf("}", p185AvatarIdx);

mockCode = mockCode.substring(0, p185EndIdx + 1);

const kawabe2026Obj = `,
  {
    id: 'p186',
    name: '川辺駿(2026)',
    readingName: 'かわべはやお',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 6509,
    maxOverall: 14684,
    baseStats: { shoot: 1115, pass: 1265, dribble: 1280, defense: 1159, physical: 1071, speed: 784 },
    detailStats: {
      shoot: { finishing: 378, power: 364, composure: 373 },
      pass: { shortPass: 427, longPass: 421, accuracy: 417 },
      dribble: { breakout: 413, keeping: 424, ballTouch: 443 },
      defense: { tackle: 357, interception: 403, marking: 399 },
      physical: { jumping: 335, contact: 353, stamina: 383 },
      speed: { running: 356, agility: 428 }
    },
    maxEnhanced: {
      overall: 14684,
      baseStats: { shoot: 2660, pass: 2870, dribble: 2813, defense: 2740, physical: 2640, speed: 1806 },
      detailStats: {
        shoot: { finishing: 889, power: 875, composure: 896 },
        pass: { shortPass: 962, longPass: 956, accuracy: 952 },
        dribble: { breakout: 924, keeping: 935, ballTouch: 954 },
        defense: { tackle: 892, interception: 926, marking: 922 },
        physical: { jumping: 846, contact: 876, stamina: 918 },
        speed: { running: 867, agility: 939 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '楔のパス', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：AM・CFの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: 'シルクタッチ', rank: '銀', description: '発動条件：好調　/　ショートパス・ボールタッチUP' },
      { name: '高性能ロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・キック精度UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += kawabe2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p186 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kawabe2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/kawamotoImage.js"></script>',
    '<script src="./src/data/kawabe2026Image.js"></script>\n  <script src="./src/data/kawamotoImage.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p186Check = `  if (player.id === 'p186' || (player.name && (player.name.includes('川辺駿') || player.name.includes('川辺') || player.name.includes('Hayao Kawabe') || player.name.includes('Kawabe')))) {\n    return window.KAWABE_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p186'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p185' || (player.name && (player.name.includes('清武弘嗣') || player.name.includes('清武') || player.name.includes('Hiroshi Kiyotake') || player.name.includes('Kiyotake')))) {
    return window.KIYOTAKE_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p185' || (player.name && (player.name.includes('清武弘嗣') || player.name.includes('清武') || player.name.includes('Hiroshi Kiyotake') || player.name.includes('Kiyotake')))) {
    return window.KIYOTAKE_2026_IMAGE || player.avatarUrl || '';
  }\n${p186Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p186 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p186'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p185' || (player.name && (player.name.includes('清武弘嗣') || player.name.includes('清武') || player.name.includes('Hiroshi Kiyotake') || player.name.includes('Kiyotake')))) {
    return window.KIYOTAKE_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p185' || (player.name && (player.name.includes('清武弘嗣') || player.name.includes('清武') || player.name.includes('Hiroshi Kiyotake') || player.name.includes('Kiyotake')))) {
    return window.KIYOTAKE_2026_IMAGE || player.avatarUrl || '';
  }\n${p186Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p186 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p186 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p186');
console.log('6. Verification of p186:', p186 ? p186.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KAWABE_2026_IMAGE:', sandbox.window.KAWABE_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== HAYAO KAWABE 2026 ADDED SUCCESSFULLY! ===');
