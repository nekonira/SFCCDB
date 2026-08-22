const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KAZUKI TANAKA (p357) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787422777683.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'tanakaKazuki2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.TANAKA_KAZUKI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. tanakaKazuki2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p356Idx = mockCode.indexOf("id: 'p356'");
if (p356Idx === -1) {
  console.error("Could not find p356 in mockData.js!");
  process.exit(1);
}

const p356AvatarIdx = mockCode.indexOf("avatarUrl:", p356Idx);
const p356EndIdx = mockCode.indexOf("}", p356AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p356EndIdx + 1);

const tanakaObj = `,
  {
    id: 'p357',
    name: '田中和樹',
    readingName: 'たなか・かずき',
    category: 'MF',
    mainPosition: 'RM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ドリブラーRM',
    playStyleLevel: 'Ⅱ',
    overall: 5978,
    maxOverall: 14189,
    baseStats: { shoot: 1116, pass: 1128, dribble: 1102, defense: 1011, physical: 1162, speed: 744 },
    detailStats: {
      shoot: { finishing: 370, power: 362, composure: 384 },
      pass: { shortPass: 377, longPass: 389, accuracy: 362 },
      dribble: { breakout: 377, keeping: 368, ballTouch: 357 },
      defense: { tackle: 347, interception: 332, marking: 332 },
      physical: { jumping: 379, contact: 392, stamina: 391 },
      speed: { running: 375, agility: 369 }
    },
    maxEnhanced: {
      overall: 14189,
      baseStats: { shoot: 2673, pass: 2697, dribble: 2695, defense: 2520, physical: 2707, speed: 1814 },
      detailStats: {
        shoot: { finishing: 893, power: 873, composure: 907 },
        pass: { shortPass: 900, longPass: 912, accuracy: 885 },
        dribble: { breakout: 912, keeping: 903, ballTouch: 880 },
        defense: { tackle: 858, interception: 831, marking: 831 },
        physical: { jumping: 890, contact: 903, stamina: 914 },
        speed: { running: 910, agility: 904 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '高速クロス', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：クロス時　/　ロングパス・キック精度UP　/　成功時に受け手のヘディングシュート発生確率UP' },
    abilities: [
      { name: '不屈のドリブル突破', rank: '銀', description: '発動条件：絶好調　/　突破力・スタミナUP' },
      { name: '快速のロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + tanakaObj, 'utf-8');
console.log('2. mockData.js updated with p357 (Kazuki Tanaka) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('tanakaKazuki2026Image.js')) {
  if (indexContent.includes('suzukiYuto2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/suzukiYuto2026Image.js"></script>',
      '<script src="./src/data/suzukiYuto2026Image.js"></script>\n  <script src="./src/data/tanakaKazuki2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/tanakaKazuki2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p357": "TANAKA_KAZUKI_2026_IMAGE"')) {
  if (appJsxCode.includes('"p356": "SUZUKI_YUTO_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p356": "SUZUKI_YUTO_2026_IMAGE"',
      '"p356": "SUZUKI_YUTO_2026_IMAGE",\n  "p357": "TANAKA_KAZUKI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p357 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p357": "TANAKA_KAZUKI_2026_IMAGE"')) {
  if (appJsCode.includes('"p356": "SUZUKI_YUTO_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p356": "SUZUKI_YUTO_2026_IMAGE"',
      '"p356": "SUZUKI_YUTO_2026_IMAGE",\n  "p357": "TANAKA_KAZUKI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p357 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p357 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p357');
console.log('6. Verification of p357:', p357 ? `${p357.name} (Overall: ${p357.overall}, maxOverall: ${p357.maxOverall}, Rarity: ${p357.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.TANAKA_KAZUKI_2026_IMAGE:', sandbox.window.TANAKA_KAZUKI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KAZUKI TANAKA ADDED SUCCESSFULLY! ===');
