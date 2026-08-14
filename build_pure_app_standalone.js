const fs = require('fs');
const path = require('path');
const vm = require('vm');

const cwd = __dirname;
const appJsxPath = path.join(cwd, 'src', 'app.jsx');
const appJsPath = path.join(cwd, 'src', 'app.js');
const mainJsxPath = path.join(cwd, 'src', 'main.jsx');
const mainJsPath = path.join(cwd, 'src', 'main.js');
const indexPath = path.join(cwd, 'index.html');
const babelPath = path.join(cwd, 'src', 'lib', 'babel.min.js');
const dataDir = path.join(cwd, 'src', 'data');

console.log('--- Sandboxed Babel Transpiler for app.jsx & main.jsx ---');

const babelCode = fs.readFileSync(babelPath, 'utf-8');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(babelCode, sandbox);

const Babel = sandbox.Babel;
if (!Babel) {
  console.error('Babel not loaded!');
  process.exit(1);
}

// 1. Transpile app.jsx
const appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
const appResult = Babel.transform(appJsxCode, {
  presets: [['react', { runtime: 'classic' }]]
});
fs.writeFileSync(appJsPath, appResult.code, 'utf-8');
console.log(`1. Saved src/app.js (${appResult.code.length} bytes)`);

// 2. Transpile main.jsx
const mainJsxCode = fs.readFileSync(mainJsxPath, 'utf-8');
const mainResult = Babel.transform(mainJsxCode, {
  presets: [['react', { runtime: 'classic' }]]
});
fs.writeFileSync(mainJsPath, mainResult.code, 'utf-8');
console.log(`2. Saved src/main.js (${mainResult.code.length} bytes)`);

// 3. Generate index.html with all 145 player image JS files
const imageFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js'));
const imageScriptTags = imageFiles.map(f => `  <script src="./src/data/${f}"></script>`).join('\n');

const htmlContent = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>サカつく2026 データベース & チームビルダー</title>
  
  <script>
    try { localStorage.clear(); } catch(e) {}
  </script>

  <!-- Local Libraries -->
  <script src="./src/lib/react.min.js"></script>
  <script src="./src/lib/react-dom.min.js"></script>
  <script src="./src/lib/tailwind.js"></script>

  <style>
    body { background-color: #070a10; color: #f1f5f9; font-family: system-ui, -apple-system, sans-serif; }
    .glass-panel { background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); }
    .glass-card { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(8px); }
  </style>
</head>
<body class="bg-[#070a10] text-slate-100 min-h-screen">
  <div id="root"></div>

  <!-- 1. Player Photos (145 Image Files) -->
${imageScriptTags}

  <!-- 2. Full Player Database -->
  <script src="./src/data/mockData.js"></script>

  <!-- 3. Pure Transpiled React Application -->
  <script src="./src/app.js"></script>

  <!-- 4. React App Mount Script -->
  <script src="./src/main.js"></script>
</body>
</html>
`;

fs.writeFileSync(indexPath, htmlContent, 'utf-8');
console.log(`3. Saved index.html linking ${imageFiles.length} player photos (${htmlContent.length} bytes)`);

console.log('🎉 BUILD COMPLETE!');
