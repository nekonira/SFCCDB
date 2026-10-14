const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Registering Player: マロ・ギュスト [p401] ===');

// 1. Image path & Base64 conversion
const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3f0246b5-eb02-4d24-a64d-198f2196ea43\\.user_uploaded\\media_1791952127849.png';
if (!fs.existsSync(imgPath)) {
  console.error('Uploaded image file not found at:', imgPath);
  process.exit(1);
}

const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/png;base64,' + imgBuffer.toString('base64');

// 2. Write src/data/maloGusto2026Image.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'maloGusto2026Image.js');
const imgJsContent = `window.MALO_GUSTO_2026_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('✅ Created src/data/maloGusto2026Image.js');

// 3. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/maloGusto2026Image.js"></script>\n';

if (!htmlContent.includes('maloGusto2026Image.js')) {
  const targetTag = '<script src="./src/data/maeng2026Image.js"></script>';
  if (htmlContent.includes(targetTag)) {
    htmlContent = htmlContent.replace(targetTag, targetTag + '\n' + scriptTag.trimEnd());
  } else {
    const fallbackTag = '<script src="./src/data/theoHernandez2026Image.js"></script>';
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
  console.log('✅ Updated index.html with maloGusto2026Image.js and cache buster');
} else {
  console.log('ℹ️ maloGusto2026Image.js already in index.html');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx and src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsx = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsx.includes('"p401"')) {
    appJsx = appJsx.replace(
      '"p400": "THEO_HERNANDEZ_2026_IMAGE"',
      '"p400": "THEO_HERNANDEZ_2026_IMAGE",\n    "p401": "MALO_GUSTO_2026_IMAGE"'
    );
    fs.writeFileSync(appJsxPath, appJsx, 'utf-8');
    console.log('✅ Updated src/app.jsx PLAYER_IMAGE_MAP with p401');
  }
}

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf-8');
if (!appJs.includes('"p401"')) {
  appJs = appJs.replace(
    '"p400":"THEO_HERNANDEZ_2026_IMAGE"',
    '"p400":"THEO_HERNANDEZ_2026_IMAGE","p401":"MALO_GUSTO_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJs, 'utf-8');
  console.log('✅ Updated src/app.js PLAYER_IMAGE_MAP with p401');
}

// 5. Update src/data/mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p400Idx = mockCode.indexOf("id: 'p400'");
if (p400Idx === -1) {
  console.error("Could not find p400 in mockData.js");
  process.exit(1);
}

const p400AvatarIdx = mockCode.indexOf("avatarUrl:", p400Idx);
const p400EndIdx = mockCode.indexOf("}", p400AvatarIdx);

const mockPrefix = mockCode.substring(0, p400EndIdx + 1);

const p401ObjStr = `,
  {
    id: 'p401',
    name: 'マロ・ギュスト',
    readingName: 'まろ・ぎゅすと',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: '守備的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 7162,
    maxOverall: 15422,
    baseStats: { shoot: 1228, pass: 1206, dribble: 1315, defense: 1330, physical: 1239, speed: 936 },
    detailStats: {
      shoot: { finishing: 423, power: 385, composure: 420 },
      pass: { shortPass: 398, longPass: 416, accuracy: 392 },
      dribble: { breakout: 449, keeping: 421, ballTouch: 445 },
      defense: { tackle: 457, interception: 436, marking: 437 },
      physical: { jumping: 372, contact: 413, stamina: 454 },
      speed: { running: 474, agility: 462 }
    },
    maxEnhanced: {
      overall: 15422,
      baseStats: { shoot: 2725, pass: 2775, dribble: 2848, defense: 2935, physical: 2808, speed: 2006 },
      detailStats: {
        shoot: { finishing: 922, power: 884, composure: 919 },
        pass: { shortPass: 921, longPass: 939, accuracy: 915 },
        dribble: { breakout: 960, keeping: 932, ballTouch: 956 },
        defense: { tackle: 992, interception: 971, marking: 972 },
        physical: { jumping: 883, contact: 936, stamina: 989 },
        speed: { running: 1009, agility: 997 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: {
      name: '熟練のインターセプト',
      rank: '銀',
      description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP'
    },
    abilities: [
      { name: 'スピードクラッシャー', rank: '銀', description: '発動条件：好調　/　タックル・走力UP' },
      { name: '俊敏なマーカー', rank: '銀', description: '発動条件：好調　/　パスカット・敏捷性UP' },
      { name: 'ピッチの分断者', rank: '銅', description: '発動条件：絶好調　/　パスカット・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

fs.writeFileSync(mockPath, mockPrefix + p401ObjStr, 'utf-8');
console.log('✅ Appended p401 (マロ・ギュスト) to src/data/mockData.js');

// 6. Node VM Evaluation & Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(mockPrefix + p401ObjStr, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
const p401 = players.find(p => p.id === 'p401');
if (!p401) {
  console.error('❌ Failed to find p401 in VM!');
  process.exit(1);
}

console.log('-------------------------------------------');
console.log('🎉 Verification Successful:');
console.log('Total Players:', players.length);
console.log('Registered Player:', p401.id, p401.name);
console.log('Position / Policy:', p401.mainPosition, '/', p401.policy);
console.log('PlayStyle:', p401.playStyle, p401.playStyleLevel);
console.log('Overall / MaxOverall:', p401.overall, '/', p401.maxOverall);
console.log('Skill:', JSON.stringify(p401.skill));
console.log('Abilities:', JSON.stringify(p401.abilities));
console.log('Image Var Defined:', !!sandbox.window.MALO_GUSTO_2026_IMAGE);
console.log('Image Var Length:', sandbox.window.MALO_GUSTO_2026_IMAGE?.length);
console.log('-------------------------------------------');
