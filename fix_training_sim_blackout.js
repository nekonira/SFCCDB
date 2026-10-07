const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== FIXING TRAINING SIMULATOR 6-SLOT BUTTON BLACKOUT BUG ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');

let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');

// 1. Add ErrorBoundary Component at top if not exists
if (!jsxCode.includes('class ErrorBoundary extends React.Component')) {
  const errorBoundaryCode = `
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-slate-900 border border-red-500/40 rounded-2xl text-center space-y-3 my-4">
          <h3 className="text-base font-black text-red-400">⚠️ 表示エラーが発生しました</h3>
          <p className="text-xs text-slate-300">ボタン操作時のデータ不整合を検出しました。画面表示をリセットして復旧できます。</p>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs rounded-xl shadow-md hover:brightness-110 cursor-pointer"
          >
            🔄 画面をリロードして再読み込み
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
`;
  jsxCode = jsxCode.replace('const LIMIT_BREAK_STAGES', errorBoundaryCode.trim() + '\n\nconst LIMIT_BREAK_STAGES');
  console.log('1. Added ErrorBoundary class to app.jsx');
}

// 2. Wrap TrainingSimulatorTab internal rendering with ErrorBoundary
if (!jsxCode.includes('<ErrorBoundary><TrainingSimulatorTab')) {
  jsxCode = jsxCode.replace(
    '<TrainingSimulatorTab',
    '<ErrorBoundary><TrainingSimulatorTab'
  ).replace(
    '</TrainingSimulatorTab>',
    '</TrainingSimulatorTab></ErrorBoundary>'
  );
  console.log('2. Wrapped TrainingSimulatorTab with ErrorBoundary');
}

// 3. Fix updateSlot with safe default fallback and bounds check
const oldUpdateSlot = `const updateSlot = (index, field, value) => {
    setSlots(prev => {
      const newSlots = [...prev];
      newSlots[index] = { ...newSlots[index], [field]: value };
      return newSlots;
    });
  };`;

const newUpdateSlot = `const updateSlot = (index, field, value) => {
    if (index < 0 || index >= 6) return;
    setSlots(prev => {
      if (!prev || !prev[index]) return prev || [];
      const newSlots = [...prev];
      const targetSlot = newSlots[index] || { id: index + 1, active: true, cardId: '', stage: '完凸' };
      newSlots[index] = { ...targetSlot, [field]: value };
      return newSlots;
    });
  };`;

if (jsxCode.includes(oldUpdateSlot)) {
  jsxCode = jsxCode.replace(oldUpdateSlot, newUpdateSlot);
  console.log('3. Enhanced updateSlot function with defensive null checks');
}

// 4. Protect slot calculation and cards rendering in TrainingSimulatorTab
const oldSlotMapHeader = `const card = officialCards.find(c => c.id === s.cardId) || officialCards[0];`;
const newSlotMapHeader = `const card = (officialCards && officialCards.find(c => c && c.id === s.cardId)) || (officialCards && officialCards[0]) || null;
                if (!card) return null;`;

if (jsxCode.includes(oldSlotMapHeader)) {
  jsxCode = jsxCode.replace(oldSlotMapHeader, newSlotMapHeader);
  console.log('4. Protected slots.map card lookup with null fallbacks');
}

// Write back app.jsx
fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');

// 5. Transpile app.jsx -> app.js using Babel
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
console.log(`5. Successfully transpiled app.jsx -> app.js (${transpiled.code.length} bytes)`);

console.log('=== FIX COMPLETE! ===');
