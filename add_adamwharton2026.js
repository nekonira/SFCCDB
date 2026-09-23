const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = __dirname;
const imgSourcePath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3b557aab-3ed9-41d7-bec3-1885de4003d1\\.user_uploaded\\media_1790138881497.png';
const imageJsPath = path.join(rootDir, 'src', 'data', 'adamWharton2026Image.js');
const mockPath = path.join(rootDir, 'src', 'data', 'mockData.js');
const indexPath = path.join(rootDir, 'index.html');
const appJsPath = path.join(rootDir, 'src', 'app.js');
const appJsxPath = path.join(rootDir, 'src', 'app.jsx');

console.log('--- Registering Adam Wharton (p394) ---');

// 1. Create Image JS file
if (fs.existsSync(imgSourcePath)) {
  const imgBuffer = fs.readFileSync(imgSourcePath);
  const base64Str = imgBuffer.toString('base64');
  const imageJsContent = `window.ADAM_WHARTON_2026_IMAGE = "data:image/png;base64,${base64Str}";\n`;
  fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
  console.log(`[1/5] Created ${imageJsPath} (${base64Str.length} base64 chars)`);
} else {
  console.error(`ERROR: Uploaded image file not found at ${imgSourcePath}`);
  process.exit(1);
}

// 2. Add player object to mockData.js
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p394Obj = `  {
    id: 'p394',
    name: 'アダム・ウォートン',
    readingName: 'あだむうぉーとん',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イングランド',
    policy: 'カウンター',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 7166,
    maxOverall: 15343,
    baseStats: {
      shoot: 1003,
      pass: 1432,
      dribble: 1430,
      defense: 1298,
      physical: 1215,
      speed: 872
    },
    detailStats: {
      shoot: { finishing: 327, power: 330, composure: 346 },
      pass: { shortPass: 482, longPass: 482, accuracy: 468 },
      dribble: { breakout: 466, keeping: 467, ballTouch: 497 },
      defense: { tackle: 415, interception: 445, marking: 438 },
      physical: { jumping: 376, contact: 410, stamina: 429 },
      speed: { running: 418, agility: 454 }
    },
    maxEnhanced: {
      overall: 15343,
      baseStats: {
        shoot: 2548,
        pass: 3037,
        dribble: 2963,
        defense: 2879,
        physical: 2784,
        speed: 1894
      },
      detailStats: {
        shoot: { finishing: 838, power: 841, composure: 869 },
        pass: { shortPass: 1017, longPass: 1017, accuracy: 1003 },
        dribble: { breakout: 977, keeping: 978, ballTouch: 1008 },
        defense: { tackle: 950, interception: 968, marking: 961 },
        physical: { jumping: 887, contact: 933, stamina: 964 },
        speed: { running: 929, agility: 965 }
      }
    },
    playTendencies: {
      attack: 1,
      defense: 0,
      dribble: 0,
      shoot: 0,
      longShoot: 0,
      shortPass: 2,
      longPass: -1,
      throughPass: 0,
      cutIn: 0,
      keep: 0,
      delay: 0,
      rushOut: -1,
      feint: 0,
      press: 0
    },
    skill: {
      name: 'ドリブンパス',
      rank: '銀',
      description: '発動エリア：後左中右　/　発動条件：LFB・RFB・LM・RMへのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のドリブル発生確率UP'
    },
    abilities: [
      {
        name: '懐の深いロングパサー',
        rank: '銀',
        description: '発動条件：好調　/　ロングパス・キープ力UP'
      },
      {
        name: 'シルクタッチ',
        rank: '銀',
        description: '発動条件：好調　/　ショートパス・ボールタッチUP'
      },
      {
        name: 'ワイドカッター',
        rank: '銅',
        description: '発動条件：好調　/　突破力・パスカットUP'
      }
    ],
    avatarUrl: ''
  }`;

// Slice before closing bracket of INITIAL_PLAYERS
const lastPlayerIdx = mockCode.indexOf("id: 'p393'");
if (lastPlayerIdx === -1) {
  console.error("ERROR: Could not find p393 in mockData.js");
  process.exit(1);
}

const lastAvatarIdx = mockCode.indexOf("avatarUrl:", lastPlayerIdx);
const lastEndIdx = mockCode.indexOf("}", lastAvatarIdx);

const newMockCode = mockCode.substring(0, lastEndIdx + 1) + ",\n" + p394Obj + mockCode.substring(lastEndIdx + 1);
fs.writeFileSync(mockPath, newMockCode, 'utf-8');
console.log(`[2/5] Updated ${mockPath} with player p394 (アダム・ウォートン)`);

// 3. Update index.html to include script link
let htmlCode = fs.readFileSync(indexPath, 'utf-8');
const scriptTag = '  <script src="./src/data/adamWharton2026Image.js"></script>\n';
if (!htmlCode.includes('adamWharton2026Image.js')) {
  const insertPos = htmlCode.indexOf('  <!-- 2. Official Special Training Cards');
  if (insertPos !== -1) {
    htmlCode = htmlCode.substring(0, insertPos) + scriptTag + htmlCode.substring(insertPos);
    fs.writeFileSync(indexPath, htmlCode, 'utf-8');
    console.log(`[3/5] Updated ${indexPath} with script link`);
  } else {
    console.warn("Could not find insertion marker in index.html");
  }
} else {
  console.log(`[3/5] index.html already contains adamWharton2026Image.js`);
}

// 4. Update PLAYER_IMAGE_MAP in src/app.js
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p394"')) {
  appJsCode = appJsCode.replace(
    '"p393":"KOBBIE_MAINOO_2026_IMAGE"',
    '"p393":"KOBBIE_MAINOO_2026_IMAGE","p394":"ADAM_WHARTON_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log(`[4/5] Updated PLAYER_IMAGE_MAP in ${appJsPath}`);
} else {
  console.log(`[4/5] src/app.js already maps p394`);
}

// Update PLAYER_IMAGE_MAP in src/app.jsx if present
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes('"p394"')) {
    appJsxCode = appJsxCode.replace(
      '"p393":"KOBBIE_MAINOO_2026_IMAGE"',
      '"p393":"KOBBIE_MAINOO_2026_IMAGE","p394":"ADAM_WHARTON_2026_IMAGE"'
    );
    fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
    console.log(`[4.5/5] Updated PLAYER_IMAGE_MAP in ${appJsxPath}`);
  }
}

// 5. Verify mockData.js with Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(newMockCode, sandbox);

const addedPlayer = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p394');
if (addedPlayer) {
  console.log(`[5/5] SUCCESS! Registered player ${addedPlayer.id}: ${addedPlayer.name} (${addedPlayer.nationality})`);
  console.log(`      Main Pos: ${addedPlayer.mainPosition}, Overall: ${addedPlayer.overall}, MaxOverall: ${addedPlayer.maxOverall}`);
} else {
  console.error("ERROR: Failed to find p394 after VM execution!");
  process.exit(1);
}
