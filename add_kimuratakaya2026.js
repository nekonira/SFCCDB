const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TAKAYA KIMURA 2026 (p196) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786028082993.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kimuraTakaya2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KIMURA_TAKAYA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kimuraTakaya2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p195Idx = mockCode.indexOf("id: 'p195'");
if (p195Idx === -1) {
  console.error("Could not find p195 in mockData.js!");
  process.exit(1);
}

const p195AvatarIdx = mockCode.indexOf("avatarUrl:", p195Idx);
const p195EndIdx = mockCode.indexOf("}", p195AvatarIdx);

mockCode = mockCode.substring(0, p195EndIdx + 1);

const kimuraTakaya2026Obj = `,
  {
    id: 'p196',
    name: '木村太哉(2026)',
    readingName: 'きむらたかや',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6457,
    maxOverall: 14548,
    baseStats: { shoot: 1101, pass: 1085, dribble: 1323, defense: 1138, physical: 1052, speed: 871 },
    detailStats: {
      shoot: { finishing: 375, power: 354, composure: 372 },
      pass: { shortPass: 351, longPass: 335, accuracy: 399 },
      dribble: { breakout: 441, keeping: 445, ballTouch: 437 },
      defense: { tackle: 393, interception: 376, marking: 369 },
      physical: { jumping: 320, contact: 337, stamina: 395 },
      speed: { running: 433, agility: 438 }
    },
    maxEnhanced: {
      overall: 14548,
      baseStats: { shoot: 2646, pass: 2666, dribble: 2892, defense: 2683, physical: 2621, speed: 1905 },
      detailStats: {
        shoot: { finishing: 886, power: 865, composure: 895 },
        pass: { shortPass: 886, longPass: 858, accuracy: 922 },
        dribble: { breakout: 964, keeping: 968, ballTouch: 960 },
        defense: { tackle: 916, interception: 887, marking: 880 },
        physical: { jumping: 831, contact: 860, stamina: 930 },
        speed: { running: 944, agility: 961 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' },
      { name: '冷静な突破', rank: '銀', description: '発動条件：絶好調　/　冷静さ・突破力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += kimuraTakaya2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p196 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kimuraTakaya2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/kimuraTakaya2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p196Check = `  if (player.id === 'p196' || (player.name && (player.name.includes('木村太哉') || (player.name.includes('木村') && player.name.includes('太哉')) || player.name.includes('Takaya Kimura') || player.name.includes('Kimura')))) {\n    return window.KIMURA_TAKAYA_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p196'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p195' || (player.name && (player.name.includes('名古新太郎') || player.name.includes('名古') || player.name.includes('Shintaro Nago') || player.name.includes('Nago')))) {
    return window.NAGO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p195' || (player.name && (player.name.includes('名古新太郎') || player.name.includes('名古') || player.name.includes('Shintaro Nago') || player.name.includes('Nago')))) {
    return window.NAGO_2026_IMAGE || player.avatarUrl || '';
  }\n${p196Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p196 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p196'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p195' || (player.name && (player.name.includes('名古新太郎') || player.name.includes('名古') || player.name.includes('Shintaro Nago') || player.name.includes('Nago')))) {
    return window.NAGO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p195' || (player.name && (player.name.includes('名古新太郎') || player.name.includes('名古') || player.name.includes('Shintaro Nago') || player.name.includes('Nago')))) {
    return window.NAGO_2026_IMAGE || player.avatarUrl || '';
  }\n${p196Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p196 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p196 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p196');
console.log('6. Verification of p196:', p196 ? p196.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KIMURA_TAKAYA_2026_IMAGE:', sandbox.window.KIMURA_TAKAYA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== TAKAYA KIMURA 2026 ADDED SUCCESSFULLY! ===');
