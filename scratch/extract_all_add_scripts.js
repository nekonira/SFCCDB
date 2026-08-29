const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

// 1. Scan all Image.js files in src/data to get file -> window variable
const fileToVar = {};
fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js')).forEach(f => {
  const content = fs.readFileSync(path.join(dataDir, f), 'utf-8');
  const m = content.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (m) {
    fileToVar[f.toLowerCase()] = m[1];
  }
});

// 2. Scan ALL add_*.js files
const addMap = {}; // pid -> { name, imageVar }

fs.readdirSync(rootDir).filter(f => f.startsWith('add_') && f.endsWith('.js')).forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');
  const idM = content.match(/id:\s*['"](p\d+)['"]/);
  const nameM = content.match(/name:\s*['"]([^'"]+)['"]/);
  
  // Find variable name in template string or content
  let varName = null;
  const varM = content.match(/window\.([A-Z0-9_]+_IMAGE)/);
  if (varM) {
    varName = varM[1];
  } else {
    const fileM = content.match(/([a-zA-Z0-9_]+Image\.js)/);
    if (fileM) {
      varName = fileToVar[fileM[1].toLowerCase()];
    }
  }

  if (idM && varName) {
    addMap[idM[1]] = {
      name: nameM ? nameM[1] : '',
      varName: varName,
      scriptFile: file
    };
  }
});

console.log(`Extracted ${Object.keys(addMap).length} mappings from add_*.js scripts.`);

fs.writeFileSync(path.join(rootDir, 'scratch', 'add_scripts_extracted_map.json'), JSON.stringify(addMap, null, 2), 'utf-8');
