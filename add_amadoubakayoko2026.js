const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING AMADOU BAKAYOKO 2026 (p234) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\30d7f0d1-9473-434c-80bc-71d83c6d7758\\media__1786114750284.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'amadouBakayoko2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.AMADOU_BAKAYOKO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. amadouBakayoko2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p233Idx = mockCode.indexOf("id: 'p233'");
const altP233Idx = mockCode.indexOf('"id": "p233"');
const targetP233Idx = p233Idx !== -1 ? p233Idx : altP233Idx;

if (targetP233Idx === -1) {
  console.error("Could not find p233 in mockData.js!");
  process.exit(1);
}

const p233AvatarIdx = mockCode.indexOf("avatarUrl:", targetP233Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP233Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP233Idx);
const p233EndIdx = mockCode.indexOf("}", p233AvatarIdx);

mockCode = mockCode.substring(0, p233EndIdx + 1);

const amadouBakayoko2026Obj = `,
  {
    id: 'p234',
    name: 'アマドゥ・バカヨコ(2026)',
    readingName: 'あまどぅ・ばかよこ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'シエラレオーネ',
    policy: 'ムービング',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6312,
    maxOverall: 14551,
    baseStats: { shoot: 1140, pass: 976, dribble: 1120, defense: 941, physical: 1229, speed: 703 },
    detailStats: {
      shoot: { finishing: 388, power: 389, composure: 363 },
      pass: { shortPass: 319, longPass: 324, accuracy: 333 },
      dribble: { breakout: 347, keeping: 395, ballTouch: 378 },
      defense: { tackle: 321, interception: 319, marking: 301 },
      physical: { jumping: 447, contact: 407, stamina: 375 },
      speed: { running: 334, agility: 369 }
    },
    maxEnhanced: {
      overall: 14551,
      baseStats: { shoot: 2745, pass: 2509, dribble: 2701, defense: 2438, physical: 2810, speed: 1749 },
      detailStats: {
        shoot: { finishing: 923, power: 924, composure: 898 },
        pass: { shortPass: 830, longPass: 835, accuracy: 844 },
        dribble: { breakout: 870, keeping: 918, ballTouch: 913 },
        defense: { tackle: 820, interception: 818, marking: 800 },
        physical: { jumping: 970, contact: 942, stamina: 898 },
        speed: { running: 857, agility: 892 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'パワーヘッド', rank: '銀', description: '発動条件：途中出場　/　決定力・ジャンプUP' },
      { name: 'パワフルキッカー', rank: '銀', description: '発動条件：絶好調　/　キック力・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += amadouBakayoko2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p234 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('amadouBakayoko2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/amadouBakayoko2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p234Check = `  if (player.id === 'p234' || (player.name && (player.name.includes('アマドゥ・バカヨコ') || player.name.includes('バカヨコ') || player.name.includes('Amadou Bakayoko') || player.name.includes('Bakayoko')))) {\n    return window.AMADOU_BAKAYOKO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p234'")) {
    const marker = "if (player.id === 'p233'";
    const altMarker = 'if (player.id === "p233"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p234Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p234 avatar resolver.');
    } else {
      console.warn('Could not find p233 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p234'")) {
    const marker = "if (player.id === 'p233'";
    const altMarker = 'if (player.id === "p233"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p234Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p234 avatar resolver.');
    } else {
      console.warn('Could not find p233 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p234 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p234');
console.log('6. Verification of p234:', p234 ? p234.name : 'MISSING');
if (p234) {
  console.log('   Overall:', p234.overall, '| MaxOverall:', p234.maxOverall);
  console.log('   Policy:', p234.policy, '| PlayStyle:', p234.playStyle, p234.playStyleLevel);
  console.log('   Nationality:', p234.nationality, '| Position:', p234.mainPosition);
  console.log('   Skill:', p234.skill.name);
  console.log('   Abilities:', p234.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.AMADOU_BAKAYOKO_2026_IMAGE:', sandbox.window.AMADOU_BAKAYOKO_2026_IMAGE ? 'LOADED' : 'MISSING');
