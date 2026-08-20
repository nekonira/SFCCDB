const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING ANTANCHEN TICKET EXCHANGE (p290) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\8dd70f4e-e6e6-425c-8716-ba327fd6d38b\\.user_uploaded\\media_1787234259226.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'antanchen2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.ANTANCHEN_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. antanchen2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p289Idx = mockCode.indexOf("id: 'p289'");
if (p289Idx === -1) {
  console.error("Could not find p289 in mockData.js!");
  process.exit(1);
}

const p289AvatarIdx = mockCode.indexOf("avatarUrl:", p289Idx);
const p289EndIdx = mockCode.indexOf("}", p289AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p289EndIdx + 1);

const antanchenObj = `,
  {
    id: 'p290',
    name: 'アンタンシェン(チケット交換)',
    readingName: 'あんたんしぇん',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '中国',
    policy: 'カウンター',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 5092,
    maxOverall: 12380,
    baseStats: { shoot: 999, pass: 826, dribble: 1023, defense: 742, physical: 877, speed: 719 },
    detailStats: {
      shoot: { finishing: 351, power: 304, composure: 344 },
      pass: { shortPass: 272, longPass: 261, accuracy: 293 },
      dribble: { breakout: 373, keeping: 339, ballTouch: 311 },
      defense: { tackle: 251, interception: 253, marking: 238 },
      physical: { jumping: 281, contact: 290, stamina: 306 },
      speed: { running: 376, agility: 343 }
    },
    maxEnhanced: {
      overall: 12380,
      baseStats: { shoot: 2313, pass: 2068, dribble: 2313, defense: 1948, physical: 2167, speed: 1571 },
      detailStats: {
        shoot: { finishing: 789, power: 742, composure: 782 },
        pass: { shortPass: 686, longPass: 675, accuracy: 707 },
        dribble: { breakout: 799, keeping: 765, ballTouch: 749 },
        defense: { tackle: 653, interception: 655, marking: 640 },
        physical: { jumping: 707, contact: 728, stamina: 732 },
        speed: { running: 802, agility: 769 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '裏への飛び出し', rank: '銀', description: '発動条件：絶好調　/　決定力・走力UP' },
      { name: '冷静な突破', rank: '銅', description: '発動条件：途中出場　/　冷静さ・突破力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + antanchenObj, 'utf-8');
console.log('2. mockData.js updated with p290 (Antanchen) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('antanchen2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/jramanbela2026Image.js"></script>',
    '<script src="./src/data/jramanbela2026Image.js"></script>\n  <script src="./src/data/antanchen2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p290": "ANTANCHEN_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p289": "J_RAMANBELA_2026_IMAGE"',
    '"p289": "J_RAMANBELA_2026_IMAGE",\n  "p290": "ANTANCHEN_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p290 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p290": "ANTANCHEN_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p289": "J_RAMANBELA_2026_IMAGE"',
    '"p289": "J_RAMANBELA_2026_IMAGE",\n  "p290": "ANTANCHEN_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p290 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p290 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p290');
console.log('6. Verification of p290:', p290 ? `${p290.name} (${p290.nationality})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.ANTANCHEN_2026_IMAGE:', sandbox.window.ANTANCHEN_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== ANTANCHEN TICKET EXCHANGE ADDED SUCCESSFULLY! ===');
