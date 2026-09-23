const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Updating Bronze 冷静なゲームメイク description in mockData.js ---');

const oldStr = `      {
        name: '冷静なゲームメイク',
        rank: '銅',
        description: '発動条件：絶好調　/　冷静さ・ロングパスUP'
      }`;

const newStr = `      {
        name: '冷静なゲームメイク',
        rank: '銅',
        description: '発動条件：途中出場　/　冷静さ・ロングパスUP'
      }`;

if (code.includes(oldStr)) {
  code = code.replace(oldStr, newStr);
  fs.writeFileSync(mockPath, code, 'utf-8');
  console.log('SUCCESS! Updated exact matching block in mockData.js');
} else {
  const updatedCode = code.replace(
    /(name:\s*['"]冷静なゲームメイク['"],\s*rank:\s*['"]銅['"],\s*description:\s*['"])[^'"]+(['"])/g,
    '$1発動条件：途中出場　/　冷静さ・ロングパスUP$2'
  );
  fs.writeFileSync(mockPath, updatedCode, 'utf-8');
  console.log('SUCCESS! Updated via regex in mockData.js');
}

// Verify with Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
players.forEach(p => {
  if (p.abilities) {
    p.abilities.forEach(a => {
      if (a.name === '冷静なゲームメイク') {
        console.log(`Verified Player ${p.id} (${p.name}), Rank: ${a.rank}, Description: "${a.description}"`);
      }
    });
  }
});
