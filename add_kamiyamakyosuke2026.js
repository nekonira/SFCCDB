const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KYOSUKE KAMIYAMA (p346) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787420400433.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kamiyamaKyosuke2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KAMIYAMA_KYOSUKE_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kamiyamaKyosuke2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p345Idx = mockCode.indexOf("id: 'p345'");
if (p345Idx === -1) {
  console.error("Could not find p345 in mockData.js!");
  process.exit(1);
}

const p345AvatarIdx = mockCode.indexOf("avatarUrl:", p345Idx);
const p345EndIdx = mockCode.indexOf("}", p345AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p345EndIdx + 1);

const kamiyamaObj = `,
  {
    id: 'p346',
    name: '神山京右',
    readingName: 'かみやま・きょうすけ',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 5808,
    maxOverall: 14077,
    baseStats: { shoot: 866, pass: 958, dribble: 1030, defense: 1181, physical: 971, speed: 717 },
    detailStats: {
      shoot: { finishing: 277, power: 298, composure: 291 },
      pass: { shortPass: 324, longPass: 317, accuracy: 317 },
      dribble: { breakout: 339, keeping: 333, ballTouch: 358 },
      defense: { tackle: 387, interception: 403, marking: 391 },
      physical: { jumping: 344, contact: 335, stamina: 292 },
      speed: { running: 361, agility: 356 }
    },
    maxEnhanced: {
      overall: 14077,
      baseStats: { shoot: 2363, pass: 2527, dribble: 2563, defense: 2786, physical: 2564, speed: 1763 },
      detailStats: {
        shoot: { finishing: 776, power: 797, composure: 790 },
        pass: { shortPass: 847, longPass: 840, accuracy: 840 },
        dribble: { breakout: 850, keeping: 844, ballTouch: 869 },
        defense: { tackle: 922, interception: 938, marking: 926 },
        physical: { jumping: 879, contact: 870, stamina: 815 },
        speed: { running: 884, agility: 879 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: 'ボールスティーラー', rank: '銀', description: '発動条件：途中出場　/　タックル・パスカットUP' },
      { name: 'ランニングマーカー', rank: '銀', description: '発動条件：絶好調　/　マーク・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + kamiyamaObj, 'utf-8');
console.log('2. mockData.js updated with p346 (Kyosuke Kamiyama) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kamiyamaKyosuke2026Image.js')) {
  if (indexContent.includes('nakataniShinnosuke2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/nakataniShinnosuke2026Image.js"></script>',
      '<script src="./src/data/nakataniShinnosuke2026Image.js"></script>\n  <script src="./src/data/kamiyamaKyosuke2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/kamiyamaKyosuke2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p346": "KAMIYAMA_KYOSUKE_2026_IMAGE"')) {
  if (appJsxCode.includes('"p345": "NAKATANI_SHINNOSUKE_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p345": "NAKATANI_SHINNOSUKE_2026_IMAGE"',
      '"p345": "NAKATANI_SHINNOSUKE_2026_IMAGE",\n  "p346": "KAMIYAMA_KYOSUKE_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p346 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p346": "KAMIYAMA_KYOSUKE_2026_IMAGE"')) {
  if (appJsCode.includes('"p345": "NAKATANI_SHINNOSUKE_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p345": "NAKATANI_SHINNOSUKE_2026_IMAGE"',
      '"p345": "NAKATANI_SHINNOSUKE_2026_IMAGE",\n  "p346": "KAMIYAMA_KYOSUKE_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p346 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p346 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p346');
console.log('6. Verification of p346:', p346 ? `${p346.name} (Overall: ${p346.overall}, maxOverall: ${p346.maxOverall}, Rarity: ${p346.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KAMIYAMA_KYOSUKE_2026_IMAGE:', sandbox.window.KAMIYAMA_KYOSUKE_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KYOSUKE KAMIYAMA ADDED SUCCESSFULLY! ===');
