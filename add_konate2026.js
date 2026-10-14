const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Registering Player: イブラヒマ・コナテ [p399] ===');

// 1. Image path & Base64 conversion
const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3f0246b5-eb02-4d24-a64d-198f2196ea43\\.user_uploaded\\media_1791951236837.png';
if (!fs.existsSync(imgPath)) {
  console.error('Uploaded image file not found at:', imgPath);
  process.exit(1);
}

const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/png;base64,' + imgBuffer.toString('base64');

// 2. Write src/data/ibrahimaKonate2026Image.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'ibrahimaKonate2026Image.js');
const imgJsContent = `window.IBRAHIMA_KONATE_2026_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('✅ Created src/data/ibrahimaKonate2026Image.js');

// 3. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/ibrahimaKonate2026Image.js"></script>\n';

if (!htmlContent.includes('ibrahimaKonate2026Image.js')) {
  const targetTag = '<script src="./src/data/izumiToya2026TSImage.js"></script>';
  if (htmlContent.includes(targetTag)) {
    htmlContent = htmlContent.replace(targetTag, targetTag + '\n' + scriptTag.trimEnd());
  } else {
    const fallbackTag = '<script src="./src/data/specialCardsData.js"></script>';
    htmlContent = htmlContent.replace(fallbackTag, scriptTag + '  ' + fallbackTag);
  }
  // Update cache busting timestamp
  const now = Date.now();
  htmlContent = htmlContent.replace(/app\.js\?v=\d+/, `app.js?v=${now}`);
  htmlContent = htmlContent.replace(/main\.js\?v=\d+/, `main.js?v=${now}`);
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('✅ Updated index.html with ibrahimaKonate2026Image.js and cache buster');
} else {
  console.log('ℹ️ ibrahimaKonate2026Image.js already in index.html');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx and src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsx = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsx.includes('"p399"')) {
    appJsx = appJsx.replace(
      '"p398": "LUCAS_CHEVALIER_2026_IMAGE"',
      '"p398": "LUCAS_CHEVALIER_2026_IMAGE",\n    "p399": "IBRAHIMA_KONATE_2026_IMAGE"'
    );
    fs.writeFileSync(appJsxPath, appJsx, 'utf-8');
    console.log('✅ Updated src/app.jsx PLAYER_IMAGE_MAP with p399');
  }
}

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf-8');
if (!appJs.includes('"p399"')) {
  appJs = appJs.replace(
    '"p398":"LUCAS_CHEVALIER_2026_IMAGE"',
    '"p398":"LUCAS_CHEVALIER_2026_IMAGE","p399":"IBRAHIMA_KONATE_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJs, 'utf-8');
  console.log('✅ Updated src/app.js PLAYER_IMAGE_MAP with p399');
}

// 5. Update src/data/mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p398Idx = mockCode.indexOf("id: 'p398'");
if (p398Idx === -1) {
  console.error("Could not find p398 in mockData.js");
  process.exit(1);
}

const p398AvatarIdx = mockCode.indexOf("avatarUrl:", p398Idx);
const p398EndIdx = mockCode.indexOf("}", p398AvatarIdx);

const mockPrefix = mockCode.substring(0, p398EndIdx + 1);

const p399ObjStr = `,
  {
    id: 'p399',
    name: 'イブラヒマ・コナテ',
    readingName: 'いぶらひま・こなて',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'スプリントCB',
    playStyleLevel: 'Ⅱ',
    overall: 7478,
    maxOverall: 15775,
    baseStats: { shoot: 985, pass: 1143, dribble: 1328, defense: 1437, physical: 1357, speed: 907 },
    detailStats: {
      shoot: { finishing: 301, power: 356, composure: 328 },
      pass: { shortPass: 410, longPass: 389, accuracy: 344 },
      dribble: { breakout: 432, keeping: 442, ballTouch: 454 },
      defense: { tackle: 474, interception: 480, marking: 483 },
      physical: { jumping: 465, contact: 483, stamina: 409 },
      speed: { running: 460, agility: 447 }
    },
    maxEnhanced: {
      overall: 15775,
      baseStats: { shoot: 2482, pass: 2712, dribble: 2861, defense: 3042, physical: 2950, speed: 1953 },
      detailStats: {
        shoot: { finishing: 800, power: 855, composure: 827 },
        pass: { shortPass: 933, longPass: 912, accuracy: 867 },
        dribble: { breakout: 943, keeping: 953, ballTouch: 965 },
        defense: { tackle: 1009, interception: 1015, marking: 1018 },
        physical: { jumping: 1000, contact: 1018, stamina: 932 },
        speed: { running: 983, agility: 970 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: {
      name: 'エリアの格闘家',
      rank: '銀',
      description: '発動エリア：中左中右・後左中右　/　発動条件：コンタクト時　/　コンタクト・タックル・マークUP'
    },
    abilities: [
      { name: 'パワークラッシャー', rank: '金', description: '発動条件：好調　/　パスカット・マーク・コンタクトUP' },
      { name: 'エアバトラー', rank: '銀', description: '発動条件：絶好調　/　タックル・ジャンプUP' },
      { name: 'マラソンマン', rank: '銅', description: '発動条件：絶好調　/　スタミナ・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

fs.writeFileSync(mockPath, mockPrefix + p399ObjStr, 'utf-8');
console.log('✅ Appended p399 (イブラヒマ・コナテ) to src/data/mockData.js');

// 6. Node VM Evaluation & Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(mockPrefix + p399ObjStr, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
const p399 = players.find(p => p.id === 'p399');
if (!p399) {
  console.error('❌ Failed to find p399 in VM!');
  process.exit(1);
}

console.log('-------------------------------------------');
console.log('🎉 Verification Successful:');
console.log('Total Players:', players.length);
console.log('Registered Player:', p399.id, p399.name);
console.log('Position / Policy:', p399.mainPosition, '/', p399.policy);
console.log('PlayStyle:', p399.playStyle, p399.playStyleLevel);
console.log('Overall / MaxOverall:', p399.overall, '/', p399.maxOverall);
console.log('Skill:', JSON.stringify(p399.skill));
console.log('Abilities:', JSON.stringify(p399.abilities));
console.log('Image Var Defined:', !!sandbox.window.IBRAHIMA_KONATE_2026_IMAGE);
console.log('Image Var Length:', sandbox.window.IBRAHIMA_KONATE_2026_IMAGE?.length);
console.log('-------------------------------------------');
