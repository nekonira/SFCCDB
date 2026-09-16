global.window = {};
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const PLAYERS = global.window.INITIAL_PLAYERS || [];
const officialCards = global.window.OFFICIAL_SPECIAL_CARDS || [];

const POSITION_LIMIT_ADDITIONS = {
  CF: { '決定力': 355, 'キック力': 355, '冷静さ': 355, 'ショートパス': 331, 'ロングパス': 311, 'キック精度': 311, '突破力': 343, 'キープ力': 343, 'ボールタッチ': 355, 'タックル': 319, 'パスカット': 319, 'マーク': 319, 'ジャンプ': 343, 'コンタクト': 355, 'スタミナ': 343, '走力': 343, '敏捷性': 343 },
  WING_SIDE: { '決定力': 343, 'キック力': 331, '冷静さ': 343, 'ショートパス': 343, 'ロングパス': 343, 'キック精度': 343, '突破力': 355, 'キープ力': 355, 'ボールタッチ': 343, 'タックル': 311, 'パスカット': 319, 'マーク': 319, 'ジャンプ': 331, 'コンタクト': 331, 'スタミナ': 343, '走力': 355, '敏捷性': 355 },
  AM: { '決定力': 331, 'キック力': 331, '冷静さ': 343, 'ショートパス': 355, 'ロングパス': 343, 'キック精度': 343, '突破力': 343, 'キープ力': 343, 'ボールタッチ': 343, 'タックル': 343, 'パスカット': 331, 'マーク': 331, 'ジャンプ': 331, 'コンタクト': 343, 'スタミナ': 355, '走力': 331, '敏捷性': 343 },
  DM: { '決定力': 331, 'キック力': 331, '冷静さ': 343, 'ショートパス': 355, 'ロングパス': 355, 'キック精度': 355, '突破力': 331, 'キープ力': 331, 'ボールタッチ': 331, 'タックル': 355, 'パスカット': 343, 'マーク': 343, 'ジャンプ': 331, 'コンタクト': 343, 'スタミナ': 355, '走力': 331, '敏捷性': 331 },
  FB: { '決定力': 319, 'キック力': 319, '冷静さ': 319, 'ショートパス': 343, 'ロングパス': 343, 'キック精度': 343, '突破力': 331, 'キープ力': 331, 'ボールタッチ': 331, 'タックル': 355, 'パスカット': 355, 'マーク': 355, 'ジャンプ': 331, 'コンタクト': 343, 'スタミナ': 355, '走力': 355, '敏捷性': 355 },
  CB: { '決定力': 319, 'キック力': 319, '冷静さ': 319, 'ショートパス': 343, 'ロングパス': 343, 'キック精度': 343, '突破力': 331, 'キープ力': 331, 'ボールタッチ': 331, 'タックル': 355, 'パスカット': 355, 'マーク': 355, 'ジャンプ': 355, 'コンタクト': 355, 'スタミナ': 343, '走力': 343, '敏捷性': 343 },
  GK: { '決定力': 307, 'キック力': 307, '冷静さ': 307, 'ショートパス': 355, 'ロングパス': 355, 'キック精度': 355, '突破力': 307, 'キープ力': 307, 'ボールタッチ': 307, 'セービング': 355, '反応速度': 355, '1VS1': 355, 'ジャンプ': 355, 'コンタクト': 355, 'スタミナ': 343, '走力': 331, '敏捷性': 331 }
};

function getPositionGroup(pos) {
  if (!pos) return 'CF';
  const p = pos.toUpperCase();
  if (p === 'CF' || p === 'ST' || p === 'FW') return 'CF';
  if (['LW', 'RW', 'LM', 'RM', 'LWF', 'RWF', 'LMF', 'RMF', 'WG'].includes(p)) return 'WING_SIDE';
  if (['AM', 'OM', 'AMF', 'OMF', 'CAM'].includes(p)) return 'AM';
  if (['DM', 'CM', 'DMF', 'CMF', 'DH', 'CH'].includes(p)) return 'DM';
  if (['LFB', 'RFB', 'LB', 'RB', 'LSB', 'RSB', 'SB', 'WB'].includes(p)) return 'FB';
  if (['CB', 'DF'].includes(p)) return 'CB';
  if (['GK'].includes(p)) return 'GK';
  return 'CF';
}

function normalizeStyle(str) {
  if (!str) return '';
  return str.replace(/\d+%/g, '').replace(/ブレーカー/g, 'ブレイカー').replace(/\s+/g, '').toLowerCase();
}

