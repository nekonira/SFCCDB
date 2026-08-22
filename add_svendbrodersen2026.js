const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING SVEND BRODERSEN (p369) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787425630050.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'svendBrodersen2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SVEND_BRODERSEN_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. svendBrodersen2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p368Idx = mockCode.indexOf("id: 'p368'");
if (p368Idx === -1) {
  console.error("Could not find p368 in mockData.js!");
  process.exit(1);
}

const p368AvatarIdx = mockCode.indexOf("avatarUrl:", p368Idx);
const p368EndIdx = mockCode.indexOf("}", p368AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p368EndIdx + 1);

const brodersenObj = `,
  {
    id: 'p369',
    name: 'スベンド・ブローダーセン',
    readingName: 'すべんど・ぶろーだーせん',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ドイツ',
    policy: 'カウンター',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6252,
    maxOverall: 14560,
    baseStats: { shoot: 938, pass: 894, dribble: 953, defense: 1199, physical: 1148, speed: 741 },
    detailStats: {
      shoot: { finishing: 263, power: 395, composure: 280 },
      pass: { shortPass: 278, longPass: 308, accuracy: 308 },
      dribble: { breakout: 348, keeping: 297, ballTouch: 308 },
      defense: { tackle: 421, interception: 374, marking: 404 },
      physical: { jumping: 394, contact: 400, stamina: 354 },
      speed: { running: 331, agility: 410 }
    },
    maxEnhanced: {
      overall: 14560,
      baseStats: { shoot: 2399, pass: 2499, dribble: 2414, defense: 2804, physical: 2741, speed: 1763 },
      detailStats: {
        shoot: { finishing: 750, power: 882, composure: 767 },
        pass: { shortPass: 813, longPass: 843, accuracy: 843 },
        dribble: { breakout: 835, keeping: 784, ballTouch: 795 },
        defense: { tackle: 956, interception: 909, marking: 939 },
        physical: { jumping: 929, contact: 935, stamina: 877 },
        speed: { running: 842, agility: 921 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: '強靭な守護神', rank: '銀', description: '発動条件：好調　/　セービング・コンタクトUP' },
      { name: '全方位への飛び出し', rank: '銀', description: '発動条件：途中出場　/　1VS1・ジャンプUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM', 'ドリブラーRW', 'ドリブラーLW', 'サイドアタッカーLW'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + brodersenObj, 'utf-8');
console.log('2. mockData.js updated with p369 (Svend Brodersen) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('svendBrodersen2026Image.js')) {
  if (indexContent.includes('ichikawaAkinori2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/ichikawaAkinori2026Image.js"></script>',
      '<script src="./src/data/ichikawaAkinori2026Image.js"></script>\n  <script src="./src/data/svendBrodersen2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/svendBrodersen2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p369": "SVEND_BRODERSEN_2026_IMAGE"')) {
  if (appJsxCode.includes('"p368": "ICHIKAWA_AKINORI_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p368": "ICHIKAWA_AKINORI_2026_IMAGE"',
      '"p368": "ICHIKAWA_AKINORI_2026_IMAGE",\n  "p369": "SVEND_BRODERSEN_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p369 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p369": "SVEND_BRODERSEN_2026_IMAGE"')) {
  if (appJsCode.includes('"p368": "ICHIKAWA_AKINORI_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p368": "ICHIKAWA_AKINORI_2026_IMAGE"',
      '"p368": "ICHIKAWA_AKINORI_2026_IMAGE",\n  "p369": "SVEND_BRODERSEN_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p369 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p369 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p369');
console.log('6. Verification of p369:', p369 ? `${p369.name} (Overall: ${p369.overall}, maxOverall: ${p369.maxOverall}, Rarity: ${p369.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SVEND_BRODERSEN_2026_IMAGE:', sandbox.window.SVEND_BRODERSEN_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== SVEND BRODERSEN ADDED SUCCESSFULLY! ===');
