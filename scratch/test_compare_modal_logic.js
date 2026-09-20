global.window = global;
require('../src/data/specialCardsData.js');
const cards = window.OFFICIAL_SPECIAL_CARDS || [];

console.log('Loaded cards:', cards.length);

const LIMIT_BREAK_STAGES = ['無凸', '1凸', '2凸', '3凸', '完凸'];
const CATEGORY_STATS = ['シュート', 'パス', 'ドリブル', 'ディフェンス', 'フィジカル', 'スピード', 'GK能力'];
const DETAIL_STATS = [
  '決定力', 'キック力', '冷静さ',
  'ショートパス', 'ロングパス', 'キック精度', 'パス精度',
  '突破力', 'キープ力', 'ボールタッチ',
  'タックル', 'パスカット', 'マーク',
  'ジャンプ', 'コンタクト', 'スタミナ', '走力', '敏捷性', 'メンタル',
  'セービング', '反応速度', '1対1', 'ポジショニング', 'ハイボール', '飛び出し'
];

const floor1Decimal = (num) => {
  if (isNaN(num) || num === null || num === undefined) return 0;
  return Math.floor(Number(num) * 10) / 10;
};

const getCardBonuses = (c) => {
  if (!c || !c.playstyleBonus) return [];
  if (c.playstyleBonus.bonuses && Array.isArray(c.playstyleBonus.bonuses)) {
    return c.playstyleBonus.bonuses;
  }
  if (c.playstyleBonus.style) {
    return [{ style: c.playstyleBonus.style, percent: c.playstyleBonus.percent }];
  }
  return [];
};

const getCardStatData = (c, stage, statName) => {
  if (!c) return { val: 0, rawVal: 0, isBoosted: false };
  const stageStats = (c.stages && (c.stages[stage] || c.stages['完凸'])) || {};
  let rawVal = Number(stageStats[statName]) || 0;

  if (rawVal === 0) {
    if (statName === '1対1' || statName === '1VS1') rawVal = Number(stageStats['1対1']) || Number(stageStats['1VS1']) || 0;
    if (statName === 'キープ力' || statName === 'キープ') rawVal = Number(stageStats['キープ力']) || Number(stageStats['キープ']) || 0;
  }

  if (rawVal === 0) {
    if (statName === 'シュート') rawVal = (Number(stageStats['決定力'])||0) + (Number(stageStats['キック力'])||0) + (Number(stageStats['冷静さ'])||0);
    else if (statName === 'パス') rawVal = (Number(stageStats['ショートパス'])||0) + (Number(stageStats['ロングパス'])||0) + (Number(stageStats['キック精度'])||0) + (Number(stageStats['パス精度'])||0);
    else if (statName === 'ドリブル') rawVal = (Number(stageStats['突破力'])||0) + (Number(stageStats['キープ力'])||0) + (Number(stageStats['キープ'])||0) + (Number(stageStats['ボールタッチ'])||0);
    else if (statName === 'ディフェンス') rawVal = (Number(stageStats['タックル'])||0) + (Number(stageStats['パスカット'])||0) + (Number(stageStats['マーク'])||0);
    else if (statName === 'フィジカル') rawVal = (Number(stageStats['ジャンプ'])||0) + (Number(stageStats['コンタクト'])||0) + (Number(stageStats['スタミナ'])||0) + (Number(stageStats['メンタル'])||0);
    else if (statName === 'スピード') rawVal = (Number(stageStats['走力'])||0) + (Number(stageStats['敏捷性'])||0);
    else if (statName === 'GK能力') rawVal = (Number(stageStats['セービング'])||0) + (Number(stageStats['反応速度'])||0) + (Number(stageStats['1対1'])||0) + (Number(stageStats['1VS1'])||0) + (Number(stageStats['ポジショニング'])||0) + (Number(stageStats['ハイボール'])||0) + (Number(stageStats['飛び出し'])||0);
  }

  if (rawVal === 0) return { val: 0, rawVal: 0, isBoosted: false };

  let bonusMult = 1.0;
  const val = floor1Decimal(rawVal * bonusMult);
  return { val, rawVal: floor1Decimal(rawVal), isBoosted: bonusMult > 1.0 };
};

// Test running comparison on first 7 cards
const testCards = cards.slice(0, 7);
console.log('Testing comparison with cards:', testCards.map(c => c.name));

testCards.forEach(c => {
  LIMIT_BREAK_STAGES.forEach(stage => {
    DETAIL_STATS.forEach(st => {
      const data = getCardStatData(c, stage, st);
      if (isNaN(data.val) || isNaN(data.rawVal)) {
        console.error('NaN detected!', c.name, stage, st);
      }
    });
  });
});
console.log('Test completed successfully!');
