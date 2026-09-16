const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YUKINARI SUGAWARA (2026) (p388) ===');

// 1. Image conversion
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3cd38d12-555b-4707-b414-e5915f966428\\.user_uploaded\\media_1789534884823.jpg";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yukinariSugawara2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/jpeg;base64,${base64}`;
const imageJsContent = `window.YUKINARI_SUGAWARA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. yukinariSugawara2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p387Idx = mockCode.indexOf("id: 'p387'");
if (p387Idx === -1) {
  console.error("Could not find p387 in mockData.js!");
  process.exit(1);
}

const p387AvatarIdx = mockCode.indexOf("avatarUrl:", p387Idx);
const p387EndIdx = mockCode.indexOf("}", p387AvatarIdx);

const headerCode = mockCode.substring(0, p387EndIdx + 1);

const yukinariSugawara2026Obj = `,
  {
    id: 'p388',
    name: '菅原由勢',
    readingName: 'すがわらゆきなり',
    category: 'MF',
    mainPosition: 'RM',
    subPositions: ['RFB'],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ドリブラー',
    playStyleLevel: 'Ⅱ',
    overall: 6768,
    maxOverall: 14984,
    baseStats: { shoot: 964, pass: 1235, dribble: 1356, defense: 1087, physical: 1128, speed: 897 },
    detailStats: {
      shoot: { finishing: 320, power: 312, composure: 332 },
      pass: { shortPass: 406, longPass: 415, accuracy: 414 },
      dribble: { breakout: 449, keeping: 441, ballTouch: 466 },
      defense: { tackle: 344, interception: 374, marking: 369 },
      physical: { jumping: 336, contact: 365, stamina: 427 },
      speed: { running: 444, agility: 453 }
    },
    maxEnhanced: {
      overall: 14984,
      baseStats: { shoot: 2521, pass: 2804, dribble: 2949, defense: 2596, physical: 2673, speed: 1967 },
      detailStats: {
        shoot: { finishing: 843, power: 823, composure: 855 },
        pass: { shortPass: 929, longPass: 938, accuracy: 937 },
        dribble: { breakout: 984, keeping: 976, ballTouch: 989 },
        defense: { tackle: 855, interception: 873, marking: 868 },
        physical: { jumping: 847, contact: 876, stamina: 950 },
        speed: { running: 979, agility: 988 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '展開のドリブル', rank: '銅', description: '発動エリア：中左右・後左右　/　発動条件：ドリブル時　/　突破力・キープ力・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: '技巧派ドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・ボールタッチUP' },
      { name: 'マラソンマン', rank: '銀', description: '発動条件：途中出場　/　スタミナ・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + yukinariSugawara2026Obj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p388.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('yukinariSugawara2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/takefusaKubo2026Image.js"></script>',
    '<script src="./src/data/takefusaKubo2026Image.js"></script>\n  <script src="./src/data/yukinariSugawara2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p388"')) {
  appJsxCode = appJsxCode.replace(
    '"p387": "TAKEFUSA_KUBO_2026_IMAGE"',
    '"p387": "TAKEFUSA_KUBO_2026_IMAGE",\n    "p388": "YUKINARI_SUGAWARA_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('4. src/app.jsx updated with p388 image mapping.');
}

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p388"')) {
  if (appJsCode.includes('"p387":"TAKEFUSA_KUBO_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p387":"TAKEFUSA_KUBO_2026_IMAGE"',
      '"p387":"TAKEFUSA_KUBO_2026_IMAGE","p388":"YUKINARI_SUGAWARA_2026_IMAGE"'
    );
  } else {
    appJsCode = appJsCode.replace(
      '"TAKEFUSA_KUBO_2026_IMAGE"}',
      '"TAKEFUSA_KUBO_2026_IMAGE","p388":"YUKINARI_SUGAWARA_2026_IMAGE"}'
    );
  }
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('5. src/app.js updated with p388 image mapping.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(updatedMockCode, sandbox);
const p388 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p388');
console.log('6. Verification of p388:', p388 ? `${p388.name} (${p388.id})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.YUKINARI_SUGAWARA_2026_IMAGE:', sandbox.window.YUKINARI_SUGAWARA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== YUKINARI SUGAWARA (2026) ADDED SUCCESSFULLY! ===');
