const fs = require('fs');

let code = fs.readFileSync('src/app.jsx', 'utf8');

// 1. Remove misplaced block from TeamBuilderTab
const misplacedBlockLf = `      {/* 浮動 比較バー (カードが1枚以上選択されている場合) */}
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
      )}

      {/* 特練カード 比較モーダル */}
      {isCardCompareModalOpen && (
        <CardCompareModal
          compareCardIds={selectedCompareCardIds}
          officialCards={officialCards}
          currentPlayer={currentPlayer}
          onClose={() => setIsCardCompareModalOpen(false)}
          onRemoveCard={(id) => setSelectedCompareCardIds(prev => prev.filter(cId => cId !== id))}
          onClearAll={() => setSelectedCompareCardIds([])}
          onAddCard={(id) => {
            if (!selectedCompareCardIds.includes(id)) {
              setSelectedCompareCardIds(prev => [...prev, id]);
            }
          }}
        />
      )}
`;

code = code.replace(misplacedBlockLf, '');
code = code.replace(misplacedBlockLf.replace(/\n/g, '\r\n'), '');

// 2. Build the full modals block to place at the end of TrainingSimulatorTab
const fullModalsBlock = `
      {/* 1. スロット装着カード変更ポップアップモーダル */}
      {activeSlotForCardModal !== null && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 md:p-4 animate-fadeIn">
          <div className="glass-panel max-w-3xl w-full rounded-2xl border border-amber-500/40 bg-slate-900 p-4 sm:p-6 flex flex-col shadow-2xl max-h-[85vh] space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-lg shadow-inner">
                  🎴
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-white">
                    スロット {activeSlotForCardModal + 1} の特練カードを選択
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    対象選手: <span className="text-amber-300 font-bold">{currentPlayer?.name}</span> ({currentPlayer?.mainPosition})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveSlotForCardModal(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={slotCardSearchText}
                onChange={(e) => setSlotCardSearchText(e.target.value)}
                placeholder="カード名・スキル名で検索..."
                className="flex-1 bg-slate-950 text-white text-xs px-3.5 py-2 rounded-xl border border-slate-700 focus:border-amber-400 outline-none"
              />
              <select
                value={slotCardRankFilter}
                onChange={(e) => setSlotCardRankFilter(e.target.value)}
                className="bg-slate-950 text-amber-300 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 outline-none cursor-pointer"
              >
                <option value="ALL">全ランク</option>
                <option value="SSR">SSR</option>
                <option value="SR">SR</option>
                <option value="R">R</option>
              </select>
              <select
                value={slotCardCatFilter}
                onChange={(e) => setSlotCardCatFilter(e.target.value)}
                className="bg-slate-950 text-amber-300 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 outline-none cursor-pointer"
              >
                <option value="ALL">全カテゴリ</option>
                {cardCategoriesList.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button
                onClick={() => {
                  updateSlot(activeSlotForCardModal, 'cardId', null);
                  setActiveSlotForCardModal(null);
                }}
                className="px-3 py-2 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-bold hover:bg-red-500 hover:text-slate-950 transition-all cursor-pointer"
              >
                取り外す ✕
              </button>
            </div>

            {/* Card List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-slate-700">
              {officialCards
                .filter(c => {
                  const q = slotCardSearchText.toLowerCase();
                  const sk = getSpecialCardSkill(c);
                  const ef = getSpecialCardEffect(c);
                  const matchSearch = !slotCardSearchText ||
                    c.name.toLowerCase().includes(q) ||
                    (sk && (sk.name.toLowerCase().includes(q) || sk.description.toLowerCase().includes(q))) ||
                    (ef && (ef.name.toLowerCase().includes(q) || ef.description.toLowerCase().includes(q)));
                  const matchRank = slotCardRankFilter === 'ALL' || c.rank === slotCardRankFilter;
                  const matchCat = slotCardCatFilter === 'ALL' || (c.cardType || c.category) === slotCardCatFilter;
                  return matchSearch && matchRank && matchCat;
                })
                .map(c => {
                  const isCurrent = slots[activeSlotForCardModal]?.cardId === c.id;
                  const imgUrl = c.getImageUrl ? c.getImageUrl() : '';
                  const cardSkill = getSpecialCardSkill(c);
                  const isMatch = checkBonusMatch(currentPlayer, c.playstyleBonus?.style);

                  return (
                    <div
                      key={c.id}
                      onClick={() => {
                        updateSlot(activeSlotForCardModal, 'cardId', c.id);
                        setActiveSlotForCardModal(null);
                      }}
                      className={\`p-3 rounded-xl bg-slate-950 border transition-all cursor-pointer flex items-center justify-between gap-3 group \${
                        isCurrent
                          ? 'border-amber-400 bg-amber-500/10 shadow-md'
                          : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                      }\`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {imgUrl ? (
                          <img src={imgUrl} alt={c.name} className="w-10 h-14 object-cover rounded-lg border border-slate-800 flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-14 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] text-amber-400 font-black flex-shrink-0">
                            {c.rank}
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={\`px-2 py-0.5 rounded text-[10px] \${getCardRankBadgeStyle(c.rank)}\`}>{c.rank}</span>
                            <span className="text-[10px] text-amber-300 font-extrabold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">{c.cardType || c.category || 'ストライカー'}</span>
                            <h4 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors truncate">{c.name}</h4>
                          </div>
                          {cardSkill && (
                            <p className="text-[11px] text-slate-300 mt-1 truncate">
                              ✨ {cardSkill.name}: <span className="text-slate-400">{cardSkill.description}</span>
                            </p>
                          )}
                          {c.playstyleBonus && (
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className={\`text-[10px] px-1.5 py-0.5 rounded font-bold \${isMatch ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 bg-slate-900'}\`}>
                                ボーナス: {c.playstyleBonus.style} {isMatch ? '✨ (一致)' : ''}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <button className="px-3.5 py-1.5 rounded-lg text-xs font-black bg-amber-500 text-slate-950 group-hover:bg-amber-400 transition-all flex-shrink-0">
                        {isCurrent ? '装着中 ✓' : '選択 ⚽'}
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* 2. 条件指定・最大数値編成ダイアログ */}
      {isAutoSelectModalOpen && (
        <AutoSelectModal
          isOpen={isAutoSelectModalOpen}
          onClose={() => setIsAutoSelectModalOpen(false)}
          onApply={(newSlots, toastMsg) => {
            setSlots(newSlots);
            if (toastMsg) {
              setAutoSelectToast(toastMsg);
              setTimeout(() => setAutoSelectToast(null), 3500);
            }
          }}
          currentPlayer={currentPlayer}
          officialCards={officialCards}
          calculateBoostedPlayer={calculateBoostedPlayer}
          initialStrategy={autoSelectInitialMode}
          setAutoSelectToast={setAutoSelectToast}
        />
      )}

      {/* 3. 浮動 比較バー (カードが1枚以上選択されている場合) */}
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
      )}

      {/* 4. 特練カード 比較モーダル */}
      {isCardCompareModalOpen && (
        <CardCompareModal
          compareCardIds={selectedCompareCardIds}
          officialCards={officialCards}
          currentPlayer={currentPlayer}
          onClose={() => setIsCardCompareModalOpen(false)}
          onRemoveCard={(id) => setSelectedCompareCardIds(prev => prev.filter(cId => cId !== id))}
          onClearAll={() => setSelectedCompareCardIds([])}
          onAddCard={(id) => {
            if (!selectedCompareCardIds.includes(id)) {
              setSelectedCompareCardIds(prev => [...prev, id]);
            }
          }}
        />
      )}
`;

const simEndTargetLf = `            </div>\n          </div>\n        </div>\n      )}\n    </div>\n  );`;
const simEndTargetCrlf = `            </div>\r\n          </div>\r\n        </div>\r\n      )}\r\n    </div>\r\n  );`;

if (code.includes(simEndTargetLf)) {
  code = code.replace(
    simEndTargetLf,
    `            </div>\n          </div>\n        </div>\n      )}` + fullModalsBlock + `\n    </div>\n  );`
  );
  console.log('Successfully inserted all 4 modals into TrainingSimulatorTab (LF)');
} else if (code.includes(simEndTargetCrlf)) {
  code = code.replace(
    simEndTargetCrlf,
    `            </div>\r\n          </div>\r\n        </div>\r\n      )}` + fullModalsBlock + `\r\n    </div>\r\n  );`
  );
  console.log('Successfully inserted all 4 modals into TrainingSimulatorTab (CRLF)');
} else {
  console.log('Could not find simEndTarget!');
}

fs.writeFileSync('src/app.jsx', code, 'utf8');
console.log('Updated app.jsx with all modals!');
