const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Repairing app.jsx & Transpiling to app.js ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');

let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');

// Fix ErrorBoundary wrapper for TrainingSimulatorTab
const oldFragment = `{activeTab === 'training' && (
            <ErrorBoundary><TrainingSimulatorTab
              players={players}
              selectedPlayer={selectedTrainingPlayer}
              setSelectedPlayer={setSelectedTrainingPlayer}
              onGoToDB={() => setActiveTab('players')}
            />
          )}`;

const newFragment = `{activeTab === 'training' && (
            <ErrorBoundary>
              <TrainingSimulatorTab
                players={players}
                selectedPlayer={selectedTrainingPlayer}
                setSelectedPlayer={setSelectedTrainingPlayer}
                onGoToDB={() => setActiveTab('players')}
              />
            </ErrorBoundary>
          )}`;

if (jsxCode.includes(oldFragment)) {
  jsxCode = jsxCode.replace(oldFragment, newFragment);
  console.log('Fixed ErrorBoundary closing tag for TrainingSimulatorTab in app.jsx');
} else {
  // Replace line 2212 if formatting differed slightly
  jsxCode = jsxCode.replace(
    `<ErrorBoundary><TrainingSimulatorTab`,
    `<ErrorBoundary>\n              <TrainingSimulatorTab`
  ).replace(
    `onGoToDB={() => setActiveTab('players')}\n            />\n          )}`,
    `onGoToDB={() => setActiveTab('players')}\n              />\n            </ErrorBoundary>\n          )}`
  );
}

fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');

// Transpile with Babel
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
console.log(`✅ SUCCESS: Transpiled src/app.jsx -> src/app.js (${transpiled.code.length} bytes)`);
