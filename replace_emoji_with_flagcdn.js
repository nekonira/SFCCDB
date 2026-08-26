const fs = require('fs');
const path = require('path');

console.log('=== REPLACING EMOJI FLAGS WITH REAL FLAGCDN IMAGE ICONS ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');

let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');
let jsCode = fs.readFileSync(appJsPath, 'utf-8');

const flagCdnHelperJsx = `
const COUNTRY_CODE_MAP = {
  '日本': 'jp',
  'ブラジル': 'br',
  'スペイン': 'es',
  'アルゼンチン': 'ar',
  'フランス': 'fr',
  'ドイツ': 'de',
  'イングランド': 'gb-eng',
  'イタリア': 'it',
  'オランダ': 'nl',
  'ポルトガル': 'pt',
  'ウルグアイ': 'uy',
  'クロアチア': 'hr',
  'コロンビア': 'co',
  'ベルギー': 'be',
  'ノルウェー': 'no',
  '韓国': 'kr',
  'アメリカ合衆国': 'us',
  'モロッコ': 'ma',
  'エジプト': 'eg',
  'タイ': 'th',
  'インドネシア': 'id',
  'トルコ': 'tr',
  'スイス': 'ch',
  'スウェーデン': 'se',
  'ポーランド': 'pl',
  'ジョージア': 'ge',
  'スコットランド': 'gb-sct',
  'コートジボワール': 'ci',
  'パラグアイ': 'py',
  'スロベニア': 'si',
  'アイスランド': 'is',
  'ウズベキスタン': 'uz',
  'ジャマイカ': 'jm',
  'シエラレオーネ': 'sl',
  'シリア': 'sy',
  'モンテネグロ': 'me',
  'ヨルダン': 'jo',
  'UAE': 'ae',
  '中国': 'cn',
  '南アフリカ': 'za',
  '香港': 'hk'
};

const FlagIcon = ({ nationality, className = "w-4 h-3 inline-block object-cover rounded-xs border border-slate-700/60 shadow-xs" }) => {
  if (!nationality) return null;
  const code = COUNTRY_CODE_MAP[String(nationality).trim()];
  if (!code) return <span className="text-xs">🌐</span>;
  return (
    <img
      src={\`https://flagcdn.com/20x15/\${code}.png\`}
      srcSet={\`https://flagcdn.com/40x30/\${code}.png 2x\`}
      alt={nationality}
      title={nationality}
      className={className}
      loading="lazy"
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  );
};
`;

const flagCdnHelperJs = `
const COUNTRY_CODE_MAP = {
  '日本': 'jp',
  'ブラジル': 'br',
  'スペイン': 'es',
  'アルゼンチン': 'ar',
  'フランス': 'fr',
  'ドイツ': 'de',
  'イングランド': 'gb-eng',
  'イタリア': 'it',
  'オランダ': 'nl',
  'ポルトガル': 'pt',
  'ウルグアイ': 'uy',
  'クロアチア': 'hr',
  'コロンビア': 'co',
  'ベルギー': 'be',
  'ノルウェー': 'no',
  '韓国': 'kr',
  'アメリカ合衆国': 'us',
  'モロッコ': 'ma',
  'エジプト': 'eg',
  'タイ': 'th',
  'インドネシア': 'id',
  'トルコ': 'tr',
  'スイス': 'ch',
  'スウェーデン': 'se',
  'ポーランド': 'pl',
  'ジョージア': 'ge',
  'スコットランド': 'gb-sct',
  'コートジボワール': 'ci',
  'パラグアイ': 'py',
  'スロベニア': 'si',
  'アイスランド': 'is',
  'ウズベキスタン': 'uz',
  'ジャマイカ': 'jm',
  'シエラレオーネ': 'sl',
  'シリア': 'sy',
  'モンテネグロ': 'me',
  'ヨルダン': 'jo',
  'UAE': 'ae',
  '中国': 'cn',
  '南アフリカ': 'za',
  '香港': 'hk'
};

const FlagIcon = ({ nationality, className = "w-4 h-3 inline-block object-cover rounded-xs border border-slate-700/60 shadow-xs" }) => {
  if (!nationality) return null;
  const code = COUNTRY_CODE_MAP[String(nationality).trim()];
  if (!code) return /*#__PURE__*/React.createElement("span", { className: "text-xs" }, "🌐");
  return /*#__PURE__*/React.createElement("img", {
    src: \`https://flagcdn.com/20x15/\${code}.png\`,
    srcSet: \`https://flagcdn.com/40x30/\${code}.png 2x\`,
    alt: nationality,
    title: nationality,
    className: className,
    loading: "lazy",
    onError: (e) => { e.target.style.display = 'none'; }
  });
};
`;

