const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING SHU KURATA 2026 (p207) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786030707850.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kurataShu2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KURATA_SHU_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kurataShu2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p206Idx = mockCode.indexOf("id: 'p206'");
if (p206Idx === -1) {
  console.error("Could not find p206 in mockData.js!");
  process.exit(1);
}

const p206AvatarIdx = mockCode.indexOf("avatarUrl:", p206Idx);
const p206EndIdx = mockCode.indexOf("}", p206AvatarIdx);

mockCode = mockCode.substring(0, p206EndIdx + 1);

const kurataShu2026Obj = `,
  {
    id: 'p207',
    name: '倉田秋(2026)',
    readingName: 'くらたしゅう',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ワイドストライカーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6453,
    maxOverall: 14648,
    baseStats: { shoot: 1220, pass: 1172, dribble: 1225, defense: 924, physical: 1005, speed: 774 },
    detailStats: {
      shoot: { finishing: 407, power: 375, composure: 438 },
      pass: { shortPass: 392, longPass: 375, accuracy: 405 },
      dribble: { breakout: 409, keeping: 386, ballTouch: 430 },
      defense: { tackle: 295, interception: 303, marking: 326 },
      physical: { jumping: 329, contact: 281, stamina: 395 },
      speed: { running: 364, agility: 410 }
    },
    maxEnhanced: {
      overall: 14648,
      baseStats: { shoot: 2777, pass: 2741, dribble: 2818, defense: 2433, physical: 2550, speed: 1844 },
      detailStats: {
        shoot: { finishing: 930, power: 886, composure: 961 },
        pass: { shortPass: 915, longPass: 898, accuracy: 928 },
        dribble: { breakout: 944, keeping: 921, ballTouch: 953 },
        defense: { tackle: 806, interception: 802, marking: 825 },
        physical: { jumping: 840, contact: 792, stamina: 918 },
        speed: { running: 899, agility: 945 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '冷静な突破', rank: '銀', description: '発動条件：絶好調　/　冷静さ・突破力UP' },
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += kurataShu2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p207 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kurataShu2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/kurataShu2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p207Check = `  if (player.id === 'p207' || (player.name && (player.name.includes('倉田秋') || (player.name.includes('倉田') && player.name.includes('秋')) || player.name.includes('Shu Kurata') || player.name.includes('Kurata')))) {\n    return window.KURATA_SHU_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p207'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p206' || (player.name && player.name.includes('2026') && (player.name.includes('相馬勇紀') || player.name.includes('相馬') || player.name.includes('Yuki Soma') || player.name.includes('Soma')))) {
    return window.SOMA_YUKI_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p206' || (player.name && player.name.includes('2026') && (player.name.includes('相馬勇紀') || player.name.includes('相馬') || player.name.includes('Yuki Soma') || player.name.includes('Soma')))) {
    return window.SOMA_YUKI_2026_IMAGE || player.avatarUrl || '';
  }\n${p207Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p207 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p207'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p206' || (player.name && player.name.includes('2026') && (player.name.includes('相馬勇紀') || player.name.includes('相馬') || player.name.includes('Yuki Soma') || player.name.includes('Soma')))) {
    return window.SOMA_YUKI_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p206' || (player.name && player.name.includes('2026') && (player.name.includes('相馬勇紀') || player.name.includes('相馬') || player.name.includes('Yuki Soma') || player.name.includes('Soma')))) {
    return window.SOMA_YUKI_2026_IMAGE || player.avatarUrl || '';
  }\n${p207Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p207 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p207 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p207');
console.log('6. Verification of p207:', p207 ? p207.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KURATA_SHU_2026_IMAGE:', sandbox.window.KURATA_SHU_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== SHU KURATA 2026 ADDED SUCCESSFULLY! ===');
