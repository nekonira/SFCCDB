const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING DAICHI ISHIKAWA 2026 (p244) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786116530752.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'ishikawaDaichi2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.ISHIKAWA_DAICHI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. ishikawaDaichi2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p243Idx = mockCode.indexOf("id: 'p243'");
const altP243Idx = mockCode.indexOf('"id": "p243"');
const targetP243Idx = p243Idx !== -1 ? p243Idx : altP243Idx;

if (targetP243Idx === -1) {
  console.error("Could not find p243 in mockData.js!");
  process.exit(1);
}

const p243AvatarIdx = mockCode.indexOf("avatarUrl:", targetP243Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP243Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP243Idx);
const p243EndIdx = mockCode.indexOf("}", p243AvatarIdx);

mockCode = mockCode.substring(0, p243EndIdx + 1);

const ishikawaDaichi2026Obj = `,
  {
    id: 'p244',
    name: '石川大地(2026)',
    readingName: 'いしかわ・だいち',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6331,
    maxOverall: 14556,
    baseStats: { shoot: 1216, pass: 1101, dribble: 1124, defense: 983, physical: 1100, speed: 794 },
    detailStats: {
      shoot: { finishing: 418, power: 372, composure: 426 },
      pass: { shortPass: 378, longPass: 373, accuracy: 350 },
      dribble: { breakout: 364, keeping: 364, ballTouch: 396 },
      defense: { tackle: 339, interception: 335, marking: 309 },
      physical: { jumping: 381, contact: 345, stamina: 374 },
      speed: { running: 386, agility: 408 }
    },
    maxEnhanced: {
      overall: 14556,
      baseStats: { shoot: 2821, pass: 2634, dribble: 2705, defense: 2480, physical: 2681, speed: 1840 },
      detailStats: {
        shoot: { finishing: 953, power: 907, composure: 961 },
        pass: { shortPass: 889, longPass: 884, accuracy: 861 },
        dribble: { breakout: 887, keeping: 887, ballTouch: 931 },
        defense: { tackle: 838, interception: 834, marking: 808 },
        physical: { jumping: 904, contact: 880, stamina: 897 },
        speed: { running: 909, agility: 931 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '冷静なボールタッチ', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' },
      { name: 'ランニングキッカー', rank: '銀', description: '発動条件：絶好調　/　キック力・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += ishikawaDaichi2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p244 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('ishikawaDaichi2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/ishikawaDaichi2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p244Check = `  if (player.id === 'p244' || (player.name && (player.name.includes('石川大地') || (player.name.includes('石川') && player.name.includes('大地')) || player.name.includes('Daichi Ishikawa') || player.name.includes('Ishikawa')))) {\n    return window.ISHIKAWA_DAICHI_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p244'")) {
    const marker = "if (player.id === 'p243'";
    const altMarker = 'if (player.id === "p243"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p244Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p244 avatar resolver.');
    } else {
      console.warn('Could not find p243 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p244'")) {
    const marker = "if (player.id === 'p243'";
    const altMarker = 'if (player.id === "p243"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p244Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p244 avatar resolver.');
    } else {
      console.warn('Could not find p243 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p244 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p244');
console.log('6. Verification of p244:', p244 ? p244.name : 'MISSING');
if (p244) {
  console.log('   Overall:', p244.overall, '| MaxOverall:', p244.maxOverall);
  console.log('   Policy:', p244.policy, '| PlayStyle:', p244.playStyle, p244.playStyleLevel);
  console.log('   Nationality:', p244.nationality, '| Position:', p244.mainPosition);
  console.log('   Skill:', p244.skill.name);
  console.log('   Abilities:', p244.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.ISHIKAWA_DAICHI_2026_IMAGE:', sandbox.window.ISHIKAWA_DAICHI_2026_IMAGE ? 'LOADED' : 'MISSING');
