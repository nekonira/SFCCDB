const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING GAVI (p375) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\cf87285f-bffc-47ed-8433-6024e33b1fc9\\.user_uploaded\\media_1787730814882.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'gaviImage.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.GAVI_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. gaviImage.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p374Idx = mockCode.indexOf("id: 'p374'");
if (p374Idx === -1) {
  console.error("Could not find p374 in mockData.js!");
  process.exit(1);
}

const p374AvatarIdx = mockCode.indexOf("avatarUrl:", p374Idx);
const p374EndIdx = mockCode.indexOf("}", p374AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p374EndIdx + 1);

const gaviObj = `,
  {
    id: 'p375',
    name: 'ガビ',
    readingName: 'がび',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'ポゼッション',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 7232,
    maxOverall: 15426,
    baseStats: { shoot: 1150, pass: 1438, dribble: 1382, defense: 1243, physical: 1173, speed: 875 },
    detailStats: {
      shoot: { finishing: 390, power: 395, composure: 365 },
      pass: { shortPass: 478, longPass: 481, accuracy: 479 },
      dribble: { breakout: 462, keeping: 465, ballTouch: 455 },
      defense: { tackle: 426, interception: 412, marking: 405 },
      physical: { jumping: 266, contact: 449, stamina: 458 },
      speed: { running: 409, agility: 466 }
    },
    maxEnhanced: {
      overall: 15426,
      baseStats: { shoot: 2695, pass: 3043, dribble: 2915, defense: 2824, physical: 2742, speed: 1897 },
      detailStats: {
        shoot: { finishing: 901, power: 906, composure: 888 },
        pass: { shortPass: 1013, longPass: 1016, accuracy: 1014 },
        dribble: { breakout: 973, keeping: 976, ballTouch: 966 },
        defense: { tackle: 961, interception: 935, marking: 928 },
        physical: { jumping: 777, contact: 972, stamina: 993 },
        speed: { running: 920, agility: 977 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 2, throughPass: 1, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '3Dパス', rank: '銀', description: '発動エリア：後左中右　/　発動条件：中左右・後左右に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のロングパス発生確率UP' },
    abilities: [
      { name: '精緻なパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・キック精度UP' },
      { name: '機敏なロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・敏捷性UP' },
      { name: '不屈の魂', rank: '銅', description: '発動条件：好調　/　キープ力・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM', 'ドリブラーRW', 'ドリブラーLW', 'サイドアタッカーLW', 'ワイドストライカー', '組立CB'] };
`;

mockCode = mockCodeHeader + gaviObj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p375 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('gaviImage.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/mockData.js"></script>',
    '<script src="./src/data/gaviImage.js"></script>\n  <script src="./src/data/mockData.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with gaviImage.js script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p375": "GAVI_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p374": "CUBARSI_IMAGE"',
    '"p374": "CUBARSI_IMAGE",\n  "p375": "GAVI_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p375 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p375": "GAVI_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p374": "CUBARSI_IMAGE"',
    '"p374": "CUBARSI_IMAGE",\n  "p375": "GAVI_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p375 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p375 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p375');
console.log('6. Verification of p375:', p375 ? `${p375.name} (${p375.id})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.GAVI_IMAGE:', sandbox.window.GAVI_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== GAVI (p375) ADDED SUCCESSFULLY! ===');
