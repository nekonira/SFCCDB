const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KEISUKE OSAKO (p367) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787425219730.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'osakoKeisuke2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.OSAKO_KEISUKE_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. osakoKeisuke2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p366Idx = mockCode.indexOf("id: 'p366'");
if (p366Idx === -1) {
  console.error("Could not find p366 in mockData.js!");
  process.exit(1);
}

const p366AvatarIdx = mockCode.indexOf("avatarUrl:", p366Idx);
const p366EndIdx = mockCode.indexOf("}", p366AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p366EndIdx + 1);

const osakoObj = `,
  {
    id: 'p367',
    name: '大迫敬介',
    readingName: 'おおさこ・けいすけ',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6279,
    maxOverall: 14579,
    baseStats: { shoot: 924, pass: 831, dribble: 932, defense: 1255, physical: 1089, speed: 785 },
    detailStats: {
      shoot: { finishing: 289, power: 354, composure: 281 },
      pass: { shortPass: 253, longPass: 289, accuracy: 289 },
      dribble: { breakout: 377, keeping: 285, ballTouch: 270 },
      defense: { tackle: 408, interception: 430, marking: 417 },
      physical: { jumping: 416, contact: 358, stamina: 315 },
      speed: { running: 352, agility: 433 }
    },
    maxEnhanced: {
      overall: 14579,
      baseStats: { shoot: 2385, pass: 2436, dribble: 2393, defense: 2860, physical: 2682, speed: 1807 },
      detailStats: {
        shoot: { finishing: 776, power: 841, composure: 768 },
        pass: { shortPass: 788, longPass: 824, accuracy: 824 },
        dribble: { breakout: 864, keeping: 772, ballTouch: 757 },
        defense: { tackle: 943, interception: 965, marking: 952 },
        physical: { jumping: 951, contact: 893, stamina: 838 },
        speed: { running: 863, agility: 944 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: '全方向の守護', rank: '銀', description: '発動条件：絶好調　/　反応速度・ジャンプUP' },
      { name: '俊英な砦', rank: '銀', description: '発動条件：好調　/　1VS1・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM', 'ドリブラーRW', 'ドリブラーLW', 'サイドアタッカーLW'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + osakoObj, 'utf-8');
console.log('2. mockData.js updated with p367 (Keisuke Osako) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('osakoKeisuke2026Image.js')) {
  if (indexContent.includes('pisanopalex2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/pisanopalex2026Image.js"></script>',
      '<script src="./src/data/pisanopalex2026Image.js"></script>\n  <script src="./src/data/osakoKeisuke2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/osakoKeisuke2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p367": "OSAKO_KEISUKE_2026_IMAGE"')) {
  if (appJsxCode.includes('"p366": "PISANO_ALEX_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p366": "PISANO_ALEX_2026_IMAGE"',
      '"p366": "PISANO_ALEX_2026_IMAGE",\n  "p367": "OSAKO_KEISUKE_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p367 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p367": "OSAKO_KEISUKE_2026_IMAGE"')) {
  if (appJsCode.includes('"p366": "PISANO_ALEX_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p366": "PISANO_ALEX_2026_IMAGE"',
      '"p366": "PISANO_ALEX_2026_IMAGE",\n  "p367": "OSAKO_KEISUKE_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p367 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p367 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p367');
console.log('6. Verification of p367:', p367 ? `${p367.name} (Overall: ${p367.overall}, maxOverall: ${p367.maxOverall}, Rarity: ${p367.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.OSAKO_KEISUKE_2026_IMAGE:', sandbox.window.OSAKO_KEISUKE_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KEISUKE OSAKO ADDED SUCCESSFULLY! ===');
