const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TOSHIDA YUSEI 2026 TS (p267) ===');

// 1. Convert Image to JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3b7f3f66-5a3c-4666-88d6-639d6217234d\\media__1786509770429.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'toshidaYusei2026TSImage.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.TOSHIDA_YUSEI_2026_TS_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. Created toshidaYusei2026TSImage.js. Size:', fs.statSync(imageJsPath).size);

// 2. Add script tag to index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');
if (!indexContent.includes('toshidaYusei2026TSImage.js')) {
  indexContent = indexContent.replace(
    '<!-- 2. Full Player Database -->',
    '  <script src="./src/data/toshidaYusei2026TSImage.js"></script>\n  <!-- 2. Full Player Database -->'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('2. Added script tag to index.html.');
}

// 3. Append p267 to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p266Idx = mockCode.indexOf("id: 'p266'");
if (p266Idx === -1) {
  console.error('Could not find p266 in mockData.js!');
  process.exit(1);
}

const p266AvatarIdx = mockCode.indexOf("avatarUrl:", p266Idx);
const p266EndIdx = mockCode.indexOf("}", p266AvatarIdx);

mockCode = mockCode.substring(0, p266EndIdx + 1);

const toshida2026TSObj = `,
  {
    id: 'p267',
    name: '土信田悠生(2026TS)',
    readingName: 'としだ・ゆうせい',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6798,
    maxOverall: 15039,
    baseStats: { shoot: 1297, pass: 1007, dribble: 1206, defense: 974, physical: 1278, speed: 791 },
    detailStats: {
      shoot: { finishing: 435, power: 427, composure: 435 },
      pass: { shortPass: 338, longPass: 318, accuracy: 351 },
      dribble: { breakout: 370, keeping: 420, ballTouch: 416 },
      defense: { tackle: 330, interception: 329, marking: 315 },
      physical: { jumping: 455, contact: 434, stamina: 389 },
      speed: { running: 395, agility: 396 }
    },
    maxEnhanced: {
      overall: 15039,
      baseStats: { shoot: 2902, pass: 2540, dribble: 2787, defense: 2471, physical: 2859, speed: 1837 },
      detailStats: {
        shoot: { finishing: 970, power: 962, composure: 970 },
        pass: { shortPass: 849, longPass: 829, accuracy: 862 },
        dribble: { breakout: 893, keeping: 943, ballTouch: 951 },
        defense: { tackle: 829, interception: 828, marking: 814 },
        physical: { jumping: 978, contact: 969, stamina: 912 },
        speed: { running: 918, agility: 919 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '魂のワンタッチ', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '力強いフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・コンタクトUP' },
      { name: '柔と剛のタッチ', rank: '銀', description: '発動条件：好調　/　キック力・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += toshida2026TSObj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('3. mockData.js updated with p267.');

// 4. Update PLAYER_IMAGE_MAP in app.js and app.jsx
function addPlayerToMapInFile(fileName) {
  const filePath = path.join(__dirname, 'src', fileName);
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf-8');

  if (!code.includes('"p267": "TOSHIDA_YUSEI_2026_TS_IMAGE"')) {
    code = code.replace(
      '"p266": "TAMURA_SHOTA_2026_TS_IMAGE"',
      '"p266": "TAMURA_SHOTA_2026_TS_IMAGE",\n  "p267": "TOSHIDA_YUSEI_2026_TS_IMAGE"'
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

const p267 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p267');
console.log('5. Verification of p267:');
console.log('   Name:', p267 ? p267.name : 'MISSING');
if (p267) {
  console.log('   Overall:', p267.overall, '| MaxOverall:', p267.maxOverall);
  console.log('   Policy:', p267.policy, '| PlayStyle:', p267.playStyle, p267.playStyleLevel);
  console.log('   Skill:', p267.skill.name, '->', p267.skill.description);
  console.log('   Abilities:', p267.abilities.map(a => a.name).join(', '));
  const avatarUrl = sandbox.window.getPlayerAvatarUrl(p267);
  console.log('   Avatar URL resolved:', avatarUrl ? 'LOADED (Base64 OK)' : 'FAILED');
}
