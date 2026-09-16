const fs = require('fs');

let content = fs.readFileSync('src/app.jsx', 'utf8');

// 1. Replace optimizeSpecialCardSlots with the enhanced limit-aware & safe-boundary algorithm
const oldOptStart = `function optimizeSpecialCardSlots(player, officialCards, options = {}) {`;
const fnIdx = content.indexOf(oldOptStart);
if (fnIdx === -1) {
  console.error('oldOptStart not found');
  process.exit(1);
}

const endFnIdx = content.indexOf(`function App()`, fnIdx);
if (endFnIdx === -1) {
  console.error('App() start not found');
  process.exit(1);
}

const newOptimizeCode = `function optimizeSpecialCardSlots(player, officialCards, options = {}) {
  const {
    targetGoal = 'TOTAL',
    targetStage = '完凸',
    requiredAbilities = [],
    requiredSkills = [],
    matchPlaystyleBonusOnly = false,
    allowDuplicates = true,
    optimizationStrategy = 'EFFECTIVE_MAX' // 'EFFECTIVE_MAX' | 'SAFE_150'
  } = options;

  if (!player || !officialCards || !officialCards.length) return Array.from({ length: 6 }, (_, i) => ({ id: i + 1, active: false, cardId: '', stage: targetStage }));

  // Helper for position limit calculation
  const group = getPositionGroup(player.mainPosition);
  const additions = POSITION_LIMIT_ADDITIONS[group] || POSITION_LIMIT_ADDITIONS['CF'];
  const playerLimits = {};
  Object.keys(additions).forEach(stName => {
    const base = getPlayerBaseStat(player, stName);
    const addition = additions[stName];
    playerLimits[stName] = { base, addition, maxLimit: base + addition };
  });

  // Candidate filtering
  let candidates = officialCards.filter(c => {
    if (!c || !c.stages || !c.stages[targetStage]) return false;
    if (matchPlaystyleBonusOnly && c.playstyleBonus) {
      let isMatch = false;
      if (c.playstyleBonus.bonuses && Array.isArray(c.playstyleBonus.bonuses)) {
        isMatch = c.playstyleBonus.bonuses.some(b => checkBonusMatch(player, b.style));
      } else if (c.playstyleBonus.style) {
        isMatch = checkBonusMatch(player, c.playstyleBonus.style);
      }
      if (!isMatch) return false;
    }
    return true;
  });

  if (!candidates.length) candidates = officialCards;

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

  // Pre-calculate card stat boost map
  const cardBoostMaps = new Map();
  candidates.forEach(card => {
    const stageStats = card.stages[targetStage] || card.stages['完凸'] || {};
    const bonusMult = calculateCardBonusMult(player, card);
    const boostMap = {};
    Object.entries(stageStats).forEach(([stName, val]) => {
      boostMap[stName] = val * bonusMult;
    });
    cardBoostMaps.set(card.id, boostMap);
  });

  // Evaluate set of 6 cards considering growth limit ceilings and safety bounds
  function evaluateSetScore(cardSet) {
    const totalGains = {};
    cardSet.forEach(card => {
      const boostMap = cardBoostMaps.get(card.id) || {};
      Object.entries(boostMap).forEach(([stName, val]) => {
        totalGains[stName] = (totalGains[stName] || 0) + val;
      });
    });

    let effectiveScore = 0;
    let overflowPenalty = 0;
    let safeViolationPenalty = 0;

    Object.entries(playerLimits).forEach(([stName, lim]) => {
      const gainVal = totalGains[stName] || 0;
      const rawVal = lim.base + gainVal;
      const effectiveVal = Math.min(lim.maxLimit, rawVal);
      const effectiveGain = effectiveVal - lim.base;

      let weight = 1.0;
      if (targetGoal === 'shoot' && ['決定力', 'キック力', '冷静さ'].includes(stName)) weight = 3.0;
      else if (targetGoal === 'pass' && ['ショートパス', 'ロングパス', 'パス精度', 'キック精度'].includes(stName)) weight = 3.0;
      else if (targetGoal === 'dribble' && ['突破力', 'キープ力', 'ボールタッチ'].includes(stName)) weight = 3.0;
      else if (targetGoal === 'defense' && ['タックル', 'パスカット', 'マーク', 'セービング', '反応速度', '1VS1'].includes(stName)) weight = 3.0;
      else if (targetGoal === 'physical' && ['ジャンプ', 'コンタクト', 'スタミナ'].includes(stName)) weight = 3.0;
      else if (targetGoal === 'speed' && ['走力', '敏捷性'].includes(stName)) weight = 3.0;

      effectiveScore += effectiveGain * weight;

      // Overflow penalty: wasted stats past limit ceiling
      if (rawVal > lim.maxLimit) {
        overflowPenalty += (rawVal - lim.maxLimit) * 5.0;
      }

      // Safe 150 boundary constraint: rawVal must not exceed (maxLimit - 150)
      if (optimizationStrategy === 'SAFE_150') {
        const safeLimit = lim.maxLimit - 150;
        if (rawVal > safeLimit) {
          safeViolationPenalty += (rawVal - safeLimit) * 50.0;
        }
      }
    });

    return effectiveScore - overflowPenalty - safeViolationPenalty;
  }

  // Pre-selected required cards
  const requiredCards = [];
  const usedCardIds = new Set();

  for (const reqAbs of requiredAbilities) {
    const matching = candidates.filter(c => (allowDuplicates || !usedCardIds.has(c.id)) && getCardAbilities(c).some(a => a.includes(reqAbs) || reqAbs.includes(a)));
    if (matching.length > 0) {
      const best = matching.sort((a, b) => evaluateSetScore([b]) - evaluateSetScore([a]))[0];
      requiredCards.push(best);
      usedCardIds.add(best.id);
    }
  }

  for (const reqSkill of requiredSkills) {
    const matching = candidates.filter(c => (allowDuplicates || !usedCardIds.has(c.id)) && getCardSkillName(c) === reqSkill);
    if (matching.length > 0) {
      const best = matching.sort((a, b) => evaluateSetScore([b]) - evaluateSetScore([a]))[0];
      requiredCards.push(best);
      usedCardIds.add(best.id);
    }
  }

  // Top candidate cards pool
  const pool = [...candidates].sort((a, b) => evaluateSetScore([b]) - evaluateSetScore([a])).slice(0, 20);

  let bestSet = [...requiredCards];
  let bestScore = -Infinity;

  function fillSlots(currentSet) {
    if (currentSet.length === 6) {
      const score = evaluateSetScore(currentSet);
      if (score > bestScore) {
        bestScore = score;
        bestSet = [...currentSet];
      }
      return;
    }

    const available = allowDuplicates ? pool : pool.filter(c => !currentSet.some(existing => existing.id === c.id));
    if (!available.length) {
      fillSlots([...currentSet, officialCards[0]]);
      return;
    }

    for (let i = 0; i < Math.min(8, available.length); i++) {
      fillSlots([...currentSet, available[i]]);
    }
  }

  fillSlots(requiredCards);

  return Array.from({ length: 6 }, (_, i) => {
    const card = bestSet[i] || candidates[i] || officialCards[0];
    return {
      id: i + 1,
      active: true,
      cardId: card ? card.id : officialCards[0].id,
      stage: targetStage
    };
  });
}

`;

