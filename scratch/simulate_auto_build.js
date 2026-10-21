const fs = require('fs');
const vm = require('vm');

const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const appJsx = fs.readFileSync('src/app.jsx', 'utf-8');

// Set up sandbox
const sandbox = {
  window: {},
  console: console
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

// Extract helper functions and formations from app.jsx
// We need FORMATIONS, FORMATION_COMBOS, checkPlayStyleRequirement, getAdjustedPlayer, getPlayerStatValue, etc.
const codeToRun = `
${appJsx.substring(appJsx.indexOf('const FORMATION_COMBOS = ['), appJsx.indexOf('// ────────────', appJsx.indexOf('const FORMATION_COMBOS = [')))}

${appJsx.substring(appJsx.indexOf('const normalizePosition ='), appJsx.indexOf('const STAT_NAME_MAP ='))}
${appJsx.substring(appJsx.indexOf('const isPositionMatch ='), appJsx.indexOf('const STAT_NAME_MAP ='))}

${appJsx.substring(appJsx.indexOf('const checkPlayStyleRequirement ='), appJsx.indexOf('// 指定レアリティおよび強化状態'))}
${appJsx.substring(appJsx.indexOf('const isHaifuPlayer ='), appJsx.indexOf('// ───'))}
${appJsx.substring(appJsx.indexOf('const getPlayerStatValue ='), appJsx.indexOf('// ──────────────────────────────────────────────\n// COMPONENT:'))}
`;

vm.runInContext(codeToRun, sandbox);

console.log('FORMATION_COMBOS loaded:', sandbox.FORMATION_COMBOS.length);
console.log('FORMATIONS loaded:', sandbox.FORMATIONS.length);

const lesBleusFmt = sandbox.FORMATIONS.find(f => f.id === '433b_lesBleus26');
console.log('433b_lesBleus26:', lesBleusFmt ? 'FOUND' : 'NOT FOUND');
console.log('Slots:', lesBleusFmt.slots.map(s => s.pos + (s.requiredStyle ? '(' + s.requiredStyle + ')' : '')).join(', '));
