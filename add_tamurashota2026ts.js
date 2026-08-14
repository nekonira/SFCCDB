const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TAMURA SHOTA 2026 TS (p266) ===');

// 1. Convert Image to JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3b7f3f66-5a3c-4666-88d6-639d6217234d\\media__1786509540925.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'tamuraShota2026TSImage.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.TAMURA_SHOTA_2026_TS_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. Created tamuraShota2026TSImage.js. Size:', fs.statSync(imageJsPath).size);

// 2. Add script tag to index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');
if (!indexContent.includes('tamuraShota2026TSImage.js')) {
  indexContent = indexContent.replace(
    '<!-- 2. Full Player Database -->',
    '  <script src="./src/data/tamuraShota2026TSImage.js"></script>\n  <!-- 2. Full Player Database -->'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('2. Added script tag to index.html.');
}

// 3. Append p266 to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p265Idx = mockCode.indexOf("id: 'p265'");
if (p265Idx === -1) {
  console.error('Could not find p265 in mockData.js!');
  process.exit(1);
}

const p265AvatarIdx = mockCode.indexOf("avatarUrl:", p265Idx);
const p265EndIdx = mockCode.indexOf("}", p265AvatarIdx);

mockCode = mockCode.substring(0, p265EndIdx + 1);

const tamura2026TSObj = `,
  {
    id: 'p266',
    name: '田村翔太(2026TS)',
    readingName: 'たむら・しょうた',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6706,
    maxOverall: 14932,
    baseStats: { shoot: 1315, pass: 1083, dribble: 1233, defense: 853, physical: 1193, speed: 871 },
    detailStats: {
      shoot: { finishing: 446, power: 423, composure: 446 },
      pass: { shortPass: 363, longPass: 353, accuracy: 367 },
      dribble: { breakout: 430, keeping: 387, ballTouch: 416 },
      defense: { tackle: 303, interception: 276, marking: 274 },
      physical: { jumping: 382, contact: 420, stamina: 391 },
      speed: { running: 435, agility: 436 }
    },
    maxEnhanced: {
      overall: 14932,
      baseStats: { shoot: 2920, pass: 2616, dribble: 2814, defense: 2350, physical: 2774, speed: 1917 },
      detailStats: {
        shoot: { finishing: 981, power: 958, composure: 981 },
        pass: { shortPass: 874, longPass: 864, accuracy: 878 },
        dribble: { breakout: 953, keeping: 910, ballTouch: 951 },
        defense: { tackle: 802, interception: 775, marking: 773 },
        physical: { jumping: 905, contact: 955, stamina: 914 },
        speed: { running: 958, agility: 959 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: 'コントロールショット', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'シュートセンス', rank: '銀', description: '発動条件：好調　/　決定力・キック力UP' },
      { name: 'パワフルランナー', rank: '銀', description: '発動条件：途中出場　/　コンタクト・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += tamura2026TSObj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('3. mockData.js updated with p266.');

// 4. Update PLAYER_IMAGE_MAP in app.js and app.jsx
function addPlayerToMapInFile(fileName) {
  const filePath = path.join(__dirname, 'src', fileName);
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf-8');

  if (!code.includes('"p266": "TAMURA_SHOTA_2026_TS_IMAGE"')) {
    code = code.replace(
      '"p265": "YAMADA_HIROTO_2026_TS_IMAGE"',
      '"p265": "YAMADA_HIROTO_2026_TS_IMAGE",\n  "p266": "TAMURA_SHOTA_2026_TS_IMAGE"'
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

const p266 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p266');
console.log('5. Verification of p266:');
console.log('   Name:', p266 ? p266.name : 'MISSING');
if (p266) {
  console.log('   Overall:', p266.overall, '| MaxOverall:', p266.maxOverall);
  console.log('   Policy:', p266.policy, '| PlayStyle:', p266.playStyle, p266.playStyleLevel);
  console.log('   Skill:', p266.skill.name, '->', p266.skill.description);
  console.log('   Abilities:', p266.abilities.map(a => a.name).join(', '));
  const avatarUrl = sandbox.window.getPlayerAvatarUrl(p266);
  console.log('   Avatar URL resolved:', avatarUrl ? 'LOADED (Base64 OK)' : 'FAILED');
}
