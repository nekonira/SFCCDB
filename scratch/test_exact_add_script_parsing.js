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

// 2. Parse add_*.js files properly by looking at the player object definition
const scriptMap = {}; // pid -> { name, varName }

fs.readdirSync(rootDir).filter(f => f.startsWith('add_') && f.endsWith('.js')).forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');
  
  // Get image variable created in script
  let imageVar = null;
  const varM = content.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (varM) {
    imageVar = varM[1];
  } else {
    const fileM = content.match(/([a-zA-Z0-9_]+Image\.js)/);
    if (fileM) {
      imageVar = fileToVar[fileM[1].toLowerCase()];
    }
  }

  // Get player object definition block: id: 'pXXX', name: 'YYY'
  const objMatch = content.match(/{\s*id:\s*['"](p\d+)['"]\s*,\s*name:\s*['"]([^'"]+)['"]/);
  if (objMatch && imageVar) {
    const pid = objMatch[1];
    const pname = objMatch[2];
    scriptMap[pid] = { name: pname, imageVar, file };
  }
});

console.log(`Accurately parsed ${Object.keys(scriptMap).length} add scripts.`);

// Print sample p328 to p334
['p328', 'p329', 'p330', 'p331', 'p332', 'p333', 'p334'].forEach(id => {
  console.log(`${id}:`, scriptMap[id]);
});
