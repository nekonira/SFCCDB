const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING 銀「スピードドリブラー」 DESCRIPTION ===');

const newDesc = "発動条件：途中出場　/　突破力・走力UP";

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
      if (ability.name === 'スピードドリブラー' && ability.rank === '銀') {
        if (ability.description !== newDesc) {
          ability.description = newDesc;
          updatedCount++;
        }
      }
    });
  }
});

// Replace in mockCode string for p354 (岩崎悠人) and any others
const targetOld1 = "{ name: 'スピードドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・走力UP' }";
const targetNew1 = "{ name: 'スピードドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・走力UP' }";

if (mockCode.includes(targetOld1)) {
  mockCode = mockCode.split(targetOld1).join(targetNew1);
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('1. mockData.js replaced targetOld1 successfully.');
} else {
  console.log('targetOld1 not found directly, performing structural rewrite if needed.');
}

const addScriptPath = path.join(__dirname, 'add_iwasakiyuto2026.js');
if (fs.existsSync(addScriptPath)) {
  let scriptCode = fs.readFileSync(addScriptPath, 'utf-8');
  if (scriptCode.includes(targetOld1)) {
    scriptCode = scriptCode.split(targetOld1).join(targetNew1);
    fs.writeFileSync(addScriptPath, scriptCode, 'utf-8');
    console.log('2. add_iwasakiyuto2026.js updated.');
  }
}

// Verification
const verifyCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(verifyCode, sandbox);

const speedDribblers = [];
sandbox.window.INITIAL_PLAYERS.forEach(p => {
  (p.abilities || []).forEach(a => {
    if (a.name === 'スピードドリブラー' && a.rank === '銀') {
      speedDribblers.push({ player: p.name, ability: a });
    }
  });
});

console.log('3. All 銀「スピードドリブラー」 in mockData.js:');
console.log(JSON.stringify(speedDribblers, null, 2));

console.log('=== UPDATE COMPLETE! ===');
