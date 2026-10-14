const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Registering Player: ブラッドリー・バルコラ [p402] ===');

// 1. Image path & Base64 conversion
const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3f0246b5-eb02-4d24-a64d-198f2196ea43\\.user_uploaded\\media_1791952283821.png';
if (!fs.existsSync(imgPath)) {
  console.error('Uploaded image file not found at:', imgPath);
  process.exit(1);
}

const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/png;base64,' + imgBuffer.toString('base64');

// 2. Write src/data/bradleyBarcola2026Image.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'bradleyBarcola2026Image.js');
const imgJsContent = `window.BRADLEY_BARCOLA_2026_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('✅ Created src/data/bradleyBarcola2026Image.js');

// 3. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/bradleyBarcola2026Image.js"></script>\n';

if (!htmlContent.includes('bradleyBarcola2026Image.js')) {
  const targetTag = '<script src="./src/data/barfie2026Image.js"></script>';
  if (htmlContent.includes(targetTag)) {
    htmlContent = htmlContent.replace(targetTag, targetTag + '\n' + scriptTag.trimEnd());
  } else {
    const fallbackTag = '<script src="./src/data/maloGusto2026Image.js"></script>';
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
  htmlContent = htmlContent.replace(/mockData\.js\?v=\d+/, `mockData.js?v=${now}`);
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('✅ Updated index.html with bradleyBarcola2026Image.js and cache buster');
} else {
  console.log('ℹ️ bradleyBarcola2026Image.js already in index.html');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx and src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsx = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsx.includes('"p402"')) {
    appJsx = appJsx.replace(
      '"p401": "MALO_GUSTO_2026_IMAGE"',
      '"p401": "MALO_GUSTO_2026_IMAGE",\n    "p402": "BRADLEY_BARCOLA_2026_IMAGE"'
    );
    fs.writeFileSync(appJsxPath, appJsx, 'utf-8');
    console.log('✅ Updated src/app.jsx PLAYER_IMAGE_MAP with p402');
  }
}

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf-8');
if (!appJs.includes('"p402"')) {
  appJs = appJs.replace(
    '"p401":"MALO_GUSTO_2026_IMAGE"',
    '"p401":"MALO_GUSTO_2026_IMAGE","p402":"BRADLEY_BARCOLA_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJs, 'utf-8');
  console.log('✅ Updated src/app.js PLAYER_IMAGE_MAP with p402');
}

// 5. Update src/data/mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p401Idx = mockCode.indexOf("id: 'p401'");
if (p401Idx === -1) {
  console.error("Could not find p401 in mockData.js");
  process.exit(1);
}

const p401AvatarIdx = mockCode.indexOf("avatarUrl:", p401Idx);
const p401EndIdx = mockCode.indexOf("}", p401AvatarIdx);

const mockPrefix = mockCode.substring(0, p401EndIdx + 1);

const p402ObjStr = `,
  {
    id: 'p402',
    name: 'ブラッドリー・バルコラ',
    readingName: 'ぶらっどりー・ばるこら',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'ドリブラーLW',
    playStyleLevel: 'Ⅱ',
    overall: 7294,
    maxOverall: 15550,
    baseStats: { shoot: 1334, pass: 1230, dribble: 1395, defense: 988, physical: 1162, speed: 946 },
    detailStats: {
      shoot: { finishing: 452, power: 439, composure: 443 },
      pass: { shortPass: 416, longPass: 411, accuracy: 403 },
      dribble: { breakout: 475, keeping: 461, ballTouch: 459 },
      defense: { tackle: 312, interception: 347, marking: 329 },
      physical: { jumping: 415, contact: 379, stamina: 368 },
      speed: { running: 473, agility: 473 }
    },
    maxEnhanced: {
      overall: 15550,
      baseStats: { shoot: 2891, pass: 2799, dribble: 2988, defense: 2497, physical: 2707, speed: 2016 },
      detailStats: {
        shoot: { finishing: 975, power: 950, composure: 966 },
        pass: { shortPass: 939, longPass: 934, accuracy: 926 },
        dribble: { breakout: 1010, keeping: 996, ballTouch: 982 },
        defense: { tackle: 823, interception: 846, marking: 828 },
        physical: { jumping: 926, contact: 890, stamina: 891 },
        speed: { running: 1008, agility: 1008 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: {
      name: 'ジャックナイフ',
      rank: '銀',
      description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP'
    },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: 'ムービングターゲット', rank: '銀', description: '発動条件：好調　/　キープ力・走力UP' },
      { name: 'ゴール前の落ち着き', rank: '銅', description: '発動条件：途中出場　/　決定力・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

fs.writeFileSync(mockPath, mockPrefix + p402ObjStr, 'utf-8');
console.log('✅ Appended p402 (ブラッドリー・バルコラ) to src/data/mockData.js');

// 6. Node VM Evaluation & Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(mockPrefix + p402ObjStr, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
const p402 = players.find(p => p.id === 'p402');
if (!p402) {
  console.error('❌ Failed to find p402 in VM!');
  process.exit(1);
}

console.log('-------------------------------------------');
console.log('🎉 Verification Successful:');
console.log('Total Players:', players.length);
console.log('Registered Player:', p402.id, p402.name);
console.log('Position / Policy:', p402.mainPosition, '/', p402.policy);
console.log('PlayStyle:', p402.playStyle, p402.playStyleLevel);
console.log('Overall / MaxOverall:', p402.overall, '/', p402.maxOverall);
console.log('Skill:', JSON.stringify(p402.skill));
console.log('Abilities:', JSON.stringify(p402.abilities));
console.log('Image Var Defined:', !!sandbox.window.BRADLEY_BARCOLA_2026_IMAGE);
console.log('Image Var Length:', sandbox.window.BRADLEY_BARCOLA_2026_IMAGE?.length);
console.log('-------------------------------------------');
