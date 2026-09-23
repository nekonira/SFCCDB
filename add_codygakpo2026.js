const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = __dirname;
const imgSourcePath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3b557aab-3ed9-41d7-bec3-1885de4003d1\\.user_uploaded\\media_1790137443304.png';
const imageJsPath = path.join(rootDir, 'src', 'data', 'codyGakpo2026Image.js');
const mockPath = path.join(rootDir, 'src', 'data', 'mockData.js');
const indexPath = path.join(rootDir, 'index.html');
const appJsPath = path.join(rootDir, 'src', 'app.js');
const appJsxPath = path.join(rootDir, 'src', 'app.jsx');

console.log('--- Registering Cody Gakpo (p391) ---');

// 1. Create Image JS file
if (fs.existsSync(imgSourcePath)) {
  const imgBuffer = fs.readFileSync(imgSourcePath);
  const base64Str = imgBuffer.toString('base64');
  const imageJsContent = `window.CODY_GAKPO_2026_IMAGE = "data:image/png;base64,${base64Str}";\n`;
  fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
  console.log(`[1/5] Created ${imageJsPath} (${base64Str.length} base64 chars)`);
} else {
  console.error(`ERROR: Uploaded image file not found at ${imgSourcePath}`);
  process.exit(1);
}

// 2. Add player object to mockData.js
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p391Obj = `  {
    id: 'p391',
    name: 'コーディ・ガクポ',
    readingName: 'こーでぃがくぽ',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'オランダ',
    policy: 'ムービング',
    playStyle: 'サイドアタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 7187,
    maxOverall: 15348,
    baseStats: {
      shoot: 1312,
      pass: 1251,
      dribble: 1410,
      defense: 866,
      physical: 1218,
      speed: 919
    },
    detailStats: {
      shoot: { finishing: 450, power: 428, composure: 434 },
      pass: { shortPass: 422, longPass: 414, accuracy: 415 },
      dribble: { breakout: 467, keeping: 467, ballTouch: 476 },
      defense: { tackle: 266, interception: 307, marking: 293 },
      physical: { jumping: 402, contact: 411, stamina: 405 },
      speed: { running: 446, agility: 473 }
    },
    maxEnhanced: {
      overall: 15348,
      baseStats: {
        shoot: 3007,
        pass: 2709,
        dribble: 2847,
        defense: 2402,
        physical: 2846,
        speed: 1817
      },
      detailStats: {
        shoot: { finishing: 997, power: 993, composure: 1017 },
        pass: { shortPass: 915, longPass: 903, accuracy: 891 },
        dribble: { breakout: 933, keeping: 957, ballTouch: 957 },
        defense: { tackle: 814, interception: 802, marking: 786 },
        physical: { jumping: 988, contact: 959, stamina: 899 },
        speed: { running: 918, agility: 899 }
      }
    },
    playTendencies: {
      attack: 1,
      defense: -1,
      dribble: 1,
      shoot: 0,
      longShoot: 0,
      shortPass: 0,
      longPass: 0,
      throughPass: 0,
      cutIn: -1,
      keep: 0,
      delay: -1,
      rushOut: 2,
      feint: 1,
      press: 0
    },
    skill: {
      name: 'スリップビート',
      rank: '銅',
      description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP'
    },
    abilities: [
      {
        name: '俊敏なドリブラー',
        rank: '銀',
        description: '発動条件：好調　/　突破力・敏捷性UP'
      },
      {
        name: '懐の深いボールタッチ',
        rank: '銀',
        description: '発動条件：絶好調　/　キープ力・ボールタッチUP'
      },
      {
        name: 'ランニングキッカー',
        rank: '銅',
        description: '発動条件：絶好調　/　キック力・走力UP'
      }
    ],
    avatarUrl: ''
  }`;

// Slice before closing bracket of INITIAL_PLAYERS
const lastPlayerIdx = mockCode.indexOf("id: 'p390'");
if (lastPlayerIdx === -1) {
  console.error("ERROR: Could not find p390 in mockData.js");
  process.exit(1);
}

const lastAvatarIdx = mockCode.indexOf("avatarUrl:", lastPlayerIdx);
const lastEndIdx = mockCode.indexOf("}", lastAvatarIdx);

const newMockCode = mockCode.substring(0, lastEndIdx + 1) + ",\n" + p391Obj + mockCode.substring(lastEndIdx + 1);
fs.writeFileSync(mockPath, newMockCode, 'utf-8');
console.log(`[2/5] Updated ${mockPath} with player p391 (コーディ・ガクポ)`);

// 3. Update index.html to include script link
let htmlCode = fs.readFileSync(indexPath, 'utf-8');
const scriptTag = '  <script src="./src/data/codyGakpo2026Image.js"></script>\n';
if (!htmlCode.includes('codyGakpo2026Image.js')) {
  const insertPos = htmlCode.indexOf('  <!-- 2. Official Special Training Cards');
  if (insertPos !== -1) {
    htmlCode = htmlCode.substring(0, insertPos) + scriptTag + htmlCode.substring(insertPos);
    fs.writeFileSync(indexPath, htmlCode, 'utf-8');
    console.log(`[3/5] Updated ${indexPath} with script link`);
  } else {
    console.warn("Could not find insertion marker in index.html");
  }
} else {
  console.log(`[3/5] index.html already contains codyGakpo2026Image.js`);
}

// 4. Update PLAYER_IMAGE_MAP in src/app.js
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p391"')) {
  appJsCode = appJsCode.replace(
    '"p390":"RAUL_JIMENEZ_2026_IMAGE"',
    '"p390":"RAUL_JIMENEZ_2026_IMAGE","p391":"CODY_GAKPO_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log(`[4/5] Updated PLAYER_IMAGE_MAP in ${appJsPath}`);
} else {
  console.log(`[4/5] src/app.js already maps p391`);
}

// Update PLAYER_IMAGE_MAP in src/app.jsx if present
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes('"p391"')) {
    appJsxCode = appJsxCode.replace(
      '"p390":"RAUL_JIMENEZ_2026_IMAGE"',
      '"p390":"RAUL_JIMENEZ_2026_IMAGE","p391":"CODY_GAKPO_2026_IMAGE"'
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

const addedPlayer = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p391');
if (addedPlayer) {
  console.log(`[5/5] SUCCESS! Registered player ${addedPlayer.id}: ${addedPlayer.name} (${addedPlayer.nationality})`);
  console.log(`      Main Pos: ${addedPlayer.mainPosition}, Overall: ${addedPlayer.overall}, MaxOverall: ${addedPlayer.maxOverall}`);
} else {
  console.error("ERROR: Failed to find p391 after VM execution!");
  process.exit(1);
}
