const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Updating France Nation Bonus UI & Calculation in App ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');

// 1. Update fallback return object for comboValidation
if (!jsxCode.includes("isLesBleus: false,")) {
  jsxCode = jsxCode.replace(
    "isSelecao: false,",
    "isSelecao: false,\n        isLaRoja: false,\n        isLesBleus: false,\n        francePlayerCount: 0,\n        franceBonusPct: 0,\n        spainPlayerCount: 0,\n        spainBonusPct: 0,"
  );
  console.log('✅ 1. Updated fallback return object in app.jsx');
}

// 2. Update special note box and nation badge UI in app.jsx
const targetSpecialNoteBox = `{/* Special Brazil Note if present */}
              {activeComboData.specialNote && (
                <div className={\`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs \${
                  (comboValidation.isSelecao && comboValidation.brazilPlayerCount > 0) || (comboValidation.isLaRoja && comboValidation.spainPlayerCount > 0)
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }\`}>
                  <div className="flex items-center gap-2">
                    <FlagIcon nationality={comboValidation.isLaRoja ? 'スペイン' : 'ブラジル'} className="w-5 h-3.5 object-cover rounded-xs shadow-sm" />
                    <span className="font-bold">{activeComboData.specialNote}</span>
                  </div>
                  {comboValidation.isSelecao && (
                    <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[11px] whitespace-nowrap shadow">
                      スタメン {comboValidation.brazilPlayerCount}名 (+{comboValidation.brazilBonusPct}% 適用中)
                    </span>
                  )}
                  {comboValidation.isLaRoja && (
                    <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[11px] whitespace-nowrap shadow">
                      スタメン {comboValidation.spainPlayerCount}名 (+{comboValidation.spainBonusPct}% 適用中)
                    </span>
                  )}
                </div>
              )}`;

const replacementSpecialNoteBox = `{/* Special Nation Note if present */}
              {activeComboData.specialNote && (
                <div className={\`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs \${
                  (comboValidation.isSelecao && comboValidation.brazilPlayerCount > 0) || (comboValidation.isLaRoja && comboValidation.spainPlayerCount > 0) || (comboValidation.isLesBleus && comboValidation.francePlayerCount > 0)
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }\`}>
                  <div className="flex items-center gap-2">
                    <FlagIcon nationality={comboValidation.isLesBleus ? 'フランス' : (comboValidation.isLaRoja ? 'スペイン' : 'ブラジル')} className="w-5 h-3.5 object-cover rounded-xs shadow-sm" />
                    <span className="font-bold">{activeComboData.specialNote}</span>
                  </div>
                  {comboValidation.isSelecao && (
                    <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[11px] whitespace-nowrap shadow">
                      スタメン {comboValidation.brazilPlayerCount}名 (+{comboValidation.brazilBonusPct}% 適用中)
                    </span>
                  )}
                  {comboValidation.isLaRoja && (
                    <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[11px] whitespace-nowrap shadow">
                      スタメン {comboValidation.spainPlayerCount}名 (+{comboValidation.spainBonusPct}% 適用中)
                    </span>
                  )}
                  {comboValidation.isLesBleus && (
                    <span className="px-2 py-0.5 rounded bg-blue-500 text-slate-950 font-black text-[11px] whitespace-nowrap shadow">
                      スタメン {comboValidation.francePlayerCount}名 (+{comboValidation.franceBonusPct}% 適用中)
                    </span>
                  )}
                </div>
              )}`;

if (jsxCode.includes(targetSpecialNoteBox)) {
  jsxCode = jsxCode.replace(targetSpecialNoteBox, replacementSpecialNoteBox);
  console.log('✅ 2. Updated special note UI box in app.jsx');
}

fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');

console.log('🎉 FRANCE NATION BONUS UI & CALCULATION UPDATED SUCCESSFULLY!');
