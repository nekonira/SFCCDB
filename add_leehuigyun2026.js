const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING LEE HUI-GYUN 2026 (p182) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786024387004.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'leeHuiGyun2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.LEE_HUI_GYUN_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. leeHuiGyun2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p181Idx = mockCode.indexOf("id: 'p181'");
if (p181Idx === -1) {
  console.error("Could not find p181 in mockData.js!");
  process.exit(1);
}

const p181AvatarIdx = mockCode.indexOf("avatarUrl:", p181Idx);
const p181EndIdx = mockCode.indexOf("}", p181AvatarIdx);

mockCode = mockCode.substring(0, p181EndIdx + 1);

const leeHuiGyun2026Obj = `,
  {
    id: 'p182',
    name: 'イ・ヒギュン(2026)',
    readingName: 'いひぎゅん',
    category: 'MF',
    mainPosition: 'OMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'ポゼッション',
    playStyle: 'セントラルAM',
    playStyleLevel: 'Ⅱ',
    overall: 6169,
    maxOverall: 14271,
    baseStats: { shoot: 1107, pass: 1179, dribble: 1167, defense: 1129, physical: 1143, speed: 751 },
    detailStats: {
      shoot: { finishing: 352, power: 410, composure: 345 },
      pass: { shortPass: 393, longPass: 397, accuracy: 389 },
      dribble: { breakout: 393, keeping: 383, ballTouch: 391 },
      defense: { tackle: 348, interception: 394, marking: 387 },
      physical: { jumping: 353, contact: 381, stamina: 409 },
      speed: { running: 375, agility: 376 }
    },
    maxEnhanced: {
      overall: 14271,
      baseStats: { shoot: 2652, pass: 2760, dribble: 2736, defense: 2674, physical: 2712, speed: 1785 },
      detailStats: {
        shoot: { finishing: 863, power: 921, composure: 868 },
        pass: { shortPass: 928, longPass: 920, accuracy: 912 },
        dribble: { breakout: 916, keeping: 906, ballTouch: 914 },
        defense: { tackle: 871, interception: 905, marking: 898 },
        physical: { jumping: 864, contact: 904, stamina: 944 },
        speed: { running: 886, agility: 899 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '操舵のパス', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：前中・中中に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　ダイレクトショートパス成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '走り切るロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・スタミナUP' },
      { name: '突き刺すパス', rank: '銀', description: '発動条件：途中出場　/　キック力・ショートパスUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += leeHuiGyun2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p182 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('leeHuiGyun2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/leeMyungJaeImage.js"></script>',
    '<script src="./src/data/leeHuiGyun2026Image.js"></script>\n  <script src="./src/data/leeMyungJaeImage.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p182Check = `  if (player.id === 'p182' || (player.name && (player.name.includes('イ・ヒギュン') || player.name.includes('ヒギュン') || player.name.includes('Lee Hui-Gyun') || player.name.includes('Hui-Gyun')))) {\n    return window.LEE_HUI_GYUN_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p182'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p181' || (player.name && (player.name.includes('西澤健太') || player.name.includes('西澤') || player.name.includes('Kenta Nishizawa') || player.name.includes('Nishizawa')))) {
    return window.NISHIZAWA_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p181' || (player.name && (player.name.includes('西澤健太') || player.name.includes('西澤') || player.name.includes('Kenta Nishizawa') || player.name.includes('Nishizawa')))) {
    return window.NISHIZAWA_2026_IMAGE || player.avatarUrl || '';
  }\n${p182Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p182 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p182'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p181' || (player.name && (player.name.includes('西澤健太') || player.name.includes('西澤') || player.name.includes('Kenta Nishizawa') || player.name.includes('Nishizawa')))) {
    return window.NISHIZAWA_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p181' || (player.name && (player.name.includes('西澤健太') || player.name.includes('西澤') || player.name.includes('Kenta Nishizawa') || player.name.includes('Nishizawa')))) {
    return window.NISHIZAWA_2026_IMAGE || player.avatarUrl || '';
  }\n${p182Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p182 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p182 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p182');
console.log('6. Verification of p182:', p182 ? p182.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.LEE_HUI_GYUN_2026_IMAGE:', sandbox.window.LEE_HUI_GYUN_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== LEE HUI-GYUN 2026 ADDED SUCCESSFULLY! ===');
