const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KENYU SUGIMOTO 2026 (p236) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\30d7f0d1-9473-434c-80bc-71d83c6d7758\\media__1786115199519.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'sugimoto2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SUGIMOTO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. sugimoto2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p235Idx = mockCode.indexOf("id: 'p235'");
const altP235Idx = mockCode.indexOf('"id": "p235"');
const targetP235Idx = p235Idx !== -1 ? p235Idx : altP235Idx;

if (targetP235Idx === -1) {
  console.error("Could not find p235 in mockData.js!");
  process.exit(1);
}

const p235AvatarIdx = mockCode.indexOf("avatarUrl:", targetP235Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP235Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP235Idx);
const p235EndIdx = mockCode.indexOf("}", p235AvatarIdx);

mockCode = mockCode.substring(0, p235EndIdx + 1);

const sugimoto2026Obj = `,
  {
    id: 'p236',
    name: '杉本健勇(2026)',
    readingName: 'すぎもと・けんゆう',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6348,
    maxOverall: 14586,
    baseStats: { shoot: 1193, pass: 1111, dribble: 1171, defense: 856, physical: 1130, speed: 752 },
    detailStats: {
      shoot: { finishing: 398, power: 407, composure: 388 },
      pass: { shortPass: 385, longPass: 342, accuracy: 384 },
      dribble: { breakout: 367, keeping: 410, ballTouch: 394 },
      defense: { tackle: 286, interception: 293, marking: 277 },
      physical: { jumping: 375, contact: 401, stamina: 354 },
      speed: { running: 352, agility: 400 }
    },
    maxEnhanced: {
      overall: 14586,
      baseStats: { shoot: 2798, pass: 2644, dribble: 2752, defense: 2353, physical: 2711, speed: 1798 },
      detailStats: {
        shoot: { finishing: 933, power: 942, composure: 923 },
        pass: { shortPass: 896, longPass: 853, accuracy: 895 },
        dribble: { breakout: 890, keeping: 933, ballTouch: 929 },
        defense: { tackle: 785, interception: 792, marking: 776 },
        physical: { jumping: 898, contact: 936, stamina: 877 },
        speed: { running: 875, agility: 923 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '保持からの一撃', rank: '銀', description: '発動条件：途中出場　/　キック力・キープ力UP' },
      { name: '力強いフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += sugimoto2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p236 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('sugimoto2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/sugimoto2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p236Check = `  if (player.id === 'p236' || (player.name && (player.name.includes('杉本健勇') || (player.name.includes('杉本') && player.name.includes('健勇')) || player.name.includes('Kenyu Sugimoto') || player.name.includes('Sugimoto')))) {\n    return window.SUGIMOTO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p236'")) {
    const marker = "if (player.id === 'p235'";
    const altMarker = 'if (player.id === "p235"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p236Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p236 avatar resolver.');
    } else {
      console.warn('Could not find p235 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p236'")) {
    const marker = "if (player.id === 'p235'";
    const altMarker = 'if (player.id === "p235"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p236Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p236 avatar resolver.');
    } else {
      console.warn('Could not find p235 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p236 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p236');
console.log('6. Verification of p236:', p236 ? p236.name : 'MISSING');
if (p236) {
  console.log('   Overall:', p236.overall, '| MaxOverall:', p236.maxOverall);
  console.log('   Policy:', p236.policy, '| PlayStyle:', p236.playStyle, p236.playStyleLevel);
  console.log('   Nationality:', p236.nationality, '| Position:', p236.mainPosition);
  console.log('   Skill:', p236.skill.name);
  console.log('   Abilities:', p236.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SUGIMOTO_2026_IMAGE:', sandbox.window.SUGIMOTO_2026_IMAGE ? 'LOADED' : 'MISSING');