// Replace COUNTRY_FLAG_MAP helper in app.jsx
if (jsxCode.includes('const COUNTRY_FLAG_MAP = {')) {
  const startIdx = jsxCode.indexOf('const COUNTRY_FLAG_MAP = {');
  const endIdx = jsxCode.indexOf('const STAT_NAME_MAP = {', startIdx);
  jsxCode = jsxCode.substring(0, startIdx) + flagCdnHelperJsx.trim() + '\n\n' + jsxCode.substring(endIdx);
  console.log('1. Updated FlagIcon helper in app.jsx');
}

// Replace COUNTRY_FLAG_MAP helper in app.js
if (jsCode.includes('const COUNTRY_FLAG_MAP = {')) {
  const startIdx = jsCode.indexOf('const COUNTRY_FLAG_MAP = {');
  const endIdx = jsCode.indexOf('const STAT_NAME_MAP = {', startIdx);
  jsCode = jsCode.substring(0, startIdx) + flagCdnHelperJs.trim() + '\n\n' + jsCode.substring(endIdx);
  console.log('2. Updated FlagIcon helper in app.js');
}

// 3. Update Table Cell in app.jsx
if (jsxCode.includes('{p.nationality ? `${getCountryFlag(p.nationality)} ${p.nationality}` : \'-\'}')) {
  jsxCode = jsxCode.replace(
    '{p.nationality ? `${getCountryFlag(p.nationality)} ${p.nationality}` : \'-\'}',
    '{p.nationality ? <div className="flex items-center justify-center gap-1.5"><FlagIcon nationality={p.nationality} /><span className="font-bold">{p.nationality}</span></div> : \'-\'}'
  );
  console.log('3. Updated Table cell in app.jsx');
}

// Update Table Cell in app.js
if (jsCode.includes('p.nationality ? `${getCountryFlag(p.nationality)} ${p.nationality}` : \'-\'')) {
  jsCode = jsCode.replace(
    'p.nationality ? `${getCountryFlag(p.nationality)} ${p.nationality}` : \'-\'',
    'p.nationality ? /*#__PURE__*/React.createElement("div", { className: "flex items-center justify-center gap-1.5" }, /*#__PURE__*/React.createElement(FlagIcon, { nationality: p.nationality }), /*#__PURE__*/React.createElement("span", { className: "font-bold" }, p.nationality)) : \'-\''
  );
  console.log('4. Updated Table cell in app.js');
}

// 4. Update Mobile Compact List in app.jsx
if (jsxCode.includes('{getCountryFlag(p.nationality)} {p.nationality}')) {
  jsxCode = jsxCode.replace(
    '{getCountryFlag(p.nationality)} {p.nationality}',
    '<span className="flex items-center gap-1"><FlagIcon nationality={p.nationality} className="w-3.5 h-2.5 object-cover rounded-xs border border-slate-700/60" /><span>{p.nationality}</span></span>'
  );
  console.log('5. Updated Mobile compact list in app.jsx');
}

// Update Mobile Compact List in app.js
if (jsCode.includes('getCountryFlag(p.nationality) + " ", p.nationality')) {
  jsCode = jsCode.replace(
    'getCountryFlag(p.nationality) + " ", p.nationality',
    '/*#__PURE__*/React.createElement("span", { className: "flex items-center gap-1" }, /*#__PURE__*/React.createElement(FlagIcon, { nationality: p.nationality, className: "w-3.5 h-2.5 object-cover rounded-xs border border-slate-700/60" }), /*#__PURE__*/React.createElement("span", null, p.nationality))'
  );
  console.log('6. Updated Mobile compact list in app.js');
}

// 5. Update Quick Filter Buttons in app.jsx
if (jsxCode.includes('{getCountryFlag(quickNat)} {quickNat}')) {
  jsxCode = jsxCode.replace(
    '{getCountryFlag(quickNat)} {quickNat}',
    '<span className="flex items-center gap-1"><FlagIcon nationality={quickNat} className="w-3.5 h-2.5 object-cover rounded-xs" /><span>{quickNat}</span></span>'
  );
  console.log('7. Updated Quick Filter buttons in app.jsx');
}

// Update Quick Filter Buttons in app.js
if (jsCode.includes('}, `${getCountryFlag(quickNat)} ${quickNat}`)')) {
  jsCode = jsCode.replace(
    '}, `${getCountryFlag(quickNat)} ${quickNat}`)',
    '}, /*#__PURE__*/React.createElement("span", { className: "flex items-center gap-1" }, /*#__PURE__*/React.createElement(FlagIcon, { nationality: quickNat, className: "w-3.5 h-2.5 object-cover rounded-xs" }), /*#__PURE__*/React.createElement("span", null, quickNat)))'
  );
  console.log('8. Updated Quick Filter buttons in app.js');
}

// 6. Update Dropdown Items in app.jsx
if (jsxCode.includes('<span>{getCountryFlag(nat)}</span><span>{nat}</span>')) {
  jsxCode = jsxCode.replace(
    '<span>{getCountryFlag(nat)}</span><span>{nat}</span>',
    '<FlagIcon nationality={nat} className="w-4 h-3 object-cover rounded-xs border border-slate-700/60" /><span>{nat}</span>'
  );
  console.log('9. Updated Dropdown items in app.jsx');
}

