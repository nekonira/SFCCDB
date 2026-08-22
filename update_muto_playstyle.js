const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING YOSHINORI MUTO PLAYSTYLE ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p364Idx = mockCode.indexOf("id: 'p364'");
if (p364Idx !== -1) {
  const avatarIdx = mockCode.indexOf("avatarUrl:", p364Idx);
  const endIdx = mockCode.indexOf("}", avatarIdx);
  let p364Str = mockCode.substring(p364Idx, endIdx);
  p364Str = p364Str.replace("playStyle: 'サイドアタッカー'", "playStyle: 'サイドアタッカーLW'");
  mockCode = mockCode.substring(0, p364Idx) + p364Str + mockCode.substring(endIdx);
}

// Add 'サイドアタッカーLW' to window.SAKATSUKU_DATA.PLAY_STYLES if not included
if (mockCode.includes("PLAY_STYLES: [") && !mockCode.includes("'サイドアタッカーLW'")) {
  mockCode = mockCode.replace(
    "'ドリブラーLW'] }",
    "'ドリブラーLW', 'サイドアタッカーLW'] }"
  );
}

fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('1. mockData.js updated with playStyle: サイドアタッカーLW.');

const addScriptPath = path.join(__dirname, 'add_mutoyoshinori2026.js');
if (fs.existsSync(addScriptPath)) {
  let scriptCode = fs.readFileSync(addScriptPath, 'utf-8');
  scriptCode = scriptCode.replace("playStyle: 'サイドアタッカー'", "playStyle: 'サイドアタッカーLW'");
  if (!scriptCode.includes("'サイドアタッカーLW'")) {
    scriptCode = scriptCode.replace(
      "'ドリブラーLW'] }",
      "'ドリブラーLW', 'サイドアタッカーLW'] }"
    );
  }
  fs.writeFileSync(addScriptPath, scriptCode, 'utf-8');
  console.log('2. add_mutoyoshinori2026.js updated.');
}

// Verification
const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(finalMockCode, sandbox);

const p364 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p364');
console.log('3. Verification for 武藤嘉紀:');
console.log(JSON.stringify(p364 ? { name: p364.name, playStyle: p364.playStyle } : null, null, 2));

console.log('=== PLAYSTYLE UPDATE COMPLETE! ===');
