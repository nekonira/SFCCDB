const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING GAKU SHIBASAKI 2026 (p183) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786024634710.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'shibasaki2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SHIBASAKI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. shibasaki2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p182Idx = mockCode.indexOf("id: 'p182'");
if (p182Idx === -1) {
  console.error("Could not find p182 in mockData.js!");
  process.exit(1);
}

const p182AvatarIdx = mockCode.indexOf("avatarUrl:", p182Idx);
const p182EndIdx = mockCode.indexOf("}", p182AvatarIdx);

mockCode = mockCode.substring(0, p182EndIdx + 1);

const shibasaki2026Obj = `,
  {
    id: 'p183',
    name: '柴崎岳(2026)',
    readingName: 'しばさきがく',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 6489,
    maxOverall: 14651,
    baseStats: { shoot: 1061, pass: 1306, dribble: 1335, defense: 1098, physical: 1040, speed: 776 },
    detailStats: {
      shoot: { finishing: 344, power: 356, composure: 361 },
      pass: { shortPass: 443, longPass: 443, accuracy: 420 },
      dribble: { breakout: 419, keeping: 452, ballTouch: 464 },
      defense: { tackle: 341, interception: 380, marking: 377 },
      physical: { jumping: 353, contact: 314, stamina: 373 },
      speed: { running: 358, agility: 418 }
    },
    maxEnhanced: {
      overall: 14651,
      baseStats: { shoot: 2606, pass: 2911, dribble: 2868, defense: 2679, physical: 2609, speed: 1798 },
      detailStats: {
        shoot: { finishing: 855, power: 867, composure: 884 },
        pass: { shortPass: 978, longPass: 978, accuracy: 955 },
        dribble: { breakout: 930, keeping: 963, ballTouch: 975 },
        defense: { tackle: 876, interception: 903, marking: 900 },
        physical: { jumping: 864, contact: 837, stamina: 908 },
        speed: { running: 869, agility: 929 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '楔のパス', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：AM・CFの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: 'シルクタッチ', rank: '銀', description: '発動条件：好調　/　ショートパス・ボールタッチUP' },
      { name: '切り開くキッカー', rank: '銀', description: '発動条件：好調　/　キック精度・突破力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += shibasaki2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p183 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('shibasaki2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/shiotani2026Image.js"></script>',
    '<script src="./src/data/shibasaki2026Image.js"></script>\n  <script src="./src/data/shiotani2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p183Check = `  if (player.id === 'p183' || (player.name && (player.name.includes('柴崎岳') || player.name.includes('柴崎') || player.name.includes('Gaku Shibasaki') || player.name.includes('Shibasaki')))) {\n    return window.SHIBASAKI_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p183'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p182' || (player.name && (player.name.includes('イ・ヒギュン') || player.name.includes('ヒギュン') || player.name.includes('Lee Hui-Gyun') || player.name.includes('Hui-Gyun')))) {
    return window.LEE_HUI_GYUN_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p182' || (player.name && (player.name.includes('イ・ヒギュン') || player.name.includes('ヒギュン') || player.name.includes('Lee Hui-Gyun') || player.name.includes('Hui-Gyun')))) {
    return window.LEE_HUI_GYUN_2026_IMAGE || player.avatarUrl || '';
  }\n${p183Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p183 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p183'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p182' || (player.name && (player.name.includes('イ・ヒギュン') || player.name.includes('ヒギュン') || player.name.includes('Lee Hui-Gyun') || player.name.includes('Hui-Gyun')))) {
    return window.LEE_HUI_GYUN_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p182' || (player.name && (player.name.includes('イ・ヒギュン') || player.name.includes('ヒギュン') || player.name.includes('Lee Hui-Gyun') || player.name.includes('Hui-Gyun')))) {
    return window.LEE_HUI_GYUN_2026_IMAGE || player.avatarUrl || '';
  }\n${p183Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p183 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p183 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p183');
console.log('6. Verification of p183:', p183 ? p183.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SHIBASAKI_2026_IMAGE:', sandbox.window.SHIBASAKI_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== GAKU SHIBASAKI 2026 ADDED SUCCESSFULLY! ===');
