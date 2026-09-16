const fs = require('fs');

let content = fs.readFileSync('src/app.jsx', 'utf8');

// 1. Add optimizeSpecialCardSlots helper function near top of app.jsx or right before App component
const helperCode = `
// ─────────────────────────────────────────────────────────────
// 6スロットシミュレーター用 自動最適編成探索アルゴリズム
// ─────────────────────────────────────────────────────────────
function optimizeSpecialCardSlots(player, officialCards, options = {}) {
  const {
    targetGoal = 'TOTAL',
    targetStage = '完凸',
    requiredAbilities = [],
    requiredSkills = [],
    matchPlaystyleBonusOnly = false
  } = options;

  if (!player || !officialCards || !officialCards.length) return Array.from({ length: 6 }, (_, i) => ({ id: i + 1, active: false, cardId: '', stage: targetStage }));

  // Candidate filtering
  let candidates = officialCards.filter(c => {
    if (!c || !c.stages || !c.stages[targetStage]) return false;
    if (matchPlaystyleBonusOnly && c.playstyleBonus) {
      let isMatch = false;
      if (c.playstyleBonus.bonuses && Array.isArray(c.playstyleBonus.bonuses)) {
        isMatch = c.playstyleBonus.bonuses.some(b =>
          (player.playStyle && player.playStyle.includes(b.style)) ||
          (player.nationality && player.nationality.includes(b.style))
        );
      } else if (c.playstyleBonus.style) {
        isMatch = (player.playStyle && player.playStyle.includes(c.playstyleBonus.style)) ||
                  (player.nationality && player.nationality.includes(c.playstyleBonus.style));
      }
      if (!isMatch) return false;
    }
    return true;
  });

  // Calculate score for each card
  function getCardScore(card) {
    const stageStats = card.stages[targetStage] || card.stages['完凸'] || {};
    let bonusMult = 1.0;
    if (card.playstyleBonus) {
      if (card.playstyleBonus.bonuses && Array.isArray(card.playstyleBonus.bonuses)) {
        card.playstyleBonus.bonuses.forEach(b => {
          if ((player.playStyle && player.playStyle.includes(b.style)) ||
              (player.nationality && player.nationality.includes(b.style))) {
            bonusMult += (b.percent / 100);
          }
        });
      } else if ((player.playStyle && player.playStyle.includes(card.playstyleBonus.style)) ||
                 (player.nationality && player.nationality.includes(card.playstyleBonus.style))) {
        bonusMult += (card.playstyleBonus.percent / 100);
      }
    }

    let score = 0;
    Object.entries(stageStats).forEach(([stName, val]) => {
      const boosted = val * bonusMult;
      if (targetGoal === 'TOTAL') {
        score += boosted;
      } else if (targetGoal === 'shoot' && ['決定力', 'キック力', '冷静さ'].includes(stName)) {
        score += boosted * 3.0;
      } else if (targetGoal === 'pass' && ['ショートパス', 'ロングパス', 'パス精度', 'キック精度'].includes(stName)) {
        score += boosted * 3.0;
      } else if (targetGoal === 'dribble' && ['突破力', 'キープ力', 'キープ', 'ボールタッチ'].includes(stName)) {
        score += boosted * 3.0;
      } else if (targetGoal === 'defense' && ['タックル', 'パスカット', 'マーク', 'セービング'].includes(stName)) {
        score += boosted * 3.0;
      } else if (targetGoal === 'physical' && ['ジャンプ', 'コンタクト', 'スタミナ'].includes(stName)) {
        score += boosted * 3.0;
      } else if (targetGoal === 'speed' && ['走力', '敏捷性'].includes(stName)) {
        score += boosted * 3.0;
      } else {
        score += boosted;
      }
    });

    return score;
  }

  // Card abilities helper
  function getCardAbilities(c) {
    const abs = [];
    if (c.skill && c.skill.type !== 'スキル') {
      abs.push(\`\${c.skill.rank || ''} \${c.skill.name}\`.trim());
      abs.push(c.skill.name);
    }
    if (c.ability) abs.push(c.ability);
    if (c.abilities) {
      if (Array.isArray(c.abilities)) c.abilities.forEach(a => abs.push(typeof a === 'string' ? a : a.name));
    }
    return abs;
  }

  // Card skill helper
  function getCardSkillName(c) {
    if (c.skill && ['スキル', 'シュート', 'パス', 'ドリブル', 'ディフェンス', 'GK', 'フィジカル'].includes(c.skill.type)) {
      return c.skill.name;
    }
    return null;
  }

  const selectedCards = [];
  const usedCardIds = new Set();

  // 1. Required abilities selection
  for (const reqAbs of requiredAbilities) {
    const matching = candidates
      .filter(c => !usedCardIds.has(c.id) && getCardAbilities(c).some(a => a.includes(reqAbs) || reqAbs.includes(a)))
      .sort((a, b) => getCardScore(b) - getCardScore(a));

    if (matching.length > 0) {
      const best = matching[0];
      selectedCards.push(best);
      usedCardIds.add(best.id);
    }
  }

  // 2. Required skills selection
  for (const reqSkill of requiredSkills) {
    const matching = candidates
      .filter(c => !usedCardIds.has(c.id) && getCardSkillName(c) === reqSkill)
      .sort((a, b) => getCardScore(b) - getCardScore(a));

    if (matching.length > 0) {
      const best = matching[0];
      selectedCards.push(best);
      usedCardIds.add(best.id);
    }
  }

  // 3. Fill remaining slots with highest scoring cards
  const remainingCandidates = candidates
    .filter(c => !usedCardIds.has(c.id))
    .sort((a, b) => getCardScore(b) - getCardScore(a));

  while (selectedCards.length < 6 && remainingCandidates.length > 0) {
    const top = remainingCandidates.shift();
    selectedCards.push(top);
    usedCardIds.add(top.id);
  }

  // Return slot objects
  return Array.from({ length: 6 }, (_, i) => {
    const card = selectedCards[i] || candidates[i] || officialCards[0];
    return {
      id: i + 1,
      active: true,
      cardId: card ? card.id : officialCards[0].id,
      stage: targetStage
    };
  });
}
`;

