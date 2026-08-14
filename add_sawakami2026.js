const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING RYUJI SAWAKAMI 2026 (p239) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786115669656.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'sawakami2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SAWAKAMI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. sawakami2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p238Idx = mockCode.indexOf("id: 'p238'");
const altP238Idx = mockCode.indexOf('"id": "p238"');
const targetP238Idx = p238Idx !== -1 ? p238Idx : altP238Idx;

if (targetP238Idx === -1) {
  console.error("Could not find p238 in mockData.js!");
  process.exit(1);
}

const p238AvatarIdx = mockCode.indexOf("avatarUrl:", targetP238Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP238Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP238Idx);
const p238EndIdx = mockCode.indexOf("}", p238AvatarIdx);

mockCode = mockCode.substring(0, p238EndIdx + 1);

const sawakami2026Obj = `,
  {
    id: 'p239',
    name: '澤上竜二(2026)',
    readingName: 'さわかみ・りゅうじ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6200,
    maxOverall: 14425,
    baseStats: { shoot: 1176, pass: 932, dribble: 1122, defense: 908, physical: 1161, speed: 749 },
    detailStats: {
      shoot: { finishing: 395, power: 386, composure: 395 },
      pass: { shortPass: 313, longPass: 293, accuracy: 326 },
      dribble: { breakout: 349, keeping: 398, ballTouch: 375 },
      defense: { tackle: 308, interception: 307, marking: 293 },
      physical: { jumping: 416, contact: 395, stamina: 350 },
      speed: { running: 374, agility: 375 }
    },
    maxEnhanced: {
      overall: 14425,
      baseStats: { shoot: 2781, pass: 2465, dribble: 2703, defense: 2405, physical: 2742, speed: 1795 },
      detailStats: {
        shoot: { finishing: 930, power: 921, composure: 930 },
        pass: { shortPass: 824, longPass: 804, accuracy: 837 },
        dribble: { breakout: 872, keeping: 921, ballTouch: 910 },
        defense: { tackle: 807, interception: 806, marking: 792 },
        physical: { jumping: 939, contact: 930, stamina: 873 },
        speed: { running: 897, agility: 898 }
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
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += sawakami2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p239 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('sawakami2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/sawakami2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p239Check = `  if (player.id === 'p239' || (player.name && (player.name.includes('澤上竜二') || player.name.includes('澤上') || player.name.includes('Ryuji Sawakami') || player.name.includes('Sawakami')))) {\n    return window.SAWAKAMI_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p239'")) {
    const marker = "if (player.id === 'p238'";
    const altMarker = 'if (player.id === "p238"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p239Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p239 avatar resolver.');
    } else {
      console.warn('Could not find p238 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p239'")) {
    const marker = "if (player.id === 'p238'";
    const altMarker = 'if (player.id === "p238"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p239Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p239 avatar resolver.');
    } else {
      console.warn('Could not find p238 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p239 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p239');
console.log('6. Verification of p239:', p239 ? p239.name : 'MISSING');
if (p239) {
  console.log('   Overall:', p239.overall, '| MaxOverall:', p239.maxOverall);
  console.log('   Policy:', p239.policy, '| PlayStyle:', p239.playStyle, p239.playStyleLevel);
  console.log('   Nationality:', p239.nationality, '| Position:', p239.mainPosition);
  console.log('   Skill:', p239.skill.name);
  console.log('   Abilities:', p239.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SAWAKAMI_2026_IMAGE:', sandbox.window.SAWAKAMI_2026_IMAGE ? 'LOADED' : 'MISSING');
