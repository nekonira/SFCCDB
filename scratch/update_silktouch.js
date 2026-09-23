const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Updating Silver シルクタッチ description in mockData.js ---');

// Search before update
const sandbox1 = { window: {} };
sandbox1.window = sandbox1;
vm.createContext(sandbox1);
vm.runInContext(code, sandbox1);

console.log('Players with Silver シルクタッチ before update:');
sandbox1.window.INITIAL_PLAYERS.forEach(p => {
  if (p.abilities) {
    p.abilities.forEach(a => {
      if (a.name === 'シルクタッチ' && a.rank === '銀') {
        console.log(`- ${p.id} (${p.name}): "${a.description}"`);
      }
    });
  }
});

// Update Silver シルクタッチ description across mockData.js
code = code.replace(
  /(name:\s*['"]シルクタッチ['"],\s*rank:\s*['"]銀['"],\s*description:\s*['"])[^'"]+(['"])/g,
  '$1発動条件：途中出場　/　ショートパス・ボールタッチUP$2'
);

fs.writeFileSync(mockPath, code, 'utf-8');
console.log('Successfully updated Silver シルクタッチ in mockData.js');

// Verify with Node VM
const sandbox2 = { window: {} };
sandbox2.window = sandbox2;
vm.createContext(sandbox2);
vm.runInContext(code, sandbox2);

console.log('\nPlayers with Silver シルクタッチ after update:');
sandbox2.window.INITIAL_PLAYERS.forEach(p => {
  if (p.abilities) {
    p.abilities.forEach(a => {
      if (a.name === 'シルクタッチ' && a.rank === '銀') {
        console.log(`- ${p.id} (${p.name}): "${a.description}"`);
      }
    });
  }
});
