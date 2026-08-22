const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING 銀「裏への飛び出し」 DESCRIPTION ===');

const newDesc = "発動条件：絶好調　/　決定力・走力UP";

// Update mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

let updatedCount = 0;
sandbox.window.INITIAL_PLAYERS.forEach(player => {
  if (player.abilities) {
    player.abilities.forEach(ability => {
      if (ability.name === '裏への飛び出し' && ability.rank === '銀') {
        if (ability.description !== newDesc) {
          ability.description = newDesc;
          updatedCount++;
        }
      }
    });
  }
});

const targetOld1 = "{ name: '裏への飛び出し', rank: '銀', description: '発動条件：途中出場　/　決定力・走力UP' }";
const targetNew1 = "{ name: '裏への飛び出し', rank: '銀', description: '発動条件：絶好調　/ decision力・走力UP' }".replace("decision力", "決定力");

if (mockCode.includes(targetOld1)) {
  mockCode = mockCode.split(targetOld1).join(targetNew1);
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('1. mockData.js replaced targetOld1 successfully.');
} else {
  console.log('targetOld1 not found directly, performing structural rewrite if needed.');
}

const addScripts = [
  'add_yamadahiroto2026ts.js',
  'add_tanakasora2026.js',
  'add_mutoyoshinori2026.js',
  'add_antanchen2026.js'
];

addScripts.forEach(scriptName => {
  const addScriptPath = path.join(__dirname, scriptName);
  if (fs.existsSync(addScriptPath)) {
    let scriptCode = fs.readFileSync(addScriptPath, 'utf-8');
    if (scriptCode.includes(targetOld1)) {
      scriptCode = scriptCode.split(targetOld1).join(targetNew1);
      fs.writeFileSync(addScriptPath, scriptCode, 'utf-8');
      console.log(`2. ${scriptName} updated.`);
    }
  }
});

// Verification
const verifyCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(verifyCode, sandbox);

const runBehinds = [];
sandbox.window.INITIAL_PLAYERS.forEach(p => {
  (p.abilities || []).forEach(a => {
    if (a.name === '裏への飛び出し' && a.rank === '銀') {
      runBehinds.push({ player: p.name, ability: a });
    }
  });
});

console.log('3. All 銀「裏への飛び出し」 in mockData.js:');
console.log(JSON.stringify(runBehinds, null, 2));

console.log('=== UPDATE COMPLETE! ===');
