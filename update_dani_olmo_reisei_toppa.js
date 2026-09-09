const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

const p380Idx = code.indexOf("id: 'p380'");
if (p380Idx === -1) {
  console.error("Could not find p380!");
  process.exit(1);
}

const p380AvatarIdx = code.indexOf("avatarUrl:", p380Idx);
const p380EndIdx = code.indexOf("}", p380AvatarIdx);

let p380ObjStr = code.substring(p380Idx, p380EndIdx + 1);

p380ObjStr = p380ObjStr.replace(
  /name:\s*['"]生成な突破['"],\s*rank:\s*['"]銀['"],\s*description:\s*['"][^'"]*['"]/,
  "name: '冷静な突破', rank: '銀', description: '発動条件：絶好調　/　冷静さ・突破力UP'"
);

code = code.substring(0, p380Idx) + p380ObjStr + code.substring(p380EndIdx + 1);
fs.writeFileSync(mockPath, code, 'utf-8');
console.log("Updated p380 (ダニ・オルモ) Silver ability to 冷静な突破.");

// Verification
const ctx = { window: {} };
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(code, ctx);
const p380 = ctx.window.INITIAL_PLAYERS.find(p => p.id === 'p380');
console.log('Verified p380 abilities:', JSON.stringify(p380.abilities, null, 2));
