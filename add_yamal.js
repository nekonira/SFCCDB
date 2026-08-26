const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING LAMINE YAMAL (p373) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\cf87285f-bffc-47ed-8433-6024e33b1fc9\\.user_uploaded\\media_1787730107041.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yamalImage.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YAMAL_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. yamalImage.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p372Idx = mockCode.indexOf("id: 'p372'");
if (p372Idx === -1) {
  console.error("Could not find p372 in mockData.js!");
  process.exit(1);
}

const p372AvatarIdx = mockCode.indexOf("avatarUrl:", p372Idx);
const p372EndIdx = mockCode.indexOf("}", p372AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p372EndIdx + 1);

const yamalObj = `,
  {
    id: 'p373',
    name: 'ラミン・ヤマル',
    readingName: 'らみんやまる',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'ポゼッション',
    playStyle: 'ワイドストライカーRW',
    playStyleLevel: 'Ⅲ',
    overall: 7948,
    maxOverall: 16185,
    baseStats: { shoot: 1477, pass: 1472, dribble: 1501, defense: 1002, physical: 1187, speed: 957 },
    detailStats: {
      shoot: { finishing: 492, power: 491, composure: 494 },
      pass: { shortPass: 488, longPass: 493, accuracy: 491 },
      dribble: { breakout: 501, keeping: 497, ballTouch: 503 },
      defense: { tackle: 318, interception: 354, marking: 330 },
      physical: { jumping: 343, contact: 417, stamina: 427 },
      speed: { running: 469, agility: 488 }
    },
    maxEnhanced: {
      overall: 16185,
      baseStats: { shoot: 3034, pass: 3041, dribble: 3094, defense: 2511, physical: 2732, speed: 2027 },
      detailStats: {
        shoot: { finishing: 1015, power: 1002, composure: 1017 },
        pass: { shortPass: 1011, longPass: 1016, accuracy: 1014 },
        dribble: { breakout: 1036, keeping: 1032, ballTouch: 1026 },
        defense: { tackle: 829, interception: 853, marking: 829 },
        physical: { jumping: 854, contact: 928, stamina: 950 },
        speed: { running: 1004, agility: 1023 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: '流星の弾道', rank: '金', description: '発動エリア：前左中右　/　発動条件：シュート時　/　決定力、キック力UP' },
    abilities: [
      { name: '変幻自在のドリブラー', rank: '金', description: '発動条件：好調　/　突破力・キープ力・ボールタッチUP' },
      { name: '冷静なフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・冷静さUP' },
      { name: '俊敏なパサー', rank: '銀', description: '発動条件：好調　/　ショートパス・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM', 'ドリブラーRW', 'ドリブラーLW', 'サイドアタッカーLW', 'ワイドストライカー'] };
`;

mockCode = mockCodeHeader + yamalObj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p373 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('yamalImage.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/mockData.js"></script>',
    '<script src="./src/data/yamalImage.js"></script>\n  <script src="./src/data/mockData.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with yamalImage.js script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p373": "YAMAL_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p372": "PARK_ILGYU_2026_IMAGE"',
    '"p372": "PARK_ILGYU_2026_IMAGE",\n  "p373": "YAMAL_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p373 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p373": "YAMAL_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p372": "PARK_ILGYU_2026_IMAGE"',
    '"p372": "PARK_ILGYU_2026_IMAGE",\n  "p373": "YAMAL_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p373 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p373 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p373');
console.log('6. Verification of p373:', p373 ? `${p373.name} (${p373.id})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.YAMAL_IMAGE:', sandbox.window.YAMAL_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== LAMINE YAMAL (p373) ADDED SUCCESSFULLY! ===');
