const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

// 1. Map Image.js file name -> window variable
const fileToVar = {};
fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js')).forEach(f => {
  const content = fs.readFileSync(path.join(dataDir, f), 'utf-8');
  const m = content.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (m) {
    fileToVar[f.toLowerCase()] = m[1];
  }
});

// 2. Scan ALL add_*.js files for the ACTUAL player object being created
const trueAddRegistrations = {}; // pid -> { name, varName, file }

fs.readdirSync(rootDir).filter(f => f.startsWith('add_') && f.endsWith('.js')).forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');

  // Extract the image variable created in line 14: window.XXX_IMAGE = ...
  let imageVar = null;
  const varM = content.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (varM) {
    imageVar = varM[1];
  } else {
    const fileM = content.match(/([a-zA-Z0-9_]+Image\.js)/i);
    if (fileM) {
      imageVar = fileToVar[fileM[1].toLowerCase()];
    }
  }

  // Find the player object definition: { id: 'pXXX', name: 'YYY', ... }
  // Match object where id comes immediately after { or comma
  const objM = content.match(/{\s*id:\s*['"](p\d+)['"]\s*,\s*name:\s*['"]([^'"]+)['"]/);
  if (objM && imageVar) {
    const pid = objM[1];
    const pname = objM[2];
    trueAddRegistrations[pid] = { name: pname, varName: imageVar, file };
  }
});

console.log(`True add registrations found: ${Object.keys(trueAddRegistrations).length}`);

// Print sample for verification:
['p330', 'p331', 'p332', 'p333', 'p334', 'p373', 'p374', 'p375'].forEach(id => {
  console.log(`${id}:`, trueAddRegistrations[id]);
});
