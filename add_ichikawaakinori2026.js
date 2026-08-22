const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING AKINORI ICHIKAWA (p368) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787425392513.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'ichikawaAkinori2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.ICHIKAWA_AKINORI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. ichikawaAkinori2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p367Idx = mockCode.indexOf("id: 'p367'");
if (p367Idx === -1) {
  console.error("Could not find p367 in mockData.js!");
  process.exit(1);
}

const p367AvatarIdx = mockCode.indexOf("avatarUrl:", p367Idx);
const p367EndIdx = mockCode.indexOf("}", p367AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p367EndIdx + 1);

const ichikawaObj = `,
  {
    id: 'p368',
    name: '市川暉記',
    readingName: 'いちかわ・あきのり',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6100,
    maxOverall: 14411,
    baseStats: { shoot: 891, pass: 826, dribble: 845, defense: 1145, physical: 1108, speed: 661 },
    detailStats: {
      shoot: { finishing: 245, power: 346, composure: 300 },
      pass: { shortPass: 268, longPass: 283, accuracy: 275 },
      dribble: { breakout: 316, keeping: 290, ballTouch: 239 },
      defense: { tackle: 398, interception: 375, marking: 372 },
      physical: { jumping: 440, contact: 410, stamina: 258 },
      speed: { running: 312, agility: 349 }
    },
    maxEnhanced: {
      overall: 14411,
      baseStats: { shoot: 2352, pass: 2431, dribble: 2306, defense: 2750, physical: 2701, speed: 1683 },
      detailStats: {
        shoot: { finishing: 732, power: 833, composure: 787 },
        pass: { shortPass: 803, longPass: 818, accuracy: 810 },
        dribble: { breakout: 803, keeping: 777, ballTouch: 726 },
        defense: { tackle: 933, interception: 910, marking: 907 },
        physical: { jumping: 975, contact: 945, stamina: 781 },
        speed: { running: 823, agility: 860 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: '上空の守護神', rank: '銀', description: '発動条件：好調　/　セービング・ジャンプUP' },
      { name: '力強い反応', rank: '銀', description: '発動条件：絶好調　/　反応速度・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM', 'ドリブラーRW', 'ドリブラーLW', 'サイドアタッカーLW'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + ichikawaObj, 'utf-8');
console.log('2. mockData.js updated with p368 (Akinori Ichikawa) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('ichikawaAkinori2026Image.js')) {
  if (indexContent.includes('osakoKeisuke2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/osakoKeisuke2026Image.js"></script>',
      '<script src="./src/data/osakoKeisuke2026Image.js"></script>\n  <script src="./src/data/ichikawaAkinori2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/ichikawaAkinori2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p368": "ICHIKAWA_AKINORI_2026_IMAGE"')) {
  if (appJsxCode.includes('"p367": "OSAKO_KEISUKE_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p367": "OSAKO_KEISUKE_2026_IMAGE"',
      '"p367": "OSAKO_KEISUKE_2026_IMAGE",\n  "p368": "ICHIKAWA_AKINORI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p368 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p368": "ICHIKAWA_AKINORI_2026_IMAGE"')) {
  if (appJsCode.includes('"p367": "OSAKO_KEISUKE_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p367": "OSAKO_KEISUKE_2026_IMAGE"',
      '"p367": "OSAKO_KEISUKE_2026_IMAGE",\n  "p368": "ICHIKAWA_AKINORI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p368 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p368 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p368');
console.log('6. Verification of p368:', p368 ? `${p368.name} (Overall: ${p368.overall}, maxOverall: ${p368.maxOverall}, Rarity: ${p368.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.ICHIKAWA_AKINORI_2026_IMAGE:', sandbox.window.ICHIKAWA_AKINORI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== AKINORI ICHIKAWA ADDED SUCCESSFULLY! ===');
