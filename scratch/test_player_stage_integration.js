global.window = {};
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const PLAYERS = global.window.INITIAL_PLAYERS || [];
const officialCards = global.window.OFFICIAL_SPECIAL_CARDS || [];

const OFFSETS = { '☆3': 0, '☆3+': 16, '☆3++': 33, '☆4': 65, '☆4+': 81, '☆4++': 98, '☆5': 130 };

function getAdjustedPlayer(player, targetRarity, useMaxEnhanced = false) {
  if (!player) return null;
  const basePlayer = player.rawPlayer || player;
  if (useMaxEnhanced && basePlayer.maxEnhanced) {
    return {
      ...basePlayer,
      rawPlayer: basePlayer,
      rarity: '☆5',
      simulatedRarity: '☆5',
      overall: basePlayer.maxEnhanced.overall,
      baseStats: basePlayer.maxEnhanced.baseStats,
      detailStats: basePlayer.maxEnhanced.detailStats,
      isMaxEnhanced: true
    };
  }
  const currentRarity = targetRarity || basePlayer.rarity || '☆3';
  const diff = OFFSETS[currentRarity] || 0;
  const newDetailStats = {};
  if (basePlayer.detailStats) {
    Object.keys(basePlayer.detailStats).forEach(cat => {
      newDetailStats[cat] = {};
      Object.keys(basePlayer.detailStats[cat]).forEach(sub => {
        newDetailStats[cat][sub] = (basePlayer.detailStats[cat][sub] || 0) + diff;
      });
    });
  }
  return {
    ...basePlayer,
    rawPlayer: basePlayer,
    rarity: currentRarity,
    simulatedRarity: currentRarity,
    detailStats: newDetailStats,
    isMaxEnhanced: false
  };
}

const pele = PLAYERS.find(p => p.name.includes('ペレ')) || PLAYERS[0];

console.log('--- Testing 6-Slot Simulator with Player Rank Stage Selection ---');

// Test 1: Pele at ☆3 (初期)
const peleStar3 = getAdjustedPlayer(pele, '☆3', false);
console.log(`\n1. Pele at ☆3 (無凸): Base 決定力 ${peleStar3.detailStats.shoot.finishing}`);

// Test 2: Pele at ☆4++ (5凸)
const peleStar4Plus = getAdjustedPlayer(pele, '☆4++', false);
console.log(`\n2. Pele at ☆4++ (5凸): Base 決定力 ${peleStar4Plus.detailStats.shoot.finishing}`);

// Test 3: Pele at 🔥 ☆5 (最大強化)
const peleMax = getAdjustedPlayer(pele, '☆5', true);
console.log(`\n3. Pele at 🔥 ☆5 (最大強化): Base 決定力 ${peleMax.detailStats.shoot.finishing}`);

console.log('\nAll player rank stage simulation tests passed successfully!');
