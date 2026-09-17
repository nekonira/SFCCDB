const fs = require('fs');
const jsx = fs.readFileSync('src/app.jsx', 'utf8');

// Extract function definitions directly from app.jsx
const normFunc = jsx.match(/function normalizeStyle[\s\S]*?function checkSingleBonusMatch/)[0];
const matchFunc = jsx.match(/function checkSingleBonusMatch[\s\S]*?function checkBonusMatch/)[0];
const bonusFunc = jsx.match(/function checkBonusMatch[\s\S]*?function getCardBonusList/)[0];
const listFunc = jsx.match(/function getCardBonusList[\s\S]*?function calculateCardBonusMult/)[0];
const calcFunc = jsx.match(/function calculateCardBonusMult[\s\S]*?const floor1Decimal/)[0];

const fullCode = normFunc + '\n' + matchFunc + '\n' + bonusFunc + '\n' + listFunc + '\n' + calcFunc;

eval(fullCode);

const testP1 = { name: '浅野拓磨', playStyle: 'ストライカー', mainPosition: 'CF' };
const testP2 = { name: '古橋亨梧', playStyle: 'ラインブレーカー', mainPosition: 'CF' };

const cardLB = { id: 'c1', name: 'ラインブレーカーカード', playstyleBonus: { style: 'ラインブレーカー 15% / CF 10%', bonuses: [{ style: 'ラインブレーカー', percent: 15 }, { style: 'CF', percent: 10 }] } };
const cardST = { id: 'c2', name: 'ストライカーカード', playstyleBonus: { style: 'ストライカー 15% / CF 10%', bonuses: [{ style: 'ストライカー', percent: 15 }, { style: 'CF', percent: 10 }] } };

console.log('=== VERIFICATION OF APP.JSX RUNTIME LOGIC ===');
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
