const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TAKEFUSA KUBO (2026) (p387) ===');

// 1. Image conversion
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3cd38d12-555b-4707-b414-e5915f966428\\.user_uploaded\\media_1789534764641.jpg";
const imageJsPath = path.join(__dirname, 'src', 'data', 'takefusaKubo2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/jpeg;base64,${base64}`;
const imageJsContent = `window.TAKEFUSA_KUBO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. takefusaKubo2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p386Idx = mockCode.indexOf("id: 'p386'");
if (p386Idx === -1) {
  console.error("Could not find p386 in mockData.js!");
  process.exit(1);
}

const p386AvatarIdx = mockCode.indexOf("avatarUrl:", p386Idx);
const p386EndIdx = mockCode.indexOf("}", p386AvatarIdx);

const headerCode = mockCode.substring(0, p386EndIdx + 1);

const takefusaKubo2026Obj = `,
  {
    id: 'p387',
    name: '久保建英',
    readingName: 'くぼたけふさ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: ['RW'],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 7368,
    maxOverall: 15477,
    baseStats: { shoot: 1366, pass: 1394, dribble: 1445, defense: 1065, physical: 1225, speed: 908 },
    detailStats: {
      shoot: { finishing: 464, power: 452, composure: 450 },
      pass: { shortPass: 452, longPass: 470, accuracy: 472 },
      dribble: { breakout: 483, keeping: 484, ballTouch: 478 },
      defense: { tackle: 333, interception: 373, marking: 359 },
      physical: { jumping: 376, contact: 416, stamina: 433 },
      speed: { running: 434, agility: 474 }
    },
    maxEnhanced: {
      overall: 15477,
      baseStats: { shoot: 2911, pass: 2975, dribble: 3014, defense: 2610, physical: 2794, speed: 1942 },
      detailStats: {
        shoot: { finishing: 975, power: 963, composure: 973 },
        pass: { shortPass: 987, longPass: 993, accuracy: 995 },
        dribble: { breakout: 1006, keeping: 1007, ballTouch: 1001 },
        defense: { tackle: 856, interception: 884, marking: 870 },
        physical: { jumping: 887, contact: 939, stamina: 968 },
        speed: { running: 945, agility: 997 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'ベルベットパス', rank: '金', description: '発動エリア：前左右・中左右　/　発動条件：ショートパス・ロングパス時　/　ショートパス・ロングパス・キック精度UP　/　成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '失わないドリブラー', rank: '銀', description: '発動条件：絶好調　/　突破力・キープ力UP' },
      { name: '高速のボールタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・走力UP' },
      { name: '俊敏なキッカー', rank: '銅', description: '発動条件：好調　/　キック精度・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + takefusaKubo2026Obj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p387.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('takefusaKubo2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/daizenMaeda2026Image.js"></script>',
    '<script src="./src/data/daizenMaeda2026Image.js"></script>\n  <script src="./src/data/takefusaKubo2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p387"')) {
  appJsxCode = appJsxCode.replace(
    '"p386": "DAIZEN_MAEDA_2026_IMAGE"',
    '"p386": "DAIZEN_MAEDA_2026_IMAGE",\n    "p387": "TAKEFUSA_KUBO_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('4. src/app.jsx updated with p387 image mapping.');
}

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p387"')) {
  if (appJsCode.includes('"p386":"DAIZEN_MAEDA_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p386":"DAIZEN_MAEDA_2026_IMAGE"',
      '"p386":"DAIZEN_MAEDA_2026_IMAGE","p387":"TAKEFUSA_KUBO_2026_IMAGE"'
    );
  } else {
    appJsCode = appJsCode.replace(
      '"DAIZEN_MAEDA_2026_IMAGE"}',
      '"DAIZEN_MAEDA_2026_IMAGE","p387":"TAKEFUSA_KUBO_2026_IMAGE"}'
    );
  }
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('5. src/app.js updated with p387 image mapping.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(updatedMockCode, sandbox);
const p387 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p387');
console.log('6. Verification of p387:', p387 ? `${p387.name} (${p387.id})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.TAKEFUSA_KUBO_2026_IMAGE:', sandbox.window.TAKEFUSA_KUBO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== TAKEFUSA KUBO (2026) ADDED SUCCESSFULLY! ===');
