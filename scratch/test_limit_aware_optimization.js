global.window = {};
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const PLAYERS = global.window.INITIAL_PLAYERS || [];
const officialCards = global.window.OFFICIAL_SPECIAL_CARDS || [];

const POSITION_LIMIT_ADDITIONS = {
  CF: {
    '決定力': 355, 'キック力': 355, '冷静さ': 355,
    'ショートパス': 331, 'ロングパス': 311, 'キック精度': 311,
    '突破力': 343, 'キープ力': 343, 'ボールタッチ': 355,
    'タックル': 319, 'パスカット': 319, 'マーク': 319,
    'ジャンプ': 343, 'コンタクト': 355, 'スタミナ': 343,
    '走力': 343, '敏捷性': 343
  },
  WING_SIDE: {
    '決定力': 343, 'キック力': 331, '冷静さ': 343,
    'ショートパス': 343, 'ロングパス': 343, 'キック精度': 343,
    '突破力': 355, 'キープ力': 355, 'ボールタッチ': 343,
    'タックル': 311, 'パスカット': 319, 'マーク': 319,
    'ジャンプ': 331, 'コンタクト': 331, 'スタミナ': 343,
    '走力': 355, '敏捷性': 355
  },
  AM: {
    '決定力': 331, 'キック力': 331, '冷静さ': 343,
    'ショートパス': 355, 'ロングパス': 343, 'キック精度': 343,
    '突破力': 343, 'キープ力': 343, 'ボールタッチ': 343,
    'タックル': 343, 'パスカット': 331, 'マーク': 331,
    'ジャンプ': 331, 'コンタクト': 343, 'スタミナ': 355,
    '走力': 331, '敏捷性': 343
  },
  DM: {
    '決定力': 331, 'キック力': 331, '冷静さ': 343,
    'ショートパス': 355, 'ロングパス': 355, 'キック精度': 355,
    '突破力': 331, 'キープ力': 331, 'ボールタッチ': 331,
    'タックル': 355, 'パスカット': 343, 'マーク': 343,
    'ジャンプ': 331, 'コンタクト': 343, 'スタミナ': 355,
    '走力': 331, '敏捷性': 331
  },
  FB: {
    '決定力': 319, 'キック力': 319, '冷静さ': 319,
    'ショートパス': 343, 'ロングパス': 343, 'キック精度': 343,
    '突破力': 331, 'キープ力': 331, 'ボールタッチ': 331,
    'タックル': 355, 'パスカット': 355, 'マーク': 355,
    'ジャンプ': 331, 'コンタクト': 343, 'スタミナ': 355,
    '走力': 355, '敏捷性': 355
  },
  CB: {
    '決定力': 319, 'キック力': 319, '冷静さ': 319,
    'ショートパス': 343, 'ロングパス': 343, 'キック精度': 343,
    '突破力': 331, 'キープ力': 331, 'ボールタッチ': 331,
    'タックル': 355, 'パスカット': 355, 'マーク': 355,
    'ジャンプ': 355, 'コンタクト': 355, 'スタミナ': 343,
    '走力': 343, '敏捷性': 343
  },
  GK: {
    '決定力': 307, 'キック力': 307, '冷静さ': 307,
    'ショートパス': 355, 'ロングパス': 355, 'キック精度': 355,
    '突破力': 307, 'キープ力': 307, 'ボールタッチ': 307,
    'セービング': 355, '反応速度': 355, '1VS1': 355,
    'ジャンプ': 355, 'コンタクト': 355, 'スタミナ': 343,
    '走力': 331, '敏捷性': 331
  }
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

// Map detail stat name to detailStats object path
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

function getPlayerMaxLimit(player, stName) {
  const group = getPositionGroup(player.mainPosition);
  const addition = (POSITION_LIMIT_ADDITIONS[group] && POSITION_LIMIT_ADDITIONS[group][stName]) || 355;
  const base = getPlayerBaseStat(player, stName);
  return { base, addition, maxLimit: base + addition };
}

// Combination Score & Safety Evaluator
function evaluateCombination(player, cardSet, targetStage, mode = 'EFFECTIVE_MAX') {
  // Compute total gains per stat
  const cardStatGains = {};
  cardSet.forEach(card => {
    const stageStats = card.stages[targetStage] || card.stages['完凸'] || {};
    const bonusMult = calculateCardBonusMult(player, card);

    Object.entries(stageStats).forEach(([stName, val]) => {
      const boosted = val * bonusMult;
      cardStatGains[stName] = (cardStatGains[stName] || 0) + boosted;
    });
  });

  let totalEffectiveScore = 0;
  let totalRawGain = 0;
  let isOverflowed = false;
  let isSafeViolation = false;

  Object.entries(cardStatGains).forEach(([stName, gainVal]) => {
    const { base, addition, maxLimit } = getPlayerMaxLimit(player, stName);
    totalRawGain += gainVal;

    const rawBoosted = base + gainVal;
    const effectiveVal = Math.min(maxLimit, rawBoosted);
    const effectiveGain = effectiveVal - base;

    totalEffectiveScore += effectiveGain;

    if (rawBoosted > maxLimit) {
      isOverflowed = true;
    }

    // Safety check: boosted val must not exceed maxLimit - 150
    if (rawBoosted > maxLimit - 150) {
      isSafeViolation = true;
    }
  });

  return {
    totalEffectiveScore,
    totalRawGain,
    isOverflowed,
    isSafeViolation,
    cardStatGains
  };
}

// Test combination evaluator on Pele
const pele = PLAYERS.find(p => p.name.includes('ペレ')) || PLAYERS[0];
console.log('Testing combination optimization for Pele:');

// Test 6 copies of Mbappe (high raw gain vs effective gain)
const mbappe = officialCards.find(c => c.name.includes('エンバペ')) || officialCards[0];
const resMbappe = evaluateCombination(pele, Array(6).fill(mbappe), '完凸');
console.log(`6x Mbappe: Raw Gain = +${resMbappe.totalRawGain.toFixed(1)}, Effective Gain = +${resMbappe.totalEffectiveScore.toFixed(1)}, Overflowed? ${resMbappe.isOverflowed}, Safe Violation? ${resMbappe.isSafeViolation}`);

// Test balanced set
const kani = officialCards.find(c => c.name.includes('サラー')) || officialCards[1];
const resSalah = evaluateCombination(pele, Array(6).fill(kani), '完凸');
console.log(`6x Salah: Raw Gain = +${resSalah.totalRawGain.toFixed(1)}, Effective Gain = +${resSalah.totalEffectiveScore.toFixed(1)}, Overflowed? ${resSalah.isOverflowed}, Safe Violation? ${resSalah.isSafeViolation}`);
