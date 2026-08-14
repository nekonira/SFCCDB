const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KOTARO FUJIKAWA 2026 (p198) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786028542539.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'fujikawaKotaro2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.FUJIKAWA_KOTARO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. fujikawaKotaro2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p197Idx = mockCode.indexOf("id: 'p197'");
if (p197Idx === -1) {
  console.error("Could not find p197 in mockData.js!");
  process.exit(1);
}

const p197AvatarIdx = mockCode.indexOf("avatarUrl:", p197Idx);
const p197EndIdx = mockCode.indexOf("}", p197AvatarIdx);

mockCode = mockCode.substring(0, p197EndIdx + 1);

const fujikawaKotaro2026Obj = `,
  {
    id: 'p198',
    name: '藤川虎太朗(2026)',
    readingName: 'ふじかわこたろう',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6023,
    maxOverall: 14097,
    baseStats: { shoot: 1129, pass: 1134, dribble: 1156, defense: 897, physical: 987, speed: 784 },
    detailStats: {
      shoot: { finishing: 382, power: 373, composure: 374 },
      pass: { shortPass: 399, longPass: 384, accuracy: 351 },
      dribble: { breakout: 378, keeping: 386, ballTouch: 392 },
      defense: { tackle: 286, interception: 311, marking: 300 },
      physical: { jumping: 318, contact: 348, stamina: 321 },
      speed: { running: 379, agility: 405 }
    },
    maxEnhanced: {
      overall: 14097,
      baseStats: { shoot: 2674, pass: 2715, dribble: 2725, defense: 2442, physical: 2556, speed: 1818 },
      detailStats: {
        shoot: { finishing: 893, power: 884, composure: 897 },
        pass: { shortPass: 934, longPass: 907, accuracy: 874 },
        dribble: { breakout: 901, keeping: 909, ballTouch: 915 },
        defense: { tackle: 809, interception: 822, marking: 811 },
        physical: { jumping: 829, contact: 871, stamina: 856 },
        speed: { running: 890, agility: 928 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '操舵のパス', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：前中・中中に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　ダイレクトショートパス成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: 'シルクタッチ', rank: '銀', description: '発動条件：好調　/　ショートパス・ボールタッチUP' },
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += fujikawaKotaro2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p198 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('fujikawaKotaro2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/fujikawaKotaro2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p198Check = `  if (player.id === 'p198' || (player.name && (player.name.includes('藤川虎太朗') || player.name.includes('藤川') || player.name.includes('Kotaro Fujikawa') || player.name.includes('Fujikawa')))) {\n    return window.FUJIKAWA_KOTARO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p198'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p197' || (player.name && (player.name.includes('後藤優介') || (player.name.includes('後藤') && player.name.includes('優介')) || player.name.includes('Yusuke Goto') || player.name.includes('Goto')))) {
    return window.GOTO_YUSUKE_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p197' || (player.name && (player.name.includes('後藤優介') || (player.name.includes('後藤') && player.name.includes('優介')) || player.name.includes('Yusuke Goto') || player.name.includes('Goto')))) {
    return window.GOTO_YUSUKE_2026_IMAGE || player.avatarUrl || '';
  }\n${p198Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p198 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p198'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p197' || (player.name && (player.name.includes('後藤優介') || (player.name.includes('後藤') && player.name.includes('優介')) || player.name.includes('Yusuke Goto') || player.name.includes('Goto')))) {
    return window.GOTO_YUSUKE_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p197' || (player.name && (player.name.includes('後藤優介') || (player.name.includes('後藤') && player.name.includes('優介')) || player.name.includes('Yusuke Goto') || player.name.includes('Goto')))) {
    return window.GOTO_YUSUKE_2026_IMAGE || player.avatarUrl || '';
  }\n${p198Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p198 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p198 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p198');
console.log('6. Verification of p198:', p198 ? p198.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.FUJIKAWA_KOTARO_2026_IMAGE:', sandbox.window.FUJIKAWA_KOTARO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KOTARO FUJIKAWA 2026 ADDED SUCCESSFULLY! ===');
