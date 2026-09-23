const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Updating Kobbie Mainoo (p393) Play Tendencies ---');

const p393Idx = code.indexOf("id: 'p393'");
if (p393Idx === -1) {
  console.error("ERROR: id 'p393' not found in mockData.js");
  process.exit(1);
}

const p393EndIdx = code.indexOf("avatarUrl:", p393Idx);
const p393BlockEnd = code.indexOf("}", p393EndIdx);

let p393Block = code.substring(p393Idx, p393BlockEnd);

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

p393Block = p393Block.replace(
  /playTendencies:\s*\{[\s\S]*?\}/,
  newTendenciesObj
);

code = code.substring(0, p393Idx) + p393Block + code.substring(p393BlockEnd);

fs.writeFileSync(mockPath, code, 'utf-8');
console.log('Successfully updated p393 playTendencies in mockData.js');

// Verify with Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const updatedPlayer = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p393');
console.log('Verified p393 playTendencies:', updatedPlayer.playTendencies);
