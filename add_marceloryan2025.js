const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MARCELO RYAN (p303) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787387527936.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'marceloryan2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.MARCELORYAN_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. marceloryan2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p302Idx = mockCode.indexOf("id: 'p302'");
if (p302Idx === -1) {
  console.error("Could not find p302 in mockData.js!");
  process.exit(1);
}

const p302AvatarIdx = mockCode.indexOf("avatarUrl:", p302Idx);
const p302EndIdx = mockCode.indexOf("}", p302AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p302EndIdx + 1);

const ryanObj = `,
  {
    id: 'p303',
    name: 'マルセロ・ヒアン',
    readingName: 'まるせろ・ひあん',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'リアクション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6288,
    maxOverall: 14523,
    baseStats: { shoot: 1169, pass: 1007, dribble: 1128, defense: 840, physical: 1058, speed: 849 },
    detailStats: {
      shoot: { finishing: 406, power: 356, composure: 407 },
      pass: { shortPass: 336, longPass: 329, accuracy: 342 },
      dribble: { breakout: 390, keeping: 373, ballTouch: 365 },
      defense: { tackle: 282, interception: 281, marking: 277 },
      physical: { jumping: 364, contact: 342, stamina: 352 },
      speed: { running: 419, agility: 430 }
    },
    maxEnhanced: {
      overall: 14523,
      baseStats: { shoot: 2774, pass: 2540, dribble: 2709, defense: 2337, physical: 2639, speed: 1895 },
      detailStats: {
        shoot: { finishing: 941, power: 891, composure: 942 },
        pass: { shortPass: 847, longPass: 840, accuracy: 853 },
        dribble: { breakout: 913, keeping: 896, ballTouch: 900 },
        defense: { tackle: 781, interception: 780, marking: 776 },
        physical: { jumping: 887, contact: 877, stamina: 875 },
        speed: { running: 942, agility: 953 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'スピードランナー', rank: '銀', description: '発動条件：好調　/　走力・敏捷性UP' },
      { name: '冷静なフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・冷静さUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + ryanObj, 'utf-8');
console.log('2. mockData.js updated with p303 (Marcelo Ryan) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('marceloryan2025Image.js')) {
  if (indexContent.includes('marcusvinicius2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/marcusvinicius2025Image.js"></script>',
      '<script src="./src/data/marcusvinicius2025Image.js"></script>\n  <script src="./src/data/marceloryan2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/marceloryan2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p303": "MARCELORYAN_2025_IMAGE"')) {
  if (appJsxCode.includes('"p302": "MARCUSVINICIUS_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p302": "MARCUSVINICIUS_2025_IMAGE"',
      '"p302": "MARCUSVINICIUS_2025_IMAGE",\n  "p303": "MARCELORYAN_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p303 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p303": "MARCELORYAN_2025_IMAGE"')) {
  if (appJsCode.includes('"p302": "MARCUSVINICIUS_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p302": "MARCUSVINICIUS_2025_IMAGE"',
      '"p302": "MARCUSVINICIUS_2025_IMAGE",\n  "p303": "MARCELORYAN_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p303 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p303 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p303');
console.log('6. Verification of p303:', p303 ? `${p303.name} (Overall: ${p303.overall}, maxOverall: ${p303.maxOverall}, Rarity: ${p303.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.MARCELORYAN_2025_IMAGE:', sandbox.window.MARCELORYAN_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== MARCELO RYAN ADDED SUCCESSFULLY! ===');
