const fs = require('fs');
const vm = require('vm');

const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const appJsCode = fs.readFileSync('src/app.js', 'utf-8');

class MockComponent {}
const sandbox = {
  window: {},
  document: {
    getElementById: () => ({ innerHTML: '' }),
    createElement: () => ({ setAttribute: () => {}, appendChild: () => {} })
  },
  console: console,
  React: {
    Component: MockComponent,
    PureComponent: MockComponent,
    useState: (init) => [init, () => {}],
    useEffect: () => {},
    useMemo: (fn) => fn(),
    useRef: () => ({ current: null }),
    useCallback: (fn) => fn(),
    createContext: () => ({ Provider: () => null, Consumer: () => null }),
    createElement: () => ({})
  }
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

// Let's extract the exact functions from app.js to run in sandbox
const startMarker = '// 全パターン最高総合力判定付き 自動最適編成コア関数';
const endMarker = 'const handleAutoBuild=()=>{';
const codeChunk = appJsCode.substring(appJsCode.indexOf(startMarker), appJsCode.indexOf(endMarker));

// Also we need helper functions: FORMATION_COMBOS, FORMATIONS, checkPlayStyleRequirement, getAdjustedPlayer, getPlayerStatValue, etc.
// We can extract everything from app.js before the components
const setupCode = appJsCode.substring(
  appJsCode.indexOf('const FORMATION_COMBOS='),
  appJsCode.indexOf('const App=()=>{')
);

vm.runInContext(setupCode, sandbox);

// Now execute in sandbox
const testScript = `
const targetFmt = FORMATIONS.find(f => f.id === '433b_lesBleus26');
console.log('Target Formation:', targetFmt.name);

// Test runAutoBuildForFormation
let resultSquad = null;
let resultBench = null;
let resultPolicy = null;

const setBuilderMaxEnhanced = () => {};
const setTeamPolicy = (p) => { resultPolicy = p; };
const setSquadMap = (s) => { resultSquad = s; };
const setBenchMap = (b) => { resultBench = b; };
const selectedFormation = targetFmt;
const teamPolicy = 'ムービング';

${codeChunk}

runAutoBuildForFormation(targetFmt);

console.log('\\n=== RESULT OF runAutoBuildForFormation (433b_lesBleus26) ===');
console.log('Policy:', resultPolicy);
targetFmt.slots.forEach(slot => {
  const p = resultSquad[slot.id];
  console.log('Slot ' + slot.id + ' (' + slot.pos + (slot.requiredStyle ? ':' + slot.requiredStyle : '') + '): ' + (p ? (p.name + ' [' + p.nationality + '/' + p.policy + '/' + p.mainPosition + '/' + (p.subPositions||[]).join(',') + '] maxOverall:' + (p.maxOverall||p.overall)) : 'EMPTY'));
});

// Now test unified auto build
${appJsCode.substring(appJsCode.indexOf('// 🛡️ ポリシー統一 自動最適編成ロジック'), appJsCode.indexOf('const [filterPos,setFilterPos]='))}

handleUnifiedPolicyAutoBuild();

console.log('\\n=== RESULT OF handleUnifiedPolicyAutoBuild (433b_lesBleus26) ===');
console.log('Policy:', resultPolicy);
targetFmt.slots.forEach(slot => {
  const p = resultSquad[slot.id];
  console.log('Slot ' + slot.id + ' (' + slot.pos + (slot.requiredStyle ? ':' + slot.requiredStyle : '') + '): ' + (p ? (p.name + ' [' + p.nationality + '/' + p.policy + '/' + p.mainPosition + '/' + (p.subPositions||[]).join(',') + '] maxOverall:' + (p.maxOverall||p.overall)) : 'EMPTY'));
});
`;

vm.runInContext(testScript, sandbox);
