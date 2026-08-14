const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING LUCAS BARCELOS 2026 (p233) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\30d7f0d1-9473-434c-80bc-71d83c6d7758\\media__1786114238370.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'lucasBarcelos2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.LUCAS_BARCELOS_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. lucasBarcelos2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p232Idx = mockCode.indexOf("id: 'p232'");
const altP232Idx = mockCode.indexOf('"id": "p232"');
const targetP232Idx = p232Idx !== -1 ? p232Idx : altP232Idx;

if (targetP232Idx === -1) {
  console.error("Could not find p232 in mockData.js!");
  process.exit(1);
}

const p232AvatarIdx = mockCode.indexOf("avatarUrl:", targetP232Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP232Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP232Idx);
const p232EndIdx = mockCode.indexOf("}", p232AvatarIdx);

mockCode = mockCode.substring(0, p232EndIdx + 1);

const lucasBarcelos2026Obj = `,
  {
    id: 'p233',
    name: 'ルーカス・バルセロス(2026)',
    readingName: 'るーかす・ばるせろす',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ポゼッション',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6375,
    maxOverall: 14619,
    baseStats: { shoot: 1185, pass: 1108, dribble: 1174, defense: 959, physical: 1130, speed: 788 },
    detailStats: {
      shoot: { finishing: 393, power: 416, composure: 376 },
      pass: { shortPass: 356, longPass: 370, accuracy: 382 },
      dribble: { breakout: 384, keeping: 401, ballTouch: 389 },
      defense: { tackle: 299, interception: 331, marking: 329 },
      physical: { jumping: 418, contact: 387, stamina: 325 },
      speed: { running: 369, agility: 419 }
    },
    maxEnhanced: {
      overall: 14619,
      baseStats: { shoot: 2790, pass: 2641, dribble: 2755, defense: 2456, physical: 2711, speed: 1834 },
      detailStats: {
        shoot: { finishing: 928, power: 951, composure: 911 },
        pass: { shortPass: 867, longPass: 881, accuracy: 893 },
        dribble: { breakout: 907, keeping: 924, ballTouch: 924 },
        defense: { tackle: 798, interception: 830, marking: 828 },
        physical: { jumping: 941, contact: 922, stamina: 848 },
        speed: { running: 892, agility: 942 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '強靭な脚力', rank: '銀', description: '発動条件：絶好調　/　キック力・ジャンプUP' },
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += lucasBarcelos2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p233 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('lucasBarcelos2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/lucasBarcelos2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p233Check = `  if (player.id === 'p233' || (player.name && (player.name.includes('ルーカス・バルセロス') || player.name.includes('バルセロス') || player.name.includes('Lucas Barcelos') || player.name.includes('Barcelos')))) {\n    return window.LUCAS_BARCELOS_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p233'")) {
    const marker = "if (player.id === 'p232'";
    const altMarker = 'if (player.id === "p232"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p233Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p233 avatar resolver.');
    } else {
      console.warn('Could not find p232 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p233'")) {
    const marker = "if (player.id === 'p232'";
    const altMarker = 'if (player.id === "p232"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p233Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p233 avatar resolver.');
    } else {
      console.warn('Could not find p232 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p233 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p233');
console.log('6. Verification of p233:', p233 ? p233.name : 'MISSING');
if (p233) {
  console.log('   Overall:', p233.overall, '| MaxOverall:', p233.maxOverall);
  console.log('   Policy:', p233.policy, '| PlayStyle:', p233.playStyle, p233.playStyleLevel);
  console.log('   Nationality:', p233.nationality, '| Position:', p233.mainPosition);
  console.log('   Skill:', p233.skill.name);
  console.log('   Abilities:', p233.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.LUCAS_BARCELOS_2026_IMAGE:', sandbox.window.LUCAS_BARCELOS_2026_IMAGE ? 'LOADED' : 'MISSING');
