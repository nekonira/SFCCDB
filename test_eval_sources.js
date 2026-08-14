const fs = require('fs');
const path = require('path');
const vm = require('vm');

const psText = fs.readFileSync(path.join(__dirname, 'clean_restore_mockdata.ps1'), 'utf-8');

const blocks = psText.split(/id:\s*'p/);
for (let i = 1; i < blocks.length; i++) {
  const raw = blocks[i];
  const lastBrace = raw.lastIndexOf('}');
  if (lastBrace > 0) {
    const b = raw.slice(0, lastBrace + 1);
    const code = '{\n  id: \'p' + b;
    try {
      const sandbox = {};
      vm.createContext(sandbox);
      vm.runInContext('const p = ' + code, sandbox);
      console.log(`SUCCESS: ${sandbox.p.id} -> ${sandbox.p.name}`);
    } catch (e) {
      console.error(`VM ERROR for block ${i}:`, e.message);
    }
  }
}
