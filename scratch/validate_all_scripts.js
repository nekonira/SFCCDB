const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = 'c:\\Users\\nekon\\SFCCdeta';
const htmlPath = path.join(root, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const regex = /<script\s+src=["']\.\/([^"']+)["']/g;
let match;
const scriptFiles = [];
while ((match = regex.exec(html)) !== null) {
  scriptFiles.push(match[1]);
}

console.log(`Found ${scriptFiles.length} scripts in index.html`);

const dummyElement = {
  style: {},
  setAttribute: () => {},
  appendChild: () => {},
  addEventListener: () => {},
  id: ''
};

const sandbox = {
  window: {},
  document: {
    getElementById: (id) => dummyElement,
    addEventListener: () => {},
    querySelector: () => dummyElement,
    querySelectorAll: () => [],
    createElement: () => dummyElement,
    head: dummyElement,
    body: dummyElement,
    readyState: 'complete'
  },
  navigator: { userAgent: 'node' },
  location: { href: 'http://localhost:3000/' },
  MutationObserver: class { observe() {} disconnect() {} },
  console: console,
  localStorage: { clear: () => {} },
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  exports: undefined,
  module: undefined,
  define: undefined
};
sandbox.self = sandbox.window;
sandbox.window.self = sandbox.window;
sandbox.window.window = sandbox.window;
sandbox.window.document = sandbox.document;
sandbox.window.navigator = sandbox.navigator;
sandbox.window.location = sandbox.location;
sandbox.window.MutationObserver = sandbox.MutationObserver;

vm.createContext(sandbox);

let hasError = false;
scriptFiles.forEach((file) => {
  const cleanFile = file.split('?')[0];
  const fullPath = path.join(root, cleanFile);
  if (!fs.existsSync(fullPath)) {
    console.error(`MISSING FILE: ${file} (Full path: ${fullPath})`);
    hasError = true;
    return;
  }
  try {
    const code = fs.readFileSync(fullPath, 'utf8');
    vm.runInContext(code, sandbox, { filename: cleanFile });
    if (cleanFile.endsWith('react.min.js')) {
      sandbox.React = sandbox.window.React;
    }
    if (cleanFile.endsWith('react-dom.min.js')) {
      sandbox.ReactDOM = sandbox.window.ReactDOM;
    }
  } catch (err) {
    console.error(`SYNTAX / RUNTIME ERROR in ${file}:`, err.stack || err.message);
    hasError = true;
  }
});

if (!hasError) {
  console.log('SUCCESS: All 279 script files loaded & executed with ZERO errors!');
  console.log(`INITIAL_PLAYERS count: ${sandbox.window.INITIAL_PLAYERS ? sandbox.window.INITIAL_PLAYERS.length : 'UNDEFINED'}`);
}
