const fs = require('fs');
global.window = global;

require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const players = global.INITIAL_PLAYERS;
const cards = global.OFFICIAL_SPECIAL_CARDS;

const appJsCode = fs.readFileSync('./src/app.js', 'utf8');

const vm = require('vm');
const sandbox = {
  global,
  console,
  window: global,
  React: { createElement: () => ({}), useState: (i) => [i, () => {}], useMemo: (f) => f(), useEffect: () => {}, useCallback: (f) => f, useRef: () => ({}) },
  ReactDOM: { render: () => {} }
};
vm.createContext(sandbox);
vm.runInContext(appJsCode, sandbox);

console.log("=== FINAL VERIFICATION TEST ON ALL PLAYERS & CARDS ===");

const passerCards = cards.filter(c => c.playstyleBonus && ((c.playstyleBonus.style && c.playstyleBonus.style.includes('パサー')) || (c.playstyleBonus.displayText && c.playstyleBonus.displayText.includes('パサー'))));
const centralPlayers = players.filter(p => p.playStyle === 'セントラルAM' || p.playStyle === 'セントラルDM');

console.log(`Testing ${passerCards.length} Passer Cards on ${centralPlayers.length} Central MF/AM/DM Players:`);

let falsePasserMatches = 0;

centralPlayers.forEach(p => {
  passerCards.forEach(c => {
    const list = sandbox.getCardBonusList(c);
    const matchedPasser = list.some(b => b.style.includes('パサー') && sandbox.checkSingleBonusMatch(p, b.style));
    if (matchedPasser) {
      falsePasserMatches++;
      console.log(`[FAIL] Central Player ${p.name} (${p.playStyle}) matched Passer bonus of card "${c.name}"`);
    }
  });
});

if (falsePasserMatches === 0) {
  console.log("SUCCESS: 0 false passer matches found! Central players NEVER get passer playstyle bonuses!");
} else {
  console.log(`FAILURE: ${falsePasserMatches} false passer matches found!`);
}
