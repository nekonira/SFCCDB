const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Registering Player: ウスマン・デンベレ(フランスユニ) [p396] ===');

// 1. Image path & Base64 conversion
const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\1be18bdd-8298-46f7-92a2-f4769d3dac5b\\.user_uploaded\\media_1790758711527.png';
if (!fs.existsSync(imgPath)) {
  console.error('Uploaded image file not found at:', imgPath);
  process.exit(1);
}

const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/png;base64,' + imgBuffer.toString('base64');

// 2. Write src/data/ousmaneDembeleFrance2026Image.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'ousmaneDembeleFrance2026Image.js');
const imgJsContent = `window.OUSMANE_DEMBELE_FRANCE_2026_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('✅ Created src/data/ousmaneDembeleFrance2026Image.js');

// 3. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/ousmaneDembeleFrance2026Image.js"></script>\n';

if (!htmlContent.includes('ousmaneDembeleFrance2026Image.js')) {
  const targetTag = '<script src="./src/data/kylianMbappe2026Image.js"></script>';
  if (htmlContent.includes(targetTag)) {
    htmlContent = htmlContent.replace(targetTag, targetTag + '\n' + scriptTag.trimEnd());
  } else {
    const fallbackTag = '<script src="./src/data/adamWharton2026Image.js"></script>';
    htmlContent = htmlContent.replace(fallbackTag, fallbackTag + '\n' + scriptTag.trimEnd());
  }
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('✅ Updated index.html with ousmaneDembeleFrance2026Image.js');
} else {
  console.log('ℹ️ ousmaneDembeleFrance2026Image.js already in index.html');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx and src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsx.includes('"p396"')) {
  appJsx = appJsx.replace('"p395": "KYLIAN_MBAPPE_2026_IMAGE"', '"p395": "KYLIAN_MBAPPE_2026_IMAGE",\n    "p396": "OUSMANE_DEMBELE_FRANCE_2026_IMAGE"');
  fs.writeFileSync(appJsxPath, appJsx, 'utf-8');
  console.log('✅ Updated src/app.jsx PLAYER_IMAGE_MAP with p396');
}

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf-8');
if (!appJs.includes('"p396"')) {
  appJs = appJs.replace('"p395":"KYLIAN_MBAPPE_2026_IMAGE"', '"p395":"KYLIAN_MBAPPE_2026_IMAGE","p396":"OUSMANE_DEMBELE_FRANCE_2026_IMAGE"');
  fs.writeFileSync(appJsPath, appJs, 'utf-8');
  console.log('✅ Updated src/app.js PLAYER_IMAGE_MAP with p396');
}

// 5. Update src/data/mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p395Idx = mockCode.indexOf("id: 'p395'");
if (p395Idx === -1) {
  console.error("Could not find p395 in mockData.js");
  process.exit(1);
}

const p395AvatarIdx = mockCode.indexOf("avatarUrl:", p395Idx);
const p395EndIdx = mockCode.indexOf("}", p395AvatarIdx);

const mockPrefix = mockCode.substring(0, p395EndIdx + 1);

const p396ObjStr = `,
  {
    id: 'p396',
    name: 'ウスマン・デンベレ(フランスユニ)',
    readingName: 'うすまん・でんべれ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅲ',
    overall: 7610,
    maxOverall: 15760,
    baseStats: { shoot: 1340, pass: 1336, dribble: 1472, defense: 1126, physical: 1274, speed: 996 },
    detailStats: {
      shoot: { finishing: 455, power: 433, composure: 452 },
      pass: { shortPass: 438, longPass: 450, accuracy: 448 },
      dribble: { breakout: 497, keeping: 495, ballTouch: 480 },
      defense: { tackle: 359, interception: 375, marking: 392 },
      physical: { jumping: 411, contact: 426, stamina: 437 },
      speed: { running: 507, agility: 489 }
    },
    maxEnhanced: {
      overall: 15760,
      baseStats: { shoot: 2885, pass: 2917, dribble: 3041, defense: 2671, physical: 2843, speed: 2030 },
      detailStats: {
        shoot: { finishing: 966, power: 944, composure: 975 },
        pass: { shortPass: 973, longPass: 973, accuracy: 971 },
        dribble: { breakout: 1020, keeping: 1018, ballTouch: 1003 },
        defense: { tackle: 882, interception: 886, marking: 903 },
        physical: { jumping: 922, contact: 949, stamina: 972 },
        speed: { running: 1018, agility: 1012 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 1, longShoot: 2,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '驚異の弾道', rank: '金', description: '発動エリア：前左中右・中中　/　発動条件：シュート時　/　決定力・キック力UP' },
    abilities: [
      { name: '多彩な足技', rank: '金', description: '発動条件：好調　/　突破力・キープ力・敏捷性UP' },
      { name: '冷静なランナー', rank: '銀', description: '発動条件：好調　/　冷静さ・走力UP' },
      { name: 'シルクタッチ', rank: '銅', description: '発動条件：好調　/　ショートパス・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

fs.writeFileSync(mockPath, mockPrefix + p396ObjStr, 'utf-8');
console.log('✅ Appended p396 (ウスマン・デンベレ(フランスユニ)) to src/data/mockData.js');

// 6. Node VM Evaluation & Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(mockPrefix + p396ObjStr, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
console.log('Total players in mockData.js:', players.length);
const p396 = players.find(p => p.id === 'p396');

if (p396) {
  console.log('🎉 VERIFICATION SUCCESSFUL!');
  console.log('ID:', p396.id);
  console.log('Name:', p396.name);
  console.log('Position:', p396.mainPosition);
  console.log('Nationality:', p396.nationality);
  console.log('Policy:', p396.policy);
  console.log('Overall:', p396.overall, '-> Max Overall:', p396.maxOverall);
  console.log('Skill:', p396.skill.name);
  console.log('Abilities count:', p396.abilities.length);
  p396.abilities.forEach((a, idx) => console.log(`  Ab#${idx+1}: [${a.rank}] ${a.name} -> ${a.description}`));
} else {
  console.error('❌ ERROR: p396 not found in INITIAL_PLAYERS!');
  process.exit(1);
}
