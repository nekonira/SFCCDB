const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING PUJON (HAIFU) 2026 (p383) ===');

// 1. Image conversion to base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\065e7940-0695-40eb-8c99-d6e5b2225fa9\\.user_uploaded\\media_1788929815568.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'pujonHaifu2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.PUJON_HAIFU_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. pujonHaifu2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p382Idx = mockCode.indexOf("id: 'p382'");
if (p382Idx === -1) {
  console.error("Could not find p382 in mockData.js!");
  process.exit(1);
}

const p382AvatarIdx = mockCode.indexOf("avatarUrl:", p382Idx);
const p382EndIdx = mockCode.indexOf("}", p382AvatarIdx);

const headerCode = mockCode.substring(0, p382EndIdx + 1);

const pujonHaifu2026Obj = `,
  {
    id: 'p383',
    name: 'プジョン(配布)',
    readingName: 'ぷじょん',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'ポゼッション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 5460,
    maxOverall: 12733,
    baseStats: { shoot: 875, pass: 833, dribble: 778, defense: 1132, physical: 1126, speed: 694 },
    detailStats: {
      shoot: { finishing: 289, power: 292, composure: 294 },
      pass: { shortPass: 322, longPass: 294, accuracy: 217 },
      dribble: { breakout: 230, keeping: 267, ballTouch: 281 },
      defense: { tackle: 383, interception: 369, marking: 380 },
      physical: { jumping: 381, contact: 361, stamina: 384 },
      speed: { running: 335, agility: 359 }
    },
    maxEnhanced: {
      overall: 12733,
      baseStats: { shoot: 2099, pass: 2129, dribble: 2038, defense: 2463, physical: 2446, speed: 1558 },
      detailStats: {
        shoot: { finishing: 697, power: 700, composure: 702 },
        pass: { shortPass: 754, longPass: 726, accuracy: 649 },
        dribble: { breakout: 650, keeping: 687, ballTouch: 701 },
        defense: { tackle: 827, interception: 812, marking: 824 },
        physical: { jumping: 825, contact: 805, stamina: 816 },
        speed: { running: 767, agility: 791 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'エアバトラー', rank: '銀', description: '発動条件：絶好調　/　タックル・ジャンプUP' },
      { name: 'ピッチの分断者', rank: '銅', description: '発動条件：絶好調　/　パスカット・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + pujonHaifu2026Obj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p383.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('pujonHaifu2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/marcosLlorente2026Image.js"></script>',
    '<script src="./src/data/marcosLlorente2026Image.js"></script>\n  <script src="./src/data/pujonHaifu2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p383": "PUJON_HAIFU_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p382": "MARCOS_LLORENTE_2026_IMAGE"',
    '"p382": "MARCOS_LLORENTE_2026_IMAGE",\n    "p383": "PUJON_HAIFU_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p383 image mapping.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p383": "PUJON_HAIFU_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p382": "MARCOS_LLORENTE_2026_IMAGE"',
    '"p382": "MARCOS_LLORENTE_2026_IMAGE",\n    "p383": "PUJON_HAIFU_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p383 image mapping.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(updatedMockCode, sandbox);
const p383 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p383');
console.log('6. Verification of p383:', p383 ? p383.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.PUJON_HAIFU_2026_IMAGE:', sandbox.window.PUJON_HAIFU_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== PUJON (HAIFU) 2026 ADDED SUCCESSFULLY! ===');
