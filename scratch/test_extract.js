const fs = require('fs');
const vm = require('vm');

const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const appJsCode = fs.readFileSync('src/app.jsx', 'utf-8');

const sandbox = {
  window: {},
  document: { addEventListener: () => {} },
  console: console,
  setTimeout: () => {},
  clearTimeout: () => {}
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);
const players = sandbox.window.INITIAL_PLAYERS;

// Extract FORMATION_COMBOS
const combosIdx = appJsCode.indexOf('const FORMATION_COMBOS = [');
const combosEndIdx = appJsCode.indexOf('];\n\n  const FORMATIONS = [', combosIdx) + 2;
const FORMATION_COMBOS = eval(appJsCode.slice(combosIdx.replace ? combosIdx : combosIdx, combosEndIdx).replace('const FORMATION_COMBOS = ', ''));

// Extract FORMATIONS
const formIdx = appJsCode.indexOf('const FORMATIONS = [');
const formEndIdx = appJsCode.indexOf('];\n\n  // ポジション順序の定義', formIdx) + 2;
const FORMATIONS = eval(appJsCode.slice(formIdx, formEndIdx).replace('const FORMATIONS = ', ''));

console.log('FORMATIONS loaded:', FORMATIONS.length);
console.log('FORMATION_COMBOS loaded:', FORMATION_COMBOS.length);
