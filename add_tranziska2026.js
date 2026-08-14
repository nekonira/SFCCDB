const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING JAKOB TRANZISKA 2026 (p255) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786118543897.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'tranziska2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.TRANZISKA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. tranziska2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p254Idx = mockCode.indexOf("id: 'p254'");
const altP254Idx = mockCode.indexOf('"id": "p254"');
const targetP254Idx = p254Idx !== -1 ? p254Idx : altP254Idx;

if (targetP254Idx === -1) {
  console.error("Could not find p254 in mockData.js!");
  process.exit(1);
}

const p254AvatarIdx = mockCode.indexOf("avatarUrl:", targetP254Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP254Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP254Idx);
const p254EndIdx = mockCode.indexOf("}", p254AvatarIdx);

mockCode = mockCode.substring(0, p254EndIdx + 1);

const tranziska2026Obj = `,
  {
    id: 'p255',
    name: 'ヤコブ・トランジスカ(2026)',
    readingName: 'やこぶ・とらんじすか',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ドイツ',
    policy: 'ムービング',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6179,
    maxOverall: 14385,
    baseStats: { shoot: 1146, pass: 1047, dribble: 1150, defense: 828, physical: 1213, speed: 809 },
    detailStats: {
      shoot: { finishing: 391, power: 378, composure: 377 },
      pass: { shortPass: 353, longPass: 352, accuracy: 342 },
      dribble: { breakout: 392, keeping: 388, ballTouch: 370 },
      defense: { tackle: 288, interception: 278, marking: 262 },
      physical: { jumping: 433, contact: 358, stamina: 422 },
      speed: { running: 405, agility: 404 }
    },
    maxEnhanced: {
      overall: 14385,
      baseStats: { shoot: 2751, pass: 2580, dribble: 2731, defense: 2325, physical: 2794, speed: 1855 },
      detailStats: {
        shoot: { finishing: 926, power: 913, composure: 912 },
        pass: { shortPass: 864, longPass: 863, accuracy: 853 },
        dribble: { breakout: 915, keeping: 911, ballTouch: 905 },
        defense: { tackle: 787, interception: 777, marking: 761 },
        physical: { jumping: 956, contact: 893, stamina: 945 },
        speed: { running: 928, agility: 927 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ランニングジャンパー', rank: '銀', description: '発動条件：絶好調　/　ジャンプ・走力UP' },
      { name: '強引なフィニッシュ', rank: '銀', description: '発動条件：途中出場　/　決定力・突破力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += tranziska2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p255 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('tranziska2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/tranziska2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p255Check = `  if (player.id === 'p255' || (player.name && (player.name.includes('ヤコブ・トランジスカ') || player.name.includes('トランジスカ') || player.name.includes('Jakob Tranziska') || player.name.includes('Tranziska')))) {\n    return window.TRANZISKA_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p255'")) {
    const marker = "if (player.id === 'p254'";
    const altMarker = 'if (player.id === "p254"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p255Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p255 avatar resolver.');
    } else {
      console.warn('Could not find p254 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p255'")) {
    const marker = "if (player.id === 'p254'";
    const altMarker = 'if (player.id === "p254"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p255Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p255 avatar resolver.');
    } else {
      console.warn('Could not find p254 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p255 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p255');
console.log('6. Verification of p255:', p255 ? p255.name : 'MISSING');
if (p255) {
  console.log('   Overall:', p255.overall, '| MaxOverall:', p255.maxOverall);
  console.log('   Policy:', p255.policy, '| PlayStyle:', p255.playStyle, p255.playStyleLevel);
  console.log('   Nationality:', p255.nationality, '| Position:', p255.mainPosition);
  console.log('   Skill:', p255.skill.name);
  console.log('   Abilities:', p255.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.TRANZISKA_2026_IMAGE:', sandbox.window.TRANZISKA_2026_IMAGE ? 'LOADED' : 'MISSING');
