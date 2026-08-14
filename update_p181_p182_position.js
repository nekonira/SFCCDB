const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING MAIN POSITION FOR p181 & p182 TO AM ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

// Find p181 block
const p181Idx = code.indexOf("id: 'p181'");
const p181MainPosIdx = code.indexOf("mainPosition: 'OMF'", p181Idx);
if (p181MainPosIdx !== -1 && p181MainPosIdx < code.indexOf("id: 'p182'", p181Idx)) {
  code = code.substring(0, p181MainPosIdx) + "mainPosition: 'AM'" + code.substring(p181MainPosIdx + "mainPosition: 'OMF'".length);
  console.log('Updated p181 (西澤健太(2026)) mainPosition to AM.');
} else {
  console.error('Could not find mainPosition for p181!');
}

// Find p182 block
const p182Idx = code.indexOf("id: 'p182'");
const p182MainPosIdx = code.indexOf("mainPosition: 'OMF'", p182Idx);
if (p182MainPosIdx !== -1 && p182MainPosIdx < code.indexOf("id: 'p183'", p182Idx)) {
  code = code.substring(0, p182MainPosIdx) + "mainPosition: 'AM'" + code.substring(p182MainPosIdx + "mainPosition: 'OMF'".length);
  console.log('Updated p182 (イ・ヒギュン(2026)) mainPosition to AM.');
} else {
  console.error('Could not find mainPosition for p182!');
}

fs.writeFileSync(mockPath, code, 'utf-8');

// Verification
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];
const p181 = players.find(p => p.id === 'p181');
const p182 = players.find(p => p.id === 'p182');

console.log('Verification:');
console.log('p181:', p181 ? { name: p181.name, mainPosition: p181.mainPosition } : 'MISSING');
console.log('p182:', p182 ? { name: p182.name, mainPosition: p182.mainPosition } : 'MISSING');

if (p181 && p181.mainPosition === 'AM' && p182 && p182.mainPosition === 'AM') {
  console.log('🎉 BOTH p181 AND p182 MAIN POSITIONS SUCCESSFULLY UPDATED TO AM!');
} else {
  console.error('❌ Verification failed!');
  process.exit(1);
}
