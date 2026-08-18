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

const dummyElement = {
  style: {},
  setAttribute: () => {},
  appendChild: () => {},
  addEventListener: () => {},
  id: 'root'
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
  localStorage: { clear: () => {}, getItem: () => null, setItem: () => {} },
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

vm.createContext(sandbox);

scriptFiles.forEach((file) => {
  const cleanFile = file.split('?')[0];
  const fullPath = path.join(root, cleanFile);
  const code = fs.readFileSync(fullPath, 'utf8');
  vm.runInContext(code, sandbox, { filename: cleanFile });
  if (cleanFile.endsWith('react.min.js')) {
    sandbox.React = sandbox.window.React;
  }
  if (cleanFile.endsWith('react-dom.min.js')) {
    sandbox.ReactDOM = sandbox.window.ReactDOM;
  }
});

console.log('App component defined:', typeof sandbox.window.App);
console.log('INITIAL_PLAYERS length:', sandbox.window.INITIAL_PLAYERS ? sandbox.window.INITIAL_PLAYERS.length : 0);

try {
  const AppComp = sandbox.window.App;
  const element = sandbox.window.React.createElement(AppComp);
  console.log('React element created successfully:', element.type.name || 'App');
} catch (err) {
  console.error('ERROR CREATING APP COMPONENT:', err);
}
