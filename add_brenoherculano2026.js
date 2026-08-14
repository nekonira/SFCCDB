const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING BRENO HERCULANO 2026 (p235) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\30d7f0d1-9473-434c-80bc-71d83c6d7758\\media__1786114886649.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'brenoHerculano2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.BRENO_HERCULANO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. brenoHerculano2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p234Idx = mockCode.indexOf("id: 'p234'");
const altP234Idx = mockCode.indexOf('"id": "p234"');
const targetP234Idx = p234Idx !== -1 ? p234Idx : altP234Idx;

if (targetP234Idx === -1) {
  console.error("Could not find p234 in mockData.js!");
  process.exit(1);
}

const p234AvatarIdx = mockCode.indexOf("avatarUrl:", targetP234Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP234Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP234Idx);
const p234EndIdx = mockCode.indexOf("}", p234AvatarIdx);

mockCode = mockCode.substring(0, p234EndIdx + 1);

const brenoHerculano2026Obj = `,
  {
    id: 'p235',
    name: 'ブルーノ・エルクラーノ(2026)',
    readingName: 'ぶるーの・えるくらーの',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ムービング',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6257,
    maxOverall: 14499,
    baseStats: { shoot: 1149, pass: 1080, dribble: 1053, defense: 963, physical: 1200, speed: 695 },
    detailStats: {
      shoot: { finishing: 381, power: 396, composure: 372 },
      pass: { shortPass: 362, longPass: 362, accuracy: 356 },
      dribble: { breakout: 344, keeping: 337, ballTouch: 372 },
      defense: { tackle: 308, interception: 334, marking: 321 },
      physical: { jumping: 452, contact: 415, stamina: 333 },
      speed: { running: 348, agility: 347 }
    },
    maxEnhanced: {
      overall: 14499,
      baseStats: { shoot: 2754, pass: 2613, dribble: 2634, defense: 2460, physical: 2781, speed: 1741 },
      detailStats: {
        shoot: { finishing: 916, power: 931, composure: 907 },
        pass: { shortPass: 873, longPass: 873, accuracy: 867 },
        dribble: { breakout: 867, keeping: 860, ballTouch: 907 },
        defense: { tackle: 807, interception: 833, marking: 820 },
        physical: { jumping: 975, contact: 950, stamina: 856 },
        speed: { running: 871, agility: 870 }
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
      { name: '冷静なボールタッチ', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += brenoHerculano2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p235 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('brenoHerculano2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/brenoHerculano2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p235Check = `  if (player.id === 'p235' || (player.name && (player.name.includes('ブルーノ・エルクラーノ') || player.name.includes('エルクラーノ') || player.name.includes('Breno Herculano') || player.name.includes('Herculano')))) {\n    return window.BRENO_HERCULANO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p235'")) {
    const marker = "if (player.id === 'p234'";
    const altMarker = 'if (player.id === "p234"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p235Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p235 avatar resolver.');
    } else {
      console.warn('Could not find p234 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p235'")) {
    const marker = "if (player.id === 'p234'";
    const altMarker = 'if (player.id === "p234"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p235Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p235 avatar resolver.');
    } else {
      console.warn('Could not find p234 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p235 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p235');
console.log('6. Verification of p235:', p235 ? p235.name : 'MISSING');
if (p235) {
  console.log('   Overall:', p235.overall, '| MaxOverall:', p235.maxOverall);
  console.log('   Policy:', p235.policy, '| PlayStyle:', p235.playStyle, p235.playStyleLevel);
  console.log('   Nationality:', p235.nationality, '| Position:', p235.mainPosition);
  console.log('   Skill:', p235.skill.name);
  console.log('   Abilities:', p235.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.BRENO_HERCULANO_2026_IMAGE:', sandbox.window.BRENO_HERCULANO_2026_IMAGE ? 'LOADED' : 'MISSING');
