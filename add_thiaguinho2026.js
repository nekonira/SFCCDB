const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING THIAGUINHO 2026 (p223) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\30d7f0d1-9473-434c-80bc-71d83c6d7758\\media__1786112052113.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'thiaguinho2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.THIAGUINHO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. thiaguinho2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p222Idx = mockCode.indexOf("id: 'p222'");
const altP222Idx = mockCode.indexOf('"id": "p222"');
const targetP222Idx = p222Idx !== -1 ? p222Idx : altP222Idx;

if (targetP222Idx === -1) {
  console.error("Could not find p222 in mockData.js!");
  process.exit(1);
}

const p222AvatarIdx = mockCode.indexOf("avatarUrl:", targetP222Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP222Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP222Idx);
const p222EndIdx = mockCode.indexOf("}", p222AvatarIdx);

mockCode = mockCode.substring(0, p222EndIdx + 1);

const thiaguinho2026Obj = `,
  {
    id: 'p223',
    name: 'チアギーニョ(2026)',
    readingName: 'ちあぎーにょ',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ポゼッション',
    playStyle: 'ドリブラーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6283,
    maxOverall: 14496,
    baseStats: { shoot: 1116, pass: 1070, dribble: 1183, defense: 1017, physical: 835, speed: 879 },
    detailStats: {
      shoot: { finishing: 394, power: 337, composure: 385 },
      pass: { shortPass: 359, longPass: 354, accuracy: 357 },
      dribble: { breakout: 416, keeping: 379, ballTouch: 388 },
      defense: { tackle: 313, interception: 359, marking: 345 },
      physical: { jumping: 244, contact: 251, stamina: 340 },
      speed: { running: 426, agility: 453 }
    },
    maxEnhanced: {
      overall: 14496,
      baseStats: { shoot: 2673, pass: 2639, dribble: 2776, defense: 2526, physical: 2380, speed: 1949 },
      detailStats: {
        shoot: { finishing: 917, power: 848, composure: 908 },
        pass: { shortPass: 882, longPass: 877, accuracy: 880 },
        dribble: { breakout: 951, keeping: 914, ballTouch: 911 },
        defense: { tackle: 824, interception: 858, marking: 844 },
        physical: { jumping: 755, contact: 762, stamina: 863 },
        speed: { running: 961, agility: 988 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'ゴール前の嗅覚', rank: '銀', description: '発動条件：絶好調　/　決定力・敏捷性UP' },
      { name: 'スピードドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += thiaguinho2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p223 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('thiaguinho2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/thiaguinho2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p223Check = `  if (player.id === 'p223' || (player.name && (player.name.includes('チアギーニョ') || player.name.includes('Thiaguinho')))) {\n    return window.THIAGUINHO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p223'")) {
    const marker = "if (player.id === 'p222'";
    const altMarker = 'if (player.id === "p222"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p223Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p223 avatar resolver.');
    } else {
      console.warn('Could not find p222 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p223'")) {
    const marker = "if (player.id === 'p222'";
    const altMarker = 'if (player.id === "p222"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p223Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p223 avatar resolver.');
    } else {
      console.warn('Could not find p222 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p223 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p223');
console.log('6. Verification of p223:', p223 ? p223.name : 'MISSING');
if (p223) {
  console.log('   Overall:', p223.overall, '| MaxOverall:', p223.maxOverall);
  console.log('   Policy:', p223.policy, '| PlayStyle:', p223.playStyle, p223.playStyleLevel);
  console.log('   Nationality:', p223.nationality, '| Position:', p223.mainPosition);
  console.log('   Skill:', p223.skill.name);
  console.log('   Abilities:', p223.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.THIAGUINHO_2026_IMAGE:', sandbox.window.THIAGUINHO_2026_IMAGE ? 'LOADED' : 'MISSING');
