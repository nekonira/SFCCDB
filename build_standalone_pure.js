const fs = require('fs');
const path = require('path');
const vm = require('vm');

const cwd = __dirname;
const babelPath = path.join(cwd, 'src', 'lib', 'babel.min.js');
const appJsxPath = path.join(cwd, 'src', 'app.jsx');
const appJsPath = path.join(cwd, 'src', 'app.js');
const mainJsxPath = path.join(cwd, 'src', 'main.jsx');
const mainJsPath = path.join(cwd, 'src', 'main.js');
const indexPath = path.join(cwd, 'index.html');
const dataDir = path.join(cwd, 'src', 'data');

console.log('--- Building Standalone Pure JS App (No In-Browser Babel Dependency) ---');

// 1. Load Babel Standalone in Node VM
const babelCode = fs.readFileSync(babelPath, 'utf-8');
const sandbox = { console };
vm.createContext(sandbox);
vm.runInContext(babelCode, sandbox);
const Babel = sandbox.Babel;

if (!Babel) {
  console.error('FAILED to load Babel standalone!');
  process.exit(1);
}

// 2. Transpile src/app.jsx -> src/app.js
const appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
const appResult = Babel.transform(appJsxCode, {
  presets: [['react', { runtime: 'classic' }]]
});
fs.writeFileSync(appJsPath, appResult.code, 'utf-8');
console.log(`Successfully transpiled src/app.jsx -> src/app.js (${appResult.code.length} bytes)`);

// 3. Transpile src/main.jsx -> src/main.js
const mainJsxCode = fs.readFileSync(mainJsxPath, 'utf-8');
const mainResult = Babel.transform(mainJsxCode, {
  presets: [['react', { runtime: 'classic' }]]
});
fs.writeFileSync(mainJsPath, mainResult.code, 'utf-8');
console.log(`Successfully transpiled src/main.jsx -> src/main.js (${mainResult.code.length} bytes)`);

// 4. Get all player image scripts
const imageFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js')).sort();
const imageScriptTags = imageFiles.map(f => `  <script src="./src/data/${f}"></script>`).join('\n');

// 5. Generate index.html loading pure JS files (Fastest, zero-delay rendering)
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

  <!-- 1. Player Photos (${imageFiles.length} Image Files) -->
${imageScriptTags}

  <!-- 2. Full Player Database -->
  <script src="./src/data/mockData.js"></script>

  <!-- 3. Pure Transpiled React App (No Babel overhead) -->
  <script src="./src/app.js"></script>

  <!-- 4. App Mount Script -->
  <script src="./src/main.js"></script>
</body>
</html>
`;

fs.writeFileSync(indexPath, htmlContent, 'utf-8');
console.log(`Successfully generated index.html linking ${imageFiles.length} image scripts, mockData.js, app.js, main.js!`);
console.log('BUILD COMPLETE!');
