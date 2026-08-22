const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING NAOMICHI UEDA (p342) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787419727307.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'uedaNaomichi2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.UEDA_NAOMICHI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. uedaNaomichi2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p341Idx = mockCode.indexOf("id: 'p341'");
if (p341Idx === -1) {
  console.error("Could not find p341 in mockData.js!");
  process.exit(1);
}

const p341AvatarIdx = mockCode.indexOf("avatarUrl:", p341Idx);
const p341EndIdx = mockCode.indexOf("}", p341AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p341EndIdx + 1);

const uedaObj = `,
  {
    id: 'p342',
    name: '植田直通',
    readingName: 'うえだ・なおみち',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6318,
    maxOverall: 14594,
    baseStats: { shoot: 926, pass: 1012, dribble: 1007, defense: 1246, physical: 1171, speed: 641 },
    detailStats: {
      shoot: { finishing: 289, power: 327, composure: 310 },
      pass: { shortPass: 322, longPass: 347, accuracy: 343 },
      dribble: { breakout: 317, keeping: 328, ballTouch: 362 },
      defense: { tackle: 427, interception: 408, marking: 411 },
      physical: { jumping: 387, contact: 429, stamina: 355 },
      speed: { running: 327, agility: 314 }
    },
    maxEnhanced: {
      overall: 14594,
      baseStats: { shoot: 2423, pass: 2581, dribble: 2540, defense: 2851, physical: 2764, speed: 1687 },
      detailStats: {
        shoot: { finishing: 788, power: 826, composure: 809 },
        pass: { shortPass: 845, longPass: 870, accuracy: 866 },
        dribble: { breakout: 828, keeping: 839, ballTouch: 873 },
        defense: { tackle: 962, interception: 943, marking: 946 },
        physical: { jumping: 922, contact: 964, stamina: 878 },
        speed: { running: 850, agility: 837 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ストロングマーカー', rank: '銀', description: '発動条件：好調　/　マーク・コンタクトUP' },
      { name: 'ボールスティーラー', rank: '銀', description: '発動条件：途中出場　/　タックル・パスカットUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + uedaObj, 'utf-8');
console.log('2. mockData.js updated with p342 (Naomichi Ueda) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('uedaNaomichi2026Image.js')) {
  if (indexContent.includes('fukumoriAkito2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/fukumoriAkito2026Image.js"></script>',
      '<script src="./src/data/fukumoriAkito2026Image.js"></script>\n  <script src="./src/data/uedaNaomichi2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/uedaNaomichi2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p342": "UEDA_NAOMICHI_2026_IMAGE"')) {
  if (appJsxCode.includes('"p341": "FUKUMORI_AKITO_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p341": "FUKUMORI_AKITO_2026_IMAGE"',
      '"p341": "FUKUMORI_AKITO_2026_IMAGE",\n  "p342": "UEDA_NAOMICHI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p342 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p342": "UEDA_NAOMICHI_2026_IMAGE"')) {
  if (appJsCode.includes('"p341": "FUKUMORI_AKITO_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p341": "FUKUMORI_AKITO_2026_IMAGE"',
      '"p341": "FUKUMORI_AKITO_2026_IMAGE",\n  "p342": "UEDA_NAOMICHI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p342 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p342 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p342');
console.log('6. Verification of p342:', p342 ? `${p342.name} (Overall: ${p342.overall}, maxOverall: ${p342.maxOverall}, Rarity: ${p342.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.UEDA_NAOMICHI_2026_IMAGE:', sandbox.window.UEDA_NAOMICHI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== NAOMICHI UEDA ADDED SUCCESSFULLY! ===');
