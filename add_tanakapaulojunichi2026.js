const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING PAULO JUNICHI TANAKA (p363) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787424009959.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'tanakaPauloJunichi2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.TANAKA_PAULO_JUNICHI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. tanakaPauloJunichi2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p362Idx = mockCode.indexOf("id: 'p362'");
if (p362Idx === -1) {
  console.error("Could not find p362 in mockData.js!");
  process.exit(1);
}

const p362AvatarIdx = mockCode.indexOf("avatarUrl:", p362Idx);
const p362EndIdx = mockCode.indexOf("}", p362AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p362EndIdx + 1);

const tanakaPauloObj = `,
  {
    id: 'p363',
    name: '田中パウロ淳一',
    readingName: 'たなか・ぱうろ・じゅんいち',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ドリブラーLW',
    playStyleLevel: 'Ⅱ',
    overall: 5881,
    maxOverall: 14085,
    baseStats: { shoot: 1080, pass: 1098, dribble: 1143, defense: 895, physical: 1015, speed: 749 },
    detailStats: {
      shoot: { finishing: 346, power: 358, composure: 376 },
      pass: { shortPass: 382, longPass: 369, accuracy: 347 },
      dribble: { breakout: 391, keeping: 362, ballTouch: 390 },
      defense: { tackle: 286, interception: 302, marking: 307 },
      physical: { jumping: 351, contact: 325, stamina: 339 },
      speed: { running: 360, agility: 389 }
    },
    maxEnhanced: {
      overall: 14085,
      baseStats: { shoot: 2637, pass: 2667, dribble: 2736, defense: 2404, physical: 2560, speed: 1819 },
      detailStats: {
        shoot: { finishing: 869, power: 869, composure: 899 },
        pass: { shortPass: 905, longPass: 892, accuracy: 870 },
        dribble: { breakout: 926, keeping: 897, ballTouch: 913 },
        defense: { tackle: 797, interception: 801, marking: 806 },
        physical: { jumping: 862, contact: 836, stamina: 862 },
        speed: { running: 895, agility: 924 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・ボールタッチUP' },
    abilities: [
      { name: '切り裂くパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・突破力UP' },
      { name: '俊敏なタッチ', rank: '銅', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM', 'ドリブラーRW', 'ドリブラーLW'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + tanakaPauloObj, 'utf-8');
console.log('2. mockData.js updated with p363 (Paulo Junichi Tanaka) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('tanakaPauloJunichi2026Image.js')) {
  if (indexContent.includes('nakamaHayato2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/nakamaHayato2026Image.js"></script>',
      '<script src="./src/data/nakamaHayato2026Image.js"></script>\n  <script src="./src/data/tanakaPauloJunichi2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/tanakaPauloJunichi2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p363": "TANAKA_PAULO_JUNICHI_2026_IMAGE"')) {
  if (appJsxCode.includes('"p362": "NAKAMA_HAYATO_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p362": "NAKAMA_HAYATO_2026_IMAGE"',
      '"p362": "NAKAMA_HAYATO_2026_IMAGE",\n  "p363": "TANAKA_PAULO_JUNICHI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p363 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p363": "TANAKA_PAULO_JUNICHI_2026_IMAGE"')) {
  if (appJsCode.includes('"p362": "NAKAMA_HAYATO_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p362": "NAKAMA_HAYATO_2026_IMAGE"',
      '"p362": "NAKAMA_HAYATO_2026_IMAGE",\n  "p363": "TANAKA_PAULO_JUNICHI_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p363 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p363 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p363');
console.log('6. Verification of p363:', p363 ? `${p363.name} (Overall: ${p363.overall}, maxOverall: ${p363.maxOverall}, Rarity: ${p363.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.TANAKA_PAULO_JUNICHI_2026_IMAGE:', sandbox.window.TANAKA_PAULO_JUNICHI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== PAULO JUNICHI TANAKA ADDED SUCCESSFULLY! ===');
