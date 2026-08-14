const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING RENJI HIDANO 2026 (p242) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786116227515.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'hidano2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.HIDANO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. hidano2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p241Idx = mockCode.indexOf("id: 'p241'");
const altP241Idx = mockCode.indexOf('"id": "p241"');
const targetP241Idx = p241Idx !== -1 ? p241Idx : altP241Idx;

if (targetP241Idx === -1) {
  console.error("Could not find p241 in mockData.js!");
  process.exit(1);
}

const p241AvatarIdx = mockCode.indexOf("avatarUrl:", targetP241Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP241Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP241Idx);
const p241EndIdx = mockCode.indexOf("}", p241AvatarIdx);

mockCode = mockCode.substring(0, p241EndIdx + 1);

const hidano2026Obj = `,
  {
    id: 'p242',
    name: '肥田野蓮治(2026)',
    readingName: 'ひだの・れんじ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6471,
    maxOverall: 14699,
    baseStats: { shoot: 1245, pass: 1070, dribble: 1063, defense: 843, physical: 1103, speed: 847 },
    detailStats: {
      shoot: { finishing: 434, power: 378, composure: 433 },
      pass: { shortPass: 368, longPass: 359, accuracy: 343 },
      dribble: { breakout: 368, keeping: 327, ballTouch: 368 },
      defense: { tackle: 284, interception: 282, marking: 277 },
      physical: { jumping: 363, contact: 381, stamina: 359 },
      speed: { running: 410, agility: 437 }
    },
    maxEnhanced: {
      overall: 14699,
      baseStats: { shoot: 2850, pass: 2603, dribble: 2644, defense: 2340, physical: 2684, speed: 1893 },
      detailStats: {
        shoot: { finishing: 969, power: 913, composure: 968 },
        pass: { shortPass: 879, longPass: 870, accuracy: 854 },
        dribble: { breakout: 891, keeping: 850, ballTouch: 903 },
        defense: { tackle: 783, interception: 781, marking: 776 },
        physical: { jumping: 886, contact: 916, stamina: 882 },
        speed: { running: 933, agility: 960 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ゴール前の嗅覚', rank: '銀', description: '発動条件：絶好調　/　決定力・敏捷性UP' },
      { name: '冷静なランナー', rank: '銀', description: '発動条件：好調　/　冷静さ・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += hidano2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p242 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('hidano2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/hidano2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p242Check = `  if (player.id === 'p242' || (player.name && (player.name.includes('肥田野蓮治') || player.name.includes('肥田野') || player.name.includes('Renji Hidano') || player.name.includes('Hidano')))) {\n    return window.HIDANO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p242'")) {
    const marker = "if (player.id === 'p241'";
    const altMarker = 'if (player.id === "p241"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p242Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p242 avatar resolver.');
    } else {
      console.warn('Could not find p241 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p242'")) {
    const marker = "if (player.id === 'p241'";
    const altMarker = 'if (player.id === "p241"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p242Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p242 avatar resolver.');
    } else {
      console.warn('Could not find p241 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p242 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p242');
console.log('6. Verification of p242:', p242 ? p242.name : 'MISSING');
if (p242) {
  console.log('   Overall:', p242.overall, '| MaxOverall:', p242.maxOverall);
  console.log('   Policy:', p242.policy, '| PlayStyle:', p242.playStyle, p242.playStyleLevel);
  console.log('   Nationality:', p242.nationality, '| Position:', p242.mainPosition);
  console.log('   Skill:', p242.skill.name);
  console.log('   Abilities:', p242.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.HIDANO_2026_IMAGE:', sandbox.window.HIDANO_2026_IMAGE ? 'LOADED' : 'MISSING');
