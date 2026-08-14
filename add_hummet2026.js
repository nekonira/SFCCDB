const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING DENIZ HÜMMET 2026 (p256) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786118715440.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'hummet2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.HUMMET_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. hummet2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p255Idx = mockCode.indexOf("id: 'p255'");
const altP255Idx = mockCode.indexOf('"id": "p255"');
const targetP255Idx = p255Idx !== -1 ? p255Idx : altP255Idx;

if (targetP255Idx === -1) {
  console.error("Could not find p255 in mockData.js!");
  process.exit(1);
}

const p255AvatarIdx = mockCode.indexOf("avatarUrl:", targetP255Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP255Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP255Idx);
const p255EndIdx = mockCode.indexOf("}", p255AvatarIdx);

mockCode = mockCode.substring(0, p255EndIdx + 1);

const hummet2026Obj = `,
  {
    id: 'p256',
    name: 'デニス・ヒュメット(2026)',
    readingName: 'でにす・ひゅめっと',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'トルコ',
    policy: 'ポゼッション',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6344,
    maxOverall: 14561,
    baseStats: { shoot: 1227, pass: 1104, dribble: 1218, defense: 988, physical: 1135, speed: 799 },
    detailStats: {
      shoot: { finishing: 421, power: 401, composure: 405 },
      pass: { shortPass: 373, longPass: 348, accuracy: 383 },
      dribble: { breakout: 426, keeping: 400, ballTouch: 392 },
      defense: { tackle: 315, interception: 346, marking: 327 },
      physical: { jumping: 390, contact: 378, stamina: 367 },
      speed: { running: 392, agility: 407 }
    },
    maxEnhanced: {
      overall: 14561,
      baseStats: { shoot: 2832, pass: 2637, dribble: 2799, defense: 2485, physical: 2716, speed: 1845 },
      detailStats: {
        shoot: { finishing: 956, power: 936, composure: 940 },
        pass: { shortPass: 884, longPass: 859, accuracy: 894 },
        dribble: { breakout: 949, keeping: 923, ballTouch: 927 },
        defense: { tackle: 814, interception: 845, marking: 826 },
        physical: { jumping: 913, contact: 913, stamina: 890 },
        speed: { running: 915, agility: 930 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'シュートセンス', rank: '銀', description: '発動条件：好調　/　決定力・キック力UP' },
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += hummet2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p256 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('hummet2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/hummet2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p256Check = `  if (player.id === 'p256' || (player.name && (player.name.includes('デニス・ヒュメット') || player.name.includes('ヒュメット') || player.name.includes('Deniz Hümmet') || player.name.includes('Hummet')))) {\n    return window.HUMMET_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p256'")) {
    const marker = "if (player.id === 'p255'";
    const altMarker = 'if (player.id === "p255"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p256Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p256 avatar resolver.');
    } else {
      console.warn('Could not find p255 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p256'")) {
    const marker = "if (player.id === 'p255'";
    const altMarker = 'if (player.id === "p255"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p256Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p256 avatar resolver.');
    } else {
      console.warn('Could not find p255 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p256 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p256');
console.log('6. Verification of p256:', p256 ? p256.name : 'MISSING');
if (p256) {
  console.log('   Overall:', p256.overall, '| MaxOverall:', p256.maxOverall);
  console.log('   Policy:', p256.policy, '| PlayStyle:', p256.playStyle, p256.playStyleLevel);
  console.log('   Nationality:', p256.nationality, '| Position:', p256.mainPosition);
  console.log('   Skill:', p256.skill.name);
  console.log('   Abilities:', p256.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.HUMMET_2026_IMAGE:', sandbox.window.HUMMET_2026_IMAGE ? 'LOADED' : 'MISSING');
