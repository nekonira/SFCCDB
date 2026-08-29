const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

const sandbox = { React: {}, window: {} };
sandbox.window = sandbox;
sandbox.window.React = sandbox.React;
vm.createContext(sandbox);

const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
const scriptMatches = indexHtml.match(/src=["']\.\/src\/data\/([^"']+)["']/g) || [];

scriptMatches.forEach(match => {
  const fileName = match.replace(/src=["']\.\/src\/data\//, '').replace(/["']$/, '').split('?')[0];
  const filePath = path.join(dataDir, fileName);
  if (fs.existsSync(filePath)) {
    const code = fs.readFileSync(filePath, 'utf-8');
    vm.runInContext(code, sandbox);
  }
});

const allImageVars = Object.keys(sandbox.window).filter(k => k.endsWith('_IMAGE'));

const targets = [
  'spinazzola', 'cuadrado', 'nicowilliams', 'hwang', 'courtois', 'rafaelelias',
  'hosoi', 'kubo', 'takahashi', 'mojae', 'matsuhashi', 'takemoto', 'kameda',
  'thiago', 'galego', 'alisson', 'endrick', 'greenwood', 'akanji', 'inagaki'
];

targets.forEach(t => {
  const matches = allImageVars.filter(v => v.toLowerCase().includes(t));
  console.log(`Target '${t}':`, matches);
});
