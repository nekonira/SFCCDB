const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING SORA TANAKA 2026 (p252) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786118030855.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'tanakaSora2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.TANAKA_SORA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. tanakaSora2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p251Idx = mockCode.indexOf("id: 'p251'");
const altP251Idx = mockCode.indexOf('"id": "p251"');
const targetP251Idx = p251Idx !== -1 ? p251Idx : altP251Idx;

if (targetP251Idx === -1) {
  console.error("Could not find p251 in mockData.js!");
  process.exit(1);
}

const p251AvatarIdx = mockCode.indexOf("avatarUrl:", targetP251Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP251Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP251Idx);
const p251EndIdx = mockCode.indexOf("}", p251AvatarIdx);

mockCode = mockCode.substring(0, p251EndIdx + 1);

const tanakaSora2026Obj = `,
  {
    id: 'p252',
    name: '田中想来(2026)',
    readingName: 'たなか・そら',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6094,
    maxOverall: 14305,
    baseStats: { shoot: 1093, pass: 896, dribble: 1133, defense: 972, physical: 1125, speed: 834 },
    detailStats: {
      shoot: { finishing: 383, power: 331, composure: 379 },
      pass: { shortPass: 296, longPass: 292, accuracy: 308 },
      dribble: { breakout: 381, keeping: 369, ballTouch: 383 },
      defense: { tackle: 295, interception: 338, marking: 339 },
      physical: { jumping: 395, contact: 365, stamina: 365 },
      speed: { running: 412, agility: 422 }
    },
    maxEnhanced: {
      overall: 14305,
      baseStats: { shoot: 2698, pass: 2429, dribble: 2714, defense: 2469, physical: 2706, speed: 1880 },
      detailStats: {
        shoot: { finishing: 918, power: 866, composure: 914 },
        pass: { shortPass: 807, longPass: 803, accuracy: 819 },
        dribble: { breakout: 904, keeping: 892, ballTouch: 918 },
        defense: { tackle: 794, interception: 837, marking: 838 },
        physical: { jumping: 918, contact: 900, stamina: 888 },
        speed: { running: 935, agility: 945 }
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
      { name: '裏への飛び出し', rank: '銀', description: '発動条件：途中出場　/　決定力・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += tanakaSora2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p252 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('tanakaSora2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/tanakaSora2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p252Check = `  if (player.id === 'p252' || (player.name && (player.name.includes('田中想来') || (player.name.includes('田中') && player.name.includes('想来')) || player.name.includes('Sora Tanaka') || player.name.includes('Tanaka')))) {\n    return window.TANAKA_SORA_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p252'")) {
    const marker = "if (player.id === 'p251'";
    const altMarker = 'if (player.id === "p251"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p252Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p252 avatar resolver.');
    } else {
      console.warn('Could not find p251 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p252'")) {
    const marker = "if (player.id === 'p251'";
    const altMarker = 'if (player.id === "p251"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p252Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p252 avatar resolver.');
    } else {
      console.warn('Could not find p251 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p252 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p252');
console.log('6. Verification of p252:', p252 ? p252.name : 'MISSING');
if (p252) {
  console.log('   Overall:', p252.overall, '| MaxOverall:', p252.maxOverall);
  console.log('   Policy:', p252.policy, '| PlayStyle:', p252.playStyle, p252.playStyleLevel);
  console.log('   Nationality:', p252.nationality, '| Position:', p252.mainPosition);
  console.log('   Skill:', p252.skill.name);
  console.log('   Abilities:', p252.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.TANAKA_SORA_2026_IMAGE:', sandbox.window.TANAKA_SORA_2026_IMAGE ? 'LOADED' : 'MISSING');
