const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YAMAMOTO OUTA 2026 TS (p269) ===');

// 1. Convert Image to JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3b7f3f66-5a3c-4666-88d6-639d6217234d\\media__1786510264356.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yamamotoOuta2026TSImage.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YAMAMOTO_OUTA_2026_TS_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. Created yamamotoOuta2026TSImage.js. Size:', fs.statSync(imageJsPath).size);

// 2. Add script tag to index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');
if (!indexContent.includes('yamamotoOuta2026TSImage.js')) {
  indexContent = indexContent.replace(
    '<!-- 2. Full Player Database -->',
    '  <script src="./src/data/yamamotoOuta2026TSImage.js"></script>\n  <!-- 2. Full Player Database -->'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('2. Added script tag to index.html.');
}

// 3. Append p269 to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p268Idx = mockCode.indexOf("id: 'p268'");
if (p268Idx === -1) {
  console.error('Could not find p268 in mockData.js!');
  process.exit(1);
}

const p268AvatarIdx = mockCode.indexOf("avatarUrl:", p268Idx);
const p268EndIdx = mockCode.indexOf("}", p268AvatarIdx);

mockCode = mockCode.substring(0, p268EndIdx + 1);

const yamamoto2026TSObj = `,
  {
    id: 'p269',
    name: '山本桜大(2026TS)',
    readingName: 'やまもと・おうた',
    category: 'MF',
    mainPosition: 'OMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6831,
    maxOverall: 14927,
    baseStats: { shoot: 1295, pass: 1151, dribble: 1304, defense: 1084, physical: 1193, speed: 884 },
    detailStats: {
      shoot: { finishing: 456, power: 402, composure: 437 },
      pass: { shortPass: 382, longPass: 362, accuracy: 407 },
      dribble: { breakout: 442, keeping: 444, ballTouch: 418 },
      defense: { tackle: 355, interception: 339, marking: 390 },
      physical: { jumping: 402, contact: 375, stamina: 416 },
      speed: { running: 441, agility: 443 }
    },
    maxEnhanced: {
      overall: 14927,
      baseStats: { shoot: 2840, pass: 2732, dribble: 2873, defense: 2629, physical: 2762, speed: 1918 },
      detailStats: {
        shoot: { finishing: 967, power: 913, composure: 960 },
        pass: { shortPass: 917, longPass: 885, accuracy: 930 },
        dribble: { breakout: 965, keeping: 967, ballTouch: 941 },
        defense: { tackle: 878, interception: 850, marking: 901 },
        physical: { jumping: 913, contact: 898, stamina: 951 },
        speed: { running: 952, agility: 966 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 1, longShoot: 2,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'ロングキャノン', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：シュート・ロングシュート時　/　決定力・キック力UP' },
    abilities: [
      { name: 'ゴール前の嗅覚', rank: '銀', description: '発動条件：絶好調　/　決定力・敏捷性UP' },
      { name: '冷静なファイター', rank: '銀', description: '発動条件：絶好調　/　冷静さ・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += yamamoto2026TSObj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('3. mockData.js updated with p269.');

// 4. Update PLAYER_IMAGE_MAP in app.js and app.jsx
function addPlayerToMapInFile(fileName) {
  const filePath = path.join(__dirname, 'src', fileName);
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf-8');

  if (!code.includes('"p269": "YAMAMOTO_OUTA_2026_TS_IMAGE"')) {
    code = code.replace(
      '"p268": "IZUMI_TOYA_2026_TS_IMAGE"',
      '"p268": "IZUMI_TOYA_2026_TS_IMAGE",\n  "p269": "YAMAMOTO_OUTA_2026_TS_IMAGE"'
    );
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`4. Updated PLAYER_IMAGE_MAP in ${fileName}.`);
  }
}

addPlayerToMapInFile('app.js');
addPlayerToMapInFile('app.jsx');

// 5. Verification
const sandbox = { React: {}, window: {} };
sandbox.window = sandbox;
sandbox.window.React = sandbox.React;
vm.createContext(sandbox);

vm.runInContext(imageJsContent, sandbox);
vm.runInContext(mockCode, sandbox);

const appJsCode = fs.readFileSync(path.join(__dirname, 'src', 'app.js'), 'utf-8');
vm.runInContext(appJsCode, sandbox);

const p269 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p269');
console.log('5. Verification of p269:');
console.log('   Name:', p269 ? p269.name : 'MISSING');
if (p269) {
  console.log('   Overall:', p269.overall, '| MaxOverall:', p269.maxOverall);
  console.log('   Policy:', p269.policy, '| PlayStyle:', p269.playStyle, p269.playStyleLevel);
  console.log('   Skill:', p269.skill.name, '->', p269.skill.description);
  console.log('   Abilities:', p269.abilities.map(a => a.name).join(', '));
  const avatarUrl = sandbox.window.getPlayerAvatarUrl(p269);
  console.log('   Avatar URL resolved:', avatarUrl ? 'LOADED (Base64 OK)' : 'FAILED');
}
