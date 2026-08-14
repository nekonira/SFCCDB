const fs = require('fs');
const path = require('path');
const vm = require('vm');

const appJs = fs.readFileSync(path.join(__dirname, 'src', 'app.js'), 'utf-8');

const startIdx = appJs.indexOf('function getPlayerAvatarUrl');
const endIdx = appJs.indexOf('function ', startIdx + 10);
const funcCode = appJs.substring(startIdx, endIdx);

const sandbox = {
  React: {},
  window: {
    LEO_CEARA_IMAGE: 'IMAGE_2025_BEST11',
    LEO_CEARA_2026_IMAGE: 'IMAGE_2026_TS'
  }
};
sandbox.window = sandbox;
sandbox.window.React = sandbox.React;

vm.createContext(sandbox);
vm.runInContext(funcCode + '\nthis.getPlayerAvatarUrl = getPlayerAvatarUrl;', sandbox);

const p115 = { id: 'p115', name: 'レオ・セアラ(J1 BEST11 2025)' };
const p263 = { id: 'p263', name: 'レオ・セアラ(2026TS)' };

const res115 = sandbox.getPlayerAvatarUrl(p115);
const res263 = sandbox.getPlayerAvatarUrl(p263);

console.log('Resolver test for p115:', res115);
console.log('Resolver test for p263:', res263);

if (res115 === 'IMAGE_2025_BEST11' && res263 === 'IMAGE_2026_TS') {
  console.log('SUCCESS: Resolvers accurately distinguish p115 and p263!');
} else {
  console.error('ERROR: Resolver mismatch!');
  process.exit(1);
}
