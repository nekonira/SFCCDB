const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YUKI HONDA 2026 (p274) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\8b50a9b4-c50b-431d-a7b7-e99775d959f8\\.user_uploaded\\media_1787228449084.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'honda2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.HONDA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. honda2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p273Idx = mockCode.indexOf("id: 'p273'");
if (p273Idx === -1) {
  console.error("Could not find p273 in mockData.js!");
  process.exit(1);
}

const p273AvatarIdx = mockCode.indexOf("avatarUrl:", p273Idx);
const p273EndIdx = mockCode.indexOf("}", p273AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p273EndIdx + 1);

const honda2026Obj = `,
  {
    id: 'p274',
    name: '本多勇喜(2026)',
    readingName: 'ほんだゆうき',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'クリエイティブLFB',
    playStyleLevel: 'Ⅱ',
    overall: 6238,
    maxOverall: 14399,
    baseStats: { shoot: 1001, pass: 1315, dribble: 1242, defense: 1035, physical: 1201, speed: 648 },
    detailStats: {
      shoot: { finishing: 319, power: 358, composure: 324 },
      pass: { shortPass: 438, longPass: 442, accuracy: 435 },
      dribble: { breakout: 412, keeping: 423, ballTouch: 407 },
      defense: { tackle: 348, interception: 343, marking: 344 },
      physical: { jumping: 367, contact: 407, stamina: 427 },
      speed: { running: 261, agility: 387 }
    },
    maxEnhanced: {
      overall: 14399,
      baseStats: { shoot: 2498, pass: 2884, dribble: 2775, defense: 2640, physical: 2770, speed: 1718 },
      detailStats: {
        shoot: { finishing: 818, power: 857, composure: 823 },
        pass: { shortPass: 961, longPass: 965, accuracy: 958 },
        dribble: { breakout: 923, keeping: 934, ballTouch: 918 },
        defense: { tackle: 883, interception: 878, marking: 879 },
        physical: { jumping: 878, contact: 930, stamina: 962 },
        speed: { running: 796, agility: 922 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'コントロールフィード', rank: '銅', description: '発動エリア：中左右・後左右　/　発動条件：ロングパス時　/　ロングパス・キック精度UP' },
    abilities: [
      { name: '長短のキック', rank: '銀', description: '発動条件：途中出場　/　ショートパス・ロングパスUP' },
      { name: '力強いボールキープ', rank: '銀', description: '発動条件：好調　/　キープ力・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + honda2026Obj, 'utf-8');
console.log('2. mockData.js updated with p274 (Yuki Honda) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('honda2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/arakiImage.js"></script>',
    '<script src="./src/data/arakiImage.js"></script>\n  <script src="./src/data/honda2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAY_STYLES in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"クリエイティブLFB"')) {
  appJsxCode = appJsxCode.replace(
    '"守備的RFB",',
    '"守備的RFB",\n  "クリエイティブLFB",'
  );
}

if (!appJsxCode.includes('"p274": "HONDA_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p273": "AKANJI_2026_IMAGE"',
    '"p273": "AKANJI_2026_IMAGE",\n  "p274": "HONDA_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with クリエイティブLFB and p274 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"クリエイティブLFB"')) {
  appJsCode = appJsCode.replace(
    '"守備的RFB",',
    '"守備的RFB", "クリエイティブLFB",'
  );
}

if (!appJsCode.includes('"p274": "HONDA_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p273": "AKANJI_2026_IMAGE"',
    '"p273": "AKANJI_2026_IMAGE",\n  "p274": "HONDA_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with クリエイティブLFB and p274 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p274 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p274');
console.log('6. Verification of p274:', p274 ? `${p274.name} (Playstyle: ${p274.playStyle})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.HONDA_2026_IMAGE:', sandbox.window.HONDA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== YUKI HONDA 2026 ADDED SUCCESSFULLY! ===');
