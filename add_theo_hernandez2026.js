const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Registering Player: テオ・エルナンデス [p400] ===');

// 1. Image path & Base64 conversion
const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3f0246b5-eb02-4d24-a64d-198f2196ea43\\.user_uploaded\\media_1791951437808.png';
if (!fs.existsSync(imgPath)) {
  console.error('Uploaded image file not found at:', imgPath);
  process.exit(1);
}

const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/png;base64,' + imgBuffer.toString('base64');

// 2. Write src/data/theoHernandez2026Image.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'theoHernandez2026Image.js');
const imgJsContent = `window.THEO_HERNANDEZ_2026_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('✅ Created src/data/theoHernandez2026Image.js');

// 3. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/theoHernandez2026Image.js"></script>\n';

if (!htmlContent.includes('theoHernandez2026Image.js')) {
  const targetTag = '<script src="./src/data/tatsuta2026Image.js"></script>';
  if (htmlContent.includes(targetTag)) {
    htmlContent = htmlContent.replace(targetTag, targetTag + '\n' + scriptTag.trimEnd());
  } else {
    const fallbackTag = '<script src="./src/data/ibrahimaKonate2026Image.js"></script>';
    if (htmlContent.includes(fallbackTag)) {
      htmlContent = htmlContent.replace(fallbackTag, fallbackTag + '\n' + scriptTag.trimEnd());
    } else {
      const specialDataTag = '<script src="./src/data/specialCardsData.js"></script>';
      htmlContent = htmlContent.replace(specialDataTag, scriptTag + '  ' + specialDataTag);
    }
  }
  // Update cache busting timestamp
  const now = Date.now();
  htmlContent = htmlContent.replace(/app\.js\?v=\d+/, `app.js?v=${now}`);
  htmlContent = htmlContent.replace(/main\.js\?v=\d+/, `main.js?v=${now}`);
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('✅ Updated index.html with theoHernandez2026Image.js and cache buster');
} else {
  console.log('ℹ️ theoHernandez2026Image.js already in index.html');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx and src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsx = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsx.includes('"p400"')) {
    appJsx = appJsx.replace(
      '"p399": "IBRAHIMA_KONATE_2026_IMAGE"',
      '"p399": "IBRAHIMA_KONATE_2026_IMAGE",\n    "p400": "THEO_HERNANDEZ_2026_IMAGE"'
    );
    fs.writeFileSync(appJsxPath, appJsx, 'utf-8');
    console.log('✅ Updated src/app.jsx PLAYER_IMAGE_MAP with p400');
  }
}

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf-8');
if (!appJs.includes('"p400"')) {
  appJs = appJs.replace(
    '"p399":"IBRAHIMA_KONATE_2026_IMAGE"',
    '"p399":"IBRAHIMA_KONATE_2026_IMAGE","p400":"THEO_HERNANDEZ_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJs, 'utf-8');
  console.log('✅ Updated src/app.js PLAYER_IMAGE_MAP with p400');
}

// 5. Update src/data/mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p399Idx = mockCode.indexOf("id: 'p399'");
if (p399Idx === -1) {
  console.error("Could not find p399 in mockData.js");
  process.exit(1);
}

const p399AvatarIdx = mockCode.indexOf("avatarUrl:", p399Idx);
const p399EndIdx = mockCode.indexOf("}", p399AvatarIdx);

const mockPrefix = mockCode.substring(0, p399EndIdx + 1);

const p400ObjStr = `,
  {
    id: 'p400',
    name: 'テオ・エルナンデス',
    readingName: 'てお・えるなんです',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: '攻撃的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 7358,
    maxOverall: 15649,
    baseStats: { shoot: 1206, pass: 1272, dribble: 1336, defense: 1338, physical: 1334, speed: 937 },
    detailStats: {
      shoot: { finishing: 398, power: 405, composure: 403 },
      pass: { shortPass: 425, longPass: 420, accuracy: 427 },
      dribble: { breakout: 449, keeping: 449, ballTouch: 438 },
      defense: { tackle: 455, interception: 446, marking: 437 },
      physical: { jumping: 434, contact: 446, stamina: 454 },
      speed: { running: 477, agility: 460 }
    },
    maxEnhanced: {
      overall: 15649,
      baseStats: { shoot: 2703, pass: 2841, dribble: 2869, defense: 2943, physical: 2903, speed: 2007 },
      detailStats: {
        shoot: { finishing: 897, power: 904, composure: 902 },
        pass: { shortPass: 948, longPass: 943, accuracy: 950 },
        dribble: { breakout: 960, keeping: 960, ballTouch: 949 },
        defense: { tackle: 990, interception: 981, marking: 972 },
        physical: { jumping: 945, contact: 969, stamina: 989 },
        speed: { running: 1012, agility: 995 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: {
      name: 'チェーンカッター',
      rank: '銀',
      description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP'
    },
    abilities: [
      { name: 'ハイスピードスティール', rank: '金', description: '発動条件：好調　/　タックル・走力・敏捷性UP' },
      { name: 'エンドレスマーカー', rank: '銀', description: '発動条件：好調　/　マーク・スタミナUP' },
      { name: '瞬間の球際力', rank: '銅', description: '発動条件：好調　/　パスカット・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

fs.writeFileSync(mockPath, mockPrefix + p400ObjStr, 'utf-8');
console.log('✅ Appended p400 (テオ・エルナンデス) to src/data/mockData.js');

// 6. Node VM Evaluation & Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(mockPrefix + p400ObjStr, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
const p400 = players.find(p => p.id === 'p400');
if (!p400) {
  console.error('❌ Failed to find p400 in VM!');
  process.exit(1);
}

console.log('-------------------------------------------');
console.log('🎉 Verification Successful:');
console.log('Total Players:', players.length);
console.log('Registered Player:', p400.id, p400.name);
console.log('Position / Policy:', p400.mainPosition, '/', p400.policy);
console.log('PlayStyle:', p400.playStyle, p400.playStyleLevel);
console.log('Overall / MaxOverall:', p400.overall, '/', p400.maxOverall);
console.log('Skill:', JSON.stringify(p400.skill));
console.log('Abilities:', JSON.stringify(p400.abilities));
console.log('Image Var Defined:', !!sandbox.window.THEO_HERNANDEZ_2026_IMAGE);
console.log('Image Var Length:', sandbox.window.THEO_HERNANDEZ_2026_IMAGE?.length);
console.log('-------------------------------------------');
