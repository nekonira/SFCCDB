const fs = require('fs');
const vm = require('vm');

const code = fs.readFileSync('src/data/mockData.js', 'utf-8');
const ctx = { window: {} };
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(code, ctx);

const nats = [...new Set(ctx.window.INITIAL_PLAYERS.map(p => p.nationality).filter(Boolean))];
console.log('Unique Nationalities Count:', nats.length);
console.log(nats.sort());
