const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YUKI MUTO 2026 (p246) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786116960329.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'muto2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.MUTO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. muto2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p245Idx = mockCode.indexOf("id: 'p245'");
const altP245Idx = mockCode.indexOf('"id": "p245"');
const targetP245Idx = p245Idx !== -1 ? p245Idx : altP245Idx;

if (targetP245Idx === -1) {
  console.error("Could not find p245 in mockData.js!");
  process.exit(1);
}

const p245AvatarIdx = mockCode.indexOf("avatarUrl:", targetP245Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP245Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP245Idx);
const p245EndIdx = mockCode.indexOf("}", p245AvatarIdx);

mockCode = mockCode.substring(0, p245EndIdx + 1);

const muto2026Obj = `,
  {
    id: 'p246',
    name: '武藤雄樹(2026)',
    readingName: 'むとう・ゆうき',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6152,
    maxOverall: 14356,
    baseStats: { shoot: 1143, pass: 1161, dribble: 1190, defense: 916, physical: 1086, speed: 806 },
    detailStats: {
      shoot: { finishing: 404, power: 334, composure: 405 },
      pass: { shortPass: 388, longPass: 386, accuracy: 387 },
      dribble: { breakout: 396, keeping: 391, ballTouch: 403 },
      defense: { tackle: 304, interception: 314, marking: 298 },
      physical: { jumping: 368, contact: 321, stamina: 397 },
      speed: { running: 392, agility: 414 }
    },
    maxEnhanced: {
      overall: 14356,
      baseStats: { shoot: 2748, pass: 2694, dribble: 2771, defense: 2413, physical: 2667, speed: 1852 },
      detailStats: {
        shoot: { finishing: 939, power: 869, composure: 940 },
        pass: { shortPass: 899, longPass: 897, accuracy: 898 },
        dribble: { breakout: 919, keeping: 914, ballTouch: 938 },
        defense: { tackle: 803, interception: 813, marking: 797 },
        physical: { jumping: 891, contact: 856, stamina: 920 },
        speed: { running: 915, agility: 937 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '冷静なボールタッチ', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' },
      { name: '不屈のドリブル突破', rank: '銀', description: '発動条件：絶好調　/　突破力・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += muto2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p246 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('muto2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/muto2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p246Check = `  if (player.id === 'p246' || (player.name && (player.name.includes('武藤雄樹') || (player.name.includes('武藤') && player.name.includes('雄樹')) || player.name.includes('Yuki Muto') || player.name.includes('Muto')))) {\n    return window.MUTO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p246'")) {
    const marker = "if (player.id === 'p245'";
    const altMarker = 'if (player.id === "p245"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p246Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p246 avatar resolver.');
    } else {
      console.warn('Could not find p245 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p246'")) {
    const marker = "if (player.id === 'p245'";
    const altMarker = 'if (player.id === "p245"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p246Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p246 avatar resolver.');
    } else {
      console.warn('Could not find p245 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p246 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p246');
console.log('6. Verification of p246:', p246 ? p246.name : 'MISSING');
if (p246) {
  console.log('   Overall:', p246.overall, '| MaxOverall:', p246.maxOverall);
  console.log('   Policy:', p246.policy, '| PlayStyle:', p246.playStyle, p246.playStyleLevel);
  console.log('   Nationality:', p246.nationality, '| Position:', p246.mainPosition);
  console.log('   Skill:', p246.skill.name);
  console.log('   Abilities:', p246.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.MUTO_2026_IMAGE:', sandbox.window.MUTO_2026_IMAGE ? 'LOADED' : 'MISSING');
