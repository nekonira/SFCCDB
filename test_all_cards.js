const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Testing all 123 special cards data integrity for null/undefined crashes ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

// Load index.html script files into VM
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');

const sandbox = { window: {}, console: console };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(fs.readFileSync(specialCardsPath, 'utf-8'), sandbox);
vm.runInContext(fs.readFileSync(mockPath, 'utf-8'), sandbox);

const cards = sandbox.window.OFFICIAL_SPECIAL_CARDS || [];
const players = sandbox.window.INITIAL_PLAYERS || [];

console.log(`Loaded ${cards.length} cards and ${players.length} players.`);

// Extract helpers from app.jsx
// Run helpers in VM
const helpersCode = `
${appJsxCode.substring(appJsxCode.indexOf('function normalizeStyle'), appJsxCode.indexOf('const floor1Decimal ='))}
const floor1Decimal = (num) => {
  const n = Number(num) || 0;
  const sign = n < 0 ? -1 : 1;
  const abs = Math.abs(n);
  return (Math.floor((abs + 0.0000001) * 10) / 10) * sign;
};
`;

vm.runInContext(helpersCode, sandbox);

let errorCount = 0;

cards.forEach((c, idx) => {
  try {
    const list = sandbox.getCardBonusList(c);
    players.slice(0, 10).forEach(p => {
      sandbox.calculateCardBonusMult(p, c);
      list.forEach(b => {
        sandbox.checkSingleBonusMatch(p, b.style);
      });
    });
  } catch (err) {
    errorCount++;
    console.error(`CRASH on card #${idx} (${c ? c.name : 'null'}):`, err.message);
  }
});

console.log(`Card bonus test finished with ${errorCount} error(s).`);
