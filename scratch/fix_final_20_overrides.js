const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const overrides = {
  p82: 'SPINAZZOLA_IMAGE',
  p94: 'CUADRADO_IMAGE',
  p97: 'NICOWILLIAMS_IMAGE',
  p99: 'HWANG_IMAGE',
  p100: 'COURTOIS_IMAGE',
  p114: 'RAFAELELIAS_2025_IMAGE',
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
  p321: 'SHINAGAKI_2025_IMAGE'
};

const appJsPath = path.join(rootDir, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
const mapMatch = appJsCode.match(/const PLAYER_IMAGE_MAP = (\{[\s\S]*?\});/);
const currentMap = eval('(' + mapMatch[1] + ')');

Object.entries(overrides).forEach(([id, varName]) => {
  currentMap[id] = varName;
});

const formattedMapLines = Object.entries(currentMap).map(([k, v]) => `  "${k}": "${v}"`).join(',\n');
const newMapBlock = `const PLAYER_IMAGE_MAP = {\n${formattedMapLines}\n};`;

appJsCode = appJsCode.replace(/const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/, newMapBlock);
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');

const appJsxPath = path.join(rootDir, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
appJsxCode = appJsxCode.replace(/const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/, newMapBlock);
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');

console.log('Applied final 20 player image overrides successfully!');
