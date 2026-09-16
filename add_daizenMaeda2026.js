const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING DAIZEN MAEDA (2026) (p386) ===');

// 1. Image conversion
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3cd38d12-555b-4707-b414-e5915f966428\\.user_uploaded\\media_1789534443850.jpg";
const imageJsPath = path.join(__dirname, 'src', 'data', 'daizenMaeda2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/jpeg;base64,${base64}`;
const imageJsContent = `window.DAIZEN_MAEDA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. daizenMaeda2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p385Idx = mockCode.indexOf("id: 'p385'");
if (p385Idx === -1) {
  console.error("Could not find p385 in mockData.js!");
  process.exit(1);
}

const p385AvatarIdx = mockCode.indexOf("avatarUrl:", p385Idx);
const p385EndIdx = mockCode.indexOf("}", p385AvatarIdx);

const headerCode = mockCode.substring(0, p385EndIdx + 1);

const daizenMaeda2026Obj = `,
  {
    id: 'p386',
    name: '前田大然',
    readingName: 'まえだだいぜん',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: ['LW'],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 7069,
    maxOverall: 15152,
    baseStats: { shoot: 1368, pass: 1079, dribble: 1314, defense: 1148, physical: 1241, speed: 972 },
    detailStats: {
      shoot: { finishing: 471, power: 450, composure: 447 },
      pass: { shortPass: 364, longPass: 364, accuracy: 351 },
      dribble: { breakout: 462, keeping: 437, ballTouch: 415 },
      defense: { tackle: 386, interception: 391, marking: 371 },
      physical: { jumping: 368, contact: 398, stamina: 475 },
      speed: { running: 499, agility: 473 }
    },
    maxEnhanced: {
      overall: 15152,
      baseStats: { shoot: 2913, pass: 2660, dribble: 2883, defense: 2693, physical: 2810, speed: 2006 },
      detailStats: {
        shoot: { finishing: 982, power: 961, composure: 970 },
        pass: { shortPass: 899, longPass: 887, accuracy: 874 },
        dribble: { breakout: 985, keeping: 960, ballTouch: 938 },
        defense: { tackle: 909, interception: 902, marking: 882 },
        physical: { jumping: 879, contact: 921, stamina: 1010 },
        speed: { running: 1010, agility: 996 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '魂のワンタッチ', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '韋駄天', rank: '金', description: '発動条件：好調　/　スタミナ・走力UP　/　ハーフタイムにスタミナ回復量30％UP' },
      { name: 'ゴール前の嗅覚', rank: '銀', description: '発動条件：絶好調　/　決定力・敏捷性UP' },
      { name: 'ランニングマーカー', rank: '銅', description: '発動条件：絶好調　/　マーク・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + daizenMaeda2026Obj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p386.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('daizenMaeda2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/kentoShiogai2026Image.js"></script>',
    '<script src="./src/data/kentoShiogai2026Image.js"></script>\n  <script src="./src/data/daizenMaeda2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p386"')) {
  appJsxCode = appJsxCode.replace(
    '"p385": "KENTO_SHIOGAI_2026_IMAGE"',
    '"p385": "KENTO_SHIOGAI_2026_IMAGE",\n    "p386": "DAIZEN_MAEDA_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('4. src/app.jsx updated with p386 image mapping.');
}

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p386"')) {
  if (appJsCode.includes('"p385":"KENTO_SHIOGAI_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p385":"KENTO_SHIOGAI_2026_IMAGE"',
      '"p385":"KENTO_SHIOGAI_2026_IMAGE","p386":"DAIZEN_MAEDA_2026_IMAGE"'
    );
  } else {
    appJsCode = appJsCode.replace(
      '"KENTO_SHIOGAI_2026_IMAGE"}',
      '"KENTO_SHIOGAI_2026_IMAGE","p386":"DAIZEN_MAEDA_2026_IMAGE"}'
    );
  }
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('5. src/app.js updated with p386 image mapping.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(updatedMockCode, sandbox);
const p386 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p386');
console.log('6. Verification of p386:', p386 ? `${p386.name} (${p386.id})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.DAIZEN_MAEDA_2026_IMAGE:', sandbox.window.DAIZEN_MAEDA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== DAIZEN MAEDA (2026) ADDED SUCCESSFULLY! ===');