// Update Dropdown Items in app.js
if (jsCode.includes('}, `${getCountryFlag(nat)} ${nat}`)')) {
  jsCode = jsCode.replace(
    '}, `${getCountryFlag(nat)} ${nat}`)',
    '}, /*#__PURE__*/React.createElement("span", { className: "flex items-center gap-1.5" }, /*#__PURE__*/React.createElement(FlagIcon, { nationality: nat, className: "w-4 h-3 object-cover rounded-xs border border-slate-700/60" }), /*#__PURE__*/React.createElement("span", null, nat)))'
  );
  console.log('10. Updated Dropdown items in app.js');
}

// 7. Update Detail Modal Header in app.jsx
if (jsxCode.includes('<span>{getCountryFlag(adjustedPlayer.nationality)}</span><span>{adjustedPlayer.nationality}</span>')) {
  jsxCode = jsxCode.replace(
    '<span>{getCountryFlag(adjustedPlayer.nationality)}</span><span>{adjustedPlayer.nationality}</span>',
    '<FlagIcon nationality={adjustedPlayer.nationality} className="w-5 h-3.5 object-cover rounded-xs border border-slate-700 shadow-sm" /><span>{adjustedPlayer.nationality}</span>'
  );
  console.log('11. Updated Detail modal header in app.jsx');
}

// Update Detail Modal Header in app.js
if (jsCode.includes('getCountryFlag(adjustedPlayer.nationality) + " " + adjustedPlayer.nationality)')) {
  jsCode = jsCode.replace(
    'getCountryFlag(adjustedPlayer.nationality) + " " + adjustedPlayer.nationality)',
    '/*#__PURE__*/React.createElement("span", { className: "flex items-center justify-center gap-1.5" }, /*#__PURE__*/React.createElement(FlagIcon, { nationality: adjustedPlayer.nationality, className: "w-5 h-3.5 object-cover rounded-xs border border-slate-700 shadow-sm" }), /*#__PURE__*/React.createElement("span", null, adjustedPlayer.nationality)))'
  );
  console.log('12. Updated Detail modal header in app.js');
}

// 8. Update Special Note Flag Badges for Selecao and LaRoja in app.jsx
if (jsxCode.includes('{comboValidation.isLaRoja ? \'🇪🇸\' : \'🇧🇷\'}')) {
  jsxCode = jsxCode.replace(
    '<span className="text-base">{comboValidation.isLaRoja ? \'🇪🇸\' : \'🇧🇷\'}</span>',
    '<FlagIcon nationality={comboValidation.isLaRoja ? \'スペイン\' : \'ブラジル\'} className="w-5 h-3.5 object-cover rounded-xs shadow-sm" />'
  );

  jsxCode = jsxCode.replace(
    '<span className="text-xs text-amber-300 font-bold">\n                          🇧🇷 ブラジル選手',
    '<span className="text-xs text-amber-300 font-bold flex items-center gap-1">\n                          <FlagIcon nationality="ブラジル" /> ブラジル選手'
  );

  jsxCode = jsxCode.replace(
    '<span className="text-xs text-amber-300 font-bold">\n                          🇪🇸 スペイン選手',
    '<span className="text-xs text-amber-300 font-bold flex items-center gap-1">\n                          <FlagIcon nationality="スペイン" /> スペイン選手'
  );
  console.log('13. Updated Formation Combo Special Note flags in app.jsx');
}

// Update Special Note Flag Badges in app.js
if (jsCode.includes('comboValidation.isLaRoja ? "🇪🇸" : "🇧🇷"')) {
  jsCode = jsCode.replace(
    '/*#__PURE__*/React.createElement("span", {\n        className: "text-base"\n      }, comboValidation.isLaRoja ? "🇪🇸" : "🇧🇷")',
    '/*#__PURE__*/React.createElement(FlagIcon, { nationality: comboValidation.isLaRoja ? "スペイン" : "ブラジル", className: "w-5 h-3.5 object-cover rounded-xs shadow-sm" })'
  );

  jsCode = jsCode.replace(
    '"🇧🇷 ブラジル選手 "',
    '/*#__PURE__*/React.createElement(FlagIcon, { nationality: "ブラジル" }), " ブラジル選手 "'
  );

  jsCode = jsCode.replace(
    '"🇪🇸 スペイン選手 "',
    '/*#__PURE__*/React.createElement(FlagIcon, { nationality: "スペイン" }), " スペイン選手 "'
  );
  console.log('14. Updated Formation Combo Special Note flags in app.js');
}

fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');
fs.writeFileSync(appJsPath, jsCode, 'utf-8');

console.log('=== REAL FLAGCDN IMAGE ICONS APPLIED SUCCESSFULLY! ===');
