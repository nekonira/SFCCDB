const fs = require('fs');

let code = fs.readFileSync('src/app.jsx', 'utf8');

// 1. Restore toggleCompareCard to only mutate selectedCompareCardIds without forcing modal open
const toggleTarget = `  const toggleCompareCard = (id) => {
    setSelectedCompareCardIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(cId => cId !== id);
      } else {
        if (prev.length >= 7) return prev;
        return [...prev, id];
      }
    });
    setIsCardCompareModalOpen(true);
  };`;

const toggleReplacement = `  const toggleCompareCard = (id) => {
    setSelectedCompareCardIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(cId => cId !== id);
      } else {
        if (prev.length >= 7) return prev;
        return [...prev, id];
      }
    });
  };`;

if (code.includes(toggleTarget)) {
  code = code.replace(toggleTarget, toggleReplacement);
  console.log('Restored toggleCompareCard (LF)');
} else if (code.includes(toggleTarget.replace(/\n/g, '\r\n'))) {
  code = code.replace(toggleTarget.replace(/\n/g, '\r\n'), toggleReplacement.replace(/\n/g, '\r\n'));
  console.log('Restored toggleCompareCard (CRLF)');
} else {
  console.log('Warning: toggleCompareCard target not found!');
}

// 2. Replace bottom floating compare bar with full selected card thumbnails drawer
const oldBarTarget = `      {/* 3. 浮動 比較バー (カードが1枚以上選択されている場合) */}
      {selectedCompareCardIds.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 border border-amber-500/50 backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs animate-fadeIn">
          <span className="font-extrabold text-amber-300">
            📊 比較対象: <span className="text-white font-black">{selectedCompareCardIds.length}枚</span> 選択中
          </span>
          <button
            onClick={() => setIsCardCompareModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-md hover:brightness-110 transition-all cursor-pointer flex items-center gap-1"
          >
            比較表を表示 ⚽
          </button>
          <button
            onClick={() => setSelectedCompareCardIds([])}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold transition-all cursor-pointer"
          >
            全解除
          </button>
        </div>
      )}`;

const newBarReplacement = `      {/* 3. 下段: 選択中の特練カード表示 ＆ 比較表起動バー */}
      {selectedCompareCardIds.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 border border-amber-500/50 backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between gap-4 max-w-4xl w-[92%] sm:w-auto animate-fadeIn">
          <div className="flex items-center gap-3 min-w-0 overflow-hidden">
            <div className="flex flex-col flex-shrink-0">
              <span className="text-[11px] font-black text-amber-300 whitespace-nowrap">
                🎴 比較対象カード ({selectedCompareCardIds.length}/7)
              </span>
              <button
                onClick={() => setSelectedCompareCardIds([])}
                className="text-[10px] text-red-400 hover:text-red-300 font-bold underline cursor-pointer text-left"
                title="比較リストを全消去"
              >
                全クリア
              </button>
            </div>

            {/* 選択された特練カード サムネイル一覧 (個別削除ボタン付き) */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
              {selectedCompareCardIds.map(id => {
                const card = officialCards.find(c => c.id === id);
                if (!card) return null;
                const imgUrl = card.getImageUrl ? card.getImageUrl() : '';
                return (
                  <div key={card.id} className="relative group flex-shrink-0">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={card.name}
                        className="w-10 h-14 rounded-lg object-cover bg-slate-950 border border-slate-700 shadow-md group-hover:border-amber-400 transition-colors"
                      />
                    ) : (
                      <div className="w-10 h-14 rounded-lg bg-slate-950 border border-slate-700 flex flex-col items-center justify-center text-[9px] font-black text-amber-400 shadow-md p-0.5">
                        <span>{card.rank}</span>
                        <span className="text-[7px] text-slate-400 truncate max-w-[36px]">{card.name}</span>
                      </div>
                    )}
                    <button
                      onClick={() => setSelectedCompareCardIds(prev => prev.filter(cId => cId !== id))}
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
            onClick={() => setIsCardCompareModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs rounded-xl shadow-lg hover:brightness-110 transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
          >
            <Icon name="compare" className="w-4 h-4 text-slate-950" />
            比較表を表示 ⚽
          </button>
        </div>
      )}`;

if (code.includes(oldBarTarget)) {
  code = code.replace(oldBarTarget, newBarReplacement);
  console.log('Replaced bottom compare bar (LF)');
} else if (code.includes(oldBarTarget.replace(/\n/g, '\r\n'))) {
  code = code.replace(oldBarTarget.replace(/\n/g, '\r\n'), newBarReplacement.replace(/\n/g, '\r\n'));
  console.log('Replaced bottom compare bar (CRLF)');
} else {
  console.log('Warning: Bottom compare bar target not found!');
}

fs.writeFileSync('src/app.jsx', code, 'utf8');
