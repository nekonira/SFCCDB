const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING CHOI GEON-JU 2026 (p225) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\30d7f0d1-9473-434c-80bc-71d83c6d7758\\media__1786112698310.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'choiGeonJu2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.CHOI_GEON_JU_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. choiGeonJu2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p224Idx = mockCode.indexOf("id: 'p224'");
const altP224Idx = mockCode.indexOf('"id": "p224"');
const targetP224Idx = p224Idx !== -1 ? p224Idx : altP224Idx;

if (targetP224Idx === -1) {
  console.error("Could not find p224 in mockData.js!");
  process.exit(1);
}

const p224AvatarIdx = mockCode.indexOf("avatarUrl:", targetP224Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP224Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP224Idx);
const p224EndIdx = mockCode.indexOf("}", p224AvatarIdx);

mockCode = mockCode.substring(0, p224EndIdx + 1);

const choiGeonJu2026Obj = `,
  {
    id: 'p225',
    name: 'チェ・ゴンジュ(2026)',
    readingName: 'ちぇ・ごんじゅ',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'ムービング',
    playStyle: 'ドリブラーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6085,
    maxOverall: 14294,
    baseStats: { shoot: 1094, pass: 1097, dribble: 1123, defense: 801, physical: 969, speed: 851 },
    detailStats: {
      shoot: { finishing: 351, power: 393, composure: 350 },
      pass: { shortPass: 356, longPass: 377, accuracy: 364 },
      dribble: { breakout: 408, keeping: 352, ballTouch: 363 },
      defense: { tackle: 272, interception: 258, marking: 271 },
      physical: { jumping: 365, contact: 308, stamina: 296 },
      speed: { running: 429, agility: 422 }
    },
    maxEnhanced: {
      overall: 14294,
      baseStats: { shoot: 2651, pass: 2666, dribble: 2716, defense: 2310, physical: 2514, speed: 1921 },
      detailStats: {
        shoot: { finishing: 874, power: 904, composure: 873 },
        pass: { shortPass: 879, longPass: 900, accuracy: 887 },
        dribble: { breakout: 943, keeping: 887, ballTouch: 886 },
        defense: { tackle: 783, interception: 757, marking: 770 },
        physical: { jumping: 876, contact: 819, stamina: 819 },
        speed: { running: 964, agility: 957 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'ランニングキッカー', rank: '銀', description: '発動条件：絶好調　/　キック力・走力UP' },
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += choiGeonJu2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p225 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('choiGeonJu2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/choiGeonJu2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p225Check = `  if (player.id === 'p225' || (player.name && (player.name.includes('チェ・ゴンジュ') || player.name.includes('ゴンジュ') || player.name.includes('Choi Geon-Ju') || player.name.includes('Geon-Ju')))) {\n    return window.CHOI_GEON_JU_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p225'")) {
    const marker = "if (player.id === 'p224'";
    const altMarker = 'if (player.id === "p224"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p225Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p225 avatar resolver.');
    } else {
      console.warn('Could not find p224 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p225'")) {
    const marker = "if (player.id === 'p224'";
    const altMarker = 'if (player.id === "p224"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p225Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p225 avatar resolver.');
    } else {
      console.warn('Could not find p224 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p225 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p225');
console.log('6. Verification of p225:', p225 ? p225.name : 'MISSING');
if (p225) {
  console.log('   Overall:', p225.overall, '| MaxOverall:', p225.maxOverall);
  console.log('   Policy:', p225.policy, '| PlayStyle:', p225.playStyle, p225.playStyleLevel);
  console.log('   Nationality:', p225.nationality, '| Position:', p225.mainPosition);
  console.log('   Skill:', p225.skill.name);
  console.log('   Abilities:', p225.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.CHOI_GEON_JU_2026_IMAGE:', sandbox.window.CHOI_GEON_JU_2026_IMAGE ? 'LOADED' : 'MISSING');
