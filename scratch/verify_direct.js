const fs = require('fs');
const code = fs.readFileSync('src/app.js', 'utf8');

// Use regex to extract checkSingleBonusMatch and calculateCardBonusMult implementation
const matchFunc = code.match(/function checkSingleBonusMatch[\s\S]*?function checkBonusMatch/);
const calcFunc = code.match(/function calculateCardBonusMult[\s\S]*?const floor1Decimal/);
const normFunc = code.match(/function normalizeStyle[\s\S]*?function checkSingleBonusMatch/);
const listFunc = code.match(/function getCardBonusList[\s\S]*?function calculateCardBonusMult/);

if (!matchFunc || !calcFunc || !normFunc || !listFunc) {
  console.error('Failed to extract functions from app.js');
  process.exit(1);
}

const extracted = `
${normFunc[0]}
${matchFunc[0]}
${listFunc[0]}
${calcFunc[0]}
`;

eval(extracted);

const testP1 = { name: 'ストライカー選手', playStyle: 'ストライカー', mainPosition: 'CF' };
const testP2 = { name: 'ラインブレーカー選手', playStyle: 'ラインブレーカー', mainPosition: 'CF' };

const cardLB = { id: 'c1', name: 'ラインブレーカーカード', playstyleBonus: { style: 'ラインブレーカー 15% / CF 10%', bonuses: [{ style: 'ラインブレーカー', percent: 15 }, { style: 'CF', percent: 10 }] } };
const cardST = { id: 'c2', name: 'ストライカーカード', playstyleBonus: { style: 'ストライカー 15% / CF 10%', bonuses: [{ style: 'ストライカー', percent: 15 }, { style: 'CF', percent: 10 }] } };

console.log('=== VERIFICATION OF EXTRACTED RUNTIME LOGIC ===');
console.log('1. Striker Player + LineBreaker Card:');
console.log('   Multiplier:', calculateCardBonusMult(testP1, cardLB));
console.log('   Check LineBreaker:', checkSingleBonusMatch(testP1, 'ラインブレーカー'));
console.log('   Check CF position:', checkSingleBonusMatch(testP1, 'CF'));

console.log('\n2. LineBreaker Player + Striker Card:');
console.log('   Multiplier:', calculateCardBonusMult(testP2, cardST));
console.log('   Check Striker:', checkSingleBonusMatch(testP2, 'ストライカー'));
console.log('   Check CF position:', checkSingleBonusMatch(testP2, 'CF'));

console.log('\n3. LineBreaker Player + LineBreaker Card:');
console.log('   Multiplier:', calculateCardBonusMult(testP2, cardLB));
console.log('   Check LineBreaker:', checkSingleBonusMatch(testP2, 'ラインブレーカー'));
console.log('   Check CF position:', checkSingleBonusMatch(testP2, 'CF'));

console.log('\n4. Striker Player + Striker Card:');
console.log('   Multiplier:', calculateCardBonusMult(testP1, cardST));
console.log('   Check Striker:', checkSingleBonusMatch(testP1, 'ストライカー'));
console.log('   Check CF position:', checkSingleBonusMatch(testP1, 'CF'));
