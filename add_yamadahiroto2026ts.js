const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YAMADA HIROTO 2026 TS (p265) ===');

// 1. Convert Image to JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3b7f3f66-5a3c-4666-88d6-639d6217234d\\media__1786509357064.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yamadaHiroto2026TSImage.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YAMADA_HIROTO_2026_TS_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. Created yamadaHiroto2026TSImage.js. Size:', fs.statSync(imageJsPath).size);

// 2. Add script tag to index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');
if (!indexContent.includes('yamadaHiroto2026TSImage.js')) {
  indexContent = indexContent.replace(
    '<!-- 2. Full Player Database -->',
    '  <script src="./src/data/yamadaHiroto2026TSImage.js"></script>\n  <!-- 2. Full Player Database -->'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('2. Added script tag to index.html.');
}

// 3. Append p265 to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p264Idx = mockCode.indexOf("id: 'p264'");
if (p264Idx === -1) {
  console.error('Could not find p264 in mockData.js!');
  process.exit(1);
}

const p264AvatarIdx = mockCode.indexOf("avatarUrl:", p264Idx);
const p264EndIdx = mockCode.indexOf("}", p264AvatarIdx);

mockCode = mockCode.substring(0, p264EndIdx + 1);

const yamada2026TSObj = `,
  {
    id: 'p265',
    name: '山田寛人(2026TS)',
    readingName: 'やまだ・ひろと',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6822,
    maxOverall: 15057,
    baseStats: { shoot: 1330, pass: 1213, dribble: 1203, defense: 863, physical: 1034, speed: 918 },
    detailStats: {
      shoot: { finishing: 450, power: 434, composure: 446 },
      pass: { shortPass: 419, longPass: 403, accuracy: 391 },
      dribble: { breakout: 401, keeping: 396, ballTouch: 406 },
      defense: { tackle: 272, interception: 304, marking: 287 },
      physical: { jumping: 360, contact: 322, stamina: 352 },
      speed: { running: 450, agility: 468 }
    },
    maxEnhanced: {
      overall: 15057,
      baseStats: { shoot: 2935, pass: 2746, dribble: 2784, defense: 2360, physical: 2615, speed: 1964 },
      detailStats: {
        shoot: { finishing: 985, power: 969, composure: 981 },
        pass: { shortPass: 930, longPass: 914, accuracy: 902 },
        dribble: { breakout: 924, keeping: 919, ballTouch: 941 },
        defense: { tackle: 771, interception: 803, marking: 786 },
        physical: { jumping: 883, contact: 857, stamina: 875 },
        speed: { running: 973, agility: 991 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '魂のワンタッチ', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' },
      { name: '裏への飛び出し', rank: '銀', description: '発動条件：途中出場　/　決定力・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += yamada2026TSObj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('3. mockData.js updated with p265.');

// 4. Update PLAYER_IMAGE_MAP in app.js and app.jsx
function addPlayerToMapInFile(fileName) {
  const filePath = path.join(__dirname, 'src', fileName);
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf-8');

  if (!code.includes('"p265": "YAMADA_HIROTO_2026_TS_IMAGE"')) {
    code = code.replace(
      '"p264": "YAMAGISHI_2026_TS_IMAGE"',
      '"p264": "YAMAGISHI_2026_TS_IMAGE",\n  "p265": "YAMADA_HIROTO_2026_TS_IMAGE"'
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

const p265 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p265');
console.log('5. Verification of p265:');
console.log('   Name:', p265 ? p265.name : 'MISSING');
if (p265) {
  console.log('   Overall:', p265.overall, '| MaxOverall:', p265.maxOverall);
  console.log('   Policy:', p265.policy, '| PlayStyle:', p265.playStyle, p265.playStyleLevel);
  console.log('   Skill:', p265.skill.name, '->', p265.skill.description);
  console.log('   Abilities:', p265.abilities.map(a => a.name).join(', '));
  const avatarUrl = sandbox.window.getPlayerAvatarUrl(p265);
  console.log('   Avatar URL resolved:', avatarUrl ? 'LOADED (Base64 OK)' : 'FAILED');
}
