const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING HISATSUGU ISHII 2026 (p208) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786030928453.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'ishiiHisatsugu2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.ISHII_HISATSUGU_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. ishiiHisatsugu2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p207Idx = mockCode.indexOf("id: 'p207'");
if (p207Idx === -1) {
  console.error("Could not find p207 in mockData.js!");
  process.exit(1);
}

const p207AvatarIdx = mockCode.indexOf("avatarUrl:", p207Idx);
const p207EndIdx = mockCode.indexOf("}", p207AvatarIdx);

mockCode = mockCode.substring(0, p207EndIdx + 1);

const ishiiHisatsugu2026Obj = `,
  {
    id: 'p208',
    name: '石井久継(2026)',
    readingName: 'いしいひさつぐ',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ワイドストライカーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6258,
    maxOverall: 14444,
    baseStats: { shoot: 1153, pass: 1041, dribble: 1188, defense: 774, physical: 1002, speed: 800 },
    detailStats: {
      shoot: { finishing: 398, power: 345, composure: 410 },
      pass: { shortPass: 366, longPass: 357, accuracy: 318 },
      dribble: { breakout: 398, keeping: 371, ballTouch: 419 },
      defense: { tackle: 244, interception: 270, marking: 260 },
      physical: { jumping: 269, contact: 350, stamina: 383 },
      speed: { running: 386, agility: 414 }
    },
    maxEnhanced: {
      overall: 14444,
      baseStats: { shoot: 2710, pass: 2610, dribble: 2781, defense: 2283, physical: 2547, speed: 1870 },
      detailStats: {
        shoot: { finishing: 921, power: 856, composure: 933 },
        pass: { shortPass: 889, longPass: 880, accuracy: 841 },
        dribble: { breakout: 933, keeping: 906, ballTouch: 942 },
        defense: { tackle: 755, interception: 769, marking: 759 },
        physical: { jumping: 780, contact: 861, stamina: 906 },
        speed: { running: 921, agility: 949 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '冷静なボールタッチ', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += ishiiHisatsugu2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p208 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('ishiiHisatsugu2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/ishiiHisatsugu2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p208Check = `  if (player.id === 'p208' || (player.name && (player.name.includes('石井久継') || (player.name.includes('石井') && player.name.includes('久継')) || player.name.includes('Hisatsugu Ishii') || player.name.includes('Ishii')))) {\n    return window.ISHII_HISATSUGU_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p208'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p207' || (player.name && (player.name.includes('倉田秋') || (player.name.includes('倉田') && player.name.includes('秋')) || player.name.includes('Shu Kurata') || player.name.includes('Kurata')))) {
    return window.KURATA_SHU_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p207' || (player.name && (player.name.includes('倉田秋') || (player.name.includes('倉田') && player.name.includes('秋')) || player.name.includes('Shu Kurata') || player.name.includes('Kurata')))) {
    return window.KURATA_SHU_2026_IMAGE || player.avatarUrl || '';
  }\n${p208Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p208 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p208'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p207' || (player.name && (player.name.includes('倉田秋') || (player.name.includes('倉田') && player.name.includes('秋')) || player.name.includes('Shu Kurata') || player.name.includes('Kurata')))) {
    return window.KURATA_SHU_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p207' || (player.name && (player.name.includes('倉田秋') || (player.name.includes('倉田') && player.name.includes('秋')) || player.name.includes('Shu Kurata') || player.name.includes('Kurata')))) {
    return window.KURATA_SHU_2026_IMAGE || player.avatarUrl || '';
  }\n${p208Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p208 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p208 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p208');
console.log('6. Verification of p208:', p208 ? p208.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.ISHII_HISATSUGU_2026_IMAGE:', sandbox.window.ISHII_HISATSUGU_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== HISATSUGU ISHII 2026 ADDED SUCCESSFULLY! ===');
