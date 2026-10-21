const fs = require('fs');
const vm = require('vm');

const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const sandbox = { window: {}, console: console };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);
const players = sandbox.window.INITIAL_PLAYERS;

const STAT_NAME_MAP = {
  '決定力': ['shoot', 'finishing'],
  'キック力': ['shoot', 'power'],
  '冷静さ': ['shoot', 'composure'],
  'ショートパス': ['pass', 'shortPass'],
  'ロングパス': ['pass', 'longPass'],
  'キック精度': ['pass', 'accuracy'],
  '突破力': ['dribble', 'breakout'],
  'キープ力': ['dribble', 'keeping'],
  'ボールタッチ': ['dribble', 'ballTouch'],
  'タックル': ['defense', 'tackle'],
  'パスカット': ['defense', 'interception'],
  'マーク': ['defense', 'marking'],
  'ジャンプ': ['physical', 'jumping'],
  'コンタクト': ['physical', 'contact'],
  'スタミナ': ['physical', 'stamina'],
  '走力': ['speed', 'running'],
  '敏捷性': ['speed', 'agility']
};

const getPlayerStatValue = (player, statName) => {
  if (!player) return 0;
  if (player.detailStats) {
    const entry = STAT_NAME_MAP[statName];
    if (entry) {
      const [cat, key] = entry;
      if (player.detailStats[cat] && player.detailStats[cat][key] !== undefined) {
        return Number(player.detailStats[cat][key]) || 0;
      }
    }
  }
  return Math.round((player.overall || 0) / 18);
};

const getAdjustedPlayer = (p, rarity, maxEnh) => {
  if (maxEnh && p.maxEnhanced) {
    return {
      ...p,
      overall: p.maxEnhanced.overall,
      baseStats: p.maxEnhanced.baseStats,
      detailStats: p.maxEnhanced.detailStats
    };
  }
  return p;
};

const activeCombo = {
  id: 'lesBleus26',
  name: 'レ・ブルー’26',
  buffs: [
    { name: 'ボールタッチ', val: '+80%' },
    { name: 'タックル', val: '+80%' },
    { name: 'マーク', val: '+80%' },
    { name: 'コンタクト', val: '+80%' }
  ]
};

const pol = 'ムービング';
const targetNation = 'フランス';

const calcExactOverall = (sq) => {
  const starters = Object.values(sq).filter(Boolean).map(p => getAdjustedPlayer(p, '☆5', true));
  const rawBaseOverall = starters.reduce((acc, p) => acc + (p.overall || 0), 0);
  const policyAdjustedOverall = starters.reduce((acc, p) => acc + (p.policy === pol ? Math.floor((p.overall || 0) * 1.05) : (p.overall || 0)), 0);
  const policyBonusGained = policyAdjustedOverall - rawBaseOverall;

  let totalComboStatBonus = 0;
  const natCnt = starters.filter(p => p.nationality === targetNation).length;
  const nEx = natCnt * 2;

  activeCombo.buffs.forEach(b => {
    const basePct = parseInt(String(b.val).replace(/[^0-9]/g, ''), 10) || 0;
    const effectivePct = basePct + nEx;
    starters.forEach(p => {
      const statVal = getPlayerStatValue(p, b.name);
      totalComboStatBonus += Math.floor(statVal * (effectivePct / 100));
    });
  });
  return { rawBaseOverall, policyBonusGained, totalComboStatBonus, total: rawBaseOverall + policyBonusGained + totalComboStatBonus, natCnt, effectivePct: 80 + nEx };
};

const dembele = players.find(p => p.id === 'p396');
const doue = players.find(p => p.id === 'p404');
const barcola = players.find(p => p.id === 'p402');

// Pattern A: (RW: Messi, LW: Doue, AM: Dembele)
const sqA = {
  1: players.find(p => p.name === 'リュカ・シュヴァリエ'),
  2: players.find(p => p.name === 'テオ・エルナンデス'),
  3: players.find(p => p.name === 'イブラヒマ・コナテ'),
  4: players.find(p => p.name === 'マクサンス・ラクロワ'),
  5: players.find(p => p.name === 'マロ・ギュスト'),
  6: players.find(p => p.name === 'アドリアン・ラビオ'),
  7: players.find(p => p.name === 'エンゴロ・カンテ'),
  8: dembele, // AM
  9: doue,    // LW
  10: players.find(p => p.name === 'キリアン・エンバペ'),
  11: players.find(p => p.name === 'リオネル・メッシ(MLS)') // RW
};

// Pattern B: User's Proposed: (RW: Dembele, LW: Barcola, AM: Doue)
const sqB = {
  1: players.find(p => p.name === 'リュカ・シュヴァリエ'),
  2: players.find(p => p.name === 'テオ・エルナンデス'),
  3: players.find(p => p.name === 'イブラヒマ・コナテ'),
  4: players.find(p => p.name === 'マクサンス・ラクロワ'),
  5: players.find(p => p.name === 'マロ・ギュスト'),
  6: players.find(p => p.name === 'アドリアン・ラビオ'),
  7: players.find(p => p.name === 'エンゴロ・カンテ'),
  8: doue,    // AM (アタッカー LV3)
  9: barcola, // LW
  10: players.find(p => p.name === 'キリアン・エンバペ'),
  11: dembele // RW
};

const resA = calcExactOverall(sqA);
const resB = calcExactOverall(sqB);

console.log('Pattern A (RW: Messi, LW: Doue, AM: Dembele):');
console.log(resA);
console.log('\nPattern B (RW: Dembele, LW: Barcola, AM: Doue):');
console.log(resB);
console.log('\nDifference B - A:', resB.total - resA.total);
