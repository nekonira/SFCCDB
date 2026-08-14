const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING RYOTARO ARAKI 2026 (p199) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786028726932.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'arakiRyotaro2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.ARAKI_RYOTARO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. arakiRyotaro2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p198Idx = mockCode.indexOf("id: 'p198'");
if (p198Idx === -1) {
  console.error("Could not find p198 in mockData.js!");
  process.exit(1);
}

const p198AvatarIdx = mockCode.indexOf("avatarUrl:", p198Idx);
const p198EndIdx = mockCode.indexOf("}", p198AvatarIdx);

mockCode = mockCode.substring(0, p198EndIdx + 1);

const arakiRyotaro2026Obj = `,
  {
    id: 'p199',
    name: '荒木遼太郎(2026)',
    readingName: 'あらきりょうたろう',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6418,
    maxOverall: 14517,
    baseStats: { shoot: 1263, pass: 1073, dribble: 1182, defense: 1036, physical: 1068, speed: 822 },
    detailStats: {
      shoot: { finishing: 451, power: 363, composure: 449 },
      pass: { shortPass: 371, longPass: 362, accuracy: 340 },
      dribble: { breakout: 376, keeping: 387, ballTouch: 419 },
      defense: { tackle: 340, interception: 337, marking: 359 },
      physical: { jumping: 392, contact: 318, stamina: 358 },
      speed: { running: 394, agility: 428 }
    },
    maxEnhanced: {
      overall: 14517,
      baseStats: { shoot: 2808, pass: 2654, dribble: 2751, defense: 2581, physical: 2637, speed: 1856 },
      detailStats: {
        shoot: { finishing: 962, power: 874, composure: 972 },
        pass: { shortPass: 906, longPass: 885, accuracy: 863 },
        dribble: { breakout: 899, keeping: 910, ballTouch: 942 },
        defense: { tackle: 863, interception: 848, marking: 870 },
        physical: { jumping: 903, contact: 841, stamina: 893 },
        speed: { running: 905, agility: 951 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' },
      { name: 'ゴール前の落ち着き', rank: '銀', description: 'ゴール前で落ち着いて相手GKのプレッシャーを受け流す' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += arakiRyotaro2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p199 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('arakiRyotaro2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/arakiRyotaro2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p199Check = `  if (player.id === 'p199' || (player.name && (player.name.includes('荒木遼太郎') || (player.name.includes('荒木') && player.name.includes('遼太郎')) || player.name.includes('Ryotaro Araki')))) {\n    return window.ARAKI_RYOTARO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p199'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p198' || (player.name && (player.name.includes('藤川虎太朗') || player.name.includes('藤川') || player.name.includes('Kotaro Fujikawa') || player.name.includes('Fujikawa')))) {
    return window.FUJIKAWA_KOTARO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p198' || (player.name && (player.name.includes('藤川虎太朗') || player.name.includes('藤川') || player.name.includes('Kotaro Fujikawa') || player.name.includes('Fujikawa')))) {
    return window.FUJIKAWA_KOTARO_2026_IMAGE || player.avatarUrl || '';
  }\n${p199Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p199 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p199'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p198' || (player.name && (player.name.includes('藤川虎太朗') || player.name.includes('藤川') || player.name.includes('Kotaro Fujikawa') || player.name.includes('Fujikawa')))) {
    return window.FUJIKAWA_KOTARO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p198' || (player.name && (player.name.includes('藤川虎太朗') || player.name.includes('藤川') || player.name.includes('Kotaro Fujikawa') || player.name.includes('Fujikawa')))) {
    return window.FUJIKAWA_KOTARO_2026_IMAGE || player.avatarUrl || '';
  }\n${p199Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p199 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p199 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p199');
console.log('6. Verification of p199:', p199 ? p199.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.ARAKI_RYOTARO_2026_IMAGE:', sandbox.window.ARAKI_RYOTARO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== RYOTARO ARAKI 2026 ADDED SUCCESSFULLY! ===');
