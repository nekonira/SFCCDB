const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Checking AutoSelectModal body for undefined components or variables ===');

const modalStart = lines.findIndex(l => l.includes('function AutoSelectModal('));
const modalEnd = lines.findIndex((l, idx) => idx > modalStart && l.startsWith('}'));

console.log(`AutoSelectModal lines: ${modalStart+1} to ${modalEnd+1}`);

const modalBody = lines.slice(modalStart, modalEnd).join('\n');

['Icon', 'renderAutoSelectRankBadge', 'availableAbilities', 'availableSkills', 'filteredAbilities', 'filteredSkills', 'isOwnedManagerOpen'].forEach(symbol => {
  const count = (modalBody.match(new RegExp(symbol, 'g')) || []).length;
  console.log(`Symbol "${symbol}": ${count} references`);
});
