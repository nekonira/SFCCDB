const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING CHANATHIP SONGKRASIN (p277) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\8b50a9b4-c50b-431d-a7b7-e99775d959f8\\.user_uploaded\\media_1787230004131.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'chanathip2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.CHANATHIP_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. chanathip2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p276Idx = mockCode.indexOf("id: 'p276'");
if (p276Idx === -1) {
  console.error("Could not find p276 in mockData.js!");
  process.exit(1);
}

const p276AvatarIdx = mockCode.indexOf("avatarUrl:", p276Idx);
const p276EndIdx = mockCode.indexOf("}", p276AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p276EndIdx + 1);

const chanathipObj = `,
  {
    id: 'p277',
    name: 'チャナティップ・ソングラシン',
    readingName: 'ちゃなてぃっぷそんぐらしん',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'タイ',
    policy: 'ムービング',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 5889,
    maxOverall: 14922,
    baseStats: { shoot: 1113, pass: 1152, dribble: 1195, defense: 864, physical: 943, speed: 812 },
    detailStats: {
      shoot: { finishing: 387, power: 352, composure: 374 },
      pass: { shortPass: 394, longPass: 404, accuracy: 354 },
      dribble: { breakout: 402, keeping: 392, ballTouch: 401 },
      defense: { tackle: 306, interception: 284, marking: 274 },
      physical: { jumping: 254, contact: 327, stamina: 362 },
      speed: { running: 412, agility: 400 }
    },
    maxEnhanced: {
      overall: 14922,
      baseStats: { shoot: 2658, pass: 2733, dribble: 2764, defense: 2409, physical: 2512, speed: 1846 },
      detailStats: {
        shoot: { finishing: 898, power: 863, composure: 897 },
        pass: { shortPass: 929, longPass: 927, accuracy: 877 },
        dribble: { breakout: 925, keeping: 915, ballTouch: 924 },
        defense: { tackle: 829, interception: 795, marking: 785 },
        physical: { jumping: 765, contact: 850, stamina: 897 },
        speed: { running: 923, agility: 923 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '敵陣を切り裂くパス', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：スルーパス時　/　スルーパス・キック精度UP' },
    abilities: [
      { name: '精緻なパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・キック精度UP' },
      { name: 'すり抜けるロングパサー', rank: '銅', description: '発動条件：好調　/　ロングパス・突破力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + chanathipObj, 'utf-8');
console.log('2. mockData.js updated with p277 (Chanathip Songkrasin) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('chanathip2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/idzes2026Image.js"></script>',
    '<script src="./src/data/idzes2026Image.js"></script>\n  <script src="./src/data/chanathip2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p277": "CHANATHIP_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p276": "IDZES_2026_IMAGE"',
    '"p276": "IDZES_2026_IMAGE",\n  "p277": "CHANATHIP_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p277 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p277": "CHANATHIP_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p276": "IDZES_2026_IMAGE"',
    '"p276": "IDZES_2026_IMAGE",\n  "p277": "CHANATHIP_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p277 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p277 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p277');
console.log('6. Verification of p277:', p277 ? `${p277.name} (${p277.nationality})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.CHANATHIP_2026_IMAGE:', sandbox.window.CHANATHIP_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== CHANATHIP SONGKRASIN ADDED SUCCESSFULLY! ===');
