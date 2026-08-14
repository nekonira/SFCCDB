const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KISHO YANO 2026 (p249) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786117537011.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yanoKisho2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YANO_KISHO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. yanoKisho2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p248Idx = mockCode.indexOf("id: 'p248'");
const altP248Idx = mockCode.indexOf('"id": "p248"');
const targetP248Idx = p248Idx !== -1 ? p248Idx : altP248Idx;

if (targetP248Idx === -1) {
  console.error("Could not find p248 in mockData.js!");
  process.exit(1);
}

const p248AvatarIdx = mockCode.indexOf("avatarUrl:", targetP248Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP248Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP248Idx);
const p248EndIdx = mockCode.indexOf("}", p248AvatarIdx);

mockCode = mockCode.substring(0, p248EndIdx + 1);

const yanoKisho2026Obj = `,
  {
    id: 'p249',
    name: '矢野貴章(2026)',
    readingName: 'やの・きしょう',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6143,
    maxOverall: 14353,
    baseStats: { shoot: 1134, pass: 979, dribble: 1093, defense: 1197, physical: 1225, speed: 796 },
    detailStats: {
      shoot: { finishing: 358, power: 397, composure: 379 },
      pass: { shortPass: 335, longPass: 330, accuracy: 314 },
      dribble: { breakout: 383, keeping: 385, ballTouch: 325 },
      defense: { tackle: 409, interception: 391, marking: 397 },
      physical: { jumping: 378, contact: 403, stamina: 444 },
      speed: { running: 401, agility: 395 }
    },
    maxEnhanced: {
      overall: 14353,
      baseStats: { shoot: 2739, pass: 2512, dribble: 2674, defense: 2694, physical: 2806, speed: 1842 },
      detailStats: {
        shoot: { finishing: 893, power: 932, composure: 914 },
        pass: { shortPass: 846, longPass: 841, accuracy: 825 },
        dribble: { breakout: 906, keeping: 908, ballTouch: 860 },
        defense: { tackle: 908, interception: 890, marking: 896 },
        physical: { jumping: 901, contact: 938, stamina: 967 },
        speed: { running: 924, agility: 918 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'マラソンマン', rank: '銀', description: '発動条件：途中出場　/　スタミナ・走力UP' },
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += yanoKisho2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p249 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('yanoKisho2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/yanoKisho2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p249Check = `  if (player.id === 'p249' || (player.name && (player.name.includes('矢野貴章') || player.name.includes('矢野') || player.name.includes('Kisho Yano') || player.name.includes('Yano')))) {\n    return window.YANO_KISHO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p249'")) {
    const marker = "if (player.id === 'p248'";
    const altMarker = 'if (player.id === "p248"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p249Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p249 avatar resolver.');
    } else {
      console.warn('Could not find p248 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p249'")) {
    const marker = "if (player.id === 'p248'";
    const altMarker = 'if (player.id === "p248"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p249Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p249 avatar resolver.');
    } else {
      console.warn('Could not find p248 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p249 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p249');
console.log('6. Verification of p249:', p249 ? p249.name : 'MISSING');
if (p249) {
  console.log('   Overall:', p249.overall, '| MaxOverall:', p249.maxOverall);
  console.log('   Policy:', p249.policy, '| PlayStyle:', p249.playStyle, p249.playStyleLevel);
  console.log('   Nationality:', p249.nationality, '| Position:', p249.mainPosition);
  console.log('   Skill:', p249.skill.name);
  console.log('   Abilities:', p249.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.YANO_KISHO_2026_IMAGE:', sandbox.window.YANO_KISHO_2026_IMAGE ? 'LOADED' : 'MISSING');
