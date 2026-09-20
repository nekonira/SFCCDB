const fs = require('fs');

let appCode = fs.readFileSync('src/app.jsx', 'utf8');

// 1. 6枠完凸全セット ボタン削除 ＆ ボタン名・テキスト変更 (自動最適編成 -> 最大数値編成)
appCode = appCode.replace(
  `                  <button\r\n                    type="button"\r\n                    onClick={() => applyPreset('ALL_MAX')}\r\n                    className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs cursor-pointer"\r\n                  >\r\n                    🔥 6枠 完凸全セット\r\n                  </button>`,
  ''
);

appCode = appCode.replace(
  `                  <button\n                    type="button"\n                    onClick={() => applyPreset('ALL_MAX')}\n                    className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs cursor-pointer"\n                  >\n                    🔥 6枠 完凸全セット\n                  </button>`,
  ''
);

// テキスト置換: 自動最適編成 ＆ プリセット: -> 最大数値編成 ＆ プリセット:
appCode = appCode.replace(
  '自動最適編成 ＆ プリセット:',
  '最大数値編成 ＆ プリセット:'
);

// テキスト置換: ⚡ 自動最適編成 -> ⚡ 最大数値編成
appCode = appCode.replace(
  '⚡ 自動最適編成',
  '⚡ 最大数値編成'
);

// テキスト置換: 特練カード 自動最適編成 -> 特練カード 最大数値編成
appCode = appCode.replace(
  '特練カード 自動最適編成',
  '特練カード 最大数値編成'
);

// テキスト置換: 🔥 有効上昇量 最大化 (限界値溢れ無効化) -> 🔥 最大数値編成 (限界値溢れ無効化)
appCode = appCode.replace(
  '🔥 有効上昇量 最大化 (限界値溢れ無効化)',
  '🔥 最大数値編成 (限界値溢れ無効化)'
);

// トーストメッセージ置換
appCode = appCode.replace(
  '⚡ 有効上昇量を最大化する【自動最適編成】を直接適用しました！',
  '⚡ 【最大数値編成】を直接適用しました！'
);

// 2. CardCompareModal の挿入 & 浮動比較バーの追加
const endSimulatorTarget = '            </div>\r\n          </div>\r\n        </div>\r\n      )}\r\n    </div>\r\n  );';
const endSimulatorTargetLf = '            </div>\n          </div>\n        </div>\n      )}\n    </div>\n  );';

const compareModalInsertion = `
      {/* 浮動 比較バー (カードが1枚以上選択されている場合) */}
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
    </div>
  );`;

if (appCode.includes(endSimulatorTarget)) {
  appCode = appCode.replace(endSimulatorTarget, '            </div>\r\n          </div>\r\n        </div>\r\n      )}' + compareModalInsertion);
  console.log('Inserted CardCompareModal (CRLF)');
} else if (appCode.includes(endSimulatorTargetLf)) {
  appCode = appCode.replace(endSimulatorTargetLf, '            </div>\n          </div>\n        </div>\n      )}' + compareModalInsertion);
  console.log('Inserted CardCompareModal (LF)');
} else {
  console.log('Warning: Could not find endSimulatorTarget');
}

fs.writeFileSync('src/app.jsx', appCode, 'utf8');
console.log('Updated app.jsx successfully!');