function checkBonusMatch(player, rawStyle) {
  if (!player || !rawStyle) return false;
  const parts = rawStyle.split('/');
  for (const part of parts) {
    const s = normalizeStyle(part);
    if (!s) continue;
    const pStyle = normalizeStyle(player.playStyle);
    const pPos = normalizeStyle(player.mainPosition);
    const pCat = normalizeStyle(player.category);
    const pNation = normalizeStyle(player.nationality);

    if (pStyle && (pStyle.includes(s) || s.includes(pStyle))) return true;
    if (pPos && (pPos.includes(s) || s.includes(pPos))) return true;
    if (pCat && (pCat.includes(s) || s.includes(pCat))) return true;
    if (pNation && (pNation.includes(s) || s.includes(pNation))) return true;
  }
  return false;
}

function calculateCardBonusMult(player, card) {
  if (!player || !card || !card.playstyleBonus) return 1.0;
  let mult = 1.0;
  if (card.playstyleBonus.bonuses && Array.isArray(card.playstyleBonus.bonuses)) {
    card.playstyleBonus.bonuses.forEach(b => {
      if (checkBonusMatch(player, b.style)) mult += (Number(b.percent) || 0) / 100;
    });
  } else if (card.playstyleBonus.style) {
    if (checkBonusMatch(player, card.playstyleBonus.style)) mult += (Number(card.playstyleBonus.percent) || 0) / 100;
  }
  return mult;
}

const STAT_MAP = {
  '決定力': ['shoot', 'finishing'], 'キック力': ['shoot', 'power'], '冷静さ': ['shoot', 'composure'],
  'ショートパス': ['pass', 'shortPass'], 'ロングパス': ['pass', 'longPass'], 'キック精度': ['pass', 'accuracy'],
  '突破力': ['dribble', 'breakout'], 'キープ力': ['dribble', 'keeping'], 'ボールタッチ': ['dribble', 'ballTouch'],
  'タックル': ['defense', 'tackle'], 'パスカット': ['defense', 'interception'], 'マーク': ['defense', 'marking'],
  'セービング': ['defense', 'save'], '反応速度': ['defense', 'interception'], '1VS1': ['defense', 'marking'],
  'ジャンプ': ['physical', 'jumping'], 'コンタクト': ['physical', 'contact'], 'スタミナ': ['physical', 'stamina'],
  '走力': ['speed', 'running'], '敏捷性': ['speed', 'agility']
};

function getPlayerBaseStat(player, stName) {
  const path = STAT_MAP[stName];
  if (!path || !player.detailStats || !player.detailStats[path[0]]) return 400;
  return player.detailStats[path[0]][path[1]] || 400;
}

function getPlayerLimits(player) {
  const group = getPositionGroup(player.mainPosition);
  const additions = POSITION_LIMIT_ADDITIONS[group] || POSITION_LIMIT_ADDITIONS['CF'];
  const limits = {};
  Object.keys(additions).forEach(stName => {
    const base = getPlayerBaseStat(player, stName);
    const addition = additions[stName];
    limits[stName] = { base, addition, maxLimit: base + addition };
  });
  return limits;
}

function optimizeSpecialCardSlotsEnhanced(player, officialCards, options = {}) {
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

  const playerLimits = getPlayerLimits(player);

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
      abs.push(`${c.skill.rank || ''} ${c.skill.name}`.trim());
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
    let totalRawGain = 0;
    let overflowPenalty = 0;
    let safeViolationPenalty = 0;

    Object.entries(playerLimits).forEach(([stName, lim]) => {
      const gainVal = totalGains[stName] || 0;
      totalRawGain += gainVal;

      const rawVal = lim.base + gainVal;
      const effectiveVal = Math.min(lim.maxLimit, rawVal);
      const effectiveGain = effectiveVal - lim.base;

      // Weight multiplier based on targetGoal
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
          safeViolationPenalty += (rawVal - safeLimit) * 50.0; // Heavy penalty for exceeding maxLimit - 150
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

  // Search optimal 6 cards combination
  let bestSet = [...requiredCards];
  let bestScore = -Infinity;

  // Greedy & Combinatorial search
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

    // Top K candidates
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

const pele = PLAYERS.find(p => p.name.includes('ペレ')) || PLAYERS[0];
console.log('1. Effective Limit-Aware Optimization (EFFECTIVE_MAX):');
const resEffective = optimizeSpecialCardSlotsEnhanced(pele, officialCards, { optimizationStrategy: 'EFFECTIVE_MAX' });
resEffective.forEach((s, idx) => {
  const card = officialCards.find(c => c.id === s.cardId);
  console.log(`   Slot ${idx + 1}: ${card.name}`);
});

console.log('\n2. Safe 150 Boundary Optimization (SAFE_150):');
const resSafe = optimizeSpecialCardSlotsEnhanced(pele, officialCards, { optimizationStrategy: 'SAFE_150', targetStage: '無凸' });
resSafe.forEach((s, idx) => {
  const card = officialCards.find(c => c.id === s.cardId);
  console.log(`   Slot ${idx + 1}: ${card.name}`);
});
