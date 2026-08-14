const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YOSHIO KOIZUMI 2026 (p190) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786025940606.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'koizumi2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KOIZUMI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. koizumi2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p189Idx = mockCode.indexOf("id: 'p189'");
if (p189Idx === -1) {
  console.error("Could not find p189 in mockData.js!");
  process.exit(1);
}

const p189AvatarIdx = mockCode.indexOf("avatarUrl:", p189Idx);
const p189EndIdx = mockCode.indexOf("}", p189AvatarIdx);

mockCode = mockCode.substring(0, p189EndIdx + 1);

const koizumi2026Obj = `,
  {
    id: 'p190',
    name: '小泉佳穂(2026)',
    readingName: 'こいずみよしお',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 6526,
    maxOverall: 14676,
    baseStats: { shoot: 1222, pass: 1275, dribble: 1240, defense: 1034, physical: 1174, speed: 740 },
    detailStats: {
      shoot: { finishing: 403, power: 428, composure: 391 },
      pass: { shortPass: 431, longPass: 426, accuracy: 418 },
      dribble: { breakout: 397, keeping: 412, ballTouch: 431 },
      defense: { tackle: 361, interception: 350, marking: 323 },
      physical: { jumping: 361, contact: 405, stamina: 408 },
      speed: { running: 342, agility: 398 }
    },
    maxEnhanced: {
      overall: 14676,
      baseStats: { shoot: 2767, pass: 2856, dribble: 2809, defense: 2579, physical: 2743, speed: 1774 },
      detailStats: {
        shoot: { finishing: 914, power: 939, composure: 914 },
        pass: { shortPass: 966, longPass: 949, accuracy: 941 },
        dribble: { breakout: 920, keeping: 935, ballTouch: 954 },
        defense: { tackle: 884, interception: 861, marking: 834 },
        physical: { jumping: 872, contact: 928, stamina: 943 },
        speed: { running: 853, agility: 921 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '操舵のパス', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：前中・中中に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　ダイレクトショートパス成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '不屈のパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・スタミナUP' },
      { name: '柔軟なロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += koizumi2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p190 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('koizumi2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/koizumiImage.js"></script>',
    '<script src="./src/data/koizumi2026Image.js"></script>\n  <script src="./src/data/koizumiImage.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p190Check = `  if (player.id === 'p190' || (player.name && player.name.includes('2026') && (player.name.includes('小泉') || player.name.includes('Koizumi')))) {\n    return window.KOIZUMI_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p190'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p189' || (player.name && (player.name.includes('東條敦輝') || player.name.includes('東條') || player.name.includes('Atsuki Tojo') || player.name.includes('Tojo')))) {
    return window.TOJO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p189' || (player.name && (player.name.includes('東條敦輝') || player.name.includes('東條') || player.name.includes('Atsuki Tojo') || player.name.includes('Tojo')))) {
    return window.TOJO_2026_IMAGE || player.avatarUrl || '';
  }\n${p190Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p190 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p190'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p189' || (player.name && (player.name.includes('東條敦輝') || player.name.includes('東條') || player.name.includes('Atsuki Tojo') || player.name.includes('Tojo')))) {
    return window.TOJO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p189' || (player.name && (player.name.includes('東條敦輝') || player.name.includes('東條') || player.name.includes('Atsuki Tojo') || player.name.includes('Tojo')))) {
    return window.TOJO_2026_IMAGE || player.avatarUrl || '';
  }\n${p190Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p190 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p190 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p190');
console.log('6. Verification of p190:', p190 ? p190.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KOIZUMI_2026_IMAGE:', sandbox.window.KOIZUMI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== YOSHIO KOIZUMI 2026 ADDED SUCCESSFULLY! ===');
