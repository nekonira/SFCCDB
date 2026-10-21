const fs = require('fs');
const vm = require('vm');

const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const sandbox = { window: {}, console: console };
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);
const players = sandbox.window.INITIAL_PLAYERS;

// Read app.jsx
const appCode = fs.readFileSync('src/app.jsx', 'utf-8');

// Extract normalizePosition, isPositionMatch, STAT_NAME_MAP, getPlayerStatValue, parsePlayStyleLevel, matchPlayStyle, checkPlayStyleRequirement, getAdjustedPlayer
const normPosIdx = appCode.indexOf('const normalizePosition = (pos) => {');
const normPosEndIdx = appCode.indexOf('const checkComboRequirements = (', normPosIdx);
const helpersCode = appCode.slice(normPosIdx, normPosEndIdx);

// Extract FORMATION_COMBOS
const fcIdx = appCode.indexOf('const FORMATION_COMBOS = [');
const fcEndIdx = appCode.indexOf('const FORMATIONS = [', fcIdx);
const combosCode = appCode.slice(fcIdx, fcEndIdx);

// Extract FORMATIONS
const fIdx = appCode.indexOf('const FORMATIONS = [');
const fEndIdx = appCode.indexOf('// ポジション順序の定義', fIdx);
const formationsCode = appCode.slice(fIdx, fEndIdx);

// Extract runAutoBuildForFormation and handleUnifiedPolicyAutoBuild
const autoIdx = appCode.indexOf('const runAutoBuildForFormation = (fmtToBuild) => {');
const autoEndIdx = appCode.indexOf('const handleSelectFormation = (fmt) => {', autoIdx);
const autoBuildCode = appCode.slice(autoIdx, autoEndIdx);

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
