const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING LEE DONG-JUN 2026 (p226) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\30d7f0d1-9473-434c-80bc-71d83c6d7758\\media__1786113015519.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'leeDongJun2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.LEE_DONG_JUN_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. leeDongJun2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p225Idx = mockCode.indexOf("id: 'p225'");
const altP225Idx = mockCode.indexOf('"id": "p225"');
const targetP225Idx = p225Idx !== -1 ? p225Idx : altP225Idx;

if (targetP225Idx === -1) {
  console.error("Could not find p225 in mockData.js!");
  process.exit(1);
}

const p225AvatarIdx = mockCode.indexOf("avatarUrl:", targetP225Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP225Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP225Idx);
const p225EndIdx = mockCode.indexOf("}", p225AvatarIdx);

mockCode = mockCode.substring(0, p225EndIdx + 1);

const leeDongJun2026Obj = `,
  {
    id: 'p226',
    name: 'イ・ドンジュン(2026)',
    readingName: 'い・どんじゅん',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'ポゼッション',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6273,
    maxOverall: 14476,
    baseStats: { shoot: 1096, pass: 1184, dribble: 1340, defense: 1031, physical: 1120, speed: 685 },
    detailStats: {
      shoot: { finishing: 375, power: 370, composure: 351 },
      pass: { shortPass: 390, longPass: 401, accuracy: 393 },
      dribble: { breakout: 441, keeping: 463, ballTouch: 436 },
      defense: { tackle: 321, interception: 362, marking: 348 },
      physical: { jumping: 367, contact: 392, stamina: 361 },
      speed: { running: 359, agility: 326 }
    },
    maxEnhanced: {
      overall: 14476,
      baseStats: { shoot: 2653, pass: 2753, dribble: 2933, defense: 2540, physical: 2665, speed: 1755 },
      detailStats: {
        shoot: { finishing: 898, power: 881, composure: 874 },
        pass: { shortPass: 913, longPass: 924, accuracy: 916 },
        dribble: { breakout: 976, keeping: 998, ballTouch: 959 },
        defense: { tackle: 832, interception: 861, marking: 847 },
        physical: { jumping: 878, contact: 903, stamina: 884 },
        speed: { running: 894, agility: 861 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' },
      { name: '精緻なパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・キック精度UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += leeDongJun2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p226 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('leeDongJun2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/leeDongJun2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p226Check = `  if (player.id === 'p226' || (player.name && (player.name.includes('イ・ドンジュン') || player.name.includes('ドンジュン') || player.name.includes('Lee Dong-Jun') || player.name.includes('Dong-Jun')))) {\n    return window.LEE_DONG_JUN_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p226'")) {
    const marker = "if (player.id === 'p225'";
    const altMarker = 'if (player.id === "p225"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p226Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p226 avatar resolver.');
    } else {
      console.warn('Could not find p225 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p226'")) {
    const marker = "if (player.id === 'p225'";
    const altMarker = 'if (player.id === "p225"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p226Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p226 avatar resolver.');
    } else {
      console.warn('Could not find p225 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p226 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p226');
console.log('6. Verification of p226:', p226 ? p226.name : 'MISSING');
if (p226) {
  console.log('   Overall:', p226.overall, '| MaxOverall:', p226.maxOverall);
  console.log('   Policy:', p226.policy, '| PlayStyle:', p226.playStyle, p226.playStyleLevel);
  console.log('   Nationality:', p226.nationality, '| Position:', p226.mainPosition);
  console.log('   Skill:', p226.skill.name);
  console.log('   Abilities:', p226.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.LEE_DONG_JUN_2026_IMAGE:', sandbox.window.LEE_DONG_JUN_2026_IMAGE ? 'LOADED' : 'MISSING');
