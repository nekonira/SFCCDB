const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

const p381Idx = code.indexOf("id: 'p381'");
if (p381Idx === -1) {
  console.error("Could not find p381!");
  process.exit(1);
}

const p381AvatarIdx = code.indexOf("avatarUrl:", p381Idx);
const p381EndIdx = code.indexOf("}", p381AvatarIdx);

let p381Str = code.substring(p381Idx, p381EndIdx + 1);

const newTendencies = `playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    }`;

p381Str = p381Str.replace(/playTendencies:\s*\{[\s\S]*?\}/, newTendencies);

code = code.substring(0, p381Idx) + p381Str + code.substring(p381EndIdx + 1);
fs.writeFileSync(mockPath, code, 'utf-8');
console.log("Updated p381 (ペドリ) playTendencies.");

// Verification
const ctx = { window: {} };
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(code, ctx);
const p381 = ctx.window.INITIAL_PLAYERS.find(p => p.id === 'p381');
console.log('Verified p381 playTendencies:', JSON.stringify(p381.playTendencies, null, 2));
