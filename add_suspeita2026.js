const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING SUSPEITA TICKET EXCHANGE (p285) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\8dd70f4e-e6e6-425c-8716-ba327fd6d38b\\.user_uploaded\\media_1787233134534.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'suspeita2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SUSPEITA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. suspeita2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p284Idx = mockCode.indexOf("id: 'p284'");
if (p284Idx === -1) {
  console.error("Could not find p284 in mockData.js!");
  process.exit(1);
}

const p284AvatarIdx = mockCode.indexOf("avatarUrl:", p284Idx);
const p284EndIdx = mockCode.indexOf("}", p284AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p284EndIdx + 1);

const suspeitaObj = `,
  {
    id: 'p285',
    name: 'ススペイタ(チケット交換)',
    readingName: 'すすぺいた',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'リアクション',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 5154,
    maxOverall: 12610,
    baseStats: { shoot: 938, pass: 1099, dribble: 968, defense: 984, physical: 832, speed: 583 },
    detailStats: {
      shoot: { finishing: 323, power: 309, composure: 306 },
      pass: { shortPass: 390, longPass: 381, accuracy: 328 },
      dribble: { breakout: 338, keeping: 313, ballTouch: 317 },
      defense: { tackle: 315, interception: 363, marking: 306 },
      physical: { jumping: 238, contact: 280, stamina: 314 },
      speed: { running: 291, agility: 292 }
    },
    maxEnhanced: {
      overall: 12610,
      baseStats: { shoot: 2192, pass: 2413, dribble: 2210, defense: 2274, physical: 2110, speed: 1411 },
      detailStats: {
        shoot: { finishing: 737, power: 723, composure: 732 },
        pass: { shortPass: 828, longPass: 819, accuracy: 766 },
        dribble: { breakout: 752, keeping: 727, ballTouch: 731 },
        defense: { tackle: 753, interception: 789, marking: 732 },
        physical: { jumping: 652, contact: 706, stamina: 752 },
        speed: { running: 705, agility: 706 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '安定したパスワーク', rank: '銅', description: '発動エリア：前左中右・中左中右　/　発動条件：AM・RW・LW・CFの選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '分断のパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・パスカットUP' },
      { name: '逆襲のドリブラー', rank: '銅', description: '発動条件：好調　/　突破力・タックルUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + suspeitaObj, 'utf-8');
console.log('2. mockData.js updated with p285 (Suspeita) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('suspeita2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/argantchuev2026Image.js"></script>',
    '<script src="./src/data/argantchuev2026Image.js"></script>\n  <script src="./src/data/suspeita2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p285": "SUSPEITA_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p284": "ARGANTCHUEV_2026_IMAGE"',
    '"p284": "ARGANTCHUEV_2026_IMAGE",\n  "p285": "SUSPEITA_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p285 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p285": "SUSPEITA_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p284": "ARGANTCHUEV_2026_IMAGE"',
    '"p284": "ARGANTCHUEV_2026_IMAGE",\n  "p285": "SUSPEITA_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p285 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p285 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p285');
console.log('6. Verification of p285:', p285 ? `${p285.name} (${p285.nationality})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SUSPEITA_2026_IMAGE:', sandbox.window.SUSPEITA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== SUSPEITA TICKET EXCHANGE ADDED SUCCESSFULLY! ===');
