const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING JOO MIN-KYU 2026 (p230) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\30d7f0d1-9473-434c-80bc-71d83c6d7758\\media__1786113714070.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'jooMinKyu2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.JOO_MIN_KYU_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. jooMinKyu2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p229Idx = mockCode.indexOf("id: 'p229'");
const altP229Idx = mockCode.indexOf('"id": "p229"');
const targetP229Idx = p229Idx !== -1 ? p229Idx : altP229Idx;

if (targetP229Idx === -1) {
  console.error("Could not find p229 in mockData.js!");
  process.exit(1);
}

const p229AvatarIdx = mockCode.indexOf("avatarUrl:", targetP229Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP229Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP229Idx);
const p229EndIdx = mockCode.indexOf("}", p229AvatarIdx);

mockCode = mockCode.substring(0, p229EndIdx + 1);

const jooMinKyu2026Obj = `,
  {
    id: 'p230',
    name: 'ジュ・ミンギュ(2026)',
    readingName: 'じゅ・みんぎゅ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'リアクション',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6087,
    maxOverall: 14262,
    baseStats: { shoot: 1233, pass: 1151, dribble: 1169, defense: 995, physical: 1213, speed: 681 },
    detailStats: {
      shoot: { finishing: 430, power: 400, composure: 403 },
      pass: { shortPass: 386, longPass: 384, accuracy: 381 },
      dribble: { breakout: 382, keeping: 383, ballTouch: 404 },
      defense: { tackle: 343, interception: 337, marking: 315 },
      physical: { jumping: 405, contact: 353, stamina: 455 },
      speed: { running: 334, agility: 347 }
    },
    maxEnhanced: {
      overall: 14262,
      baseStats: { shoot: 2790, pass: 2720, dribble: 2762, defense: 2504, physical: 2758, speed: 1751 },
      detailStats: {
        shoot: { finishing: 953, power: 911, composure: 926 },
        pass: { shortPass: 909, longPass: 907, accuracy: 904 },
        dribble: { breakout: 917, keeping: 918, ballTouch: 927 },
        defense: { tackle: 854, interception: 836, marking: 814 },
        physical: { jumping: 916, contact: 864, stamina: 978 },
        speed: { running: 869, agility: 882 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '冷静な破壊者', rank: '銀', description: '発動条件：好調　/　冷静さ・コンタクトUP' },
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += jooMinKyu2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p230 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('jooMinKyu2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/jooMinKyu2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p230Check = `  if (player.id === 'p230' || (player.name && (player.name.includes('ジュ・ミンギュ') || player.name.includes('ミンギュ') || player.name.includes('Joo Min-Kyu') || player.name.includes('Min-Kyu')))) {\n    return window.JOO_MIN_KYU_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p230'")) {
    const marker = "if (player.id === 'p229'";
    const altMarker = 'if (player.id === "p229"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p230Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p230 avatar resolver.');
    } else {
      console.warn('Could not find p229 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p230'")) {
    const marker = "if (player.id === 'p229'";
    const altMarker = 'if (player.id === "p229"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p230Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p230 avatar resolver.');
    } else {
      console.warn('Could not find p229 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p230 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p230');
console.log('6. Verification of p230:', p230 ? p230.name : 'MISSING');
if (p230) {
  console.log('   Overall:', p230.overall, '| MaxOverall:', p230.maxOverall);
  console.log('   Policy:', p230.policy, '| PlayStyle:', p230.playStyle, p230.playStyleLevel);
  console.log('   Nationality:', p230.nationality, '| Position:', p230.mainPosition);
  console.log('   Skill:', p230.skill.name);
  console.log('   Abilities:', p230.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.JOO_MIN_KYU_2026_IMAGE:', sandbox.window.JOO_MIN_KYU_2026_IMAGE ? 'LOADED' : 'MISSING');
