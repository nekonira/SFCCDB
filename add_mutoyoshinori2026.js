const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YOSHINORI MUTO (p364) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787424390501.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'mutoYoshinori2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.MUTO_YOSHINORI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. mutoYoshinori2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p363Idx = mockCode.indexOf("id: 'p363'");
if (p363Idx === -1) {
  console.error("Could not find p363 in mockData.js!");
  process.exit(1);
}

const p363AvatarIdx = mockCode.indexOf("avatarUrl:", p363Idx);
const p363EndIdx = mockCode.indexOf("}", p363AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p363EndIdx + 1);

const mutoObj = `,
  {
    id: 'p364',
    name: '武藤嘉紀',
    readingName: 'むとう・よしのり',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'サイドアタッカーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6309,
    maxOverall: 14508,
    baseStats: { shoot: 1224, pass: 904, dribble: 1126, defense: 947, physical: 1167, speed: 841 },
    detailStats: {
      shoot: { finishing: 418, power: 388, composure: 418 },
      pass: { shortPass: 299, longPass: 296, accuracy: 309 },
      dribble: { breakout: 391, keeping: 363, ballTouch: 372 },
      defense: { tackle: 296, interception: 328, marking: 323 },
      physical: { jumping: 355, contact: 412, stamina: 400 },
      speed: { running: 434, agility: 407 }
    },
    maxEnhanced: {
      overall: 14508,
      baseStats: { shoot: 2781, pass: 2473, dribble: 2719, defense: 2456, physical: 2712, speed: 1911 },
      detailStats: {
        shoot: { finishing: 941, power: 899, composure: 941 },
        pass: { shortPass: 822, longPass: 819, accuracy: 832 },
        dribble: { breakout: 926, keeping: 898, ballTouch: 895 },
        defense: { tackle: 807, interception: 827, marking: 822 },
        physical: { jumping: 866, contact: 923, stamina: 923 },
        speed: { running: 969, agility: 942 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '裏への飛び出し', rank: '銀', description: '発動条件：絶好調　/ 決定力・走力UP' },
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM', 'ドリブラーRW', 'ドリブラーLW'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + mutoObj, 'utf-8');
console.log('2. mockData.js updated with p364 (Yoshinori Muto) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('mutoYoshinori2026Image.js')) {
  if (indexContent.includes('tanakaPauloJunichi2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/tanakaPauloJunichi2026Image.js"></script>',
      '<script src="./src/data/tanakaPauloJunichi2026Image.js"></script>\n  <script src="./src/data/mutoYoshinori2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/mutoYoshinori2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p364": "MUTO_YOSHINORI_2026_IMAGE"')) {
  if (appJsxCode.includes('"p363": "TANAKA_PAULO_JUNICHI_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p363": "TANAKA_PAULO_JUNICHI_2026_IMAGE"',
      '"p363": "TANAKA_PAULO_JUNICHI_2026_IMAGE",\n  "p364": "MUTO_YOSHINORI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p364 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p364": "MUTO_YOSHINORI_2026_IMAGE"')) {
  if (appJsCode.includes('"p363": "TANAKA_PAULO_JUNICHI_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p363": "TANAKA_PAULO_JUNICHI_2026_IMAGE"',
      '"p363": "TANAKA_PAULO_JUNICHI_2026_IMAGE",\n  "p364": "MUTO_YOSHINORI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p364 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p364 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p364');
console.log('6. Verification of p364:', p364 ? `${p364.name} (Overall: ${p364.overall}, maxOverall: ${p364.maxOverall}, Rarity: ${p364.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.MUTO_YOSHINORI_2026_IMAGE:', sandbox.window.MUTO_YOSHINORI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== YOSHINORI MUTO ADDED SUCCESSFULLY! ===');
