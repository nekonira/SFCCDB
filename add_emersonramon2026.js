const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING EMERSON RAMON 2026 (p227) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\30d7f0d1-9473-434c-80bc-71d83c6d7758\\media__1786113156496.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'emersonRamon2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.EMERSON_RAMON_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. emersonRamon2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p226Idx = mockCode.indexOf("id: 'p226'");
const altP226Idx = mockCode.indexOf('"id": "p226"');
const targetP226Idx = p226Idx !== -1 ? p226Idx : altP226Idx;

if (targetP226Idx === -1) {
  console.error("Could not find p226 in mockData.js!");
  process.exit(1);
}

const p226AvatarIdx = mockCode.indexOf("avatarUrl:", targetP226Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP226Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP226Idx);
const p226EndIdx = mockCode.indexOf("}", p226AvatarIdx);

mockCode = mockCode.substring(0, p226EndIdx + 1);

const emersonRamon2026Obj = `,
  {
    id: 'p227',
    name: 'エメルソン・ハモン(2026)',
    readingName: 'えめるそん・はもん',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ムービング',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6416,
    maxOverall: 14663,
    baseStats: { shoot: 1033, pass: 996, dribble: 1218, defense: 1103, physical: 1026, speed: 860 },
    detailStats: {
      shoot: { finishing: 360, power: 334, composure: 339 },
      pass: { shortPass: 336, longPass: 327, accuracy: 333 },
      dribble: { breakout: 421, keeping: 405, ballTouch: 392 },
      defense: { tackle: 354, interception: 378, marking: 371 },
      physical: { jumping: 304, contact: 323, stamina: 399 },
      speed: { running: 423, agility: 437 }
    },
    maxEnhanced: {
      overall: 14663,
      baseStats: { shoot: 2590, pass: 2565, dribble: 2811, defense: 2612, physical: 2571, speed: 1930 },
      detailStats: {
        shoot: { finishing: 883, power: 845, composure: 862 },
        pass: { shortPass: 859, longPass: 850, accuracy: 856 },
        dribble: { breakout: 956, keeping: 940, ballTouch: 915 },
        defense: { tackle: 865, interception: 877, marking: 870 },
        physical: { jumping: 815, contact: 834, stamina: 922 },
        speed: { running: 958, agility: 972 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: 'ムービングターゲット', rank: '銀', description: '発動条件：絶好調　/　キープ力・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += emersonRamon2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p227 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('emersonRamon2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/emersonRamon2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p227Check = `  if (player.id === 'p227' || (player.name && (player.name.includes('エメルソン・ハモン') || player.name.includes('ハモン') || player.name.includes('Emerson Ramon') || player.name.includes('Emerson')))) {\n    return window.EMERSON_RAMON_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p227'")) {
    const marker = "if (player.id === 'p226'";
    const altMarker = 'if (player.id === "p226"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p227Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p227 avatar resolver.');
    } else {
      console.warn('Could not find p226 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p227'")) {
    const marker = "if (player.id === 'p226'";
    const altMarker = 'if (player.id === "p226"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p227Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p227 avatar resolver.');
    } else {
      console.warn('Could not find p226 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p227 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p227');
console.log('6. Verification of p227:', p227 ? p227.name : 'MISSING');
if (p227) {
  console.log('   Overall:', p227.overall, '| MaxOverall:', p227.maxOverall);
  console.log('   Policy:', p227.policy, '| PlayStyle:', p227.playStyle, p227.playStyleLevel);
  console.log('   Nationality:', p227.nationality, '| Position:', p227.mainPosition);
  console.log('   Skill:', p227.skill.name);
  console.log('   Abilities:', p227.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.EMERSON_RAMON_2026_IMAGE:', sandbox.window.EMERSON_RAMON_2026_IMAGE ? 'LOADED' : 'MISSING');
