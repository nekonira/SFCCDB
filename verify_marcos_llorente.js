const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const ctx = { window: {} };
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(code, ctx);

console.log('Total players in DB:', ctx.window.INITIAL_PLAYERS.length);
const p = ctx.window.INITIAL_PLAYERS.slice(-1)[0];
console.log('Last Player Added:', JSON.stringify(p, null, 2));
