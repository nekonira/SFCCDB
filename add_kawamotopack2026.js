const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TATSUMASA KAWAMOTO PACK 2026 (p262) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786121688970.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kawamotoPack2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KAWAMOTO_PACK_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kawamotoPack2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p261Idx = mockCode.indexOf("id: 'p261'");
const altP261Idx = mockCode.indexOf('"id": "p261"');
const targetP261Idx = p261Idx !== -1 ? p261Idx : altP261Idx;

if (targetP261Idx === -1) {
  console.error("Could not find p261 in mockData.js!");
  process.exit(1);
}

const p261AvatarIdx = mockCode.indexOf("avatarUrl:", targetP261Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP261Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP261Idx);
const p261EndIdx = mockCode.indexOf("}", p261AvatarIdx);

mockCode = mockCode.substring(0, p261EndIdx + 1);

const kawamotoPack2026Obj = `,
  {
    id: 'p262',
    name: '河本龍将(パック)',
    readingName: 'かわもと・たつまさ',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 5494,
    maxOverall: 11207,
    baseStats: { shoot: 830, pass: 899, dribble: 802, defense: 1308, physical: 971, speed: 710 },
    detailStats: {
      shoot: { finishing: 298, power: 269, composure: 263 },
      pass: { shortPass: 299, longPass: 326, accuracy: 274 },
      dribble: { breakout: 280, keeping: 261, ballTouch: 261 },
      defense: { tackle: 456, interception: 430, marking: 422 },
      physical: { jumping: 430, contact: 303, stamina: 238 },
      speed: { running: 362, agility: 348 }
    },
    maxEnhanced: {
      overall: 11207,
      baseStats: { shoot: 1751, pass: 1964, dribble: 1723, defense: 2373, physical: 2024, speed: 1372 },
      detailStats: {
        shoot: { finishing: 605, power: 576, composure: 570 },
        pass: { shortPass: 654, longPass: 681, accuracy: 629 },
        dribble: { breakout: 587, keeping: 568, ballTouch: 568 },
        defense: { tackle: 811, interception: 785, marking: 777 },
        physical: { jumping: 785, contact: 658, stamina: 581 },
        speed: { running: 693, agility: 679 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: '上空の守護神', rank: '銀', description: '発動条件：好調　/　セービング・ジャンプUP' },
      { name: '冷静沈着', rank: '銅', description: '発動条件：途中出場　/　反応速度・1VS1UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += kawamotoPack2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p262 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kawamotoPack2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/kawamotoPack2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx (Fix precedence with p111)
const p262Check = `  if (player.id === 'p262' || (player.name && (player.name.includes('河本龍将') || player.name.includes('河本龍将(パック)') || player.name.includes('Tatsumasa Kawamoto')))) {\n    return window.KAWAMOTO_PACK_2026_IMAGE || player.avatarUrl || '';\n  }`;

function updateAppFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf-8');

  // Fix p111 check so it doesn't match 龍将 or パック
  const origP111 = `if ((player.name && (player.name.includes('河本') || player.name.includes('鬼茂') || player.name.includes('Kawamoto'))) || player.id === 'p111') {`;
  const altP111 = `if (player.name && (player.name.includes('河本') || player.name.includes('鬼茂') || player.name.includes('Kawamoto')) || player.id === 'p111') {`;
  const newP111 = `if (player.id === 'p262' || (player.name && (player.name.includes('河本龍将') || player.name.includes('河本龍将(パック)') || player.name.includes('Tatsumasa Kawamoto')))) {\n    return window.KAWAMOTO_PACK_2026_IMAGE || player.avatarUrl || '';\n  }\n  if ((player.name && ((player.name.includes('河本') && !player.name.includes('龍将') && !player.name.includes('パック')) || player.name.includes('鬼茂') || player.name.includes('Kawamoto Onishige'))) || player.id === 'p111') {`;

  if (code.includes(origP111)) {
    code = code.replace(origP111, newP111);
  } else if (code.includes(altP111)) {
    code = code.replace(altP111, newP111);
  }

  // Also add p262 to the end of resolver chain if not present
  if (!code.includes("player.id === 'p262'")) {
    const marker = "if (player.id === 'p261'";
    const altMarker = 'if (player.id === "p261"';
    const activeMarker = code.includes(marker) ? marker : (code.includes(altMarker) ? altMarker : null);

    if (activeMarker) {
      const idx = code.indexOf(activeMarker);
      const endIdx = code.indexOf('}', idx) + 1;
      const partBefore = code.substring(0, endIdx);
      const partAfter = code.substring(endIdx);
      code = partBefore + '\n' + p262Check + partAfter;
    }
  }

  fs.writeFileSync(filePath, code, 'utf-8');
  console.log('4/5. Updated resolver in', filePath);
}

updateAppFile(path.join(__dirname, 'src', 'app.js'));
updateAppFile(path.join(__dirname, 'src', 'app.jsx'));

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p262 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p262');
console.log('6. Verification of p262:', p262 ? p262.name : 'MISSING');
if (p262) {
  console.log('   Overall:', p262.overall, '| MaxOverall:', p262.maxOverall);
  console.log('   Policy:', p262.policy, '| PlayStyle:', p262.playStyle, p262.playStyleLevel);
  console.log('   Nationality:', p262.nationality, '| Position:', p262.mainPosition);
  console.log('   Skill:', p262.skill.name);
  console.log('   Abilities:', p262.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KAWAMOTO_PACK_2026_IMAGE:', sandbox.window.KAWAMOTO_PACK_2026_IMAGE ? 'LOADED' : 'MISSING');
