const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const ctx = { window: {} };
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(code, ctx);

const p381 = ctx.window.INITIAL_PLAYERS.find(x => x.id === 'p381');
console.log(p381.name, 'Skill:', JSON.stringify(p381.skill, null, 2));
