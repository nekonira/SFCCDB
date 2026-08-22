const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING IL GYU PARK (p372) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787426113438.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'parkIlgyu2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.PARK_ILGYU_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. parkIlgyu2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p371Idx = mockCode.indexOf("id: 'p371'");
if (p371Idx === -1) {
  console.error("Could not find p371 in mockData.js!");
  process.exit(1);
}

const p371AvatarIdx = mockCode.indexOf("avatarUrl:", p371Idx);
const p371EndIdx = mockCode.indexOf("}", p371AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p371EndIdx + 1);

const parkObj = `,
  {
    id: 'p372',
    name: '朴一圭',
    readingName: 'ぱく・いるぎゅ',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'スイーパーGK',
    playStyleLevel: 'Ⅱ',
    overall: 6074,
    maxOverall: 14328,
    baseStats: { shoot: 892, pass: 1114, dribble: 1007, defense: 1181, physical: 1068, speed: 774 },
    detailStats: {
      shoot: { finishing: 274, power: 297, composure: 321 },
      pass: { shortPass: 369, longPass: 377, accuracy: 368 },
      dribble: { breakout: 346, keeping: 322, ballTouch: 339 },
      defense: { tackle: 368, interception: 408, marking: 405 },
      physical: { jumping: 330, contact: 362, stamina: 376 },
      speed: { running: 364, agility: 410 }
    },
    maxEnhanced: {
      overall: 14328,
      baseStats: { shoot: 2353, pass: 2719, dribble: 2468, defense: 2786, physical: 2661, speed: 1796 },
      detailStats: {
        shoot: { finishing: 761, power: 784, composure: 808 },
        pass: { shortPass: 904, longPass: 912, accuracy: 903 },
        dribble: { breakout: 833, keeping: 809, ballTouch: 826 },
        defense: { tackle: 903, interception: 943, marking: 940 },
        physical: { jumping: 865, contact: 897, stamina: 899 },
        speed: { running: 875, agility: 921 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: '超反応', rank: '銀', description: '発動条件：絶好調　/　反応速度・敏捷性UP' },
      { name: '守勢のロングフィード', rank: '銀', description: '発動条件：絶好調　/　1VS1・ロングパスUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM', 'ドリブラーRW', 'ドリブラーLW', 'サイドアタッカーLW'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + parkObj, 'utf-8');
console.log('2. mockData.js updated with p372 (Il Gyu Park) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('parkIlgyu2026Image.js')) {
  if (indexContent.includes('nishikawaShusaku2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/nishikawaShusaku2026Image.js"></script>',
      '<script src="./src/data/nishikawaShusaku2026Image.js"></script>\n  <script src="./src/data/parkIlgyu2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/parkIlgyu2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p372": "PARK_ILGYU_2026_IMAGE"')) {
  if (appJsxCode.includes('"p371": "NISHIKAWA_SHUSAKU_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p371": "NISHIKAWA_SHUSAKU_2026_IMAGE"',
      '"p371": "NISHIKAWA_SHUSAKU_2026_IMAGE",\n  "p372": "PARK_ILGYU_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p372 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p372": "PARK_ILGYU_2026_IMAGE"')) {
  if (appJsCode.includes('"p371": "NISHIKAWA_SHUSAKU_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p371": "NISHIKAWA_SHUSAKU_2026_IMAGE"',
      '"p371": "NISHIKAWA_SHUSAKU_2026_IMAGE",\n  "p372": "PARK_ILGYU_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p372 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p372 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p372');
console.log('6. Verification of p372:', p372 ? `${p372.name} (Overall: ${p372.overall}, maxOverall: ${p372.maxOverall}, Rarity: ${p372.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.PARK_ILGYU_2026_IMAGE:', sandbox.window.PARK_ILGYU_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== IL GYU PARK ADDED SUCCESSFULLY! ===');
