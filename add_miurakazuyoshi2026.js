const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KAZUYOSHI MIURA 2026 (p241) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786116051647.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'miuraKazuyoshi2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.MIURA_KAZUYOSHI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. miuraKazuyoshi2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p240Idx = mockCode.indexOf("id: 'p240'");
const altP240Idx = mockCode.indexOf('"id": "p240"');
const targetP240Idx = p240Idx !== -1 ? p240Idx : altP240Idx;

if (targetP240Idx === -1) {
  console.error("Could not find p240 in mockData.js!");
  process.exit(1);
}

const p240AvatarIdx = mockCode.indexOf("avatarUrl:", targetP240Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP240Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP240Idx);
const p240EndIdx = mockCode.indexOf("}", p240AvatarIdx);

mockCode = mockCode.substring(0, p240EndIdx + 1);

const miuraKazuyoshi2026Obj = `,
  {
    id: 'p241',
    name: '三浦知良(2026)',
    readingName: 'みうら・かずよし',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6508,
    maxOverall: 14695,
    baseStats: { shoot: 1286, pass: 1194, dribble: 1230, defense: 931, physical: 1045, speed: 796 },
    detailStats: {
      shoot: { finishing: 462, power: 364, composure: 460 },
      pass: { shortPass: 400, longPass: 386, accuracy: 408 },
      dribble: { breakout: 409, keeping: 417, ballTouch: 404 },
      defense: { tackle: 291, interception: 329, marking: 311 },
      physical: { jumping: 353, contact: 324, stamina: 368 },
      speed: { running: 379, agility: 417 }
    },
    maxEnhanced: {
      overall: 14695,
      baseStats: { shoot: 2891, pass: 2727, dribble: 2811, defense: 2428, physical: 2626, speed: 1842 },
      detailStats: {
        shoot: { finishing: 997, power: 899, composure: 995 },
        pass: { shortPass: 911, longPass: 897, accuracy: 919 },
        dribble: { breakout: 932, keeping: 940, ballTouch: 939 },
        defense: { tackle: 790, interception: 828, marking: 810 },
        physical: { jumping: 876, contact: 859, stamina: 891 },
        speed: { running: 902, agility: 940 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'キングの舞', rank: '金', description: '発動条件：なし　/　踊る' },
      { name: 'シュートセンス', rank: '銀', description: '発動条件：好調　/　決定力・キック力UP' },
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += miuraKazuyoshi2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p241 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('miuraKazuyoshi2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/miuraKazuyoshi2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p241Check = `  if (player.id === 'p241' || (player.name && (player.name.includes('三浦知良') || player.name.includes('カズ') || player.name.includes('Kazuyoshi Miura') || player.name.includes('Miura')))) {\n    return window.MIURA_KAZUYOSHI_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p241'")) {
    const marker = "if (player.id === 'p240'";
    const altMarker = 'if (player.id === "p240"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p241Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p241 avatar resolver.');
    } else {
      console.warn('Could not find p240 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p241'")) {
    const marker = "if (player.id === 'p240'";
    const altMarker = 'if (player.id === "p240"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p241Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p241 avatar resolver.');
    } else {
      console.warn('Could not find p240 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p241 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p241');
console.log('6. Verification of p241:', p241 ? p241.name : 'MISSING');
if (p241) {
  console.log('   Overall:', p241.overall, '| MaxOverall:', p241.maxOverall);
  console.log('   Policy:', p241.policy, '| PlayStyle:', p241.playStyle, p241.playStyleLevel);
  console.log('   Nationality:', p241.nationality, '| Position:', p241.mainPosition);
  console.log('   Skill:', p241.skill.name);
  console.log('   Abilities:', p241.abilities.map(a => `${a.rank} ${a.name}`).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.MIURA_KAZUYOSHI_2026_IMAGE:', sandbox.window.MIURA_KAZUYOSHI_2026_IMAGE ? 'LOADED' : 'MISSING');
