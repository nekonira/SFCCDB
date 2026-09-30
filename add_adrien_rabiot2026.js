const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Registering Player: アドリアン・ラビオ [p397] ===');

// 1. Image path & Base64 conversion
const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\1be18bdd-8298-46f7-92a2-f4769d3dac5b\\.user_uploaded\\media_1790759409057.png';
if (!fs.existsSync(imgPath)) {
  console.error('Uploaded image file not found at:', imgPath);
  process.exit(1);
}

const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/png;base64,' + imgBuffer.toString('base64');

// 2. Write src/data/adrienRabiot2026Image.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'adrienRabiot2026Image.js');
const imgJsContent = `window.ADRIEN_RABIOT_2026_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('✅ Created src/data/adrienRabiot2026Image.js');

// 3. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/adrienRabiot2026Image.js"></script>\n';

if (!htmlContent.includes('adrienRabiot2026Image.js')) {
  const targetTag = '<script src="./src/data/ousmaneDembeleFrance2026Image.js"></script>';
  if (htmlContent.includes(targetTag)) {
    htmlContent = htmlContent.replace(targetTag, targetTag + '\n' + scriptTag.trimEnd());
  } else {
    const fallbackTag = '<script src="./src/data/kylianMbappe2026Image.js"></script>';
    htmlContent = htmlContent.replace(fallbackTag, fallbackTag + '\n' + scriptTag.trimEnd());
  }
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('✅ Updated index.html with adrienRabiot2026Image.js');
} else {
  console.log('ℹ️ adrienRabiot2026Image.js already in index.html');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx and src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsx.includes('"p397"')) {
  appJsx = appJsx.replace('"p396": "OUSMANE_DEMBELE_FRANCE_2026_IMAGE"', '"p396": "OUSMANE_DEMBELE_FRANCE_2026_IMAGE",\n    "p397": "ADRIEN_RABIOT_2026_IMAGE"');
  fs.writeFileSync(appJsxPath, appJsx, 'utf-8');
  console.log('✅ Updated src/app.jsx PLAYER_IMAGE_MAP with p397');
}

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf-8');
if (!appJs.includes('"p397"')) {
  appJs = appJs.replace('"p396":"OUSMANE_DEMBELE_FRANCE_2026_IMAGE"', '"p396":"OUSMANE_DEMBELE_FRANCE_2026_IMAGE","p397":"ADRIEN_RABIOT_2026_IMAGE"');
  fs.writeFileSync(appJsPath, appJs, 'utf-8');
  console.log('✅ Updated src/app.js PLAYER_IMAGE_MAP with p397');
}

// 5. Update src/data/mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p396Idx = mockCode.indexOf("id: 'p396'");
if (p396Idx === -1) {
  console.error("Could not find p396 in mockData.js");
  process.exit(1);
}

const p396AvatarIdx = mockCode.indexOf("avatarUrl:", p396Idx);
const p396EndIdx = mockCode.indexOf("}", p396AvatarIdx);

const mockPrefix = mockCode.substring(0, p396EndIdx + 1);

const p397ObjStr = `,
  {
    id: 'p397',
    name: 'アドリアン・ラビオ',
    readingName: 'あどりあん・らびお',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅲ',
    overall: 7487,
    maxOverall: 15685,
    baseStats: { shoot: 1232, pass: 1307, dribble: 1335, defense: 1341, physical: 1393, speed: 794 },
    detailStats: {
      shoot: { finishing: 397, power: 443, composure: 392 },
      pass: { shortPass: 438, longPass: 429, accuracy: 440 },
      dribble: { breakout: 419, keeping: 439, ballTouch: 477 },
      defense: { tackle: 457, interception: 473, marking: 411 },
      physical: { jumping: 431, contact: 488, stamina: 474 },
      speed: { running: 411, agility: 383 }
    },
    maxEnhanced: {
      overall: 15685,
      baseStats: { shoot: 2777, pass: 2912, dribble: 2868, defense: 2922, physical: 2962, speed: 1816 },
      detailStats: {
        shoot: { finishing: 908, power: 954, composure: 915 },
        pass: { shortPass: 973, longPass: 964, accuracy: 975 },
        dribble: { breakout: 930, keeping: 950, ballTouch: 988 },
        defense: { tackle: 992, interception: 996, marking: 934 },
        physical: { jumping: 942, contact: 1011, stamina: 1009 },
        speed: { running: 922, agility: 894 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '迎撃のインターセプト', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: 'ホットラインを断つ動き', rank: '金', description: '発動条件：好調　/　タックル・パスカット・スタミナUP' },
      { name: '剛柔のタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・コンタクトUP' },
      { name: '精緻なパサー', rank: '銅', description: '発動条件：絶好調　/　ショートパス・キック精度UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

fs.writeFileSync(mockPath, mockPrefix + p397ObjStr, 'utf-8');
console.log('✅ Appended p397 (アドリアン・ラビオ) to src/data/mockData.js');

// 6. Node VM Evaluation & Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(mockPrefix + p397ObjStr, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
console.log('Total players in mockData.js:', players.length);
const p397 = players.find(p => p.id === 'p397');

if (p397) {
  console.log('🎉 VERIFICATION SUCCESSFUL!');
  console.log('ID:', p397.id);
  console.log('Name:', p397.name);
  console.log('Position:', p397.mainPosition);
  console.log('Nationality:', p397.nationality);
  console.log('Policy:', p397.policy);
  console.log('Overall:', p397.overall, '-> Max Overall:', p397.maxOverall);
  console.log('Skill:', p397.skill.name);
  console.log('Abilities count:', p397.abilities.length);
  p397.abilities.forEach((a, idx) => console.log(`  Ab#${idx+1}: [${a.rank}] ${a.name} -> ${a.description}`));
} else {
  console.error('❌ ERROR: p397 not found in INITIAL_PLAYERS!');
  process.exit(1);
}
