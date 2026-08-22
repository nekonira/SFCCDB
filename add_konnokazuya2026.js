const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KAZUYA KONNO (p355) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787422379026.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'konnoKazuya2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KONNO_KAZUYA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. konnoKazuya2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p354Idx = mockCode.indexOf("id: 'p354'");
if (p354Idx === -1) {
  console.error("Could not find p354 in mockData.js!");
  process.exit(1);
}

const p354AvatarIdx = mockCode.indexOf("avatarUrl:", p354Idx);
const p354EndIdx = mockCode.indexOf("}", p354AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p354EndIdx + 1);

const konnoObj = `,
  {
    id: 'p355',
    name: '紺野和也',
    readingName: 'こんの・かずや',
    category: 'MF',
    mainPosition: 'RM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ドリブラーRM',
    playStyleLevel: 'Ⅱ',
    overall: 6262,
    maxOverall: 14505,
    baseStats: { shoot: 1104, pass: 1117, dribble: 1227, defense: 969, physical: 865, speed: 788 },
    detailStats: {
      shoot: { finishing: 379, power: 337, composure: 388 },
      pass: { shortPass: 371, longPass: 371, accuracy: 375 },
      dribble: { breakout: 421, keeping: 402, ballTouch: 404 },
      defense: { tackle: 295, interception: 341, marking: 333 },
      physical: { jumping: 285, contact: 200, stamina: 380 },
      speed: { running: 378, agility: 410 }
    },
    maxEnhanced: {
      overall: 14505,
      baseStats: { shoot: 2661, pass: 2686, dribble: 2820, defense: 2478, physical: 2410, speed: 1858 },
      detailStats: {
        shoot: { finishing: 902, power: 848, composure: 911 },
        pass: { shortPass: 894, longPass: 894, accuracy: 898 },
        dribble: { breakout: 956, keeping: 937, ballTouch: 927 },
        defense: { tackle: 806, interception: 840, marking: 832 },
        physical: { jumping: 796, contact: 711, stamina: 903 },
        speed: { running: 913, agility: 945 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・敏捷性UP' },
    abilities: [
      { name: '失わないドリブラー', rank: '銀', description: '発動条件：絶好調　/　突破力・キープ力UP' },
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + konnoObj, 'utf-8');
console.log('2. mockData.js updated with p355 (Kazuya Konno) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('konnoKazuya2026Image.js')) {
  if (indexContent.includes('iwasakiYuto2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/iwasakiYuto2026Image.js"></script>',
      '<script src="./src/data/iwasakiYuto2026Image.js"></script>\n  <script src="./src/data/konnoKazuya2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/konnoKazuya2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p355": "KONNO_KAZUYA_2026_IMAGE"')) {
  if (appJsxCode.includes('"p354": "IWASAKI_YUTO_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p354": "IWASAKI_YUTO_2026_IMAGE"',
      '"p354": "IWASAKI_YUTO_2026_IMAGE",\n  "p355": "KONNO_KAZUYA_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p355 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p355": "KONNO_KAZUYA_2026_IMAGE"')) {
  if (appJsCode.includes('"p354": "IWASAKI_YUTO_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p354": "IWASAKI_YUTO_2026_IMAGE"',
      '"p354": "IWASAKI_YUTO_2026_IMAGE",\n  "p355": "KONNO_KAZUYA_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p355 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p355 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p355');
console.log('6. Verification of p355:', p355 ? `${p355.name} (Overall: ${p355.overall}, maxOverall: ${p355.maxOverall}, Rarity: ${p355.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KONNO_KAZUYA_2026_IMAGE:', sandbox.window.KONNO_KAZUYA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KAZUYA KONNO ADDED SUCCESSFULLY! ===');