content = content.slice(0, fnIdx) + newOptimizeCode + content.slice(endFnIdx);

// 2. Add quick button for "🛡️ 無難最適編成" in quick action bar
const quickButtonTarget = `<button onClick={() => setIsAutoSelectModalOpen(true)} className="px-3 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow cursor-pointer flex items-center gap-1">⚡ 自動最適編成</button>`;
const quickButtonReplacement = `<button onClick={() => { setAutoSelectInitialMode('EFFECTIVE_MAX'); setIsAutoSelectModalOpen(true); }} className="px-3 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow cursor-pointer flex items-center gap-1">⚡ 自動最適編成</button>
                <button onClick={() => { setAutoSelectInitialMode('SAFE_150'); setIsAutoSelectModalOpen(true); }} className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-black text-xs shadow cursor-pointer flex items-center gap-1">🛡️ 無難最適編成 (限界値-150以下)</button>`;

if (content.includes(quickButtonTarget)) {
  content = content.replace(quickButtonTarget, quickButtonReplacement);
  console.log('Added 🛡️ 無難最適編成 quick button');
} else {
  console.error('quickButtonTarget not found');
}

// 3. Add autoSelectInitialMode state in App component
const stateTarget = `const [isAutoSelectModalOpen, setIsAutoSelectModalOpen] = useState(false);`;
const stateReplacement = `const [isAutoSelectModalOpen, setIsAutoSelectModalOpen] = useState(false);
  const [autoSelectInitialMode, setAutoSelectInitialMode] = useState('EFFECTIVE_MAX');`;

if (content.includes(stateTarget)) {
  content = content.replace(stateTarget, stateReplacement);
}

// Pass initialMode to AutoSelectModal in App JSX
const modalCallTarget = `<AutoSelectModal
        isOpen={isAutoSelectModalOpen}
        onClose={() => setIsAutoSelectModalOpen(false)}
        onApply={(newSlots) => setSlots(newSlots)}
        currentPlayer={currentPlayer}
        officialCards={officialCards}
        calculateBoostedPlayer={calculateBoostedPlayer}
      />`;

const modalCallReplacement = `<AutoSelectModal
        isOpen={isAutoSelectModalOpen}
        onClose={() => setIsAutoSelectModalOpen(false)}
        onApply={(newSlots) => setSlots(newSlots)}
        currentPlayer={currentPlayer}
        officialCards={officialCards}
        calculateBoostedPlayer={calculateBoostedPlayer}
        initialStrategy={autoSelectInitialMode}
      />`;

if (content.includes(modalCallTarget)) {
  content = content.replace(modalCallTarget, modalCallReplacement);
}

fs.writeFileSync('src/app.jsx', content, 'utf8');
console.log('Successfully updated src/app.jsx with limit-aware and safe-boundary optimization!');
