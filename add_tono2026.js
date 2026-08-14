const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING DAIYA TONO 2026 (p192) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786027291425.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'tono2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.TONO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. tono2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p191Idx = mockCode.indexOf("id: 'p191'");
if (p191Idx === -1) {
  console.error("Could not find p191 in mockData.js!");
  process.exit(1);
}

const p191AvatarIdx = mockCode.indexOf("avatarUrl:", p191Idx);
const p191EndIdx = mockCode.indexOf("}", p191AvatarIdx);

mockCode = mockCode.substring(0, p191EndIdx + 1);

const tono2026Obj = `,
  {
    id: 'p192',
    name: '遠野大弥(2026)',
    readingName: 'とおのだいや',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6499,
    maxOverall: 14597,
    baseStats: { shoot: 1170, pass: 1154, dribble: 1300, defense: 1199, physical: 988, speed: 845 },
    detailStats: {
      shoot: { finishing: 408, power: 379, composure: 383 },
      pass: { shortPass: 374, longPass: 376, accuracy: 404 },
      dribble: { breakout: 430, keeping: 438, ballTouch: 432 },
      defense: { tackle: 394, interception: 403, marking: 402 },
      physical: { jumping: 340, contact: 298, stamina: 350 },
      speed: { running: 415, agility: 430 }
    },
    maxEnhanced: {
      overall: 14597,
      baseStats: { shoot: 2715, pass: 2735, dribble: 2869, defense: 2744, physical: 2557, speed: 1879 },
      detailStats: {
        shoot: { finishing: 919, power: 890, composure: 906 },
        pass: { shortPass: 909, longPass: 899, accuracy: 927 },
        dribble: { breakout: 953, keeping: 961, ballTouch: 955 },
        defense: { tackle: 917, interception: 914, marking: 913 },
        physical: { jumping: 851, contact: 821, stamina: 885 },
        speed: { running: 926, agility: 953 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' },
      { name: '技巧派ドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += tono2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p192 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('tono2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos',
    '<script src="./src/data/tono2026Image.js"></script>\n  <!-- 1. Player Photos'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p192Check = `  if (player.id === 'p192' || (player.name && (player.name.includes('遠野大弥') || player.name.includes('遠野') || player.name.includes('Daiya Tono') || player.name.includes('Tono')))) {\n    return window.TONO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p192'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p191' || (player.name && player.name.includes('配布') && (player.name.includes('ラインデルス') || player.name.includes('Reijnders')))) {
    return window.REIJNDERS_DIST_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p191' || (player.name && player.name.includes('配布') && (player.name.includes('ラインデルス') || player.name.includes('Reijnders')))) {
    return window.REIJNDERS_DIST_2026_IMAGE || player.avatarUrl || '';
  }\n${p192Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p192 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p192'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p191' || (player.name && player.name.includes('配布') && (player.name.includes('ラインデルス') || player.name.includes('Reijnders')))) {
    return window.REIJNDERS_DIST_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p191' || (player.name && player.name.includes('配布') && (player.name.includes('ラインデルス') || player.name.includes('Reijnders')))) {
    return window.REIJNDERS_DIST_2026_IMAGE || player.avatarUrl || '';
  }\n${p192Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p192 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p192 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p192');
console.log('6. Verification of p192:', p192 ? p192.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.TONO_2026_IMAGE:', sandbox.window.TONO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== DAIYA TONO 2026 ADDED SUCCESSFULLY! ===');
