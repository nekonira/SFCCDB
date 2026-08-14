const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING NORMAN CAMPBELL 2026 (p204) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786029910279.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'normanCampbell2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.NORMAN_CAMPBELL_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. normanCampbell2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p203Idx = mockCode.indexOf("id: 'p203'");
if (p203Idx === -1) {
  console.error("Could not find p203 in mockData.js!");
  process.exit(1);
}

const p203AvatarIdx = mockCode.indexOf("avatarUrl:", p203Idx);
const p203EndIdx = mockCode.indexOf("}", p203AvatarIdx);

mockCode = mockCode.substring(0, p203EndIdx + 1);

const normanCampbell2026Obj = `,
  {
    id: 'p204',
    name: 'ノーマン・キャンベル(2026)',
    readingName: 'のーまんきゃんべる',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ジャマイカ',
    policy: 'リアクション',
    playStyle: 'サイドアタッカーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6379,
    maxOverall: 14585,
    baseStats: { shoot: 1161, pass: 985, dribble: 1235, defense: 862, physical: 934, speed: 880 },
    detailStats: {
      shoot: { finishing: 392, power: 374, composure: 395 },
      pass: { shortPass: 331, longPass: 323, accuracy: 331 },
      dribble: { breakout: 429, keeping: 404, ballTouch: 402 },
      defense: { tackle: 277, interception: 298, marking: 287 },
      physical: { jumping: 319, contact: 288, stamina: 327 },
      speed: { running: 465, agility: 415 }
    },
    maxEnhanced: {
      overall: 14585,
      baseStats: { shoot: 2718, pass: 2554, dribble: 2828, defense: 2371, physical: 2479, speed: 1950 },
      detailStats: {
        shoot: { finishing: 915, power: 885, composure: 918 },
        pass: { shortPass: 854, longPass: 846, accuracy: 854 },
        dribble: { breakout: 964, keeping: 939, ballTouch: 925 },
        defense: { tackle: 788, interception: 797, marking: 786 },
        physical: { jumping: 830, contact: 799, stamina: 850 },
        speed: { running: 1000, agility: 950 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'スピードランナー', rank: '銀', description: '圧巻のスピードでサイドを駆け抜け相手ディフェンスを置き去りにする' },
      { name: '失わないドリブラー', rank: '銀', description: '発動条件：絶好調　/　突破力・キープ力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += normanCampbell2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p204 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('normanCampbell2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/normanCampbell2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p204Check = `  if (player.id === 'p204' || (player.name && (player.name.includes('ノーマン・キャンベル') || player.name.includes('キャンベル') || player.name.includes('Norman Campbell') || player.name.includes('Campbell')))) {\n    return window.NORMAN_CAMPBELL_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p204'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p203' || (player.name && (player.name.includes('加藤千尋') || player.name.includes('加藤') || player.name.includes('Chihiro Kato') || player.name.includes('Kato')))) {
    return window.KATO_CHIHIRO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p203' || (player.name && (player.name.includes('加藤千尋') || player.name.includes('加藤') || player.name.includes('Chihiro Kato') || player.name.includes('Kato')))) {
    return window.KATO_CHIHIRO_2026_IMAGE || player.avatarUrl || '';
  }\n${p204Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p204 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p204'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p203' || (player.name && (player.name.includes('加藤千尋') || player.name.includes('加藤') || player.name.includes('Chihiro Kato') || player.name.includes('Kato')))) {
    return window.KATO_CHIHIRO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p203' || (player.name && (player.name.includes('加藤千尋') || player.name.includes('加藤') || player.name.includes('Chihiro Kato') || player.name.includes('Kato')))) {
    return window.KATO_CHIHIRO_2026_IMAGE || player.avatarUrl || '';
  }\n${p204Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p204 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p204 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p204');
console.log('6. Verification of p204:', p204 ? p204.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.NORMAN_CAMPBELL_2026_IMAGE:', sandbox.window.NORMAN_CAMPBELL_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== NORMAN CAMPBELL 2026 ADDED SUCCESSFULLY! ===');
