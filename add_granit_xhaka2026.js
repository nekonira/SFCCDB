const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING GRANIT XHAKA (p407) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\d8448505-5340-47b3-afef-a700dd46b8c6\\.user_uploaded\\media_1792557599399.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'granitXhaka2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.GRANIT_XHAKA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. granitXhaka2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p406Idx = mockCode.indexOf("id: 'p406'");
if (p406Idx === -1) {
  console.error("Could not find p406 in mockData.js!");
  process.exit(1);
}

const p406AvatarIdx = mockCode.indexOf("avatarUrl:", p406Idx);
const p406EndIdx = mockCode.indexOf("}", p406AvatarIdx);

const headerCode = mockCode.substring(0, p406EndIdx + 1);

const xhakaObj = `,
  {
    id: 'p407',
    name: 'グラニト・ジャカ',
    readingName: 'ぐらにと・じゃか',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スイス',
    policy: 'リアクション',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 7362,
    maxOverall: 15653,
    baseStats: { shoot: 1150, pass: 1362, dribble: 1262, defense: 1319, physical: 1306, speed: 670 },
    detailStats: {
      shoot: { finishing: 354, power: 410, composure: 386 },
      pass: { shortPass: 459, longPass: 458, accuracy: 445 },
      dribble: { breakout: 383, keeping: 411, ballTouch: 468 },
      defense: { tackle: 433, interception: 451, marking: 435 },
      physical: { jumping: 414, contact: 435, stamina: 457 },
      speed: { running: 340, agility: 330 }
    },
    maxEnhanced: {
      overall: 15653,
      baseStats: { shoot: 2695, pass: 2967, dribble: 2795, defense: 2900, physical: 2875, speed: 1692 },
      detailStats: {
        shoot: { finishing: 865, power: 921, composure: 909 },
        pass: { shortPass: 994, longPass: 993, accuracy: 980 },
        dribble: { breakout: 894, keeping: 922, ballTouch: 979 },
        defense: { tackle: 968, interception: 974, marking: 958 },
        physical: { jumping: 925, contact: 958, stamina: 992 },
        speed: { running: 851, agility: 841 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '絶好の楔', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：AM・CFの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '不屈のキッカー', rank: '銀', description: '発動条件：好調　/　キック精度・スタミナUP' },
      { name: '長短のキック', rank: '銀', description: '発動条件：途中出場　/　ショートパス・ロングパスUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + xhakaObj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p407.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('granitXhaka2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/gotoYusuke2026Image.js"></script>',
    '<script src="./src/data/gotoYusuke2026Image.js"></script>\n  <script src="./src/data/granitXhaka2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with granitXhaka2026Image.js script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p407":"GRANIT_XHAKA_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p406":"MAXENCE_LACROIX_2026_IMAGE"',
    '"p406":"MAXENCE_LACROIX_2026_IMAGE","p407":"GRANIT_XHAKA_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p407 image mapping.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p407": "GRANIT_XHAKA_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p406": "MAXENCE_LACROIX_2026_IMAGE"',
    '"p406": "MAXENCE_LACROIX_2026_IMAGE",\n    "p407": "GRANIT_XHAKA_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p407 image mapping.');
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
const p407 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p407');
console.log('7. Verification of p407 in mockData:', p407 ? `${p407.name} (${p407.nationality}, ${p407.mainPosition}, ${p407.overall} -> ${p407.maxOverall})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('8. Verification of window.GRANIT_XHAKA_2026_IMAGE:', sandbox.window.GRANIT_XHAKA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== GRANIT XHAKA ADDED SUCCESSFULLY! ===');
