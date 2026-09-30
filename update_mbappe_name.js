const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let content = fs.readFileSync(mockPath, 'utf-8');

if (content.includes("name: 'キリアン・エンバペ(2026)'")) {
  content = content.replace("name: 'キリアン・エンバペ(2026)'", "name: 'キリアン・エンバペ'");
  fs.writeFileSync(mockPath, content, 'utf-8');
  console.log('✅ Updated name to "キリアン・エンバペ" in mockData.js');
} else {
  console.log('ℹ️ Name "キリアン・エンバペ(2026)" not found or already updated.');
}

// Verify node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(content, sandbox);

const p395 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p395');
if (p395) {
  console.log('Verified p395 name:', p395.name);
}
