const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING HIROTO YAMAMI 2026 (p194) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786027743233.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yamami2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YAMAMI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. yamami2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p193Idx = mockCode.indexOf("id: 'p193'");
if (p193Idx === -1) {
  console.error("Could not find p193 in mockData.js!");
  process.exit(1);
}

const p193AvatarIdx = mockCode.indexOf("avatarUrl:", p193Idx);
const p193EndIdx = mockCode.indexOf("}", p193AvatarIdx);

mockCode = mockCode.substring(0, p193EndIdx + 1);

const yamami2026Obj = `,
  {
    id: 'p194',
    name: '山見大登(2026)',
    readingName: 'やまみひろと',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6406,
    maxOverall: 14481,
    baseStats: { shoot: 1208, pass: 1165, dribble: 1277, defense: 928, physical: 1083, speed: 817 },
    detailStats: {
      shoot: { finishing: 404, power: 402, composure: 402 },
      pass: { shortPass: 368, longPass: 416, accuracy: 381 },
      dribble: { breakout: 438, keeping: 413, ballTouch: 426 },
      defense: { tackle: 298, interception: 323, marking: 307 },
      physical: { jumping: 393, contact: 304, stamina: 386 },
      speed: { running: 401, agility: 416 }
    },
    maxEnhanced: {
      overall: 14481,
      baseStats: { shoot: 2753, pass: 2746, dribble: 2846, defense: 2473, physical: 2652, speed: 1851 },
      detailStats: {
        shoot: { finishing: 915, power: 913, composure: 925 },
        pass: { shortPass: 903, longPass: 939, accuracy: 904 },
        dribble: { breakout: 961, keeping: 936, ballTouch: 949 },
        defense: { tackle: 821, interception: 834, marking: 818 },
        physical: { jumping: 904, contact: 827, stamina: 921 },
        speed: { running: 912, agility: 939 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: 'すり抜けるロングパサー', rank: '銀', description: '相手のプレッシャーを回避し前線へ精度の高いロングパスを送る' },
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += yamami2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p194 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('yamami2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/yamami2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p194Check = `  if (player.id === 'p194' || (player.name && (player.name.includes('山見大登') || player.name.includes('山見') || player.name.includes('Hiroto Yamami') || player.name.includes('Yamami')))) {\n    return window.YAMAMI_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p194'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p193' || (player.name && (player.name.includes('佐々木大樹') || (player.name.includes('佐々木') && player.name.includes('大樹')) || player.name.includes('Daiju Sasaki') || player.name.includes('Sasaki')))) {
    return window.SASAKI_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p193' || (player.name && (player.name.includes('佐々木大樹') || (player.name.includes('佐々木') && player.name.includes('大樹')) || player.name.includes('Daiju Sasaki') || player.name.includes('Sasaki')))) {
    return window.SASAKI_2026_IMAGE || player.avatarUrl || '';
  }\n${p194Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p194 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p194'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p193' || (player.name && (player.name.includes('佐々木大樹') || (player.name.includes('佐々木') && player.name.includes('大樹')) || player.name.includes('Daiju Sasaki') || player.name.includes('Sasaki')))) {
    return window.SASAKI_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p193' || (player.name && (player.name.includes('佐々木大樹') || (player.name.includes('佐々木') && player.name.includes('大樹')) || player.name.includes('Daiju Sasaki') || player.name.includes('Sasaki')))) {
    return window.SASAKI_2026_IMAGE || player.avatarUrl || '';
  }\n${p194Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p194 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p194 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p194');
console.log('6. Verification of p194:', p194 ? p194.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.YAMAMI_2026_IMAGE:', sandbox.window.YAMAMI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== HIROTO YAMAMI 2026 ADDED SUCCESSFULLY! ===');
