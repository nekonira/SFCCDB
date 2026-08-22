const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TAISEI INOUE (p339) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787419069330.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'inoueTaisei2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.INOUE_TAISEI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. inoueTaisei2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p338Idx = mockCode.indexOf("id: 'p338'");
if (p338Idx === -1) {
  console.error("Could not find p338 in mockData.js!");
  process.exit(1);
}

const p338AvatarIdx = mockCode.indexOf("avatarUrl:", p338Idx);
const p338EndIdx = mockCode.indexOf("}", p338AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p338EndIdx + 1);

const inoueObj = `,
  {
    id: 'p339',
    name: '井上太聖',
    readingName: 'いのうえ・たいせい',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 5971,
    maxOverall: 14213,
    baseStats: { shoot: 1048, pass: 1047, dribble: 1040, defense: 1127, physical: 1142, speed: 680 },
    detailStats: {
      shoot: { finishing: 326, power: 374, composure: 348 },
      pass: { shortPass: 376, longPass: 365, accuracy: 306 },
      dribble: { breakout: 315, keeping: 350, ballTouch: 375 },
      defense: { tackle: 380, interception: 352, marking: 395 },
      physical: { jumping: 378, contact: 376, stamina: 388 },
      speed: { running: 337, agility: 343 }
    },
    maxEnhanced: {
      overall: 14213,
      baseStats: { shoot: 2545, pass: 2616, dribble: 2573, defense: 2732, physical: 2735, speed: 1726 },
      detailStats: {
        shoot: { finishing: 825, power: 873, composure: 847 },
        pass: { shortPass: 899, longPass: 888, accuracy: 829 },
        dribble: { breakout: 826, keeping: 861, ballTouch: 886 },
        defense: { tackle: 915, interception: 887, marking: 930 },
        physical: { jumping: 913, contact: 911, stamina: 911 },
        speed: { running: 860, agility: 866 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '意外性のあるミドルパス', rank: '銅', description: '発動エリア：中中・後左中右　/　発動条件：CF・AMの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: 'ハイタワーの天敵', rank: '銀', description: '発動条件：好調　/　マーク・ジャンプUP' },
      { name: 'ハードタックラー', rank: '銀', description: '発動条件：好調　/　タックル・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + inoueObj, 'utf-8');
console.log('2. mockData.js updated with p339 (Taisei Inoue) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('inoueTaisei2026Image.js')) {
  if (indexContent.includes('mariusHoibraten2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/mariusHoibraten2026Image.js"></script>',
      '<script src="./src/data/mariusHoibraten2026Image.js"></script>\n  <script src="./src/data/inoueTaisei2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/inoueTaisei2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p339": "INOUE_TAISEI_2026_IMAGE"')) {
  if (appJsxCode.includes('"p338": "MARIUS_HOIBRATEN_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p338": "MARIUS_HOIBRATEN_2026_IMAGE"',
      '"p338": "MARIUS_HOIBRATEN_2026_IMAGE",\n  "p339": "INOUE_TAISEI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p339 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p339": "INOUE_TAISEI_2026_IMAGE"')) {
  if (appJsCode.includes('"p338": "MARIUS_HOIBRATEN_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p338": "MARIUS_HOIBRATEN_2026_IMAGE"',
      '"p338": "MARIUS_HOIBRATEN_2026_IMAGE",\n  "p339": "INOUE_TAISEI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p339 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p339 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p339');
console.log('6. Verification of p339:', p339 ? `${p339.name} (Overall: ${p339.overall}, maxOverall: ${p339.maxOverall}, Rarity: ${p339.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.INOUE_TAISEI_2026_IMAGE:', sandbox.window.INOUE_TAISEI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== TAISEI INOUE ADDED SUCCESSFULLY! ===');
