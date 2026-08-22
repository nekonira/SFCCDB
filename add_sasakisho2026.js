const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING SHO SASAKI (p351) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787421372468.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'sasakiSho2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SASAKI_SHO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. sasakiSho2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p350Idx = mockCode.indexOf("id: 'p350'");
if (p350Idx === -1) {
  console.error("Could not find p350 in mockData.js!");
  process.exit(1);
}

const p350AvatarIdx = mockCode.indexOf("avatarUrl:", p350Idx);
const p350EndIdx = mockCode.indexOf("}", p350AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p350EndIdx + 1);

const sasakiObj = `,
  {
    id: 'p351',
    name: '佐々木翔',
    readingName: 'ささき・しょう',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6158,
    maxOverall: 14405,
    baseStats: { shoot: 1084, pass: 1100, dribble: 1116, defense: 1215, physical: 1156, speed: 690 },
    detailStats: {
      shoot: { finishing: 355, power: 368, composure: 361 },
      pass: { shortPass: 363, longPass: 407, accuracy: 330 },
      dribble: { breakout: 362, keeping: 368, ballTouch: 386 },
      defense: { tackle: 426, interception: 393, marking: 396 },
      physical: { jumping: 386, contact: 360, stamina: 410 },
      speed: { running: 346, agility: 344 }
    },
    maxEnhanced: {
      overall: 14405,
      baseStats: { shoot: 2581, pass: 2669, dribble: 2649, defense: 2820, physical: 2749, speed: 1736 },
      detailStats: {
        shoot: { finishing: 854, power: 867, composure: 860 },
        pass: { shortPass: 886, longPass: 930, accuracy: 853 },
        dribble: { breakout: 873, keeping: 879, ballTouch: 897 },
        defense: { tackle: 961, interception: 928, marking: 931 },
        physical: { jumping: 921, contact: 895, stamina: 933 },
        speed: { running: 869, agility: 867 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' },
      { name: '走り切るロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + sasakiObj, 'utf-8');
console.log('2. mockData.js updated with p351 (Sho Sasaki) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('sasakiSho2026Image.js')) {
  if (indexContent.includes('nakayamaYuta2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/nakayamaYuta2026Image.js"></script>',
      '<script src="./src/data/nakayamaYuta2026Image.js"></script>\n  <script src="./src/data/sasakiSho2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/sasakiSho2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p351": "SASAKI_SHO_2026_IMAGE"')) {
  if (appJsxCode.includes('"p350": "NAKAYAMA_YUTA_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p350": "NAKAYAMA_YUTA_2026_IMAGE"',
      '"p350": "NAKAYAMA_YUTA_2026_IMAGE",\n  "p351": "SASAKI_SHO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p351 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p351": "SASAKI_SHO_2026_IMAGE"')) {
  if (appJsCode.includes('"p350": "NAKAYAMA_YUTA_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p350": "NAKAYAMA_YUTA_2026_IMAGE"',
      '"p350": "NAKAYAMA_YUTA_2026_IMAGE",\n  "p351": "SASAKI_SHO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p351 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p351 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p351');
console.log('6. Verification of p351:', p351 ? `${p351.name} (Overall: ${p351.overall}, maxOverall: ${p351.maxOverall}, Rarity: ${p351.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SASAKI_SHO_2026_IMAGE:', sandbox.window.SASAKI_SHO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== SHO SASAKI ADDED SUCCESSFULLY! ===');
