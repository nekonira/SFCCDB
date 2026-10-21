const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING DESABI (HAIFU) (p403) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\d8448505-5340-47b3-afef-a700dd46b8c6\\.user_uploaded\\media_1792554994721.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'desabiHaifuImage.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.DESABI_HAIFU_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. desabiHaifuImage.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p402Idx = mockCode.indexOf("id: 'p402'");
if (p402Idx === -1) {
  console.error("Could not find p402 in mockData.js!");
  process.exit(1);
}

const p402AvatarIdx = mockCode.indexOf("avatarUrl:", p402Idx);
const p402EndIdx = mockCode.indexOf("}", p402AvatarIdx);

const headerCode = mockCode.substring(0, p402EndIdx + 1);

const desabiObj = `,
  {
    id: 'p403',
    name: 'デサビ(配布)',
    readingName: 'でさび',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 5461,
    maxOverall: 13047,
    baseStats: { shoot: 962, pass: 739, dribble: 724, defense: 1137, physical: 1149, speed: 729 },
    detailStats: {
      shoot: { finishing: 280, power: 401, composure: 281 },
      pass: { shortPass: 294, longPass: 259, accuracy: 186 },
      dribble: { breakout: 229, keeping: 250, ballTouch: 245 },
      defense: { tackle: 379, interception: 379, marking: 379 },
      physical: { jumping: 379, contact: 379, stamina: 391 },
      speed: { running: 382, agility: 347 }
    },
    maxEnhanced: {
      overall: 13047,
      baseStats: { shoot: 2186, pass: 2035, dribble: 1984, defense: 2469, physical: 2469, speed: 1593 },
      detailStats: {
        shoot: { finishing: 688, power: 809, composure: 689 },
        pass: { shortPass: 726, longPass: 691, accuracy: 618 },
        dribble: { breakout: 649, keeping: 670, ballTouch: 665 },
        defense: { tackle: 823, interception: 823, marking: 823 },
        physical: { jumping: 823, contact: 823, stamina: 823 },
        speed: { running: 814, agility: 779 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '奮戦のタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' },
      { name: '上空の寸断者', rank: '銅', description: '発動条件：絶好調　/　パスカット・ジャンプUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + desabiObj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p403.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('desabiHaifuImage.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/destCardImage.js"></script>',
    '<script src="./src/data/desabiHaifuImage.js"></script>\n  <script src="./src/data/destCardImage.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with desabiHaifuImage.js script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p403": "DESABI_HAIFU_IMAGE"') && !appJsCode.includes('"p403":"DESABI_HAIFU_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p402":"BRADLEY_BARCOLA_2026_IMAGE"',
    '"p402":"BRADLEY_BARCOLA_2026_IMAGE","p403":"DESABI_HAIFU_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p403 image mapping.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p403": "DESABI_HAIFU_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p402": "BRADLEY_BARCOLA_2026_IMAGE"',
    '"p402": "BRADLEY_BARCOLA_2026_IMAGE",\n    "p403": "DESABI_HAIFU_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p403 image mapping.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(updatedMockCode, sandbox);
const p403 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p403');
console.log('6. Verification of p403 in mockData:', p403 ? `${p403.name} (${p403.nationality}, ${p403.overall} -> ${p403.maxOverall})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.DESABI_HAIFU_IMAGE:', sandbox.window.DESABI_HAIFU_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== DESABI (HAIFU) ADDED SUCCESSFULLY! ===');
