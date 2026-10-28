const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING NELSON SEMEDO (2025-2026) (p410) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\2267caac-99b8-4455-be84-1ae3774f4ede\\.user_uploaded\\media_1793173525415.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'nelsonSemedo2026Image.js');

if (!fs.existsSync(imagePath)) {
  console.error("Uploaded image not found:", imagePath);
  process.exit(1);
}

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.NELSON_SEMEDO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. nelsonSemedo2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p409Idx = mockCode.indexOf("id: 'p409'");
if (p409Idx === -1) {
  console.error("Could not find p409 in mockData.js!");
  process.exit(1);
}

const p409AvatarIdx = mockCode.indexOf("avatarUrl:", p409Idx);
const p409EndIdx = mockCode.indexOf("}", p409AvatarIdx);

const headerCode = mockCode.substring(0, p409EndIdx + 1);

const semedoObj = `,
  {
    id: 'p410',
    name: 'ネルソン・セメド',
    readingName: 'ねるそん・せめど',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'カウンター',
    playStyle: '攻撃的RFB',
    playStyleLevel: 'Ⅲ',
    overall: 7130,
    maxOverall: 15390,
    baseStats: { shoot: 1189, pass: 1244, dribble: 1371, defense: 1290, physical: 1259, speed: 919 },
    detailStats: {
      shoot: { finishing: 396, power: 393, composure: 400 },
      pass: { shortPass: 418, longPass: 410, accuracy: 416 },
      dribble: { breakout: 459, keeping: 462, ballTouch: 450 },
      defense: { tackle: 446, interception: 425, marking: 419 },
      physical: { jumping: 395, contact: 422, stamina: 442 },
      speed: { running: 459, agility: 460 }
    },
    maxEnhanced: {
      overall: 15390,
      baseStats: { shoot: 2686, pass: 2813, dribble: 2904, defense: 2895, physical: 2828, speed: 1989 },
      detailStats: {
        shoot: { finishing: 895, power: 892, composure: 899 },
        pass: { shortPass: 941, longPass: 933, accuracy: 939 },
        dribble: { breakout: 970, keeping: 973, ballTouch: 961 },
        defense: { tackle: 981, interception: 960, marking: 954 },
        physical: { jumping: 906, contact: 945, stamina: 977 },
        speed: { running: 994, agility: 995 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '演出のアーティスト', rank: '金', description: '発動エリア：中左右・後左右　/　発動条件：ドリブル時　/　突破力・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'スピードランナー', rank: '銀', description: '発動条件：好調　/　走力・敏捷性UP' },
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' },
      { name: '奪取のターゲットマン', rank: '銅', description: '発動条件：好調　/　キープ力・パスカットUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + semedoObj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p410.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('nelsonSemedo2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/nemoto2026Image.js"></script>',
    '<script src="./src/data/nelsonSemedo2026Image.js"></script>\n  <script src="./src/data/nemoto2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with nelsonSemedo2026Image.js script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p410":"NELSON_SEMEDO_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p409":"VITINHA_2026_IMAGE"',
    '"p409":"VITINHA_2026_IMAGE","p410":"NELSON_SEMEDO_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p410 image mapping.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p410": "NELSON_SEMEDO_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p409": "VITINHA_2026_IMAGE"',
    '"p409": "VITINHA_2026_IMAGE",\n    "p410": "NELSON_SEMEDO_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p410 image mapping.');
}

// 5. Update index.html cache busters
const newTimestamp = Date.now().toString();
indexContent = fs.readFileSync(indexPath, 'utf-8');
indexContent = indexContent.replace(/mockData\.js\?v=\d+/, `mockData.js?v=${newTimestamp}`);
indexContent = indexContent.replace(/app\.js\?v=\d+/, `app.js?v=${newTimestamp}`);
indexContent = indexContent.replace(/main\.js\?v=\d+/, `main.js?v=${newTimestamp}`);
fs.writeFileSync(indexPath, indexContent, 'utf-8');
console.log('6. index.html cache busters updated with', newTimestamp);

// 6. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(updatedMockCode, sandbox);
const p410 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p410');
console.log('7. Verification of p410 in mockData:', p410 ? `${p410.name} (${p410.nationality}, ${p410.mainPosition}, ${p410.overall} -> ${p410.maxOverall})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('8. Verification of window.NELSON_SEMEDO_2026_IMAGE:', sandbox.window.NELSON_SEMEDO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== NELSON SEMEDO (2025-2026) ADDED SUCCESSFULLY! ===');
