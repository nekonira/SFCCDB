const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KOYA KITAGAWA (p305) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787387981903.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'koyakitagawa2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KOYAKITAGAWA_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. koyakitagawa2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p304Idx = mockCode.indexOf("id: 'p304'");
if (p304Idx === -1) {
  console.error("Could not find p304 in mockData.js!");
  process.exit(1);
}

const p304AvatarIdx = mockCode.indexOf("avatarUrl:", p304Idx);
const p304EndIdx = mockCode.indexOf("}", p304AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p304EndIdx + 1);

const kitagawaObj = `,
  {
    id: 'p305',
    name: '北川航也',
    readingName: 'きたがわ・こうや',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6017,
    maxOverall: 14203,
    baseStats: { shoot: 1152, pass: 1068, dribble: 1153, defense: 923, physical: 1164, speed: 773 },
    detailStats: {
      shoot: { finishing: 377, power: 402, composure: 373 },
      pass: { shortPass: 370, longPass: 358, accuracy: 340 },
      dribble: { breakout: 410, keeping: 358, ballTouch: 385 },
      defense: { tackle: 316, interception: 294, marking: 313 },
      physical: { jumping: 388, contact: 378, stamina: 398 },
      speed: { running: 372, agility: 401 }
    },
    maxEnhanced: {
      overall: 14203,
      baseStats: { shoot: 2757, pass: 2601, dribble: 2734, defense: 2420, physical: 2745, speed: 1819 },
      detailStats: {
        shoot: { finishing: 912, power: 937, composure: 908 },
        pass: { shortPass: 881, longPass: 869, accuracy: 851 },
        dribble: { breakout: 933, keeping: 881, ballTouch: 920 },
        defense: { tackle: 815, interception: 793, marking: 812 },
        physical: { jumping: 911, contact: 913, stamina: 921 },
        speed: { running: 895, agility: 924 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: 'アジャイルキッカー', rank: '銀', description: '発動条件：絶好調　/　キック力・敏捷性UP' },
      { name: '不屈のドリブル突破', rank: '銀', description: '発動条件：絶好調　/　突破力・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + kitagawaObj, 'utf-8');
console.log('2. mockData.js updated with p305 (Koya Kitagawa) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('koyakitagawa2025Image.js')) {
  if (indexContent.includes('pablosabbag2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/pablosabbag2025Image.js"></script>',
      '<script src="./src/data/pablosabbag2025Image.js"></script>\n  <script src="./src/data/koyakitagawa2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/koyakitagawa2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p305": "KOYAKITAGAWA_2025_IMAGE"')) {
  if (appJsxCode.includes('"p304": "PABLOSABBAG_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p304": "PABLOSABBAG_2025_IMAGE"',
      '"p304": "PABLOSABBAG_2025_IMAGE",\n  "p305": "KOYAKITAGAWA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p305 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p305": "KOYAKITAGAWA_2025_IMAGE"')) {
  if (appJsCode.includes('"p304": "PABLOSABBAG_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p304": "PABLOSABBAG_2025_IMAGE"',
      '"p304": "PABLOSABBAG_2025_IMAGE",\n  "p305": "KOYAKITAGAWA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p305 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p305 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p305');
console.log('6. Verification of p305:', p305 ? `${p305.name} (Overall: ${p305.overall}, maxOverall: ${p305.maxOverall}, Rarity: ${p305.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KOYAKITAGAWA_2025_IMAGE:', sandbox.window.KOYAKITAGAWA_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KOYA KITAGAWA ADDED SUCCESSFULLY! ===');
