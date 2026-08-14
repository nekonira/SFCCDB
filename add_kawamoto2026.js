const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING RIYO KAWAMOTO 2026 (p248) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786117369180.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kawamoto2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KAWAMOTO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kawamoto2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p247Idx = mockCode.indexOf("id: 'p247'");
const altP247Idx = mockCode.indexOf('"id": "p247"');
const targetP247Idx = p247Idx !== -1 ? p247Idx : altP247Idx;

if (targetP247Idx === -1) {
  console.error("Could not find p247 in mockData.js!");
  process.exit(1);
}

const p247AvatarIdx = mockCode.indexOf("avatarUrl:", targetP247Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP247Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP247Idx);
const p247EndIdx = mockCode.indexOf("}", p247AvatarIdx);

mockCode = mockCode.substring(0, p247EndIdx + 1);

const kawamoto2026Obj = `,
  {
    id: 'p248',
    name: '川本梨誉(2026)',
    readingName: 'かわもと・りよ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6189,
    maxOverall: 14399,
    baseStats: { shoot: 1144, pass: 1088, dribble: 1174, defense: 990, physical: 1041, speed: 821 },
    detailStats: {
      shoot: { finishing: 383, power: 369, composure: 392 },
      pass: { shortPass: 370, longPass: 362, accuracy: 356 },
      dribble: { breakout: 408, keeping: 396, ballTouch: 370 },
      defense: { tackle: 332, interception: 335, marking: 323 },
      physical: { jumping: 329, contact: 362, stamina: 350 },
      speed: { running: 412, agility: 409 }
    },
    maxEnhanced: {
      overall: 14399,
      baseStats: { shoot: 2749, pass: 2621, dribble: 2755, defense: 2487, physical: 2622, speed: 1867 },
      detailStats: {
        shoot: { finishing: 918, power: 904, composure: 927 },
        pass: { shortPass: 881, longPass: 873, accuracy: 867 },
        dribble: { breakout: 931, keeping: 919, ballTouch: 905 },
        defense: { tackle: 831, interception: 834, marking: 822 },
        physical: { jumping: 852, contact: 897, stamina: 873 },
        speed: { running: 935, agility: 932 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'スピードドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・走力UP' },
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += kawamoto2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p248 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kawamoto2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/kawamoto2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p248Check = `  if (player.id === 'p248' || (player.name && (player.name.includes('川本梨誉') || player.name.includes('川本') || player.name.includes('Riyo Kawamoto') || player.name.includes('Kawamoto')))) {\n    return window.KAWAMOTO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p248'")) {
    const marker = "if (player.id === 'p247'";
    const altMarker = 'if (player.id === "p247"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p248Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p248 avatar resolver.');
    } else {
      console.warn('Could not find p247 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p248'")) {
    const marker = "if (player.id === 'p247'";
    const altMarker = 'if (player.id === "p247"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p248Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p248 avatar resolver.');
    } else {
      console.warn('Could not find p247 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p248 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p248');
console.log('6. Verification of p248:', p248 ? p248.name : 'MISSING');
if (p248) {
  console.log('   Overall:', p248.overall, '| MaxOverall:', p248.maxOverall);
  console.log('   Policy:', p248.policy, '| PlayStyle:', p248.playStyle, p248.playStyleLevel);
  console.log('   Nationality:', p248.nationality, '| Position:', p248.mainPosition);
  console.log('   Skill:', p248.skill.name);
  console.log('   Abilities:', p248.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KAWAMOTO_2026_IMAGE:', sandbox.window.KAWAMOTO_2026_IMAGE ? 'LOADED' : 'MISSING');
