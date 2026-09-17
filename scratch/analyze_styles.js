const fs = require('fs');

// Read specialCardsData.js and mockData.js
const cardsText = fs.readFileSync('src/data/specialCardsData.js', 'utf8');
const mockText = fs.readFileSync('src/data/mockData.js', 'utf8');

const bonusStyles = new Set();
const cardStyleRegex = /style:\s*'([^']+)'/g;
let m;
while ((m = cardStyleRegex.exec(cardsText)) !== null) {
  bonusStyles.add(m[1]);
}

const playerStyles = new Set();
const playStyleRegex = /playStyle:\s*'([^']+)'/g;
while ((m = playStyleRegex.exec(mockText)) !== null) {
  playerStyles.add(m[1]);
}

console.log('--- Unique Card Bonus Styles ---');
console.log(Array.from(bonusStyles).sort());

console.log('\n--- Unique Player PlayStyles ---');
console.log(Array.from(playerStyles).sort());
