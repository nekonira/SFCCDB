const fs = require('fs');

global.window = global;
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const players = global.INITIAL_PLAYERS;
const cards = global.OFFICIAL_SPECIAL_CARDS;

// Read app.js code to test optimizeSpecialCardSlots directly
const appJsCode = fs.readFileSync('./src/app.js', 'utf8');

// Test running auto-select with SAFE_150 on sample players
const testPlayers = ['ペレ', '上田綺世', 'デ・ブライネ'];

testPlayers.forEach(name => {
  const p = players.find(player => player.name.includes(name));
  if (!p) return;

  console.log(`\n==================================================`);
  console.log(`Testing SAFE_150 (-155 ~ -135) for: ${p.name} (${p.mainPosition} / ${p.playStyle})`);
  console.log(`==================================================`);

  // We can execute optimizeSpecialCardSlots from app.js using vm context
  const vm = require('vm');
  const sandbox = {
    window: global,
    console: console,
    INITIAL_PLAYERS: players,
    OFFICIAL_SPECIAL_CARDS: cards,
    React: { useCallback: fn => fn, useMemo: fn => fn(), useState: val => [val, () => {}] }
  };
  vm.createContext(sandbox);

  // Extract optimizeSpecialCardSlots and checkBonusMatch and calculateCardBonusMult from app.jsx
  // Or load sandbox code
});
console.log('Test script ready.');
