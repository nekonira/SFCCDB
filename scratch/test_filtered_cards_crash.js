const fs = require('fs');
const vm = require('vm');

const specialCardsJs = fs.readFileSync('src/data/specialCardsData.js', 'utf8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(specialCardsJs, sandbox);

const officialCards = sandbox.window.OFFICIAL_SPECIAL_CARDS;
console.log('Testing card filtering on', officialCards.length, 'cards...');

const getSpecialCardSkill = (c) => c?.skill || null;
const getSpecialCardEffect = (c) => (c?.effect || c?.specialEffect) ? (c.effect || c.specialEffect) : null;

let crashCount = 0;
officialCards.forEach((c, idx) => {
  try {
    const q = ''.toLowerCase();
    const sk = getSpecialCardSkill(c);
    const ef = getSpecialCardEffect(c);
    const matchSearch = true; // test query search if query was typed
    
    // Test with query = "a" or non-empty query
    const qTest = 'a';
    const matchQuery = 
      c.name.toLowerCase().includes(qTest) || 
      (sk && (
        (sk.name && sk.name.toLowerCase().includes(qTest)) || 
        (sk.description && sk.description.toLowerCase().includes(qTest))
      )) ||
      (ef && (
        (ef.name && ef.name.toLowerCase().includes(qTest)) || 
        (ef.description && ef.description.toLowerCase().includes(qTest))
      ));
  } catch (err) {
    console.error(`CRASH on card #${idx} (${c.name}):`, err.message);
    crashCount++;
  }
});

console.log('Done testing. Crashes:', crashCount);

// Test without safe navigation as written in app.jsx:
console.log('\n--- Testing exact code from app.jsx ---');
officialCards.forEach((c, idx) => {
  try {
    const q = 'a';
    const sk = getSpecialCardSkill(c);
    const ef = getSpecialCardEffect(c);
    const matchSearch = !q || 
      c.name.toLowerCase().includes(q) || 
      (sk && (sk.name.toLowerCase().includes(q) || (sk.description && sk.description.toLowerCase().includes(q)))) ||
      (ef && (ef.name.toLowerCase().includes(q) || (ef.description && ef.description.toLowerCase().includes(q))));
  } catch (err) {
    console.error(`EXACT CRASH on card #${idx} (${c.name}):`, err.message);
  }
});
