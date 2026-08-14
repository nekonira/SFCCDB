const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MARCO TULIO 2026 (p210) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786031348716.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'marcoTulio2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.MARCO_TULIO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. marcoTulio2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p209Idx = mockCode.indexOf("id: 'p209'");
if (p209Idx === -1) {
  console.error("Could not find p209 in mockData.js!");
  process.exit(1);
}

const p209AvatarIdx = mockCode.indexOf("avatarUrl:", p209Idx);
const p209EndIdx = mockCode.indexOf("}", p209AvatarIdx);

mockCode = mockCode.substring(0, p209EndIdx + 1);

const marcoTulio2026Obj = `,
  {
    id: 'p210',
    name: 'マルコ・トゥーリオ(2026)',
    readingName: 'まることぅーりお',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'カウンター',
    playStyle: 'ワイドストライカーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6294,
    maxOverall: 14452,
    baseStats: { shoot: 1198, pass: 1186, dribble: 1238, defense: 864, physical: 1080, speed: 778 },
    detailStats: {
      shoot: { finishing: 403, power: 391, composure: 404 },
      pass: { shortPass: 393, longPass: 403, accuracy: 390 },
      dribble: { breakout: 407, keeping: 410, ballTouch: 421 },
      defense: { tackle: 272, interception: 301, marking: 291 },
      physical: { jumping: 309, contact: 438, stamina: 333 },
      speed: { running: 426, agility: 352 }
    },
    maxEnhanced: {
      overall: 14452,
      baseStats: { shoot: 2755, pass: 2755, dribble: 2831, defense: 2373, physical: 2625, speed: 1848 },
      detailStats: {
        shoot: { finishing: 926, power: 902, composure: 927 },
        pass: { shortPass: 916, longPass: 926, accuracy: 913 },
        dribble: { breakout: 942, keeping: 945, ballTouch: 944 },
        defense: { tackle: 783, interception: 800, marking: 790 },
        physical: { jumping: 820, contact: 949, stamina: 856 },
        speed: { running: 961, agility: 887 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: 'ムービングターゲット', rank: '銅', description: '発動条件：絶好調　/　キープ力・走力UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '剛柔のタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += marcoTulio2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p210 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('marcoTulio2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/marcoTulio2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p210Check = `  if (player.id === 'p210' || (player.name && (player.name.includes('マルコ・トゥーリオ') || player.name.includes('トゥーリオ') || player.name.includes('Marco Tulio') || player.name.includes('Marco Túlio') || player.name.includes('Tulio')))) {\n    return window.MARCO_TULIO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p210'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p209' || (player.name && (player.name.includes('中村亮太') || (player.name.includes('中村') && player.name.includes('亮太')) || player.name.includes('Ryota Nakamura')))) {
    return window.NAKAMURA_RYOTA_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p209' || (player.name && (player.name.includes('中村亮太') || (player.name.includes('中村') && player.name.includes('亮太')) || player.name.includes('Ryota Nakamura')))) {
    return window.NAKAMURA_RYOTA_2026_IMAGE || player.avatarUrl || '';
  }\n${p210Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p210 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p210'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p209' || (player.name && (player.name.includes('中村亮太') || (player.name.includes('中村') && player.name.includes('亮太')) || player.name.includes('Ryota Nakamura')))) {
    return window.NAKAMURA_RYOTA_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p209' || (player.name && (player.name.includes('中村亮太') || (player.name.includes('中村') && player.name.includes('亮太')) || player.name.includes('Ryota Nakamura')))) {
    return window.NAKAMURA_RYOTA_2026_IMAGE || player.avatarUrl || '';
  }\n${p210Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p210 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p210 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p210');
console.log('6. Verification of p210:', p210 ? p210.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.MARCO_TULIO_2026_IMAGE:', sandbox.window.MARCO_TULIO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== MARCO TULIO 2026 ADDED SUCCESSFULLY! ===');
