const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TAIYO KOGA (p340) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787419243922.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kogaTaiyo2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KOGA_TAIYO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kogaTaiyo2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p339Idx = mockCode.indexOf("id: 'p339'");
if (p339Idx === -1) {
  console.error("Could not find p339 in mockData.js!");
  process.exit(1);
}

const p339AvatarIdx = mockCode.indexOf("avatarUrl:", p339Idx);
const p339EndIdx = mockCode.indexOf("}", p339AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p339EndIdx + 1);

const kogaObj = `,
  {
    id: 'p340',
    name: '古賀太陽',
    readingName: 'こが・たいよう',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 6185,
    maxOverall: 14441,
    baseStats: { shoot: 1074, pass: 1089, dribble: 1088, defense: 1192, physical: 1130, speed: 694 },
    detailStats: {
      shoot: { finishing: 354, power: 370, composure: 350 },
      pass: { shortPass: 378, longPass: 384, accuracy: 327 },
      dribble: { breakout: 369, keeping: 358, ballTouch: 361 },
      defense: { tackle: 376, interception: 410, marking: 406 },
      physical: { jumping: 353, contact: 384, stamina: 393 },
      speed: { running: 363, agility: 331 }
    },
    maxEnhanced: {
      overall: 14441,
      baseStats: { shoot: 2571, pass: 2658, dribble: 2621, defense: 2797, physical: 2723, speed: 1740 },
      detailStats: {
        shoot: { finishing: 853, power: 869, composure: 849 },
        pass: { shortPass: 901, longPass: 907, accuracy: 850 },
        dribble: { breakout: 880, keeping: 869, ballTouch: 872 },
        defense: { tackle: 911, interception: 945, marking: 941 },
        physical: { jumping: 888, contact: 919, stamina: 916 },
        speed: { running: 886, agility: 854 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: '瞬間の球際力', rank: '銀', description: '発動条件：好調　/　パスカット・コンタクトUP' },
      { name: 'エンドレスマーカー', rank: '銀', description: '発動条件：好調　/　マーク・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + kogaObj, 'utf-8');
console.log('2. mockData.js updated with p340 (Taiyo Koga) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kogaTaiyo2026Image.js')) {
  if (indexContent.includes('inoueTaisei2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/inoueTaisei2026Image.js"></script>',
      '<script src="./src/data/inoueTaisei2026Image.js"></script>\n  <script src="./src/data/kogaTaiyo2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/kogaTaiyo2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p340": "KOGA_TAIYO_2026_IMAGE"')) {
  if (appJsxCode.includes('"p339": "INOUE_TAISEI_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p339": "INOUE_TAISEI_2026_IMAGE"',
      '"p339": "INOUE_TAISEI_2026_IMAGE",\n  "p340": "KOGA_TAIYO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p340 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p340": "KOGA_TAIYO_2026_IMAGE"')) {
  if (appJsCode.includes('"p339": "INOUE_TAISEI_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p339": "INOUE_TAISEI_2026_IMAGE"',
      '"p339": "INOUE_TAISEI_2026_IMAGE",\n  "p340": "KOGA_TAIYO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p340 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p340 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p340');
console.log('6. Verification of p340:', p340 ? `${p340.name} (Overall: ${p340.overall}, maxOverall: ${p340.maxOverall}, Rarity: ${p340.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KOGA_TAIYO_2026_IMAGE:', sandbox.window.KOGA_TAIYO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== TAIYO KOGA ADDED SUCCESSFULLY! ===');
