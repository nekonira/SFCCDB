const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== FIXING LA ROJA 26 SPAIN BONUS IN APP.JSX AND APP.JS ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');

let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');
let jsCode = fs.readFileSync(appJsPath, 'utf-8');

// 1. Update app.jsx specialNote banner
const oldJsxNoteBanner = `{activeComboData.specialNote && (
                <div className={\`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs \${
                  comboValidation.isSelecao && comboValidation.brazilPlayerCount > 0
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }\`}>
                  <div className="flex items-center gap-2">
                    <span className="text-base">🇧🇷</span>
                    <span className="font-bold">{activeComboData.specialNote}</span>
                  </div>
                  {comboValidation.isSelecao && (
                    <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[11px] whitespace-nowrap shadow">
                      スタメン {comboValidation.brazilPlayerCount}名 (+{comboValidation.brazilBonusPct}% 適用中)
                    </span>
                  )}
                  {comboValidation.isLaRoja && (
                    <span className="px-2 py-0.5 rounded bg-red-500 text-white font-black text-[11px] whitespace-nowrap shadow">
                      スタメン {comboValidation.spainPlayerCount}名 (+{comboValidation.spainBonusPct}% 適用中)
                    </span>
                  )}
                </div>
              )}`;

const newJsxNoteBanner = `{activeComboData.specialNote && (
                <div className={\`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs \${
                  (comboValidation.isSelecao && comboValidation.brazilPlayerCount > 0) || (comboValidation.isLaRoja && comboValidation.spainPlayerCount > 0)
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }\`}>
                  <div className="flex items-center gap-2">
                    <span className="text-base">{comboValidation.isLaRoja ? '🇪🇸' : '🇧🇷'}</span>
                    <span className="font-bold">{activeComboData.specialNote}</span>
                  </div>
                  {comboValidation.isSelecao && (
                    <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[11px] whitespace-nowrap shadow">
                      スタメン {comboValidation.brazilPlayerCount}名 (+{comboValidation.brazilBonusPct}% 適用中)
                    </span>
                  )}
                  {comboValidation.isLaRoja && (
                    <span className="px-2 py-0.5 rounded bg-red-500 text-white font-black text-[11px] whitespace-nowrap shadow">
                      スタメン {comboValidation.spainPlayerCount}名 (+{comboValidation.spainBonusPct}% 適用中)
                    </span>
                  )}
                </div>
              )}`;

if (jsxCode.includes('<span className="text-base">🇧🇷</span>')) {
  jsxCode = jsxCode.replace(oldJsxNoteBanner, newJsxNoteBanner);
  console.log('1. Updated specialNote banner in app.jsx');
}

fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');

// 2. Update app.js
// Update header Spain badge in app.js
if (!jsCode.includes("🇪🇸 スペイン選手")) {
  jsCode = jsCode.replace(
    `comboValidation.isSelecao && comboValidation.brazilPlayerCount > 0 && /*#__PURE__*/React.createElement("span", {
        className: "text-xs text-amber-300 font-bold"
      }, "🇧🇷 ブラジル選手 ", comboValidation.brazilPlayerCount, "名 (+", comboValidation.brazilBonusPct, "% 適用中)")`,
    `comboValidation.isSelecao && comboValidation.brazilPlayerCount > 0 && /*#__PURE__*/React.createElement("span", {
        className: "text-xs text-amber-300 font-bold"
      }, "🇧🇷 ブラジル選手 ", comboValidation.brazilPlayerCount, "名 (+", comboValidation.brazilBonusPct, "% 適用中)"), comboValidation.isLaRoja && comboValidation.spainPlayerCount > 0 && /*#__PURE__*/React.createElement("span", {
        className: "text-xs text-amber-300 font-bold"
      }, "🇪🇸 スペイン選手 ", comboValidation.spainPlayerCount, "名 (+", comboValidation.spainBonusPct, "% 適用中)")`
  );
  console.log('2. Added Spain header badge in app.js');
}

// Update specialNote banner in app.js
if (jsCode.includes('}, "🇧🇷"),')) {
  const oldJsNoteBanner = `activeComboData.specialNote && /*#__PURE__*/React.createElement("div", {
        className: \`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs \${comboValidation.isSelecao && comboValidation.brazilPlayerCount > 0 ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' : 'bg-slate-950 border-slate-800 text-slate-300'}\`
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-base"
      }, "🇧🇷"), /*#__PURE__*/React.createElement("span", {
        className: "font-bold"
      }, activeComboData.specialNote)), comboValidation.isSelecao && /*#__PURE__*/React.createElement("span", {
        className: "px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[11px] whitespace-nowrap shadow"
      }, "スタメン ", comboValidation.brazilPlayerCount, "名 (+", comboValidation.brazilBonusPct, "% 適用中)"))`;

  const newJsNoteBanner = `activeComboData.specialNote && /*#__PURE__*/React.createElement("div", {
        className: \`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs \${(comboValidation.isSelecao && comboValidation.brazilPlayerCount > 0) || (comboValidation.isLaRoja && comboValidation.spainPlayerCount > 0) ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' : 'bg-slate-950 border-slate-800 text-slate-300'}\`
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-base"
      }, comboValidation.isLaRoja ? "🇪🇸" : "🇧🇷"), /*#__PURE__*/React.createElement("span", {
        className: "font-bold"
      }, activeComboData.specialNote)), comboValidation.isSelecao && /*#__PURE__*/React.createElement("span", {
        className: "px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[11px] whitespace-nowrap shadow"
      }, "スタメン ", comboValidation.brazilPlayerCount, "名 (+", comboValidation.brazilBonusPct, "% 適用中)"), comboValidation.isLaRoja && /*#__PURE__*/React.createElement("span", {
        className: "px-2 py-0.5 rounded bg-red-500 text-white font-black text-[11px] whitespace-nowrap shadow"
      }, "スタメン ", comboValidation.spainPlayerCount, "名 (+", comboValidation.spainBonusPct, "% 適用中)"))`;

  jsCode = jsCode.replace(oldJsNoteBanner, newJsNoteBanner);
  console.log('3. Updated specialNote banner in app.js');
}

fs.writeFileSync(appJsPath, jsCode, 'utf-8');
console.log('=== SPAIN BONUS FULLY UPDATED IN BOTH APP.JSX AND APP.JS! ===');
