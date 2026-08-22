const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KAZUYA NOYORI (p358) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787422988814.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'noyoriKazuya2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.NOYORI_KAZUYA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. noyoriKazuya2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p357Idx = mockCode.indexOf("id: 'p357'");
if (p357Idx === -1) {
  console.error("Could not find p357 in mockData.js!");
  process.exit(1);
}

const p357AvatarIdx = mockCode.indexOf("avatarUrl:", p357Idx);
const p357EndIdx = mockCode.indexOf("}", p357AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p357EndIdx + 1);

const noyoriObj = `,
  {
    id: 'p358',
    name: '野寄和哉',
    readingName: 'のより・かずや',
    category: 'MF',
    mainPosition: 'RM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ドリブラーRM',
    playStyleLevel: 'Ⅱ',
    overall: 5900,
    maxOverall: 14124,
    baseStats: { shoot: 1016, pass: 1033, dribble: 1140, defense: 946, physical: 853, speed: 766 },
    detailStats: {
      shoot: { finishing: 354, power: 322, composure: 340 },
      pass: { shortPass: 330, longPass: 353, accuracy: 350 },
      dribble: { breakout: 380, keeping: 373, ballTouch: 387 },
      defense: { tackle: 340, interception: 302, marking: 304 },
      physical: { jumping: 290, contact: 222, stamina: 341 },
      speed: { running: 371, agility: 395 }
    },
    maxEnhanced: {
      overall: 14124,
      baseStats: { shoot: 2573, pass: 2602, dribble: 2733, defense: 2455, physical: 2398, speed: 1836 },
      detailStats: {
        shoot: { finishing: 877, power: 833, composure: 863 },
        pass: { shortPass: 853, longPass: 876, accuracy: 873 },
        dribble: { breakout: 915, keeping: 908, ballTouch: 910 },
        defense: { tackle: 851, interception: 801, marking: 803 },
        physical: { jumping: 801, contact: 733, stamina: 864 },
        speed: { running: 906, agility: 930 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・ボールタッチUP' },
    abilities: [
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' },
      { name: '失わないドリブラー', rank: '銀', description: '発動条件：絶好調　/　突破力・キープ力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + noyoriObj, 'utf-8');
console.log('2. mockData.js updated with p358 (Kazuya Noyori) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('noyoriKazuya2026Image.js')) {
  if (indexContent.includes('tanakaKazuki2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/tanakaKazuki2026Image.js"></script>',
      '<script src="./src/data/tanakaKazuki2026Image.js"></script>\n  <script src="./src/data/noyoriKazuya2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/noyoriKazuya2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p358": "NOYORI_KAZUYA_2026_IMAGE"')) {
  if (appJsxCode.includes('"p357": "TANAKA_KAZUKI_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p357": "TANAKA_KAZUKI_2026_IMAGE"',
      '"p357": "TANAKA_KAZUKI_2026_IMAGE",\n  "p358": "NOYORI_KAZUYA_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p358 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p358": "NOYORI_KAZUYA_2026_IMAGE"')) {
  if (appJsCode.includes('"p357": "TANAKA_KAZUKI_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p357": "TANAKA_KAZUKI_2026_IMAGE"',
      '"p357": "TANAKA_KAZUKI_2026_IMAGE",\n  "p358": "NOYORI_KAZUYA_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p358 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p358 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p358');
console.log('6. Verification of p358:', p358 ? `${p358.name} (Overall: ${p358.overall}, maxOverall: ${p358.maxOverall}, Rarity: ${p358.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.NOYORI_KAZUYA_2026_IMAGE:', sandbox.window.NOYORI_KAZUYA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KAZUYA NOYORI ADDED SUCCESSFULLY! ===');
