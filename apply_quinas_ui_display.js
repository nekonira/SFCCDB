const fs = require('fs');

console.log('=== FIXING PORTUGAL NATION BONUS UI IN APP.JS ===');

const appJsPath = 'src/app.js';
let jsCode = fs.readFileSync(appJsPath, 'utf-8');

// 1. Fix Header Badge in app.js
const brokenHeaderTarget = 'comboValidation.isLesBleus&&comboValidation.francePlayerCount>0||comboValidation.isQuinas&&comboValidation.portugalPlayerCount>0&&/*#__PURE__*/React.createElement("span",{className:"text-xs text-blue-300 font-bold flex items-center gap-1"},/*#__PURE__*/React.createElement(FlagIcon,{nationality:"フランス"})," フランス選手 ",comboValidation.francePlayerCount,"名 (+",comboValidation.franceBonusPct,"% 適用中)"),comboValidation.isQuinas&&comboValidation.portugalPlayerCount>0&&/*#__PURE__*/React.createElement("span",{className:"text-xs text-red-400 font-bold flex items-center gap-1"},/*#__PURE__*/React.createElement(FlagIcon,{nationality:"ポルトガル"})," ポルトガル選手 ",comboValidation.portugalPlayerCount,"名 (+",comboValidation.portugalBonusPct,"% 適用中)")';

const cleanHeaderReplacement = 'comboValidation.isLesBleus&&comboValidation.francePlayerCount>0&&/*#__PURE__*/React.createElement("span",{className:"text-xs text-blue-300 font-bold flex items-center gap-1"},/*#__PURE__*/React.createElement(FlagIcon,{nationality:"フランス"})," フランス選手 ",comboValidation.francePlayerCount,"名 (+",comboValidation.franceBonusPct,"% 適用中)"),comboValidation.isQuinas&&comboValidation.portugalPlayerCount>0&&/*#__PURE__*/React.createElement("span",{className:"text-xs text-red-400 font-bold flex items-center gap-1"},/*#__PURE__*/React.createElement(FlagIcon,{nationality:"ポルトガル"})," ポルトガル選手 ",comboValidation.portugalPlayerCount,"名 (+",comboValidation.portugalBonusPct,"% 適用中)")';

if (jsCode.includes(brokenHeaderTarget)) {
  jsCode = jsCode.replace(brokenHeaderTarget, cleanHeaderReplacement);
  console.log('✅ 1. Cleaned up header badge condition in app.js');
} else {
  console.log('ℹ️ brokenHeaderTarget not found directly, checking variations...');
  // Check if double quinas badge exists
  const doubleBadge = ',comboValidation.isQuinas&&comboValidation.portugalPlayerCount>0&&/*#__PURE__*/React.createElement("span",{className:"text-xs text-red-400 font-bold flex items-center gap-1"},/*#__PURE__*/React.createElement(FlagIcon,{nationality:"ポルトガル"})," ポルトガル選手 ",comboValidation.portugalPlayerCount,"名 (+",comboValidation.portugalBonusPct,"% 適用中)")';
  if (jsCode.includes('comboValidation.francePlayerCount>0||comboValidation.isQuinas')) {
    jsCode = jsCode.replace('comboValidation.francePlayerCount>0||comboValidation.isQuinas&&comboValidation.portugalPlayerCount>0', 'comboValidation.francePlayerCount>0');
    console.log('✅ 1. Removed invalid OR condition in France header badge');
  }
}

// 2. Fix Special Note Banner background in app.js
const bannerBgTarget = 'comboValidation.isSelecao&&comboValidation.brazilPlayerCount>0||comboValidation.isLaRoja&&comboValidation.spainPlayerCount>0||comboValidation.isLesBleus&&comboValidation.francePlayerCount>0';
const bannerBgReplacement = 'comboValidation.isSelecao&&comboValidation.brazilPlayerCount>0||comboValidation.isLaRoja&&comboValidation.spainPlayerCount>0||comboValidation.isLesBleus&&comboValidation.francePlayerCount>0||comboValidation.isQuinas&&comboValidation.portugalPlayerCount>0';

if (jsCode.includes(bannerBgTarget) && !jsCode.includes(bannerBgReplacement)) {
  jsCode = jsCode.replace(bannerBgTarget, bannerBgReplacement);
  console.log('✅ 2. Added Portugal condition to banner highlight background in app.js');
}

// 3. Fix Special Note Banner FlagIcon in app.js
const bannerFlagTarget = "nationality:comboValidation.isLesBleus?'フランス':comboValidation.isLaRoja?'スペイン':'ブラジル'";
const bannerFlagReplacement = "nationality:comboValidation.isQuinas?'ポルトガル':comboValidation.isLesBleus?'フランス':comboValidation.isLaRoja?'スペイン':'ブラジル'";

if (jsCode.includes(bannerFlagTarget)) {
  jsCode = jsCode.replace(bannerFlagTarget, bannerFlagReplacement);
  console.log('✅ 3. Updated banner FlagIcon in app.js');
}

// 4. Fix Special Note Banner Portugal Starter Button Badge in app.js
const franceButtonJs = 'comboValidation.isLesBleus&&/*#__PURE__*/React.createElement("span",{className:"px-2 py-0.5 rounded bg-blue-500 text-slate-950 font-black text-[11px] whitespace-nowrap shadow"},"スタメン ",comboValidation.francePlayerCount,"名 (+",comboValidation.franceBonusPct,"% 適用中)")';
const portugalButtonJs = ',comboValidation.isQuinas&&/*#__PURE__*/React.createElement("span",{className:"px-2 py-0.5 rounded bg-red-600 text-white font-black text-[11px] whitespace-nowrap shadow"},"スタメン ",comboValidation.portugalPlayerCount,"名 (+",comboValidation.portugalBonusPct,"% 適用中)")';

if (jsCode.includes(franceButtonJs) && !jsCode.includes('スタメン ",comboValidation.portugalPlayerCount')) {
  jsCode = jsCode.replace(franceButtonJs, franceButtonJs + portugalButtonJs);
  console.log('✅ 4. Added Portugal starter button badge to banner in app.js');
}

fs.writeFileSync(appJsPath, jsCode, 'utf-8');

// 5. Update index.html cache buster
const indexPath = 'index.html';
let indexContent = fs.readFileSync(indexPath, 'utf-8');
const newTimestamp = Date.now().toString();
indexContent = indexContent.replace(/app\.js\?v=\d+/, `app.js?v=${newTimestamp}`);
fs.writeFileSync(indexPath, indexContent, 'utf-8');
console.log('✅ 5. Updated index.html cache buster with', newTimestamp);

console.log('🎉 PORTUGAL NATION BONUS UI APPLIED SUCCESSFULLY IN APP.JS!');
