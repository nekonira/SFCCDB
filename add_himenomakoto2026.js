const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MAKOTO HIMENO 2026 (p202) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786029532282.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'himenoMakoto2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.HIMENO_MAKOTO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. himenoMakoto2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p201Idx = mockCode.indexOf("id: 'p201'");
if (p201Idx === -1) {
  console.error("Could not find p201 in mockData.js!");
  process.exit(1);
}

const p201AvatarIdx = mockCode.indexOf("avatarUrl:", p201Idx);
const p201EndIdx = mockCode.indexOf("}", p201AvatarIdx);

mockCode = mockCode.substring(0, p201EndIdx + 1);

const himenoMakoto2026Obj = `,
  {
    id: 'p202',
    name: '姫野誠(2026)',
    readingName: 'ひめのまこと',
    category: 'MF',
    mainPosition: 'LM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'サイドアタッカーLM',
    playStyleLevel: 'Ⅱ',
    overall: 6319,
    maxOverall: 14511,
    baseStats: { shoot: 1152, pass: 1110, dribble: 1223, defense: 1035, physical: 991, speed: 813 },
    detailStats: {
      shoot: { finishing: 393, power: 335, composure: 424 },
      pass: { shortPass: 362, longPass: 374, accuracy: 374 },
      dribble: { breakout: 428, keeping: 367, ballTouch: 428 },
      defense: { tackle: 342, interception: 351, marking: 342 },
      physical: { jumping: 298, contact: 331, stamina: 362 },
      speed: { running: 402, agility: 411 }
    },
    maxEnhanced: {
      overall: 14511,
      baseStats: { shoot: 2709, pass: 2679, dribble: 2816, defense: 2544, physical: 2536, speed: 1883 },
      detailStats: {
        shoot: { finishing: 916, power: 846, composure: 947 },
        pass: { shortPass: 885, longPass: 897, accuracy: 897 },
        dribble: { breakout: 963, keeping: 902, ballTouch: 951 },
        defense: { tackle: 853, interception: 850, marking: 841 },
        physical: { jumping: 809, contact: 842, stamina: 885 },
        speed: { running: 937, agility: 946 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
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

mockCode += himenoMakoto2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p202 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('himenoMakoto2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/himenoMakoto2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p202Check = `  if (player.id === 'p202' || (player.name && (player.name.includes('姫野誠') || player.name.includes('姫野') || player.name.includes('Makoto Himeno') || player.name.includes('Himeno')))) {\n    return window.HIMENO_MAKOTO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p202'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p201' || (player.name && (player.name.includes('佐藤龍之介') || (player.name.includes('佐藤') && player.name.includes('龍之介')) || player.name.includes('Ryunosuke Sato')))) {
    return window.SATO_RYUNOSUKE_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p201' || (player.name && (player.name.includes('佐藤龍之介') || (player.name.includes('佐藤') && player.name.includes('龍之介')) || player.name.includes('Ryunosuke Sato')))) {
    return window.SATO_RYUNOSUKE_2026_IMAGE || player.avatarUrl || '';
  }\n${p202Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p202 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p202'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p201' || (player.name && (player.name.includes('佐藤龍之介') || (player.name.includes('佐藤') && player.name.includes('龍之介')) || player.name.includes('Ryunosuke Sato')))) {
    return window.SATO_RYUNOSUKE_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p201' || (player.name && (player.name.includes('佐藤龍之介') || (player.name.includes('佐藤') && player.name.includes('龍之介')) || player.name.includes('Ryunosuke Sato')))) {
    return window.SATO_RYUNOSUKE_2026_IMAGE || player.avatarUrl || '';
  }\n${p202Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p202 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p202 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p202');
console.log('6. Verification of p202:', p202 ? p202.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.HIMENO_MAKOTO_2026_IMAGE:', sandbox.window.HIMENO_MAKOTO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== MAKOTO HIMENO 2026 ADDED SUCCESSFULLY! ===');
