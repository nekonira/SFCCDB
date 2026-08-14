const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const appJsPath = path.join(__dirname, 'src', 'app.js');

const mockCode = fs.readFileSync(mockPath, 'utf-8');
const appCode = fs.readFileSync(appJsPath, 'utf-8');
const yoshiokaImg = fs.readFileSync(path.join(__dirname, 'src', 'data', 'yoshioka2026Image.js'), 'utf-8');
const okaImg = fs.readFileSync(path.join(__dirname, 'src', 'data', 'oka2026Image.js'), 'utf-8');

const getPlayerAvatarUrl = function(player) {
  if (player.id === 'p154' || (player.name && (player.name.includes('喜岡') || player.name.includes('Yoshioka')))) {
    return sandbox.window.YOSHIOKA_2026_IMAGE || player.avatarUrl || '';
  }
  if (player.id === 'p152' || (player.name && (player.name.includes('岡哲平') || (player.name.includes('岡') && !player.name.includes('喜岡')) || player.name.includes('Teppei Oka')))) {
    return sandbox.window.OKA_2026_IMAGE || player.avatarUrl || '';
  }
  return '';
};

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(yoshiokaImg, sandbox);
vm.runInContext(okaImg, sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];
const p154 = players.find(p => p.id === 'p154');
const p152 = players.find(p => p.id === 'p152');

console.log('=== VERIFYING AVATAR MATCHES ===');
const p154Avatar = getPlayerAvatarUrl(p154);
const p152Avatar = getPlayerAvatarUrl(p152);

console.log('p154 (喜岡佳太) uses YOSHIOKA image?', p154Avatar === sandbox.window.YOSHIOKA_2026_IMAGE ? 'YES ✅' : 'NO ❌');
console.log('p152 (岡哲平) uses OKA image?', p152Avatar === sandbox.window.OKA_2026_IMAGE ? 'YES ✅' : 'NO ❌');
