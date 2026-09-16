global.window = {};
require('../src/data/mockData.js');
const PLAYERS = global.window.INITIAL_PLAYERS || [];

console.log('Total players count:', PLAYERS.length);
if (PLAYERS.length > 0) {
  const sample = PLAYERS[0];
  console.log('Sample player keys:', Object.keys(sample));
  console.log('Sample player rarity / stage fields:');
  console.log('name:', sample.name);
  console.log('rarity:', sample.rarity);
  console.log('rarities / stages / ranks?:');
  if (sample.rarities) console.log('rarities:', sample.rarities);
  if (sample.stages) console.log('stages:', sample.stages);
  if (sample.ranks) console.log('ranks:', sample.ranks);
  if (sample.statVariants) console.log('statVariants:', sample.statVariants);
  console.log('baseStats:', sample.baseStats);
  console.log('detailStats:', sample.detailStats);
}

// Find if any player has rarity variants or stage variants
const playersWithVariants = PLAYERS.filter(p => p.rarities || p.stages || p.ranks || p.variants);
console.log('Players with rarity/stage variants:', playersWithVariants.length);
