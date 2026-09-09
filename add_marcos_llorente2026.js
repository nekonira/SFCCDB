const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MARCOS LLORENTE 2026 (p382) ===');

// 1. Image conversion to base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\065e7940-0695-40eb-8c99-d6e5b2225fa9\\.user_uploaded\\media_1788928530979.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'marcosLlorente2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.MARCOS_LLORENTE_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. marcosLlorente2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p381Idx = mockCode.indexOf("id: 'p381'");
if (p381Idx === -1) {
  console.error("Could not find p381 in mockData.js!");
  process.exit(1);
}

const p381AvatarIdx = mockCode.indexOf("avatarUrl:", p381Idx);
const p381EndIdx = mockCode.indexOf("}", p381AvatarIdx);

const headerCode = mockCode.substring(0, p381EndIdx + 1);

const marcosLlorente2026Obj = `,
  {
    id: 'p382',
    name: 'マルコス・ジョレンテ',
    readingName: 'まるこすじょれんて',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'ポゼッション',
    playStyle: '攻撃的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 7179,
    maxOverall: 15439,
    baseStats: { shoot: 1268, pass: 1238, dribble: 1290, defense: 1266, physical: 1300, speed: 923 },
    detailStats: {
      shoot: { finishing: 415, power: 427, composure: 426 },
      pass: { shortPass: 422, longPass: 418, accuracy: 398 },
      dribble: { breakout: 451, keeping: 413, ballTouch: 426 },
      defense: { tackle: 442, interception: 431, marking: 393 },
      physical: { jumping: 382, contact: 438, stamina: 480 },
      speed: { running: 468, agility: 455 }
    },
    maxEnhanced: {
      overall: 15439,
      baseStats: { shoot: 2765, pass: 2807, dribble: 2823, defense: 2871, physical: 2869, speed: 1993 },
      detailStats: {
        shoot: { finishing: 914, power: 926, composure: 925 },
        pass: { shortPass: 945, longPass: 941, accuracy: 921 },
        dribble: { breakout: 962, keeping: 924, ballTouch: 937 },
        defense: { tackle: 977, interception: 966, marking: 928 },
        physical: { jumping: 893, contact: 961, stamina: 1015 },
        speed: { running: 1003, agility: 990 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '奪還', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '無限のアジリティ', rank: '銀', description: '発動条件：好調　/　スタミナ・敏捷性UP' },
      { name: 'スピードクラッシャー', rank: '銀', description: '発動条件：好調　/　タックル・走力UP' },
      { name: 'ワイドカッター', rank: '銅', description: '発動条件：好調　/　突破力・パスカットUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + marcosLlorente2026Obj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p382.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('marcosLlorente2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/pedri2026Image.js"></script>',
    '<script src="./src/data/pedri2026Image.js"></script>\n  <script src="./src/data/marcosLlorente2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p382": "MARCOS_LLORENTE_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p381": "PEDRI_2026_IMAGE"',
    '"p381": "PEDRI_2026_IMAGE",\n    "p382": "MARCOS_LLORENTE_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p382 image mapping.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p382": "MARCOS_LLORENTE_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p381": "PEDRI_2026_IMAGE"',
    '"p381": "PEDRI_2026_IMAGE",\n    "p382": "MARCOS_LLORENTE_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p382 image mapping.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(updatedMockCode, sandbox);
const p382 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p382');
console.log('6. Verification of p382:', p382 ? p382.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.MARCOS_LLORENTE_2026_IMAGE:', sandbox.window.MARCOS_LLORENTE_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== MARCOS LLORENTE 2026 ADDED SUCCESSFULLY! ===');
