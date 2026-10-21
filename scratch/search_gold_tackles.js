const fs = require('fs');
const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const cardCode = fs.readFileSync('src/data/specialCardsData.js', 'utf-8');

function findGoldAbilities(text) {
  const reg = /\{\s*name:\s*['"]([^'"]+)['"],\s*rank:\s*['"]金['"],\s*description:\s*['"]([^'"]+)['"]\s*\}/g;
  let match;
  const results = [];
  while ((match = reg.exec(text)) !== null) {
    if (match[1].includes('タックル') || match[2].includes('タックル')) {
      results.push({ name: match[1], desc: match[2] });
    }
  }
  return results;
}

console.log('MockData Gold Tackle Abilities:');
console.log(findGoldAbilities(mockCode));
console.log('CardData Gold Tackle Abilities:');
console.log(findGoldAbilities(cardCode));
