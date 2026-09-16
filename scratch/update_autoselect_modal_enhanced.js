const fs = require('fs');

let content = fs.readFileSync('src/app.jsx', 'utf8');

const targetStr = `// ─────────────────────────────────────────────────────────────
// COMPONENT: 自動最適編成ダイアログ (AutoSelectModal)
// ─────────────────────────────────────────────────────────────`;

const modalIdx = content.indexOf(targetStr);
if (modalIdx === -1) {
  console.error('Target str not found!');
  process.exit(1);
}

const newAutoSelectModalCode = `// ─────────────────────────────────────────────────────────────
// COMPONENT: 自動最適編成ダイアログ (AutoSelectModal - ランク視覚化対応)
// ─────────────────────────────────────────────────────────────
function renderRankBadge(rank) {
  if (rank === '虹') {
    return (
      <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-md text-[10px] shadow-sm tracking-wide border border-purple-300 flex items-center gap-0.5 flex-shrink-0">
        🌈 虹
      </span>
    );
  }
  if (rank === '金') {
    return (
      <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-md text-[10px] shadow-sm tracking-wide border border-yellow-300 flex items-center gap-0.5 flex-shrink-0">
        👑 金
      </span>
    );
  }
  if (rank === '銀') {
    return (
      <span className="bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 text-slate-950 font-black px-2 py-0.5 rounded-md text-[10px] shadow-sm tracking-wide border border-slate-100 flex items-center gap-0.5 flex-shrink-0">
        🥈 銀
      </span>
    );
  }
  if (rank === '銅') {
    return (
      <span className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-amber-100 font-black px-2 py-0.5 rounded-md text-[10px] shadow-sm tracking-wide border border-amber-600/60 flex items-center gap-0.5 flex-shrink-0">
        🥉 銅
      </span>
    );
  }
  if (rank === '特殊効果' || rank === '特殊') {
    return (
      <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-black px-2 py-0.5 rounded-md text-[10px] shadow-sm tracking-wide border border-indigo-400 flex items-center gap-0.5 flex-shrink-0">
        ✨ 特殊
      </span>
    );
  }
  return (
    <span className="bg-slate-700 text-slate-200 font-bold px-2 py-0.5 rounded-md text-[10px] flex-shrink-0">
      {rank || '通常'}
    </span>
  );
}

function renderSkillBadge(rank) {
  if (rank === '金') {
    return (
      <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-md text-[10px] shadow-sm tracking-wide border border-yellow-300 flex items-center gap-0.5 flex-shrink-0">
        ⚡ 金
      </span>
    );
  }
  if (rank === '銀') {
    return (
      <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black px-2 py-0.5 rounded-md text-[10px] shadow-sm flex items-center gap-0.5 flex-shrink-0">
        ⚡ 銀
      </span>
    );
  }
  if (rank === '銅') {
    return (
      <span className="bg-gradient-to-r from-amber-700 to-amber-800 text-amber-100 font-black px-2 py-0.5 rounded-md text-[10px] shadow-sm border border-amber-600 flex items-center gap-0.5 flex-shrink-0">
        ⚡ 銅
      </span>
    );
  }
  return (
    <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black px-2 py-0.5 rounded-md text-[10px] shadow-sm flex items-center gap-0.5 flex-shrink-0">
      ⚡ スキル
    </span>
  );
}

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

  // 全カードから構造化アビリティ/スキル一覧を抽出＆ランク順ソート
  const { availableAbilities, availableSkills } = useMemo(() => {
    const abilityMap = new Map();
    const skillMap = new Map();

    (officialCards || []).forEach(c => {
      if (!c || !c.skill) return;
      const s = c.skill;
      const rank = s.rank || '銅';

      if (['スキル', 'シュート', 'パス', 'ドリブル', 'ディフェンス', 'GK', 'フィジカル'].includes(s.type)) {
        if (s.name && !skillMap.has(s.name)) {
          skillMap.set(s.name, {
            name: s.name,
            rank: rank,
            type: 'スキル',
            cardNames: [c.name],
            desc: s.description || ''
          });
        } else if (s.name) {
          const item = skillMap.get(s.name);
          if (!item.cardNames.includes(c.name)) item.cardNames.push(c.name);
        }
      } else {
        // アビリティ
        const name = s.name;
        const key = \`\${rank} \${name}\`;
        if (!abilityMap.has(key)) {
          abilityMap.set(key, {
            key: key,
            name: name,
            rank: rank,
            type: 'アビリティ',
            cardNames: [c.name],
            desc: s.description || ''
          });
        } else {
          const item = abilityMap.get(key);
          if (!item.cardNames.includes(c.name)) item.cardNames.push(c.name);
        }
      }
    });

    const RANK_WEIGHTS = { '虹': 1, '金': 2, '銀': 3, '銅': 4, '特殊効果': 5, '特殊': 5 };

    const absList = Array.from(abilityMap.values()).sort((a, b) => {
      const rA = RANK_WEIGHTS[a.rank] || 9;
      const rB = RANK_WEIGHTS[b.rank] || 9;
      if (rA !== rB) return rA - rB;
      return a.name.localeCompare(b.name, 'ja');
    });

    const sksList = Array.from(skillMap.values()).sort((a, b) => {
      const rA = RANK_WEIGHTS[a.rank] || 9;
      const rB = RANK_WEIGHTS[b.rank] || 9;
      if (rA !== rB) return rA - rB;
      return a.name.localeCompare(b.name, 'ja');
    });

    return { availableAbilities: absList, availableSkills: sksList };
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

  const addAbility = (abKey) => {
    if (!selectedAbilities.includes(abKey)) {
      setSelectedAbilities([...selectedAbilities, abKey]);
    }
    setAbilitySearchText('');
    setShowAbilityDropdown(false);
  };

  const removeAbility = (abKey) => {
    setSelectedAbilities(selectedAbilities.filter(a => a !== abKey));
  };

  const addSkill = (skName) => {
    if (!selectedSkills.includes(skName)) {
      setSelectedSkills([...selectedSkills, skName]);
    }
    setSkillSearchText('');
    setShowSkillDropdown(false);
  };

  const removeSkill = (skName) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skName));
  };

  const filteredAbilities = availableAbilities.filter(ab => {
    if (selectedAbilities.includes(ab.key)) return false;
    if (!abilitySearchText) return true;
    const q = abilitySearchText.toLowerCase();
    return ab.key.toLowerCase().includes(q) || ab.name.toLowerCase().includes(q) || ab.cardNames.some(c => c.toLowerCase().includes(q));
  });

  const filteredSkills = availableSkills.filter(sk => {
    if (selectedSkills.includes(sk.name)) return false;
    if (!skillSearchText) return true;
    const q = skillSearchText.toLowerCase();
    return sk.name.toLowerCase().includes(q) || sk.cardNames.some(c => c.toLowerCase().includes(q));
  });

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
                必須アビリティの選択 (ランク視覚化対応)
              </label>

              {/* Chips */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {selectedAbilities.map(abKey => {
                  const item = availableAbilities.find(a => a.key === abKey || a.name === abKey);
                  const rank = item ? item.rank : '銅';
                  const name = item ? item.name : abKey;

                  return (
                    <span key={abKey} className="bg-slate-950 border border-slate-700 text-white text-xs font-black px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow-md">
                      {renderRankBadge(rank)}
                      <span>{name}</span>
                      <button onClick={() => removeAbility(abKey)} className="hover:text-red-400 font-black text-slate-400 ml-1">✕</button>
                    </span>
                  );
                })}
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="アビリティ名 / カード名で検索..."
                  value={abilitySearchText}
                  onFocus={() => setShowAbilityDropdown(true)}
                  onChange={e => { setAbilitySearchText(e.target.value); setShowAbilityDropdown(true); }}
                  className="w-full bg-slate-900 text-white text-xs font-bold p-2.5 rounded-xl border border-slate-700 focus:border-amber-400 outline-none"
                />
                {showAbilityDropdown && filteredAbilities.length > 0 && (
                  <div className="absolute z-30 left-0 right-0 top-full mt-1 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 divide-y divide-slate-800">
                    {filteredAbilities.map(ab => (
                      <div
                        key={ab.key}
                        onClick={() => addAbility(ab.key)}
                        className="p-2.5 hover:bg-amber-500/15 cursor-pointer transition-all space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          {renderRankBadge(ab.rank)}
                          <span className="font-black text-white text-xs">{ab.name}</span>
                        </div>
                        {ab.desc && (
                          <div className="text-[11px] text-amber-300/90 font-bold truncate">
                            {ab.desc}
                          </div>
                        )}
                        {ab.cardNames && ab.cardNames.length > 0 && (
                          <div className="text-[10px] text-slate-400 font-semibold truncate">
                            カード: {ab.cardNames.join(', ')}
                          </div>
                        )}
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
                必須スキルの選択 (ランク視覚化対応)
              </label>

              {/* Chips */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {selectedSkills.map(skName => {
                  const item = availableSkills.find(s => s.name === skName);
                  const rank = item ? item.rank : '金';

                  return (
                    <span key={skName} className="bg-slate-950 border border-slate-700 text-white text-xs font-black px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow-md">
                      {renderSkillBadge(rank)}
                      <span>{skName}</span>
                      <button onClick={() => removeSkill(skName)} className="hover:text-red-400 font-black text-slate-400 ml-1">✕</button>
                    </span>
                  );
                })}
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="スキル名 / カード名で検索..."
                  value={skillSearchText}
                  onFocus={() => setShowSkillDropdown(true)}
                  onChange={e => { setSkillSearchText(e.target.value); setShowSkillDropdown(true); }}
                  className="w-full bg-slate-900 text-white text-xs font-bold p-2.5 rounded-xl border border-slate-700 focus:border-amber-400 outline-none"
                />
                {showSkillDropdown && filteredSkills.length > 0 && (
                  <div className="absolute z-30 left-0 right-0 top-full mt-1 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 divide-y divide-slate-800">
                    {filteredSkills.map(sk => (
                      <div
                        key={sk.name}
                        onClick={() => addSkill(sk.name)}
                        className="p-2.5 hover:bg-emerald-500/15 cursor-pointer transition-all space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          {renderSkillBadge(sk.rank)}
                          <span className="font-black text-white text-xs">{sk.name}</span>
                        </div>
                        {sk.desc && (
                          <div className="text-[11px] text-emerald-300/90 font-bold truncate">
                            {sk.desc}
                          </div>
                        )}
                        {sk.cardNames && sk.cardNames.length > 0 && (
                          <div className="text-[10px] text-slate-400 font-semibold truncate">
                            カード: {sk.cardNames.join(', ')}
                          </div>
                        )}
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
                  <div key={idx} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 relative overflow-hidden shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                        スロット {idx + 1}
                      </span>
                      {isBonusMatch && (
                        <span className="text-[10px] font-black text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded-full border border-[#00FF66]/30">
                          🎯 ボーナス適合
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 flex-shrink-0 flex items-center justify-center font-black text-xs text-amber-300 shadow">
                        {card.rank}
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="text-xs font-black text-white truncate">{card.name}</div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {card.skill ? (
                            <>
                              {renderRankBadge(card.skill.rank || '銅')}
                              <span className="text-xs text-amber-300 font-extrabold truncate">{card.skill.name}</span>
                            </>
                          ) : (
                            <>
                              {renderRankBadge('銅')}
                              <span className="text-xs text-slate-300 font-bold truncate">{card.ability || 'アビリティ'}</span>
                            </>
                          )}
                        </div>
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

content = content.slice(0, modalIdx) + newAutoSelectModalCode;
fs.writeFileSync('src/app.jsx', content, 'utf8');
console.log('Successfully updated AutoSelectModal with rank badges and visual clarity!');
