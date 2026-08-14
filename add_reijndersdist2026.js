const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TIJJANI REIJNDERS DIST (p191) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786026719572.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'reijndersDist2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.REIJNDERS_DIST_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. reijndersDist2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p190Idx = mockCode.indexOf("id: 'p190'");
if (p190Idx === -1) {
  console.error("Could not find p190 in mockData.js!");
  process.exit(1);
}

const p190AvatarIdx = mockCode.indexOf("avatarUrl:", p190Idx);
const p190EndIdx = mockCode.indexOf("}", p190AvatarIdx);

mockCode = mockCode.substring(0, p190EndIdx + 1);

const reijndersDist2026Obj = `,
  {
    id: 'p191',
    name: 'タイアニ・ラインデルス(配布)',
    readingName: 'たいあにらいんでるす',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'オランダ',
    policy: 'ムービング',
    playStyle: 'パサーAM',
    playStyleLevel: 'Ⅱ',
    overall: 7385,
    maxOverall: 13168,
    baseStats: { shoot: 1334, pass: 1363, dribble: 1411, defense: 1162, physical: 1201, speed: 914 },
    detailStats: {
      shoot: { finishing: 459, power: 432, composure: 443 },
      pass: { shortPass: 455, longPass: 458, accuracy: 450 },
      dribble: { breakout: 470, keeping: 469, ballTouch: 472 },
      defense: { tackle: 377, interception: 398, marking: 387 },
      physical: { jumping: 376, contact: 392, stamina: 433 },
      speed: { running: 439, agility: 475 }
    },
    maxEnhanced: {
      overall: 13168,
      baseStats: { shoot: 2339, pass: 2404, dribble: 2440, defense: 2167, physical: 2230, speed: 1588 },
      detailStats: {
        shoot: { finishing: 790, power: 763, composure: 786 },
        pass: { shortPass: 810, longPass: 801, accuracy: 793 },
        dribble: { breakout: 813, keeping: 812, ballTouch: 815 },
        defense: { tackle: 720, interception: 729, marking: 718 },
        physical: { jumping: 707, contact: 735, stamina: 788 },
        speed: { running: 770, agility: 818 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '敵陣を切り裂くパス', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：CFの位置に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '突き刺すパス', rank: '銀', description: '発動条件：途中出場　/　キック力・ショートパスUP' },
      { name: '不屈のパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += reijndersDist2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p191 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('reijndersDist2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/reijndersImage.js"></script>',
    '<script src="./src/data/reijndersDist2026Image.js"></script>\n  <script src="./src/data/reijndersImage.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p191Check = `  if (player.id === 'p191' || (player.name && player.name.includes('配布') && (player.name.includes('ラインデルス') || player.name.includes('Reijnders')))) {\n    return window.REIJNDERS_DIST_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p191'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p190' || (player.name && player.name.includes('2026') && (player.name.includes('小泉') || player.name.includes('Koizumi')))) {
    return window.KOIZUMI_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p190' || (player.name && player.name.includes('2026') && (player.name.includes('小泉') || player.name.includes('Koizumi')))) {
    return window.KOIZUMI_2026_IMAGE || player.avatarUrl || '';
  }\n${p191Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p191 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p191'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p190' || (player.name && player.name.includes('2026') && (player.name.includes('小泉') || player.name.includes('Koizumi')))) {
    return window.KOIZUMI_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p190' || (player.name && player.name.includes('2026') && (player.name.includes('小泉') || player.name.includes('Koizumi')))) {
    return window.KOIZUMI_2026_IMAGE || player.avatarUrl || '';
  }\n${p191Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p191 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p191 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p191');
console.log('6. Verification of p191:', p191 ? p191.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.REIJNDERS_DIST_2026_IMAGE:', sandbox.window.REIJNDERS_DIST_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== TIJJANI REIJNDERS DIST 2026 ADDED SUCCESSFULLY! ===');
