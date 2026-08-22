const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING REN ASAKURA (p314) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a62c0870-1b88-4e18-96bf-af5f5ee5d0b1\\.user_uploaded\\media_1787390256791.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'renasakura2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.RENASAKURA_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. renasakura2025Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p313Idx = mockCode.indexOf("id: 'p313'");
if (p313Idx === -1) {
  console.error("Could not find p313 in mockData.js!");
  process.exit(1);
}

const p313AvatarIdx = mockCode.indexOf("avatarUrl:", p313Idx);
const p313EndIdx = mockCode.indexOf("}", p313AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p313EndIdx + 1);

const asakuraObj = `,
  {
    id: 'p314',
    name: '浅倉廉',
    readingName: 'あさくら・れん',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6129,
    maxOverall: 14228,
    baseStats: { shoot: 1059, pass: 1101, dribble: 1215, defense: 1075, physical: 955, speed: 797 },
    detailStats: {
      shoot: { finishing: 382, power: 307, composure: 370 },
      pass: { shortPass: 371, longPass: 377, accuracy: 353 },
      dribble: { breakout: 416, keeping: 403, ballTouch: 396 },
      defense: { tackle: 371, interception: 357, marking: 347 },
      physical: { jumping: 314, contact: 291, stamina: 350 },
      speed: { running: 400, agility: 397 }
    },
    maxEnhanced: {
      overall: 14228,
      baseStats: { shoot: 2604, pass: 2682, dribble: 2784, defense: 2620, physical: 2524, speed: 1831 },
      detailStats: {
        shoot: { finishing: 893, power: 818, composure: 893 },
        pass: { shortPass: 906, longPass: 900, accuracy: 876 },
        dribble: { breakout: 939, keeping: 926, ballTouch: 919 },
        defense: { tackle: 894, interception: 868, marking: 858 },
        physical: { jumping: 825, contact: 814, stamina: 885 },
        speed: { running: 911, agility: 920 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + asakuraObj, 'utf-8');
console.log('2. mockData.js updated with p314 (Ren Asakura) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('renasakura2025Image.js')) {
  if (indexContent.includes('ryomawatanabe2025Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/ryomawatanabe2025Image.js"></script>',
      '<script src="./src/data/ryomawatanabe2025Image.js"></script>\n  <script src="./src/data/renasakura2025Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/renasakura2025Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p314": "RENASAKURA_2025_IMAGE"')) {
  if (appJsxCode.includes('"p313": "RYOMAWATANABE_2025_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p313": "RYOMAWATANABE_2025_IMAGE"',
      '"p313": "RYOMAWATANABE_2025_IMAGE",\n  "p314": "RENASAKURA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p314 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p314": "RENASAKURA_2025_IMAGE"')) {
  if (appJsCode.includes('"p313": "RYOMAWATANABE_2025_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p313": "RYOMAWATANABE_2025_IMAGE"',
      '"p313": "RYOMAWATANABE_2025_IMAGE",\n  "p314": "RENASAKURA_2025_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p314 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p314 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p314');
console.log('6. Verification of p314:', p314 ? `${p314.name} (Overall: ${p314.overall}, maxOverall: ${p314.maxOverall}, Rarity: ${p314.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.RENASAKURA_2025_IMAGE:', sandbox.window.RENASAKURA_2025_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== REN ASAKURA ADDED SUCCESSFULLY! ===');
