const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MASAHIRO SUGATA (p343) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787419887239.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'sugataMasahiro2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SUGATA_MASAHIRO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. sugataMasahiro2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p342Idx = mockCode.indexOf("id: 'p342'");
if (p342Idx === -1) {
  console.error("Could not find p342 in mockData.js!");
  process.exit(1);
}

const p342AvatarIdx = mockCode.indexOf("avatarUrl:", p342Idx);
const p342EndIdx = mockCode.indexOf("}", p342AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p342EndIdx + 1);

const sugataObj = `,
  {
    id: 'p343',
    name: '菅田真啓',
    readingName: 'すがた・まさひろ',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6035,
    maxOverall: 14298,
    baseStats: { shoot: 1001, pass: 963, dribble: 1032, defense: 1130, physical: 1187, speed: 697 },
    detailStats: {
      shoot: { finishing: 337, power: 357, composure: 307 },
      pass: { shortPass: 318, longPass: 340, accuracy: 305 },
      dribble: { breakout: 313, keeping: 361, ballTouch: 358 },
      defense: { tackle: 381, interception: 355, marking: 394 },
      physical: { jumping: 407, contact: 397, stamina: 383 },
      speed: { running: 344, agility: 353 }
    },
    maxEnhanced: {
      overall: 14298,
      baseStats: { shoot: 2498, pass: 2532, dribble: 2565, defense: 2735, physical: 2780, speed: 1743 },
      detailStats: {
        shoot: { finishing: 836, power: 856, composure: 806 },
        pass: { shortPass: 841, longPass: 863, accuracy: 828 },
        dribble: { breakout: 824, keeping: 872, ballTouch: 869 },
        defense: { tackle: 916, interception: 890, marking: 929 },
        physical: { jumping: 942, contact: 932, stamina: 906 },
        speed: { running: 867, agility: 876 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ハイタワーの天敵', rank: '銀', description: '発動条件：好調　/　マーク・ジャンプUP' },
      { name: 'ハードタックラー', rank: '銀', description: '発動条件：好調　/　タックル・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + sugataObj, 'utf-8');
console.log('2. mockData.js updated with p343 (Masahiro Sugata) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('sugataMasahiro2026Image.js')) {
  if (indexContent.includes('uedaNaomichi2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/uedaNaomichi2026Image.js"></script>',
      '<script src="./src/data/uedaNaomichi2026Image.js"></script>\n  <script src="./src/data/sugataMasahiro2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/sugataMasahiro2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p343": "SUGATA_MASAHIRO_2026_IMAGE"')) {
  if (appJsxCode.includes('"p342": "UEDA_NAOMICHI_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p342": "UEDA_NAOMICHI_2026_IMAGE"',
      '"p342": "UEDA_NAOMICHI_2026_IMAGE",\n  "p343": "SUGATA_MASAHIRO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p343 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p343": "SUGATA_MASAHIRO_2026_IMAGE"')) {
  if (appJsCode.includes('"p342": "UEDA_NAOMICHI_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p342": "UEDA_NAOMICHI_2026_IMAGE"',
      '"p342": "UEDA_NAOMICHI_2026_IMAGE",\n  "p343": "SUGATA_MASAHIRO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p343 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p343 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p343');
console.log('6. Verification of p343:', p343 ? `${p343.name} (Overall: ${p343.overall}, maxOverall: ${p343.maxOverall}, Rarity: ${p343.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SUGATA_MASAHIRO_2026_IMAGE:', sandbox.window.SUGATA_MASAHIRO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== MASAHIRO SUGATA ADDED SUCCESSFULLY! ===');
