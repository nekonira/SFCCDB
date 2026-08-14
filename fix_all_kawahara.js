const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== FIXING ENCODING AND IMAGE FOR KAWAHARA 2026 ===');

// 1. Convert Image to base64 JS file with UTF-8
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786023667418.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kawahara2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KAWAHARA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kawahara2026Image.js updated cleanly in UTF-8. Size:', fs.statSync(imageJsPath).size);

// 2. Repair mockData.js with UTF-8
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

// Strip any existing corrupted p178 or slice up to p177
const p177Idx = mockCode.indexOf("id: 'p177'");
if (p177Idx !== -1) {
  const p177AvatarIdx = mockCode.indexOf("avatarUrl:", p177Idx);
  const p177EndIdx = mockCode.indexOf("}", p177AvatarIdx);
  mockCode = mockCode.substring(0, p177EndIdx + 1);

  const kawahara2026Obj = `,
  {
    id: 'p178',
    name: '河原創(2026)',
    readingName: 'かわはらそう',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 6471,
    maxOverall: 14625,
    baseStats: { shoot: 1036, pass: 1195, dribble: 1249, defense: 1237, physical: 1129, speed: 796 },
    detailStats: {
      shoot: { finishing: 347, power: 330, composure: 359 },
      pass: { shortPass: 390, longPass: 401, accuracy: 404 },
      dribble: { breakout: 392, keeping: 435, ballTouch: 422 },
      defense: { tackle: 398, interception: 426, marking: 413 },
      physical: { jumping: 332, contact: 350, stamina: 447 },
      speed: { running: 395, agility: 401 }
    },
    maxEnhanced: {
      overall: 14625,
      baseStats: { shoot: 2581, pass: 2800, dribble: 2782, defense: 2818, physical: 2698, speed: 1818 },
      detailStats: {
        shoot: { finishing: 858, power: 841, composure: 882 },
        pass: { shortPass: 925, longPass: 936, accuracy: 939 },
        dribble: { breakout: 903, keeping: 946, ballTouch: 933 },
        defense: { tackle: 933, interception: 949, marking: 936 },
        physical: { jumping: 843, contact: 873, stamina: 982 },
        speed: { running: 906, agility: 912 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '反撃のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: '不屈のキッカー', rank: '銀', description: '発動条件：好調　/　キック精度・スタミナUP' },
      { name: '奪取のターゲットマン', rank: '銀', description: '発動条件：好調　/　キープ力・パスカットUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

  mockCode += kawahara2026Obj;
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('2. mockData.js updated cleanly in UTF-8.');
}

// 3. Update src/app.js with UTF-8
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

// Replace any corrupted p178 check in app.js
if (appJsCode.includes("player.id === 'p178'") || appJsCode.includes("KAWAHARA_2026_IMAGE")) {
  appJsCode = appJsCode.replace(
    /if\s*\(\s*player\.id\s*===\s*['"]p178['"][\s\S]*?\{\s*return\s*window\.KAWAHARA_2026_IMAGE[\s\S]*?\}/,
    `if (player.id === 'p178' || (player.name && (player.name.includes('河原創') || player.name.includes('河原') || player.name.includes('Kawahara')))) {\n    return window.KAWAHARA_2026_IMAGE || player.avatarUrl || '';\n  }`
  );
} else {
  // Insert after p177
  appJsCode = appJsCode.replace(
    `if (player.id === 'p177' || player.name && (player.name.includes('メン・ソンウン') || player.name.includes('ソンウン') || player.name.includes('Maeng'))) {
    return window.MAENG_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p177' || player.name && (player.name.includes('メン・ソンウン') || player.name.includes('ソンウン') || player.name.includes('Maeng'))) {
    return window.MAENG_2026_IMAGE || player.avatarUrl || '';
  }
  if (player.id === 'p178' || (player.name && (player.name.includes('河原創') || player.name.includes('河原') || player.name.includes('Kawahara')))) {
    return window.KAWAHARA_2026_IMAGE || player.avatarUrl || '';
  }`
  );
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('3. src/app.js updated cleanly in UTF-8.');

// 4. Update src/app.jsx with UTF-8
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (appJsxCode.includes("player.id === 'p178'")) {
  appJsxCode = appJsxCode.replace(
    /if\s*\(\s*player\.id\s*===\s*['"]p178['"][\s\S]*?\{\s*return\s*window\.KAWAHARA_2026_IMAGE[\s\S]*?\}/,
    `if (player.id === 'p178' || (player.name && (player.name.includes('河原創') || player.name.includes('河原') || player.name.includes('Kawahara')))) {\n    return window.KAWAHARA_2026_IMAGE || player.avatarUrl || '';\n  }`
  );
} else {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p177' || (player.name && (player.name.includes('メン・ソンウン') || player.name.includes('ソンウン') || player.name.includes('Maeng')))) {
    return window.MAENG_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p177' || (player.name && (player.name.includes('メン・ソンウン') || player.name.includes('ソンウン') || player.name.includes('Maeng')))) {
    return window.MAENG_2026_IMAGE || player.avatarUrl || '';
  }
  if (player.id === 'p178' || (player.name && (player.name.includes('河原創') || player.name.includes('河原') || player.name.includes('Kawahara')))) {
    return window.KAWAHARA_2026_IMAGE || player.avatarUrl || '';
  }`
  );
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated cleanly in UTF-8.');

// 5. Verify VM Evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

// Load mockData.js into VM
vm.runInContext(mockCode, sandbox);
const p178 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p178');
console.log('5. Verification of p178 in mockData.js:', p178 ? p178.name : 'FAIL');

// Load kawahara2026Image.js into VM
const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('6. Verification of window.KAWAHARA_2026_IMAGE:', sandbox.window.KAWAHARA_2026_IMAGE ? 'LOADED' : 'FAIL');

console.log('=== ALL REPAIRS COMPLETED SUCCESSFULLY! ===');
