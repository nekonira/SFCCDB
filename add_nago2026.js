const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING SHINTARO NAGO 2026 (p195) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786027922693.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'nago2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.NAGO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. nago2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p194Idx = mockCode.indexOf("id: 'p194'");
if (p194Idx === -1) {
  console.error("Could not find p194 in mockData.js!");
  process.exit(1);
}

const p194AvatarIdx = mockCode.indexOf("avatarUrl:", p194Idx);
const p194EndIdx = mockCode.indexOf("}", p194AvatarIdx);

mockCode = mockCode.substring(0, p194EndIdx + 1);

const nago2026Obj = `,
  {
    id: 'p195',
    name: '名古新太郎(2026)',
    readingName: 'なごしんたろう',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6457,
    maxOverall: 14548,
    baseStats: { shoot: 1101, pass: 1085, dribble: 1323, defense: 1138, physical: 1052, speed: 871 },
    detailStats: {
      shoot: { finishing: 375, power: 354, composure: 372 },
      pass: { shortPass: 351, longPass: 335, accuracy: 399 },
      dribble: { breakout: 441, keeping: 445, ballTouch: 437 },
      defense: { tackle: 393, interception: 376, marking: 369 },
      physical: { jumping: 320, contact: 337, stamina: 395 },
      speed: { running: 433, agility: 438 }
    },
    maxEnhanced: {
      overall: 14548,
      baseStats: { shoot: 2646, pass: 2666, dribble: 2892, defense: 2683, physical: 2621, speed: 1905 },
      detailStats: {
        shoot: { finishing: 886, power: 865, composure: 895 },
        pass: { shortPass: 886, longPass: 858, accuracy: 922 },
        dribble: { breakout: 964, keeping: 968, ballTouch: 960 },
        defense: { tackle: 916, interception: 887, marking: 880 },
        physical: { jumping: 831, contact: 860, stamina: 930 },
        speed: { running: 944, agility: 961 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' },
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += nago2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p195 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('nago2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/nago2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p195Check = `  if (player.id === 'p195' || (player.name && (player.name.includes('名古新太郎') || player.name.includes('名古') || player.name.includes('Shintaro Nago') || player.name.includes('Nago')))) {\n    return window.NAGO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p195'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p194' || (player.name && (player.name.includes('山見大登') || player.name.includes('山見') || player.name.includes('Hiroto Yamami') || player.name.includes('Yamami')))) {
    return window.YAMAMI_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p194' || (player.name && (player.name.includes('山見大登') || player.name.includes('山見') || player.name.includes('Hiroto Yamami') || player.name.includes('Yamami')))) {
    return window.YAMAMI_2026_IMAGE || player.avatarUrl || '';
  }\n${p195Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p195 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p195'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p194' || (player.name && (player.name.includes('山見大登') || player.name.includes('山見') || player.name.includes('Hiroto Yamami') || player.name.includes('Yamami')))) {
    return window.YAMAMI_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p194' || (player.name && (player.name.includes('山見大登') || player.name.includes('山見') || player.name.includes('Hiroto Yamami') || player.name.includes('Yamami')))) {
    return window.YAMAMI_2026_IMAGE || player.avatarUrl || '';
  }\n${p195Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p195 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p195 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p195');
console.log('6. Verification of p195:', p195 ? p195.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.NAGO_2026_IMAGE:', sandbox.window.NAGO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== SHINTARO NAGO 2026 ADDED SUCCESSFULLY! ===');
