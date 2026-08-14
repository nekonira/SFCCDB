const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KEN YAMURA 2026 (p245) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786116756680.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yamura2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YAMURA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. yamura2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p244Idx = mockCode.indexOf("id: 'p244'");
const altP244Idx = mockCode.indexOf('"id": "p244"');
const targetP244Idx = p244Idx !== -1 ? p244Idx : altP244Idx;

if (targetP244Idx === -1) {
  console.error("Could not find p244 in mockData.js!");
  process.exit(1);
}

const p244AvatarIdx = mockCode.indexOf("avatarUrl:", targetP244Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP244Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP244Idx);
const p244EndIdx = mockCode.indexOf("}", p244AvatarIdx);

mockCode = mockCode.substring(0, p244EndIdx + 1);

const yamura2026Obj = `,
  {
    id: 'p245',
    name: '矢村健(2026)',
    readingName: 'やむら・けん',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6167,
    maxOverall: 14472,
    baseStats: { shoot: 1166, pass: 1039, dribble: 1161, defense: 989, physical: 1139, speed: 843 },
    detailStats: {
      shoot: { finishing: 397, power: 385, composure: 384 },
      pass: { shortPass: 350, longPass: 341, accuracy: 348 },
      dribble: { breakout: 401, keeping: 369, ballTouch: 391 },
      defense: { tackle: 353, interception: 322, marking: 314 },
      physical: { jumping: 390, contact: 387, stamina: 362 },
      speed: { running: 398, agility: 445 }
    },
    maxEnhanced: {
      overall: 14472,
      baseStats: { shoot: 2771, pass: 2572, dribble: 2742, defense: 2486, physical: 2720, speed: 1889 },
      detailStats: {
        shoot: { finishing: 932, power: 920, composure: 919 },
        pass: { shortPass: 861, longPass: 852, accuracy: 859 },
        dribble: { breakout: 924, keeping: 892, ballTouch: 926 },
        defense: { tackle: 852, interception: 821, marking: 813 },
        physical: { jumping: 913, contact: 922, stamina: 885 },
        speed: { running: 921, agility: 968 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' },
      { name: 'パワフルランナー', rank: '銀', description: '発動条件：途中出場　/　コンタクト・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += yamura2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p245 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('yamura2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/yamura2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p245Check = `  if (player.id === 'p245' || (player.name && (player.name.includes('矢村健') || (player.name.includes('矢村') && player.name.includes('健')) || player.name.includes('Ken Yamura') || player.name.includes('Yamura')))) {\n    return window.YAMURA_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p245'")) {
    const marker = "if (player.id === 'p244'";
    const altMarker = 'if (player.id === "p244"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p245Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p245 avatar resolver.');
    } else {
      console.warn('Could not find p244 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p245'")) {
    const marker = "if (player.id === 'p244'";
    const altMarker = 'if (player.id === "p244"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p245Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p245 avatar resolver.');
    } else {
      console.warn('Could not find p244 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p245 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p245');
console.log('6. Verification of p245:', p245 ? p245.name : 'MISSING');
if (p245) {
  console.log('   Overall:', p245.overall, '| MaxOverall:', p245.maxOverall);
  console.log('   Policy:', p245.policy, '| PlayStyle:', p245.playStyle, p245.playStyleLevel);
  console.log('   Nationality:', p245.nationality, '| Position:', p245.mainPosition);
  console.log('   Skill:', p245.skill.name);
  console.log('   Abilities:', p245.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.YAMURA_2026_IMAGE:', sandbox.window.YAMURA_2026_IMAGE ? 'LOADED' : 'MISSING');
