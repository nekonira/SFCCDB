const fs = require('fs');
const vm = require('vm');
const path = require('path');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];

const haifuPlayers = players.filter(p => 
  p.name.includes('配布') || 
  p.name.includes('ギフト') || 
  p.name.toUpperCase().includes('GIFT')
);

console.log('FOUND HAIFU PLAYERS COUNT:', haifuPlayers.length);
console.log(JSON.stringify(haifuPlayers.map(p => ({
  id: p.id,
  name: p.name,
  readingName: p.readingName,
  mainPosition: p.mainPosition,
  playStyle: p.playStyle,
  policy: p.policy,
  nationality: p.nationality,
  overall: p.overall,
  maxOverall: p.maxOverall
})), null, 2));
