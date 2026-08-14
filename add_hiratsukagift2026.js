const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING ROMA HIRATSUKA GIFT 2026 (p261) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786121369781.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'hiratsukaGift2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.HIRATSUKA_GIFT_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. hiratsukaGift2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p260Idx = mockCode.indexOf("id: 'p260'");
const altP260Idx = mockCode.indexOf('"id": "p260"');
const targetP260Idx = p260Idx !== -1 ? p260Idx : altP260Idx;

if (targetP260Idx === -1) {
  console.error("Could not find p260 in mockData.js!");
  process.exit(1);
}

const p260AvatarIdx = mockCode.indexOf("avatarUrl:", targetP260Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP260Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP260Idx);
const p260EndIdx = mockCode.indexOf("}", p260AvatarIdx);

mockCode = mockCode.substring(0, p260EndIdx + 1);

const hiratsukaGift2026Obj = `,
  {
    id: 'p261',
    name: '平塚浪馬(配布)',
    readingName: 'ひらつか・ろうま',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6178,
    maxOverall: 12318,
    baseStats: { shoot: 1141, pass: 1313, dribble: 1333, defense: 974, physical: 1033, speed: 741 },
    detailStats: {
      shoot: { finishing: 407, power: 354, composure: 380 },
      pass: { shortPass: 463, longPass: 398, accuracy: 452 },
      dribble: { breakout: 432, keeping: 451, ballTouch: 450 },
      defense: { tackle: 299, interception: 343, marking: 332 },
      physical: { jumping: 352, contact: 318, stamina: 363 },
      speed: { running: 412, agility: 329 }
    },
    maxEnhanced: {
      overall: 12318,
      baseStats: { shoot: 2146, pass: 2354, dribble: 2362, defense: 1979, physical: 2062, speed: 1415 },
      detailStats: {
        shoot: { finishing: 738, power: 685, composure: 723 },
        pass: { shortPass: 818, longPass: 741, accuracy: 795 },
        dribble: { breakout: 775, keeping: 794, ballTouch: 793 },
        defense: { tackle: 642, interception: 674, marking: 663 },
        physical: { jumping: 683, contact: 661, stamina: 718 },
        speed: { running: 743, agility: 672 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '敵陣を切り裂くパス', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：CFの位置に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: 'ゴール前の落ち着き', rank: '銀', description: 'ゴール前で冷静にコースを見極めて得点力を向上' },
      { name: '柔軟なキッカー', rank: '銅', description: '発動条件：途中出場　/　キック精度・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += hiratsukaGift2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p261 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('hiratsukaGift2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/hiratsukaGift2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p261Check = `  if (player.id === 'p261' || (player.name && (player.name.includes('平塚浪馬') || player.name.includes('平塚') || player.name.includes('Roma Hiratsuka') || player.name.includes('Hiratsuka')))) {\n    return window.HIRATSUKA_GIFT_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p261'")) {
    const marker = "if (player.id === 'p260'";
    const altMarker = 'if (player.id === "p260"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p261Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p261 avatar resolver.');
    } else {
      console.warn('Could not find p260 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p261'")) {
    const marker = "if (player.id === 'p260'";
    const altMarker = 'if (player.id === "p260"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p261Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p261 avatar resolver.');
    } else {
      console.warn('Could not find p260 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p261 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p261');
console.log('6. Verification of p261:', p261 ? p261.name : 'MISSING');
if (p261) {
  console.log('   Overall:', p261.overall, '| MaxOverall:', p261.maxOverall);
  console.log('   Policy:', p261.policy, '| PlayStyle:', p261.playStyle, p261.playStyleLevel);
  console.log('   Nationality:', p261.nationality, '| Position:', p261.mainPosition);
  console.log('   Skill:', p261.skill.name);
  console.log('   Abilities:', p261.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.HIRATSUKA_GIFT_2026_IMAGE:', sandbox.window.HIRATSUKA_GIFT_2026_IMAGE ? 'LOADED' : 'MISSING');
