const fs = require('fs');
const vm = require('vm');
const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const sandbox = { window: {} };
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

const getAdjustedPlayer = (p) => {
  if (p && p.maxEnhanced) {
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
  buffs: [
    { name: 'ボールタッチ', val: '+80%' },
    { name: 'タックル', val: '+80%' },
    { name: 'マーク', val: '+80%' },
    { name: 'コンタクト', val: '+80%' }
  ]
};

const pol = 'ムービング';
const targetNation = 'フランス';

// Les Bleus 11 starters
const startersRaw = [
  players.find(p => p.name === 'リュカ・シュヴァリエ'),
  players.find(p => p.name === 'テオ・エルナンデス'),
  players.find(p => p.name === 'イブラヒマ・コナテ'),
  players.find(p => p.name === 'マクサンス・ラクロワ'),
  players.find(p => p.name === 'マロ・ギュスト'),
  players.find(p => p.name === 'アドリアン・ラビオ'),
  players.find(p => p.name === 'エンゴロ・カンテ'),
  players.find(p => p.name === 'デジレ・ドゥエ'),
  players.find(p => p.name === 'ブラッドリー・バルコラ'),
  players.find(p => p.name === 'キリアン・エンバペ'),
  players.find(p => p.id === 'p396')
].map(p => getAdjustedPlayer(p));

const natCnt = startersRaw.filter(p => p.nationality === targetNation).length;
const effectivePct = 80 + natCnt * 2; // 102%

console.log('--- Individual Effective Overall Breakdown ---');
let sumEffective = 0;
startersRaw.forEach(p => {
  const baseOvr = p.overall || 0;
  const isPolMatch = p.policy === pol;
  const polBonus = isPolMatch ? Math.floor(baseOvr * 1.05) - baseOvr : 0;
  
  let comboBonus = 0;
  activeCombo.buffs.forEach(b => {
    const statVal = getPlayerStatValue(p, b.name);
    comboBonus += Math.floor(statVal * (effectivePct / 100));
  });

  const effectiveOvr = baseOvr + polBonus + comboBonus;
  sumEffective += effectiveOvr;
  console.log(p.name + ': Base=' + baseOvr + ', Policy=+' + polBonus + ', Combo=+' + comboBonus + ' -> 実数値=' + effectiveOvr);
});

console.log('\nSum of Individual Effective Overall:', sumEffective);
console.log('Expected Team Overall: 223620');
console.log('Match?', sumEffective === 223620);
