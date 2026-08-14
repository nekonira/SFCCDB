const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING JUNIOR ROCHA 2026 (p229) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\30d7f0d1-9473-434c-80bc-71d83c6d7758\\media__1786113455720.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'juniorRocha2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.JUNIOR_ROCHA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. juniorRocha2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p228Idx = mockCode.indexOf("id: 'p228'");
const altP228Idx = mockCode.indexOf('"id": "p228"');
const targetP228Idx = p228Idx !== -1 ? p228Idx : altP228Idx;

if (targetP228Idx === -1) {
  console.error("Could not find p228 in mockData.js!");
  process.exit(1);
}

const p228AvatarIdx = mockCode.indexOf("avatarUrl:", targetP228Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP228Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP228Idx);
const p228EndIdx = mockCode.indexOf("}", p228AvatarIdx);

mockCode = mockCode.substring(0, p228EndIdx + 1);

const juniorRocha2026Obj = `,
  {
    id: 'p229',
    name: 'ジュニーニョ・ロシャ(2026)',
    readingName: 'じゅにーにょ・ろしゃ',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ムービング',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6032,
    maxOverall: 14245,
    baseStats: { shoot: 942, pass: 990, dribble: 1140, defense: 862, physical: 1059, speed: 850 },
    detailStats: {
      shoot: { finishing: 312, power: 317, composure: 313 },
      pass: { shortPass: 314, longPass: 325, accuracy: 351 },
      dribble: { breakout: 393, keeping: 406, ballTouch: 341 },
      defense: { tackle: 276, interception: 299, marking: 287 },
      physical: { jumping: 346, contact: 388, stamina: 325 },
      speed: { running: 405, agility: 445 }
    },
    maxEnhanced: {
      overall: 14245,
      baseStats: { shoot: 2499, pass: 2559, dribble: 2733, defense: 2371, physical: 2604, speed: 1920 },
      detailStats: {
        shoot: { finishing: 835, power: 828, composure: 836 },
        pass: { shortPass: 837, longPass: 848, accuracy: 874 },
        dribble: { breakout: 928, keeping: 941, ballTouch: 864 },
        defense: { tackle: 787, interception: 798, marking: 786 },
        physical: { jumping: 857, contact: 899, stamina: 848 },
        speed: { running: 940, agility: 980 }
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
      { name: '剛柔のタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += juniorRocha2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p229 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('juniorRocha2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/juniorRocha2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p229Check = `  if (player.id === 'p229' || (player.name && (player.name.includes('ジュニーニョ・ロシャ') || player.name.includes('ロシャ') || player.name.includes('Junior Rocha') || player.name.includes('Rocha')))) {\n    return window.JUNIOR_ROCHA_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p229'")) {
    const marker = "if (player.id === 'p228'";
    const altMarker = 'if (player.id === "p228"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p229Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p229 avatar resolver.');
    } else {
      console.warn('Could not find p228 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p229'")) {
    const marker = "if (player.id === 'p228'";
    const altMarker = 'if (player.id === "p228"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p229Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p229 avatar resolver.');
    } else {
      console.warn('Could not find p228 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p229 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p229');
console.log('6. Verification of p229:', p229 ? p229.name : 'MISSING');
if (p229) {
  console.log('   Overall:', p229.overall, '| MaxOverall:', p229.maxOverall);
  console.log('   Policy:', p229.policy, '| PlayStyle:', p229.playStyle, p229.playStyleLevel);
  console.log('   Nationality:', p229.nationality, '| Position:', p229.mainPosition);
  console.log('   Skill:', p229.skill.name);
  console.log('   Abilities:', p229.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.JUNIOR_ROCHA_2026_IMAGE:', sandbox.window.JUNIOR_ROCHA_2026_IMAGE ? 'LOADED' : 'MISSING');
