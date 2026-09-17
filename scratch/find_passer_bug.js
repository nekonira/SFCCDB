const fs = require('fs');
global.window = global;
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const players = global.INITIAL_PLAYERS;
const cards = global.OFFICIAL_SPECIAL_CARDS;

// Find a player with セントラルAM or セントラルDM
const centralPlayer = players.find(p => p.playStyle === 'セントラルAM' || p.playStyle === 'セントラルDM');
console.log("Central Player:", centralPlayer.name, centralPlayer.mainPosition, centralPlayer.playStyle, centralPlayer.category);

// Find cards with パサー bonus
const passerCards = cards.filter(c => {
  if (!c.playstyleBonus) return false;
  const styleStr = JSON.stringify(c.playstyleBonus);
  return styleStr.includes('パサー');
});

console.log("Passer cards count:", passerCards.length);

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

console.log("\nEvaluating Passer Cards on Central Player (" + centralPlayer.name + "):");
passerCards.forEach(c => {
  const mult = sandbox.calculateCardBonusMult(centralPlayer, c);
  console.log(` - Card: "${c.name}" (${c.playstyleBonus.displayText || c.playstyleBonus.style}) -> Mult: ${mult}x`);
});
