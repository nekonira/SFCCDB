const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING CHIHIRO KATO 2026 (p203) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786029739591.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'katoChihiro2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KATO_CHIHIRO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. katoChihiro2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p202Idx = mockCode.indexOf("id: 'p202'");
if (p202Idx === -1) {
  console.error("Could not find p202 in mockData.js!");
  process.exit(1);
}

const p202AvatarIdx = mockCode.indexOf("avatarUrl:", p202Idx);
const p202EndIdx = mockCode.indexOf("}", p202AvatarIdx);

mockCode = mockCode.substring(0, p202EndIdx + 1);

const katoChihiro2026Obj = `,
  {
    id: 'p203',
    name: '加藤千尋(2026)',
    readingName: 'かとうちひろ',
    category: 'MF',
    mainPosition: 'RM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'サイドアタッカーRM',
    playStyleLevel: 'Ⅱ',
    overall: 6167,
    maxOverall: 14335,
    baseStats: { shoot: 1185, pass: 1175, dribble: 1148, defense: 1121, physical: 1103, speed: 794 },
    detailStats: {
      shoot: { finishing: 380, power: 418, composure: 387 },
      pass: { shortPass: 393, longPass: 391, accuracy: 391 },
      dribble: { breakout: 371, keeping: 386, ballTouch: 391 },
      defense: { tackle: 368, interception: 385, marking: 368 },
      physical: { jumping: 329, contact: 373, stamina: 401 },
      speed: { running: 392, agility: 402 }
    },
    maxEnhanced: {
      overall: 14335,
      baseStats: { shoot: 2742, pass: 2744, dribble: 2741, defense: 2630, physical: 2648, speed: 1864 },
      detailStats: {
        shoot: { finishing: 903, power: 929, composure: 910 },
        pass: { shortPass: 916, longPass: 914, accuracy: 914 },
        dribble: { breakout: 906, keeping: 921, ballTouch: 914 },
        defense: { tackle: 879, interception: 884, marking: 867 },
        physical: { jumping: 840, contact: 884, stamina: 924 },
        speed: { running: 927, agility: 937 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: '高速クロス', rank: '銅', description: '発動エリア：前左右　/　発動条件：AM・RW・LW・CFの選手へのショートパス時　/　ショートパス・キック精度・ロングパスUP　/　成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '無限のアジリティ', rank: '銀', description: '発動条件：好調　/　スタミナ・敏捷性UP' },
      { name: '懐の深いロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・キープ力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += katoChihiro2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p203 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('katoChihiro2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/katoChihiro2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p203Check = `  if (player.id === 'p203' || (player.name && (player.name.includes('加藤千尋') || player.name.includes('加藤') || player.name.includes('Chihiro Kato') || player.name.includes('Kato')))) {\n    return window.KATO_CHIHIRO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p203'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p202' || (player.name && (player.name.includes('姫野誠') || player.name.includes('姫野') || player.name.includes('Makoto Himeno') || player.name.includes('Himeno')))) {
    return window.HIMENO_MAKOTO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p202' || (player.name && (player.name.includes('姫野誠') || player.name.includes('姫野') || player.name.includes('Makoto Himeno') || player.name.includes('Himeno')))) {
    return window.HIMENO_MAKOTO_2026_IMAGE || player.avatarUrl || '';
  }\n${p203Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p203 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p203'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p202' || (player.name && (player.name.includes('姫野誠') || player.name.includes('姫野') || player.name.includes('Makoto Himeno') || player.name.includes('Himeno')))) {
    return window.HIMENO_MAKOTO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p202' || (player.name && (player.name.includes('姫野誠') || player.name.includes('姫野') || player.name.includes('Makoto Himeno') || player.name.includes('Himeno')))) {
    return window.HIMENO_MAKOTO_2026_IMAGE || player.avatarUrl || '';
  }\n${p203Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p203 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p203 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p203');
console.log('6. Verification of p203:', p203 ? p203.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KATO_CHIHIRO_2026_IMAGE:', sandbox.window.KATO_CHIHIRO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== CHIHIRO KATO 2026 ADDED SUCCESSFULLY! ===');
