const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING STEFAN MUGOŠA 2026 (p254) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786118379020.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'mugosa2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.MUGOSA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. mugosa2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p253Idx = mockCode.indexOf("id: 'p253'");
const altP253Idx = mockCode.indexOf('"id": "p253"');
const targetP253Idx = p253Idx !== -1 ? p253Idx : altP253Idx;

if (targetP253Idx === -1) {
  console.error("Could not find p253 in mockData.js!");
  process.exit(1);
}

const p253AvatarIdx = mockCode.indexOf("avatarUrl:", targetP253Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP253Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP253Idx);
const p253EndIdx = mockCode.indexOf("}", p253AvatarIdx);

mockCode = mockCode.substring(0, p253EndIdx + 1);

const mugosa2026Obj = `,
  {
    id: 'p254',
    name: 'ステファン・ムゴシャ(2026)',
    readingName: 'すてふぁん・むごしゃ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'モンテネグロ',
    policy: 'リアクション',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6525,
    maxOverall: 14764,
    baseStats: { shoot: 1295, pass: 1128, dribble: 1174, defense: 980, physical: 1118, speed: 744 },
    detailStats: {
      shoot: { finishing: 441, power: 421, composure: 433 },
      pass: { shortPass: 388, longPass: 373, accuracy: 367 },
      dribble: { breakout: 394, keeping: 390, ballTouch: 390 },
      defense: { tackle: 371, interception: 312, marking: 297 },
      physical: { jumping: 418, contact: 365, stamina: 335 },
      speed: { running: 355, agility: 389 }
    },
    maxEnhanced: {
      overall: 14764,
      baseStats: { shoot: 2900, pass: 2661, dribble: 2755, defense: 2477, physical: 2699, speed: 1790 },
      detailStats: {
        shoot: { finishing: 976, power: 956, composure: 968 },
        pass: { shortPass: 899, longPass: 884, accuracy: 878 },
        dribble: { breakout: 917, keeping: 913, ballTouch: 925 },
        defense: { tackle: 870, interception: 811, marking: 796 },
        physical: { jumping: 941, contact: 900, stamina: 858 },
        speed: { running: 878, agility: 912 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'シュートセンス', rank: '銀', description: '発動条件：好調　/　決定力・キック力UP' },
      { name: '上空のスナイパー', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ジャンプUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += mugosa2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p254 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('mugosa2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/mugosa2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p254Check = `  if (player.id === 'p254' || (player.name && (player.name.includes('ステファン・ムゴシャ') || player.name.includes('ムゴシャ') || player.name.includes('Stefan Mugoša') || player.name.includes('Mugosa')))) {\n    return window.MUGOSA_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p254'")) {
    const marker = "if (player.id === 'p253'";
    const altMarker = 'if (player.id === "p253"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p254Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p254 avatar resolver.');
    } else {
      console.warn('Could not find p253 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p254'")) {
    const marker = "if (player.id === 'p253'";
    const altMarker = 'if (player.id === "p253"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p254Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p254 avatar resolver.');
    } else {
      console.warn('Could not find p253 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p254 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p254');
console.log('6. Verification of p254:', p254 ? p254.name : 'MISSING');
if (p254) {
  console.log('   Overall:', p254.overall, '| MaxOverall:', p254.maxOverall);
  console.log('   Policy:', p254.policy, '| PlayStyle:', p254.playStyle, p254.playStyleLevel);
  console.log('   Nationality:', p254.nationality, '| Position:', p254.mainPosition);
  console.log('   Skill:', p254.skill.name);
  console.log('   Abilities:', p254.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.MUGOSA_2026_IMAGE:', sandbox.window.MUGOSA_2026_IMAGE ? 'LOADED' : 'MISSING');
