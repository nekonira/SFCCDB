const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];
console.log(`Loaded ${players.length} players for testing playStyle filter logic.`);

function filterByPlayStyle(players, playStyleFilter) {
  return players.filter(p => {
    if (playStyleFilter !== 'ALL') {
      const pStyle = p.playStyle || '';
      const pSubStyles = p.subPlayStyles || [];
      const allStyles = [pStyle, ...pSubStyles];
      const hasStyle = allStyles.some(s => {
        if (!s) return false;
        if (s === playStyleFilter) return true;
        if (playStyleFilter === 'ストライカー' && s.includes('ワイドストライカー')) return false;
        if (playStyleFilter === 'アタッカー' && s.includes('サイドアタッカー')) return false;
        return s.includes(playStyleFilter);
      });
      if (!hasStyle) return false;
    }
    return true;
  });
}

// 1. Test filtering by 'ストライカー'
const strikers = filterByPlayStyle(players, 'ストライカー');
console.log(`\n--- PLAYERS MATCHING 'ストライカー' (${strikers.length} players) ---`);
let wideStrikerInStrikers = false;
strikers.forEach(p => {
  console.log(`  [${p.id}] ${p.name} | PlayStyle: ${p.playStyle}`);
  if (p.playStyle && p.playStyle.includes('ワイドストライカー')) {
    wideStrikerInStrikers = true;
  }
});

// 2. Test filtering by 'ワイドストライカー'
const wideStrikers = filterByPlayStyle(players, 'ワイドストライカー');
console.log(`\n--- PLAYERS MATCHING 'ワイドストライカー' (${wideStrikers.length} players) ---`);
wideStrikers.forEach(p => {
  console.log(`  [${p.id}] ${p.name} | PlayStyle: ${p.playStyle}`);
});

console.log(`\nVERIFICATION: 'ワイドストライカー' in 'ストライカー' search? ${wideStrikerInStrikers ? 'FAIL ❌' : 'PASS ✅'}`);
