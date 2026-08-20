const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING HIROSHI KIYOTAKE 2026 (p185) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786025017137.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kiyotake2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KIYOTAKE_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kiyotake2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p184Idx = mockCode.indexOf("id: 'p184'");
if (p184Idx === -1) {
  console.error("Could not find p184 in mockData.js!");
  process.exit(1);
}

const p184AvatarIdx = mockCode.indexOf("avatarUrl:", p184Idx);
const p184EndIdx = mockCode.indexOf("}", p184AvatarIdx);

mockCode = mockCode.substring(0, p184EndIdx + 1);

const kiyotake2026Obj = `,
  {
    id: 'p185',
    name: '清武弘嗣(2026)',
    readingName: 'きよたけひろし',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 6502,
    maxOverall: 14690,
    baseStats: { shoot: 1150, pass: 1296, dribble: 1234, defense: 895, physical: 1126, speed: 745 },
    detailStats: {
      shoot: { finishing: 379, power: 388, composure: 383 },
      pass: { shortPass: 434, longPass: 443, accuracy: 419 },
      dribble: { breakout: 394, keeping: 405, ballTouch: 435 },
      defense: { tackle: 301, interception: 303, marking: 291 },
      physical: { jumping: 335, contact: 364, stamina: 427 },
      speed: { running: 350, agility: 395 }
    },
    maxEnhanced: {
      overall: 14690,
      baseStats: { shoot: 2695, pass: 2901, dribble: 2767, defense: 2476, physical: 2695, speed: 1767 },
      detailStats: {
        shoot: { finishing: 890, power: 899, composure: 906 },
        pass: { shortPass: 969, longPass: 978, accuracy: 954 },
        dribble: { breakout: 905, keeping: 916, ballTouch: 946 },
        defense: { tackle: 836, interception: 826, marking: 814 },
        physical: { jumping: 846, contact: 887, stamina: 962 },
        speed: { running: 861, agility: 906 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 2, throughPass: 1, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'ファストフィード', rank: '銅', description: '発動エリア：中中・後左中右　/　発動条件：CFの位置に居る選手へのロングパス時　/　ロングパス・キック精度UP　/　成功時に受け手のトラップ発生確率UP' },
    abilities: [
      { name: '高性能ロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・キック精度UP' },
      { name: '不屈のパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += kiyotake2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p185 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kiyotake2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/kimImage.js"></script>',
    '<script src="./src/data/kiyotake2026Image.js"></script>\n  <script src="./src/data/kimImage.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p185Check = `  if (player.id === 'p185' || (player.name && (player.name.includes('清武弘嗣') || player.name.includes('清武') || player.name.includes('Hiroshi Kiyotake') || player.name.includes('Kiyotake')))) {\n    return window.KIYOTAKE_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p185'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p184' || (player.name && (player.name.includes('マテウス・ブエノ') || player.name.includes('ブエノ') || player.name.includes('Matheus Bueno') || player.name.includes('Bueno')))) {
    return window.MATHEUS_BUENO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p184' || (player.name && (player.name.includes('マテウス・ブエノ') || player.name.includes('ブエノ') || player.name.includes('Matheus Bueno') || player.name.includes('Bueno')))) {
    return window.MATHEUS_BUENO_2026_IMAGE || player.avatarUrl || '';
  }\n${p185Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p185 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p185'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p184' || (player.name && (player.name.includes('マテウス・ブエノ') || player.name.includes('ブエノ') || player.name.includes('Matheus Bueno') || player.name.includes('Bueno')))) {
    return window.MATHEUS_BUENO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p184' || (player.name && (player.name.includes('マテウス・ブエノ') || player.name.includes('ブエノ') || player.name.includes('Matheus Bueno') || player.name.includes('Bueno')))) {
    return window.MATHEUS_BUENO_2026_IMAGE || player.avatarUrl || '';
  }\n${p185Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p185 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p185 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p185');
console.log('6. Verification of p185:', p185 ? p185.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KIYOTAKE_2026_IMAGE:', sandbox.window.KIYOTAKE_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== HIROSHI KIYOTAKE 2026 ADDED SUCCESSFULLY! ===');
