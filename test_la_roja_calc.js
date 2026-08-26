const fs = require('fs');
const path = require('path');
const vm = require('vm');

const appJsPath = path.join(__dirname, 'src', 'app.js');
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');

const mockCode = fs.readFileSync(mockPath, 'utf-8');
const appJsCode = fs.readFileSync(appJsPath, 'utf-8');

const ctx = { window: {}, console: console, Math: Math, parseInt: parseInt, String: String, Array: Array, Object: Object };
ctx.window = ctx;
vm.createContext(ctx);

vm.runInContext(mockCode, ctx);

console.log('--- Testing La Roja 26 combo calculation ---');
const players = ctx.window.INITIAL_PLAYERS;
const yamal = players.find(p => p.name === 'ラミン・ヤマル');
const cubarsi = players.find(p => p.name === 'パウ・クバルシ');
const gavi = players.find(p => p.name === 'ガビ');
const simon = players.find(p => p.name === 'ウナイ・シモン');

console.log('Yamal found:', yamal ? yamal.name : 'NO');
console.log('Cubarsi found:', cubarsi ? cubarsi.name : 'NO');
console.log('Gavi found:', gavi ? gavi.name : 'NO');
console.log('Simon found:', simon ? simon.name : 'NO');
