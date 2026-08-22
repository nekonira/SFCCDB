const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING SILVER ABILITY "反転攻勢" DESCRIPTION ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const target = "{ name: '反転攻勢', rank: '銀', description: '発動条件：絶好調　/　タックル・ショートパスUP' }";
const replacement = "{ name: '反転攻勢', rank: '銀', description: '発動条件：途中出場　/　突破力・タックルUP' }";

let count = 0;
while (mockCode.includes(target)) {
  mockCode = mockCode.replace(target, replacement);
  count++;
}

console.log(`Replaced ${count} occurrences of 銀「反転攻勢」 in mockData.js.`);

fs.writeFileSync(mockPath, mockCode, 'utf-8');

// Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);

let updatedCount = 0;
sandbox.window.INITIAL_PLAYERS.forEach(p => {
  if (p.abilities) {
    p.abilities.forEach(a => {
      if (a.name === '反転攻勢' && a.rank === '銀') {
        updatedCount++;
        console.log(`Verified player ${p.id} (${p.name}):`, a);
      }
    });
  }
});

console.log(`Total Silver "反転攻勢" verified: ${updatedCount}`);
