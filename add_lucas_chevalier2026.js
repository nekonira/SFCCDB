const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Registering Player: リュカ・シュヴァリエ [p398] ===');

// 1. Image path & Base64 conversion
const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\1be18bdd-8298-46f7-92a2-f4769d3dac5b\\.user_uploaded\\media_1790759556483.png';
if (!fs.existsSync(imgPath)) {
  console.error('Uploaded image file not found at:', imgPath);
  process.exit(1);
}

const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/png;base64,' + imgBuffer.toString('base64');

// 2. Write src/data/lucasChevalier2026Image.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'lucasChevalier2026Image.js');
const imgJsContent = `window.LUCAS_CHEVALIER_2026_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('✅ Created src/data/lucasChevalier2026Image.js');

// 3. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/lucasChevalier2026Image.js"></script>\n';

if (!htmlContent.includes('lucasChevalier2026Image.js')) {
  const targetTag = '<script src="./src/data/adrienRabiot2026Image.js"></script>';
  if (htmlContent.includes(targetTag)) {
    htmlContent = htmlContent.replace(targetTag, targetTag + '\n' + scriptTag.trimEnd());
  } else {
    const fallbackTag = '<script src="./src/data/ousmaneDembeleFrance2026Image.js"></script>';
    htmlContent = htmlContent.replace(fallbackTag, fallbackTag + '\n' + scriptTag.trimEnd());
  }
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('✅ Updated index.html with lucasChevalier2026Image.js');
} else {
  console.log('ℹ️ lucasChevalier2026Image.js already in index.html');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx and src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsx.includes('"p398"')) {
  appJsx = appJsx.replace('"p397": "ADRIEN_RABIOT_2026_IMAGE"', '"p397": "ADRIEN_RABIOT_2026_IMAGE",\n    "p398": "LUCAS_CHEVALIER_2026_IMAGE"');
  fs.writeFileSync(appJsxPath, appJsx, 'utf-8');
  console.log('✅ Updated src/app.jsx PLAYER_IMAGE_MAP with p398');
}

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf-8');
if (!appJs.includes('"p398"')) {
  appJs = appJs.replace('"p397":"ADRIEN_RABIOT_2026_IMAGE"', '"p397":"ADRIEN_RABIOT_2026_IMAGE","p398":"LUCAS_CHEVALIER_2026_IMAGE"');
  fs.writeFileSync(appJsPath, appJs, 'utf-8');
  console.log('✅ Updated src/app.js PLAYER_IMAGE_MAP with p398');
}

// 5. Update src/data/mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p397Idx = mockCode.indexOf("id: 'p397'");
if (p397Idx === -1) {
  console.error("Could not find p397 in mockData.js");
  process.exit(1);
}

const p397AvatarIdx = mockCode.indexOf("avatarUrl:", p397Idx);
const p397EndIdx = mockCode.indexOf("}", p397AvatarIdx);

const mockPrefix = mockCode.substring(0, p397EndIdx + 1);

const p398ObjStr = `,
  {
    id: 'p398',
    name: 'リュカ・シュヴァリエ',
    readingName: 'りゅか・しゅゔぁりえ',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 7258,
    maxOverall: 15598,
    baseStats: { shoot: 918, pass: 1158, dribble: 1036, defense: 1392, physical: 1273, speed: 828 },
    detailStats: {
      shoot: { finishing: 306, power: 285, composure: 327 },
      pass: { shortPass: 404, longPass: 382, accuracy: 372 },
      dribble: { breakout: 349, keeping: 337, ballTouch: 350 },
      defense: { tackle: 454, interception: 456, marking: 482 },
      physical: { jumping: 451, contact: 416, stamina: 406 },
      speed: { running: 372, agility: 456 }
    },
    maxEnhanced: {
      overall: 15598,
      baseStats: { shoot: 2379, pass: 2763, dribble: 2497, defense: 2997, physical: 2866, speed: 1850 },
      detailStats: {
        shoot: { finishing: 793, power: 772, composure: 814 },
        pass: { shortPass: 939, longPass: 917, accuracy: 907 },
        dribble: { breakout: 836, keeping: 824, ballTouch: 837 },
        defense: { tackle: 989, interception: 991, marking: 1017 },
        physical: { jumping: 986, contact: 951, stamina: 929 },
        speed: { running: 883, agility: 967 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: 'エレガントセーブ', rank: '銀', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: '広域の守護神', rank: '銀', description: '発動条件：好調　/　セービング・1VS1UP' },
      { name: '全方向の守護', rank: '銀', description: '発動条件：絶好調　/　反応速度・ジャンプUP' },
      { name: 'パワーアジリティ', rank: '銅', description: '発動条件：好調　/　コンタクト・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

fs.writeFileSync(mockPath, mockPrefix + p398ObjStr, 'utf-8');
console.log('✅ Appended p398 (リュカ・シュヴァリエ) to src/data/mockData.js');

// 6. Node VM Evaluation & Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(mockPrefix + p398ObjStr, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
console.log('Total players in mockData.js:', players.length);
const p398 = players.find(p => p.id === 'p398');

if (p398) {
  console.log('🎉 VERIFICATION SUCCESSFUL!');
  console.log('ID:', p398.id);
  console.log('Name:', p398.name);
  console.log('Position:', p398.mainPosition);
  console.log('Nationality:', p398.nationality);
  console.log('Policy:', p398.policy);
  console.log('Overall:', p398.overall, '-> Max Overall:', p398.maxOverall);
  console.log('Skill:', p398.skill.name);
  console.log('Abilities count:', p398.abilities.length);
  p398.abilities.forEach((a, idx) => console.log(`  Ab#${idx+1}: [${a.rank}] ${a.name} -> ${a.description}`));
} else {
  console.error('❌ ERROR: p398 not found in INITIAL_PLAYERS!');
  process.exit(1);
}
