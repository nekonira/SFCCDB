const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MASAKI SHINTANI 2026 (p247) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786117119561.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'shintani2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SHINTANI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. shintani2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p246Idx = mockCode.indexOf("id: 'p246'");
const altP246Idx = mockCode.indexOf('"id": "p246"');
const targetP246Idx = p246Idx !== -1 ? p246Idx : altP246Idx;

if (targetP246Idx === -1) {
  console.error("Could not find p246 in mockData.js!");
  process.exit(1);
}

const p246AvatarIdx = mockCode.indexOf("avatarUrl:", targetP246Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP246Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP246Idx);
const p246EndIdx = mockCode.indexOf("}", p246AvatarIdx);

mockCode = mockCode.substring(0, p246EndIdx + 1);

const shintani2026Obj = `,
  {
    id: 'p247',
    name: '新谷聖基(2026)',
    readingName: 'しんたに・まさき',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6242,
    maxOverall: 14469,
    baseStats: { shoot: 1205, pass: 871, dribble: 1106, defense: 712, physical: 970, speed: 818 },
    detailStats: {
      shoot: { finishing: 394, power: 403, composure: 408 },
      pass: { shortPass: 308, longPass: 287, accuracy: 276 },
      dribble: { breakout: 381, keeping: 352, ballTouch: 373 },
      defense: { tackle: 173, interception: 282, marking: 257 },
      physical: { jumping: 211, contact: 378, stamina: 381 },
      speed: { running: 403, agility: 415 }
    },
    maxEnhanced: {
      overall: 14469,
      baseStats: { shoot: 2810, pass: 2404, dribble: 2687, defense: 2209, physical: 2551, speed: 1864 },
      detailStats: {
        shoot: { finishing: 929, power: 938, composure: 943 },
        pass: { shortPass: 819, longPass: 798, accuracy: 787 },
        dribble: { breakout: 904, keeping: 875, ballTouch: 908 },
        defense: { tackle: 672, interception: 781, marking: 756 },
        physical: { jumping: 734, contact: 913, stamina: 904 },
        speed: { running: 926, agility: 938 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' },
      { name: 'シュートセンス', rank: '銀', description: '発動条件：好調　/　決定力・キック力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += shintani2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p247 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('shintani2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/shintani2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p247Check = `  if (player.id === 'p247' || (player.name && (player.name.includes('新谷聖基') || player.name.includes('新谷') || player.name.includes('Masaki Shintani') || player.name.includes('Shintani')))) {\n    return window.SHINTANI_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p247'")) {
    const marker = "if (player.id === 'p246'";
    const altMarker = 'if (player.id === "p246"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p247Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p247 avatar resolver.');
    } else {
      console.warn('Could not find p246 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p247'")) {
    const marker = "if (player.id === 'p246'";
    const altMarker = 'if (player.id === "p246"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p247Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p247 avatar resolver.');
    } else {
      console.warn('Could not find p246 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p247 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p247');
console.log('6. Verification of p247:', p247 ? p247.name : 'MISSING');
if (p247) {
  console.log('   Overall:', p247.overall, '| MaxOverall:', p247.maxOverall);
  console.log('   Policy:', p247.policy, '| PlayStyle:', p247.playStyle, p247.playStyleLevel);
  console.log('   Nationality:', p247.nationality, '| Position:', p247.mainPosition);
  console.log('   Skill:', p247.skill.name);
  console.log('   Abilities:', p247.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SHINTANI_2026_IMAGE:', sandbox.window.SHINTANI_2026_IMAGE ? 'LOADED' : 'MISSING');
