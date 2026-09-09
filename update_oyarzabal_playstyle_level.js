const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

const p379Idx = code.indexOf("id: 'p379'");
if (p379Idx === -1) {
  console.error("Could not find p379!");
  process.exit(1);
}

// Find playStyleLevel for p379
const p379Slice = code.substring(p379Idx, p379Idx + 500);
const updatedSlice = p379Slice.replace("playStyleLevel: 'Ⅲ'", "playStyleLevel: 'Ⅱ'");

if (p379Slice === updatedSlice) {
  console.log("playStyleLevel was already 'Ⅱ' or not matched.");
} else {
  code = code.substring(0, p379Idx) + updatedSlice + code.substring(p379Idx + 500);
  fs.writeFileSync(mockPath, code, 'utf-8');
  console.log("Updated p379 (ミケル・オヤルサバル) playStyleLevel to 'Ⅱ'.");
}

// Verification
const ctx = { window: {} };
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(code, ctx);
const p379 = ctx.window.INITIAL_PLAYERS.find(p => p.id === 'p379');
console.log('Verified p379 playStyleLevel:', p379 ? p379.playStyleLevel : 'MISSING');
