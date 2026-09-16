const fs = require('fs');

let content = fs.readFileSync('src/app.jsx', 'utf8');

// 1. Add acquiredItems calculation helper in App component
const acquiredItemsHelper = `
  // 6スロット編成 獲得アビリティ＆スキル一覧算出
  const acquiredItems = useMemo(() => {
    const items = [];
    slots.forEach((s, idx) => {
      if (!s.active) return;
      const card = officialCards.find(c => c.id === s.cardId);
      if (!card) return;

      if (card.skill) {
        const isSkill = ['スキル', 'シュート', 'パス', 'ドリブル', 'ディフェンス', 'GK', 'フィジカル'].includes(card.skill.type);
        items.push({
          slotId: s.id || (idx + 1),
          cardName: card.name,
          name: card.skill.name,
          rank: card.skill.rank || '銅',
          isSkill: isSkill,
          type: card.skill.type || 'アビリティ',
          desc: card.skill.description || ''
        });
      } else if (card.ability) {
        items.push({
          slotId: s.id || (idx + 1),
          cardName: card.name,
          name: card.ability,
          rank: '銅',
          isSkill: false,
          type: 'アビリティ',
          desc: ''
        });
      }
    });
    return items;
  }, [slots, officialCards]);

  // 特練適用後 合計能力実数値算出
  const baseTotalStats = useMemo(() => {
    if (!slotCalcResult || !slotCalcResult.catBaseMap) return 0;
    return Object.values(slotCalcResult.catBaseMap).reduce((a, b) => a + b, 0);
  }, [slotCalcResult]);

  const boostedTotalStats = useMemo(() => {
    return baseTotalStats + (slotCalcResult ? slotCalcResult.totalGain : 0);
  }, [baseTotalStats, slotCalcResult]);
`;

const insertTarget = `const slotCalcResult = useMemo(() => {
    return calculateBoostedPlayer(currentPlayer, slots);
  }, [currentPlayer, slots, calculateBoostedPlayer]);`;

if (content.includes(insertTarget)) {
  content = content.replace(insertTarget, insertTarget + '\n' + acquiredItemsHelper);
  console.log('Inserted acquiredItems & boostedTotalStats calculation helpers');
} else {
  console.error('insertTarget not found');
}

// 2. Remove "凸数" text and detailed stage descriptions from player rank dropdown
const rankTarget = `<span className="text-[11px] font-black text-amber-400 px-1 flex items-center gap-1 whitespace-nowrap">
                <Icon name="award" className="w-3.5 h-3.5 text-amber-400" />
                選手ランク(凸数):
              </span>
              <select
                value={simPlayerMaxEnhanced ? 'MAX' : simPlayerRarity}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'MAX') {
                    handleSimPlayerRarityChange('☆5', true);
                  } else {
                    handleSimPlayerRarityChange(val, false);
                  }
                }}
                className="bg-slate-900 text-white text-xs font-black px-2.5 py-1.5 rounded-lg border border-slate-700 focus:border-amber-400 outline-none cursor-pointer"
              >
                <option value="☆3">☆3 (無凸 / 初期)</option>
                <option value="☆3+">☆3+ (1凸)</option>
                <option value="☆3++">☆3++ (2凸)</option>
                <option value="☆4">☆4 (3凸)</option>
                <option value="☆4+">☆4+ (4凸)</option>
                <option value="☆4++">☆4++ (5凸)</option>
                <option value="☆5">☆5 (6凸 / 覚醒)</option>
                <option value="MAX">🔥 ☆5 (最大強化)</option>
              </select>`;

const rankReplacement = `<span className="text-[11px] font-black text-amber-400 px-1 flex items-center gap-1 whitespace-nowrap">
                <Icon name="award" className="w-3.5 h-3.5 text-amber-400" />
                選手ランク:
              </span>
              <select
                value={simPlayerMaxEnhanced ? 'MAX' : simPlayerRarity}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'MAX') {
                    handleSimPlayerRarityChange('☆5', true);
                  } else {
                    handleSimPlayerRarityChange(val, false);
                  }
                }}
                className="bg-slate-900 text-white text-xs font-black px-2.5 py-1.5 rounded-lg border border-slate-700 focus:border-amber-400 outline-none cursor-pointer"
              >
                <option value="☆3">☆3</option>
                <option value="☆3+">☆3+</option>
                <option value="☆3++">☆3++</option>
                <option value="☆4">☆4</option>
                <option value="☆4+">☆4+</option>
                <option value="☆4++">☆4++</option>
                <option value="☆5">☆5</option>
                <option value="MAX">🔥 ☆5 (最大強化)</option>
              </select>`;

if (content.includes(rankTarget)) {
  content = content.replace(rankTarget, rankReplacement);
  console.log('Updated player rank dropdown without 凸数 text');
} else {
  console.error('rankTarget not found');
}

// 3. Render 獲得スキル＆アビリティ一覧 at bottom of left column (after slots grid)
const gridEndTarget = `              })}
            </div>
          </div>`;

const gridEndReplacement = `              })}
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
                      {item.isSkill ? renderSkillBadge(item.rank) : renderRankBadge(item.rank)}
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
          </div>`;

if (content.includes(gridEndTarget)) {
  content = content.replace(gridEndTarget, gridEndReplacement);
  console.log('Inserted acquired items panel below slots grid');
} else {
  console.error('gridEndTarget not found');
}

// 4. Update overall panel on right column to show actual boosted stat total (実数値)
const overallTarget = `{/* 推定総合値 & 合計上昇 */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-bold text-slate-400 block">特練装着後 推定総合値</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-num font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-white">
                      {slotCalcResult.boostedOverall}
                    </span>
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      +{slotCalcResult.boostedOverall - (currentPlayer.overall || 80)} UP
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block">合計ステータス上昇値</span>
                  <span className="text-xl font-num font-black text-[#00FF66]">
                    +{slotCalcResult.totalGain} <span className="text-xs font-normal text-slate-400">(+{slotCalcResult.percentGain}%)</span>
                  </span>
                </div>
              </div>`;

const overallReplacement = `{/* 特練適用後 合計能力値（実数値） */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-bold text-slate-400 block">特練カード適用後 合計能力値 (実数値)</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-num font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-white">
                      {boostedTotalStats.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      (素: {baseTotalStats.toLocaleString()} + 特練: <span className="text-[#00FF66] font-black">+{slotCalcResult.totalGain}</span>)
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block">特練ステータス上昇合計</span>
                  <span className="text-xl font-num font-black text-[#00FF66]">
                    +{slotCalcResult.totalGain} <span className="text-xs font-normal text-slate-400">(+{slotCalcResult.percentGain}%)</span>
                  </span>
                </div>
              </div>`;

if (content.includes(overallTarget)) {
  content = content.replace(overallTarget, overallReplacement);
  console.log('Updated overall panel to show actual boosted stat total values');
} else {
  console.error('overallTarget not found');
}

fs.writeFileSync('src/app.jsx', content, 'utf8');
console.log('Successfully updated src/app.jsx with all user requested changes!');
