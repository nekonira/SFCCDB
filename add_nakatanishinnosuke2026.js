const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING SHINNOSUKE NAKATANI (p345) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787420241174.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'nakataniShinnosuke2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.NAKATANI_SHINNOSUKE_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. nakataniShinnosuke2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p344Idx = mockCode.indexOf("id: 'p344'");
if (p344Idx === -1) {
  console.error("Could not find p344 in mockData.js!");
  process.exit(1);
}

const p344AvatarIdx = mockCode.indexOf("avatarUrl:", p344Idx);
const p344EndIdx = mockCode.indexOf("}", p344AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p344EndIdx + 1);

const nakataniObj = `,
  {
    id: 'p345',
    name: '中谷進之介',
    readingName: 'なかたに・しんのすけ',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6290,
    maxOverall: 14557,
    baseStats: { shoot: 1017, pass: 1059, dribble: 1039, defense: 1221, physical: 1199, speed: 609 },
    detailStats: {
      shoot: { finishing: 310, power: 367, composure: 340 },
      pass: { shortPass: 364, longPass: 367, accuracy: 328 },
      dribble: { breakout: 327, keeping: 344, ballTouch: 368 },
      defense: { tackle: 401, interception: 410, marking: 410 },
      physical: { jumping: 395, contact: 411, stamina: 393 },
      speed: { running: 277, agility: 332 }
    },
    maxEnhanced: {
      overall: 14557,
      baseStats: { shoot: 2514, pass: 2628, dribble: 2572, defense: 2826, physical: 2792, speed: 1655 },
      detailStats: {
        shoot: { finishing: 809, power: 866, composure: 839 },
        pass: { shortPass: 887, longPass: 890, accuracy: 851 },
        dribble: { breakout: 838, keeping: 855, ballTouch: 879 },
        defense: { tackle: 936, interception: 945, marking: 945 },
        physical: { jumping: 930, contact: 946, stamina: 916 },
        speed: { running: 800, agility: 855 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: 'ストロングマーカー', rank: '銀', description: '発動条件：好調　/　マーク・コンタクトUP' },
      { name: 'ボールスティーラー', rank: '銀', description: '発動条件：途中出場　/　タックル・パスカットUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + nakataniObj, 'utf-8');
console.log('2. mockData.js updated with p345 (Shinnosuke Nakatani) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('nakataniShinnosuke2026Image.js')) {
  if (indexContent.includes('sumiyoshiJelani2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/sumiyoshiJelani2026Image.js"></script>',
      '<script src="./src/data/sumiyoshiJelani2026Image.js"></script>\n  <script src="./src/data/nakataniShinnosuke2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/nakataniShinnosuke2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p345": "NAKATANI_SHINNOSUKE_2026_IMAGE"')) {
  if (appJsxCode.includes('"p344": "SUMIYOSHI_JELANI_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p344": "SUMIYOSHI_JELANI_2026_IMAGE"',
      '"p344": "SUMIYOSHI_JELANI_2026_IMAGE",\n  "p345": "NAKATANI_SHINNOSUKE_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p345 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p345": "NAKATANI_SHINNOSUKE_2026_IMAGE"')) {
  if (appJsCode.includes('"p344": "SUMIYOSHI_JELANI_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p344": "SUMIYOSHI_JELANI_2026_IMAGE"',
      '"p344": "SUMIYOSHI_JELANI_2026_IMAGE",\n  "p345": "NAKATANI_SHINNOSUKE_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p345 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p345 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p345');
console.log('6. Verification of p345:', p345 ? `${p345.name} (Overall: ${p345.overall}, maxOverall: ${p345.maxOverall}, Rarity: ${p345.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.NAKATANI_SHINNOSUKE_2026_IMAGE:', sandbox.window.NAKATANI_SHINNOSUKE_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== SHINNOSUKE NAKATANI ADDED SUCCESSFULLY! ===');
