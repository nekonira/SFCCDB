const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== CONVERTING ALL DMF -> DM AND OMF -> AM ===');

// 1. Update mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

// Replace mainPosition: 'DMF' -> mainPosition: 'DM'
mockCode = mockCode.replace(/mainPosition:\s*'DMF'/g, "mainPosition: 'DM'");
mockCode = mockCode.replace(/mainPosition:\s*"DMF"/g, 'mainPosition: "DM"');

// Replace mainPosition: 'OMF' -> mainPosition: 'AM'
mockCode = mockCode.replace(/mainPosition:\s*'OMF'/g, "mainPosition: 'AM'");
mockCode = mockCode.replace(/mainPosition:\s*"OMF"/g, 'mainPosition: "AM"');

// Replace in subPositions
mockCode = mockCode.replace(/'DMF'/g, "'DM'");
mockCode = mockCode.replace(/"DMF"/g, '"DM"');
mockCode = mockCode.replace(/'OMF'/g, "'AM'");
mockCode = mockCode.replace(/"OMF"/g, '"AM"');

fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('1. mockData.js updated (DMF -> DM, OMF -> AM).');

// 2. Update app.jsx
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  appJsxCode = appJsxCode.replace(/'DMF'/g, "'DM'");
  appJsxCode = appJsxCode.replace(/"DMF"/g, '"DM"');
  appJsxCode = appJsxCode.replace(/'OMF'/g, "'AM'");
  appJsxCode = appJsxCode.replace(/"OMF"/g, '"AM"');
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('2. src/app.jsx updated.');
}

// 3. Update app.js
const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  appJsCode = appJsCode.replace(/'DMF'/g, "'DM'");
  appJsCode = appJsCode.replace(/"DMF"/g, '"DM"');
  appJsCode = appJsCode.replace(/'OMF'/g, "'AM'");
  appJsCode = appJsCode.replace(/"OMF"/g, '"AM"');
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('3. src/app.js updated.');
}

// 4. Verification using Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
const remainingDmf = players.filter(p => p.mainPosition === 'DMF' || (p.subPositions && p.subPositions.includes('DMF')));
const remainingOmf = players.filter(p => p.mainPosition === 'OMF' || (p.subPositions && p.subPositions.includes('OMF')));

console.log('4. Verification:');
console.log('   Remaining DMF count:', remainingDmf.length);
console.log('   Remaining OMF count:', remainingOmf.length);

const dms = players.filter(p => p.mainPosition === 'DM');
const ams = players.filter(p => p.mainPosition === 'AM');
console.log('   Total DM players:', dms.length);
console.log('   Total AM players:', ams.length);

console.log('=== CONVERSION COMPLETE! ===');
