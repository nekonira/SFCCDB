const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== FIXING REFERENCE ERROR: filteredModalPlayers IS NOT DEFINED ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');

let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');

// Insert filteredModalPlayers definition right after modalPosFilter state
const stateTarget = `const [modalPosFilter, setModalPosFilter] = useState('ALL');`;

const filteredPlayersCode = `const [modalPosFilter, setModalPosFilter] = useState('ALL');
  const filteredModalPlayers = useMemo(() => {
    if (!players || !Array.isArray(players)) return [];
    return players.filter(p => {
      if (!p) return false;
      const q = (modalSearchText || '').toLowerCase();
      const matchSearch = !modalSearchText ||
        (p.name && String(p.name).toLowerCase().includes(q)) ||
        (p.team && String(p.team).toLowerCase().includes(q)) ||
        (p.playStyle && String(p.playStyle).toLowerCase().includes(q));
      
      const pos = p.mainPosition || p.position || '';
      let matchPos = modalPosFilter === 'ALL';
      if (modalPosFilter === 'FW') matchPos = ['CF', 'ST', 'LW', 'RW', 'LWG', 'RWG', 'LWF', 'RWF', 'FW'].includes(pos);
      if (modalPosFilter === 'MF') matchPos = ['AM', 'OMF', 'AMF', 'DM', 'DMF', 'LM', 'LMF', 'RM', 'RMF', 'CMF', 'CM', 'MF'].includes(pos);
      if (modalPosFilter === 'DF') matchPos = ['CB', 'LFB', 'RFB', 'LSB', 'RSB', 'LB', 'RB', 'DF'].includes(pos);
      if (modalPosFilter === 'GK') matchPos = (pos === 'GK' || p.category === 'GK');
      
      return matchSearch && matchPos;
    });
  }, [players, modalSearchText, modalPosFilter]);`;

if (jsxCode.includes(stateTarget)) {
  jsxCode = jsxCode.replace(stateTarget, filteredPlayersCode);
  console.log('1. Defined filteredModalPlayers memoized calculation in TrainingSimulatorTab');
} else {
  console.error('Could not find stateTarget in app.jsx');
  process.exit(1);
}

fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');

// Transpile with Babel -> app.js
const babelPath = path.join(__dirname, 'src', 'lib', 'babel.min.js');
const babelCode = fs.readFileSync(babelPath, 'utf-8');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(babelCode, sandbox);

const Babel = sandbox.Babel;
const transpiled = Babel.transform(jsxCode, {
  presets: [['react', { runtime: 'classic' }]]
});

fs.writeFileSync(appJsPath, transpiled.code, 'utf-8');
console.log(`2. Successfully transpiled app.jsx -> app.js (${transpiled.code.length} bytes)`);

console.log('=== FIX COMPLETE! ===');
