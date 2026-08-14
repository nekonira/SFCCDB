const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KEITO KAWAMURA 2026 (p250) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786117713041.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kawamuraKeito2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KAWAMURA_KEITO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kawamuraKeito2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p249Idx = mockCode.indexOf("id: 'p249'");
const altP249Idx = mockCode.indexOf('"id": "p249"');
const targetP249Idx = p249Idx !== -1 ? p249Idx : altP249Idx;

if (targetP249Idx === -1) {
  console.error("Could not find p249 in mockData.js!");
  process.exit(1);
}

const p249AvatarIdx = mockCode.indexOf("avatarUrl:", targetP249Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP249Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP249Idx);
const p249EndIdx = mockCode.indexOf("}", p249AvatarIdx);

mockCode = mockCode.substring(0, p249EndIdx + 1);

const kawamuraKeito2026Obj = `,
  {
    id: 'p250',
    name: '河村慶人(2026)',
    readingName: 'かわむら・けいと',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6055,
    maxOverall: 14253,
    baseStats: { shoot: 1092, pass: 1148, dribble: 1204, defense: 1017, physical: 1118, speed: 822 },
    detailStats: {
      shoot: { finishing: 374, power: 344, composure: 374 },
      pass: { shortPass: 403, longPass: 379, accuracy: 366 },
      dribble: { breakout: 406, keeping: 394, ballTouch: 404 },
      defense: { tackle: 347, interception: 339, marking: 331 },
      physical: { jumping: 402, contact: 347, stamina: 369 },
      speed: { running: 406, agility: 416 }
    },
    maxEnhanced: {
      overall: 14253,
      baseStats: { shoot: 2697, pass: 2681, dribble: 2785, defense: 2514, physical: 2699, speed: 1868 },
      detailStats: {
        shoot: { finishing: 909, power: 879, composure: 909 },
        pass: { shortPass: 914, longPass: 890, accuracy: 877 },
        dribble: { breakout: 929, keeping: 917, ballTouch: 939 },
        defense: { tackle: 846, interception: 838, marking: 830 },
        physical: { jumping: 925, contact: 882, stamina: 892 },
        speed: { running: 929, agility: 939 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '絶妙なトラップ', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：トラップ時　/　ボールタッチ・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '高速のボールタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・走力UP' },
      { name: '跳躍のパサー', rank: '銀', description: '発動条件：好調　/　ショートパス・ジャンプUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += kawamuraKeito2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p250 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kawamuraKeito2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/kawamuraKeito2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p250Check = `  if (player.id === 'p250' || (player.name && (player.name.includes('河村慶人') || (player.name.includes('河村') && player.name.includes('慶人')) || player.name.includes('Keito Kawamura') || player.name.includes('Kawamura')))) {\n    return window.KAWAMURA_KEITO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p250'")) {
    const marker = "if (player.id === 'p249'";
    const altMarker = 'if (player.id === "p249"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p250Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p250 avatar resolver.');
    } else {
      console.warn('Could not find p249 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p250'")) {
    const marker = "if (player.id === 'p249'";
    const altMarker = 'if (player.id === "p249"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p250Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p250 avatar resolver.');
    } else {
      console.warn('Could not find p249 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p250 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p250');
console.log('6. Verification of p250:', p250 ? p250.name : 'MISSING');
if (p250) {
  console.log('   Overall:', p250.overall, '| MaxOverall:', p250.maxOverall);
  console.log('   Policy:', p250.policy, '| PlayStyle:', p250.playStyle, p250.playStyleLevel);
  console.log('   Nationality:', p250.nationality, '| Position:', p250.mainPosition);
  console.log('   Skill:', p250.skill.name);
  console.log('   Abilities:', p250.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KAWAMURA_KEITO_2026_IMAGE:', sandbox.window.KAWAMURA_KEITO_2026_IMAGE ? 'LOADED' : 'MISSING');
