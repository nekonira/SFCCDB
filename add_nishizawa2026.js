const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KENTA NISHIZAWA 2026 (p181) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786024243925.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'nishizawa2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.NISHIZAWA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. nishizawa2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p180Idx = mockCode.indexOf("id: 'p180'");
if (p180Idx === -1) {
  console.error("Could not find p180 in mockData.js!");
  process.exit(1);
}

const p180AvatarIdx = mockCode.indexOf("avatarUrl:", p180Idx);
const p180EndIdx = mockCode.indexOf("}", p180AvatarIdx);

mockCode = mockCode.substring(0, p180EndIdx + 1);

const nishizawa2026Obj = `,
  {
    id: 'p181',
    name: '西澤健太(2026)',
    readingName: 'にしざわけんた',
    category: 'MF',
    mainPosition: 'OMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'セントラルAM',
    playStyleLevel: 'Ⅱ',
    overall: 6448,
    maxOverall: 14590,
    baseStats: { shoot: 1090, pass: 1174, dribble: 1204, defense: 1223, physical: 1144, speed: 820 },
    detailStats: {
      shoot: { finishing: 364, power: 378, composure: 348 },
      pass: { shortPass: 385, longPass: 396, accuracy: 393 },
      dribble: { breakout: 400, keeping: 401, ballTouch: 403 },
      defense: { tackle: 392, interception: 422, marking: 409 },
      physical: { jumping: 336, contact: 387, stamina: 421 },
      speed: { running: 397, agility: 423 }
    },
    maxEnhanced: {
      overall: 14590,
      baseStats: { shoot: 2635, pass: 2755, dribble: 2773, defense: 2768, physical: 2713, speed: 1854 },
      detailStats: {
        shoot: { finishing: 875, power: 889, composure: 871 },
        pass: { shortPass: 920, longPass: 919, accuracy: 916 },
        dribble: { breakout: 923, keeping: 924, ballTouch: 926 },
        defense: { tackle: 915, interception: 933, marking: 920 },
        physical: { jumping: 847, contact: 910, stamina: 956 },
        speed: { running: 908, agility: 946 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '安定したパスワーク', rank: '銅', description: '発動エリア：前左中右・中左中右　/　発動条件：AM・RW・LW・CFの選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '絶え間ないボールタッチ', rank: '銀', description: '発動条件：途中出場　/　ボールタッチ・スタミナUP' },
      { name: '俊敏なマーカー', rank: '銀', description: '発動条件：絶好調　/　パスカット・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += nishizawa2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p181 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('nishizawa2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/nishimura2026Image.js"></script>',
    '<script src="./src/data/nishimura2026Image.js"></script>\n  <script src="./src/data/nishizawa2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p181Check = `  if (player.id === 'p181' || (player.name && (player.name.includes('西澤健太') || player.name.includes('西澤') || player.name.includes('Kenta Nishizawa') || player.name.includes('Nishizawa')))) {\n    return window.NISHIZAWA_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p181'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p180' || (player.name && (player.name.includes('山根陸') || player.name.includes('山根') || player.name.includes('Riku Yamane') || player.name.includes('Yamane')))) {
    return window.YAMANE_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p180' || (player.name && (player.name.includes('山根陸') || player.name.includes('山根') || player.name.includes('Riku Yamane') || player.name.includes('Yamane')))) {
    return window.YAMANE_2026_IMAGE || player.avatarUrl || '';
  }\n${p181Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p181 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p181'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p180' || (player.name && (player.name.includes('山根陸') || player.name.includes('山根') || player.name.includes('Riku Yamane') || player.name.includes('Yamane')))) {
    return window.YAMANE_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p180' || (player.name && (player.name.includes('山根陸') || player.name.includes('山根') || player.name.includes('Riku Yamane') || player.name.includes('Yamane')))) {
    return window.YAMANE_2026_IMAGE || player.avatarUrl || '';
  }\n${p181Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p181 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p181 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p181');
console.log('6. Verification of p181:', p181 ? p181.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.NISHIZAWA_2026_IMAGE:', sandbox.window.NISHIZAWA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KENTA NISHIZAWA 2026 ADDED SUCCESSFULLY! ===');
