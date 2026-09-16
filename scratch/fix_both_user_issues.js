const fs = require('fs');

let content = fs.readFileSync('src/app.jsx', 'utf8');

// 1. Clean up App's floating compare bar (remove mistakenly pasted acquiredItems block)
const searchTarget = `{/* フローティング比較バー */}
      {compareList.length > 0 && (
        <div className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0e1522]/95 border border-[#00FF66]/50 rounded-2xl p-3 shadow-2xl shadow-[#00FF66]/20 backdrop-blur-xl flex items-center gap-3 max-w-xl w-[92%]">
          <div className="flex items-center gap-2.5 flex-1 overflow-x-auto py-1">
            <div className="flex flex-col flex-shrink-0">
              <span className="text-xs font-bold text-[#00FF66] whitespace-nowrap pl-1">比較 ({compareList.length}/5)</span>
              <button
                onClick={() => {
                  setCompareList([]);
                  setIsCompareModalOpen(false);
                }}
                className="text-[10px] text-red-400 hover:text-red-300 font-bold underline cursor-pointer text-left pl-1"
                title="比較リストを全消去"
              >
                全クリア
              </button>
            </div>
            <div className="flex gap-2">
              {compareList.map(p => {
                const avatar = getPlayerAvatarUrl(p);
                return (
                  <div key={p.id} className="relative group flex-shrink-0">
                    <PlayerAvatar player={p} className="w-10 h-14 rounded-lg object-contain bg-slate-950/90 border border-slate-700 shadow-md group-hover:border-[#00FF66] transition-colors" />
                    <button
                      onClick={() => toggleCompare(p)}
                      className="absolute -top-1.5 -right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 shadow-md hover:scale-110 transition-transform cursor-pointer"
                      title="比較から外す"
                    >
                      <Icon name="x" className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* 🎴 6スロット編成 獲得スキル ＆ アビリティ一覧 */}
            <div className="glass-panel p-4 rounded-3xl border border-amber-500/30 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-xs font-black text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  🎴 6スロット編成 獲得スキル ＆ アビリティ一覧
                </h4>
                <span className="text-[11px] font-bold text-amber-300/80">
                  全 {acquiredItems.length} 件 習得
                </span>
              </div>

              {acquiredItems.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500 bg-slate-950/60 rounded-2xl border border-slate-800">
                  現在アクティブな特練スロットがありません。カードをセットすると習得したスキル・アビリティが表示されます。
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
                  {acquiredItems.map((item, idx) => (
                    <div key={idx} className="bg-slate-950/90 p-2.5 rounded-2xl border border-slate-800 flex items-start gap-2.5 shadow-sm">
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                            {item.isSkill ? (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                                スキル
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                アビリティ
                              </span>
                            )}
                            {item.isSkill ? renderSkillBadge(item.rank) : renderRankBadge(item.rank)}
                          </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-black text-white truncate">{item.name}</span>
                          <span className="text-[10px] text-amber-400/90 font-extrabold bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/20 flex-shrink-0">
                            スロット{item.slotId}
                          </span>
                        </div>
                        {item.desc && (
                          <p className="text-[10px] text-amber-300/90 font-bold mt-0.5 line-clamp-2 leading-tight">
                            {item.desc}
                          </p>
                        )}
                        <div className="text-[9px] text-slate-400 font-semibold truncate mt-1">
                          {item.cardName}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#00FF66] to-[#00E5FF] text-slate-950 font-extrabold text-xs rounded-xl shadow-md hover:brightness-110 whitespace-nowrap cursor-pointer"
          >
            <Icon name="compare" className="w-4 h-4" />
            比較表
          </button>
        </div>
      )}`;

