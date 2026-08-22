const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING SILVER ABILITY "絢爛なインターセプト" DESCRIPTION ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const target = "{ name: '絢爛なインターセプト', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・パスカットUP' }";
const replacement = "{ name: '絢爛なインターセプト', rank: '銀', description: '発動条件：好調　/　ボールタッチ・パスカットUP' }";

let count = 0;
while (mockCode.includes(target)) {
  mockCode = mockCode.replace(target, replacement);
  count++;
}

console.log(`Replaced ${count} occurrences of 銀「絢爛なインターセプト」 in mockData.js.`);

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
      if (a.name === '絢爛なインターセプト' && a.rank === '銀') {
        updatedCount++;
        console.log(`Verified player ${p.id} (${p.name}):`, a);
      }
    });
  }
});

console.log(`Total Silver "絢爛なインターセプト" verified: ${updatedCount}`);
