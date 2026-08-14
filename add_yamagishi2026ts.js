const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YAMAGISHI YUYA 2026 TS (p264) ===');

// 1. Convert Image to JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3b7f3f66-5a3c-4666-88d6-639d6217234d\\media__1786509125707.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yamagishi2026TSImage.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YAMAGISHI_2026_TS_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. Created yamagishi2026TSImage.js. Size:', fs.statSync(imageJsPath).size);

// 2. Add script tag to index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');
if (!indexContent.includes('yamagishi2026TSImage.js')) {
  indexContent = indexContent.replace(
    '<!-- 2. Full Player Database -->',
    '  <script src="./src/data/yamagishi2026TSImage.js"></script>\n  <!-- 2. Full Player Database -->'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('2. Added script tag to index.html.');
}

// 3. Append p264 to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p263Idx = mockCode.indexOf("id: 'p263'");
if (p263Idx === -1) {
  console.error('Could not find p263 in mockData.js!');
  process.exit(1);
}

const p263AvatarIdx = mockCode.indexOf("avatarUrl:", p263Idx);
const p263EndIdx = mockCode.indexOf("}", p263AvatarIdx);

mockCode = mockCode.substring(0, p263EndIdx + 1);

const yamagishi2026TSObj = `,
  {
    id: 'p264',
    name: '山岸祐也(2026TS)',
    readingName: 'やまぎし・ゆうや',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 7052,
    maxOverall: 15298,
    baseStats: { shoot: 1349, pass: 1115, dribble: 1333, defense: 828, physical: 1280, speed: 830 },
    detailStats: {
      shoot: { finishing: 455, power: 426, composure: 468 },
      pass: { shortPass: 379, longPass: 369, accuracy: 367 },
      dribble: { breakout: 432, keeping: 438, ballTouch: 463 },
      defense: { tackle: 266, interception: 284, marking: 278 },
      physical: { jumping: 439, contact: 423, stamina: 418 },
      speed: { running: 397, agility: 433 }
    },
    maxEnhanced: {
      overall: 15298,
      baseStats: { shoot: 2954, pass: 2648, dribble: 2914, defense: 2325, physical: 2861, speed: 1876 },
      detailStats: {
        shoot: { finishing: 990, power: 961, composure: 1003 },
        pass: { shortPass: 890, longPass: 880, accuracy: 878 },
        dribble: { breakout: 955, keeping: 961, ballTouch: 998 },
        defense: { tackle: 765, interception: 783, marking: 777 },
        physical: { jumping: 962, contact: 958, stamina: 941 },
        speed: { running: 920, agility: 956 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '上空の覇者', rank: '金', description: '発動エリア：前中　/　発動条件：ヘディングシュート時　/　決定力・ジャンプUP' },
    abilities: [
      { name: '上空のスナイパー', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ジャンプUP' },
      { name: 'ゴール前の落ち着き', rank: '銀', description: '発動条件：好調　/　決定力・ボールタッチUP' },
      { name: '保持からの一撃', rank: '銅', description: '発動条件：途中出場　/　キック力・キープ力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += yamagishi2026TSObj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('3. mockData.js updated with p264.');

// 4. Update PLAYER_IMAGE_MAP in app.js and app.jsx
function addPlayerToMapInFile(fileName) {
  const filePath = path.join(__dirname, 'src', fileName);
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf-8');

  if (!code.includes("'p264': 'YAMAGISHI_2026_TS_IMAGE'")) {
    code = code.replace(
      "'p263': 'LEO_CEARA_2026_IMAGE'",
      "'p263': 'LEO_CEARA_2026_IMAGE',\n  'p264': 'YAMAGISHI_2026_TS_IMAGE'"
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

const p264 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p264');
console.log('5. Verification of p264:');
console.log('   Name:', p264 ? p264.name : 'MISSING');
if (p264) {
  console.log('   Overall:', p264.overall, '| MaxOverall:', p264.maxOverall);
  console.log('   Policy:', p264.policy, '| PlayStyle:', p264.playStyle, p264.playStyleLevel);
  console.log('   Skill:', p264.skill.name, '->', p264.skill.description);
  console.log('   Abilities:', p264.abilities.map(a => a.name).join(', '));
  const avatarUrl = sandbox.window.getPlayerAvatarUrl(p264);
  console.log('   Avatar URL resolved:', avatarUrl ? 'LOADED (Base64 OK)' : 'FAILED');
}
