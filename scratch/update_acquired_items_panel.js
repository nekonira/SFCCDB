const fs = require('fs');

let content = fs.readFileSync('src/app.jsx', 'utf8');

// Find right column start
const rightColStr = `<div className="lg:col-span-5 space-y-4">`;
const idx = content.indexOf(rightColStr);
if (idx === -1) {
  console.error('rightColStr not found');
  process.exit(1);
}

const acquiredPanelCode = `<div className="lg:col-span-5 space-y-4">
            {/* 🎴 6スロット編成 獲得スキル ＆ アビリティ一覧 (右カラム最上部に常時固定表示) */}
            <div className="glass-panel p-5 rounded-3xl border border-amber-500/40 shadow-2xl space-y-3.5 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-black text-sm shadow">
                    🎴
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                      編成中カードの獲得スキル ＆ アビリティ一覧
                    </h4>
                    <p className="text-[10px] text-amber-300/80 font-bold">
                      セット中の特練カードから得られる効果・アビリティ一覧
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  計 {acquiredItems.length} 件 習得中
                </span>
              </div>

              {acquiredItems.length === 0 ? (
                <div className="p-5 text-center text-xs text-slate-400 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
                  <p className="font-bold text-slate-300">アクティブな特練スロットがありません。</p>
                  <p className="text-[11px] text-slate-500">特練カードをセットすると、発動スキルおよびアビリティ効果がここに一覧表示されます。</p>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700 divide-y divide-slate-800/80">
                  {acquiredItems.map((item, idx) => (
                    <div key={idx} className="pt-2.5 first:pt-0 flex items-start gap-2.5">
                      <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                        {item.isSkill ? (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                            【スキル】
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            【アビリティ】
                          </span>
                        )}
                        {item.isSkill ? renderSkillBadge(item.rank) : renderRankBadge(item.rank)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-black text-white truncate">{item.name}</span>
                          <span className="text-[10px] text-amber-400 font-extrabold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 flex-shrink-0">
                            スロット {item.slotId}
                          </span>
                        </div>
                        {item.desc && (
                          <p className="text-[11px] text-amber-300/90 font-bold mt-0.5 leading-snug">
                            {item.desc}
                          </p>
                        )}
                        <div className="text-[10px] text-slate-400 font-semibold truncate mt-1">
                          提供元: {item.cardName}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>`;

content = content.replace(rightColStr, acquiredPanelCode);
fs.writeFileSync('src/app.jsx', content, 'utf8');
console.log('Successfully placed acquired items panel at top of right column in app.jsx');
