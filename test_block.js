const fs = require('fs');
const path = require('path');
const vm = require('vm');

const pyText = fs.readFileSync(path.join(__dirname, 'restore_all_players.py'), 'utf-8');
const pyBlocks = pyText.split(/id:\s*'p/);
for (let i = 1; i < pyBlocks.length; i++) {
  const b = pyBlocks[i];
  const numStr = b.split("'")[0];
  const num = parseInt(numStr, 10);
  if (num === 131) {
    console.log('--- RAW b ---');
    console.log(b.slice(0, 200));
    
    // We construct block:
    // b starts with "131',\n    name: '東口順昭(2026)', ..."
    let block = '{\n    id: \'p' + b;
    // Find the end of player object (before next player or ending bracket)
    const endIdx = block.indexOf('avatarUrl: \'\'');
    if (endIdx > 0) {
      block = block.slice(0, endIdx + 'avatarUrl: \'\''.length) + '\n  }';
    }
    
    console.log('--- CONSTRUCTED BLOCK ---');
    console.log(block.slice(0, 300));
    
    try {
      const sandbox = {};
      vm.createContext(sandbox);
      vm.runInContext('const p = ' + block, sandbox);
      console.log('VM PARSE SUCCESS:', sandbox.p.name);
    } catch(e) {
      console.error('VM PARSE ERROR:', e.message);
    }
  }
}
