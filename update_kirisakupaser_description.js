const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING SILVER ABILITY "切り裂くパサー" DESCRIPTION ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

// Update Silver rank 切り裂くパサー description
// Search for: { name: '切り裂くパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・突破力UP' }
const target = "{ name: '切り裂くパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・突破力UP' }";
const replacement = "{ name: '切り裂くパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・突破力UP' }";

let count = 0;
while (mockCode.includes(target)) {
  mockCode = mockCode.replace(target, replacement);
  count++;
}

console.log(`Replaced ${count} occurrences of 銀「切り裂くパサー」 in mockData.js.`);

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
      if (a.name === '切り裂くパサー' && a.rank === '銀') {
        updatedCount++;
        console.log(`Verified player ${p.id} (${p.name}):`, a);
      }
    });
  }
});

console.log(`Total Silver "切り裂くパサー" verified: ${updatedCount}`);
