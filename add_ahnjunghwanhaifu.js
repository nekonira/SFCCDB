const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING AHN JUNG-HWAN HAIFU (p279) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\8b50a9b4-c50b-431d-a7b7-e99775d959f8\\.user_uploaded\\media_1787231121351.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'ahnjunghwanhaifuImage.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.AHN_JUNGHWAN_HAIFU_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. ahnjunghwanhaifuImage.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p278Idx = mockCode.indexOf("id: 'p278'");
if (p278Idx === -1) {
  console.error("Could not find p278 in mockData.js!");
  process.exit(1);
}

const p278AvatarIdx = mockCode.indexOf("avatarUrl:", p278Idx);
const p278EndIdx = mockCode.indexOf("}", p278AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p278EndIdx + 1);

const ahnjunghwanObj = `,
  {
    id: 'p279',
    name: 'アン・ジョンファン(配布)',
    readingName: 'あんじょんふぁん',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'ムービング',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 5460,
    maxOverall: 13046,
    baseStats: { shoot: 1087, pass: 1049, dribble: 1145, defense: 745, physical: 909, speed: 815 },
    detailStats: {
      shoot: { finishing: 377, power: 323, composure: 387 },
      pass: { shortPass: 368, longPass: 325, accuracy: 356 },
      dribble: { breakout: 413, keeping: 352, ballTouch: 380 },
      defense: { tackle: 260, interception: 238, marking: 247 },
      physical: { jumping: 305, contact: 285, stamina: 319 },
      speed: { running: 406, agility: 409 }
    },
    maxEnhanced: {
      overall: 13046,
      baseStats: { shoot: 2419, pass: 2309, dribble: 2453, defense: 1969, physical: 2217, speed: 1679 },
      detailStats: {
        shoot: { finishing: 821, power: 767, composure: 831 },
        pass: { shortPass: 788, longPass: 745, accuracy: 776 },
        dribble: { breakout: 845, keeping: 784, ballTouch: 824 },
        defense: { tackle: 668, interception: 646, marking: 655 },
        physical: { jumping: 737, contact: 729, stamina: 751 },
        speed: { running: 838, agility: 841 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：ワンタッチシュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '冷静な突破', rank: '銀', description: '発動条件：絶好調　/　冷静さ・突破力UP' },
      { name: 'ゴール前の嗅覚', rank: '銅', description: '発動条件：好調　/　決定力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + ahnjunghwanObj, 'utf-8');
console.log('2. mockData.js updated with p279 (Ahn Jung-Hwan Haifu) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('ahnjunghwanhaifuImage.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/kimnamilhaifuImage.js"></script>',
    '<script src="./src/data/kimnamilhaifuImage.js"></script>\n  <script src="./src/data/ahnjunghwanhaifuImage.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p279": "AHN_JUNGHWAN_HAIFU_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p278": "KIM_NAMIL_HAIFU_IMAGE"',
    '"p278": "KIM_NAMIL_HAIFU_IMAGE",\n  "p279": "AHN_JUNGHWAN_HAIFU_IMAGE"'
  );
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p279 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p279": "AHN_JUNGHWAN_HAIFU_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p278": "KIM_NAMIL_HAIFU_IMAGE"',
    '"p278": "KIM_NAMIL_HAIFU_IMAGE",\n  "p279": "AHN_JUNGHWAN_HAIFU_IMAGE"'
  );
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p279 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p279 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p279');
console.log('6. Verification of p279:', p279 ? `${p279.name} (${p279.nationality})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.AHN_JUNGHWAN_HAIFU_IMAGE:', sandbox.window.AHN_JUNGHWAN_HAIFU_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== AHN JUNG-HWAN HAIFU ADDED SUCCESSFULLY! ===');
