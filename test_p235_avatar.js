const fs = require('fs');
const vm = require('vm');

const sandbox = {
  window: {},
  console: console,
  React: { useState: () => [false, () => {}], useEffect: () => {} }
};
sandbox.window = sandbox;
vm.createContext(sandbox);

const mock = fs.readFileSync('src/data/mockData.js', 'utf8');
const img = fs.readFileSync('src/data/brenoHerculano2026Image.js', 'utf8');
let appJs = fs.readFileSync('src/app.js', 'utf8');

// Replace all "if (player" inside getPlayerAvatarUrl with logging
const fnStart = appJs.indexOf('const getPlayerAvatarUrl = player => {');
const fnEnd = appJs.indexOf('window.getPlayerAvatarUrl = getPlayerAvatarUrl;');

let body = appJs.substring(fnStart, fnEnd);
body = body.split('\n').map((line, idx) => {
  if (line.includes('if (player')) {
    return `    if (player && player.id === 'p235') console.log('Line ${idx + 84} condition check:', ${JSON.stringify(line.trim())}); ` + line;
  }
  if (line.includes('return window.')) {
    return `    if (player && player.id === 'p235') console.log('Line ${idx + 84} RETURN TRIGGERED:', ${JSON.stringify(line.trim())}); ` + line;
  }
  return line;
}).join('\n');

appJs = appJs.substring(0, fnStart) + body + appJs.substring(fnEnd);

vm.runInContext(mock, sandbox);
vm.runInContext(img, sandbox);
vm.runInContext(appJs, sandbox);

const p235 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p235');

console.log('=== TRACING getPlayerAvatarUrl(p235) ===');
const res = sandbox.window.getPlayerAvatarUrl(p235);
console.log('Final Result length:', res.length);
