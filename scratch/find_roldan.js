const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
console.log('=== Searching for クリスティアン・ロルダン ===');
players.forEach(p => {
  if (p.name.includes('ロルダン') || p.readingName.includes('ろるだん')) {
    console.log(`Player ID: ${p.id}, Name: ${p.name}, Current playTendencies:`, p.playTendencies);
  }
});
