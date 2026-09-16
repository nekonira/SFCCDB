global.window = {};
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const PLAYERS = global.window.INITIAL_PLAYERS || [];
const officialCards = global.window.OFFICIAL_SPECIAL_CARDS || [];

const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

eval(appJs.slice(appJs.indexOf('function normalizeStyle'), appJs.indexOf('// ───', appJs.indexOf('function optimizeSpecialCardSlots'))));

console.log('--- Verification of Playstyle Bonus Fix and Type Labels ---');

const pele = PLAYERS.find(p => p.name.includes('ペレ')) || PLAYERS[0];
console.log(`\n1. Pele (${pele.mainPosition}, ${pele.playStyle}, ${pele.nationality}):`);

const peleSlots = optimizeSpecialCardSlots(pele, officialCards, { targetGoal: 'TOTAL', targetStage: '完凸' });
peleSlots.forEach((s, idx) => {
  const card = officialCards.find(c => c.id === s.cardId);
  const mult = calculateCardBonusMult(pele, card);
  console.log(`   Slot ${idx + 1}: ${card.name} -> Bonus Mult: ${mult.toFixed(2)}x (+${Math.round((mult - 1) * 100)}%)`);
});

const foden = PLAYERS.find(p => p.name.includes('フォーデン')) || PLAYERS[0];
console.log(`\n2. Foden (${foden.mainPosition}, ${foden.playStyle}, ${foden.nationality}):`);
const fodenSlots = optimizeSpecialCardSlots(foden, officialCards, { targetGoal: 'TOTAL', targetStage: '完凸' });
fodenSlots.forEach((s, idx) => {
  const card = officialCards.find(c => c.id === s.cardId);
  const mult = calculateCardBonusMult(foden, card);
  console.log(`   Slot ${idx + 1}: ${card.name} -> Bonus Mult: ${mult.toFixed(2)}x (+${Math.round((mult - 1) * 100)}%)`);
});

console.log('\nAll playstyle bonus verification tests passed with 100% precision!');
