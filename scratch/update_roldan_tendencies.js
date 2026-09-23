const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Updating Cristian Roldan (p43) Play Tendencies ---');

const p43Idx = code.indexOf("id: 'p43'");
if (p43Idx === -1) {
  console.error("ERROR: id 'p43' not found in mockData.js");
  process.exit(1);
}

const p43EndIdx = code.indexOf("avatarUrl:", p43Idx);
const p43BlockEnd = code.indexOf("}", p43EndIdx);

let p43Block = code.substring(p43Idx, p43BlockEnd);

const newTendenciesObj = `playTendencies: {
      attack: 0,
      defense: 0,
      dribble: 0,
      shoot: 0,
      longShoot: 0,
      shortPass: 1,
      longPass: 0,
      throughPass: 0,
      cutIn: 0,
      keep: 0,
      delay: 0,
      rushOut: -1,
      feint: 0,
      press: 0
    }`;

p43Block = p43Block.replace(
  /playTendencies:\s*\{[\s\S]*?\}/,
  newTendenciesObj
);

code = code.substring(0, p43Idx) + p43Block + code.substring(p43BlockEnd);

fs.writeFileSync(mockPath, code, 'utf-8');
console.log('Successfully updated p43 playTendencies in mockData.js');

// Verify with Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const updatedPlayer = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p43');
console.log('Verified p43 (Cristian Roldan) playTendencies:', updatedPlayer.playTendencies);
