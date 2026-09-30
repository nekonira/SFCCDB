const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Registering Player: キリアン・エンバペ(2026) [p395] ===');

// 1. Image path & Base64 conversion
const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\1be18bdd-8298-46f7-92a2-f4769d3dac5b\\.user_uploaded\\media_1790757432035.png';
if (!fs.existsSync(imgPath)) {
  console.error('Uploaded image file not found at:', imgPath);
  process.exit(1);
}

const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/png;base64,' + imgBuffer.toString('base64');

// 2. Write src/data/kylianMbappe2026Image.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'kylianMbappe2026Image.js');
const imgJsContent = `window.KYLIAN_MBAPPE_2026_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('✅ Created src/data/kylianMbappe2026Image.js');

// 3. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/kylianMbappe2026Image.js"></script>\n';

if (!htmlContent.includes('kylianMbappe2026Image.js')) {
  const targetTag = '<script src="./src/data/adamWharton2026Image.js"></script>';
  if (htmlContent.includes(targetTag)) {
    htmlContent = htmlContent.replace(targetTag, targetTag + '\n' + scriptTag.trimEnd());
  } else {
    const fallbackTag = '<!-- 1. Player Photos';
    htmlContent = htmlContent.replace(fallbackTag, fallbackTag + '\n' + scriptTag.trimEnd());
  }
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('✅ Updated index.html with kylianMbappe2026Image.js');
} else {
  console.log('ℹ️ kylianMbappe2026Image.js already in index.html');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx and src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsx.includes('"p395"')) {
  appJsx = appJsx.replace('"p394": "ADAM_WHARTON_2026_IMAGE"', '"p394": "ADAM_WHARTON_2026_IMAGE",\n    "p395": "KYLIAN_MBAPPE_2026_IMAGE"');
  fs.writeFileSync(appJsxPath, appJsx, 'utf-8');
  console.log('✅ Updated src/app.jsx PLAYER_IMAGE_MAP with p395');
}

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf-8');
if (!appJs.includes('"p395"')) {
  appJs = appJs.replace('"p394":"ADAM_WHARTON_2026_IMAGE"', '"p394":"ADAM_WHARTON_2026_IMAGE","p395":"KYLIAN_MBAPPE_2026_IMAGE"');
  fs.writeFileSync(appJsPath, appJs, 'utf-8');
  console.log('✅ Updated src/app.js PLAYER_IMAGE_MAP with p395');
}

// 5. Update src/data/mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p394Idx = mockCode.indexOf("id: 'p394'");
if (p394Idx === -1) {
  console.error("Could not find p394 in mockData.js");
  process.exit(1);
}

const p394AvatarIdx = mockCode.indexOf("avatarUrl:", p394Idx);
const p394EndIdx = mockCode.indexOf("}", p394AvatarIdx);

const mockPrefix = mockCode.substring(0, p394EndIdx + 1);

const p395ObjStr = `,
  {
    id: 'p395',
    name: 'キリアン・エンバペ(2026)',
    readingName: 'きりあんえんばぺ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅲ',
    overall: 7760,
    maxOverall: 15958,
    baseStats: { shoot: 1488, pass: 1369, dribble: 1495, defense: 764, physical: 1385, speed: 1010 },
    detailStats: {
      shoot: { finishing: 499, power: 488, composure: 501 },
      pass: { shortPass: 442, longPass: 439, accuracy: 488 },
      dribble: { breakout: 504, keeping: 500, ballTouch: 491 },
      defense: { tackle: 234, interception: 275, marking: 255 },
      physical: { jumping: 455, contact: 478, stamina: 452 },
      speed: { running: 509, agility: 501 }
    },
    maxEnhanced: {
      overall: 15958,
      baseStats: { shoot: 3093, pass: 2902, dribble: 3076, defense: 2261, physical: 2966, speed: 2056 },
      detailStats: {
        shoot: { finishing: 1034, power: 1023, composure: 1036 },
        pass: { shortPass: 953, longPass: 950, accuracy: 999 },
        dribble: { breakout: 1027, keeping: 1023, ballTouch: 1026 },
        defense: { tackle: 733, interception: 774, marking: 754 },
        physical: { jumping: 978, contact: 1013, stamina: 975 },
        speed: { running: 1032, agility: 1024 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: 'ショックウェーブ', rank: '金', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: 'フェノメーヌ・キャピテーヌ', rank: '金', description: '発動条件：キャプテンに指定　/　CF・LW・RWのムービング選手が突破力・走力UP' },
      { name: '速射砲', rank: '金', description: '発動条件：好調　/　決定力・冷静さ・敏捷性UP' },
      { name: '高速のボールタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

fs.writeFileSync(mockPath, mockPrefix + p395ObjStr, 'utf-8');
console.log('✅ Appended p395 (キリアン・エンバペ(2026)) to src/data/mockData.js');

// 6. Node VM Evaluation & Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(mockPrefix + p395ObjStr, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
console.log('Total players in mockData.js:', players.length);
const p395 = players.find(p => p.id === 'p395');

if (p395) {
  console.log('🎉 VERIFICATION SUCCESSFUL!');
  console.log('ID:', p395.id);
  console.log('Name:', p395.name);
  console.log('Position:', p395.mainPosition);
  console.log('Nationality:', p395.nationality);
  console.log('Policy:', p395.policy);
  console.log('Overall:', p395.overall, '-> Max Overall:', p395.maxOverall);
  console.log('Skill:', p395.skill.name);
  console.log('Abilities count:', p395.abilities.length);
  p395.abilities.forEach((a, idx) => console.log(`  Ab#${idx+1}: [${a.rank}] ${a.name} -> ${a.description}`));
} else {
  console.error('❌ ERROR: p395 not found in INITIAL_PLAYERS!');
  process.exit(1);
}
