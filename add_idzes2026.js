const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING JAY IDZES (p276) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\8b50a9b4-c50b-431d-a7b7-e99775d959f8\\.user_uploaded\\media_1787229518165.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'idzes2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.IDZES_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. idzes2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p275Idx = mockCode.indexOf("id: 'p275'");
if (p275Idx === -1) {
  console.error("Could not find p275 in mockData.js!");
  process.exit(1);
}

const p275AvatarIdx = mockCode.indexOf("avatarUrl:", p275Idx);
const p275EndIdx = mockCode.indexOf("}", p275AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p275EndIdx + 1);

const idzesObj = `,
  {
    id: 'p276',
    name: 'ジェイ・イツェス',
    readingName: 'じぇいいつぇす',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'インドネシア',
    policy: 'ポゼッション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 5812,
    maxOverall: 14941,
    baseStats: { shoot: 940, pass: 990, dribble: 1141, defense: 1203, physical: 1146, speed: 678 },
    detailStats: {
      shoot: { finishing: 283, power: 339, composure: 318 },
      pass: { shortPass: 345, longPass: 339, accuracy: 306 },
      dribble: { breakout: 367, keeping: 380, ballTouch: 394 },
      defense: { tackle: 395, interception: 406, marking: 402 },
      physical: { jumping: 391, contact: 381, stamina: 374 },
      speed: { running: 330, agility: 348 }
    },
    maxEnhanced: {
      overall: 14941,
      baseStats: { shoot: 2437, pass: 2559, dribble: 2674, defense: 2808, physical: 2739, speed: 1724 },
      detailStats: {
        shoot: { finishing: 782, power: 838, composure: 817 },
        pass: { shortPass: 868, longPass: 862, accuracy: 829 },
        dribble: { breakout: 878, keeping: 891, ballTouch: 905 },
        defense: { tackle: 930, interception: 941, marking: 937 },
        physical: { jumping: 926, contact: 916, stamina: 897 },
        speed: { running: 853, agility: 871 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' },
      { name: 'パワフルジャンパー', rank: '銅', description: '発動条件：途中出場　/　ジャンプ・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + idzesObj, 'utf-8');
console.log('2. mockData.js updated with p276 (Jay Idzes) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('idzes2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/pulisic2026Image.js"></script>',
    '<script src="./src/data/pulisic2026Image.js"></script>\n  <script src="./src/data/idzes2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p276": "IDZES_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p275": "PULISIC_2026_IMAGE"',
    '"p275": "PULISIC_2026_IMAGE",\n  "p276": "IDZES_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p276 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p276": "IDZES_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p275": "PULISIC_2026_IMAGE"',
    '"p275": "PULISIC_2026_IMAGE",\n  "p276": "IDZES_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p276 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p276 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p276');
console.log('6. Verification of p276:', p276 ? `${p276.name} (${p276.nationality})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.IDZES_2026_IMAGE:', sandbox.window.IDZES_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== JAY IDZES ADDED SUCCESSFULLY! ===');
