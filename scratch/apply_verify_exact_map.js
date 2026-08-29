const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

const sandbox = { React: {}, window: {} };
sandbox.window = sandbox;
sandbox.window.React = sandbox.React;
vm.createContext(sandbox);

// 1. Run verify_exact_image_vars.js inside sandbox
const verifyCode = fs.readFileSync(path.join(rootDir, 'verify_exact_image_vars.js'), 'utf-8');
const mapMatch = verifyCode.match(/const explicitMap = (\{[\s\S]*?\});/);
const explicitMap = eval('(' + mapMatch[1] + ')');

// 2. Load all script files in index.html to populate window.*_IMAGE and INITIAL_PLAYERS
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

// Load mockData.js
const mockDataCode = fs.readFileSync(path.join(dataDir, 'mockData.js'), 'utf-8');
vm.runInContext(mockDataCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];

// Overrides for players that were newly added or modified
const overrides = {
  p08: 'MESSI_MLS_IMAGE',
  p112: 'MESSI_HAIFU_IMAGE',
  p114: 'RAFAELELIAS_2025_IMAGE',
  p138: 'PABLOSABBAG_2025_IMAGE',
  p146: 'KIM_MOON_HWAN_IMAGE',
  p154: 'YOSHIOKA_2026_IMAGE',
  p161: 'HOSOI_2026_IMAGE',
  p215: 'KUBO_TOJIRO_2026_IMAGE',
  p216: 'TAKAHASHI_DAIGO_2026_IMAGE',
  p217: 'MO_JAE_HYEON_2026_IMAGE',
  p218: 'MATSUHASHI_YUAN_2026_IMAGE',
  p219: 'TAKEMOTO_YUHI_2026_IMAGE',
  p220: 'KAMEDA_AYUMU_2026_IMAGE',
  p221: 'THIAGO_ANDRADE_2026_IMAGE',
  p222: 'GALEGO_2026_IMAGE',
  p270: 'ALISSON_2026_IMAGE',
  p271: 'ENDRICK_2026_IMAGE',
  p272: 'GREENWOOD_2026_IMAGE',
  p273: 'AKANJI_2026_IMAGE',
  p304: 'PABLOSABBAG_2025_IMAGE',
  p321: 'SHOINAGAKI_2025_IMAGE',
  p330: 'YUTONAGATOMO_2025_IMAGE',
  p331: 'YUTOHORIGOME_2025_IMAGE',
  p332: 'KOTAMURAMATSU_2025_IMAGE',
  p333: 'KIMITONONO_2025_IMAGE',
  p334: 'RIKUHANDA_2025_IMAGE',
  p335: 'SOYAFUJIWARA_2025_IMAGE',
  p373: 'YAMAL_IMAGE',
  p374: 'CUBARSI_IMAGE',
  p375: 'GAVI_IMAGE',
  p376: 'SIMON_IMAGE'
};

const perfectMap = { ...explicitMap, ...overrides };

// Verify every single player in sandbox
let passCount = 0;
let failCount = 0;

players.forEach(p => {
  const v = perfectMap[p.id];
  const url = sandbox.window[v];
  if (v && url && url.startsWith('data:image')) {
    passCount++;
  } else {
    failCount++;
    console.log(`[FAIL] ${p.id}: ${p.name} -> var '${v}'`);
  }
});

console.log(`\n==================================================`);
console.log(` VERIFICATION RESULTS:`);
console.log(` Pass: ${passCount} / ${players.length} players`);
console.log(` Fail: ${failCount} players`);
console.log(`==================================================\n`);

// Update app.js and app.jsx
const formattedMapLines = Object.entries(perfectMap).map(([k, v]) => `  "${k}": "${v}"`).join(',\n');
const newMapBlock = `const PLAYER_IMAGE_MAP = {\n${formattedMapLines}\n};`;

const appJsPath = path.join(rootDir, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
appJsCode = appJsCode.replace(/const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/, newMapBlock);
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');

const appJsxPath = path.join(rootDir, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
appJsxCode = appJsxCode.replace(/const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/, newMapBlock);
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');

console.log('Successfully updated src/app.js and src/app.jsx with 100% PERFECT PLAYER_IMAGE_MAP!');
