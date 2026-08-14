const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YAMATO NAITO 2026 (p251) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786117877727.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'naitoYamato2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.NAITO_YAMATO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. naitoYamato2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p250Idx = mockCode.indexOf("id: 'p250'");
const altP250Idx = mockCode.indexOf('"id": "p250"');
const targetP250Idx = p250Idx !== -1 ? p250Idx : altP250Idx;

if (targetP250Idx === -1) {
  console.error("Could not find p250 in mockData.js!");
  process.exit(1);
}

const p250AvatarIdx = mockCode.indexOf("avatarUrl:", targetP250Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP250Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP250Idx);
const p250EndIdx = mockCode.indexOf("}", p250AvatarIdx);

mockCode = mockCode.substring(0, p250EndIdx + 1);

const naitoYamato2026Obj = `,
  {
    id: 'p251',
    name: '内藤大和(2026)',
    readingName: 'ないとう・やまと',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6106,
    maxOverall: 14312,
    baseStats: { shoot: 1126, pass: 1078, dribble: 1110, defense: 978, physical: 1121, speed: 802 },
    detailStats: {
      shoot: { finishing: 385, power: 347, composure: 394 },
      pass: { shortPass: 363, longPass: 364, accuracy: 351 },
      dribble: { breakout: 371, keeping: 361, ballTouch: 378 },
      defense: { tackle: 317, interception: 331, marking: 330 },
      physical: { jumping: 384, contact: 369, stamina: 368 },
      speed: { running: 390, agility: 412 }
    },
    maxEnhanced: {
      overall: 14312,
      baseStats: { shoot: 2731, pass: 2611, dribble: 2691, defense: 2475, physical: 2702, speed: 1848 },
      detailStats: {
        shoot: { finishing: 920, power: 882, composure: 929 },
        pass: { shortPass: 874, longPass: 875, accuracy: 862 },
        dribble: { breakout: 894, keeping: 884, ballTouch: 913 },
        defense: { tackle: 816, interception: 830, marking: 829 },
        physical: { jumping: 907, contact: 904, stamina: 891 },
        speed: { running: 913, agility: 935 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' },
      { name: 'パワフルランナー', rank: '銀', description: '発動条件：途中出場　/　コンタクト・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += naitoYamato2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p251 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('naitoYamato2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/naitoYamato2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p251Check = `  if (player.id === 'p251' || (player.name && (player.name.includes('内藤大和') || (player.name.includes('内藤') && player.name.includes('大和')) || player.name.includes('Yamato Naito') || player.name.includes('Naito')))) {\n    return window.NAITO_YAMATO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p251'")) {
    const marker = "if (player.id === 'p250'";
    const altMarker = 'if (player.id === "p250"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p251Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p251 avatar resolver.');
    } else {
      console.warn('Could not find p250 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p251'")) {
    const marker = "if (player.id === 'p250'";
    const altMarker = 'if (player.id === "p250"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p251Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p251 avatar resolver.');
    } else {
      console.warn('Could not find p250 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p251 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p251');
console.log('6. Verification of p251:', p251 ? p251.name : 'MISSING');
if (p251) {
  console.log('   Overall:', p251.overall, '| MaxOverall:', p251.maxOverall);
  console.log('   Policy:', p251.policy, '| PlayStyle:', p251.playStyle, p251.playStyleLevel);
  console.log('   Nationality:', p251.nationality, '| Position:', p251.mainPosition);
  console.log('   Skill:', p251.skill.name);
  console.log('   Abilities:', p251.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.NAITO_YAMATO_2026_IMAGE:', sandbox.window.NAITO_YAMATO_2026_IMAGE ? 'LOADED' : 'MISSING');
