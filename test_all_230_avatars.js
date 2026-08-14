const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== VERIFYING ALL 230 PLAYERS AVATAR RESOLUTION ===');

const sandbox = {
  window: {},
  console: console,
  React: { useState: () => [false, () => {}], useEffect: () => {} }
};
sandbox.window = sandbox;
vm.createContext(sandbox);

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const appJsPath = path.join(__dirname, 'src', 'app.js');

const mockCode = fs.readFileSync(mockPath, 'utf-8');
const appJsCode = fs.readFileSync(appJsPath, 'utf-8');

vm.runInContext(mockCode, sandbox);

// Load all 2026Image.js files into sandbox
const dataFiles = fs.readdirSync(path.join(__dirname, 'src', 'data'));
dataFiles.forEach(f => {
  if (f.endsWith('Image.js')) {
    const content = fs.readFileSync(path.join(__dirname, 'src', 'data', f), 'utf-8');
    vm.runInContext(content, sandbox);
  }
});

vm.runInContext(appJsCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
console.log('Total players in DB:', players.length);

let resolvedCount = 0;
let missingCount = 0;

players.forEach(p => {
  const avatar = sandbox.window.getPlayerAvatarUrl(p);
  if (avatar && avatar.length > 0) {
    resolvedCount++;
  } else {
    missingCount++;
    console.log(`[NO AVATAR] ${p.id} - ${p.name}`);
  }
});

console.log(`Summary: ${resolvedCount} resolved, ${missingCount} without avatar (fallback).`);
