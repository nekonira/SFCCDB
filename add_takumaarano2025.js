const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TAKUMA ARANO (p324) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787392527409.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'takumaarano2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.TAKUMAARANO_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. takumaarano2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p323Idx = mockCode.indexOf("id: 'p323'");
if (p323Idx === -1) {
  console.error("Could not find p323 in mockData.js!");
  process.exit(1);
}

const p323AvatarIdx = mockCode.indexOf("avatarUrl:", p323Idx);
const p323EndIdx = mockCode.indexOf("}", p323AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p323EndIdx + 1);

const aranoObj = `,
  {
    id: 'p324',
    name: '荒野拓馬',
    readingName: 'あらの・たくま',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 5972,
    maxOverall: 14070,
    baseStats: { shoot: 1043, pass: 1102, dribble: 1209, defense: 1093, physical: 1113, speed: 815 },
    detailStats: {
      shoot: { finishing: 339, power: 364, composure: 340 },
      pass: { shortPass: 388, longPass: 374, accuracy: 340 },
      dribble: { breakout: 407, keeping: 408, ballTouch: 394 },
      defense: { tackle: 344, interception: 376, marking: 373 },
      physical: { jumping: 327, contact: 396, stamina: 390 },
      speed: { running: 400, agility: 415 }
    },
    maxEnhanced: {
      overall: 14070,
      baseStats: { shoot: 2588, pass: 2707, dribble: 2742, defense: 2674, physical: 2682, speed: 1837 },
      detailStats: {
        shoot: { finishing: 850, power: 875, composure: 863 },
        pass: { shortPass: 923, longPass: 909, accuracy: 875 },
        dribble: { breakout: 918, keeping: 919, ballTouch: 905 },
        defense: { tackle: 879, interception: 899, marking: 896 },
        physical: { jumping: 838, contact: 919, stamina: 925 },
        speed: { running: 911, agility: 926 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'ダイナミックタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・突破力UP　/　成功時に自身のドリブル発生確率UP' },
    abilities: [
      { name: '俊敏なパサー', rank: '銀', description: '発動条件：好調　/　ショートパス・敏捷性UP' },
      { name: '不屈の魂', rank: '銀', description: '発動条件：好調　/　キープ力・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + aranoObj, 'utf-8');
console.log('2. mockData.js updated with p324 (Takuma Arano) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('takumaarano2025Image.js')) {
  if (indexContent.includes('kokimorita2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/kokimorita2025Image.js"></script>',
      '<script src="./src/data/kokimorita2025Image.js"></script>\n  <script src="./src/data/takumaarano2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/takumaarano2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p324": "TAKUMAARANO_2025_IMAGE"')) {
  if (appJsxCode.includes('"p323": "KOKIMORITA_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p323": "KOKIMORITA_2025_IMAGE"',
      '"p323": "KOKIMORITA_2025_IMAGE",\n  "p324": "TAKUMAARANO_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p324 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p324": "TAKUMAARANO_2025_IMAGE"')) {
  if (appJsCode.includes('"p323": "KOKIMORITA_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p323": "KOKIMORITA_2025_IMAGE"',
      '"p323": "KOKIMORITA_2025_IMAGE",\n  "p324": "TAKUMAARANO_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p324 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p324 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p324');
console.log('6. Verification of p324:', p324 ? `${p324.name} (Overall: ${p324.overall}, maxOverall: ${p324.maxOverall}, Rarity: ${p324.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.TAKUMAARANO_2025_IMAGE:', sandbox.window.TAKUMAARANO_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== TAKUMA ARANO ADDED SUCCESSFULLY! ===');
