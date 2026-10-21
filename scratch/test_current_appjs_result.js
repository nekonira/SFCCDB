const fs = require('fs');
const vm = require('vm');

const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const appJsCode = fs.readFileSync('src/app.js', 'utf-8');

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

const combosIdx = appJsCode.indexOf('const FORMATION_COMBOS=[');
const combosEndIdx = appJsCode.indexOf('];', combosIdx) + 2;
const combosDef = appJsCode.slice(combosIdx, combosEndIdx);

const formIdx = appJsCode.indexOf('const FORMATIONS=[');
const formEndIdx = appJsCode.indexOf('];', formIdx) + 2;
const formationsDef = appJsCode.slice(formIdx, formEndIdx);

const helperIdx = appJsCode.indexOf('const STAT_NAME_MAP=');
const helperEndIdx = appJsCode.indexOf('function App()');
const helpersDef = appJsCode.slice(helperIdx, helperEndIdx);

// In App(), let's extract helpers before runAutoBuildForFormation
const appFuncIdx = appJsCode.indexOf('function App()');
const checkReqIdx = appJsCode.indexOf('const checkPlayStyleRequirement=', appFuncIdx);
const autoBuildIdx = appJsCode.indexOf('const runAutoBuildForFormation=');
const appHelpers = appJsCode.slice(checkReqIdx, autoBuildIdx);

const autoBuildEndIdx = appJsCode.indexOf('const handleSelectFormation=');
const autoBuildDef = appJsCode.slice(autoBuildIdx, autoBuildEndIdx);

const testScript = `
const players = window.INITIAL_PLAYERS;
${combosDef}
${helpersDef}
${formationsDef}

const selectedFormation = FORMATIONS.find(f => f.id === '433b_lesBleus26');
let squadMap = {};
let benchMap = {};
let teamPolicy = 'ムービング';
let builderMaxEnhanced = true;
const setBuilderMaxEnhanced = () => {};
const setTeamPolicy = p => { teamPolicy = p; };
const setSquadMap = s => { squadMap = s; };
const setBenchMap = b => { benchMap = b; };

${appHelpers}
${autoBuildDef}

runAutoBuildForFormation(selectedFormation);
console.log('=== RUN AUTO BUILD RESULT ===');
selectedFormation.slots.forEach(s => {
  const p = squadMap[s.id];
  console.log(s.id, s.pos, s.label, p ? p.name + ' (' + p.nationality + ', ' + p.mainPosition + ', sub: ' + (p.subPositions||[]).join(',') + ', maxOverall: ' + (p.maxEnhanced?p.maxEnhanced.overall:p.overall) + ')' : 'EMPTY');
});

handleUnifiedPolicyAutoBuild();
console.log('=== RUN UNIFIED POLICY AUTO BUILD RESULT ===');
selectedFormation.slots.forEach(s => {
  const p = squadMap[s.id];
  console.log(s.id, s.pos, s.label, p ? p.name + ' (' + p.nationality + ', ' + p.mainPosition + ', sub: ' + (p.subPositions||[]).join(',') + ', maxOverall: ' + (p.maxEnhanced?p.maxEnhanced.overall:p.overall) + ')' : 'EMPTY');
});
`;

vm.runInContext(testScript, sandbox);
