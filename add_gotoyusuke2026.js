const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YUSUKE GOTO 2026 (p197) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786028373136.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'gotoYusuke2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.GOTO_YUSUKE_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. gotoYusuke2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p196Idx = mockCode.indexOf("id: 'p196'");
if (p196Idx === -1) {
  console.error("Could not find p196 in mockData.js!");
  process.exit(1);
}

const p196AvatarIdx = mockCode.indexOf("avatarUrl:", p196Idx);
const p196EndIdx = mockCode.indexOf("}", p196AvatarIdx);

mockCode = mockCode.substring(0, p196EndIdx + 1);

const gotoYusuke2026Obj = `,
  {
    id: 'p197',
    name: '後藤優介(2026)',
    readingName: 'ごとうゆうすけ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6071,
    maxOverall: 14159,
    baseStats: { shoot: 1111, pass: 1058, dribble: 1201, defense: 1024, physical: 1022, speed: 790 },
    detailStats: {
      shoot: { finishing: 384, power: 357, composure: 370 },
      pass: { shortPass: 345, longPass: 358, accuracy: 355 },
      dribble: { breakout: 399, keeping: 397, ballTouch: 405 },
      defense: { tackle: 339, interception: 350, marking: 335 },
      physical: { jumping: 316, contact: 320, stamina: 386 },
      speed: { running: 373, agility: 417 }
    },
    maxEnhanced: {
      overall: 14159,
      baseStats: { shoot: 2656, pass: 2639, dribble: 2770, defense: 2569, physical: 2591, speed: 1824 },
      detailStats: {
        shoot: { finishing: 895, power: 868, composure: 893 },
        pass: { shortPass: 880, longPass: 881, accuracy: 878 },
        dribble: { breakout: 922, keeping: 920, ballTouch: 928 },
        defense: { tackle: 862, interception: 861, marking: 846 },
        physical: { jumping: 827, contact: 843, stamina: 921 },
        speed: { running: 884, agility: 940 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '絶妙なトラップ', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：トラップ時　/　ボールタッチ・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '絶え間ないボールタッチ', rank: '銀', description: '発動条件：途中出場　/　ボールタッチ・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += gotoYusuke2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p197 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('gotoYusuke2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/gotoYusuke2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p197Check = `  if (player.id === 'p197' || (player.name && (player.name.includes('後藤優介') || (player.name.includes('後藤') && player.name.includes('優介')) || player.name.includes('Yusuke Goto') || player.name.includes('Goto')))) {\n    return window.GOTO_YUSUKE_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p197'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p196' || (player.name && (player.name.includes('木村太哉') || (player.name.includes('木村') && player.name.includes('太哉')) || player.name.includes('Takaya Kimura') || player.name.includes('Kimura')))) {
    return window.KIMURA_TAKAYA_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p196' || (player.name && (player.name.includes('木村太哉') || (player.name.includes('木村') && player.name.includes('太哉')) || player.name.includes('Takaya Kimura') || player.name.includes('Kimura')))) {
    return window.KIMURA_TAKAYA_2026_IMAGE || player.avatarUrl || '';
  }\n${p197Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p197 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p197'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p196' || (player.name && (player.name.includes('木村太哉') || (player.name.includes('木村') && player.name.includes('太哉')) || player.name.includes('Takaya Kimura') || player.name.includes('Kimura')))) {
    return window.KIMURA_TAKAYA_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p196' || (player.name && (player.name.includes('木村太哉') || (player.name.includes('木村') && player.name.includes('太哉')) || player.name.includes('Takaya Kimura') || player.name.includes('Kimura')))) {
    return window.KIMURA_TAKAYA_2026_IMAGE || player.avatarUrl || '';
  }\n${p197Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p197 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p197 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p197');
console.log('6. Verification of p197:', p197 ? p197.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.GOTO_YUSUKE_2026_IMAGE:', sandbox.window.GOTO_YUSUKE_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== YUSUKE GOTO 2026 ADDED SUCCESSFULLY! ===');
