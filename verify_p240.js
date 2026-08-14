const fs = require('fs');
const vm = require('vm');

const code = fs.readFileSync('src/data/mockData.js', 'utf-8');
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('Total players in mockData.js:', sandbox.window.INITIAL_PLAYERS.length);
const last = sandbox.window.INITIAL_PLAYERS[sandbox.window.INITIAL_PLAYERS.length - 1];
console.log('Last player:', last.id, last.name, 'Overall:', last.overall, 'MaxOverall:', last.maxOverall);
