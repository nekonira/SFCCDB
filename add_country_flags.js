const fs = require('fs');
const path = require('path');

console.log('=== ADDING COUNTRY FLAGS TO PLAYER DATABASE ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');

let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');
let jsCode = fs.readFileSync(appJsPath, 'utf-8');

const countryFlagHelper = `
const COUNTRY_FLAG_MAP = {
  '日本': '🇯🇵',
  'ブラジル': '🇧🇷',
  'スペイン': '🇪🇸',
  'アルゼンチン': '🇦🇷',
  'フランス': '🇫🇷',
  'ドイツ': '🇩🇪',
  'イングランド': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'イタリア': '🇮🇹',
  'オランダ': '🇳🇱',
  'ポルトガル': '🇵🇹',
  'ウルグアイ': '🇺🇾',
  'クロアチア': '🇭🇷',
  'コロンビア': '🇨🇴',
  'ベルギー': '🇧🇪',
  'ノルウェー': '🇳🇴',
  '韓国': '🇰🇷',
  'アメリカ合衆国': '🇺🇸',
  'モロッコ': '🇲🇦',
  'エジプト': '🇪🇬',
  'タイ': '🇹🇭',
  'インドネシア': '🇮🇩',
  'トルコ': '🇹🇷',
  'スイス': '🇨🇭',
  'スウェーデン': '🇸🇪',
  'ポーランド': '🇵🇱',
  'ジョージア': '🇬🇪',
  'スコットランド': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'コートジボワール': '🇨🇮',
  'パラグアイ': '🇵🇾',
  'スロベニア': '🇸🇮',
  'アイスランド': '🇮🇸',
  'ウズベキスタン': '🇺🇿',
  'ジャマイカ': '🇯🇲',
  'シエラレオーネ': '🇸🇱',
  'シリア': '🇸🇾',
  'モンテネグロ': '🇲🇪',
  'ヨルダン': '🇯🇴',
  'UAE': '🇦🇪',
  '中国': '🇨🇳',
  '南アフリカ': '🇿🇦',
  '香港': '🇭🇰'
};

const getCountryFlag = (nationality) => {
  if (!nationality) return '🌐';
  const trimmed = String(nationality).trim();
  return COUNTRY_FLAG_MAP[trimmed] || '🌐';
};

const formatNationalityWithFlag = (nationality) => {
  if (!nationality) return '-';
  return \`\${getCountryFlag(nationality)} \${nationality}\`;
};
`;

// 1. Add Helper to app.jsx
if (!jsxCode.includes('COUNTRY_FLAG_MAP')) {
  jsxCode = jsxCode.replace('const STAT_NAME_MAP = {', countryFlagHelper + '\nconst STAT_NAME_MAP = {');
  console.log('1. Added COUNTRY_FLAG_MAP helper to app.jsx');
}

// 2. Add Helper to app.js
if (!jsCode.includes('COUNTRY_FLAG_MAP')) {
  jsCode = jsCode.replace('const STAT_NAME_MAP = {', countryFlagHelper + '\nconst STAT_NAME_MAP = {');
  console.log('2. Added COUNTRY_FLAG_MAP helper to app.js');
}

// 3. Update Quick Filter Buttons in app.jsx
if (jsxCode.includes('{quickNat}')) {
  jsxCode = jsxCode.replace('{quickNat}', '{getCountryFlag(quickNat)} {quickNat}');
  console.log('3. Updated Quick Filter buttons in app.jsx');
}

// Update Quick Filter Buttons in app.js
if (jsCode.includes('}, quickNat)')) {
  jsCode = jsCode.replace('}, quickNat)', '}, `${getCountryFlag(quickNat)} ${quickNat}`)');
  console.log('4. Updated Quick Filter buttons in app.js');
}

// 4. Update Dropdown Items in app.jsx
if (jsxCode.includes('<span className="font-semibold text-slate-200">{nat}</span>')) {
  jsxCode = jsxCode.replace(
    '<span className="font-semibold text-slate-200">{nat}</span>',
    '<span className="font-semibold text-slate-200 flex items-center gap-1.5"><span>{getCountryFlag(nat)}</span><span>{nat}</span></span>'
  );
  console.log('5. Updated Dropdown items in app.jsx');
}

// Update Dropdown Items in app.js
if (jsCode.includes('}, nat),')) {
  jsCode = jsCode.replace(
    '}, nat),',
    '}, `${getCountryFlag(nat)} ${nat}`),'
  );
  console.log('6. Updated Dropdown items in app.js');
}

// 5. Update Mobile Compact List in app.jsx and app.js
if (jsxCode.includes('🌐 {p.nationality}')) {
  jsxCode = jsxCode.replace('🌐 {p.nationality}', '{getCountryFlag(p.nationality)} {p.nationality}');
}
if (jsCode.includes('"🌐 ", p.nationality')) {
  jsCode = jsCode.replace('"🌐 ", p.nationality', 'getCountryFlag(p.nationality) + " ", p.nationality');
}

// 6. Update Table View Cell in app.jsx and app.js
if (jsxCode.includes('{p.nationality || \'\-\'}')) {
  jsxCode = jsxCode.replace('{p.nationality || \'-\'}', '{p.nationality ? `${getCountryFlag(p.nationality)} ${p.nationality}` : \'-\'}');
}
if (jsCode.includes('p.nationality || \'-\'')) {
  jsCode = jsCode.replace('p.nationality || \'-\'', 'p.nationality ? `${getCountryFlag(p.nationality)} ${p.nationality}` : \'-\'');
}

// 7. Update Detail Modal Header in app.jsx and app.js
if (jsxCode.includes('{adjustedPlayer.nationality}')) {
  jsxCode = jsxCode.replace(
    '<div className="text-xs text-slate-400 font-medium">{adjustedPlayer.nationality}</div>',
    '<div className="text-xs text-slate-300 font-bold flex items-center justify-center gap-1"><span>{getCountryFlag(adjustedPlayer.nationality)}</span><span>{adjustedPlayer.nationality}</span></div>'
  );
}
if (jsCode.includes('adjustedPlayer.nationality)')) {
  jsCode = jsCode.replace(
    'adjustedPlayer.nationality)',
    'getCountryFlag(adjustedPlayer.nationality) + " " + adjustedPlayer.nationality)'
  );
}

// 8. Update Team Builder candidate item in app.jsx and app.js
if (jsxCode.includes('| 🌐 ${p.nationality}')) {
  jsxCode = jsxCode.replace('| 🌐 ${p.nationality}', '| ${getCountryFlag(p.nationality)} ${p.nationality}');
}
if (jsCode.includes('| 🌐 ${p.nationality}')) {
  jsCode = jsCode.replace('| 🌐 ${p.nationality}', '| ${getCountryFlag(p.nationality)} ${p.nationality}');
}

fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');
fs.writeFileSync(appJsPath, jsCode, 'utf-8');

console.log('=== COUNTRY FLAGS IMPLEMENTED SUCCESSFULLY IN APP.JSX AND APP.JS! ===');
