const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TATSUYA ITO (p360) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787423463200.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'itoTatsuya2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.ITO_TATSUYA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. itoTatsuya2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p359Idx = mockCode.indexOf("id: 'p359'");
if (p359Idx === -1) {
  console.error("Could not find p359 in mockData.js!");
  process.exit(1);
}

const p359AvatarIdx = mockCode.indexOf("avatarUrl:", p359Idx);
const p359EndIdx = mockCode.indexOf("}", p359AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p359EndIdx + 1);

const itoObj = `,
  {
    id: 'p360',
    name: '伊藤達哉',
    readingName: 'いとう・たつや',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ドリブラーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6291,
    maxOverall: 14508,
    baseStats: { shoot: 1184, pass: 1024, dribble: 1249, defense: 883, physical: 757, speed: 808 },
    detailStats: {
      shoot: { finishing: 391, power: 368, composure: 425 },
      pass: { shortPass: 356, longPass: 347, accuracy: 321 },
      dribble: { breakout: 431, keeping: 425, ballTouch: 393 },
      defense: { tackle: 259, interception: 301, marking: 323 },
      physical: { jumping: 185, contact: 199, stamina: 373 },
      speed: { running: 361, agility: 447 }
    },
    maxEnhanced: {
      overall: 14508,
      baseStats: { shoot: 2741, pass: 2593, dribble: 2842, defense: 2392, physical: 2302, speed: 1878 },
      detailStats: {
        shoot: { finishing: 914, power: 879, composure: 948 },
        pass: { shortPass: 879, longPass: 870, accuracy: 844 },
        dribble: { breakout: 966, keeping: 960, ballTouch: 916 },
        defense: { tackle: 770, interception: 800, marking: 822 },
        physical: { jumping: 696, contact: 710, stamina: 896 },
        speed: { running: 896, agility: 982 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・敏捷性UP' },
    abilities: [
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' },
      { name: '冷静な突破', rank: '銀', description: '発動条件：絶好調　/　冷静さ・突破力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM', 'ドリブラーRW', 'ドリブラーLW'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + itoObj, 'utf-8');
console.log('2. mockData.js updated with p360 (Tatsuya Ito) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('itoTatsuya2026Image.js')) {
  if (indexContent.includes('ienagaAkihiro2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/ienagaAkihiro2026Image.js"></script>',
      '<script src="./src/data/ienagaAkihiro2026Image.js"></script>\n  <script src="./src/data/itoTatsuya2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/itoTatsuya2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p360": "ITO_TATSUYA_2026_IMAGE"')) {
  if (appJsxCode.includes('"p359": "IENAGA_AKIHIRO_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p359": "IENAGA_AKIHIRO_2026_IMAGE"',
      '"p359": "IENAGA_AKIHIRO_2026_IMAGE",\n  "p360": "ITO_TATSUYA_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p360 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p360": "ITO_TATSUYA_2026_IMAGE"')) {
  if (appJsCode.includes('"p359": "IENAGA_AKIHIRO_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p359": "IENAGA_AKIHIRO_2026_IMAGE"',
      '"p359": "IENAGA_AKIHIRO_2026_IMAGE",\n  "p360": "ITO_TATSUYA_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p360 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p360 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p360');
console.log('6. Verification of p360:', p360 ? `${p360.name} (Overall: ${p360.overall}, maxOverall: ${p360.maxOverall}, Rarity: ${p360.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.ITO_TATSUYA_2026_IMAGE:', sandbox.window.ITO_TATSUYA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== TATSUYA ITO ADDED SUCCESSFULLY! ===');
