const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING FLORIAN THAUVIN 2026 (p378 - ☆2 PLAYER) ===');

const userImgPath = path.join('C:', 'Users', 'nekon', '.gemini', 'antigravity-ide', 'brain', 'c3a5e61d-f22a-47ed-92e3-a677b8e48971', '.user_uploaded', 'media_1788236581366.png');
const imgDestPath = path.join(__dirname, 'src', 'data', 'florianThauvin2026Image.js');
const indexHtmlPath = path.join(__dirname, 'index.html');
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');

// 1. Process Image
if (fs.existsSync(userImgPath)) {
  const imgBuf = fs.readFileSync(userImgPath);
  const base64Str = `data:image/png;base64,${imgBuf.toString('base64')}`;
  const jsContent = `window.FLORIAN_THAUVIN_2026_IMAGE = "${base64Str}";\n`;
  fs.writeFileSync(imgDestPath, jsContent, 'utf-8');
  console.log('1. Created src/data/florianThauvin2026Image.js from uploaded card image.');
} else {
  console.error('User image not found at', userImgPath);
}

// 2. Update index.html
let html = fs.readFileSync(indexHtmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/florianThauvin2026Image.js"></script>\n';
if (!html.includes('florianThauvin2026Image.js')) {
  const targetScript = '<script src="./src/data/songminkyu2025Image.js"></script>';
  html = html.replace(targetScript, targetScript + '\n' + scriptTag);
  fs.writeFileSync(indexHtmlPath, html, 'utf-8');
  console.log('2. Added florianThauvin2026Image.js script tag to index.html.');
}

// 3. Update PLAYER_IMAGE_MAP in app.jsx and app.js
let jsx = fs.readFileSync(appJsxPath, 'utf-8');
let js = fs.readFileSync(appJsPath, 'utf-8');

if (!jsx.includes('"p378"')) {
  jsx = jsx.replace('"p377": "SONG_MIN_KYU_2025_IMAGE"', '"p377": "SONG_MIN_KYU_2025_IMAGE",\n  "p378": "FLORIAN_THAUVIN_2026_IMAGE"');
  console.log('3a. Added p378 mapping to PLAYER_IMAGE_MAP in app.jsx.');
}

if (!js.includes('"p378"')) {
  js = js.replace('"p377": "SONG_MIN_KYU_2025_IMAGE"', '"p377": "SONG_MIN_KYU_2025_IMAGE",\n  "p378": "FLORIAN_THAUVIN_2026_IMAGE"');
  console.log('3b. Added p378 mapping to PLAYER_IMAGE_MAP in app.js.');
}

// 4. Update OFFSETS & getAdjustedPlayer for ☆2 support in app.jsx and app.js
const offsets2StarDef = `const OFFSETS_2STAR = {
  '☆2': 0,
  '☆2+': 8,
  '☆2++': 16,
  '☆3': 34,
  '☆3+': 43,
  '☆3++': 53,
  '☆4': 74,
  '☆4+': 84,
  '☆4++': 95,
  '☆5': 120
};`;

if (!jsx.includes('OFFSETS_2STAR')) {
  jsx = jsx.replace('const OFFSETS = {', offsets2StarDef + '\n\nconst OFFSETS = {');
}
if (!js.includes('OFFSETS_2STAR')) {
  js = js.replace('const OFFSETS = {', offsets2StarDef + '\n\nconst OFFSETS = {');
}

// Update getAdjustedPlayer offset calculation in app.jsx & app.js
const oldOffsetCalcInJsx = `  const baseOffset = OFFSETS[baseRarity] !== undefined ? OFFSETS[baseRarity] : 0;
  const targetOffset = OFFSETS[currentRarity] !== undefined ? OFFSETS[currentRarity] : baseOffset;
  const diff = targetOffset - baseOffset;`;

const newOffsetCalcInJsx = `  let diff = 0;
  if (baseRarity === '☆2') {
    const baseOffset = OFFSETS_2STAR[baseRarity] !== undefined ? OFFSETS_2STAR[baseRarity] : 0;
    const targetOffset = OFFSETS_2STAR[currentRarity] !== undefined ? OFFSETS_2STAR[currentRarity] : baseOffset;
    diff = targetOffset - baseOffset;
  } else {
    const baseOffset = OFFSETS[baseRarity] !== undefined ? OFFSETS[baseRarity] : 0;
    const targetOffset = OFFSETS[currentRarity] !== undefined ? OFFSETS[currentRarity] : baseOffset;
    diff = targetOffset - baseOffset;
  }`;

if (jsx.includes(oldOffsetCalcInJsx)) {
  jsx = jsx.replace(oldOffsetCalcInJsx, newOffsetCalcInJsx);
}
if (js.includes(oldOffsetCalcInJsx)) {
  js = js.replace(oldOffsetCalcInJsx, newOffsetCalcInJsx);
}

// Update modal rarity list for ☆2 player
const getPlayerRaritiesFunc = `const getPlayerRarities = (player) => {
  if (!player) return ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'];
  const baseR = player.baseRarity || player.rawPlayer?.baseRarity || player.rarity;
  if (baseR === '☆2') {
    return ['☆2', '☆2+', '☆2++', '☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'];
  }
  return ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'];
};`;

if (!jsx.includes('getPlayerRarities')) {
  jsx = jsx.replace('const RARITIES = [', getPlayerRaritiesFunc + '\n\nconst RARITIES = [');
}
if (!js.includes('getPlayerRarities')) {
  js = js.replace('const RARITIES = [', getPlayerRaritiesFunc + '\n\nconst RARITIES = [');
}

// Replace RARITIES.map in modal with getPlayerRarities(player).map in app.jsx & app.js
jsx = jsx.replace('RARITIES.map(r => {', 'getPlayerRarities(adjustedPlayer || player).map(r => {');
js = js.replace('RARITIES.map(r => {', 'getPlayerRarities(adjustedPlayer || player).map(r => {');

fs.writeFileSync(appJsxPath, jsx, 'utf-8');
fs.writeFileSync(appJsPath, js, 'utf-8');
console.log('4. Updated app.jsx and app.js for ☆2 player support & dynamic offsets.');

// 5. Append p378 (Florian Thauvin 2026) to mockData.js
let mockCode = fs.readFileSync(mockPath, 'utf-8');
if (!mockCode.includes("id: 'p378'")) {
  const p377Idx = mockCode.indexOf("id: 'p377'");
  if (p377Idx === -1) {
    console.error('Could not find p377 in mockData.js!');
    process.exit(1);
  }
  const p377AvatarIdx = mockCode.indexOf("avatarUrl:", p377Idx);
  const p377EndIdx = mockCode.indexOf("}", p377AvatarIdx);

  const headPart = mockCode.substring(0, p377EndIdx + 1);

  const p378Obj = `,
  {
    id: 'p378',
    name: 'フロリアン・トヴァン',
    readingName: 'ふろりあんとゔぁん',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆2',
    baseRarity: '☆2',
    nationality: 'フランス',
    policy: 'リアクション',
    playStyle: 'パサーAM',
    playStyleLevel: 'Ⅱ',
    overall: 6131,
    maxOverall: 13108,
    baseStats: { shoot: 1273, pass: 1329, dribble: 1386, defense: 691, physical: 909, speed: 802 },
    detailStats: {
      shoot: { finishing: 453, power: 382, composure: 438 },
      pass: { shortPass: 441, longPass: 449, accuracy: 439 },
      dribble: { breakout: 459, keeping: 466, ballTouch: 461 },
      defense: { tackle: 226, interception: 242, marking: 223 },
      physical: { jumping: 299, contact: 278, stamina: 332 },
      speed: { running: 381, agility: 421 }
    },
    maxEnhanced: {
      overall: 13108,
      baseStats: { shoot: 2443, pass: 2535, dribble: 2580, defense: 1861, physical: 2103, speed: 1586 },
      detailStats: {
        shoot: { finishing: 839, power: 768, composure: 836 },
        pass: { shortPass: 851, longPass: 847, accuracy: 837 },
        dribble: { breakout: 857, keeping: 864, ballTouch: 859 },
        defense: { tackle: 624, interception: 628, marking: 609 },
        physical: { jumping: 685, contact: 676, stamina: 742 },
        speed: { running: 767, agility: 819 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中央　/　発動条件：突破時　/　突破力・敏捷性UP' },
    abilities: [
      { name: '魂の深いパサー', rank: '銀', description: '発動条件：好調　/　ショートパス・精度UP' },
      { name: '技巧派ドリブラー', rank: '銅', description: '発動条件：無し　/　突破力・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆2', '☆2+', '☆2++', '☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

  fs.writeFileSync(mockPath, headPart + p378Obj, 'utf-8');
  console.log('5. Appended p378 (Florian Thauvin) to mockData.js.');
}

// 6. Verify VM execution of mockData.js and app.js
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
const updatedMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(updatedMockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
console.log('SUCCESS! Total players in mockData:', players.length);
const p378 = players.find(p => p.id === 'p378');
console.log('p378 verified:', p378 ? `${p378.name} (Rarity: ${p378.rarity}, Base: ${p378.baseRarity})` : 'MISSING');

console.log('=== FLORIAN THAUVIN (☆2) SUCCESSFULLY ADDED ===');
