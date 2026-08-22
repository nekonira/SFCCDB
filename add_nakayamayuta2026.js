const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YUTA NAKAYAMA (p350) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787421225355.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'nakayamaYuta2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.NAKAYAMA_YUTA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. nakayamaYuta2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p349Idx = mockCode.indexOf("id: 'p349'");
if (p349Idx === -1) {
  console.error("Could not find p349 in mockData.js!");
  process.exit(1);
}

const p349AvatarIdx = mockCode.indexOf("avatarUrl:", p349Idx);
const p349EndIdx = mockCode.indexOf("}", p349AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p349EndIdx + 1);

const nakayamaObj = `,
  {
    id: 'p350',
    name: '中山雄太',
    readingName: 'なかやま・ゆうた',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6268,
    maxOverall: 14539,
    baseStats: { shoot: 903, pass: 1089, dribble: 1096, defense: 1219, physical: 1177, speed: 644 },
    detailStats: {
      shoot: { finishing: 294, power: 286, composure: 323 },
      pass: { shortPass: 367, longPass: 377, accuracy: 345 },
      dribble: { breakout: 364, keeping: 368, ballTouch: 364 },
      defense: { tackle: 408, interception: 402, marking: 409 },
      physical: { jumping: 369, contact: 401, stamina: 407 },
      speed: { running: 314, agility: 330 }
    },
    maxEnhanced: {
      overall: 14539,
      baseStats: { shoot: 2400, pass: 2658, dribble: 2629, defense: 2824, physical: 2770, speed: 1690 },
      detailStats: {
        shoot: { finishing: 793, power: 785, composure: 822 },
        pass: { shortPass: 890, longPass: 900, accuracy: 868 },
        dribble: { breakout: 875, keeping: 879, ballTouch: 875 },
        defense: { tackle: 943, interception: 937, marking: 944 },
        physical: { jumping: 904, contact: 936, stamina: 930 },
        speed: { running: 837, agility: 853 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' },
      { name: 'ハードタックラー', rank: '銀', description: '発動条件：好調　/　タックル・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + nakayamaObj, 'utf-8');
console.log('2. mockData.js updated with p350 (Yuta Nakayama) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('nakayamaYuta2026Image.js')) {
  if (indexContent.includes('yamakawaTetsushi2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/yamakawaTetsushi2026Image.js"></script>',
      '<script src="./src/data/yamakawaTetsushi2026Image.js"></script>\n  <script src="./src/data/nakayamaYuta2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/nakayamaYuta2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p350": "NAKAYAMA_YUTA_2026_IMAGE"')) {
  if (appJsxCode.includes('"p349": "YAMAKAWA_TETSUSHI_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p349": "YAMAKAWA_TETSUSHI_2026_IMAGE"',
      '"p349": "YAMAKAWA_TETSUSHI_2026_IMAGE",\n  "p350": "NAKAYAMA_YUTA_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p350 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p350": "NAKAYAMA_YUTA_2026_IMAGE"')) {
  if (appJsCode.includes('"p349": "YAMAKAWA_TETSUSHI_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p349": "YAMAKAWA_TETSUSHI_2026_IMAGE"',
      '"p349": "YAMAKAWA_TETSUSHI_2026_IMAGE",\n  "p350": "NAKAYAMA_YUTA_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p350 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p350 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p350');
console.log('6. Verification of p350:', p350 ? `${p350.name} (Overall: ${p350.overall}, maxOverall: ${p350.maxOverall}, Rarity: ${p350.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.NAKAYAMA_YUTA_2026_IMAGE:', sandbox.window.NAKAYAMA_YUTA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== YUTA NAKAYAMA ADDED SUCCESSFULLY! ===');