const replacementCleanBar = `{/* フローティング比較バー */}
      {compareList.length > 0 && (
        <div className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0e1522]/95 border border-[#00FF66]/50 rounded-2xl p-3 shadow-2xl shadow-[#00FF66]/20 backdrop-blur-xl flex items-center gap-3 max-w-xl w-[92%]">
          <div className="flex items-center gap-2.5 flex-1 overflow-x-auto py-1">
            <div className="flex flex-col flex-shrink-0">
              <span className="text-xs font-bold text-[#00FF66] whitespace-nowrap pl-1">比較 ({compareList.length}/5)</span>
              <button
                onClick={() => {
                  setCompareList([]);
                  setIsCompareModalOpen(false);
                }}
                className="text-[10px] text-red-400 hover:text-red-300 font-bold underline cursor-pointer text-left pl-1"
                title="比較リストを全消去"
              >
                全クリア
              </button>
            </div>
            <div className="flex gap-2">
              {compareList.map(p => {
                const avatar = getPlayerAvatarUrl(p);
                return (
                  <div key={p.id} className="relative group flex-shrink-0">
                    <PlayerAvatar player={p} className="w-10 h-14 rounded-lg object-contain bg-slate-950/90 border border-slate-700 shadow-md group-hover:border-[#00FF66] transition-colors" />
                    <button
                      onClick={() => toggleCompare(p)}
                      className="absolute -top-1.5 -right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 shadow-md hover:scale-110 transition-transform cursor-pointer"
                      title="比較から外す"
                    >
                      <Icon name="x" className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#00FF66] to-[#00E5FF] text-slate-950 font-extrabold text-xs rounded-xl shadow-md hover:brightness-110 whitespace-nowrap cursor-pointer"
          >
            <Icon name="compare" className="w-4 h-4" />
            比較表
          </button>
        </div>
      )}`;

if (content.includes(searchTarget)) {
  content = content.replace(searchTarget, replacementCleanBar);
  console.log('Cleaned up App floating compare bar in src/app.jsx');
} else {
  console.log('Could not find exact searchTarget in src/app.jsx, trying regex replace');
  // Regex cleanup
  content = content.replace(/\{\/\* フローティング比較バー \*\/\}[\s\S]*?<button\s+onClick=\{\(\) => setIsCompareModalOpen\(true\)\}[\s\S]*?<\/button>\s*<\/div>\s*\}/, replacementCleanBar);
}

// 2. Ensure top-level badge helpers exist in src/app.jsx
const badgeHelpers = `
function getCardRankBadgeStyle(rank) {
  if (rank === 'SSR' || rank === '虹') return 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-black';
  if (rank === 'SR' || rank === '金') return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 font-black';
  return 'bg-slate-700/40 text-slate-300 border border-slate-600 font-bold';
}

function getRankBadgeStyle(rank) {
  return getCardRankBadgeStyle(rank);
}

function getRankTextStyle(rank) {
  if (rank === 'SSR' || rank === '虹') return 'text-amber-300 font-black';
  if (rank === 'SR' || rank === '金') return 'text-yellow-300 font-black';
  return 'text-slate-200 font-bold';
}

function renderRankBadge(rankOrVal, allVals) {
  if (typeof rankOrVal === 'number' && Array.isArray(allVals)) {
    if (allVals.length === 0 || rankOrVal <= 0) return null;
    const sorted = [...allVals].sort((a, b) => b - a);
    if (rankOrVal === sorted[0]) return <span className="text-[9px] font-black px-1 py-0.2 rounded bg-red-600 text-white">1位</span>;
    if (sorted.length > 1 && rankOrVal === sorted[1]) return <span className="text-[9px] font-black px-1 py-0.2 rounded bg-amber-500 text-slate-950">2位</span>;
    if (sorted.length > 2 && rankOrVal === sorted[2]) return <span className="text-[9px] font-black px-1 py-0.2 rounded bg-cyan-500 text-slate-950">3位</span>;
    return null;
  }
  const rank = rankOrVal || '銅';
  if (rank === '虹' || rank === 'SSR') return <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400 text-slate-950 shadow-sm">虹</span>;
  if (rank === '金' || rank === 'SR') return <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-400 text-slate-950 shadow-sm">金</span>;
  if (rank === '銀' || rank === 'R') return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-300 text-slate-950">銀</span>;
  return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-700/80 text-amber-100">銅</span>;
}

function renderSkillBadge(rank) {
  return renderRankBadge(rank);
}
`;

if (!content.includes('function getCardRankBadgeStyle')) {
  const topAnchor = 'const POSITION_LIMIT_ADDITIONS =';
  content = content.replace(topAnchor, badgeHelpers.trim() + '\n\n' + topAnchor);
  console.log('Added badge helpers to top of src/app.jsx');
}

fs.writeFileSync('src/app.jsx', content, 'utf8');
console.log('Saved src/app.jsx successfully!');
