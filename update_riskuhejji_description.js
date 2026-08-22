const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING SILVER ABILITY "リスクヘッジパサー" DESCRIPTION ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const target = "{ name: 'リスクヘッジパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・マークUP' }";
const replacement = "{ name: 'リスクヘッジパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・マークUP' }";

let count = 0;
while (mockCode.includes(target)) {
  mockCode = mockCode.replace(target, replacement);
  count++;
}

console.log(`Replaced ${count} occurrences of 銀「リスクヘッジパサー」 in mockData.js.`);

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
      if (a.name === 'リスクヘッジパサー' && a.rank === '銀') {
        updatedCount++;
        console.log(`Verified player ${p.id} (${p.name}):`, a);
      }
    });
  }
});

console.log(`Total Silver "リスクヘッジパサー" verified: ${updatedCount}`);
