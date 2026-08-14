const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YUYA YAMAGISHI 2026 (p258) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786119125692.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yamagishi2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YAMAGISHI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. yamagishi2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p257Idx = mockCode.indexOf("id: 'p257'");
const altP257Idx = mockCode.indexOf('"id": "p257"');
const targetP257Idx = p257Idx !== -1 ? p257Idx : altP257Idx;

if (targetP257Idx === -1) {
  console.error("Could not find p257 in mockData.js!");
  process.exit(1);
}

const p257AvatarIdx = mockCode.indexOf("avatarUrl:", targetP257Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP257Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP257Idx);
const p257EndIdx = mockCode.indexOf("}", p257AvatarIdx);

mockCode = mockCode.substring(0, p257EndIdx + 1);

const yamagishi2026Obj = `,
  {
    id: 'p258',
    name: '山岸祐也(2026)',
    readingName: 'やまぎし・ゆうや',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6247,
    maxOverall: 14458,
    baseStats: { shoot: 1158, pass: 1139, dribble: 1227, defense: 946, physical: 1141, speed: 786 },
    detailStats: {
      shoot: { finishing: 408, power: 329, composure: 421 },
      pass: { shortPass: 387, longPass: 377, accuracy: 375 },
      dribble: { breakout: 390, keeping: 396, ballTouch: 441 },
      defense: { tackle: 282, interception: 335, marking: 329 },
      physical: { jumping: 393, contact: 377, stamina: 371 },
      speed: { running: 375, agility: 411 }
    },
    maxEnhanced: {
      overall: 14458,
      baseStats: { shoot: 2763, pass: 2672, dribble: 2808, defense: 2443, physical: 2722, speed: 1832 },
      detailStats: {
        shoot: { finishing: 943, power: 864, composure: 956 },
        pass: { shortPass: 898, longPass: 888, accuracy: 886 },
        dribble: { breakout: 913, keeping: 919, ballTouch: 976 },
        defense: { tackle: 781, interception: 834, marking: 828 },
        physical: { jumping: 916, contact: 912, stamina: 894 },
        speed: { running: 898, agility: 934 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '絶妙なトラップ', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：トラップ時　/　ボールタッチ・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'ゴール前の落ち着き', rank: '銀', description: 'ゴール前で冷静にコースを見極めて得点力を向上' },
      { name: '上空のターゲットマン', rank: '銀', description: '発動条件：途中出場　/　キープ力・ジャンプUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += yamagishi2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p258 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('yamagishi2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/yamagishi2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p258Check = `  if (player.id === 'p258' || (player.name && (player.name.includes('山岸祐也') || (player.name.includes('山岸') && player.name.includes('祐也')) || player.name.includes('Yuya Yamagishi') || player.name.includes('Yamagishi')))) {\n    return window.YAMAGISHI_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p258'")) {
    const marker = "if (player.id === 'p257'";
    const altMarker = 'if (player.id === "p257"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p258Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p258 avatar resolver.');
    } else {
      console.warn('Could not find p257 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p258'")) {
    const marker = "if (player.id === 'p257'";
    const altMarker = 'if (player.id === "p257"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p258Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p258 avatar resolver.');
    } else {
      console.warn('Could not find p257 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p258 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p258');
console.log('6. Verification of p258:', p258 ? p258.name : 'MISSING');
if (p258) {
  console.log('   Overall:', p258.overall, '| MaxOverall:', p258.maxOverall);
  console.log('   Policy:', p258.policy, '| PlayStyle:', p258.playStyle, p258.playStyleLevel);
  console.log('   Nationality:', p258.nationality, '| Position:', p258.mainPosition);
  console.log('   Skill:', p258.skill.name);
  console.log('   Abilities:', p258.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.YAMAGISHI_2026_IMAGE:', sandbox.window.YAMAGISHI_2026_IMAGE ? 'LOADED' : 'MISSING');
