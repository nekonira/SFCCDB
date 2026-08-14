const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING HOLMBERT ARON FRIDJONSSON 2026 (p231) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\30d7f0d1-9473-434c-80bc-71d83c6d7758\\media__1786113932293.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'fridjonsson2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.FRIDJONSSON_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. fridjonsson2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p230Idx = mockCode.indexOf("id: 'p230'");
const altP230Idx = mockCode.indexOf('"id": "p230"');
const targetP230Idx = p230Idx !== -1 ? p230Idx : altP230Idx;

if (targetP230Idx === -1) {
  console.error("Could not find p230 in mockData.js!");
  process.exit(1);
}

const p230AvatarIdx = mockCode.indexOf("avatarUrl:", targetP230Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP230Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP230Idx);
const p230EndIdx = mockCode.indexOf("}", p230AvatarIdx);

mockCode = mockCode.substring(0, p230EndIdx + 1);

const fridjonsson2026Obj = `,
  {
    id: 'p231',
    name: 'ホルムベルト・アーロン・フリズヨンソン(2026)',
    readingName: 'ほるむべると・あーろん・ふりずよんそん',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'アイスランド',
    policy: 'カウンター',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6341,
    maxOverall: 14560,
    baseStats: { shoot: 1166, pass: 1008, dribble: 1036, defense: 895, physical: 1279, speed: 615 },
    detailStats: {
      shoot: { finishing: 367, power: 419, composure: 380 },
      pass: { shortPass: 336, longPass: 334, accuracy: 338 },
      dribble: { breakout: 328, keeping: 354, ballTouch: 354 },
      defense: { tackle: 296, interception: 305, marking: 294 },
      physical: { jumping: 477, contact: 465, stamina: 337 },
      speed: { running: 301, agility: 314 }
    },
    maxEnhanced: {
      overall: 14560,
      baseStats: { shoot: 2771, pass: 2541, dribble: 2617, defense: 2392, physical: 2860, speed: 1661 },
      detailStats: {
        shoot: { finishing: 902, power: 954, composure: 915 },
        pass: { shortPass: 847, longPass: 845, accuracy: 849 },
        dribble: { breakout: 851, keeping: 877, ballTouch: 889 },
        defense: { tackle: 795, interception: 804, marking: 793 },
        physical: { jumping: 1000, contact: 1000, stamina: 860 },
        speed: { running: 824, agility: 837 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '上空のスナイパー', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ジャンプUP' },
      { name: 'ターゲットマン', rank: '銀', description: '発動条件：途中出場　/　決定力・キープ力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += fridjonsson2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p231 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('fridjonsson2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/fridjonsson2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p231Check = `  if (player.id === 'p231' || (player.name && (player.name.includes('フリズヨンソン') || player.name.includes('ホルムベルト') || player.name.includes('Friðjónsson') || player.name.includes('Fridjonsson')))) {\n    return window.FRIDJONSSON_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p231'")) {
    const marker = "if (player.id === 'p230'";
    const altMarker = 'if (player.id === "p230"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p231Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p231 avatar resolver.');
    } else {
      console.warn('Could not find p230 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p231'")) {
    const marker = "if (player.id === 'p230'";
    const altMarker = 'if (player.id === "p230"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p231Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p231 avatar resolver.');
    } else {
      console.warn('Could not find p230 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p231 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p231');
console.log('6. Verification of p231:', p231 ? p231.name : 'MISSING');
if (p231) {
  console.log('   Overall:', p231.overall, '| MaxOverall:', p231.maxOverall);
  console.log('   Policy:', p231.policy, '| PlayStyle:', p231.playStyle, p231.playStyleLevel);
  console.log('   Nationality:', p231.nationality, '| Position:', p231.mainPosition);
  console.log('   Skill:', p231.skill.name);
  console.log('   Abilities:', p231.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.FRIDJONSSON_2026_IMAGE:', sandbox.window.FRIDJONSSON_2026_IMAGE ? 'LOADED' : 'MISSING');
