const fs = require('fs');
const path = require('path');
const vm = require('vm');

const psText = fs.readFileSync(path.join(__dirname, 'clean_restore_mockdata.ps1'), 'utf-8');

const matchTail = psText.match(/\$tail\s*=\s*@"([\s\S]*?)"@/);

if (matchTail) {
  let content = matchTail[1].trim();
  const lastIdx = content.lastIndexOf("avatarUrl: ''");
  if (lastIdx > 0) {
    content = content.slice(0, lastIdx + "avatarUrl: ''".length) + '\n    }';
  }
  
  const fullJs = 'window.players = [\n' + content + '\n];';
  
  try {
    const sandbox = { window: {} };
    vm.createContext(sandbox);
    vm.runInContext(fullJs, sandbox);
    console.log(`🎉 SUCCESS!! Evaluated ${sandbox.window.players.length} tail players from clean_restore_mockdata.ps1!`);
    sandbox.window.players.forEach(p => console.log(`  ${p.id}: ${p.name}`));
  } catch (e) {
    console.error('VM Error:', e.message);
  }
}
