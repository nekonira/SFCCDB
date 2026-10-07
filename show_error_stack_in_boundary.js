const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== SHOWING EXACT ERROR STACK IN ERROR BOUNDARY ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');

let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');

const oldBoundary = `class ErrorBoundary extends React.Component {
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
}`;

const newBoundary = `class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-slate-950 border-2 border-red-500 rounded-2xl text-left space-y-3 my-4 max-w-4xl mx-auto shadow-2xl">
          <div className="flex items-center justify-between border-b border-red-500/30 pb-2">
            <h3 className="text-base font-black text-red-400 flex items-center gap-2">⚠️ エラー詳細検出ログ</h3>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
              className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-lg shadow hover:bg-amber-400 cursor-pointer"
            >
              🔄 画面をリロード
            </button>
          </div>
          <div className="bg-slate-900 p-3 rounded-xl border border-red-500/30 text-red-300 font-mono text-xs overflow-x-auto">
            <div className="font-bold text-red-400 mb-1">エラー内容: {this.state.error && this.state.error.toString()}</div>
            <pre className="text-[10px] text-slate-300 whitespace-pre-wrap leading-relaxed mt-2 pt-2 border-t border-slate-800">
              {this.state.error && this.state.error.stack}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}`;

if (jsxCode.includes('class ErrorBoundary extends React.Component')) {
  // Find start and end of ErrorBoundary definition
  const startIdx = jsxCode.indexOf('class ErrorBoundary extends React.Component');
  const endIdx = jsxCode.indexOf('const LIMIT_BREAK_STAGES', startIdx);
  jsxCode = jsxCode.substring(0, startIdx) + newBoundary.trim() + '\n\n' + jsxCode.substring(endIdx);
  console.log('Updated ErrorBoundary to display detailed error stack on screen');
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
console.log(`Transpiled src/app.jsx -> src/app.js (${transpiled.code.length} bytes)`);
