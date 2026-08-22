const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KO MATSUBARA (p336) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787418387502.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'matsubaraKo2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.MATSUBARA_KO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. matsubaraKo2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p335Idx = mockCode.indexOf("id: 'p335'");
if (p335Idx === -1) {
  console.error("Could not find p335 in mockData.js!");
  process.exit(1);
}

const p335AvatarIdx = mockCode.indexOf("avatarUrl:", p335Idx);
const p335EndIdx = mockCode.indexOf("}", p335AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p335EndIdx + 1);

const matsubaraObj = `,
  {
    id: 'p336',
    name: '松原后',
    readingName: 'まつばら・こう',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: '守備的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 6032,
    maxOverall: 14264,
    baseStats: { shoot: 1094, pass: 1045, dribble: 1226, defense: 1196, physical: 1044, speed: 729 },
    detailStats: {
      shoot: { finishing: 357, power: 372, composure: 365 },
      pass: { shortPass: 343, longPass: 347, accuracy: 355 },
      dribble: { breakout: 393, keeping: 418, ballTouch: 415 },
      defense: { tackle: 391, interception: 404, marking: 401 },
      physical: { jumping: 292, contact: 369, stamina: 383 },
      speed: { running: 331, agility: 398 }
    },
    maxEnhanced: {
      overall: 14264,
      baseStats: { shoot: 2591, pass: 2614, dribble: 2759, defense: 2801, physical: 2613, speed: 1799 },
      detailStats: {
        shoot: { finishing: 856, power: 871, composure: 864 },
        pass: { shortPass: 866, longPass: 870, accuracy: 878 },
        dribble: { breakout: 904, keeping: 929, ballTouch: 926 },
        defense: { tackle: 926, interception: 939, marking: 936 },
        physical: { jumping: 803, contact: 892, stamina: 918 },
        speed: { running: 866, agility: 933 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '反撃のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: '俊敏なマーカー', rank: '銀', description: '発動条件：絶好調　/　パスカット・敏捷性UP' },
      { name: '密着するターゲットマン', rank: '銀', description: '発動条件：途中出場　/　キープ力・マークUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + matsubaraObj, 'utf-8');
console.log('2. mockData.js updated with p336 (Ko Matsubara) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('matsubaraKo2026Image.js')) {
  if (indexContent.includes('soyafujiwara2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/soyafujiwara2025Image.js"></script>',
      '<script src="./src/data/soyafujiwara2025Image.js"></script>\n  <script src="./src/data/matsubaraKo2026Image.js"></script>'
    );
  } else if (indexContent.includes('rikuhanda2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/rikuhanda2025Image.js"></script>',
      '<script src="./src/data/rikuhanda2025Image.js"></script>\n  <script src="./src/data/matsubaraKo2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/matsubaraKo2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p336": "MATSUBARA_KO_2026_IMAGE"')) {
  if (appJsxCode.includes('"p335": "SOYAFUJIWARA_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p335": "SOYAFUJIWARA_2025_IMAGE"',
      '"p335": "SOYAFUJIWARA_2025_IMAGE",\n  "p336": "MATSUBARA_KO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p336 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p336": "MATSUBARA_KO_2026_IMAGE"')) {
  if (appJsCode.includes('"p335": "SOYAFUJIWARA_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p335": "SOYAFUJIWARA_2025_IMAGE"',
      '"p335": "SOYAFUJIWARA_2025_IMAGE",\n  "p336": "MATSUBARA_KO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p336 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p336 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p336');
console.log('6. Verification of p336:', p336 ? `${p336.name} (Overall: ${p336.overall}, maxOverall: ${p336.maxOverall}, Rarity: ${p336.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.MATSUBARA_KO_2026_IMAGE:', sandbox.window.MATSUBARA_KO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KO MATSUBARA ADDED SUCCESSFULLY! ===');
