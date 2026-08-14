const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING DAIJU SASAKI 2026 (p193) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786027501415.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'sasaki2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SASAKI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. sasaki2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p192Idx = mockCode.indexOf("id: 'p192'");
if (p192Idx === -1) {
  console.error("Could not find p192 in mockData.js!");
  process.exit(1);
}

const p192AvatarIdx = mockCode.indexOf("avatarUrl:", p192Idx);
const p192EndIdx = mockCode.indexOf("}", p192AvatarIdx);

mockCode = mockCode.substring(0, p192EndIdx + 1);

const sasaki2026Obj = `,
  {
    id: 'p193',
    name: '佐々木大樹(2026)',
    readingName: 'ささきだいじゅ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6380,
    maxOverall: 14437,
    baseStats: { shoot: 1218, pass: 1139, dribble: 1237, defense: 1047, physical: 1238, speed: 811 },
    detailStats: {
      shoot: { finishing: 405, power: 411, composure: 402 },
      pass: { shortPass: 409, longPass: 381, accuracy: 349 },
      dribble: { breakout: 400, keeping: 428, ballTouch: 409 },
      defense: { tackle: 349, interception: 333, marking: 365 },
      physical: { jumping: 441, contact: 404, stamina: 393 },
      speed: { running: 403, agility: 408 }
    },
    maxEnhanced: {
      overall: 14437,
      baseStats: { shoot: 2763, pass: 2720, dribble: 2806, defense: 2592, physical: 2807, speed: 1845 },
      detailStats: {
        shoot: { finishing: 916, power: 922, composure: 925 },
        pass: { shortPass: 944, longPass: 904, accuracy: 872 },
        dribble: { breakout: 923, keeping: 951, ballTouch: 932 },
        defense: { tackle: 872, interception: 844, marking: 876 },
        physical: { jumping: 952, contact: 927, stamina: 928 },
        speed: { running: 914, agility: 931 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '敵陣を切り裂くパス', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：CFの位置に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '跳躍のパサー', rank: '銀', description: '発動条件：好調　/　ショートパス・ジャンプUP' },
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += sasaki2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p193 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('sasaki2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos',
    '<script src="./src/data/sasaki2026Image.js"></script>\n  <!-- 1. Player Photos'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p193Check = `  if (player.id === 'p193' || (player.name && (player.name.includes('佐々木大樹') || (player.name.includes('佐々木') && player.name.includes('大樹')) || player.name.includes('Daiju Sasaki') || player.name.includes('Sasaki')))) {\n    return window.SASAKI_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p193'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p192' || (player.name && (player.name.includes('遠野大弥') || player.name.includes('遠野') || player.name.includes('Daiya Tono') || player.name.includes('Tono')))) {
    return window.TONO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p192' || (player.name && (player.name.includes('遠野大弥') || player.name.includes('遠野') || player.name.includes('Daiya Tono') || player.name.includes('Tono')))) {
    return window.TONO_2026_IMAGE || player.avatarUrl || '';
  }\n${p193Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p193 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p193'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p192' || (player.name && (player.name.includes('遠野大弥') || player.name.includes('遠野') || player.name.includes('Daiya Tono') || player.name.includes('Tono')))) {
    return window.TONO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p192' || (player.name && (player.name.includes('遠野大弥') || player.name.includes('遠野') || player.name.includes('Daiya Tono') || player.name.includes('Tono')))) {
    return window.TONO_2026_IMAGE || player.avatarUrl || '';
  }\n${p193Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p193 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p193 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p193');
console.log('6. Verification of p193:', p193 ? p193.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SASAKI_2026_IMAGE:', sandbox.window.SASAKI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== DAIJU SASAKI 2026 ADDED SUCCESSFULLY! ===');
