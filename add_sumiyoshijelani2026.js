const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING JELANI RESHAUN SUMIYOSHI (p344) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787420035854.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'sumiyoshiJelani2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SUMIYOSHI_JELANI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. sumiyoshiJelani2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p343Idx = mockCode.indexOf("id: 'p343'");
if (p343Idx === -1) {
  console.error("Could not find p343 in mockData.js!");
  process.exit(1);
}

const p343AvatarIdx = mockCode.indexOf("avatarUrl:", p343Idx);
const p343EndIdx = mockCode.indexOf("}", p343AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p343EndIdx + 1);

const sumiyoshiObj = `,
  {
    id: 'p344',
    name: '住吉ジェラニレショーン',
    readingName: 'すみよし・じぇらにれしょーん',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6179,
    maxOverall: 14398,
    baseStats: { shoot: 990, pass: 1000, dribble: 1106, defense: 1141, physical: 1146, speed: 723 },
    detailStats: {
      shoot: { finishing: 311, power: 352, composure: 327 },
      pass: { shortPass: 339, longPass: 332, accuracy: 329 },
      dribble: { breakout: 359, keeping: 361, ballTouch: 386 },
      defense: { tackle: 393, interception: 378, marking: 370 },
      physical: { jumping: 392, contact: 392, stamina: 362 },
      speed: { running: 357, agility: 366 }
    },
    maxEnhanced: {
      overall: 14398,
      baseStats: { shoot: 2487, pass: 2569, dribble: 2639, defense: 2746, physical: 2739, speed: 1769 },
      detailStats: {
        shoot: { finishing: 810, power: 851, composure: 826 },
        pass: { shortPass: 862, longPass: 855, accuracy: 852 },
        dribble: { breakout: 870, keeping: 872, ballTouch: 897 },
        defense: { tackle: 928, interception: 913, marking: 905 },
        physical: { jumping: 927, contact: 927, stamina: 885 },
        speed: { running: 880, agility: 889 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ハードタックラー', rank: '銀', description: '発動条件：好調　/　タックル・コンタクトUP' },
      { name: '上空の寸断者', rank: '銀', description: '発動条件：好調　/　パスカット・ジャンプUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + sumiyoshiObj, 'utf-8');
console.log('2. mockData.js updated with p344 (Jelani Reshaun Sumiyoshi) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('sumiyoshiJelani2026Image.js')) {
  if (indexContent.includes('sugataMasahiro2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/sugataMasahiro2026Image.js"></script>',
      '<script src="./src/data/sugataMasahiro2026Image.js"></script>\n  <script src="./src/data/sumiyoshiJelani2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/sumiyoshiJelani2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p344": "SUMIYOSHI_JELANI_2026_IMAGE"')) {
  if (appJsxCode.includes('"p343": "SUGATA_MASAHIRO_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p343": "SUGATA_MASAHIRO_2026_IMAGE"',
      '"p343": "SUGATA_MASAHIRO_2026_IMAGE",\n  "p344": "SUMIYOSHI_JELANI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p344 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p344": "SUMIYOSHI_JELANI_2026_IMAGE"')) {
  if (appJsCode.includes('"p343": "SUGATA_MASAHIRO_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p343": "SUGATA_MASAHIRO_2026_IMAGE"',
      '"p343": "SUGATA_MASAHIRO_2026_IMAGE",\n  "p344": "SUMIYOSHI_JELANI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p344 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p344 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p344');
console.log('6. Verification of p344:', p344 ? `${p344.name} (Overall: ${p344.overall}, maxOverall: ${p344.maxOverall}, Rarity: ${p344.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SUMIYOSHI_JELANI_2026_IMAGE:', sandbox.window.SUMIYOSHI_JELANI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== JELANI RESHAUN SUMIYOSHI ADDED SUCCESSFULLY! ===');
