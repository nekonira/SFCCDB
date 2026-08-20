const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING J. RAMANBELA TICKET EXCHANGE (p289) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\8dd70f4e-e6e6-425c-8716-ba327fd6d38b\\.user_uploaded\\media_1787234006423.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'jramanbela2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.J_RAMANBELA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. jramanbela2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p288Idx = mockCode.indexOf("id: 'p288'");
if (p288Idx === -1) {
  console.error("Could not find p288 in mockData.js!");
  process.exit(1);
}

const p288AvatarIdx = mockCode.indexOf("avatarUrl:", p288Idx);
const p288EndIdx = mockCode.indexOf("}", p288AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p288EndIdx + 1);

const jramanbelaObj = `,
  {
    id: 'p289',
    name: 'J・ラマンベラ(チケット交換)',
    readingName: 'じぇー・らまんべら',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '南アフリカ',
    policy: 'カウンター',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅱ',
    overall: 5105,
    maxOverall: 12329,
    baseStats: { shoot: 925, pass: 877, dribble: 1025, defense: 732, physical: 818, speed: 758 },
    detailStats: {
      shoot: { finishing: 310, power: 303, composure: 312 },
      pass: { shortPass: 293, longPass: 281, accuracy: 303 },
      dribble: { breakout: 348, keeping: 327, ballTouch: 350 },
      defense: { tackle: 239, interception: 250, marking: 243 },
      physical: { jumping: 279, contact: 249, stamina: 290 },
      speed: { running: 393, agility: 365 }
    },
    maxEnhanced: {
      overall: 12329,
      baseStats: { shoot: 2191, pass: 2155, dribble: 2327, defense: 1950, physical: 2072, speed: 1634 },
      detailStats: {
        shoot: { finishing: 736, power: 717, composure: 738 },
        pass: { shortPass: 719, longPass: 707, accuracy: 729 },
        dribble: { breakout: 786, keeping: 765, ballTouch: 776 },
        defense: { tackle: 653, interception: 652, marking: 645 },
        physical: { jumping: 693, contact: 663, stamina: 716 },
        speed: { running: 831, agility: 803 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '高速のボールタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・走力UP' },
      { name: '俊敏なドリブラー', rank: '銅', description: '発動条件：絶好調　/　突破力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + jramanbelaObj, 'utf-8');
console.log('2. mockData.js updated with p289 (J. Ramanbela) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('jramanbela2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/pramanbela2026Image.js"></script>',
    '<script src="./src/data/pramanbela2026Image.js"></script>\n  <script src="./src/data/jramanbela2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p289": "J_RAMANBELA_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p288": "P_RAMANBELA_2026_IMAGE"',
    '"p288": "P_RAMANBELA_2026_IMAGE",\n  "p289": "J_RAMANBELA_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p289 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p289": "J_RAMANBELA_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p288": "P_RAMANBELA_2026_IMAGE"',
    '"p288": "P_RAMANBELA_2026_IMAGE",\n  "p289": "J_RAMANBELA_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p289 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p289 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p289');
console.log('6. Verification of p289:', p289 ? `${p289.name} (${p289.nationality})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.J_RAMANBELA_2026_IMAGE:', sandbox.window.J_RAMANBELA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== J. RAMANBELA TICKET EXCHANGE ADDED SUCCESSFULLY! ===');
