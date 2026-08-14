const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TAKUMI SHIMADA 2026 (p240) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786115828733.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'shimada2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SHIMADA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. shimada2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p239Idx = mockCode.indexOf("id: 'p239'");
const altP239Idx = mockCode.indexOf('"id": "p239"');
const targetP239Idx = p239Idx !== -1 ? p239Idx : altP239Idx;

if (targetP239Idx === -1) {
  console.error("Could not find p239 in mockData.js!");
  process.exit(1);
}

const p239AvatarIdx = mockCode.indexOf("avatarUrl:", targetP239Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP239Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP239Idx);
const p239EndIdx = mockCode.indexOf("}", p239AvatarIdx);

mockCode = mockCode.substring(0, p239EndIdx + 1);

const shimada2026Obj = `,
  {
    id: 'p240',
    name: '島田拓海(2026)',
    readingName: 'しまだ・たくみ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 5923,
    maxOverall: 14135,
    baseStats: { shoot: 1099, pass: 977, dribble: 1058, defense: 963, physical: 1143, speed: 726 },
    detailStats: {
      shoot: { finishing: 378, power: 356, composure: 365 },
      pass: { shortPass: 335, longPass: 326, accuracy: 316 },
      dribble: { breakout: 357, keeping: 349, ballTouch: 352 },
      defense: { tackle: 337, interception: 328, marking: 298 },
      physical: { jumping: 432, contact: 397, stamina: 314 },
      speed: { running: 349, agility: 377 }
    },
    maxEnhanced: {
      overall: 14135,
      baseStats: { shoot: 2704, pass: 2510, dribble: 2639, defense: 2460, physical: 2724, speed: 1772 },
      detailStats: {
        shoot: { finishing: 913, power: 891, composure: 900 },
        pass: { shortPass: 846, longPass: 837, accuracy: 827 },
        dribble: { breakout: 880, keeping: 872, ballTouch: 887 },
        defense: { tackle: 836, interception: 827, marking: 797 },
        physical: { jumping: 955, contact: 932, stamina: 837 },
        speed: { running: 872, agility: 900 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '上空のスナイパー', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ジャンプUP' },
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += shimada2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p240 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('shimada2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/shimada2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p240Check = `  if (player.id === 'p240' || (player.name && (player.name.includes('島田拓海') || (player.name.includes('島田') && player.name.includes('拓海')) || player.name.includes('Takumi Shimada') || player.name.includes('Shimada')))) {\n    return window.SHIMADA_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p240'")) {
    const marker = "if (player.id === 'p239'";
    const altMarker = 'if (player.id === "p239"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p240Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p240 avatar resolver.');
    } else {
      console.warn('Could not find p239 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p240'")) {
    const marker = "if (player.id === 'p239'";
    const altMarker = 'if (player.id === "p239"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p240Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p240 avatar resolver.');
    } else {
      console.warn('Could not find p239 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p240 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p240');
console.log('6. Verification of p240:', p240 ? p240.name : 'MISSING');
if (p240) {
  console.log('   Overall:', p240.overall, '| MaxOverall:', p240.maxOverall);
  console.log('   Policy:', p240.policy, '| PlayStyle:', p240.playStyle, p240.playStyleLevel);
  console.log('   Nationality:', p240.nationality, '| Position:', p240.mainPosition);
  console.log('   Skill:', p240.skill.name);
  console.log('   Abilities:', p240.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SHIMADA_2026_IMAGE:', sandbox.window.SHIMADA_2026_IMAGE ? 'LOADED' : 'MISSING');
