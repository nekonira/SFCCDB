const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TAKEHIRO TOMIYASU (2026) (p389) ===');

// 1. Image conversion
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3cd38d12-555b-4707-b414-e5915f966428\\.user_uploaded\\media_1789534971511.jpg";
const imageJsPath = path.join(__dirname, 'src', 'data', 'takehiroTomiyasu2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/jpeg;base64,${base64}`;
const imageJsContent = `window.TAKEHIRO_TOMIYASU_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. takehiroTomiyasu2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p388Idx = mockCode.indexOf("id: 'p388'");
if (p388Idx === -1) {
  console.error("Could not find p388 in mockData.js!");
  process.exit(1);
}

const p388AvatarIdx = mockCode.indexOf("avatarUrl:", p388Idx);
const p388EndIdx = mockCode.indexOf("}", p388AvatarIdx);

const headerCode = mockCode.substring(0, p388EndIdx + 1);

const takehiroTomiyasu2026Obj = `,
  {
    id: 'p389',
    name: '冨安健洋',
    readingName: 'とみやすたけひろ',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 7366,
    maxOverall: 15665,
    baseStats: { shoot: 939, pass: 1309, dribble: 1280, defense: 1415, physical: 1335, speed: 807 },
    detailStats: {
      shoot: { finishing: 297, power: 321, composure: 321 },
      pass: { shortPass: 441, longPass: 435, accuracy: 433 },
      dribble: { breakout: 419, keeping: 421, ballTouch: 440 },
      defense: { tackle: 481, interception: 471, marking: 463 },
      physical: { jumping: 447, contact: 446, stamina: 442 },
      speed: { running: 395, agility: 412 }
    },
    maxEnhanced: {
      overall: 15665,
      baseStats: { shoot: 2436, pass: 2878, dribble: 2813, defense: 3020, physical: 2928, speed: 1853 },
      detailStats: {
        shoot: { finishing: 796, power: 820, composure: 820 },
        pass: { shortPass: 964, longPass: 958, accuracy: 956 },
        dribble: { breakout: 930, keeping: 932, ballTouch: 951 },
        defense: { tackle: 1016, interception: 1006, marking: 998 },
        physical: { jumping: 982, contact: 981, stamina: 965 },
        speed: { running: 918, agility: 935 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '奪還', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '守りの哲学', rank: '金', description: '発動条件：好調　/　タックル・パスカット・マークUP' },
      { name: 'パワフルジャンパー', rank: '銀', description: '発動条件：好調　/　ジャンプ・コンタクトUP' },
      { name: 'マラソンマン', rank: '銅', description: '発動条件：絶好調　/　スタミナ・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + takehiroTomiyasu2026Obj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p389.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('takehiroTomiyasu2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/yukinariSugawara2026Image.js"></script>',
    '<script src="./src/data/yukinariSugawara2026Image.js"></script>\n  <script src="./src/data/takehiroTomiyasu2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p389"')) {
  appJsxCode = appJsxCode.replace(
    '"p388": "YUKINARI_SUGAWARA_2026_IMAGE"',
    '"p388": "YUKINARI_SUGAWARA_2026_IMAGE",\n    "p389": "TAKEHIRO_TOMIYASU_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('4. src/app.jsx updated with p389 image mapping.');
}

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p389"')) {
  if (appJsCode.includes('"p388":"YUKINARI_SUGAWARA_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p388":"YUKINARI_SUGAWARA_2026_IMAGE"',
      '"p388":"YUKINARI_SUGAWARA_2026_IMAGE","p389":"TAKEHIRO_TOMIYASU_2026_IMAGE"'
    );
  } else {
    appJsCode = appJsCode.replace(
      '"YUKINARI_SUGAWARA_2026_IMAGE"}',
      '"YUKINARI_SUGAWARA_2026_IMAGE","p389":"TAKEHIRO_TOMIYASU_2026_IMAGE"}'
    );
  }
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('5. src/app.js updated with p389 image mapping.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(updatedMockCode, sandbox);
const p389 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p389');
console.log('6. Verification of p389:', p389 ? `${p389.name} (${p389.id})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.TAKEHIRO_TOMIYASU_2026_IMAGE:', sandbox.window.TAKEHIRO_TOMIYASU_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== TAKEHIRO TOMIYASU (2026) ADDED SUCCESSFULLY! ===');
