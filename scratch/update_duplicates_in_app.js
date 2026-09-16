const fs = require('fs');

let content = fs.readFileSync('src/app.jsx', 'utf8');

// Replace optimizeSpecialCardSlots function
const startFnStr = `function optimizeSpecialCardSlots(player, officialCards, options = {}) {`;
const fnIdx = content.indexOf(startFnStr);
if (fnIdx === -1) {
  console.error('optimizeSpecialCardSlots start not found');
  process.exit(1);
}

const endFnIdx = content.indexOf(`function App()`, fnIdx);
if (endFnIdx === -1) {
  console.error('App() start not found');
  process.exit(1);
}

const newOptimizeFn = `function optimizeSpecialCardSlots(player, officialCards, options = {}) {
  const {
    targetGoal = 'TOTAL',
    targetStage = '完凸',
    requiredAbilities = [],
    requiredSkills = [],
    matchPlaystyleBonusOnly = false,
    allowDuplicates = true
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

  if (!candidates.length) candidates = officialCards;

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
      .filter(c => (allowDuplicates || !usedCardIds.has(c.id)) && getCardAbilities(c).some(a => a.includes(reqAbs) || reqAbs.includes(a)))
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
      .filter(c => (allowDuplicates || !usedCardIds.has(c.id)) && getCardSkillName(c) === reqSkill)
      .sort((a, b) => getCardScore(b) - getCardScore(a));

    if (matching.length > 0) {
      const best = matching[0];
      selectedCards.push(best);
      usedCardIds.add(best.id);
    }
  }

  // 3. Fill remaining slots up to 6
  const sortedCandidates = [...candidates].sort((a, b) => getCardScore(b) - getCardScore(a));

  if (allowDuplicates) {
    const bestCard = sortedCandidates[0] || officialCards[0];
    while (selectedCards.length < 6) {
      selectedCards.push(bestCard);
    }
  } else {
    const remaining = sortedCandidates.filter(c => !usedCardIds.has(c.id));
    while (selectedCards.length < 6 && remaining.length > 0) {
      const top = remaining.shift();
      selectedCards.push(top);
      usedCardIds.add(top.id);
    }
  }

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

content = content.slice(0, fnIdx) + newOptimizeFn + content.slice(endFnIdx);

// Also add allowDuplicates state & toggle in AutoSelectModal component
const modalStateStr = `const [matchPlaystyleBonusOnly, setMatchPlaystyleBonusOnly] = useState(false);`;
const modalStateReplacement = `const [matchPlaystyleBonusOnly, setMatchPlaystyleBonusOnly] = useState(false);
  const [allowDuplicates, setAllowDuplicates] = useState(true);`;

if (content.includes(modalStateStr)) {
  content = content.replace(modalStateStr, modalStateReplacement);
}

// Pass allowDuplicates to optimizeSpecialCardSlots in AutoSelectModal
const optCallStr = `matchPlaystyleBonusOnly\n    });`;
const optCallReplacement = `matchPlaystyleBonusOnly,
      allowDuplicates
    });`;

if (content.includes(optCallStr)) {
  content = content.replace(optCallStr, optCallReplacement);
}

// Add UI checkbox toggle for allowDuplicates in AutoSelectModal
const checkboxStr = `<label className="flex items-center gap-2 pt-1 text-xs text-slate-300 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={matchPlaystyleBonusOnly}
                  onChange={e => setMatchPlaystyleBonusOnly(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
                <span>ボーナス対象カードのみに限定 (プレイスタイル/国籍)</span>
              </label>`;

const checkboxReplacement = `<div className="space-y-1 pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-300 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowDuplicates}
                    onChange={e => setAllowDuplicates(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                  <span className="text-emerald-300 font-black">同一カードの重複セット（複数スロット装着）を許可</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={matchPlaystyleBonusOnly}
                    onChange={e => setMatchPlaystyleBonusOnly(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                  <span>ボーナス対象カードのみに限定 (プレイスタイル/国籍)</span>
                </label>
              </div>`;

if (content.includes(checkboxStr)) {
  content = content.replace(checkboxStr, checkboxReplacement);
}

fs.writeFileSync('src/app.jsx', content, 'utf8');
console.log('Successfully updated optimizeSpecialCardSlots and AutoSelectModal for duplicate card support!');