// Insert helperCode before App function definition
const appFnIdx = content.indexOf('function App()');
if (appFnIdx !== -1) {
  content = content.slice(0, appFnIdx) + helperCode + '\n\n' + content.slice(appFnIdx);
  console.log('Inserted optimizeSpecialCardSlots helper code before App()');
} else {
  console.error('function App() not found!');
}

// 2. Add state [isAutoSelectModalOpen, setIsAutoSelectModalOpen] = useState(false);
const stateTarget = `const [limitGaugeMode, setLimitGaugeMode] = useState('category'); // 'category' | 'detail'`;
const stateReplacement = `const [limitGaugeMode, setLimitGaugeMode] = useState('category'); // 'category' | 'detail'
  const [isAutoSelectModalOpen, setIsAutoSelectModalOpen] = useState(false);`;

if (content.includes(stateTarget)) {
  content = content.replace(stateTarget, stateReplacement);
  console.log('Added isAutoSelectModalOpen state');
} else {
  console.error('stateTarget not found');
}

// 3. Add ⚡ 自動最適編成 button in Sub-Tab 1 quick presets bar
const buttonTarget = `<button onClick={() => applyPreset('ALL_MAX')} className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow cursor-pointer">🔥 6枠 完凸全セット</button>`;
const buttonReplacement = `<button onClick={() => setIsAutoSelectModalOpen(true)} className="px-3 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow cursor-pointer flex items-center gap-1">⚡ 自動最適編成</button>
                <button onClick={() => applyPreset('ALL_MAX')} className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow cursor-pointer">🔥 6枠 完凸全セット</button>`;

if (content.includes(buttonTarget)) {
  content = content.replace(buttonTarget, buttonReplacement);
  console.log('Added AutoSelect button in quick action bar');
} else {
  console.error('buttonTarget not found');
}

// 4. Render AutoSelectModal in App JSX where modals are rendered
const modalRenderTarget = `{isCardCompareModalOpen && selectedCompareCardIds.length > 0 && (
        <CardCompareModal
          compareCardIds={selectedCompareCardIds}
          officialCards={officialCards}
          onClose={() => setIsCardCompareModalOpen(false)}
          onRemoveCard={(id) => setSelectedCompareCardIds(prev => prev.filter(cId => cId !== id))}
          onClearAll={() => setSelectedCompareCardIds([])}
        />
      )}`;

