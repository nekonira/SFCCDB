const fs = require('fs');
const jsx = fs.readFileSync('src/app.jsx', 'utf8');

const startIndex = jsx.indexOf('function normalizeStyle(');
const endIndex = jsx.indexOf('const POSITION_LIMIT_ADDITIONS');

const extractedCode = jsx.substring(startIndex, endIndex);

const fullCode = `
${extractedCode}

module.exports = {
  normalizeStyle,
  checkSingleBonusMatch,
  checkBonusMatch,
  getCardBonusList,
  calculateCardBonusMult
};
`;

fs.writeFileSync('scratch/temp_funcs.js', fullCode, 'utf8');

const funcs = require('./temp_funcs.js');

const testP1 = { name: '浅野拓磨', playStyle: 'ストライカー', mainPosition: 'CF' };
const testP2 = { name: '古橋亨梧', playStyle: 'ラインブレーカー', mainPosition: 'CF' };

const cardLB = { id: 'c1', name: 'ラインブレーカーカード', playstyleBonus: { style: 'ラインブレーカー 15% / CF 10%', bonuses: [{ style: 'ラインブレーカー', percent: 15 }, { style: 'CF', percent: 10 }] } };
const cardST = { id: 'c2', name: 'ストライカーカード', playstyleBonus: { style: 'ストライカー 15% / CF 10%', bonuses: [{ style: 'ストライカー', percent: 15 }, { style: 'CF', percent: 10 }] } };

console.log('=== VERIFICATION OF APP.JSX RUNTIME LOGIC ===');
console.log('1. Striker Player + LineBreaker Card:');
console.log('   Multiplier:', funcs.calculateCardBonusMult(testP1, cardLB));
console.log('   Check LineBreaker:', funcs.checkSingleBonusMatch(testP1, 'ラインブレーカー'));
console.log('   Check CF position:', funcs.checkSingleBonusMatch(testP1, 'CF'));

console.log('\n2. LineBreaker Player + Striker Card:');
console.log('   Multiplier:', funcs.calculateCardBonusMult(testP2, cardST));
console.log('   Check Striker:', funcs.checkSingleBonusMatch(testP2, 'ストライカー'));
console.log('   Check CF position:', funcs.checkSingleBonusMatch(testP2, 'CF'));

console.log('\n3. LineBreaker Player + LineBreaker Card:');
console.log('   Multiplier:', funcs.calculateCardBonusMult(testP2, cardLB));
console.log('   Check LineBreaker:', funcs.checkSingleBonusMatch(testP2, 'ラインブレーカー'));
console.log('   Check CF position:', funcs.checkSingleBonusMatch(testP2, 'CF'));

console.log('\n4. Striker Player + Striker Card:');
console.log('   Multiplier:', funcs.calculateCardBonusMult(testP1, cardST));
console.log('   Check Striker:', funcs.checkSingleBonusMatch(testP1, 'ストライカー'));
console.log('   Check CF position:', funcs.checkSingleBonusMatch(testP1, 'CF'));
