const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, '..', 'src', 'app.jsx');
let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');

console.log('=== Adding Quick Auto-Select Buttons to Top Header Bar ===');

const oldHeaderEnd = `            <button
              onClick={() => setIsPlayerModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Icon name="search" className="w-4 h-4 text-slate-950" />
              🔄 選手変更 (ポップアップ)
            </button>
          </div>
        </div>
      )}`;

const newHeaderEnd = `            <button
              onClick={() => setIsPlayerModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Icon name="search" className="w-4 h-4 text-slate-950" />
              🔄 選手変更 (ポップアップ)
            </button>

            {/* 常時表示 自動編成クイックボタン */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => handleDirectAutoSelect('EFFECTIVE_MAX')}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-md cursor-pointer flex items-center gap-1 transition-all active:scale-95 whitespace-nowrap"
                title="成長限界値の溢れ分を考慮した最大効果値編成を直接適用"
              >
                ⚡ 最大数値編成
              </button>
              <button
                type="button"
                onClick={() => handleDirectAutoSelect('SAFE_150')}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-black text-xs shadow-md cursor-pointer flex items-center gap-1 transition-all active:scale-95 whitespace-nowrap"
                title="全能力が限界値の -155〜-135 範囲に収まる最適編成を適用"
              >
                🛡️ 無難最適編成
              </button>
              <button
                type="button"
                onClick={() => { setAutoSelectInitialMode('EFFECTIVE_MAX'); setIsAutoSelectModalOpen(true); }}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/60 text-amber-300 font-extrabold text-xs cursor-pointer flex items-center gap-1 transition-all whitespace-nowrap shadow-sm"
                title="必須アビリティ・必須スキルや狙うカテゴリを指定して自動編成"
              >
                ⚙️ 条件指定...
              </button>
            </div>
          </div>
        </div>
      )}`;

if (jsxCode.includes(oldHeaderEnd)) {
  jsxCode = jsxCode.replace(oldHeaderEnd, newHeaderEnd);
  console.log('✅ Added Quick Auto-Select Buttons to Header Bar in app.jsx');
} else {
  console.log('⚠️ Target string not found in app.jsx');
}

fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');
console.log('🎉 APP.JSX HEADER BUTTONS UPDATED!');