const modalRenderReplacement = `{isCardCompareModalOpen && selectedCompareCardIds.length > 0 && (
        <CardCompareModal
          compareCardIds={selectedCompareCardIds}
          officialCards={officialCards}
          onClose={() => setIsCardCompareModalOpen(false)}
          onRemoveCard={(id) => setSelectedCompareCardIds(prev => prev.filter(cId => cId !== id))}
          onClearAll={() => setSelectedCompareCardIds([])}
        />
      )}

      {/* 自動最適編成モーダル */}
      <AutoSelectModal
        isOpen={isAutoSelectModalOpen}
        onClose={() => setIsAutoSelectModalOpen(false)}
        onApply={(newSlots) => setSlots(newSlots)}
        currentPlayer={currentPlayer}
        officialCards={officialCards}
        calculateBoostedPlayer={calculateBoostedPlayer}
      />`;

if (content.includes(modalRenderTarget)) {
  content = content.replace(modalRenderTarget, modalRenderReplacement);
  console.log('Rendered AutoSelectModal in App JSX');
} else {
  console.error('modalRenderTarget not found');
}

// 5. Append AutoSelectModal component definition at the end of app.jsx
const autoSelectModalComponentCode = `

// ─────────────────────────────────────────────────────────────
// COMPONENT: 自動最適編成ダイアログ (AutoSelectModal)
// ─────────────────────────────────────────────────────────────
function AutoSelectModal({ isOpen, onClose, onApply, currentPlayer, officialCards, calculateBoostedPlayer }) {
  if (!isOpen || !currentPlayer) return null;

  const [targetGoal, setTargetGoal] = useState('TOTAL');
  const [targetStage, setTargetStage] = useState('完凸');
  const [matchPlaystyleBonusOnly, setMatchPlaystyleBonusOnly] = useState(false);
  const [selectedAbilities, setSelectedAbilities] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [abilitySearchText, setAbilitySearchText] = useState('');
  const [skillSearchText, setSkillSearchText] = useState('');
  const [showAbilityDropdown, setShowAbilityDropdown] = useState(false);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);

  const { availableAbilities, availableSkills } = useMemo(() => {
    const absSet = new Set();
    const sksSet = new Set();

    (officialCards || []).forEach(c => {
      if (!c) return;
      if (c.skill) {
        if (['スキル', 'シュート', 'パス', 'ドリブル', 'ディフェンス', 'GK', 'フィジカル'].includes(c.skill.type)) {
          if (c.skill.name) sksSet.add(c.skill.name);
        } else {
          if (c.skill.name) {
            const fullName = \`\${c.skill.rank || ''} \${c.skill.name}\`.trim();
            absSet.add(fullName);
            absSet.add(c.skill.name);
          }
        }
      }
      if (c.ability) absSet.add(c.ability);
      if (c.abilities) {
        if (Array.isArray(c.abilities)) c.abilities.forEach(a => absSet.add(typeof a === 'string' ? a : a.name));
      }
    });

    return {
      availableAbilities: Array.from(absSet).sort(),
      availableSkills: Array.from(sksSet).sort()
    };
  }, [officialCards]);

  const optimizedSlots = useMemo(() => {
    return optimizeSpecialCardSlots(currentPlayer, officialCards, {
      targetGoal,
      targetStage,
      requiredAbilities: selectedAbilities,
      requiredSkills: selectedSkills,
      matchPlaystyleBonusOnly
    });
  }, [currentPlayer, officialCards, targetGoal, targetStage, selectedAbilities, selectedSkills, matchPlaystyleBonusOnly]);

  const previewCalc = useMemo(() => {
    if (!optimizedSlots || !calculateBoostedPlayer) return null;
    return calculateBoostedPlayer(currentPlayer, optimizedSlots);
  }, [currentPlayer, optimizedSlots, calculateBoostedPlayer]);

  const addAbility = (ab) => {
    if (!selectedAbilities.includes(ab)) {
      setSelectedAbilities([...selectedAbilities, ab]);
    }
    setAbilitySearchText('');
    setShowAbilityDropdown(false);
  };

  const removeAbility = (ab) => {
    setSelectedAbilities(selectedAbilities.filter(a => a !== ab));
  };

  const addSkill = (sk) => {
    if (!selectedSkills.includes(sk)) {
      setSelectedSkills([...selectedSkills, sk]);
    }
    setSkillSearchText('');
    setShowSkillDropdown(false);
  };

  const removeSkill = (sk) => {
    setSelectedSkills(selectedSkills.filter(s => s !== sk));
  };

  const filteredAbilities = availableAbilities.filter(a =>
    !selectedAbilities.includes(a) && (!abilitySearchText || a.toLowerCase().includes(abilitySearchText.toLowerCase()))
  );

  const filteredSkills = availableSkills.filter(s =>
    !selectedSkills.includes(s) && (!skillSearchText || s.toLowerCase().includes(skillSearchText.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/40 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg">
              ⚡
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                特練カード 自動最適編成
              </h2>
              <p className="text-xs text-amber-300/80 font-bold">
                対象: <span className="text-white font-black">{currentPlayer.name}</span> ({currentPlayer.mainPosition} / {currentPlayer.playStyle || 'プレイスタイル未設定'})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-slate-700">
          {/* 条件設定エリア */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
            {/* 1. 重視パラメータ */}
            <div>
              <label className="block text-xs font-black text-amber-400 mb-1.5 flex items-center gap-1">
                <Icon name="target" className="w-3.5 h-3.5" />
                強化目標・重視パラメータ
              </label>
              <select
                value={targetGoal}
                onChange={e => setTargetGoal(e.target.value)}
                className="w-full bg-slate-900 text-white text-xs font-bold p-2.5 rounded-xl border border-slate-700 focus:border-amber-400 outline-none cursor-pointer"
              >
                <option value="TOTAL">🔥 総合能力UP 最大化 (バランス最適)</option>
                <option value="shoot">⚽ シュート重視 (決定力・キック力・冷静さ)</option>
                <option value="pass">🎯 パス重視 (ショートパス・ロングパス・精度)</option>
                <option value="dribble">⚡ ドリブル重視 (突破力・キープ・タッチ)</option>
                <option value="defense">🛡️ ディフェンス重視 (タックル・パスカット・マーク/セービング)</option>
                <option value="physical">💪 フィジカル重視 (ジャンプ・コンタクト・スタミナ)</option>
                <option value="speed">🏃 スピード重視 (走力・敏捷性)</option>
              </select>
            </div>

            {/* 2. 凸数設定 & ボーナスチェック */}
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-black text-amber-400 mb-1.5 flex items-center gap-1">
                  <Icon name="award" className="w-3.5 h-3.5" />
                  参照カード凸数 (突破ランク)
                </label>
                <select
                  value={targetStage}
                  onChange={e => setTargetStage(e.target.value)}
                  className="w-full bg-slate-900 text-white text-xs font-bold p-2.5 rounded-xl border border-slate-700 focus:border-amber-400 outline-none cursor-pointer"
                >
                  <option value="完凸">完凸 (最大強化)</option>
                  <option value="3凸">3凸</option>
                  <option value="2凸">2凸</option>
                  <option value="1凸">1凸</option>
                  <option value="無凸">無凸</option>
                </select>
              </div>

              <label className="flex items-center gap-2 pt-1 text-xs text-slate-300 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={matchPlaystyleBonusOnly}
                  onChange={e => setMatchPlaystyleBonusOnly(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
                <span>ボーナス対象カードのみに限定 (プレイスタイル/国籍)</span>
              </label>
            </div>

            {/* 3. 必須アビリティ指定 */}
            <div className="relative">
              <label className="block text-xs font-black text-amber-400 mb-1.5 flex items-center gap-1">
                <Icon name="shield" className="w-3.5 h-3.5" />
                必須アビリティの選択 (複数指定可)
              </label>

              <div className="flex flex-wrap gap-1.5 mb-2">
                {selectedAbilities.map(ab => (
                  <span key={ab} className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                    {ab}
                    <button onClick={() => removeAbility(ab)} className="hover:text-white font-black">✕</button>
                  </span>
                ))}
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="アビリティ名で検索・追加..."
                  value={abilitySearchText}
                  onFocus={() => setShowAbilityDropdown(true)}
                  onChange={e => { setAbilitySearchText(e.target.value); setShowAbilityDropdown(true); }}
                  className="w-full bg-slate-900 text-white text-xs font-bold p-2.5 rounded-xl border border-slate-700 focus:border-amber-400 outline-none"
                />
                {showAbilityDropdown && filteredAbilities.length > 0 && (
                  <div className="absolute z-20 left-0 right-0 top-full mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
                    {filteredAbilities.map(ab => (
                      <div
                        key={ab}
                        onClick={() => addAbility(ab)}
                        className="p-2 text-xs text-slate-200 hover:bg-amber-500/20 hover:text-amber-300 font-bold cursor-pointer transition-colors border-b border-slate-800/60 last:border-0"
                      >
                        + {ab}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 4. 必須スキル指定 */}
            <div className="relative">
              <label className="block text-xs font-black text-amber-400 mb-1.5 flex items-center gap-1">
                <Icon name="zap" className="w-3.5 h-3.5" />
                必須スキルの選択 (複数指定可)
              </label>

              <div className="flex flex-wrap gap-1.5 mb-2">
                {selectedSkills.map(sk => (
                  <span key={sk} className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                    {sk}
                    <button onClick={() => removeSkill(sk)} className="hover:text-white font-black">✕</button>
                  </span>
                ))}
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="スキル名で検索・追加..."
                  value={skillSearchText}
                  onFocus={() => setShowSkillDropdown(true)}
                  onChange={e => { setSkillSearchText(e.target.value); setShowSkillDropdown(true); }}
                  className="w-full bg-slate-900 text-white text-xs font-bold p-2.5 rounded-xl border border-slate-700 focus:border-amber-400 outline-none"
                />
                {showSkillDropdown && filteredSkills.length > 0 && (
                  <div className="absolute z-20 left-0 right-0 top-full mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
                    {filteredSkills.map(sk => (
                      <div
                        key={sk}
                        onClick={() => addSkill(sk)}
                        className="p-2 text-xs text-slate-200 hover:bg-emerald-500/20 hover:text-emerald-300 font-bold cursor-pointer transition-colors border-b border-slate-800/60 last:border-0"
                      >
                        + {sk}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 自動選出結果 プレビュー */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                選出結果プレビュー (上位6枚セット)
              </h3>
              {previewCalc && (
                <div className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  予想合計上昇量: +{previewCalc.totalGain} UP
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {optimizedSlots.map((s, idx) => {
                const card = officialCards.find(c => c.id === s.cardId) || officialCards[0];
                const isBonusMatch = card && card.playstyleBonus && (
                  (currentPlayer.playStyle && currentPlayer.playStyle.includes(card.playstyleBonus.style)) ||
                  (currentPlayer.nationality && currentPlayer.nationality.includes(card.playstyleBonus.style))
                );

                return (
                  <div key={idx} className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                        スロット {idx + 1}
                      </span>
                      {isBonusMatch && (
                        <span className="text-[10px] font-black text-[#00FF66] bg-[#00FF66]/10 px-1.5 py-0.2 rounded border border-[#00FF66]/30">
                          🎯 ボーナス適合
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex-shrink-0 flex items-center justify-center font-black text-xs text-amber-300">
                        {card.rank}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-black text-white truncate">{card.name}</div>
                        <div className="text-[11px] text-amber-300 font-bold truncate">
                          {card.skill ? card.skill.name : (card.ability || 'アビリティなし')}
                        </div>
                        {card.skill && card.skill.rank && (
                          <div className="text-[10px] text-slate-400 font-bold">
                            {card.skill.rank}アビリティ
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
          >
            キャンセル
          </button>

          <button
            onClick={() => {
              onApply(optimizedSlots);
              onClose();
            }}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2"
          >
            ⚡ この6枚をスロットに適用する
          </button>
        </div>
      </div>
    </div>
  );
}
`;

content += autoSelectModalComponentCode;

fs.writeFileSync('src/app.jsx', content, 'utf8');
console.log('Successfully updated src/app.jsx with auto-select feature!');
