const fs = require('fs');
const vm = require('vm');

const specialCardsJs = fs.readFileSync('src/data/specialCardsData.js', 'utf8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(specialCardsJs, sandbox);

const officialCards = sandbox.window.OFFICIAL_SPECIAL_CARDS;

const getSpecialCardSkill = (c) => c?.skill || null;
const getSpecialCardEffect = (c) => (c?.effect || c?.specialEffect) ? (c.effect || c.specialEffect) : null;

console.log('--- Testing unsafe code from app.jsx ---');
officialCards.forEach((c, idx) => {
  try {
    const q = 'a';
    const sk = getSpecialCardSkill(c);
    const ef = getSpecialCardEffect(c);
    const matchSearch = !q || 
      c.name.toLowerCase().includes(q) || 
      (sk && (sk.name.toLowerCase().includes(q) || sk.description.toLowerCase().includes(q))) ||
      (ef && (ef.name.toLowerCase().includes(q) || ef.description.toLowerCase().includes(q)));
  } catch (err) {
    console.error(`UNSAFE CRASH on card #${idx} (${c.name}):`, err.message);
  }
});
