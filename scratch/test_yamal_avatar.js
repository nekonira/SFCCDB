const fs = require('fs');
const path = require('path');
const vm = require('vm');

const appJsPath = path.join(__dirname, '..', 'src', 'app.js');
const yamalJsPath = path.join(__dirname, '..', 'src', 'data', 'yamalImage.js');

const sandbox = { window: {}, React: { useState: () => [], useEffect: () => {} } };
sandbox.window = sandbox;
vm.createContext(sandbox);

const yamalCode = fs.readFileSync(yamalJsPath, 'utf-8');
vm.runInContext(yamalCode, sandbox);

const appJsCode = fs.readFileSync(appJsPath, 'utf-8');
vm.runInContext(appJsCode, sandbox);

const p373 = { id: 'p373', name: 'ラミン・ヤマル' };
const avatarUrl = sandbox.window.getPlayerAvatarUrl(p373);

console.log('Verification Result:');
console.log('Player:', p373.name, `(${p373.id})`);
console.log('Resolved Avatar matches YAMAL_IMAGE:', avatarUrl === sandbox.window.YAMAL_IMAGE ? 'SUCCESS' : 'FAILURE');
console.log('Avatar URL starts with:', avatarUrl ? avatarUrl.substring(0, 50) + '...' : 'EMPTY');
