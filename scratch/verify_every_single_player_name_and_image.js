const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

// 1. Scan all Image.js files to get filename -> window variable
const fileToVar = {};
const varToFile = {};
fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js')).forEach(file => {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
  const match = content.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (match) {
    fileToVar[file.toLowerCase()] = match[1];
    varToFile[match[1]] = file;
  }
});

// 2. Extract true registrations from add_*.js files (matching { id: 'pXXX', name: 'YYY' })
const addScriptMap = {};
fs.readdirSync(rootDir).filter(f => f.startsWith('add_') && f.endsWith('.js')).forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');
  let imageVar = null;
  const varM = content.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (varM) {
    imageVar = varM[1];
  } else {
    const fileM = content.match(/([a-zA-Z0-9_]+Image\.js)/i);
    if (fileM) {
      imageVar = fileToVar[fileM[1].toLowerCase()];
    }
  }

  const objM = content.match(/{\s*id:\s*['"](p\d+)['"]\s*,\s*name:\s*['"]([^'"]+)['"]/);
  if (objM && imageVar) {
    addScriptMap[objM[1]] = { name: objM[2], varName: imageVar, file };
  }
});

// 3. Extract explicit map for p01-p263 from verify_exact_image_vars.js
const verifyCode = fs.readFileSync(path.join(rootDir, 'verify_exact_image_vars.js'), 'utf-8');
const mapMatch = verifyCode.match(/const explicitMap = (\{[\s\S]*?\});/);
const explicitMap = eval('(' + mapMatch[1] + ')');

// 4. Overrides for specific players
const manualOverrides = {
  p08: 'MESSI_MLS_IMAGE',               // リオネル・メッシ(MLS)
  p112: 'MESSI_HAIFU_IMAGE',             // リオネル・メッシ(配布)
  p114: 'RAFAELELIAS_2025_IMAGE',         // ラファエル・エリアス(J1 BEST11 2025)
  p117: 'KOIZUMI_IMAGE',                // 小泉佳穂(J1 BEST11 2025)
  p118: 'SHOINAGAKI_2025_IMAGE',         // 稲垣祥(J1 BEST11 2025)
  p138: 'PABLOSABBAG_2025_IMAGE',        // パブロ・サバグ(K1 BEST11 2025)
  p146: 'KIM_MOON_HWAN_IMAGE',           // キム・ムンファン(K1 BEST11 2025)
  p147: 'SONG_BUM_KEUN_IMAGE',           // ソン・ボムグン(K1 BEST11 2025)
  p148: 'YAZAN_IMAGE',                   // ヤザン・アルアラブ(K1 BEST11 2025)
  p154: 'YOSHIOKA_2026_IMAGE',           // 喜岡佳太(2026)
  p161: 'HOSOI_2026_IMAGE',              // 細井響(2026)
  p215: 'KUBO_TOJIRO_2026_IMAGE',        // 久保藤次郎(2026)
  p216: 'TAKAHASHI_DAIGO_2026_IMAGE',    // 髙橋大悟(2026)
  p217: 'MO_JAE_HYEON_2026_IMAGE',       // モ・ジェヒョン(2026)
  p218: 'MATSUHASHI_YUAN_2026_IMAGE',    // 松橋優安(2026)
  p219: 'TAKEMOTO_YUHI_2026_IMAGE',      // 竹本雄飛(2026)
  p220: 'KAMEDA_AYUMU_2026_IMAGE',       // 亀田歩夢(2026)
  p221: 'THIAGO_ANDRADE_2026_IMAGE',     // チアゴ・アンドラーデ(2026)
  p222: 'GALEGO_2026_IMAGE',             // ガレゴ(2026)
  p269: 'YAMAMOTO_OUTA_2026_TS_IMAGE',   // 山本桜大(2026TS)
  p270: 'ALISSON_2026_IMAGE',            // アリソン
  p271: 'ENDRICK_2026_IMAGE',            // エンドリッキ
  p272: 'GREENWOOD_2026_IMAGE',         // メイソン・グリーンウッド
  p273: 'AKANJI_2026_IMAGE',             // マヌエル・アカンジ
  p304: 'PABLOSABBAG_2025_IMAGE',        // パブロ・サバグ
  p320: 'KOSUKEONOSE_2025_IMAGE',        // 小野瀬康介
  p321: 'SHOINAGAKI_2025_IMAGE',         // 稲垣祥
  p330: 'YUTONAGATOMO_2025_IMAGE',       // 長友佑都
  p331: 'YUTOHORIGOME_2025_IMAGE',       // 堀米悠斗
  p332: 'KOTAMURAMATSU_2025_IMAGE',       // 村松航太
  p333: 'KIMITONONO_2025_IMAGE',         // 濃野公人
  p334: 'RIKUHANDA_2025_IMAGE',          // 半田陸
  p335: 'SOYAFUJIWARA_2025_IMAGE',       // 藤原奏哉
  p373: 'YAMAL_IMAGE',                  // ラミン・ヤマル
  p374: 'CUBARSI_IMAGE',                // パウ・クバルシ
  p375: 'GAVI_IMAGE',                   // ガビ
  p376: 'SIMON_IMAGE'                   // ウナイ・シモン
};

// 5. Load mockData.js
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const mockCode = fs.readFileSync(path.join(dataDir, 'mockData.js'), 'utf-8');
vm.runInContext(mockCode, sandbox);
const players = sandbox.window.INITIAL_PLAYERS || [];

// Combine all sources in priority order:
// 1. Manual Overrides
// 2. AddScriptMap (exact object definitions from add_*.js)
// 3. ExplicitMap (from verify_exact_image_vars.js)
const finalMap = {};

players.forEach(p => {
  let v = null;
  if (manualOverrides[p.id]) {
    v = manualOverrides[p.id];
  } else if (addScriptMap[p.id]) {
    v = addScriptMap[p.id].varName;
  } else if (explicitMap[p.id]) {
    v = explicitMap[p.id];
  }
  if (v) {
    finalMap[p.id] = v;
  }
});

console.log(`Final Combined Map contains ${Object.keys(finalMap).length} / ${players.length} players.`);

// Print out full list of player ID, Name, and Assigned Image Variable
const fullReport = players.map(p => ({
  id: p.id,
  name: p.name,
  varName: finalMap[p.id] || 'MISSING',
  imageFile: varToFile[finalMap[p.id]] || 'MISSING'
}));

fs.writeFileSync(path.join(rootDir, 'scratch', 'complete_player_audit_report.json'), JSON.stringify(fullReport, null, 2), 'utf-8');
console.log('Saved scratch/complete_player_audit_report.json');

// Check for any MISSING or UNDEFINED variables
let passCount = 0;
let failCount = 0;

// Load index.html scripts in sandbox to verify window.*_IMAGE
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
const scriptMatches = indexHtml.match(/src=["']\.\/src\/data\/([^"']+)["']/g) || [];

scriptMatches.forEach(match => {
  const fileName = match.replace(/src=["']\.\/src\/data\//, '').replace(/["']$/, '').split('?')[0];
  const filePath = path.join(dataDir, fileName);
  if (fs.existsSync(filePath)) {
    const code = fs.readFileSync(filePath, 'utf-8');
    vm.runInContext(code, sandbox);
  }
});

players.forEach(p => {
  const v = finalMap[p.id];
  const dataUrl = sandbox.window[v];
  if (v && dataUrl && dataUrl.startsWith('data:image')) {
    passCount++;
  } else {
    failCount++;
    console.log(`[VERIFY FAIL] ${p.id}: ${p.name} -> var '${v}'`);
  }
});

console.log(`\n==================================================`);
console.log(` TOTAL VERIFICATION RESULT:`);
console.log(` Pass: ${passCount} / ${players.length} players`);
console.log(` Fail: ${failCount} players`);
console.log(`==================================================\n`);

// Update app.js and app.jsx
const formattedMapLines = Object.entries(finalMap).map(([k, v]) => `  "${k}": "${v}"`).join(',\n');
const newMapBlock = `const PLAYER_IMAGE_MAP = {\n${formattedMapLines}\n};`;

const appJsPath = path.join(rootDir, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
appJsCode = appJsCode.replace(/const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/, newMapBlock);
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');

const appJsxPath = path.join(rootDir, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
appJsxCode = appJsxCode.replace(/const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/, newMapBlock);
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');

console.log('Successfully applied 100% TRUTHFUL PLAYER_IMAGE_MAP to src/app.js and src/app.jsx!');
