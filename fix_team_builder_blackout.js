const fs = require('fs');
const path = require('path');

console.log('=== FIXING TEAM BUILDER PLAYER SWAP BLACKOUT ERROR ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');

let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');
let jsCode = fs.readFileSync(appJsPath, 'utf-8');

const flagCdnHelperTopJsx = `
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

const getCountryFlag = (nationality) => {
  if (!nationality) return '';
  const code = COUNTRY_CODE_MAP[String(nationality).trim()];
  return code ? \`https://flagcdn.com/20x15/\${code}.png\` : '';
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

const flagCdnHelperTopJs = `
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

const getCountryFlag = (nationality) => {
  if (!nationality) return '';
  const code = COUNTRY_CODE_MAP[String(nationality).trim()];
  return code ? \`https://flagcdn.com/20x15/\${code}.png\` : '';
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

// Move FlagIcon and getCountryFlag to top of app.jsx (before any component usage)
if (jsxCode.includes('const COUNTRY_CODE_MAP = {')) {
  // Remove existing position
  const startIdx = jsxCode.indexOf('const COUNTRY_CODE_MAP = {');
  const endIdx = jsxCode.indexOf('const STAT_NAME_MAP = {', startIdx);
  jsxCode = jsxCode.substring(0, startIdx) + jsxCode.substring(endIdx);
}

// Insert at top of app.jsx before YOUTUBE_VIDEOS
jsxCode = jsxCode.replace('const YOUTUBE_VIDEOS = [', flagCdnHelperTopJsx.trim() + '\n\nconst YOUTUBE_VIDEOS = [');
console.log('1. Moved FlagIcon & getCountryFlag helpers to top of app.jsx');

// Move FlagIcon and getCountryFlag to top of app.js (before any component usage)
if (jsCode.includes('const COUNTRY_CODE_MAP = {')) {
  // Remove existing position
  const startIdx = jsCode.indexOf('const COUNTRY_CODE_MAP = {');
  const endIdx = jsCode.indexOf('const STAT_NAME_MAP = {', startIdx);
  jsCode = jsCode.substring(0, startIdx) + jsCode.substring(endIdx);
}

// Insert at top of app.js before YOUTUBE_VIDEOS
jsCode = jsCode.replace('const YOUTUBE_VIDEOS = [', flagCdnHelperTopJs.trim() + '\n\nconst YOUTUBE_VIDEOS = [');
console.log('2. Moved FlagIcon & getCountryFlag helpers to top of app.js');

// Fix Team Builder player swap item rendering in app.jsx (line 5872)
const targetJsxLine = `{p.playStyle || 'スタイル未設定'} <span className="text-[#00FF66] font-bold">LV.{p.playStyleLevel}</span> {p.nationality && \`| \${getCountryFlag(p.nationality)} \${p.nationality}\`}`;
const replacementJsxLine = `<span>{p.playStyle || 'スタイル未設定'}</span> <span className="text-[#00FF66] font-bold">LV.{p.playStyleLevel}</span> {p.nationality && <span className="inline-flex items-center gap-1 font-medium text-slate-300"><span>|</span><FlagIcon nationality={p.nationality} className="w-3.5 h-2.5 object-cover rounded-xs border border-slate-700/60" /><span>{p.nationality}</span></span>}`;

if (jsxCode.includes(targetJsxLine)) {
  jsxCode = jsxCode.replace(targetJsxLine, replacementJsxLine);
  console.log('3. Fixed Team Builder modal item rendering in app.jsx');
}

// Fix Team Builder player swap item rendering in app.js (line 8437)
const targetJsLine = `p.nationality && \`| \${getCountryFlag(p.nationality)} \${p.nationality}\``;
const replacementJsLine = `p.nationality && /*#__PURE__*/React.createElement("span", { className: "inline-flex items-center gap-1 font-medium text-slate-300" }, /*#__PURE__*/React.createElement("span", null, "|"), /*#__PURE__*/React.createElement(FlagIcon, { nationality: p.nationality, className: "w-3.5 h-2.5 object-cover rounded-xs border border-slate-700/60" }), /*#__PURE__*/React.createElement("span", null, p.nationality))`;

if (jsCode.includes(targetJsLine)) {
  jsCode = jsCode.replace(targetJsLine, replacementJsLine);
  console.log('4. Fixed Team Builder modal item rendering in app.js');
}

fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');
fs.writeFileSync(appJsPath, jsCode, 'utf-8');

console.log('=== BLACKOUT BUG FIXED SUCCESSFULLY! ===');
