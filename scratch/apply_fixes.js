const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, '..', 'src', 'app.jsx');
let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');

console.log('=== Applying Condition & Saved Builds Modal Fixes ===');

// 1. Fix calculateBoostedPlayer dependency array
if (jsxCode.includes('}, [officialCards, currentPlayer]);')) {
  jsxCode = jsxCode.replace(
    '}, [officialCards, currentPlayer]);',
    '}, [officialCards, currentPlayer, conditionMultiplier]);'
  );
  console.log('✅ 1. Updated calculateBoostedPlayer dependency array to include conditionMultiplier');
} else {
  console.log('⚠️ Warning: calculateBoostedPlayer dependency array already updated or string not matched');
}

// 2. Add Save Build Modal & Saved Builds List Modal JSX
const targetModalCode = `{/* 2.5 所持カード＆凸数管理モーダル */}
      {isOwnedCardsModalOpen && (
        <OwnedCardsManagerModal
          isOpen={isOwnedCardsModalOpen}
          onClose={() => setIsOwnedCardsModalOpen(false)}
          officialCards={officialCards}
          ownedCards={ownedCards}
          onSave={saveOwnedCards}
        />
      )}`;

const replacementModalCode = `{/* 2.5 所持カード＆凸数管理モーダル */}
      {isOwnedCardsModalOpen && (
        <OwnedCardsManagerModal
          isOpen={isOwnedCardsModalOpen}
          onClose={() => setIsOwnedCardsModalOpen(false)}
          officialCards={officialCards}
          ownedCards={ownedCards}
          onSave={saveOwnedCards}
        />
      )}

      {/* 2.6 マイ編成保存モーダル */}
      {isSaveBuildModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>💾</span> マイ編成の保存
              </h3>
              <button onClick={() => setIsSaveBuildModalOpen(false)} className="text-slate-400 hover:text-white font-bold text-lg cursor-pointer">✕</button>
            </div>
            <p className="text-xs text-slate-300 font-bold">
              現在の6スロットカード編成に名前を付けて保存します。
            </p>
            <div>
              <label className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1">編成名</label>
              <input
                type="text"
                value={saveBuildNameInput}
                onChange={(e) => setSaveBuildNameInput(e.target.value)}
                placeholder="例: メッシ 決定力・キック力特化"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-amber-400"
                autoFocus
              />
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsSaveBuildModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
              >
                キャンセル
              </button>
              <button
                onClick={handleSaveBuildConfirm}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                保存する
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2.7 マイ編成一覧モーダル */}
      {isSavedBuildsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">📂</span>
                <div>
                  <h3 className="text-lg font-black text-white">マイ編成一覧</h3>
                  <p className="text-[11px] text-slate-400 font-bold">保存された特練カード編成 ({savedBuilds.length}件)</p>
                </div>
              </div>
              <button onClick={() => setIsSavedBuildsModalOpen(false)} className="text-slate-400 hover:text-white font-bold text-lg cursor-pointer">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
              {savedBuilds.length === 0 ? (
                <div className="text-center py-12 text-slate-500 font-bold text-sm">
                  保存されたマイ編成はありません。<br />
                  6スロットを組んで「マイ編成保存」ボタンを押してください。
                </div>
              ) : (
                savedBuilds.map((build) => (
                  <div key={build.id} className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-all space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-black text-amber-300 flex items-center gap-2">
                          {build.name}
                          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">{build.playerName || '選手'}</span>
                        </h4>
                        <span className="text-[10px] text-slate-500 font-bold">{new Date(build.createdAt).toLocaleString('ja-JP')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { handleLoadBuildToA(build); setIsSavedBuildsModalOpen(false); }}
                          className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-black transition-all cursor-pointer"
                        >
                          ビルドAに適用
                        </button>
                        <button
                          onClick={() => { handleLoadBuildToB(build); setIsSavedBuildsModalOpen(false); }}
                          className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-black transition-all cursor-pointer"
                        >
                          ビルドBに適用
                        </button>
                        <button
                          onClick={() => handleDeleteSavedBuild(build.id)}
                          className="px-2.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-all cursor-pointer"
                          title="削除"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    {/* 6 Cards Mini Icons */}
                    <div className="grid grid-cols-6 gap-2">
                      {(build.slots || []).map((s, idx) => {
                        const card = officialCards.find(c => c.id === s.cardId);
                        const img = card?.getImageUrl ? card.getImageUrl() : '';
                        return (
                          <div key={idx} className="relative aspect-[3/4] bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col justify-between p-1">
                            {img ? (
                              <img src={img} alt={card?.name} className="w-full h-full object-cover rounded" />
                            ) : (
                              <span className="text-[8px] text-slate-300 font-bold text-center my-auto truncate">{card?.name || '空'}</span>
                            )}
                            <span className="absolute bottom-0 right-0 text-[8px] font-black bg-amber-500 text-slate-950 px-1 rounded-tl">{s.stage || '完凸'}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsSavedBuildsModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}`;

if (jsxCode.includes(targetModalCode)) {
  jsxCode = jsxCode.replace(targetModalCode, replacementModalCode);
  console.log('✅ 2. Added Save Build Modal and Saved Builds Modal to app.jsx!');
} else {
  console.log('⚠️ Target modal code not matched exactly');
}

fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');
console.log('🎉 APP.JSX UPDATED SUCCESSFULLY!');
