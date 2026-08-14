const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MOTOKI NAGAKURA 2026 (p243) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786116381997.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'nagakura2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.NAGAKURA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. nagakura2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p242Idx = mockCode.indexOf("id: 'p242'");
const altP242Idx = mockCode.indexOf('"id": "p242"');
const targetP242Idx = p242Idx !== -1 ? p242Idx : altP242Idx;

if (targetP242Idx === -1) {
  console.error("Could not find p242 in mockData.js!");
  process.exit(1);
}

const p242AvatarIdx = mockCode.indexOf("avatarUrl:", targetP242Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP242Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP242Idx);
const p242EndIdx = mockCode.indexOf("}", p242AvatarIdx);

mockCode = mockCode.substring(0, p242EndIdx + 1);

const nagakura2026Obj = `,
  {
    id: 'p243',
    name: '長倉幹樹(2026)',
    readingName: 'ながくら・もとき',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6345,
    maxOverall: 14541,
    baseStats: { shoot: 1198, pass: 1011, dribble: 1201, defense: 834, physical: 1084, speed: 865 },
    detailStats: {
      shoot: { finishing: 404, power: 369, composure: 425 },
      pass: { shortPass: 332, longPass: 319, accuracy: 360 },
      dribble: { breakout: 420, keeping: 398, ballTouch: 383 },
      defense: { tackle: 247, interception: 298, marking: 289 },
      physical: { jumping: 371, contact: 307, stamina: 406 },
      speed: { running: 414, agility: 451 }
    },
    maxEnhanced: {
      overall: 14541,
      baseStats: { shoot: 2803, pass: 2544, dribble: 2782, defense: 2331, physical: 2665, speed: 1911 },
      detailStats: {
        shoot: { finishing: 939, power: 904, composure: 960 },
        pass: { shortPass: 843, longPass: 830, accuracy: 871 },
        dribble: { breakout: 943, keeping: 921, ballTouch: 918 },
        defense: { tackle: 746, interception: 797, marking: 788 },
        physical: { jumping: 894, contact: 842, stamina: 929 },
        speed: { running: 937, agility: 974 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '冷静なフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・冷静さUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += nagakura2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p243 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('nagakura2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/nagakura2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p243Check = `  if (player.id === 'p243' || (player.name && (player.name.includes('長倉幹樹') || player.name.includes('長倉') || player.name.includes('Motoki Nagakura') || player.name.includes('Nagakura')))) {\n    return window.NAGAKURA_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p243'")) {
    const marker = "if (player.id === 'p242'";
    const altMarker = 'if (player.id === "p242"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p243Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p243 avatar resolver.');
    } else {
      console.warn('Could not find p242 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p243'")) {
    const marker = "if (player.id === 'p242'";
    const altMarker = 'if (player.id === "p242"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p243Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p243 avatar resolver.');
    } else {
      console.warn('Could not find p242 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p243 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p243');
console.log('6. Verification of p243:', p243 ? p243.name : 'MISSING');
if (p243) {
  console.log('   Overall:', p243.overall, '| MaxOverall:', p243.maxOverall);
  console.log('   Policy:', p243.policy, '| PlayStyle:', p243.playStyle, p243.playStyleLevel);
  console.log('   Nationality:', p243.nationality, '| Position:', p243.mainPosition);
  console.log('   Skill:', p243.skill.name);
  console.log('   Abilities:', p243.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.NAGAKURA_2026_IMAGE:', sandbox.window.NAGAKURA_2026_IMAGE ? 'LOADED' : 'MISSING');
