const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING ATSUKI TOJO 2026 (p189) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786025766266.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'tojo2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.TOJO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. tojo2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p188Idx = mockCode.indexOf("id: 'p188'");
if (p188Idx === -1) {
  console.error("Could not find p188 in mockData.js!");
  process.exit(1);
}

const p188AvatarIdx = mockCode.indexOf("avatarUrl:", p188Idx);
const p188EndIdx = mockCode.indexOf("}", p188AvatarIdx);

mockCode = mockCode.substring(0, p188EndIdx + 1);

const tojo2026Obj = `,
  {
    id: 'p189',
    name: '東條敦輝(2026)',
    readingName: 'とうじょうあつき',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 5930,
    maxOverall: 14092,
    baseStats: { shoot: 1056, pass: 1116, dribble: 1163, defense: 1118, physical: 960, speed: 777 },
    detailStats: {
      shoot: { finishing: 386, power: 305, composure: 365 },
      pass: { shortPass: 394, longPass: 367, accuracy: 355 },
      dribble: { breakout: 381, keeping: 379, ballTouch: 403 },
      defense: { tackle: 379, interception: 374, marking: 365 },
      physical: { jumping: 285, contact: 322, stamina: 353 },
      speed: { running: 370, agility: 407 }
    },
    maxEnhanced: {
      overall: 14092,
      baseStats: { shoot: 2601, pass: 2721, dribble: 2696, defense: 2699, physical: 2529, speed: 1799 },
      detailStats: {
        shoot: { finishing: 897, power: 816, composure: 888 },
        pass: { shortPass: 929, longPass: 902, accuracy: 890 },
        dribble: { breakout: 892, keeping: 890, ballTouch: 914 },
        defense: { tackle: 914, interception: 897, marking: 888 },
        physical: { jumping: 796, contact: 845, stamina: 888 },
        speed: { running: 881, agility: 918 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '意外性のあるミドルパス', rank: '銅', description: '発動エリア：中中・後左中右　/　発動条件：CF・AMの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '反撃のパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・タックルUP' },
      { name: '流れを切るロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・パスカットUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += tojo2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p189 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('tojo2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/tchouameniImage.js"></script>',
    '<script src="./src/data/tojo2026Image.js"></script>\n  <script src="./src/data/tchouameniImage.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p189Check = `  if (player.id === 'p189' || (player.name && (player.name.includes('東條敦輝') || player.name.includes('東條') || player.name.includes('Atsuki Tojo') || player.name.includes('Tojo')))) {\n    return window.TOJO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p189'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p188' || (player.name && (player.name.includes('山口大輝') || (player.name.includes('山口') && !player.name.includes('蛍')) || player.name.includes('Daiki Yamaguchi') || player.name.includes('Yamaguchi')))) {
    return window.YAMAGUCHI_DAIKI_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p188' || (player.name && (player.name.includes('山口大輝') || (player.name.includes('山口') && !player.name.includes('蛍')) || player.name.includes('Daiki Yamaguchi') || player.name.includes('Yamaguchi')))) {
    return window.YAMAGUCHI_DAIKI_2026_IMAGE || player.avatarUrl || '';
  }\n${p189Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p189 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p189'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p188' || (player.name && (player.name.includes('山口大輝') || (player.name.includes('山口') && !player.name.includes('蛍')) || player.name.includes('Daiki Yamaguchi') || player.name.includes('Yamaguchi')))) {
    return window.YAMAGUCHI_DAIKI_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p188' || (player.name && (player.name.includes('山口大輝') || (player.name.includes('山口') && !player.name.includes('蛍')) || player.name.includes('Daiki Yamaguchi') || player.name.includes('Yamaguchi')))) {
    return window.YAMAGUCHI_DAIKI_2026_IMAGE || player.avatarUrl || '';
  }\n${p189Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p189 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p189 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p189');
console.log('6. Verification of p189:', p189 ? p189.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.TOJO_2026_IMAGE:', sandbox.window.TOJO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== ATSUKI TOJO 2026 ADDED SUCCESSFULLY! ===');
