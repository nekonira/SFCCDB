const fs = require('fs');
const vm = require('vm');

const specialCardsJs = fs.readFileSync('src/data/specialCardsData.js', 'utf8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(specialCardsJs, sandbox);

const officialCards = sandbox.window.OFFICIAL_SPECIAL_CARDS;

const parseStatVal = (val) => {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const clean = val.replace(/\(.*?\)/g, '').replace(/[^0-9.-]/g, '');
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : num;
  }
  return 0;
};

console.log('Testing c.stages baseSum & maxSum on', officialCards.length, 'cards...');

let crashCount = 0;
officialCards.forEach((c, idx) => {
  try {
    // Unsafe code:
    const baseSumUnsafe = Object.values(c.stages['無凸'] || {}).reduce((a, b) => a + b, 0).toFixed(1);
    const maxSumUnsafe = Object.values(c.stages['完凸'] || {}).reduce((a, b) => a + b, 0).toFixed(1);
  } catch (err) {
    console.error(`CRASH on card #${idx} (${c.name}):`, err.message);
    crashCount++;
  }
});

console.log('Total crashes with unsafe reduce:', crashCount);
