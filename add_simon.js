const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING UNAI SIMÓN (p376) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\cf87285f-bffc-47ed-8433-6024e33b1fc9\\.user_uploaded\\media_1787731044093.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'simonImage.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SIMON_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. simonImage.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p375Idx = mockCode.indexOf("id: 'p375'");
if (p375Idx === -1) {
  console.error("Could not find p375 in mockData.js!");
  process.exit(1);
}

const p375AvatarIdx = mockCode.indexOf("avatarUrl:", p375Idx);
const p375EndIdx = mockCode.indexOf("}", p375AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p375EndIdx + 1);

const simonObj = `,
  {
    id: 'p376',
    name: 'ウナイ・シモン',
    readingName: 'うないしもん',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'ポゼッション',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 7292,
    maxOverall: 15633,
    baseStats: { shoot: 936, pass: 1164, dribble: 1014, defense: 1400, physical: 1265, speed: 851 },
    detailStats: {
      shoot: { finishing: 298, power: 300, composure: 338 },
      pass: { shortPass: 358, longPass: 401, accuracy: 405 },
      dribble: { breakout: 343, keeping: 318, ballTouch: 353 },
      defense: { tackle: 474, interception: 463, marking: 463 },
      physical: { jumping: 452, contact: 408, stamina: 405 },
      speed: { running: 421, agility: 430 }
    },
    maxEnhanced: {
      overall: 15633,
      baseStats: { shoot: 2397, pass: 2769, dribble: 2475, defense: 3005, physical: 2858, speed: 1873 },
      detailStats: {
        shoot: { finishing: 785, power: 787, composure: 825 },
        pass: { shortPass: 893, longPass: 936, accuracy: 940 },
        dribble: { breakout: 830, keeping: 805, ballTouch: 840 },
        defense: { tackle: 1009, interception: 998, marking: 998 },
        physical: { jumping: 987, contact: 943, stamina: 928 },
        speed: { running: 932, agility: 941 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: 'エレガントセーブ', rank: '銀', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: '広域の守護神', rank: '銀', description: '発動条件：好調　/　セービング・1VS1UP' },
      { name: '全方向の守護', rank: '銀', description: '発動条件：絶好調　/　反応速度・ジャンプUP' },
      { name: '激情のキック', rank: '銅', description: '発動条件：絶好調　/　キック精度・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM', 'ドリブラーRW', 'ドリブラーLW', 'サイドアタッカーLW', 'ワイドストライカー', '組立CB'] };
`;

mockCode = mockCodeHeader + simonObj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p376 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('simonImage.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/mockData.js"></script>',
    '<script src="./src/data/simonImage.js"></script>\n  <script src="./src/data/mockData.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with simonImage.js script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p376": "SIMON_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p375": "GAVI_IMAGE"',
    '"p375": "GAVI_IMAGE",\n  "p376": "SIMON_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p376 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p376": "SIMON_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p375": "GAVI_IMAGE"',
    '"p375": "GAVI_IMAGE",\n  "p376": "SIMON_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p376 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p376 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p376');
console.log('6. Verification of p376:', p376 ? `${p376.name} (${p376.id})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SIMON_IMAGE:', sandbox.window.SIMON_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== UNAI SIMÓN (p376) ADDED SUCCESSFULLY! ===');
