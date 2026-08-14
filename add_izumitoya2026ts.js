const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING IZUMI TOYA 2026 TS (p268) ===');

// 1. Convert Image to JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3b7f3f66-5a3c-4666-88d6-639d6217234d\\media__1786510008796.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'izumiToya2026TSImage.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.IZUMI_TOYA_2026_TS_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. Created izumiToya2026TSImage.js. Size:', fs.statSync(imageJsPath).size);

// 2. Add script tag to index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');
if (!indexContent.includes('izumiToya2026TSImage.js')) {
  indexContent = indexContent.replace(
    '<!-- 2. Full Player Database -->',
    '  <script src="./src/data/izumiToya2026TSImage.js"></script>\n  <!-- 2. Full Player Database -->'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('2. Added script tag to index.html.');
}

// 3. Append p268 to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p267Idx = mockCode.indexOf("id: 'p267'");
if (p267Idx === -1) {
  console.error('Could not find p267 in mockData.js!');
  process.exit(1);
}

const p267AvatarIdx = mockCode.indexOf("avatarUrl:", p267Idx);
const p267EndIdx = mockCode.indexOf("}", p267AvatarIdx);

mockCode = mockCode.substring(0, p267EndIdx + 1);

const izumi2026TSObj = `,
  {
    id: 'p268',
    name: '泉柊椰(2026TS)',
    readingName: 'いずみ・とうや',
    category: 'MF',
    mainPosition: 'LM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ドリブラーLM',
    playStyleLevel: 'Ⅲ',
    overall: 6851,
    maxOverall: 15098,
    baseStats: { shoot: 1164, pass: 1200, dribble: 1324, defense: 1001, physical: 1084, speed: 870 },
    detailStats: {
      shoot: { finishing: 413, power: 318, composure: 433 },
      pass: { shortPass: 401, longPass: 414, accuracy: 385 },
      dribble: { breakout: 447, keeping: 443, ballTouch: 434 },
      defense: { tackle: 302, interception: 368, marking: 331 },
      physical: { jumping: 318, contact: 366, stamina: 400 },
      speed: { running: 425, agility: 445 }
    },
    maxEnhanced: {
      overall: 15098,
      baseStats: { shoot: 2721, pass: 2769, dribble: 2917, defense: 2510, physical: 2629, speed: 1940 },
      detailStats: {
        shoot: { finishing: 936, power: 829, composure: 956 },
        pass: { shortPass: 924, longPass: 937, accuracy: 908 },
        dribble: { breakout: 982, keeping: 978, ballTouch: 957 },
        defense: { tackle: 813, interception: 867, marking: 830 },
        physical: { jumping: 829, contact: 877, stamina: 923 },
        speed: { running: 960, agility: 980 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'ジャックナイフ', rank: '銀', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'スピードドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・走力UP' },
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += izumi2026TSObj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('3. mockData.js updated with p268.');

// 4. Update PLAYER_IMAGE_MAP in app.js and app.jsx
function addPlayerToMapInFile(fileName) {
  const filePath = path.join(__dirname, 'src', fileName);
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf-8');

  if (!code.includes('"p268": "IZUMI_TOYA_2026_TS_IMAGE"')) {
    code = code.replace(
      '"p267": "TOSHIDA_YUSEI_2026_TS_IMAGE"',
      '"p267": "TOSHIDA_YUSEI_2026_TS_IMAGE",\n  "p268": "IZUMI_TOYA_2026_TS_IMAGE"'
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

const p268 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p268');
console.log('5. Verification of p268:');
console.log('   Name:', p268 ? p268.name : 'MISSING');
if (p268) {
  console.log('   Overall:', p268.overall, '| MaxOverall:', p268.maxOverall);
  console.log('   Policy:', p268.policy, '| PlayStyle:', p268.playStyle, p268.playStyleLevel);
  console.log('   Skill:', p268.skill.name, '->', p268.skill.description);
  console.log('   Abilities:', p268.abilities.map(a => a.name).join(', '));
  const avatarUrl = sandbox.window.getPlayerAvatarUrl(p268);
  console.log('   Avatar URL resolved:', avatarUrl ? 'LOADED (Base64 OK)' : 'FAILED');
}
