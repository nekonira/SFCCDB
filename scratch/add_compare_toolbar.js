const fs = require('fs');

let appCode = fs.readFileSync('src/app.jsx', 'utf8');

const target = `      {subTab === 'singleCompare' && (\r\n        <div className="space-y-4">`;
const targetLf = `      {subTab === 'singleCompare' && (\n        <div className="space-y-4">`;

const toolbarHtml = `
          {/* カードデータベース 検索＆比較アクションヘッダー */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2 w-full md:w-auto flex-1">
              <input
                type="text"
                value={cardSearchQuery}
                onChange={(e) => setCardSearchQuery(e.target.value)}
                placeholder="特練カード名・スキル名で検索..."
                className="w-full md:max-w-xs bg-slate-950 text-white text-xs px-3.5 py-2 rounded-xl border border-slate-700 focus:border-amber-400 outline-none"
              />
              <select
                value={cardRankFilter}
                onChange={(e) => setCardRankFilter(e.target.value)}
                className="bg-slate-950 text-amber-300 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 outline-none cursor-pointer"
              >
                <option value="ALL">全ランク</option>
                <option value="SSR">SSR</option>
                <option value="SR">SR</option>
                <option value="R">R</option>
              </select>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setCardViewMode('table')}
                  className={\`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer \${cardViewMode === 'table' ? 'bg-slate-800 text-amber-300 shadow' : 'text-slate-400 hover:text-white'}\`}
                >
                  📋 一覧表
                </button>
                <button
                  onClick={() => setCardViewMode('grid')}
                  className={\`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer \${cardViewMode === 'grid' ? 'bg-slate-800 text-amber-300 shadow' : 'text-slate-400 hover:text-white'}\`}
                >
                  🎴 カード
                </button>
              </div>

              <button
                onClick={() => setIsCardCompareModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-md hover:brightness-110 transition-all cursor-pointer flex items-center gap-1.5"
              >
                📊 カード比較表を開く {selectedCompareCardIds.length > 0 ? \`(\${selectedCompareCardIds.length}枚選択中)\` : ''}
              </button>
            </div>
          </div>`;

if (appCode.includes(target)) {
  appCode = appCode.replace(target, target + toolbarHtml);
  console.log('Added singleCompare toolbar (CRLF)');
} else if (appCode.includes(targetLf)) {
  appCode = appCode.replace(targetLf, targetLf + toolbarHtml);
  console.log('Added singleCompare toolbar (LF)');
} else {
  console.log('Target not found!');
}

fs.writeFileSync('src/app.jsx', appCode, 'utf8');
