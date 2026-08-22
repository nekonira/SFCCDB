const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING 銀「切り裂くパサー」 AND TANAKA PAULO JUNICHI ABILITY ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

// 1. Update all 銀「切り裂くパサー」 description
const newKirisakuDesc = "発動条件：途中出場　/　ショートパス・突破力UP";
sandbox.window.INITIAL_PLAYERS.forEach(player => {
  if (player.abilities) {
    player.abilities.forEach(ability => {
      if (ability.name === '切り裂くパサー' && ability.rank === '銀') {
        ability.description = newKirisakuDesc;
      }
    });
  }
});

// 2. Update 田中パウロ淳一 (p363) 俊敏なタッチ rank to 銅
const p363 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p363' || p.name === '田中パウロ淳一');
if (p363 && p363.abilities) {
  p363.abilities.forEach(a => {
    if (a.name === '俊敏なタッチ') {
      a.rank = '銅';
      a.description = '発動条件：絶好調　/　ボールタッチ・敏捷性UP';
    }
  });
}

// Also replace in string format in mockData.js for persistence
const oldKirisaku = "{ name: '切り裂くパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・突破力UP' }";
const newKirisaku = "{ name: '切り裂くパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・突破力UP' }";

if (mockCode.includes(oldKirisaku)) {
  mockCode = mockCode.split(oldKirisaku).join(newKirisaku);
}

// Replace Tanaka Paulo's silver俊敏なタッチ in string
const p363Idx = mockCode.indexOf("id: 'p363'");
if (p363Idx !== -1) {
  const avatarIdx = mockCode.indexOf("avatarUrl:", p363Idx);
  const endIdx = mockCode.indexOf("}", avatarIdx);
  let p363Str = mockCode.substring(p363Idx, endIdx);
  p363Str = p363Str.replace(
    "{ name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }",
    "{ name: '俊敏なタッチ', rank: '銅', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }"
  );
  mockCode = mockCode.substring(0, p363Idx) + p363Str + mockCode.substring(endIdx);
}

fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('1. mockData.js updated successfully.');

// Also update add_tanakapaulojunichi2026.js if needed
const addScriptPath = path.join(__dirname, 'add_tanakapaulojunichi2026.js');
if (fs.existsSync(addScriptPath)) {
  let scriptCode = fs.readFileSync(addScriptPath, 'utf-8');
  scriptCode = scriptCode.replace(
    "{ name: '切り裂くパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・突破力UP' }",
    "{ name: '切り裂くパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・突破力UP' }"
  );
  scriptCode = scriptCode.replace(
    "{ name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }",
    "{ name: '俊敏なタッチ', rank: '銅', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }"
  );
  fs.writeFileSync(addScriptPath, scriptCode, 'utf-8');
  console.log('2. add_tanakapaulojunichi2026.js updated.');
}

// Verification
const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
const finalSandbox = { window: {} };
finalSandbox.window = finalSandbox;
vm.createContext(finalSandbox);
vm.runInContext(finalMockCode, finalSandbox);

const kirisakus = [];
finalSandbox.window.INITIAL_PLAYERS.forEach(p => {
  (p.abilities || []).forEach(a => {
    if (a.name === '切り裂くパサー' && a.rank === '銀') {
      kirisakus.push({ player: p.name, ability: a });
    }
  });
});

console.log('3. All 銀「切り裂くパサー」 in mockData.js:');
console.log(JSON.stringify(kirisakus, null, 2));

const verifiedP363 = finalSandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p363');
console.log('4. Verification for 田中パウロ淳一 abilities:');
console.log(JSON.stringify(verifiedP363 ? verifiedP363.abilities : null, null, 2));

console.log('=== UPDATE COMPLETE! ===');
