const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING PAU CUBARSÍ (p374) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\cf87285f-bffc-47ed-8433-6024e33b1fc9\\.user_uploaded\\media_1787730518089.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'cubarsiImage.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.CUBARSI_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. cubarsiImage.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p373Idx = mockCode.indexOf("id: 'p373'");
if (p373Idx === -1) {
  console.error("Could not find p373 in mockData.js!");
  process.exit(1);
}

const p373AvatarIdx = mockCode.indexOf("avatarUrl:", p373Idx);
const p373EndIdx = mockCode.indexOf("}", p373AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p373EndIdx + 1);

const cubarsiObj = `,
  {
    id: 'p374',
    name: 'パウ・クバルシ',
    readingName: 'ぱうくばるし',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'ポゼッション',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅲ',
    overall: 7444,
    maxOverall: 15731,
    baseStats: { shoot: 956, pass: 1414, dribble: 1280, defense: 1412, physical: 1260, speed: 840 },
    detailStats: {
      shoot: { finishing: 292, power: 330, composure: 334 },
      pass: { shortPass: 482, longPass: 479, accuracy: 453 },
      dribble: { breakout: 410, keeping: 406, ballTouch: 464 },
      defense: { tackle: 457, interception: 482, marking: 473 },
      physical: { jumping: 415, contact: 438, stamina: 407 },
      speed: { running: 409, agility: 431 }
    },
    maxEnhanced: {
      overall: 15731,
      baseStats: { shoot: 2453, pass: 2983, dribble: 2813, defense: 3017, physical: 2853, speed: 1886 },
      detailStats: {
        shoot: { finishing: 791, power: 829, composure: 833 },
        pass: { shortPass: 1005, longPass: 1002, accuracy: 976 },
        dribble: { breakout: 921, keeping: 917, ballTouch: 975 },
        defense: { tackle: 992, interception: 1017, marking: 1008 },
        physical: { jumping: 950, contact: 973, stamina: 930 },
        speed: { running: 932, agility: 954 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '逆襲の初動', rank: '金', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカットUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '反撃の起点', rank: '金', description: '発動条件：好調　/　ロングパス・タックル・パスカットUP' },
      { name: '駆け引きの美学', rank: '銀', description: '発動条件：絶好調　/　キック精度・マークUP' },
      { name: '長短のキック', rank: '銅', description: '発動条件：好調　/　ショートパス・ロングパスUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK', 'LM', 'RM'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB', 'ドリブラーLM', 'ドリブラーRM', 'ドリブラーRW', 'ドリブラーLW', 'サイドアタッカーLW', 'ワイドストライカー', '組立CB'] };
`;

mockCode = mockCodeHeader + cubarsiObj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p374 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('cubarsiImage.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/mockData.js"></script>',
    '<script src="./src/data/cubarsiImage.js"></script>\n  <script src="./src/data/mockData.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with cubarsiImage.js script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p374": "CUBARSI_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p373": "YAMAL_IMAGE"',
    '"p373": "YAMAL_IMAGE",\n  "p374": "CUBARSI_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p374 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p374": "CUBARSI_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p373": "YAMAL_IMAGE"',
    '"p373": "YAMAL_IMAGE",\n  "p374": "CUBARSI_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p374 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p374 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p374');
console.log('6. Verification of p374:', p374 ? `${p374.name} (${p374.id})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.CUBARSI_IMAGE:', sandbox.window.CUBARSI_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== PAU CUBARSÍ (p374) ADDED SUCCESSFULLY! ===');
