const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const ctx = { window: {} };
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(code, ctx);

const players = ctx.window.INITIAL_PLAYERS;
const dmfPlayers = players.filter(p => p.mainPosition === 'DMF' || (p.subPositions && p.subPositions.includes('DMF')));
const omfPlayers = players.filter(p => p.mainPosition === 'OMF' || (p.subPositions && p.subPositions.includes('OMF')));

console.log('=== FINAL AUDIT ===');
console.log('DMF Players Count:', dmfPlayers.length);
console.log('OMF Players Count:', omfPlayers.length);

const dmPlayers = players.filter(p => p.mainPosition === 'DM');
const amPlayers = players.filter(p => p.mainPosition === 'AM');
console.log('DM Players Count:', dmPlayers.length);
console.log('AM Players Count:', amPlayers.length);

console.log('POSITIONS array in SAKATSUKU_DATA:', ctx.window.SAKATSUKU_DATA.POSITIONS);
