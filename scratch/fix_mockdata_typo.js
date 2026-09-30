const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

mockCode = mockCode.replace('発動条件：セービング時　/{セービング・反応速度UP', '発動条件：セービング時　/　セービング・反応速度UP');

fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('✅ Fixed typo in mockData.js');

// Test with VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

try {
  vm.runInContext(mockCode, sandbox);
  console.log('🎉 VM EVALUATION SUCCESSFUL!');
  const p105 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p105');
  console.log('Player p105:', p105.name);
  console.log('Overall:', p105.overall, '-> Max:', p105.maxOverall);
  console.log('Base Stats:', p105.baseStats);
  console.log('Detail Stats:', p105.detailStats);
  console.log('Max Enhanced Base Stats:', p105.maxEnhanced.baseStats);
  console.log('Max Enhanced Detail Stats:', p105.maxEnhanced.detailStats);
} catch (e) {
  console.error('❌ VM Evaluation Error:', e.message);
}
