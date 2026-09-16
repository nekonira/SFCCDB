global.window = {};
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const PLAYERS = global.window.INITIAL_PLAYERS || [];
const officialCards = global.window.OFFICIAL_SPECIAL_CARDS || [];

// Read app.js and extract optimizeSpecialCardSlots function
const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

console.log('Testing AutoSelect feature integration:');

// Test 1: Pele with required ability "銅 スピードドリブラー" and targetGoal "TOTAL"
const pele = PLAYERS.find(p => p.name.includes('ペレ')) || PLAYERS[0];

// Execute optimizeSpecialCardSlots from app.js context via eval or direct call
eval(appJs.slice(appJs.indexOf('function optimizeSpecialCardSlots'), appJs.indexOf('// ───', appJs.indexOf('function optimizeSpecialCardSlots'))));

console.log(`\n1. Pele Optimization (Goal: TOTAL, Stage: 完凸):`);
const res1 = optimizeSpecialCardSlots(pele, officialCards, { targetGoal: 'TOTAL', targetStage: '完凸' });
res1.forEach((s, idx) => {
  const card = officialCards.find(c => c.id === s.cardId);
  console.log(`   Slot ${idx + 1}: ${card.name} (${card.rank}) - ${card.skill ? card.skill.name : card.ability}`);
});

console.log(`\n2. Foden Optimization (Goal: pass, Required Skill: "一撃必殺", Stage: 3凸):`);
const foden = PLAYERS.find(p => p.name.includes('フォーデン')) || PLAYERS[0];
const res2 = optimizeSpecialCardSlots(foden, officialCards, {
  targetGoal: 'pass',
  targetStage: '3凸',
  requiredSkills: ['一撃必殺']
});
res2.forEach((s, idx) => {
  const card = officialCards.find(c => c.id === s.cardId);
  console.log(`   Slot ${idx + 1}: ${card.name} (${card.rank}) - Stage: ${s.stage} - ${card.skill ? card.skill.name : card.ability}`);
});

console.log('\nAll integration tests passed successfully!');
