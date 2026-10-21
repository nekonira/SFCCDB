const fs = require('fs');
const vm = require('vm');

const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const sandbox = { window: {}, console: console };
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);
const players = sandbox.window.INITIAL_PLAYERS;

const appJsCode = fs.readFileSync('src/app.js', 'utf-8');

// In app.js:
// normalizePosition is defined around: const normalizePosition=pos=>{...
const normPosIdx = appJsCode.indexOf('const normalizePosition=pos=>{');
const normPosEndIdx = appJsCode.indexOf('function TeamBuilderTab(', normPosIdx);
const helpersCode = appJsCode.slice(normPosIdx, normPosEndIdx);

// FORMATION_COMBOS
const fcIdx = appJsCode.indexOf('const FORMATION_COMBOS=[');
const fcEndIdx = appJsCode.indexOf('const FORMATIONS=[', fcIdx);
const combosCode = appJsCode.slice(fcIdx, fcEndIdx);

// FORMATIONS
const fIdx = appJsCode.indexOf('const FORMATIONS=[');
const fEndIdx = appJsCode.indexOf('// ポジション順序の定義', fIdx);
const formationsCode = appJsCode.slice(fIdx, fEndIdx);

// autoBuild
const autoIdx = appJsCode.indexOf('const runAutoBuildForFormation=fmtToBuild=>{');
const autoEndIdx = appJsCode.indexOf('const handleSelectFormation=fmt=>{', autoIdx);
const autoBuildCode = appJsCode.slice(autoIdx, autoEndIdx);

const testRunner = `
${helpersCode}
${combosCode}
${formationsCode}

const selectedFormation = FORMATIONS.find(f => f.id === '433b_lesBleus26');
let squadMap = {};
let benchMap = {};
let teamPolicy = 'ムービング';
let builderMaxEnhanced = true;
const setBuilderMaxEnhanced = () => {};
const setTeamPolicy = p => { teamPolicy = p; };
const setSquadMap = s => { squadMap = s; };
const setBenchMap = b => { benchMap = b; };

${autoBuildCode}

console.log('=== RUNNING runAutoBuildForFormation ===');
runAutoBuildForFormation(selectedFormation);
selectedFormation.slots.forEach(s => {
  const p = squadMap[s.id];
  console.log(s.id, s.pos, s.label, p ? p.name + ' (' + p.nationality + ', ' + p.mainPosition + ', sub: ' + (p.subPositions||[]).join(',') + ', ovr: ' + (p.maxEnhanced?p.maxEnhanced.overall:p.overall) + ')' : 'EMPTY');
});

console.log('\\n=== RUNNING handleUnifiedPolicyAutoBuild ===');
handleUnifiedPolicyAutoBuild();
selectedFormation.slots.forEach(s => {
  const p = squadMap[s.id];
  console.log(s.id, s.pos, s.label, p ? p.name + ' (' + p.nationality + ', ' + p.mainPosition + ', sub: ' + (p.subPositions||[]).join(',') + ', ovr: ' + (p.maxEnhanced?p.maxEnhanced.overall:p.overall) + ')' : 'EMPTY');
});
`;

vm.runInContext(testRunner, sandbox);
