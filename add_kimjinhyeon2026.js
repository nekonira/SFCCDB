const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KIM JIN HYEON (p370) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787425788840.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kimJinHyeon2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KIM_JIN_HYEON_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kimJinHyeon2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p369Idx = mockCode.indexOf("id: 'p369'");
if (p369Idx === -1) {
  console.error("Could not find p369 in mockData.js!");
  process.exit(1);
}

const p369AvatarIdx = mockCode.indexOf("avatarUrl:", p369Idx);
const p369EndIdx = mockCode.indexOf("}", p369AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p369EndIdx + 1);

const kimObj = `,
  {
    id: 'p370',
    name: 'キム・ジンヒョン',
    readingName: 'きむ・じんひょん',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'ポゼッション',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6195,
    maxOverall: 14498,
    baseStats: { shoot: 967, pass: 1050, dribble: 1012, defense: 1154, physical: 1128, speed: 758 },
    detailStats: {
      shoot: { finishing: 323, power: 322, composure: 322 },
      pass: { shortPass: 299, longPass: 370, accuracy: 381 },
      dribble: { breakout: 354, keeping: 327, ballTouch: 331 },
      defense: { tackle: 371, interception: 397, marking: 386 },
      physical: { jumping: 436, contact: 350, stamina: 342 },
      speed: { running: 356, agility: 402 }
    },
    maxEnhanced: {
      overall: 14498,
      baseStats: { shoot: 2428, pass: 2655, dribble: 2473, defense: 2759, physical: 2721, speed: 1780 },
      detailStats: {
        shoot: { finishing: 810, power: 809, composure: 809 },
        pass: { shortPass: 834, longPass: 905, accuracy: 916 },
        dribble: { breakout: 841, keeping: 814, ballTouch: 818 },
        defense: { tackle: 906, interception: 932, marking: 921 },
        physical: { jumping: 971, contact: 885, stamina: 865 },
        speed: { running: 867, agility: 913 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: 'コントロールフィード', rank: '銅', description: '発動エリア：後中　/　発動条件：パントキック時　/　ロングパス・キック精度UP' },
    abilities: [
      { name: '全方位への飛び出し', rank: '銀', description: '発動条件：途中出場　/　1VS1・ジャンプUP' },
      { name: '最後方のキッカー', rank: '銀', description: '発動条件：途中出場　/　反応速度・キック精度UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM', 'ドリブラーRW', 'ドリブラーLW', 'サイドアタッカーLW'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + kimObj, 'utf-8');
console.log('2. mockData.js updated with p370 (Kim Jin Hyeon) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kimJinHyeon2026Image.js')) {
  if (indexContent.includes('svendBrodersen2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/svendBrodersen2026Image.js"></script>',
      '<script src="./src/data/svendBrodersen2026Image.js"></script>\n  <script src="./src/data/kimJinHyeon2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/kimJinHyeon2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p370": "KIM_JIN_HYEON_2026_IMAGE"')) {
  if (appJsxCode.includes('"p369": "SVEND_BRODERSEN_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p369": "SVEND_BRODERSEN_2026_IMAGE"',
      '"p369": "SVEND_BRODERSEN_2026_IMAGE",\n  "p370": "KIM_JIN_HYEON_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p370 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p370": "KIM_JIN_HYEON_2026_IMAGE"')) {
  if (appJsCode.includes('"p369": "SVEND_BRODERSEN_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p369": "SVEND_BRODERSEN_2026_IMAGE"',
      '"p369": "SVEND_BRODERSEN_2026_IMAGE",\n  "p370": "KIM_JIN_HYEON_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p370 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p370 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p370');
console.log('6. Verification of p370:', p370 ? `${p370.name} (Overall: ${p370.overall}, maxOverall: ${p370.maxOverall}, Rarity: ${p370.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KIM_JIN_HYEON_2026_IMAGE:', sandbox.window.KIM_JIN_HYEON_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KIM JIN HYEON ADDED SUCCESSFULLY! ===');
